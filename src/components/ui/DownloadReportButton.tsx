import { useState } from 'preact/hooks';

const CATEGORIES = [
  'Home Services', 'Healthcare', 'Agencies & Consulting', 'Real Estate', 'Education',
  'Legal', 'Food & Restaurant', 'Travel', 'Beauty & Wellness', 'E-commerce',
  'Automotive', 'Creative', 'B2B Services',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function DownloadReportButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const { buildStateOfAutomationPdf } = await import('~/lib/state-of-automation-pdf');
      const result = await buildStateOfAutomationPdf();

      fetch('/api/report-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          category: category || undefined,
          pdfBase64: result?.base64,
          page: '/pages/state-of-automation-report-2026',
        }),
      }).catch(() => {});

      setStatus('done');
    } catch (err) {
      console.error('PDF generation failed', err);
      setStatus('error');
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px',
          borderRadius: 10, fontSize: 13.5, fontWeight: 700, background: '#E8B4B0',
          color: '#0A0A0A', border: 'none', cursor: 'pointer',
        }}
      >
        Download the PDF
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M7 1v9M3.5 7L7 10.5 10.5 7M2 13h10" />
        </svg>
      </button>
    );
  }

  if (status === 'done') {
    return (
      <div style={{ fontSize: 13.5, color: '#0A0A0A', fontWeight: 600, padding: '14px 20px' }}>
        Downloading now, and a copy is on its way to {email}.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
        background: '#fff', border: '1px solid rgba(10,10,10,0.12)', borderRadius: 12, padding: 10,
      }}
    >
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        style={{ fontSize: 13.5, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(10,10,10,0.15)', minWidth: 200 }}
      />
      <select
        value={category}
        onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
        style={{ fontSize: 13, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(10,10,10,0.15)', color: category ? '#0A0A0A' : 'rgba(10,10,10,0.45)' }}
      >
        <option value="">Your industry (optional)</option>
        {CATEGORIES.map((c) => <option value={c}>{c}</option>)}
      </select>
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700,
          background: '#8B4038', color: '#fff', border: 'none',
          cursor: status === 'loading' ? 'default' : 'pointer', opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Generating...' : 'Get the PDF'}
      </button>
      {status === 'error' && (
        <p style={{ width: '100%', fontSize: 12, color: '#B3261E', margin: 0 }}>Enter a valid email address to continue.</p>
      )}
      <p style={{ width: '100%', fontSize: 11, color: 'rgba(10,10,10,0.4)', margin: 0 }}>
        We will email you the same PDF and nothing else spammy. Unsubscribe anytime.
      </p>
    </form>
  );
}
