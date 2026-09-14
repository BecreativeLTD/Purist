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
  const { leadId, title, value, stage, recurring, expectedCloseDate } = body as {
    leadId?: string; title?: string; value?: number; stage?: string; recurring?: boolean; expectedCloseDate?: string;
  };
  if (!leadId || !title) {
    return new Response(JSON.stringify({ error: 'leadId and title are required' }), { status: 400 });
  }
  const resolvedStage = stage && STAGE_PROBABILITY[stage] !== undefined ? stage : 'new_lead';

  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from('deals')
    .insert({
      lead_id: leadId,
      title,
      value: Number(value) || 0,
      stage: resolvedStage,
      probability: STAGE_PROBABILITY[resolvedStage],
      recurring: !!recurring,
      expected_close_date: expectedCloseDate || null,
    })
    .select('id')
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { headers: { 'Content-Type': 'application/json' } });
};
