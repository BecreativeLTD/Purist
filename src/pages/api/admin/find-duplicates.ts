import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';

export const prerender = false;

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

// Email is already UNIQUE at the database level, so the only realistic
// duplicate signal available today is a matching phone number entered on
// two different lead records (e.g. a contact who first came in through a
// form with one email, then was manually added with a work email and the
// same phone). This deliberately does not attempt fuzzy name matching,
// that would risk false positives merging two different real people.
export const GET: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const db = createSupabaseAdminClient();
  const { data: leads, error } = await db
    .from('leads')
    .select('id, email, name, company, phone, score, status, created_at')
    .not('phone', 'is', null)
    .neq('phone', '');

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const byPhone = new Map<string, typeof leads>();
  (leads ?? []).forEach((l) => {
    if (!l.phone) return;
    const norm = normalizePhone(l.phone);
    if (norm.length < 7) return; // too short to be a meaningful match
    (byPhone.get(norm) ?? byPhone.set(norm, []).get(norm))!.push(l);
  });

  const groups = Array.from(byPhone.values()).filter((g) => g.length > 1);
  return new Response(JSON.stringify({ groups }), { headers: { 'Content-Type': 'application/json' } });
};
