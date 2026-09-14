import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { fetchBingOverview } from '~/lib/bing-metrics';

export const prerender = false;

const MAX_DAYS = 480;

export const GET: APIRoute = async ({ request, url }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const days = Math.min(MAX_DAYS, Math.max(1, Number(url.searchParams.get('days')) || 90));
  const bing = await fetchBingOverview(days);

  return new Response(JSON.stringify({ bing }), { headers: { 'Content-Type': 'application/json' } });
};
