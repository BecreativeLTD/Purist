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
  {
    slug: 'contract-lifecycle-management',
    name: 'Contract Lifecycle Management',
    file: '/n8n-templates/contract-lifecycle-management.json',
    nodeCount: 26,
    complexity: 'Expert',
    category: 'Legal & Operations',
    tools: ['PandaDoc', 'DocuSign', 'Claude AI', 'Slack', 'Google Drive', 'Airtable'],
    tagline: 'A 26-node pipeline from contract request to signed, filed, and renewal-tracked, with AI risk-clause flagging and a reminder ladder before anything is chased manually.',
    intro: 'Contract management fails in the same two places at almost every company: nobody notices a non-standard clause until it becomes a problem, and nobody notices a renewal date until it has already passed. This workflow generates the right template for the contract type, has AI flag anything that deviates from your standard terms before it goes out, and tracks the full signature and renewal lifecycle without anyone maintaining a spreadsheet of dates.',
    sections: [
      {
        heading: 'Why AI review happens before legal review, not instead of it',
        paras: [
          'The AI Risk-Clause Extraction step is deliberately positioned as a triage layer, not a replacement for legal judgement. Most contracts generated from an approved template contain zero non-standard clauses, they are the same NDA or MSA language used dozens of times before. Routing every single one to a human reviewer wastes legal team time on documents that need no review at all.',
          'The workflow only routes to Route To Legal Review when Parse Risk Flags finds something outside the template norm, an unusual liability cap, a missing termination clause, non-standard indemnification language. Legal sees exactly what was flagged and why, turning a full-document read into a two-minute check of a specific clause.',
        ],
      },
      {
        heading: 'The reminder ladder before anything becomes a human problem',
        paras: [
          'Contracts sitting unsigned in someone\'s inbox is one of the most common, least-noticed sources of deal delay. The Fully Executed? branch checks status after sending, and unsigned contracts get an automatic reminder every 3 days rather than waiting for someone to remember to follow up.',
          'Escalate Unsigned Contract only fires after the reminder cycle has run its course, at that point it genuinely is a human relationship problem (the counterparty is stalling, has questions, or has gone quiet) rather than a process gap, and the person who needs to intervene has the full reminder history to reference.',
        ],
      },
      {
        heading: 'Renewal tracking that runs itself',
        paras: [
          'Extract Key Dates parses the effective date and term length from the executed document the moment it is filed, then Schedule Renewal Reminder holds until 90 days before expiry, real negotiation runway instead of a last-minute scramble that gives you no leverage to renegotiate terms.',
          'Every contract enters the same registry regardless of type, so "which contracts expire in the next quarter" becomes a query, not an archaeology project through old email threads and a shared drive nobody has fully organised.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[New Contract Webhook] --> B[Extract Details]
  B --> C{Contract Type}
  C -->|NDA| D[Generate NDA]
  C -->|MSA| E[Generate MSA]
  C -->|SOW| F[Generate SOW]
  D --> G[Merge Templates]
  E --> G
  F --> G
  G --> H[AI Risk-Clause Extraction]
  H --> I{Non-Standard Clauses?}
  I -->|Yes| J[Route To Legal] --> K[Wait Approval]
  I -->|No| L[Merge Review]
  K --> L
  L --> M[Send For Signature]
  M --> N[Wait Signature Status]
  N --> O{Fully Executed?}
  O -->|No| P[Wait 3 Days] --> Q[Send Reminder] --> N
  Q --> R[Escalate If Repeated]
  O -->|Yes| S[File Contract]
  S --> T[Extract Key Dates]
  T --> U[Wait Until 90 Days Before Expiry]
  U --> V[Notify Account Owner]
  V --> W[Log To Registry]`,
    nodeTable: [
      { n: 'Contract Type Router', type: 'Switch', role: 'Selects the correct template for NDA/MSA/SOW' },
      { n: 'AI Risk-Clause Extraction', type: 'HTTP Request', role: 'Flags non-standard clauses before signature, not after' },
      { n: 'Non-Standard Clauses Found?', type: 'IF', role: 'Only routes genuinely unusual contracts to legal' },
      { n: 'Wait For Signature Status', type: 'Wait (webhook resume)', role: 'Zero-cost pause until DocuSign reports status' },
      { n: 'Fully Executed? / Wait 3 Days loop', type: 'IF + Wait', role: 'Automatic reminder cascade before human escalation' },
      { n: 'Extract Key Dates', type: 'Code', role: 'Parses effective date and term length from the signed document' },
      { n: 'Schedule Renewal Reminder', type: 'Wait (specific time)', role: 'Fires 90 days before expiry, not at the deadline' },
    ],
    code: [
      {
        caption: 'Renewal date calculation (Extract Key Dates node)',
        lang: 'javascript',
        body: `const effectiveDate = new Date($json.effectiveDate);
const termMonths = $json.termLengthMonths;

const expiryDate = new Date(effectiveDate);
expiryDate.setMonth(expiryDate.getMonth() + termMonths);

const reminderDate = new Date(expiryDate);
reminderDate.setDate(reminderDate.getDate() - 90);

return [{
  json: {
    ...$json,
    expiryDate: expiryDate.toISOString(),
    renewalReminderDate: reminderDate.toISOString(),
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Contracts reviewed by legal', before: '100%, full document each time', after: 'Only those with flagged non-standard clauses' },
      { metric: 'Unsigned contracts followed up', before: 'Ad hoc, whoever remembers', after: 'Automatic 3-day reminder cadence' },
      { metric: 'Renewal negotiation runway', before: 'Often discovered at or after expiry', after: '90 days, every time' },
      { metric: 'Contract registry accuracy', before: 'Spreadsheet, manually updated', after: 'Populated automatically at execution' },
    ],
    prerequisites: [
      'n8n v1.40+ with webhook-resume Wait and specific-time Wait support',
      'PandaDoc or equivalent template-generation API',
      'DocuSign eSignature API access',
      'Anthropic API key for risk-clause extraction',
      'Google Drive OAuth2, Airtable PAT, Slack Bot Token',
    ],
    pitfalls: [
      { title: 'AI risk-clause flags need a human-reviewed baseline', body: 'Tune the extraction prompt against your actual standard templates first, otherwise it flags normal boilerplate as risky and legal starts ignoring the alerts.' },
      { title: 'Reminder cascades need a hard stop', body: 'Without Escalate Unsigned Contract as a defined exit, a counterparty who never responds keeps generating reminders indefinitely instead of becoming a visible problem.' },
      { title: 'Renewal dates depend on clean term-length data', body: 'If Extract Key Dates cannot confidently parse the term length, route to manual entry rather than silently defaulting, a wrong renewal date is worse than a missing one.' },
    ],
    faqs: [
      { q: 'Can this handle contract types beyond NDA/MSA/SOW?', a: 'Yes, Contract Type Router is a Switch node, add a case and a template-generation branch for any additional contract type you use.' },
      { q: 'What happens to contracts that get amended after signature?', a: 'Route amendments through the same workflow as a new request referencing the original contract ID, so the registry keeps the full version history linked.' },
      { q: 'Does the AI review replace outside counsel for complex agreements?', a: 'No, it is a triage layer for standard contract types generated from your own templates. Complex, heavily negotiated agreements should go to legal review regardless of what the AI flags.' },
    ],
  },
  {
    slug: 'vendor-risk-compliance-monitoring',
    name: 'Vendor Risk & Compliance Monitoring',
    file: '/n8n-templates/vendor-risk-compliance-monitoring.json',
    nodeCount: 24,
    complexity: 'Expert',
    category: 'Procurement & Legal',
    tools: ['Typeform/HubSpot Forms', 'Claude AI', 'Airtable', 'Slack', 'Resend'],
    tagline: 'A 24-node pipeline covering both vendor onboarding risk scoring and ongoing quarterly compliance monitoring, with automatic escalation when certifications lapse unrenewed.',
    intro: 'Vendor risk management usually exists as a one-time checkbox at onboarding and nothing afterward, which means a vendor\'s insurance certificate or SOC 2 report can quietly expire years before anyone notices. This workflow handles both halves: AI-assisted risk scoring when a new vendor is onboarded, and an ongoing quarterly sweep that catches expiring documentation before it becomes a genuine compliance gap.',
    sections: [
      {
        heading: 'Risk-tiered approval, not one-size-fits-all',
        paras: [
          'Not every vendor needs the same scrutiny. A software tool that never touches customer data is a different risk profile than a subprocessor handling regulated information. The Risk Tier Router splits new vendors into three paths based on the AI-generated risk score: high-risk vendors must supply insurance certificates and a current security certification before approval, medium-risk gets a standard human approval step, and low-risk auto-approves.',
          'This matters operationally because routing every vendor through the same heavyweight review process either slows down genuinely low-risk procurement to a crawl, or, more commonly, causes teams to skip the review process entirely because it is too slow for routine purchases.',
        ],
      },
      {
        heading: 'The ongoing sweep most vendor programs skip entirely',
        paras: [
          'Onboarding risk assessment is the easy half. The Quarterly Review Schedule branch is the half that actually prevents compliance exposure: it pulls every vendor due for review, checks certification and insurance expiry dates, and for anything expiring within 30 days, automatically requests renewed documentation before the gap opens.',
          'Escalate To Procurement only fires when a vendor has not responded within 14 days of the renewal request, at which point continuing to work with an uncertified vendor is a genuine decision someone needs to make deliberately, not a default that happens because nobody was tracking the date.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[New Vendor Webhook] --> B[Send Risk Questionnaire]
  B --> C[Response Webhook]
  C --> D[AI Risk Scoring]
  D --> E{Risk Tier}
  E -->|High| F[Request Additional Docs] --> G[Legal Review] --> H[Wait Sign-Off]
  E -->|Medium| I[Standard Approval]
  E -->|Low| J[Auto-Approve]
  H --> K[Merge Approvals]
  I --> K
  J --> K
  K --> L[Store Vendor Record]
  L --> M[Set Next Review Date]

  N[Quarterly Schedule] --> O[Get Vendors Due]
  O --> P[Split In Batches]
  P --> Q[Check Cert Expiry]
  Q --> R{Expiring Within 30 Days?}
  R -->|Yes| S[Request Renewal] --> T[Wait 14 Days] --> U{Received?}
  U -->|No| V[Escalate To Procurement]
  U -->|Yes| W[Update Registry]
  R -->|No| W`,
    nodeTable: [
      { n: 'New Vendor Webhook / Quarterly Review Schedule', type: 'Webhook + Schedule Trigger', role: 'Two independent entry points: onboarding vs ongoing monitoring' },
      { n: 'AI Risk Scoring', type: 'HTTP Request', role: 'Scores data handling, sub-processors, certifications from questionnaire answers' },
      { n: 'Risk Tier Router', type: 'Switch', role: 'Three-way approval path matched to actual risk, not a single flat process' },
      { n: 'Split In Batches', type: 'Split In Batches', role: 'Processes the vendor review queue without overloading downstream APIs' },
      { n: 'Expiring Within 30 Days?', type: 'IF', role: 'Catches lapsing certifications before they actually lapse' },
      { n: 'Documentation Received?', type: 'IF', role: 'Determines whether a 14-day silence becomes a procurement decision' },
    ],
    code: [
      {
        caption: 'Certificate expiry check',
        lang: 'javascript',
        body: `const expiryDate = new Date($json.certExpiryDate);
const today = new Date();
const daysToExpiry = Math.ceil((expiryDate - today) / 86400000);

return [{
  json: {
    ...$json,
    daysToExpiry,
    expiringSoon: daysToExpiry <= 30 && daysToExpiry >= 0,
    alreadyExpired: daysToExpiry < 0,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Vendor review consistency', before: 'Ad hoc, whoever onboards the vendor', after: 'Same AI-scored criteria, every vendor' },
      { metric: 'Expired certifications caught', before: 'Usually discovered during an audit', after: 'Flagged 30 days before expiry' },
      { metric: 'Low-risk vendor approval time', before: 'Same review cycle as high-risk', after: 'Auto-approved, same day' },
      { metric: 'Compliance audit trail', before: 'Scattered emails and file shares', after: 'Single registry with full review history' },
    ],
    prerequisites: [
      'n8n v1.40+ with Split In Batches support',
      'A risk questionnaire tool (Typeform or HubSpot Forms) with webhook delivery',
      'Anthropic API key for risk scoring',
      'Airtable PAT for the vendor registry, Slack Bot Token, Resend API key',
    ],
    pitfalls: [
      { title: 'Risk thresholds need calibration to your actual risk appetite', body: 'The default 70/40 score cutoffs are a starting point. Review your first quarter of scored vendors against outcomes and adjust.' },
      { title: 'Do not let auto-approval mean unreviewed forever', body: 'Low-risk auto-approved vendors still need to enter the quarterly review cycle. Confirm Set Next Review Date runs for every tier, including auto-approved.' },
      { title: 'Track sub-processor changes, not just the primary vendor', body: 'A vendor\'s own risk profile can change when they add a new sub-processor. The questionnaire should be re-sent periodically, not treated as a one-time snapshot.' },
    ],
    faqs: [
      { q: 'Can this integrate with a dedicated GRC or TPRM platform?', a: 'Yes, if it exposes an API (most modern GRC platforms do), replace the Airtable registry nodes with calls to that system while keeping the scoring and routing logic.' },
      { q: 'How is the AI risk score kept consistent over time?', a: 'Log the full questionnaire response and score reasoning alongside the score itself, so you can audit and recalibrate the model periodically against real outcomes.' },
      { q: 'What happens to a vendor that fails the high-risk review entirely?', a: 'Legal Review is a human decision point, not an automatic rejection. The workflow surfaces the concern with full context; a person decides whether to proceed, request mitigations, or decline the vendor.' },
    ],
  },
  {
    slug: 'sales-commission-calculation-payout',
    name: 'Sales Commission Calculation & Payout',
    file: '/n8n-templates/sales-commission-calculation-payout.json',
    nodeCount: 25,
    complexity: 'Expert',
    category: 'Finance & Sales Operations',
    tools: ['HubSpot', 'Airtable', 'Slack', 'Payroll API (Gusto)', 'Resend'],
    tagline: 'A 25-node monthly pipeline that calculates commission per rep including accelerators and clawbacks, generates a line-item statement, and gates payroll submission behind manager approval.',
    intro: 'Commission calculation is the finance process most likely to generate a heated dispute, because it directly affects take-home pay and the math (base rate, accelerator tiers, clawbacks for churned deals) is genuinely complex enough that manual spreadsheets diverge between reps without anyone noticing until someone compares notes. This workflow calculates every rep\'s payout with identical logic, flags disputes for review instead of guessing, and never submits to payroll without a human sign-off.',
    sections: [
      {
        heading: 'Why the same calculation logic for every rep matters more than the formula itself',
        paras: [
          'Most commission disputes are not actually about the commission plan being unfair, they are about two reps discovering their accelerators were calculated differently because two different people built two different spreadsheets. Calculate Base Commission and Apply Accelerator Multiplier run identical logic for every rep in Split In Batches By Rep, so the plan is applied consistently even when a hundred reps are processed in one run.',
          'This consistency is worth more than getting the underlying commission plan perfectly optimised. A slightly generous plan applied consistently generates far less friction than a precisely-tuned plan applied inconsistently.',
        ],
      },
      {
        heading: 'Clawbacks: the calculation nobody wants to do manually',
        paras: [
          'Check For Clawbacks looks back at deals from prior periods that were refunded or churned within the plan\'s clawback window, typically 90 to 180 days, and Apply Clawback Deductions reduces the current payout accordingly. This is the single most error-prone manual calculation in commission processing, because it requires cross-referencing the current period against several previous periods simultaneously.',
          'Doing this automatically, consistently, every month, means a rep is never surprised months later by a large deduction for something that should have been caught and communicated immediately when the churn happened.',
        ],
      },
      {
        heading: 'Disputes get a review path instead of a guess',
        paras: [
          'Deal Attribution Disputed? checks for cases where a rep has flagged that a specific deal should not count toward their number, a common scenario when deals get reassigned mid-cycle or split between an SDR and an AE. Disputed calculations route to Hold For Manual Review rather than the workflow guessing at the correct attribution.',
          'Every non-disputed statement still requires Manager Approval Gate before Submit To Payroll fires. This is not bureaucracy for its own sake, it is the same principle as the board-reporting template\'s review gate: a payroll submission is exactly the kind of action that should never happen without a human confirming the number first.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Monthly Trigger] --> B[Pull Closed-Won Deals]
  A --> C[Pull Commission Plans]
  B --> D[Merge]
  C --> D
  D --> E[Split By Rep]
  E --> F[Calculate Base Commission]
  F --> G{Quota Exceeded?}
  G -->|Yes| H[Apply Accelerator]
  G -->|No| I[Merge Rate Paths]
  H --> I
  I --> J[Check Clawbacks]
  J --> K[Apply Deductions]
  K --> L[Calculate Final Payout]
  L --> M{Disputed?}
  M -->|Yes| N[Hold For Review]
  M -->|No| O[Generate Statement]
  O --> P[Send To Rep]
  P --> Q[Manager Approval Gate]
  Q --> R{Approved?}
  R -->|Yes| S[Submit To Payroll]
  R -->|No| T[Return For Correction]
  S --> U[Log Payout]
  U --> E`,
    nodeTable: [
      { n: 'Split In Batches By Rep', type: 'Split In Batches', role: 'Ensures identical calculation logic runs per rep, not a bulk approximation' },
      { n: 'Quota Exceeded? / Apply Accelerator Multiplier', type: 'IF + Code', role: 'Accelerated rate applied consistently above quota' },
      { n: 'Check For Clawbacks', type: 'HTTP Request', role: 'Looks back across the clawback window for refunded/churned deals' },
      { n: 'Deal Attribution Disputed?', type: 'IF', role: 'Routes contested calculations to a human instead of guessing' },
      { n: 'Manager Approval Gate', type: 'Wait (webhook resume)', role: 'No payroll submission without explicit human sign-off' },
    ],
    code: [
      {
        caption: 'Final payout calculation',
        lang: 'javascript',
        body: `const baseCommission = $json.baseCommission;
const acceleratorBonus = $json.acceleratorBonus || 0;
const clawbackDeduction = $json.clawbackDeduction || 0;

const finalPayout = baseCommission + acceleratorBonus - clawbackDeduction;

return [{
  json: {
    ...$json,
    finalPayout: Number(finalPayout.toFixed(2)),
    hasDispute: $json.disputedDealIds?.length > 0,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Calculation consistency across reps', before: 'Varies by whoever built the spreadsheet', after: 'Identical logic applied to every rep' },
      { metric: 'Clawback tracking', before: 'Manual cross-reference, often missed', after: 'Automatic, every payout cycle' },
      { metric: 'Time to generate statements', before: 'Days for a sales team of 20+', after: 'Minutes, human review only' },
      { metric: 'Payroll submission errors', before: 'Caught after the fact, if at all', after: 'Gated behind explicit manager approval' },
    ],
    prerequisites: [
      'n8n v1.40+ with Split In Batches and webhook-resume Wait support',
      'CRM API access (HubSpot or Salesforce) for closed-won and churn data',
      'Airtable PAT for commission plans and payout logging',
      'Payroll API access (Gusto, Rippling, or your provider)',
    ],
    pitfalls: [
      { title: 'Clawback windows must match your actual contract terms', body: 'A clawback window that is shorter than your refund policy period will miss legitimate clawbacks; longer than necessary creates disputes over deals that should be settled.' },
      { title: 'Never skip the manager approval gate to save time at month-end', body: 'A payroll submission error is far more expensive to unwind than the few minutes an approval step costs, this is the one place in a commission workflow where speed is not the priority.' },
      { title: 'Deal reassignment history needs to be preserved, not just current state', body: 'If a deal changes owner mid-cycle, the commission calculation needs to know who owned it when, not just who owns it now, or attribution disputes become unresolvable.' },
    ],
    faqs: [
      { q: 'Can this handle split commissions between an SDR and an AE?', a: 'Yes, add a split-percentage field to the deal record and adjust Calculate Base Commission to allocate accordingly, the same workflow structure supports any attribution model.' },
      { q: 'What if a rep\'s plan changes mid-year?', a: 'Version your commission plans in Airtable with an effective date, and have Pull Rep Commission Plans select the plan version active during the period being calculated, not just the current plan.' },
      { q: 'How are draws or guaranteed minimums handled?', a: 'Add a comparison step after Calculate Final Payout that pays the greater of the calculated commission or the guaranteed draw, then tracks any draw balance owed against future periods.' },
    ],
  },
  {
    slug: 'competitive-intelligence-monitoring',
    name: 'Competitive Intelligence Monitoring',
    file: '/n8n-templates/competitive-intelligence-monitoring.json',
    nodeCount: 24,
    complexity: 'Expert',
    category: 'Strategy & Marketing',
    tools: ['Diffbot', 'Greenhouse/Lever job boards', 'NewsAPI', 'Claude AI', 'Slack', 'Airtable'],
    tagline: 'A 24-node daily pipeline tracking competitor pricing pages, public job postings, and news mentions, alerting only on genuine changes and routing each to the team that acts on it.',
    intro: 'Most competitive intelligence programs are a shared folder nobody updates after the first week. This workflow pulls three real signal sources daily for every tracked competitor, pricing page content, public job postings, and news mentions, has AI diff each against the previous snapshot to filter out noise, and routes only genuine changes to the team positioned to act: pricing changes to pricing, hiring signals to strategy, news events to PR.',
    sections: [
      {
        heading: 'Why hiring data is the most underused competitive signal',
        paras: [
          'Public job postings are one of the most reliable leading indicators of competitor strategy, and almost nobody systematically tracks them. A cluster of new senior engineering hires for a specific product area, or a sudden opening for a "VP of International Expansion," reliably precedes public announcements by months, because headcount planning happens long before a launch.',
          'Fetch Job Postings pulls this directly from public ATS job board APIs (Greenhouse and Lever both expose these without authentication for public postings), and Alert Strategy Team fires specifically on hiring-classified changes so a hiring pattern gets noticed by the team that can act on the inference, not buried in a general newsletter nobody reads closely.',
        ],
      },
      {
        heading: 'Diffing against history is what makes this sustainable',
        paras: [
          'The naive version of this workflow re-summarizes the full pricing page and job board every day, which produces a flood of repetitive alerts and trains everyone to ignore the channel within two weeks. Get Previous Snapshot pulls yesterday\'s data before the AI does anything, and AI Diff & Summarize is explicitly instructed to report only what changed.',
          'Change Detected? then gates the entire alerting path: most days, for most competitors, nothing meaningfully changed, and Store Snapshot Only logs the data with zero noise generated. This is the difference between a monitoring system people trust and one they mute.',
        ],
      },
      {
        heading: 'The weekly digest closes the loop for leadership',
        paras: [
          'Daily alerts serve the team that needs to react immediately. Leadership needs the pattern across a week, not a stream of individual events. The separate Weekly Digest Schedule branch compiles the week\'s logged changes across all competitors into one AI-summarized digest, giving executives the "so what" view without needing to follow the daily alert channel at all.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Daily Schedule] --> B[Get Competitor List]
  B --> C[Split In Batches]
  C --> D[Scrape Pricing Page]
  C --> E[Fetch Job Postings]
  C --> F[Fetch News Mentions]
  D --> G[Merge Sources]
  E --> G
  F --> G
  G --> H[Get Previous Snapshot]
  H --> I[AI Diff & Summarize]
  I --> J{Change Detected?}
  J -->|No| K[Store Snapshot Only]
  J -->|Yes| L{Classify Change}
  L -->|Pricing| M[Alert Pricing Team]
  L -->|Hiring| N[Alert Strategy Team]
  L -->|News| O[Alert PR/Marketing]
  M --> P[Merge Alerts]
  N --> P
  O --> P
  K --> P
  P --> Q[Log Snapshot & Diff]
  Q --> C

  R[Weekly Schedule] --> S[Compile Week's Changes]
  S --> T[AI Weekly Digest]
  T --> U[Send To Leadership]`,
    nodeTable: [
      { n: 'Scrape Pricing Page / Fetch Job Postings / Fetch News Mentions', type: 'HTTP Request ×3', role: 'Three independent, genuinely predictive signal sources' },
      { n: 'Get Previous Snapshot', type: 'HTTP Request', role: 'Pulled before analysis so the AI compares, not just describes' },
      { n: 'AI Diff & Summarize', type: 'HTTP Request', role: 'Reports only what changed since the last run' },
      { n: 'Change Detected?', type: 'IF', role: 'The noise filter that keeps this workflow sustainable long-term' },
      { n: 'Classify Change Type', type: 'Switch', role: 'Routes each change to the team actually positioned to act on it' },
      { n: 'Weekly Digest Schedule branch', type: 'Schedule Trigger + AI', role: 'Compiles the pattern across a week for leadership' },
    ],
    code: [
      {
        caption: 'Change classification logic (conceptual, inside AI Diff & Summarize response parsing)',
        lang: 'javascript',
        body: `const diff = $json.aiDiffResult;

return [{
  json: {
    ...$json,
    hasChange: diff.changes.length > 0,
    changeType: diff.changes[0]?.category, // 'pricing' | 'hiring' | 'news'
    changeSummary: diff.changes[0]?.summary,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Signal sources tracked per competitor', before: '0-1, usually just news alerts', after: '3, cross-referenced daily' },
      { metric: 'Alert noise', before: 'High if monitoring exists at all', after: 'Only genuine changes trigger alerts' },
      { metric: 'Time to notice a pricing change', before: 'Whenever a customer mentions it', after: 'Within 24 hours' },
      { metric: 'Leadership visibility', before: 'Ad hoc, reactive', after: 'Weekly synthesized digest' },
    ],
    prerequisites: [
      'n8n v1.40+ with Split In Batches support',
      'Diffbot or equivalent web content extraction API',
      'Public ATS job board access (Greenhouse/Lever, no auth needed for public postings)',
      'NewsAPI or equivalent news search API',
      'Anthropic API key, Airtable PAT, Slack Bot Token',
    ],
    pitfalls: [
      { title: 'Respect robots.txt and terms of service when scraping', body: 'Pricing page monitoring should only ever pull publicly published content, not bypass access controls or scrape at a rate that burdens the competitor\'s infrastructure.' },
      { title: 'Tune the AI diff prompt to ignore cosmetic changes', body: 'A/B tested button colors and copy tweaks are not competitive intelligence. The prompt needs explicit instruction on what counts as a substantive change.' },
      { title: 'Job posting signal needs interpretation, not just detection', body: 'A new posting alone is a data point, not a conclusion. Alert Strategy Team should include enough context (role, seniority, past hiring pattern) for a human to interpret it correctly.' },
    ],
    faqs: [
      { q: 'Is scraping competitor pricing pages legal?', a: 'Publicly accessible pricing information can generally be monitored, but always check the specific site\'s terms of service and robots.txt, and avoid any scraping that requires bypassing authentication or rate limits.' },
      { q: 'Can this track private/enterprise pricing that is not published?', a: 'No, this workflow only monitors publicly visible information. Enterprise pricing typically requires sales conversations and cannot be automated this way.' },
      { q: 'How many competitors can this realistically track?', a: 'Split In Batches keeps this scalable to dozens of competitors; the practical limit is usually API rate limits on the news and job board sources, not n8n itself.' },
    ],
  },
  {
    slug: 'recruitment-pipeline-automation',
    name: 'Recruitment Pipeline Automation',
    file: '/n8n-templates/recruitment-pipeline-automation.json',
    nodeCount: 28,
    complexity: 'Expert',
    category: 'HR & Talent Acquisition',
    tools: ['Greenhouse', 'Affinda', 'Claude AI', 'Cal.com', 'CodeSignal', 'DocuSign', 'Airtable'],
    tagline: 'A 28-node pipeline from application to signed offer, AI resume screening, role-aware technical vs panel routing, and a direct handoff into the onboarding workflow the moment an offer is accepted.',
    intro: 'A recruitment pipeline touches more systems than almost any other HR process: an ATS, a resume parser, a calendar, an assessment platform, an e-signature tool, and eventually the onboarding system. This workflow connects all of them end to end, screening every application consistently, routing technical and non-technical roles down genuinely different evaluation paths, and handing off directly into onboarding the moment an offer is accepted rather than leaving that connection to someone\'s memory.',
    sections: [
      {
        heading: 'Screening consistency without losing the human decision',
        paras: [
          'AI Score Against Requirements evaluates every application against the specific role\'s actual requirements, not a generic resume quality heuristic, and Screening Threshold Met? gates who gets an automatic screening call. This does not replace human judgement, it replaces the inconsistency of different recruiters applying different informal bars on different days.',
          'Rejected candidates are not simply discarded. Tag For Future Roles logs them to a searchable candidate pool, since a candidate who is not right for this specific role today is frequently the right fit for a different opening in six months, and that connection is invisible without a system tracking it.',
        ],
      },
      {
        heading: 'Why technical and non-technical roles need genuinely different paths',
        paras: [
          'Role Type Router is not a cosmetic branch. A coding assessment is the correct next evaluation step for a technical role and actively counterproductive for most non-technical ones, where a structured panel interview evaluates the skills that actually matter. Forcing every candidate through the same generic pipeline is the single most common design mistake in recruitment automation.',
          'Send Coding Assessment and Wait For Assessment Completion use webhook-resume so the workflow costs nothing while waiting, potentially days, for a candidate to complete an assessment, exactly the same pattern used for fulfillment waits in the order-to-cash template.',
        ],
      },
      {
        heading: 'The handoff into onboarding that most companies never automate',
        paras: [
          'Offer Accepted Webhook triggers Trigger Onboarding Workflow, which calls directly into the Employee Onboarding & Offboarding template with the new hire\'s details already populated. This single connection eliminates the most common gap in the entire hire lifecycle: the moment between "candidate said yes" and "IT knows a laptop needs ordering," which at most companies depends entirely on someone remembering to loop in HR operations manually.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[New Application] --> B[Parse Resume]
  B --> C[AI Score]
  C --> D{Threshold Met?}
  D -->|Yes| E[Schedule Screening Call]
  D -->|No| F[Polite Rejection] --> G[Tag For Future Roles]
  E --> H[Confirmation Email]

  I[Screening Complete] --> J[Collect Feedback]
  J --> K{Advance?}
  K -->|No| L[Log Rejection]
  K -->|Yes| M{Role Type}
  M -->|Technical| N[Coding Assessment] --> O[Wait Completion]
  M -->|Non-Technical| P[Schedule Panel]
  O --> Q[Merge]
  P --> Q
  Q --> R[Final Decision Gate]
  R --> S{Hired?}
  S -->|Yes| T[Generate Offer] --> U[Send via DocuSign] --> V[Offer Accepted]
  V --> W[Trigger Onboarding]
  W --> X[Log To Registry]
  S -->|No| Y[Final Rejection]`,
    nodeTable: [
      { n: 'AI Score Against Requirements', type: 'HTTP Request', role: 'Consistent screening bar per role, not per recruiter' },
      { n: 'Role Type Router', type: 'Switch', role: 'Technical vs non-technical get genuinely different evaluation paths' },
      { n: 'Wait For Assessment Completion', type: 'Wait (webhook resume)', role: 'Zero-cost pause while a candidate completes a coding test' },
      { n: 'Final Decision Gate', type: 'Wait (webhook resume)', role: 'Hiring manager makes the call with full history in view' },
      { n: 'Offer Accepted Webhook → Trigger Onboarding Workflow', type: 'Webhook + HTTP Request', role: 'Direct handoff into the onboarding template, no manual handover' },
    ],
    code: [
      {
        caption: 'Handoff payload into the onboarding workflow',
        lang: 'javascript',
        body: `// Fires the same webhook shape the Employee Onboarding template expects
return [{
  json: {
    startDate: $json.agreedStartDate,
    role: $json.roleTitle,
    department: $json.department,
    email: $json.personalEmail,
    githubHandle: $json.githubHandle || null,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Screening consistency', before: 'Varies by recruiter and day', after: 'Same criteria applied every time' },
      { metric: 'Time from application to screening call', before: 'Days, manual review queue', after: 'Same day for qualifying candidates' },
      { metric: 'Rejected candidates retained for future roles', before: 'Effectively lost', after: 'Searchable candidate pool' },
      { metric: 'Gap between offer acceptance and onboarding start', before: 'Depends on someone remembering to notify HR ops', after: 'Automatic, same-day trigger' },
    ],
    prerequisites: [
      'n8n v1.40+ with webhook-resume Wait support',
      'ATS with API access (Greenhouse or Lever)',
      'Affinda or equivalent resume parsing API',
      'Anthropic API key, Cal.com or Google Calendar, CodeSignal or equivalent assessment platform',
      'PandaDoc, DocuSign, Airtable PAT',
    ],
    pitfalls: [
      { title: 'AI screening scores need regular bias auditing', body: 'Any automated resume screening carries legal and ethical obligations to audit for disparate impact across protected characteristics. Review scoring outcomes by demographic segment periodically, not just once at launch.' },
      { title: 'The threshold score is a floor, not a hiring decision', body: 'Screening Threshold Met? decides who gets a conversation, never who gets hired. Keep every substantive decision with a human interviewer.' },
      { title: 'Test the onboarding handoff end to end before relying on it', body: 'A field-name mismatch between this workflow\'s output and the onboarding template\'s expected input fails silently unless you validate the full chain with a test candidate first.' },
    ],
    faqs: [
      { q: 'Does AI resume screening create legal risk?', a: 'It can, if not implemented carefully. Ensure the scoring criteria are job-related and consistently applied, document the criteria, and audit outcomes for adverse impact. Consult employment counsel before deploying AI screening at scale.' },
      { q: 'Can this handle multiple open roles simultaneously?', a: 'Yes, each application carries its own role ID, and AI Score Against Requirements pulls the specific requirements for that role, so multiple pipelines run independently through the same workflow.' },
      { q: 'What if a candidate needs to skip the screening call and go straight to a panel?', a: 'Add a manual override path that a recruiter can trigger to bypass Screening Threshold Met? for referred or pre-vetted candidates, feeding directly into Role Type Router.' },
    ],
  },
  {
    slug: 'investor-relations-fundraising-crm',
    name: 'Investor Relations & Fundraising CRM Automation',
    file: '/n8n-templates/investor-relations-fundraising-crm.json',
    nodeCount: 25,
    complexity: 'Expert',
    category: 'Strategy & Finance',
    tools: ['Crunchbase', 'Claude AI', 'DocSend', 'Airtable', 'Slack', 'Resend'],
    tagline: 'A 25-node pipeline that scores inbound investor contacts against your actual fund thesis, tracks data-room engagement as a real buying signal, and never sends investor communication without founder approval.',
    intro: 'Fundraising is relationship-intensive work that most founders still track in a spreadsheet, discovering engagement signals (a partner who viewed the deck five times) too late to act on them. This workflow scores every investor contact against your specific raise criteria, tracks real data-room engagement instead of guessing at interest from email replies alone, and keeps every founder firmly in control of outbound communication.',
    sections: [
      {
        heading: 'Fit scoring against your actual thesis, not a generic VC list',
        paras: [
          'AI Fit Scoring vs Fund Thesis evaluates each investor contact against your specific stage, sector, and check-size criteria, not a generic "is this a real investor" filter. A well-known fund that only writes Series B checks is a poor fit for a seed round regardless of its reputation, and this workflow scores accordingly rather than treating brand recognition as fit.',
          'Fit Tier Router splits contacts three ways: high-fit gets an AI-drafted, founder-reviewed personalized intro; medium-fit enters a lower-touch nurture list; low-fit is simply logged, preserving the record without consuming outreach effort on a poor match.',
        ],
      },
      {
        heading: 'Data-room engagement is a far better signal than email replies',
        paras: [
          'High Engagement Signal? watches for the pattern that actually predicts investor interest: multiple views of the data room, or extended time spent in it, tracked via DocSend\'s webhook events. A partner who opens your deck once and never returns is a very different signal from one who has viewed it five times over three days, and most founders have no visibility into this distinction at all without deliberately tracking it.',
          'Alert Founder To Follow Up fires specifically on the high-engagement pattern, meaning founder attention goes to the investors who are demonstrably reading closely, right when that attention matters most, rather than being spread evenly across every contact regardless of actual interest.',
        ],
      },
      {
        heading: 'Every outbound word passes through the founder',
        paras: [
          'Both Founder Review Gate (for intro emails) and Founder Approval Before Send (for the weekly investor update) are hard stops. This is the single principle that matters most in this template: fundraising communication is relationship-defining, and no automation should be trusted to send it unreviewed, regardless of how good the AI draft looks.',
          'What the workflow automates is everything around that communication, enrichment, scoring, engagement tracking, pipeline stage updates, so the founder\'s limited time goes entirely into the judgement calls that actually require it.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[New Investor Contact] --> B[Enrich Firm Data]
  B --> C[AI Fit Scoring]
  C --> D{Fit Tier}
  D -->|High| E[AI Draft Intro] --> F[Founder Review Gate] --> G[Send Intro Email]
  D -->|Medium| H[Add To Nurture List]
  D -->|Low| I[Log Only]
  G --> J[Merge Fit Paths]
  H --> J
  I --> J
  J --> K[Add To Pipeline CRM]

  L[Data Room Viewed] --> M{High Engagement?}
  M -->|Yes| N[Alert Founder]
  M -->|No| O[Standard Cadence]

  P[Meeting Scheduled] --> Q{Pipeline Stage}
  Q -->|Met/Diligence/Term Sheet| R[Update Pipeline Stage]

  S[Weekly Schedule] --> T[Compile Metrics]
  T --> U[Generate Update Email]
  U --> V[Founder Approval] --> W[Broadcast To Investors]`,
    nodeTable: [
      { n: 'AI Fit Scoring vs Fund Thesis', type: 'HTTP Request', role: 'Scores against your specific raise criteria, not generic VC recognition' },
      { n: 'Founder Review Gate / Founder Approval Before Send', type: 'Wait (webhook resume) ×2', role: 'Hard stops on all outbound investor communication' },
      { n: 'High Engagement Signal?', type: 'IF', role: 'Surfaces real buying signal from data-room behaviour, not email replies' },
      { n: 'Pipeline Stage Router', type: 'Switch', role: 'Tracks deal progression: met, diligence, term sheet' },
      { n: 'Weekly Investor Update Schedule branch', type: 'Schedule Trigger + AI', role: 'Automated draft, human-approved send, of the recurring update' },
    ],
    code: [
      {
        caption: 'Engagement signal threshold check',
        lang: 'javascript',
        body: `const viewCount = $json.viewCount || 0;
const timeSpentSeconds = $json.timeSpentSeconds || 0;

const highEngagement = viewCount > 3 || timeSpentSeconds > 300;

return [{
  json: {
    ...$json,
    highEngagement,
    engagementNote: highEngagement
      ? \`Viewed \${viewCount}x, \${Math.round(timeSpentSeconds/60)} min total\`
      : null,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Investor fit assessment', before: 'Gut feel, brand recognition', after: 'Scored against explicit thesis criteria' },
      { metric: 'Engagement visibility', before: 'None beyond email replies', after: 'Data-room view count and duration tracked' },
      { metric: 'Follow-up timing on hot investors', before: 'Whenever the founder happens to check', after: 'Alerted the moment high engagement is detected' },
      { metric: 'Outbound communication control', before: 'Varies', after: '100% founder-approved before sending' },
    ],
    prerequisites: [
      'n8n v1.40+ with webhook-resume Wait support',
      'Crunchbase API or equivalent firm enrichment source',
      'Anthropic API key',
      'DocSend or equivalent data-room tool with webhook/event access',
      'Airtable PAT, Slack Bot Token, Resend API key',
    ],
    pitfalls: [
      { title: 'Never let the AI-drafted intro send without review', body: 'Investor outreach is the highest-stakes external communication a founder sends. The review gate is not friction to remove, it is the entire point of keeping this safe.' },
      { title: 'Fit scores can miss context the AI has no way to know', body: 'A fund\'s public thesis and its actual current appetite can diverge (dry powder constraints, a recent related investment). Treat the score as a prioritisation aid, not a final verdict.' },
      { title: 'Data-room engagement data has a lag', body: 'DocSend and similar tools batch webhook delivery in some configurations. Do not assume real-time delivery without confirming your specific plan\'s webhook latency.' },
    ],
    faqs: [
      { q: 'Can this replace a fundraising CRM like Affinity?', a: 'For an early-stage raise with a few dozen to a few hundred contacts, yes, this covers the core workflow. At later stages with a large, complex investor network, a dedicated platform\'s relationship-graph features become more valuable.' },
      { q: 'How does the weekly investor update avoid sounding generic?', a: 'Compile Company Metrics pulls your actual current numbers each week, so the AI draft reflects real, current data rather than a templated update, and the founder approval step catches anything that still reads generically.' },
      { q: 'Is data-room view tracking something investors expect?', a: 'Yes, DocSend-style tracked sharing is now the market standard for fundraising decks specifically because both sides understand engagement data is being captured; it is not considered an invasive practice in this context.' },
    ],
  },
  {
    slug: 'ma-due-diligence-data-room',
    name: 'M&A Due Diligence Data Room',
    file: '/n8n-templates/ma-due-diligence-data-room.json',
    nodeCount: 26,
    complexity: 'Expert',
    category: 'Strategy & Legal',
    tools: ['DocuSign', 'Google Drive', 'Claude AI', 'Slack', 'Airtable'],
    tagline: 'A 26-node pipeline from NDA to a fully tracked due diligence process: automated folder provisioning, AI document classification against your checklist, and real-time red-flag detection on every upload.',
    intro: 'A due diligence process run through email and a shared Drive folder loses track of what has been reviewed, what is still outstanding, and whether anything concerning has surfaced, until someone manually audits the whole thing days before signing. This workflow gates access behind a signed NDA, classifies every uploaded document against your DD checklist automatically, and has AI flag concerning clauses the moment a document lands, not during a last-minute review sprint.',
    sections: [
      {
        heading: 'Why the NDA gate is a hard stop, not a formality',
        paras: [
          'Wait For NDA Signature blocks Provision Data Room Folder Structure entirely until DocuSign confirms full execution. This sounds obvious, but the actual failure mode in real deals is a data room link shared informally "while the NDA is being finalized," which has caused real legal exposure in transactions that later fell through. The workflow makes the sequence structurally impossible to skip.',
        ],
      },
      {
        heading: 'Classification and checklist tracking as documents arrive, not at the end',
        paras: [
          'AI Classify Document Type reads each upload and routes it to the correct DD checklist category (financials, contracts, HR, IP, litigation) automatically, updating completion percentage in real time. This replaces the alternative most deal teams actually use: a spreadsheet someone updates manually, usually a day or more behind the actual data room state.',
          'The Daily Checklist Check Schedule branch means the deal lead always knows current completion status without asking, and the counterparty gets a specific, current list of what remains outstanding rather than a generic reminder.',
        ],
      },
      {
        heading: 'Red-flag detection at the moment of upload, when it is still useful',
        paras: [
          'AI Scan For Red Flags checks each document for the specific things that actually change deal terms: change-of-control clauses that could trigger on the transaction itself, undisclosed litigation, unusual indemnification language. Alert Deal Team Immediately fires the moment something is found, while there is still time to investigate and factor it into negotiation, not during a final review when the timeline has no slack left.',
          'Every access event is also logged via Store Access Log, giving a complete audit trail of who viewed what and when, which is both a security control and frequently a specific requirement from legal counsel on either side of the transaction.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[New DD Request] --> B[Send NDA]
  B --> C[Wait Signature]
  C --> D[Provision Data Room]
  D --> E[Send Access + Checklist]
  F[Document Uploaded] --> G[AI Classify Type]
  G --> H{Checklist Category}
  H -->|Financials| I[Update Financials]
  H -->|Contracts| J[Update Contracts]
  H -->|Other| K[Update Other]
  I --> L[Merge Checklist]
  J --> L
  K --> L
  L --> M[AI Scan Red Flags]
  M --> N{Red Flag?}
  N -->|Yes| O[Alert Deal Team]
  N -->|No| P[Merge]
  O --> P
  P --> Q[Log Document & Summary]

  R[Daily Schedule] --> S[Get Completion %]
  S --> T{100% Complete?}
  T -->|Yes| U[Notify Deal Lead]
  T -->|No| V[Send Missing Items Reminder]

  W[Access Event] --> X[Store Access Log]`,
    nodeTable: [
      { n: 'Wait For NDA Signature', type: 'Wait (webhook resume)', role: 'Structurally blocks data room access before NDA execution' },
      { n: 'Provision Data Room Folder Structure', type: 'HTTP Request', role: 'Creates the standard DD folder tree automatically' },
      { n: 'AI Classify Document Type', type: 'HTTP Request', role: 'Routes each upload to the correct checklist category in real time' },
      { n: 'AI Scan For Red Flags', type: 'HTTP Request', role: 'Flags concerning clauses at upload time, not during final review' },
      { n: 'Daily Checklist Check Schedule branch', type: 'Schedule Trigger + IF', role: 'Always-current completion status without manual tracking' },
      { n: 'Store Access Log', type: 'Webhook + HTTP Request', role: 'Full audit trail of who viewed what and when' },
    ],
    code: [
      {
        caption: 'Checklist completion calculation',
        lang: 'javascript',
        body: `const totalRequiredDocs = $json.checklistItems.length;
const uploadedDocs = $json.checklistItems.filter(i => i.status === 'uploaded').length;

const completionPercent = Math.round((uploadedDocs / totalRequiredDocs) * 100);

return [{
  json: {
    ...$json,
    completionPercent,
    missingItems: $json.checklistItems.filter(i => i.status !== 'uploaded').map(i => i.name),
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Checklist completion visibility', before: 'Manually updated spreadsheet, often stale', after: 'Real-time, updated on every upload' },
      { metric: 'Time to flag a concerning clause', before: 'During final review, days before signing', after: 'Within minutes of upload' },
      { metric: 'Access audit trail', before: 'Incomplete or nonexistent', after: 'Every view logged automatically' },
      { metric: 'Data room access before NDA', before: 'A real, documented risk in informal processes', after: 'Structurally impossible' },
    ],
    prerequisites: [
      'n8n v1.40+ with webhook-resume Wait support',
      'DocuSign eSignature API access',
      'Google Drive OAuth2 or a dedicated virtual data room API',
      'Anthropic API key for classification and red-flag scanning',
      'Airtable PAT, Slack Bot Token, Resend API key',
    ],
    pitfalls: [
      { title: 'AI red-flag scanning supplements legal review, never replaces it', body: 'This surfaces things worth a lawyer\'s attention faster, it does not substitute for actual legal due diligence on flagged documents.' },
      { title: 'Access logging requires the data room tool to support event webhooks', body: 'Confirm your specific VDR or Drive configuration actually fires access events before relying on Store Access Log for audit purposes.' },
      { title: 'Checklist categories must match your actual DD framework', body: 'Generic categories (financials/contracts/other) are a starting point, tailor them to the specific deal type and industry before relying on completion percentage as a real signal.' },
    ],
    faqs: [
      { q: 'Can this replace a dedicated virtual data room platform?', a: 'For smaller deals, this pattern built on Google Drive covers the core need. For large, multi-party transactions with complex permissioning, a dedicated VDR (Datasite, Intralinks) still offers permission granularity this template does not replicate.' },
      { q: 'What happens if the AI misclassifies a document?', a: 'Misclassified documents still get logged and are visible in the checklist for manual correction, they are not silently lost, just temporarily filed under the wrong category until someone notices.' },
      { q: 'Does this work for both buy-side and sell-side due diligence?', a: 'Yes, the same structure works for either side, whoever is uploading the checklist items in a given deal role.' },
    ],
  },
  {
    slug: 'financial-close-multi-entity-consolidation',
    name: 'Financial Close & Multi-Entity Consolidation',
    file: '/n8n-templates/financial-close-multi-entity-consolidation.json',
    nodeCount: 28,
    complexity: 'Expert',
    category: 'Finance & Strategy',
    tools: ['Xero/QuickBooks/NetSuite', 'Exchange Rate API', 'Claude AI', 'Google Slides', 'Airtable', 'Slack'],
    tagline: 'A 28-node monthly close pipeline validating every entity\'s trial balance, converting foreign entities to group currency, applying intercompany eliminations, and gating the consolidated package behind CFO review before the period locks.',
    intro: 'Multi-entity consolidation is where finance teams lose the most time in the monthly close: pulling trial balances from separate accounting systems, converting currencies, matching intercompany balances that never quite net to zero on the first pass, and building a group-level package by hand. This workflow validates and processes each entity independently, then consolidates, so problems surface at the entity level where they are cheap to fix rather than at the group level where they are expensive to untangle.',
    sections: [
      {
        heading: 'Validate before you consolidate, not after',
        paras: [
          'Validate Debits Equal Credits checks each entity\'s trial balance independently before it ever touches the consolidation logic. An unbalanced entity ledger that enters consolidation produces a group-level discrepancy that could originate from any of a dozen entities, turning a five-minute entity-level fix into a multi-hour investigation.',
          'Alert Entity Controller routes the problem to the person who can actually fix it, at their own ledger, immediately, rather than surfacing as an unexplained group-level variance days later.',
        ],
      },
      {
        heading: 'Currency conversion and eliminations, the two steps that eat the most manual time',
        paras: [
          'Is Foreign Entity? branches only foreign-currency entities through Convert To Group Currency, using the period-appropriate exchange rate rather than a stale or manually-entered rate, one of the more common sources of small consolidation errors that compound over a fiscal year.',
          'Apply Intercompany Eliminations matches receivables and payables between entities that should net to zero. Elimination Mismatch? flags anything that does not, which in practice is almost always either a timing difference (one entity recorded a transaction a day before the other) or a genuine data entry error, both of which need a human to resolve rather than being silently ignored or force-balanced.',
        ],
      },
      {
        heading: 'The same review-gate principle as board reporting, applied to the close',
        paras: [
          'CFO Review Gate blocks Distribute Close Package the same way the Board Reporting template blocks board distribution: AI drafts the variance commentary, but a human confirms the consolidated numbers and narrative before anyone outside finance sees them.',
          'Lock Accounting Period runs only after distribution, preventing a post-close edit in any entity\'s ledger from silently invalidating numbers that have already been reported and relied upon.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Monthly Trigger] --> B[Get Entity List]
  B --> C[Split By Entity]
  C -->|done| P[Consolidate Group Financials]
  C -->|entity| D[Pull Trial Balance]
  D --> E[Validate Debits=Credits]
  E --> F{Balanced?}
  F -->|No| G[Alert Controller] --> H[Wait Correction]
  F -->|Yes| I{Foreign Entity?}
  I -->|Yes| J[Convert Currency]
  I -->|No| K[Merge Currency]
  J --> K
  H --> L[Merge Validation]
  K --> L
  L --> M[Apply Eliminations]
  M --> N{Mismatch?}
  N -->|Yes| O[Flag Manual Reconciliation]
  N -->|No| Q[Merge]
  O --> Q
  Q --> C
  P --> R[Compare Prior Month/Budget]
  R --> S[AI Variance Commentary]
  S --> T[Generate Close Package]
  T --> U[CFO Review Gate]
  U --> V[Distribute Package]
  V --> W[Lock Period]
  W --> X[Log Cycle Metrics]`,
    nodeTable: [
      { n: 'Validate Debits Equal Credits', type: 'Code', role: 'Catches an unbalanced entity before it corrupts group-level numbers' },
      { n: 'Is Foreign Entity? / Convert To Group Currency', type: 'IF + HTTP Request', role: 'Period-appropriate FX conversion, only where actually needed' },
      { n: 'Apply Intercompany Eliminations', type: 'Code', role: 'Matches intercompany balances that should net to zero' },
      { n: 'Elimination Mismatch?', type: 'IF', role: 'Flags genuine discrepancies for human reconciliation, never force-balances' },
      { n: 'CFO Review Gate', type: 'Wait (webhook resume)', role: 'No consolidated package leaves finance without explicit sign-off' },
      { n: 'Lock Accounting Period', type: 'HTTP Request', role: 'Prevents post-distribution edits from invalidating reported numbers' },
    ],
    code: [
      {
        caption: 'Trial balance validation',
        lang: 'javascript',
        body: `const totalDebits = $json.lineItems.reduce((sum, li) => sum + (li.debit || 0), 0);
const totalCredits = $json.lineItems.reduce((sum, li) => sum + (li.credit || 0), 0);
const imbalance = Math.abs(totalDebits - totalCredits);

return [{
  json: {
    ...$json,
    totalDebits,
    totalCredits,
    balanced: imbalance < 0.01,
    imbalance,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Time to identify an unbalanced entity', before: 'Discovered at group level, hard to trace', after: 'Caught at entity level, immediately' },
      { metric: 'Intercompany reconciliation', before: 'Manual matching across entity ledgers', after: 'Automatic matching, exceptions flagged' },
      { metric: 'Close cycle length', before: 'Days, dependent on manual consolidation', after: 'Hours of processing, review time only' },
      { metric: 'Post-close data integrity', before: 'Vulnerable to edits after reporting', after: 'Period locked after distribution' },
    ],
    prerequisites: [
      'n8n v1.40+ with Split In Batches and webhook-resume Wait support',
      'Accounting API access per entity (Xero, QuickBooks, or NetSuite)',
      'An exchange rate API for multi-currency groups',
      'Anthropic API key, Google Slides OAuth2',
      'Airtable PAT, Slack Bot Token, Resend API key',
    ],
    pitfalls: [
      { title: 'Exchange rate timing must match your accounting policy', body: 'Using spot rate versus period-average rate produces different, both defensible, results. Confirm which your accounting policy requires before wiring the conversion logic.' },
      { title: 'Intercompany chart-of-accounts mapping needs to be exact', body: 'Elimination logic depends on correctly identifying which accounts represent intercompany balances across entities using potentially different charts of accounts.' },
      { title: 'Never let period locking happen before distribution is confirmed', body: 'Locking too early can block a legitimate last-minute correction; locking only after Distribute Close Package confirms the reported numbers are final.' },
    ],
    faqs: [
      { q: 'Can this handle entities on different accounting platforms?', a: 'Yes, each entity\'s Pull Entity Trial Balance node points at that entity\'s specific accounting API, the workflow does not require a single unified system.' },
      { q: 'How are elimination mismatches typically resolved?', a: 'Most are timing differences between when two entities recorded the same intercompany transaction. Flag For Manual Reconciliation routes these to the controller managing both entities to confirm and adjust.' },
      { q: 'Does this replace a dedicated consolidation platform like OneStream?', a: 'For groups with a handful to a dozen entities, this covers the core need at a fraction of the cost. Large, complex groups with elaborate ownership structures and minority interests benefit from dedicated consolidation software\'s deeper functionality.' },
    ],
  },
  {
    slug: 'incident-response-postmortem',
    name: 'Incident Response & Postmortem Automation',
    file: '/n8n-templates/incident-response-postmortem.json',
    nodeCount: 26,
    complexity: 'Expert',
    category: 'Operations & Engineering',
    tools: ['PagerDuty', 'Statuspage', 'Claude AI', 'Linear', 'Slack', 'Airtable'],
    tagline: 'A 26-node pipeline from alert to published postmortem: severity-based response, automatic timeline logging through resolution, AI-drafted postmortems, and action items that become tracked tickets, not forgotten bullet points.',
    intro: 'Incident response tooling usually stops at "page someone and post in Slack." The harder, more valuable half, a timeline anyone can reconstruct, an MTTR number anyone can trust, and action items that actually get done, is what most teams still do manually or skip entirely. This workflow handles severity-based response automatically, builds the incident timeline as it happens rather than reconstructing it afterward, and turns postmortem action items directly into tracked tickets with owners.',
    sections: [
      {
        heading: 'Severity-based response, not one-size-fits-all',
        paras: [
          'Severity Classification routes SEV1 incidents through the full response, dedicated Slack channel, PagerDuty page, immediate status page update, because customer-facing outages need visible, fast action. SEV2 gets team notification without the same public-facing machinery, and SEV3 simply logs a ticket for later triage. Running every alert through the same heavyweight process either wastes response effort on minor issues or, more commonly, causes teams to route everything through informal channels because the formal process is too heavy for routine problems.',
        ],
      },
      {
        heading: 'The timeline gets built during the incident, not reconstructed after',
        paras: [
          'Start Incident Timeline Log begins capturing updates the moment an incident opens, so by the time Wait 24 Hours completes and AI Draft Postmortem runs, there is an actual chronological record of what was tried, what was ruled out, and when the fix landed, not a reconstruction based on people\'s memory of a stressful few hours.',
          'This is the single biggest quality difference between a useful postmortem and a generic one: specific timestamps and specific actions taken, versus a vague narrative written from memory days later.',
        ],
      },
      {
        heading: 'Action items that survive past the meeting',
        paras: [
          'AI Extract Action Items pulls concrete, ownable tasks from the finalized postmortem document, and Create Tickets For Action Items turns each into an actual tracked ticket in Linear or Jira immediately. The most common postmortem failure mode is not a bad analysis, it is a good analysis whose action items live only in a document that nobody revisits, so the same failure mode recurs six months later.',
          'The Quarterly MTTR Trend Schedule branch closes the loop at the organizational level: a trend line of mean-time-to-resolution over time tells leadership whether the reliability investment is actually working, something a pile of individual postmortem documents cannot show on its own.',
        ],
      },
    ],
    diagram: `flowchart TD
  A[Monitoring Alert] --> B{Severity}
  B -->|SEV1| C[Create Channel] --> D[Page On-Call] --> E[Status Page: Investigating]
  B -->|SEV2| F[Notify Team Channel]
  B -->|SEV3| G[Log Only, Ticket]
  E --> H[Merge]
  F --> H
  G --> H
  H --> I[Start Timeline Log]

  J[Resolution Webhook] --> K[Status Page: Resolved]
  K --> L[Calculate MTTR]
  L --> M[Wait 24 Hours]
  M --> N[Get Full Timeline]
  N --> O[AI Draft Postmortem]
  O --> P[Schedule Review Meeting]

  Q[Postmortem Finalized] --> R[AI Extract Action Items]
  R --> S[Create Tickets]
  S --> T[Log To Registry]
  T --> U[Archive Channel]

  V[Quarterly Schedule] --> W[Compile MTTR Trend]
  W --> X[Send To Leadership]`,
    nodeTable: [
      { n: 'Severity Classification', type: 'Switch', role: 'Matches response intensity to actual incident severity' },
      { n: 'Start Incident Timeline Log', type: 'HTTP Request', role: 'Captures the record as the incident unfolds, not afterward' },
      { n: 'Calculate MTTR', type: 'Code', role: 'Objective time-to-resolution, not an estimate' },
      { n: 'Wait 24 Hours', type: 'Wait', role: 'Deliberate delay before drafting, for perspective and to catch delayed effects' },
      { n: 'AI Draft Postmortem', type: 'HTTP Request', role: 'Starting draft from the actual logged timeline' },
      { n: 'Create Tickets For Action Items', type: 'HTTP Request', role: 'Action items become tracked work immediately, not a forgotten list' },
    ],
    code: [
      {
        caption: 'MTTR calculation',
        lang: 'javascript',
        body: `const detectedAt = new Date($json.detectedAt);
const resolvedAt = new Date($json.resolvedAt);

const mttrMinutes = Math.round((resolvedAt - detectedAt) / 60000);

return [{
  json: {
    ...$json,
    mttrMinutes,
    mttrFormatted: \`\${Math.floor(mttrMinutes / 60)}h \${mttrMinutes % 60}m\`,
  }
}];`,
      },
    ],
    metrics: [
      { metric: 'Time to customer-facing status update', before: 'Minutes to hours, manual', after: 'Seconds after SEV1 classification' },
      { metric: 'Postmortem accuracy', before: 'Reconstructed from memory', after: 'Built from a live-logged timeline' },
      { metric: 'Action item completion rate', before: 'Low, tracked only in the document', after: 'Tracked as tickets with owners' },
      { metric: 'Organizational MTTR visibility', before: 'Per-incident only', after: 'Quarterly trend reported to leadership' },
    ],
    prerequisites: [
      'n8n v1.40+ with Wait support',
      'PagerDuty API access',
      'Statuspage.io API (optional but recommended for customer-facing incidents)',
      'Anthropic API key',
      'Linear or Jira API, Slack Bot Token with channel management scopes, Airtable PAT',
    ],
    pitfalls: [
      { title: 'AI-drafted postmortems need team review before publishing', body: 'The draft is a starting point built from logged updates, which may be incomplete. The team that lived the incident should always review and correct before it is considered final.' },
      { title: 'Timeline logging quality depends on team discipline during the incident', body: 'If updates are not posted to the incident channel during the response, there is nothing for Start Incident Timeline Log to capture. This works best paired with a lightweight team norm of narrating actions as they happen.' },
      { title: 'Status page updates need a defined approval owner', body: 'For SEV1, decide in advance who can authorize customer-facing status page language, this template automates the mechanics, not the judgement call on what to say publicly.' },
    ],
    faqs: [
      { q: 'Does this work with Datadog or Grafana instead of a generic monitoring webhook?', a: 'Yes, both support outbound webhooks on alert firing, only the trigger payload parsing needs adjusting to match their specific alert format.' },
      { q: 'Is a blameless postmortem culture required for this to work?', a: 'It is strongly recommended. AI Draft Postmortem produces a factual timeline, but how a team uses that timeline, learning versus blame, is a cultural choice this workflow cannot enforce.' },
      { q: 'Can lower-severity incidents skip the full postmortem process?', a: 'Yes, route SEV3 incidents to skip the 24-hour wait and postmortem generation entirely, reserving the full process for incidents where the learning investment is worth it.' },
    ],
  },
];
