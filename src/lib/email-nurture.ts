// ============================================================
// PURIST — Lead Nurture Email Templates
// Step 0: immediate (sent from lead-capture)
// Step 2: J+2 follow-up
// Step 5: J+5 case study
// ============================================================

const FOOTER = `
<tr><td style="height:48px;"></td></tr>
<tr><td style="padding:0 40px;" class="pad">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="border-top:1px solid rgba(248,246,241,0.06);">
    <tr><td style="padding:32px 0;text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;
        letter-spacing:-0.03em;color:rgba(232,180,176,0.2);margin-bottom:18px;">
        PURIST<span style="font-size:9px;vertical-align:super;">®</span>
      </div>
      <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;
        color:rgba(248,246,241,0.14);margin-bottom:16px;font-weight:500;">
        Becreative LTD · Registered in England &amp; Wales
      </div>
      <div style="margin-bottom:18px;">
        <a href="https://www.purist.online" style="font-size:11px;color:rgba(248,246,241,0.3);
          text-decoration:none;margin:0 12px;">Website</a>
        <a href="https://www.linkedin.com/company/purist-automation"
          style="font-size:11px;color:rgba(248,246,241,0.3);text-decoration:none;margin:0 12px;">LinkedIn</a>
      </div>
      <p style="font-size:10px;color:rgba(248,246,241,0.12);line-height:1.7;margin:0;">
        You received this because you showed interest in automation at purist.online.<br/>
        <a href="https://www.purist.online/api/unsubscribe?email={{EMAIL}}"
          style="color:rgba(248,246,241,0.2);text-decoration:underline;">Unsubscribe</a>
        &nbsp;·&nbsp;
        <a href="https://www.purist.online/pages/privacy-policy"
          style="color:rgba(248,246,241,0.2);text-decoration:underline;">Privacy policy</a>
      </p>
    </td></tr>
  </table>
</td></tr>`;

