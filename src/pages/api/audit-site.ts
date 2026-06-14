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
      body: JSON.stringify({ model, messages, max_tokens: 6000, temperature: 0.2 }),
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

    // ── Business & Content signals ────────────────────────────────
    const allAnchors = extractAll(html, /<a[^>]*href=["']([^"'#]*?)["']/i);
    const internalLinks = allAnchors.filter(h => h.startsWith('/') || h.includes(new URL(targetUrl).hostname)).length;
    const externalLinks = allAnchors.filter(h => h.startsWith('http') && !h.includes(new URL(targetUrl).hostname)).length;
    const forms = (html.match(/<form[\s>]/gi) || []).length;
    const buttons = (html.match(/<button[\s>]/gi) || []).length;
    const inputs = (html.match(/<input[\s>]/gi) || []).length;
    const hasFavicon = html.includes('favicon') || html.includes('icon"') || html.includes("icon'");
    const h3s = extractAll(html, /<h3[^>]*>([\s\S]*?)<\/h3>/i).map(h => h.replace(/<[^>]+>/g, '')).slice(0, 5);

    // Social links
    const socialPlatforms: string[] = [];
    if (html.includes('twitter.com') || html.includes('x.com')) socialPlatforms.push('Twitter/X');
    if (html.includes('facebook.com') || html.includes('fb.com')) socialPlatforms.push('Facebook');
    if (html.includes('instagram.com')) socialPlatforms.push('Instagram');
    if (html.includes('linkedin.com')) socialPlatforms.push('LinkedIn');
    if (html.includes('youtube.com')) socialPlatforms.push('YouTube');
    if (html.includes('tiktok.com')) socialPlatforms.push('TikTok');
    if (html.includes('github.com')) socialPlatforms.push('GitHub');

    // Content signals
    const textContent = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 2).length;
    const hasVideo = html.includes('<video') || html.includes('youtube.com/embed') || html.includes('vimeo.com');
    const hasContactInfo = html.includes('mailto:') || html.includes('tel:') || /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(html);
    const hasPricing = /\$\d|£\d|€\d|pricing|price/i.test(html);
    const hasTestimonials = /testimonial|review|rating|★|⭐|star/i.test(html);
    const hasCTA = /sign.?up|get.?started|book.?a|free.?trial|contact.?us|schedule|demo|subscribe/i.test(html);
    const hasChat = html.includes('crisp') || html.includes('intercom') || html.includes('tawk') || html.includes('drift') || html.includes('livechat') || html.includes('zendesk');
    const hasCookieConsent = /cookie.?consent|cookie.?banner|gdpr|cookie.?policy/i.test(html);
    const hasPrivacyLink = /privacy.?policy|privacy/i.test(html);
    const hasTermsLink = /terms.?of.?service|terms.?and.?conditions|terms/i.test(html);

    // Accessibility
    const ariaLabels = (html.match(/aria-label/gi) || []).length;
    const ariaRoles = (html.match(/role="/gi) || []).length;
    const hasSkipLink = /skip.?to.?content|skip.?nav/i.test(html);
    const hasFocusStyles = html.includes(':focus') || html.includes('focus-visible');

    // Performance hints
    const lazyImages = (html.match(/loading=["']lazy["']/gi) || []).length;
    const preloads = (html.match(/<link[^>]*rel=["']preload["']/gi) || []).length;
    const hasServiceWorker = html.includes('serviceWorker') || html.includes('service-worker');

    // ── 3. Build analysis context ──────────────────────────────────
    const context = `FULL SITE AUDIT FOR: ${targetUrl}
Status: ${statusCode} | Response: ${responseTime}ms | HTML: ${htmlSize}KB | Words: ${wordCount}

=== SEO ===
Title: "${title}" (${title.length}ch) | Meta desc: "${metaDesc.slice(0,100)}" (${metaDesc.length}ch)
Canonical: ${canonical || 'MISSING'} | Robots: ${robots || 'not set'} | Lang: ${lang || 'MISSING'}
H1(${h1s.length}): ${h1s.slice(0,2).map(h => h.slice(0,60)).join('; ')}
H2(${h2s.length}): ${h2s.slice(0,4).map(h => h.slice(0,50)).join('; ')}
H3(${h3s.length}): ${h3s.slice(0,3).map(h => h.slice(0,40)).join('; ')}
OG: title=${ogTitle ? 'yes' : 'MISSING'} desc=${ogDesc ? 'yes' : 'MISSING'} image=${ogImage ? 'yes' : 'MISSING'}
Schema.org: ${hasSchema ? schemaTypes.join(', ') : 'NONE'}
Images: ${imgTags.length} total, ${imgsWithoutAlt} missing alt, ${lazyImages} lazy-loaded
Links: ${internalLinks} internal, ${externalLinks} external

=== TECHNICAL ===
Stack: ${techStack.join(', ') || 'Unknown/custom'} | JS files: ${scriptCount} | CSS files: ${cssLinks} | Inline styles: ${inlineStyleCount}
Server: ${headers['server'] ?? 'hidden'} | X-Powered-By: ${headers['x-powered-by'] ?? 'hidden'}
Viewport: ${viewport || 'MISSING'} | Charset: ${charset}
Preloads: ${preloads} | Service Worker: ${hasServiceWorker ? 'yes' : 'no'} | Favicon: ${hasFavicon ? 'yes' : 'MISSING'}

=== TRACKING ===
${tracking.length ? tracking.join(', ') : 'NO TRACKING/ANALYTICS DETECTED'}

=== SECURITY ===
HTTPS: ${hasHttps ? 'yes' : 'NO'} | HSTS: ${hsts ? 'yes' : 'MISSING'} | CSP: ${csp ? 'yes' : 'MISSING'}
X-Frame-Options: ${xFrame || 'MISSING'} | X-Content-Type-Options: ${xContent || 'MISSING'}
Cookie consent: ${hasCookieConsent ? 'detected' : 'MISSING'} | Privacy policy: ${hasPrivacyLink ? 'yes' : 'MISSING'} | Terms: ${hasTermsLink ? 'yes' : 'MISSING'}

=== BUSINESS & CONVERSION ===
Forms: ${forms} | Buttons: ${buttons} | Input fields: ${inputs}
CTA detected: ${hasCTA ? 'yes' : 'NO'} | Pricing shown: ${hasPricing ? 'yes' : 'no'}
Testimonials/reviews: ${hasTestimonials ? 'detected' : 'none'} | Live chat: ${hasChat ? 'yes' : 'no'}
Contact info (email/phone): ${hasContactInfo ? 'yes' : 'MISSING'}
Social profiles: ${socialPlatforms.length ? socialPlatforms.join(', ') : 'NONE'}

=== CONTENT ===
Word count: ${wordCount} | Video content: ${hasVideo ? 'yes' : 'no'}
Content structure: H1(${h1s.length}) H2(${h2s.length}) H3(${h3s.length})

=== ACCESSIBILITY ===
Aria labels: ${ariaLabels} | Aria roles: ${ariaRoles} | Skip-to-content: ${hasSkipLink ? 'yes' : 'no'}
Images without alt: ${imgsWithoutAlt}/${imgTags.length}`;

    // ── 4. AI analysis (parallel race) ─────────────────────────────
    const openRouterKey = import.meta.env.OpenRouter || import.meta.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      return new Response(JSON.stringify({
        error: 'AI service not configured',
      }), { status: 500 });
    }

    const systemPrompt = `You are "Purist Audit AI", a world-class website and business auditor for an automation agency. Analyze ALL data and return ONLY a JSON object. No explanation, no markdown fences, no thinking.

{"score":<0-100>,"grade":"<A+ to F>","summary":"<5 sentence executive summary: what the site does well, critical gaps, estimated revenue impact, and the #1 priority>","urgencies":["<issue1>","<issue2>","<issue3>","<issue4>","<issue5>"],"sections":[{"id":"seo","title":"SEO & Indexability","score":<0-100>,"findings":[{"severity":"critical|warning|good","title":"<title>","detail":"<2-3 sentences with specific data from the audit>","fix":"<specific technical fix or null if good>"}]},{"id":"technical","title":"Technical & Performance","score":<0-100>,"findings":[...]},{"id":"content","title":"Content Quality & Strategy","score":<0-100>,"findings":[...]},{"id":"tracking","title":"Tracking & Analytics","score":<0-100>,"findings":[...]},{"id":"security","title":"Security & Compliance","score":<0-100>,"findings":[...]},{"id":"business","title":"Business & Conversion","score":<0-100>,"findings":[...]},{"id":"accessibility","title":"Accessibility","score":<0-100>,"findings":[...]},{"id":"brand","title":"Brand & Trust Signals","score":<0-100>,"findings":[...]},{"id":"automation","title":"Automation Opportunities","score":<0-100>,"findings":[...]},{"id":"ecosystem","title":"Ecosystem & Growth Roadmap","score":<0-100>,"findings":[...]}],"topActions":[{"priority":1,"action":"<action>","impact":"high|medium|low","effort":"quick|medium|hard"}],"workflows":[{"name":"<workflow name>","trigger":"<what triggers it>","tools":"<tools involved based on detected stack>","impact":"<business impact>"},{"name":"...","trigger":"...","tools":"...","impact":"..."}]}

CRITICAL RULES:
- 10 sections required. 3-5 findings each. Reference REAL data from the audit.
- For "good" severity, fix must be null
- topActions: 8 items sorted by ROI
- workflows: 4-6 automation workflow ideas based on the DETECTED tech stack and tracking tools. Be specific to what you see on the site. Example: if they use Shopify+GTM, suggest abandoned cart recovery via n8n. If WordPress, suggest content republishing automation. If no CRM detected, suggest lead capture→CRM pipeline automation.
- automation section: analyze what manual processes the site likely has based on its stack, and what could be automated (lead routing, follow-ups, reporting, content distribution, review collection, etc.)
- ecosystem section: recommend tools and integrations that would complete their digital ecosystem based on what's missing (CRM, email marketing, helpdesk, etc.)
- business section: evaluate conversion funnel completeness, pricing strategy signals, social proof, competitive positioning
- Be brutally honest. This audit must feel like a $2000 consulting report.
- Return ONLY the JSON object.`;

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
