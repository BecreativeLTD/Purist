# PURIST Brand Reel — Storyboard

**Message:** Your business runs itself — PURIST automates the manual work that's costing you hours every week.
**Arc:** Problem → Relief → Proof → Stack → ROI → Brand Close
**Audience:** Founders, operators, agency owners — scrolling Instagram/TikTok Stories
**Brand voice:** Calm confidence. Premium. No fluff. Numbers over claims.
**Format:** Portrait 1080×1920
**Duration:** 45 seconds
**Narration:** Full voice-off
**Pacing:** Arc — slow opener → building middle → punchy stats peak → resolved close

---

## Asset Audit

**USE:**
- `capture/assets/your-business-runs-itself-you-focus-on-g.svg` — hero brand illustration, Beat 2
- `capture/assets/svgs/logo-0.svg` — PURIST wordmark, Beat 2 + Beat 6
- `capture/assets/n8n-hd.svg` — integration logo ticker, Beat 3
- `capture/assets/anthropic.svg` — integration logo ticker, Beat 3
- `capture/assets/hubspot.svg` — integration logo ticker, Beat 3
- `capture/assets/slack.svg` — integration logo ticker, Beat 3
- `capture/assets/stripe.svg` — integration logo ticker, Beat 3
- `capture/assets/shopify.svg` — integration logo ticker, Beat 3
- `capture/assets/notion.svg` — integration logo ticker, Beat 3
- `capture/assets/the-full-stack-packaging.svg` — service card visual, Beat 4

**SKIP:**
- Contact sheets, scroll screenshots — never in compositions
- Avatar SVGs (alex-drummond, etc.) — wrong energy for brand reel pace
- og-image.png — too low quality / generic
- favicon.svg — too small

---

## Beat 1 — THE PROBLEM (0–7s)

**What it communicates:** You're losing hours every week to manual work.

**Visual:** Near-black canvas (`#0A0A0A`). Center-aligned column of task labels in Inter 500, appearing and disappearing with a fast stagger — each word lands, holds 0.4s, exits up. Tasks: "Scheduling" → "Invoicing" → "Lead capture" → "Reporting" → "Follow-ups" → "Data entry". After the last label, all exit and a single line lands in Fraunces italic 400: *"Still doing this manually?"* Rose petal `#E8B4B0` color, held 1.5s.

**Techniques:**
1. **Kinetic word swap** — each label fades in (opacity 0→1, y +12→0, 0.25s ease-out), holds, then exits up (y 0→-12, opacity 1→0, 0.2s ease-in). GSAP timeline with fromTo sequences.
2. **Exit stagger** — all labels clear simultaneously on a hard cut, replaced by the Fraunces italic close line.
3. **Rose petal accent text** — color `#E8B4B0`, slight letter-spacing 0.02em.

**Narration (0–7s):**
> *"Your team is spending hours every week on work that should never touch a human. Scheduling. Invoicing. Lead capture. Reporting. Chasing."*

**Transition:** Hard cut to Beat 2.

---

## Beat 2 — THE REVEAL (7–14s)

**What it communicates:** PURIST is the solution — workflow automation + AI agents.

**Visual:** Warm cream background (`#F8F6F1`). The PURIST wordmark SVG (`svgs/logo-0.svg`) draws in from center — scale 0.85→1.0 + opacity 0→1, 0.6s ease-out. Below it, two lines appear with stagger (0.3s between each):
- Line 1: "Workflow Automation" — Inter 500, 18px, `rgba(10,10,10,0.50)`
- Line 2: "AI Agents" — Inter 500, 18px, `rgba(10,10,10,0.50)`
Then the hero illustration `your-business-runs-itself-you-focus-on-g.svg` slides in from the bottom (y +60→0, opacity 0→1, 0.7s ease-out) and sits below, filling ~70% width.

**Techniques:**
1. **SVG scale + opacity entrance** — wordmark appears with gentle spring scale from 0.85.
2. **Staggered text reveal** — two sub-labels appear sequentially with Inter, muted opacity.
3. **Illustration slide-up** — hero SVG enters from bottom.

