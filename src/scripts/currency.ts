// Global currency detection + conversion
// Runs client-side on every page
// Converts all [data-price] elements from GBP base

export {};

(function () {
  const RATES: Record<string, number> = {
    GBP: 1, USD: 1.27, EUR: 1.17, CAD: 1.72, AUD: 1.96,
  };
  const SYMBOLS: Record<string, string> = {
    GBP: '£', USD: '$', EUR: '€', CAD: 'CA$', AUD: 'A$',
  };
  // Country → currency
  const CC: Record<string, string> = {
    GB: 'GBP', JE: 'GBP', GG: 'GBP', IM: 'GBP', IE: 'GBP',
    US: 'USD', CA: 'CAD', AU: 'AUD',
    FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR',
    BE: 'EUR', PT: 'EUR', AT: 'EUR', FI: 'EUR', GR: 'EUR',
    SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR',
    LU: 'EUR', MT: 'EUR', CY: 'EUR', HR: 'EUR',
  };

  function fmt(n: number, symbol: string): string {
    if (n >= 1_000_000) return symbol + (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 100_000)   return symbol + Math.round(n / 1_000) + 'K';
    return symbol + n.toLocaleString('en-GB');
  }

  function apply(currency: string) {
    const rate   = RATES[currency]   ?? 1;
    const symbol = SYMBOLS[currency] ?? '£';

    document.querySelectorAll<HTMLElement>('[data-price]').forEach((el) => {
      const gbp  = parseFloat(el.dataset.price ?? '0');
      const unit = el.dataset.priceUnit ?? '';
      const converted = Math.round(gbp * rate);
      el.textContent = fmt(converted, symbol) + (unit ? unit : '');
    });

    // Symbol-only spans (e.g. the £ sign on the ROI calculator)
    document.querySelectorAll<HTMLElement>('[data-currency-symbol]').forEach((el) => {
      el.textContent = symbol;
    });

    // Dispatch for any component that needs to react (e.g. ROI calculator)
    window.dispatchEvent(new CustomEvent('puristCurrency', {
      detail: { currency, rate, symbol },
    }));

    try { sessionStorage.setItem('purist_currency', currency); } catch (_) {}
  }

  // 1. Restore from session (instant, no flash)
  let saved: string | null = null;
  try { saved = sessionStorage.getItem('purist_currency'); } catch (_) {}
  if (saved && RATES[saved]) {
    apply(saved);
    return;
  }

  // 2. Detect via IP geolocation
  fetch('https://ipapi.co/json/')
    .then((r) => r.json())
    .then((data) => {
      const country  = (data.country_code as string) ?? 'GB';
      const currency = CC[country] ?? 'GBP';
      apply(currency);
    })
    .catch(() => apply('GBP'));
})();
