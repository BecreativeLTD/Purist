# PURIST

Premium supplement e-commerce template built with Astro 4 + Tailwind. Static-first, Preact islands for interactive bits (cart, modals, carousels).

## Stack

- **Astro 4** with View Transitions
- **Tailwind CSS 3** + `@tailwindcss/typography`
- **Preact** islands for interactive components
- **nanostores** for cart state (persisted to `localStorage`)
- **embla-carousel-preact** for carousels
- **astro-icon** with Lucide pack

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## Project structure

```
src/
├── pages/          # routes
├── layouts/        # BaseLayout, ShopLayout
├── components/     # layout, sections, product, cart, ui, seo
├── stores/         # nanostores
├── data/           # JSON content (products, athletes, advisors, etc.)
├── styles/         # global.css with design tokens
└── lib/            # utilities
```

## Build phases

- [x] **Phase 1** – Setup + design system + layouts (Header / Footer / AnnouncementBar)
- [ ] **Phase 2** – Homepage with all sections
- [ ] **Phase 3** – Cart drawer + checkout mockup + product page
- [ ] **Phase 4** – Secondary pages + SEO + responsive polish

## Design system

Tokens live in `tailwind.config.mjs`:

- Colors: `brand-{black,cream,beige,sand,pink,green,rust,gray-*}`
- Fonts: `font-sans` (Inter), `font-display` / `font-serif` (Fraunces)
- Type scale: `text-display`, `text-h1`, `text-h2`, `text-eyebrow`
- Radii: `rounded-button`, `rounded-card`, `rounded-image`

Component classes in `src/styles/global.css`: `.container-x`, `.eyebrow`, `.btn-primary`, `.btn-secondary`, `.link-underline`, `.scroll-fade`.

## Replacing assets and copy

All replaceable content is centralized to make swap painless:

| What | Where |
| --- | --- |
| Product data | `src/data/products.json` |
| Testimonial people | `src/data/athletes.json` |
| Advisory board | `src/data/scientific-advisors.json` |
| Press logos | `src/data/press-logos.json` |
| Reviews | `src/data/testimonials.json` |
| FAQ entries | `src/data/faqs.json` |
| Ingredients | `src/data/ingredients.json` |
| Hero copy | `src/pages/index.astro` |
| Brand colors | `tailwind.config.mjs` → `theme.extend.colors.brand` |
| Logo | text in `src/components/layout/Header.astro` + `public/favicon.svg` |

Images live in `public/images/{hero,products,athletes,advisors,press-logos,icons}/`. The structure is in place — drop in matching filenames and they will resolve.

## What is mock vs functional

- **Functional**: navigation, layout, cart drawer (state, persistence), product gallery, FAQ accordions, country selector UI, newsletter form (no backend).
- **Mock**: the `/checkout` page is UI only. The "Pay now" button shows a "Demo mode" modal and clears the cart. No Stripe, no backend, no real fulfillment.
- **No actual reviews**: review counts and star ratings are display-only placeholders.

## Required replacements before production

1. Real product imagery in `public/images/products/`
2. Real testimonial photos and signed releases
3. Real advisory board photos and signed releases
4. Actual review platform integration (currently visual mockup)
5. Real payment provider (Stripe Checkout, Shopify, etc.)
6. Real Klaviyo / Mailchimp endpoint on the footer form
7. Legal pages (privacy policy, terms) reviewed by counsel
8. NSF Certified for Sport claim requires actual certification before publishing
9. Money-back guarantee requires real returns process
10. Update `astro.config.mjs` `site` to your production domain

## Accessibility

WCAG 2.1 AA targeted. Skip-to-content link, focus rings, respects `prefers-reduced-motion`, ARIA on icon-only buttons, focus trap on modals (Phase 3).

## Deploy

Static output works on any static host. One-click on Vercel or Netlify — no env vars needed for the mock build.

## License

Template code: MIT. Replace all placeholder copy and imagery before production use.
