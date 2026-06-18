# PURIST — Done-For-You AI Automation for Service Businesses

**Website:** [purist.online](https://purist.online)

PURIST is a done-for-you AI automation agency that builds, deploys, and maintains intelligent workflow systems for service businesses — law firms, dental clinics, real estate agencies, accountants, coaches, and consultants. Every system runs on **n8n** (open-source workflow engine) with **Claude AI** (Anthropic) as the reasoning layer, giving clients enterprise-grade automation without writing a single line of code.

---

## The Problem PURIST Solves

Service businesses waste 40–60% of their operational capacity on repetitive, manual tasks:

- Following up with leads who filled out a form but never booked
- Manually sending invoices and chasing payments
- Copying data from emails into CRMs
- Generating the same weekly reports every Monday morning
- Answering the same 12 questions via WhatsApp, email, and phone simultaneously
- Onboarding new clients with the same packet of documents every time

Each of these tasks takes 2–15 minutes individually. Across a team of 8 people, this adds up to **31 hours of lost productivity per week**. PURIST eliminates that waste entirely.

---

## What PURIST Builds

### 1. Lead Capture & Follow-Up Automation
Every new lead — whether from a form, email, WhatsApp, or phone call — is instantly captured, scored, and entered into an automated follow-up sequence. The system sends personalized SMS and email follow-ups within 90 seconds of the initial contact, improving lead-to-booking conversion by an average of 3×.

### 2. Client Onboarding Workflows
New client signed? The system automatically sends the welcome packet, schedules the intake call, creates the client folder in Google Drive or SharePoint, and notifies the responsible team member — all without human intervention.

### 3. Invoice & Payment Automation
Integrates with Stripe, QuickBooks, Xero, and FreshBooks to auto-generate invoices, send payment reminders at configurable intervals, and log payments back to the CRM. Overdue accounts trigger escalation workflows automatically.

### 4. AI-Powered Email & Communication Triage
Claude AI reads incoming emails, classifies them by intent (new lead, support request, billing question, complaint), drafts a personalized response for team review, and routes urgent messages to the right person via Slack or SMS — all within seconds of receipt.

### 5. Reporting & Analytics Automation
Every Monday morning, clients receive a detailed operational report covering lead volume, pipeline status, revenue collected, tasks completed, and upcoming appointments — automatically compiled from their connected tools and formatted as a PDF.

### 6. Appointment & Calendar Management
Integrates with Calendly, Google Calendar, and Outlook to send confirmation emails, reminder SMS at configurable intervals (24h, 2h, 30min before), and follow-up messages post-appointment.

### 7. Custom Workflow Design
For complex or bespoke requirements, PURIST designs custom n8n workflows from scratch, covering multi-step decision logic, conditional branching, error handling, and retry mechanisms.

---

## How It Works

```
Trigger → n8n Workflow → Claude AI Layer → Action → Confirmation
```

1. **Trigger**: Any event in your stack — form submission, email received, payment completed, calendar booking, API webhook, scheduled job, or manual trigger
2. **n8n Workflow**: Routes the trigger through a series of configured steps, transforming, filtering, and enriching the data
3. **Claude AI Layer**: Where reasoning is required (drafting a response, classifying intent, extracting structured data from free text, making routing decisions), Claude AI is called with a structured prompt and returns a validated JSON response
4. **Action**: The workflow executes the output — sends an email, creates a CRM record, posts a Slack message, generates a PDF, fires a webhook
5. **Confirmation**: Every action is logged, and the client receives a real-time dashboard showing workflow execution history, success rates, and latency

---

## Technical Architecture

### Workflow Engine: n8n
- **Self-hosted on n8n Cloud** for enterprise reliability and data privacy
- **400+ native integrations** (nodes) covering CRMs, email providers, payment processors, communication tools, databases, and APIs
- Visual workflow builder with version control and rollback
- Production-grade error handling with configurable retry logic and dead-letter queues
- Webhook support for real-time event triggers from any external system

### AI Layer: Claude AI (Anthropic)
- **Model**: Claude Opus / Sonnet depending on task complexity and latency requirements
- **Structured output enforcement**: Every Claude call uses Anthropic's tool-use feature with a defined JSON schema, eliminating parsing errors in production
- **RAG (Retrieval-Augmented Generation)**: For workflows requiring business-specific knowledge, a vector database is populated with the client's documentation and queried at inference time
- **Confidence scoring**: Production agents include a confidence score in their structured response; low-confidence outputs are routed to human review rather than auto-sent
- **Average latency**: ~80–200ms for Claude inference calls within a workflow

### Infrastructure
- **Vercel Edge** for web delivery (94/100 mobile PageSpeed, 100/100 desktop)
- **Supabase** for client authentication, lead capture, and operational data storage
- **Twilio** for SMS and WhatsApp automation
- **Stripe** for payment processing integration
- **PostgreSQL** for workflow state and audit logs

---

## Integration Ecosystem

PURIST workflows connect with 400+ tools across every category:

| Category | Key Integrations |
|---|---|
| **CRM** | HubSpot, Salesforce, Pipedrive, Monday.com, Notion |
| **Email** | Gmail, Outlook, Mailchimp, ActiveCampaign, Klaviyo |
| **Communication** | Slack, WhatsApp (Twilio), SMS, Intercom |
| **Payments** | Stripe, GoCardless, Square, PayPal |
| **Accounting** | QuickBooks, Xero, FreshBooks |
| **Calendar** | Google Calendar, Outlook, Calendly, Acuity |
| **Storage** | Google Drive, SharePoint, Dropbox, OneDrive |
| **AI / LLM** | Claude (Anthropic), OpenAI, Mistral |
| **Databases** | Supabase, Airtable, PostgreSQL, MySQL, Redis |
| **Project Management** | Asana, Trello, Jira, ClickUp |
| **Webhooks / APIs** | Any REST or GraphQL API |

---

## Plans & Pricing

### Foundation
Single workflow system for one core business process. Ideal for businesses automating their first pain point.

### Growth
Up to 5 connected workflow systems with Claude AI integration. Covers the full lead-to-client lifecycle.

### Scale
Unlimited workflows, custom AI agents, dedicated support, and monthly optimization reviews.

All plans include initial build, deployment, testing, documentation, and 30 days of monitoring.

---

## Performance Benchmarks

| Metric | Value |
|---|---|
| Average workflow execution time | 127ms |
| System uptime (30-day rolling) | 99.97% |
| Lead response time (automated) | < 90 seconds |
| PageSpeed mobile | 94/100 |
| PageSpeed desktop | 100/100 |
| Average hours saved per client/week | 31 hours |

---

## Website Tech Stack

This repository contains the marketing website for PURIST, built with:

- **[Astro](https://astro.build)** — static-first framework with island architecture for maximum performance
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first CSS with custom brand design tokens
- **[Fraunces](https://fonts.google.com/specimen/Fraunces)** — display serif for headings (self-hosted)
- **[Inter](https://rsms.me/inter/)** — sans-serif for body text (self-hosted)
- **[Vercel](https://vercel.com)** — CI/CD and edge deployment
- **[Supabase](https://supabase.com)** — auth and database for lead capture

### Design System Tokens

Defined in `tailwind.config.mjs`:

| Token | Description |
|---|---|
| `brand-black` | #0A0A0A — primary text and backgrounds |
| `brand-cream` | #F8F6F1 — off-white backgrounds |
| `brand-pink` | #E8B4B0 — accent / CTA color |
| `brand-green` | #4ADE80 — success / live indicators |
| `font-display` | Fraunces Variable (serif) |
| `font-sans` | Inter Variable |
| `rounded-card` | 16px — card border radius |
| `rounded-button` | 8px — button border radius |

### Project Structure

```
src/
├── pages/              # All routes (/index, /pages/science, /collections, /blog/*)
├── layouts/            # BaseLayout with SEO, fonts, and analytics
├── components/
│   ├── layout/         # Header, Footer, AnnouncementBar
│   ├── sections/       # All page sections (Hero, LiveOps, ROICalculator, etc.)
│   └── ui/             # Button, Card, and primitive components
├── data/               # JSON content files (plans, integrations, ROI data, blog)
├── styles/             # global.css with base styles and component classes
└── lib/                # Utilities (supabase client, helpers)
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

The site deploys automatically to Vercel on every push to `main`. Environment variables (Supabase keys, API keys) are managed via Vercel's environment variable system and are never stored in the repository.

```bash
# Trigger a production deployment
git push origin main
```

---

## SEO & Content Strategy

The site targets service business owners searching for:
- "AI automation for small business"
- "n8n automation agency"
- "done for you automation"
- "AI workflow automation service"
- "automate business processes without code"
- "Claude AI business automation"

The `/blog` section contains long-form technical content explaining how PURIST systems work in production, covering topics like structured output enforcement, RAG pipelines, confidence scoring, and real-world case studies.

---

## Security

- All API keys and secrets are stored as Vercel environment variables — never in source code
- `.env` files are excluded from version control via `.gitignore`
- Supabase Row Level Security (RLS) enforced on all client data tables
- Authentication handled by Supabase Auth with JWT session tokens
- No sensitive business data is stored in this repository

---

## License

Marketing website code: MIT. The PURIST brand, copy, and service delivery methodology are proprietary.
