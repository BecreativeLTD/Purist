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

/** Call Anthropic Claude API */
async function callClaude(
  system: string, userMsg: string, key: string
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0,
        system,
        messages: [{ role: 'user', content: userMsg }],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.[0]?.text?.trim() ?? null;
  } catch {
    clearTimeout(timer);
    return null;
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
    const context = `AUDIT: ${targetUrl} | ${statusCode} | ${responseTime}ms | ${htmlSize}KB | ${wordCount} words
SEO: Title="${title.slice(0,60)}"(${title.length}ch) MetaDesc="${metaDesc.slice(0,60)}"(${metaDesc.length}ch) Canonical=${canonical||'NO'} Robots=${robots||'none'} Lang=${lang||'NO'} H1:${h1s.length} H2:${h2s.length} H3:${h3s.length} OG:${ogTitle?'y':'N'}/${ogDesc?'y':'N'}/${ogImage?'y':'N'} Schema=${hasSchema?schemaTypes.join(','):'NONE'} Imgs:${imgTags.length}(${imgsWithoutAlt} no alt) Links:${internalLinks}int/${externalLinks}ext Lazy:${lazyImages}
TECH: Stack=${techStack.join(',')||'unknown'} JS:${scriptCount} CSS:${cssLinks} Inline:${inlineStyleCount} Server=${headers['server']??'?'} Viewport=${viewport?'y':'NO'} Favicon=${hasFavicon?'y':'NO'} Preloads:${preloads} SW=${hasServiceWorker?'y':'n'}
TRACKING: ${tracking.join(', ')||'NONE'}
SECURITY: HTTPS=${hasHttps?'y':'N'} HSTS=${hsts?'y':'NO'} CSP=${csp?'y':'NO'} XFrame=${xFrame||'NO'} XContent=${xContent||'NO'} CookieConsent=${hasCookieConsent?'y':'NO'} Privacy=${hasPrivacyLink?'y':'NO'} Terms=${hasTermsLink?'y':'NO'}
BUSINESS: Forms:${forms} Buttons:${buttons} Inputs:${inputs} CTA=${hasCTA?'y':'NO'} Pricing=${hasPricing?'y':'n'} Testimonials=${hasTestimonials?'y':'n'} Chat=${hasChat?'y':'n'} Contact=${hasContactInfo?'y':'NO'} Social=${socialPlatforms.join(',')||'NONE'} Video=${hasVideo?'y':'n'}
A11Y: AriaLabels:${ariaLabels} Roles:${ariaRoles} SkipLink=${hasSkipLink?'y':'n'} AltMissing:${imgsWithoutAlt}/${imgTags.length}`;

    // ── 4. AI analysis via Claude Sonnet ──────────────────────────
    const anthropicKey = import.meta.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      return new Response(JSON.stringify({
        error: 'AI service not configured',
      }), { status: 500 });
    }

    const systemPrompt = `You are a premium website auditor for PURIST, an automation agency. Analyze the site data and return ONLY valid JSON — no markdown, no explanation.

Return this exact structure:
{"score":0-100,"grade":"A/B/C/D/F","summary":"3-5 sentence executive summary with specific data points","urgencies":["top 3 critical issues"],"sections":[10 sections each with id,title,score,findings],"topActions":[5 prioritized items],"workflows":[4 automation workflows]}

Section IDs & titles (in order): seo/SEO & Indexability, technical/Technical & Performance, content/Content Quality, tracking/Tracking & Analytics, security/Security & Compliance, business/Business & Conversion, accessibility/Accessibility, brand/Brand & Trust, automation/Automation Opportunities, ecosystem/Ecosystem & Growth

Each section has 2-3 findings: {"severity":"critical|warning|good","title":"short","detail":"specific with real data from the audit","fix":"actionable fix or null if good"}
Each topAction: {"priority":1-5,"action":"specific action","impact":"high|medium|low","effort":"quick|medium|hard"}
Each workflow: {"name":"workflow name","trigger":"event","tools":"specific tools based on detected stack + n8n/Make","impact":"business result"}

Be specific and reference actual data from the signals. Workflows must match the detected tech stack.`;

    const raw = await callClaude(systemPrompt, context, anthropicKey);

    let report: any = null;
    if (raw) {
      report = extractJson(raw);
    }

    if (!report || report.score === undefined || !report.sections) {
      return new Response(JSON.stringify({
        error: 'Could not generate report. Please try again.',
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
