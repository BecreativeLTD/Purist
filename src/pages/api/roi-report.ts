import type { APIRoute } from 'astro';
import { upsertLead } from '../../lib/supabase-admin';
import { buildJ0Email } from '../../lib/email-nurture';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Save lead to Supabase — isolated, never blocks email sending
    try { await upsertLead(email, 'roi_calculator', '/pages/welcome'); } catch { /* silent */ }

    const resendKey =
      import.meta.env.Resend ||
      import.meta.env.RESEND_API_KEY;

    if (resendKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        const notifyEmail =
          import.meta.env.notifymail ||
          import.meta.env.NOTIFY_EMAIL ||
          'hello@purist.online';

        const result = body.result ?? {};
        const inputs = body.inputs ?? {};

        await resend.emails.send({
          from: 'PURIST ROI Calculator <hello@purist.online>',
          to: [notifyEmail],
          subject: `New ROI Report request — ${email}`,
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
  .cta { display: inline-block; background: #E8B4B0; color: #0a0a0a; padding: 11px 22px; border-radius: 7px; font-size: 12px; font-weight: 600; text-decoration: none; margin-top: 20px; }
</style></head>
<body>
<div class="card">
  <h1>New ROI Report Request</h1>
  <p class="sub">From the ROI Calculator</p>
  <div class="grid">
    <div class="field"><div class="field-label">Email</div><div class="field-value">${email}</div></div>
    <div class="field"><div class="field-label">Employees</div><div class="field-value">${inputs.employees ?? '—'}</div></div>
    <div class="field"><div class="field-label">Hours/week</div><div class="field-value">${inputs.hoursPerWeek ?? '—'}h</div></div>
    <div class="field"><div class="field-label">Hourly rate</div><div class="field-value">€${inputs.hourlyRate ?? '—'}</div></div>
    <div class="field"><div class="field-label">Annual savings</div><div class="field-value">€${result.automationSavings?.toLocaleString('fr-FR') ?? '—'}</div></div>
    <div class="field"><div class="field-label">ROI months</div><div class="field-value">${result.roiMonths ?? '—'}</div></div>
  </div>
  <div class="field" style="margin-bottom:10px;">
    <div class="field-label">Tools</div>
    <div class="field-value">${(inputs.tools ?? []).join(', ') || '—'}</div>
  </div>
  <div class="field">
    <div class="field-label">Tasks</div>
    <div class="field-value">${(inputs.tasks ?? []).join(', ') || '—'}</div>
  </div>
  <a href="mailto:${email}" class="cta">Reply to lead →</a>
</div>
</body>
</html>`,
        });

        // Send J+0 nurture email to the lead
        await resend.emails.send({
          from: 'Steve at PURIST <hello@purist.online>',
          to: [email],
          subject: "Your automation roadmap — here's where I'd start",
          replyTo: 'hello@purist.online',
          html: buildJ0Email(email, 'roi_calculator'),
        });

      } catch {
        // best-effort — don't fail the request
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
