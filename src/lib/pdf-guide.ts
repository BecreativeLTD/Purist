import { professions, type Profession } from '~/data/automations';

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

const MISTAKES: Array<[string, string]> = [
  ['Automating a broken process instead of fixing it first', 'Map the process on paper, remove every dead step, then automate what remains. Automation makes a bad process fail faster, not better.'],
  ['Choosing the tools before mapping the workflow', 'Write out the trigger, the logic, and the outcome first. Tool choice should follow the design, not dictate it.'],
  ['Skipping error handling for edge cases', 'Every workflow needs a defined behavior for a failed API call, a missing field, or a duplicate trigger, not just the happy path.'],
  ['Rolling out every workflow at once', 'Ship one, measure it for two weeks, then expand. Most failed automation projects tried to do too much on day one.'],
  ['No one owns monitoring once it is live', 'Assign a single owner who gets alerted on failure. A workflow with no owner degrades quietly until revenue or leads go missing.'],
];

function parseHours(timeSaved: string): number {
  const m = timeSaved.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

// Source dataset predates the "never use em-dashes" style rule; sanitize at render time
// rather than hand-editing 170+ profession entries.
function clean(text: string): string {
  return text
    .replace(/\s*→\s*/g, ' then ')
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*–\s*/g, ', ');
}

function cleanProfession(p: Profession): Profession {
  return {
    ...p,
    tagline: clean(p.tagline),
    description: clean(p.description),
    painPoints: p.painPoints.map(clean),
    workflows: p.workflows.map((w) => ({ ...w, name: clean(w.name), description: clean(w.description), impact: clean(w.impact) })),
    faq: p.faq.map((f) => ({ q: clean(f.q), a: clean(f.a) })),
  };
}

