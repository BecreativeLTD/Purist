/** @jsxImportSource preact */
import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';
import { cartItems, cartOpen, cartSubtotal, toggleCart } from '~/stores/cart';
import { formatPrice } from '~/lib/format';
import CartItem from './CartItem';
import FreeShippingBar from './FreeShippingBar';

const FOUNDER_QUOTE = {
  text: 'We evaluated dozens of automation agencies. PURIST is the only one that deployed in under a week and actually stayed running.',
  attribution: 'Operations Director, Advisory Board',
};

export default function CartDrawer() {
  const items = useStore(cartItems);
  const open = useStore(cartOpen);
  const subtotal = useStore(cartSubtotal);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && toggleCart(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div class="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={() => toggleCart(false)}
      />
      <aside
        class="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right"
      >
        <header class="flex items-center justify-between px-5 py-4 border-b border-brand-gray-100">
          <h2 id="cart-title" class="font-display text-xl">
            Your bag
            {items.length > 0 && (
              <span class="text-sm text-brand-gray-600 font-sans ml-2">
                ({items.reduce((n, i) => n + i.quantity, 0)})
              </span>
            )}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => toggleCart(false)}
            class="p-1 hover:opacity-70 transition"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 6l12 12M18 6l-12 12" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div class="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div class="w-24 h-24 rounded-full bg-brand-cream flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-brand-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                <path d="M5 7h14l-1.5 12a2 2 0 01-2 1.7H8.5a2 2 0 01-2-1.7L5 7z" stroke-linejoin="round" />
                <path d="M9 7V5a3 3 0 016 0v2" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="font-display text-xl mb-2">Your bag is empty</h3>
            <p class="text-sm text-brand-gray-600 mb-6 max-w-xs">
              Your automation stack is one click away. Start with Automation Pro or
              The Full Stack.
            </p>
            <a
              href="/collections/all"
              onClick={() => toggleCart(false)}
              class="bg-brand-black text-white px-6 py-3 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
            >
              Shop now
            </a>
          </div>
        ) : (
          <>
            <FreeShippingBar subtotal={subtotal} />

            <div class="flex-1 overflow-y-auto px-5">
              {items.map((i) => (
                <CartItem key={i.id} item={i} />
              ))}

              <figure class="my-6 p-5 bg-brand-cream rounded-card">
                <svg class="w-6 h-6 text-brand-rust mb-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
                </svg>
                <blockquote class="text-sm italic leading-relaxed mb-2">
                  &ldquo;{FOUNDER_QUOTE.text}&rdquo;
                </blockquote>
                <figcaption class="text-xs text-brand-gray-600">
                  — {FOUNDER_QUOTE.attribution}
                </figcaption>
              </figure>
            </div>

            <footer class="border-t border-brand-gray-100 px-5 py-5 bg-white">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm">Subtotal</span>
                <span class="font-display text-xl">{formatPrice(subtotal)}</span>
              </div>
              <p class="text-xs text-brand-gray-600 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <a
                href="/checkout"
                class="block w-full text-center bg-brand-black text-white py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
              >
                Continue to checkout · {formatPrice(subtotal)}
              </a>
              <button
                type="button"
                onClick={() => toggleCart(false)}
                class="block w-full text-center mt-2 py-2 text-xs underline underline-offset-4 text-brand-gray-600 hover:text-brand-black transition"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
