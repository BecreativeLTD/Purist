/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import { addItem } from '~/stores/cart';
import { formatPrice } from '~/lib/format';

interface Props {
  productId: string;
  title: string;
  image: string;
  defaultPrice: number;
  perServing: number;
  defaultFlavor?: string;
}

export default function StickyAddToCart({
  productId,
  title,
  image,
  defaultPrice,
  perServing,
  defaultFlavor,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // appear after scrolling past 700px (below the fold of the main form)
      setVisible(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = () => {
    addItem({
      productId,
      title,
      flavor: defaultFlavor,
      plan: 'subscription',
      price: defaultPrice,
      quantity: 1,
      image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      aria-hidden={!visible}
      class={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div class="bg-white border-t border-brand-gray-200 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)]">
        <div class="container-x py-3 flex items-center gap-3 lg:gap-6">
          <img
            src={image}
            alt=""
            class="w-12 h-12 lg:w-14 lg:h-14 rounded-image object-cover bg-brand-sand shrink-0"
            loading="lazy"
          />

          <div class="flex-1 min-w-0">
            <p class="font-display text-sm lg:text-base leading-tight truncate">{title}</p>
            <p class="text-[11px] text-brand-gray-600 truncate hidden sm:block">
              Subscription · 90-day · ≈ {formatPrice(perServing)} per serving
            </p>
            <p class="text-[11px] text-brand-gray-600 truncate sm:hidden">
              ≈ {formatPrice(perServing)} per serving
            </p>
          </div>

          <div class="hidden sm:flex items-baseline gap-1.5 shrink-0 mr-2">
            <span class="font-display text-lg lg:text-xl tabular-nums">{formatPrice(defaultPrice)}</span>
            <span class="text-[11px] text-brand-gray-600">/mo</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            class={`shrink-0 rounded-button px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition ${
              added ? 'bg-brand-green text-white' : 'bg-brand-black text-white hover:bg-brand-gray-900'
            }`}
          >
            {added ? '✓ Added' : (
              <>
                <span class="hidden sm:inline">Add to bag · {formatPrice(defaultPrice)}</span>
                <span class="sm:hidden">Add · {formatPrice(defaultPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
