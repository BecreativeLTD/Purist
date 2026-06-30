// PURIST, Personalized proposal email generator
// Called automatically from /api/audit.ts after every welcome form submission

export interface OnboardingFormData {
  name: string;
  company: string;
  email: string;
  business_type?: string;
  team_size?: string;
  pain_point?: string;
  tools?: string;
  budget?: string;
}

export interface ProposalFormData {
  name: string;
  company: string;
  email: string;
  business_type?: string;
  team_size?: string;
  pain_point?: string;
  tools?: string;
  budget?: string;
  message?: string;
  aiIntro?: string;        // AI-generated unique paragraph per client
  aiInsights?: string[];   // AI-generated bullet insights per client
}

interface Workflow {
  title: string;
  desc: string;
  steps: string[];
  hoursPerWeek: number;
  deployDays: string;
  stack: string[];
}

interface IndustryProfile {
  displayName: string;
  baseHoursPerWeek: number;   // for team size 6-15 (baseline)
  baseHourlyRate: number;     // €/hr fully-loaded cost
  setupPrice: number;         // one-time fee
  workflows: [Workflow, Workflow, Workflow];
  benchmarks: Array<{ metric: string; you: string; top: string; gapPct: number }>;
  caseStudy: {
    quote: string;
    author: string;
    role: string;
    avatarId: number;
    r1v: string; r1k: string;
    r2v: string; r2k: string;
    r3v: string; r3k: string;
  };
}

// ─── HTML escape ──────────────────────────────────────────────────────────────
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Number formatter ─────────────────────────────────────────────────────────
function fmt(n: number): string {
  return n.toLocaleString('en-GB');
}

// ─── First name ───────────────────────────────────────────────────────────────
function firstName(name: string): string {
  return name.split(' ')[0] || name;
}

// ─── Team size multipliers ────────────────────────────────────────────────────
const TEAM_MULTIPLIER: Record<string, number> = {
  '1-5':  0.70,
  '6-15': 1.00,
  '16-50': 1.40,
  '50+':  1.75,
};
const TEAM_HOURLY: Record<string, number> = {
  '1-5':  65,
  '6-15': 80,
  '16-50': 95,
  '50+':  115,
};
const TEAM_LABEL: Record<string, string> = {
  '1-5':  '1–5 people',
  '6-15': '6–15 people',
  '16-50': '16–50 people',
  '50+':  '50+ people',
};
const BUDGET_WITHIN: Record<string, number> = {
  'under-2k': 2000,
  '2k-5k':    5000,
  '5k-10k':   10000,
  '10k-plus': 99999,
  'unknown':  99999,
};

// ─── Pain-point to workflow priority reorder ─────────────────────────────────
// Returns indices [0,1,2] (or reordered) for the 3 workflows based on pain point
function priorityOrder(painPoint: string | undefined): [number, number, number] {
  const map: Record<string, [number, number, number]> = {
    'billing':      [0, 1, 2],
    'client-comms': [1, 0, 2],
    'crm':          [1, 0, 2],
    'data-entry':   [0, 2, 1],
    'documents':    [0, 1, 2],
    'scheduling':   [1, 2, 0],
    'onboarding':   [1, 0, 2],
    'other':        [0, 1, 2],
  };
  return map[painPoint || 'other'] || [0, 1, 2];
}