**Narration (7–14s):**
> *"PURIST deploys n8n workflows and Claude AI agents that handle all of it — automatically, in days."*

**Transition:** Cross-fade 0.4s to Beat 3 (dark).

---

## Beat 3 — SOCIAL PROOF (14–22s)

**What it communicates:** 500+ businesses trust PURIST — real numbers, real uptime.

**Visual:** Dark canvas (`#0A0A0A`). Three stat blocks appear with a vertical stagger (0.25s apart), each in a pill card (`rgba(255,255,255,0.04)` bg, `1px solid rgba(255,255,255,0.08)` border, 18px radius, 20px 28px padding):
- **"500+"** — Fraunces 72px weight 400 `#FFFFFF`, label below: "businesses automated" Inter 13px `rgba(255,255,255,0.45)`
- **"14h"** — Fraunces 72px `#E8B4B0`, label: "saved per week, avg." Inter 13px `rgba(255,255,255,0.45)`
- **"99.97%"** — Fraunces 72px `#4ADE80`, label: "uptime SLA" Inter 13px `rgba(255,255,255,0.45)`

Below all three, a horizontal ticker scrolls integration logos at 20px/s (infinite loop): n8n · Anthropic · HubSpot · Slack · Stripe · Shopify · Notion · … each 28px height, `opacity: 0.55`, spaced 32px apart.

**Techniques:**
1. **Staggered card entrance** — each stat block: y +24→0, opacity 0→1, 0.4s ease-out, stagger 0.25s.
2. **Counter animation** — each number counts up from 0 using GSAP `tl.set` / `tl.to` on a JS counter object, snapped to integer. "500+" counts 0→500, "14" counts 0→14, "99.97" counts 0→99.97.
3. **Logo ticker** — CSS `@keyframes ticker` translateX(0→-50%), duplicated set for seamless loop, `will-change: transform`.

**Narration (14–22s):**
> *"Over five hundred businesses automated. Fourteen hours saved per week, on average. Ninety-nine-point-nine-seven percent uptime."*

**Transition:** Hard cut to Beat 4 (light).

---

## Beat 4 — THE STACK (22–30s)

**What it communicates:** 400+ integrations — your entire stack, connected.

**Visual:** Warm cream (`#F8F6F1`). Eyebrow label appears first: "400+ NODES · YOUR ENTIRE STACK" — Inter 10px weight 600, uppercase, letter-spacing 0.14em, `rgba(10,10,10,0.35)`. Then a 3-column grid of integration category chips animates in with a fast stagger (0.08s between each chip):
- Chips: "CRM & Sales" · "Payments" · "Email" · "Documents" · "AI & LLMs" · "E-commerce" · "Project Mgmt" · "Scheduling" · "DevOps"
- Each chip: `background: rgba(232,180,176,0.10)`, `border: 1px solid rgba(196,132,126,0.20)`, `border-radius: 9999px`, `padding: 7px 14px`, Inter 12px 500, `#0A0A0A`.

Below the chip grid, the `the-full-stack-packaging.svg` fades in at 30% opacity as a decorative depth layer, slightly oversized (110% width), centered, `blur(1px)`.

**Techniques:**
1. **Eyebrow reveal** — opacity 0→1, 0.3s ease-out, appears 0.1s before chips.
2. **Chip stagger waterfall** — 9 chips, each: scale 0.9→1.0 + opacity 0→1, 0.25s ease-out, stagger 0.08s.
3. **Depth SVG wash** — background SVG at 30% opacity, `filter: blur(1px)`, fades in at 0.6s ease.

**Narration (22–30s):**
> *"We connect your entire stack — CRM, payments, email, documents, AI — four hundred integrations, all running together."*

**Transition:** Cross-fade 0.4s to Beat 5 (dark).

---

## Beat 5 — THE ROI (30–38s)

**What it communicates:** Clients see 9.4× ROI. Deployed in days, not months.

**Visual:** Dark canvas (`#0A0A0A`). Single large number dominates the vertical center:
- "9.4×" — Fraunces 140px weight 400, Forest Green `#4ADE80`. Counts up from 0× to 9.4× with 2 decimal precision.
- Below it: "return on investment" — Inter 16px 400, `rgba(255,255,255,0.45)`
- 32px below: a horizontal rule — `1px solid rgba(255,255,255,0.08)`, width 120px, centered
- Below the rule: "Deployed in 5–10 business days." — Inter 14px 500, `rgba(232,180,176,0.80)`

