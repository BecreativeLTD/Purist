import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';

export const prerender = false;

const VALID_TYPES = ['call', 'meeting', 'note', 'email'];

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { leadId, type, subject, activityBody } = body as {
    leadId?: string; type?: string; subject?: string; activityBody?: string;
  };

  if (!leadId || !type || !VALID_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: 'leadId and a valid type (call, meeting, note, email) are required' }), { status: 400 });
  }

  const db = createSupabaseAdminClient();
  const { error } = await db.from('contact_activities').insert({
    lead_id: leadId,
    type,
    subject: subject ?? null,
    body: activityBody ?? null,
  });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Calls and meetings represent real outreach, so they update
  // last_contacted_at; a note is an internal record, not contact itself.
  if (type === 'call' || type === 'meeting' || type === 'email') {
    await db.from('leads').update({ last_contacted_at: new Date().toISOString() }).eq('id', leadId);
  }

  return new Response(JSON.stringify({ result: 'added' }), { headers: { 'Content-Type': 'application/json' } });
};
