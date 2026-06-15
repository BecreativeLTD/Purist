import type { APIRoute } from 'astro';

const INDEXNOW_KEY = '58fcb8402a224307b70f8a235a89fc84';
const SITE_URL = 'https://purist.online';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (!urls.length) {
      return new Response(JSON.stringify({ error: 'No URLs provided' }), { status: 400 });
    }

    // Ensure all URLs are absolute
    const absoluteUrls = urls.map(u => u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`);

    const payload = {
      host: 'purist.online',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: absoluteUrls,
    };

    const resp = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return new Response(JSON.stringify({
      success: resp.ok || resp.status === 202,
      status: resp.status,
      submitted: absoluteUrls.length,
    }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

// GET: submit all important pages at once
export const GET: APIRoute = async () => {
  const pages = [
    '/',
    '/pages/about',
    '/pages/services',
    '/pages/site-audit',
    '/pages/contact',
    '/pages/blog',
    '/pages/glossary',
    '/pages/skills',
    '/pages/privacy',
    '/pages/terms',
  ];

  const absoluteUrls = pages.map(p => `${SITE_URL}${p}`);

  const payload = {
    host: 'purist.online',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: absoluteUrls,
  };

  try {
    const resp = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return new Response(JSON.stringify({
      success: resp.ok || resp.status === 202,
      status: resp.status,
      submitted: absoluteUrls.length,
      urls: absoluteUrls,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
