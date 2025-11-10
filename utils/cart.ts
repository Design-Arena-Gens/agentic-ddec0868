export type CartItem = { id: string; quantity: number };
const CART_KEY = 'aips_cart_v1';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(id: string, qty = 1) {
  const items = getCart();
  const idx = items.findIndex((i) => i.id === id);
  if (idx >= 0) {
    items[idx].quantity += qty;
  } else {
    items.push({ id, quantity: qty });
  }
  setCart(items);
}

export function updateQty(id: string, qty: number) {
  const items = getCart();
  const next = items
    .map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    .filter((i) => i.quantity > 0);
  setCart(next);
}

export function removeFromCart(id: string) {
  const items = getCart().filter((i) => i.id !== id);
  setCart(items);
}

export function clearCart() {
  setCart([]);
}
