/** @jsxImportSource preact */
import { FREE_SHIPPING_THRESHOLD } from '~/stores/cart';
import { formatPrice } from '~/lib/format';

interface Props {
  subtotal: number;
}

export default function FreeShippingBar({ subtotal }: Props) {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const qualified = remaining === 0;

  return (
    <div class="px-5 py-4 bg-brand-cream border-b border-brand-gray-100">
      <p class="text-xs mb-2">
        {qualified ? (
          <span class="font-medium text-brand-green">
            ✓ You unlocked free shipping
          </span>
        ) : (
          <>
            You are <span class="font-medium">{formatPrice(remaining)}</span> from
            free shipping
          </>
        )}
      </p>
      <div class="h-1.5 bg-white rounded-full overflow-hidden">
        <div
          class="h-full bg-brand-black transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
