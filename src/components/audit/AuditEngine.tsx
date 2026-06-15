import { useSignal } from '@preact/signals';
import { useRef } from 'preact/hooks';

// ── Types ──────────────────────────────────────────────────────────
type Phase = 'idle' | 'scanning' | 'done' | 'error';

interface Finding {
  severity: string;
  title: string;
  detail: string;
  fix?: string;
}

interface Section {
  id: string;
  title: string;
  score: number;
  findings: Finding[];
}

interface TopAction {
  priority: number;
  action: string;
  impact: string;
  effort: string;
}

interface AuditReport {
  score: number;
  grade: string;
  summary: string;
  urgencies: string[];
  sections: Section[];
  topActions: TopAction[];
  meta?: {
    url: string;
    fetchedAt: string;
    responseTime: number;
    statusCode: number;
    htmlSize: number;
    techStack: string[];
    tracking: string[];
  };
}

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
  if (e === 'quick') return 'Quick win';
  if (e === 'medium') return 'Medium effort';
  return 'Requires dev';
};

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

// ── Score ring SVG ──────────────────────────────────────────────────
function ScoreRing({ score: rawScore, size = 120, label }: { score: number; size?: number; label?: string }) {
  const score = Number(rawScore) || 0;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const col = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
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
  const url = useSignal('');
  const phase = useSignal<Phase>('idle');
  const scanStep = useSignal(0);
  const report = useSignal<AuditReport | null>(null);
  const errorMsg = useSignal('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function runAudit() {
    const u = url.value.trim();
    if (!u) {
      inputRef.current?.focus();
      return;
    }

    phase.value = 'scanning';
    scanStep.value = 0;
    errorMsg.value = '';
    report.value = null;

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
        errorMsg.value = data.error || 'Failed to audit this URL. Please check the URL and try again.';
        return;
      }

      report.value = data;
      phase.value = 'done';
    } catch (e: any) {
      clearInterval(stepInterval);
      phase.value = 'error';
      errorMsg.value = 'Network error — check your connection and try again.';
    }
  }

  function reset() {
    phase.value = 'idle';
    url.value = '';
    report.value = null;
    errorMsg.value = '';
    scanStep.value = 0;
  }

  // ── IDLE ──
  if (phase.value === 'idle') {
    return (
      <div>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <form onSubmit={(e) => { e.preventDefault(); runAudit(); }} style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="https://yourwebsite.com"
                value={url.value}
                onInput={(e) => { url.value = (e.target as HTMLInputElement).value; }}
                style={{
                  width: '100%', padding: '18px 20px 18px 48px', fontSize: 16,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(248,246,241,0.15)',
                  borderRadius: 12, color: '#F8F6F1', outline: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                  boxSizing: 'border-box' as const,
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = 'rgba(232,180,176,0.5)';
                  (e.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.12)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = 'rgba(248,246,241,0.15)';
                  (e.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.08)';
                }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(248,246,241,0.3)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <button
              type="submit"
              style={{
                padding: '18px 28px', background: '#F8F6F1', color: '#0A0A0A',
                border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap' as const, transition: 'opacity 0.15s',
                letterSpacing: '0.02em',
              }}
              onMouseOver={(e) => { (e.target as HTMLButtonElement).style.opacity = '0.85'; }}
              onMouseOut={(e) => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
            >
              Run audit →
            </button>
          </form>
          <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.25)', marginTop: 14, textAlign: 'center' as const, letterSpacing: '0.04em' }}>
            Free · No sign-up · Results in 15–30 seconds
          </p>
        </div>
        <style>{`@keyframes audit-pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}@keyframes audit-fadein{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ── SCANNING ──
  if (phase.value === 'scanning') {
    return (
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
        <style>{`@keyframes audit-pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}`}</style>
      </div>
    );
  }

  // ── ERROR ──
  if (phase.value === 'error') {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' as const }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
        </div>
        <p style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#F8F6F1', marginBottom: 8 }}>Audit failed</p>
        <p style={{ fontSize: 14, color: 'rgba(248,246,241,0.45)', marginBottom: 24, lineHeight: 1.6 }}>{errorMsg.value}</p>
        <button
          onClick={reset}
          style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#F8F6F1', fontSize: 14, cursor: 'pointer' }}
        >
          ← Try another URL
        </button>
      </div>
    );
  }

  // ── REPORT ──
  const r = report.value;
  if (!r) return null;

  // Coerce all scores to numbers (AI sometimes returns strings or undefined)
  const mainScore = Number(r.score) || 0;
  const mainGrade = r.grade || '?';
  if (r.sections) {
    r.sections.forEach((s: Section) => { s.score = Number(s.score) || 0; });
  }

  return (
    <div style={{ animation: 'audit-fadein 0.6s ease' }}>

      {/* Top score card */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '2.5rem', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' as const }}>
          <ScoreRing score={mainScore} size={130} label={mainGrade} />
          <div style={{ flex: 1, minWidth: 250 }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'rgba(232,180,176,0.5)', marginBottom: 6 }}>Audit Score</p>
            <p style={{ fontFamily: 'Georgia,serif', fontSize: 24, color: '#F8F6F1', marginBottom: 12, lineHeight: 1.3 }}>
              {r.meta?.url?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(248,246,241,0.5)' }}>{r.summary}</p>
          </div>
        </div>

        {/* Urgencies */}
        {r.urgencies?.length > 0 && (
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <p style={{ fontSize: 9.5, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: 'rgba(239,68,68,0.6)', fontWeight: 600 }}>Urgent issues</p>
            {r.urgencies.map((u: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 10 }}>
                <span style={{ fontSize: 12, color: '#DC2626', fontWeight: 700, flexShrink: 0 }}>!</span>
                <span style={{ fontSize: 13, color: 'rgba(248,246,241,0.7)', lineHeight: 1.5 }}>{u}</span>
              </div>
            ))}
          </div>
        )}

        {/* Meta bar */}
        {r.meta && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap' as const, gap: 20 }}>
            {[
              ['Response', `${r.meta.responseTime}ms`],
              ['HTML', `${r.meta.htmlSize}KB`],
              ['Status', `${r.meta.statusCode}`],
              ['Stack', r.meta.techStack?.join(', ') || '—'],
              ['Tracking', r.meta.tracking?.join(', ') || 'None detected'],
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
      {r.sections?.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
          {r.sections.map((s: Section) => (
            <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 10px', textAlign: 'center' as const }}>
              <ScoreRing score={s.score} size={48} />
              <p style={{ fontSize: 9, color: 'rgba(248,246,241,0.4)', marginTop: 6, letterSpacing: '0.04em', lineHeight: 1.3 }}>{s.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* Section details */}
      {r.sections?.map((section: Section) => (
        <div key={section.id} style={{ marginBottom: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: '#F8F6F1', margin: 0 }}>{section.title}</h3>
            <span style={{
              fontSize: 13, fontWeight: 600,
              color: section.score >= 80 ? '#16A34A' : section.score >= 60 ? '#D97706' : '#DC2626',
            }}>{section.score}/100</span>
          </div>
          <div style={{ padding: '12px 24px 24px' }}>
            {section.findings?.map((f: Finding, fi: number) => {
              const sv = severityStyle(f.severity);
              return (
                <div key={fi} style={{ padding: '14px 0', borderBottom: fi < section.findings.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', padding: '3px 8px', borderRadius: 999, background: sv.bg, border: `1px solid ${sv.border}`, color: sv.color, flexShrink: 0, marginTop: 2 }}>{sv.label}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#F8F6F1', marginBottom: 4 }}>{f.title}</p>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(248,246,241,0.45)', marginBottom: 8 }}>{f.detail}</p>
                      {f.fix && f.fix !== 'None' && f.fix !== 'none' && f.fix !== 'N/A' && (
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
      {r.topActions?.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '24px', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#F8F6F1', marginBottom: 20 }}>Priority Action Plan</h3>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {r.topActions.map((a: TopAction, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: 'rgba(232,180,176,0.25)', width: 32, flexShrink: 0, textAlign: 'center' as const }}>
                  {String(a.priority).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(248,246,241,0.7)', flex: 1, lineHeight: 1.5 }}>{a.action}</span>
                <span style={{ fontSize: 10, color: impactColor(a.impact), fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em', flexShrink: 0 }}>{a.impact}</span>
                <span style={{ fontSize: 10, color: 'rgba(248,246,241,0.3)', flexShrink: 0 }}>{effortLabel(a.effort)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workflow recommendations */}
      {(r as any).workflows?.length > 0 && (
        <div style={{ background: 'rgba(232,180,176,0.04)', border: '1px solid rgba(232,180,176,0.12)', borderRadius: 18, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(232,180,176,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8B4B0" stroke-width="2" stroke-linecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: '#F8F6F1', margin: 0 }}>Automation Workflows for Your Stack</h3>
              <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.3)', marginTop: 2 }}>Based on the tools we detected on your site</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {(r as any).workflows.map((w: any, i: number) => (
              <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#F8F6F1', marginBottom: 6 }}>{w.name}</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
                  <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.35)' }}><span style={{ color: 'rgba(232,180,176,0.6)', fontWeight: 600 }}>Trigger:</span> {w.trigger}</p>
                  <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.35)' }}><span style={{ color: 'rgba(232,180,176,0.6)', fontWeight: 600 }}>Tools:</span> {w.tools}</p>
                  <p style={{ fontSize: 11, color: 'rgba(232,180,176,0.5)', fontWeight: 500, marginTop: 4 }}>{w.impact}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(232,180,176,0.06)', borderRadius: 10, textAlign: 'center' as const }}>
            <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.5)' }}>
              These workflows can be built and deployed by PURIST in days, not months.{' '}
              <a href="/pages/welcome" style={{ color: '#E8B4B0', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Get a free deployment plan →</a>
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ textAlign: 'center' as const, padding: '2.5rem 0 1rem' }}>
        <p style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: '#F8F6F1', marginBottom: 8 }}>
          Want us to <em style={{ color: '#E8B4B0', fontStyle: 'italic' }}>fix all of this?</em>
        </p>
        <p style={{ fontSize: 14, color: 'rgba(248,246,241,0.4)', marginBottom: 24, lineHeight: 1.6 }}>
          Book a free 30-min call. We'll walk through the report and build you a deployment plan.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <a href="/pages/welcome" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#F8F6F1', color: '#0A0A0A', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Book free consultation →
          </a>
          <button
            onClick={reset}
            style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(248,246,241,0.6)', fontSize: 14, cursor: 'pointer' }}
          >
            Audit another site
          </button>
        </div>
      </div>

      <style>{`@keyframes audit-fadein{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
