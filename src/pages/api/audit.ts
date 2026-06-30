import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { generateProposalEmail, generateOnboardingEmail } from '~/utils/proposal-email';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      business_type, name, email, phone,
      company, team_size, pain_point, tools,
      budget, message,
    } = body;

    if (!name || !email || !company) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    const resendKey = import.meta.env.Resend || import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }
    const resend = new Resend(resendKey);
    const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

    // ── 1. AI lead qualification (best-effort) ──────────────────
    let qualification = '';
    const openRouterKey = import.meta.env.OpenRouter;
    if (openRouterKey) {
      try {
        const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://www.purist.online',
            'X-Title': 'PURIST Lead Qualification',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [{
              role: 'user',
              content: `You are a lead qualification specialist for PURIST, a premium automation agency.

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
PRIORITY: [High / Medium / Low] one word + one sentence reason
RECOMMENDED PLAN: [plan name + price]
TOP 3 WORKFLOWS: bullet points of the most relevant automations for this lead
TALKING POINTS: 2-3 sentences on what to focus on in the audit call
ESTIMATED ROI: rough monthly savings estimate based on team size and pain point

Keep it under 200 words. Be direct and actionable.`,
            }],
            max_tokens: 350,
            temperature: 0.3,
          }),
        });
        if (aiRes.ok) {
          const aiData = await aiRes.json();
          qualification = aiData.choices?.[0]?.message?.content?.trim() ?? '';
        }
      } catch {
        // AI qualification is best-effort — continue without it
      }
    }

    // ── 2. Notify team ───────────────────────────────────────────
    await resend.emails.send({
      from: 'PURIST Leads <hello@purist.online>',
      to: [notifyEmail],
      subject: `New audit request — ${name} · ${company}`,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:-apple-system,sans-serif;background:#f5f5f5;margin:0;padding:20px;}
.card{background:#fff;border-radius:12px;padding:32px;max-width:600px;margin:0 auto;border:1px solid #e8e8e8;}
h1{font-size:20px;margin:0 0 4px;color:#0a0a0a;}.sub{font-size:13px;color:#888;margin-bottom:28px;}
.section{margin-bottom:24px;}.section-title{font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#aaa;font-weight:600;margin-bottom:10px;}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.field{background:#f9f9f9;border-radius:8px;padding:12px 14px;}
.field-label{font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3px;}
.field-value{font-size:13px;color:#0a0a0a;font-weight:500;}
.ai-box{background:#0a0a0a;border-radius:10px;padding:20px 22px;}
.ai-title{font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:rgba(232,180,176,0.7);margin-bottom:12px;font-weight:600;}
.ai-content{font-size:13px;color:rgba(255,255,255,0.75);line-height:1.65;white-space:pre-wrap;}
.cta{display:inline-block;background:#E8B4B0;color:#0a0a0a;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;margin-top:24px;}
.msg{background:#f9f9f9;border-radius:8px;padding:14px;font-size:13px;color:#444;line-height:1.6;font-style:italic;}
</style></head>
<body><div class="card">
<h1>New Audit Request</h1>
<p class="sub">Submitted via purist.online</p>
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
${message ? `<div class="section"><div class="section-title">Their message</div><div class="msg">"${message}"</div></div>` : ''}
${qualification ? `<div class="section"><div class="ai-box"><div class="ai-title">AI Lead Qualification</div><div class="ai-content">${qualification}</div></div></div>` : ''}
<a href="mailto:${email}" class="cta">Reply to ${name} →</a>
</div></body></html>`,
    });

    // ── 3. AI — generate unique personalised proposal intro ──────
    let aiIntro = '';
    let aiInsights: string[] = [];
    if (openRouterKey) {
      try {
        const introRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://www.purist.online',
            'X-Title': 'PURIST Proposal Personalisation',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [{
              role: 'user',
              content: `You are a senior automation consultant writing the opening of a personalised proposal email.

Client: ${name}, ${company}
Industry: ${business_type || 'not specified'}
Team size: ${team_size || 'not specified'}
Primary pain point: ${pain_point || 'not specified'}
Tools they currently use: ${tools || 'not specified'}
What they wrote in their message: "${message || 'nothing'}"

Return a JSON object with two keys:
1. "intro": A 3-sentence paragraph that sounds handwritten and specific to this client. Reference their tools by name if provided. Address their pain point directly and specifically. Do NOT be generic. No sales language.
2. "insights": An array of exactly 3 short bullet-point observations (each max 15 words) specific to their tools, team size, and pain point — things that show you actually read their submission carefully.

Return valid JSON only. No markdown, no code blocks, just raw JSON.`,
            }],
            max_tokens: 320,
            temperature: 0.72,
          }),
        });
        if (introRes.ok) {
          const introData = await introRes.json();
          const raw = introData.choices?.[0]?.message?.content?.trim() ?? '';
          try {
            const parsed = JSON.parse(raw);
            aiIntro = typeof parsed.intro === 'string' ? parsed.intro : '';
            aiInsights = Array.isArray(parsed.insights) ? parsed.insights.slice(0, 3) : [];
          } catch { /* JSON parse failed — continue without AI personalisation */ }
        }
      } catch { /* best-effort — proposal still sends with industry template */ }
    }

    // ── 4. Send personalised automation proposal to lead ────────
    const proposalHtml = generateProposalEmail({
      name, company, email,
      business_type, team_size, pain_point, tools, budget, message,
      aiIntro, aiInsights,
    });

    await resend.emails.send({
      from: 'PURIST <hello@purist.online>',
      to: [email],
      subject: `Your automation plan for ${company} — PURIST`,
      html: proposalHtml,
      text: `Hi ${name.split(' ')[0]},\n\nWe have prepared a personalised automation analysis for ${company}.\n\nThis email contains your full proposal: 3 recommended workflows, industry benchmarks, ROI projections, and a deployment timeline — all based on your submission.\n\nIf the HTML version is not displaying correctly, reply to this email and we will send the proposal in another format.\n\nTo get started, reply "yes" to this email. Your first workflow goes live in 3 business days. No call required.\n\n-- Hugo\nPURIST\nhello@purist.online\npurist.online`,
    });

    // ── 5. Send onboarding follow-up 2 minutes later ─────────────
    const resendKey2 = resendKey; // same key, captured before async gap
    setTimeout(async () => {
      try {
        const resend2 = new Resend(resendKey2);
        const onboardingHtml = generateOnboardingEmail({
          name, company, email,
          business_type, team_size, pain_point, tools, budget,
        });
        await resend2.emails.send({
          from: 'PURIST <hello@purist.online>',
          to: [email],
          subject: `${name.split(' ')[0]}, here is what happens next — PURIST`,
          html: onboardingHtml,
          text: `Hi ${name.split(' ')[0]},\n\nThis is a quick follow-up to the proposal you just received.\n\nWe wanted to share exactly what the onboarding looks like so you can start preparing your side before we connect.\n\nReply "yes" to either email and we will send the onboarding form and invoice within 2 hours.\n\n-- Hugo\nPURIST\nhello@purist.online`,
        });
      } catch {
        // Follow-up is best-effort — do not surface errors to the client
      }
    }, 2 * 60 * 1000); // 2 minutes

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
