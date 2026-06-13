/**
 * generate-covers.mjs
 * Generates clean, minimal Purist-branded SVG covers for all blog articles.
 * Run: node scripts/generate-covers.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const blogData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog.json'), 'utf8'));
const OUT_DIR = path.join(ROOT, 'public/images/blog');

// ── Category display labels ────────────────────────────────────
const CATEGORY_LABELS = {
  'automation':   'AUTOMATION',
  'guides':       'GUIDE',
  'industry':     'INDUSTRY',
  'case-studies': 'CASE STUDY',
  'ai-agents':    'AI AGENTS',
  'operations':   'OPERATIONS',
  'productivity': 'PRODUCTIVITY',
};

// ── Escape XML special chars ───────────────────────────────────
function escXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Word-wrap a string into lines of max `maxChars` chars ─────
function wrapWords(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? line + ' ' + word : word;
    if (candidate.length <= maxChars) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ── Smart title for the cover ──────────────────────────────────
// Split "Main Title: Subtitle" → show both but style differently
function splitTitle(fullTitle) {
  const colonIdx = fullTitle.indexOf(':');
  if (colonIdx > 8 && colonIdx < fullTitle.length - 1) {
    const main = fullTitle.slice(0, colonIdx).trim();
    const sub  = fullTitle.slice(colonIdx + 1).trim();
    return { main, sub };
  }
  return { main: fullTitle, sub: null };
}

// ── Generate one SVG ──────────────────────────────────────────
function generateSVG(article) {
  const W = 1200, H = 630;
  const catLabel = CATEGORY_LABELS[article.category] ?? article.category.toUpperCase();
  const { main, sub } = splitTitle(article.title);

  // ── Choose font size and line width based on main title length ──
  let fontSize, maxChars;
  if (main.length <= 22) {
    fontSize = 68; maxChars = 22;
  } else if (main.length <= 42) {
    fontSize = 56; maxChars = 28;
  } else if (main.length <= 65) {
    fontSize = 46; maxChars = 34;
  } else {
    fontSize = 38; maxChars = 42;
  }

  const lineH = Math.round(fontSize * 1.22);
  const mainLines = wrapWords(main, maxChars).slice(0, 3);

  // ── Subtitle (smaller) ──────────────────────────────────────
  let subLines = [];
  if (sub) {
    const subFontSize = Math.round(fontSize * 0.48);
    const subMaxChars = Math.round(maxChars * 1.4);
    subLines = wrapWords(sub, subMaxChars).slice(0, 2);
  }

  // ── Vertical centering ──────────────────────────────────────
  const totalLines = mainLines.length + (subLines.length > 0 ? subLines.length + 0.5 : 0);
  const blockH = mainLines.length * lineH + (subLines.length > 0 ? 24 + subLines.length * Math.round(fontSize * 0.48 * 1.4) : 0);
  const blockTop = Math.round((H - blockH) / 2) + 20; // slightly below center

  // ── Build title text elements ───────────────────────────────
  let titleSVG = '';
  mainLines.forEach((ln, i) => {
    titleSVG += `\n  <text x="64" y="${blockTop + i * lineH}" font-family="Georgia,'Times New Roman',serif" font-size="${fontSize}" font-weight="400" fill="#F8F6F1" letter-spacing="-1.5" xml:space="preserve">${escXml(ln)}</text>`;
  });

  if (subLines.length > 0) {
    const subFontSize = Math.round(fontSize * 0.48);
    const subLineH = Math.round(subFontSize * 1.4);
    const subTop = blockTop + mainLines.length * lineH + 24;
    subLines.forEach((ln, i) => {
      titleSVG += `\n  <text x="64" y="${subTop + i * subLineH}" font-family="Georgia,'Times New Roman',serif" font-size="${subFontSize}" font-weight="400" fill="#F8F6F1" opacity="0.42" letter-spacing="0" xml:space="preserve">${escXml(ln)}</text>`;
    });
  }

  // ── Right-side decorative element ─────────────────────────
  // Three concentric thin circles, barely visible — clean geometric accent
  const cx = 1080, cy = 315;
  const circles = [280, 200, 120].map((r, i) => {
    const op = [0.045, 0.035, 0.025][i];
    return `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="#E8B4B0" stroke-width="0.6" fill="none" opacity="${op}"/>`;
  }).join('\n  ');

  // ── Assemble SVG ───────────────────────────────────────────
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0A0A0A"/>

  <!-- Decorative circles (right) -->
  ${circles}

  <!-- Top rule -->
  <line x1="64" y1="88" x2="1136" y2="88" stroke="#F8F6F1" stroke-width="0.5" opacity="0.08"/>

  <!-- PURIST wordmark -->
  <text x="64" y="68" font-family="Georgia,'Times New Roman',serif" font-size="12" font-weight="400" fill="#F8F6F1" letter-spacing="8" opacity="0.9">PURIST</text>

  <!-- Category label -->
  <text x="64" y="138" font-family="Georgia,'Times New Roman',serif" font-size="9.5" font-weight="400" fill="#E8B4B0" letter-spacing="5">${escXml(catLabel)}</text>

  <!-- Category dash -->
  <rect x="64" y="152" width="36" height="1.5" fill="#E8B4B0" opacity="0.45"/>

  <!-- Article title -->
  ${titleSVG}

  <!-- Bottom rule -->
  <line x1="64" y1="548" x2="1136" y2="548" stroke="#F8F6F1" stroke-width="0.5" opacity="0.08"/>

  <!-- Bottom labels -->
  <text x="64" y="576" font-family="Georgia,'Times New Roman',serif" font-size="9.5" fill="#F8F6F1" letter-spacing="3" opacity="0.18">purist.online</text>
  <text x="1136" y="576" font-family="Georgia,'Times New Roman',serif" font-size="9.5" fill="#E8B4B0" letter-spacing="2" opacity="0.38" text-anchor="end">${escXml(article.readingTime?.toUpperCase() ?? '')}</text>
</svg>`;
}

// ── Main ──────────────────────────────────────────────────────
let generated = 0;

for (const article of blogData.articles) {
  const svg      = generateSVG(article);
  const filename = `${article.slug}.svg`;
  const outPath  = path.join(OUT_DIR, filename);

  fs.writeFileSync(outPath, svg, 'utf8');
  article.image = `/images/blog/${filename}`;
  generated++;
  process.stdout.write(`\r  ✓ ${generated}/${blogData.articles.length}  ${filename.padEnd(60)}`);
}

process.stdout.write('\n');

// ── Write updated blog.json ───────────────────────────────────
fs.writeFileSync(
  path.join(ROOT, 'src/data/blog.json'),
  JSON.stringify(blogData, null, 2),
  'utf8'
);

console.log(`\n✓ ${generated} covers generated in public/images/blog/`);
console.log('✓ blog.json updated with new image paths\n');
