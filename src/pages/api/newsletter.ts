import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
 try {
   const { email } = await request.json();
   if (!email || !email.includes('@')) {
     return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
   }

   const resend = new Resend(import.meta.env.Resend || import.meta.env.RESEND_API_KEY);
   const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

   // Notify team
   const r1 = await resend.emails.send({
     from: 'PURIST <hello@purist.online>',
     to: [notifyEmail],
     subject: `📬 New newsletter subscriber ${email}`,
     html: `<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;"><div style="background:#fff;border-radius:12px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e8e8e8;"><h2 style="font-size:16px;margin:0 0 6px;color:#0a0a0a;">New newsletter subscriber</h2><p style="font-size:12px;color:#aaa;margin:0 0 20px;">Subscribed via the footer form</p><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Email</div><div style="font-size:14px;color:#0a0a0a;font-weight:600;">${email}</div></div></div></div>`,
   });
   if (r1.error) console.error('Newsletter notify error:', JSON.stringify(r1.error));

   // Welcome email to subscriber — comprehensive first-touch
   const welcomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">

  <!-- HERO with giant wordmark -->
  <tr><td style="background:#0A0A0A;border-radius:20px 20px 0 0;padding:48px 40px 36px;text-align:center;">
    <!-- Giant PURIST wordmark like footer -->
    <div style="font-family:Georgia,'Times New Roman',serif;font-size:72px;font-weight:700;letter-spacing:-0.03em;line-height:0.85;color:#E8B4B0;margin-bottom:32px;">PURIST<span style="font-size:18px;vertical-align:super;font-weight:500;">&reg;</span></div>
    <div style="width:60px;height:1px;background:rgba(232,180,176,0.3);margin:0 auto 24px;"></div>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:30px;color:#F8F6F1;margin:0 0 14px;font-weight:300;line-height:1.2;letter-spacing:-0.01em;">You're in. Here's what<br/>you just unlocked.</h1>
    <p style="font-size:14px;color:rgba(248,246,241,0.45);line-height:1.7;margin:0;max-width:400px;display:inline-block;">Every Tuesday, straight to your inbox.<br/>No fluff, no sponsorships.</p>
  </td></tr>

  <!-- What to expect -->
  <tr><td style="background:#0A0A0A;padding:0 40px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(248,246,241,0.04);border:1px solid rgba(248,246,241,0.08);border-radius:14px;">
      <tr><td style="padding:28px 28px 8px;">
        <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(248,246,241,0.35);margin-bottom:20px;font-weight:700;">What you'll get every week</div>
      </td></tr>
      <tr><td style="padding:0 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid rgba(248,246,241,0.06);vertical-align:top;width:40px;">
              <div style="width:28px;height:28px;background:rgba(232,180,176,0.15);border-radius:8px;text-align:center;line-height:28px;font-size:12px;color:#E8B4B0;font-weight:700;">1</div>
            </td>
            <td style="padding:14px 0 14px 14px;border-bottom:1px solid rgba(248,246,241,0.06);">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">Workflow teardown</div>
              <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">A real client workflow dissected step-by-step. What it does, why it works, and how to build it yourself.</div>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid rgba(248,246,241,0.06);vertical-align:top;width:40px;">
              <div style="width:28px;height:28px;background:rgba(232,180,176,0.15);border-radius:8px;text-align:center;line-height:28px;font-size:12px;color:#E8B4B0;font-weight:700;">2</div>
            </td>
            <td style="padding:14px 0 14px 14px;border-bottom:1px solid rgba(248,246,241,0.06);">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">ROI case study</div>
              <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">Real numbers from a real deployment. Hours saved, revenue impact, and the exact automation stack used.</div>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid rgba(248,246,241,0.06);vertical-align:top;width:40px;">
              <div style="width:28px;height:28px;background:rgba(232,180,176,0.15);border-radius:8px;text-align:center;line-height:28px;font-size:12px;color:#E8B4B0;font-weight:700;">3</div>
            </td>
            <td style="padding:14px 0 14px 14px;border-bottom:1px solid rgba(248,246,241,0.06);">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">AI agent tip</div>
              <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">One practical technique for using Claude AI in production workflows. Prompt patterns, tool use, and edge cases.</div>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0 20px;vertical-align:top;width:40px;">
              <div style="width:28px;height:28px;background:rgba(232,180,176,0.15);border-radius:8px;text-align:center;line-height:28px;font-size:12px;color:#E8B4B0;font-weight:700;">4</div>
            </td>
            <td style="padding:14px 0 20px 14px;">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">Industry spotlight</div>
              <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">Automation opportunities in one vertical: dental, legal, agency, e-commerce, or real estate. Rotating weekly.</div>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- Instant value: 5 quick wins -->
  <tr><td style="background:#0A0A0A;padding:0 40px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(232,180,176,0.05);border:1px solid rgba(232,180,176,0.14);border-radius:14px;">
      <tr><td style="padding:28px 28px 8px;">
        <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#E8B4B0;margin-bottom:6px;font-weight:700;">Starter gift</div>
        <div style="font-size:20px;color:#F8F6F1;font-weight:400;margin-bottom:20px;line-height:1.25;font-family:Georgia,'Times New Roman',serif;">5 automations you can deploy this week</div>
      </td></tr>
      <tr><td style="padding:0 28px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:14px 16px;background:rgba(248,246,241,0.04);border-radius:10px;margin-bottom:10px;">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:5px;">1. Missed call &rarr; SMS callback</div>
            <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">When a call is missed, auto-send a branded SMS: &ldquo;Sorry we missed you. Book a callback here.&rdquo; Recovers 35% of lost calls.</div>
            <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:6px;letter-spacing:0.02em;">Stack: Twilio + n8n + Cal.com &middot; Setup: 2 hours</div>
          </td></tr>
          <tr><td style="height:10px;"></td></tr>
          <tr><td style="padding:14px 16px;background:rgba(248,246,241,0.04);border-radius:10px;">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:5px;">2. New lead &rarr; CRM + welcome sequence</div>
            <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">Form submission triggers CRM entry, Slack notification, and a 3-email welcome sequence. No lead falls through the cracks.</div>
            <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:6px;letter-spacing:0.02em;">Stack: n8n + HubSpot + Resend &middot; Setup: 3 hours</div>
          </td></tr>
          <tr><td style="height:10px;"></td></tr>
          <tr><td style="padding:14px 16px;background:rgba(248,246,241,0.04);border-radius:10px;">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:5px;">3. Invoice auto-generation on project completion</div>
            <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">When a project status changes to &ldquo;Done&rdquo; in your PM tool, auto-generate and send the invoice. Zero manual accounting.</div>
            <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:6px;letter-spacing:0.02em;">Stack: n8n + Notion/ClickUp + QuickBooks &middot; Setup: 4 hours</div>
          </td></tr>
          <tr><td style="height:10px;"></td></tr>
          <tr><td style="padding:14px 16px;background:rgba(248,246,241,0.04);border-radius:10px;">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:5px;">4. AI review request after service</div>
            <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">48h after a service is delivered, Claude drafts a personalised review request email referencing the specific service. 3x more Google reviews.</div>
            <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:6px;letter-spacing:0.02em;">Stack: n8n + Claude + Gmail &middot; Setup: 2 hours</div>
          </td></tr>
          <tr><td style="height:10px;"></td></tr>
          <tr><td style="padding:14px 16px;background:rgba(248,246,241,0.04);border-radius:10px;">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:5px;">5. Weekly client report on autopilot</div>
            <div style="font-size:12px;color:rgba(248,246,241,0.42);line-height:1.6;">Every Friday, pull data from your tools, have Claude write a summary with insights, and email it as a branded PDF. Clients love it.</div>
            <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:6px;letter-spacing:0.02em;">Stack: n8n + Claude + Google Sheets + Resend &middot; Setup: 5 hours</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- Stats bar -->
  <tr><td style="background:#0A0A0A;padding:0 40px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(248,246,241,0.03);border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:20px;text-align:center;border-right:1px solid rgba(248,246,241,0.06);width:33%;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#E8B4B0;font-weight:600;line-height:1;">312+</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.12em;margin-top:6px;">Deployments</div>
        </td>
        <td style="padding:20px;text-align:center;border-right:1px solid rgba(248,246,241,0.06);width:33%;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#F8F6F1;font-weight:600;line-height:1;">14h</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.12em;margin-top:6px;">Saved / week</div>
        </td>
        <td style="padding:20px;text-align:center;width:33%;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#4ADE80;font-weight:600;line-height:1;">99.97%</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.12em;margin-top:6px;">Uptime</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#0A0A0A;padding:0 40px 36px;text-align:center;">
    <p style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#F8F6F1;margin:0 0 8px;font-weight:400;">Want us to build these for you?</p>
    <p style="font-size:13px;color:rgba(248,246,241,0.42);margin:0 0 24px;line-height:1.7;">Book a free 45-minute automation audit. We'll map your workflows and show you exactly what to automate first.</p>
    <a href="https://purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:16px 40px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.02em;">Book your free audit</a>
    <p style="font-size:11px;color:rgba(248,246,241,0.25);margin-top:14px;">Use code <strong style="color:rgba(248,246,241,0.5);">PURISTAUDIT</strong> for priority scheduling</p>
  </td></tr>

  <!-- Resources -->
  <tr><td style="background:#0A0A0A;padding:0 40px 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(248,246,241,0.06);">
      <tr><td style="padding-top:24px;">
        <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(248,246,241,0.3);margin-bottom:16px;font-weight:700;">While you wait for Tuesday</div>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <a href="https://purist.online/pages/wall-of-health" style="font-size:13px;color:#E8B4B0;text-decoration:none;font-weight:600;">Client case studies &rarr;</a>
        <div style="font-size:11px;color:rgba(248,246,241,0.32);margin-top:3px;line-height:1.5;">Real results from dental, legal, and agency deployments</div>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <a href="https://purist.online/pages/docs#claude-skills" style="font-size:13px;color:#E8B4B0;text-decoration:none;font-weight:600;">329 Claude AI skills documentation &rarr;</a>
        <div style="font-size:11px;color:rgba(248,246,241,0.32);margin-top:3px;line-height:1.5;">Free production-ready prompt skills for Claude</div>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <a href="https://purist.online/pages/ingredients" style="font-size:13px;color:#E8B4B0;text-decoration:none;font-weight:600;">Our integration catalogue &rarr;</a>
        <div style="font-size:11px;color:rgba(248,246,241,0.32);margin-top:3px;line-height:1.5;">500+ tools we connect: CRMs, accounting, scheduling, and more</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Footer with wordmark -->
  <tr><td style="background:#0A0A0A;border-radius:0 0 20px 20px;padding:0 40px 36px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(248,246,241,0.06);">
      <tr><td style="padding-top:28px;text-align:center;">
        <!-- Mini wordmark -->
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-0.02em;color:rgba(232,180,176,0.25);margin-bottom:16px;">PURIST<span style="font-size:8px;vertical-align:super;">&reg;</span></div>
        <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(248,246,241,0.18);margin-bottom:14px;">Becreative LTD &middot; Registered in England &amp; Wales</div>
        <div style="margin-bottom:14px;">
          <a href="https://purist.online" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 10px;">Website</a>
          <a href="https://www.linkedin.com/company/purist-automation" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 10px;">LinkedIn</a>
          <a href="https://twitter.com/purist_hq" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 10px;">Twitter</a>
        </div>
        <p style="font-size:10px;color:rgba(248,246,241,0.15);line-height:1.6;margin:0;">
          You received this because you subscribed at purist.online.<br/>
          <a href="https://purist.online/unsubscribe" style="color:rgba(248,246,241,0.25);text-decoration:underline;">Unsubscribe</a>
        </p>
      </td></tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

   const r2 = await resend.emails.send({
     from: 'PURIST <hello@purist.online>',
     to: [email],
     subject: `Welcome to PURIST — here are 5 automations you can deploy this week`,
     html: welcomeHtml,
   });
   if (r2.error) console.error('Newsletter welcome error:', JSON.stringify(r2.error));

   return new Response(JSON.stringify({ success: true }), {
     headers: { 'Content-Type': 'application/json' },
   });
 } catch (err) {
   console.error('Newsletter API error:', err);
   return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
 }
};
