import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { requireAdmin } from '~/lib/require-admin';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const { leadId, subject, message } = body as { leadId?: string; subject?: string; message?: string };

  if (!leadId || !subject || !message) {
    return new Response(JSON.stringify({ error: 'leadId, subject, and message are required' }), { status: 400 });
  }

  const resendKey = import.meta.env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(JSON.stringify({ error: 'Resend is not configured' }), { status: 500 });
  }

  const db = createSupabaseAdminClient();
  const { data: lead, error: leadErr } = await db.from('leads').select('email, status').eq('id', leadId).single();
  if (leadErr || !lead) {
    return new Response(JSON.stringify({ error: 'lead not found' }), { status: 404 });
  }
  if (lead.status === 'unsubscribed') {
    return new Response(JSON.stringify({ error: 'this lead has unsubscribed' }), { status: 400 });
  }

  const resend = new Resend(resendKey);
  try {
    await resend.emails.send({
      from: 'Steve at PURIST <hello@purist.online>',
      to: [lead.email],
      subject,
      replyTo: 'hello@purist.online',
      html: message.replace(/\n/g, '<br>'),
    });
    return new Response(JSON.stringify({ result: 'sent', email: lead.email }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
