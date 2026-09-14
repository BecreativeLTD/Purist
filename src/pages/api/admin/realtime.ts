import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { fetchRealtimeOverview } from '~/lib/site-metrics';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const data = await fetchRealtimeOverview();
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
