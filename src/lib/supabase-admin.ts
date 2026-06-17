import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xzcvpetgcqsjwrtskadb.supabase.co';
// Fallback to anon key so it still works before you add the service role key.
// Add SUPABASE_SERVICE_ROLE_KEY to your Vercel env vars for production.
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3ZwZXRnY3FzandydHNrYWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODUxNjUsImV4cCI6MjA5NjA2MTE2NX0.zU3piiV92mOJJXjgl9rhgnry7SbGpfywev-VWR-qHGQ';

export function createSupabaseAdminClient() {
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, key, {
    auth: { persistSession: false },
  });
}

// Upsert a lead and schedule the 3-email sequence.
// Returns the lead id, or null on failure.
export async function upsertLead(
  email: string,
  source: string | undefined,
  page: string | undefined,
): Promise<string | null> {
  const db = createSupabaseAdminClient();

  const { data: lead, error } = await db
    .from('leads')
    .upsert({ email, source, page, updated_at: new Date().toISOString() }, { onConflict: 'email' })
    .select('id, status')
    .single();

  if (error || !lead) {
    console.error('[leads] upsert failed', error?.message);
    return null;
  }

  // Only schedule the sequence for brand-new active leads.
  // If the email already existed (upsert), skip re-scheduling.
  const { count } = await db
    .from('email_sequences')
    .select('id', { count: 'exact', head: true })
    .eq('lead_id', lead.id);

  if ((count ?? 0) > 0) return lead.id;

  const now = new Date();
  const schedules = [
    { step: 0, offset: 0 },   // immediate  (handled by lead-capture directly)
    { step: 2, offset: 2 },   // J+2
    { step: 5, offset: 5 },   // J+5
  ].map(({ step, offset }) => {
    const at = new Date(now);
    at.setDate(at.getDate() + offset);
    if (offset > 0) at.setHours(9, 0, 0, 0); // send follow-ups at 09:00 UTC
    return {
      lead_id: lead.id,
      step,
      scheduled_at: at.toISOString(),
      // Step 0 is sent immediately by lead-capture — mark it sent right away
      status: step === 0 ? 'sent' : 'pending',
      sent_at: step === 0 ? now.toISOString() : null,
    };
  });

  const { error: seqErr } = await db.from('email_sequences').insert(schedules);
  if (seqErr) console.error('[sequences] insert failed', seqErr.message);

  return lead.id;
}
