import type { Profession } from '~/data/automations';

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

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

const MISTAKES = [
  'Automating a broken process instead of fixing it first — automation makes a bad process fail faster, not better.',
  'Choosing the tools before mapping the workflow, which locks you into integrations that don\'t actually fit how the business runs.',
  'Skipping error handling — no fallback for a failed API call or a missing field means the whole workflow silently breaks.',
  'Rolling out every workflow at once instead of proving one, measuring it, then expanding — most failed automations tried to do too much on day one.',
  'No one owns monitoring once it\'s live. A workflow with no owner degrades quietly until someone notices revenue or leads are missing.',
];

export async function buildGuidePdf(profession: Profession, accentColor: string) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  await loadBrandFonts(doc);

  const W = 210;
  const H = 297;
  const margin = 20;
  const cw = W - margin * 2;
  const [ar, ag, ab] = hexToRgb(accentColor);
  const cream: [number, number, number] = [248, 246, 241];
  const dark: [number, number, number] = [10, 10, 10];
  const bodyGray: [number, number, number] = [70, 70, 70];
  const lightGray: [number, number, number] = [150, 150, 150];

  let page = 0;
  let y = margin;

  const sections: Array<{ title: string; page: number }> = [];

  function newPage(chrome = true) {
    doc.addPage();
    page += 1;
    y = margin;
    if (chrome) drawChrome();
  }

  function drawChrome() {
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 180, 180);
    doc.text('PURIST', margin, 12);
    doc.setFont('Inter', 'normal');
    doc.text(profession.name.toUpperCase(), W - margin, 12, { align: 'right' });
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.line(margin, 15, W - margin, 15);
    doc.setFontSize(7.5);
    doc.setTextColor(180, 180, 180);
    doc.text(String(page + 1), W / 2, H - 10, { align: 'center' });
    y = 24;
  }

  function checkPage(need: number) {
    if (y + need > H - 18) newPage();
  }

  function heading(text: string, size = 16) {
    checkPage(size / 2 + 8);
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...dark);
    const lines = doc.splitTextToSize(text, cw);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.42) + 6;
    sections.push({ title: text, page: page + 1 });
  }

  function eyebrow(text: string) {
    checkPage(10);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(ar, ag, ab);
    doc.text(text.toUpperCase(), margin, y);
    y += 8;
  }

  function paragraph(text: string, size = 9.5, color: [number, number, number] = bodyGray) {
    doc.setFont('Inter', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, cw);
    checkPage(lines.length * size * 0.42 + 4);
    doc.text(lines, margin, y);
    y += lines.length * size * 0.42 + 6;
  }

  function divider() {
    checkPage(10);
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.2);
    doc.line(margin, y, W - margin, y);
    y += 8;
  }

  // ══════════════════════════ COVER ══════════════════════════
  doc.setFillColor(...dark);
  doc.rect(0, 0, W, H, 'F');

  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(24);
  doc.setTextColor(...cream);
  doc.text('PURIST', W / 2, 46, { align: 'center' });
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(ar, ag, ab);
  doc.text('FREE AUTOMATION GUIDE', W / 2, 55, { align: 'center' });

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.4);
  doc.line(W / 2 - 14, 62, W / 2 + 14, 62);

  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(30);
  doc.setTextColor(...cream);
  const nameLines = doc.splitTextToSize(profession.name, cw - 10);
  doc.text(nameLines, W / 2, 100, { align: 'center' });

  doc.setFont('FrauncesItalic', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(210, 210, 210);
  const taglineLines = doc.splitTextToSize(profession.tagline, cw - 30);
  doc.text(taglineLines, W / 2, 100 + nameLines.length * 13 + 12, { align: 'center' });

  const statY = 195;
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
    doc.setFontSize(17);
    doc.setTextColor(ar, ag, ab);
    doc.text(s[0], cx, statY, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    const wrapped = doc.splitTextToSize(s[1], statW - 4);
    doc.text(wrapped, cx, statY + 6, { align: 'center' });
  });

  doc.setFont('Inter', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`${profession.category} · Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, W / 2, H - 18, { align: 'center' });
  doc.setFontSize(7);
  doc.text('purist.online', W / 2, H - 12, { align: 'center' });

  // ══════════════════════════ WHY THIS MATTERS ══════════════════════════
  newPage();
  eyebrow('Why this matters');
  heading(`What's actually costing ${profession.name.toLowerCase()}s time and money`, 18);
  paragraph(profession.description, 10.5, [50, 50, 50]);
  y += 2;
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...dark);
  checkPage(10);
  doc.text('The pattern shows up the same way, every time:', margin, y);
  y += 9;

  profession.painPoints.forEach((p, i) => {
    checkPage(16);
    doc.setFillColor(ar, ag, ab);
    doc.circle(margin + 2.2, y - 1.4, 2.2, 'F');
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(String(i + 1), margin + 2.2, y - 0.9, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(p, cw - 10);
    doc.text(lines, margin + 8, y);
    y += lines.length * 4.6 + 6;
  });

  // ══════════════════════════ THE STACK ══════════════════════════
  newPage();
  eyebrow('The automation stack');
  heading('What connects to what', 18);
  paragraph(
    `Every PURIST deployment follows the same architecture: a trigger fires from wherever the work already happens, n8n routes and transforms the data, an AI layer handles anything requiring judgment, and the result lands back in the tools your team already uses. For ${profession.name.toLowerCase()}s, that stack typically looks like this:`,
    9.5,
  );
  y += 2;
  divider();
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...dark);
  checkPage(8);
  doc.text('Tools required', margin, y);
  y += 8;
  profession.tools.forEach((t) => {
    checkPage(9);
    doc.setFillColor(246, 246, 246);
    const tw = doc.getTextWidth(t) + 8;
    doc.roundedRect(margin, y - 5, tw, 7.5, 2, 2, 'F');
    doc.setFont('Inter', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text(t, margin + 4, y);
    y += 11;
  });
  y += 4;
  divider();
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...dark);
  checkPage(30);
  doc.text('Trigger  →  n8n workflow  →  AI layer (where judgment is needed)  →  Action  →  Confirmation', margin, y);
  y += 8;
  paragraph('Every step is logged. If a workflow fails, it retries automatically and alerts a human — nothing silently disappears.', 9);

  // ══════════════════════════ WORKFLOWS (one page each) ══════════════════════════
  profession.workflows.forEach((wf, i) => {
    newPage();
    eyebrow(`Workflow ${i + 1} of ${profession.workflows.length}`);
    heading(wf.name, 17);
    paragraph(wf.description, 10, [50, 50, 50]);
    y += 2;

    checkPage(20);
    const boxTop = y;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, boxTop, cw, 20, 3, 3, 'F');
    const halfW = cw / 2;
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(ar, ag, ab);
    doc.text(wf.timeSaved, margin + 8, boxTop + 9);
    doc.text(wf.impact, margin + halfW + 8, boxTop + 9);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.text('TIME RECLAIMED', margin + 8, boxTop + 15);
    const impactLabelLines = doc.splitTextToSize('BUSINESS IMPACT', halfW - 16);
    doc.text(impactLabelLines, margin + halfW + 8, boxTop + 15);
    y = boxTop + 26;

    divider();
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...dark);
    checkPage(10);
    doc.text('How this gets built', margin, y);
    y += 8;

    const buildSteps = [
      `Week 1 — Connect the source system and confirm the exact trigger condition (${wf.name.toLowerCase()} starts here).`,
      'Week 1-2 — Build the workflow logic in n8n and test it against real historical data, not sample data.',
      'Week 2 — Handle edge cases: missing fields, failed API calls, duplicate triggers.',
      `Week 3 — Deploy to production, monitor the first ${profession.stats.deploymentDays > 5 ? 'two weeks' : 'week'} closely, then hand over.`,
    ];
    buildSteps.forEach((s, si) => {
      checkPage(12);
      doc.setFillColor(ar, ag, ab);
      doc.circle(margin + 2, y - 1.3, 2, 'F');
      doc.setFont('InterSemiBold', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(String(si + 1), margin + 2, y - 0.8, { align: 'center' });
      doc.setFont('Inter', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(70, 70, 70);
      const lines = doc.splitTextToSize(s, cw - 9);
      doc.text(lines, margin + 7, y);
      y += lines.length * 4.4 + 5;
    });
  });

  // ══════════════════════════ 90-DAY ROADMAP ══════════════════════════
  newPage();
  eyebrow('Deployment roadmap');
  heading('From this PDF to production in 7 days', 18);
  paragraph('Every playbook is deployed using the same precision process, regardless of industry.', 9.5);
  y += 2;

  const roadmap: [string, string, string][] = [
    ['Day 0', 'Free audit call', 'We map your exact processes, confirm the tools in your stack, and prioritize by ROI.'],
    ['Day 1-2', 'Architecture', 'We design the full workflow graph, define data schemas, and set up your environment.'],
    ['Day 3-5', 'Build & test', 'Workflows are built and tested with real data in sandbox; edge cases handled.'],
    ['Day 6-7', 'Go live + handover', 'Deploy to production, team walkthrough, monitoring set up, 30-day support included.'],
  ];
  roadmap.forEach(([day, title, desc]) => {
    checkPage(24);
    doc.setFillColor(ar, ag, ab);
    doc.roundedRect(margin, y - 5, 22, 7, 2, 2, 'F');
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(day, margin + 11, y - 0.3, { align: 'center' });
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...dark);
    doc.text(title, margin + 27, y);
    y += 6;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const lines = doc.splitTextToSize(desc, cw - 27);
    doc.text(lines, margin + 27, y);
    y += lines.length * 4.4 + 9;
  });

  // ══════════════════════════ ROI MATH ══════════════════════════
  newPage();
  eyebrow('The ROI math');
  heading('What this is actually worth over a year', 18);

  const timeSavedNum = parseFloat(profession.stats.timeSaved) || 0;
  const annualHours = Math.round(timeSavedNum * 50);
  const revenueMatch = profession.stats.revenueImpact.match(/[\d,.]+/);
  const revenueNum = revenueMatch ? parseFloat(revenueMatch[0].replace(/,/g, '')) : 0;
  const currencySymbol = profession.stats.revenueImpact.match(/^[^\d]+/)?.[0]?.trim() || '$';
  const annualRevenue = Math.round(revenueNum * 12);

  const roiRows: [string, string][] = [
    ['Time reclaimed per week', profession.stats.timeSaved],
    ['Time reclaimed per year (50 working weeks)', `${annualHours} hours`],
    ['Monthly revenue impact', profession.stats.revenueImpact],
    ['Annualized revenue impact', `${currencySymbol}${annualRevenue.toLocaleString('en-US')}`],
    ['Time to deploy', `${profession.stats.deploymentDays} days`],
    ['Time to full ROI', `${profession.stats.roiMonths} month${profession.stats.roiMonths === 1 ? '' : 's'}`],
  ];
  roiRows.forEach(([label, value], i) => {
    checkPage(13);
    if (i % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 6, cw, 11, 'F');
    }
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(90, 90, 90);
    doc.text(label, margin + 4, y);
    doc.setFont('InterSemiBold', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...dark);
    doc.text(value, W - margin - 4, y, { align: 'right' });
    y += 11;
  });
  y += 6;
  paragraph(
    'These figures come from live PURIST deployments in this category, not projections. Your exact numbers depend on team size, current tools, and how much of this is already partially automated — which is exactly what the free audit call establishes.',
    9,
  );

  // ══════════════════════════ COMMON MISTAKES ══════════════════════════
  newPage();
  eyebrow('Before you start');
  heading('Common mistakes when automating this yourself', 17);
  MISTAKES.forEach((m, i) => {
    checkPage(16);
    doc.setFont('FrauncesItalic', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(ar, ag, ab);
    doc.text('×', margin, y);
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(m, cw - 9);
    doc.text(lines, margin + 7, y);
    y += lines.length * 4.6 + 7;
  });

  // ══════════════════════════ FAQ ══════════════════════════
  newPage();
  eyebrow('Questions we hear most');
  heading('FAQ', 17);
  profession.faq.forEach((f) => {
    checkPage(20);
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    const qLines = doc.splitTextToSize(f.q, cw);
    doc.text(qLines, margin, y);
    y += qLines.length * 5 + 4;
    doc.setFont('Inter', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(90, 90, 90);
    const aLines = doc.splitTextToSize(f.a, cw);
    checkPage(aLines.length * 4.6 + 10);
    doc.text(aLines, margin, y);
    y += aLines.length * 4.6 + 11;
  });

  // ══════════════════════════ CLOSING CTA ══════════════════════════
  newPage(false);
  doc.setFillColor(...dark);
  doc.rect(0, 0, W, H, 'F');
  y = 60;
  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(ar, ag, ab);
  doc.text('WANT US TO DEPLOY THIS FOR YOU?', W / 2, y, { align: 'center' });
  y += 14;
  doc.setFont('FrauncesMedium', 'normal');
  doc.setFontSize(22);
  doc.setTextColor(...cream);
  const ctaLines = doc.splitTextToSize(`For ${profession.category.toLowerCase()} businesses like yours, we deploy in ${profession.stats.deploymentDays} days.`, cw - 20);
  doc.text(ctaLines, W / 2, y, { align: 'center' });
  y += ctaLines.length * 9 + 14;

  const closingStats: [string, string][] = [['312+', 'deployments'], ['99.97%', 'uptime SLA'], [`${profession.stats.roiMonths}mo`, 'to full ROI']];
  const cW = cw / 3;
  closingStats.forEach((s, i) => {
    const cx = margin + cW * i + cW / 2;
    doc.setFont('FrauncesMedium', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(ar, ag, ab);
    doc.text(s[0], cx, y, { align: 'center' });
    doc.setFont('Inter', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(s[1].toUpperCase(), cx, y + 6, { align: 'center' });
  });
  y += 30;

  doc.setFillColor(ar, ag, ab);
  doc.roundedRect(W / 2 - 38, y, 76, 14, 3, 3, 'F');
  doc.setFont('InterSemiBold', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...dark);
  doc.text('Book your free audit', W / 2, y + 9, { align: 'center' });
  y += 24;
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('purist.online/pages/welcome', W / 2, y, { align: 'center' });
  y += 6;
  doc.text('45 minutes · No pitch · No commitment', W / 2, y, { align: 'center' });

  doc.save(`purist-${profession.slug}-automation-guide.pdf`);
}
