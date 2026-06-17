import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }

    const openRouterKey = import.meta.env.OpenRouter;
    if (!openRouterKey) {
      return new Response(JSON.stringify({ error: 'AI service not configured', fallback: true }), { status: 500 });
    }

    const recent = messages.slice(-10);

    const lastUserMsg = [...messages].reverse().find((m: { role: string; content: string }) => m.role === 'user')?.content ?? '';
    const normalized = lastUserMsg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const frenchPattern = /[àâäéèêëîïôöùûüÿçœæ]|(\b(je|tu|il|nous|vous|ils|est|sont|pas|pour|avec|dans|sur|que|qui|une|les|des|mon|ton|son|notre|votre|leur|aussi|mais|donc|ou|et|bonjour|salut|merci|oui|non|comment|pourquoi|quand|quel|secteur|medecin|dentiste|agence|immobilier|entreprise|automatiser|automatisation|cout|prix|devis|audit|gratuit|besoin|cabinet|clinique|avocat|comptable|logistique|recrutement)\b)/i;
    const isFrench = frenchPattern.test(lastUserMsg) || frenchPattern.test(normalized);

    const systemPrompt = isFrench
      ? `LANGUE OBLIGATOIRE: Réponds UNIQUEMENT en français.

Tu es l'assistant IA PURIST — expert en automatisation de workflows, n8n, agents IA et opérations business pour les PME.

PURIST est une agence d'automatisation premium. Faits clés :
- Plans : Automation Pro (€890/mois, 12 workflows), AI Agent Deploy (€1 090/mois, 5 agents IA), The Full Stack (€1 650/mois, meilleur rapport qualité-prix)
- Enterprise : €3 900/mois, instance n8n dédiée, SLA 99,97%
- Stack : n8n v1.71 self-hosted, Claude AI pour les agents, déployé en moins de 7 jours
- ROI moyen : 9,2× à 90 jours, €185k d'économies annuelles
- Audit gratuit 45 minutes — sans engagement, carte ROI livrée en direct sur l'appel
- Secteurs : Dentaire/Santé, Immobilier, Agences, E-commerce, SaaS, Finance, Cabinets juridiques

Ton rôle : répondre aux questions avec précision, être concis (2-4 phrases max par point), professionnel et chaleureux. Guide naturellement vers la réservation d'un audit gratuit sur /pages/welcome. Format : texte simple, pas de markdown, pas de listes à puces avec tirets. Sauts de ligne entre paragraphes. 120 mots maximum sauf si détails demandés.`
      : `MANDATORY LANGUAGE: Respond ONLY in English.

You are the PURIST AI assistant — a sharp, knowledgeable expert in workflow automation, n8n, AI agents, and business operations for SMBs.

PURIST is a premium automation agency. Key facts:
- Plans: Automation Pro (€890/mo, 12 workflows), AI Agent Deploy (€1,090/mo, 5 AI agents), The Full Stack (€1,650/mo, best value)
- Enterprise: €3,900/mo with dedicated n8n instance and 99.97% SLA
- Tech stack: Self-hosted n8n v1.71, Claude AI for agents, deployed in under 7 days
- ROI: Average 9.2× at 90 days, €185k average annual saving
- 30-day money-back guarantee on all plans
- Free 45-minute audit call — no commitment, ROI map delivered live on the call
- Industries served: Dental/Healthcare, Real Estate, Agencies, E-commerce, SaaS, Finance, Law firms

Your role: answer questions with confidence, be concise (2-4 sentences max per point), professional, and warm. Guide naturally toward booking a free audit at /pages/welcome. Format: plain text only, no markdown, no dash lists. Line breaks between paragraphs. 120 words max unless details are requested.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.purist.online',
        'X-Title': 'PURIST AI',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [{ role: 'system', content: systemPrompt }, ...recent],
        max_tokens: 250,
        temperature: 0.65,
      }),
    });

    if (!response.ok) {
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

  } catch {
    return new Response(JSON.stringify({ error: 'Server error', fallback: true }), { status: 500 });
  }
};
