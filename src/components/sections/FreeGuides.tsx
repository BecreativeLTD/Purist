import { useSignal, useComputed } from '@preact/signals';
import { track } from '~/lib/amplitude';
import { professions, type Profession } from '~/data/automations';
import { buildGuidePdf } from '~/lib/pdf-guide';

export const CATEGORY_COLORS: Record<string, string> = {
  'Home Services': '#E8B4B0',
  'Agencies & Consulting': '#7B68EE',
  'Real Estate': '#4ade80',
  'Education': '#5B8BD4',
  'Legal': '#C89840',
  'Travel': '#E87040',
  'Food & Restaurant': '#D97706',
  'Beauty & Wellness': '#E8A0C4',
  'E-commerce': '#F5A623',
  'Automotive': '#9CA3AF',
  'Creative': '#A78BFA',
  'B2B Services': '#38BDF8',
};

const CATEGORIES = ['All', ...Array.from(new Set(professions.map((p) => p.category)))];

function GuideCard({ profession, onOpen }: { profession: Profession; onOpen: (p: Profession) => void }) {
  const color = CATEGORY_COLORS[profession.category] ?? '#E8B4B0';
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(248,246,241,0.35)' }}>{profession.category}</span>
      </div>
      <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 17, color: '#F8F6F1', marginBottom: 6, letterSpacing: '-0.01em' }}>
        {profession.name}
      </h3>
      <p style={{ fontSize: 11.5, color: 'rgba(248,246,241,0.45)', lineHeight: 1.55, marginBottom: 14, flex: 1 }}>
        {profession.tagline}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6, marginBottom: 14 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '6px 9px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color }}>{profession.stats.timeSaved}</div>
          <div style={{ fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(248,246,241,0.32)', marginTop: 1 }}>Saved / week</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '6px 9px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color }}>{profession.stats.revenueImpact}</div>
          <div style={{ fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(248,246,241,0.32)', marginTop: 1 }}>Revenue impact</div>
        </div>
      </div>
      <button
        onClick={() => onOpen(profession)}
        style={{ background: color, color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '10px 14px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', width: '100%' }}
      >
        Get the free PDF guide ↓
      </button>
    </div>
  );
}

function EmailGateModal({ profession, onClose }: { profession: Profession; onClose: () => void }) {
  const color = CATEGORY_COLORS[profession.category] ?? '#E8B4B0';
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
    track('free_guide_requested', { industry: profession.slug, category: profession.category });
    try {
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          page: '/pages/free-guides',
          source: `free_guide_${profession.slug}`,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch { /* silent — don't block the download */ }
    await buildGuidePdf(profession, color);
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
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16v11a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" stroke={color} strokeWidth={1.4} />
                  <path d="M2 5l8 7 8-7" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Fraunces Variable','Fraunces',Georgia,serif", fontSize: 22, color: '#F8F6F1', marginBottom: 8, letterSpacing: '-0.02em' }}>
                {profession.name} automation guide
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.42)', lineHeight: 1.65 }}>
                A 12-page PDF built specifically for {profession.name.toLowerCase()}s: every workflow, every tool, the full ROI math, and a 90-day deployment roadmap. Instant download.
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
              style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6, background: color, color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '13px 16px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', opacity: submitting.value ? 0.7 : 1 }}
            >
              {submitting.value ? 'Building your 12-page PDF…' : 'Send me the guide →'}
            </button>

            <p style={{ fontSize: 11, color: 'rgba(248,246,241,0.22)', textAlign: 'center', marginTop: 12 }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
  const active = useSignal<Profession | null>(null);
  const activeCategory = useSignal('All');
  const query = useSignal('');

  const filtered = useComputed(() => {
    let list = professions;
    if (activeCategory.value !== 'All') {
      list = list.filter((p) => p.category === activeCategory.value);
    }
    const q = query.value.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
    }
    return list;
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder={`Search ${professions.length} industries — plumber, dentist, real estate agent…`}
          value={query.value}
          onInput={(e) => (query.value = (e.target as HTMLInputElement).value)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '13px 16px', fontSize: 13.5, color: '#F8F6F1', outline: 'none', boxSizing: 'border-box' as const, marginBottom: 14 }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => (activeCategory.value = c)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 600,
                border: '1px solid',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeCategory.value === c ? '#E8B4B0' : 'rgba(255,255,255,0.04)',
                color: activeCategory.value === c ? '#0A0A0A' : 'rgba(248,246,241,0.55)',
                borderColor: activeCategory.value === c ? '#E8B4B0' : 'rgba(255,255,255,0.10)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 11.5, color: 'rgba(248,246,241,0.3)', marginBottom: 16 }}>
        {filtered.value.length} free guide{filtered.value.length === 1 ? '' : 's'} available
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {filtered.value.map((p) => (
          <GuideCard key={p.slug} profession={p} onOpen={(profession) => (active.value = profession)} />
        ))}
      </div>

      {active.value && <EmailGateModal profession={active.value} onClose={() => (active.value = null)} />}
    </div>
  );
}
