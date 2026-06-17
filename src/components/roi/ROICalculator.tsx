import { useSignal, useComputed } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';

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

// ── Employee tier options ──────────────────────────────────────────────────────
const EMPLOYEE_OPTIONS = [
  { label: '1', value: 1 },
  { label: '2–5', value: 4 },
  { label: '6–15', value: 10 },
  { label: '16–50', value: 30 },
  { label: '50+', value: 75 },
];

// ── Hourly rate options ────────────────────────────────────────────────────────
const RATE_OPTIONS = [
  { label: '< 25€/h', value: 20 },
  { label: '25–45€/h', value: 35 },
  { label: '45–75€/h', value: 60 },
  { label: '75€+/h', value: 90 },
];

// ── Tool options ───────────────────────────────────────────────────────────────
const TOOL_OPTIONS = [
  'CRM', 'Email', 'Spreadsheets', 'Slack', 'HubSpot', 'Salesforce',
  'Airtable', 'Notion', 'Zapier', 'Make', 'Shopify', 'Stripe', 'Custom ERP',
];

// ── Task options ───────────────────────────────────────────────────────────────
const TASK_OPTIONS = [
  'Data entry', 'Reporting', 'Follow-ups clients', 'Onboarding',
  'Facturation', 'Support', 'Synchronisation données', 'Emails manuels',
];

// ── Loading steps ──────────────────────────────────────────────────────────────
const LOADING_STEPS = [
  'Analyse de votre stack…',
  'Calcul des économies potentielles…',
  'Génération de votre rapport…',
];

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 12,
    padding: '24px',
  } as const,
  cardSelected: {
    background: 'rgba(232,180,176,0.12)',
    border: '1px solid #E8B4B0',
    borderRadius: 12,
    padding: '24px',
    cursor: 'pointer',
  } as const,
  chip: {
    padding: '8px 16px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.04)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(248,246,241,0.70)',
    transition: 'all 0.15s',
    userSelect: 'none' as const,
  },
  chipSelected: {
    padding: '8px 16px',
    borderRadius: 999,
    border: '1px solid #E8B4B0',
    background: 'rgba(232,180,176,0.15)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    color: '#E8B4B0',
    transition: 'all 0.15s',
    userSelect: 'none' as const,
    boxShadow: '0 0 12px rgba(232,180,176,0.20)',
  },
  btn: {
    background: '#E8B4B0',
    color: '#0A0A0A',
    fontWeight: 600,
    fontSize: 15,
    padding: '14px 32px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'opacity 0.15s',
  } as const,
  btnGhost: {
    background: 'transparent',
    color: 'rgba(248,246,241,0.45)',
    fontWeight: 500,
    fontSize: 14,
    padding: '14px 24px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.10)',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  } as const,
};

