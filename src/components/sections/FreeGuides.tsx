import { useSignal } from '@preact/signals';
import { track } from '~/lib/amplitude';
import { freeGuides, type FreeGuide } from '~/data/free-guides';

async function buildGuidePdf(guide: FreeGuide) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210;
  const margin = 18;
  const cw = W - margin * 2;
  let y = 0;

  const addPage = () => { doc.addPage(); y = margin; };
  const checkPage = (need: number) => { if (y + need > 280) addPage(); };

  const cream = '#F8F6F1';
  const dark = '#0A0A0A';
  const [ar, ag, ab] = [
    parseInt(guide.accentColor.slice(1, 3), 16),
    parseInt(guide.accentColor.slice(3, 5), 16),
    parseInt(guide.accentColor.slice(5, 7), 16),
  ];

  // ── Cover ──
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, W, 297, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(248, 246, 241);
  doc.text('PURIST', W / 2, 60, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(ar, ag, ab);
  doc.text('FREE AUTOMATION GUIDE', W / 2, 70, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(248, 246, 241);
  const headlineLines = doc.splitTextToSize(guide.headline, cw - 20);
  doc.text(headlineLines, W / 2, 110, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text(`For ${guide.metaLabel}`, W / 2, 130, { align: 'center' });

  const statBoxW = cw / guide.stats.length;
  guide.stats.forEach((s, i) => {
    const cx = margin + statBoxW * i + statBoxW / 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(ar, ag, ab);
    doc.text(s[0], cx, 165, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    const wrapped = doc.splitTextToSize(s[1], statBoxW - 6);
    doc.text(wrapped, cx, 171, { align: 'center' });
  });

  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · purist.online`, W / 2, 280, { align: 'center' });

  // ── Content page ──
  addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, 297, 'F');

  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(guide.label, margin, y + 8);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  const introLines = doc.splitTextToSize(guide.intro, cw);
  doc.text(introLines, margin, y);
  y += introLines.length * 5 + 8;

  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, W - margin, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('Tools typically involved', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  const toolsLine = guide.tools.join('  ·  ');
  const toolsWrapped = doc.splitTextToSize(toolsLine, cw);
  doc.text(toolsWrapped, margin, y);
  y += toolsWrapped.length * 5 + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('Priority workflows to automate first', margin, y);
  y += 8;

  guide.workflows.forEach((wf, i) => {
    checkPage(30);
    doc.setFillColor(ar, ag, ab);
    doc.circle(margin + 2, y - 1.5, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 20);
    doc.text(`${i + 1}. ${wf.name}`, margin + 7, y);
    y += 5.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const descLines = doc.splitTextToSize(wf.desc, cw - 7);
    doc.text(descLines, margin + 7, y);
    y += descLines.length * 4.6 + 2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(ar, ag, ab);
    doc.text(`${wf.time}  ·  ${wf.roi}  ·  ${wf.complexity} complexity`, margin + 7, y);
    y += 9;
  });

  y += 2;
  checkPage(45);
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, W - margin, y);
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('Before you start — quick checklist', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  guide.checklist.forEach((c) => {
    checkPage(10);
    doc.rect(margin, y - 3.2, 3, 3);
    const lines = doc.splitTextToSize(c, cw - 8);
    doc.text(lines, margin + 6, y);
    y += lines.length * 4.6 + 3;
  });

  y += 6;
  checkPage(24);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, cw, 20, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);
  doc.text('Want us to deploy this for you?', margin + 6, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  doc.text('Book a free 60-minute automation audit at purist.online/pages/welcome', margin + 6, y + 14.5);

  doc.save(`purist-${guide.id}-automation-guide.pdf`);
}

function GuideCard({ guide, onOpen }: { guide: FreeGuide; onOpen: (g: FreeGuide) => void }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: guide.accentColor, marginBottom: 14,
      }} />
      <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 19, color: '#F8F6F1', marginBottom: 8, letterSpacing: '-0.01em' }}>
        {guide.label}
      </h3>
      <p style={{ fontSize: 12.5, color: 'rgba(248,246,241,0.45)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
        {guide.headline}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 18 }}>
        {guide.stats.slice(0, 2).map((s) => (
          <div key={s[1]} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: guide.accentColor }}>{s[0]}</div>
            <div style={{ fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(248,246,241,0.35)', marginTop: 2 }}>{s[1]}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onOpen(guide)}
        style={{
          background: guide.accentColor, color: '#0A0A0A', border: 'none',
          borderRadius: 8, padding: '11px 16px', fontSize: 12.5, fontWeight: 600,
          cursor: 'pointer', width: '100%',
        }}
      >
        Get the free PDF guide ↓
      </button>
    </div>
  );
}

function EmailGateModal({
  guide,
  onClose,
}: {
  guide: FreeGuide;
  onClose: () => void;
}) {
  const email = useSignal('');
  const submitting = useSignal(false);
  const submitted = useSignal(false);
  const error = useSignal('');

  async function submit() {
    if (!email.value || !email.value.includes('@')) {
      error.value = 'Please enter a valid email address.';
      return;
    }
    error.value = '';
    submitting.value = true;
    track('free_guide_requested', { industry: guide.id });
    try {
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          page: '/pages/free-guides',
          source: `free_guide_${guide.id}`,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch { /* silent — don't block the download */ }
    await buildGuidePdf(guide);
    submitting.value = false;
    submitted.value = true;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{ position: 'relative', zIndex: 1, background: '#111', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: 32, width: '100%', maxWidth: 440 }}>
        {!submitted.value ? (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${guide.accentColor}15`, border: `1px solid ${guide.accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16v11a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" stroke={guide.accentColor} strokeWidth={1.4} />
                  <path d="M2 5l8 7 8-7" stroke={guide.accentColor} strokeWidth={1.4} strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 22, color: '#F8F6F1', marginBottom: 8, letterSpacing: '-0.02em' }}>
                {guide.label} automation guide
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.42)', lineHeight: 1.65 }}>
                Enter your email and the PDF downloads instantly — the exact workflows, tools, and ROI numbers for {guide.metaLabel}.
              </p>
            </div>

            <input
              type="email"
              placeholder="you@company.com"
              value={email.value}
              onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '13px 16px', fontSize: 14, color: '#F8F6F1', outline: 'none', marginBottom: 8, boxSizing: 'border-box' as const }}
            />
            {error.value && <p style={{ fontSize: 11.5, color: '#f87171', marginBottom: 8 }}>{error.value}</p>}

            <button
              onClick={submit}
              disabled={submitting.value}
              style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6, background: guide.accentColor, color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '13px 16px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', opacity: submitting.value ? 0.7 : 1 }}
            >
              {submitting.value ? 'Preparing your PDF…' : 'Send me the guide →'}
            </button>

            <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.22)', textAlign: 'center', marginTop: 12 }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${guide.accentColor}15`, border: `1px solid ${guide.accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke={guide.accentColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 20, color: '#F8F6F1', marginBottom: 8 }}>
              Your PDF is downloading
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.45)', lineHeight: 1.6, marginBottom: 20 }}>
              Check your downloads folder — and your inbox, we've sent a copy along with a few next steps.
            </p>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(248,246,241,0.7)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 8, padding: '10px 18px', fontSize: 12.5, cursor: 'pointer' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FreeGuides() {
  const active = useSignal<FreeGuide | null>(null);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {freeGuides.map((g) => (
          <GuideCard key={g.id} guide={g} onOpen={(guide) => (active.value = guide)} />
        ))}
      </div>
      {active.value && <EmailGateModal guide={active.value} onClose={() => (active.value = null)} />}
    </div>
  );
}
