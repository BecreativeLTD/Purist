import type { APIRoute } from 'astro';

export const prerender = false;

interface ROIInput {
  industry?: string;
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

// Industry-specific savings rates
const INDUSTRY_SAVINGS: Record<string, number> = {
  saas:        0.72,
  ecommerce:   0.65,
  agency:      0.68,
  realestate:  0.62,
  healthcare:  0.70,
  legal:       0.55,
  finance:     0.75,
  logistics:   0.61,
  hr:          0.73,
  hospitality: 0.58,
};

function computeFallback(input: ROIInput): ROIResult {
  const { industry, employees, hoursPerWeek, hourlyRate, tools, mainTasks } = input;

  const savingRate = industry ? (INDUSTRY_SAVINGS[industry] ?? 0.70) : 0.70;
  const currentCost = Math.round(employees * hoursPerWeek * 52 * hourlyRate);
  const hoursSavedPerWeek = parseFloat((employees * hoursPerWeek * savingRate).toFixed(1));
  const automationSavings = Math.round(employees * (hoursPerWeek * savingRate) * 52 * hourlyRate);

  const toolComplexity = tools.length > 5 ? 1.4 : tools.length > 2 ? 1.15 : 1;
  const implementationCost = Math.round(Math.min(employees * 700, 14000) * toolComplexity);

  const roiMonths = implementationCost > 0
    ? parseFloat((implementationCost / (automationSavings / 12)).toFixed(1))
    : 1;
  const roiPercent = implementationCost > 0
    ? Math.round(((automationSavings - implementationCost) / implementationCost) * 100)
    : 999;

  const toolMap: Record<string, string> = {
    'Data entry & copy-paste':       'n8n + Airtable',
    'Report generation':             'n8n + Google Looker Studio',
    'Lead follow-up & outreach':     'n8n + HubSpot',
    'Client onboarding':             'n8n + Notion',
    'Invoice & billing processing':  'n8n + Stripe',
    'Customer support tickets':      'n8n + Intercom',
    'Cross-tool data sync':          'n8n + Make',
    'Manual email campaigns':        'n8n + Instantly',
    'Usage report generation':       'n8n + Metabase',
    'User onboarding sequences':     'n8n + Customer.io',
    'Billing & dunning flows':       'n8n + Stripe',
    'Order processing & fulfillment': 'n8n + Shopify',
    'Inventory level updates':       'n8n + Google Sheets',
    'Client reporting':              'n8n + Notion',
    'Time tracking & invoicing':     'n8n + Harvest',
    'Invoice processing':            'n8n + QuickBooks',
    'Bank reconciliation':           'n8n + Xero',
    'Resume screening & sorting':    'n8n + Greenhouse',
    'Interview scheduling':          'n8n + Calendly',
    'Appointment reminders':         'n8n + Twilio',
    'Shipment tracking updates':     'n8n + ShipStation',
  };

  const activeTasks = mainTasks.length > 0 ? mainTasks : ['Cross-tool data sync', 'Report generation'];
  const hoursPerTask = parseFloat(((employees * hoursPerWeek * savingRate) / activeTasks.length).toFixed(1));

  const breakdown: BreakdownItem[] = activeTasks.slice(0, 5).map(task => ({
    task,
    hoursSaved: hoursPerTask,
    annualSaving: Math.round(employees * hoursPerTask * 52 * hourlyRate),
    automationTool: toolMap[task] || 'n8n + custom workflow',
  }));

  const topTool = tools[0] || 'your current tools';
  const topTask = activeTasks[0]?.toLowerCase() || 'manual data work';

  return {
    currentCost,
    automationSavings,
    implementationCost,
    roiMonths,
    roiPercent,
    hoursSavedPerWeek,
    breakdown,
    topOpportunities: [
      `Automate ${topTask} — reclaim ~${Math.round(hoursPerWeek * 0.3 * employees)} hours/week across your team`,
      `Auto-generate reports weekly (5 min vs. ${Math.round(hoursPerWeek * 0.25 * employees)} hours of manual work)`,
      `Deploy follow-up sequences — avg. 82% open rate, zero additional headcount`,
    ],
    recommendation: `With ${employees} team member${employees > 1 ? 's' : ''} losing ${hoursPerWeek}h/week, your potential savings are $${Math.round(automationSavings / 1000)}k/year. The highest-impact starting point is ${topTask} — automating ${topTool} workflows typically delivers the fastest ROI. Full payback in ${roiMonths} months. Book a free audit to lock in your top 3 workflows.`,
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as ROIInput;
    const { industry, employees, hoursPerWeek, hourlyRate, tools, mainTasks } = body;

    if (!employees || !hoursPerWeek || !hourlyRate) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentCost = Math.round(employees * hoursPerWeek * 52 * hourlyRate);

    const openRouterKey =
      import.meta.env.OPENROUTER_API_KEY ||
      (typeof process !== 'undefined' ? process.env.OPENROUTER_API_KEY : '') ||
      import.meta.env.OpenRouter;

    if (!openRouterKey) {
      return new Response(JSON.stringify(computeFallback(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const industryLabel = industry
      ? industry.charAt(0).toUpperCase() + industry.slice(1)
      : 'General business';

    const prompt = `You are a business automation ROI expert. Return ONLY valid JSON, no markdown.

Business profile:
- Industry: ${industryLabel}
- Team size: ${employees} people
- Manual hours lost/week per person: ${hoursPerWeek}
- Average hourly rate: $${hourlyRate}
- Tools in use: ${tools.join(', ') || 'not specified'}
- Main time-consuming tasks: ${mainTasks.join(', ') || 'general manual work'}
- Annual cost of manual work: $${currentCost}

Using real automation project data for ${industryLabel}, return this exact JSON:

{
  "currentCost": ${currentCost},
  "automationSavings": <annual savings, 60-80% of currentCost based on industry>,
  "implementationCost": <realistic one-time cost, typically $3,000–$14,000>,
  "roiMonths": <months to break even, 1 decimal>,
  "roiPercent": <annual ROI percentage>,
  "hoursSavedPerWeek": <total team hours saved per week>,
  "breakdown": [
    {
      "task": "<task name>",
      "hoursSaved": <hours saved per week for this task>,
      "annualSaving": <annual saving in dollars>,
      "automationTool": "<specific tool combo like n8n + HubSpot>"
    }
  ],
  "topOpportunities": [
    "<specific opportunity 1 — quantified>",
    "<specific opportunity 2 — quantified>",
    "<specific opportunity 3 — quantified>"
  ],
  "recommendation": "<2-3 sentence recommendation mentioning their specific tools (${tools.slice(0, 2).join(', ')}) and highest-impact tasks — in English>"
}

Rules:
- All monetary values in USD, no $ symbol in numbers
- Tools should reference what they actually use: ${tools.join(', ')}
- topOpportunities must be specific and include numbers
- recommendation must be in English and mention their actual tools/tasks
- Return ONLY the JSON object`;

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.purist.online',
        'X-Title': 'Purist ROI Calculator',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a business automation ROI expert. Return ONLY valid JSON, no markdown, no explanation.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1200,
        temperature: 0.2,
      }),
    });

    if (!aiRes.ok) {
      return new Response(JSON.stringify(computeFallback(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiRes.json();
    const raw = aiData.choices?.[0]?.message?.content?.trim() ?? '';

    let parsed: ROIResult;
    try {
      const cleaned = raw
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
      parsed = JSON.parse(cleaned);
      parsed.currentCost = currentCost;

      if (!parsed.automationSavings || !parsed.breakdown || !Array.isArray(parsed.breakdown)) {
        throw new Error('Invalid structure');
      }
    } catch {
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
