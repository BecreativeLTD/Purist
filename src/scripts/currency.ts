// Global currency detection + conversion
// Runs client-side on every page
// Base currency: EUR — auto-converts to USD (US/CA) or GBP (UK)

export {};

(function () {
  // EUR = 1 (base). All rates: 1 EUR = X currency
  const RATES: Record<string, number> = {
    EUR: 1,
    USD: 1.09,
    GBP: 0.86,
    CAD: 1.49,
    AUD: 1.66,
    CHF: 0.97,
  };
  const SYMBOLS: Record<string, string> = {
    EUR: '€', USD: '$', GBP: '£', CAD: 'CA$', AUD: 'A$', CHF: 'CHF ',
  };

  // Country → currency. Unmapped countries default to EUR
  const CC: Record<string, string> = {
    US: 'USD', PR: 'USD', GU: 'USD', VI: 'USD', MP: 'USD',
    CA: 'USD',
    GB: 'GBP', JE: 'GBP', GG: 'GBP', IM: 'GBP',
    AU: 'AUD', NZ: 'AUD',
    CH: 'CHF', LI: 'CHF',
    FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR',
    BE: 'EUR', PT: 'EUR', AT: 'EUR', FI: 'EUR', GR: 'EUR',
    SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR',
    LU: 'EUR', MT: 'EUR', CY: 'EUR', HR: 'EUR', IE: 'EUR',
  };

  function fmt(n: number, symbol: string): string {
    if (n >= 1_000_000) return symbol + (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 100_000)   return symbol + Math.round(n / 1_000) + 'K';
    return symbol + n.toLocaleString('en');
  }

  function apply(currency: string) {
    const rate   = RATES[currency] ?? 1;
    const symbol = SYMBOLS[currency] ?? '€';

    // Convert all [data-price] elements (values stored in EUR)
    document.querySelectorAll<HTMLElement>('[data-price]').forEach((el) => {
      const base      = parseFloat(el.dataset.price ?? '0');
      const unit      = el.dataset.priceUnit ?? '';
      const converted = Math.round(base * rate);
      el.textContent  = fmt(converted, symbol) + (unit ? unit : '');
    });

    // Symbol-only spans
    document.querySelectorAll<HTMLElement>('[data-currency-symbol]').forEach((el) => {
      el.textContent = symbol;
    });

    // Dispatch for reactive components
    window.dispatchEvent(new CustomEvent('puristCurrency', {
      detail: { currency, rate, symbol },
    }));

    try { sessionStorage.setItem('purist_currency', currency); } catch (_) {}
  }

  // 1. Restore from session instantly (no flash)
  let saved: string | null = null;
  try { saved = sessionStorage.getItem('purist_currency'); } catch (_) {}
  if (saved && RATES[saved]) { apply(saved); return; }

  // 2. Detect via IP — fallback EUR for any unmapped country
  fetch('https://ipapi.co/json/')
    .then((r) => r.json())
    .then((data) => {
      const country  = (data.country_code as string) ?? '';
      const currency = CC[country] ?? 'EUR';
      apply(currency);
    })
    .catch(() => apply('EUR'));
})();
