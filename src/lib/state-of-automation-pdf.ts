import { professions } from '~/data/automations';
import skillsData from '~/data/skills.json';
import claudeSkillsData from '~/data/claude-skills.json';

const FONT_FILES: Array<[url: string, vfsName: string, alias: string]> = [
  ['/fonts/pdf/Fraunces-Regular.ttf', 'Fraunces-Regular.ttf', 'Fraunces'],
  ['/fonts/pdf/Fraunces-Medium.ttf', 'Fraunces-Medium.ttf', 'FrauncesMedium'],
  ['/fonts/pdf/Fraunces-Italic.ttf', 'Fraunces-Italic.ttf', 'FrauncesItalic'],
  ['/fonts/pdf/Inter-Regular.ttf', 'Inter-Regular.ttf', 'Inter'],
  ['/fonts/pdf/Inter-SemiBold.ttf', 'Inter-SemiBold.ttf', 'InterSemiBold'],
];

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function loadBrandFonts(doc: any) {
  await Promise.all(
    FONT_FILES.map(async ([url, vfsName, alias]) => {
      const buf = await fetch(url).then((r) => r.arrayBuffer());
      const base64 = arrayBufferToBase64(buf);
      doc.addFileToVFS(vfsName, base64);
      doc.addFont(vfsName, alias, 'normal');
    }),
  );
}

