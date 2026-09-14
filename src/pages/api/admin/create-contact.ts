import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';
import { COMPANY_SIZE_BONUS } from '~/lib/lead-scoring';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { email, name, company, phone, companySize, tags } = body as {
    email?: string; name?: string; company?: string; phone?: string; companySize?: string; tags?: string;
  };

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'a valid email is required' }), { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();
  const tagList = (tags ?? '').split(',').map((t) => t.trim()).filter(Boolean);

  const db = createSupabaseAdminClient();
  const { data: existing } = await db.from('leads').select('id, company_size, score').eq('email', normalizedEmail).maybeSingle();

  const profile: Record<string, unknown> = { email: normalizedEmail, updated_at: new Date().toISOString() };
  if (name) profile.name = name;
  if (company) profile.company = company;
  if (phone) profile.phone = phone;
  if (companySize) profile.company_size = companySize;
  if (tagList.length) profile.tags = tagList;

  if (existing) {
    const { error } = await db.from('leads').update(profile).eq('id', existing.id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    if (companySize && !existing.company_size) {
      await db.from('leads').update({ score: (existing.score ?? 0) + COMPANY_SIZE_BONUS }).eq('id', existing.id);
    }
    return new Response(JSON.stringify({ result: 'updated', id: existing.id }), { headers: { 'Content-Type': 'application/json' } });
  }

  profile.source = 'manual';
  profile.status = 'active';
  profile.score = companySize ? COMPANY_SIZE_BONUS : 0;
  profile.touch_count = 1;
  profile.last_seen_at = new Date().toISOString();
  profile.created_at = new Date().toISOString();

  const { data: created, error: insertErr } = await db.from('leads').insert(profile).select('id').single();
  if (insertErr || !created) {
    return new Response(JSON.stringify({ error: insertErr?.message ?? 'insert failed' }), { status: 500 });
  }
  await db.from('lead_events').insert({ lead_id: created.id, event_type: 'manual_entry', source: 'admin', points: 0 });

  return new Response(JSON.stringify({ result: 'created', id: created.id }), { headers: { 'Content-Type': 'application/json' } });
};
