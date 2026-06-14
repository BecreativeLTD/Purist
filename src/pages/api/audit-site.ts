import type { APIRoute } from 'astro';

export const prerender = false;

// ── Helpers ──────────────────────────────────────────────────────────
function extract(html: string, re: RegExp): string {
  const m = html.match(re);
  return m ? m[1]?.trim() ?? '' : '';
}
function extractAll(html: string, re: RegExp): string[] {
  const out: string[] = [];
  let m;
  const r = new RegExp(re.source, 'gi');
  while ((m = r.exec(html)) !== null) out.push(m[1]?.trim() ?? m[0]?.trim());
  return out;
}

/** Extract first valid JSON object from a string (handles reasoning text around it) */
function extractJson(raw: string): any | null {
  // 1. Try direct parse
  try { return JSON.parse(raw); } catch {}

  // 2. Strip markdown fences
  let cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  try { return JSON.parse(cleaned); } catch {}

  // 3. Find the outermost { ... } with "score" inside
  const start = cleaned.indexOf('{"score"');
  if (start === -1) {
    // Try finding just the first {
    const altStart = cleaned.indexOf('{');
    if (altStart === -1) return null;
    cleaned = cleaned.slice(altStart);
  } else {
    cleaned = cleaned.slice(start);
  }

  // Find matching closing brace by counting depth
  let depth = 0;
  let end = -1;
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '{') depth++;
    if (cleaned[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end > 0) {
    try { return JSON.parse(cleaned.slice(0, end + 1)); } catch {}
  }

  return null;
}

