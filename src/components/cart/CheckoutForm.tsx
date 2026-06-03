/** @jsxImportSource preact */
import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import { cartItems, cartSubtotal, clearCart, FREE_SHIPPING_THRESHOLD } from '~/stores/cart';
import { formatPrice } from '~/lib/format';

export default function CheckoutForm() {
  const items = useStore(cartItems);
  const subtotal = useStore(cartSubtotal);
  const [submitted, setSubmitted] = useState(false);
  const [shipping, setShipping] = useState<'standard' | 'express'>('standard');

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shipping === 'express' ? 18 : 8;
  const taxes = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shippingCost + taxes;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeDemoAndReset = () => {
    setSubmitted(false);
    clearCart();
    window.location.href = '/';
  };

  if (items.length === 0) {
    return (
      <div class="text-center py-24">
        <h2 class="font-display text-2xl mb-3">Nothing to check out</h2>
        <p class="text-sm text-brand-gray-600 mb-8">Your bag is empty.</p>
        <a
          href="/collections/all"
          class="inline-block bg-brand-black text-white px-8 py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
        >
          Shop now
        </a>
      </div>
    );
  }

  const inputClass =
    'w-full bg-white border border-brand-gray-200 rounded-button px-4 py-3 text-sm placeholder:text-brand-gray-400 focus:border-brand-black focus:outline-none transition';
  const labelClass = 'block text-xs text-brand-gray-600 mb-1.5';

  return (
    <>
      <form onSubmit={handleSubmit} class="grid lg:grid-cols-5 gap-8 lg:gap-16">
        <div class="lg:col-span-3 space-y-8">
          <section>
            <h2 class="font-display text-xl mb-5">Contact</h2>
            <label class={labelClass} for="email">Email</label>
            <input id="email" type="email" required class={inputClass} placeholder="you@example.com" />
            <label class="flex items-center gap-2 mt-3 text-xs text-brand-gray-600">
              <input type="checkbox" class="rounded border-brand-gray-300" />
              Email me with news and offers
            </label>
          </section>

          <section>
            <h2 class="font-display text-xl mb-5">Shipping address</h2>
            <div class="space-y-4">
              <div>
                <label class={labelClass} for="country">Country / region</label>
                <select id="country" class={inputClass} required>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Ireland</option>
                  <option>France</option>
                  <option>Germany</option>
                  <option>Australia</option>
                </select>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class={labelClass} for="firstName">First name</label>
                  <input id="firstName" type="text" required class={inputClass} />
                </div>
                <div>
                  <label class={labelClass} for="lastName">Last name</label>
                  <input id="lastName" type="text" required class={inputClass} />
                </div>
              </div>
              <div>
                <label class={labelClass} for="address">Address</label>
                <input id="address" type="text" required class={inputClass} placeholder="Street address" />
              </div>
              <div>
                <label class={labelClass} for="apt">Apartment, suite, etc. (optional)</label>
                <input id="apt" type="text" class={inputClass} />
              </div>
              <div class="grid sm:grid-cols-3 gap-4">
                <div>
                  <label class={labelClass} for="city">City</label>
                  <input id="city" type="text" required class={inputClass} />
                </div>
                <div>
                  <label class={labelClass} for="state">State</label>
                  <input id="state" type="text" required class={inputClass} />
                </div>
                <div>
                  <label class={labelClass} for="zip">ZIP</label>
                  <input id="zip" type="text" required class={inputClass} />
                </div>
              </div>
              <div>
                <label class={labelClass} for="phone">Phone (optional)</label>
                <input id="phone" type="tel" class={inputClass} />
              </div>
            </div>
          </section>

          <section>
            <h2 class="font-display text-xl mb-5">Shipping method</h2>
            <div class="space-y-2">
              {([
                { id: 'standard', label: 'Standard · 3–5 business days', price: subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8 },
                { id: 'express', label: 'Express · 1–2 business days', price: 18 },
              ] as const).map((opt) => (
                <label
                  class={`flex items-center justify-between p-4 rounded-card border cursor-pointer transition ${
                    shipping === opt.id ? 'border-brand-black bg-brand-cream' : 'border-brand-gray-200'
                  }`}
                >
                  <span class="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      class="sr-only"
                    />
                    <span
                      class={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        shipping === opt.id ? 'border-brand-black' : 'border-brand-gray-400'
                      }`}
                    >
                      {shipping === opt.id && <span class="w-2.5 h-2.5 rounded-full bg-brand-black" />}
                    </span>
                    <span class="text-sm">{opt.label}</span>
                  </span>
                  <span class="font-medium text-sm tabular-nums">
                    {opt.price === 0 ? 'Free' : formatPrice(opt.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 class="font-display text-xl mb-2">Payment</h2>
            <p class="text-xs text-brand-gray-600 mb-5">
              All transactions are secure and encrypted. Demo mode — no real payment is taken.
            </p>
            <div class="space-y-4">
              <div>
                <label class={labelClass} for="card">Card number</label>
                <input id="card" type="text" placeholder="1234 1234 1234 1234" class={inputClass} disabled />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class={labelClass} for="exp">Expiration (MM / YY)</label>
                  <input id="exp" type="text" placeholder="MM / YY" class={inputClass} disabled />
                </div>
                <div>
                  <label class={labelClass} for="cvc">Security code</label>
                  <input id="cvc" type="text" placeholder="CVC" class={inputClass} disabled />
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            class="w-full bg-brand-black text-white py-4 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
          >
            Pay now · {formatPrice(total)}
          </button>
          <p class="text-[11px] text-brand-gray-600 text-center -mt-4">
            This is a demonstration. No payment will be processed.
          </p>
        </div>

        <aside class="lg:col-span-2 lg:order-last">
          <div class="bg-brand-cream rounded-card p-6 lg:sticky lg:top-24">
            <h2 class="font-display text-lg mb-5">Order summary</h2>
            <div class="space-y-4 mb-6 max-h-72 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} class="flex gap-3">
                  <div class="relative shrink-0">
                    <img src={i.image} alt={i.title} class="w-14 h-14 rounded-image object-cover bg-brand-sand" />
                    <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-black text-white text-[10px] flex items-center justify-center">
                      {i.quantity}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium leading-tight truncate">{i.title}</p>
                    <p class="text-xs text-brand-gray-600 mt-0.5 truncate">
                      {i.plan === 'subscription' ? 'Subscription' : 'One-time'} · {i.flavor || 'Variety'}
                    </p>
                  </div>
                  <p class="text-sm font-medium tabular-nums">{formatPrice(i.price * i.quantity)}</p>
                </div>
              ))}
            </div>

            <div class="space-y-2 text-sm mb-4 pb-4 border-b border-brand-gray-200">
              <div class="flex justify-between"><span>Subtotal</span><span class="tabular-nums">{formatPrice(subtotal)}</span></div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span class="tabular-nums">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div class="flex justify-between"><span>Estimated tax</span><span class="tabular-nums">{formatPrice(taxes)}</span></div>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="font-medium">Total</span>
              <span class="font-display text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </form>

      {submitted && (
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div class="bg-white rounded-card max-w-md w-full p-8 text-center">
            <div class="w-14 h-14 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-5">
              <svg class="w-7 h-7 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h2 class="font-display text-2xl mb-3">Demo mode</h2>
            <p class="text-sm text-brand-gray-600 mb-6 leading-relaxed">
              This is a frontend demonstration. No payment provider is connected, no
              order was placed, no card was charged. Connect Stripe or your payment
              provider in production.
            </p>
            <button
              type="button"
              onClick={closeDemoAndReset}
              class="w-full bg-brand-black text-white py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
            >
              Got it — back to home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
