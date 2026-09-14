import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';

export const prerender = false;

const STAGE_PROBABILITY: Record<string, number> = {
  new_lead: 10, qualified: 25, proposal_sent: 50, negotiation: 75, closed_won: 100, closed_lost: 0,
};

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { dealId, stage, value, recurring, expectedCloseDate } = body as {
    dealId?: string; stage?: string; value?: number; recurring?: boolean; expectedCloseDate?: string;
  };
  if (!dealId) return new Response(JSON.stringify({ error: 'dealId is required' }), { status: 400 });

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (stage && STAGE_PROBABILITY[stage] !== undefined) {
    update.stage = stage;
    // Moving stage resets probability to that stage's default, a manual
    // probability override would otherwise go stale as deals progress.
    update.probability = STAGE_PROBABILITY[stage];
    update.closed_at = stage === 'closed_won' || stage === 'closed_lost' ? new Date().toISOString() : null;
  }
  if (value !== undefined) update.value = Number(value) || 0;
  if (recurring !== undefined) update.recurring = !!recurring;
  if (expectedCloseDate !== undefined) update.expected_close_date = expectedCloseDate || null;

  const db = createSupabaseAdminClient();
  const { error } = await db.from('deals').update(update).eq('id', dealId);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ result: 'updated' }), { headers: { 'Content-Type': 'application/json' } });
};
