import type { APIRoute } from 'astro';

const INDEXNOW_KEY = '58fcb8402a224307b70f8a235a89fc84';
const SITE_URL = 'https://www.purist.online';
const SITEMAP_URL = 'https://www.purist.online/sitemap.xml';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (!urls.length) {
      return new Response(JSON.stringify({ error: 'No URLs provided' }), { status: 400, headers: JSON_HEADERS });
    }

    const absoluteUrls = urls.map(u => u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`);
    const result = await submitToIndexNow(absoluteUrls);
    return new Response(JSON.stringify(result), { status: 200, headers: JSON_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: JSON_HEADERS });
  }
};

// GET: fetch sitemap and submit ALL URLs to IndexNow
export const GET: APIRoute = async () => {
  try {
    // Fetch the live sitemap
    const sitemapResp = await fetch(SITEMAP_URL);
    if (!sitemapResp.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch sitemap: ${sitemapResp.status}` }), { status: 500, headers: JSON_HEADERS });
    }

    const xml = await sitemapResp.text();

    // Extract all <loc> URLs from sitemap
    const urls: string[] = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }

    if (!urls.length) {
      return new Response(JSON.stringify({ error: 'No URLs found in sitemap' }), { status: 400, headers: JSON_HEADERS });
    }

    // IndexNow accepts max 10,000 URLs per request — split if needed
    const batchSize = 10000;
    const results = [];
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const result = await submitToIndexNow(batch);
      results.push(result);
    }

    return new Response(JSON.stringify({
      success: results.every(r => r.success),
      totalUrls: urls.length,
      batches: results,
    }), { status: 200, headers: JSON_HEADERS });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: JSON_HEADERS });
  }
};

async function submitToIndexNow(urls: string[]) {
  const payload = {
    host: 'www.purist.online',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const resp = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    success: resp.ok || resp.status === 202,
    status: resp.status,
    submitted: urls.length,
  };
}
