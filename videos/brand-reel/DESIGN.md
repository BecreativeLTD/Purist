# PURIST Brand Cheat Sheet

## 1. Visual Theme

PURIST lives in a world of calm confidence. The brand alternates between near-black (`#0A0A0A`) and warm off-white (`#F8F6F1`) — never pure white, never cold grey. The signature accent is a muted rose-petal (`#E8B4B0`) that signals precision without aggression. Forest green (`#2D5016`) carries authority and ROI language. Typography is almost always set at weight 400 — hierarchy comes from size, not boldness. The mood is "premium ops infrastructure, no fluff" — Fraunces for editorial authority in headlines, Inter for crisp operational clarity in body. Distinctive: the brand never shouts; every design choice is subtractive.

---

## 2. Quick Reference

### Colors

- **PURIST Black** (`#0A0A0A`): Primary dark surface, primary text on light surfaces
  - As text on Warm Cream: 17.2:1 ✅ — As text on Pure White: 19.6:1 ✅
- **Warm Cream** (`#F8F6F1`): Primary page background, hero sections
  - As surface: pair with PURIST Black text ✅
- **Pure White** (`#FFFFFF`): Card surfaces, pricing section backgrounds
- **Rose Petal** (`#E8B4B0`): Primary brand accent — CTAs, highlights, warm emphasis
  - On PURIST Black: 4.6:1 ✅ — On Warm Cream: 2.1:1 ❌ — **On Warm Cream use Rust (`#c4847e`) instead: 3.7:1 ⚠ use at 18px+ only**
- **Rust** (`#c4847e`): Rose Petal on light surfaces — secondary accent, hover states
- **Forest Green** (`#2D5016`): ROI signals, savings stats, success states
  - On Warm Cream: 5.1:1 ✅ — On Pure White: 6.2:1 ✅ — On PURIST Black: 2.4:1 ❌ use `#4ADE80` instead
- **Neon Green** (`#4ADE80`): Success/live indicators on dark surfaces only
  - On PURIST Black: 9.8:1 ✅
- **Mid Grey** (`#E5E7EB`): Borders, dividers on light surfaces
- **Dim White** (`rgba(255,255,255,0.28)`): Secondary text on dark surfaces
  - On PURIST Black: ~4.5:1 ✅ (borderline — use 0.45 opacity for safety at small sizes)

### Fonts

- **Display (headlines):** `"Fraunces"` — variable, weight range 100–900, opsz axis
  - Normal: `capture/assets/fonts/fraunces-latin-opsz-normal.DihXLNYH.woff2`
  - Italic: `capture/assets/fonts/fraunces-latin-opsz-italic.lSdLDfvT.woff2`
  - Use `font-variation-settings: 'wght' 400, 'opsz' 144` for large display sizes
- **Body / UI:** `"Inter"` — variable, weight range 100–900
  - 400: `capture/assets/fonts/inter-latin-standard-normal.BwkfbSeq.woff2`
  - Use `font-variation-settings: 'wght' 500` for labels, `'wght' 600` for strong emphasis
- **Fallback:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**`@font-face` block (copy verbatim into every composition):**

```css
@font-face {
  font-family: "Fraunces";
  src: url("../../capture/assets/fonts/fraunces-latin-opsz-normal.DihXLNYH.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: "Fraunces";
  src: url("../../capture/assets/fonts/fraunces-latin-opsz-italic.lSdLDfvT.woff2") format("woff2");
  font-weight: 100 900;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: "Inter";
  src: url("../../capture/assets/fonts/inter-latin-standard-normal.BwkfbSeq.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: block;
}
```

**Type scale:**
- Display XL: Fraunces 64px / weight 400 / line-height 1.05
- Display L: Fraunces 56px / weight 400 / line-height 1.08
- Display M: Fraunces 38px / weight 400 / line-height 1.1
- H3: Inter 24px / weight 400
- Body: Inter 14–16px / weight 400
- Label/Caption: Inter 11–13px / weight 500–600 / tracking 0.06–0.18em uppercase

---

## 3. Component Stylings

#### Primary CTA Button
- **Background:** `#0A0A0A`
- **Text:** `#F8F6F1` / Inter 14px / weight 500
- **Padding:** `14px 24px`
- **Border-radius:** `9999px` (pill)
- **Border:** none
- **Hover:** background `#1a1a1a`

