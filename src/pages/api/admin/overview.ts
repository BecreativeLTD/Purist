import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { fetchTrafficOverview, fetchSearchOverview } from '~/lib/site-metrics';

export const prerender = false;

// Search Console's API only ever returns a rolling ~16-month window
// (its own retention limit, not something this code can extend), so "max"
// is capped at 480 days for both traffic and search to keep the two
// comparable rather than silently mismatched.
const MAX_DAYS = 480;

export const GET: APIRoute = async ({ request, url }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const days = Math.min(MAX_DAYS, Math.max(1, Number(url.searchParams.get('days')) || 30));
  const [traffic, search] = await Promise.all([fetchTrafficOverview(days), fetchSearchOverview(days)]);

  return new Response(JSON.stringify({ traffic, search, days }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
