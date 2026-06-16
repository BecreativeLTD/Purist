import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const key = import.meta.env.ANTHROPIC_API_KEY
    || import.meta.env.Anthropic
    || (typeof process !== 'undefined' ? process.env.ANTHROPIC_API_KEY : '');

  if (!key) {
    return new Response(JSON.stringify({ status: 'ERROR', error: 'No API key found' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 50,
        messages: [{ role: 'user', content: 'Reply with: {"ok":true}' }],
      }),
    });

    const raw = await res.text();

    return new Response(JSON.stringify({
      status: res.ok ? 'OK' : 'ERROR',
      httpStatus: res.status,
      keyPrefix: key.slice(0, 12) + '...',
      response: raw.slice(0, 500),
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ status: 'FETCH_ERROR', error: e.message }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
