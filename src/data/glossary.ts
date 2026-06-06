export interface GlossaryTerm {
  slug: string;
  letter: string;
  term: string;
  cat: string;
  complexity: 1 | 2 | 3;
  def: string;
  stat?: { value: string; label: string; source: string };
  insight?: string;
  related: string[];
}

export function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/([^)]*)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export const terms: GlossaryTerm[] = [
  // ── A ─────────────────────────────────────────────────────────────────
  { letter:'A', term:'API (Application Programming Interface)', slug:'api', cat:'core', complexity:1,
    def:'A set of rules that allow two software applications to communicate. Most automation workflows use APIs to connect tools like HubSpot, Stripe, or Google Sheets without manual exports.',
    stat:{ value:'500+', label:'apps PURIST connects via API', source:'PURIST 2025' },
    insight:'If a tool has an API, it can be automated. If it doesn\'t, you\'re stuck with manual exports.',
    related:['Webhook','Integration','REST API'] },

  { letter:'A', term:'API Key', slug:'api-key', cat:'security', complexity:1,
    def:'A secret token that authenticates your automation with a third-party service. Treat API keys like passwords — never hard-code them in workflows, always store them in environment variables or a secrets manager.',
    insight:'A leaked API key can allow anyone to trigger your automations, send emails from your domain, or access your CRM data.',
    related:['OAuth','Authentication','Environment variable'] },

  { letter:'A', term:'API Rate Limit', slug:'api-rate-limit', cat:'core', complexity:2,
    def:'A cap on how many API requests you can make per second, minute, or day. Hitting rate limits causes automation failures. Well-built automations include throttling and backoff logic to stay within limits gracefully.',
    stat:{ value:'#1', label:'cause of automation failures in first 30 days', source:'PURIST client data' },
    insight:'Zapier and Make don\'t automatically handle rate limits — you hit them, your workflow stops silently.',
    related:['Retry logic','Throttling','Backoff'] },

  { letter:'A', term:'Action (automation step)', slug:'action', cat:'core', complexity:1,
    def:'A single operation performed by an automation after a trigger fires. Examples: create a CRM contact, send an email, update a spreadsheet row, post a Slack message. Complex workflows chain dozens of actions in sequence or parallel.',
    related:['Trigger','Workflow','Parallel execution'] },

  { letter:'A', term:'AI Agent', slug:'ai-agent', cat:'ai', complexity:3,
    def:'An autonomous AI system that can plan, reason, use tools, and complete multi-step tasks without human input at each step. Unlike basic LLM calls, agents can browse the web, query databases, send emails, and loop until a goal is met.',
    stat:{ value:'73%', label:'of knowledge work tasks partially automatable by AI agents', source:'McKinsey 2024' },
    insight:'The difference between an LLM call and an AI agent: one answers a question, the other completes a task end-to-end.',
    related:['Claude AI','LLM','Orchestration'] },

  { letter:'A', term:'Airtable', slug:'airtable', cat:'platform', complexity:1,
    def:'A cloud-based database/spreadsheet hybrid commonly used as a lightweight CRM or data store in automation workflows. Works well as a central data layer that multiple automations read from and write to.',
    related:['Database','Google Sheets','Integration'] },

  { letter:'A', term:'Async / Asynchronous processing', slug:'async-asynchronous-processing', cat:'architecture', complexity:2,
    def:'When an automation queues a task and continues without waiting for it to complete. Contrast with synchronous, where each step must finish before the next begins. Async is faster but requires careful error tracking.',
    insight:'A synchronous workflow that times out loses data. An async workflow queues it for safe processing.',
    related:['Queue','Webhook','Event-driven automation'] },

  { letter:'A', term:'Authentication', slug:'authentication', cat:'security', complexity:2,
    def:'Verifying the identity of the system or user making an API call. Methods include API keys, OAuth tokens, Basic Auth, and JWT. Poor authentication handling is the #1 cause of integration security vulnerabilities.',
    related:['OAuth','API Key','JWT'] },

  { letter:'A', term:'Automation audit', slug:'automation-audit', cat:'ops', complexity:1,
    def:'A structured review of your business operations to identify manual tasks that can be automated. PURIST conducts a free 30-minute audit covering your full workflow, bottleneck map, and ROI priority matrix.',
    stat:{ value:'47', label:'processes audited per client on average', source:'PURIST 2025' },
    insight:'Most business owners underestimate their manual work by 40%. An audit reveals the real number.',
    related:['ROI','Done-for-you automation','Process mapping'] },

  { letter:'A', term:'Automation workflow', slug:'automation-workflow', cat:'core', complexity:1,
    def:'A sequence of automated actions triggered by a specific event. Example: a new Typeform submission triggers a CRM entry, a welcome email, and a Slack notification — all without human intervention.',
    stat:{ value:'14h', label:'average hours saved per week per PURIST client', source:'PURIST 2025' },
    related:['Trigger','n8n','Make'] },

  // ── B ─────────────────────────────────────────────────────────────────
  { letter:'B', term:'Backoff (exponential)', slug:'backoff', cat:'architecture', complexity:2,
    def:'A retry strategy where each successive retry waits progressively longer — e.g., 10s, 30s, 2min, 10min. Prevents overloading a struggling API while still recovering from transient failures automatically.',
    insight:'Linear retries (every 30s) hammer a down API. Exponential backoff is polite and more likely to succeed.',
    related:['Retry logic','Rate limit','Error handling'] },

  { letter:'B', term:'Batch processing', slug:'batch-processing', cat:'architecture', complexity:2,
    def:'Executing automation logic on a group of records at once rather than one at a time. Used for bulk email sends, report generation, and data migrations. More efficient than looping, but requires careful error isolation per record.',
    related:['Loop','Queue','Async'] },

  { letter:'B', term:'Business process automation (BPA)', slug:'business-process-automation', cat:'ops', complexity:1,
    def:'The use of technology to perform recurring business tasks with minimal human input. BPA covers everything from invoice generation to employee onboarding — the focus is operational efficiency at scale.',
    stat:{ value:'40%', label:'of working time in SMBs spent on manual, automatable tasks', source:'McKinsey 2024' },
    related:['RPA','Workflow','Done-for-you automation'] },

  // ── C ─────────────────────────────────────────────────────────────────
  { letter:'C', term:'Calendly', slug:'calendly', cat:'platform', complexity:1,
    def:'A scheduling tool widely used in automation workflows. New bookings trigger onboarding sequences, CRM updates, reminder emails, and post-call follow-ups — all without manual intervention.',
    related:['Trigger','CRM','Webhook'] },

  { letter:'C', term:'Checkly', slug:'checkly', cat:'platform', complexity:2,
    def:'A monitoring platform that runs synthetic checks against your live automations every 60 seconds. PURIST uses Checkly for uptime monitoring — it alerts us before a client notices a workflow failure.',
    stat:{ value:'60s', label:'check interval PURIST uses on all deployed workflows', source:'PURIST infra' },
    related:['Monitoring','SLA','Uptime'] },

  { letter:'C', term:'Claude AI', slug:'claude-ai', cat:'ai', complexity:1,
    def:'Anthropic\'s large language model. In automation context, Claude can classify support tickets, draft personalised emails, summarise documents, extract structured data from text, and make intelligent decisions within workflows.',
    stat:{ value:'329', label:'Claude AI skills integrated into PURIST workflows', source:'PURIST 2025' },
    insight:'Claude inside an automation is not a chatbot — it\'s a decision-making engine that acts on structured data.',
    related:['AI Agent','NLP','LLM'] },

  { letter:'C', term:'Condition / branching', slug:'condition-branching', cat:'core', complexity:1,
    def:'Logic within a workflow that routes execution down different paths based on data values. "If the deal value is > £10,000, notify the senior account manager. Else, assign to junior." Essential for sophisticated automations.',
    related:['Filter node','Router node','Workflow'] },

  { letter:'C', term:'CRM (Customer Relationship Management)', slug:'crm', cat:'platform', complexity:1,
    def:'A system for managing contacts, deals, and communication history. CRM integrations are among the most common automation use cases — syncing leads, updating deal stages, triggering follow-ups, and generating reports.',
    stat:{ value:'65%', label:'of CRM data is entered manually and contains errors', source:'Salesforce 2023' },
    insight:'Automation eliminates manual CRM entry — data is cleaner, faster, and your team stops hating the system.',
    related:['HubSpot','Pipedrive','Salesforce'] },

  { letter:'C', term:'CRON / scheduled trigger', slug:'cron-scheduled-trigger', cat:'core', complexity:2,
    def:'A time-based trigger that fires an automation at fixed intervals — every morning at 7 AM, every Monday, the 1st of each month. CRON syntax defines the schedule. Used for reports, digests, and maintenance tasks.',
    related:['Trigger','Batch processing','Scheduled trigger'] },

  { letter:'C', term:'Custom code node', slug:'custom-code-node', cat:'core', complexity:3,
    def:'A step in n8n or Make that lets you write JavaScript or Python directly inside a workflow. Enables complex logic, data transformations, and API calls that visual nodes cannot handle. PURIST uses custom code nodes extensively.',
    insight:'The moment a workflow need outgrows visual nodes, custom code is the right tool — not a different platform.',
    related:['n8n','Make','Function node'] },

  // ── D ─────────────────────────────────────────────────────────────────
  { letter:'D', term:'Data mapping', slug:'data-mapping', cat:'data', complexity:1,
    def:'Connecting fields from one system to fields in another. Example: mapping "First Name" from Typeform to "firstname" in HubSpot. Poor data mapping causes silent errors where records are created but fields are blank.',
    stat:{ value:'78%', label:'of integration failures traced to incorrect data mapping', source:'Gartner 2023' },
    related:['Integration','Data transformation','Schema'] },

  { letter:'D', term:'Data transformation', slug:'data-transformation', cat:'data', complexity:2,
    def:'Modifying data as it flows through an automation — reformatting dates, concatenating strings, converting currencies, parsing JSON. Every production workflow transforms data at least once.',
    related:['Data mapping','Function node','Custom code node'] },

  { letter:'D', term:'Dead-letter queue (DLQ)', slug:'dead-letter-queue', cat:'architecture', complexity:3,
    def:'A safety net for failed workflow executions. When an automation fails after all retries, the payload is moved to a DLQ for manual review — preventing data loss and allowing reprocessing once the issue is resolved.',
    insight:'Without a DLQ, a failed automation silently loses data. With one, nothing is ever truly lost.',
    related:['Error handling','Retry logic','Queue'] },

  { letter:'D', term:'Deduplication', slug:'deduplication', cat:'data', complexity:2,
    def:'Preventing the same record from being created or processed twice. Critical when multiple triggers can fire for the same event — e.g., two form submissions from the same email should not create two CRM contacts.',
    related:['Idempotency','Data quality','Integration'] },

  { letter:'D', term:'Done-for-you automation', slug:'done-for-you-automation', cat:'ops', complexity:1,
    def:'A fully managed service where a specialist team designs, builds, deploys, and monitors your automations. Contrast with DIY automation tools like Zapier, where you build and maintain everything yourself.',
    stat:{ value:'312+', label:'done-for-you automations deployed by PURIST', source:'PURIST 2025' },
    insight:'DIY saves money upfront. Done-for-you saves 10× more time — because the automations actually work.',
    related:['PURIST','Retainer','Managed service'] },

  { letter:'D', term:'Dunning', slug:'dunning', cat:'finance', complexity:2,
    def:'Automated retry logic for failed payments. When a card declines, dunning sequences automatically retry at intervals, send customer notifications, and escalate to account cancellation after a defined period. Recovers significant lost revenue.',
    stat:{ value:'15–20%', label:'of involuntary churn recovered by automated dunning', source:'ProfitWell 2024' },
    insight:'Most SaaS companies lose 5–8% of MRR to failed payments. Dunning automation recovers most of it automatically.',
    related:['Stripe','Payment automation','Retry logic'] },

  // ── E ─────────────────────────────────────────────────────────────────
  { letter:'E', term:'Email automation', slug:'email-automation', cat:'ops', complexity:1,
    def:'Sending personalised emails triggered by user actions or time delays rather than manual effort. Includes welcome sequences, follow-ups, invoicing, reminders, and re-engagement campaigns — all sent automatically.',
    related:['Drip sequence','SMTP','Transactional email'] },

  { letter:'E', term:'Environment variable', slug:'environment-variable', cat:'security', complexity:2,
    def:'A configuration value stored outside your workflow code — API keys, passwords, URLs. Using environment variables instead of hardcoding credentials is essential for security and makes workflows portable across staging and production.',
    related:['API Key','Secrets manager','Security'] },

  { letter:'E', term:'Error handling', slug:'error-handling', cat:'architecture', complexity:2,
    def:'The logic built into an automation to gracefully manage failures. Includes try/catch blocks, retry logic, alerting, and fallback paths. Production-grade automations always include error handling — hobby automations often don\'t.',
    stat:{ value:'94%', label:'of automation failures silently dropped without error handling', source:'PURIST analysis' },
    insight:'A Zapier workflow that fails shows "Error" and stops. A PURIST workflow retries, alerts, and recovers.',
    related:['Retry logic','Dead-letter queue','Monitoring'] },

  { letter:'E', term:'Event-driven automation', slug:'event-driven-automation', cat:'core', complexity:1,
    def:'An automation triggered by a real-time event rather than a schedule. A new email arriving, a form submission, or a payment succeeding all "fire" event-driven workflows instantly, versus a scheduled job that runs every hour.',
    related:['Webhook','Trigger','Async'] },

  { letter:'E', term:'Execution log', slug:'execution-log', cat:'ops', complexity:2,
    def:'A record of every run of an automation — inputs received, steps executed, outputs produced, errors thrown, and duration. PURIST monitors execution logs in real-time to catch failures before clients notice them.',
    related:['Monitoring','Debugging','Audit trail'] },

  // ── F ─────────────────────────────────────────────────────────────────
  { letter:'F', term:'Filter node', slug:'filter-node', cat:'core', complexity:1,
    def:'A workflow step that stops execution if a condition is not met. Example: "Only continue if the deal value is greater than £5,000." Prevents unnecessary API calls and unwanted actions on irrelevant records.',
    related:['Condition','Router node','Workflow'] },

  { letter:'F', term:'Function node', slug:'function-node', cat:'core', complexity:3,
    def:'In n8n, a node that lets you write custom JavaScript to transform data, perform calculations, or call APIs. Equivalent to Make\'s "Tools > Execute JavaScript" module. Unlocks logic that visual nodes cannot handle.',
    related:['Custom code node','n8n','Data transformation'] },

  { letter:'F', term:'FTE (Full-Time Equivalent)', slug:'fte', cat:'ops', complexity:1,
    def:'A unit of measurement for workload. 1.0 FTE = one full-time employee\'s working capacity (~160h/month). Automation ROI is often expressed as FTEs freed — e.g., "2.1 FTEs freed" means automation handles the equivalent of two full-time roles\' manual work.',
    stat:{ value:'2.1', label:'FTEs freed on average per PURIST client', source:'PURIST 2025' },
    insight:'Freeing 2 FTEs doesn\'t mean firing 2 people — it means those people do higher-value work instead.',
    related:['ROI','Hours saved','Payback period'] },

  // ── G ─────────────────────────────────────────────────────────────────
  { letter:'G', term:'Google Sheets automation', slug:'google-sheets-automation', cat:'platform', complexity:1,
    def:'Using Google Sheets as a data source or destination in workflows. Common patterns: new row triggers a CRM update, a workflow appends a row on deal close, or a scheduled job pulls data and builds a report sheet.',
    related:['Airtable','Data mapping','Integration'] },

  { letter:'G', term:'GPT / LLM call', slug:'gpt-llm-call', cat:'ai', complexity:2,
    def:'Making an API request to a large language model (Claude, GPT-4, Gemini) from within a workflow. Used for content generation, classification, extraction, and summarisation tasks that require human-level language understanding.',
    related:['Claude AI','AI Agent','Prompt engineering'] },

  // ── H ─────────────────────────────────────────────────────────────────
  { letter:'H', term:'Health check', slug:'health-check', cat:'architecture', complexity:2,
    def:'An automated test that verifies a workflow or integration is functioning correctly. PURIST runs health checks every 60 seconds via Checkly — if a check fails, our team is alerted before the client\'s operation is impacted.',
    stat:{ value:'99.97%', label:'uptime achieved via continuous health checks', source:'PURIST infra' },
    related:['Monitoring','Uptime','SLA'] },

  { letter:'H', term:'HubSpot', slug:'hubspot', cat:'platform', complexity:1,
    def:'One of the most widely automated CRM platforms. HubSpot\'s native workflows are limited — PURIST extends them with n8n to sync data across 20+ tools, trigger complex sequences, and build reporting that HubSpot cannot produce natively.',
    related:['CRM','Integration','Webhook'] },

  { letter:'H', term:'HTTP Request', slug:'http-request', cat:'core', complexity:2,
    def:'The mechanism by which most modern automations communicate with external services. A webhook sends an HTTP POST; an API call sends an HTTP GET or POST. Understanding this helps diagnose integration failures.',
    related:['API','Webhook','REST API'] },

  // ── I ─────────────────────────────────────────────────────────────────
  { letter:'I', term:'Idempotency', slug:'idempotency', cat:'architecture', complexity:3,
    def:'A property of a workflow where running it multiple times with the same input produces the same result without side effects. Critical for payment automations — you never want to charge a client twice because a webhook fired twice.',
    insight:'If your payment automation is not idempotent, a network hiccup could double-charge a client. PURIST builds idempotency into every financial workflow.',
    related:['Error handling','Deduplication','Webhook'] },

  { letter:'I', term:'Integration', slug:'integration', cat:'core', complexity:1,
    def:'A connection between two tools that allows data to flow between them. Can be native (built into both tools), via middleware (n8n, Make, Zapier), or custom-built via API. PURIST connects 500+ apps.',
    related:['API','n8n','Middleware'] },

  { letter:'I', term:'iPaaS (Integration Platform as a Service)', slug:'ipaas', cat:'platform', complexity:2,
    def:'A cloud-based platform that connects disparate applications and allows data to flow between them. n8n, Make, and Zapier are all iPaaS tools. Enterprise iPaaS examples include MuleSoft and Boomi.',
    stat:{ value:'£4.3B', label:'global iPaaS market size in 2024', source:'MarketsandMarkets' },
    related:['n8n','Make','Middleware'] },

  // ── J ─────────────────────────────────────────────────────────────────
  { letter:'J', term:'JSON (JavaScript Object Notation)', slug:'json', cat:'data', complexity:1,
    def:'The universal data format for APIs and webhooks. When Stripe sends a payment event, the data arrives as JSON. Every automation engineer must understand how to read and parse JSON to build reliable workflows.',
    related:['API','Webhook','Payload'] },

  { letter:'J', term:'JWT (JSON Web Token)', slug:'jwt', cat:'security', complexity:3,
    def:'A compact, self-contained authentication token used by many APIs. JWTs expire and must be refreshed — a common source of automation failures when token refresh logic is not built into the workflow.',
    insight:'A JWT that expires mid-workflow will silently fail all downstream steps. Always build token refresh logic.',
    related:['Authentication','OAuth','API Key'] },

  // ── K ─────────────────────────────────────────────────────────────────
  { letter:'K', term:'KPI automation', slug:'kpi-automation', cat:'ops', complexity:1,
    def:'Automating the collection, aggregation, and distribution of key performance indicators. Instead of manually compiling a Monday morning report, a scheduled automation pulls data from 8 sources, calculates KPIs, and emails a formatted PDF to leadership.',
    stat:{ value:'4h', label:'saved per week by automating a typical weekly KPI report', source:'PURIST client data' },
    related:['Reporting','Dashboard','Scheduled trigger'] },

  // ── L ─────────────────────────────────────────────────────────────────
  { letter:'L', term:'Latency', slug:'latency', cat:'architecture', complexity:2,
    def:'The time between a trigger firing and an automation completing. Production workflows should complete within seconds for real-time triggers. High latency (>30s) often indicates an upstream API issue or inefficient workflow design.',
    stat:{ value:'42ms', label:'average webhook latency on PURIST infrastructure', source:'PURIST infra' },
    related:['Performance','Monitoring','SLA'] },

  { letter:'L', term:'LLM (Large Language Model)', slug:'llm', cat:'ai', complexity:2,
    def:'An AI model trained on vast amounts of text, capable of understanding and generating human language. Claude, GPT-4, and Gemini are LLMs. In automation, LLMs handle tasks that require human-level language understanding.',
    stat:{ value:'1T+', label:'parameters in frontier LLMs like Claude 3.5', source:'Anthropic 2024' },
    related:['Claude AI','AI Agent','Prompt engineering'] },

  { letter:'L', term:'Loop / iterator', slug:'loop-iterator', cat:'core', complexity:2,
    def:'A workflow pattern that processes a list of items one by one. Example: for each overdue invoice in a list, send a personalised reminder email. Loops enable workflows to handle variable-length datasets.',
    related:['Batch processing','Array','Workflow'] },

  { letter:'L', term:'Low-code automation', slug:'low-code-automation', cat:'core', complexity:1,
    def:'Building automations using visual drag-and-drop interfaces with minimal traditional programming. n8n and Make are low-code platforms. PURIST uses them for most workflows, adding custom code nodes only where visual nodes fall short.',
    related:['n8n','Make','No-code'] },

  // ── M ─────────────────────────────────────────────────────────────────
  { letter:'M', term:'Make (formerly Integromat)', slug:'make', cat:'platform', complexity:1,
    def:'A visual automation platform — an alternative to Zapier with more advanced logic, multi-step scenarios, and better data manipulation. PURIST is certified on Make for complex multi-system workflows.',
    related:['n8n','Zapier','iPaaS'] },

  { letter:'M', term:'Middleware', slug:'middleware', cat:'core', complexity:2,
    def:'Software that sits between two applications and translates data between them. n8n, Make, and Zapier all function as middleware — they receive data from one system, process it, and pass it to another.',
    related:['iPaaS','Integration','API'] },

  { letter:'M', term:'Monitoring', slug:'monitoring', cat:'architecture', complexity:2,
    def:'Continuous observation of automation performance, error rates, and uptime. PURIST monitors every deployed workflow in real-time — alerting before a failure impacts your clients or operations.',
    stat:{ value:'<5min', label:'average time to detect and alert on a workflow failure', source:'PURIST SLA' },
    related:['Checkly','Health check','SLA'] },

  { letter:'M', term:'Multi-step workflow', slug:'multi-step-workflow', cat:'core', complexity:2,
    def:'An automation with more than two steps. Most production workflows are multi-step — trigger → filter → transform → API call → conditional branch → notification. Complexity increases reliability risk, which is why error handling matters.',
    related:['Workflow','Condition','Action'] },

  // ── N ─────────────────────────────────────────────────────────────────
  { letter:'N', term:'n8n', slug:'n8n', cat:'platform', complexity:1,
    def:'An open-source, self-hostable automation platform. More powerful than Zapier and Make for complex logic. PURIST primarily deploys on n8n for full control, custom code execution, and data sovereignty — your data stays on your infrastructure.',
    stat:{ value:'400+', label:'native integrations available in n8n', source:'n8n.io 2025' },
    insight:'n8n is free and self-hosted. You pay for the expertise to use it well — that\'s where PURIST comes in.',
    related:['Make','Zapier','Self-hosted'] },

  { letter:'N', term:'NLP (Natural Language Processing)', slug:'nlp', cat:'ai', complexity:2,
    def:'AI techniques that allow computers to understand and generate human language. In automation, NLP powers ticket classification, sentiment detection, content summarisation, and intelligent routing — typically via Claude AI.',
    related:['Claude AI','AI Agent','LLM'] },

  { letter:'N', term:'No-code automation', slug:'no-code-automation', cat:'core', complexity:1,
    def:'Building automations without writing any code, using purely visual interfaces. Zapier is the most popular no-code platform. Great for simple two-step automations; insufficient for complex multi-system workflows that require custom logic.',
    related:['Low-code','Zapier','Make'] },

  { letter:'N', term:'Notification automation', slug:'notification-automation', cat:'ops', complexity:1,
    def:'Automatically alerting the right person at the right time via Slack, email, SMS, or push notification. Examples: alert sales rep when a high-value lead submits a form, or ping ops lead when a workflow fails.',
    related:['Slack automation','Email automation','Trigger'] },

  // ── O ─────────────────────────────────────────────────────────────────
  { letter:'O', term:'OAuth (Open Authorisation)', slug:'oauth', cat:'security', complexity:2,
    def:'An authentication standard that lets users grant third-party apps access to their accounts without sharing passwords. Most modern SaaS tools use OAuth for API access. OAuth tokens expire and require refresh logic in long-running automations.',
    insight:'OAuth tokens that expire mid-workflow silently break it. Always build token refresh logic into long-running automations.',
    related:['Authentication','JWT','API Key'] },

  { letter:'O', term:'Orchestration', slug:'orchestration', cat:'ai', complexity:3,
    def:'Coordinating multiple automations, APIs, and AI agents to complete a complex multi-step task. An orchestration layer decides which service to call, in what order, and how to handle failures at each step.',
    insight:'Most "AI agents" are really orchestration layers — they route tasks to specialised tools and aggregate results.',
    related:['AI Agent','Workflow','Multi-step workflow'] },

  // ── P ─────────────────────────────────────────────────────────────────
  { letter:'P', term:'Parallel execution', slug:'parallel-execution', cat:'architecture', complexity:2,
    def:'Running multiple automation branches simultaneously rather than sequentially. Example: when a new client signs up, simultaneously create a CRM contact, send a welcome email, create a Slack channel, and generate an invoice — all at the same time.',
    insight:'Parallel execution can reduce a 60-second sequential workflow to 8 seconds.',
    related:['Async','Performance','Workflow'] },

  { letter:'P', term:'Payload', slug:'payload', cat:'core', complexity:1,
    def:'The data carried by a webhook or API call. When a client fills your contact form, the webhook payload contains their name, email, message, and metadata. Your automation parses this payload to trigger the right actions.',
    related:['Webhook','JSON','API'] },

  { letter:'P', term:'Pipedrive', slug:'pipedrive', cat:'platform', complexity:1,
    def:'A sales-focused CRM with strong API and webhook support. Common PURIST automation: deal stage change → trigger proposal generation → send via PandaDoc → auto-follow-up sequence → log activity back in Pipedrive.',
    related:['CRM','HubSpot','Salesforce'] },

  { letter:'P', term:'Polling', slug:'polling', cat:'core', complexity:2,
    def:'Checking an external service for changes at regular intervals (e.g., "check for new emails every 5 minutes"). Less efficient and slower than webhooks, but necessary when a service does not support webhooks. Increases API usage and latency.',
    related:['Webhook','Trigger','Scheduled trigger'] },

  { letter:'P', term:'Process mapping', slug:'process-mapping', cat:'ops', complexity:1,
    def:'Documenting every step, decision, and handoff in a business process. The foundation of any automation project — you cannot automate a process you haven\'t mapped. PURIST produces a process map for every client during the audit phase.',
    related:['Automation audit','Workflow','Bottleneck'] },

  { letter:'P', term:'Production environment', slug:'production-environment', cat:'architecture', complexity:2,
    def:'The live system your real clients and operations depend on. Contrast with staging (test) environment. PURIST always tests in staging before deploying to production, preventing untested automations from affecting live data.',
    related:['Staging environment','Deployment','Testing'] },

  { letter:'P', term:'Prompt engineering', slug:'prompt-engineering', cat:'ai', complexity:2,
    def:'Crafting instructions for an LLM to produce accurate, consistent outputs. In automation, well-engineered prompts turn Claude AI into a reliable component — poorly written prompts produce unpredictable results that break downstream steps.',
    stat:{ value:'40%', label:'improvement in LLM output quality from structured prompts vs unstructured', source:'Anthropic 2024' },
    insight:'Prompt engineering is not a soft skill — it\'s the difference between an AI that works in production and one that doesn\'t.',
    related:['Claude AI','LLM','AI Agent'] },

  // ── Q ─────────────────────────────────────────────────────────────────
  { letter:'Q', term:'Queue', slug:'queue', cat:'architecture', complexity:2,
    def:'A buffer that stores automation tasks waiting to be processed. Queues absorb traffic spikes, ensure no tasks are lost if a downstream service is down, and enable ordered, reliable processing at scale.',
    insight:'Without a queue, a traffic spike at 9 AM can cause your automation to fail 30% of requests. With one, every request is processed.',
    related:['Dead-letter queue','Async','Batch processing'] },

  // ── R ─────────────────────────────────────────────────────────────────
  { letter:'R', term:'RAG (Retrieval-Augmented Generation)', slug:'rag', cat:'ai', complexity:3,
    def:'An AI pattern where an LLM retrieves relevant data from a knowledge base before generating a response. In automation: when a support ticket arrives, Claude searches your internal docs, then drafts a specific, accurate reply — not a generic one.',
    insight:'RAG is why AI-powered support can answer "What\'s our refund policy for orders over £500?" accurately, not just generically.',
    related:['Claude AI','AI Agent','Prompt engineering'] },

  { letter:'R', term:'REST API', slug:'rest-api', cat:'core', complexity:2,
    def:'The most common API architecture. Uses standard HTTP methods (GET, POST, PUT, DELETE) and returns JSON. Almost every modern SaaS tool exposes a REST API, making it the primary integration mechanism for automation workflows.',
    related:['API','HTTP Request','JSON'] },

  { letter:'R', term:'Retainer (automation)', slug:'retainer', cat:'ops', complexity:1,
    def:'A monthly subscription covering your automation deployment, monitoring, maintenance, and updates. PURIST retainers replace the need for an in-house automation engineer — you get expert-level operations at a fraction of the cost.',
    stat:{ value:'£68K', label:'average fully-loaded annual cost of a senior in-house automation engineer', source:'Glassdoor UK 2025' },
    insight:'A PURIST retainer delivers the same expertise for a fraction of one hire — and you get a team, not a single point of failure.',
    related:['Done-for-you automation','SLA','ROI'] },

  { letter:'R', term:'Retry logic', slug:'retry-logic', cat:'architecture', complexity:2,
    def:'Automatic re-execution of a failed automation step after a delay. Best practice is exponential backoff — retry after 30s, then 2min, then 10min — to avoid hammering an API that\'s temporarily down. PURIST includes this in every build.',
    related:['Error handling','Backoff','Dead-letter queue'] },

  { letter:'R', term:'ROI (Return on Investment)', slug:'roi', cat:'ops', complexity:1,
    def:'In automation: net annual savings divided by cost. PURIST clients average 9.4× ROI. Calculated as: (hours saved × hourly cost) + error reduction savings + tool consolidation savings — minus retainer cost.',
    stat:{ value:'9.4×', label:'average gross ROI across PURIST client base', source:'PURIST 2025' },
    related:['FTE','Payback period','Automation audit'] },

  { letter:'R', term:'RPA (Robotic Process Automation)', slug:'rpa', cat:'core', complexity:2,
    def:'Software robots that mimic human actions in a UI — clicking buttons, copying data between screens. RPA (e.g., UiPath) is used when no API exists. More fragile than API-based automation; breaks when the UI changes.',
    stat:{ value:'30–40%', label:'of RPA projects fail in the first year due to UI changes', source:'Gartner 2024' },
    related:['API','Business process automation','Integration'] },

  { letter:'R', term:'Router node', slug:'router-node', cat:'core', complexity:2,
    def:'A workflow step that splits execution into multiple paths based on conditions. Unlike a filter (which stops), a router sends data down path A, B, or C simultaneously or conditionally. Enables sophisticated branching logic.',
    related:['Condition','Filter node','Parallel execution'] },

  // ── S ─────────────────────────────────────────────────────────────────
  { letter:'S', term:'Salesforce', slug:'salesforce', cat:'platform', complexity:2,
    def:'Enterprise CRM with a powerful API used in complex automation scenarios — syncing with ERP systems, triggering approval workflows, building executive dashboards, and integrating with marketing automation platforms.',
    related:['CRM','HubSpot','Pipedrive'] },

  { letter:'S', term:'Scenario (Make)', slug:'scenario', cat:'platform', complexity:1,
    def:'Make\'s term for an automation workflow. A scenario contains modules (equivalent to n8n nodes) connected in a visual flow. Scenarios can run on a schedule or be triggered by webhooks.',
    related:['Make','Workflow','Module'] },

  { letter:'S', term:'Schema', slug:'schema', cat:'data', complexity:2,
    def:'The structure and data types of an API response or database table. Understanding a tool\'s schema is essential for data mapping — you need to know what fields exist before you can use them in a workflow.',
    related:['Data mapping','JSON','API'] },

  { letter:'S', term:'Self-hosted', slug:'self-hosted', cat:'architecture', complexity:3,
    def:'Running automation software on your own server or cloud instance rather than a vendor\'s SaaS platform. PURIST deploys n8n self-hosted for clients who need data sovereignty — workflow data never leaves their infrastructure.',
    insight:'Self-hosted n8n means your business data is not processed on Zapier or Make\'s servers. Critical for regulated industries.',
    related:['n8n','Data sovereignty','Production environment'] },

  { letter:'S', term:'Sentiment analysis', slug:'sentiment-analysis', cat:'ai', complexity:2,
    def:'AI classification of text as positive, negative, or neutral. In automation: Claude analyses incoming support tickets for sentiment, routes frustrated customers to senior agents immediately, and flags negative reviews for urgent response.',
    related:['NLP','Claude AI','Classification'] },

  { letter:'S', term:'SLA (Service Level Agreement)', slug:'sla', cat:'ops', complexity:1,
    def:'A contractual commitment on service quality. PURIST\'s uptime SLA is 99.97% — meaning less than 2.6 hours of unplanned downtime per year across all deployed workflows.',
    stat:{ value:'99.97%', label:'PURIST uptime SLA across all client workflows', source:'PURIST infra' },
    related:['Uptime','Monitoring','Health check'] },

  { letter:'S', term:'Slack automation', slug:'slack-automation', cat:'platform', complexity:1,
    def:'Sending automated messages to Slack channels or users based on workflow events. Common uses: deal won notification to sales channel, error alert to ops team, daily KPI digest to leadership, and customer health score changes to CS team.',
    related:['Notification automation','Webhook','Integration'] },

  { letter:'S', term:'SMTP / Transactional email', slug:'smtp-transactional-email', cat:'ops', complexity:1,
    def:'Sending automated one-to-one emails triggered by specific events (invoice generated, password reset, appointment confirmed). Contrast with marketing email (bulk sends). Services include SendGrid, Postmark, and AWS SES.',
    related:['Email automation','Trigger','Deliverability'] },

  { letter:'S', term:'Staging environment', slug:'staging-environment', cat:'architecture', complexity:2,
    def:'A test environment that mirrors production but uses test data. PURIST builds and tests every automation in staging before deploying live. Catches 95% of issues before they can impact real clients or operations.',
    related:['Production environment','Testing','Deployment'] },

  { letter:'S', term:'Stripe', slug:'stripe', cat:'platform', complexity:1,
    def:'The most common payment platform integrated in automation workflows. Stripe webhooks trigger invoice creation, dunning sequences, subscription management, and revenue reporting automations.',
    stat:{ value:'135+', label:'countries Stripe processes payments in', source:'Stripe 2025' },
    related:['Webhook','Dunning','Payment automation'] },

  // ── T ─────────────────────────────────────────────────────────────────
  { letter:'T', term:'Throttling', slug:'throttling', cat:'architecture', complexity:2,
    def:'Deliberately slowing down automation execution to stay within API rate limits. Example: when processing 1,000 contacts, add a 1-second delay between each API call to avoid hitting the rate limit and triggering errors.',
    related:['Rate limit','Backoff','API'] },

  { letter:'T', term:'Token (API)', slug:'token', cat:'security', complexity:2,
    def:'A credential string used to authenticate API requests. Tokens are either long-lived (API keys) or short-lived (OAuth access tokens). Short-lived tokens require automated refresh logic to prevent authentication failures in long-running workflows.',
    related:['API Key','OAuth','JWT'] },

  { letter:'T', term:'Trigger', slug:'trigger', cat:'core', complexity:1,
    def:'The event that starts an automation. Common triggers: form submission, email received, payment completed, calendar event, database row created. Getting the trigger right is the foundation of any reliable workflow.',
    stat:{ value:'12', label:'distinct trigger types in a typical PURIST client deployment', source:'PURIST 2025' },
    related:['Webhook','Event-driven automation','Polling'] },

  { letter:'T', term:'Typeform', slug:'typeform', cat:'platform', complexity:1,
    def:'A form builder with strong webhook support, widely used as an automation entry point. A Typeform submission triggers workflows that create CRM contacts, send personalised responses, assign to reps, and log to spreadsheets.',
    related:['Trigger','Webhook','Form automation'] },

  // ── U ─────────────────────────────────────────────────────────────────
  { letter:'U', term:'Uptime', slug:'uptime', cat:'architecture', complexity:1,
    def:'The percentage of time a system is available and functioning. PURIST\'s 99.97% uptime means less than 2.6 hours of unplanned downtime per year across all client workflows. Measured continuously via Checkly health checks.',
    stat:{ value:'2.6h', label:'max unplanned downtime per year at 99.97% uptime', source:'Uptime calculator' },
    insight:'99% uptime sounds impressive but allows 87 hours of downtime per year. 99.97% allows only 2.6 hours.',
    related:['SLA','Monitoring','Health check'] },

  // ── V ─────────────────────────────────────────────────────────────────
  { letter:'V', term:'Version control (workflows)', slug:'version-control', cat:'architecture', complexity:2,
    def:'Saving snapshots of workflow configurations so you can roll back after a bad deployment. n8n supports workflow versioning natively. PURIST maintains version history for every client automation — essential for safe updates.',
    related:['Deployment','Staging environment','Production environment'] },

  // ── W ─────────────────────────────────────────────────────────────────
  { letter:'W', term:'Webhook', slug:'webhook', cat:'core', complexity:1,
    def:'A real-time HTTP notification sent from one app to another when an event occurs. Unlike polling (checking for changes on a schedule), webhooks are instant — a payment processes, Stripe fires a webhook, your CRM updates within milliseconds.',
    stat:{ value:'10–100×', label:'faster than polling for real-time data delivery', source:'Industry standard' },
    insight:'Webhooks are the backbone of modern automation. If a tool doesn\'t support webhooks, integration is 10× harder.',
    related:['API','Trigger','Payload'] },

  { letter:'W', term:'Webhook security', slug:'webhook-security', cat:'security', complexity:3,
    def:'Verifying that incoming webhooks are genuinely from the expected source. Best practice: validate the webhook signature (a hash of the payload signed with your secret key). Skipping this allows malicious actors to trigger your automations.',
    insight:'An unsecured webhook endpoint is an open door — anyone who finds the URL can trigger your automation with arbitrary data.',
    related:['Webhook','Authentication','Security'] },

  { letter:'W', term:'Workflow template', slug:'workflow-template', cat:'core', complexity:1,
    def:'A pre-built automation that can be imported and customised. PURIST\'s Workflow Library contains 60+ templates covering CRM, finance, operations, support, marketing, and reporting — deployed in days, not weeks.',
    related:['Workflow Library','n8n','Done-for-you automation'] },

  // ── X ─────────────────────────────────────────────────────────────────
  { letter:'X', term:'Xero', slug:'xero', cat:'finance', complexity:1,
    def:'Accounting software commonly automated for invoice generation, payment chasing, bank reconciliation, and financial reporting. PURIST integrates Xero with CRM and project management tools to eliminate duplicate data entry.',
    stat:{ value:'3.7M', label:'small businesses using Xero globally', source:'Xero 2024' },
    related:['Finance automation','Integration','Invoice automation'] },

  // ── Z ─────────────────────────────────────────────────────────────────
  { letter:'Z', term:'Zapier', slug:'zapier', cat:'platform', complexity:1,
    def:'The most popular DIY automation platform. Great for simple two-step automations; limited for complex logic, custom code, or high-volume workflows. PURIST uses Zapier for specific integrations where it\'s the best fit, but prefers n8n for reliability.',
    stat:{ value:'6,000+', label:'app integrations available on Zapier', source:'Zapier 2025' },
    insight:'Zapier is excellent for simple automations. When you hit its limits, you need n8n — or PURIST to build it properly.',
    related:['n8n','Make','No-code'] },

  { letter:'Z', term:'Zero-touch process', slug:'zero-touch-process', cat:'ops', complexity:1,
    def:'A business operation that runs entirely without manual intervention from start to finish. The gold standard of automation — a new client signs, receives onboarding, gets invoiced, and is followed up with, all with zero human touches.',
    insight:'Zero-touch does not mean zero oversight. It means zero manual effort on recurring, predictable tasks.',
    related:['Done-for-you automation','Automation workflow','ROI'] },

  // ── Additional A ──────────────────────────────────────────────────────
  { letter:'A', term:'Abstraction layer', slug:'abstraction-layer', cat:'architecture', complexity:3,
    def:'A middleware component that hides the complexity of underlying systems behind a simpler interface. In automation, abstraction layers allow workflows to switch between tools (e.g., HubSpot → Salesforce) without rewriting the entire pipeline.',
    related:['Middleware','Integration','API'] },

  { letter:'A', term:'Access token', slug:'access-token', cat:'security', complexity:2,
    def:'A short-lived credential issued after OAuth authentication that grants access to a specific scope of data for a limited time. Access tokens typically expire in 1–24 hours and must be refreshed using a refresh token.',
    insight:'Storing access tokens in environment variables and implementing auto-refresh logic prevents silent authentication failures.',
    related:['OAuth','JWT','Refresh token'] },

  { letter:'A', term:'Audit trail', slug:'audit-trail', cat:'security', complexity:2,
    def:'A chronological record of all actions taken by an automation — who triggered it, what data was processed, what was changed, and when. Essential for compliance, debugging, and dispute resolution in regulated industries.',
    stat:{ value:'72%', label:'of GDPR incidents traced to poor audit logging', source:'ICO 2024' },
    related:['Execution log','Compliance','Monitoring'] },

  { letter:'A', term:'Aggregation (data)', slug:'aggregation', cat:'data', complexity:2,
    def:'Combining data from multiple sources into a unified output. Example: pulling revenue from Stripe, deal data from HubSpot, and hours from Harvest, then aggregating into a single weekly P&L report — sent automatically every Monday.',
    related:['Data transformation','Reporting','Dashboard'] },

  { letter:'A', term:'Alert routing', slug:'alert-routing', cat:'ops', complexity:2,
    def:'Automatically sending the right notification to the right person based on context. Example: a high-value deal lost → notify CEO via Slack; a failed payment → notify finance via email; a critical workflow error → page the on-call engineer via PagerDuty.',
    related:['Notification automation','Monitoring','Escalation'] },

  { letter:'A', term:'API documentation', slug:'api-documentation', cat:'core', complexity:1,
    def:'The reference guide for an application\'s API — endpoints, authentication methods, request formats, response schemas, and rate limits. Quality API docs are the single biggest factor in how fast PURIST can build an integration.',
    related:['API','REST API','Integration'] },

  { letter:'A', term:'Array (data structure)', slug:'array', cat:'data', complexity:2,
    def:'An ordered list of items in JSON data. Most API responses return arrays — e.g., a list of contacts, a list of orders. Workflow loops iterate over arrays to process each item individually.',
    related:['JSON','Loop','Data transformation'] },

  { letter:'A', term:'Automation debt', slug:'automation-debt', cat:'ops', complexity:2,
    def:'The accumulated cost of poorly designed, undocumented, or unmaintained automations. Like technical debt in software, automation debt grows over time as quick fixes compound. PURIST conducts quarterly automation reviews to prevent it.',
    insight:'A quick Zapier fix becomes automation debt when no one remembers what it does or why.',
    related:['Process mapping','Version control','Monitoring'] },

  // ── Additional B ──────────────────────────────────────────────────────
  { letter:'B', term:'Backfill', slug:'backfill', cat:'data', complexity:2,
    def:'Retroactively processing historical data through a new automation after it is deployed. Example: after building an invoice automation, running it against 6 months of existing orders to populate historical records.',
    related:['Batch processing','Data migration','Loop'] },

  { letter:'B', term:'Base URL', slug:'base-url', cat:'core', complexity:1,
    def:'The root domain of an API endpoint — e.g., `https://api.hubspot.com/crm/v3/`. All API paths are appended to the base URL. Storing it as a variable makes switching between staging and production environments trivial.',
    related:['REST API','Environment variable','Staging environment'] },

  { letter:'B', term:'Bottleneck analysis', slug:'bottleneck-analysis', cat:'ops', complexity:1,
    def:'Identifying the single step in a process that limits overall throughput. In automation: the task that takes the longest, requires the most manual effort, or causes the most errors. Automating the bottleneck delivers the fastest ROI.',
    stat:{ value:'80%', label:'of manual work in most SMBs concentrated in 20% of processes', source:'PURIST audit data' },
    related:['Process mapping','ROI','Automation audit'] },

  { letter:'B', term:'Branch (workflow)', slug:'branch', cat:'core', complexity:2,
    def:'A fork in a workflow that sends data down different paths based on conditions. Branches allow one trigger to produce multiple outcomes — e.g., a new lead from France follows a French-language branch, UK leads follow an English one.',
    related:['Condition','Router node','Parallel execution'] },

  { letter:'B', term:'Buffer (data)', slug:'buffer', cat:'architecture', complexity:2,
    def:'A temporary storage area that holds data while it waits to be processed. Buffers prevent data loss during traffic spikes — when 500 form submissions arrive simultaneously, the buffer queues them for orderly processing.',
    related:['Queue','Async','Batch processing'] },

  // ── Additional C ──────────────────────────────────────────────────────
  { letter:'C', term:'Cache / caching', slug:'cache-caching', cat:'architecture', complexity:2,
    def:'Storing API responses temporarily so the same request doesn\'t need to be made repeatedly. Example: caching a currency exchange rate for 60 minutes instead of fetching it on every workflow run. Reduces API calls and speeds up execution.',
    related:['Performance','API Rate Limit','Throttling'] },

  { letter:'C', term:'Callback URL', slug:'callback-url', cat:'core', complexity:2,
    def:'A URL you provide to a third-party service so it can notify your automation when an async task completes. Common in payment systems — Stripe calls your callback URL when a payment succeeds, triggering your invoice workflow.',
    related:['Webhook','Async','Integration'] },

  { letter:'C', term:'Change data capture (CDC)', slug:'change-data-capture', cat:'data', complexity:3,
    def:'A technique that tracks database changes in real-time and triggers automations based on inserts, updates, or deletes. More efficient than polling — instead of checking for changes every 5 minutes, CDC fires instantly when data changes.',
    related:['Event-driven automation','Trigger','Database'] },

  { letter:'C', term:'CI/CD (Continuous Integration/Delivery)', slug:'ci-cd', cat:'architecture', complexity:3,
    def:'Automated pipelines that test and deploy code changes. For automation teams, CI/CD means every workflow update is tested in staging, passed through automated checks, and deployed to production without manual steps.',
    related:['Staging environment','Version control','Deployment'] },

  { letter:'C', term:'Classification (AI)', slug:'classification', cat:'ai', complexity:2,
    def:'Using AI to assign a category to incoming data. Examples: classifying support tickets as "billing", "technical", or "general"; classifying leads as "hot", "warm", or "cold"; classifying reviews as positive, negative, or neutral.',
    insight:'A classified ticket routes itself to the right agent automatically. Without classification, humans sort the queue manually.',
    related:['Claude AI','NLP','Sentiment analysis'] },

  { letter:'C', term:'Client credentials flow', slug:'client-credentials-flow', cat:'security', complexity:3,
    def:'An OAuth flow where a server-side application authenticates directly using its client ID and secret — without a user logging in. Used in automation workflows that run in the background without human interaction.',
    related:['OAuth','Authentication','API Key'] },

  { letter:'C', term:'Cloud function', slug:'cloud-function', cat:'architecture', complexity:2,
    def:'A serverless compute unit that runs a single piece of code in response to an event. PURIST uses cloud functions (AWS Lambda, Google Cloud Functions) for custom logic that runs alongside n8n — lightweight, scalable, and cost-effective.',
    related:['Serverless','Custom code node','Event-driven automation'] },

  { letter:'C', term:'Connector', slug:'connector', cat:'core', complexity:1,
    def:'A pre-built integration module that connects a specific app to an automation platform. n8n has 400+ connectors; Make has 1,000+. When a connector exists, integration takes hours. When it doesn\'t, PURIST builds a custom one via API.',
    related:['Integration','n8n','Make'] },

  { letter:'C', term:'Context window (AI)', slug:'context-window', cat:'ai', complexity:2,
    def:'The maximum amount of text an LLM can process in a single request. Claude\'s context window allows it to analyse entire contracts, long email threads, or multi-page reports — not just short snippets. Larger windows enable more complex automation tasks.',
    related:['Claude AI','LLM','RAG'] },

  { letter:'C', term:'Cooldown period', slug:'cooldown-period', cat:'architecture', complexity:2,
    def:'A mandatory delay between successive runs of an automation to prevent duplicate processing or API overload. Example: after a form submission triggers a workflow, a 30-second cooldown prevents duplicate submissions from firing it again.',
    related:['Rate limit','Deduplication','Throttling'] },

  { letter:'C', term:'Cursor (pagination)', slug:'cursor', cat:'core', complexity:2,
    def:'A pointer used in paginated API responses to fetch the next page of results. Critical for workflows that must retrieve all records — without cursor handling, you only get the first 100 records, missing the rest silently.',
    related:['REST API','Pagination','Loop'] },

  // ── Additional D ──────────────────────────────────────────────────────
  { letter:'D', term:'Dashboard automation', slug:'dashboard-automation', cat:'reporting', complexity:1,
    def:'Automatically populating business intelligence dashboards with fresh data from connected systems. Instead of manually updating a Monday morning dashboard, a scheduled automation pulls from CRM, finance, and ops tools and refreshes it overnight.',
    related:['Reporting','KPI automation','Scheduled trigger'] },

  { letter:'D', term:'Data enrichment', slug:'data-enrichment', cat:'data', complexity:2,
    def:'Augmenting existing records with additional data from external sources. Example: a new CRM contact has a name and email — data enrichment adds company size, industry, LinkedIn URL, and estimated revenue using Clearbit or Apollo.',
    stat:{ value:'50%', label:'increase in lead conversion rates reported with enriched data', source:'Clearbit 2024' },
    related:['Integration','CRM','API'] },

  { letter:'D', term:'Data pipeline', slug:'data-pipeline', cat:'data', complexity:2,
    def:'A sequence of data processing steps that move and transform data from source to destination. Example: extract orders from Shopify → transform into invoice format → load into Xero → send confirmation email. The ETL pattern in automation.',
    related:['ETL','Data transformation','Integration'] },

  { letter:'D', term:'Data quality', slug:'data-quality', cat:'data', complexity:2,
    def:'The accuracy, completeness, and consistency of data flowing through automations. Poor data quality causes silent failures — a CRM record missing a phone number means the SMS reminder never sends. PURIST validates data at every entry point.',
    insight:'Garbage in, garbage out. An automation is only as reliable as the data it processes.',
    related:['Validation','Deduplication','Data mapping'] },

  { letter:'D', term:'Data residency', slug:'data-residency', cat:'security', complexity:3,
    def:'Where data is physically stored and processed. Regulated industries (finance, healthcare, legal) often require data to stay within specific geographic boundaries. PURIST\'s self-hosted n8n deployments keep data within your chosen region.',
    related:['Self-hosted','Compliance','GDPR'] },

  { letter:'D', term:'Data sovereignty', slug:'data-sovereignty', cat:'security', complexity:2,
    def:'The principle that data is subject to the laws of the country where it is stored. A UK law firm\'s automation data stored on US servers is subject to US subpoenas. Self-hosted n8n eliminates third-party data custody entirely.',
    related:['Self-hosted','Data residency','Compliance'] },

  { letter:'D', term:'Dependency (workflow)', slug:'dependency', cat:'architecture', complexity:2,
    def:'A step in a workflow that cannot execute until a prior step completes successfully. Managing dependencies prevents race conditions — e.g., a CRM contact must be created before a deal is linked to it.',
    related:['Workflow','Async','Parallel execution'] },

  { letter:'D', term:'Deployment pipeline', slug:'deployment-pipeline', cat:'architecture', complexity:2,
    def:'The automated sequence of steps that moves a workflow from development → staging → production. A proper deployment pipeline includes automated tests, review gates, and rollback capabilities — preventing untested changes from breaking live operations.',
    related:['CI/CD','Staging environment','Version control'] },

  { letter:'D', term:'Document processing', slug:'document-processing', cat:'ai', complexity:2,
    def:'Using AI to extract structured data from unstructured documents — invoices, contracts, CVs, delivery notes. Claude can read a PDF invoice and extract supplier name, amount, due date, and line items without a human touching the document.',
    stat:{ value:'85%', label:'reduction in manual data entry time from AI document processing', source:'PURIST client average' },
    related:['Claude AI','RAG','OCR'] },

  { letter:'D', term:'Drip sequence', slug:'drip-sequence', cat:'ops', complexity:1,
    def:'A timed series of automated emails or messages sent to a contact over a defined period. Example: Day 0 welcome, Day 3 product tip, Day 7 case study, Day 14 check-in, Day 30 renewal prompt. Runs without any manual effort after setup.',
    related:['Email automation','SMTP','CRM'] },

  // ── Additional E ──────────────────────────────────────────────────────
  { letter:'E', term:'Edge case', slug:'edge-case', cat:'architecture', complexity:2,
    def:'An input or scenario that falls outside the normal expected range. Example: a contact form submitted with an emoji in the name field crashes a poorly built automation. PURIST stress-tests against edge cases before every deployment.',
    related:['Error handling','Testing','Staging environment'] },

  { letter:'E', term:'Embedding (AI)', slug:'embedding', cat:'ai', complexity:3,
    def:'A numerical representation of text that captures its semantic meaning. Embeddings power semantic search — finding documents that mean the same thing even when the words differ. Used in RAG systems to match queries to relevant knowledge base chunks.',
    related:['RAG','Claude AI','Vector database'] },

  { letter:'E', term:'Endpoint', slug:'endpoint', cat:'core', complexity:1,
    def:'A specific URL path in an API that represents a resource or action. Example: `GET /contacts` retrieves contacts; `POST /contacts` creates one. Each endpoint has defined parameters, authentication requirements, and response formats.',
    related:['REST API','API','HTTP Request'] },

  { letter:'E', term:'Escalation (automation)', slug:'escalation', cat:'ops', complexity:2,
    def:'Automatically elevating an issue to a higher level of attention when it is not resolved within a defined timeframe. Example: a support ticket not responded to within 4 hours is auto-escalated to the team lead with a priority Slack alert.',
    related:['Alert routing','Notification automation','SLA'] },

  { letter:'E', term:'ETL (Extract, Transform, Load)', slug:'etl', cat:'data', complexity:2,
    def:'A three-phase data pipeline pattern: extract raw data from source systems, transform it into the required format, and load it into a destination. Every automation that moves data between tools is performing some version of ETL.',
    related:['Data pipeline','Data transformation','Integration'] },

  { letter:'E', term:'Event bus', slug:'event-bus', cat:'architecture', complexity:3,
    def:'A central messaging system where events are published and multiple automations can subscribe to receive them. When a deal is won, an event is published to the bus — billing, CS, and ops automations each react to it independently.',
    related:['Event-driven automation','Queue','Async'] },

  { letter:'E', term:'Extraction (data)', slug:'extraction', cat:'data', complexity:2,
    def:'Pulling structured data from unstructured sources — PDFs, emails, screenshots, web pages. AI-powered extraction (using Claude) replaces manual data entry: feed it a PDF invoice and receive a structured JSON object.',
    related:['Document processing','Claude AI','OCR'] },

  // ── Additional F ──────────────────────────────────────────────────────
  { letter:'F', term:'Failover', slug:'failover', cat:'architecture', complexity:3,
    def:'Automatic switching to a backup system or pathway when the primary fails. Example: if the primary email provider (SendGrid) returns an error, the automation automatically retries via the secondary provider (Postmark) to ensure delivery.',
    related:['Error handling','Redundancy','Monitoring'] },

  { letter:'F', term:'Field mapping', slug:'field-mapping', cat:'data', complexity:1,
    def:'Connecting specific data fields between two systems — e.g., "Full Name" in Typeform → "contact_name" in HubSpot. Incorrect field mapping is the most common cause of silent data errors in automation workflows.',
    related:['Data mapping','Integration','Schema'] },

  { letter:'F', term:'Flat file', slug:'flat-file', cat:'data', complexity:1,
    def:'A plain CSV or text file used to exchange data between systems that don\'t share an API. Older ERP systems often export data as flat files; automations can process them and push the data to modern SaaS tools.',
    related:['CSV','ETL','Integration'] },

  { letter:'F', term:'Formatting (data)', slug:'formatting', cat:'data', complexity:1,
    def:'Standardising data into a consistent shape before it enters a downstream system. Examples: converting dates from DD/MM/YYYY to YYYY-MM-DD, normalising phone numbers to E.164 format, capitalising names. Prevents downstream validation errors.',
    related:['Data transformation','Validation','Data quality'] },

  { letter:'F', term:'Freshdesk', slug:'freshdesk', cat:'platform', complexity:1,
    def:'A customer support platform commonly integrated in automation workflows. PURIST builds automations that classify incoming tickets with AI, route them to the right agent, trigger escalations, and log resolution times to dashboards.',
    related:['Support & CS','Claude AI','Integration'] },

  // ── Additional G ──────────────────────────────────────────────────────
  { letter:'G', term:'Gateway (API)', slug:'gateway', cat:'architecture', complexity:2,
    def:'A server that acts as the entry point for all API requests, handling authentication, rate limiting, routing, and logging. In automation infrastructure, API gateways add a security and reliability layer between workflows and downstream services.',
    related:['API','Authentication','Rate limit'] },

  { letter:'G', term:'GDPR automation', slug:'gdpr-automation', cat:'security', complexity:2,
    def:'Automating data subject rights requests — access, erasure, portability, and rectification. When a subject requests deletion, an automation can search all connected systems and trigger deletion workflows across CRM, email, and billing platforms simultaneously.',
    stat:{ value:'30 days', label:'maximum legal response time for GDPR data subject requests', source:'UK GDPR 2018' },
    related:['Compliance','Data sovereignty','Audit trail'] },

  { letter:'G', term:'Git (workflow versioning)', slug:'git', cat:'architecture', complexity:2,
    def:'A version control system used to track changes to workflow configurations and code. PURIST stores all workflow definitions in Git — every change is reviewed, tested, and can be rolled back to any prior version in seconds.',
    related:['Version control','CI/CD','Deployment'] },

  { letter:'G', term:'GraphQL', slug:'graphql', cat:'core', complexity:3,
    def:'An API query language that lets clients request exactly the data they need — no more, no less. Contrast with REST APIs that return fixed data structures. Some modern platforms (Shopify, GitHub) use GraphQL; it requires different handling in automation workflows.',
    related:['REST API','API','HTTP Request'] },

  { letter:'G', term:'Guard clause', slug:'guard-clause', cat:'architecture', complexity:2,
    def:'A validation check at the start of a workflow step that stops execution if conditions are not met. Example: "If the email field is empty, stop and log an error" — rather than proceeding and failing silently three steps later.',
    related:['Validation','Error handling','Filter node'] },

  // ── Additional H ──────────────────────────────────────────────────────
  { letter:'H', term:'Hand-off (automation)', slug:'hand-off', cat:'ops', complexity:1,
    def:'The point where an automation passes control to a human. Best-practice automation does not eliminate humans — it routes work to the right person at the right time with full context, eliminating only the manual overhead around the actual decision.',
    insight:'The best automations handle the 80% that is routine and create a perfect hand-off for the 20% that requires human judgment.',
    related:['Escalation','Notification automation','Process mapping'] },

  { letter:'H', term:'Hash / HMAC', slug:'hash-hmac', cat:'security', complexity:3,
    def:'A cryptographic signature used to verify that a webhook payload has not been tampered with in transit. Stripe, Shopify, and most platforms sign their webhooks with HMAC-SHA256. PURIST validates every signature before processing.',
    related:['Webhook security','Authentication','Security'] },

  { letter:'H', term:'Headless CMS', slug:'headless-cms', cat:'platform', complexity:2,
    def:'A content management system that exposes content via API rather than rendering it. Common in automation: when a blog post is published in Contentful, a webhook triggers social media posting, newsletter queuing, and SEO update automations.',
    related:['Webhook','CMS','Integration'] },

  { letter:'H', term:'Hosted vs self-hosted', slug:'hosted-vs-self-hosted', cat:'architecture', complexity:1,
    def:'Hosted tools (Zapier, Make cloud) run on the vendor\'s servers. Self-hosted tools (n8n self-hosted) run on your own infrastructure. Self-hosted gives data control, custom code execution, and no per-task pricing — at the cost of infrastructure management.',
    related:['Self-hosted','n8n','Data sovereignty'] },

  // ── Additional I ──────────────────────────────────────────────────────
  { letter:'I', term:'Inbox zero automation', slug:'inbox-zero-automation', cat:'ops', complexity:1,
    def:'Using email automation to automatically sort, label, archive, or respond to incoming emails based on rules. Examples: auto-label supplier invoices, auto-reply to CV submissions with a screening questionnaire, auto-archive newsletters.',
    related:['Email automation','Filter node','Condition'] },

  { letter:'I', term:'Infrastructure as Code (IaC)', slug:'infrastructure-as-code', cat:'architecture', complexity:3,
    def:'Managing and provisioning infrastructure through machine-readable configuration files rather than manual processes. PURIST uses Terraform and Pulumi to define automation infrastructure — servers, queues, databases — as versioned code.',
    related:['DevOps','CI/CD','Version control'] },

  { letter:'I', term:'Input validation', slug:'input-validation', cat:'data', complexity:2,
    def:'Checking that incoming data meets required formats and constraints before processing it. Example: verifying an email address is valid format, a phone number has the correct number of digits, and a required field is not empty — before writing to a CRM.',
    related:['Data quality','Error handling','Guard clause'] },

  { letter:'I', term:'Instance (n8n)', slug:'instance', cat:'platform', complexity:2,
    def:'A running installation of n8n on a server. PURIST manages separate n8n instances for each client — ensuring data isolation, independent scaling, and zero cross-contamination between workflows of different businesses.',
    related:['n8n','Self-hosted','Data sovereignty'] },

  { letter:'I', term:'Invoice automation', slug:'invoice-automation', cat:'finance', complexity:1,
    def:'Automatically generating, sending, and chasing invoices based on project milestones, subscription renewals, or time entries. A well-built invoice automation eliminates manual billing entirely — from creation to payment reconciliation.',
    stat:{ value:'73%', label:'of UK SMBs report late payments as their biggest cash flow problem', source:'Xero 2024' },
    insight:'Automated invoice chasing recovers payments 40% faster than manual follow-up.',
    related:['Xero','Stripe','Dunning'] },

  // ── Additional J ──────────────────────────────────────────────────────
  { letter:'J', term:'Job queue', slug:'job-queue', cat:'architecture', complexity:2,
    def:'A managed list of tasks waiting to be processed. Unlike a simple queue, job queues support priorities, scheduled execution, retry policies, and dead-letter handling. Redis and Bull are common job queue technologies used alongside n8n.',
    related:['Queue','Dead-letter queue','Async'] },

  { letter:'J', term:'JMESPath', slug:'jmespath', cat:'data', complexity:3,
    def:'A query language for JSON that lets you extract and transform data within automation workflows. Example: `contacts[?status == \'active\'].email` — extract email addresses of all active contacts from a nested JSON array.',
    related:['JSON','Data transformation','n8n'] },

  // ── Additional K ──────────────────────────────────────────────────────
  { letter:'K', term:'Key-value store', slug:'key-value-store', cat:'data', complexity:2,
    def:'A simple database that maps unique keys to values. In automation, key-value stores (Redis, Upstash) hold temporary state between workflow runs — e.g., tracking which records have been processed to prevent duplicates.',
    related:['Deduplication','Idempotency','State management'] },

  { letter:'K', term:'Knowledge base (automation)', slug:'knowledge-base', cat:'ai', complexity:2,
    def:'A structured collection of documents, FAQs, and policies used as context for AI-powered automations. In RAG workflows, Claude queries the knowledge base to generate accurate, specific answers rather than generic ones.',
    related:['RAG','Claude AI','Document processing'] },

  // ── Additional L ──────────────────────────────────────────────────────
  { letter:'L', term:'Lead scoring', slug:'lead-scoring', cat:'crm', complexity:2,
    def:'Automatically assigning a numeric score to leads based on their behaviour and attributes — website visits, email opens, company size, job title. High-scoring leads are routed to sales immediately; low-scoring ones enter nurture sequences.',
    stat:{ value:'77%', label:'higher conversion rates for companies using automated lead scoring', source:'HubSpot 2024' },
    related:['CRM','AI Agent','Classification'] },

  { letter:'L', term:'Lifecycle automation', slug:'lifecycle-automation', cat:'crm', complexity:2,
    def:'A series of automations that guide a contact through every stage — from first touch to loyal customer. Each stage transition (lead → prospect → trial → customer → advocate) triggers tailored communications and internal actions automatically.',
    related:['Drip sequence','CRM','Retention'] },

  { letter:'L', term:'Lint / linting', slug:'lint-linting', cat:'architecture', complexity:2,
    def:'Automated static analysis of workflow code or configuration to catch common errors before deployment. Like spell-check for automation — catches missing required fields, invalid data types, and deprecated API calls before they cause runtime failures.',
    related:['CI/CD','Testing','Error handling'] },

  { letter:'L', term:'Load balancing', slug:'load-balancing', cat:'architecture', complexity:3,
    def:'Distributing automation workloads across multiple servers or instances to prevent overload. In high-volume scenarios — processing 10,000 form submissions — load balancing ensures no single server becomes the bottleneck.',
    related:['Performance','Queue','Scalability'] },

  { letter:'L', term:'Log aggregation', slug:'log-aggregation', cat:'architecture', complexity:2,
    def:'Collecting execution logs from multiple automation instances into a single searchable system. PURIST uses Grafana Loki for log aggregation — when a client reports an issue, the team can search across all workflow runs instantly.',
    related:['Execution log','Monitoring','Debugging'] },

  // ── Additional M ──────────────────────────────────────────────────────
  { letter:'M', term:'Managed service', slug:'managed-service', cat:'ops', complexity:1,
    def:'A fully outsourced service where a provider handles deployment, monitoring, maintenance, and updates. PURIST operates as a managed automation service — clients get production-grade workflows without hiring an in-house automation engineer.',
    related:['Done-for-you automation','Retainer','SLA'] },

  { letter:'M', term:'Mapping (field)', slug:'mapping', cat:'data', complexity:1,
    def:'The process of connecting fields from a source system to fields in a destination system. Example: `lead.email` from a web form → `properties.email` in HubSpot. Field mapping must account for type differences, required fields, and null handling.',
    related:['Field mapping','Data transformation','Integration'] },

  { letter:'M', term:'Merge (data)', slug:'merge', cat:'data', complexity:2,
    def:'Combining two or more data sets into a single output. In automation: merging customer data from CRM with order history from Shopify to create a unified customer profile that feeds into a personalised email.',
    related:['Data transformation','Data pipeline','Integration'] },

  { letter:'M', term:'Message broker', slug:'message-broker', cat:'architecture', complexity:3,
    def:'Software that translates messages between producers (systems that send data) and consumers (automations that process it). RabbitMQ and AWS SQS are common message brokers. They add durability, ordering, and routing to event streams.',
    related:['Queue','Event bus','Async'] },

  { letter:'M', term:'Microservice', slug:'microservice', cat:'architecture', complexity:3,
    def:'A small, independently deployable service that handles one specific function. PURIST sometimes deploys microservices alongside n8n for high-performance operations — a microservice handles PDF generation while n8n orchestrates the surrounding workflow.',
    related:['Serverless','Cloud function','Architecture'] },

  { letter:'M', term:'Mock data', slug:'mock-data', cat:'architecture', complexity:2,
    def:'Fake but realistic data used to test workflows before connecting to live systems. PURIST builds workflows against mock data first — simulating form submissions, payments, and CRM updates — before pointing workflows at real production APIs.',
    related:['Staging environment','Testing','Integration'] },

  { letter:'M', term:'Multi-tenant', slug:'multi-tenant', cat:'architecture', complexity:3,
    def:'A single automation instance serving multiple clients, with strict data isolation between them. PURIST runs multi-tenant n8n infrastructure for some shared-service workflows, with row-level security ensuring each client only sees their own data.',
    related:['Instance','Self-hosted','Data sovereignty'] },

  // ── Additional N ──────────────────────────────────────────────────────
  { letter:'N', term:'Namespace', slug:'namespace', cat:'architecture', complexity:2,
    def:'A logical grouping of workflow components — variables, credentials, and queues — to prevent naming collisions when multiple automations coexist. PURIST namespaces all client resources to keep configurations clean and maintainable.',
    related:['Environment variable','Instance','Multi-tenant'] },

  { letter:'N', term:'Node (n8n)', slug:'node', cat:'platform', complexity:1,
    def:'A single step in an n8n workflow — a trigger, action, transformation, or decision. Nodes are connected visually to create workflows. n8n has 400+ native nodes and supports custom nodes for bespoke integrations.',
    related:['n8n','Workflow','Integration'] },

  { letter:'N', term:'Normalisation (data)', slug:'normalisation', cat:'data', complexity:2,
    def:'Reformatting incoming data into a consistent standard. Example: phone numbers arrive as "+44 7700 900123", "07700900123", and "0044-7700-900123" from different forms — normalisation converts all three to E.164 format before storing.',
    related:['Formatting','Data quality','Data transformation'] },

  // ── Additional O ──────────────────────────────────────────────────────
  { letter:'O', term:'OCR (Optical Character Recognition)', slug:'ocr', cat:'data', complexity:2,
    def:'Technology that converts images or scanned documents into machine-readable text. In automation: scan a physical invoice, OCR extracts the text, Claude AI interprets it, and the data is created in your accounting system — zero manual entry.',
    related:['Document processing','Claude AI','Extraction'] },

  { letter:'O', term:'Onboarding automation', slug:'onboarding-automation', cat:'ops', complexity:1,
    def:'A sequence of automated actions triggered when a new client, employee, or user joins. Example: new client signs contract → create project in ClickUp, generate welcome email, set up Slack channel, provision tools, schedule kickoff call — all in under 60 seconds.',
    stat:{ value:'83%', label:'of clients with automated onboarding report higher satisfaction scores', source:'PURIST client data' },
    related:['Drip sequence','CRM','Workflow'] },

  { letter:'O', term:'Output schema', slug:'output-schema', cat:'data', complexity:2,
    def:'The defined structure of data produced by a workflow step — field names, data types, and format. Documenting output schemas ensures downstream steps can reliably consume the data and prevents breaking changes when workflows are updated.',
    related:['Schema','Data mapping','API documentation'] },

  { letter:'O', term:'Outbound automation', slug:'outbound-automation', cat:'marketing', complexity:1,
    def:'Automating proactive outreach — cold emails, LinkedIn connection requests, sales sequences, re-engagement campaigns. Triggers include lead score changes, trial expiry, or time since last contact.',
    related:['Email automation','CRM','Lead scoring'] },

  { letter:'O', term:'Over-automation', slug:'over-automation', cat:'ops', complexity:1,
    def:'Automating tasks that should involve human judgment, leading to poor client experiences or operational mistakes. Example: automatically resolving all support tickets without human review — fast, but wrong. Good automation knows what NOT to automate.',
    insight:'Automate the routine. Preserve human judgment for the consequential. The distinction matters.',
    related:['Process mapping','Hand-off','Automation audit'] },

  // ── Additional P ──────────────────────────────────────────────────────
  { letter:'P', term:'Pagination', slug:'pagination', cat:'core', complexity:2,
    def:'The practice of splitting large API responses across multiple pages. Most APIs return a maximum of 100 records per request. Proper pagination loops through all pages until no more results remain — critical when processing complete datasets.',
    related:['Cursor','REST API','Loop'] },

  { letter:'P', term:'Parameter', slug:'parameter', cat:'core', complexity:1,
    def:'A variable passed to an API endpoint to control what data is returned or what action is performed. Example: `GET /contacts?status=active&limit=100&page=2` — the parameters filter and paginate the response.',
    related:['REST API','API','Endpoint'] },

  { letter:'P', term:'Parse', slug:'parse', cat:'data', complexity:1,
    def:'Converting raw data (JSON text, CSV, XML) into a structured format that a workflow can process. Every workflow that receives webhook data must parse the payload before accessing individual fields.',
    related:['JSON','Payload','Data transformation'] },

  { letter:'P', term:'Payment automation', slug:'payment-automation', cat:'finance', complexity:1,
    def:'Automating the full payment lifecycle — invoice generation, payment collection, reconciliation, dunning, and reporting. Replaces manual billing processes and eliminates the revenue leakage caused by forgotten follow-ups.',
    related:['Stripe','Xero','Dunning'] },

  { letter:'P', term:'Pipeline (data)', slug:'pipeline', cat:'data', complexity:1,
    def:'A connected sequence of automated steps that data flows through from source to destination. A CRM pipeline moves leads from discovery → qualified → proposal → won. A data pipeline moves records from API → transform → database → report.',
    related:['ETL','Workflow','Data pipeline'] },

  { letter:'P', term:'Postback', slug:'postback', cat:'core', complexity:2,
    def:'An HTTP request sent from a destination system back to a source system to confirm that data was received and processed. Common in advertising — a conversion postback tells the ad platform that a purchase occurred so it can optimise bidding.',
    related:['Webhook','HTTP Request','Integration'] },

  { letter:'P', term:'Pre-built workflow', slug:'pre-built-workflow', cat:'core', complexity:1,
    def:'A workflow template designed for a common use case that can be deployed with minimal customisation. PURIST maintains a library of 60+ pre-built workflows — CRM sync, invoice generation, onboarding sequences — reducing deployment time by 70%.',
    related:['Workflow template','Done-for-you automation','n8n'] },

  { letter:'P', term:'Priority queue', slug:'priority-queue', cat:'architecture', complexity:2,
    def:'A queue where items are processed in order of priority rather than insertion order. In automation: critical workflow failures go to the front of the queue and are processed immediately; non-urgent tasks wait.',
    related:['Queue','Escalation','Job queue'] },

  { letter:'P', term:'Proactive monitoring', slug:'proactive-monitoring', cat:'architecture', complexity:2,
    def:'Detecting and alerting on automation issues before they impact operations, rather than reacting after clients notice. PURIST\'s monitoring stack alerts the team within 5 minutes of any workflow failure — often before the client is aware.',
    related:['Monitoring','Health check','SLA'] },

  // ── Additional Q ──────────────────────────────────────────────────────
  { letter:'Q', term:'Quality gate', slug:'quality-gate', cat:'architecture', complexity:2,
    def:'A checkpoint in a workflow or deployment pipeline that blocks progress until defined criteria are met. Example: a workflow cannot deploy to production until it passes all automated tests and has been reviewed by a second engineer.',
    related:['CI/CD','Testing','Staging environment'] },

  { letter:'Q', term:'Query (database)', slug:'query', cat:'data', complexity:2,
    def:'A request for specific data from a database. Automation workflows often query databases directly — "give me all clients whose subscription renews in the next 7 days" — to drive targeted communication campaigns.',
    related:['Database','SQL','Data pipeline'] },

  // ── Additional R ──────────────────────────────────────────────────────
  { letter:'R', term:'Real-time processing', slug:'real-time-processing', cat:'architecture', complexity:2,
    def:'Executing automation logic within milliseconds or seconds of an event occurring. Contrast with batch processing (hourly or daily). Real-time processing powers instant notifications, immediate CRM updates, and live dashboard refreshes.',
    related:['Event-driven automation','Webhook','Latency'] },

  { letter:'R', term:'Reconciliation (finance)', slug:'reconciliation', cat:'finance', complexity:2,
    def:'Automatically matching records across systems to verify consistency. Example: matching Stripe payment records against Xero invoices to identify unmatched payments, overpayments, and missing invoices — a process that takes accountants hours, done in minutes.',
    related:['Finance automation','Xero','Stripe'] },

  { letter:'R', term:'Redundancy', slug:'redundancy', cat:'architecture', complexity:2,
    def:'Duplicating critical components of an automation system so that if one fails, another takes over. Example: two n8n instances running in active-passive mode — if the primary fails, the secondary takes over within seconds.',
    related:['Failover','Uptime','SLA'] },

  { letter:'R', term:'Refresh token', slug:'refresh-token', cat:'security', complexity:2,
    def:'A long-lived credential used to obtain new access tokens when they expire. Unlike access tokens (which expire in hours), refresh tokens can last weeks or months. PURIST builds token refresh logic into every OAuth integration.',
    related:['OAuth','Access token','JWT'] },

  { letter:'R', term:'Regression testing', slug:'regression-testing', cat:'architecture', complexity:2,
    def:'Re-running existing test cases after making changes to a workflow to ensure nothing that previously worked has broken. PURIST runs regression tests before every deployment — preventing silent breakages from accumulating over time.',
    related:['Testing','CI/CD','Staging environment'] },

  { letter:'R', term:'REST client', slug:'rest-client', cat:'core', complexity:1,
    def:'A tool or code that makes requests to REST APIs. In n8n, the HTTP Request node acts as a REST client — it sends requests to any API endpoint and returns the response for further processing.',
    related:['REST API','HTTP Request','n8n'] },

  { letter:'R', term:'Rollback', slug:'rollback', cat:'architecture', complexity:2,
    def:'Reverting a workflow deployment to a prior working version after a failed update. PURIST maintains version history for every workflow — if a deployment causes issues, the previous version can be restored in under 5 minutes.',
    related:['Version control','CI/CD','Deployment'] },

  { letter:'R', term:'Round-robin assignment', slug:'round-robin-assignment', cat:'crm', complexity:1,
    def:'Distributing incoming leads, tickets, or tasks evenly across team members. Example: 3 sales reps → every 3rd new lead is assigned to each rep automatically — no cherry-picking, no manual assignment, fair distribution every time.',
    related:['CRM','Routing','Workflow'] },

  { letter:'R', term:'Routing (workflow)', slug:'routing', cat:'core', complexity:1,
    def:'Directing data or tasks to the correct destination based on defined logic. Route leads by geography, tickets by topic, invoices by currency — all automatically, consistently, and without human intervention.',
    related:['Router node','Condition','Filter node'] },

  // ── Additional S ──────────────────────────────────────────────────────
  { letter:'S', term:'Sandbox environment', slug:'sandbox-environment', cat:'architecture', complexity:1,
    def:'A test environment provided by a SaaS platform (Stripe, Salesforce, HubSpot) that mimics production without using real data or money. PURIST builds all integrations against sandbox environments first, preventing accidental charges or data corruption.',
    related:['Staging environment','Testing','Mock data'] },

  { letter:'S', term:'Scalability', slug:'scalability', cat:'architecture', complexity:2,
    def:'The ability of an automation system to handle growing volume without degradation. A well-built workflow processes 10 records and 10,000 records with equal reliability. Poor design (no queuing, no rate limit handling) collapses under load.',
    related:['Load balancing','Queue','Performance'] },

  { letter:'S', term:'Scheduled trigger', slug:'scheduled-trigger', cat:'core', complexity:1,
    def:'An automation that fires at a defined time rather than in response to an event. Examples: "every weekday at 7am, compile overnight orders"; "every 1st of the month, generate invoices"; "every Friday at 4pm, send the weekly KPI digest".',
    related:['CRON','Trigger','Batch processing'] },

  { letter:'S', term:'Secrets manager', slug:'secrets-manager', cat:'security', complexity:2,
    def:'A secure service for storing and retrieving sensitive credentials — API keys, database passwords, certificates. AWS Secrets Manager, HashiCorp Vault, and 1Password for Teams are common choices. Eliminates hardcoded credentials in workflow code.',
    related:['Environment variable','API Key','Security'] },

  { letter:'S', term:'Serialisation', slug:'serialisation', cat:'data', complexity:2,
    def:'Converting a data object into a format that can be transmitted or stored. JSON serialisation converts a JavaScript object into a JSON string for transport over HTTP. Deserialisation converts it back. Every API integration serialises and deserialises data.',
    related:['JSON','Data transformation','API'] },

  { letter:'S', term:'Service-level objective (SLO)', slug:'service-level-objective', cat:'ops', complexity:2,
    def:'An internal target for a specific metric — e.g., "99.9% of workflows complete within 10 seconds". SLOs are more granular than SLAs (which are external commitments). PURIST defines SLOs for every workflow type and monitors against them continuously.',
    related:['SLA','Monitoring','Performance'] },

  { letter:'S', term:'Session management', slug:'session-management', cat:'security', complexity:2,
    def:'Handling the lifecycle of authentication sessions in automation workflows. Includes creating sessions, refreshing expired credentials, and terminating sessions securely. Critical in workflows that run for hours and rely on persistent connections.',
    related:['OAuth','Refresh token','Authentication'] },

  { letter:'S', term:'Shopify automation', slug:'shopify-automation', cat:'platform', complexity:1,
    def:'Automating e-commerce operations connected to Shopify — order processing, inventory alerts, shipping notifications, customer win-back sequences, and revenue reporting. Shopify\'s webhook support makes it one of the most automation-friendly platforms.',
    related:['Webhook','E-commerce','Integration'] },

  { letter:'S', term:'Signal (workflow)', slug:'signal', cat:'architecture', complexity:2,
    def:'An event or message that triggers a specific action in an automation system. The difference between a signal and a webhook: a signal is internal (sent between components of your own system); a webhook comes from an external platform.',
    related:['Event-driven automation','Webhook','Trigger'] },

  { letter:'S', term:'Smart routing', slug:'smart-routing', cat:'ai', complexity:2,
    def:'Using AI to route data, tasks, or messages to the most appropriate destination. Example: Claude AI reads an incoming support email, classifies it as a "billing dispute", and routes it to the finance team — bypassing the general support queue.',
    related:['Claude AI','Classification','Routing'] },

  { letter:'S', term:'SQL (Structured Query Language)', slug:'sql', cat:'data', complexity:2,
    def:'The language used to query and manipulate relational databases. In automation, SQL lets workflows directly extract, filter, aggregate, and update database records — bypassing API limits and accessing historical data at scale.',
    related:['Database','Query','Data pipeline'] },

  { letter:'S', term:'State management', slug:'state-management', cat:'architecture', complexity:3,
    def:'Tracking where a workflow is in its execution and what data has been processed. Stateful workflows remember prior runs; stateless ones don\'t. Stateful automations can pause, resume, and avoid reprocessing records that were already handled.',
    related:['Key-value store','Idempotency','Async'] },

  { letter:'S', term:'Subworkflow', slug:'subworkflow', cat:'core', complexity:2,
    def:'A reusable workflow called from within another workflow. Instead of duplicating the same 10-step email-sending logic in 5 workflows, extract it into one subworkflow and call it from each. Changes propagate automatically.',
    related:['Workflow','Modular design','n8n'] },

  { letter:'S', term:'Summarisation (AI)', slug:'summarisation', cat:'ai', complexity:1,
    def:'Using AI to condense long documents, email threads, or call transcripts into brief summaries. In automation: every new support call transcript is automatically summarised by Claude, added to the CRM contact, and shared with the account manager.',
    related:['Claude AI','Document processing','NLP'] },

  { letter:'S', term:'Sync (data)', slug:'sync', cat:'data', complexity:1,
    def:'Ensuring two or more systems contain consistent, up-to-date records. Bi-directional sync is the hardest — changes in either system must propagate to the other without creating duplicates or losing edits.',
    stat:{ value:'65%', label:'of CRM data is out of sync with the systems it was imported from', source:'Salesforce 2024' },
    related:['Integration','Deduplication','ETL'] },

  // ── Additional T ──────────────────────────────────────────────────────
  { letter:'T', term:'Task automation', slug:'task-automation', cat:'ops', complexity:1,
    def:'Automating individual tasks that would otherwise require human effort — sending a confirmation email, creating a Trello card, updating a spreadsheet row. Task automation is the building block of larger process automation.',
    related:['Workflow','Action','Business process automation'] },

  { letter:'T', term:'Template literal', slug:'template-literal', cat:'core', complexity:1,
    def:'A string that contains dynamic expressions resolved at runtime. In n8n: `"Hello {{contact.firstName}}, your invoice for £{{invoice.amount}} is due on {{invoice.dueDate}}"`. Template literals personalise outputs without hardcoding values.',
    related:['Data transformation','Email automation','n8n'] },

  { letter:'T', term:'Testing (automation)', slug:'testing', cat:'architecture', complexity:2,
    def:'Running a workflow with controlled inputs to verify it produces expected outputs. Includes unit tests (individual nodes), integration tests (full workflow with real APIs), and regression tests (ensuring nothing broke). PURIST tests every workflow before deployment.',
    related:['Staging environment','CI/CD','Mock data'] },

  { letter:'T', term:'Time zone handling', slug:'time-zone-handling', cat:'data', complexity:2,
    def:'Correctly converting timestamps across time zones in automation workflows. A meeting scheduled at 9am BST must fire a reminder at the right time for a participant in CET. Time zone bugs are silent and only appear when workflows cross geography.',
    insight:'Always store timestamps in UTC and convert at display time. Never assume a timestamp is in any particular time zone.',
    related:['Formatting','Data transformation','CRON'] },

  { letter:'T', term:'Token refresh', slug:'token-refresh', cat:'security', complexity:2,
    def:'Automatically obtaining a new access token before the current one expires. Without automated refresh, a long-running workflow fails silently mid-execution when the token expires. PURIST builds refresh logic into every OAuth integration.',
    related:['Refresh token','OAuth','Access token'] },

  { letter:'T', term:'Tracing (distributed)', slug:'tracing', cat:'architecture', complexity:3,
    def:'Following a request as it flows through multiple systems and workflow steps. When a client reports "my order didn\'t get into the CRM", distributed tracing shows exactly where in the multi-step workflow the record was lost or transformed incorrectly.',
    related:['Execution log','Monitoring','Debugging'] },

  { letter:'T', term:'Transformation function', slug:'transformation-function', cat:'data', complexity:2,
    def:'A piece of code that converts data from one format to another. Examples: splitting a full name into first and last name fields, converting a timestamp to a readable date, or formatting a number as a currency string.',
    related:['Data transformation','Function node','Custom code node'] },

  // ── Additional U ──────────────────────────────────────────────────────
  { letter:'U', term:'Unit economics', slug:'unit-economics', cat:'finance', complexity:1,
    def:'The financial metrics for a single unit of a business — one client, one transaction, one workflow run. For automation ROI: the cost per automation run divided by the value of labour saved. PURIST calculates unit economics for every client deployment.',
    related:['ROI','FTE','Payback period'] },

  { letter:'U', term:'URL encoding', slug:'url-encoding', cat:'core', complexity:2,
    def:'Converting special characters in URLs into a format that can be transmitted safely over HTTP. Example: a search query "automation + CRM" becomes "automation+%2B+CRM" in a URL. Incorrect URL encoding causes silent API failures.',
    related:['HTTP Request','REST API','API'] },

  { letter:'U', term:'Utility node', slug:'utility-node', cat:'core', complexity:1,
    def:'A general-purpose workflow step that performs a common operation — wait, set variable, merge data, split data, convert file format. Utility nodes connect the specialised action nodes and handle the plumbing between them.',
    related:['Node','n8n','Workflow'] },

  // ── Additional V ──────────────────────────────────────────────────────
  { letter:'V', term:'Validation (input)', slug:'validation', cat:'data', complexity:1,
    def:'Checking that data meets required constraints before it enters a workflow. Examples: verifying an email is properly formatted, a date is in the future, a required field is not null. Validation at the entry point prevents downstream failures.',
    related:['Input validation','Data quality','Guard clause'] },

  { letter:'V', term:'Variable (workflow)', slug:'variable', cat:'core', complexity:1,
    def:'A named storage location that holds a value used across multiple steps in a workflow. Setting a variable at the start (e.g., `clientId = 12345`) allows all subsequent steps to reference it without repeating the value or making redundant API calls.',
    related:['Environment variable','Template literal','n8n'] },

  { letter:'V', term:'Vector database', slug:'vector-database', cat:'ai', complexity:3,
    def:'A database designed to store and search high-dimensional vectors (embeddings). Used in RAG systems — when a support query arrives, the vector database finds the most semantically similar documents to use as context for Claude\'s response.',
    related:['RAG','Embedding','Claude AI'] },

  { letter:'V', term:'Vendor lock-in', slug:'vendor-lock-in', cat:'ops', complexity:1,
    def:'Over-dependence on a single platform that makes switching costly. Zapier lock-in means your 200 workflows and all their logic only exist on Zapier — you can\'t export them. PURIST builds on n8n (open source) and documents everything to prevent lock-in.',
    insight:'The cost of switching platforms is often the reason businesses stay on tools they\'ve outgrown. Own your workflows.',
    related:['Self-hosted','n8n','Done-for-you automation'] },

  { letter:'V', term:'Versioning (API)', slug:'versioning', cat:'core', complexity:2,
    def:'API providers update their APIs over time and version them (v1, v2, v3) to avoid breaking existing integrations. PURIST monitors API version deprecation notices and updates client workflows before old versions are shut down.',
    related:['API','Integration','Version control'] },

  // ── Additional W ──────────────────────────────────────────────────────
  { letter:'W', term:'Wait / delay node', slug:'wait-delay-node', cat:'core', complexity:1,
    def:'A workflow step that pauses execution for a defined period or until a condition is met. Example: send a welcome email, wait 3 days, then send a follow-up. Without delay nodes, both emails would fire simultaneously.',
    related:['Drip sequence','Workflow','Async'] },

  { letter:'W', term:'Waterfall (dependencies)', slug:'waterfall', cat:'architecture', complexity:2,
    def:'A workflow pattern where each step must complete before the next begins — like a waterfall of sequential operations. Contrast with parallel execution. Waterfalls are simpler to reason about but slower; parallel execution is faster but harder to debug.',
    related:['Parallel execution','Dependency','Workflow'] },

  { letter:'W', term:'Webhook replay', slug:'webhook-replay', cat:'core', complexity:2,
    def:'Re-sending a previously received webhook payload through a workflow, typically after fixing a bug that caused the original run to fail. PURIST\'s infrastructure logs all incoming webhooks, enabling safe replay without data loss.',
    related:['Webhook','Dead-letter queue','Error handling'] },

  { letter:'W', term:'Workflow governance', slug:'workflow-governance', cat:'ops', complexity:2,
    def:'The policies, processes, and controls that manage how automations are created, approved, deployed, and retired. Enterprise workflow governance prevents unauthorised automations, ensures documentation standards, and controls access to production systems.',
    related:['Audit trail','Version control','Compliance'] },

  { letter:'W', term:'Workflow library', slug:'workflow-library', cat:'core', complexity:1,
    def:'A catalogue of pre-built, tested workflows ready to deploy. PURIST\'s Workflow Library contains 60+ templates across CRM, finance, operations, HR, marketing, and reporting — the starting point for every client deployment.',
    related:['Pre-built workflow','Workflow template','Done-for-you automation'] },

  { letter:'W', term:'Workflow monitoring', slug:'workflow-monitoring', cat:'architecture', complexity:1,
    def:'Continuous observation of workflow execution — run counts, error rates, processing times, and data volumes. PURIST\'s monitoring dashboard shows real-time status for every client workflow, enabling proactive issue resolution.',
    related:['Monitoring','Health check','SLA'] },

  // ── Y ─────────────────────────────────────────────────────────────────
  { letter:'Y', term:'YAML configuration', slug:'yaml-configuration', cat:'architecture', complexity:2,
    def:'A human-readable configuration format used to define infrastructure, CI/CD pipelines, and workflow parameters as code. PURIST uses YAML for n8n environment configuration, ensuring every deployment is reproducible and version-controlled.',
    related:['Infrastructure as Code','CI/CD','Version control'] },

  // ── Additional Z ──────────────────────────────────────────────────────
  { letter:'Z', term:'Zero-downtime deployment', slug:'zero-downtime-deployment', cat:'architecture', complexity:3,
    def:'Updating a live workflow without interrupting any active executions. Achieved through blue-green deployments or canary releases — traffic gradually shifts to the new version while the old version handles in-flight requests.',
    related:['Deployment','Rollback','CI/CD'] },

  { letter:'Z', term:'Zap (Zapier workflow)', slug:'zap', cat:'platform', complexity:1,
    def:'Zapier\'s term for a single two-step automation (trigger → action). Complex processes require multiple Zaps chained together, which becomes difficult to maintain. PURIST migrates complex Zap chains to single n8n workflows for reliability and visibility.',
    related:['Zapier','Workflow','n8n'] },

  // ── Extended A ────────────────────────────────────────────────────────
  { letter:'A', term:'Active polling', slug:'active-polling', cat:'core', complexity:2,
    def:'Repeatedly checking an external service for new data on a fixed schedule. Contrast with webhooks, which push data immediately. Active polling wastes API quota and introduces latency — use only when no webhook option exists.',
    related:['Polling','Webhook','Scheduled trigger'] },

  { letter:'A', term:'Adaptive retry', slug:'adaptive-retry', cat:'architecture', complexity:3,
    def:'A retry strategy that adjusts wait times based on the type of failure — network timeouts get short retries; API rate limit errors get longer, jitter-randomised backoffs. Smarter than fixed-interval retries and reduces API hammering.',
    related:['Retry logic','Backoff','Rate limit'] },

  { letter:'A', term:'Agent loop', slug:'agent-loop', cat:'ai', complexity:3,
    def:'The iterative process by which an AI agent plans, acts, observes the result, and decides the next action — repeating until the goal is achieved. Claude AI uses agent loops to complete multi-step tasks like researching a contact and drafting a personalised email.',
    related:['AI Agent','Orchestration','Claude AI'] },

  { letter:'A', term:'Annotation (data)', slug:'annotation', cat:'data', complexity:2,
    def:'Adding labels or metadata to data records to make them more useful for downstream processing. Example: annotating a support ticket with "billing", "urgent", and "enterprise" — tags added automatically by Claude AI based on message content.',
    related:['Classification','Claude AI','Data enrichment'] },

  { letter:'A', term:'Apollo (data enrichment)', slug:'apollo', cat:'platform', complexity:1,
    def:'A B2B data platform used to enrich leads with company data, job titles, and contact details. PURIST integrates Apollo into CRM onboarding flows — a new lead\'s email triggers enrichment, adding 15+ fields before it ever reaches a sales rep.',
    related:['Data enrichment','CRM','Integration'] },

  // ── Extended B ────────────────────────────────────────────────────────
  { letter:'B', term:'Blob storage', slug:'blob-storage', cat:'architecture', complexity:2,
    def:'Cloud object storage (AWS S3, Google Cloud Storage) used to store files generated or consumed by automations — PDFs, CSVs, images. When a workflow generates a report, it stores it in blob storage and emails a download link rather than attaching the file directly.',
    related:['Document processing','File automation','Cloud function'] },

  { letter:'B', term:'Boolean logic', slug:'boolean-logic', cat:'core', complexity:1,
    def:'True/false conditions that drive branching in workflows. `IF contact.country === "GB" AND deal.value > 10000 THEN assign to senior rep`. Combining AND, OR, and NOT conditions creates sophisticated routing without custom code.',
    related:['Condition','Filter node','Routing'] },

  { letter:'B', term:'Breaking change', slug:'breaking-change', cat:'architecture', complexity:2,
    def:'An API update that removes or alters functionality in a way that breaks existing integrations. Example: an endpoint is renamed from `/v1/contacts` to `/v2/people`. PURIST monitors API changelog notifications and updates client workflows before breaking changes go live.',
    related:['Versioning','API','Integration'] },

  // ── Extended C ────────────────────────────────────────────────────────
  { letter:'C', term:'Chain (workflow)', slug:'chain', cat:'core', complexity:1,
    def:'Linking multiple automations so the output of one becomes the trigger of the next. A chained automation creates a fully automated pipeline: form → CRM → invoice → onboarding email — each link triggers the next automatically.',
    related:['Subworkflow','Pipeline','Trigger'] },

  { letter:'C', term:'Churn prevention automation', slug:'churn-prevention-automation', cat:'crm', complexity:2,
    def:'Automated workflows that identify at-risk clients and take action before they cancel. Signals include declining usage, missed logins, late payments, and support ticket volume. Early intervention with the right message recovers 20–30% of at-risk accounts.',
    stat:{ value:'25%', label:'of at-risk clients retained through automated intervention', source:'PURIST client average' },
    related:['Lifecycle automation','CRM','Alert routing'] },

  { letter:'C', term:'ClickUp automation', slug:'clickup-automation', cat:'platform', complexity:1,
    def:'Using ClickUp\'s API or webhooks to automate project creation, task assignment, status updates, and deadline tracking. PURIST builds automations that create full project structures in ClickUp the moment a contract is signed — saving 2+ hours of manual setup.',
    related:['Project management','Webhook','Integration'] },

  { letter:'C', term:'Compliance automation', slug:'compliance-automation', cat:'security', complexity:2,
    def:'Using automation to enforce regulatory requirements continuously rather than relying on periodic manual audits. Examples: automatically archiving email communications for FCA compliance, enforcing GDPR deletion schedules, and generating SOC 2 audit evidence.',
    related:['GDPR automation','Audit trail','Data retention'] },

  { letter:'C', term:'Concatenation', slug:'concatenation', cat:'data', complexity:1,
    def:'Joining two or more strings into one. Example: `firstName + " " + lastName` → "Jane Smith". Used constantly in automation to build dynamic messages, file names, API parameters, and personalised content from individual data fields.',
    related:['Template literal','Data transformation','Formatting'] },

  { letter:'C', term:'Concurrent execution', slug:'concurrent-execution', cat:'architecture', complexity:3,
    def:'Running multiple workflow instances simultaneously, each processing a different record. When 50 form submissions arrive at once, concurrent execution processes all 50 in parallel rather than one at a time. Requires careful state management to avoid race conditions.',
    related:['Parallel execution','Load balancing','State management'] },

  { letter:'C', term:'Contract automation', slug:'contract-automation', cat:'finance', complexity:1,
    def:'Automating the full contract lifecycle — generation from templates, e-signature routing, approval workflows, and CRM updates on signature. When a deal is marked Won in the CRM, a contract is generated, sent for signature, and the signed PDF stored automatically.',
    related:['Document processing','Integration','PandaDoc'] },

  // ── Extended D ────────────────────────────────────────────────────────
  { letter:'D', term:'Data lake', slug:'data-lake', cat:'data', complexity:3,
    def:'A centralised repository that stores raw, unstructured data at any scale. Automation pipelines feed data lakes from multiple sources — CRM, billing, support, analytics — creating a single source of truth for BI and AI workloads.',
    related:['Data pipeline','ETL','SQL'] },

  { letter:'D', term:'Data masking', slug:'data-masking', cat:'security', complexity:2,
    def:'Replacing sensitive data fields with anonymised substitutes in non-production environments. Example: in staging, real customer names and emails are replaced with fake ones — preventing accidental exposure during development and testing.',
    related:['Staging environment','Data residency','Compliance'] },

  { letter:'D', term:'Data retention', slug:'data-retention', cat:'security', complexity:2,
    def:'The policy governing how long data is stored before deletion. Automation enforces retention policies by automatically purging records after defined periods — e.g., deleting GDPR-covered personal data after 3 years, or archiving financial records after 7 years.',
    related:['GDPR automation','Compliance','Audit trail'] },

  { letter:'D', term:'Debugging (workflow)', slug:'debugging', cat:'architecture', complexity:2,
    def:'The process of identifying and fixing errors in an automation workflow. In n8n, every execution shows the exact data at each node — making it easy to pinpoint where a value was lost, transformed incorrectly, or caused a downstream failure.',
    related:['Execution log','Error handling','Testing'] },

  { letter:'D', term:'Dependency injection', slug:'dependency-injection', cat:'architecture', complexity:3,
    def:'Passing configuration and credentials into a workflow from outside rather than hardcoding them. Makes workflows portable across environments — the same workflow runs in staging and production by swapping the injected credentials, not editing the code.',
    related:['Environment variable','Secrets manager','CI/CD'] },

  { letter:'D', term:'Dispatcher (workflow)', slug:'dispatcher', cat:'architecture', complexity:2,
    def:'A workflow that receives an event and routes it to the appropriate specialist workflow for processing. Like a switchboard operator — the dispatcher decides whether this event goes to the billing workflow, the CRM workflow, or the support workflow.',
    related:['Router node','Event-driven automation','Orchestration'] },

  // ── Extended E ────────────────────────────────────────────────────────
  { letter:'E', term:'Email parsing', slug:'email-parsing', cat:'data', complexity:2,
    def:'Automatically extracting structured data from incoming emails. Example: a client emails "Please book a meeting on Thursday at 3pm" — email parsing extracts the date and time, and the workflow books the calendar slot and sends a confirmation.',
    insight:'Email parsing with Claude AI handles messy, unstructured human language that rules-based parsers miss.',
    related:['Claude AI','Extraction','Email automation'] },

  { letter:'E', term:'Entity extraction', slug:'entity-extraction', cat:'ai', complexity:2,
    def:'Identifying and extracting specific types of information from text — names, dates, monetary values, addresses, company names. Claude AI can extract all entities from an unstructured email and populate structured CRM fields automatically.',
    related:['NLP','Claude AI','Document processing'] },

  { letter:'E', term:'Error budget', slug:'error-budget', cat:'architecture', complexity:3,
    def:'The allowable amount of downtime or errors within a given period based on your SLA. At 99.97% uptime, the monthly error budget is ~13 minutes. When the budget is depleted, reliability work takes priority over new features.',
    related:['SLA','Uptime','Monitoring'] },

  { letter:'E', term:'Event sourcing', slug:'event-sourcing', cat:'architecture', complexity:3,
    def:'Storing every state change as an immutable event log rather than just the current state. Example: instead of storing "deal status = Won", store every status transition — Created → Qualified → Proposal → Won. Enables full auditability and temporal queries.',
    related:['Event-driven automation','Audit trail','State management'] },

  // ── Extended F ────────────────────────────────────────────────────────
  { letter:'F', term:'Fan-out', slug:'fan-out', cat:'architecture', complexity:2,
    def:'A pattern where one event triggers multiple independent downstream workflows simultaneously. Example: a new client signs → fan out to: (1) create invoice, (2) set up project, (3) send welcome email, (4) notify account manager — all in parallel.',
    related:['Parallel execution','Event bus','Dispatcher'] },

  { letter:'F', term:'Feature flag', slug:'feature-flag', cat:'architecture', complexity:2,
    def:'A configuration switch that enables or disables specific workflow logic without redeployment. PURIST uses feature flags to roll out new automation behaviour to one client first — validating it before enabling globally.',
    related:['CI/CD','Deployment','Testing'] },

  { letter:'F', term:'Feedback loop (automation)', slug:'feedback-loop', cat:'ops', complexity:2,
    def:'A closed-loop system where the output of an automation informs future runs. Example: tracking which email subject lines get the highest reply rates, then automatically selecting the best-performing variant for new sends.',
    related:['Reporting','Dashboard automation','AI Agent'] },

  { letter:'F', term:'Finance automation', slug:'finance-automation', cat:'finance', complexity:1,
    def:'Automating the full financial operations stack — invoice generation, expense approvals, payment reconciliation, dunning, payroll prep, and financial reporting. Finance teams using automation spend 60% less time on data entry and close books 3× faster.',
    stat:{ value:'3×', label:'faster month-end close for finance teams using automation', source:'PURIST client data' },
    related:['Xero','Stripe','Invoice automation'] },

  { letter:'F', term:'Form automation', slug:'form-automation', cat:'ops', complexity:1,
    def:'Triggering workflows from form submissions — Typeform, Tally, Gravity Forms, or JotForm. The form is the front door; the automation handles everything behind it: CRM creation, email response, task assignment, and data storage.',
    related:['Trigger','Typeform','Webhook'] },

  // ── Extended G ────────────────────────────────────────────────────────
  { letter:'G', term:'Ghost step', slug:'ghost-step', cat:'architecture', complexity:2,
    def:'A workflow step that runs but produces no observable output — often a silent failure or misconfigured node. Ghost steps are the hardest bugs to find because the workflow appears to succeed while actually doing nothing useful.',
    related:['Debugging','Error handling','Execution log'] },

  { letter:'G', term:'Graceful degradation', slug:'graceful-degradation', cat:'architecture', complexity:2,
    def:'Designing automations to continue operating in a reduced capacity when a component fails. Example: if the data enrichment API is down, the workflow still creates the CRM contact with basic data — rather than failing the entire run.',
    related:['Failover','Error handling','Redundancy'] },

  // ── Extended H ────────────────────────────────────────────────────────
  { letter:'H', term:'Human-in-the-loop', slug:'human-in-the-loop', cat:'ai', complexity:2,
    def:'A workflow design that pauses at critical decision points for human review and approval before continuing. Combines automation speed with human judgment. Example: AI drafts a response to a complex complaint → human reviews and approves → automation sends it.',
    insight:'The best automation design is not maximum automation — it\'s maximum automation with human oversight exactly where it matters.',
    related:['AI Agent','Hand-off','Escalation'] },

  { letter:'H', term:'Hybrid automation', slug:'hybrid-automation', cat:'core', complexity:2,
    def:'A combination of API-based automation and RPA in a single workflow. When a target system has no API, RPA handles the UI interaction while n8n orchestrates the surrounding process. Hybrid approaches unlock legacy system automation.',
    related:['RPA','API','Integration'] },

  // ── Extended I ────────────────────────────────────────────────────────
  { letter:'I', term:'Incremental sync', slug:'incremental-sync', cat:'data', complexity:2,
    def:'Syncing only the records that have changed since the last sync run, rather than re-processing the entire dataset. Critical for large databases — instead of syncing 100,000 contacts hourly, sync only the 200 that changed.',
    related:['Sync','ETL','Change data capture'] },

  { letter:'I', term:'Intelligent document processing', slug:'intelligent-document-processing', cat:'ai', complexity:2,
    def:'AI-powered extraction and classification of data from unstructured documents at scale. PURIST builds IDP workflows that process hundreds of invoices, CVs, or contracts daily — extracting structured data with 95%+ accuracy without human review.',
    related:['Document processing','Claude AI','OCR'] },

  { letter:'I', term:'Internal tool automation', slug:'internal-tool-automation', cat:'ops', complexity:2,
    def:'Automating internal business tools — approval workflows, IT provisioning, access management, and internal reporting. Often the highest-ROI automation category because the same processes run daily but are invisible to customers.',
    related:['Business process automation','Slack automation','Integration'] },

  // ── Extended J ────────────────────────────────────────────────────────
  { letter:'J', term:'Jitter (retry)', slug:'jitter', cat:'architecture', complexity:3,
    def:'Adding a random delay to retry intervals to prevent multiple failed workflows from all retrying at exactly the same time — which would create a thundering herd that overwhelms the recovering API. Jitter spreads retries across a time window.',
    related:['Retry logic','Backoff','Rate limit'] },

  // ── Extended K ────────────────────────────────────────────────────────
  { letter:'K', term:'Kafka', slug:'kafka', cat:'architecture', complexity:3,
    def:'A distributed event streaming platform used for high-throughput, fault-tolerant data pipelines. At enterprise scale, Kafka ingests millions of events per second. PURIST uses Kafka-backed queues for clients with very high automation volumes.',
    related:['Message broker','Event bus','Queue'] },

  // ── Extended L ────────────────────────────────────────────────────────
  { letter:'L', term:'Last-mile automation', slug:'last-mile-automation', cat:'ops', complexity:2,
    def:'The final steps in a business process that are hardest to automate — usually requiring judgment, creativity, or relationship management. PURIST focuses on automating the first 80% of any process, freeing humans to focus on this last 20% where they add most value.',
    related:['Hand-off','Human-in-the-loop','Process mapping'] },

  { letter:'L', term:'Lazy evaluation', slug:'lazy-evaluation', cat:'architecture', complexity:3,
    def:'Deferring computation until the result is actually needed. In automation, lazy evaluation means not fetching enrichment data or running AI classification until a workflow branch is actually entered — avoiding wasted API calls on records that won\'t be processed.',
    related:['Performance','Branching','API Rate Limit'] },

  { letter:'L', term:'Lead routing', slug:'lead-routing', cat:'crm', complexity:1,
    def:'Automatically assigning incoming leads to the correct sales rep, team, or nurture sequence based on defined rules — geography, company size, industry, lead source, or lead score. Eliminates manual assignment and ensures instant follow-up.',
    stat:{ value:'78%', label:'of B2B buyers go with the vendor that responds first', source:'Harvard Business Review' },
    related:['Round-robin assignment','Lead scoring','CRM'] },

  { letter:'L', term:'Long-running workflow', slug:'long-running-workflow', cat:'architecture', complexity:3,
    def:'An automation that takes minutes, hours, or days to complete — waiting for human actions, external approvals, or scheduled events between steps. Requires persistent state management and careful handling of timeouts and failures.',
    related:['State management','Async','Wait / delay node'] },

  // ── Extended M ────────────────────────────────────────────────────────
  { letter:'M', term:'Manual trigger', slug:'manual-trigger', cat:'core', complexity:1,
    def:'Initiating a workflow by deliberate human action — pressing a button in a dashboard, making an API call, or running a CLI command. Manual triggers are useful for batch jobs, data migrations, and one-off operations that should not run automatically.',
    related:['Trigger','Scheduled trigger','Webhook'] },

  { letter:'M', term:'Memory (AI agent)', slug:'memory', cat:'ai', complexity:3,
    def:'An AI agent\'s ability to retain information across multiple interactions or workflow runs. Short-term memory persists within a single conversation; long-term memory stores facts in a vector database for retrieval in future interactions.',
    related:['AI Agent','Vector database','RAG'] },

  { letter:'M', term:'Modular design', slug:'modular-design', cat:'architecture', complexity:2,
    def:'Building workflows from small, reusable components rather than monolithic scripts. Modular automations are easier to test, debug, and update — changing one subworkflow propagates to every workflow that uses it, without touching them individually.',
    related:['Subworkflow','Reusability','Maintenance'] },

  // ── Extended N ────────────────────────────────────────────────────────
  { letter:'N', term:'Notion automation', slug:'notion-automation', cat:'platform', complexity:1,
    def:'Connecting Notion databases to automation workflows — creating pages on trigger, updating properties when CRM records change, or building weekly digest pages automatically. PURIST uses Notion as a lightweight knowledge base and operational dashboard for clients.',
    related:['Integration','Webhook','Database'] },

  { letter:'N', term:'Null handling', slug:'null-handling', cat:'data', complexity:2,
    def:'Gracefully managing missing or empty data fields without crashing the workflow. Example: if `contact.phone` is null, skip the SMS step and continue rather than failing the entire run. Every production workflow handles nulls explicitly.',
    related:['Guard clause','Error handling','Data quality'] },

  // ── Extended O ────────────────────────────────────────────────────────
  { letter:'O', term:'Observability', slug:'observability', cat:'architecture', complexity:2,
    def:'The ability to understand what is happening inside an automation system by examining its outputs — logs, metrics, and traces. High observability means any failure can be diagnosed quickly without guessing. PURIST builds observability into every deployment.',
    related:['Monitoring','Log aggregation','Tracing'] },

  { letter:'O', term:'Operator (workflow)', slug:'operator', cat:'ops', complexity:1,
    def:'The person or team responsible for running, monitoring, and maintaining deployed automations. PURIST acts as the automation operator for all clients — handling incidents, applying updates, and ensuring SLA compliance 24/7.',
    related:['Managed service','SLA','Monitoring'] },

  // ── Extended P ────────────────────────────────────────────────────────
  { letter:'P', term:'PandaDoc', slug:'pandadoc', cat:'platform', complexity:1,
    def:'A document automation platform for proposals, contracts, and e-signatures. PURIST integrates PandaDoc into sales workflows — a Won deal in CRM triggers proposal generation, sending, and notification on signature, with no manual document handling.',
    related:['Contract automation','Integration','CRM'] },

  { letter:'P', term:'Passthrough (data)', slug:'passthrough', cat:'data', complexity:1,
    def:'Forwarding data from a prior step to a later step without modification. In n8n, the "Keep Only Set" option controls which fields are passed through and which are discarded — keeping workflows clean and preventing unexpected data bleed between steps.',
    related:['Data mapping','n8n','Workflow'] },

  { letter:'P', term:'Payback period', slug:'payback-period', cat:'finance', complexity:1,
    def:'The time it takes for automation savings to exceed the cost of deployment. PURIST clients average a 4-month payback period — after which the automation delivers pure ROI indefinitely.',
    stat:{ value:'4 months', label:'average payback period for a PURIST automation deployment', source:'PURIST 2025' },
    related:['ROI','Unit economics','FTE'] },

  { letter:'P', term:'Permissions (API)', slug:'permissions', cat:'security', complexity:1,
    def:'The specific actions an API key or OAuth token is authorised to perform — read-only, write, delete, admin. Best practice: grant automation credentials only the minimum permissions required. An invoice automation should never have permission to delete contacts.',
    related:['API Key','OAuth','Authentication'] },

  { letter:'P', term:'Personalisation engine', slug:'personalisation-engine', cat:'ai', complexity:2,
    def:'A system that tailors content, recommendations, or communications to an individual based on their data. Claude AI in a workflow can generate genuinely personalised emails using CRM fields, purchase history, and behavioural signals — not just `{{firstName}}` merge tags.',
    related:['Claude AI','Email automation','Data enrichment'] },

  { letter:'P', term:'Pipe (Unix)', slug:'pipe', cat:'architecture', complexity:2,
    def:'A mechanism that connects the output of one process directly to the input of another. In automation philosophy, every step is a pipe — data flows through a series of transformations from trigger to final output, each step adding value.',
    related:['Data pipeline','Workflow','ETL'] },

  { letter:'P', term:'Postmark', slug:'postmark', cat:'platform', complexity:1,
    def:'A transactional email delivery service known for high deliverability and detailed analytics. PURIST uses Postmark for time-sensitive automation emails (invoices, confirmations, alerts) where guaranteed delivery is more important than bulk pricing.',
    related:['SMTP','Email automation','Deliverability'] },

  // ── Extended Q ────────────────────────────────────────────────────────
  { letter:'Q', term:'Queue consumer', slug:'queue-consumer', cat:'architecture', complexity:2,
    def:'A worker process that reads from a queue and processes each job. In n8n, the queue consumer polls a Redis queue for pending workflow jobs. Scaling means adding more consumers — each processes jobs in parallel, increasing throughput linearly.',
    related:['Queue','Concurrent execution','Load balancing'] },

  // ── Extended R ────────────────────────────────────────────────────────
  { letter:'R', term:'Rate limit backpressure', slug:'rate-limit-backpressure', cat:'architecture', complexity:3,
    def:'Slowing down the producer of a workflow (e.g., a data import) when the consumer is hitting rate limits. Prevents a fast data source from creating a backlog of failed API calls. Implemented via dynamic throttling rather than fixed delays.',
    related:['Rate limit','Throttling','Backoff'] },

  { letter:'R', term:'Record linkage', slug:'record-linkage', cat:'data', complexity:2,
    def:'Identifying and connecting records that refer to the same real-world entity across different systems. Example: "J. Smith" in HubSpot, "Jane Smith" in Xero, and "Jane A. Smith" in Slack are the same person — record linkage merges them into one unified profile.',
    related:['Deduplication','Data enrichment','Sync'] },

  { letter:'R', term:'Regex (Regular Expression)', slug:'regex', cat:'data', complexity:2,
    def:'A pattern-matching syntax for finding, extracting, and transforming text. In automation: extract invoice numbers from email subjects, validate UK postcode format, or parse log lines into structured fields. Regex is the power tool of text transformation.',
    insight:'One well-crafted regex can replace 50 lines of conditional string logic. Learn it once, use it everywhere.',
    related:['Formatting','Extraction','Custom code node'] },

  { letter:'R', term:'Remediation (automated)', slug:'remediation', cat:'ops', complexity:2,
    def:'Automatically fixing detected problems without human intervention. Example: if a workflow detects a failed payment, it automatically retries the charge, sends the customer a notification, and updates the CRM record — no human action required.',
    related:['Dunning','Error handling','Monitoring'] },

  { letter:'R', term:'Report automation', slug:'report-automation', cat:'reporting', complexity:1,
    def:'Automatically generating and distributing business reports on a schedule or trigger. PURIST builds report automations that compile data from 5–10 sources, format it, and email a PDF to leadership every Monday — replacing 4 hours of manual work.',
    stat:{ value:'4h', label:'saved weekly by automating a typical management report', source:'PURIST client data' },
    related:['Dashboard automation','KPI automation','Scheduled trigger'] },

  { letter:'R', term:'Reusability', slug:'reusability', cat:'architecture', complexity:2,
    def:'Designing workflow components that can be used across multiple automations. A reusable "send personalised email" subworkflow can be called from onboarding, dunning, and win-back workflows — maintained in one place, used everywhere.',
    related:['Subworkflow','Modular design','Workflow library'] },

  // ── Extended S ────────────────────────────────────────────────────────
  { letter:'S', term:'SendGrid', slug:'sendgrid', cat:'platform', complexity:1,
    def:'A cloud email platform used for transactional and marketing email in automation workflows. PURIST connects SendGrid to n8n workflows for invoice sending, onboarding sequences, and alert emails with full deliverability tracking.',
    related:['SMTP','Email automation','Postmark'] },

  { letter:'S', term:'Serverless', slug:'serverless', cat:'architecture', complexity:2,
    def:'Running code without managing a persistent server — functions execute on demand and scale automatically. PURIST uses serverless functions (AWS Lambda) for lightweight, infrequent custom operations alongside n8n\'s workflow engine.',
    related:['Cloud function','Microservice','Scalability'] },

  { letter:'S', term:'Sink (data)', slug:'sink', cat:'data', complexity:1,
    def:'The destination where data is written at the end of a workflow or pipeline. Common sinks: HubSpot CRM, Google Sheets, Xero, a database, or a Slack message. Every automation has at least one sink — where the processed data ends up.',
    related:['Data pipeline','ETL','Integration'] },

  { letter:'S', term:'Slack bot', slug:'slack-bot', cat:'platform', complexity:2,
    def:'A custom bot that interacts with team members in Slack — responding to commands, posting notifications, and accepting approvals. PURIST builds Slack bots connected to n8n: team members type `/create-invoice` and the automation handles the rest.',
    related:['Slack automation','Integration','Human-in-the-loop'] },

  { letter:'S', term:'Snapshot (data)', slug:'snapshot', cat:'data', complexity:2,
    def:'A point-in-time copy of data captured by an automation for reporting or comparison. Example: a weekly snapshot of all open deals in the CRM allows trend analysis — you can see how the pipeline grew or shrank week-over-week.',
    related:['Reporting','Data pipeline','Scheduled trigger'] },

  { letter:'S', term:'Source of truth', slug:'source-of-truth', cat:'data', complexity:1,
    def:'The single system designated as the authoritative record for a given data type. In automation, defining the source of truth prevents sync conflicts — if HubSpot is the source of truth for contacts, all other systems sync FROM it, not to it.',
    related:['Sync','Data quality','Integration'] },

  { letter:'S', term:'Streaming (data)', slug:'streaming', cat:'architecture', complexity:3,
    def:'Processing data continuously as it arrives rather than in batches. Event streams from Kafka or AWS Kinesis allow automations to process millions of small events per second — essential for real-time inventory, pricing, and fraud detection.',
    related:['Real-time processing','Kafka','Event bus'] },

  // ── Extended T ────────────────────────────────────────────────────────
  { letter:'T', term:'Task queue', slug:'task-queue', cat:'architecture', complexity:2,
    def:'A managed list of pending automation tasks with priority, retry, and scheduling support. PURIST uses Redis-backed task queues to handle bursts of incoming work — when 500 new leads arrive at once, they queue for orderly CRM creation without overloading the API.',
    related:['Queue','Job queue','Priority queue'] },

  { letter:'T', term:'Tenant isolation', slug:'tenant-isolation', cat:'architecture', complexity:3,
    def:'Ensuring that data and workflows from one client cannot be accessed or affected by another in a multi-tenant environment. PURIST enforces tenant isolation through separate n8n instances, database schemas, and credential scopes.',
    related:['Multi-tenant','Data sovereignty','Security'] },

  { letter:'T', term:'Tool use (AI)', slug:'tool-use', cat:'ai', complexity:3,
    def:'The ability of an AI model to call external functions and APIs to complete tasks. Claude AI with tool use can check a CRM, run a calculation, look up a shipping status, and send a Slack message — all within a single agentic workflow step.',
    related:['AI Agent','Claude AI','Function call'] },

  { letter:'T', term:'Transaction (atomic)', slug:'transaction', cat:'architecture', complexity:3,
    def:'A set of operations that either all succeed or all fail together — no partial states. In payment automation, the charge, the invoice creation, and the CRM update must either all succeed or all roll back — preventing a world where a client is charged but never invoiced.',
    related:['Idempotency','Error handling','Payment automation'] },

  { letter:'T', term:'Trigger chain', slug:'trigger-chain', cat:'core', complexity:2,
    def:'A sequence where the output of one workflow becomes the trigger of the next, creating a cascade of automated actions. A signed contract triggers onboarding, which triggers provisioning, which triggers a kickoff calendar invite — each link autonomous.',
    related:['Chain','Subworkflow','Event-driven automation'] },

  // ── Extended U ────────────────────────────────────────────────────────
  { letter:'U', term:'Upsert', slug:'upsert', cat:'data', complexity:2,
    def:'A database operation that inserts a new record if it doesn\'t exist, or updates it if it does. Critical in sync workflows — rather than checking for existence first (two API calls), an upsert does it in one. Prevents duplicates and handles updates automatically.',
    related:['Sync','Deduplication','CRM'] },

  { letter:'U', term:'User-initiated automation', slug:'user-initiated-automation', cat:'core', complexity:1,
    def:'A workflow triggered by an end user action in a product or interface — clicking a button, submitting a form, or reaching a milestone. The user initiates; the automation handles everything downstream without further human involvement.',
    related:['Trigger','Form automation','Event-driven automation'] },

  // ── Extended V ────────────────────────────────────────────────────────
  { letter:'V', term:'Value mapping', slug:'value-mapping', cat:'data', complexity:1,
    def:'Converting coded values from one system\'s format to another\'s. Example: HubSpot uses `deal_stage: "closedwon"` while Xero needs `status: "PAID"`. A value map translates between them automatically in the integration layer.',
    related:['Data mapping','Integration','Transformation function'] },

  { letter:'V', term:'Visibility (workflow)', slug:'visibility', cat:'ops', complexity:1,
    def:'The ability to see what automations are running, what they are doing, and how they are performing — in real time. PURIST\'s client dashboard provides full workflow visibility: executions, run times, error rates, and data volumes at a glance.',
    related:['Monitoring','Observability','Dashboard automation'] },

  // ── Extended W ────────────────────────────────────────────────────────
  { letter:'W', term:'Watermark (data)', slug:'watermark', cat:'data', complexity:2,
    def:'A tracking marker that records the last successfully processed record in a data stream. Used in incremental sync workflows — the watermark (e.g., a timestamp or record ID) ensures the next run picks up from where the last one stopped, not from the beginning.',
    related:['Incremental sync','Cursor','ETL'] },

  { letter:'W', term:'Webhook receiver', slug:'webhook-receiver', cat:'core', complexity:1,
    def:'The URL that accepts incoming webhook data. In n8n, every webhook trigger creates a unique receiver URL. PURIST configures webhook receivers with signature validation, rate limiting, and logging — making them production-grade entry points.',
    related:['Webhook','Webhook security','n8n'] },

  { letter:'W', term:'Workflow documentation', slug:'workflow-documentation', cat:'ops', complexity:1,
    def:'Written descriptions of what each automation does, how it is triggered, what systems it touches, and what errors it handles. PURIST documents every client workflow — so that after 12 months, anyone can understand and modify it without reverse-engineering it.',
    insight:'Undocumented automations are time bombs. The person who built them leaves, and the business loses the knowledge.',
    related:['Knowledge base','Managed service','Version control'] },

  { letter:'W', term:'Workflow orchestration', slug:'workflow-orchestration', cat:'architecture', complexity:2,
    def:'Coordinating multiple workflows to achieve a complex multi-step business outcome. Example: a new client onboarding orchestrates 12 separate automations — CRM setup, tool provisioning, Slack channel creation, invoice generation, and email sequences — in the right order.',
    related:['Orchestration','Subworkflow','Trigger chain'] },

  // ── Extended X ────────────────────────────────────────────────────────
  { letter:'X', term:'XML (Extensible Markup Language)', slug:'xml', cat:'data', complexity:2,
    def:'A data format used by older APIs and enterprise systems (SAP, Salesforce SOAP API). Less common than JSON but still encountered when integrating with legacy ERP, banking, or government systems. PURIST includes XML parsing in workflows that touch legacy infrastructure.',
    related:['JSON','Integration','ETL'] },

  // ── Extended Y ────────────────────────────────────────────────────────
  { letter:'Y', term:'Yield (workflow)', slug:'yield', cat:'architecture', complexity:3,
    def:'A point in a long-running workflow where execution pauses and control is returned to the scheduler — allowing other workflows to run before resuming. Prevents any single workflow from monopolising compute resources in a shared environment.',
    related:['Long-running workflow','State management','Queue'] },
];
