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
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">

  <!-- Header -->
  <div style="background:#0A0A0A;border-radius:16px 16px 0 0;padding:40px 32px 28px;text-align:center;">
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;margin-bottom:16px;font-weight:600;">Welcome to PURIST</div>
    <h1 style="font-size:26px;color:#F8F6F1;margin:0 0 12px;font-weight:300;line-height:1.25;">You're in. Here's what<br/>you just unlocked.</h1>
    <p style="font-size:13px;color:rgba(248,246,241,0.45);line-height:1.7;margin:0;">Every Tuesday, straight to your inbox. No fluff, no sponsorships.</p>
  </div>

  <!-- What to expect -->
  <div style="background:#0A0A0A;padding:0 32px 32px;">
    <div style="background:rgba(248,246,241,0.04);border:1px solid rgba(248,246,241,0.08);border-radius:12px;padding:24px;">
      <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(248,246,241,0.35);margin-bottom:16px;font-weight:600;">What you'll get every week</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(248,246,241,0.06);vertical-align:top;width:32px;">
            <div style="width:24px;height:24px;background:rgba(232,180,176,0.12);border-radius:6px;text-align:center;line-height:24px;font-size:12px;">1</div>
          </td>
          <td style="padding:10px 0 10px 12px;border-bottom:1px solid rgba(248,246,241,0.06);">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:2px;">Workflow teardown</div>
            <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">A real client workflow dissected step-by-step. What it does, why it works, and how to build it yourself.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(248,246,241,0.06);vertical-align:top;">
            <div style="width:24px;height:24px;background:rgba(232,180,176,0.12);border-radius:6px;text-align:center;line-height:24px;font-size:12px;">2</div>
          </td>
          <td style="padding:10px 0 10px 12px;border-bottom:1px solid rgba(248,246,241,0.06);">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:2px;">ROI case study</div>
            <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">Real numbers from a real deployment. Hours saved, revenue impact, and the exact automation stack used.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(248,246,241,0.06);vertical-align:top;">
            <div style="width:24px;height:24px;background:rgba(232,180,176,0.12);border-radius:6px;text-align:center;line-height:24px;font-size:12px;">3</div>
          </td>
          <td style="padding:10px 0 10px 12px;border-bottom:1px solid rgba(248,246,241,0.06);">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:2px;">AI agent tip</div>
            <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">One practical technique for using Claude AI in production workflows. Prompt patterns, tool use, and edge cases.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;vertical-align:top;">
            <div style="width:24px;height:24px;background:rgba(232,180,176,0.12);border-radius:6px;text-align:center;line-height:24px;font-size:12px;">4</div>
          </td>
          <td style="padding:10px 0 10px 12px;">
            <div style="font-size:13px;color:#F8F6F1;font-weight:600;margin-bottom:2px;">Industry spotlight</div>
            <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">Automation opportunities in one vertical: dental, legal, agency, e-commerce, or real estate. Rotating weekly.</div>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Instant value: 5 quick wins -->
  <div style="background:#0A0A0A;padding:0 32px 32px;">
    <div style="background:rgba(232,180,176,0.05);border:1px solid rgba(232,180,176,0.12);border-radius:12px;padding:24px;">
      <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#E8B4B0;margin-bottom:4px;font-weight:600;">Starter gift</div>
      <div style="font-size:16px;color:#F8F6F1;font-weight:400;margin-bottom:16px;line-height:1.3;">5 automations you can deploy this week</div>

      <div style="margin-bottom:12px;padding:12px;background:rgba(248,246,241,0.03);border-radius:8px;">
        <div style="font-size:12px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">1. Missed call → SMS callback</div>
        <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">When a call is missed, auto-send a branded SMS: "Sorry we missed you. Book a callback here: [link]." Recovers 35% of lost calls.</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:4px;">Stack: Twilio + n8n + Cal.com · Setup: 2 hours</div>
      </div>

      <div style="margin-bottom:12px;padding:12px;background:rgba(248,246,241,0.03);border-radius:8px;">
        <div style="font-size:12px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">2. New lead → CRM + welcome sequence</div>
        <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">Form submission triggers CRM entry, Slack notification, and a 3-email welcome sequence. No lead falls through the cracks.</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:4px;">Stack: n8n + HubSpot + Resend · Setup: 3 hours</div>
      </div>

      <div style="margin-bottom:12px;padding:12px;background:rgba(248,246,241,0.03);border-radius:8px;">
        <div style="font-size:12px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">3. Invoice auto-generation on project completion</div>
        <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">When a project status changes to "Done" in your PM tool, auto-generate and send the invoice. Zero manual accounting.</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:4px;">Stack: n8n + Notion/ClickUp + QuickBooks · Setup: 4 hours</div>
      </div>

      <div style="margin-bottom:12px;padding:12px;background:rgba(248,246,241,0.03);border-radius:8px;">
        <div style="font-size:12px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">4. AI review request after service</div>
        <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">48h after a service is delivered, Claude drafts a personalised review request email referencing the specific service. 3x more Google reviews.</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:4px;">Stack: n8n + Claude + Gmail · Setup: 2 hours</div>
      </div>

      <div style="padding:12px;background:rgba(248,246,241,0.03);border-radius:8px;">
        <div style="font-size:12px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">5. Weekly client report on autopilot</div>
        <div style="font-size:11px;color:rgba(248,246,241,0.4);line-height:1.5;">Every Friday, pull data from your tools, have Claude write a summary with insights, and email it as a branded PDF. Clients love it.</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:4px;">Stack: n8n + Claude + Google Sheets + Resend · Setup: 5 hours</div>
      </div>
    </div>
  </div>

  <!-- Stats bar -->
  <div style="background:#0A0A0A;padding:0 32px 32px;">
    <table style="width:100%;border-collapse:collapse;background:rgba(248,246,241,0.03);border-radius:10px;overflow:hidden;">
      <tr>
        <td style="padding:16px;text-align:center;border-right:1px solid rgba(248,246,241,0.06);width:33%;">
          <div style="font-size:20px;color:#E8B4B0;font-weight:600;line-height:1;">312+</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Deployments</div>
        </td>
        <td style="padding:16px;text-align:center;border-right:1px solid rgba(248,246,241,0.06);width:33%;">
          <div style="font-size:20px;color:#F8F6F1;font-weight:600;line-height:1;">14h</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Saved / week</div>
        </td>
        <td style="padding:16px;text-align:center;width:33%;">
          <div style="font-size:20px;color:#4ADE80;font-weight:600;line-height:1;">99.97%</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Uptime</div>
        </td>
      </tr>
    </table>
  </div>

  <!-- CTA -->
  <div style="background:#0A0A0A;padding:0 32px 32px;text-align:center;">
    <p style="font-size:14px;color:#F8F6F1;margin:0 0 6px;">Want us to build these for you?</p>
    <p style="font-size:12px;color:rgba(248,246,241,0.4);margin:0 0 20px;line-height:1.6;">Book a free 45-minute automation audit. We'll map your workflows and show you exactly what to automate first.</p>
    <a href="https://purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:14px 32px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.02em;">Book your free audit</a>
    <p style="font-size:10px;color:rgba(248,246,241,0.25);margin-top:12px;">Use code <strong style="color:rgba(248,246,241,0.5);">PURISTAUDIT</strong> for priority scheduling</p>
  </div>

  <!-- Resources -->
  <div style="background:#0A0A0A;padding:0 32px 28px;">
    <div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:20px;">
      <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(248,246,241,0.3);margin-bottom:12px;font-weight:600;">While you wait for Tuesday</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;">
            <a href="https://purist.online/pages/wall-of-health" style="font-size:12px;color:#E8B4B0;text-decoration:none;font-weight:500;">Client case studies →</a>
            <div style="font-size:10px;color:rgba(248,246,241,0.3);margin-top:2px;">Real results from dental, legal, and agency deployments</div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <a href="https://github.com/BecreativeLTD/claude-skills" style="font-size:12px;color:#E8B4B0;text-decoration:none;font-weight:500;">329 Claude AI skills (open-source) →</a>
            <div style="font-size:10px;color:rgba(248,246,241,0.3);margin-top:2px;">Free production-ready skills for Claude Code</div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <a href="https://purist.online/pages/ingredients" style="font-size:12px;color:#E8B4B0;text-decoration:none;font-weight:500;">Our integration catalogue →</a>
            <div style="font-size:10px;color:rgba(248,246,241,0.3);margin-top:2px;">500+ tools we connect: CRMs, accounting, scheduling, and more</div>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#0A0A0A;border-radius:0 0 16px 16px;padding:0 32px 28px;">
    <div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:20px;text-align:center;">
      <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(248,246,241,0.2);margin-bottom:12px;">PURIST · Becreative LTD</div>
      <div style="margin-bottom:12px;">
        <a href="https://purist.online" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 8px;">Website</a>
        <a href="https://www.linkedin.com/company/purist-automation" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 8px;">LinkedIn</a>
        <a href="https://twitter.com/purist_hq" style="font-size:11px;color:rgba(248,246,241,0.35);text-decoration:none;margin:0 8px;">Twitter</a>
      </div>
      <p style="font-size:10px;color:rgba(248,246,241,0.15);line-height:1.5;margin:0;">
        You received this because you subscribed at purist.online.<br/>
        <a href="https://purist.online/unsubscribe" style="color:rgba(248,246,241,0.25);text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  </div>

</div>
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
