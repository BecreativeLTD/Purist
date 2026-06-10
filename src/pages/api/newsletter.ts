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

   // Welcome email to subscriber — ultra pro first-touch
   const welcomeHtml = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Welcome to PURIST</title>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
    body,table,td{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}
    body{margin:0;padding:0;width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
    table{border-collapse:collapse!important;mso-table-lspace:0pt;mso-table-rspace:0pt;}
    @media only screen and (max-width:660px){
      .email-container{width:100%!important;max-width:100%!important;}
      .fluid{width:100%!important;max-width:100%!important;height:auto!important;}
      .stack{display:block!important;width:100%!important;max-width:100%!important;}
      .pad-mobile{padding-left:24px!important;padding-right:24px!important;}
      .hero-title{font-size:56px!important;}
      .h1{font-size:24px!important;}
      .stat-val{font-size:20px!important;}
      .hide-mobile{display:none!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F8F6F1;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;">

<!-- Preheader (hidden text for inbox preview) -->
<tr><td style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;color:#0A0A0A;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  5 automations you can deploy this week + weekly workflow teardowns, ROI case studies, and AI agent tips. &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</td></tr>

<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" class="email-container" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">

  <!-- ━━━ TOP BAR ━━━ -->
  <tr><td style="padding:0 40px 0;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid rgba(248,246,241,0.06);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(248,246,241,0.25);font-weight:600;">Issue #1</td>
              <td align="right" style="font-size:11px;color:rgba(248,246,241,0.2);">${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- ━━━ HERO WORDMARK ━━━ -->
  <tr><td style="padding:56px 40px 20px;text-align:center;" class="pad-mobile">
    <div class="hero-title" style="font-family:Georgia,'Times New Roman',Times,serif;font-size:80px;font-weight:700;letter-spacing:-0.04em;line-height:0.85;color:#E8B4B0;margin-bottom:0;">PURIST<span style="font-size:20px;vertical-align:super;font-weight:500;letter-spacing:0;">&reg;</span></div>
  </td></tr>

  <!-- ━━━ HEADLINE ━━━ -->
  <tr><td style="padding:24px 40px 0;text-align:center;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <div style="width:48px;height:1px;background:rgba(232,180,176,0.25);margin:0 auto 28px;"></div>
        <h1 class="h1" style="font-family:Georgia,'Times New Roman',Times,serif;font-size:28px;color:#F8F6F1;margin:0 0 14px;font-weight:300;line-height:1.25;letter-spacing:-0.01em;">You're in. Here's what<br/>you just unlocked.</h1>
        <p style="font-size:14px;color:rgba(248,246,241,0.4);line-height:1.75;margin:0 auto;max-width:380px;">Every Tuesday, straight to your inbox.<br/>No fluff. No sponsorships. Just signal.</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- ━━━ SPACER ━━━ -->
  <tr><td style="height:40px;"></td></tr>

  <!-- ━━━ WHAT YOU GET ━━━ -->
  <tr><td style="padding:0 40px;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(248,246,241,0.08);border-radius:16px;overflow:hidden;">
      <!-- Card header -->
      <tr><td style="background:rgba(248,246,241,0.03);padding:24px 28px 20px;">
        <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(248,246,241,0.3);font-weight:700;">What you'll get every week</div>
      </td></tr>
      <!-- Items -->
      <tr><td style="padding:0 28px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

          <tr>
            <td style="padding:18px 0;border-bottom:1px solid rgba(248,246,241,0.05);vertical-align:top;width:44px;">
              <div style="width:32px;height:32px;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.15);border-radius:10px;text-align:center;line-height:32px;font-family:Georgia,serif;font-size:13px;color:#E8B4B0;font-weight:600;">1</div>
            </td>
            <td style="padding:18px 0 18px 16px;border-bottom:1px solid rgba(248,246,241,0.05);">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:5px;letter-spacing:-0.01em;">Workflow teardown</div>
              <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;">A real client workflow dissected step-by-step. What it does, why it works, and how to build it yourself.</div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 0;border-bottom:1px solid rgba(248,246,241,0.05);vertical-align:top;width:44px;">
              <div style="width:32px;height:32px;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.15);border-radius:10px;text-align:center;line-height:32px;font-family:Georgia,serif;font-size:13px;color:#E8B4B0;font-weight:600;">2</div>
            </td>
            <td style="padding:18px 0 18px 16px;border-bottom:1px solid rgba(248,246,241,0.05);">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:5px;letter-spacing:-0.01em;">ROI case study</div>
              <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;">Real numbers from a real deployment. Hours saved, revenue impact, and the exact automation stack used.</div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 0;border-bottom:1px solid rgba(248,246,241,0.05);vertical-align:top;width:44px;">
              <div style="width:32px;height:32px;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.15);border-radius:10px;text-align:center;line-height:32px;font-family:Georgia,serif;font-size:13px;color:#E8B4B0;font-weight:600;">3</div>
            </td>
            <td style="padding:18px 0 18px 16px;border-bottom:1px solid rgba(248,246,241,0.05);">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:5px;letter-spacing:-0.01em;">AI agent tip</div>
              <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;">One practical technique for using Claude AI in production workflows. Prompt patterns, tool use, and edge cases.</div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 0 0;vertical-align:top;width:44px;">
              <div style="width:32px;height:32px;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.15);border-radius:10px;text-align:center;line-height:32px;font-family:Georgia,serif;font-size:13px;color:#E8B4B0;font-weight:600;">4</div>
            </td>
            <td style="padding:18px 0 0 16px;">
              <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:5px;letter-spacing:-0.01em;">Industry spotlight</div>
              <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;">Automation opportunities in one vertical: dental, legal, agency, e-commerce, or real estate. Rotating weekly.</div>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ━━━ SPACER ━━━ -->
  <tr><td style="height:32px;"></td></tr>

  <!-- ━━━ STARTER GIFT ━━━ -->
  <tr><td style="padding:0 40px;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(232,180,176,0.15);border-radius:16px;overflow:hidden;">
      <!-- Card header with accent -->
      <tr><td style="background:rgba(232,180,176,0.06);padding:28px 28px 24px;border-bottom:1px solid rgba(232,180,176,0.1);">
        <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:8px;">Starter gift</div>
        <div style="font-family:Georgia,'Times New Roman',Times,serif;font-size:22px;color:#F8F6F1;font-weight:400;line-height:1.25;letter-spacing:-0.01em;">5 automations you can deploy this week</div>
      </td></tr>

      <!-- Automation 1 -->
      <tr><td style="padding:20px 28px;border-bottom:1px solid rgba(248,246,241,0.04);">
        <div style="font-size:13.5px;color:#F8F6F1;font-weight:600;margin-bottom:6px;letter-spacing:-0.01em;">1. Missed call &rarr; SMS callback</div>
        <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;margin-bottom:8px;">When a call is missed, auto-send a branded SMS: &ldquo;Sorry we missed you. Book a callback here.&rdquo; Recovers 35% of lost calls.</div>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(248,246,241,0.05);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(248,246,241,0.3);letter-spacing:0.03em;">Twilio + n8n + Cal.com</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background:rgba(74,222,128,0.08);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(74,222,128,0.6);letter-spacing:0.03em;">2h setup</span>
          </td>
        </tr></table>
      </td></tr>

      <!-- Automation 2 -->
      <tr><td style="padding:20px 28px;border-bottom:1px solid rgba(248,246,241,0.04);">
        <div style="font-size:13.5px;color:#F8F6F1;font-weight:600;margin-bottom:6px;letter-spacing:-0.01em;">2. New lead &rarr; CRM + welcome sequence</div>
        <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;margin-bottom:8px;">Form submission triggers CRM entry, Slack notification, and a 3-email welcome sequence. No lead falls through the cracks.</div>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(248,246,241,0.05);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(248,246,241,0.3);letter-spacing:0.03em;">n8n + HubSpot + Resend</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background:rgba(74,222,128,0.08);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(74,222,128,0.6);letter-spacing:0.03em;">3h setup</span>
          </td>
        </tr></table>
      </td></tr>

      <!-- Automation 3 -->
      <tr><td style="padding:20px 28px;border-bottom:1px solid rgba(248,246,241,0.04);">
        <div style="font-size:13.5px;color:#F8F6F1;font-weight:600;margin-bottom:6px;letter-spacing:-0.01em;">3. Invoice auto-generation on project completion</div>
        <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;margin-bottom:8px;">When a project status changes to &ldquo;Done,&rdquo; auto-generate and send the invoice. Zero manual accounting.</div>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(248,246,241,0.05);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(248,246,241,0.3);letter-spacing:0.03em;">n8n + Notion + QuickBooks</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background:rgba(74,222,128,0.08);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(74,222,128,0.6);letter-spacing:0.03em;">4h setup</span>
          </td>
        </tr></table>
      </td></tr>

      <!-- Automation 4 -->
      <tr><td style="padding:20px 28px;border-bottom:1px solid rgba(248,246,241,0.04);">
        <div style="font-size:13.5px;color:#F8F6F1;font-weight:600;margin-bottom:6px;letter-spacing:-0.01em;">4. AI review request after service</div>
        <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;margin-bottom:8px;">48h after delivery, Claude drafts a personalised review request referencing the specific service. 3x more Google reviews.</div>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(248,246,241,0.05);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(248,246,241,0.3);letter-spacing:0.03em;">n8n + Claude + Gmail</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background:rgba(74,222,128,0.08);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(74,222,128,0.6);letter-spacing:0.03em;">2h setup</span>
          </td>
        </tr></table>
      </td></tr>

      <!-- Automation 5 -->
      <tr><td style="padding:20px 28px;">
        <div style="font-size:13.5px;color:#F8F6F1;font-weight:600;margin-bottom:6px;letter-spacing:-0.01em;">5. Weekly client report on autopilot</div>
        <div style="font-size:12.5px;color:rgba(248,246,241,0.38);line-height:1.65;margin-bottom:8px;">Every Friday, pull data from your tools, have Claude write a summary with insights, and email it as a branded PDF.</div>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(248,246,241,0.05);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(248,246,241,0.3);letter-spacing:0.03em;">n8n + Claude + Sheets + Resend</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background:rgba(74,222,128,0.08);border-radius:6px;padding:5px 10px;">
            <span style="font-size:10px;color:rgba(74,222,128,0.6);letter-spacing:0.03em;">5h setup</span>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ━━━ SPACER ━━━ -->
  <tr><td style="height:32px;"></td></tr>

  <!-- ━━━ STATS BAR ━━━ -->
  <tr><td style="padding:0 40px;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(248,246,241,0.06);border-radius:14px;overflow:hidden;">
      <tr>
        <td class="stack" style="padding:24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);width:33%;">
          <div class="stat-val" style="font-family:Georgia,'Times New Roman',Times,serif;font-size:28px;color:#E8B4B0;font-weight:600;line-height:1;margin-bottom:6px;">312+</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Deployments</div>
        </td>
        <td class="stack" style="padding:24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);width:33%;">
          <div class="stat-val" style="font-family:Georgia,'Times New Roman',Times,serif;font-size:28px;color:#F8F6F1;font-weight:600;line-height:1;margin-bottom:6px;">14h</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Saved / week</div>
        </td>
        <td class="stack" style="padding:24px;text-align:center;width:33%;">
          <div class="stat-val" style="font-family:Georgia,'Times New Roman',Times,serif;font-size:28px;color:#4ADE80;font-weight:600;line-height:1;margin-bottom:6px;">99.97%</div>
          <div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;letter-spacing:0.14em;font-weight:600;">Uptime</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- ━━━ SPACER ━━━ -->
  <tr><td style="height:40px;"></td></tr>

  <!-- ━━━ CTA ━━━ -->
  <tr><td style="padding:0 40px;text-align:center;" class="pad-mobile">
    <div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:36px;">
      <p style="font-family:Georgia,'Times New Roman',Times,serif;font-size:20px;color:#F8F6F1;margin:0 0 8px;font-weight:400;letter-spacing:-0.01em;">Want us to build these for you?</p>
      <p style="font-size:13px;color:rgba(248,246,241,0.38);margin:0 0 28px;line-height:1.75;max-width:420px;display:inline-block;">Book a free 45-minute automation audit. We map your workflows and show you exactly what to automate first.</p>
      <br/>
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="https://purist.online/pages/welcome" style="height:52px;v-text-anchor:middle;width:240px;" arcsize="23%" fillcolor="#E8B4B0" stroke="f"><v:textbox inset="0,0,0,0"><center style="font-size:14px;font-weight:700;color:#0A0A0A;">Book your free audit</center></v:textbox></v:roundrect><![endif]-->
      <!--[if !mso]><!-->
      <a href="https://purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:16px 44px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.01em;mso-padding-alt:0;">Book your free audit</a>
      <!--<![endif]-->
      <p style="font-size:11px;color:rgba(248,246,241,0.2);margin-top:16px;">Use code <strong style="color:rgba(248,246,241,0.45);">PURISTAUDIT</strong> for priority scheduling</p>
    </div>
  </td></tr>

  <!-- ━━━ SPACER ━━━ -->
  <tr><td style="height:40px;"></td></tr>

  <!-- ━━━ RESOURCES ━━━ -->
  <tr><td style="padding:0 40px;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(248,246,241,0.06);">
      <tr><td style="padding-top:28px;">
        <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(248,246,241,0.25);margin-bottom:20px;font-weight:700;">While you wait for Tuesday</div>
      </td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid rgba(248,246,241,0.04);">
        <a href="https://purist.online/pages/wall-of-health" style="font-size:13px;color:#E8B4B0;text-decoration:none;font-weight:600;letter-spacing:-0.01em;">Client case studies &rarr;</a>
        <div style="font-size:11.5px;color:rgba(248,246,241,0.28);margin-top:4px;line-height:1.55;">Real results from dental, legal, and agency deployments</div>
      </td></tr>
      <tr><td style="padding:12px 0;border-bottom:1px solid rgba(248,246,241,0.04);">
        <a href="https://purist.online/pages/docs#claude-skills" style="font-size:13px;color:#E8B4B0;text-decoration:none;font-weight:600;letter-spacing:-0.01em;">329 Claude AI skills &rarr;</a>
        <div style="font-size:11.5px;color:rgba(248,246,241,0.28);margin-top:4px;line-height:1.55;">Free production-ready prompt skills for Claude</div>
      </td></tr>
      <tr><td style="padding:12px 0;">
        <a href="https://purist.online/pages/docs" style="font-size:13px;color:#E8B4B0;text-decoration:none;font-weight:600;letter-spacing:-0.01em;">Full documentation hub &rarr;</a>
        <div style="font-size:11.5px;color:rgba(248,246,241,0.28);margin-top:4px;line-height:1.55;">Platform guides, n8n references, and deployment best practices</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- ━━━ SPACER ━━━ -->
  <tr><td style="height:48px;"></td></tr>

  <!-- ━━━ FOOTER ━━━ -->
  <tr><td style="padding:0 40px;" class="pad-mobile">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(248,246,241,0.06);">
      <tr><td style="padding:32px 0;text-align:center;">
        <!-- Wordmark -->
        <div style="font-family:Georgia,'Times New Roman',Times,serif;font-size:32px;font-weight:700;letter-spacing:-0.03em;color:rgba(232,180,176,0.2);margin-bottom:18px;">PURIST<span style="font-size:9px;vertical-align:super;letter-spacing:0;">&reg;</span></div>
        <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(248,246,241,0.14);margin-bottom:16px;font-weight:500;">Becreative LTD &middot; Registered in England &amp; Wales</div>
        <div style="margin-bottom:18px;">
          <a href="https://purist.online" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">Website</a>
          <a href="https://www.linkedin.com/company/purist-automation" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">LinkedIn</a>
          <a href="https://twitter.com/purist_hq" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">Twitter / X</a>
          <a href="https://www.producthunt.com/products/purist" style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">Product Hunt</a>
        </div>
        <p style="font-size:10px;color:rgba(248,246,241,0.12);line-height:1.7;margin:0;">
          You received this because you subscribed at purist.online.<br/>
          <a href="https://purist.online/unsubscribe" style="color:rgba(248,246,241,0.2);text-decoration:underline;">Unsubscribe</a> &middot; <a href="https://purist.online/pages/privacy-policy" style="color:rgba(248,246,241,0.2);text-decoration:underline;">Privacy policy</a>
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
