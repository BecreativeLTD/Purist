import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, page, source, timestamp } = body;

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      // Silently succeed if email service not configured — UX not affected
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendKey);
    const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

    await resend.emails.send({
      from: 'PURIST <hello@purist.online>',
      to: [notifyEmail],
      subject: `New lead captured — ${email} · ${source ?? 'unknown'}`,
      html: `<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;"><div style="background:#fff;border-radius:12px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e8e8e8;"><h2 style="font-size:16px;margin:0 0 6px;color:#0a0a0a;">New lead captured</h2><p style="font-size:12px;color:#aaa;margin:0 0 20px;">Via ${source ?? 'unknown'}</p><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;margin-bottom:10px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Email</div><div style="font-size:14px;color:#0a0a0a;font-weight:600;">${email}</div></div><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;margin-bottom:10px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Source</div><div style="font-size:13px;color:#0a0a0a;">${source ?? '—'}</div></div><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;margin-bottom:10px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Page</div><div style="font-size:13px;color:#0a0a0a;">${page ?? '—'}</div></div><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Timestamp</div><div style="font-size:13px;color:#0a0a0a;">${timestamp ?? new Date().toISOString()}</div></div></div></div>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
