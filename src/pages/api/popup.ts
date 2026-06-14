import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }
    const resend = new Resend(resendKey);
    const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

    await resend.emails.send({
      from: 'PURIST Leads <hello@purist.online>',
      to: [notifyEmail],
      subject: `New popup lead — ${email}`,
      html: `<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;"><div style="background:#fff;border-radius:12px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e8e8e8;"><h2 style="font-size:16px;margin:0 0 6px;color:#0a0a0a;">New popup lead</h2><p style="font-size:12px;color:#aaa;margin:0 0 20px;">Submitted via the exit-intent popup</p><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;margin-bottom:20px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Email</div><div style="font-size:14px;color:#0a0a0a;font-weight:600;">${email}</div></div><a href="mailto:${email}" style="display:inline-block;background:#E8B4B0;color:#0a0a0a;padding:10px 20px;border-radius:7px;font-size:12px;font-weight:600;text-decoration:none;">Reply to lead →</a></div></div>`,
    });

    await resend.emails.send({
      from: 'PURIST <hello@purist.online>',
      to: [email],
      subject: `Your free automation audit — here's what happens next`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">

<tr><td style="background:#0A0A0A;border-radius:20px 20px 0 0;padding:48px 40px 36px;text-align:center;">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:72px;font-weight:700;letter-spacing:-0.03em;line-height:0.85;color:#E8B4B0;margin-bottom:32px;">PURIST<span style="font-size:18px;vertical-align:super;font-weight:500;">&reg;</span></div>
<div style="width:60px;height:1px;background:rgba(232,180,176,0.3);margin:0 auto 24px;"></div>
<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:30px;color:#F8F6F1;margin:0 0 14px;font-weight:300;line-height:1.2;">Your free audit is<br/>being prepared.</h1>
<p style="font-size:14px;color:rgba(248,246,241,0.45);line-height:1.7;margin:0;max-width:400px;display:inline-block;">A PURIST engineer will reach out within <span style="color:#E8B4B0;font-weight:600;">1 business day</span> to schedule your 45-minute automation audit.</p>
</td></tr>

<tr><td style="background:#0A0A0A;padding:0 40px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(248,246,241,0.04);border:1px solid rgba(248,246,241,0.08);border-radius:14px;">
<tr><td style="padding:28px 28px 8px;">
<div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(248,246,241,0.35);margin-bottom:20px;font-weight:700;">What happens next</div>
</td></tr>
<tr><td style="padding:0 28px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${[
  ['We review your business', 'Before the call, we research your industry, tools, and common bottlenecks so the audit is immediately useful.'],
  ['45-minute audit call', 'We map your manual processes together and identify the top 3 automations that will save you the most time and money.'],
  ['You receive a deployment plan', 'Within 48 hours, you get a detailed plan with estimated hours saved, tools needed, and a fixed-price quote. No obligation.'],
].map(([title, desc], i, arr) => `<tr>
<td style="padding:14px 0;${i < arr.length-1 ? 'border-bottom:1px solid rgba(248,246,241,0.06);' : ''}vertical-align:top;width:40px;">
<div style="width:28px;height:28px;background:rgba(232,180,176,0.15);border-radius:8px;text-align:center;line-height:28px;font-size:12px;color:#E8B4B0;font-weight:700;">${i+1}</div>
</td>
<td style="padding:14px 0 14px 14px;${i < arr.length-1 ? 'border-bottom:1px solid rgba(248,246,241,0.06);' : ''}">
<div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">${title}</div>
<div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">${desc}</div>
</td>
</tr>`).join('')}
</table>
</td></tr>
</table>
</td></tr>

<tr><td style="background:#0A0A0A;padding:0 40px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(248,246,241,0.03);border-radius:12px;overflow:hidden;">
<tr>
<td style="padding:20px;text-align:center;border-right:1px solid rgba(248,246,241,0.06);width:33%;">
<div style="font-family:Georgia,serif;font-size:24px;color:#E8B4B0;font-weight:600;line-height:1;">312+</div>
<div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.12em;margin-top:6px;">Clients</div>
</td>
<td style="padding:20px;text-align:center;border-right:1px solid rgba(248,246,241,0.06);width:33%;">
<div style="font-family:Georgia,serif;font-size:24px;color:#F8F6F1;font-weight:600;line-height:1;">14h</div>
<div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.12em;margin-top:6px;">Saved / week</div>
</td>
<td style="padding:20px;text-align:center;width:33%;">
<div style="font-family:Georgia,serif;font-size:24px;color:#4ADE80;font-weight:600;line-height:1;">99.97%</div>
<div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.12em;margin-top:6px;">Uptime</div>
</td>
</tr>
</table>
</td></tr>

<tr><td style="background:#0A0A0A;padding:0 40px 36px;text-align:center;">
<p style="font-family:Georgia,serif;font-size:18px;color:#F8F6F1;margin:0 0 8px;font-weight:400;">Want to speed things up?</p>
<p style="font-size:13px;color:rgba(248,246,241,0.42);margin:0 0 24px;line-height:1.7;">Tell us more about your business so we can prepare a more targeted audit.</p>
<a href="https://www.purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:16px 40px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">Complete your audit request →</a>
</td></tr>

<tr><td style="background:#0A0A0A;border-radius:0 0 20px 20px;padding:0 40px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(248,246,241,0.06);">
<tr><td style="padding-top:28px;text-align:center;">
<div style="font-family:Georgia,serif;font-size:28px;font-weight:700;letter-spacing:-0.02em;color:rgba(232,180,176,0.25);margin-bottom:16px;">PURIST<span style="font-size:8px;vertical-align:super;">&reg;</span></div>
<div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(248,246,241,0.18);margin-bottom:14px;">Becreative LTD &middot; Registered in England &amp; Wales</div>
<div style="margin-bottom:14px;">
<a href="https://www.purist.online" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 10px;">Website</a>
<a href="https://www.linkedin.com/company/purist-automation" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 10px;">LinkedIn</a>
<a href="https://twitter.com/purist_hq" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 10px;">Twitter</a>
</div>
<p style="font-size:10px;color:rgba(248,246,241,0.15);line-height:1.6;margin:0;">You received this because you requested an automation audit at purist.online.</p>
</td></tr>
</table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
