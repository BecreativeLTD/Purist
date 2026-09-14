import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';
import { buildJ2Email, buildJ5Email } from '~/lib/email-nurture';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { sequenceId } = body as { sequenceId?: string };
  if (!sequenceId) {
    return new Response(JSON.stringify({ error: 'sequenceId is required' }), { status: 400 });
  }

  const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(JSON.stringify({ error: 'Resend is not configured' }), { status: 500 });
  }

  const db = createSupabaseAdminClient();
  const { data: seq, error: seqErr } = await db
    .from('email_sequences')
    .select('id, step, leads ( id, email, status, source )')
    .eq('id', sequenceId)
    .single();

  if (seqErr || !seq) {
    return new Response(JSON.stringify({ error: 'sequence not found' }), { status: 404 });
  }

  const lead = Array.isArray(seq.leads) ? seq.leads[0] : seq.leads;
  if (!lead?.email) {
    return new Response(JSON.stringify({ error: 'lead has no email' }), { status: 400 });
  }
  if (lead.status === 'unsubscribed') {
    return new Response(JSON.stringify({ error: 'this lead has unsubscribed' }), { status: 400 });
  }

  let subject = '';
  let html = '';
  if (seq.step === 2) {
    subject = 'Did you get a chance to look at this?';
    html = buildJ2Email(lead.email, lead.source);
  } else if (seq.step === 5) {
    subject = 'What we deployed in week one, and what it saved';
    html = buildJ5Email(lead.email, lead.source);
  } else {
    return new Response(JSON.stringify({ error: 'step 0 is sent at capture time, nothing to resend' }), { status: 400 });
  }

  const resend = new Resend(resendKey);
  try {
    await resend.emails.send({
      from: 'Steve at PURIST <hello@purist.online>',
      to: [lead.email],
      subject,
      replyTo: 'hello@purist.online',
      html,
    });
    await db.from('email_sequences').update({ status: 'sent', sent_at: new Date().toISOString() }).eq('id', sequenceId);
    return new Response(JSON.stringify({ result: 'sent', email: lead.email }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    await db.from('email_sequences').update({ status: 'failed' }).eq('id', sequenceId);
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
