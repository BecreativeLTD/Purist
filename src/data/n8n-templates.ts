export interface TemplateNode {
  n: string;
  type: string;
  role: string;
}

export interface N8nTemplate {
  slug: string;
  name: string;
  file: string;
  nodeCount: number;
  complexity: 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  tools: string[];
  tagline: string;
  intro: string;
  /** Long-form sections, each rendered as an H2 + prose block */
  sections: { heading: string; paras: string[] }[];
  /** Mermaid flow diagram source */
  diagram: string;
  /** Node-by-node reference table */
  nodeTable: TemplateNode[];
  /** Code snippets with a language + caption */
  code: { caption: string; lang: string; body: string }[];
  /** Metrics table */
  metrics: { metric: string; before: string; after: string }[];
  prerequisites: string[];
  pitfalls: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const n8nTemplates: N8nTemplate[] = [
  {
    slug: 'stripe-xero-reconciliation',
    name: 'Stripe → Xero Reconciliation Pro',
    file: '/n8n-templates/stripe-xero-reconciliation-pro.json',
    nodeCount: 24,
    complexity: 'Advanced',
    category: 'Finance & Accounting',
    tools: ['Stripe', 'Xero', 'Slack', 'Airtable'],
    tagline: 'A 24-node production workflow that reconciles every Stripe charge, refund and payout against Xero, with signature verification, fee separation and mismatch alerting.',
    intro: 'This is the workflow most finance teams eventually build by hand, badly. It takes the three Stripe events that actually matter for your books (charge.succeeded, charge.refunded, payout.paid), routes each one down its own path, finds or creates the matching Xero record, separates the Stripe processing fee into its own expense line so your net deposit ties out exactly, and posts a Slack alert only when the numbers genuinely disagree. Every event is logged to an audit table before and after processing, so nothing is ever lost silently.',
    sections: [
      {
        heading: 'Why reconciliation breaks without automation',
        paras: [
          'The arithmetic problem at the heart of Stripe reconciliation is simple to state and tedious to solve: Stripe charges a customer a gross amount, deducts a processing fee, and deposits the net. Your accounting system records the gross invoice. Your bank feed shows the net deposit. Those two numbers will never match on their own, and closing the gap manually means opening a Stripe payout report, exporting a CSV, and matching line by line against Xero invoices.',
          'For a business processing a few dozen transactions a month, that is an annoying afternoon. At a few hundred transactions, it is a recurring multi-day task that someone dreads. And the failure mode is not that it takes long, it is that under time pressure people start matching in bulk and stop checking edge cases. Partial refunds, disputed charges, multi-currency payouts and subscription proration are exactly the transactions most likely to be wrong, and exactly the ones a rushed manual reconciliation glosses over.',
          'The deeper issue is that manual reconciliation produces no audit trail of its own. If a number is wrong three months later, there is no record of what was matched against what, or why. This workflow treats the audit log as a first-class output, not an afterthought: every raw event is written to a log table before processing begins, and every reconciliation outcome is written again after it completes.',
        ],
      },
      {
        heading: 'Architecture: why the branches are structured this way',
        paras: [
          'The workflow has a deliberate shape. A single webhook entry point receives all Stripe events, but the very first thing it does is log the raw payload, before any validation or business logic. This matters: if a later node throws, the raw event is already on disk and the execution can be replayed from that point rather than lost. This is the single most common structural mistake in hand-built n8n reconciliation flows, validation and processing happen before any durable record exists, so a failure means the event is simply gone.',
          'Signature verification comes second, not first, for the same reason. An invalid signature is still worth logging (it may indicate a misconfigured endpoint or an attack), but it must never reach Xero. The IF node after verification dead-ends invalid requests into a no-op rather than throwing, so a burst of bad requests does not fill your execution error log.',
          'The Switch node then fans out into three genuinely different code paths. A successful charge needs an invoice lookup, a possible create, a fee calculation and a fee expense line. A refund needs a credit note against an existing invoice. A payout needs bank-feed line reconciliation. Trying to handle all three in one linear path with nested IFs is how these workflows become unmaintainable, the Switch keeps each concern visually and logically separate, and the Merge node at the end rejoins them into one stream for the shared mismatch-check and audit-log logic.',
        ],
      },
      {
        heading: 'The fee separation logic that makes the books tie out',
        paras: [
          'The Calculate Net Amount node is short but it is the entire point of the workflow. Stripe reports a gross amount and a fee. Xero needs three things to reconcile cleanly: an invoice for the gross amount, a bank transaction for the net deposit, and an expense entry for the fee. Most naive integrations record only the gross, which leaves a permanent unexplained gap between the invoice total and the bank feed.',
          'By posting the Stripe fee to a dedicated expense account (Post Stripe Fee Expense), the bank feed reconciliation in Xero becomes a one-click confirm rather than a manual investigation. Your accountant sees processing fees as a proper, categorised business expense rather than a mysterious shortfall, which also means the number is available for actual analysis: fee as a percentage of revenue, fee trend over time, effect of a pricing or payment-method change.',
        ],
      },
      {
        heading: 'Failure handling and what happens when a step breaks',
        paras: [
          'The Mismatch Check IF node is the workflow\'s safety net. After all three branches rejoin, it compares the calculated net amount against what Xero actually recorded. If they agree, execution proceeds straight to the audit log with no noise. If they disagree, a Slack alert fires with the order context attached, and execution still continues to the audit log so the mismatch itself is recorded.',
          'This is an important design choice: the alert path does not terminate the workflow. Both branches merge back together before the final log node, so the audit table contains a complete record of every event, reconciled or not. A workflow that alerts and stops leaves gaps in its own history exactly where the interesting data is.',
          'In n8n, set the workflow\'s error workflow to a shared handler if you run several of these. Node-level retry (Settings → Retry on Fail) is worth enabling on the Xero HTTP nodes specifically, since Xero\'s API rate-limits aggressively and a brief 429 should not escalate to a human.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Stripe Webhook] --> B[Log Raw Event]
  B --> C[Validate Signature]
  C --> D{Signature Valid?}
  D -->|No| E[Reject]
  D -->|Yes| F{Route Event Type}
  F -->|charge.succeeded| G[Find Xero Invoice]
  F -->|charge.refunded| H[Find Invoice For Refund]
  F -->|payout.paid| I[Reconcile Bank Feed]
  G --> J{Invoice Exists?}
  J -->|Yes| K[Update Invoice]
  J -->|No| L[Create Invoice]
  K --> M[Calculate Net Amount]
  L --> M
  M --> N[Post Stripe Fee Expense]
  H --> O[Create Credit Note]
  N --> P[Merge All Cases]
  O --> P
  I --> P
  P --> Q{Amounts Match?}
  Q -->|No| R[Slack Mismatch Alert]
  Q -->|Yes| S[No Action]
  R --> T[Log Reconciliation Entry]
  S --> T`,
    nodeTable: [
      { n: 'Stripe Webhook', type: 'Webhook', role: 'Entry point for charge.succeeded, charge.refunded, payout.paid' },
      { n: 'Log Raw Event', type: 'HTTP Request', role: 'Writes the untouched payload to an audit table before any processing' },
      { n: 'Validate Webhook Signature', type: 'Code', role: 'HMAC-SHA256 verification against the Stripe signing secret' },
      { n: 'Signature Valid?', type: 'IF', role: 'Gates everything downstream, invalid requests dead-end' },
      { n: 'Route Event Type', type: 'Switch', role: 'Fans out into three independent processing paths' },
      { n: 'Find Xero Invoice', type: 'HTTP Request', role: 'Looks up an existing invoice by reference' },
      { n: 'Invoice Exists?', type: 'IF', role: 'Decides between update and create' },
      { n: 'Update / Create Xero Invoice', type: 'HTTP Request ×2', role: 'The two halves of the upsert' },
      { n: 'Calculate Net Amount', type: 'Set', role: 'gross − Stripe fee = actual bank deposit' },
      { n: 'Post Stripe Fee Expense', type: 'HTTP Request', role: 'Writes the fee as its own categorised expense line' },
      { n: 'Create Xero Credit Note', type: 'HTTP Request', role: 'Refund path, offsets the original invoice' },
      { n: 'Reconcile Bank Feed Line', type: 'HTTP Request', role: 'Payout path, matches the deposit in Xero' },
      { n: 'Merge All Cases', type: 'Merge', role: 'Rejoins all three branches into one stream' },
      { n: 'Mismatch Check', type: 'IF', role: 'Compares calculated net against recorded Xero amount' },
      { n: 'Post Slack Mismatch Alert', type: 'HTTP Request', role: 'Fires only on genuine discrepancies' },
      { n: 'Log Reconciliation Entry', type: 'HTTP Request', role: 'Final audit row for every processed event' },
    ],
    code: [
      {
        caption: 'Stripe signature verification (Validate Webhook Signature node)',
        lang: 'javascript',
        body: `const crypto = require('crypto');

const sigHeader = $input.first().json.headers['stripe-signature'];
const rawBody   = JSON.stringify($input.first().json.body);
const secret    = $env.STRIPE_WEBHOOK_SECRET;

const parts = Object.fromEntries(
  sigHeader.split(',').map(p => p.split('='))
);

const signedPayload = \`\${parts.t}.\${rawBody}\`;
const expected = crypto
  .createHmac('sha256', secret)
  .update(signedPayload)
  .digest('hex');

// Constant-time comparison avoids leaking timing information
const signatureValid = crypto.timingSafeEqual(
  Buffer.from(expected),
  Buffer.from(parts.v1)
);

return [{ json: { ...$input.first().json, signatureValid } }];`,
      },
      {
        caption: 'Net amount calculation (Calculate Net Amount node)',
        lang: 'javascript',
        body: `// Stripe reports amounts in the smallest currency unit (cents)
const gross = $json.data.object.amount / 100;
const fee   = $json.data.object.application_fee_amount
  ? $json.data.object.application_fee_amount / 100
  : (gross * 0.029 + 0.30);   // fallback to standard Stripe pricing

return [{
  json: {
    ...$json,
    grossAmount: gross,
    stripeFee:   Number(fee.toFixed(2)),
    netAmount:   Number((gross - fee).toFixed(2)),
    currency:    $json.data.object.currency.toUpperCase(),
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Monthly reconciliation time', before: '4–8 hours', after: 'Under 15 minutes of review' },
      { metric: 'Time to close the books', before: 'End of month scramble', after: 'Same-day, continuously' },
      { metric: 'Unexplained bank feed gaps', before: 'Common, fees not separated', after: 'Zero, fees posted as expense' },
      { metric: 'Audit trail', before: 'None beyond the CSV export', after: 'Every event logged twice, raw and resolved' },
    ],
    prerequisites: [
      'A self-hosted or cloud n8n instance (v1.40+ recommended for the Switch v3 node)',
      'Stripe account with webhook endpoint access and the signing secret',
      'Xero account with OAuth2 app credentials and the accounting.transactions scope',
      'A Slack workspace with a bot token carrying the chat:write scope',
      'An Airtable base (or substitute any database node) for the two audit tables',
    ],
    pitfalls: [
      {
        title: 'Do not skip signature verification in production',
        body: 'A webhook endpoint without signature verification accepts any POST from anyone who discovers the URL. For a workflow that writes to your accounting system, that is a genuinely serious exposure, not a theoretical one.',
      },
      {
        title: 'Xero rate-limits harder than most APIs',
        body: 'Xero enforces both a per-minute and a daily call limit. Enable node-level retry with backoff on all Xero HTTP nodes, and if you process high volume, add a Split In Batches node ahead of the Xero calls.',
      },
      {
        title: 'Multi-currency needs explicit handling',
        body: 'The template assumes a single currency. If you take payments in several, the Calculate Net Amount node must convert using the rate at settlement date, not the rate at charge date, or your books will drift.',
      },
      {
        title: 'Test with Stripe CLI before going live',
        body: 'Run stripe trigger charge.succeeded against your development webhook URL first. Reconciliation bugs discovered in production are expensive to unwind because they have already written to your ledger.',
      },
    ],
    faqs: [
      { q: 'Does this work with QuickBooks instead of Xero?', a: 'The structure is identical, only the four Xero HTTP Request nodes change to QuickBooks endpoints. The signature verification, routing, fee calculation and alerting logic are unchanged.' },
      { q: 'How does it handle partial refunds?', a: 'The charge.refunded branch creates a Xero credit note for the refunded amount specifically, not the full invoice, so partial refunds offset correctly rather than zeroing out the original sale.' },
      { q: 'What happens if Xero is down when an event arrives?', a: 'The raw event is already logged by node 2, so nothing is lost. Enable retry on the Xero nodes, and failed executions can be replayed from the log table once Xero recovers.' },
      { q: 'Can I run this on n8n Cloud?', a: 'Yes. The only node requiring care is Validate Webhook Signature, which uses the crypto module, available in n8n Cloud\'s Code node by default.' },
    ],
  },
  {
    slug: 'ai-lead-qualification',
    name: 'AI Lead Qualification & Routing',
    file: '/n8n-templates/ai-lead-qualification-routing.json',
    nodeCount: 24,
    complexity: 'Advanced',
    category: 'Sales & AI',
    tools: ['Typeform', 'Clearbit', 'Claude', 'HubSpot', 'Slack', 'Airtable'],
    tagline: 'A 24-node workflow that enriches, AI-scores and routes every inbound lead, hot leads reach a rep in under 90 seconds, everyone else enters nurture automatically.',
    intro: 'Most inbound lead processes fail in the gap between submission and human attention. This workflow closes that gap: a form submission is enriched with company data, scored 0–100 by Claude against your ideal customer profile, and then routed three ways, hot leads become a HubSpot MQL with a Slack alert, weaker leads enter a nurture sequence, and anything the model cannot score confidently is flagged for a human rather than guessed at.',
    sections: [
      {
        heading: 'The speed-to-lead problem this solves',
        paras: [
          'Speed to lead is one of the few sales metrics with a genuinely well-documented relationship to conversion: response within minutes dramatically outperforms response within hours. Yet most inbound processes insert a human triage step precisely where the delay is most expensive, someone has to open the CRM, read the submission, decide whether it is worth pursuing, and assign it.',
          'The instinctive fix, alerting every rep on every lead, fails for the opposite reason. Reps learn to ignore a channel that is 80% noise, and the genuinely good lead gets the same muted response as the student doing research for a dissertation. What you need is not more alerts, it is fewer and better ones.',
          'This workflow inserts an AI scoring step where the human triage step used to be. The model does not decide whether to pursue a lead, a rep still does that. It decides how urgently a human should look, which is a much easier judgement to automate reliably.',
        ],
      },
      {
        heading: 'Why enrichment happens before scoring',
        paras: [
          'A lead form submission contains what the prospect chose to tell you. Enrichment adds what they did not: actual company headcount, industry classification, technology stack, funding stage. Scoring on form data alone means scoring largely on self-reported budget, which is the least reliable field on any form.',
          'The Enrichment Succeeded? IF node handles the case that matters most in practice: the enrichment provider has no record of this company. Small businesses, very new companies and non-English-language markets are all routinely missing from enrichment databases. The fallback path sets companySize to unknown and continues to scoring rather than dropping the lead, an enrichment miss must never mean a lost lead.',
        ],
      },
      {
        heading: 'Scoring with confidence thresholds, not just a number',
        paras: [
          'The Claude Score Lead node asks for three outputs, not one: a score, a one-line reason, and a confidence value. The confidence value is what makes this safe to run unattended. A model asked to score anything will produce a number, including for inputs it has no real basis to judge.',
          'The Score Confident Enough? node gates on confidence before the score is ever acted on. Below the threshold (0.6 in the template), the lead goes to manual review regardless of what score the model produced. This is the difference between an AI triage system you can trust and one that silently misroutes edge cases.',
          'The reason string is equally important operationally. When a rep receives a Slack alert saying a lead scored 84, the next question is always why. Including the model\'s one-line justification in the alert turns the score from an opaque number into something a rep can sanity-check in two seconds.',
        ],
      },
      {
        heading: 'Three-way routing and closing the feedback loop',
        paras: [
          'The routing has three terminal states, not two. Hot leads (score ≥ 70) create a HubSpot deal, get assigned via round-robin, and trigger a formatted Slack alert. Everything else enters a nurture list and an automated email sequence. Low-confidence leads bypass both and wait for a human.',
          'All three paths merge back into Log Lead Score To Airtable. This is the node that makes the system improve over time: every lead is recorded with its score, its confidence, its routing outcome, and eventually whether it converted. After a few hundred leads, that table tells you whether your threshold of 70 is right, whether the model over-scores certain industries, and where the ICP definition needs adjusting.',
          'Without that log, an AI scoring system is unfalsifiable, it feels like it works and nobody can prove otherwise. With it, you can measure precision and recall against real outcomes and tune deliberately.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Typeform Webhook] --> B[Log Raw Submission]
  B --> C[Extract Form Fields]
  C --> D[Company Enrichment Lookup]
  D --> E{Enrichment OK?}
  E -->|No| F[Fallback Data]
  E -->|Yes| G[Merge Enrichment]
  F --> G
  G --> H[Build AI Prompt]
  H --> I[Claude Score Lead]
  I --> J[Parse AI Response]
  J --> K{Confidence >= 0.6?}
  K -->|No| L[Flag Manual Review]
  K -->|Yes| M{Score >= 70?}
  M -->|Yes| N[Create HubSpot MQL]
  M -->|No| O[Add To Nurture List]
  N --> P[Assign Rep Round Robin]
  P --> Q[Slack Hot Lead Alert]
  O --> R[Trigger Nurture Sequence]
  Q --> S[Merge Outcomes]
  R --> S
  L --> S
  S --> T[Log Lead Score]
  T --> U[Tag Typeform Response]`,
    nodeTable: [
      { n: 'Typeform Webhook', type: 'Webhook', role: 'Fires on every lead form submission' },
      { n: 'Log Raw Submission', type: 'HTTP Request', role: 'Durable record before any processing' },
      { n: 'Extract Form Fields', type: 'Set', role: 'Normalises the Typeform answer array into flat fields' },
      { n: 'Company Enrichment Lookup', type: 'HTTP Request', role: 'Pulls firmographic data from Clearbit' },
      { n: 'Enrichment Succeeded?', type: 'IF', role: 'Handles companies missing from the enrichment database' },
      { n: 'Build AI Scoring Prompt', type: 'Set', role: 'Assembles the ICP-aware prompt from form + enrichment data' },
      { n: 'Claude Score Lead', type: 'HTTP Request', role: 'Returns score, reason and confidence as structured JSON' },
      { n: 'Parse AI Response', type: 'Code', role: 'Extracts the three values from the model response' },
      { n: 'Score Confident Enough?', type: 'IF', role: 'Confidence gate, below threshold goes to a human' },
      { n: 'Hot Lead?', type: 'IF', role: 'The score threshold, 70 by default' },
      { n: 'Create HubSpot MQL', type: 'HTTP Request', role: 'Creates the deal record for qualified leads' },
      { n: 'Assign To Rep Round Robin', type: 'HTTP Request', role: 'Distributes ownership across the team' },
      { n: 'Post Hot Lead Slack Alert', type: 'HTTP Request', role: 'Sub-90-second notification with score and reason' },
      { n: 'Add To Nurture List / Trigger Sequence', type: 'HTTP Request ×2', role: 'The non-hot path, automated follow-up' },
      { n: 'Merge Routing Outcomes', type: 'Merge', role: 'Rejoins all three terminal states' },
      { n: 'Log Lead Score To Airtable', type: 'HTTP Request', role: 'The feedback-loop table for tuning the model' },
    ],
    code: [
      {
        caption: 'ICP scoring prompt (Build AI Scoring Prompt node)',
        lang: 'text',
        body: `You are scoring an inbound lead for a business automation agency.

Our ideal customer profile:
- 10–200 employees
- Service business with repeatable manual back-office processes
- Already paying for 3+ SaaS tools that do not talk to each other
- Someone in ops, finance or the founder is the buyer
- Budget of at least EUR 800/month

Lead data:
{{ JSON.stringify($json, null, 2) }}

Return ONLY valid JSON in this exact shape:
{
  "score": <integer 0-100>,
  "reason": "<one sentence, max 20 words>",
  "confidence": <float 0-1, how certain you are given available data>
}

Set confidence below 0.6 if key fields are missing or contradictory.`,
      },
      {
        caption: 'Response parsing with a safe fallback (Parse AI Response node)',
        lang: 'javascript',
        body: `const raw = $input.first().json.content[0].text.trim();

let parsed;
try {
  // Strip markdown fences the model sometimes adds despite instructions
  const cleaned = raw.replace(/^\`\`\`(json)?/, '').replace(/\`\`\`$/, '');
  parsed = JSON.parse(cleaned);
} catch (e) {
  // Never let a malformed response silently route a lead the wrong way
  return [{ json: { score: 0, reason: 'Parse failure', confidence: 0 } }];
}

return [{
  json: {
    ...$('Merge Enrichment Path').first().json,
    score:      Number(parsed.score),
    reason:     String(parsed.reason),
    confidence: Number(parsed.confidence),
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Time to hot-lead notification', before: 'Hours (manual triage)', after: 'Under 90 seconds' },
      { metric: 'Leads manually triaged by reps', before: '100%', after: 'Roughly 40%, only hot and low-confidence' },
      { metric: 'Scoring consistency', before: 'Varies by rep and by day', after: 'One documented, tunable rubric' },
      { metric: 'Leads lost to enrichment gaps', before: 'Silently dropped', after: 'Zero, fallback path scores anyway' },
    ],
    prerequisites: [
      'n8n v1.40+ (self-hosted or Cloud)',
      'Typeform account with webhook access on the lead form',
      'Clearbit API key, or substitute any enrichment provider',
      'Anthropic API key with access to a Claude model',
      'HubSpot private app token with CRM write scopes',
      'Slack bot token (chat:write) and an Airtable base for the score log',
    ],
    pitfalls: [
      {
        title: 'Do not act on a score without a confidence gate',
        body: 'A model will return a number for any input, including a form submitted with a fake company name and no budget. The confidence threshold is the difference between triage and guessing.',
      },
      {
        title: 'Tune the threshold on real data, not intuition',
        body: 'The default 70 is a starting point, not a recommendation. After 200 or so leads, compare scores against actual outcomes in the log table and move the threshold deliberately.',
      },
      {
        title: 'Never let the AI send outbound messages unreviewed',
        body: 'This workflow scores and routes, it does not write to the prospect. Keep it that way until you have months of score-accuracy data.',
      },
      {
        title: 'Log the prompt version alongside the score',
        body: 'If you change the ICP definition in the prompt, scores before and after are not comparable. Add a promptVersion field to the log table so historical analysis stays honest.',
      },
    ],
    faqs: [
      { q: 'Can I use OpenAI or a local model instead of Claude?', a: 'Yes, only the Claude Score Lead node changes. The prompt asks for structured JSON, which any capable model can produce, though you should re-validate the confidence calibration after switching.' },
      { q: 'Does this replace a sales rep\'s judgement?', a: 'No. It decides how urgently a human should look at a lead, not whether to pursue it. Every hot lead still goes to a rep who makes the actual call.' },
      { q: 'What if our form is on Webflow or HubSpot rather than Typeform?', a: 'Swap the trigger node. Anything that can send a webhook works, the Extract Form Fields node is where you normalise the differing payload shapes.' },
      { q: 'How much does the AI scoring cost to run?', a: 'The prompt and response are both short. At typical inbound volumes this is a negligible line item compared to the rep time it saves, but measure it on your own volume rather than assuming.' },
    ],
  },
  {
    slug: 'order-to-cash-recovery',
    name: 'Order-to-Cash with Failure Recovery',
    file: '/n8n-templates/order-to-cash-failure-recovery.json',
    nodeCount: 32,
    complexity: 'Expert',
    category: 'E-commerce Operations',
    tools: ['Shopify', 'Stripe', 'Warehouse/3PL API', 'Xero', 'Klaviyo', 'Slack', 'Airtable'],
    tagline: 'A 32-node pipeline coordinating payment capture, inventory, invoicing, fulfillment and customer comms, with two-stage payment retry and backorder branching.',
    intro: 'This is the workflow a growing e-commerce operation eventually needs and rarely builds correctly. A single Shopify order triggers payment capture, stock allocation, Xero invoicing with fee separation, warehouse pick-pack, and two customer emails, with automatic retry on payment failure, a dedicated backorder path, and Slack escalation carrying full context when something genuinely needs a human.',
    sections: [
      {
        heading: 'Why native app integrations are not enough',
        paras: [
          'Every tool in this stack ships its own integrations. Shopify talks to Stripe. Klaviyo talks to Shopify. Your 3PL has a Shopify app. Each of these works correctly in isolation, which is exactly why the combination fails in ways that are hard to see.',
          'The problem is that native integrations have no shared view of the order. When a payment fails, Shopify marks the order unpaid, but nothing tells the warehouse not to ship, nothing tells Xero not to invoice, and nothing decides whether to retry. Each system does its one job correctly and the coordination between them, which is where the actual business logic lives, falls to whoever notices first.',
          'At low volume this is manageable because a human sees every order. The failure mode arrives with growth: exceptions accumulate faster than anyone reviews them, and the business develops a quiet, permanent backlog of half-processed orders that surfaces only through customer complaints.',
        ],
      },
      {
        heading: 'Two-stage payment retry and why the timing matters',
        paras: [
          'Payment failures are not uniform. A genuinely declined card and a transient network error look similar at the API level but need completely different responses. Retrying immediately fails for both. Retrying too slowly loses the sale.',
          'This workflow uses a two-stage backoff: five minutes, then thirty. The first retry catches transient issues, temporary processor outages, brief network failures, rate limiting. The thirty-minute gap catches the common real-world case of a customer who notices the decline, moves money between accounts, and would succeed on a second attempt.',
          'Only after both retries fail does a human get paged, and the Slack escalation includes the order ID, the customer, the failure reason and both retry timestamps. This is the difference between an alert someone can act on and an alert that starts an investigation. The Escalation Runbook sticky note in the workflow documents exactly what a human should do next, so the knowledge is not trapped in one person\'s head.',
        ],
      },
      {
        heading: 'The backorder branch, telling customers early',
        paras: [
          'The In Stock? node creates the second major branch. The instinct when stock is short is to hold the order and sort it out later. In practice that means the customer finds out about the delay when the delivery does not arrive, which converts a minor inventory problem into a support ticket and a refund request.',
          'The backorder path instead sends a Klaviyo email immediately with a real ETA, flags the order, and continues through invoicing and the rest of the pipeline. The customer knows within minutes, the order stays tracked in the same system as every other order, and the business keeps the sale far more often than it would with silence.',
          'Note that both stock branches rejoin at Merge Stock Path before invoicing. A backordered item still gets invoiced and still gets a fee line, only the fulfillment timing differs. Splitting the branches earlier and duplicating the invoicing logic in each is the more obvious design and it doubles your maintenance surface for no benefit.',
        ],
      },
      {
        heading: 'Waiting for the warehouse without polling',
        paras: [
          'The Wait For Tracking Number node uses n8n\'s webhook-resume mode rather than polling on a timer. The execution pauses, persists its state, and resumes only when the warehouse\'s fulfillment webhook fires with a tracking number.',
          'This matters at scale. A polling approach with a hundred orders in flight means a hundred repeated API calls against your 3PL every interval, most returning nothing. Webhook resume holds the execution at effectively zero cost until there is genuinely something to do.',
          'It also makes the customer communication correct. The shipping confirmation email fires when a tracking number genuinely exists, not on a guessed delay after the pick-pack request. Customers receiving a "your order has shipped" email with no working tracking link is a small detail that erodes trust disproportionately.',
        ],
      },
      {
        heading: 'Observability: the part most workflows skip',
        paras: [
          'Three nodes in this workflow exist purely for observability: Log Raw Order at the start, Log Order To Ops Dashboard at the end, and the Slack escalation in between. None of them affect whether an order processes correctly, and all three are the reason you can answer questions about the system later.',
          'The final log entry records timing data for each step the order passed through. After a few weeks that table answers questions no dashboard in Shopify, Stripe or your 3PL can: what percentage of orders hit the retry path, how long the warehouse actually takes between pick-pack request and tracking number, whether backorders cluster around particular SKUs.',
          'For a workflow this size, that visibility is not a nice-to-have. A 32-node pipeline with branches is genuinely difficult to reason about from execution logs alone, and the operational data is what tells you which branch needs attention before it becomes a problem.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Shopify Order Webhook] --> B[Log Raw Order]
  B --> C[Extract Order Fields]
  C --> D[Capture Stripe Payment]
  D --> E{Payment Success?}
  E -->|No| F[Wait 5 min]
  F --> G[Retry 1]
  G --> H{Retry 1 OK?}
  H -->|No| I[Wait 30 min]
  I --> J[Retry 2]
  J --> K{Retry 2 OK?}
  K -->|No| L[Slack Escalation]
  L --> M[Stop]
  E -->|Yes| N[Merge Payment Paths]
  H -->|Yes| N
  K -->|Yes| N
  N --> O[Check Stock]
  O --> P{In Stock?}
  P -->|No| Q[Backorder ETA Email]
  Q --> R[Flag Backorder]
  P -->|Yes| S[Reserve Stock]
  S --> T[Merge Stock Path]
  R --> T
  T --> U[Create Xero Invoice]
  U --> V[Calculate Stripe Fee]
  V --> W[Post Fee Expense]
  W --> X[Request Pick Pack]
  X --> Y[Wait For Tracking]
  Y --> Z[Get Tracking Number]
  Z --> AA[Order Confirmation Email]
  AA --> AB[Shipping Confirmation Email]
  AB --> AC[Log To Ops Dashboard]`,
    nodeTable: [
      { n: 'Shopify Order Webhook', type: 'Webhook', role: 'Fires on order creation' },
      { n: 'Log Raw Order', type: 'HTTP Request', role: 'Durable record before processing, enables replay' },
      { n: 'Capture Stripe Payment', type: 'HTTP Request', role: 'Initial payment capture attempt' },
      { n: 'Payment Success?', type: 'IF', role: 'Entry to the retry ladder' },
      { n: 'Wait 5 Min / Wait 30 Min', type: 'Wait ×2', role: 'Two-stage backoff between retry attempts' },
      { n: 'Retry Stripe Payment 1 / 2', type: 'HTTP Request ×2', role: 'The two automatic retry attempts' },
      { n: 'Escalate Payment Failure To Slack', type: 'HTTP Request', role: 'Human escalation with full context, after both retries' },
      { n: 'Merge Payment Success Paths', type: 'Merge', role: 'Rejoins first-attempt and both retry successes' },
      { n: 'Check Stock Availability', type: 'HTTP Request', role: 'Queries the warehouse/3PL inventory API' },
      { n: 'In Stock?', type: 'IF', role: 'Splits the fulfillment and backorder paths' },
      { n: 'Send Backorder ETA Email', type: 'HTTP Request', role: 'Immediate customer notification with a real ETA' },
      { n: 'Reserve Stock', type: 'HTTP Request', role: 'Allocates inventory for the in-stock path' },
      { n: 'Create Xero Invoice', type: 'HTTP Request', role: 'Accounting entry for the order' },
      { n: 'Calculate Stripe Fee Line / Post Fee', type: 'Set + HTTP', role: 'Fee separation so the bank feed reconciles' },
      { n: 'Request Pick Pack', type: 'HTTP Request', role: 'Fulfillment instruction to the warehouse' },
      { n: 'Wait For Tracking Number', type: 'Wait (webhook resume)', role: 'Zero-cost pause until the warehouse responds' },
      { n: 'Order / Shipping Confirmation Email', type: 'HTTP Request ×2', role: 'Customer comms at the correct moments' },
      { n: 'Log Order To Ops Dashboard', type: 'HTTP Request', role: 'Final record with per-step timing data' },
    ],
    code: [
      {
        caption: 'Stripe fee calculation for the Xero expense line',
        lang: 'javascript',
        body: `// Prefer the actual fee Stripe reports over a calculated estimate.
// balance_transaction is only present once the charge has settled.
const charge = $json.charge ?? {};
const gross  = Number($json.grossAmount);

const reportedFee = charge.balance_transaction?.fee != null
  ? charge.balance_transaction.fee / 100
  : null;

const stripeFee = reportedFee ?? Number((gross * 0.029 + 0.30).toFixed(2));

return [{
  json: {
    ...$json,
    stripeFee,
    netAmount: Number((gross - stripeFee).toFixed(2)),
    feeSource: reportedFee != null ? 'stripe_reported' : 'estimated',
  }
}];`,
      },
      {
        caption: 'Slack escalation payload with full failure context',
        lang: 'json',
        body: `{
  "channel": "#ops-escalations",
  "blocks": [
    {
      "type": "header",
      "text": { "type": "plain_text", "text": "Payment failed after 2 retries" }
    },
    {
      "type": "section",
      "fields": [
        { "type": "mrkdwn", "text": "*Order:*\\n{{ $json.orderId }}" },
        { "type": "mrkdwn", "text": "*Customer:*\\n{{ $json.customerEmail }}" },
        { "type": "mrkdwn", "text": "*Amount:*\\n{{ $json.grossAmount }} {{ $json.currency }}" },
        { "type": "mrkdwn", "text": "*Decline reason:*\\n{{ $json.last_payment_error.message }}" },
        { "type": "mrkdwn", "text": "*Retry 1:*\\n{{ $json.retry1At }}" },
        { "type": "mrkdwn", "text": "*Retry 2:*\\n{{ $json.retry2At }}" }
      ]
    },
    {
      "type": "context",
      "elements": [
        { "type": "mrkdwn", "text": "Next step: retry or refund in Stripe, then replay this execution from Log Raw Order." }
      ]
    }
  ]
}`,
      },
    ],
    metrics: [
      { metric: 'Systems coordinated per order', before: '5–7, each independently', after: '5–7, from one trigger with shared state' },
      { metric: 'Payment failures needing a human', before: 'Every one', after: 'Only those surviving 2 automatic retries' },
      { metric: 'Customer notified of a backorder', before: 'When delivery fails to arrive', after: 'Within minutes, with a real ETA' },
      { metric: 'Silent exception backlog', before: 'Grows with volume', after: 'Zero, every exception alerts with context' },
    ],
    prerequisites: [
      'n8n v1.40+ with webhook-resume Wait nodes available',
      'Shopify Admin API access and order-creation webhook permission',
      'Stripe secret key with payment_intents capture permission',
      'A warehouse or 3PL exposing inventory, fulfillment and a fulfillment-complete webhook',
      'Xero OAuth2 credentials, Klaviyo private API key, Slack bot token, Airtable PAT',
    ],
    pitfalls: [
      {
        title: 'Match retry timing to your payment provider\'s guidance',
        body: 'Five and thirty minutes suit card payments. SEPA direct debit, BACS and other delayed-settlement methods need days, not minutes, and retrying too aggressively can incur per-attempt fees.',
      },
      {
        title: 'Webhook-resume executions consume a slot while waiting',
        body: 'On self-hosted n8n with a constrained worker pool, a hundred orders awaiting tracking numbers can exhaust concurrency. Size your workers for peak in-flight orders, not peak orders per hour.',
      },
      {
        title: 'Do not invoice before payment succeeds',
        body: 'The invoicing nodes sit after Merge Payment Success Paths deliberately. Inverting that order produces Xero invoices for orders that never paid, which is significantly harder to unwind than it is to avoid.',
      },
      {
        title: 'Idempotency on the warehouse call',
        body: 'If an execution is replayed after a partial failure, Request Pick Pack can fire twice. Pass the Shopify order ID as an idempotency key so your 3PL rejects the duplicate rather than double-shipping.',
      },
    ],
    faqs: [
      { q: 'Does this work with WooCommerce instead of Shopify?', a: 'Yes, replace the trigger and the order-field extraction. The payment, inventory, accounting and comms logic downstream is platform-agnostic.' },
      { q: 'What if our 3PL has no fulfillment webhook?', a: 'Replace Wait For Tracking Number with a scheduled polling loop, accepting the extra API calls. Webhook resume is preferable where available but not mandatory.' },
      { q: 'Is 32 nodes overkill for a small store?', a: 'Below roughly 50 orders a day, yes, a simpler pattern is usually enough. This earns its complexity once exception handling starts consuming real staff time every week.' },
      { q: 'Can the retry count be changed?', a: 'Yes. The ladder is explicit rather than a loop precisely so you can add, remove or re-time stages without rewriting logic. Each stage is a Wait plus an HTTP Request plus an IF.' },
    ],
  },
  {
    slug: 'board-reporting-kpi-consolidation',
    name: 'Board Reporting & KPI Consolidation',
    file: '/n8n-templates/board-reporting-kpi-consolidation.json',
    nodeCount: 26,
    complexity: 'Expert',
    category: 'Finance & Strategy',
    tools: ['Stripe', 'HubSpot', 'Xero', 'Google Slides', 'Slack', 'DocSend', 'Airtable'],
    tagline: 'A 26-node monthly pipeline that pulls MRR, pipeline and P&L data from three systems, drafts a board deck with AI variance commentary, and gates everything behind a human sign-off before distribution.',
    intro: 'Board reporting is the single most senior deliverable most finance and RevOps teams produce, and it is still assembled by hand in most companies, an analyst pulling exports from Stripe, HubSpot and Xero into a spreadsheet, then rebuilding the same slides every month. This workflow automates the assembly, the variance calculation, and even a first-draft explanation of what moved and why, while keeping a human firmly in control of what actually reaches the board.',
    sections: [
      {
        heading: 'Why board decks are a bad place to save time carelessly',
        paras: [
          'Most back-office automation optimises for speed above all else. Board reporting is the exception: the audience is small, senior, and reads every number closely, so the workflow is designed around accuracy and reviewability first, speed second. That shows up in three deliberate choices: a data quality gate before any calculation happens, an explicit human approval gate before distribution, and a full audit log of what was sent to whom.',
          'The monthly schedule trigger fires on the 1st at 06:00, early enough that a data problem discovered by the Data Quality Check node still leaves days to fix it before the board meeting, rather than finding out the afternoon before.',
        ],
      },
      {
        heading: 'Consolidating three systems that were never meant to talk',
        paras: [
          'Stripe knows recurring revenue. HubSpot knows the sales pipeline. Xero knows the actual profit and loss. None of the three has any concept of the other two, and a board wants all three synthesised into one coherent story: revenue, forward pipeline coverage, and whether the business is actually profitable doing it.',
          'The three pulls run in parallel and rejoin at Merge Data Sources, then two Code nodes calculate the metrics a board actually asks about, MRR and net revenue retention from the Stripe side, win rate and pipeline coverage from HubSpot. Keeping these as separate, named calculation steps rather than one large script makes the model auditable, a finance team member can read exactly how NRR was derived without reverse-engineering a black box.',
        ],
      },
      {
        heading: 'Variance commentary: where AI earns its place carefully',
        paras: [
          'The Variance Exceeds Threshold? gate is deliberate: an AI-drafted explanation is generated only for line items that moved more than 10% against budget, not for every metric on every run. This keeps the AI\'s job narrow and checkable, explain this one specific, material movement, rather than narrating an entire business.',
          'Every AI-drafted commentary still passes through the CEO Review Gate before the deck goes anywhere. This workflow never sends a board communication without a human confirming it, the Wait node pauses on a webhook that only fires when someone actually approves, and an Approved? branch routes rejected drafts back for revision rather than distributing a first draft under pressure of a deadline.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Monthly Trigger] --> B[Pull Stripe MRR]
  A --> C[Pull HubSpot Pipeline]
  A --> D[Pull Xero P&L]
  B --> E[Merge Data Sources]
  C --> E
  D --> E
  E --> F[Calculate MRR & Growth]
  F --> G[Calculate Pipeline Metrics]
  G --> H{Data Quality OK?}
  H -->|No| I[Flag Finance] --> J[Wait For Fix] --> K[Compare Prior Month]
  H -->|Yes| K
  K --> L[Compare Against Budget]
  L --> M{Variance > 10%?}
  M -->|Yes| N[AI Variance Commentary]
  M -->|No| O[Merge Commentary]
  N --> O
  O --> P[Build KPI Table]
  P --> Q[Generate Slides Deck]
  Q --> R[Populate Charts]
  R --> S[Export PDF]
  S --> T[CEO Review Gate]
  T --> U{Approved?}
  U -->|Yes| V[Distribute To Board]
  U -->|No| W[Request Revisions]
  V --> X[Log Distribution]`,
    nodeTable: [
      { n: 'Monthly Schedule Trigger', type: 'Schedule Trigger', role: 'Fires day one of each month, early morning' },
      { n: 'Pull Stripe / HubSpot / Xero', type: 'HTTP Request ×3', role: 'Parallel pulls of revenue, pipeline and P&L data' },
      { n: 'Calculate MRR & Growth', type: 'Code', role: 'MRR, net revenue retention, month-over-month growth' },
      { n: 'Data Quality Check', type: 'IF', role: 'Blocks calculation on missing fields rather than reporting bad numbers' },
      { n: 'Compare Against Budget', type: 'Set', role: 'Computes variance percentage per line item' },
      { n: 'Variance Exceeds Threshold?', type: 'IF', role: 'Gates AI commentary to genuinely material movements' },
      { n: 'Generate Variance Commentary (AI)', type: 'HTTP Request', role: 'Claude drafts an explanation for flagged variances only' },
      { n: 'Generate Board Deck', type: 'HTTP Request', role: 'Populates a Google Slides template programmatically' },
      { n: 'CEO Review Gate', type: 'Wait (webhook resume)', role: 'Nothing ships without explicit human approval' },
      { n: 'Distribute To Board Members', type: 'HTTP Request', role: 'Sent via a tracked data-room link, not a plain attachment' },
    ],
    code: [
      {
        caption: 'Net revenue retention calculation',
        lang: 'javascript',
        body: `const startingMrr  = $json.startingMrr;
const expansion    = $json.expansionMrr;
const contraction  = $json.contractionMrr;
const churnedMrr   = $json.churnedMrr;

const nrr = ((startingMrr + expansion - contraction - churnedMrr) / startingMrr) * 100;

return [{
  json: {
    ...$json,
    nrr: Number(nrr.toFixed(1)),
    nrrHealthy: nrr >= 100,  // below 100% means existing customers are net-shrinking
  }
}];`,
      },
      {
        caption: 'Budget variance gate',
        lang: 'javascript',
        body: `const actual = $json.actual;
const budget = $json.budget;
const variance = ((actual - budget) / budget) * 100;

return [{
  json: {
    ...$json,
    budgetVariance: Number(variance.toFixed(1)),
    needsCommentary: Math.abs(variance) > 10,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Time to assemble board pack', before: '2-3 days of analyst time', after: 'Under 2 hours, mostly review' },
      { metric: 'Data consistency across sources', before: 'Manual copy-paste, error-prone', after: 'Pulled and calculated identically every month' },
      { metric: 'Variance explanations', before: 'Written under deadline pressure', after: 'Drafted automatically, human-refined' },
      { metric: 'Distribution tracking', before: 'None, email attachment', after: 'Per-board-member view analytics' },
    ],
    prerequisites: [
      'n8n v1.40+ with Switch v3 and webhook-resume Wait support',
      'Read-only Stripe, HubSpot and Xero API credentials',
      'Anthropic API key for variance commentary',
      'Google Slides/Docs OAuth2 with a board-deck template already built',
      'DocSend or equivalent tracked document-sharing API, Slack bot token, Airtable PAT',
    ],
    pitfalls: [
      { title: 'Never let this auto-send without the review gate', body: 'The CEO Review Gate is the entire safety mechanism. Removing it to "save time" turns a drafting tool into an uncontrolled board communication channel.' },
      { title: 'Budget data must be current', body: 'A stale budget in Xero makes every variance calculation meaningless. Confirm the current fiscal year budget is loaded before the first run each year.' },
      { title: 'AI commentary needs a fact-check pass', body: 'The model explains movements based on the data it is given, it cannot know about a one-off event nobody logged anywhere. Treat its output as a first draft, always.' },
    ],
    faqs: [
      { q: 'Can this work with QuickBooks or NetSuite instead of Xero?', a: 'Yes, only the P&L pull node changes. The consolidation, variance and approval logic is accounting-system agnostic.' },
      { q: 'How is the deck template customised?', a: 'Generate Board Deck duplicates a Google Slides template you control, so your existing branding, slide order and chart types carry over automatically.' },
      { q: 'What happens if a board member never opens the deck?', a: 'DocSend-style tracking makes that visible in Log Distribution, letting IR or the CEO follow up specifically rather than assuming everyone read it.' },
    ],
  },
  {
    slug: 'employee-onboarding-offboarding',
    name: 'Employee Onboarding & Offboarding',
    file: '/n8n-templates/employee-onboarding-offboarding.json',
    nodeCount: 28,
    complexity: 'Expert',
    category: 'HR & IT Operations',
    tools: ['Google Workspace', 'Slack', 'GitHub', 'HubSpot', 'Asset Management API', 'Airtable'],
    tagline: 'A 28-node workflow covering both directions of the employee lifecycle: role-aware provisioning timed to start date, and security-aware access revocation timed to departure type.',
    intro: 'Onboarding and offboarding are usually built as two separate, ad hoc checklists maintained by whoever last got frustrated enough to write one down. This template treats them as one system with two entry points, because the underlying problem, keeping access, equipment and communication in sync with employment status, is the same problem in both directions.',
    sections: [
      {
        heading: 'Timing provisioning to start date, not to when someone remembers',
        paras: [
          'New-hire provisioning has a narrow correct window. Too early wastes paid software licenses for someone who has not started, and occasionally exposes internal systems to an account nobody is watching yet. Too late means a new employee\'s first day is spent waiting for IT instead of working.',
          'The Days Until Start calculation and the Start Date Within 5 Days? loop hold provisioning until exactly five business days before start, then fire the Google Workspace, Slack and role-specific access nodes together. Role-Specific Provisioning branches on department because an engineer and a sales rep need almost entirely different tool access, and hard-coding one generic checklist for both means either engineers get CRM access they do not need or sales reps wait on GitHub permissions nobody will use.',
        ],
      },
      {
        heading: 'Offboarding: the branch that actually matters for security',
        paras: [
          'The Involuntary Departure? branch is the most operationally important decision in this entire template. An involuntary departure revokes all system access immediately, before the conversation with the employee even happens in some security postures, because the risk of continued access after notice outweighs the inconvenience.',
          'A voluntary departure instead schedules revocation for end of the employee\'s last working day, using n8n\'s specific-time Wait node. This lets a departing employee remain productive through their notice period while still guaranteeing access disappears automatically at the right moment, rather than depending on someone remembering to do it manually on a Friday afternoon.',
        ],
      },
      {
        heading: 'The step almost every offboarding checklist forgets',
        paras: [
          'Transfer File Ownership To Manager exists because of a specific, common failure: a departed employee\'s Google Drive files are owned by an account that no longer exists, and without an explicit ownership transfer, those files become effectively orphaned. Institutional knowledge, client documents, and project history simply vanish into an inaccessible account.',
          'This step runs for every offboarding, voluntary or not, immediately after equipment retrieval, so file continuity is never dependent on someone remembering to ask for it during an already busy departure process.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[New Hire Webhook] --> B[Extract Details]
  B --> C[Days Until Start]
  C --> D{Within 5 Days?}
  D -->|No| E[Wait 1 Day] --> D
  D -->|Yes| F[Create Workspace Account]
  D -->|Yes| G[Create Slack Account]
  D -->|Yes| H{Role-Specific Provisioning}
  H -->|Engineering| I[GitHub + AWS Access]
  H -->|Sales| J[CRM + Dialer Access]
  I --> K[Order Equipment]
  J --> K
  F --> L[Merge Provisioning]
  G --> L
  K --> L
  L --> M[Schedule Day-1 Events]
  M --> N[Assign Buddy]
  N --> O[Welcome Email]

  P[Termination Webhook] --> Q[Extract Details]
  Q --> R{Involuntary?}
  R -->|Yes| S[Revoke Access Immediately]
  R -->|No| T[Schedule Revocation, Last Day] --> U[Revoke All Access]
  S --> V[Retrieve Equipment]
  U --> V
  V --> W[Transfer File Ownership]`,
    nodeTable: [
      { n: 'HRIS New Hire / Termination Webhook', type: 'Webhook ×2', role: 'Two independent entry points for the two lifecycle directions' },
      { n: 'Days Until Start', type: 'Code', role: 'Calculates the countdown to trigger provisioning at the right time' },
      { n: 'Start Date Within 5 Days?', type: 'IF (looping)', role: 'Holds provisioning until the correct window, avoids early waste' },
      { n: 'Role-Specific Provisioning', type: 'Switch', role: 'Department-aware branching, engineering vs sales access' },
      { n: 'Involuntary Departure?', type: 'IF', role: 'The single most important security-relevant branch in the workflow' },
      { n: 'Revoke Access Immediately', type: 'HTTP Request', role: 'Immediate revocation path for involuntary departures' },
      { n: 'Schedule Revocation For Last Day', type: 'Wait (specific time)', role: 'Delayed revocation for voluntary departures' },
      { n: 'Transfer File Ownership To Manager', type: 'HTTP Request', role: 'Prevents departed-employee files becoming inaccessible' },
    ],
    code: [
      {
        caption: 'Start-date countdown (Days Until Start node)',
        lang: 'javascript',
        body: `const startDate = new Date($json.startDate);
const today = new Date();
const msPerDay = 1000 * 60 * 60 * 24;
const daysUntilStart = Math.ceil((startDate - today) / msPerDay);

return [{ json: { ...$json, daysUntilStart } }];`,
      },
    ],
    metrics: [
      { metric: 'Day-1 readiness', before: 'Inconsistent, IT-ticket dependent', after: 'Provisioned automatically 5 days out' },
      { metric: 'Access revoked after involuntary exit', before: 'Minutes to hours, manual', after: 'Immediate, automatic' },
      { metric: 'Orphaned files after departure', before: 'Common', after: 'Explicit ownership transfer, every time' },
      { metric: 'Equipment tracking', before: 'Spreadsheet, often stale', after: 'Logged automatically at order and return' },
    ],
    prerequisites: [
      'n8n v1.40+ with specific-time Wait node support',
      'Google Workspace Admin SDK access',
      'Slack Enterprise Grid admin token (for account provisioning, not just messaging)',
      'GitHub organisation admin token, HubSpot admin access',
      'An asset-management API for equipment ordering and retrieval',
    ],
    pitfalls: [
      { title: 'Test the involuntary-departure path deliberately', body: 'This is the highest-stakes branch in the template. Run it against a test account before your first real involuntary termination, not during one.' },
      { title: 'Keep the department-provisioning map current', body: 'Role-Specific Provisioning only covers what you configure. A new department with no matching case falls through silently, add a default/fallback branch for anything unmapped.' },
      { title: 'Coordinate offboarding timing with the people conversation', body: 'Immediate revocation for involuntary departures should be sequenced with HR and legal guidance on when the employee is actually notified, this is a policy decision, not just a technical one.' },
    ],
    faqs: [
      { q: 'Can this integrate with BambooHR or Workday instead of a generic HRIS?', a: 'Yes, most HRIS platforms support outbound webhooks on hire and termination events, only the two trigger nodes need reconfiguring.' },
      { q: 'What about contractors, not just full-time employees?', a: 'Add a worker-type field early in Extract New Hire Details and branch provisioning scope accordingly, contractors typically need a narrower access set.' },
      { q: 'Does the buddy assignment logic need to be manual?', a: 'The template logs to Airtable for a human to assign; you can automate simple round-robin assignment in the same node if your team structure supports it.' },
    ],
  },
  {
    slug: 'customer-health-churn-prediction',
    name: 'Customer Health Score & Churn Prediction',
    file: '/n8n-templates/customer-health-churn-prediction.json',
    nodeCount: 27,
    complexity: 'Expert',
    category: 'Customer Success & Strategy',
    tools: ['HubSpot', 'Mixpanel', 'Zendesk', 'Stripe', 'Delighted', 'Slack', 'Airtable'],
    tagline: 'A 27-node daily pipeline that combines usage, support, billing and NPS signals into one composite health score per account, triggering different playbooks for at-risk, stable and expansion-ready customers.',
    intro: 'Most "customer health score" implementations are a single number pulled from one data source, usually product usage, which misses the accounts that are heavy users but about to churn over a billing dispute, or light users who are perfectly happy and simply do not need to log in often. This workflow combines four independent signals into one composite score and, critically, routes three genuinely different outcomes rather than just flagging risk.',
    sections: [
      {
        heading: 'Why a single signal produces false positives and false negatives',
        paras: [
          'Product usage alone flags any account with declining logins as at-risk, including perfectly satisfied customers who simply configured the product once and now let it run unattended, exactly the outcome many B2B tools are designed to produce. Support ticket volume alone flags engaged customers who ask a lot of questions as risky, when frequent contact is often a sign of investment, not dissatisfaction.',
          'The workflow pulls all four signals in parallel, usage trend, support ticket sentiment and volume, billing and payment health, and the latest NPS response, and combines them in Calculate Composite Health Score with configurable weights. The specific weighting in the template (40% usage, 25% support, 20% billing, 15% NPS) is a starting point, not a law, tuned by looking at which signal actually preceded real churn events historically.',
        ],
      },
      {
        heading: 'Batch processing and why it protects your other integrations',
        paras: [
          'Split In Batches processes customers 25 at a time rather than all at once. At meaningful scale, calling four different rate-limited APIs for every customer in one burst is the single most common way a health-scoring workflow gets throttled or banned outright by one of its own data sources.',
          'The batching loop (Loop Next Batch feeding back into Split In Batches) also means a single customer\'s API failure does not halt scoring for the rest of the portfolio, each batch completes independently.',
        ],
      },
      {
        heading: 'Three-way routing: risk, stability, and expansion',
        paras: [
          'The Health Tier switch does not just separate healthy from at-risk. A score climbing alongside strong usage growth routes to Identify Expansion Opportunity, flagging the account for an upsell conversation rather than treating growth as a non-event. This is the detail most churn-prediction builds miss entirely: the same infrastructure that catches risk early should also catch opportunity early, using the same data.',
          'Score Changed Significantly? gates action on movement greater than 15 points, not on the absolute score. Without this gate, a stable customer sitting at a permanently low-but-fine score of 45 would re-trigger the at-risk playbook every single day, training your CS team to ignore the alerts entirely.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Daily Trigger] --> B[Get Active Customers]
  B --> C[Split In Batches]
  C -->|done| Z[All Batches Complete]
  C -->|batch| D[Pull Usage Data]
  C -->|batch| E[Pull Support History]
  C -->|batch| F[Pull Billing History]
  C -->|batch| G[Pull NPS Score]
  D --> H[Merge All Signals]
  E --> H
  F --> H
  G --> H
  H --> I[Calculate Usage Trend]
  I --> J[Calculate Composite Score]
  J --> K{Score Changed >15pts?}
  K -->|No| L[Update Dashboard]
  K -->|Yes| M{Health Tier}
  M -->|At Risk| N[Trigger Playbook] --> O[Alert CSM] --> P[Create Save Task]
  M -->|Expansion Signal| Q{Usage Growth >20%?}
  Q -->|Yes| R[Notify Account Manager]
  Q -->|No| S[No Action]
  M -->|Watch| T[Add To Watch List] --> U[Schedule Check-In]
  P --> V[Merge Outcomes]
  R --> V
  S --> V
  U --> V
  V --> L
  L --> W[Log Score History]
  W --> C`,
    nodeTable: [
      { n: 'Split In Batches', type: 'Split In Batches', role: 'Processes 25 accounts at a time to protect rate limits' },
      { n: 'Pull Usage / Support / Billing / NPS', type: 'HTTP Request ×4', role: 'Four independent signal sources per customer' },
      { n: 'Calculate Composite Health Score', type: 'Code', role: 'Weighted 0-100 score across all four signals' },
      { n: 'Score Changed Significantly?', type: 'IF', role: 'Gates action on movement, not absolute score, prevents alert fatigue' },
      { n: 'Health Tier', type: 'Switch', role: 'Three-way split: at-risk, watch, healthy/expansion' },
      { n: 'Identify Expansion Opportunity', type: 'IF', role: 'Catches growth signals, not just risk signals' },
      { n: 'Log Score History', type: 'HTTP Request', role: 'Historical record used to re-validate the scoring weights over time' },
    ],
    code: [
      {
        caption: 'Composite health score calculation',
        lang: 'javascript',
        body: `const usageScore   = $json.usageTrendScore;    // 0-100
const supportScore = $json.supportSentimentScore;
const billingScore = $json.billingHealthScore;
const npsScore      = $json.npsNormalizedScore;

const WEIGHTS = { usage: 0.40, support: 0.25, billing: 0.20, nps: 0.15 };

const composite =
  usageScore   * WEIGHTS.usage   +
  supportScore * WEIGHTS.support +
  billingScore * WEIGHTS.billing +
  npsScore     * WEIGHTS.nps;

return [{
  json: {
    ...$json,
    score: Math.round(composite),
    scoreDelta: Math.round(composite) - $json.previousScore,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Churn signals caught before renewal', before: 'Often discovered at cancellation', after: 'Flagged weeks earlier via composite score' },
      { metric: 'False-positive risk alerts', before: 'High, single-signal (usage only)', after: 'Reduced, requires agreement across signals' },
      { metric: 'Expansion opportunities identified', before: 'Ad hoc, rep-dependent', after: 'Systematically flagged alongside risk' },
      { metric: 'CS team alert fatigue', before: 'Common with daily scoring', after: 'Mitigated by the 15-point movement gate' },
    ],
    prerequisites: [
      'n8n v1.40+ with Split In Batches v3',
      'CRM API access (HubSpot or equivalent) for the account list and task creation',
      'Product analytics API (Mixpanel, Amplitude or similar)',
      'Zendesk or equivalent support platform API',
      'Stripe billing data access, an NPS tool API (Delighted or equivalent)',
    ],
    pitfalls: [
      { title: 'Do not deploy the default weights unchanged', body: 'The 40/25/20/15 split is a reasonable starting point, not a validated model for your business. Revisit it against real churn outcomes after your first quarter of data.' },
      { title: 'Batch size needs tuning to your API limits', body: '25 is conservative. Check each connected API\'s actual rate limit and adjust Split In Batches accordingly, too large a batch reintroduces the throttling problem this pattern exists to prevent.' },
      { title: 'A score is a conversation starter, not a verdict', body: 'An automated save task or alert should trigger a human conversation, not an automated retention email. Customers can tell the difference, and it usually backfires.' },
    ],
    faqs: [
      { q: 'How much historical data do I need before this is reliable?', a: 'Enough churn events to validate the weighting, typically a full quarter at minimum, longer for lower-churn businesses. Run it and log scores well before trusting the at-risk playbook automatically.' },
      { q: 'Can this work for a PLG product with no assigned CSM?', a: 'Yes, route the at-risk alert to a shared Slack channel or trigger an automated in-app or email intervention instead of a named CSM task.' },
      { q: 'What if we do not have an NPS program?', a: 'Drop the NPS input and redistribute its 15% weight across the remaining three signals, the model degrades gracefully with three signals instead of four.' },
    ],
  },
];
