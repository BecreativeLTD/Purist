import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { recordLeadEvent } from '../../lib/lead-scoring';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, slug, templateName, page } = body;

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    // 1. Save the lead, isolated, never blocks the download.
    try {
      await recordLeadEvent({
        email,
        eventType: 'template_download',
        source: 'n8n_templates',
        page: page || `/pages/n8n-templates/${slug}`,
        category: templateName || slug,
      });
    } catch { /* silent */ }

    // 2. Notify the team (fire & forget) + send the visitor a follow-up, best-effort.
    const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

      resend.emails.send({
        from: 'PURIST <hello@purist.online>',
        to: [notifyEmail],
        subject: `n8n template download: ${email} · ${templateName || slug}`,
        html: `<div style="font-family:-apple-system,sans-serif;padding:20px;"><p><strong>${email}</strong> downloaded <strong>${templateName || slug}</strong>.</p></div>`,
      }).catch(() => {});

      resend.emails.send({
        from: 'Steve at PURIST <hello@purist.online>',
        to: [email],
        replyTo: 'hello@purist.online',
        subject: `Your n8n template: ${templateName || slug}`,
        html: `<div style="font-family:-apple-system,sans-serif;background:#0A0A0A;padding:32px;"><div style="max-width:480px;margin:0 auto;background:#131313;border:1px solid #262626;border-radius:16px;padding:28px;"><p style="color:#F8F6F1;font-size:15px;line-height:1.6;margin:0 0 14px;">Hi,</p><p style="color:#F8F6F1;font-size:15px;line-height:1.6;margin:0 0 14px;">Your download of <strong>${templateName || slug}</strong> is on its way, the .json file should have started downloading already.</p><p style="color:#F8F6F1;font-size:15px;line-height:1.6;margin:0 0 14px;">If you'd rather have it deployed, configured with your real credentials and kept running, that's what we do. Reply to this email or grab a free 45-minute audit.</p><a href="https://www.purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;text-decoration:none;">Get my free automation plan</a></div></div>`,
      }).catch(() => {});
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[n8n-template-download]', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
