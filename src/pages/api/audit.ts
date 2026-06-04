import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      business_type, name, email, phone,
      company, team_size, pain_point, tools,
      budget, message,
    } = body;

    // Basic validation
    if (!name || !email || !company) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // ── 1. AI lead qualification via OpenRouter ─────────────────
    let qualification = '';
    try {
      const aiPrompt = `You are a lead qualification specialist for PURIST, a premium automation agency.

Analyze this audit request and return a structured qualification in plain text:

Lead data:
- Name: ${name}
- Company: ${company}
- Industry: ${business_type || 'Not specified'}
- Team size: ${team_size || 'Not specified'}
- Biggest pain point: ${pain_point || 'Not specified'}
- Current tools: ${tools || 'Not specified'}
- Monthly budget: ${budget || 'Not specified'}
- Message: ${message || 'None'}

Return:
PRIORITY: [High / Medium / Low] — one word + one sentence reason
RECOMMENDED PLAN: [plan name + price]
TOP 3 WORKFLOWS: bullet points of the most relevant automations for this lead
TALKING POINTS: 2-3 sentences on what to focus on in the audit call
ESTIMATED ROI: rough monthly savings estimate based on team size and pain point

Keep it under 200 words. Be direct and actionable.`;

      const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://puristengineering.co',
          'X-Title': 'PURIST Lead Qualification',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          messages: [{ role: 'user', content: aiPrompt }],
          max_tokens: 350,
          temperature: 0.3,
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        qualification = aiData.choices?.[0]?.message?.content?.trim() ?? '';
      }
    } catch (aiErr) {
      console.error('AI qualification failed:', aiErr);
    }

    // ── 2. Send notification email via Resend ────────────────────
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const notifyEmail = import.meta.env.NOTIFY_EMAIL || 'hello@puristengineering.co';

    await resend.emails.send({
      from: 'PURIST Leads <onboarding@resend.dev>',
      to: [notifyEmail],
      subject: `🔔 New audit request — ${name} · ${company}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; border: 1px solid #e8e8e8; }
  h1 { font-size: 20px; margin: 0 0 4px; color: #0a0a0a; }
  .sub { font-size: 13px; color: #888; margin-bottom: 28px; }
  .section { margin-bottom: 24px; }
  .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #aaa; font-weight: 600; margin-bottom: 10px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .field { background: #f9f9f9; border-radius: 8px; padding: 12px 14px; }
  .field-label { font-size: 10px; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px; }
  .field-value { font-size: 13px; color: #0a0a0a; font-weight: 500; }
  .ai-box { background: #0a0a0a; border-radius: 10px; padding: 20px 22px; color: #fff; }
  .ai-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(232,180,176,0.7); margin-bottom: 12px; font-weight: 600; }
  .ai-content { font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.65; white-space: pre-wrap; }
  .cta { display: inline-block; background: #E8B4B0; color: #0a0a0a; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; margin-top: 24px; }
  .message-box { background: #f9f9f9; border-radius: 8px; padding: 14px; font-size: 13px; color: #444; line-height: 1.6; font-style: italic; }
</style></head>
<body>
<div class="card">
  <h1>New Audit Request</h1>
  <p class="sub">Submitted via puristengineering.co</p>

  <div class="section">
    <div class="section-title">Lead details</div>
    <div class="grid">
      <div class="field"><div class="field-label">Name</div><div class="field-value">${name}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value">${email}</div></div>
      <div class="field"><div class="field-label">Company</div><div class="field-value">${company}</div></div>
      <div class="field"><div class="field-label">Phone</div><div class="field-value">${phone || '—'}</div></div>
      <div class="field"><div class="field-label">Industry</div><div class="field-value">${business_type || '—'}</div></div>
      <div class="field"><div class="field-label">Team size</div><div class="field-value">${team_size || '—'}</div></div>
      <div class="field"><div class="field-label">Pain point</div><div class="field-value">${pain_point || '—'}</div></div>
      <div class="field"><div class="field-label">Budget</div><div class="field-value">${budget || '—'}</div></div>
    </div>
    ${tools ? `<div class="field" style="margin-top:12px;"><div class="field-label">Current tools</div><div class="field-value">${tools}</div></div>` : ''}
  </div>

  ${message ? `
  <div class="section">
    <div class="section-title">Their message</div>
    <div class="message-box">"${message}"</div>
  </div>` : ''}

  ${qualification ? `
  <div class="section">
    <div class="ai-box">
      <div class="ai-title">AI Lead Qualification</div>
      <div class="ai-content">${qualification}</div>
    </div>
  </div>` : ''}

  <a href="mailto:${email}" class="cta">Reply to ${name} →</a>
</div>
</body>
</html>`,
    });

    // ── 3. Send confirmation email to the lead ───────────────────
    await resend.emails.send({
      from: 'PURIST <onboarding@resend.dev>',
      to: [email],
      subject: `Your free audit request — we'll be in touch`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .card { background: #0a0a0a; border-radius: 12px; padding: 40px; max-width: 540px; margin: 0 auto; }
  h1 { font-size: 24px; color: #fff; margin: 0 0 8px; font-weight: 400; letter-spacing: -0.02em; }
  p { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7; margin: 0 0 16px; }
  .highlight { color: #E8B4B0; }
  .step { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
  .num { width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 11px; color: rgba(255,255,255,0.4); flex-shrink: 0; margin-top: 1px; }
  .step-text { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.5; }
  .divider { height: 1px; background: rgba(255,255,255,0.07); margin: 24px 0; }
  .cta { display: inline-block; background: #E8B4B0; color: #0a0a0a; padding: 13px 26px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; }
</style></head>
<body>
<div class="card">
  <h1>Got it, ${name.split(' ')[0]}.</h1>
  <p>Your free audit request is confirmed. A member of the PURIST team will reach out within <span class="highlight">1 business day</span> to schedule your 60-minute session.</p>

  <div class="divider"></div>

  <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.25);margin-bottom:16px;">What happens next</p>

  <div class="step">
    <div class="num">1</div>
    <div class="step-text"><strong style="color:rgba(255,255,255,0.80);">We review your submission</strong><br/>Our team reads every request before the call.</div>
  </div>
  <div class="step">
    <div class="num">2</div>
    <div class="step-text"><strong style="color:rgba(255,255,255,0.80);">60-minute audit call</strong><br/>We map every manual process and score each one by ROI potential — live on the call.</div>
  </div>
  <div class="step">
    <div class="num">3</div>
    <div class="step-text"><strong style="color:rgba(255,255,255,0.80);">Deployment plan delivered</strong><br/>You leave with a prioritised automation roadmap. Zero commitment required.</div>
  </div>

  <div class="divider"></div>
  <p>Questions before then? Just reply to this email.</p>
  <a href="https://puristengineering.co/pages/blog" class="cta">Read our automation guides →</a>
</div>
</body>
</html>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Audit API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
