export interface FreeTool {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: 'live' | 'coming-soon';
  icon: string; // heroicon-style path
  badge: string;
}

export const freeTools: FreeTool[] = [
  {
    slug: 'cron-expression-builder',
    name: 'Cron Expression Builder & Explainer',
    tagline: 'Turn any cron expression into plain English, or build one from scratch.',
    category: 'Scheduling',
    status: 'live',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    badge: 'Instant',
  },
  {
    slug: 'n8n-workflow-validator',
    name: 'n8n Workflow JSON Validator',
    tagline: 'Paste your workflow JSON, catch orphaned connections and missing credentials before you import it.',
    category: 'n8n',
    status: 'live',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    badge: 'Instant',
  },
  {
    slug: 'webhook-inspector',
    name: 'Webhook Inspector',
    tagline: 'Get a temporary URL, send it a request from anywhere, see the full payload live.',
    category: 'Development',
    status: 'coming-soon',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    badge: 'Coming soon',
  },
  {
    slug: 'automate-or-not',
    name: '"Automate or Not" Decision Score',
    tagline: 'Answer 5 questions about a task, get a scored verdict on whether it is worth automating.',
    category: 'Strategy',
    status: 'live',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    badge: 'Free · 2 min',
  },
  {
    slug: 'automation-platform-cost-calculator',
    name: 'Zapier vs Make vs n8n Cost Calculator',
    tagline: 'Enter your real task volume, get the real monthly cost on all three platforms.',
    category: 'Cost',
    status: 'live',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    badge: 'Instant',
  },
  {
    slug: 'ai-api-cost-estimator',
    name: 'AI API Cost Estimator',
    tagline: 'Estimate your monthly Claude, GPT and DeepSeek API cost before you build the agent.',
    category: 'AI',
    status: 'live',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    badge: 'Instant',
  },
  {
    slug: 'json-csv-converter',
    name: 'JSON ⇄ CSV Converter',
    tagline: 'Paste either format, get a clean conversion in the other, ready for the next node.',
    category: 'Development',
    status: 'live',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4',
    badge: 'Instant',
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester for Automation',
    tagline: 'Test a pattern against real sample text and get a plain-English explanation of what it matches.',
    category: 'Development',
    status: 'live',
    icon: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z',
    badge: 'Instant',
  },
  {
    slug: 'automation-opportunity-finder',
    name: 'Automation Opportunity Finder',
    tagline: 'Describe a process in plain language, get an AI-scored breakdown of what to automate first.',
    category: 'AI',
    status: 'coming-soon',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    badge: 'Coming soon',
  },
];
