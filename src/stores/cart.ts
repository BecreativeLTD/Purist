import { atom, computed } from 'nanostores';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  variant?: string;
  flavor?: string;
  plan: 'subscription' | 'oneTime';
  price: number;
  quantity: number;
  image: string;
}

const STORAGE_KEY = 'purist:cart:v1';

function loadInitial(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export const cartItems = atom<CartItem[]>(loadInitial());
export const cartOpen = atom<boolean>(false);

if (typeof window !== 'undefined') {
  cartItems.subscribe((items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  });
}

export const cartCount = computed(cartItems, (items) =>
  items.reduce((n, i) => n + i.quantity, 0),
);

export const cartSubtotal = computed(cartItems, (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0),
);

export function addItem(item: Omit<CartItem, 'id'> & { id?: string }) {
  const id =
    item.id ??
    `${item.productId}-${item.plan}-${item.flavor ?? 'default'}`;
  const items = cartItems.get();
  const existing = items.find((i) => i.id === id);
  if (existing) {
    cartItems.set(
      items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    );
  } else {
    cartItems.set([...items, { ...item, id }]);
  }
  cartOpen.set(true);
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeItem(id);
    return;
  }
  cartItems.set(cartItems.get().map((i) => (i.id === id ? { ...i, quantity } : i)));
}

export function removeItem(id: string) {
  cartItems.set(cartItems.get().filter((i) => i.id !== id));
}

export function clearCart() {
  cartItems.set([]);
}

export function toggleCart(open?: boolean) {
  cartOpen.set(open ?? !cartOpen.get());
}

export const FREE_SHIPPING_THRESHOLD = 75;
