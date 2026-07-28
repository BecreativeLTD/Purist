export type FreeGuideWorkflow = {
  name: string;
  desc: string;
  time: string;
  roi: string;
  complexity: 'Low' | 'Medium' | 'High';
};

export type FreeGuide = {
  id: string;
  label: string;
  metaLabel: string;
  accentColor: string;
  headline: string;
  intro: string;
  stats: [string, string][];
  tools: string[];
  workflows: FreeGuideWorkflow[];
  checklist: string[];
};

export const freeGuides: FreeGuide[] = [
  {
    id: 'dental',
    label: 'Dental & Healthcare',
    metaLabel: 'dental practices and healthcare clinics',
    accentColor: '#E8B4B0',
    headline: 'Reclaim 14 hours a week. No extra staff.',
    intro: 'Dental practices run on relationships and precision — but 60% of a practice manager\'s week disappears into admin. This guide breaks down the exact automation stack we deploy for every dental client, in priority order.',
    stats: [['14h/wk', 'saved on average'], ['62%', 'no-show reduction'], ['€3,300/mo', 'staff cost recovered'], ['6 days', 'to deploy']],
    tools: ['n8n', 'Google Calendar', 'Twilio / Sinch (SMS)', 'HubSpot or Carestream', 'Stripe / GoCardless', 'Gmail'],
    workflows: [
      { name: 'Appointment reminder sequence', desc: 'Automated SMS + email at 48h, 24h and 2h before each appointment. Cancellations trigger an instant rebooking offer to the waitlist.', time: '45 min/day saved', roi: '€930/mo', complexity: 'Low' },
      { name: 'Recall campaign automation', desc: 'Re-engages patients overdue for a checkup by treatment type and risk profile with a personalised 3-touch sequence.', time: '2 hrs/wk saved', roi: '€1,400/mo new revenue', complexity: 'Medium' },
      { name: 'Insurance pre-auth form collection', desc: 'Sends the pre-auth form automatically, reminds after 48h, and forwards completed forms straight to billing.', time: '1 hr/day saved', roi: '€580/mo', complexity: 'Medium' },
      { name: 'Billing reconciliation workflow', desc: 'Reconciles daily PMS exports against Stripe/GoCardless settlements and flags discrepancies automatically.', time: '30 min/day saved', roi: '€460/mo', complexity: 'Low' },
      { name: 'Patient feedback & review requests', desc: 'Sends a 1-question NPS survey 48h post-treatment; high scores get a Google review link, low scores alert the manager.', time: '1 hr/wk saved', roi: 'Reputation + revenue', complexity: 'Low' },
    ],
    checklist: [
      'List every manual touchpoint in your patient journey (booking → recall)',
      'Identify your no-show rate over the last 90 days',
      'Check whether your PMS has a webhook or API for appointment events',
      'Pick the one workflow above with the fastest payback and start there',
    ],
  },
  {
    id: 'agency',
    label: 'Agency & Consulting',
    metaLabel: 'agencies and consulting firms',
    accentColor: '#7B68EE',
    headline: 'Deliver faster. Bill more. Admin less.',
    intro: 'Agencies win on speed and creativity — but 15+ hours a week disappear into project admin, reporting, and client communication. Here is the automation stack we deploy for every agency client.',
    stats: [['15h/wk', 'saved per team'], ['60%', 'faster client delivery'], ['3–4 tools', 'eliminated'], ['€3,950/mo', 'cost recovered']],
    tools: ['n8n', 'HubSpot / Pipedrive', 'Notion / ClickUp', 'Xero / QuickBooks', 'Slack', 'DocuSign / PandaDoc'],
    workflows: [
      { name: 'Client onboarding automation', desc: 'Contract signed → brief form sent → Notion workspace created → Slack channel opened → kickoff scheduled. Zero manual steps.', time: '3 hrs/client saved', roi: '€1,400/mo', complexity: 'Medium' },
      { name: 'Automated weekly status reports', desc: 'Every Friday, pulls tasks, hours and budget spend into a branded report emailed to the client and posted to Slack.', time: '4 hrs/wk saved', roi: '€1,600/mo', complexity: 'Medium' },
      { name: 'Milestone invoice generation', desc: 'Task marked complete → invoice auto-created and sent, with a 7/14/21-day chase sequence if unpaid.', time: '2 hrs/wk saved', roi: '€930/mo + cashflow', complexity: 'Low' },
      { name: 'Lead qualification from contact forms', desc: 'AI classifies budget, intent and fit from every form submission, then alerts sales or starts a nurture sequence.', time: '5 hrs/wk saved', roi: '€1,860/mo', complexity: 'Medium' },
      { name: 'Internal task routing from client requests', desc: 'AI classifies incoming client emails and creates the right task, assigned to the right person, automatically.', time: '1 hr/day saved', roi: '€460/mo + quality', complexity: 'High' },
    ],
    checklist: [
      'Time how long onboarding a new client actually takes today',
      'Count how many tools your reporting touches before it reaches the client',
      'Check how many invoices went out late last quarter',
      'Pick the one workflow above with the fastest payback and start there',
    ],
  },
  {
    id: 'ecom',
    label: 'E-commerce',
    metaLabel: 'e-commerce and retail brands',
    accentColor: '#C89840',
    headline: 'More revenue. Less support. Runs 24/7.',
    intro: 'E-commerce operations are 80% repeatable — but most brands still process returns manually and lose hours to inventory management. This is the full automation stack for e-commerce.',
    stats: [['70%', 'support tickets eliminated'], ['34%', 'more recovered revenue'], ['18h/wk', 'ops time saved'], ['99.7%', 'fulfilment accuracy']],
    tools: ['n8n', 'Shopify', 'Klaviyo', 'Zendesk / Gorgias', 'Slack', 'Shipping carrier APIs'],
    workflows: [
      { name: 'Abandoned cart recovery sequence', desc: 'A 3-step email/SMS sequence (social proof → urgency → discount) with dynamic content based on cart value.', time: 'Manual: 3 hrs/wk', roi: '+€3,700/mo recovered', complexity: 'Low' },
      { name: 'AI support triage & auto-resolution', desc: 'Classifies every ticket and auto-resolves Tier-1 requests (order status, tracking) instantly.', time: '6 hrs/day saved', roi: '€3,300/mo', complexity: 'Medium' },
      { name: 'Inventory alert & reorder trigger', desc: 'Stock drops below threshold → Slack alert → auto-generated purchase order to the supplier if critical.', time: '1 hr/day saved', roi: 'Stockout prevention', complexity: 'Medium' },
      { name: 'Post-purchase review request sequence', desc: 'Delivery confirmed → review request after 48h; 5-star reviews get public links, low scores get flagged first.', time: '2 hrs/wk saved', roi: '+Reputation compounding', complexity: 'Low' },
      { name: 'Return & refund processing', desc: 'AI validates the return against policy, generates the label, and issues the refund once the item is scanned back in.', time: '3 hrs/wk saved', roi: '€1,400/mo + CSAT', complexity: 'High' },
    ],
    checklist: [
      'Calculate your current cart abandonment rate and average order value',
      'Count support tickets that are pure "where is my order" questions',
      'Check if your inventory system exposes a webhook for stock levels',
      'Pick the one workflow above with the fastest payback and start there',
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    metaLabel: 'real estate agencies and letting teams',
    accentColor: '#4ade80',
    headline: 'Close 40% more deals with the same team.',
    intro: 'Real estate agents spend 60% of their time on admin — lead follow-up, viewing confirmations, document generation. This stack automates the entire pipeline from portal lead to signed contract.',
    stats: [['12h/wk', 'saved per agent'], ['40%', 'more deals closed'], ['85%', 'faster lead response'], ['€2,900/mo', 'recovered per agent']],
    tools: ['n8n', 'Salesforce / Reapit', 'Portal APIs (Rightmove, Zoopla)', 'DocuSign', 'Twilio', 'Google Calendar'],
    workflows: [
      { name: 'Portal lead capture & instant follow-up', desc: 'New portal lead → scored and entered in CRM → personalised email + SMS within 90 seconds → phone task if no reply in 4h.', time: '2 hrs/agent/day saved', roi: '€1,200/mo', complexity: 'Medium' },
      { name: 'Viewing confirmation & reminder flow', desc: 'Instant confirmation with map link, 24h and 2h reminders, plus an automated feedback form after the viewing.', time: '45 min/agent/day saved', roi: '€700/mo', complexity: 'Low' },
      { name: 'Offer document generation', desc: 'Deal reaches "Offer" stage → memo auto-populated and sent for e-signature → memorandum of sale generated on acceptance.', time: '45 min/deal saved', roi: '€930/mo', complexity: 'Medium' },
      { name: 'Landlord & tenant onboarding pack', desc: 'Tenancy agreed → full onboarding pack (AST, standing order, utilities) sent automatically, with chase-ups on unsigned docs.', time: '1 hr/tenancy saved', roi: '€580/mo', complexity: 'Medium' },
      { name: 'Commission invoice automation', desc: 'Deal marked completed → commission calculated and invoiced automatically, with an automated chase sequence.', time: '30 min/deal saved', roi: '€700/mo + cashflow', complexity: 'Low' },
    ],
    checklist: [
      'Time your average lead response speed over the last 30 days',
      'Count how many viewings had no confirmation or reminder sent',
      'Check what percentage of your commission invoices go out late',
      'Pick the one workflow above with the fastest payback and start there',
    ],
  },
  {
    id: 'saas',
    label: 'SaaS / Tech',
    metaLabel: 'SaaS and tech companies',
    accentColor: '#E8B4B0',
    headline: 'Scale revenue operations without scaling headcount.',
    intro: 'Product-led growth creates volume, but revenue operations can\'t keep up. This stack automates the full customer lifecycle — trial to enterprise.',
    stats: [['11h/wk', 'ops time saved'], ['3×', 'faster trial-to-paid'], ['€4,400/mo', 'recovered'], ['42%', 'churn reduction']],
    tools: ['n8n', 'HubSpot / Salesforce', 'Stripe', 'Intercom', 'Mixpanel / Amplitude', 'Slack'],
    workflows: [
      { name: 'Trial activation & onboarding sequence', desc: 'Behaviour-triggered (not time-based) onboarding emails, with CS alerted on low engagement and an upgrade prompt on activation.', time: '4 hrs/wk saved', roi: '€2,600/mo new revenue', complexity: 'High' },
      { name: 'Churn risk early warning', desc: 'Daily health score across login frequency, feature usage and payment health triggers CS outreach before churn happens.', time: '3 hrs/wk saved', roi: '€1,860/mo prevented churn', complexity: 'High' },
      { name: 'Expansion revenue triggers', desc: 'Account hits a usage limit → personalised upgrade sequence with ROI calculation and a one-click contract update.', time: '2 hrs/wk saved', roi: '€2,300/mo expansion', complexity: 'Medium' },
      { name: 'NPS closed-loop feedback system', desc: 'Quarterly NPS survey routes promoters to case studies/reviews and detractors to an immediate CS intervention.', time: '2 hrs/wk saved', roi: 'Retention compounding', complexity: 'Medium' },
      { name: 'Revenue reporting automation', desc: 'Weekly MRR, churn and pipeline digest compiled automatically and posted to Slack and the board inbox.', time: '3 hrs/wk saved', roi: '€930/mo', complexity: 'Low' },
    ],
    checklist: [
      'Map your trial-to-paid conversion funnel and where it leaks',
      'Check if you have a health score, even a rough one, per account',
      'List every manual step in your current weekly revenue reporting',
      'Pick the one workflow above with the fastest payback and start there',
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Legal',
    metaLabel: 'finance, accounting and legal firms',
    accentColor: '#C89840',
    headline: 'Compliance handled. Clients retained. Revenue protected.',
    intro: 'Finance and legal firms face high compliance burden, high client expectations, and billable-time pressure, all at once. Automation solves all three without touching the core advisory work.',
    stats: [['13h/wk', 'admin time saved'], ['95%', 'compliance task accuracy'], ['€4,200/mo', 'recovered'], ['28%', 'more billable hours']],
    tools: ['n8n', 'Salesforce Financial Services', 'DocuSign', 'Companies House / HMRC API', 'Xero', 'PandaDoc'],
    workflows: [
      { name: 'Client onboarding & KYC automation', desc: 'Engagement letter signed → KYC pack sent → docs verified → risk score assigned → portal access granted automatically.', time: '3 hrs/client saved', roi: '€1,600/mo', complexity: 'High' },
      { name: 'Deadline tracking & compliance alerts', desc: 'Statutory deadlines imported and chased automatically at 60/30/7/1-day intervals, with tasks created when action is needed.', time: '2 hrs/day saved', roi: '€1,400/mo + liability avoidance', complexity: 'Medium' },
      { name: 'Time billing & invoice automation', desc: 'Time entries roll up into an auto-generated invoice each month, with a short review window before it goes out.', time: '4 hrs/month saved', roi: '€930/mo + cashflow', complexity: 'Medium' },
      { name: 'Document generation & e-signature', desc: 'Standard documents (NDAs, engagement letters) are merged from CRM data, sent for signature, and filed automatically.', time: '1 hr/doc saved', roi: '€1,200/mo', complexity: 'Low' },
      { name: 'Referral tracking & partner payments', desc: 'Referral logged → commission calculated on signature → partner payment triggered and confirmed automatically.', time: '2 hrs/wk saved', roi: 'Partner retention', complexity: 'Medium' },
    ],
    checklist: [
      'List every compliance deadline you track manually today',
      'Check how many invoices are delayed by the monthly review step',
      'Count how many standard documents you draft from scratch each month',
      'Pick the one workflow above with the fastest payback and start there',
    ],
  },
];
