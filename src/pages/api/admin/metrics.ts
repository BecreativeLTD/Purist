import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { fetchTrafficSeries, fetchSearchSeries, type Granularity } from '~/lib/site-metrics';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const type = url.searchParams.get('type');
  const granularity = (url.searchParams.get('granularity') ?? 'day') as Granularity;

  if (type === 'traffic') {
    const series = await fetchTrafficSeries(granularity, 30);
    return new Response(JSON.stringify(series), { headers: { 'Content-Type': 'application/json' } });
  }
  if (type === 'search') {
    if (granularity === 'hour') {
      return new Response(JSON.stringify({ available: false, points: [], reason: 'Search Console has no hourly dimension' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const series = await fetchSearchSeries(granularity, 30);
    return new Response(JSON.stringify(series), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ error: 'unknown type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
};
