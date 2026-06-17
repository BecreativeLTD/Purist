// Daily cron job — sends J+2 and J+5 nurture emails.
// Vercel calls this every day at 09:00 UTC (see vercel.json).
// Protected by CRON_SECRET environment variable.
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { createSupabaseAdminClient } from '../../../lib/supabase-admin';
import { buildJ2Email, buildJ5Email } from '../../../lib/email-nurture';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // Protect with CRON_SECRET — Vercel passes it as Authorization: Bearer <secret>
  const secret = import.meta.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get('Authorization') ?? '';
    if (auth !== `Bearer ${secret}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(JSON.stringify({ skipped: true, reason: 'no resend key' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const db = createSupabaseAdminClient();
  const resend = new Resend(resendKey);

  // Fetch all pending emails that are due
  const { data: pending, error } = await db
    .from('email_sequences')
    .select(`
      id,
      step,
      leads ( email, status )
    `)
    .eq('status', 'pending')
    .lte('scheduled_at', new Date().toISOString())
    .limit(100);

  if (error) {
    console.error('[nurture-cron] query failed', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const results: Array<{ id: string; email: string; step: number; result: string }> = [];

  for (const row of pending ?? []) {
    const lead = Array.isArray(row.leads) ? row.leads[0] : row.leads;
    const email: string = lead?.email;
    const status: string = lead?.status;

    if (!email) {
      await db.from('email_sequences').update({ status: 'skipped' }).eq('id', row.id);
      continue;
    }

    // Skip unsubscribed leads
    if (status === 'unsubscribed') {
      await db.from('email_sequences').update({ status: 'skipped' }).eq('id', row.id);
      results.push({ id: row.id, email, step: row.step, result: 'skipped (unsubscribed)' });
      continue;
    }

    let subject = '';
    let html = '';

    if (row.step === 2) {
      subject = 'Did you get a chance to look at this?';
      html = buildJ2Email(email);
    } else if (row.step === 5) {
      subject = '16 hours saved in week one — how they did it';
      html = buildJ5Email(email);
    } else {
      // Unknown step — skip
      await db.from('email_sequences').update({ status: 'skipped' }).eq('id', row.id);
      continue;
    }

    try {
      await resend.emails.send({
        from: 'Hamid at PURIST <hello@purist.online>',
        to: [email],
        subject,
        replyTo: 'hello@purist.online',
        html,
      });

      await db
        .from('email_sequences')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', row.id);

      results.push({ id: row.id, email, step: row.step, result: 'sent' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      await db.from('email_sequences').update({ status: 'failed' }).eq('id', row.id);
      results.push({ id: row.id, email, step: row.step, result: `failed: ${msg}` });
    }
  }

  return new Response(
    JSON.stringify({ processed: results.length, results }),
    { headers: { 'Content-Type': 'application/json' } },
  );
};
