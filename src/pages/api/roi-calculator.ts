import type { APIRoute } from 'astro';

export const prerender = false;

interface ROIInput {
  employees: number;
  hoursPerWeek: number;
  hourlyRate: number;
  tools: string[];
  mainTasks: string[];
  email?: string;
}

interface BreakdownItem {
  task: string;
  hoursSaved: number;
  annualSaving: number;
  automationTool: string;
}

interface ROIResult {
  currentCost: number;
  automationSavings: number;
  implementationCost: number;
  roiMonths: number;
  roiPercent: number;
  hoursSavedPerWeek: number;
  breakdown: BreakdownItem[];
  topOpportunities: string[];
  recommendation: string;
}

// Client-side fallback calculation when AI is unavailable
function computeFallback(input: ROIInput): ROIResult {
  const { employees, hoursPerWeek, hourlyRate, tools, mainTasks } = input;
  const currentCost = employees * hoursPerWeek * 52 * hourlyRate;

  const savingRate = 0.75; // assume 75% of manual time automatable
  const totalHoursSaved = hoursPerWeek * savingRate;
  const automationSavings = Math.round(employees * totalHoursSaved * 52 * hourlyRate);

  // Implementation cost scales with employees and complexity
  const toolComplexity = tools.length > 5 ? 1.4 : tools.length > 2 ? 1.15 : 1;
  const implementationCost = Math.round(Math.min(employees * 600, 12000) * toolComplexity);

  const roiMonths = implementationCost > 0
    ? parseFloat((implementationCost / (automationSavings / 12)).toFixed(1))
    : 1;
  const roiPercent = implementationCost > 0
    ? Math.round(((automationSavings - implementationCost) / implementationCost) * 100)
    : 999;
  const hoursSavedPerWeek = parseFloat((employees * totalHoursSaved).toFixed(1));

  // Tool mapping for automation suggestions
  const toolMap: Record<string, string> = {
    'Data entry': 'n8n + Airtable',
    'Reporting': 'n8n + Google Data Studio',
    'Follow-ups clients': 'n8n + HubSpot',
    'Follow-ups': 'n8n + HubSpot',
    'Onboarding': 'n8n + Notion',
    'Facturation': 'n8n + Stripe',
    'Support': 'n8n + Intercom',
    'Synchronisation données': 'n8n + Make',
    'Emails manuels': 'n8n + Instantly',
  };

  const taskCount = mainTasks.length || 1;
  const hoursPerTask = parseFloat((totalHoursSaved / taskCount).toFixed(1));
  const breakdown: BreakdownItem[] = mainTasks.slice(0, 5).map(task => ({
    task,
    hoursSaved: hoursPerTask,
    annualSaving: Math.round(employees * hoursPerTask * 52 * hourlyRate),
    automationTool: toolMap[task] || 'n8n + custom workflow',
  }));

  const topOpportunities = [
    `Synchronisation automatique CRM/ERP — économisez ${Math.round(hoursPerWeek * 0.3 * employees)}h/semaine`,
    `Rapports générés automatiquement chaque semaine en 5 minutes vs ${Math.round(hoursPerWeek * 0.25 * employees)}h manuelles`,
    `Séquences de relance automatisées avec taux d'ouverture moyen de 82%`,
  ];

  const recommendation = `Avec ${employees} collaborateurs perdant ${hoursPerWeek}h/semaine en tâches manuelles, votre potentiel d'économie est de ${Math.round(automationSavings / 1000)}k€/an. En automatisant vos outils ${tools.slice(0, 2).join(' et ')}, vous pouvez atteindre un ROI complet en ${roiMonths} mois. Nous recommandons de commencer par ${mainTasks[0] || 'la synchronisation de données'} pour un impact immédiat.`;

  return {
    currentCost: Math.round(currentCost),
    automationSavings,
    implementationCost,
    roiMonths,
    roiPercent,
    hoursSavedPerWeek,
    breakdown,
    topOpportunities,
    recommendation,
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as ROIInput;
    const { employees, hoursPerWeek, hourlyRate, tools, mainTasks } = body;

    // Validate required fields
    if (!employees || !hoursPerWeek || !hourlyRate) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentCost = Math.round(employees * hoursPerWeek * 52 * hourlyRate);

    const openRouterKey =
      import.meta.env.OPENROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      import.meta.env.OpenRouter;

    if (!openRouterKey) {
      // Return client-side computed fallback
      return new Response(JSON.stringify(computeFallback(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userPrompt = `You are a business automation ROI expert. Return ONLY valid JSON, no markdown.

A business has provided the following data:
- Employees: ${employees}
- Hours per week lost to manual work: ${hoursPerWeek}
- Average hourly rate: €${hourlyRate}
- Current tools: ${tools.join(', ')}
- Main time-consuming tasks: ${mainTasks.join(', ')}
- Calculated annual cost of manual work: €${currentCost}

Based on real automation project data, calculate and return this exact JSON structure:

{
  "currentCost": ${currentCost},
  "automationSavings": <annual savings after automation, 70-85% of currentCost>,
  "implementationCost": <realistic one-time cost based on complexity and team size, typically €3000-€15000>,
  "roiMonths": <months to break even, 1 decimal>,
  "roiPercent": <annual ROI percentage after implementation cost>,
  "hoursSavedPerWeek": <total hours saved per week across team>,
  "breakdown": [
    {
      "task": "<task name from the list>",
      "hoursSaved": <hours saved per week for this task>,
      "annualSaving": <annual saving in euros for this task>,
      "automationTool": "<specific tool combination like n8n + Airtable>"
    }
  ],
  "topOpportunities": [
    "<specific opportunity 1 based on their tools>",
    "<specific opportunity 2>",
    "<specific opportunity 3>"
  ],
  "recommendation": "<2-3 sentence personalized recommendation mentioning their specific tools (${tools.slice(0, 2).join(', ')}) and most impactful tasks>"
}

Rules:
- breakdown should have one entry per task listed
- automationTool should reference tools they actually use where possible (${tools.join(', ')})
- topOpportunities should be specific and quantified
- recommendation must mention their actual tools and pain points
- All monetary values in euros, no currency symbols in numbers
- Return ONLY the JSON object, nothing else`;

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.purist.online',
        'X-Title': 'PURIST ROI Calculator',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a business automation ROI expert. Return ONLY valid JSON, no markdown, no explanation.',
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        max_tokens: 1200,
        temperature: 0.2,
      }),
    });

    if (!aiRes.ok) {
      // Fallback to computed result
      return new Response(JSON.stringify(computeFallback(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiRes.json();
    const rawContent = aiData.choices?.[0]?.message?.content?.trim() ?? '';

    // Parse AI JSON — strip any markdown fences if present
    let parsed: ROIResult;
    try {
      const cleaned = rawContent
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
      parsed = JSON.parse(cleaned);

      // Ensure currentCost matches our calculation
      parsed.currentCost = currentCost;

      // Sanity-check required fields exist
      if (!parsed.automationSavings || !parsed.breakdown || !Array.isArray(parsed.breakdown)) {
        throw new Error('Invalid AI response structure');
      }
    } catch {
      // Fall back to computed if AI returns invalid JSON
      return new Response(JSON.stringify(computeFallback(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
