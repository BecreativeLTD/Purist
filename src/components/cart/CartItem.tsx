/** @jsxImportSource preact */
import type { CartItem as CartItemType } from '~/stores/cart';
import { updateQuantity, removeItem } from '~/stores/cart';
import { formatPrice } from '~/lib/format';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  return (
    <article class="flex gap-4 py-5 border-b border-brand-gray-100">
      <img
        src={item.image}
        alt={item.title}
        class="w-20 h-20 rounded-image object-cover bg-brand-sand shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="font-display text-sm leading-tight mb-0.5 truncate">{item.title}</h3>
            <p class="text-xs text-brand-gray-600">
              {item.plan === 'subscription' ? 'Subscription · ' : 'One-time · '}
              {item.flavor || 'Variety'}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${item.title}`}
            onClick={() => removeItem(item.id)}
            class="text-brand-gray-400 hover:text-brand-black transition"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4l8 8M12 4l-8 8" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center border border-brand-gray-200 rounded-button overflow-hidden">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              class="w-7 h-7 flex items-center justify-center hover:bg-brand-gray-100 transition text-sm"
            >
              −
            </button>
            <span class="w-7 text-center text-xs font-medium">{item.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              class="w-7 h-7 flex items-center justify-center hover:bg-brand-gray-100 transition text-sm"
            >
              +
            </button>
          </div>
          <p class="font-medium text-sm tabular-nums">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </article>
  );
}
