import type { APIRoute } from 'astro';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';

export const prerender = false;

// Minimal CSV parser: no quoted-comma support, matches what a plain
// "export from Excel/Sheets" produces for a simple contact list. Expected
// header row (any order, case-insensitive): email,name,phone,company,tags
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = line.split(',').map((c) => c.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = cells[i] ?? ''));
    return row;
  });
}

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { csv } = body as { csv?: string };
  if (!csv) return new Response(JSON.stringify({ error: 'csv text is required' }), { status: 400 });

  const rows = parseCsv(csv);
  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'no rows found, check the header row (email,name,phone,company,tags)' }), { status: 400 });
  }

  const db = createSupabaseAdminClient();
  let imported = 0, updated = 0, skipped = 0;
  const errors: string[] = [];

  for (const row of rows) {
    const email = (row.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      skipped++;
      continue;
    }
    const profile: Record<string, unknown> = { email, updated_at: new Date().toISOString() };
    if (row.name) profile.name = row.name;
    if (row.phone) profile.phone = row.phone;
    if (row.company) profile.company = row.company;
    if (row.tags) profile.tags = row.tags.split(/[;|]/).map((t) => t.trim()).filter(Boolean);

    const { data: existing } = await db.from('leads').select('id').eq('email', email).maybeSingle();
    if (existing) {
      const { error } = await db.from('leads').update(profile).eq('id', existing.id);
      if (error) errors.push(`${email}: ${error.message}`);
      else updated++;
    } else {
      profile.source = 'csv_import';
      profile.status = 'active';
      profile.score = 0;
      profile.touch_count = 1;
      profile.last_seen_at = new Date().toISOString();
      profile.created_at = new Date().toISOString();
      const { data: created, error } = await db.from('leads').insert(profile).select('id').single();
      if (error) errors.push(`${email}: ${error.message}`);
      else {
        imported++;
        if (created) await db.from('lead_events').insert({ lead_id: created.id, event_type: 'manual_entry', source: 'csv_import', points: 0 });
      }
    }
  }

  return new Response(JSON.stringify({ imported, updated, skipped, errors }), { headers: { 'Content-Type': 'application/json' } });
};
