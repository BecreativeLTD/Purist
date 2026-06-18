# PURIST — AI Automation for Service Businesses

**[purist.online](https://purist.online)**

PURIST delivers done-for-you AI automation systems built on n8n + Claude AI. We handle lead capture, follow-up, client onboarding, reporting, and operations — so service businesses can scale without hiring.

## What PURIST does

- **Workflow automation** — n8n-powered workflows connecting your entire stack (CRM, email, Slack, Stripe, Twilio, and 400+ integrations)
- **Claude AI layer** — intelligent routing, email drafting, sentiment analysis, and decision-making baked into every workflow
- **Live ops monitoring** — real-time dashboard showing active workflows, event throughput, and system health
- **Done-for-you delivery** — PURIST builds, deploys, and maintains the automation. No code required from the client.

## Tech stack

- **Astro** — static-first framework for fast page loads (94/100 mobile PageSpeed)
- **Tailwind CSS** — design system with custom brand tokens
- **n8n** — open-source workflow automation engine (400+ nodes)
- **Claude AI (Anthropic)** — AI reasoning layer for intelligent automation
- **Vercel** — edge deployment + CI/CD
- **Supabase** — database + auth for lead capture and client data

## Project structure

```
src/
├── pages/          # routes (index, /pages/science, /collections, etc.)
├── layouts/        # BaseLayout
├── components/     # layout, sections, ui
├── data/           # JSON content (plans, integrations, ROI data, etc.)
├── styles/         # global.css with design tokens
└── lib/            # utilities
```

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Deploy

Deployed on Vercel. Push to `main` triggers production deployment automatically.
