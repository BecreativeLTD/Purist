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
      from: 'PURIST <hello@purist.online>',
      to: [notifyEmail],
      subject: `New newsletter subscriber — ${email}`,
      html: `<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;"><div style="background:#fff;border-radius:12px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e8e8e8;"><h2 style="font-size:16px;margin:0 0 6px;color:#0a0a0a;">New newsletter subscriber</h2><p style="font-size:12px;color:#aaa;margin:0 0 20px;">Subscribed via the footer form</p><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Email</div><div style="font-size:14px;color:#0a0a0a;font-weight:600;">${email}</div></div></div></div>`,
    });

    const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const items = [
      ['Workflow teardown', 'A real client workflow dissected step-by-step. What it does, why it works, and how to build it yourself.'],
      ['ROI case study', 'Real numbers from a real deployment. Hours saved, revenue impact, and the exact automation stack used.'],
      ['AI agent tip', 'One practical technique for using Claude AI in production workflows. Prompt patterns, tool use, and edge cases.'],
      ['Industry spotlight', 'Automation opportunities in one vertical: dental, legal, agency, e-commerce, or real estate. Rotating weekly.'],
    ];
    const automations = [
      ['Missed call → SMS callback', 'When a call is missed, auto-send a branded SMS: "Sorry we missed you. Book a callback here." Recovers 35% of lost calls.', 'Twilio + n8n + Cal.com', '2h setup'],
      ['New lead → CRM + welcome sequence', 'Form submission triggers CRM entry, Slack notification, and a 3-email welcome sequence. No lead falls through the cracks.', 'n8n + HubSpot + Resend', '3h setup'],
      ['Invoice auto-generation on project completion', 'When a project status changes to "Done," auto-generate and send the invoice. Zero manual accounting.', 'n8n + Notion + QuickBooks', '4h setup'],
      ['AI review request after service', '48h after delivery, Claude drafts a personalised review request referencing the specific service. 3× more Google reviews.', 'n8n + Claude + Gmail', '2h setup'],
      ['Weekly client report on autopilot', 'Every Friday, pull data from your tools, have Claude write a summary with insights, and email it as a branded PDF.', 'n8n + Claude + Sheets + Resend', '5h setup'],
    ];

    const welcomeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark">