export async function buildGuidePdf(rawProfession: Profession, accentColor: string, recipientEmail?: string) {
  const profession = cleanProfession(rawProfession);
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  await loadBrandFonts(doc);

  const W = 210;
  const H = 297;
  const margin = 20;
  const cw = W - margin * 2;
  const accent = hexToRgb(accentColor);
  const cream: RGB = [248, 246, 241];
  const dark: RGB = [10, 10, 10];
  const bodyGray: RGB = [70, 70, 70];
  const paleAccent: RGB = mix(accent, [255, 255, 255], 0.88);

  let page = 1;
  let y = margin;

  function setFill(c: RGB) { doc.setFillColor(c[0], c[1], c[2]); }
  function setText(c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }
  function setDraw(c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }

  function newPage() {
    doc.addPage();
    page += 1;
    y = margin;
    drawChrome();
  }

  function drawChrome() {
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.5);
    setText([180, 180, 180]);
    doc.text('PURIST', margin, 12);
    doc.setFont('Inter', 'normal');
    doc.text(profession.name.toUpperCase(), W - margin, 12, { align: 'right' });
    setDraw([230, 230, 230]);
    doc.setLineWidth(0.2);
    doc.line(margin, 15, W - margin, 15);
    doc.setFontSize(7.5);
    setText([180, 180, 180]);
    doc.text(String(page), W / 2, H - 10, { align: 'center' });
    y = 24;
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

  // Callout / pull-quote box with a colored left rule
  function calloutBox(title: string, body: string, tone: 'accent' | 'dark' = 'accent') {
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.3);
    const bodyLines = doc.splitTextToSize(body, cw - 16);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.8);
    const titleLines = doc.splitTextToSize(title, cw - 16);
    const boxH = titleLines.length * 4.6 + bodyLines.length * 4.4 + 14;
    checkPage(boxH + 6);
    const boxY = y;
    const bg: RGB = tone === 'accent' ? paleAccent : [245, 245, 245];
    setFill(bg);
    doc.roundedRect(margin, boxY, cw, boxH, 2.5, 2.5, 'F');
    setFill(accent);
    doc.rect(margin, boxY, 1.4, boxH, 'F');
    let ty = boxY + 8;
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.8);
    setText(tone === 'accent' ? [Math.round(accent[0] * 0.55), Math.round(accent[1] * 0.55), Math.round(accent[2] * 0.55)] : dark);
    doc.text(titleLines, margin + 8, ty);
    ty += titleLines.length * 4.6 + 3;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.3);
    setText([60, 60, 60]);
    doc.text(bodyLines, margin + 8, ty);
    y = boxY + boxH + 9;
  }

  // Horizontal bar chart: real per-workflow time-saved data
  function drawBarChart(title: string, items: Array<{ label: string; value: number; suffix: string }>, height = 9) {
    const sorted = [...items].sort((a, b) => b.value - a.value);
    const total = sorted.reduce((s, i) => s + i.value, 0) || 1;
    const rowH = height + 8;
    checkPage(sorted.length * rowH + 20);
    subhead(title);
    const maxVal = Math.max(...sorted.map((i) => i.value), 1);
    const rankW = 12;
    const labelW = 44;
    const valueW = 26;
    const barX = margin + rankW + labelW;
    const barMaxW = cw - rankW - labelW - valueW;

    checkPage(6);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(6.8);
    setText([170, 170, 170]);
    doc.text('RANK', margin, y);
    doc.text('WORKFLOW', margin + rankW, y);
    doc.text('SHARE OF TOTAL TIME RECLAIMED', barX, y);
    y += 9;

    sorted.forEach((item, i) => {
      checkPage(rowH);
      if (i % 2 === 0) { setFill([250, 250, 250]); doc.rect(margin, y - 5, cw, rowH - 2, 'F'); }

      const rankShade = mix(accent, [10, 10, 10], (i / Math.max(sorted.length - 1, 1)) * 0.4);
      setFill(rankShade);
      doc.circle(margin + 3.5, y - 1, 3.5, 'F');
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7);
      setText([255, 255, 255]);
      doc.text(String(i + 1), margin + 3.5, y - 0.5, { align: 'center' });

      doc.setFont('Inter', 'normal');
      doc.setFontSize(8);
      setText([60, 60, 60]);
      const labelLines = doc.splitTextToSize(item.label, labelW - 3);
      doc.text(labelLines[0], margin + rankW, y);

      const barW = Math.max((item.value / maxVal) * barMaxW, 3);
      setFill([236, 236, 236]);
      doc.roundedRect(barX, y - height * 0.72, barMaxW, height, 1.6, 1.6, 'F');
      setFill(rankShade);
      doc.roundedRect(barX, y - height * 0.72, barW, height, 1.6, 1.6, 'F');

      const share = Math.round((item.value / total) * 100);
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(8);
      setText(dark);
      doc.text(`${item.value}${item.suffix}`, barX + barMaxW + valueW - 2, y - 1.5, { align: 'right' });
      doc.setFont('Inter', 'normal');
      doc.setFontSize(6.6);
      setText([140, 140, 140]);
      doc.text(`${share}% of total`, barX + barMaxW + valueW - 2, y + 3, { align: 'right' });

      y += rowH;
    });
    y += 3;
  }

  // Vertical bar chart: cumulative ROI growth projection from the real monthly figure
  function drawVerticalBarChart(title: string, items: Array<{ label: string; value: number }>, unitPrefix: string) {
    const chartH = 66;
    checkPage(chartH + 32);
    subhead(title);

    const multiplier = items.length > 1 && items[0].value > 0 ? (items[items.length - 1].value / items[0].value) : 0;
    if (multiplier > 1) {
      const badgeText = `${multiplier.toFixed(1)}× growth, month ${1} to month ${items.length > 0 ? items[items.length - 1].label.replace(/\D/g, '') : ''}`;
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7.2);
      const bw = doc.getTextWidth(badgeText) + 12;
      setFill(mix(accent, [255, 255, 255], 0.85));
      doc.roundedRect(W - margin - bw, y - 8, bw, 7, 6, 6, 'F');
      setText([Math.round(accent[0] * 0.45), Math.round(accent[1] * 0.45), Math.round(accent[2] * 0.45)]);
      doc.text(badgeText, W - margin - bw / 2, y - 3.3, { align: 'center' });
    }

    const maxVal = Math.max(...items.map((i) => i.value), 1);
    const gap = 6;
    const barW = (cw - gap * (items.length - 1)) / items.length;
    const baseY = y + chartH;

    // Gridlines at 25/50/75/100% with axis value labels
    [0.25, 0.5, 0.75, 1].forEach((frac) => {
      const gy = baseY - frac * (chartH - 14);
      setDraw([236, 236, 236]);
      doc.setLineWidth(0.2);
      doc.line(margin, gy, W - margin, gy);
      doc.setFont('Inter', 'normal');
      doc.setFontSize(6);
      setText([180, 180, 180]);
      doc.text(`${unitPrefix}${Math.round((maxVal * frac) / 1000)}k`, margin, gy - 1.5, { align: 'left' });
    });

    setDraw([225, 225, 225]);
    doc.setLineWidth(0.3);
    doc.line(margin, baseY, W - margin, baseY);

    items.forEach((item, i) => {
      const bh = (item.value / maxVal) * (chartH - 14);
      const bx = margin + i * (barW + gap);
      const by = baseY - bh;
      const isLast = i === items.length - 1;
      // subtle depth: offset shadow rect behind the bar
      setFill(mix(accent, [255, 255, 255], 0.9));
      doc.roundedRect(bx + 1, by + 1, barW, bh, 1.6, 1.6, 'F');
      setFill(isLast ? accent : mix(accent, [255, 255, 255], 0.3 + (items.length - 1 - i) * 0.12));
      doc.roundedRect(bx, by, barW, bh, 1.6, 1.6, 'F');
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7.6);
      setText(dark);
      doc.text(`${unitPrefix}${Math.round(item.value).toLocaleString('en-US')}`, bx + barW / 2, by - 3, { align: 'center' });
      doc.setFont('Inter', 'normal');
      doc.setFontSize(7.5);
      setText([120, 120, 120]);
      doc.text(item.label, bx + barW / 2, baseY + 6, { align: 'center' });
    });
    y = baseY + 13;
  }

  // Horizontal Gantt-style timeline for the deployment roadmap
  function drawTimeline(phases: Array<{ label: string; startFrac: number; endFrac: number }>, totalDays: number) {
    const rowH = 11;
    const labelW = 26;
    const trackX = margin + labelW;
    const trackW = cw - labelW;
    const chartH = phases.length * (rowH + 7) + 20;
    checkPage(chartH + 10);

    // Top day-scale axis: 0 -> totalDays
    doc.setFont('Inter', 'normal');
    doc.setFontSize(6.4);
    setText([160, 160, 160]);
    [0, 0.25, 0.5, 0.75, 1].forEach((frac) => {
      const tx = trackX + frac * trackW;
      doc.text(`D${Math.round(frac * totalDays)}`, tx, y, { align: frac === 0 ? 'left' : frac === 1 ? 'right' : 'center' });
      setDraw([238, 238, 238]);
      doc.setLineWidth(0.15);
      doc.line(tx, y + 2, tx, y + chartH - 12);
    });
    y += 8;

    phases.forEach((p, i) => {
      checkPage(rowH + 10);
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(8.2);
      setText([80, 80, 80]);
      const labelLines = doc.splitTextToSize(p.label, labelW - 3);
      doc.text(labelLines, margin, y + rowH * 0.68);
      setFill([240, 240, 240]);
      doc.roundedRect(trackX, y, trackW, rowH, 2, 2, 'F');
      const barX = trackX + p.startFrac * trackW;
      const barW = Math.max((p.endFrac - p.startFrac) * trackW, 4);
      const shade = mix(accent, [10, 10, 10], (i / Math.max(phases.length - 1, 1)) * 0.35);
      setFill(shade);
      doc.roundedRect(barX, y, barW, rowH, 2, 2, 'F');
      const pctOfTotal = Math.round((p.endFrac - p.startFrac) * 100);
      if (barW > 14) {
        doc.setFont('InterSemiBold', 'normal');
        doc.setFontSize(6.5);
        setText([255, 255, 255]);
        doc.text(`${pctOfTotal}%`, barX + barW - 3, y + rowH * 0.65, { align: 'right' });
      }
      y += rowH + 7;
    });
    y += 4;
  }

  // Flow diagram: Trigger -> n8n -> AI layer -> Action -> Confirmation
  function drawFlowDiagram() {
    const steps = ['Trigger', 'n8n workflow', 'AI layer', 'Action', 'Confirmation'];
    const boxH = 16;
    checkPage(boxH + 14);
    const gap = 3;
    const boxW = (cw - gap * (steps.length - 1)) / steps.length;
    steps.forEach((s, i) => {
      const bx = margin + i * (boxW + gap);
      setFill(i === 2 ? accent : [245, 245, 245]);
      doc.roundedRect(bx, y, boxW, boxH, 2, 2, 'F');
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7.2);
      setText(i === 2 ? [255, 255, 255] : [50, 50, 50]);
      const lines = doc.splitTextToSize(s, boxW - 4);
      doc.text(lines, bx + boxW / 2, y + boxH / 2 - (lines.length - 1) * 1.6 + 1, { align: 'center' });
      if (i < steps.length - 1) {
        setDraw([200, 200, 200]);
        doc.setLineWidth(0.5);
        const midY = y + boxH / 2;
        doc.line(bx + boxW, midY, bx + boxW + gap, midY);
      }
    });
    y += boxH + 12;
  }

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
  doc.text('FREE AUTOMATION GUIDE', W / 2, 55, { align: 'center' });
  setDraw(accent);
  doc.setLineWidth(0.4);
  doc.line(W / 2 - 14, 62, W / 2 + 14, 62);

  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(30);
  setText(cream);
  const nameLines = doc.splitTextToSize(profession.name, cw - 10);
  doc.text(nameLines, W / 2, 98, { align: 'center' });

  doc.setFont('FrauncesItalic', 'normal');
  doc.setFontSize(13.5);
  setText([210, 210, 210]);
  const taglineLines = doc.splitTextToSize(profession.tagline, cw - 30);
  const taglineY = 98 + nameLines.length * 13 + 11;
  doc.text(taglineLines, W / 2, taglineY, { align: 'center' });

  // "What's inside" teaser box on the cover to fill the gap before the stats
  const insideY = taglineY + taglineLines.length * 6.5 + 14;
  setDraw([40, 40, 40]);
  doc.setLineWidth(0.2);
  doc.line(margin + 20, insideY, W - margin - 20, insideY);
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(7.5);
  setText([140, 140, 140]);
  doc.text("WHAT'S INSIDE", W / 2, insideY + 9, { align: 'center' });
  const insideItems = ['Every workflow, ranked by payback speed', 'The exact tool stack, wired together', 'A 12-page, 90-day deployment roadmap', 'The full ROI math for this profession'];
  doc.setFont('Inter', 'normal');
  doc.setFontSize(8.6);
  setText([190, 190, 190]);
  insideItems.forEach((it, i) => {
    doc.text(it, W / 2, insideY + 17 + i * 6.5, { align: 'center' });
  });

  const statY = 224;
  const statEntries: [string, string][] = [
    [profession.stats.timeSaved, 'saved / week'],
    [profession.stats.revenueImpact, 'revenue impact'],
    [`${profession.stats.deploymentDays}d`, 'to deploy'],
    [`${profession.stats.roiMonths}mo`, 'to full ROI'],
  ];
  const statW = cw / statEntries.length;
  statEntries.forEach((s, i) => {
    const cx = margin + statW * i + statW / 2;
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(16);
    setText(accent);
    doc.text(s[0], cx, statY, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(6.8);
    setText([150, 150, 150]);
    const wrapped = doc.splitTextToSize(s[1], statW - 4);
    doc.text(wrapped, cx, statY + 6, { align: 'center' });
  });

  doc.setFont('Inter', 'normal');
  doc.setFontSize(8);
  setText([120, 120, 120]);
  const dateLine = recipientEmail
    ? `Prepared for ${recipientEmail} · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
    : `${profession.category} · Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
  doc.text(dateLine, W / 2, H - 18, { align: 'center' });
  doc.setFontSize(7);
  doc.text('purist.online', W / 2, H - 12, { align: 'center' });

  // ══════════════════════════ WHAT'S INSIDE (TOC) ══════════════════════════
  newPage();
  eyebrow("What's inside");
  heading('A complete deployment plan, not a brochure', 18);
  paragraph(`This guide is built specifically for ${profession.name.toLowerCase()}s in ${profession.category.toLowerCase()}. Every number comes from live PURIST deployments in this category, nothing here is generic automation advice.`);
  divider();

  const toc: Array<[string, string, string]> = [
    ['01', 'Why this matters', `What's actually costing ${profession.name.toLowerCase()}s time and revenue`],
    ['02', 'The automation stack', 'The tools and architecture that connect every workflow'],
    ['03', `Workflows 1-${profession.workflows.length}`, 'A full deep-dive on every workflow, in priority order'],
    ['04', 'The 90-day roadmap', 'Exactly what happens from day 0 to full deployment'],
    ['05', 'The ROI math', 'Real numbers: time reclaimed, revenue impact, payback period'],
    ['06', 'Common mistakes', 'What to avoid if you build this yourself'],
    ['07', 'FAQ', 'The questions we hear most from this profession'],
  ];
  toc.forEach(([num, title, desc]) => {
    checkPage(20);
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(13);
    setText(accent);
    doc.text(num, margin, y);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(10.5);
    setText(dark);
    doc.text(title, margin + 14, y);
    y += 5.5;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.8);
    setText([120, 120, 120]);
    doc.text(desc, margin + 14, y);
    y += 13;
  });

  divider(4);
  subhead('Quick facts for this profession');
  const quickFacts: [string, string][] = [
    [profession.stats.timeSaved, 'Reclaimed weekly'],
    [profession.stats.revenueImpact, 'Revenue impact'],
    [`${profession.workflows.length}`, 'Workflows in this guide'],
    [`${profession.tools.length}`, 'Tools required'],
  ];
  const qfW = cw / quickFacts.length;
  checkPage(28);
  quickFacts.forEach((qf, i) => {
    const cx = margin + qfW * i + qfW / 2;
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(15);
    setText(accent);
    doc.text(qf[0], cx, y, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7.4);
    setText([130, 130, 130]);
    const wrapped = doc.splitTextToSize(qf[1], qfW - 6);
    doc.text(wrapped, cx, y + 6, { align: 'center' });
  });
  y += 22;

  // ══════════════════════════ WHY THIS MATTERS ══════════════════════════
  newPage();
  eyebrow('Why this matters');
  heading(`What's actually costing ${profession.name.toLowerCase()}s time and money`, 17);
  paragraph(profession.description, 10, [50, 50, 50]);
  subhead('The pattern shows up the same way, every time:');

  profession.painPoints.forEach((p, i) => {
    checkPage(16);
    setFill(accent);
    doc.circle(margin + 2.2, y - 1.4, 2.2, 'F');
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(8.2);
    setText([255, 255, 255]);
    doc.text(String(i + 1), margin + 2.2, y - 0.9, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.5);
    setText([60, 60, 60]);
    const lines = doc.splitTextToSize(p, cw - 10);
    doc.text(lines, margin + 8, y);
    y += lines.length * 4.6 + 6;
  });

  const totalHours = parseHours(profession.stats.timeSaved);
  const annualHoursCost = Math.round(totalHours * 50);
  calloutBox(
    'The cost of doing nothing',
    `At ${profession.stats.timeSaved} lost to manual work, that's roughly ${annualHoursCost} hours a year, more than ${Math.round(annualHoursCost / 8)} full working days, spent on tasks that don't require a human decision. That's the baseline this guide is built to eliminate.`,
  );

  divider();
  subhead('What good looks like after this is fixed');
  paragraph(
    `Picture the same week, minus the busywork: leads get a response in minutes instead of hours, nothing depends on someone remembering to follow up, and the numbers you need for a decision are already sitting in a dashboard instead of buried in a spreadsheet. That is not a hypothetical. It's the standard outcome across every ${profession.name.toLowerCase()} deployment in the PURIST client base, typically live within ${profession.stats.deploymentDays} days of the audit call.`,
  );

  // ══════════════════════════ IS THIS YOU? DIAGNOSTIC ══════════════════════════
  newPage();
  eyebrow('Quick self-check');
  heading('Is this you right now?', 17);
  paragraph(
    `Score yourself against the ${profession.painPoints.length} patterns below. Most ${profession.name.toLowerCase()}s we deploy for check at least ${Math.max(2, Math.ceil(profession.painPoints.length * 0.6))} of these before we start.`,
  );

  profession.painPoints.forEach((p) => {
    checkPage(18);
    setDraw(mix(accent, [180, 180, 180], 0.4));
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y - 5.5, 6, 6, 1.2, 1.2, 'S');
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(6.5);
    setText(accent);
    doc.text('✓', margin + 3, y - 1.2, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.4);
    setText([55, 55, 55]);
    const lines = doc.splitTextToSize(p, cw - 12);
    doc.text(lines, margin + 10, y);
    y += lines.length * 4.5 + 8;
  });

  calloutBox(
    `Checked most of these?`,
    `That is the exact profile of every ${profession.name.toLowerCase()} we've deployed this stack for. Nothing about your situation is unusual, it's the standard starting point, and the fix is the same one detailed over the next ${profession.workflows.length + 8} pages.`,
    'dark',
  );

  // ══════════════════════════ THE STACK ══════════════════════════
  newPage();
  eyebrow('The automation stack');
  heading('What connects to what', 17);
  paragraph(
    `Every PURIST deployment follows the same architecture: a trigger fires from wherever the work already happens, n8n routes and transforms the data, an AI layer handles anything requiring judgment, and the result lands back in the tools your team already uses.`,
  );
  drawFlowDiagram();
  divider();
  subhead('Tools required for this stack');
  let chipX = margin;
  let chipY = y;
  profession.tools.forEach((t) => {
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.5);
    const tw = doc.getTextWidth(t) + 8;
    if (chipX + tw > W - margin) { chipX = margin; chipY += 11; }
    checkPage(11);
    setFill([246, 246, 246]);
    doc.roundedRect(chipX, chipY - 5, tw, 7.5, 2, 2, 'F');
    setText([80, 80, 80]);
    doc.text(t, chipX + 4, chipY);
    chipX += tw + 4;
  });
  y = chipY + 11;
  divider();
  paragraph(
    `If you already run some of these tools, nothing here gets ripped out. PURIST connects what you have. n8n sits in the middle as the routing layer, so a change in one tool (a new CRM, a different invoicing platform) means updating one connection, not rebuilding the whole system.`,
  );
  drawBarChart(
    'Where the time savings come from',
    profession.workflows.map((wf) => ({ label: wf.name, value: parseHours(wf.timeSaved), suffix: 'h' })),
  );

  // ══════════════════════════ WORKFLOWS (one page each) ══════════════════════════
  const totalWorkflowHours = profession.workflows.reduce((sum, w) => sum + parseHours(w.timeSaved), 0) || 1;
  profession.workflows.forEach((wf, i) => {
    newPage();
    eyebrow(`Workflow ${i + 1} of ${profession.workflows.length}`);
    heading(wf.name, 16);

    const share = Math.round((parseHours(wf.timeSaved) / totalWorkflowHours) * 100);
    checkPage(14);
    const tagLabel = i === 0 ? 'Highest priority' : i === profession.workflows.length - 1 ? 'Lowest lift' : 'Priority';
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.5);
    const tagText = `${tagLabel.toUpperCase()}  ·  ${share}% OF TOTAL TIME RECLAIMED`;
    const tagPadX = 8;
    const tagH = 8.5;
    const tagW = doc.getTextWidth(tagText) + tagPadX * 2;
    setFill(paleAccent);
    doc.roundedRect(margin, y - tagH + 2.5, tagW, tagH, tagH / 2, tagH / 2, 'F');
    setText([Math.round(accent[0] * 0.5), Math.round(accent[1] * 0.5), Math.round(accent[2] * 0.5)]);
    doc.text(tagText, margin + tagPadX, y - 0.2);
    y += 12;

    paragraph(wf.description, 9.8, [50, 50, 50]);

    const halfW = cw / 2;
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(11.5);
    const impactLines = doc.splitTextToSize(wf.impact, halfW - 16).slice(0, 2);
    const impactTextH = impactLines.length * 5.2;
    const labelY = 9 + impactTextH + 5;
    const boxH = Math.max(24, labelY + 5);
    checkPage(boxH + 8);
    const boxTop = y;
    setFill([250, 250, 250]);
    doc.roundedRect(margin, boxTop, cw, boxH, 3, 3, 'F');
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(14);
    setText(accent);
    doc.text(wf.timeSaved, margin + 8, boxTop + 9);
    doc.setFontSize(11.5);
    doc.text(impactLines, margin + halfW + 8, boxTop + 9);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(6.8);
    setText([140, 140, 140]);
    doc.text('TIME RECLAIMED', margin + 8, boxTop + labelY);
    doc.text('BUSINESS IMPACT', margin + halfW + 8, boxTop + labelY);
    y = boxTop + boxH + 7;

    divider();
    subhead('Manual today, versus automated');
    const cmpBoxH = 22;
    checkPage(cmpBoxH + 6);
    const cmpGap = 8;
    const cmpW = (cw - cmpGap) / 2;
    const cmpPad = 8;

    setFill([253, 245, 244]);
    setDraw([240, 210, 206]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, cmpW, cmpBoxH, 3, 3, 'FD');
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.3);
    setText([175, 75, 65]);
    doc.text('×  MANUAL TODAY', margin + cmpPad, y + 7);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8);
    setText([100, 70, 65]);
    doc.text(doc.splitTextToSize('Someone has to remember, track, and execute this by hand, every time.', cmpW - cmpPad * 2), margin + cmpPad, y + 13.5);

    const cmpX2 = margin + cmpW + cmpGap;
    setFill(paleAccent);
    setDraw(mix(accent, [255, 255, 255], 0.6));
    doc.roundedRect(cmpX2, y, cmpW, cmpBoxH, 3, 3, 'FD');
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.3);
    setText([Math.round(accent[0] * 0.45), Math.round(accent[1] * 0.45), Math.round(accent[2] * 0.45)]);
    doc.text('✓  AUTOMATED WITH PURIST', cmpX2 + cmpPad, y + 7);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8);
    setText([60, 60, 60]);
    doc.text(doc.splitTextToSize(`Runs on its own: ${wf.timeSaved.toLowerCase()} back, every week, with zero manual steps.`, cmpW - cmpPad * 2), cmpX2 + cmpPad, y + 13.5);
    y += cmpBoxH + 8;

    divider();
    subhead('How this gets built');
    const buildSteps: Array<[string, string]> = [
      [`Week 1: Connect the source`, `Wire up the trigger condition so "${wf.name.toLowerCase()}" fires automatically the moment the underlying event happens, no manual kickoff.`],
      ['Week 1-2: Build the logic', 'Construct the workflow in n8n and test it against real historical data from your own records, not sample data.'],
      ['Week 2: Handle edge cases', 'Define what happens on a missing field, a failed API call, or a duplicate trigger, before it ever reaches a real customer.'],
      [`Week 3: Deploy & monitor`, `Go live in production, watch it closely for the first ${profession.stats.deploymentDays > 5 ? 'two weeks' : 'week'}, then hand over with monitoring in place.`],
    ];
    buildSteps.forEach(([label, desc], si) => {
      checkPage(15);
      setFill(accent);
      doc.circle(margin + 2, y - 1.3, 2, 'F');
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(6.8);
      setText([255, 255, 255]);
      doc.text(String(si + 1), margin + 2, y - 0.8, { align: 'center' });
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(8.8);
      setText(dark);
      doc.text(label, margin + 7, y);
      y += 4.6;
      doc.setFont('Inter', 'normal');
      doc.setFontSize(8.6);
      setText([100, 100, 100]);
      const lines = doc.splitTextToSize(desc, cw - 9);
      doc.text(lines, margin + 7, y);
      y += lines.length * 4.2 + 6;
    });
  });

  // ══════════════════════════ 90-DAY ROADMAP ══════════════════════════
  newPage();
  eyebrow('Deployment roadmap');
  heading('From this PDF to production in days, not months', 17);
  paragraph('Every playbook is deployed using the same precision process, regardless of industry.');

  const roadmap: Array<[string, string, string, number, number]> = [
    ['Day 0', 'Free audit call', 'We map your exact processes, confirm the tools in your stack, and prioritize by ROI.', 0, 0.06],
    ['Day 1-2', 'Architecture', 'We design the full workflow graph, define data schemas, and set up your environment.', 0.06, 0.32],
    ['Day 3-5', 'Build & test', 'Workflows are built and tested with real data in sandbox; edge cases handled.', 0.32, 0.75],
    [`Day 6-${profession.stats.deploymentDays}`, 'Go live + handover', 'Deploy to production, team walkthrough, monitoring set up, 30-day support included.', 0.75, 1],
  ];
  drawTimeline(roadmap.map(([label, , , s, e]) => ({ label, startFrac: s, endFrac: e })), profession.stats.deploymentDays);
  roadmap.forEach(([day, title, desc]) => {
    checkPage(20);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(10);
    setText(dark);
    doc.text(`${day}: ${title}`, margin, y);
    y += 5.5;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9);
    setText([90, 90, 90]);
    const lines = doc.splitTextToSize(desc, cw);
    doc.text(lines, margin, y);
    y += lines.length * 4.4 + 7;
  });
  calloutBox(
    'After go-live',
    'PURIST includes 30 days of active monitoring post-launch, followed by a monthly check-in to confirm every workflow is still hitting its ROI target. Nothing ships and gets abandoned.',
    'dark',
  );

  // ══════════════════════════ ROI MATH ══════════════════════════
  newPage();
  eyebrow('The ROI math');
  heading('What this is actually worth over a year', 17);

  const revenueMatch = profession.stats.revenueImpact.match(/[\d,.]+/);
  const revenueNum = revenueMatch ? parseFloat(revenueMatch[0].replace(/,/g, '')) : 0;
  const currencySymbol = profession.stats.revenueImpact.match(/^[^\d]+/)?.[0]?.trim() || '$';
  const annualHours = Math.round(totalHours * 50);

  const roiRows: [string, string][] = [
    ['Time reclaimed per week', profession.stats.timeSaved],
    ['Time reclaimed per year (50 working weeks)', `${annualHours} hours`],
    ['Monthly revenue impact', profession.stats.revenueImpact],
    ['Time to deploy', `${profession.stats.deploymentDays} days`],
    ['Time to full ROI', `${profession.stats.roiMonths} month${profession.stats.roiMonths === 1 ? '' : 's'}`],
  ];
  roiRows.forEach(([label, value], i) => {
    checkPage(13);
    if (i % 2 === 0) { setFill([250, 250, 250]); doc.rect(margin, y - 6, cw, 11, 'F'); }
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.3);
    setText([90, 90, 90]);
    doc.text(label, margin + 4, y);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.3);
    setText(dark);
    doc.text(value, W - margin - 4, y, { align: 'right' });
    y += 11;
  });
  y += 4;

  drawVerticalBarChart(
    'Projected cumulative revenue impact',
    [1, 3, 6, 9, 12].map((m) => ({ label: `Month ${m}`, value: revenueNum * m })),
    currencySymbol,
  );

  paragraph(
    'These figures come from live PURIST deployments in this category, not projections pulled from nowhere. Your exact numbers depend on team size, current tools, and how much of this is already partially automated. That is exactly what the free audit call establishes.',
    9,
  );

  // ══════════════════════════ CATEGORY BENCHMARK ══════════════════════════
  newPage();
  eyebrow('How you compare');
  heading(`Where ${profession.name.toLowerCase()}s rank inside ${profession.category}`, 16);

  const peers = professions.filter((p) => p.category === profession.category);
  const peerHours = peers.map((p) => parseHours(p.stats.timeSaved));
  const categoryAvgHours = peerHours.reduce((s, h) => s + h, 0) / (peerHours.length || 1);
  const rankAmongPeers = [...peers]
    .sort((a, b) => parseHours(b.stats.timeSaved) - parseHours(a.stats.timeSaved))
    .findIndex((p) => p.slug === profession.slug) + 1;
  const percentile = Math.max(1, Math.round((1 - (rankAmongPeers - 1) / Math.max(peers.length - 1, 1)) * 100));

  paragraph(
    `PURIST has mapped ${peers.length} distinct professions inside ${profession.category}. On weekly hours reclaimed, ${profession.name.toLowerCase()}s rank ${rankAmongPeers} of ${peers.length}, roughly the top ${percentile}% of the category.`,
  );

  const benchCompareH = 24;
  checkPage(benchCompareH + 10);
  subhead('This profession versus the category average');
  const benchRows: Array<[string, string, string]> = [
    ['Weekly hours reclaimed', profession.stats.timeSaved, `${categoryAvgHours.toFixed(1)}h avg`],
    ['Days to deploy', `${profession.stats.deploymentDays}d`, `${(peers.reduce((s, p) => s + p.stats.deploymentDays, 0) / peers.length).toFixed(1)}d avg`],
    ['Months to full ROI', `${profession.stats.roiMonths}mo`, `${(peers.reduce((s, p) => s + p.stats.roiMonths, 0) / peers.length).toFixed(1)}mo avg`],
  ];
  benchRows.forEach(([label, mine, avg], i) => {
    checkPage(13);
    if (i % 2 === 0) { setFill([250, 250, 250]); doc.rect(margin, y - 6, cw, 11, 'F'); }
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.3);
    setText([90, 90, 90]);
    doc.text(label, margin + 4, y);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.3);
    setText(accent);
    doc.text(mine, W - margin - 4 - 40, y, { align: 'right' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.4);
    setText([150, 150, 150]);
    doc.text(avg, W - margin - 4, y, { align: 'right' });
    y += 11;
  });
  y += 6;

  divider();
  subhead(`Other ${profession.category.toLowerCase()} professions PURIST has mapped`);
  const otherPeers = peers.filter((p) => p.slug !== profession.slug).slice(0, 6);
  otherPeers.forEach((p) => {
    checkPage(11);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.8);
    setText([80, 80, 80]);
    doc.text(p.name, margin + 4, y);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(8.4);
    setText([140, 140, 140]);
    doc.text(p.stats.timeSaved, W - margin - 4, y, { align: 'right' });
    y += 8.5;
  });
  y += 6;
  calloutBox(
    'Why this matters',
    `The category pattern is consistent: businesses that wait longer to automate lose proportionally more time as they scale. Ranking ${rankAmongPeers} of ${peers.length} today does not mean staying there, it means the fix is well-documented for exactly your type of business.`,
  );

  // ══════════════════════════ COMMON MISTAKES ══════════════════════════
  newPage();
  eyebrow('Before you start');
  heading('Common mistakes when automating this yourself', 16);
  paragraph(
    `Most of the failed automation attempts we get called in to fix share the same five root causes, regardless of industry. None of them are about the tools. They're about sequencing and ownership.`,
  );
  MISTAKES.forEach(([mistake, fix]) => {
    checkPage(22);
    doc.setFont('FrauncesItalic', 'normal');
    doc.setFontSize(13);
    setText(accent);
    doc.text('×', margin, y);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.6);
    setText([50, 50, 50]);
    const mLines = doc.splitTextToSize(mistake, cw - 9);
    doc.text(mLines, margin + 7, y);
    y += mLines.length * 4.6 + 3;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.8);
    setText([110, 110, 110]);
    const fLines = doc.splitTextToSize(`Instead: ${fix}`, cw - 9);
    doc.text(fLines, margin + 7, y);
    y += fLines.length * 4.3 + 8;
  });

  // ══════════════════════════ FAQ ══════════════════════════
  newPage();
  eyebrow('Questions we hear most');
  heading('FAQ', 16);
  profession.faq.forEach((f) => {
    checkPage(20);
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(11);
    setText(dark);
    const qLines = doc.splitTextToSize(f.q, cw);
    doc.text(qLines, margin, y);
    y += qLines.length * 5 + 4;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.5);
    setText([90, 90, 90]);
    const aLines = doc.splitTextToSize(f.a, cw);
    checkPage(aLines.length * 4.6 + 10);
    doc.text(aLines, margin, y);
    y += aLines.length * 4.6 + 11;
  });
  calloutBox(
    'Still have questions?',
    'Reply to the email that sent you this guide, or book a free 45-minute audit. We\'ll answer anything specific to your setup live, no pitch attached.',
  );

  // ══════════════════════════ CLOSING CTA ══════════════════════════
  newPage();
  doc.setFillColor(...dark);
  doc.rect(0, 0, W, H, 'F');
  y = 46;
  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(9);
  setText(accent);
  doc.text('WANT US TO DEPLOY THIS FOR YOU?', W / 2, y, { align: 'center' });
  y += 14;
  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(21);
  setText(cream);
  const ctaLines = doc.splitTextToSize(`For ${profession.category.toLowerCase()} businesses like yours, we deploy in ${profession.stats.deploymentDays} days.`, cw - 20);
  doc.text(ctaLines, W / 2, y, { align: 'center' });
  y += ctaLines.length * 9 + 16;

  const whyPoints = [
    'No slide deck, no sales script. We open your actual tools and look at your actual data.',
    'You get a written action plan by email the same day, whether you become a client or not.',
    "If we don't find at least one workflow worth automating, we'll tell you plainly.",
  ];
  whyPoints.forEach((wp) => {
    checkPage(12);
    setFill(mix(accent, [10, 10, 10], 0.15));
    doc.circle(margin + 24, y - 1.2, 1.8, 'F');
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.8);
    setText([200, 200, 200]);
    const lines = doc.splitTextToSize(wp, cw - 56);
    doc.text(lines, margin + 30, y);
    y += lines.length * 4.4 + 5;
  });
  y += 8;

  const closingStats: [string, string][] = [['312+', 'deployments'], ['99.97%', 'uptime SLA'], [`${profession.stats.roiMonths}mo`, 'to full ROI']];
  const cW = cw / 3;
  closingStats.forEach((s, i) => {
    const cx = margin + cW * i + cW / 2;
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(16);
    setText(accent);
    doc.text(s[0], cx, y, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7);
    setText([150, 150, 150]);
    doc.text(s[1].toUpperCase(), cx, y + 6, { align: 'center' });
  });
  y += 26;

  const AUDIT_URL = 'https://www.purist.online/pages/welcome';
  const btnX = W / 2 - 38;
  const btnW = 76;
  const btnH = 14;
  setFill(accent);
  doc.roundedRect(btnX, y, btnW, btnH, 3, 3, 'F');
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(10);
  setText(dark);
  doc.text('Book your free audit', W / 2, y + 9, { align: 'center' });
  doc.link(btnX, y, btnW, btnH, { url: AUDIT_URL });
  y += 24;
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9);
  setText(accent);
  doc.textWithLink('purist.online/pages/welcome', W / 2, y, { url: AUDIT_URL, align: 'center' });
  y += 6;
  doc.setFont('Inter', 'normal');
  setText([150, 150, 150]);
  doc.text('45 minutes · No pitch · No commitment', W / 2, y, { align: 'center' });
  y += 22;

  // Social + legal footer
  checkPage(30);
  setDraw([40, 40, 40]);
  doc.setLineWidth(0.2);
  doc.line(margin + 30, y, W - margin - 30, y);
  y += 11;

  const socials: Array<[string, string]> = [
    ['LinkedIn', 'https://www.linkedin.com/company/purist-automation'],
    ['Instagram', 'https://www.instagram.com/purist.online'],
    ['X / Twitter', 'https://x.com/Puristonline'],
    ['TikTok', 'https://www.tiktok.com/@purist_online?lang=fr'],
    ['Facebook', 'https://www.facebook.com/profile.php?id=61588795720384'],
  ];
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(8.2);
  const socialGap = 5;
  const socialWidths = socials.map(([label]) => doc.getTextWidth(label));
  const totalSocialW = socialWidths.reduce((a, b) => a + b, 0) + socialGap * (socials.length - 1);
  let sx = W / 2 - totalSocialW / 2;
  socials.forEach(([label, url], i) => {
    setText([210, 210, 210]);
    doc.textWithLink(label, sx, y, { url });
    sx += socialWidths[i] + socialGap;
    if (i < socials.length - 1) {
      setText([80, 80, 80]);
      doc.text('·', sx - socialGap / 2 - 0.5, y, { align: 'center' });
    }
  });
  y += 9;

  doc.setFont('Inter', 'normal');
  doc.setFontSize(7.5);
  setText([110, 110, 110]);
  doc.text('hello@purist.online', W / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(7);
  setText([80, 80, 80]);
  doc.text('PURIST · Becreative LTD · Registered in England & Wales', W / 2, y, { align: 'center' });
  y += 5;
  doc.setTextColor(80, 80, 80);
  doc.textWithLink('purist.online', W / 2, y, { url: 'https://www.purist.online', align: 'center' });

  doc.save(`purist-${profession.slug}-automation-guide.pdf`);
}
