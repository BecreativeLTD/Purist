import type { APIRoute } from 'astro';

export const prerender = false;

// ── Helpers ──────────────────────────────────────────────────────────
function escHtml(s: string) {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 500);
}
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
    }

    // Normalise
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
      const timeout = setTimeout(() => controller.abort(), 12000);
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
      // Limit to 150KB to avoid massive payloads
      if (html.length > 150000) html = html.slice(0, 150000);
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

    // Tech detection
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

    // Tracking
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

    // Security
    const hasHttps = targetUrl.startsWith('https');
    const hsts = headers['strict-transport-security'] ?? '';
    const csp = headers['content-security-policy'] ?? '';
    const xFrame = headers['x-frame-options'] ?? '';
    const xContent = headers['x-content-type-options'] ?? '';

    // Performance hints
    const inlineStyleCount = (html.match(/style="/g) || []).length;
    const scriptCount = scripts.length;
    const cssLinks = links.filter(l => l.endsWith('.css') || l.includes('.css?')).length;
    const htmlSize = Math.round(html.length / 1024);

    // ── 3. Build analysis context ──────────────────────────────────
    const context = `
SITE AUDIT DATA FOR: ${targetUrl}
Status: ${statusCode} | Response time: ${responseTime}ms | HTML size: ${htmlSize}KB

=== SEO ===
Title: "${title}" (${title.length} chars)
Meta description: "${metaDesc}" (${metaDesc.length} chars)
Canonical: ${canonical || 'MISSING'}
Robots: ${robots || 'not set'}
Lang: ${lang || 'MISSING'}
H1 count: ${h1s.length} → ${h1s.slice(0, 3).map(h => '"' + h.slice(0, 80) + '"').join(', ')}
H2 count: ${h2s.length} → ${h2s.slice(0, 5).map(h => '"' + h.slice(0, 60) + '"').join(', ')}
OG Title: ${ogTitle || 'MISSING'} | OG Desc: ${ogDesc || 'MISSING'} | OG Image: ${ogImage || 'MISSING'}
Schema.org: ${hasSchema ? schemaTypes.join(', ') : 'NONE'}
Images total: ${imgTags.length} | Missing alt: ${imgsWithoutAlt}
Viewport: ${viewport || 'MISSING'}
Charset: ${charset}

=== TECH STACK ===
Detected: ${techStack.length ? techStack.join(', ') : 'Unknown / custom'}
JS files: ${scriptCount} | CSS files: ${cssLinks} | Inline styles: ${inlineStyleCount}
Server: ${headers['server'] ?? 'not disclosed'}
X-Powered-By: ${headers['x-powered-by'] ?? 'not disclosed'}

=== TRACKING ===
${tracking.length ? tracking.join(', ') : 'NO TRACKING DETECTED'}

=== SECURITY ===
HTTPS: ${hasHttps ? 'Yes' : 'NO — CRITICAL'}
HSTS: ${hsts || 'MISSING'}
CSP: ${csp ? 'Present' : 'MISSING'}
X-Frame-Options: ${xFrame || 'MISSING'}
X-Content-Type-Options: ${xContent || 'MISSING'}

=== HEADERS ===
${Object.entries(headers).map(([k, v]) => `${k}: ${v.slice(0, 120)}`).join('\n')}
`;

    // ── 4. AI analysis ─────────────────────────────────────────────
    const openRouterKey = import.meta.env.OpenRouter;
    if (!openRouterKey) {
      return new Response(JSON.stringify({
        error: 'AI service not configured',
        raw: { title, metaDesc, canonical, statusCode, responseTime, techStack, tracking, h1s, h2s, htmlSize },
      }), { status: 500 });
    }

    const systemPrompt = `You are "Purist Audit AI" — a world-class digital ecosystem auditor. You produce cold, precise, premium audit reports.

OUTPUT FORMAT: Return a JSON object with this exact structure (no markdown, no code fences, raw JSON only):
{
  "score": <number 0-100>,
  "grade": "<A+ to F>",
  "summary": "<3 sentences executive summary>",
  "urgencies": ["<urgent issue 1>","<urgent issue 2>","<urgent issue 3>"],
  "sections": [
    {
      "id": "seo",
      "title": "SEO & Indexability",
      "score": <0-100>,
      "findings": [
        { "severity": "critical|warning|good", "title": "<finding title>", "detail": "<2-3 sentence explanation>", "fix": "<specific fix instruction>" }
      ]
    },
    {
      "id": "technical",
      "title": "Technical & Performance",
      "score": <0-100>,
      "findings": [...]
    },
    {
      "id": "tracking",
      "title": "Tracking & Analytics",
      "score": <0-100>,
      "findings": [...]
    },
    {
      "id": "security",
      "title": "Security & Headers",
      "score": <0-100>,
      "findings": [...]
    },
    {
      "id": "ux",
      "title": "UX & Conversion Signals",
      "score": <0-100>,
      "findings": [...]
    }
  ],
  "topActions": [
    { "priority": 1, "action": "<action>", "impact": "high|medium|low", "effort": "quick|medium|hard" }
  ]
}

RULES:
- Every section must have 4-8 findings
- Be brutally honest. If something is wrong, say it clearly
- "fix" must be specific and technical (code snippets, config changes)
- topActions should have 5-8 items sorted by priority
- Score objectively: missing canonical = -10, no HTTPS = -25, no meta desc = -8, etc
- Do NOT wrap in markdown code fences. Return raw JSON only.`;

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.purist.online',
        'X-Title': 'PURIST Site Audit',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: context },
        ],
        max_tokens: 4000,
        temperature: 0.2,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return new Response(JSON.stringify({ error: 'AI analysis failed', detail: errText }), { status: 502 });
    }

    const aiData = await aiRes.json();
    let rawReply = aiData.choices?.[0]?.message?.content?.trim() ?? '';

    // Clean markdown fences if present
    rawReply = rawReply.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

    let report: any;
    try {
      report = JSON.parse(rawReply);
    } catch {
      // If JSON parse fails, return raw + extracted data
      return new Response(JSON.stringify({
        error: 'Failed to parse AI response',
        rawReply,
        extracted: { title, metaDesc, canonical, statusCode, responseTime, techStack, tracking, h1s, h2s, htmlSize },
      }), { status: 500 });
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