/** Call a single model with timeout */
async function callModel(
  model: string, messages: any[], key: string, timeoutMs: number
): Promise<{ data: any; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.purist.online',
        'X-Title': 'PURIST Site Audit',
      },
      body: JSON.stringify({ model, messages, max_tokens: 4000, temperature: 0.2 }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return { data: null, error: await res.text() };
    return { data: await res.json() };
  } catch (e: any) {
    clearTimeout(timer);
    return { data: null, error: e?.message ?? 'timeout' };
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    // ── 1. Fetch target site ───────────────────────────────────────
    const t0 = Date.now();
    let html = '';
    let fetchError = '';
    let statusCode = 0;
    let headers: Record<string, string> = {};
    let responseTime = 0;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PuristAuditBot/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        signal: controller.signal,
        redirect: 'follow',
      });
      clearTimeout(timeout);
      responseTime = Date.now() - t0;
      statusCode = res.status;
      res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
      html = await res.text();
      if (html.length > 100000) html = html.slice(0, 100000);
    } catch (e: any) {
      fetchError = e?.message ?? 'Failed to fetch';
    }

    if (fetchError || !html) {
      return new Response(JSON.stringify({
        error: fetchError || 'Empty response from site',
        url: targetUrl,
      }), { status: 422 });
    }

    // ── 2. Extract technical signals ───────────────────────────────
    const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDesc = extract(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*?)["']/i)
                  || extract(html, /<meta[^>]*content=["']([^"']*?)["'][^>]*name=["']description["']/i);
    const canonical = extract(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*?)["']/i)
                   || extract(html, /<link[^>]*href=["']([^"']*?)["'][^>]*rel=["']canonical["']/i);
    const ogTitle = extract(html, /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*?)["']/i);
    const ogDesc = extract(html, /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*?)["']/i);
    const ogImage = extract(html, /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*?)["']/i);
    const viewport = extract(html, /<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*?)["']/i);
    const charset = extract(html, /<meta[^>]*charset=["']?([^"'\s>]+)/i) || 'not declared';
    const robots = extract(html, /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*?)["']/i);
    const lang = extract(html, /<html[^>]*lang=["']([^"']*?)["']/i);

    const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).map(h => h.replace(/<[^>]+>/g, ''));
    const h2s = extractAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/i).map(h => h.replace(/<[^>]+>/g, '')).slice(0, 10);

    const imgTags = extractAll(html, /<img[^>]*>/gi);
    const imgsWithoutAlt = imgTags.filter(t => !t.includes('alt=') || /alt=["']\s*["']/i.test(t)).length;

    const hasSchema = html.includes('application/ld+json');
    const schemaTypes = extractAll(html, /"@type"\s*:\s*"([^"]+)"/i);

    const scripts = extractAll(html, /<script[^>]*src=["']([^"']*?)["']/i);
    const links = extractAll(html, /<link[^>]*href=["']([^"']*?)["']/i);
    const allRefs = [...scripts, ...links].join(' ');

    const techStack: string[] = [];
    if (allRefs.includes('react') || html.includes('__NEXT_DATA__') || html.includes('_next/')) techStack.push('React');
    if (html.includes('__NEXT_DATA__') || html.includes('_next/')) techStack.push('Next.js');
    if (html.includes('__NUXT__') || allRefs.includes('nuxt')) techStack.push('Nuxt.js');
    if (allRefs.includes('vue') || html.includes('data-v-')) techStack.push('Vue.js');
    if (allRefs.includes('angular') || html.includes('ng-')) techStack.push('Angular');
    if (allRefs.includes('astro') || html.includes('astro-')) techStack.push('Astro');
    if (allRefs.includes('wordpress') || html.includes('wp-content') || html.includes('wp-json')) techStack.push('WordPress');
    if (allRefs.includes('shopify') || html.includes('Shopify')) techStack.push('Shopify');
    if (allRefs.includes('webflow') || html.includes('webflow')) techStack.push('Webflow');
    if (allRefs.includes('wix') || html.includes('wix.com')) techStack.push('Wix');
    if (allRefs.includes('squarespace') || html.includes('squarespace')) techStack.push('Squarespace');
    if (allRefs.includes('tailwind') || html.includes('tailwind')) techStack.push('Tailwind CSS');
    if (allRefs.includes('bootstrap')) techStack.push('Bootstrap');
    if (allRefs.includes('jquery')) techStack.push('jQuery');

    const tracking: string[] = [];
    if (html.includes('googletagmanager') || html.includes('gtag')) tracking.push('Google Analytics / GTM');
    if (html.includes('fbevents') || html.includes('fbq(') || html.includes('facebook.net/en_US/fbevents')) tracking.push('Meta Pixel');
    if (html.includes('tiktok') || html.includes('ttq.')) tracking.push('TikTok Pixel');
    if (html.includes('snap.licdn') || html.includes('linkedin')) tracking.push('LinkedIn Insight');
    if (html.includes('hotjar') || html.includes('hj(')) tracking.push('Hotjar');
    if (html.includes('clarity.ms')) tracking.push('Microsoft Clarity');
    if (html.includes('hubspot')) tracking.push('HubSpot');
    if (html.includes('intercom')) tracking.push('Intercom');
    if (html.includes('crisp')) tracking.push('Crisp');
    if (html.includes('plausible')) tracking.push('Plausible');
    if (html.includes('segment')) tracking.push('Segment');

    const hasHttps = targetUrl.startsWith('https');
    const hsts = headers['strict-transport-security'] ?? '';
    const csp = headers['content-security-policy'] ?? '';
    const xFrame = headers['x-frame-options'] ?? '';
    const xContent = headers['x-content-type-options'] ?? '';

    const inlineStyleCount = (html.match(/style="/g) || []).length;
    const scriptCount = scripts.length;
    const cssLinks = links.filter(l => l.endsWith('.css') || l.includes('.css?')).length;
    const htmlSize = Math.round(html.length / 1024);

    // ── 3. Build analysis context ──────────────────────────────────
    const context = `SITE AUDIT DATA FOR: ${targetUrl}
Status: ${statusCode} | Response time: ${responseTime}ms | HTML size: ${htmlSize}KB

SEO: Title="${title}" (${title.length}ch) | Meta desc="${metaDesc.slice(0,80)}" (${metaDesc.length}ch) | Canonical=${canonical || 'MISSING'} | Robots=${robots || 'not set'} | Lang=${lang || 'MISSING'}
H1s(${h1s.length}): ${h1s.slice(0,2).map(h => h.slice(0,60)).join('; ')} | H2s(${h2s.length}): ${h2s.slice(0,3).map(h => h.slice(0,40)).join('; ')}
OG: title=${ogTitle ? 'yes' : 'MISSING'} desc=${ogDesc ? 'yes' : 'MISSING'} image=${ogImage ? 'yes' : 'MISSING'} | Schema=${hasSchema ? schemaTypes.join(',') : 'NONE'}
Images: ${imgTags.length} total, ${imgsWithoutAlt} missing alt | Viewport=${viewport ? 'yes' : 'MISSING'} | Charset=${charset}

TECH: ${techStack.join(', ') || 'Unknown'} | JS:${scriptCount} CSS:${cssLinks} Inline:${inlineStyleCount} | Server=${headers['server'] ?? '?'}

TRACKING: ${tracking.join(', ') || 'NONE DETECTED'}

SECURITY: HTTPS=${hasHttps} | HSTS=${hsts ? 'yes' : 'MISSING'} | CSP=${csp ? 'yes' : 'MISSING'} | X-Frame=${xFrame || 'MISSING'} | X-Content-Type=${xContent || 'MISSING'}`;

    // ── 4. AI analysis (parallel race) ─────────────────────────────
    const openRouterKey = import.meta.env.OpenRouter || import.meta.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      return new Response(JSON.stringify({
        error: 'AI service not configured',
      }), { status: 500 });
    }

    const systemPrompt = `You are an expert website auditor. Analyze the data and return ONLY a JSON object (no explanation, no markdown fences).

JSON structure:
{"score":<0-100>,"grade":"<A+ to F>","summary":"<3 sentences>","urgencies":["<issue1>","<issue2>","<issue3>"],"sections":[{"id":"seo","title":"SEO & Indexability","score":<0-100>,"findings":[{"severity":"critical|warning|good","title":"<title>","detail":"<explanation>","fix":"<how to fix>"}]},{"id":"technical","title":"Technical & Performance","score":<0-100>,"findings":[...]},{"id":"tracking","title":"Tracking & Analytics","score":<0-100>,"findings":[...]},{"id":"security","title":"Security & Headers","score":<0-100>,"findings":[...]},{"id":"ux","title":"UX & Conversion","score":<0-100>,"findings":[...]}],"topActions":[{"priority":1,"action":"<action>","impact":"high|medium|low","effort":"quick|medium|hard"}]}

Rules: 3-5 findings per section. Be specific. topActions: 5 items. Score objectively. Return ONLY the JSON object.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: context },
    ];

    // Fire 3 models in parallel, take the first successful response
    const models = [
      'nvidia/nemotron-3-super-120b-a12b:free',
      'meta-llama/llama-3.3-70b-instruct:free',
      'google/gemma-4-31b-it:free',
    ];

    const results = await Promise.allSettled(
      models.map(m => callModel(m, messages, openRouterKey, 55000))
    );

    let report: any = null;
    let parseErrors: string[] = [];

    for (const result of results) {
      if (result.status !== 'fulfilled' || !result.value.data) continue;

      const raw = result.value.data.choices?.[0]?.message?.content?.trim() ?? '';
      if (!raw) continue;

      const parsed = extractJson(raw);
      if (parsed && parsed.score !== undefined && parsed.sections) {
        report = parsed;
        break;
      } else {
        parseErrors.push(raw.slice(0, 200));
      }
    }

    if (!report) {
      return new Response(JSON.stringify({
        error: 'Could not generate report. Please try again.',
        debug: parseErrors.slice(0, 1),
      }), { status: 502 });
    }

    // Attach raw extracted data
    report.meta = {
      url: targetUrl,
      fetchedAt: new Date().toISOString(),
      responseTime,
      statusCode,
      htmlSize,
      techStack,
      tracking,
    };

    return new Response(JSON.stringify(report), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Server error', detail: e?.message }), { status: 500 });
  }
};