// ── Count-up animation hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = true) {
  const value = useSignal(0);
  useEffect(() => {
    if (!active || target === 0) { value.value = target; return; }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
      value.value = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return value;
}

// ── Format currency ────────────────────────────────────────────────────────────
function fmtEur(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k€`;
  return `${n}€`;
}

// ── Progress bar ───────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.min(((step) / total) * 100, 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
          Étape {Math.min(step, total)} sur {total}
        </span>
        <span style={{ fontSize: 10, color: '#E8B4B0', fontWeight: 600 }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #E8B4B0, rgba(232,180,176,0.5))',
          borderRadius: 99,
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}

// ── Step wrapper with fade/slide animation ─────────────────────────────────────
function StepWrapper({ children, visible }: { children: preact.ComponentChildren; visible: boolean }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: visible ? 'auto' : 'none',
      position: visible ? 'relative' : 'absolute',
    }}>
      {children}
    </div>
  );
}

// ── Loading screen ─────────────────────────────────────────────────────────────
function LoadingScreen({ activeStep }: { activeStep: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 24px' }}>
      {/* Animated ring */}
      <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 40px' }}>
        <svg width={80} height={80} style={{ animation: 'spin 1.4s linear infinite', display: 'block' }}>
          <circle cx={40} cy={40} r={34} fill="none" stroke="rgba(232,180,176,0.12)" strokeWidth={4} />
          <circle cx={40} cy={40} r={34} fill="none" stroke="#E8B4B0" strokeWidth={4}
            strokeDasharray="60 154" strokeLinecap="round"
            style={{ transformOrigin: '40px 40px' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" fill="rgba(232,180,176,0.6)" />
          </svg>
        </div>
      </div>

      <p style={{ fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif", fontSize: 22, color: '#F8F6F1', marginBottom: 32 }}>
        Analyse en cours…
      </p>

      <div style={{ maxWidth: 320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {LOADING_STEPS.map((step, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: i <= activeStep ? 1 : 0.3,
            transition: 'opacity 0.4s ease',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: i < activeStep ? '#E8B4B0' : i === activeStep ? 'rgba(232,180,176,0.3)' : 'rgba(255,255,255,0.06)',
              border: i === activeStep ? '1px solid #E8B4B0' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}>
              {i < activeStep && (
                <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#0A0A0A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: i <= activeStep ? 'rgba(248,246,241,0.75)' : 'rgba(248,246,241,0.25)' }}>
              {step}
            </span>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Results screen ─────────────────────────────────────────────────────────────
function ResultsScreen({
  result,
  onReset,
  onShowEmailModal,
}: {
  result: ROIResult;
  onReset: () => void;
  onShowEmailModal: () => void;
}) {
  const savingsCount = useCountUp(result.automationSavings, 2000, true);
  const roiPctCount = useCountUp(result.roiPercent, 1600, true);
  const hoursSavedCount = useCountUp(Math.round(result.hoursSavedPerWeek * 10) / 10, 1400, true);

  return (
    <div>
      {/* Hero savings */}
      <div style={{ textAlign: 'center', padding: '40px 0 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 32 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(232,180,176,0.70)', fontWeight: 600, marginBottom: 12 }}>
          Économies annuelles estimées
        </p>
        <div style={{
          fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
          fontSize: 'clamp(52px, 10vw, 80px)',
          fontWeight: 400,
          color: '#F8F6F1',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: 8,
          position: 'relative',
          display: 'inline-block',
        }}>
          {fmtEur(savingsCount.value)}
          {/* Pulse ring */}
          <div style={{
            position: 'absolute', inset: -12,
            borderRadius: 16,
            background: 'radial-gradient(ellipse at center, rgba(232,180,176,0.08) 0%, transparent 70%)',
            animation: 'pulse 2.5s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        </div>
        <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.40)' }}>
          basé sur votre configuration actuelle
        </p>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.04); }
          }
        `}</style>
      </div>

      {/* Key metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'ROI', value: `${roiPctCount.value}%`, sub: 'retour sur investissement' },
          { label: 'Rentabilisé en', value: `${result.roiMonths} mois`, sub: 'délai de récupération' },
          { label: 'Heures libérées', value: `${hoursSavedCount.value}h`, sub: 'par semaine' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ ...S.card, textAlign: 'center' }}>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)', marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif", fontSize: 28, color: '#E8B4B0', lineHeight: 1, marginBottom: 4 }}>{value}</p>
            <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.30)' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Breakdown table */}
      {result.breakdown?.length > 0 && (
        <div style={{ ...S.card, marginBottom: 24, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(248,246,241,0.60)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Détail par tâche
            </p>
          </div>
          <div>
            {result.breakdown.map((item, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: 16,
                padding: '14px 20px',
                alignItems: 'center',
                borderBottom: i < result.breakdown.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div>
                  <p style={{ fontSize: 14, color: '#F8F6F1', fontWeight: 500, marginBottom: 2 }}>{item.task}</p>
                  <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.30)' }}>{item.automationTool}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 13, color: '#E8B4B0', fontWeight: 600 }}>{item.hoursSaved}h/sem</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>libérées</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 14, color: '#F8F6F1', fontWeight: 600 }}>{fmtEur(item.annualSaving)}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>par an</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top opportunities */}
      {result.topOpportunities?.length > 0 && (
        <div style={{ ...S.card, marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(248,246,241,0.60)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
            Top opportunités
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {result.topOpportunities.map((opp, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'rgba(232,180,176,0.12)',
                  border: '1px solid rgba(232,180,176,0.25)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, marginTop: 1,
                }}>
                  <span style={{ fontSize: 10, color: '#E8B4B0', fontWeight: 700 }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.70)', lineHeight: 1.55 }}>{opp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      {result.recommendation && (
        <div style={{
          ...S.card,
          background: 'rgba(232,180,176,0.05)',
          border: '1px solid rgba(232,180,176,0.15)',
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>💡</div>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.70)', lineHeight: 1.65 }}>{result.recommendation}</p>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <button style={{ ...S.btn, width: '100%', justifyContent: 'center', fontSize: 15, padding: '16px 32px' }} onClick={onShowEmailModal}>
          Obtenir mon rapport complet
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button style={{ ...S.btnGhost, fontSize: 13 }} onClick={onReset}>
          Recommencer le calcul
        </button>
      </div>
    </div>
  );
}

// ── Email modal ────────────────────────────────────────────────────────────────
function EmailModal({
  email,
  onClose,
  onSubmit,
  submitting,
  submitted,
}: {
  email: string;
  onClose: () => void;
  onSubmit: (e: string) => void;
  submitting: boolean;
  submitted: boolean;
}) {
  const localEmail = useSignal(email);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      {/* Backdrop */}
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#0E0E0E',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 440,
      }}>
        {!submitted ? (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(232,180,176,0.10)',
                border: '1px solid rgba(232,180,176,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                  <path d="M3 5h16v13a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#E8B4B0" strokeWidth={1.5} />
                  <path d="M3 5l8 8 8-8" stroke="#E8B4B0" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif", fontSize: 22, color: '#F8F6F1', marginBottom: 6 }}>
                Recevez votre rapport PDF
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.45)', lineHeight: 1.6 }}>
                Rapport personnalisé avec votre ROI détaillé, les workflows recommandés, et un plan d'action priorisé.
              </p>
            </div>

            <input
              type="email"
              placeholder="votre@email.com"
              value={localEmail.value}
              onInput={(e) => localEmail.value = (e.target as HTMLInputElement).value}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '13px 16px',
                fontSize: 14,
                color: '#F8F6F1',
                outline: 'none',
                marginBottom: 12,
                boxSizing: 'border-box' as const,
              }}
            />

            <button
              style={{ ...S.btn, width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
              onClick={() => onSubmit(localEmail.value)}
              disabled={submitting}
            >
              {submitting ? 'Envoi en cours…' : 'Envoyer mon rapport →'}
            </button>

            <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.25)', textAlign: 'center', marginTop: 12 }}>
              Aucun spam. Désabonnement en un clic.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(232,180,176,0.12)',
              border: '1px solid rgba(232,180,176,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#E8B4B0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif", fontSize: 22, color: '#F8F6F1', marginBottom: 8 }}>
              Rapport envoyé !
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.45)', lineHeight: 1.6, marginBottom: 24 }}>
              Vérifiez votre boîte mail dans quelques minutes. Notre équipe vous contactera sous 24h pour discuter de vos opportunités.
            </p>
            <button style={{ ...S.btn, margin: '0 auto' }} onClick={onClose}>
              Fermer
            </button>
          </div>
        )}

        {/* Close button */}
        {!submitted && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.06)', border: 'none',
              borderRadius: 8, width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(248,246,241,0.50)',
            }}
          >
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main ROICalculator component ───────────────────────────────────────────────
export default function ROICalculator() {
  // ── State signals ──────────────────────────────────────────────────
  const step = useSignal(0); // 0=intro 1-4=steps 5=loading 6=results
  const employees = useSignal(4);
  const hoursPerWeek = useSignal(10);
  const hourlyRate = useSignal(35);
  const tools = useSignal<string[]>([]);
  const tasks = useSignal<string[]>([]);
  const email = useSignal('');
  const result = useSignal<ROIResult | null>(null);
  const loading = useSignal(false);
  const error = useSignal('');
  const loadingStep = useSignal(0);
  const showEmailModal = useSignal(false);
  const emailSubmitting = useSignal(false);
  const emailSubmitted = useSignal(false);

  // Live preview cost calculation
  const annualCost = useComputed(() =>
    Math.round(employees.value * hoursPerWeek.value * 52 * hourlyRate.value)
  );

  // ── Toggle tool/task selection ─────────────────────────────────────
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

  // ── Navigation ─────────────────────────────────────────────────────
  function goNext() {
    if (step.value < 4) {
      step.value++;
    } else {
      startCalculation();
    }
  }

  function goBack() {
    if (step.value > 1) step.value--;
  }

  // ── Calculation ────────────────────────────────────────────────────
  async function startCalculation() {
    step.value = 5; // loading
    loadingStep.value = 0;
    error.value = '';

    const stepInterval = setInterval(() => {
      if (loadingStep.value < LOADING_STEPS.length - 1) loadingStep.value++;
    }, 900);

    // Minimum loading duration for UX
    const minDelay = new Promise(r => setTimeout(r, 3000));

    try {
      const [res] = await Promise.all([
        fetch('/api/roi-calculator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employees: employees.value,
            hoursPerWeek: hoursPerWeek.value,
            hourlyRate: hourlyRate.value,
            tools: tools.value,
            mainTasks: tasks.value,
            email: email.value,
          }),
        }),
        minDelay,
      ]);

      clearInterval(stepInterval);
      loadingStep.value = LOADING_STEPS.length - 1;

      if (!res.ok) throw new Error('API error');

      const data: ROIResult = await res.json();

      if (!data.automationSavings) throw new Error('Invalid response');

      result.value = data;
      step.value = 6; // results

    } catch {
      clearInterval(stepInterval);
      // Client-side fallback calculation
      result.value = computeClientFallback();
      step.value = 6;
    }
  }

  // ── Client-side fallback ────────────────────────────────────────────
  function computeClientFallback(): ROIResult {
    const emp = employees.value;
    const hrs = hoursPerWeek.value;
    const rate = hourlyRate.value;
    const tls = tools.value;
    const tks = tasks.value;

    const currentCost = Math.round(emp * hrs * 52 * rate);
    const automationSavings = Math.round(currentCost * 0.75);
    const toolComplexity = tls.length > 5 ? 1.4 : tls.length > 2 ? 1.15 : 1;
    const implementationCost = Math.round(Math.min(emp * 600, 12000) * toolComplexity);
    const roiMonths = parseFloat((implementationCost / (automationSavings / 12)).toFixed(1));
    const roiPercent = Math.round(((automationSavings - implementationCost) / implementationCost) * 100);
    const hoursSavedPerWeek = parseFloat((emp * hrs * 0.75).toFixed(1));

    const toolMap: Record<string, string> = {
      'Data entry': 'n8n + Airtable',
      'Reporting': 'n8n + Google Data Studio',
      'Follow-ups clients': 'n8n + HubSpot',
      'Onboarding': 'n8n + Notion',
      'Facturation': 'n8n + Stripe',
      'Support': 'n8n + Intercom',
      'Synchronisation données': 'n8n + Make',
      'Emails manuels': 'n8n + Instantly',
    };

    const activeTasks = tks.length > 0 ? tks : ['Data entry', 'Reporting'];
    const hoursPerTask = parseFloat((hoursSavedPerWeek / activeTasks.length).toFixed(1));

    const breakdown: BreakdownItem[] = activeTasks.slice(0, 5).map(task => ({
      task,
      hoursSaved: hoursPerTask,
      annualSaving: Math.round(emp * hoursPerTask * 52 * rate),
      automationTool: toolMap[task] || 'n8n + workflow custom',
    }));

    return {
      currentCost,
      automationSavings,
      implementationCost,
      roiMonths,
      roiPercent,
      hoursSavedPerWeek,
      breakdown,
      topOpportunities: [
        `Synchronisation automatique — libérez ${Math.round(hrs * 0.3 * emp)}h/semaine`,
        `Rapports générés automatiquement chaque semaine (5 min vs ${Math.round(hrs * 0.25 * emp)}h)`,
        `Séquences de relance automatisées avec taux d'ouverture 82%`,
      ],
      recommendation: `Avec ${emp} collaborateurs perdant ${hrs}h/semaine, votre potentiel est de ${fmtEur(automationSavings)}/an. Rentabilisé en ${roiMonths} mois grâce à l'automatisation de vos ${activeTasks[0]?.toLowerCase() || 'processus clés'}. Commencez par un audit gratuit pour identifier les 3 workflows à fort impact.`,
    };
  }

  // ── Email submit ────────────────────────────────────────────────────
  async function handleEmailSubmit(emailVal: string) {
    if (!emailVal || !emailVal.includes('@')) return;
    emailSubmitting.value = true;
    try {
      await fetch('/api/roi-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailVal,
          result: result.value,
          inputs: {
            employees: employees.value,
            hoursPerWeek: hoursPerWeek.value,
            hourlyRate: hourlyRate.value,
            tools: tools.value,
            tasks: tasks.value,
          },
        }),
      });
    } catch { /* best effort */ }
    emailSubmitting.value = false;
    emailSubmitted.value = true;
  }

  function resetAll() {
    step.value = 0;
    employees.value = 4;
    hoursPerWeek.value = 10;
    hourlyRate.value = 35;
    tools.value = [];
    tasks.value = [];
    result.value = null;
    error.value = '';
    loadingStep.value = 0;
    emailSubmitted.value = false;
  }

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div style={{
      background: '#0A0A0A',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
      maxWidth: 680,
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Intro screen */}
      {step.value === 0 && (
        <div style={{ padding: '48px 40px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            border: '1px solid rgba(232,180,176,0.25)',
            background: 'rgba(232,180,176,0.07)',
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(232,180,176,0.80)', fontWeight: 600 }}>
              Gratuit · 2 minutes
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
            fontSize: 'clamp(28px, 5vw, 40px)',
            color: '#F8F6F1',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 14,
          }}>
            Calculez votre ROI<br /><em style={{ color: '#E8B4B0', fontStyle: 'italic' }}>en 4 étapes</em>
          </h2>

          <p style={{ fontSize: 14, color: 'rgba(248,246,241,0.45)', lineHeight: 1.65, maxWidth: 380, margin: '0 auto 36px' }}>
            Répondez à 4 questions sur votre équipe et vos outils. Obtenez un rapport personnalisé avec votre potentiel d'économies exact.
          </p>

          <button style={{ ...S.btn, fontSize: 15, padding: '15px 36px' }} onClick={() => step.value = 1}>
            Commencer le calcul
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Steps 1–4 */}
      {step.value >= 1 && step.value <= 4 && (
        <div style={{ padding: '36px 40px' }}>
          <ProgressBar step={step.value} total={4} />

          {/* Step 1 — Team size */}
          <StepWrapper visible={step.value === 1}>
            <h2 style={{
              fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
              fontSize: 26, color: '#F8F6F1', fontWeight: 400, marginBottom: 6,
            }}>
              Combien de personnes dans votre équipe ?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.40)', marginBottom: 28 }}>
              Toutes les personnes qui pourraient gagner du temps grâce à l'automatisation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 36 }}>
              {EMPLOYEE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => employees.value = opt.value}
                  style={{
                    ...(employees.value === opt.value ? S.cardSelected : { ...S.card, cursor: 'pointer' }),
                    padding: '20px 8px',
                    textAlign: 'center',
                    border: employees.value === opt.value ? '1px solid #E8B4B0' : '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <span style={{
                    fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
                    fontSize: 22, color: employees.value === opt.value ? '#E8B4B0' : '#F8F6F1',
                    display: 'block', lineHeight: 1,
                  }}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </StepWrapper>

          {/* Step 2 — Hours & Rate */}
          <StepWrapper visible={step.value === 2}>
            <h2 style={{
              fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
              fontSize: 26, color: '#F8F6F1', fontWeight: 400, marginBottom: 6,
            }}>
              Combien d'heures par semaine sont perdues ?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.40)', marginBottom: 28 }}>
              En tâches manuelles, copier-coller, saisie de données, etc.
            </p>

            {/* Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: 'rgba(248,246,241,0.45)' }}>Heures/semaine par personne</span>
                <span style={{
                  fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
                  fontSize: 22, color: '#E8B4B0',
                }}>
                  {hoursPerWeek.value}h
                </span>
              </div>
              <input
                type="range" min={2} max={40} step={1}
                value={hoursPerWeek.value}
                onInput={(e) => hoursPerWeek.value = parseInt((e.target as HTMLInputElement).value)}
                style={{ width: '100%', accentColor: '#E8B4B0', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>2h</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>40h</span>
              </div>
            </div>

            {/* Live preview */}
            <div style={{
              background: 'rgba(232,180,176,0.06)',
              border: '1px solid rgba(232,180,176,0.15)',
              borderRadius: 10,
              padding: '14px 18px',
              marginBottom: 28,
              display: 'flex',
              gap: 24,
              flexWrap: 'wrap' as const,
            }}>
              <div>
                <p style={{ fontSize: 10, color: 'rgba(232,180,176,0.60)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Heures/an</p>
                <p style={{ fontSize: 18, color: '#F8F6F1', fontWeight: 600 }}>
                  {(employees.value * hoursPerWeek.value * 52).toLocaleString('fr-FR')}h
                </p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: 'rgba(232,180,176,0.60)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Coût actuel/an</p>
                <p style={{ fontSize: 18, color: '#E8B4B0', fontWeight: 600 }}>
                  {fmtEur(annualCost.value)}
                </p>
              </div>
            </div>

            {/* Hourly rate */}
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(248,246,241,0.60)', marginBottom: 12 }}>
              Taux horaire moyen de votre équipe
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 36 }}>
              {RATE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => hourlyRate.value = opt.value}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    borderRadius: 10,
                    cursor: 'pointer',
                    border: hourlyRate.value === opt.value ? '1px solid #E8B4B0' : '1px solid rgba(255,255,255,0.09)',
                    background: hourlyRate.value === opt.value ? 'rgba(232,180,176,0.12)' : 'rgba(255,255,255,0.04)',
                    color: hourlyRate.value === opt.value ? '#E8B4B0' : 'rgba(248,246,241,0.65)',
                    fontSize: 13, fontWeight: hourlyRate.value === opt.value ? 600 : 400,
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </StepWrapper>

          {/* Step 3 — Tools */}
          <StepWrapper visible={step.value === 3}>
            <h2 style={{
              fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
              fontSize: 26, color: '#F8F6F1', fontWeight: 400, marginBottom: 6,
            }}>
              Quels outils utilisez-vous ?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.40)', marginBottom: 28 }}>
              Sélectionnez tous les outils de votre stack actuelle.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 36 }}>
              {TOOL_OPTIONS.map(tool => (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  style={tools.value.includes(tool) ? S.chipSelected : S.chip}
                >
                  {tool}
                </button>
              ))}
            </div>
            {tools.value.length === 0 && (
              <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.25)', fontStyle: 'italic', marginBottom: 8 }}>
                Sélectionnez au moins un outil pour un rapport plus précis.
              </p>
            )}
          </StepWrapper>

          {/* Step 4 — Tasks */}
          <StepWrapper visible={step.value === 4}>
            <h2 style={{
              fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
              fontSize: 26, color: '#F8F6F1', fontWeight: 400, marginBottom: 6,
            }}>
              Quelles tâches vous font le plus perdre du temps ?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.40)', marginBottom: 28 }}>
              Choisissez vos principales sources de friction opérationnelle.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 36 }}>
              {TASK_OPTIONS.map(task => (
                <button
                  key={task}
                  onClick={() => toggleTask(task)}
                  style={tasks.value.includes(task) ? S.chipSelected : S.chip}
                >
                  {task}
                </button>
              ))}
            </div>
            {tasks.value.length === 0 && (
              <p style={{ fontSize: 12, color: 'rgba(248,246,241,0.25)', fontStyle: 'italic', marginBottom: 8 }}>
                Sélectionnez au moins une tâche pour un rapport personnalisé.
              </p>
            )}
          </StepWrapper>

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <button
              style={S.btnGhost}
              onClick={step.value === 1 ? () => step.value = 0 : goBack}
            >
              ← Retour
            </button>
            <button style={S.btn} onClick={goNext}>
              {step.value === 4 ? 'Calculer mon ROI' : 'Suivant'}
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Loading screen */}
      {step.value === 5 && (
        <div style={{ padding: '24px 40px' }}>
          <LoadingScreen activeStep={loadingStep.value} />
        </div>
      )}

      {/* Results screen */}
      {step.value === 6 && result.value && (
        <div style={{ padding: '36px 40px' }}>
          <ResultsScreen
            result={result.value}
            onReset={resetAll}
            onShowEmailModal={() => { showEmailModal.value = true; emailSubmitted.value = false; }}
          />
        </div>
      )}

      {/* Email modal */}
      {showEmailModal.value && (
        <EmailModal
          email={email.value}
          onClose={() => showEmailModal.value = false}
          onSubmit={handleEmailSubmit}
          submitting={emailSubmitting.value}
          submitted={emailSubmitted.value}
        />
      )}
    </div>
  );
}
