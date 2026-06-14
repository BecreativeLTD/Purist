import { signal, computed } from '@preact/signals';
import { useRef } from 'preact/hooks';

// ── State ───────────────────────────────────────────────────────────
const url = signal('');
const phase = signal<'idle' | 'scanning' | 'analyzing' | 'done' | 'error'>('idle');
const scanStep = signal(0);
const report = signal<any>(null);
const errorMsg = signal('');

const SCAN_STEPS = [
  'Connecting to server…',
  'Downloading HTML source…',
  'Parsing meta tags & SEO signals…',
  'Detecting tech stack & frameworks…',
  'Scanning tracking pixels…',
  'Checking security headers…',
  'Analyzing page structure…',
  'Running AI analysis…',
  'Generating report…',
];

// ── Severity styling ────────────────────────────────────────────────
const severityStyle = (s: string) => {
  if (s === 'critical') return { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', color: '#DC2626', label: 'CRITICAL' };
  if (s === 'warning') return { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', color: '#D97706', label: 'WARNING' };
  return { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', color: '#16A34A', label: 'PASSED' };
};

const impactColor = (i: string) => {
  if (i === 'high') return '#DC2626';
  if (i === 'medium') return '#D97706';
  return '#16A34A';
};

const effortLabel = (e: string) => {
  if (e === 'quick') return '⚡ Quick';
  if (e === 'medium') return '🔧 Medium';
  return '🏗️ Requires dev';
};

// ── Score ring SVG ──────────────────────────────────────────────────
function ScoreRing({ score, size = 120, label }: { score: number; size?: number; label?: string }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const col = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="6" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} stroke-width="6"
          stroke-dasharray={circ} stroke-dashoffset={offset} stroke-linecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Georgia,serif', fontSize: size * 0.32, fontWeight: 400, color: '#F8F6F1', lineHeight: 1 }}>{score}</span>
        {label && <span style={{ fontSize: 9, color: 'rgba(248,246,241,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginTop: 4 }}>{label}</span>}
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────
export default function AuditEngine() {
  const inputRef = useRef<HTMLInputElement>(null);

  async function runAudit() {
    const u = url.value.trim();
    if (!u) return;

    phase.value = 'scanning';
    scanStep.value = 0;
    errorMsg.value = '';
    report.value = null;

    // Animate scan steps
    const stepInterval = setInterval(() => {
      if (scanStep.value < SCAN_STEPS.length - 1) {
        scanStep.value++;
      }
    }, 800);

    try {
      const res = await fetch('/api/audit-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: u }),
      });

      clearInterval(stepInterval);
      scanStep.value = SCAN_STEPS.length - 1;

      const data = await res.json();

      if (!res.ok || data.error) {
        phase.value = 'error';
        errorMsg.value = data.error || 'Failed to audit this URL';
        return;
      }

      report.value = data;
      phase.value = 'done';
    } catch (e: any) {
      clearInterval(stepInterval);
      phase.value = 'error';
      errorMsg.value = 'Network error. Please try again.';
    }
  }

  return (
    <div>
      {/* ── IDLE / INPUT ── */}
      {phase.value === 'idle' && (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                ref={inputRef}
                type="url"
                placeholder="Enter your website URL…"
                value={url.value}
                onInput={(e) => { url.value = (e.target as HTMLInputElement).value; }}
                onKeyDown={(e) => { if (e.key === 'Enter') runAudit(); }}
                style={{
                  width: '100%', padding: '18px 20px 18px 48px', fontSize: 16, fontFamily: 'Georgia,serif',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,180,176,0.2)',
                  borderRadius: 14, color: '#F8F6F1', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(232,180,176,0.5)'; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(232,180,176,0.2)'; }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(232,180,176,0.4)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <button
              onClick={runAudit}
              style={{
                padding: '18px 32px', background: '#E8B4B0', color: '#0A0A0A',
                border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap' as const, transition: 'background 0.15s',
              }}
              onMouseOver={(e) => { (e.target as HTMLButtonElement).style.background = '#d9a09b'; }}
              onMouseOut={(e) => { (e.target as HTMLButtonElement).style.background = '#E8B4B0'; }}
            >
              Run audit →
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.25)', marginTop: 12, textAlign: 'center' as const }}>
            Free · No sign-up · Takes 15–30 seconds
          </p>
        </div>
      )}

      {/* ── SCANNING ── */}
      {(phase.value === 'scanning' || phase.value === 'analyzing') && (
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' as const }}>
          {/* Animated pulse ring */}
          <div style={{ width: 80, height: 80, margin: '0 auto 2rem', position: 'relative' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: '2px solid rgba(232,180,176,0.3)',
              animation: 'audit-pulse 2s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 8, borderRadius: '50%',
              border: '2px solid rgba(232,180,176,0.5)',
              animation: 'audit-pulse 2s ease-in-out infinite 0.3s',
            }} />
            <div style={{
              position: 'absolute', inset: 20, borderRadius: '50%',
              background: 'rgba(232,180,176,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8B4B0" stroke-width="2" stroke-linecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#F8F6F1', marginBottom: 8 }}>
            Scanning <span style={{ color: '#E8B4B0' }}>{url.value.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginTop: 24, textAlign: 'left' as const }}>
            {SCAN_STEPS.map((step, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
                opacity: i <= scanStep.value ? 1 : 0.2,
                transition: 'opacity 0.4s ease',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: i < scanStep.value ? 'rgba(34,197,94,0.15)' : i === scanStep.value ? 'rgba(232,180,176,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i < scanStep.value ? 'rgba(34,197,94,0.3)' : i === scanStep.value ? 'rgba(232,180,176,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i < scanStep.value && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round">
                      <path d="M2 5l2 2 4-4" />
                    </svg>
                  )}
                  {i === scanStep.value && (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8B4B0', animation: 'audit-pulse 1s ease-in-out infinite' }} />
                  )}
                </div>
                <span style={{ fontSize: 13, color: i <= scanStep.value ? 'rgba(248,246,241,0.65)' : 'rgba(248,246,241,0.2)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ERROR ── */}
      {phase.value === 'error' && (
        <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
          </div>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#F8F6F1', marginBottom: 8 }}>Audit failed</p>
          <p style={{ fontSize: 14, color: 'rgba(248,246,241,0.45)', marginBottom: 24 }}>{errorMsg.value}</p>
          <button
            onClick={() => { phase.value = 'idle'; }}
            style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#F8F6F1', fontSize: 14, cursor: 'pointer' }}
          >
            ← Try another URL
          </button>
        </div>
      )}

      {/* ── REPORT ── */}
      {phase.value === 'done' && report.value && (
        <div style={{ animation: 'audit-fadein 0.6s ease' }}>

          {/* Top score card */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '2.5rem', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' as const }}>
              <ScoreRing score={report.value.score} size={130} label={report.value.grade} />
              <div style={{ flex: 1, minWidth: 250 }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'rgba(232,180,176,0.5)', marginBottom: 6 }}>Audit Score</p>
                <p style={{ fontFamily: 'Georgia,serif', fontSize: 24, color: '#F8F6F1', marginBottom: 12, lineHeight: 1.3 }}>
                  {report.value.meta?.url?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(248,246,241,0.5)' }}>{report.value.summary}</p>
              </div>
            </div>

            {/* Urgencies */}
            {report.value.urgencies?.length > 0 && (
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                <p style={{ fontSize: 9.5, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: 'rgba(239,68,68,0.6)', fontWeight: 600 }}>Urgent issues</p>
                {report.value.urgencies.map((u: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 10 }}>
                    <span style={{ fontSize: 12, color: '#DC2626', fontWeight: 700, flexShrink: 0 }}>!</span>
                    <span style={{ fontSize: 13, color: 'rgba(248,246,241,0.7)', lineHeight: 1.5 }}>{u}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Meta bar */}
            {report.value.meta && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap' as const, gap: 20 }}>
                {[
                  ['Response', `${report.value.meta.responseTime}ms`],
                  ['HTML', `${report.value.meta.htmlSize}KB`],
                  ['Status', `${report.value.meta.statusCode}`],
                  ['Stack', report.value.meta.techStack?.join(', ') || '—'],
                  ['Tracking', report.value.meta.tracking?.join(', ') || 'None'],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <p style={{ fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: 'rgba(248,246,241,0.2)', marginBottom: 3 }}>{l}</p>
                    <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.55)', fontWeight: 500 }}>{v}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section scores mini-bar */}
          {report.value.sections?.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${report.value.sections.length}, 1fr)`, gap: 8, marginBottom: 24 }}>
              {report.value.sections.map((s: any) => (
                <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '16px', textAlign: 'center' as const }}>
                  <ScoreRing score={s.score} size={56} />
                  <p style={{ fontSize: 10, color: 'rgba(248,246,241,0.4)', marginTop: 8, letterSpacing: '0.06em' }}>{s.title}</p>
                </div>
              ))}
            </div>
          )}

          {/* Section details */}
          {report.value.sections?.map((section: any) => (
            <div key={section.id} style={{ marginBottom: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#F8F6F1', margin: 0 }}>{section.title}</h3>
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: section.score >= 80 ? '#16A34A' : section.score >= 60 ? '#D97706' : '#DC2626',
                }}>{section.score}/100</span>
              </div>
              <div style={{ padding: '12px 24px 24px' }}>
                {section.findings?.map((f: any, fi: number) => {
                  const sv = severityStyle(f.severity);
                  return (
                    <div key={fi} style={{ padding: '14px 0', borderBottom: fi < section.findings.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', padding: '3px 8px', borderRadius: 999, background: sv.bg, border: `1px solid ${sv.border}`, color: sv.color, flexShrink: 0, marginTop: 2 }}>{sv.label}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: '#F8F6F1', marginBottom: 4 }}>{f.title}</p>
                          <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(248,246,241,0.45)', marginBottom: 8 }}>{f.detail}</p>
                          {f.fix && (
                            <div style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(232,180,176,0.7)', background: 'rgba(232,180,176,0.04)', border: '1px solid rgba(232,180,176,0.1)', borderRadius: 8, padding: '8px 12px' }}>
                              <span style={{ fontWeight: 600 }}>Fix:</span> {f.fix}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Action plan */}
          {report.value.topActions?.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '24px', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#F8F6F1', marginBottom: 20 }}>Priority Action Plan</h3>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {report.value.topActions.map((a: any, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: 'rgba(232,180,176,0.2)', width: 32, flexShrink: 0 }}>
                      {String(a.priority).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(248,246,241,0.7)', flex: 1, lineHeight: 1.5 }}>{a.action}</span>
                    <span style={{ fontSize: 10, color: impactColor(a.impact), fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{a.impact}</span>
                    <span style={{ fontSize: 10, color: 'rgba(248,246,241,0.3)' }}>{effortLabel(a.effort)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center' as const, padding: '2.5rem 0 1rem' }}>
            <p style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: '#F8F6F1', marginBottom: 8 }}>
              Want us to <em style={{ color: '#E8B4B0', fontStyle: 'italic' }}>fix all of this?</em>
            </p>
            <p style={{ fontSize: 14, color: 'rgba(248,246,241,0.4)', marginBottom: 24 }}>
              Book a free 30-min call. We'll walk through the report and give you a deployment plan.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <a href="/pages/welcome" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#E8B4B0', color: '#0A0A0A', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Book free audit call →
              </a>
              <button
                onClick={() => { phase.value = 'idle'; url.value = ''; report.value = null; }}
                style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'rgba(248,246,241,0.6)', fontSize: 14, cursor: 'pointer' }}
              >
                Audit another site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes audit-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes audit-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
