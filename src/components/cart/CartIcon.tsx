/** @jsxImportSource preact */
import { useStore } from '@nanostores/preact';
import { cartCount, toggleCart } from '~/stores/cart';

export default function CartIcon() {
  const count = useStore(cartCount);

  return (
    <button
      type="button"
      aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      class="relative p-2 hover:opacity-70 transition"
      onClick={() => toggleCart(true)}
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M5 7h14l-1.5 12a2 2 0 01-2 1.7H8.5a2 2 0 01-2-1.7L5 7z" stroke-linejoin="round" />
        <path d="M9 7V5a3 3 0 016 0v2" stroke-linejoin="round" />
      </svg>
      {count > 0 && (
        <span class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-black text-white text-[10px] font-medium flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
