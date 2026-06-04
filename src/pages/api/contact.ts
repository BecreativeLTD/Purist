import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { firstName, lastName, email, topic, projectId, message } = await request.json();

    if (!firstName || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
    if (!resendKey) console.error('Resend API key missing — check env var named "Resend"');
    const resend = new Resend(resendKey);
    const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

    // Notification to team
    const notifResult = await resend.emails.send({
      from: 'PURIST Contact <hello@purist.online>',
      to: [notifyEmail],
      subject: `📩 Contact form — ${firstName} ${lastName} · ${topic || 'General'}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 560px; margin: 0 auto; border: 1px solid #e8e8e8; }
  h1 { font-size: 18px; margin: 0 0 4px; color: #0a0a0a; }
  .sub { font-size: 12px; color: #aaa; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .field { background: #f9f9f9; border-radius: 8px; padding: 11px 13px; }
  .field-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.12em; color: #aaa; margin-bottom: 3px; font-weight: 600; }
  .field-value { font-size: 13px; color: #0a0a0a; font-weight: 500; }
  .msg { background: #f9f9f9; border-radius: 8px; padding: 16px; font-size: 13px; color: #444; line-height: 1.65; }
  .cta { display: inline-block; background: #0a0a0a; color: #fff; padding: 11px 22px; border-radius: 7px; font-size: 12px; font-weight: 600; text-decoration: none; margin-top: 20px; }
</style></head>
<body>
<div class="card">
  <h1>New Contact Message</h1>
  <p class="sub">From the contact form</p>
  <div class="grid">
    <div class="field"><div class="field-label">Name</div><div class="field-value">${firstName} ${lastName}</div></div>
    <div class="field"><div class="field-label">Email</div><div class="field-value">${email}</div></div>
    <div class="field"><div class="field-label">Topic</div><div class="field-value">${topic || '—'}</div></div>
    <div class="field"><div class="field-label">Project ID</div><div class="field-value">${projectId || '—'}</div></div>
  </div>
  <div class="msg">${message.replace(/\n/g, '<br>')}</div>
  <a href="mailto:${email}" class="cta">Reply to ${firstName} →</a>
</div>
</body>
</html>`,
    });
    if (notifResult.error) console.error('Resend notification error:', JSON.stringify(notifResult.error));
    else console.log('Resend notification sent, id:', notifResult.data?.id);

    // Auto-reply to sender
    const confirmResult = await resend.emails.send({
      from: 'PURIST <hello@purist.online>',
      to: [email],
      subject: `We received your message`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .card { background: #0a0a0a; border-radius: 12px; padding: 36px; max-width: 520px; margin: 0 auto; }
  h1 { font-size: 22px; color: #fff; margin: 0 0 10px; font-weight: 400; letter-spacing: -0.01em; }
  p { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.7; margin: 0 0 14px; }
  .highlight { color: #E8B4B0; }
  .divider { height: 1px; background: rgba(255,255,255,0.07); margin: 22px 0; }
  .cta { display: inline-block; background: #E8B4B0; color: #0a0a0a; padding: 11px 22px; border-radius: 7px; font-size: 12px; font-weight: 600; text-decoration: none; }
</style></head>
<body>
<div class="card">
  <h1>Hi ${firstName},</h1>
  <p>Your message has been received. We'll get back to you within <span class="highlight">1 business day</span>.</p>
  <div class="divider"></div>
  <p>In the meantime, you can read our automation guides or book a free audit call if you're ready to get started.</p>
  <a href="https://purist.online/pages/welcome" class="cta">Book a free audit →</a>
</div>
</body>
</html>`,
    });
    if (confirmResult.error) console.error('Resend confirmation error:', JSON.stringify(confirmResult.error));
    else console.log('Resend confirmation sent, id:', confirmResult.data?.id);

    return new Response(JSON.stringify({
      success: true,
      _debug: { notifOk: !notifResult.error, confirmOk: !confirmResult.error },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