function htmlWrapper(preheader: string, body: string, email: string): string {
  const footer = FOOTER.replace('{{EMAIL}}', encodeURIComponent(email));
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark">
<style>
body,table,td{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
body{margin:0;padding:0;background:#0A0A0A;}
table{border-collapse:collapse!important;}
@media only screen and (max-width:660px){
  .email-container{width:100%!important;}
  .pad{padding-left:24px!important;padding-right:24px!important;}
  .htitle{font-size:56px!important;}
}
</style>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;">
<tr><td style="display:none!important;visibility:hidden;font-size:1px;color:#0A0A0A;
  line-height:1px;max-height:0;overflow:hidden;">${preheader}</td></tr>
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" class="email-container" width="640" cellpadding="0" cellspacing="0"
  style="max-width:640px;margin:0 auto;">

<!-- Logo -->
<tr><td style="padding:0 40px;" class="pad">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:16px 0;border-bottom:1px solid rgba(248,246,241,0.06);">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;
        letter-spacing:-0.02em;color:#E8B4B0;">
        PURIST<span style="font-size:9px;vertical-align:super;font-weight:500;">®</span>
      </div>
    </td></tr>
  </table>
</td></tr>

${body}

${footer}

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Step 0 — Immediate: personal audit offer ────────────────────────────────
export function buildJ0Email(email: string, source?: string): string {
  const sourceLabel = source === 'roi_calculator'
    ? 'your ROI calculation'
    : source === 'newsletter'
    ? 'your newsletter subscription'
    : 'your visit to purist.online';

  const body = `
<tr><td style="padding:48px 40px 0;" class="pad">
  <div style="font-family:Georgia,'Times New Roman',serif;font-size:13px;color:rgba(248,246,241,0.3);
    letter-spacing:0.14em;text-transform:uppercase;margin-bottom:20px;">
    Personal follow-up
  </div>
  <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:32px;color:#F8F6F1;
    margin:0 0 24px;font-weight:400;line-height:1.2;">
    Based on ${sourceLabel}, here's where I'd start.
  </h1>
  <p style="font-size:15px;color:rgba(248,246,241,0.55);line-height:1.8;margin:0 0 32px;">
    I'm Hamid, founder of PURIST. Every week I personally review new leads and map
    their biggest automation opportunities. Yours is interesting — and there are
    at least 3 workflows I'd tackle immediately.
  </p>
</td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid rgba(248,246,241,0.08);border-radius:16px;overflow:hidden;">
    <tr><td style="background:rgba(232,180,176,0.06);padding:24px 28px 20px;
      border-bottom:1px solid rgba(232,180,176,0.08);">
      <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;
        color:#E8B4B0;font-weight:700;margin-bottom:6px;">
        What we cover in your free audit
      </div>
      <div style="font-family:Georgia,serif;font-size:18px;color:#F8F6F1;
        font-weight:400;line-height:1.3;">
        45 minutes · No pitch · Just your roadmap
      </div>
    </td></tr>
    <tr><td style="padding:0 28px 8px;">
      ${[
        ['Map your top 3 manual bottlenecks', 'We look at where your team loses the most hours and what\'s actually automatable.'],
        ['Calculate your real ROI', 'Not generic numbers — your tools, your team, your specific workflows.'],
        ['Build your first automation live', 'We sketch the first workflow together. You leave with something tangible.'],
      ].map(([title, desc], i, arr) => `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:20px 0;${i < arr.length - 1 ? 'border-bottom:1px solid rgba(248,246,241,0.05);' : ''}vertical-align:top;width:40px;">
            <div style="width:28px;height:28px;background:rgba(232,180,176,0.1);
              border:1px solid rgba(232,180,176,0.2);border-radius:8px;text-align:center;
              line-height:28px;font-family:Georgia,serif;font-size:12px;color:#E8B4B0;font-weight:600;">
              ${i + 1}
            </div>
          </td>
          <td style="padding:20px 0 20px 14px;${i < arr.length - 1 ? 'border-bottom:1px solid rgba(248,246,241,0.05);' : ''}">
            <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">${title}</div>
            <div style="font-size:12.5px;color:rgba(248,246,241,0.35);line-height:1.65;">${desc}</div>
          </td>
        </tr>
      </table>`).join('')}
    </td></tr>
  </table>
</td></tr>

<tr><td style="height:32px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid rgba(248,246,241,0.06);border-radius:14px;overflow:hidden;">
    <tr>
      <td style="padding:24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);width:33%;">
        <div style="font-family:Georgia,serif;font-size:28px;color:#E8B4B0;
          font-weight:600;line-height:1;margin-bottom:6px;">312+</div>
        <div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;
          letter-spacing:0.14em;font-weight:600;">Deployments</div>
      </td>
      <td style="padding:24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);width:33%;">
        <div style="font-family:Georgia,serif;font-size:28px;color:#F8F6F1;
          font-weight:600;line-height:1;margin-bottom:6px;">14h</div>
        <div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;
          letter-spacing:0.14em;font-weight:600;">Saved / week</div>
      </td>
      <td style="padding:24px;text-align:center;width:33%;">
        <div style="font-family:Georgia,serif;font-size:28px;color:#4ADE80;
          font-weight:600;line-height:1;margin-bottom:6px;">€185k</div>
        <div style="font-size:9px;color:rgba(248,246,241,0.25);text-transform:uppercase;
          letter-spacing:0.14em;font-weight:600;">Avg. annual ROI</div>
      </td>
    </tr>
  </table>
</td></tr>

<tr><td style="height:36px;"></td></tr>

<tr><td style="padding:0 40px;text-align:center;" class="pad">
  <a href="https://www.purist.online/pages/welcome"
    style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:18px 48px;
    border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:-0.01em;">
    Book your free audit →
  </a>
  <p style="font-size:12px;color:rgba(248,246,241,0.25);margin:16px 0 0;line-height:1.7;">
    45 minutes · No commitment · Free
  </p>
</td></tr>

<tr><td style="height:40px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:28px;">
    <p style="font-size:14px;color:rgba(248,246,241,0.45);line-height:1.8;margin:0;">
      — Hamid<br/>
      <span style="font-size:12px;color:rgba(248,246,241,0.25);">
        Founder, PURIST · hello@purist.online
      </span>
    </p>
  </div>
</td></tr>`;

  return htmlWrapper(
    'You have at least 3 automation wins waiting. Let me show you exactly what they are — free.',
    body,
    email,
  );
}

// ── Step 2 — J+2: short human follow-up ────────────────────────────────────
export function buildJ2Email(email: string): string {
  const body = `
<tr><td style="padding:48px 40px 0;" class="pad">
  <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#F8F6F1;
    margin:0 0 28px;font-weight:400;line-height:1.3;">
    Did you get a chance to look at this?
  </h1>
  <p style="font-size:15px;color:rgba(248,246,241,0.55);line-height:1.8;margin:0 0 20px;">
    I sent you a note a couple of days ago about a free automation audit.
    Just wanted to check — did it land okay?
  </p>
  <p style="font-size:15px;color:rgba(248,246,241,0.55);line-height:1.8;margin:0 0 20px;">
    I have <strong style="color:#F8F6F1;">2 slots left this week</strong> for free 45-minute
    workflow reviews. If the timing works, you can grab one below.
  </p>
  <p style="font-size:15px;color:rgba(248,246,241,0.55);line-height:1.8;margin:0 0 36px;">
    And if you have questions before booking, just reply to this email — I read every one.
  </p>
</td></tr>

<tr><td style="padding:0 40px;text-align:center;" class="pad">
  <a href="https://www.purist.online/pages/welcome"
    style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:16px 44px;
    border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">
    Grab your slot →
  </a>
</td></tr>

<tr><td style="height:36px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:24px;">
    <p style="font-size:14px;color:rgba(248,246,241,0.45);line-height:1.8;margin:0;">
      — Hamid<br/>
      <span style="font-size:12px;color:rgba(248,246,241,0.25);">
        Founder, PURIST · hello@purist.online
      </span>
    </p>
  </div>
</td></tr>`;

  return htmlWrapper(
    '2 free audit slots left this week — happy to answer questions first.',
    body,
    email,
  );
}

// ── Step 5 — J+5: case study angle ─────────────────────────────────────────
export function buildJ5Email(email: string): string {
  const body = `
<tr><td style="padding:48px 40px 0;" class="pad">
  <div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;
    color:rgba(248,246,241,0.3);font-weight:700;margin-bottom:16px;">
    Case study
  </div>
  <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:30px;color:#F8F6F1;
    margin:0 0 28px;font-weight:400;line-height:1.25;">
    16 hours saved in week one — here's exactly how they did it.
  </h1>
</td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid rgba(232,180,176,0.12);border-radius:16px;overflow:hidden;
    background:rgba(232,180,176,0.04);">
    <tr><td style="padding:28px 28px 24px;">
      <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
        color:#E8B4B0;font-weight:700;margin-bottom:14px;">Client profile</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['Sector', 'SaaS / B2B'],
          ['Team size', '11 people'],
          ['Manual hours lost/week', '~22h across ops + sales'],
          ['Main pain', 'Lead follow-up falling through the cracks, manual reporting'],
        ].map(([k, v]) => `<tr>
          <td style="padding:8px 0;font-size:12px;color:rgba(248,246,241,0.3);
            width:45%;vertical-align:top;">${k}</td>
          <td style="padding:8px 0;font-size:13px;color:#F8F6F1;
            font-weight:500;">${v}</td>
        </tr>`).join('')}
      </table>
    </td></tr>
  </table>
</td></tr>

<tr><td style="height:24px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <p style="font-size:15px;color:rgba(248,246,241,0.55);line-height:1.8;margin:0 0 16px;">
    In the first week, we deployed three workflows:
  </p>
  ${[
    ['New lead → CRM + personalised follow-up sequence', 'Every inbound lead now gets a tailored 3-email sequence within 5 minutes of signing up. Reply rate went from 8% to 31%.'],
    ['Weekly report on autopilot', 'Every Friday at 8am, a branded summary pulls from 4 tools and lands in the inbox. 3h of manual work → 0.'],
    ['Invoice auto-generation on project close', 'When a Notion card moves to "Done", an invoice is generated and sent. No manual accounting.'],
  ].map(([title, desc], i) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="margin-bottom:${i < 2 ? '16px' : '0'};">
    <tr>
      <td style="vertical-align:top;width:24px;padding-top:3px;">
        <div style="width:20px;height:20px;background:rgba(74,222,128,0.1);
          border-radius:50%;text-align:center;line-height:20px;
          font-size:11px;color:#4ADE80;font-weight:700;">✓</div>
      </td>
      <td style="padding-left:12px;">
        <div style="font-size:14px;color:#F8F6F1;font-weight:600;margin-bottom:4px;">${title}</div>
        <div style="font-size:12.5px;color:rgba(248,246,241,0.35);line-height:1.65;">${desc}</div>
      </td>
    </tr>
  </table>`).join('')}
</td></tr>

<tr><td style="height:24px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid rgba(248,246,241,0.06);border-radius:12px;">
    <tr>
      <td style="padding:20px 24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);">
        <div style="font-family:Georgia,serif;font-size:30px;color:#4ADE80;
          font-weight:600;margin-bottom:4px;">16h</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);text-transform:uppercase;
          letter-spacing:0.12em;">saved / week</div>
      </td>
      <td style="padding:20px 24px;text-align:center;border-right:1px solid rgba(248,246,241,0.05);">
        <div style="font-family:Georgia,serif;font-size:30px;color:#E8B4B0;
          font-weight:600;margin-bottom:4px;">6 wk</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);text-transform:uppercase;
          letter-spacing:0.12em;">to full payback</div>
      </td>
      <td style="padding:20px 24px;text-align:center;">
        <div style="font-family:Georgia,serif;font-size:30px;color:#F8F6F1;
          font-weight:600;margin-bottom:4px;">€74k</div>
        <div style="font-size:10px;color:rgba(248,246,241,0.25);text-transform:uppercase;
          letter-spacing:0.12em;">annual saving</div>
      </td>
    </tr>
  </table>
</td></tr>

<tr><td style="height:36px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <p style="font-size:15px;color:rgba(248,246,241,0.55);line-height:1.8;margin:0 0 28px;">
    I'd be curious to see what your equivalent of this looks like.
    The free audit is still on the table — and it's the fastest way to find out.
  </p>
</td></tr>

<tr><td style="padding:0 40px;text-align:center;" class="pad">
  <a href="https://www.purist.online/pages/welcome"
    style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:16px 44px;
    border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">
    See if this applies to you →
  </a>
</td></tr>

<tr><td style="height:36px;"></td></tr>

<tr><td style="padding:0 40px;" class="pad">
  <div style="border-top:1px solid rgba(248,246,241,0.06);padding-top:24px;">
    <p style="font-size:14px;color:rgba(248,246,241,0.45);line-height:1.8;margin:0 0 12px;">
      — Hamid<br/>
      <span style="font-size:12px;color:rgba(248,246,241,0.25);">
        Founder, PURIST · hello@purist.online
      </span>
    </p>
    <p style="font-size:12px;color:rgba(248,246,241,0.2);line-height:1.7;margin:0;">
      This is the last email in this sequence. If the timing isn't right today,
      you can always book when you're ready at
      <a href="https://www.purist.online/pages/welcome"
        style="color:rgba(232,180,176,0.5);text-decoration:none;">purist.online/pages/welcome</a>.
    </p>
  </div>
</td></tr>`;

  return htmlWrapper(
    'How a B2B SaaS team cut 16 hours of manual work in their first week with us.',
    body,
    email,
  );
}