Small badge bottom-center (appears at 1.5s): `background: rgba(45,80,22,0.15)`, `border: 1px solid rgba(45,80,22,0.25)`, border-radius 9999px, padding 6px 16px: "30-day money-back guarantee" in Inter 11px 500, Forest Green `#2D5016`.

**Techniques:**
1. **Large counter entrance** — number fades in (opacity 0→1, scale 0.92→1.0, 0.6s spring ease), then JS counter runs 0→9.4 over 1.8s with easeOut.
2. **Staggered sub-lines** — rule + deployment line + badge appear sequentially 0.3s apart.
3. **Glow pulse** — subtle radial gradient behind the number: `rgba(74,222,128,0.08)` expanding 0→100% over 2s, held, gentle pulse on loop.

**Narration (30–38s):**
> *"The average client sees a nine-point-four times return on investment — in under two months. Deployed in five to ten business days, guaranteed."*

**Transition:** Slow fade to black (0.8s) → Beat 6.

---

## Beat 6 — THE CLOSE (38–45s)

**What it communicates:** Your business runs itself. Visit purist.online.

**Visual:** Warm cream (`#F8F6F1`). Fade up from black.
- PURIST wordmark (`svgs/logo-0.svg`) appears top-center — small, 140px wide, `opacity: 0.7`.
- 48px below: large Fraunces headline in two lines, weight 400, 52px, `#0A0A0A`, centered:
  *"Your business*
  *runs itself."*
  Italic on *"runs itself."* — Fraunces italic 400.
- 32px below: "purist.online" — Inter 13px 500, `rgba(10,10,10,0.40)`, letter-spacing 0.06em.
- 24px below: CTA badge — black pill, `background: #0A0A0A`, `border-radius: 9999px`, `padding: 12px 24px`: "Book a free audit →" Inter 13px 500 `#F8F6F1`.

Everything fades in together (opacity 0→1, y +16→0, 0.7s ease-out), wordmark first, then headline (0.2s delay), then URL + CTA (0.5s delay).

**Techniques:**
1. **Fade-up entrance sequence** — wordmark → headline → URL/CTA, each staggered 0.2s.
2. **Italic Fraunces close** — "runs itself." in Fraunces italic for editorial weight, distinct from the regular-weight display above.
3. **Hold** — entire beat holds static for 3s (no animation) before the video ends — gives the viewer time to read the URL and CTA.

**Narration (38–45s):**
> *"Your business runs itself. You focus on growth. Purist dot online."*

---

## Narration Script — Full

> *"Your team is spending hours every week on work that should never touch a human. Scheduling. Invoicing. Lead capture. Reporting. Chasing.*
>
> *PURIST deploys n8n workflows and Claude AI agents that handle all of it — automatically, in days.*
>
> *Over five hundred businesses automated. Fourteen hours saved per week, on average. Ninety-nine-point-nine-seven percent uptime.*
>
> *We connect your entire stack — CRM, payments, email, documents, AI — four hundred integrations, all running together.*
>
> *The average client sees a nine-point-four times return on investment — in under two months. Deployed in five to ten business days, guaranteed.*
>
> *Your business runs itself. You focus on growth. Purist dot online."*

---

## Timing Map

| Beat | Start | End  | Duration | Key animation |
|------|-------|------|----------|---------------|
| 1    | 0s    | 7s   | 7s       | Kinetic word swap → Fraunces italic close |
| 2    | 7s    | 14s  | 7s       | Wordmark reveal + hero SVG slide-up |
| 3    | 14s   | 22s  | 8s       | Stat counters + logo ticker |
| 4    | 22s   | 30s  | 8s       | Chip waterfall + depth SVG wash |
| 5    | 30s   | 38s  | 8s       | Giant counter + glow pulse + sub-lines |
| 6    | 38s   | 45s  | 7s       | Fade-up sequence + 3s hold |
