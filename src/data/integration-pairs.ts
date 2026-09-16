export type Complexity = 'simple' | 'intermediate' | 'complex';

export interface IntegrationPair {
  slug: string;
  tools: string[];
  complexity: Complexity;
  category: string;
  headline: string;
  intro: string;
  painPoint: string;
  steps: { title: string; body: string; branch?: string }[];
  benefits: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export const COMPLEXITY_META: Record<Complexity, { label: string; blurb: string; color: string }> = {
  simple: {
    label: 'Simple',
    blurb: 'Two tools, one clear trigger, one clear action.',
    color: '#7BAEA0',
  },
  intermediate: {
    label: 'Intermediate',
    blurb: 'Several tools with a conditional branch, an AI decision replaces manual triage.',
    color: '#C4A870',
  },
  complex: {
    label: 'Complex',
    blurb: 'A full multi-system pipeline with branching logic, retries, and exception handling.',
    color: '#c4847e',
  },
};

export const integrationPairs: IntegrationPair[] = [
  {
    slug: 'stripe-quickbooks',
    tools: ['Stripe', 'QuickBooks'],
    complexity: 'simple',
    category: 'Finance & Billing',
    headline: 'Stripe + QuickBooks, automated reconciliation',
    intro: 'Every Stripe payment, refund, and payout automatically creates and matches the corresponding entry in QuickBooks, no exporting CSVs, no manual matching at month-end.',
    painPoint: 'Finance teams typically spend 4–8 hours a month manually matching Stripe payouts against QuickBooks invoices, a process that gets worse as transaction volume grows and breaks silently when Stripe fees or partial refunds throw off the numbers.',
    steps: [
      { title: 'Trigger', body: 'A Stripe payment succeeds, fails, or is refunded.' },
      { title: 'Match', body: 'The workflow looks up the corresponding QuickBooks invoice or creates one if it does not exist.' },
      { title: 'Reconcile', body: 'Stripe fees are recorded as a separate line item so your books reflect the exact net deposit, not just the gross charge.' },
      { title: 'Alert', body: 'Any mismatch (amount, currency, missing invoice) is flagged to your finance channel instead of failing silently.' },
    ],
    benefits: [
      { value: '4–8h/mo', label: 'reconciliation time eliminated' },
      { value: '99.8%', label: 'typical post-deploy accuracy' },
      { value: 'Same-day', label: 'books closed instead of month-end scramble' },
    ],
    faqs: [
      { q: 'Does this handle partial refunds and disputes?', a: 'Yes, partial refunds, full refunds, and chargebacks are all mapped to the correct QuickBooks entries, including the Stripe fee adjustment.' },
      { q: 'What if we use Xero instead of QuickBooks?', a: 'The same pattern works with Xero, see our dedicated Stripe + Xero integration guide.' },
      { q: 'Does this replace our accountant?', a: 'No, it removes the manual data entry your accountant or bookkeeper currently does, so their time goes to actual accounting, not copy-pasting.' },
    ],
  },
  {
    slug: 'stripe-xero',
    tools: ['Stripe', 'Xero'],
    complexity: 'simple',
    category: 'Finance & Billing',
    headline: 'Stripe + Xero, automated reconciliation',
    intro: 'Every Stripe transaction is automatically recorded and reconciled in Xero, with fees broken out as their own line item, so your books match your bank deposits exactly.',
    painPoint: 'Without automation, reconciling Stripe payouts against Xero invoices means manually checking that the net deposit (gross minus Stripe fees) matches what landed in the bank, a fiddly, error-prone process most finance teams do by hand every month.',
    steps: [
      { title: 'Trigger', body: 'A Stripe charge, refund, or payout event fires.' },
      { title: 'Match', body: 'The workflow finds the matching Xero invoice or draft bill, or creates one.' },
      { title: 'Reconcile', body: 'Stripe fees are posted to a dedicated expense account so the net deposit ties out perfectly.' },
      { title: 'Sync', body: 'Bank feed reconciliation in Xero is pre-matched, turning a manual review into a one-click confirm.' },
    ],
    benefits: [
      { value: '4–8h/mo', label: 'reconciliation time eliminated' },
      { value: '99.8%', label: 'typical post-deploy accuracy' },
      { value: 'Zero', label: 'manual CSV exports' },
    ],
    faqs: [
      { q: 'Does this work with Xero multi-currency?', a: 'Yes, multi-currency Stripe payouts are converted and reconciled against the correct Xero currency accounts.' },
      { q: 'What about Stripe subscriptions and recurring billing?', a: 'Recurring charges are handled the same way as one-off payments, each renewal reconciles automatically.' },
    ],
  },
  {
    slug: 'hubspot-slack',
    tools: ['HubSpot', 'Slack'],
    complexity: 'simple',
    category: 'CRM & Sales',
    headline: 'HubSpot + Slack, real-time deal alerts',
    intro: 'The moment a deal changes stage, a high-value lead comes in, or a deal goes cold, the right Slack channel gets notified instantly, no more sales reps checking HubSpot fifty times a day.',
    painPoint: 'Sales momentum dies in the gap between a lead landing in the CRM and a rep actually seeing it. Teams relying on manual CRM checks routinely lose hours of response time on their hottest leads.',
    steps: [
      { title: 'Trigger', body: 'A HubSpot deal is created, changes stage, or a lead score crosses your threshold.' },
      { title: 'Enrich', body: 'The workflow pulls deal value, contact details, and last activity into a single message.' },
      { title: 'Route', body: 'Notifications go to the right Slack channel or DM based on deal owner, territory, or deal size.' },
      { title: 'Escalate', body: 'Deals with no activity after N days trigger a separate stale-deal alert to the sales manager.' },
    ],
    benefits: [
      { value: '<90 sec', label: 'typical lead-to-notification time' },
      { value: '2–3×', label: 'faster rep response time reported by clients' },
      { value: '0', label: 'manual CRM polling' },
    ],
    faqs: [
      { q: 'Can this route by territory or deal size?', a: 'Yes, routing logic is fully custom, by owner, region, deal value, or any HubSpot property.' },
      { q: 'Does it work with HubSpot workflows we already have?', a: 'It runs alongside your existing HubSpot automation, it does not replace HubSpot\'s native workflow tool, it extends it into Slack with richer logic.' },
    ],
  },
  {
    slug: 'shopify-klaviyo',
    tools: ['Shopify', 'Klaviyo'],
    complexity: 'simple',
    category: 'E-commerce',
    headline: 'Shopify + Klaviyo, behavioural email that goes beyond templates',
    intro: 'Cart abandonment, post-purchase, win-back, and replenishment flows driven by real Shopify order and browsing data, not just Klaviyo\'s default triggers.',
    painPoint: 'Klaviyo\'s native Shopify integration covers the basics, but custom logic (discount ladders that protect margin, product-specific replenishment timing, VIP segmentation by lifetime value) usually requires manual list management or gets skipped entirely.',
    steps: [
      { title: 'Trigger', body: 'A cart is abandoned, an order is placed, or a customer crosses a lifetime-value threshold.' },
      { title: 'Segment', body: 'Customers are scored and segmented dynamically based on order history, not a static list.' },
      { title: 'Personalise', body: 'Email content, discount level, and send timing are calculated per customer instead of a single blanket flow.' },
      { title: 'Sync back', body: 'Engagement data flows back into Shopify customer tags for future segmentation.' },
    ],
    benefits: [
      { value: '15–25%', label: 'typical cart recovery lift' },
      { value: 'Margin-safe', label: 'discount logic prevents race-to-the-bottom offers' },
      { value: 'Real-time', label: 'segmentation, not nightly batch' },
    ],
    faqs: [
      { q: 'Does this replace Klaviyo?', a: 'No, Klaviyo remains your sending platform, this adds the custom logic and data layer Klaviyo\'s native triggers do not cover.' },
      { q: 'Can it work with subscription/replenishment products?', a: 'Yes, replenishment timing is calculated per product based on actual consumption patterns from order history.' },
    ],
  },
  {
    slug: 'google-calendar-twilio',
    tools: ['Google Calendar', 'Twilio'],
    complexity: 'simple',
    category: 'Scheduling & Communication',
    headline: 'Google Calendar + Twilio, appointment reminders that actually reduce no-shows',
    intro: 'Automated SMS reminder cascades (48h, 2h before) tied directly to your calendar, plus instant waitlist-fill when a slot cancels.',
    painPoint: 'No-shows cost service businesses real revenue, industry data consistently shows automated SMS reminders cut no-show rates by 30%+, but most businesses still rely on manual phone calls or no reminder system at all.',
    steps: [
      { title: 'Trigger', body: 'A Google Calendar event is created, updated, or cancelled.' },
      { title: 'Schedule', body: 'Reminder SMS messages are queued at 48h and 2h before the appointment.' },
      { title: 'Confirm', body: 'Clients can confirm or cancel by replying to the SMS, updating the calendar event automatically.' },
      { title: 'Waitlist fill', body: 'A cancellation triggers an instant offer to the next person on the waitlist.' },
    ],
    benefits: [
      { value: '30–76%', label: 'no-show reduction reported by clients' },
      { value: 'Instant', label: 'waitlist fill on cancellation' },
      { value: '0', label: 'manual reminder calls' },
    ],
    faqs: [
      { q: 'Does this work with booking platforms other than raw Google Calendar?', a: 'Yes, we integrate the same pattern with Calendly, Acuity, Cliniko, and most scheduling tools that sync to Google Calendar.' },
      { q: 'Can clients reschedule via SMS?', a: 'Yes, reply-based rescheduling is available, it routes back into your calendar and re-triggers the reminder sequence for the new time.' },
    ],
  },
  {
    slug: 'salesforce-docusign',
    tools: ['Salesforce', 'DocuSign'],
    complexity: 'simple',
    category: 'CRM & Documents',
    headline: 'Salesforce + DocuSign, contracts generated the moment a deal closes',
    intro: 'When a Salesforce opportunity moves to Closed Won, a pre-filled contract is generated and sent for signature automatically, with the signed document synced back to the opportunity record.',
    painPoint: 'Manual contract generation, pulling deal terms from Salesforce, filling a template, and tracking signature status by hand, typically adds 2–5 days to deal closing and introduces copy-paste errors into legal documents.',
    steps: [
      { title: 'Trigger', body: 'A Salesforce opportunity is marked Closed Won.' },
      { title: 'Generate', body: 'Deal terms (pricing, scope, dates) populate a DocuSign template automatically.' },
      { title: 'Send & track', body: 'The contract is sent for signature, with status tracked directly on the Salesforce record.' },
      { title: 'File', body: 'The fully-executed document is attached back to the opportunity and triggers your onboarding workflow.' },
    ],
    benefits: [
      { value: '2–5 days', label: 'faster contract turnaround' },
      { value: '0', label: 'copy-paste errors in legal documents' },
      { value: 'Real-time', label: 'signature status visible in Salesforce' },
    ],
    faqs: [
      { q: 'Can this handle multiple contract templates?', a: 'Yes, template selection can be driven by deal type, product, or region, whatever logic your contracts actually require.' },
      { q: 'Does it work with HubSpot instead of Salesforce?', a: 'The same pattern works with HubSpot, Pipedrive, or any CRM with an API.' },
    ],
  },
  {
    slug: 'typeform-airtable',
    tools: ['Typeform', 'Airtable'],
    complexity: 'simple',
    category: 'Forms & Data',
    headline: 'Typeform + Airtable, structured data without the manual cleanup',
    intro: 'Form responses land in Airtable already validated, deduplicated, and routed to the right table, view, and team member, not a raw CSV export waiting to be sorted.',
    painPoint: 'Typeform\'s native Airtable integration dumps every response into one table. Real operational use, routing by response type, flagging duplicates, triggering follow-up tasks, usually still means manual sorting after the fact.',
    steps: [
      { title: 'Trigger', body: 'A Typeform response is submitted.' },
      { title: 'Validate', body: 'Email format, required fields, and duplicate submissions are checked before anything is written.' },
      { title: 'Route', body: 'Responses are written to the correct Airtable table and view based on their content, not a single catch-all list.' },
      { title: 'Notify', body: 'The relevant team member is notified with a direct link to the new record.' },
    ],
    benefits: [
      { value: '0', label: 'duplicate records' },
      { value: 'Instant', label: 'routing to the right owner' },
      { value: 'Structured', label: 'data ready to act on, not a CSV to clean' },
    ],
    faqs: [
      { q: 'Can this trigger a task in our project tool too?', a: 'Yes, a new Airtable record can simultaneously create a task in ClickUp, Asana, Notion, or whatever your team uses.' },
      { q: 'Does it work with other form tools?', a: 'Yes, the same pattern works with Jotform, Google Forms, or any form tool with a webhook.' },
    ],
  },
  {
    slug: 'whatsapp-hubspot',
    tools: ['WhatsApp Business', 'HubSpot'],
    complexity: 'simple',
    category: 'Communication & CRM',
    headline: 'WhatsApp Business + HubSpot, every conversation becomes a tracked lead',
    intro: 'Inbound WhatsApp messages automatically create or update a HubSpot contact and log the full conversation thread, so WhatsApp leads stop disappearing into a phone nobody else can see.',
    painPoint: 'For businesses that get real leads through WhatsApp, real estate, home services, hospitality, those conversations usually live only on one person\'s phone, invisible to the CRM and impossible to follow up on systematically.',
    steps: [
      { title: 'Trigger', body: 'A new WhatsApp Business message arrives.' },
      { title: 'Match', body: 'The number is matched to an existing HubSpot contact or a new one is created.' },
      { title: 'Log', body: 'The message is logged to the contact timeline, so any team member sees the full history.' },
      { title: 'Qualify', body: 'AI classifies the message intent (new lead, support question, booking request) and routes accordingly.' },
    ],
    benefits: [
      { value: '100%', label: 'of WhatsApp leads captured in CRM' },
      { value: 'Team-visible', label: 'conversation history, not one phone' },
      { value: 'Automatic', label: 'lead qualification and routing' },
    ],
    faqs: [
      { q: 'Does this need the official WhatsApp Business API?', a: 'Yes, this requires WhatsApp\'s official Business API (via a provider like Twilio or 360dialog), not a personal WhatsApp number.' },
      { q: 'Can it send automated replies too?', a: 'Yes, common questions can get an instant AI-drafted response, with a human reviewing before send if you prefer that safeguard.' },
    ],
  },

  // ── INTERMEDIATE: multi-tool, one real conditional branch ────────────
  {
    slug: 'typeform-ai-hubspot-slack',
    tools: ['Typeform', 'Claude AI', 'HubSpot', 'Slack'],
    complexity: 'intermediate',
    category: 'AI & Lead Qualification',
    headline: 'AI lead qualification, leads scored and routed before a rep ever sees them',
    intro: 'A lead fills out a form, AI scores it against your ideal customer profile in real time, and only genuine opportunities reach a rep, hot leads ping Slack in under 90 seconds, everyone else enters a nurture sequence automatically.',
    painPoint: 'Reps waste hours triaging inbound leads by hand, most of which were never going to buy. By the time a manual review flags the one lead that mattered, it has often gone cold waiting in the queue.',
    steps: [
      { title: 'Trigger', body: 'A Typeform lead-gen form is submitted.' },
      { title: 'Enrich', body: 'Company size, industry, and stated budget are pulled from the response plus a quick company lookup.' },
      { title: 'AI score', body: 'Claude scores the lead 0–100 against your ideal customer profile and writes a one-line reason for the score.' },
      { title: 'Branch: hot lead', body: 'Score of 70 or above creates a HubSpot MQL, assigns it to a rep, and posts a Slack alert within 90 seconds.', branch: 'IF score ≥ 70' },
      { title: 'Branch: nurture', body: 'Score below 70 adds the lead to a HubSpot nurture list with an automated sequence, and re-scores it after each engagement.', branch: 'IF score < 70' },
    ],
    benefits: [
      { value: '90 sec', label: 'time to hot-lead Slack alert' },
      { value: '~60%', label: 'fewer leads manually triaged by reps' },
      { value: 'Consistent', label: 'scoring criteria, not gut feel' },
    ],
    faqs: [
      { q: 'Does the AI scoring replace human judgement?', a: 'No, it is a triage layer. Reps still make the final call on every lead, the scoring just makes sure they spend their time on the right ones first.' },
      { q: 'Can we customise the ideal-customer-profile criteria?', a: 'Yes, the scoring model (industry, company size, budget signals, intent language in the response) is configured to your actual business, not a generic template.' },
      { q: 'What happens with low-confidence responses?', a: 'A lead the AI cannot score confidently is flagged for manual review rather than silently routed either way.' },
    ],
  },

  // ── COMPLEX: full multi-system pipeline with retries and exception handling ──
  {
    slug: 'shopify-stripe-inventory-xero-klaviyo-slack',
    tools: ['Shopify', 'Stripe', 'Warehouse/3PL API', 'Xero', 'Klaviyo', 'Slack'],
    complexity: 'complex',
    category: 'Full Operations Pipeline',
    headline: 'Order-to-cash, from checkout to cash in the bank, with automatic failure recovery',
    intro: 'A single order triggers payment capture, inventory allocation, invoicing, fulfillment, and customer communication end to end, with automatic retries and a human only ever paged when something genuinely needs one.',
    painPoint: 'A "simple" order actually touches five or more systems. Most businesses stitch this together with native app integrations that each work in isolation, so a failure in one step, a declined payment retry, a stock mismatch, does not automatically trigger the right correction elsewhere. It just becomes a silent, growing pile of manual exceptions nobody notices until a customer complains.',
    steps: [
      { title: 'Trigger', body: 'A Shopify order is placed.' },
      { title: 'Payment capture', body: 'Stripe attempts to capture payment.' },
      { title: 'Branch: payment fails', body: 'Automatic retry twice over 24 hours; if still failing, a Slack escalation is posted with full order context so a human can intervene with information, not guesswork.', branch: 'IF payment declines' },
      { title: 'Inventory check', body: 'The warehouse/3PL system confirms stock allocation.' },
      { title: 'Branch: backorder', body: 'The customer is notified via Klaviyo with an accurate updated ETA immediately, and the order is flagged, no silent delay.', branch: 'IF out of stock' },
      { title: 'Invoice & reconcile', body: 'A Xero invoice is generated and matched to the Stripe payment, with fees broken out as their own line.' },
      { title: 'Fulfillment', body: 'A pick/pack request is sent to the warehouse API and the tracking number is captured once available.' },
      { title: 'Customer comms', body: 'Klaviyo sends order confirmation immediately, then shipping confirmation once tracking is live.' },
      { title: 'Exception handling', body: 'Any step that fails twice posts full context, order ID, customer, failure reason, what has already been tried, to a Slack channel instead of failing silently.' },
    ],
    benefits: [
      { value: '5–7 systems', label: 'coordinated from a single trigger' },
      { value: '2× auto-retry', label: 'before any human is paged' },
      { value: '0', label: 'silent failures, every exception is visible' },
    ],
    faqs: [
      { q: 'What happens if two steps fail at the same time?', a: 'Each failure is tracked independently with its own retry and escalation logic, so a payment issue and a stock issue never get conflated into one confusing support ticket.' },
      { q: 'Can this integrate with our specific warehouse or 3PL system?', a: 'Yes, if it exposes an API, which most modern WMS and 3PL platforms do, we build the connector as part of deployment.' },
      { q: 'Is this overkill for a small store?', a: 'For under roughly 50 orders a day, the simpler Shopify + Klaviyo pattern is usually enough. This level of orchestration earns its cost once failed or exception orders start costing real staff time every week.' },
    ],
  },
];
