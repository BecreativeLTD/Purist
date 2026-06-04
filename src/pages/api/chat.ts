import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }

    // Keep last 10 messages to stay within token limits
    const recent = messages.slice(-10);

    const systemPrompt = `You are the PURIST AI assistant — a sharp, knowledgeable expert in workflow automation, n8n, AI agents, and business operations for small-to-medium businesses.

PURIST is a premium automation agency. Key facts:
- Plans: Automation Pro (£799/mo, 12 workflows), AI Agent Deploy (£999/mo, 5 AI agents), The Full Stack (£1,499/mo, best value — both combined)
- Enterprise: £3,499/mo with dedicated n8n instance and 99.97% SLA
- Add-ons: Extra Workflow £299, Quarterly Audit £499, Team Training £799, Migration from Zapier/Make £1,499
- Tech stack: Self-hosted n8n v1.71, Claude Opus 4 for AI, deployed in under 7 days
- ROI: Average 9.2× at 90 days, £168k average annual saving
- 30-day money-back guarantee on all plans
- Free 60-minute audit call — no commitment, ROI map delivered live on the call
- Industries served: Dental/Healthcare, Real Estate, Agencies, E-commerce, SaaS, Finance, Law firms

Your role:
- Answer questions about automation, PURIST plans, pricing, timelines, and ROI with confidence
- Be concise (2-4 sentences max per point), professional, and warm
- Always guide the conversation naturally toward booking a free audit at /pages/welcome
- Never be salesy or pushy — let the value speak
- If asked about specific technical details (n8n nodes, API integrations, etc.), be accurate and helpful
- Respond in the same language as the user (English or French)

Format: Plain text only. No markdown headers, no asterisks, no bullet lists with dashes. Use line breaks between paragraphs. Keep responses under 120 words unless the user asks for details.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://purist.online',
        'X-Title': 'PURIST AI',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...recent,
        ],
        max_tokens: 250,
        temperature: 0.65,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', err);
      return new Response(JSON.stringify({ error: 'AI unavailable', fallback: true }), { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() ?? '';

    if (!reply) {
      return new Response(JSON.stringify({ error: 'Empty response', fallback: true }), { status: 502 });
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(JSON.stringify({ error: 'Server error', fallback: true }), { status: 500 });
  }
};
