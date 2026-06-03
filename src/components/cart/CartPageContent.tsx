/** @jsxImportSource preact */
import { useStore } from '@nanostores/preact';
import { cartItems, cartSubtotal, FREE_SHIPPING_THRESHOLD } from '~/stores/cart';
import { formatPrice } from '~/lib/format';
import CartItem from './CartItem';

export default function CartPageContent() {
  const items = useStore(cartItems);
  const subtotal = useStore(cartSubtotal);

  if (items.length === 0) {
    return (
      <div class="text-center py-24">
        <div class="w-24 h-24 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-brand-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M5 7h14l-1.5 12a2 2 0 01-2 1.7H8.5a2 2 0 01-2-1.7L5 7z" stroke-linejoin="round" />
            <path d="M9 7V5a3 3 0 016 0v2" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 class="font-display text-2xl mb-3">Your bag is empty</h2>
        <p class="text-sm text-brand-gray-600 mb-8 max-w-sm mx-auto">
          Your automation stack is one click away. Start with Automation Pro or
          The Full Stack.
        </p>
        <a
          href="/collections/all"
          class="inline-block bg-brand-black text-white px-8 py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
        >
          Shop now
        </a>
      </div>
    );
  }

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <div class="grid lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <div class="divide-y divide-brand-gray-100">
          {items.map((i) => (
            <CartItem key={i.id} item={i} />
          ))}
        </div>

        <a
          href="/collections/all"
          class="inline-flex items-center gap-2 mt-8 text-sm underline underline-offset-4 hover:opacity-70"
        >
          ← Continue shopping
        </a>
      </div>

      <aside class="lg:col-span-1">
        <div class="bg-brand-cream rounded-card p-6 lg:p-8 sticky top-24">
          <h2 class="font-display text-xl mb-6">Order summary</h2>

          <div class="space-y-3 text-sm mb-6">
            <div class="flex justify-between">
              <span class="text-brand-gray-600">Subtotal</span>
              <span class="tabular-nums font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-gray-600">Shipping</span>
              <span class="tabular-nums">
                {remaining === 0 ? (
                  <span class="text-brand-green font-medium">Free</span>
                ) : (
                  <span class="text-brand-gray-600">Calculated at checkout</span>
                )}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-gray-600">Taxes</span>
              <span class="text-brand-gray-600 text-xs">Calculated at checkout</span>
            </div>
          </div>

          {remaining > 0 && (
            <div class="bg-white rounded-card p-3 mb-6 text-xs text-center">
              Add <span class="font-medium">{formatPrice(remaining)}</span> for free shipping
            </div>
          )}

          <div class="border-t border-brand-gray-200 pt-4 mb-6 flex items-baseline justify-between">
            <span class="font-medium">Total</span>
            <span class="font-display text-2xl">{formatPrice(subtotal)}</span>
          </div>

          <a
            href="/checkout"
            class="block w-full text-center bg-brand-black text-white py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
          >
            Continue to checkout
          </a>

          <p class="mt-4 text-[11px] text-brand-gray-600 text-center leading-relaxed">
            30-day money-back guarantee · 99.5% uptime SLA · Cancel anytime
          </p>
        </div>
      </aside>
    </div>
  );
}