<title>Welcome to PURIST</title>
<style>
body,table,td{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
body{margin:0;padding:0;background:#0A0A0A;}
table{border-collapse:collapse!important;}
@media only screen and (max-width:660px){.email-container{width:100%!important;}.pad{padding-left:24px!important;padding-right:24px!important;}.htitle{font-size:56px!important;}.hh1{font-size:22px!important;}}
</style>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;">
<tr><td style="display:none!important;visibility:hidden;font-size:1px;color:#0A0A0A;line-height:1px;max-height:0;overflow:hidden;">5 automations you can deploy this week — workflow teardowns, ROI case studies, and AI agent tips every Tuesday.</td></tr>
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" class="email-container" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">

<tr><td style="padding:0 40px;" class="pad">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:16px 0;border-bottom:1px solid rgba(248,246,241,0.06);">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(248,246,241,0.25);font-weight:600;">Issue #1</td>
<td align="right" style="font-size:11px;color:rgba(248,246,241,0.2);">${now}</td>
</tr></table>
</td></tr></table>
</td></tr>

<tr><td style="padding:56px 40px 20px;text-align:center;" class="pad">
<div class="htitle" style="font-family:Georgia,'Times New Roman',serif;font-size:80px;font-weight:700;letter-spacing:-0.04em;line-height:0.85;color:#E8B4B0;">PURIST<span style="font-size:20px;vertical-align:super;font-weight:500;">&reg;</span></div>
</td></tr>

<tr><td style="padding:24px 40px 0;text-align:center;" class="pad">
<div style="width:48px;height:1px;background:rgba(232,180,176,0.25);margin:0 auto 28px;"></div>
<h1 class="hh1" style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#F8F6F1;margin:0 0 14px;font-weight:300;line-height:1.25;">You're in. Here's what you just unlocked.</h1>
<p style="font-size:14px;color:rgba(248,246,241,0.4);line-height:1.75;margin:0 auto;max-width:380px;">Every Tuesday, straight to your inbox. No fluff. No sponsorships. Just signal.</p>
</td></tr>

<tr><td style="height:40px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(248,246,241,0.08);border-radius:16px;overflow:hidden;">
<tr><td style="background:rgba(248,246,241,0.03);padding:24px 28px 20px;">
<div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(248,246,241,0.3);font-weight:700;">What you'll get every week</div>
</td></tr>
<tr><td style="padding:0 28px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${items.map(([title, desc], i) => `<tr>
<td style="padding:18px 0;${i < items.length-1 ? 'border-bottom:1px solid rgba(248,246,241,0.05);' : ''}vertical-align:top;width:44px;">
<div style="width:32px;height:32px;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.15);border-radius:10px;text-align:center;line-height:32px;font-family:Georgia,serif;font-size:13px;color:#E8B4B0;font-weight:600;">${i+1}</div>
</td>
<td style="padding:18px 0 18px 16px;${i < items.length-1 ? 'border-bottom:1px solid rgba(248,246,241,0.05);' : ''}">
<div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:5px;">${title}</div>
<div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;">${desc}</div>
</td>
</tr>`).join('')}
</table>
</td></tr>
</table>
</td></tr>

<tr><td style="height:32px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(232,180,176,0.15);border-radius:16px;overflow:hidden;">
<tr><td style="background:rgba(232,180,176,0.06);padding:28px 28px 24px;border-bottom:1px solid rgba(232,180,176,0.1);">
<div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:8px;">Starter gift</div>
<div style="font-family:Georgia,serif;font-size:22px;color:#F8F6F1;font-weight:400;line-height:1.25;">5 automations you can deploy this week</div>
</td></tr>
${automations.map(([title, desc, tools, time], i) => `<tr><td style="padding:20px 28px;${i < automations.length-1 ? 'border-bottom:1px solid rgba(248,246,241,0.04);' : ''}">
<div style="font-size:13.5px;color:#F8F6F1;font-weight:600;margin-bottom:6px;">${i+1}. ${title}</div>
<div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;margin-bottom:8px;">${desc}</div>
<span style="display:inline-block;background:rgba(248,246,241,0.05);border-radius:6px;padding:5px 10px;font-size:10px;color:rgba(248,246,241,0.3);margin-right:6px;">${tools}</span>
<span style="display:inline-block;background:rgba(74,222,128,0.08);border-radius:6px;padding:5px 10px;font-size:10px;color:rgba(74,222,128,0.6);">${time}</span>
</td></tr>`).join('')}
</table>
</td></tr>

<tr><td style="height:32px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(248,246,241,0.06);border-radius:14px;overflow:hidden;">
<tr>
<td style="padding:24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);width:33%;">
<div style="font-family:Georgia,serif;font-size:28px;color:#E8B4B0;font-weight:600;line-height:1;margin-bottom:6px;">312+</div>
<div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Deployments</div>
</td>
<td style="padding:24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);width:33%;">
<div style="font-family:Georgia,serif;font-size:28px;color:#F8F6F1;font-weight:600;line-height:1;margin-bottom:6px;">14h</div>
<div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Saved / week</div>
</td>
<td style="padding:24px;text-align:center;width:33%;">
<div style="font-family:Georgia,serif;font-size:28px;color:#4ADE80;font-weight:600;line-height:1;margin-bottom:6px;">99.97%</div>
<div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Uptime</div>
</td>
</tr>
</table>
</td></tr>

<tr><td style="height:40px;"></td></tr>

<tr><td style="padding:0 40px;text-align:center;" class="pad">
<div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:36px;">
<p style="font-family:Georgia,serif;font-size:20px;color:#F8F6F1;margin:0 0 8px;font-weight:400;">Want us to build these for you?</p>
<p style="font-size:13px;color:rgba(248,246,241,0.38);margin:0 0 28px;line-height:1.75;">Book a free 45-minute automation audit. We map your workflows and show you exactly what to automate first.</p>
<a href="https://purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:16px 44px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">Book your free audit →</a>
</div>
</td></tr>

<tr><td style="height:48px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(248,246,241,0.06);">
<tr><td style="padding:32px 0;text-align:center;">
<div style="font-family:Georgia,serif;font-size:32px;font-weight:700;letter-spacing:-0.03em;color:rgba(232,180,176,0.2);margin-bottom:18px;">PURIST<span style="font-size:9px;vertical-align:super;">&reg;</span></div>
<div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(248,246,241,0.14);margin-bottom:16px;font-weight:500;">Becreative LTD &middot; Registered in England &amp; Wales</div>
<div style="margin-bottom:18px;">
<a href="https://purist.online" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">Website</a>
<a href="https://www.linkedin.com/company/purist-automation" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">LinkedIn</a>
<a href="https://twitter.com/purist_hq" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">Twitter / X</a>
</div>
<p style="font-size:10px;color:rgba(248,246,241,0.12);line-height:1.7;margin:0;">You received this because you subscribed at purist.online.<br/><a href="https://purist.online/pages/privacy-policy" style="color:rgba(248,246,241,0.2);text-decoration:underline;">Privacy policy</a></p>
</td></tr>
</table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    await resend.emails.send({
      from: 'PURIST <hello@purist.online>',
      to: [email],
      subject: `Welcome to PURIST — 5 automations you can deploy this week`,
      html: welcomeHtml,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
