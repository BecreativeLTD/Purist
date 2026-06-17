import { useSignal, useComputed } from '@preact/signals';
import { useEffect } from 'preact/hooks';

// ── Types ──────────────────────────────────────────────────────────────────────
interface BreakdownItem {
  task: string;
  hoursSaved: number;
  annualSaving: number;
  automationTool: string;
}

interface ROIResult {
  currentCost: number;
  automationSavings: number;
  implementationCost: number;
  roiMonths: number;
  roiPercent: number;
  hoursSavedPerWeek: number;
  breakdown: BreakdownItem[];
  topOpportunities: string[];
  recommendation: string;
}

interface Industry {
  id: string;
  label: string;
  savingsPct: number;
  avgHourlyRate: number;
  stat: string;
}

// ── Industry data with real benchmarks ────────────────────────────────────────
const INDUSTRIES: Industry[] = [
  { id: 'saas',        label: 'SaaS / Software',       savingsPct: 0.72, avgHourlyRate: 85,  stat: '72% of ops is automatable'        },
  { id: 'ecommerce',   label: 'E-commerce / Retail',   savingsPct: 0.65, avgHourlyRate: 48,  stat: '$18k avg. saved per 5-person team' },
  { id: 'agency',      label: 'Agency / Consulting',   savingsPct: 0.68, avgHourlyRate: 95,  stat: '11h/week reclaimed per employee'   },
  { id: 'realestate',  label: 'Real Estate',            savingsPct: 0.62, avgHourlyRate: 68,  stat: '40% of leads lost to slow follow-up'},
  { id: 'healthcare',  label: 'Healthcare / Medical',  savingsPct: 0.70, avgHourlyRate: 58,  stat: '45% of staff time is administrative'},
  { id: 'legal',       label: 'Legal',                  savingsPct: 0.55, avgHourlyRate: 130, stat: '35% of billable time lost to admin' },
  { id: 'finance',     label: 'Finance / Accounting',  savingsPct: 0.75, avgHourlyRate: 78,  stat: '75% of reconciliation is automatable'},
  { id: 'logistics',   label: 'Logistics / Ops',        savingsPct: 0.61, avgHourlyRate: 42,  stat: '30% fewer errors with auto-tracking'},
  { id: 'hr',          label: 'HR / Recruiting',        savingsPct: 0.73, avgHourlyRate: 65,  stat: '73% of HR admin can be automated'  },
  { id: 'hospitality', label: 'Hospitality',            savingsPct: 0.58, avgHourlyRate: 32,  stat: '3.5h/day saved per property manager'},
];

// Industry-specific pain point tasks
const INDUSTRY_TASKS: Record<string, string[]> = {
  saas:        ['Usage report generation', 'User onboarding sequences', 'Billing & dunning flows', 'Bug triage & routing', 'Cross-tool data sync', 'Customer health scoring'],
  ecommerce:   ['Order processing & fulfillment', 'Inventory level updates', 'Returns & refund handling', 'Customer email responses', 'Supplier reorder alerts', 'Review management'],
  agency:      ['Client reporting', 'Time tracking & invoicing', 'Proposal generation', 'Project status updates', 'Lead follow-up', 'Contract management'],
  realestate:  ['Lead follow-up sequences', 'Listing updates & syndication', 'Showing scheduling', 'Contract & doc management', 'CMA report generation', 'Nurture email campaigns'],
  healthcare:  ['Appointment reminders', 'Insurance billing & claims', 'Referral management', 'Patient intake forms', 'Record updates & syncs', 'Follow-up care scheduling'],
  legal:       ['Client intake processing', 'Document organization', 'Billing & time tracking', 'Contract review & redlines', 'Deadline tracking', 'Court filing reminders'],
  finance:     ['Invoice processing', 'Bank reconciliation', 'Expense categorization', 'Financial report generation', 'Tax document prep', 'Payroll data entry'],
  logistics:   ['Shipment tracking updates', 'Carrier invoice matching', 'Inventory management', 'Purchase order creation', 'Customs documentation', 'Delivery notifications'],
  hr:          ['Resume screening & sorting', 'Interview scheduling', 'Onboarding documentation', 'Payroll data preparation', 'PTO request tracking', 'Performance review reminders'],
  hospitality: ['Reservation management', 'Staff scheduling', 'Supplier ordering', 'Guest communications', 'Review monitoring', 'Inventory checks'],
};