#### Secondary / Ghost Button
- **Background:** transparent
- **Text:** `#0A0A0A` / Inter 13px / weight 500
- **Border:** `1px solid rgba(10,10,10,0.15)`
- **Border-radius:** `9999px`
- **Padding:** `12px 20px`

#### Feature Card (light surface)
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E5E7EB`
- **Border-radius:** `18px`
- **Padding:** `28px`
- **Box-shadow:** `0 1px 3px rgba(0,0,0,0.04)`

#### Feature Card (dark surface)
- **Background:** `rgba(255,255,255,0.04)`
- **Border:** `1px solid rgba(255,255,255,0.08)`
- **Border-radius:** `18px`
- **Padding:** `28px`

#### Stat / KPI Pill
- **Background:** `rgba(232,180,176,0.10)`
- **Border:** `1px solid rgba(232,180,176,0.20)`
- **Border-radius:** `9999px`
- **Padding:** `6px 14px`
- **Text:** Rose Petal `#E8B4B0` / Inter 11px / weight 600 / uppercase tracking-wide

#### ROI / Savings Badge
- **Background:** `rgba(45,80,22,0.12)`
- **Border:** `1px solid rgba(45,80,22,0.20)`
- **Border-radius:** `9999px`
- **Text:** Forest Green `#2D5016` / Inter 11px / weight 600

#### Section Label (eyebrow)
- **Text:** Inter 10–11px / weight 600 / uppercase / letter-spacing 0.14em
- **Color on dark:** `rgba(232,180,176,0.70)` (Rose Petal dim)
- **Color on light:** `rgba(10,10,10,0.40)`

---

## 4. Spacing & Layout

**Base unit:** `4px`

| Token | Value  | Used for                                    |
|-------|--------|---------------------------------------------|
| xs    | `4px`  | Icon gaps, badge padding                    |
| sm    | `8px`  | Inline gaps, tight padding                  |
| md    | `16px` | Card internal padding, form gaps            |
| lg    | `28px` | Card padding, component separation          |
| xl    | `48px` | Section inner padding                       |
| 2xl   | `80px` | Section-to-section gaps                     |
| 3xl   | `120px`| Hero top/bottom breathing room              |

**Border-radius scale:**
- `6px`: Input fields, small chips
- `12px`: Small cards, inline badges
- `18px`: Feature cards, larger containers
- `24px`: Large panels
- `9999px`: Pill buttons, status chips

**Whitespace philosophy:** Generous. PURIST uses negative space as a confidence signal — sections breathe with 80–120px vertical gaps. Portrait compositions should maintain 40px minimum horizontal margin. Nothing is crowded.

---

## 5. Iteration Guide

1. **Dark sections use `#0A0A0A` (not black, not `#000`)** as background. All text is `rgba(255,255,255,0.85)` for primary, `rgba(255,255,255,0.45)` for secondary. **Never use pure white on dark — it's too harsh for this brand.**

2. **Rose Petal (`#E8B4B0`) is the ONLY warm accent.** Use it sparingly — one accent element per beat maximum. On dark surfaces it glows subtly. On light surfaces use Rust (`#c4847e`) instead.

3. **Typography is always Fraunces for display, Inter for everything else.** Headlines are weight 400 (never bold) — the brand's elegance comes from size, not weight. Only CTA labels and eyebrow text use weight 500–600.

4. **Stats and numbers are the hero.** When showing ROI, uptime, or workflow counts — make the number large (56–80px), Fraunces 400, with a Forest Green or Rose Petal accent underneath. This is PURIST's strongest visual language.

5. **Backgrounds alternate: Warm Cream → PURIST Black → Warm Cream.** Never two dark sections in a row. The contrast rhythm is the brand's heartbeat.

6. **Pill-shaped badges communicate trust signals.** Use the Stat Pill component (Rose Petal tint) for social proof numbers: "500+ workflows", "99.97% uptime", "312+ businesses". These should appear in 1–2 per beat as supporting proof.

7. **Portrait format (1080×1920): always center-aligned content.** Max content width 860px. The vertical canvas should feel editorial — like an editorial magazine page, not a cramped mobile app.
