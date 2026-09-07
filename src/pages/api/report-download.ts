import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { recordLeadEvent } from '../../lib/lead-scoring';
import { professions } from '../../data/automations';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function parseHours(s: string): number {
  const m = s.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}
function parseMoney(s: string): number {
  const m = s.match(/\$([\d,]+)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : 0;
}
const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

function categoryStats(category: string) {
  const ps = professions.filter((p) => p.category === category);
  const h = avg(ps.map((p) => parseHours(p.stats.timeSaved)).filter(Boolean));
  const r = avg(ps.map((p) => parseMoney(p.stats.revenueImpact)).filter(Boolean));
  const names = ps.slice(0, 2).map((p) => p.name);
  return { n: ps.length, avgHours: h, avgRevenue: r, sampleNames: names };
}

function buildReportEmail(category?: string): { subject: string; html: string } {
  const personal = category ? categoryStats(category) : null;

  const askLine = personal
    ? `Since you told me you're in ${category!.toLowerCase()}: businesses in that category recover an average of ${personal.avgHours.toFixed(1)}h/week and ${'$' + Math.round(personal.avgRevenue).toLocaleString('en-US')}/month once automated (see ${personal.sampleNames.join(' and ')} in the report). Reply and tell me which of those 4 documented workflows looks closest to your actual bottleneck, I'll tell you which one I'd build first for your business.`
    : `Which of the 171 profession patterns in this report looks closest to your business? Reply and tell me, I'll point you to the exact 3 workflows I'd start with for your specific case.`;

  const subject = category
    ? `Your State of Automation Report, and what it means for ${category.toLowerCase()}`
    : 'Your State of Automation Report 2026 is attached';

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0A0A0A">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding-bottom:24px;">
<span style="font-family:Georgia,serif;font-size:20px;color:#F8F6F1;letter-spacing:0.04em;">PURIST</span>
</td></tr>
<tr><td style="background:#131313;border:1px solid #262626;border-radius:16px;padding:32px;">
<p style="font-size:15px;line-height:1.6;color:#F8F6F1;margin:0 0 16px;">Hi,</p>
<p style="font-size:15px;line-height:1.6;color:#F8F6F1;margin:0 0 16px;">
Attached is the full <strong>PURIST State of Automation Report 2026</strong>: 171 professions, 684 documented workflows, and the industry-by-industry breakdown of what actually gets automated.
</p>
<p style="font-size:15px;line-height:1.7;color:#F8F6F1;margin:0 0 20px;background:#1c1410;border-left:2px solid #E8B4B0;padding:14px 16px;border-radius:6px;">
${askLine}
</p>
<p style="font-size:15px;line-height:1.6;color:#F8F6F1;margin:0 0 8px;">Just hit reply, this inbox goes straight to me.</p>
<p style="font-size:14px;line-height:1.6;color:#9a9a9a;margin:24px 0 0;">Steve<br/>Founder, PURIST</p>
</td></tr>
<tr><td style="padding:24px 4px 0;text-align:center;">
<a href="https://www.purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;font-weight:700;font-size:13px;padding:14px 28px;border-radius:10px;text-decoration:none;">Get my free automation plan</a>
</td></tr>
<tr><td style="padding:24px 4px 0;text-align:center;">
<p style="font-size:11px;color:#5a5a5a;margin:0;">PURIST &middot; purist.online &middot; You received this because you requested the State of Automation Report.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, category, pdfBase64, page } = body;

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response(JSON.stringify({ success: true, note: 'no resend key configured' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendKey);
    const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

    // 1. Save to Supabase, isolated, never blocks email sending.
    // `category` was already collected to personalize the email below
    // but was previously discarded instead of being persisted here.
    try {
      await recordLeadEvent({
        email,
        eventType: 'report_download',
        source: 'state_of_automation_report',
        page: page || '/pages/state-of-automation-report-2026',
        category,
      });
    } catch { /* silent */ }

    // 2. Notify team (fire & forget)
    resend.emails.send({
      from: 'PURIST <hello@purist.online>',
      to: [notifyEmail],
      subject: `Report download: ${email}${category ? ' · ' + category : ''}`,
      html: `<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;"><div style="background:#fff;border-radius:12px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e8e8e8;"><h2 style="font-size:16px;margin:0 0 6px;color:#0a0a0a;">State of Automation Report downloaded</h2><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;margin-bottom:10px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Email</div><div style="font-size:14px;color:#0a0a0a;font-weight:600;">${email}</div></div><div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Industry</div><div style="font-size:13px;color:#0a0a0a;">${category ?? 'not provided'}</div></div></div></div>`,
    }).catch(() => {});

    // 3. Send the report + conversion email to the lead, with the PDF attached
    const { subject, html } = buildReportEmail(category);
    const attachments = pdfBase64
      ? [{ filename: 'PURIST-State-of-Automation-Report-2026.pdf', content: Buffer.from(String(pdfBase64).replace(/^data:application\/pdf;base64,/, ''), 'base64') }]
      : undefined;

    await resend.emails.send({
      from: 'Steve at PURIST <hello@purist.online>',
      to: [email],
      subject,
      replyTo: 'hello@purist.online',
      html,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[report-download]', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