// ─── Industry profiles ────────────────────────────────────────────────────────
const PROFILES: Record<string, IndustryProfile> = {

  legal: {
    displayName: 'Law Firm / Legal',
    baseHoursPerWeek: 16,
    baseHourlyRate: 80,
    setupPrice: 3400,
    workflows: [
      {
        title: 'Automated Invoice Dispatch, Chasing and Escalation',
        desc: 'Every billing milestone in your practice management system triggers an automatic invoice, generated, formatted, and sent from your own email domain. Unpaid at 7 days: personalised reminder referencing the specific matter. At 14 days: firmer notice with a one-click payment link. At 30 days: your billing partner receives a fully drafted final notice, ready to send with one click. Sequence stops the moment payment is received.',
        steps: [
          'Billing milestone reached → invoice auto-generated with matter reference, fee earner name, and correct bank details',
          'Invoice sent from your own domain, branded, not from a third-party platform',
          'Day +7: personalised reminder sent if unpaid, references the matter by name',
          'Day +14: firmer notice with one-click payment link, professional escalation tone',
          'Day +30: billing partner notified via email with draft final notice attached',
          'Payment received → sequence stops immediately, matter updated, no duplicate messages',
        ],
        hoursPerWeek: 7,
        deployDays: '3 business days',
        stack: ['Clio / Leap', 'Google Workspace', 'Stripe', 'Slack', 'n8n'],
      },
      {
        title: 'Client Intake, Conflict Check and Matter Opening',
        desc: 'Every new enquiry, by email, web form, or referral, triggers a structured intake form within 60 seconds. Once submitted, the system runs an instant conflict-of-interest check against your client database. If clear: matter created, assigned to the right fee earner, client receives a branded welcome email with case reference, assigned solicitor name, and next steps. Intake time drops from 45 minutes to under 4.',
        steps: [
          'New enquiry received via email, web form, or referral → intake form sent within 60 seconds',
          'Client submits form → conflict-of-interest check runs instantly against your database',
          'If clear: matter created and tagged by practice area, assigned to fee earner',
          'Client receives branded welcome email: case reference, assigned solicitor, timeline, next steps',
          'If conflict detected: partner notified immediately, enquiry flagged, no matter opened',
        ],
        hoursPerWeek: 5,
        deployDays: '4 business days',
        stack: ['Clio / Leap', 'Google Forms', 'Gmail', 'n8n'],
      },
      {
        title: 'Deadline Monitoring, Reminders and Partner Escalation',
        desc: 'Every court date, filing deadline, and critical task is monitored continuously. The responsible fee earner receives automated reminders at 30, 14, 7, and 1 day before, by email and SMS. No acknowledgement within 2 hours triggers automatic escalation to the supervising partner. A daily 8am digest of upcoming deadlines lands in each fee earner\'s inbox. Zero manual calendar checking. Zero missed dates.',
        steps: [
          'Deadline or court date added to your system → monitoring picks it up automatically',
          'Reminders sent to responsible fee earner at 30d, 14d, 7d, and 1d before, email and SMS',
          'Fee earner acknowledges with one click → escalation paused and logged',
          'No acknowledgement within 2h of the 1-day reminder → partner notified with full matter details',
          'Daily 8am digest sent to each fee earner: their deadlines for the next 14 days',
        ],
        hoursPerWeek: 4,
        deployDays: '2 business days',
        stack: ['Clio / Leap', 'Google Calendar', 'Gmail', 'SMS', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'Invoice-to-payment cycle', you: '38 days', top: '9 days', gapPct: 76 },
      { metric: 'Client intake time', you: '45 min', top: '4 min', gapPct: 91 },
      { metric: 'Missed deadlines per year', you: '3–5', top: '0', gapPct: 100 },
      { metric: 'Admin as % of total hours', you: '28%', top: '6%', gapPct: 79 },
      { metric: 'Late payment rate', you: '34%', top: '5%', gapPct: 85 },
    ],
    caseStudy: {
      quote: 'We were spending 3 days a month chasing invoices and updating client files. PURIST automated the whole thing. Within 6 weeks our average payment cycle went from 41 days to 9. The intake automation alone saved us hiring an additional paralegal.',
      author: 'James T.', role: 'Managing Partner · 7-person firm · London, UK', avatarId: 12,
      r1v: '41 → 9 days', r1k: 'Payment cycle',
      r2v: '€74,200', r2k: 'Year-1 value',
      r3v: '8 days', r3k: 'Full deployment',
    },
  },

  dental: {
    displayName: 'Dental / Medical Clinic',
    baseHoursPerWeek: 15,
    baseHourlyRate: 78,
    setupPrice: 3000,
    workflows: [
      {
        title: 'Appointment Booking, Patient Record Update and Reminders',
        desc: 'Every new booking, whether from your website, Doctolib, or phone, is logged in your practice management system, the patient file updated, and a personalised confirmation sent immediately. A reminder sequence triggers automatically: 48h before by email, 2h before by SMS. No-show rate drops 60–70% within the first month with zero manual effort.',
        steps: [
          'New booking received from any channel → created in your practice management system within 30 seconds',
          'Patient file updated or created automatically, demographic data, treatment type, assigned practitioner',
          'Personalised confirmation email sent immediately with date, time, location, and prep instructions',
          'Automated reminder: 48h before by email, 2h before by SMS with one-click confirm or reschedule',
          'No-show recorded → reschedule sequence triggered, slot opened for waitlist patient',
        ],
        hoursPerWeek: 6,
        deployDays: '3 business days',
        stack: ['Doctolib / Carestream', 'Google Workspace', 'SMS', 'n8n'],
      },
      {
        title: 'Review Request and Online Reputation Automation',
        desc: '24 hours after each completed appointment, a personalised review request is sent automatically, patient name, practitioner name, treatment type. Negative feedback is captured privately via a satisfaction survey before reaching Google, giving your team the chance to resolve it first. Positive responses are directed straight to your Google Business profile.',
        steps: [
          'Appointment marked complete → review request triggered after 24h automatically',
          'Patient receives personalised message referencing their specific visit',
          'Satisfaction score below 4: private feedback form sent, Google review not requested',
          'Satisfaction score 4–5: direct link to your Google Business profile for review',
          'Monthly review summary sent to practice manager with trend data',
        ],
        hoursPerWeek: 3,
        deployDays: '2 business days',
        stack: ['Google Business Profile', 'Gmail / SMS', 'n8n'],
      },
      {
        title: 'Treatment Plan Follow-up and Patient Recall',
        desc: 'Patients who have accepted a treatment plan but have not booked the next appointment receive a personalised follow-up at 7, 14, and 30 days. Patients due for their 6-month or annual recall are identified automatically and added to a re-engagement sequence with available slots shown. Revenue from recalled patients typically increases 15–22% in the first quarter.',
        steps: [
          'Treatment plan accepted → follow-up sequence triggered if next appointment not booked within 7 days',
          'Personalised messages at 7d, 14d, 30d referencing the specific treatment',
          'Recall due date calculated per patient → added to recall sequence 4 weeks before',
          'Recall message sent with available appointment slots or booking link',
          'Non-responders receive a final friendly nudge at 60 days, then flagged for manual review',
        ],
        hoursPerWeek: 4,
        deployDays: '4 business days',
        stack: ['Carestream / Exact', 'Gmail', 'SMS', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'No-show rate', you: '18%', top: '5%', gapPct: 72 },
      { metric: 'Time to book confirmation', you: '2–4 hours', top: '< 30 sec', gapPct: 95 },
      { metric: 'Patient recall rate', you: '44%', top: '81%', gapPct: 68 },
      { metric: 'Google review response rate', you: '12%', top: '54%', gapPct: 78 },
      { metric: 'Admin hours per week', you: '15h', top: '4h', gapPct: 73 },
    ],
    caseStudy: {
      quote: 'Our no-show rate dropped from 19% to 4% in 6 weeks. The recall automation brought back 38 patients in the first month who had been lapsed for over a year. We stopped hiring a second receptionist, the automation handles everything they were doing.',
      author: 'Dr. Claire M.', role: 'Principal Dentist · 3-chair clinic · Bristol, UK', avatarId: 45,
      r1v: '19% → 4%', r1k: 'No-show rate',
      r2v: '38 patients', r2k: 'Recalled month 1',
      r3v: '€52,400', r3k: 'Year-1 value',
    },
  },

  restaurant: {
    displayName: 'Restaurant / Food & Beverage',
    baseHoursPerWeek: 13,
    baseHourlyRate: 65,
    setupPrice: 2400,
    workflows: [
      {
        title: 'Reservation Management, Confirmation and Staff Alerts',
        desc: 'Every reservation, from your website, Google, TheFork, or phone, is logged automatically, the confirmation sent to the guest, and the right staff notified by SMS or WhatsApp. Table assignments updated in your reservation system. Special requests flagged for the kitchen. Guest history retrieved if they have visited before. Zero manual coordination.',
        steps: [
          'Reservation received from any channel → logged in your system within 15 seconds',
          'Guest receives personalised confirmation with date, time, party size, and any special notes',
          'Relevant staff notified: front-of-house via SMS, kitchen if special dietary requirement',
          'Guest history retrieved, returning customers flagged for personalised welcome',
          'Reminder sent to guest 24h and 2h before reservation with one-tap confirm or cancel',
          'Cancellation → table freed, waitlist guest notified automatically',
        ],
        hoursPerWeek: 5,
        deployDays: '3 business days',
        stack: ['TheFork / Zenchef', 'Google Workspace', 'WhatsApp / SMS', 'n8n'],
      },
      {
        title: 'Review Request and Reputation Management',
        desc: 'A personalised review request is sent 2 hours after each dining experience. Unhappy guests receive a private feedback form before their complaint reaches TripAdvisor or Google, giving you the chance to make it right first. Positive reviews are directed to your Google Business profile. Your Google rating typically improves by 0.3–0.6 stars within 90 days.',
        steps: [
          'Reservation marked as completed → review request triggered 2h after service',
          'Guest receives personalised message referencing their specific visit and occasion',
          'Satisfaction below 4: private resolution form sent, no public review requested',
          'Satisfaction 4–5: direct link to Google Business or TripAdvisor',
          'Weekly review summary delivered to manager with response rate and rating trend',
        ],
        hoursPerWeek: 3,
        deployDays: '2 business days',
        stack: ['Google Business Profile', 'TripAdvisor API', 'Gmail / SMS', 'n8n'],
      },
      {
        title: 'Stock Monitoring, Supplier Orders and Daily Cost Digest',
        desc: 'When key ingredients fall below your defined threshold, a reorder is sent automatically to your supplier. You receive a daily morning brief: current stock levels, items ordered, delivery schedule, and projected cost vs. budget. Waste from over-ordering drops. Stock-outs that affect service become rare. Your food cost percentage improves by an average of 2–4 points.',
        steps: [
          'Stock levels updated at end of each service → system checks against reorder thresholds',
          'Items below threshold → reorder request sent to relevant supplier automatically',
          'Supplier confirmation received → logged, delivery date added to calendar',
          'Daily 7am digest sent to manager: current stock, items ordered, deliveries expected',
          'Weekly food cost report: actual vs. budget, waste flagged, variance explained',
        ],
        hoursPerWeek: 4,
        deployDays: '4 business days',
        stack: ['MarketMan / Lightspeed', 'Gmail', 'WhatsApp', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'No-show rate', you: '22%', top: '6%', gapPct: 73 },
      { metric: 'Time to reservation confirmation', you: '3–8 min', top: '< 15 sec', gapPct: 97 },
      { metric: 'Google rating', you: '4.1', top: '4.7', gapPct: 60 },
      { metric: 'Review response rate', you: '9%', top: '61%', gapPct: 85 },
      { metric: 'Food cost variance', you: '±8%', top: '±2%', gapPct: 75 },
    ],
    caseStudy: {
      quote: 'Our no-shows dropped from 24% to 5% in the first month. We stopped losing weekends to stock panic, the system orders everything before we even notice we need it. Our Google rating went from 4.1 to 4.7 in three months.',
      author: 'Marco V.', role: 'Owner · 65-cover restaurant · Lyon, France', avatarId: 33,
      r1v: '24% → 5%', r1k: 'No-show rate',
      r2v: '4.1 → 4.7', r2k: 'Google rating',
      r3v: '€41,600', r3k: 'Year-1 value',
    },
  },

  ecommerce: {
    displayName: 'E-commerce / Retail',
    baseHoursPerWeek: 14,
    baseHourlyRate: 75,
    setupPrice: 3000,
    workflows: [
      {
        title: 'Abandoned Cart Recovery Sequence',
        desc: 'Customers who abandon their cart receive a 3-step personalised recovery sequence, referencing the exact products left behind, with images and prices. Email at 1 hour, SMS at 24 hours, final offer at 72 hours. Sequence stops the moment the order is placed. Average recovery rate across PURIST e-commerce clients: 13–19% of abandoned carts.',
        steps: [
          'Cart abandoned → sequence triggered after 30 minutes, customer verified as reachable',
          'Hour +1: personalised email with cart contents, product images, and a direct checkout link',
          'Hour +24: SMS reminder with first-name personalisation and direct link',
          'Hour +72: final email with limited-time incentive (free shipping or 5% discount)',
          'Order placed at any point → sequence stops immediately, no further messages',
        ],
        hoursPerWeek: 4,
        deployDays: '3 business days',
        stack: ['Shopify / WooCommerce', 'Klaviyo / Mailchimp', 'SMS', 'n8n'],
      },
      {
        title: 'Post-purchase Review, Upsell and Loyalty Flow',
        desc: 'Seven days after confirmed delivery, a personalised review request is sent, product photo included, one-click submission. Non-reviewers receive a gentle follow-up at 14 days. Based on purchase history, a personalised product recommendation or complementary item is suggested at day 14 for reviewers and day 21 for non-reviewers. LTV increases by an average of 18–27% within 90 days.',
        steps: [
          'Delivery confirmed → review request triggered after 7 days',
          'Personalised email with product image, customer name, one-click review link',
          'No review at 14 days → second gentle request with social proof (total reviews count)',
          'Recommended products selected automatically based on purchase history',
          'Upsell email at day 14–21 with personalised product selection and exclusive discount code',
        ],
        hoursPerWeek: 3,
        deployDays: '3 business days',
        stack: ['Shopify / WooCommerce', 'Klaviyo', 'Google Reviews', 'n8n'],
      },
      {
        title: 'Inventory Alert, Supplier Reorder and Ad Spend Pause',
        desc: 'When any SKU drops below its reorder threshold, a purchase order draft is sent to your supplier. Low-stock products are flagged on your dashboard and, critically, removed from active ad campaigns automatically to prevent spending money promoting items you cannot fulfil. Overstock items are flagged for markdown. Stock accuracy improves significantly within 30 days.',
        steps: [
          'Inventory below threshold → purchase order drafted and sent to supplier automatically',
          'Supplier confirmation received → expected delivery date added to your dashboard',
          'Low-stock SKU → ads paused automatically on Meta and Google to stop wasted spend',
          'Overstock items flagged → markdown suggestion sent to your merchandising inbox',
          'Daily inventory digest: stock levels, items on order, estimated sell-through rates',
        ],
        hoursPerWeek: 4,
        deployDays: '4 business days',
        stack: ['Shopify', 'Google Ads', 'Meta Ads', 'Gmail', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'Cart abandonment recovery rate', you: '2–4%', top: '14–18%', gapPct: 80 },
      { metric: 'Post-purchase review rate', you: '7%', top: '31%', gapPct: 77 },
      { metric: 'Repeat purchase rate (90 days)', you: '19%', top: '38%', gapPct: 50 },
      { metric: 'Stockout incidents per month', you: '6–9', top: '0–1', gapPct: 88 },
      { metric: 'Admin hours per week', you: '14h', top: '4h', gapPct: 71 },
    ],
    caseStudy: {
      quote: 'The abandoned cart flow alone paid for the entire setup in the first 3 weeks. Our recovery rate went from under 3% to 16%. The inventory automation stopped us spending £800/month on ads for products that were out of stock.',
      author: 'Priya S.', role: 'Founder · Fashion e-commerce · 12 staff · Manchester, UK', avatarId: 47,
      r1v: '3% → 16%', r1k: 'Cart recovery rate',
      r2v: '£54,000', r2k: 'Year-1 value',
      r3v: '3 weeks', r3k: 'Payback period',
    },
  },

  agency: {
    displayName: 'Marketing / Creative Agency',
    baseHoursPerWeek: 18,
    baseHourlyRate: 85,
    setupPrice: 3600,
    workflows: [
      {
        title: 'Client Reporting, Auto-generated Monthly Performance Reports',
        desc: 'Monthly performance reports for every client are pulled automatically from Google Analytics, Meta Ads, Google Ads, and LinkedIn. Formatted in your branded template, personalised with the client\'s name and campaign objectives, and sent by email, without anyone on your team touching a spreadsheet. At 5 clients this saves 10h/month. At 20 clients: 40h/month.',
        steps: [
          'Report generation triggered on the 1st of each month per client',
          'Data pulled automatically from Google Analytics, Meta, Google Ads, LinkedIn APIs',
          'Formatted in your branded template with client name, campaign objectives, and period comparison',
          'Key insights section auto-written from performance deltas, highlights and concerns flagged',
          'Report emailed to client and CC\'d to account manager for review before send (optional approval step)',
        ],
        hoursPerWeek: 9,
        deployDays: '4 business days',
        stack: ['Google Analytics', 'Meta Ads API', 'Google Ads API', 'LinkedIn API', 'n8n'],
      },
      {
        title: 'Lead Nurture and Proposal Follow-up Sequence',
        desc: 'Every prospect who requests a proposal or attends a discovery meeting enters a structured 5-touch follow-up sequence if they do not respond within 48 hours. Each message is personalised, professionally timed, and stops automatically the moment they reply, book a call, or convert. Close rate on nurtured leads increases by an average of 34% compared to manual follow-up.',
        steps: [
          'Proposal sent or discovery call completed → 48h wait, then follow-up sequence begins if no reply',
          'Touch 1: value-add email with relevant case study for their industry',
          'Touch 2 (day 5): brief check-in email, low-pressure, one open question',
          'Touch 3 (day 10): social proof email with client result and ROI figure',
          'Touch 4 (day 18): final check-in, politely closing the loop',
          'Reply or booking received at any point → sequence stops immediately',
        ],
        hoursPerWeek: 4,
        deployDays: '2 business days',
        stack: ['HubSpot / Pipedrive', 'Gmail', 'n8n'],
      },
      {
        title: 'Client Onboarding, Fully Automated Welcome Workflow',
        desc: 'The moment a new client signs, the onboarding workflow fires: tasks created in your project management tool, contract sent via DocuSign, kick-off meeting booked via Calendly, client added to Slack, and a branded welcome email sent with their dedicated account manager name, onboarding timeline, and first deliverable date. What used to take 90 minutes takes 4 minutes.',
        steps: [
          'Contract signed → onboarding workflow triggers automatically within 60 seconds',
          'Project created in Asana / ClickUp / Monday with all standard tasks pre-populated',
          'Onboarding questionnaire sent to client, due date set automatically',
          'Client added to dedicated Slack channel and introduced to account manager',
          'Branded welcome email sent: account manager name, timeline, kick-off date, what to expect',
        ],
        hoursPerWeek: 4,
        deployDays: '3 business days',
        stack: ['HubSpot', 'DocuSign', 'Calendly', 'Asana / ClickUp', 'Slack', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'Time to send monthly client report', you: '2–3h/client', top: '< 5 min', gapPct: 97 },
      { metric: 'Lead follow-up response rate', you: '23%', top: '54%', gapPct: 57 },
      { metric: 'Onboarding time per new client', you: '90 min', top: '4 min', gapPct: 96 },
      { metric: 'Client churn (annual)', you: '31%', top: '12%', gapPct: 61 },
      { metric: 'Admin hours per week', you: '18h', top: '5h', gapPct: 72 },
    ],
    caseStudy: {
      quote: 'We had 14 clients and were spending 3 full days a month just on reports. PURIST automated the whole thing. Now reports go out automatically on the 1st of every month. We reinvested those days into two new client pitches and won both.',
      author: 'Sophie K.', role: 'Founder · 8-person digital agency · Amsterdam', avatarId: 25,
      r1v: '3 days → 1h', r1k: 'Monthly reporting',
      r2v: '€78,400', r2k: 'Year-1 value',
      r3v: '2 new clients', r3k: 'Won with saved time',
    },
  },

  realestate: {
    displayName: 'Real Estate Agency',
    baseHoursPerWeek: 18,
    baseHourlyRate: 82,
    setupPrice: 3600,
    workflows: [
      {
        title: 'New Lead Capture, CRM Entry and Agent Assignment',
        desc: 'Every lead from Rightmove, Zoopla, SeLoger, your website, or portals is captured automatically, entered in your CRM with full profile, scored by property interest and location, and routed to the right agent within 60 seconds. Agents receive an instant notification with lead details and a suggested opening message. No lead sits uncontacted for more than 5 minutes.',
        steps: [
          'Lead arrives from any portal or website → CRM entry created within 60 seconds',
          'Lead scored automatically: property type, budget, location match, urgency signals',
          'Routed to the right agent based on territory, property type, and current caseload',
          'Agent notified instantly via SMS and Slack with lead summary and suggested opening line',
          'Automated follow-up if agent has not contacted within 30 minutes',
        ],
        hoursPerWeek: 7,
        deployDays: '3 business days',
        stack: ['Rightmove / Zoopla API', 'HubSpot / Salesforce', 'Slack', 'SMS', 'n8n'],
      },
      {
        title: 'Viewing Follow-up and Offer Nurture Sequence',
        desc: 'After every viewing, a personalised follow-up is sent to the prospect at 24h, 72h, and 7 days. Each message references the specific property, the viewing date, and any notes from the agent. Non-responders enter a long-term nurture sequence with new listings matching their criteria sent automatically. Properties are matched and sent within minutes of listing, not days.',
        steps: [
          'Viewing completed → agent marks done in CRM → follow-up sequence triggers automatically',
          '24h: personalised email referencing specific property, highlights from the viewing',
          '72h: gentle follow-up with 2 similar properties if available',
          '7 days: "are you still looking?" with fresh listings matching their original criteria',
          'Offer submitted → congratulation email, next steps explained, solicitor intro sent',
        ],
        hoursPerWeek: 6,
        deployDays: '3 business days',
        stack: ['HubSpot / Salesforce', 'Gmail', 'Rightmove data', 'n8n'],
      },
      {
        title: 'Vendor and Landlord Monthly Performance Reports',
        desc: 'Every vendor and landlord on your books receives a personalised monthly report, generated automatically: number of viewings, enquiries, online views, comparable sales or rents in their area, and a recommended next step. Reports are formatted in your brand, signed by their assigned agent, and sent without a single manual step. Client satisfaction and retention improves significantly.',
        steps: [
          'Report generation triggered on the agreed date each month per client',
          'Data pulled from your property management system and portals automatically',
          'Formatted in your branded template with client name, property address, and period',
          'Comparable market data added for context, relevant sold/rented comps in the same area',
          'Report emailed from the assigned agent\'s address with a personal closing line',
        ],
        hoursPerWeek: 5,
        deployDays: '4 business days',
        stack: ['Reapit / Jupix', 'Gmail', 'Rightmove / Zoopla', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'Lead response time', you: '3–8 hours', top: '< 5 min', gapPct: 95 },
      { metric: 'Viewing follow-up rate', you: '52%', top: '100%', gapPct: 48 },
      { metric: 'Vendor report turnaround', you: '2–3 days', top: 'Automatic', gapPct: 90 },
      { metric: 'Lead-to-viewing conversion', you: '18%', top: '31%', gapPct: 42 },
      { metric: 'Admin hours per week', you: '18h', top: '5h', gapPct: 72 },
    ],
    caseStudy: {
      quote: 'We were losing leads to competitors simply because we were too slow to respond. PURIST set up instant routing and the viewing follow-up sequence. Our lead-to-viewing rate went from 19% to 33% in 8 weeks. Our vendors love the automated monthly reports.',
      author: 'Daniel B.', role: 'Branch Director · 9-person agency · Paris', avatarId: 52,
      r1v: '19% → 33%', r1k: 'Lead-to-viewing rate',
      r2v: '€89,600', r2k: 'Year-1 value',
      r3v: '7 days', r3k: 'Full deployment',
    },
  },

  saas: {
    displayName: 'SaaS / Tech',
    baseHoursPerWeek: 16,
    baseHourlyRate: 90,
    setupPrice: 4200,
    workflows: [
      {
        title: 'Trial Activation and Feature Adoption Onboarding Sequence',
        desc: 'When a user signs up for a trial, a personalised onboarding sequence triggers based on their role, company size, and use case. Users who have not activated key features within 48 hours receive a targeted nudge, specific to the feature they skipped, not a generic reminder. Activation rate typically increases 35–50% within 60 days. Churned trials drop significantly.',
        steps: [
          'New signup → segmented by role, company size, and self-declared use case',
          'Welcome email sent within 60 seconds with personalised quick-start steps for their role',
          'Day 2: check if key feature activated, if not, targeted nudge email sent',
          'Day 5: progress email showing what they have done vs. what top users do',
          'Day 12: personalised check-in email from a named team member based on their segment',
          'Trial end approaching: tailored conversion email with relevant case study for their industry',
        ],
        hoursPerWeek: 6,
        deployDays: '3 business days',
        stack: ['Segment / Mixpanel', 'Customer.io / Intercom', 'Slack', 'n8n'],
      },
      {
        title: 'Churn Risk Detection, Health Score and Intervention',
        desc: 'Users who have not logged in for 7 days, whose usage has dropped more than 40%, or who have triggered support tickets without resolution are flagged automatically with a health score. Low-score accounts enter a re-engagement sequence. High-value at-risk accounts are escalated to a CSM with a full account summary pre-prepared. Churn caught before it happens.',
        steps: [
          'Health score calculated daily for every account: login frequency, feature usage, support tickets',
          'Score drops below threshold → account flagged, segment determined (at-risk vs. churning)',
          'At-risk: personalised re-engagement email with relevant tip or feature highlight',
          'Churning-signal: CSM alerted via Slack with full account history and recommended talking points',
          'Score recovers → monitoring continues, no further intervention unless score drops again',
        ],
        hoursPerWeek: 5,
        deployDays: '4 business days',
        stack: ['Segment', 'Intercom', 'Slack', 'HubSpot', 'n8n'],
      },
      {
        title: 'Billing Dunning, Failed Payment Recovery and Upgrade Triggers',
        desc: 'Failed payments trigger an immediate dunning sequence, in-app notification, email with one-click update link, and SMS on day 3. Sequence stops the moment payment is recovered. Users approaching plan limits receive personalised upgrade prompts with their specific usage data and a tailored recommendation for the right next plan. Involuntary churn drops 60–70%. Expansion MRR increases.',
        steps: [
          'Payment fails → in-app notification + email sent within 10 minutes with update link',
          'Day 3: SMS sent if card still not updated, concise, urgent, one-click action',
          'Day 7: final warning with account suspension date clearly stated',
          'Payment recovered → sequence stops, no further messages, thank-you confirmation sent',
          'Usage at 80% of plan limit → upgrade email with personalised usage data and plan comparison',
        ],
        hoursPerWeek: 4,
        deployDays: '2 business days',
        stack: ['Stripe', 'Customer.io', 'Intercom', 'SMS', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'Trial-to-paid conversion rate', you: '12%', top: '24%', gapPct: 50 },
      { metric: 'Involuntary churn rate', you: '1.8%/mo', top: '0.5%/mo', gapPct: 72 },
      { metric: 'Feature activation rate (day 7)', you: '31%', top: '67%', gapPct: 54 },
      { metric: 'Failed payment recovery rate', you: '44%', top: '78%', gapPct: 43 },
      { metric: 'Admin hours per week', you: '16h', top: '4h', gapPct: 75 },
    ],
    caseStudy: {
      quote: 'We were losing 2.1% of MRR every month to involuntary churn alone, cards expiring, failed payments, nothing automated. PURIST fixed it in a week. Involuntary churn dropped to 0.4%. The activation sequence added 11 percentage points to our trial conversion.',
      author: 'Thomas R.', role: 'CEO · B2B SaaS · 18-person team · Berlin', avatarId: 68,
      r1v: '2.1% → 0.4%', r1k: 'Involuntary churn',
      r2v: '€96,000', r2k: 'Year-1 value',
      r3v: '+11pp', r3k: 'Trial conversion',
    },
  },

  finance: {
    displayName: 'Finance / Accounting',
    baseHoursPerWeek: 16,
    baseHourlyRate: 82,
    setupPrice: 3200,
    workflows: [
      {
        title: 'Document Collection, Checklists and Escalating Client Reminders',
        desc: 'At the start of each accounting period, every client receives a personalised document request email with a tailored checklist, based on their entity type, previous submissions, and any outstanding items from last period. Reminders escalate automatically at 5, 10, and 15 days. The partner is notified when a client has not responded by the final deadline. Document collection time drops by over 70%.',
        steps: [
          'Period start date reached → personalised document request sent to each client within minutes',
          'Checklist tailored: entity type, VAT registration, payroll, previous year gaps',
          'Day +5: friendly reminder with list of outstanding items',
          'Day +10: firmer reminder noting the filing deadline',
          'Day +15: partner notified, escalation email sent from partner address',
          'All documents received → client notified, file marked complete, work queued',
        ],
        hoursPerWeek: 7,
        deployDays: '3 business days',
        stack: ['Xero / QuickBooks', 'Google Workspace', 'Karbon / TaxCalc', 'n8n'],
      },
      {
        title: 'Invoice Generation, Payment Automation and Late Payment Chasing',
        desc: 'Client invoices are generated automatically at billing milestones and sent from your practice. Payment reminders at 7, 14, and 30 days overdue, each personalised, professional, and referencing the specific engagement. Late payments escalated to the billing partner with a pre-drafted final notice at day 30. Average payment cycle reduces from 42 days to 11 days.',
        steps: [
          'Billing milestone reached → invoice generated with correct fee, VAT, and engagement reference',
          'Invoice sent from your domain to the correct client contact',
          'Day +7: polite reminder with payment link',
          'Day +14: firmer notice with escalating urgency tone',
          'Day +30: partner notified with draft final notice and client payment history',
        ],
        hoursPerWeek: 5,
        deployDays: '3 business days',
        stack: ['Xero / QuickBooks', 'Stripe / GoCardless', 'Gmail', 'n8n'],
      },
      {
        title: 'Filing Deadline Monitoring, Task Assignment and Daily Digest',
        desc: 'VAT deadlines, corporation tax filings, payroll runs, and confirmation statements are monitored automatically. Each deadline triggers task creation and assignment to the right team member at 30, 14, and 7 days before. A daily morning digest of upcoming deadlines is sent to each team member. Partners receive a weekly overview of all approaching deadlines across the practice. Zero missed filings.',
        steps: [
          'Filing deadlines imported from your practice management system',
          'Task created and assigned to responsible team member at 30 days before deadline',
          'Reminders sent at 30d, 14d, 7d, escalating urgency, correct team member',
          'Partner weekly digest: all deadlines in the next 30 days, status per client',
          'Daily 8am digest for each team member: their deadlines for the coming week',
        ],
        hoursPerWeek: 4,
        deployDays: '2 business days',
        stack: ['Karbon / TaxCalc', 'Google Calendar', 'Gmail', 'Slack', 'n8n'],
      },
    ],
    benchmarks: [
      { metric: 'Document collection time per client', you: '12–18 days', top: '3–4 days', gapPct: 74 },
      { metric: 'Invoice-to-payment cycle', you: '42 days', top: '11 days', gapPct: 74 },
      { metric: 'Missed filing incidents per year', you: '2–4', top: '0', gapPct: 100 },
      { metric: 'Chargeable hours lost to admin', you: '22%', top: '6%', gapPct: 73 },
      { metric: 'Client late document rate', you: '41%', top: '11%', gapPct: 73 },
    ],
    caseStudy: {
      quote: 'Document collection used to take us 3 weeks and constant chasing. PURIST cut it to 4 days. Our invoice payment cycle dropped from 44 days to 9. We stopped hiring an admin, the automation handles all of it.',
      author: 'Rachel T.', role: 'Managing Director · 9-person practice · Edinburgh', avatarId: 36,
      r1v: '3 weeks → 4 days', r1k: 'Doc collection',
      r2v: '€67,200', r2k: 'Year-1 value',
      r3v: '0 missed', r3k: 'Filings this year',
    },
  },

};

// Fallback profile for unlisted industries
const FALLBACK_PROFILE: IndustryProfile = {
  displayName: 'Business',
  baseHoursPerWeek: 14,
  baseHourlyRate: 75,
  setupPrice: 2800,
  workflows: [
    {
      title: 'Lead Capture, CRM Update and Follow-up Sequence',
      desc: 'Every new lead, from your website, email, or referral, is captured automatically, entered in your CRM with full context, and a personalised follow-up sequence triggered within minutes. No lead goes cold. No manual data entry. Response time drops from hours to seconds.',
      steps: [
        'Lead received from any source → CRM entry created with full context within 60 seconds',
        'Lead scored and assigned to the right team member automatically',
        'Personalised follow-up email sent within 5 minutes of first contact',
        'Follow-up sequence: day 1, day 3, day 7, stops on reply',
        'Weekly lead summary sent to manager: volume, conversion, response times',
      ],
      hoursPerWeek: 6, deployDays: '3 business days',
      stack: ['HubSpot / Pipedrive', 'Gmail', 'n8n'],
    },
    {
      title: 'Invoice Generation, Sending and Payment Chasing',
      desc: 'Invoices generated and sent automatically at billing milestones. Payment reminders triggered at 7, 14, and 30 days overdue, personalised, professional, and stopping the moment payment is received. Average payment cycle reduces by 60–70% within the first 90 days.',
      steps: [
        'Billing milestone reached → invoice generated and sent automatically',
        'Day +7: polite payment reminder with direct payment link',
        'Day +14: firmer reminder referencing the specific invoice',
        'Day +30: manager notified with draft escalation email ready to send',
        'Payment received → all reminders stop immediately',
      ],
      hoursPerWeek: 5, deployDays: '3 business days',
      stack: ['Xero / QuickBooks', 'Stripe', 'Gmail', 'n8n'],
    },
    {
      title: 'Client Reporting, Automated Monthly Performance Reports',
      desc: 'Monthly reports for all clients generated and sent automatically, pulled from your data sources, formatted in your brand, and emailed on a fixed schedule without manual work. Each report is personalised with the client name, period, and key metrics relevant to their account.',
      steps: [
        'Report generation triggered on the scheduled date for each client',
        'Data pulled from relevant sources automatically',
        'Formatted in your branded template with personalised metrics',
        'Report emailed from your address, CC\'d to account manager',
        'Delivery confirmation logged, unresponsive clients flagged for follow-up',
      ],
      hoursPerWeek: 3, deployDays: '4 business days',
      stack: ['Google Analytics', 'Gmail', 'Google Sheets', 'n8n'],
    },
  ],
  benchmarks: [
    { metric: 'Lead response time', you: '3–6 hours', top: '< 5 min', gapPct: 95 },
    { metric: 'Invoice payment cycle', you: '38 days', top: '10 days', gapPct: 74 },
    { metric: 'Report preparation time', you: '2–4h / client', top: '< 5 min', gapPct: 97 },
    { metric: 'Admin hours per week', you: '14h', top: '3h', gapPct: 79 },
    { metric: 'Follow-up consistency', you: '41%', top: '100%', gapPct: 59 },
  ],
  caseStudy: {
    quote: 'We were spending 15 hours a week on tasks that had nothing to do with our actual work. PURIST automated lead follow-up, invoicing, and monthly reports. Within 90 days we had recovered over €40,000 in value and taken on 3 new clients with the time we freed up.',
    author: 'Alex M.', role: 'Founder · 8-person business · London', avatarId: 15,
    r1v: '15h → 2h', r1k: 'Weekly admin',
    r2v: '€54,600', r2k: 'Year-1 value',
    r3v: '3 new clients', r3k: 'Won with freed time',
  },
};

// ─── Industry resolution ───────────────────────────────────────────────────────
const INDUSTRY_MAP: Record<string, string> = {
  dental: 'dental', legal: 'legal',
  agency: 'agency', ecommerce: 'ecommerce',
  realestate: 'realestate', saas: 'saas',
  finance: 'finance',
  homeservices: 'fallback', construction: 'fallback',
  restaurant: 'restaurant', beauty: 'fallback',
  insurance: 'fallback', education: 'fallback',
  recruitment: 'fallback', travel: 'fallback',
  other: 'fallback',
};

function getProfile(businessType: string | undefined): IndustryProfile {
  const key = INDUSTRY_MAP[businessType || 'other'] || 'fallback';
  return key === 'fallback' ? FALLBACK_PROFILE : (PROFILES[key] || FALLBACK_PROFILE);
}

// ─── ROI calculation ───────────────────────────────────────────────────────────
function calcROI(profile: IndustryProfile, teamSize: string | undefined) {
  const multiplier = TEAM_MULTIPLIER[teamSize || '6-15'] || 1.0;
  const hourly = TEAM_HOURLY[teamSize || '6-15'] || 80;
  const hoursPerWeek = Math.round(profile.baseHoursPerWeek * multiplier);
  const annualValue = hoursPerWeek * hourly * 52;
  const roi = (annualValue / profile.setupPrice).toFixed(1);
  const paybackWeeks = Math.round((profile.setupPrice / (annualValue / 52)) * 10) / 10;
  const month1 = Math.round(annualValue / 12);
  const month3 = Math.round((annualValue / 12) * 3 - profile.setupPrice);
  const month12 = Math.round(annualValue - profile.setupPrice);
  return { hoursPerWeek, hourly, annualValue, roi, paybackWeeks, month1, month3, month12 };
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function isWithinBudget(budget: string | undefined, price: number): boolean {
  const cap = BUDGET_WITHIN[budget || 'unknown'] || 99999;
  return price <= cap;
}

// ─── Pain-point label ─────────────────────────────────────────────────────────
const PAIN_LABELS: Record<string, string> = {
  'data-entry': 'manual data entry and reporting',
  'client-comms': 'client communication and follow-ups',
  'crm': 'lead tracking and CRM updates',
  'billing': 'invoice and billing workflows',
  'documents': 'document generation and contracts',
  'scheduling': 'scheduling and appointment management',
  'onboarding': 'client or staff onboarding',
  'other': 'operational inefficiencies',
};

// ─── FOOTER BLOCK (shared across emails) ─────────────────────────────────────
// Exact match to site Footer.astro: correct URLs, text-link social row,
// gradient wordmark colors from footer-wordmark-shimmer at midpoint.
// SVG icons are stripped by Gmail web — text links are the reliable standard.
function sharedFooter(recipientName: string, recipientCompany: string): string {
  return `
  <!-- FOOTER: FOLLOW THE WORK -->
  <div style="background:#0A0A0A;padding:40px 36px 0;">
    <div style="border-top:1px solid rgba(255,255,255,0.10);padding-top:32px;">
      <p style="font-size:10px;letter-spacing:0.20em;text-transform:uppercase;font-weight:500;color:rgba(255,255,255,0.30);text-align:center;margin:0 0 20px;">Follow the work</p>
      <table style="border-collapse:collapse;margin:0 auto 32px;">
        <tr>
          <td style="padding:0 10px;font-size:12px;"><a href="https://www.tiktok.com/@forgeskills" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">TikTok</a></td>
          <td style="padding:0 10px;font-size:10px;color:rgba(255,255,255,0.15);">&middot;</td>
          <td style="padding:0 10px;font-size:12px;"><a href="https://www.instagram.com/purist.online" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">Instagram</a></td>
          <td style="padding:0 10px;font-size:10px;color:rgba(255,255,255,0.15);">&middot;</td>
          <td style="padding:0 10px;font-size:12px;"><a href="https://www.threads.net/@purist.online" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">Threads</a></td>
          <td style="padding:0 10px;font-size:10px;color:rgba(255,255,255,0.15);">&middot;</td>
          <td style="padding:0 10px;font-size:12px;"><a href="https://x.com/Puristonline" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">X</a></td>
          <td style="padding:0 10px;font-size:10px;color:rgba(255,255,255,0.15);">&middot;</td>
          <td style="padding:0 10px;font-size:12px;"><a href="https://www.pinterest.com/puristonline" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">Pinterest</a></td>
          <td style="padding:0 10px;font-size:10px;color:rgba(255,255,255,0.15);">&middot;</td>
          <td style="padding:0 10px;font-size:12px;"><a href="https://www.linkedin.com/company/purist-automation" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">LinkedIn</a></td>
          <td style="padding:0 10px;font-size:10px;color:rgba(255,255,255,0.15);">&middot;</td>
          <td style="padding:0 10px;font-size:12px;"><a href="https://medium.com/@Purist_Online" style="color:rgba(255,255,255,0.55);text-decoration:none;font-weight:500;">Medium</a></td>
        </tr>
      </table>
      <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:20px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="font-size:10px;color:rgba(255,255,255,0.25);vertical-align:middle;">
              &copy; 2026 PURIST&reg; &nbsp;&middot;&nbsp;
              <a href="https://www.purist.online/pages/privacy-policy" style="color:rgba(255,255,255,0.25);text-decoration:none;">Privacy policy</a> &nbsp;&middot;&nbsp;
              <a href="https://www.purist.online/pages/terms-of-service" style="color:rgba(255,255,255,0.25);text-decoration:none;">Terms of service</a> &nbsp;&middot;&nbsp;
              <a href="https://www.purist.online/pages/accessibility" style="color:rgba(255,255,255,0.25);text-decoration:none;">Accessibility</a>
            </td>
            <td style="font-size:10px;color:rgba(255,255,255,0.25);text-align:right;vertical-align:middle;">
              <a href="https://clutch.co/profile/purist" style="color:rgba(255,255,255,0.25);text-decoration:none;">Verified on Clutch</a> &nbsp;&middot;&nbsp;
              <a href="https://www.producthunt.com/products/purist" style="color:rgba(255,255,255,0.25);text-decoration:none;">Product Hunt</a>
            </td>
          </tr>
        </table>
      </div>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:96px;font-weight:400;letter-spacing:-0.02em;line-height:0.85;margin:0 0 -4px;padding:0;text-align:left;" aria-hidden="true"><span style="color:rgba(232,180,176,0.60);">P</span><span style="color:rgba(248,248,255,0.72);">U</span><span style="color:rgba(164,139,250,0.60);">R</span><span style="color:rgba(232,180,176,0.58);">I</span><span style="color:rgba(248,248,255,0.68);">S</span><span style="color:rgba(164,139,250,0.55);">T</span><span style="font-size:24px;vertical-align:super;color:rgba(164,139,250,0.38);">&#174;</span></p>
    </div>
  </div>
  <div style="background:#0A0A0A;padding:20px 36px 32px;">
    <div style="border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 18px;margin-bottom:14px;">
      <p style="font-size:10.5px;color:rgba(255,255,255,0.20);line-height:1.75;margin:0;"><strong style="color:rgba(255,255,255,0.30);">*Results vary based on business size, industry and existing systems.</strong> Reported metrics are based on aggregated client data and may not reflect your specific outcomes. All automations are deployed on your own infrastructure. PURIST does not store your business data beyond what is required for workflow execution and monitoring.</p>
    </div>
    <p style="font-size:10px;color:rgba(255,255,255,0.15);text-align:center;margin:0 0 6px;">**Free automation audit available for new clients only.</p>
    <p style="font-size:10px;color:rgba(255,255,255,0.10);text-align:center;margin:0;">This email was prepared for ${esc(recipientName)} at ${esc(recipientCompany)}. Confidential.</p>
  </div>`;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function generateProposalEmail(data: ProposalFormData): string {
  const fn = esc(firstName(data.name));
  const company = esc(data.company);
  const profile = getProfile(data.business_type);
  const roi = calcROI(profile, data.team_size);
  const price = profile.setupPrice;
  const withinBudget = isWithinBudget(data.budget, price);
  const teamLabel = TEAM_LABEL[data.team_size || '6-15'] || data.team_size || 'your team';
  const painLabel = PAIN_LABELS[data.pain_point || 'other'] || 'operational inefficiencies';
  const toolsRaw = data.tools ? data.tools.split(',').map(t => t.trim()).filter(Boolean) : [];
  const toolsStr = toolsRaw.length ? esc(toolsRaw.join(', ')) : 'your current tools';

  // Re-order workflows by pain point priority
  const order = priorityOrder(data.pain_point);
  const wfs = order.map(i => profile.workflows[i]);

  const W = (w: Workflow, idx: number) => {
    const annualVal = Math.round(w.hoursPerWeek * (TEAM_HOURLY[data.team_size || '6-15'] || 80) * 52);
    const deployLabel = idx === 0 ? `Deploy first · Highest ROI` : `Deploy days ${idx === 1 ? '4-6' : '7-8'}`;
    return `
    <div style="background:white;border:1px solid rgba(10,10,10,0.08);border-radius:14px;margin-top:12px;overflow:hidden;">
      <div style="padding:18px 20px 0;">
        <div style="font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#bbb;font-weight:700;margin-bottom:6px;">Workflow 0${idx + 1} &middot; ${deployLabel}</div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="vertical-align:top;padding-right:12px;">
              <div style="font-size:15px;font-weight:700;color:#0A0A0A;line-height:1.3;font-family:Georgia,serif;">${esc(w.title)}</div>
            </td>
            <td style="vertical-align:top;width:110px;text-align:right;">
              <span style="background:rgba(10,10,10,0.06);color:#0A0A0A;font-size:11px;font-weight:700;padding:4px 10px;border-radius:99px;border:1px solid rgba(10,10,10,0.1);white-space:nowrap;display:inline-block;">${w.hoursPerWeek}h saved / wk</span>
            </td>
          </tr>
        </table>
      </div>
      <div style="padding:12px 20px;font-size:13.5px;color:#555;line-height:1.72;">${esc(w.desc)}</div>
      <div style="padding:0 20px 14px;">
        <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#ccc;font-weight:700;margin-bottom:8px;">Exact sequence</div>
        ${w.steps.map((s, si) => `
        <table style="width:100%;border-collapse:collapse;margin-bottom:6px;">
          <tr>
            <td style="width:26px;vertical-align:top;padding-right:8px;padding-top:2px;">
              <div style="width:18px;height:18px;background:#0A0A0A;color:white;border-radius:50%;font-size:9px;font-weight:700;text-align:center;line-height:18px;">${si + 1}</div>
            </td>
            <td style="vertical-align:top;font-size:12.5px;color:#555;line-height:1.55;">${esc(s)}</td>
          </tr>
        </table>`).join('')}
      </div>
      <div style="background:#F8F6F1;border-top:1px solid rgba(10,10,10,0.06);padding:12px 20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="vertical-align:top;padding-right:8px;">
              <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#bbb;font-weight:700;margin-bottom:4px;">Time saved</div>
              <div style="font-size:12px;font-weight:700;color:#0A0A0A;">${w.hoursPerWeek}h / week</div>
            </td>
            <td style="vertical-align:top;padding-right:8px;">
              <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#bbb;font-weight:700;margin-bottom:4px;">Annual value</div>
              <div style="font-size:12px;font-weight:700;color:#0A0A0A;">&#8364;${fmt(annualVal)}</div>
            </td>
            <td style="vertical-align:top;padding-right:8px;">
              <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#bbb;font-weight:700;margin-bottom:4px;">Deploy time</div>
              <div style="font-size:12px;font-weight:700;color:#0A0A0A;">${w.deployDays}</div>
            </td>
            <td style="vertical-align:top;">
              <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#bbb;font-weight:700;margin-bottom:4px;">Stack</div>
              <div style="font-size:12px;font-weight:700;color:#0A0A0A;">${w.stack.slice(0, 3).join(' &middot; ')}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>`;
  };

  const BenchmarkRow = (b: { metric: string; you: string; top: string; gapPct: number }) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(10,10,10,0.05);font-size:13px;color:#555;">${esc(b.metric)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid rgba(10,10,10,0.05);font-size:13px;font-weight:700;color:#C97B6A;text-align:center;">${esc(b.you)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid rgba(10,10,10,0.05);font-size:13px;font-weight:700;color:#0A0A0A;text-align:center;">${esc(b.top)}</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(10,10,10,0.05);">
        <div style="background:#F0EDE8;border-radius:99px;height:6px;overflow:hidden;">
          <div style="height:100%;background:linear-gradient(90deg,#E8B4B0,rgba(232,180,176,0.4));border-radius:99px;width:${b.gapPct}%;"></div>
        </div>
      </td>
    </tr>`;

  const cs = profile.caseStudy;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Your automation plan · ${company} × PURIST</title>
<style>
  body{margin:0;padding:0;background:#f0ede8;font-family:-apple-system,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
  @media(max-width:600px){.email-wrap{border-radius:0!important;}.col2{display:block!important;width:100%!important;}}
</style>
</head>
<body>
<div style="background:#f0ede8;padding:32px 16px;">
<div class="email-wrap" style="max-width:660px;margin:0 auto;background:#F8F6F1;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">

  <!-- HEADER -->
  <div style="background:#0A0A0A;padding:36px 36px 28px;">
    <div style="font-family:Georgia,serif;font-size:20px;color:white;letter-spacing:-0.02em;margin-bottom:28px;">PURIST<span style="color:#E8B4B0;">.</span></div>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.18);color:#E8B4B0;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;padding:5px 14px;border-radius:99px;margin-bottom:18px;font-weight:600;">
      <span style="width:5px;height:5px;border-radius:50%;background:#E8B4B0;display:inline-block;"></span>
      Personalised automation analysis · ${company}
    </div>
    <div style="font-family:Georgia,serif;font-size:30px;color:white;line-height:1.2;font-weight:400;margin-bottom:14px;">${fn}, we've mapped<br/><em style="color:#E8B4B0;">your hidden costs.</em></div>
    <p style="font-size:14px;color:rgba(255,255,255,0.38);line-height:1.7;margin:0 0 20px;max-width:480px;">We reviewed your submission in detail. Below is a full operational analysis of ${company}, the inefficiencies we identified, the exact automations we recommend, and the financial impact of each one.</p>
    <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:18px;">
      <span style="display:inline-block;font-size:11px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);padding:4px 12px;border-radius:99px;border:1px solid rgba(255,255,255,0.08);margin:0 6px 6px 0;">${esc(profile.displayName)}</span>
      <span style="display:inline-block;font-size:11px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);padding:4px 12px;border-radius:99px;border:1px solid rgba(255,255,255,0.08);margin:0 6px 6px 0;">${esc(teamLabel)}</span>
      ${toolsRaw.length ? `<span style="display:inline-block;font-size:11px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);padding:4px 12px;border-radius:99px;border:1px solid rgba(255,255,255,0.08);margin:0 6px 6px 0;">Pain: ${esc(painLabel)}</span>` : ''}
      <span style="display:inline-block;font-size:11px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);padding:4px 12px;border-radius:99px;border:1px solid rgba(255,255,255,0.08);margin:0 6px 6px 0;">Tools: ${toolsStr}</span>
    </div>
  </div>

  <!-- BODY -->
  <div style="padding:32px 36px;">

    <!-- Intro -->
    <p style="font-size:15px;line-height:1.8;color:#444;margin:0 0 24px;">
      ${data.aiIntro
        ? esc(data.aiIntro)
        : `We reviewed your profile carefully, your industry, team of ${esc(teamLabel)}, the tools you use daily, and the specific challenge you described: <strong style="color:#0A0A0A;">${esc(painLabel)}</strong>. What follows is not a generic proposal. It is a targeted operational analysis built specifically for ${company}, based on working with similar businesses at your stage.`
      }
    </p>
    ${data.aiInsights && data.aiInsights.length ? `
    <div style="background:rgba(10,10,10,0.03);border-left:3px solid #E8B4B0;border-radius:0 10px 10px 0;padding:16px 20px;margin:0 0 24px;">
      <div style="font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:10px;">Specific observations from your submission</div>
      ${data.aiInsights.map(i => `<div style="font-size:13px;color:#555;line-height:1.65;margin-bottom:6px;">· ${esc(i)}</div>`).join('')}
    </div>` : ''}

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 1: Hidden cost -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:14px;">Section 01 · What this is actually costing ${company} each year</div>
    <div style="background:white;border:1px solid rgba(10,10,10,0.07);border-radius:14px;padding:22px;">
      <p style="font-size:15px;font-weight:700;color:#0A0A0A;margin:0 0 6px;font-family:Georgia,serif;">The true cost of manual operations at your team size</p>
      <p style="font-size:13.5px;color:#777;line-height:1.65;margin:0 0 16px;">Based on a ${esc(teamLabel)} business in ${esc(profile.displayName)}, here is a conservative breakdown of what your current manual processes cost, before any automation.</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:50%;padding:0 8px 8px 0;vertical-align:top;">
            <div style="background:#F8F6F1;border:1px solid rgba(10,10,10,0.07);border-radius:12px;padding:14px 16px;">
              <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#999;font-weight:700;margin-bottom:7px;">${esc(painLabel.charAt(0).toUpperCase() + painLabel.slice(1))}</div>
              <div style="font-size:20px;font-weight:700;color:#C97B6A;font-family:Georgia,serif;">${wfs[0].hoursPerWeek}h / week</div>
              <div style="font-size:11.5px;color:#aaa;margin-top:4px;line-height:1.4;">Primary bottleneck identified from your submission</div>
            </div>
          </td>
          <td style="width:50%;padding:0 0 8px 8px;vertical-align:top;">
            <div style="background:#F8F6F1;border:1px solid rgba(10,10,10,0.07);border-radius:12px;padding:14px 16px;">
              <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#999;font-weight:700;margin-bottom:7px;">Additional admin overhead</div>
              <div style="font-size:20px;font-weight:700;color:#C97B6A;font-family:Georgia,serif;">${roi.hoursPerWeek - wfs[0].hoursPerWeek}h / week</div>
              <div style="font-size:11.5px;color:#aaa;margin-top:4px;line-height:1.4;">Supporting tasks that feed the same bottleneck</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="width:50%;padding:0 8px 0 0;vertical-align:top;">
            <div style="background:#F8F6F1;border:1px solid rgba(10,10,10,0.07);border-radius:12px;padding:14px 16px;">
              <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#999;font-weight:700;margin-bottom:7px;">Hourly cost (fully loaded)</div>
              <div style="font-size:20px;font-weight:700;color:#C97B6A;font-family:Georgia,serif;">€${roi.hourly} / hr</div>
              <div style="font-size:11.5px;color:#aaa;margin-top:4px;line-height:1.4;">Conservative estimate for ${esc(teamLabel)}</div>
            </div>
          </td>
          <td style="width:50%;padding:0 0 0 8px;vertical-align:top;">
            <div style="background:#F8F6F1;border:1px solid rgba(10,10,10,0.07);border-radius:12px;padding:14px 16px;">
              <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#999;font-weight:700;margin-bottom:7px;">Revenue impact (annual)</div>
              <div style="font-size:20px;font-weight:700;color:#C97B6A;font-family:Georgia,serif;">€${fmt(Math.round(roi.annualValue * 0.13))}</div>
              <div style="font-size:11.5px;color:#aaa;margin-top:4px;line-height:1.4;">Estimated opportunity cost and delays caused</div>
            </div>
          </td>
        </tr>
      </table>
      <div style="background:#0A0A0A;border-radius:12px;padding:16px 20px;margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:16px;">
        <div>
          <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:600;margin-bottom:5px;">Total annual cost of inaction</div>
          <div style="font-size:26px;font-family:Georgia,serif;color:white;">€${fmt(roi.annualValue)}</div>
        </div>
        <div style="font-size:11.5px;color:rgba(255,255,255,0.25);line-height:1.5;max-width:200px;text-align:right;">${roi.hoursPerWeek}h/wk × €${roi.hourly}/hr × 52 weeks. Does not include late payment losses or opportunity cost.</div>
      </div>
    </div>

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 2: Benchmark -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:14px;">Section 02 · Where ${company} stands vs. top ${esc(profile.displayName)} businesses</div>
    <div style="background:white;border:1px solid rgba(10,10,10,0.07);border-radius:14px;padding:22px;">
      <p style="font-size:13.5px;color:#777;line-height:1.65;margin:0 0 16px;">Benchmarked against comparable businesses in your industry and size range. Here is where you sit today, and where fully automated operations run.</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#bbb;font-weight:700;text-align:left;padding-bottom:10px;border-bottom:1px solid rgba(10,10,10,0.07);">Metric</th>
            <th style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#C97B6A;font-weight:700;text-align:center;padding-bottom:10px;border-bottom:1px solid rgba(10,10,10,0.07);">You today</th>
            <th style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#0A0A0A;font-weight:700;text-align:center;padding-bottom:10px;border-bottom:1px solid rgba(10,10,10,0.07);">Top businesses</th>
            <th style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#bbb;font-weight:700;text-align:left;padding-bottom:10px;border-bottom:1px solid rgba(10,10,10,0.07);">Gap</th>
          </tr>
        </thead>
        <tbody>
          ${profile.benchmarks.map(b => BenchmarkRow(b)).join('')}
        </tbody>
      </table>
    </div>

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 3: Workflows -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:8px;">Section 03 · Your 3 automations, ranked by ROI</div>
    <p style="font-size:13.5px;color:#777;line-height:1.65;margin:0 0 4px;">Each workflow was selected for your specific situation, ${esc(profile.displayName)}, ${esc(teamLabel)}, ${esc(painLabel)} as primary bottleneck, and ${toolsStr} as your current stack. Deployed in order of financial impact.</p>
    ${wfs.map((w, i) => W(w, i)).join('')}

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 4: ROI -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:14px;">Section 04 · Financial impact · ${company}</div>
    <div style="background:#0A0A0A;border-radius:14px;padding:26px;">
      <div style="font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(232,180,176,0.45);font-weight:700;margin-bottom:18px;">Projected return · Year 1</div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
        <tr>
          <td style="text-align:center;padding:0 8px;">
            <div style="font-size:26px;font-family:Georgia,serif;color:white;">${roi.hoursPerWeek}h</div>
            <div style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-top:4px;">Saved / week</div>
          </td>
          <td style="text-align:center;padding:0 8px;">
            <div style="font-size:26px;font-family:Georgia,serif;color:white;">€${fmt(roi.annualValue)}</div>
            <div style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-top:4px;">Annual value</div>
          </td>
          <td style="text-align:center;padding:0 8px;">
            <div style="font-size:26px;font-family:Georgia,serif;color:#E8B4B0;">${roi.roi}×</div>
            <div style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-top:4px;">ROI year 1</div>
          </td>
          <td style="text-align:center;padding:0 8px;">
            <div style="font-size:26px;font-family:Georgia,serif;color:white;">${roi.paybackWeeks} wks</div>
            <div style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-top:4px;">Payback period</div>
          </td>
        </tr>
      </table>
      <div style="font-size:11.5px;color:rgba(255,255,255,0.22);line-height:1.65;border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;">Calculated at €${roi.hourly}/hr fully-loaded cost for ${esc(teamLabel)}. ${roi.hoursPerWeek}h/week × 52 weeks = ${fmt(roi.hoursPerWeek * 52)} hours annually = €${fmt(roi.annualValue)} value recovered. Setup investment: €${fmt(price)} one-time. Net year-1 gain: €${fmt(roi.month12)}.</div>
    </div>

    <!-- Month projection -->
    <table style="width:100%;border-collapse:collapse;border-radius:14px;overflow:hidden;margin-top:12px;border:1px solid rgba(10,10,10,0.08);">
      <tr>
        <td style="background:white;padding:18px;text-align:center;border-right:1px solid rgba(10,10,10,0.06);">
          <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#bbb;font-weight:700;margin-bottom:6px;">Month 1</div>
          <div style="font-size:22px;font-family:Georgia,serif;color:#0A0A0A;">+€${fmt(roi.month1)}</div>
          <div style="font-size:11.5px;color:#aaa;margin-top:4px;">First month all 3 workflows live</div>
        </td>
        <td style="background:white;padding:18px;text-align:center;border-right:1px solid rgba(10,10,10,0.06);">
          <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#bbb;font-weight:700;margin-bottom:6px;">Month 3</div>
          <div style="font-size:22px;font-family:Georgia,serif;color:#0A0A0A;">+€${fmt(roi.month3)}</div>
          <div style="font-size:11.5px;color:#aaa;margin-top:4px;">Cumulative, net of setup cost</div>
        </td>
        <td style="background:white;padding:18px;text-align:center;">
          <div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#bbb;font-weight:700;margin-bottom:6px;">Month 12</div>
          <div style="font-size:22px;font-family:Georgia,serif;color:#0A0A0A;">+€${fmt(roi.month12)}</div>
          <div style="font-size:11.5px;color:#aaa;margin-top:4px;">Net year-1 gain, confirmed at 90 days</div>
        </td>
      </tr>
    </table>

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 5: Case study -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:14px;">Section 05 · A similar business, 12 months later</div>
    <div style="background:white;border:1px solid rgba(10,10,10,0.07);border-radius:14px;padding:22px;">
      <div style="font-size:15px;font-family:Georgia,serif;color:#0A0A0A;line-height:1.55;font-style:italic;margin-bottom:18px;padding-left:16px;border-left:2px solid #E8B4B0;">&ldquo;${esc(cs.quote)}&rdquo;</div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
        <img src="https://i.pravatar.cc/76?img=${cs.avatarId}" alt="${esc(cs.author)}" width="38" height="38" style="border-radius:50%;border:2px solid #F0EDE8;"/>
        <div>
          <div style="font-size:14px;font-weight:700;color:#0A0A0A;">${esc(cs.author)}</div>
          <div style="font-size:11.5px;color:#aaa;">${esc(cs.role)}</div>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#F8F6F1;border-radius:12px;overflow:hidden;border:1px solid rgba(10,10,10,0.07);">
        <tr>
          <td style="text-align:center;padding:14px;border-right:1px solid rgba(10,10,10,0.07);">
            <div style="font-size:17px;font-weight:700;color:#0A0A0A;font-family:Georgia,serif;">${esc(cs.r1v)}</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:#bbb;margin-top:3px;font-weight:700;">${esc(cs.r1k)}</div>
          </td>
          <td style="text-align:center;padding:14px;border-right:1px solid rgba(10,10,10,0.07);">
            <div style="font-size:17px;font-weight:700;color:#0A0A0A;font-family:Georgia,serif;">${esc(cs.r2v)}</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:#bbb;margin-top:3px;font-weight:700;">${esc(cs.r2k)}</div>
          </td>
          <td style="text-align:center;padding:14px;">
            <div style="font-size:17px;font-weight:700;color:#0A0A0A;font-family:Georgia,serif;">${esc(cs.r3v)}</div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:#bbb;margin-top:3px;font-weight:700;">${esc(cs.r3k)}</div>
          </td>
        </tr>
      </table>
    </div>

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 6: Bonuses -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:14px;">Section 06 · Included at no extra cost · Total value €1,450</div>
    <div style="background:#0A0A0A;border-radius:14px;padding:22px;">
      ${[
        ['&#128203;', 'SOP documentation for all 3 workflows', 'Worth &#8364;350', 'Full written documentation of every automation, how it works, what triggers it, how to modify it. Your team understands every process. Yours to keep forever.'],
        ['&#128202;', 'Live monitoring dashboard &middot; 90 days included', 'Worth &#8364;400', 'Real-time view of every automation run, trigger, and output. Cumulative time and money saved updated daily. You see exactly what is happening at all times.'],
        ['&#128269;', 'Day-45 optimisation review', 'Worth &#8364;300', 'At day 45, your PURIST engineer reviews all workflow performance data and implements up to 3 refinements at no charge, based on real usage patterns.'],
        ['&#9889;', 'Priority deployment queue', 'Worth &#8364;200', 'Your project goes to the front of our deployment queue. Workflow 1 build starts on day 1 after credential handover. Reserved for clients who confirm within 72 hours of receiving this proposal.'],
        ['&#127891;', 'Team walkthrough session (recorded)', 'Worth &#8364;200', 'A recorded Loom walkthrough for your team explaining what each automation does, what they need to do differently (usually nothing), and how to read the dashboard.'],
      ].map(([icon, title, val, desc]) => `
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.05);">
        <tr>
          <td style="width:50px;vertical-align:top;padding-right:14px;">
            <div style="background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.2);border-radius:8px;width:36px;height:36px;text-align:center;line-height:36px;font-size:16px;">${icon}</div>
          </td>
          <td style="vertical-align:top;">
            <div style="font-size:14px;font-weight:600;color:white;margin-bottom:4px;">${title} <span style="font-size:11px;color:#E8B4B0;background:rgba(232,180,176,0.1);padding:2px 8px;border-radius:99px;font-weight:600;">${val}</span></div>
            <div style="font-size:12px;color:rgba(255,255,255,0.35);line-height:1.55;">${desc}</div>
          </td>
        </tr>
      </table>`).join('')}
      <div style="font-size:11.5px;color:rgba(255,255,255,0.2);text-align:center;margin-top:4px;">Priority queue bonus expires 72 hours after this email was sent.</div>
    </div>

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- SECTION 7: Investment -->
    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:14px;">Section 07 · Your investment</div>
    <div style="background:white;border:1px solid rgba(10,10,10,0.07);border-radius:14px;padding:22px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
        <tr>
          <td style="vertical-align:middle;">
            <div style="font-size:36px;font-family:Georgia,serif;color:#0A0A0A;line-height:1;">€${fmt(price)}</div>
            <div style="font-size:12.5px;color:#aaa;margin-top:5px;">One-time setup fee · 90-day monitoring and support included</div>
          </td>
          ${withinBudget ? `<td style="vertical-align:middle;text-align:right;white-space:nowrap;padding-left:16px;">
            <span style="display:inline-block;background:#0A0A0A;color:#ffffff;font-size:11px;font-weight:700;padding:9px 20px;border-radius:99px;letter-spacing:0.04em;white-space:nowrap;">Within your stated budget</span>
          </td>` : ''}
        </tr>
      </table>
      ${[
        '3 production automations built, tested and deployed in your exact environment',
        'Full error handling, retry logic, and real-time alerting, nothing runs silently',
        'Live monitoring dashboard showing every run and output in real time',
        'Dedicated Slack channel with direct access to your PURIST engineer, 7 days a week',
        'All edge cases handled, exceptions, errors, and escalations fully covered',
        '90-day ROI report with confirmed hours saved and net financial impact',
        'All 5 bonuses included: SOP docs, day-45 review, team walkthrough, priority queue, dashboard',
        '30-day fix-or-refund guarantee, if anything underperforms, we fix it in 48h or refund in full',
      ].map(item => `
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        <tr>
          <td style="width:24px;vertical-align:top;padding-right:8px;padding-top:2px;">
            <div style="width:16px;height:16px;background:#0A0A0A;color:white;border-radius:50%;font-size:8px;font-weight:700;text-align:center;line-height:16px;">&#10003;</div>
          </td>
          <td style="vertical-align:top;font-size:13.5px;color:#444;line-height:1.5;">${esc(item)}</td>
        </tr>
      </table>`).join('')}
    </div>

    <!-- Guarantee -->
    <div style="background:white;border:1px solid rgba(10,10,10,0.07);border-radius:14px;padding:18px;margin-top:12px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:40px;vertical-align:top;padding-right:14px;font-size:22px;line-height:1;">&#128737;</td>
          <td style="vertical-align:top;">
            <div style="font-size:14px;font-weight:700;color:#0A0A0A;margin-bottom:5px;">30-day fix-or-refund guarantee &middot; No questions asked</div>
            <div style="font-size:13px;color:#666;line-height:1.65;">If any of the 3 workflows does not perform exactly as described in this proposal within the first 30 days, we fix it within 48 hours or issue a full refund. We have never had to use it, but it is there, in writing.</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Social proof -->
    <table style="width:100%;border-collapse:collapse;background:#F0EDE8;border-radius:14px;overflow:hidden;margin-top:12px;">
      <tr>
        ${[['500+','Workflows deployed'],['99.97%','Uptime SLA'],['6 wks','Avg. payback period'],['4.9/5','Client rating']].map(([v,k]) => `
        <td style="text-align:center;padding:16px 8px;border-right:1px solid rgba(10,10,10,0.06);">
          <div style="font-size:18px;font-family:Georgia,serif;color:#0A0A0A;">${v}</div>
          <div style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#aaa;margin-top:4px;font-weight:600;">${k}</div>
        </td>`).join('')}
      </tr>
    </table>

    <hr style="border:none;border-top:1px solid rgba(10,10,10,0.07);margin:28px 0;"/>

    <!-- CTA -->
    <div style="background:#0A0A0A;border-radius:14px;padding:32px;text-align:center;">
      <div style="display:inline-block;background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.18);color:rgba(232,180,176,0.7);font-size:11px;padding:4px 14px;border-radius:99px;margin-bottom:18px;letter-spacing:0.1em;">Priority queue · Closes in 72 hours</div>
      <div style="font-family:Georgia,serif;font-size:26px;color:white;margin-bottom:10px;font-weight:400;line-height:1.25;">Ready to recover<br/><em style="color:#E8B4B0;">${roi.hoursPerWeek} hours every week?</em></div>
      <p style="font-size:13.5px;color:rgba(255,255,255,0.35);margin:0 0 24px;line-height:1.7;max-width:380px;margin-left:auto;margin-right:auto;">Reply to this email with &ldquo;yes&rdquo; and we send the onboarding form and invoice within 2 hours. Your first workflow goes live in 3 business days. No call required.</p>
      <a href="https://www.purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:15px 40px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:-0.01em;">Accept this plan and get started</a>
      <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:14px 0 0;">Or simply reply &ldquo;yes&rdquo; to this email. Hugo reads every reply personally.</p>
    </div>

  </div>

  ${sharedFooter(data.name, data.company)}

</div>
</div>
</body>
</html>`;
}

// ─── ONBOARDING FOLLOW-UP EMAIL ───────────────────────────────────────────────
// Sent 2 minutes after the proposal. Personalized CTA + onboarding preparation.
export interface OnboardingFormData {
  name: string;
  company: string;
  email: string;
  business_type?: string;
  team_size?: string;
  pain_point?: string;
  tools?: string;
  budget?: string;
}

export function generateOnboardingEmail(data: OnboardingFormData): string {
  const { name, company, business_type, team_size, pain_point, tools, budget } = data;
  const fn = firstName(name);
  const industryKey = (business_type || '').toLowerCase();

  type OnboardingProfile = {
    readyIn: string;
    step1Title: string; step1Body: string;
    step2Title: string; step2Body: string;
    step3Title: string; step3Body: string;
    ctaLine: string;
    firstWinLabel: string;
  };

  const onboardingProfiles: Record<string, OnboardingProfile> = {
    ecommerce: {
      readyIn: '3 business days',
      step1Title: 'Connect your store data',
      step1Body: 'We will need read access to your Shopify or WooCommerce store and your fulfilment system. No coding required — we handle the connection.',
      step2Title: 'Map your order flow',
      step2Body: 'We document the exact journey from purchase to delivery confirmation. This takes 30 minutes on a call or async via Loom.',
      step3Title: 'Live in 72 hours',
      step3Body: 'Order routing, inventory sync, and customer notification workflows go live. You watch it run in your new monitoring dashboard.',
      ctaLine: 'Your abandoned cart and post-purchase flows can be live before the weekend.',
      firstWinLabel: 'First automation live',
    },
    saas: {
      readyIn: '3 business days',
      step1Title: 'Share your toolstack credentials',
      step1Body: 'We will need API access to your CRM, support inbox, and billing system. We use read/write scopes only where needed — nothing more.',
      step2Title: 'Define your activation trigger',
      step2Body: 'We identify the exact event that signals a user is stuck or about to churn, then build the intervention sequence around it.',
      step3Title: 'Onboarding sequences go live',
      step3Body: 'Trial-to-paid nudge, churn early-warning, and internal alert workflows activate. Your dashboard tracks every run in real time.',
      ctaLine: 'Trial-to-paid conversion improvements show results within the first 14 days.',
      firstWinLabel: 'First automation live',
    },
    agency: {
      readyIn: '3 business days',
      step1Title: 'Connect your project management tools',
      step1Body: 'We integrate with ClickUp, Asana, Monday, or Notion — wherever your projects live. Client-facing portals can be connected too.',
      step2Title: 'Map your client delivery cycle',
      step2Body: 'We document your delivery stages and identify where status updates, approvals, and reporting currently take manual time.',
      step3Title: 'Client reporting goes on autopilot',
      step3Body: 'Automated status emails, approval reminders, and weekly performance reports activate. Your team stops chasing clients.',
      ctaLine: 'Your team will reclaim 8-12 hours per week starting week one.',
      firstWinLabel: 'First automation live',
    },
    healthcare: {
      readyIn: '4 business days',
      step1Title: 'HIPAA-compliant credentials review',
      step1Body: 'We review your existing data handling setup and ensure all workflow connections meet HIPAA requirements before any integration begins.',
      step2Title: 'Map your patient intake flow',
      step2Body: 'We identify where appointment reminders, intake forms, and follow-up sequences are currently done manually.',
      step3Title: 'Scheduling and follow-up go live',
      step3Body: 'Automated appointment reminders, no-show re-booking, and discharge follow-up sequences activate in your existing EHR environment.',
      ctaLine: 'No-show rates typically drop 30-40% within the first 30 days.',
      firstWinLabel: 'First automation live',
    },
    legal: {
      readyIn: '4 business days',
      step1Title: 'Secure document access setup',
      step1Body: 'We establish encrypted connections to your matter management system and document storage. All access is logged and auditable.',
      step2Title: 'Map your intake and billing cycle',
      step2Body: 'We document the journey from lead inquiry to matter open, and from time entry to invoice sent — identifying every manual step.',
      step3Title: 'Billing and intake flows go live',
      step3Body: 'Automated invoice generation, late payment follow-up, and new client intake sequences activate. Your team stops chasing payments.',
      ctaLine: 'Firms using this system collect invoices 18 days faster on average.',
      firstWinLabel: 'First automation live',
    },
    real_estate: {
      readyIn: '3 business days',
      step1Title: 'Connect your CRM and listing tools',
      step1Body: 'We integrate with your CRM (HubSpot, Follow Up Boss, etc.) and your listing platform. Lead routing rules take 20 minutes to configure.',
      step2Title: 'Map your lead response cycle',
      step2Body: 'We document how leads come in, how fast you respond today, and where deals stall. This informs which automations to build first.',
      step3Title: 'Lead nurture goes live',
      step3Body: 'Automated first-response within 2 minutes, multi-touch drip sequences, and showing feedback collection go live across all lead sources.',
      ctaLine: 'Agents using this system close 40% more leads with no additional outreach effort.',
      firstWinLabel: 'First automation live',
    },
  };

  const profileKey = Object.keys(onboardingProfiles).find(k => industryKey.includes(k)) ?? 'saas';
  const profile = onboardingProfiles[profileKey] ?? onboardingProfiles['saas'];

  const toolsLine = tools
    ? `<p style="font-size:14px;color:rgba(255,255,255,0.45);line-height:1.7;margin:0 0 6px;">We already know your stack: <strong style="color:rgba(255,255,255,0.65);">${esc(tools)}</strong>. We will plug directly into what you have — no new software, no migration.</p>`
    : '';

  const budgetNote = budget
    ? `<p style="font-size:13px;color:rgba(255,255,255,0.28);line-height:1.6;margin:0;">Your stated budget aligns with this deployment. You will not be asked to spend more than you indicated.</p>`
    : '';

  const teamNote = team_size ? `a team of ${team_size}` : 'your team';

  const painLine = pain_point
    ? `<div style="background:rgba(232,180,176,0.08);border-left:3px solid #E8B4B0;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;"><div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:6px;">Your primary goal</div><div style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.6;">${esc(pain_point)}</div></div>`
    : '';

  const stepsHtml = [
    { num: '01', title: profile.step1Title, body: profile.step1Body, timing: 'Day 0 &mdash; Confirmation' },
    { num: '02', title: profile.step2Title, body: profile.step2Body, timing: 'Day 1 &mdash; Setup call or async Loom' },
    { num: '03', title: profile.step3Title, body: profile.step3Body, timing: `Day 1&ndash;${profile.readyIn}` },
  ].map(({ num, title, body, timing }) => `
    <div style="background:white;border:1px solid rgba(10,10,10,0.07);border-radius:14px;padding:22px;margin-bottom:12px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:44px;vertical-align:top;padding-right:16px;">
            <div style="width:36px;height:36px;background:#0A0A0A;border-radius:8px;text-align:center;line-height:36px;font-size:12px;font-weight:700;color:#E8B4B0;letter-spacing:0.05em;">${num}</div>
          </td>
          <td style="vertical-align:top;">
            <div style="font-size:11px;color:#aaa;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:5px;">${timing}</div>
            <div style="font-size:15px;font-weight:700;color:#0A0A0A;margin-bottom:7px;">${title}</div>
            <div style="font-size:13px;color:#555;line-height:1.65;">${body}</div>
          </td>
        </tr>
      </table>
    </div>`).join('');

  const prepItemsHtml = [
    ['&#128273;', 'Admin access to your main tools', 'Not ownership — just admin or API-level access. We will specify exactly what scopes we need.'],
    ['&#128196;', 'A list of your most repetitive weekly tasks', 'Think: what does your team do on repeat that should not require a human? A quick voice note or list works perfectly.'],
    ['&#128202;', 'One month of baseline data', 'Volume of emails, tickets, orders, or tasks processed per week. Rough numbers are fine — we use this to size the ROI correctly.'],
    ['&#127775;', 'One person as your internal point of contact', 'They do not need to be technical. They just need to be available for 30 minutes during the setup phase.'],
  ].map(([icon, title, desc]) => `
      <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
        <tr>
          <td style="width:42px;vertical-align:top;padding-right:12px;">
            <div style="background:rgba(232,180,176,0.1);border:1px solid rgba(232,180,176,0.2);border-radius:8px;width:34px;height:34px;text-align:center;line-height:34px;font-size:15px;">${icon}</div>
          </td>
          <td style="vertical-align:top;">
            <div style="font-size:13.5px;font-weight:600;color:white;margin-bottom:3px;">${title}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.35);line-height:1.55;">${desc}</div>
          </td>
        </tr>
      </table>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Your PURIST onboarding is ready, ${esc(fn)}</title>
</head>
<body style="margin:0;padding:0;background:#F8F6F1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<div style="max-width:620px;margin:0 auto;background:#F8F6F1;">

  <div style="background:#0A0A0A;padding:11px 28px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:600;">PURIST &nbsp;&middot;&nbsp; Onboarding Preparation</td>
        <td style="text-align:right;font-size:10px;color:rgba(255,255,255,0.18);">Confidential &nbsp;&middot;&nbsp; ${esc(company)}</td>
      </tr>
    </table>
  </div>

  <div style="background:#0A0A0A;padding:48px 36px 40px;">
    ${painLine}
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(232,180,176,0.6);font-weight:700;margin-bottom:14px;">Step 2 of 2 &mdash; Getting ${esc(teamNote)} ready</div>
    <div style="font-family:Georgia,serif;font-size:30px;color:white;font-weight:400;line-height:1.2;margin-bottom:14px;">${esc(fn)}, here is what<br/><em style="color:#E8B4B0;">happens next.</em></div>
    <p style="font-size:14px;color:rgba(255,255,255,0.45);line-height:1.75;margin:0 0 10px;">You submitted your audit request. The proposal landed in your inbox a few minutes ago. This email exists for one reason: so you can start preparing your side before our first interaction.</p>
    ${toolsLine}
    ${budgetNote}
  </div>

  <div style="padding:32px 36px;">

    <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#E8B4B0;font-weight:700;margin-bottom:18px;">Your 3-step onboarding &mdash; starts the moment you say yes</div>
    ${stepsHtml}

    <div style="background:#0A0A0A;border-radius:14px;padding:26px;margin-top:8px;margin-bottom:24px;">
      <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(232,180,176,0.6);font-weight:700;margin-bottom:16px;">What to have ready before we start</div>
      ${prepItemsHtml}
    </div>

    <div style="background:#F0EDE8;border-radius:14px;padding:22px;margin-bottom:24px;text-align:center;">
      <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#aaa;font-weight:600;margin-bottom:8px;">${profile.firstWinLabel}</div>
      <div style="font-family:Georgia,serif;font-size:20px;color:#0A0A0A;margin-bottom:8px;">${profile.ctaLine}</div>
      <div style="font-size:12px;color:#888;">Timeline starts the moment you confirm.</div>
    </div>

    <div style="background:#0A0A0A;border-radius:14px;padding:32px;text-align:center;">
      <div style="font-family:Georgia,serif;font-size:22px;color:white;margin-bottom:10px;font-weight:400;line-height:1.3;">One reply. That is all it takes.</div>
      <p style="font-size:13.5px;color:rgba(255,255,255,0.35);margin:0 0 24px;line-height:1.75;max-width:360px;margin-left:auto;margin-right:auto;">Reply &ldquo;<strong style="color:rgba(255,255,255,0.55);">yes</strong>&rdquo; to this email or to the proposal. Hugo will send the onboarding form and invoice within 2 hours. Workflow 1 builds on day 1.</p>
      <a href="https://www.purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0A0A0A;padding:15px 44px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:-0.01em;">Accept the plan &rarr;</a>
      <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:14px 0 0;">Or just reply &ldquo;yes&rdquo; here. No forms, no calls required.</p>
    </div>

    <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(10,10,10,0.07);">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="vertical-align:top;width:44px;padding-right:14px;">
            <div style="width:40px;height:40px;background:#0A0A0A;border-radius:50%;text-align:center;line-height:40px;font-size:15px;font-weight:700;color:#E8B4B0;">H</div>
          </td>
          <td style="vertical-align:top;">
            <div style="font-size:14px;font-weight:700;color:#0A0A0A;">Hugo</div>
            <div style="font-size:12px;color:#aaa;">Founder &mdash; PURIST &nbsp;&middot;&nbsp; <a href="mailto:hello@purist.online" style="color:#aaa;text-decoration:none;">hello@purist.online</a></div>
            <div style="font-size:12px;color:#bbb;margin-top:3px;">Reply directly. I read every message.</div>
          </td>
        </tr>
      </table>
    </div>

  </div>

  ${sharedFooter(data.name, data.company)}

</div>
</body>
</html>`;
}