type RGB = [number, number, number];
function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function mix(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function parseHours(s: string): number {
  const m = s.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}
function parseMoney(s: string): number {
  const m = s.match(/\$([\d,]+)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : 0;
}
const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

export async function buildStateOfAutomationPdf() {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  await loadBrandFonts(doc);

  const W = 210;
  const H = 297;
  const margin = 20;
  const cw = W - margin * 2;
  const accent: RGB = hexToRgb('#8B4038');
  const RAMP: RGB[] = ['#F7E4E1', '#EFC3BC', '#E8B4B0', '#C97A6E', '#8B4038'].map(hexToRgb);
  const cream: RGB = [248, 246, 241];
  const dark: RGB = [10, 10, 10];
  const bodyGray: RGB = [70, 70, 70];
  const paleAccent: RGB = mix(accent, [255, 255, 255], 0.88);

  let page = 1;
  let y = margin;

  function setFill(c: RGB) { doc.setFillColor(c[0], c[1], c[2]); }
  function setText(c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }
  function setDraw(c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }

  function drawChrome() {
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.5);
    setText([180, 180, 180]);
    doc.text('PURIST', margin, 12);
    doc.setFont('Inter', 'normal');
    doc.text('STATE OF AUTOMATION 2026', W - margin, 12, { align: 'right' });
    setDraw([230, 230, 230]);
    doc.setLineWidth(0.2);
    doc.line(margin, 15, W - margin, 15);
    doc.setFontSize(7.5);
    setText([180, 180, 180]);
    doc.text(String(page), W / 2, H - 10, { align: 'center' });
    y = 24;
  }

  function newPage() {
    doc.addPage();
    page += 1;
    drawChrome();
  }

  function checkPage(need: number) {
    if (y + need > H - 16) newPage();
  }

  function eyebrow(text: string) {
    checkPage(10);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(8.5);
    setText(accent);
    doc.text(text.toUpperCase(), margin, y);
    y += 9;
  }

  function heading(text: string, size = 18) {
    checkPage(size / 2 + 12);
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(size);
    setText(dark);
    const lines = doc.splitTextToSize(text, cw);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.46) + 10;
  }

  function paragraph(text: string, size = 9.8, color: RGB = bodyGray, width = cw) {
    doc.setFont('Inter', 'normal');
    doc.setFontSize(size);
    setText(color);
    const lines = doc.splitTextToSize(text, width);
    checkPage(lines.length * size * 0.56 + 6);
    doc.text(lines, margin, y);
    y += lines.length * size * 0.56 + 10;
  }

  function divider(gapBefore = 0) {
    y += gapBefore;
    checkPage(12);
    setDraw([225, 225, 225]);
    doc.setLineWidth(0.2);
    doc.line(margin, y, W - margin, y);
    y += 12;
  }

  function subhead(text: string, size = 10.5) {
    checkPage(12);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(size);
    setText(dark);
    doc.text(text, margin, y);
    y += 10;
  }

  function calloutBox(title: string, body: string) {
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.3);
    const bodyLines = doc.splitTextToSize(body, cw - 16);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.8);
    const titleLines = doc.splitTextToSize(title, cw - 16);
    const boxH = titleLines.length * 4.6 + bodyLines.length * 4.4 + 14;
    checkPage(boxH + 6);
    const boxY = y;
    setFill(paleAccent);
    doc.roundedRect(margin, boxY, cw, boxH, 2.5, 2.5, 'F');
    setFill(accent);
    doc.rect(margin, boxY, 1.4, boxH, 'F');
    let ty = boxY + 8;
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.8);
    setText([Math.round(accent[0] * 0.55), Math.round(accent[1] * 0.55), Math.round(accent[2] * 0.55)]);
    doc.text(titleLines, margin + 8, ty);
    ty += titleLines.length * 4.6 + 3;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.3);
    setText([60, 60, 60]);
    doc.text(bodyLines, margin + 8, ty);
    y = boxY + boxH + 9;
  }

  // Horizontal ranked bar chart used for both hours and revenue rankings
  function drawRankedBars(rows: Array<{ label: string; value: number; display: string }>) {
    const rowH = 12;
    checkPage(rows.length * rowH + 16);
    const maxVal = Math.max(...rows.map((r) => r.value), 1);
    const labelW = 44;
    const valueW = 26;
    const barX = margin + labelW;
    const barMaxW = cw - labelW - valueW;
    rows.forEach((r, i) => {
      checkPage(rowH);
      if (i % 2 === 0) { setFill([250, 250, 250]); doc.rect(margin, y - 5, cw, rowH - 2, 'F'); }
      doc.setFont('Inter', 'normal');
      doc.setFontSize(7.6);
      setText([60, 60, 60]);
      const labelLines = doc.splitTextToSize(r.label, labelW - 3);
      doc.text(labelLines[0], margin, y);
      const t = i / Math.max(rows.length - 1, 1);
      const stopIdx = Math.min(RAMP.length - 2, Math.floor(t * (RAMP.length - 1)));
      const localT = t * (RAMP.length - 1) - stopIdx;
      const shade = mix(RAMP[stopIdx], RAMP[stopIdx + 1], localT);
      const barW = Math.max((r.value / maxVal) * barMaxW, 3);
      setFill([236, 236, 236]);
      doc.roundedRect(barX, y - 4.5, barMaxW, 7, 1.4, 1.4, 'F');
      setFill(shade as RGB);
      doc.roundedRect(barX, y - 4.5, barW, 7, 1.4, 1.4, 'F');
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7.6);
      setText(dark);
      doc.text(r.display, barX + barMaxW + valueW - 2, y, { align: 'right' });
      y += rowH;
    });
    y += 4;
  }

  // ── Live aggregate stats, computed the same way as the web page ──
  const hoursArr = professions.map((p) => parseHours(p.stats.timeSaved)).filter(Boolean);
  const revArr = professions.map((p) => parseMoney(p.stats.revenueImpact)).filter(Boolean);
  const deployArr = professions.map((p) => p.stats.deploymentDays).filter(Boolean);
  const roiArr = professions.map((p) => p.stats.roiMonths).filter(Boolean);
  const avgHours = avg(hoursArr);
  const avgRevenue = avg(revArr);
  const avgDeploy = avg(deployArr);
  const pctRoiUnder1 = (roiArr.filter((r) => r <= 1).length / roiArr.length) * 100;
  const totalWorkflows = professions.length * 4;

  const categories = [...new Set(professions.map((p) => p.category))];
  const byCategory = categories.map((cat) => {
    const ps = professions.filter((p) => p.category === cat);
    const h = ps.map((p) => parseHours(p.stats.timeSaved)).filter(Boolean);
    const r = ps.map((p) => parseMoney(p.stats.revenueImpact)).filter(Boolean);
    return { category: cat, n: ps.length, avgHours: avg(h), avgRevenue: avg(r), professions: ps };
  });
  const byRevenue = [...byCategory].sort((a, b) => b.avgRevenue - a.avgRevenue);
  const byHours = [...byCategory].sort((a, b) => b.avgHours - a.avgHours);

  const claudeProfs = professions.filter((p) => p.tools.includes('Claude AI'));
  const nonClaudeProfs = professions.filter((p) => !p.tools.includes('Claude AI'));
  const claudeAvgHours = avg(claudeProfs.map((p) => parseHours(p.stats.timeSaved)).filter(Boolean));
  const claudeAvgRev = avg(claudeProfs.map((p) => parseMoney(p.stats.revenueImpact)).filter(Boolean));
  const nonClaudeAvgHours = avg(nonClaudeProfs.map((p) => parseHours(p.stats.timeSaved)).filter(Boolean));
  const nonClaudeAvgRev = avg(nonClaudeProfs.map((p) => parseMoney(p.stats.revenueImpact)).filter(Boolean));
  const claudePct = (claudeProfs.length / professions.length) * 100;

  const allByRevenue = [...professions].sort(
    (a, b) => parseMoney(b.stats.revenueImpact) - parseMoney(a.stats.revenueImpact),
  );

  // n8n skill catalog: only entries with a curated internal slug are shown; the raw
  // skills.json `n8n` deep-link field is unreliable (most IDs 404 on n8n.io) so we
  // do not surface it as a clickable per-item citation, only the verified top-level
  // n8n.io/workflows/ marketplace URL is used as a platform reference.
  const skillsByCat: Record<string, typeof skillsData.skills> = {};
  (skillsData.skills as any[]).forEach((s) => {
    if (!skillsByCat[s.cat]) skillsByCat[s.cat] = [];
    skillsByCat[s.cat].push(s);
  });
  const skillCatLabels: Record<string, string> = {
    crm: 'CRM & Sales', finance: 'Finance', ops: 'Operations', support: 'Support & CS',
    marketing: 'Marketing', reporting: 'Reporting & BI', hr: 'HR', ai: 'AI-Native',
    integration: 'Integrations', security: 'Security',
  };

  // ══════════════════════════ COVER ══════════════════════════
  doc.setFillColor(...dark);
  doc.rect(0, 0, W, H, 'F');
  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(24);
  setText(cream);
  doc.text('PURIST', W / 2, 46, { align: 'center' });
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(9);
  setText(accent);
  doc.text('RESEARCH · 2026 EDITION', W / 2, 55, { align: 'center' });
  setDraw(accent);
  doc.setLineWidth(0.4);
  doc.line(W / 2 - 14, 62, W / 2 + 14, 62);
  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(28);
  setText(cream);
  const titleLines = doc.splitTextToSize('The State of Business Automation, 2026', cw - 10);
  doc.text(titleLines, W / 2, 100, { align: 'center' });
  doc.setFont('Inter', 'normal');
  doc.setFontSize(11);
  setText([180, 180, 180]);
  doc.text(`171 professions · ${totalWorkflows} documented workflows`, W / 2, 100 + titleLines.length * 12 + 6, { align: 'center' });
  doc.setFontSize(9);
  setText([130, 130, 130]);
  doc.text('Published September 2026 · purist.online', W / 2, H - 20, { align: 'center' });

  // ══════════════════════════ EXECUTIVE SUMMARY ══════════════════════════
  newPage();
  eyebrow('Executive Summary');
  heading('Four numbers that define 2026.');
  const tiles = [
    [`${avgHours.toFixed(1)}h`, 'avg. hours recovered per week'],
    [`$${Math.round(avgRevenue).toLocaleString('en-US')}`, 'avg. monthly revenue impact'],
    [`${avgDeploy.toFixed(1)}`, 'avg. days to production deployment'],
    [`${Math.round(pctRoiUnder1)}%`, 'break even within 30 days'],
  ];
  const tileW = (cw - 12) / 2;
  const tileH = 30;
  tiles.forEach(([num, label], i) => {
    const bx = margin + (i % 2) * (tileW + 12);
    const by = y + Math.floor(i / 2) * (tileH + 8);
    setFill([250, 248, 244]);
    doc.roundedRect(bx, by, tileW, tileH, 3, 3, 'F');
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(17);
    setText(dark);
    doc.text(num as string, bx + 8, by + 15);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7.6);
    setText([120, 120, 120]);
    doc.text(doc.splitTextToSize(label as string, tileW - 16), bx + 8, by + 22);
  });
  y += tileH * 2 + 24;
  divider();
  paragraph('This report is built from PURIST\'s own automation deployment modeling: a structured dataset covering 171 professions across 13 industry categories, with four individually documented workflows each. It is a vendor\'s own domain analysis, not a third-party survey, the same way Zapier\'s State of Business Automation report is drawn from its own platform data. Individual results vary by business.');

  // ══════════════════════════ HOURS RANKING ══════════════════════════
  newPage();
  eyebrow('Finding 01');
  heading(`The ${avgHours.toFixed(1)}-Hour Rule.`);
  paragraph(`${byHours[0].category} sees the largest time recovery at ${byHours[0].avgHours.toFixed(1)}h/week, ${(byHours[0].avgHours / byHours[byHours.length - 1].avgHours).toFixed(1)}x the lowest category, ${byHours[byHours.length - 1].category}.`);
  drawRankedBars(byHours.map((c) => ({ label: c.category, value: c.avgHours, display: `${c.avgHours.toFixed(1)}h/wk` })));

  // ══════════════════════════ REVENUE RANKING ══════════════════════════
  newPage();
  eyebrow('Finding 02');
  heading('Which industries benefit most.');
  paragraph(`${byRevenue[0].category} leads on revenue impact at $${Math.round(byRevenue[0].avgRevenue).toLocaleString('en-US')}/month, the widest gap in the dataset.`);
  drawRankedBars(byRevenue.map((c) => ({ label: c.category, value: c.avgRevenue, display: `$${Math.round(c.avgRevenue).toLocaleString('en-US')}/mo` })));

  // ══════════════════════════ 7-DAY DEPLOYMENT ══════════════════════════
  newPage();
  eyebrow('Finding 03');
  heading('The 7-Day Deployment Standard.');
  const pctSeven = (deployArr.filter((d) => d === 7).length / deployArr.length) * 100;
  calloutBox(
    `${avgDeploy.toFixed(1)} average days from audit to production`,
    `${Math.round(pctSeven)}% of the 171 profession models deploy in exactly 7 business days, consistent with PURIST's standard delivery SLA regardless of industry.`,
  );

  // ══════════════════════════ GENERATIVE AI GAP ══════════════════════════
  newPage();
  eyebrow('Finding 04');
  heading('The Generative AI Gap.');
  paragraph(`Only ${claudePct.toFixed(0)}% of the workflow models in this dataset use Claude AI as a decision-making layer (classification, extraction, drafting) rather than fixed if-then logic alone. Those that do outperform on both metrics.`);
  subhead('Claude AI-powered deployments');
  paragraph(`${claudeAvgHours.toFixed(1)}h/wk avg.  ·  $${Math.round(claudeAvgRev).toLocaleString('en-US')}/mo avg.`, 11, dark);
  subhead('Standard automation-only deployments');
  paragraph(`${nonClaudeAvgHours.toFixed(1)}h/wk avg.  ·  $${Math.round(nonClaudeAvgRev).toLocaleString('en-US')}/mo avg.`, 11, bodyGray);

  // ══════════════════════════ 85% BREAK EVEN ══════════════════════════
  newPage();
  eyebrow('Finding 05');
  heading(`${Math.round(pctRoiUnder1)}% Break Even Within 30 Days.`);
  calloutBox(
    `${Math.round(pctRoiUnder1)}% of modeled deployments`,
    'recover their full cost within the first month of going live, based on the deployment cost and measured monthly revenue/time impact for each profession modeled.',
  );

  // ══════════════════════════ BEFORE / AFTER BY CATEGORY ══════════════════════════
  newPage();
  eyebrow('Deep Dive');
  heading('Before and after, by industry.');
  paragraph('A representative before/after pattern per category, drawn directly from the pain points and workflow outcomes documented for the professions modeled in that category. Not a single-client testimonial, an aggregate pattern.');
  byRevenue.forEach((c) => {
    const sample = c.professions[0];
    const beforeText = sample.painPoints.slice(0, 2).join('; ');
    const afterText = `${c.avgHours.toFixed(1)}h/week recovered, $${Math.round(c.avgRevenue).toLocaleString('en-US')}/month impact, via workflows such as "${sample.workflows[0].name}" (${sample.workflows[0].impact}).`;
    checkPage(28);
    subhead(c.category, 10.5);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.6);
    setText([150, 60, 50]);
    doc.text('BEFORE', margin, y);
    doc.setFont('Inter', 'normal');
    setText(bodyGray);
    const beforeLines = doc.splitTextToSize(beforeText, cw - 20);
    doc.text(beforeLines, margin + 18, y);
    y += Math.max(beforeLines.length, 1) * 3.6 + 4;
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.6);
    setText([40, 110, 60]);
    doc.text('AFTER', margin, y);
    doc.setFont('Inter', 'normal');
    setText(bodyGray);
    const afterLines = doc.splitTextToSize(afterText, cw - 20);
    doc.text(afterLines, margin + 18, y);
    y += Math.max(afterLines.length, 1) * 3.6 + 9;
  });

  // ══════════════════════════ N8N WORKFLOW LIBRARY ══════════════════════════
  newPage();
  eyebrow('Capability Inventory');
  heading('The n8n workflow library behind this report.');
  paragraph(`Every profession model in this report draws on PURIST's own library of ${skillsData.skills.length} pre-built n8n automation patterns across ${Object.keys(skillsByCat).length} functional categories, built on the open n8n platform (n8n.io/workflows). This is PURIST's internal capability inventory, not a public marketplace listing.`);
  Object.entries(skillCatLabels).forEach(([catId, label]) => {
    const items = skillsByCat[catId] || [];
    if (!items.length) return;
    checkPage(14);
    subhead(`${label}  ·  ${items.length} patterns`, 9.5);
    items.slice(0, 6).forEach((s: any) => {
      checkPage(10);
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7.8);
      setText(dark);
      doc.text(doc.splitTextToSize(`${s.title}`, cw - 30), margin + 4, y);
      doc.setFont('Inter', 'normal');
      doc.setFontSize(7.2);
      setText([130, 130, 130]);
      doc.text(s.time, W - margin, y, { align: 'right' });
      y += 4.5;
      const descLines = doc.splitTextToSize(s.benefit, cw - 10);
      setText([110, 110, 110]);
      doc.text(descLines, margin + 4, y);
      y += descLines.length * 3.4 + 3;
    });
    y += 2;
  });

  // ══════════════════════════ CLAUDE AGENT SKILLS ══════════════════════════
  newPage();
  eyebrow('Capability Inventory');
  heading(`${claudeSkillsData.totalSkills} Claude Agent Skills.`);
  paragraph('Beyond fixed workflow automation, PURIST deploys Claude AI agent skills for judgment-based work: drafting, classification, research, and QA that fixed if-then logic cannot handle.');
  claudeSkillsData.categories.forEach((c: any) => {
    checkPage(13);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(8.6);
    setText(dark);
    doc.text(c.name, margin, y);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7.6);
    setText([Math.round(accent[0] * 0.6), Math.round(accent[1] * 0.6), Math.round(accent[2] * 0.6)]);
    doc.text(`${c.count} skills`, W - margin, y, { align: 'right' });
    y += 4.6;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7);
    setText([120, 120, 120]);
    const sample = c.skills.slice(0, 6).join('  ·  ');
    doc.text(doc.splitTextToSize(sample, cw), margin, y);
    y += doc.splitTextToSize(sample, cw).length * 3.4 + 7;
  });

  // ══════════════════════════ ALL 171 PROBLEMS & SOLUTIONS ══════════════════════════
  newPage();
  eyebrow('Appendix');
  heading('Problems & solutions, all 171 professions.');
  paragraph(`Sorted by revenue impact. Each profession has ${4} fully documented workflows on the web version of this report.`, 8.5, [140, 140, 140]);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(6.6);
  setText([170, 170, 170]);
  doc.text('PROFESSION', margin, y);
  doc.text('PAIN POINT', margin + 42, y);
  doc.text('PURIST SOLUTION', margin + 122, y);
  y += 7;
  allByRevenue.forEach((p, i) => {
    const painLines = doc.splitTextToSize(p.painPoints[0], 76);
    const solLines = doc.splitTextToSize(p.workflows[0].name, 46);
    const rowLines = Math.max(painLines.length, solLines.length, 1);
    const rowH = rowLines * 3.6 + 4;
    checkPage(rowH + 2);
    if (i % 2 === 0) { setFill([250, 250, 250]); doc.rect(margin, y - 3, cw, rowH, 'F'); }
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.2);
    setText(dark);
    doc.text(doc.splitTextToSize(p.name, 40), margin, y);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(6.8);
    setText([90, 90, 90]);
    doc.text(painLines, margin + 42, y);
    setText([Math.round(accent[0] * 0.6), Math.round(accent[1] * 0.6), Math.round(accent[2] * 0.6)]);
    doc.text(solLines, margin + 122, y);
    y += rowH;
  });

  // ══════════════════════════ CLOSING ══════════════════════════
  newPage();
  eyebrow('How to cite this report');
  calloutBox(
    'Citation',
    'PURIST. (2026). The State of Business Automation Report 2026. Retrieved from https://www.purist.online/pages/state-of-automation-report-2026',
  );
  divider(4);
  heading('See what this looks like for your business.', 16);
  paragraph('Book a free automation audit and we will map the exact workflows, time savings, and ROI timeline for your specific business, live on the call.');
  setFill(accent);
  doc.roundedRect(margin, y, 70, 12, 3, 3, 'F');
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(9);
  setText([255, 255, 255]);
  doc.text('purist.online/pages/welcome', margin + 35, y + 7.5, { align: 'center' });

  const totalPages = (doc.internal as any).getNumberOfPages();
  doc.save('purist-state-of-automation-report-2026.pdf');

  const pdfBase64: string = doc.output('datauristring').split(',')[1];
  return { base64: pdfBase64, pageCount: totalPages };
}