// Universal fallback tasks
const FALLBACK_TASKS = [
  'Data entry & copy-paste',
  'Report generation',
  'Manual email campaigns',
  'Cross-tool data sync',
  'Document management',
  'Customer follow-ups',
];

// ── Form options ───────────────────────────────────────────────────────────────
const EMPLOYEE_OPTIONS = [
  { label: 'Solo', value: 1 },
  { label: '2–5', value: 4 },
  { label: '6–15', value: 10 },
  { label: '16–50', value: 30 },
  { label: '50+', value: 75 },
];

const RATE_OPTIONS = [
  { label: 'Under $35/hr', value: 28 },
  { label: '$35–65/hr',    value: 50 },
  { label: '$65–100/hr',   value: 82 },
  { label: '$100+/hr',     value: 125 },
];

const TOOL_OPTIONS = [
  'HubSpot', 'Salesforce', 'Pipedrive', 'Gmail / Outlook',
  'Slack / Teams', 'Excel / Sheets', 'Notion / Airtable',
  'QuickBooks / Xero', 'Shopify / WooCommerce', 'Stripe',
  'Zendesk / Intercom', 'Monday.com / Asana', 'Zapier / Make',
  'Custom ERP', 'Other CRM',
];

const LOADING_STEPS = [
  'Analyzing your workflow profile…',
  'Running industry benchmarks…',
  'Building your custom ROI report…',
];

const TOTAL_STEPS = 5;

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  } as const,
  cardActive: {
    background: 'rgba(232,180,176,0.10)',
    border: '1px solid #E8B4B0',
    borderRadius: 12,
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    boxShadow: '0 0 0 1px rgba(232,180,176,0.15)',
  } as const,
  chip: {
    padding: '9px 18px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(248,246,241,0.65)',
    transition: 'all 0.15s',
    userSelect: 'none' as const,
    lineHeight: 1.4,
  },
  chipActive: {
    padding: '9px 18px',
    borderRadius: 999,
    border: '1px solid #E8B4B0',
    background: 'rgba(232,180,176,0.12)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    color: '#E8B4B0',
    transition: 'all 0.15s',
    userSelect: 'none' as const,
    lineHeight: 1.4,
    boxShadow: '0 0 16px rgba(232,180,176,0.12)',
  },
  btn: {
    background: '#E8B4B0',
    color: '#0A0A0A',
    fontWeight: 700,
    fontSize: 15,
    padding: '14px 32px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'opacity 0.15s, transform 0.1s',
    letterSpacing: '-0.01em',
  } as const,
  btnGhost: {
    background: 'transparent',
    color: 'rgba(248,246,241,0.40)',
    fontWeight: 500,
    fontSize: 13,
    padding: '14px 20px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  } as const,
  label: {
    fontSize: 10,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.14em',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.28)',
  },
  heading: {
    fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif",
    fontSize: 'clamp(22px,4vw,28px)',
    color: '#F8F6F1',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    marginBottom: 8,
  } as const,
  sub: {
    fontSize: 13,
    color: 'rgba(248,246,241,0.40)',
    lineHeight: 1.6,
    marginBottom: 28,
  } as const,
};

// ── Format helpers ─────────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(n >= 100_000 ? 0 : 1)}k`;
  return `$${n}`;
}

// ── Count-up animation hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = true) {
  const value = useSignal(0);
  useEffect(() => {
    if (!active || target === 0) { value.value = target; return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      value.value = Math.round(target * ease);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return value;
}

// ── Step indicator ─────────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 36 }}>
      {Array.from({ length: total }, (_, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <>
            <div key={`step-${num}`} style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: done ? '#E8B4B0' : active ? 'rgba(232,180,176,0.15)' : 'rgba(255,255,255,0.05)',
              border: active ? '1px solid #E8B4B0' : done ? 'none' : '1px solid rgba(255,255,255,0.10)',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}>
              {done ? (
                <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6l2.5 2.5L9.5 3.5" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span style={{ fontSize: 11, fontWeight: 700, color: active ? '#E8B4B0' : 'rgba(255,255,255,0.25)' }}>{num}</span>
              )}
            </div>
            {num < total && (
              <div key={`line-${num}`} style={{
                height: 1,
                width: 28,
                background: done ? '#E8B4B0' : 'rgba(255,255,255,0.08)',
                transition: 'background 0.3s',
                flexShrink: 0,
              }} />
            )}
          </>
        );
      })}
    </div>
  );
}

