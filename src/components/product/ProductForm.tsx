/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import { addItem } from '~/stores/cart';
import { formatPrice } from '~/lib/format';

interface Flavor { id: string; name: string; }

interface Props {
  productId: string;
  title: string;
  image: string;
  flavors: Flavor[];
  priceSubscription: number;
  priceOneTime: number;
  discount: number;
}

type Plan = 'quarterly' | 'monthly' | 'oneTime';

const planMeta: Record<Plan, { label: string; sub: string; badge?: string }> = {
  quarterly: { label: 'Quarterly subscription', sub: '30% off · Priority support · Cancel anytime', badge: 'BEST VALUE' },
  monthly:   { label: 'Monthly subscription',   sub: '20% off · Cancel anytime' },
  oneTime:   { label: 'One-time deployment',    sub: 'You own everything we build · 30-day guarantee' },
};

export default function ProductForm({
  productId,
  title,
  image,
  flavors,
  priceSubscription,
  priceOneTime,
  discount,
}: Props) {
  const [flavor, setFlavor] = useState(flavors[0]?.id ?? '');
  const [plan, setPlan] = useState<Plan>('quarterly');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const planToPrice: Record<Plan, number> = {
    quarterly: priceSubscription,
    monthly: Math.round(priceSubscription * 1.1 * 100) / 100,
    oneTime: priceOneTime,
  };
  const price = planToPrice[plan];

  const handleAdd = () => {
    addItem({
      productId,
      title,
      flavor: flavors.find((f) => f.id === flavor)?.name,
      plan: plan === 'oneTime' ? 'oneTime' : 'subscription',
      price,
      quantity: qty,
      image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div class="space-y-6">
      {/* Plan selector */}
      <fieldset class="space-y-2">
        <legend class="eyebrow mb-3">Choose your plan</legend>
        {(['quarterly', 'monthly', 'oneTime'] as Plan[]).map((p) => {
          const meta = planMeta[p];
          const active = plan === p;
          return (
            <label
              key={p}
              class={`relative flex items-center gap-3 p-4 rounded-card border cursor-pointer transition ${
                active ? 'border-brand-black bg-brand-cream' : 'border-brand-gray-200 hover:border-brand-gray-400'
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={p}
                checked={active}
                onChange={() => setPlan(p)}
                class="sr-only"
              />
              <span
                class={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  active ? 'border-brand-black' : 'border-brand-gray-400'
                }`}
                aria-hidden="true"
              >
                {active && <span class="w-2.5 h-2.5 rounded-full bg-brand-black" />}
              </span>
              <span class="flex-1 min-w-0">
                <span class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium text-sm">{meta.label}</span>
                  {meta.badge && (
                    <span class="bg-brand-green/15 text-brand-green text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                      {meta.badge}
                    </span>
                  )}
                </span>
                <span class="block text-xs text-brand-gray-600 mt-0.5">{meta.sub}</span>
              </span>
              <span class="font-display text-base shrink-0 tabular-nums">
                {formatPrice(planToPrice[p])}
              </span>
            </label>
          );
        })}
      </fieldset>

      {/* Flavor selector */}
      {flavors.length > 1 && (
        <fieldset>
          <legend class="eyebrow mb-3">Industry</legend>
          <div class="grid grid-cols-2 gap-2">
            {flavors.map((f) => {
              const active = flavor === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlavor(f.id)}
                  class={`px-3 py-2.5 rounded-button border text-xs text-left transition ${
                    active
                      ? 'border-brand-black bg-brand-black text-white'
                      : 'border-brand-gray-200 hover:border-brand-gray-400'
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Qty + Add to cart */}
      <div class="flex items-stretch gap-3">
        <div class="flex items-center border border-brand-gray-300 rounded-button">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty(Math.max(1, qty - 1))}
            class="w-12 hover:bg-brand-gray-100 transition"
          >
            −
          </button>
          <span class="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty(qty + 1)}
            class="w-12 hover:bg-brand-gray-100 transition"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          class={`flex-1 rounded-button py-3.5 text-sm font-medium transition ${
            added
              ? 'bg-brand-green text-white'
              : 'bg-brand-black text-white hover:bg-brand-gray-900'
          }`}
        >
          {added ? '✓ Added to bag' : `Add to bag · ${formatPrice(price * qty)}`}
        </button>
      </div>

      <p class="text-xs text-brand-gray-600 text-center">
        99.5% uptime SLA · 30-day money-back guarantee · Cancel anytime
      </p>
    </div>
  );
}
