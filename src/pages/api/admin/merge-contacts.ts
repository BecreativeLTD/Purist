import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';

export const prerender = false;

const MERGEABLE_FIELDS = ['name', 'email', 'phone', 'company', 'category', 'company_size'];

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { keepId, mergeId, fields } = body as { keepId?: string; mergeId?: string; fields?: Record<string, string> };

  if (!keepId || !mergeId || keepId === mergeId) {
    return new Response(JSON.stringify({ error: 'keepId and a different mergeId are required' }), { status: 400 });
  }

  const db = createSupabaseAdminClient();

  const update: Record<string, unknown> = {};
  if (fields) {
    for (const key of MERGEABLE_FIELDS) {
      if (fields[key] !== undefined) update[key] = fields[key];
    }
  }
  // Combine score and touch_count rather than picking one, since both
  // records represent real activity from the same person.
  const { data: keepLead } = await db.from('leads').select('score, touch_count').eq('id', keepId).single();
  const { data: mergeLead } = await db.from('leads').select('score, touch_count').eq('id', mergeId).single();
  if (keepLead && mergeLead) {
    update.score = (keepLead.score ?? 0) + (mergeLead.score ?? 0);
    update.touch_count = (keepLead.touch_count ?? 0) + (mergeLead.touch_count ?? 0);
  }

  if (Object.keys(update).length) {
    const { error: updateErr } = await db.from('leads').update(update).eq('id', keepId);
    if (updateErr) return new Response(JSON.stringify({ error: updateErr.message }), { status: 500 });
  }

  // Reassign every dependent record to the surviving lead, then remove the duplicate.
  await db.from('lead_events').update({ lead_id: keepId }).eq('lead_id', mergeId);
  await db.from('email_sequences').update({ lead_id: keepId }).eq('lead_id', mergeId);
  await db.from('contact_activities').update({ lead_id: keepId }).eq('lead_id', mergeId);
  const { error: deleteErr } = await db.from('leads').delete().eq('id', mergeId);
  if (deleteErr) return new Response(JSON.stringify({ error: deleteErr.message }), { status: 500 });

  return new Response(JSON.stringify({ result: 'merged', keepId }), { headers: { 'Content-Type': 'application/json' } });
};