// ── Loading screen ─────────────────────────────────────────────────────────────
function LoadingScreen({ activeStep }: { activeStep: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 24px' }}>
      <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 36px' }}>
        <svg width={72} height={72} style={{ animation: 'roi-spin 1.4s linear infinite', display: 'block' }}>
          <circle cx={36} cy={36} r={30} fill="none" stroke="rgba(232,180,176,0.10)" strokeWidth={3} />
          <circle cx={36} cy={36} r={30} fill="none" stroke="#E8B4B0" strokeWidth={3}
            strokeDasharray="54 136" strokeLinecap="round"
            style={{ transformOrigin: '36px 36px' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="7" height="7" rx="1.5" fill="rgba(232,180,176,0.5)"/>
            <rect x="12" y="1" width="7" height="7" rx="1.5" fill="rgba(232,180,176,0.5)"/>
            <rect x="1" y="12" width="7" height="7" rx="1.5" fill="rgba(232,180,176,0.5)"/>
            <rect x="12" y="12" width="7" height="7" rx="1.5" fill="rgba(232,180,176,0.3)"/>
          </svg>
        </div>
      </div>

      <p style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 20, color: '#F8F6F1', marginBottom: 28, letterSpacing: '-0.01em' }}>
        Building your report…
      </p>

      <div style={{ maxWidth: 300, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LOADING_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: i <= activeStep ? 1 : 0.28, transition: 'opacity 0.4s' }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              background: i < activeStep ? '#E8B4B0' : i === activeStep ? 'rgba(232,180,176,0.2)' : 'rgba(255,255,255,0.05)',
              border: i === activeStep ? '1px solid rgba(232,180,176,0.6)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}>
              {i < activeStep && (
                <svg width={9} height={9} viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5l2 2L7.5 2.5" stroke="#0A0A0A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: i <= activeStep ? 'rgba(248,246,241,0.72)' : 'rgba(248,246,241,0.22)' }}>{s}</span>
          </div>
        ))}
      </div>

      <style>{`@keyframes roi-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Results screen ─────────────────────────────────────────────────────────────
function ResultsScreen({
  result,
  industry,
  onReset,
  onShowEmailModal,
}: {
  result: ROIResult;
  industry: Industry | null;
  onReset: () => void;
  onShowEmailModal: () => void;
}) {
  const savings  = useCountUp(result.automationSavings, 2000, true);
  const roi      = useCountUp(result.roiPercent, 1600, true);
  const hours    = useCountUp(Math.round(result.hoursSavedPerWeek), 1400, true);

  return (
    <div>
      {/* Hero metric */}
      <div style={{ textAlign: 'center', paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 28 }}>
        <p style={{ ...S.label, marginBottom: 12 }}>Estimated Annual Savings</p>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{
            fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif",
            fontSize: 'clamp(56px,10vw,84px)',
            fontWeight: 400,
            color: '#F8F6F1',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            {fmt(savings.value)}
          </div>
          <div style={{
            position: 'absolute', inset: -16,
            background: 'radial-gradient(ellipse at center,rgba(232,180,176,0.07) 0%,transparent 70%)',
            pointerEvents: 'none',
            animation: 'roi-pulse 3s ease-in-out infinite',
          }} />
        </div>
        <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.32)', marginTop: 8 }}>
          based on your team, tools & industry profile
        </p>
        {industry && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 14, padding: '6px 14px', borderRadius: 999,
            background: 'rgba(232,180,176,0.07)', border: '1px solid rgba(232,180,176,0.18)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8B4B0' }} />
            <span style={{ fontSize: 11, color: 'rgba(232,180,176,0.80)', fontWeight: 600 }}>
              {industry.label} avg: {Math.round(industry.savingsPct * 100)}% manual work automatable
            </span>
          </div>
        )}
      </div>

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
        {[
          { label: 'ROI', value: `${roi.value}%`, sub: 'return on investment' },
          { label: 'Payback', value: `${result.roiMonths}mo`, sub: 'break-even point' },
          { label: 'Hours freed', value: `${hours.value}h`, sub: 'per week' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ ...S.card, textAlign: 'center', cursor: 'default' }}>
            <p style={{ ...S.label, marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 28, color: '#E8B4B0', lineHeight: 1, marginBottom: 4 }}>{value}</p>
            <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.28)' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Breakdown table */}
      {result.breakdown?.length > 0 && (
        <div style={{ ...S.card, marginBottom: 20, padding: 0, overflow: 'hidden', cursor: 'default' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ ...S.label }}>Savings Breakdown by Task</p>
          </div>
          {result.breakdown.map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 14,
              padding: '13px 18px', alignItems: 'center',
              borderBottom: i < result.breakdown.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div>
                <p style={{ fontSize: 13, color: '#F8F6F1', fontWeight: 500, marginBottom: 2 }}>{item.task}</p>
                <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.28)' }}>{item.automationTool}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#E8B4B0', fontWeight: 600 }}>{item.hoursSaved}h/wk</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>freed</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 13, color: '#F8F6F1', fontWeight: 600 }}>{fmt(item.annualSaving)}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>per year</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top opportunities */}
      {result.topOpportunities?.length > 0 && (
        <div style={{ ...S.card, marginBottom: 20, cursor: 'default' }}>
          <p style={{ ...S.label, marginBottom: 14 }}>Top Automation Opportunities</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {result.topOpportunities.map((opp, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(232,180,176,0.10)', border: '1px solid rgba(232,180,176,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                }}>
                  <span style={{ fontSize: 10, color: '#E8B4B0', fontWeight: 700 }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.68)', lineHeight: 1.55 }}>{opp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      {result.recommendation && (
        <div style={{
          ...S.card,
          background: 'rgba(232,180,176,0.04)',
          border: '1px solid rgba(232,180,176,0.14)',
          marginBottom: 28, cursor: 'default',
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <svg width={18} height={18} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="9" cy="9" r="8" stroke="#E8B4B0" strokeOpacity="0.5" strokeWidth="1.2"/>
              <path d="M9 6v4M9 12v.5" stroke="#E8B4B0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.65)', lineHeight: 1.7 }}>{result.recommendation}</p>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <button
          style={{ ...S.btn, width: '100%', justifyContent: 'center', fontSize: 15, padding: '16px 32px' }}
          onClick={onShowEmailModal}
        >
          Get my full report — it's free
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <a
          href="/pages/site-audit"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', padding: '14px 32px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(248,246,241,0.55)', fontSize: 13, fontWeight: 500,
            textDecoration: 'none', transition: 'opacity 0.15s',
          }}
        >
          Book a free 45-min strategy audit →
        </a>
        <button style={{ ...S.btnGhost, fontSize: 12, padding: '10px 16px' }} onClick={onReset}>
          Recalculate
        </button>
      </div>

      <style>{`
        @keyframes roi-pulse {
          0%,100% { opacity:0.5; transform:scale(1); }
          50% { opacity:1; transform:scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ── Email modal ────────────────────────────────────────────────────────────────
function EmailModal({
  onClose,
  onSubmit,
  submitting,
  submitted,
}: {
  onClose: () => void;
  onSubmit: (email: string) => void;
  submitting: boolean;
  submitted: boolean;
}) {
  const localEmail = useSignal('');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#111', border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 16, padding: 32, width: '100%', maxWidth: 440,
      }}>
        {!submitted ? (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'rgba(232,180,176,0.08)', border: '1px solid rgba(232,180,176,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16v11a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" stroke="#E8B4B0" strokeWidth={1.4}/>
                  <path d="M2 5l8 7 8-7" stroke="#E8B4B0" strokeWidth={1.4} strokeLinecap="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 22, color: '#F8F6F1', marginBottom: 8, letterSpacing: '-0.02em' }}>
                Get your personalized report
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.42)', lineHeight: 1.65 }}>
                We'll send a detailed PDF with your ROI breakdown, recommended workflows, and a prioritized action plan.
              </p>
            </div>

            <input
              type="email"
              placeholder="you@company.com"
              value={localEmail.value}
              onInput={(e) => localEmail.value = (e.target as HTMLInputElement).value}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
                padding: '13px 16px', fontSize: 14, color: '#F8F6F1', outline: 'none',
                marginBottom: 12, boxSizing: 'border-box' as const,
              }}
            />

            <button
              style={{ ...S.btn, width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
              onClick={() => onSubmit(localEmail.value)}
              disabled={submitting}
            >
              {submitting ? 'Sending…' : 'Send my report →'}
            </button>

            <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.22)', textAlign: 'center', marginTop: 12 }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(232,180,176,0.10)', border: '1px solid rgba(232,180,176,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px',
            }}>
              <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                <path d="M4 11l4.5 4.5L18 6.5" stroke="#E8B4B0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 22, color: '#F8F6F1', marginBottom: 8 }}>
              Report on its way
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.42)', lineHeight: 1.65, marginBottom: 24 }}>
              Check your inbox in a few minutes. Our team will follow up within 24 hours to walk through your opportunities.
            </p>
            <button style={{ ...S.btn, margin: '0 auto' }} onClick={onClose}>Close</button>
          </div>
        )}

        {!submitted && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 7, width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(248,246,241,0.45)',
            }}
          >
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main ROICalculator component ───────────────────────────────────────────────
export default function ROICalculator() {
  const step          = useSignal(0); // 0=intro 1-5=form 6=loading 7=results
  const industryId    = useSignal('');
  const employees     = useSignal(4);
  const hoursPerWeek  = useSignal(10);
  const hourlyRate    = useSignal(50);
  const tools         = useSignal<string[]>([]);
  const tasks         = useSignal<string[]>([]);
  const result        = useSignal<ROIResult | null>(null);
  const loadingStep   = useSignal(0);
  const showModal     = useSignal(false);
  const emailSending  = useSignal(false);
  const emailSent     = useSignal(false);

  const selectedIndustry = useComputed(() =>
    INDUSTRIES.find(i => i.id === industryId.value) ?? null
  );

  const activeTasks = useComputed(() =>
    industryId.value ? (INDUSTRY_TASKS[industryId.value] ?? FALLBACK_TASKS) : FALLBACK_TASKS
  );

  const annualCost = useComputed(() =>
    Math.round(employees.value * hoursPerWeek.value * 52 * hourlyRate.value)
  );

  function toggleTool(t: string) {
    tools.value = tools.value.includes(t)
      ? tools.value.filter(x => x !== t)
      : [...tools.value, t];
  }

  function toggleTask(t: string) {
    tasks.value = tasks.value.includes(t)
      ? tasks.value.filter(x => x !== t)
      : [...tasks.value, t];
  }

  function goNext() {
    if (step.value < TOTAL_STEPS) step.value++;
    else startCalculation();
  }

  function goBack() {
    if (step.value > 1) step.value--;
  }

  async function startCalculation() {
    step.value = 6; // loading
    loadingStep.value = 0;

    const stepTimer = setInterval(() => {
      if (loadingStep.value < LOADING_STEPS.length - 1) loadingStep.value++;
    }, 900);

    const minDelay = new Promise(r => setTimeout(r, 3200));

    try {
      const [res] = await Promise.all([
        fetch('/api/roi-calculator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            industry: industryId.value,
            employees: employees.value,
            hoursPerWeek: hoursPerWeek.value,
            hourlyRate: hourlyRate.value,
            tools: tools.value,
            mainTasks: tasks.value,
          }),
        }),
        minDelay,
      ]);

      clearInterval(stepTimer);
      loadingStep.value = LOADING_STEPS.length - 1;

      if (!res.ok) throw new Error('api error');
      const data: ROIResult = await res.json();
      if (!data.automationSavings) throw new Error('invalid response');

      result.value = data;
      step.value = 7;
    } catch {
      clearInterval(stepTimer);
      result.value = computeFallback();
      step.value = 7;
    }
  }

  function computeFallback(): ROIResult {
    const emp  = employees.value;
    const hrs  = hoursPerWeek.value;
    const rate = hourlyRate.value;
    const tls  = tools.value;
    const tks  = tasks.value;
    const ind  = selectedIndustry.value;

    const savingsPct = ind ? ind.savingsPct : 0.70;
    const currentCost = Math.round(emp * hrs * 52 * rate);
    const automationSavings = Math.round(currentCost * savingsPct);
    const toolComplexity = tls.length > 5 ? 1.4 : tls.length > 2 ? 1.15 : 1;
    const implementationCost = Math.round(Math.min(emp * 700, 14000) * toolComplexity);
    const roiMonths = parseFloat((implementationCost / (automationSavings / 12)).toFixed(1));
    const roiPercent = Math.round(((automationSavings - implementationCost) / implementationCost) * 100);
    const hoursSavedPerWeek = parseFloat((emp * hrs * savingsPct).toFixed(1));

    const toolSuggestions: Record<string, string> = {
      'Data entry & copy-paste': 'n8n + Airtable',
      'Report generation': 'n8n + Google Looker Studio',
      'Lead follow-up & outreach': 'n8n + HubSpot',
      'Client onboarding': 'n8n + Notion',
      'Invoice & billing processing': 'n8n + Stripe',
      'Customer support tickets': 'n8n + Intercom',
      'Cross-tool data sync': 'n8n + Make',
      'Manual email campaigns': 'n8n + Instantly',
      'Usage report generation': 'n8n + Metabase',
      'User onboarding sequences': 'n8n + Customer.io',
      'Billing & dunning flows': 'n8n + Stripe',
      'Order processing & fulfillment': 'n8n + Shopify',
      'Inventory level updates': 'n8n + Google Sheets',
      'Client reporting': 'n8n + Notion',
      'Time tracking & invoicing': 'n8n + Harvest',
      'Invoice processing': 'n8n + QuickBooks',
      'Bank reconciliation': 'n8n + Xero',
      'Resume screening & sorting': 'n8n + Greenhouse',
      'Interview scheduling': 'n8n + Calendly',
      'Appointment reminders': 'n8n + Twilio',
      'Shipment tracking updates': 'n8n + ShipStation',
    };

    const activeTks = tks.length > 0 ? tks : (ind ? (INDUSTRY_TASKS[ind.id] || FALLBACK_TASKS).slice(0, 3) : FALLBACK_TASKS.slice(0, 3));
    const hoursPerTask = parseFloat((hoursSavedPerWeek / activeTks.length).toFixed(1));

    const breakdown: BreakdownItem[] = activeTks.slice(0, 5).map(task => ({
      task,
      hoursSaved: hoursPerTask,
      annualSaving: Math.round(emp * hoursPerTask * 52 * rate),
      automationTool: toolSuggestions[task] || 'n8n + custom workflow',
    }));

    const industryLabel = ind?.label ?? 'your industry';

    return {
      currentCost,
      automationSavings,
      implementationCost,
      roiMonths,
      roiPercent,
      hoursSavedPerWeek,
      breakdown,
      topOpportunities: [
        `Automate ${activeTks[0] ?? 'data sync'} — reclaim ~${Math.round(hrs * 0.3 * emp)}h/week across your team`,
        `Auto-generate reports weekly (5 min vs. ${Math.round(hrs * 0.25 * emp)}h of manual work)`,
        `Set up automated follow-up sequences — avg. 82% open rate, zero manual effort`,
      ],
      recommendation: `With ${emp} team member${emp > 1 ? 's' : ''} losing ${hrs}h/week to manual work, your potential is ${fmt(automationSavings)}/year. In ${industryLabel}, the biggest wins are typically ${activeTks.slice(0, 2).join(' and ').toLowerCase()}. Full ROI in ${roiMonths} months — we recommend starting with a free audit to identify your top 3 high-impact workflows.`,
    };
  }

  async function handleEmailSubmit(emailVal: string) {
    if (!emailVal || !emailVal.includes('@')) return;
    emailSending.value = true;
    try {
      await fetch('/api/roi-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailVal,
          result: result.value,
          inputs: {
            industry: industryId.value,
            employees: employees.value,
            hoursPerWeek: hoursPerWeek.value,
            hourlyRate: hourlyRate.value,
            tools: tools.value,
            tasks: tasks.value,
          },
        }),
      });
    } catch { /* best effort */ }
    emailSending.value = false;
    emailSent.value = true;
  }

  function resetAll() {
    step.value = 0;
    industryId.value = '';
    employees.value = 4;
    hoursPerWeek.value = 10;
    hourlyRate.value = 50;
    tools.value = [];
    tasks.value = [];
    result.value = null;
    loadingStep.value = 0;
    emailSent.value = false;
    showModal.value = false;
  }

  const containerStyle = {
    background: '#0C0C0C',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.07)',
    maxWidth: 700,
    margin: '0 auto',
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const innerStyle = { padding: '36px 40px' } as const;

  // ── Step can-advance logic ──
  const canAdvance = useComputed(() => {
    if (step.value === 1) return industryId.value !== '';
    if (step.value === 2) return true;
    if (step.value === 3) return true;
    if (step.value === 4) return true;
    if (step.value === 5) return true;
    return true;
  });

  return (
    <div style={containerStyle}>

      {/* ── Intro screen ──────────────────────────────────────────────── */}
      {step.value === 0 && (
        <div style={{ padding: '52px 40px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 999,
            border: '1px solid rgba(232,180,176,0.22)',
            background: 'rgba(232,180,176,0.06)', marginBottom: 24,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#E8B4B0', animation: 'roi-blink 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: 'rgba(232,180,176,0.80)', fontWeight: 600 }}>
              Free · 2 minutes · No account needed
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif",
            fontSize: 'clamp(30px,5vw,44px)',
            color: '#F8F6F1', fontWeight: 400, lineHeight: 1.1,
            letterSpacing: '-0.025em', marginBottom: 14,
          }}>
            What is your automation<br/>
            <em style={{ color: '#E8B4B0', fontStyle: 'italic' }}>ROI?</em>
          </h2>

          <p style={{ fontSize: 14, color: 'rgba(248,246,241,0.42)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 10px' }}>
            Answer 5 questions about your team and workflows.
            Get a personalized savings report backed by real industry benchmarks.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: 20, margin: '28px 0 36px' }}>
            {[
              ['10,000+', 'hours automated'],
              ['2 min', 'to complete'],
              ['$127k', 'avg. annual savings'],
            ].map(([v, l]) => (
              <div key={v} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 22, color: '#E8B4B0', lineHeight: 1, marginBottom: 4 }}>{v}</p>
                <p style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)' }}>{l}</p>
              </div>
            ))}
          </div>

          <button style={{ ...S.btn, fontSize: 15, padding: '16px 40px' }} onClick={() => step.value = 1}>
            Start the calculator
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <style>{`
            @keyframes roi-blink {
              0%,100% { opacity:1; }
              50% { opacity:0.4; }
            }
          `}</style>
        </div>
      )}

      {/* ── Steps 1–5 ──────────────────────────────────────────────────── */}
      {step.value >= 1 && step.value <= TOTAL_STEPS && (
        <div style={innerStyle}>
          <StepIndicator current={step.value} total={TOTAL_STEPS} />

          {/* Step 1 — Industry */}
          {step.value === 1 && (
            <div>
              <h2 style={S.heading}>What industry are you in?</h2>
              <p style={S.sub}>We'll use real benchmark data to calibrate your results.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 32 }}>
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind.id}
                    onClick={() => industryId.value = ind.id}
                    style={{
                      ...(industryId.value === ind.id ? S.cardActive : S.card),
                      padding: '14px 16px',
                      display: 'flex', alignItems: 'flex-start', flexDirection: 'column' as const,
                      textAlign: 'left' as const, gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: industryId.value === ind.id ? '#E8B4B0' : '#F8F6F1' }}>
                      {ind.label}
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(248,246,241,0.35)', lineHeight: 1.4 }}>{ind.stat}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Team size */}
          {step.value === 2 && (
            <div>
              <h2 style={S.heading}>How large is your team?</h2>
              <p style={S.sub}>Everyone who could benefit from automation.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 32 }}>
                {EMPLOYEE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => employees.value = opt.value}
                    style={{
                      ...(employees.value === opt.value ? S.cardActive : S.card),
                      padding: '18px 8px', textAlign: 'center' as const,
                    }}
                  >
                    <span style={{
                      fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif",
                      fontSize: 20, display: 'block', lineHeight: 1,
                      color: employees.value === opt.value ? '#E8B4B0' : '#F8F6F1',
                    }}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Hours & Rate */}
          {step.value === 3 && (
            <div>
              <h2 style={S.heading}>How much time is lost to manual work?</h2>
              <p style={S.sub}>Per person, per week — copy-pasting, data entry, manual reporting, etc.</p>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: 'rgba(248,246,241,0.45)' }}>Hours per person / week</span>
                  <span style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 28, color: '#E8B4B0', lineHeight: 1 }}>
                    {hoursPerWeek.value}h
                  </span>
                </div>
                <input
                  type="range" min={2} max={40} step={1}
                  value={hoursPerWeek.value}
                  onInput={(e) => hoursPerWeek.value = parseInt((e.target as HTMLInputElement).value)}
                  style={{ width: '100%', accentColor: '#E8B4B0', cursor: 'pointer', height: 4 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>2 hrs</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>40 hrs</span>
                </div>
              </div>

              {/* Live preview */}
              <div style={{
                background: 'rgba(232,180,176,0.05)', border: '1px solid rgba(232,180,176,0.14)',
                borderRadius: 10, padding: '14px 18px', marginBottom: 24,
                display: 'flex', gap: 24, flexWrap: 'wrap' as const,
              }}>
                <div>
                  <p style={{ ...S.label, marginBottom: 4 }}>Hours/year (total team)</p>
                  <p style={{ fontSize: 18, color: '#F8F6F1', fontWeight: 600 }}>
                    {(employees.value * hoursPerWeek.value * 52).toLocaleString()}h
                  </p>
                </div>
                <div>
                  <p style={{ ...S.label, marginBottom: 4 }}>Current annual cost</p>
                  <p style={{ fontSize: 18, color: '#E8B4B0', fontWeight: 600 }}>
                    {fmt(annualCost.value)}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(248,246,241,0.50)', marginBottom: 10, textTransform: 'uppercase' as const, letterSpacing: '0.12em' }}>
                Average hourly rate
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 32 }}>
                {RATE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => hourlyRate.value = opt.value}
                    style={{
                      ...(hourlyRate.value === opt.value ? S.cardActive : S.card),
                      padding: '11px 6px', textAlign: 'center' as const, fontSize: 12,
                      fontWeight: hourlyRate.value === opt.value ? 600 : 400,
                      color: hourlyRate.value === opt.value ? '#E8B4B0' : 'rgba(248,246,241,0.60)',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Tools */}
          {step.value === 4 && (
            <div>
              <h2 style={S.heading}>Which tools does your team use?</h2>
              <p style={S.sub}>Select all that apply — we'll identify automation bridges between them.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 32 }}>
                {TOOL_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleTool(t)}
                    style={tools.value.includes(t) ? S.chipActive : S.chip}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tools.value.length === 0 && (
                <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.22)', fontStyle: 'italic', marginBottom: 8 }}>
                  Select at least one tool for a more precise report.
                </p>
              )}
            </div>
          )}

          {/* Step 5 — Pain points */}
          {step.value === 5 && (
            <div>
              <h2 style={S.heading}>Where does manual work hurt most?</h2>
              <p style={S.sub}>
                Select your top time drains
                {selectedIndustry.value ? ` in ${selectedIndustry.value.label}` : ''}.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 32 }}>
                {activeTasks.value.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleTask(t)}
                    style={tasks.value.includes(t) ? S.chipActive : S.chip}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tasks.value.length === 0 && (
                <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.22)', fontStyle: 'italic', marginBottom: 8 }}>
                  Select at least one to personalize your breakdown.
                </p>
              )}
            </div>
          )}

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              style={S.btnGhost}
              onClick={step.value === 1 ? () => step.value = 0 : goBack}
            >
              ← Back
            </button>
            <button
              style={{ ...S.btn, opacity: canAdvance.value ? 1 : 0.4 }}
              onClick={goNext}
              disabled={!canAdvance.value}
            >
              {step.value === TOTAL_STEPS ? 'Calculate my ROI' : 'Continue'}
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Loading ────────────────────────────────────────────────────── */}
      {step.value === 6 && (
        <div style={{ padding: '24px 40px' }}>
          <LoadingScreen activeStep={loadingStep.value} />
        </div>
      )}

      {/* ── Results ───────────────────────────────────────────────────── */}
      {step.value === 7 && result.value && (
        <div style={innerStyle}>
          <ResultsScreen
            result={result.value}
            industry={selectedIndustry.value}
            onReset={resetAll}
            onShowEmailModal={() => { showModal.value = true; emailSent.value = false; }}
          />
        </div>
      )}

      {/* ── Email modal ───────────────────────────────────────────────── */}
      {showModal.value && (
        <EmailModal
          onClose={() => showModal.value = false}
          onSubmit={handleEmailSubmit}
          submitting={emailSending.value}
          submitted={emailSent.value}
        />
      )}
    </div>
  );
}
