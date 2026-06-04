/**
 * Generates a static 1200×630 OG image at public/og-default.png
 * Uses sharp (SVG → PNG) — runs at build time, zero serverless dependency.
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'public', 'og-default.png');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'Georgia'; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0A0A0A"/>

  <!-- Giant PURIST watermark -->
  <text
    x="30" y="640"
    font-family="Georgia, serif"
    font-size="300"
    font-weight="bold"
    letter-spacing="-6"
    fill="rgba(232,180,176,0.70)"
  >PURIST</text>

  <!-- Top bar separator line (subtle) -->
  <line x1="64" y1="120" x2="1136" y2="120" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- PURIST® wordmark top-left -->
  <text
    x="64" y="88"
    font-family="Georgia, serif"
    font-size="48"
    font-weight="bold"
    fill="#E8B4B0"
    letter-spacing="-1"
  >PURIST®</text>

  <!-- Badge top-right -->
  <rect x="988" y="52" width="148" height="36" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <text x="1062" y="75" font-family="Georgia, serif" font-size="11" fill="rgba(255,255,255,0.55)" text-anchor="middle" letter-spacing="2">PURIST.ONLINE</text>

  <!-- Main title -->
  <text
    x="64" y="270"
    font-family="Georgia, serif"
    font-size="54"
    font-weight="normal"
    fill="#ffffff"
    letter-spacing="-1.5"
  >Workflow Automation</text>
  <text
    x="64" y="340"
    font-family="Georgia, serif"
    font-size="54"
    font-weight="normal"
    fill="#ffffff"
    letter-spacing="-1.5"
  >and AI Agents for Business</text>

  <!-- Description -->
  <text
    x="64" y="400"
    font-family="Georgia, serif"
    font-size="17"
    fill="rgba(255,255,255,0.40)"
  >500+ production deployments across dental, real estate, agencies,</text>
  <text
    x="64" y="424"
    font-family="Georgia, serif"
    font-size="17"
    fill="rgba(255,255,255,0.40)"
  >e-commerce, legal and staffing. Deployed in days, 99.97% uptime.</text>

  <!-- Bottom divider -->
  <line x1="64" y1="486" x2="1136" y2="486" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  <!-- Stats -->
  <text x="64"  y="524" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#ffffff">500+</text>
  <text x="64"  y="540" font-family="Georgia, serif" font-size="9"  fill="rgba(255,255,255,0.30)" letter-spacing="2">DEPLOYMENTS</text>

  <text x="188" y="524" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#ffffff">99.97%</text>
  <text x="188" y="540" font-family="Georgia, serif" font-size="9"  fill="rgba(255,255,255,0.30)" letter-spacing="2">UPTIME</text>

  <text x="330" y="524" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#ffffff">14h</text>
  <text x="330" y="540" font-family="Georgia, serif" font-size="9"  fill="rgba(255,255,255,0.30)" letter-spacing="2">SAVED / WEEK</text>

  <!-- CTA pill -->
  <rect x="978" y="496" width="158" height="42" rx="10" fill="#E8B4B0"/>
  <text x="1057" y="523" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#0A0A0A" text-anchor="middle" letter-spacing="-0.5">purist.online →</text>
</svg>`;

try {
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outPath);
  console.log(`[og] Generated ${outPath}`);
} catch (err) {
  console.error('[og] Failed to generate OG image:', err.message);
  process.exit(1);
}
