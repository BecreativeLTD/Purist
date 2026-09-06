import { useState } from 'preact/hooks';

export default function DownloadReportButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const { buildStateOfAutomationPdf } = await import('~/lib/state-of-automation-pdf');
      await buildStateOfAutomationPdf();
    } catch (e) {
      console.error('PDF generation failed', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 24px',
        borderRadius: 10,
        fontSize: 13.5,
        fontWeight: 700,
        background: '#E8B4B0',
        color: '#0A0A0A',
        border: 'none',
        cursor: loading ? 'default' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Generating PDF...' : 'Download the PDF'}
      {!loading && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M7 1v9M3.5 7L7 10.5 10.5 7M2 13h10" />
        </svg>
      )}
    </button>
  );
}
