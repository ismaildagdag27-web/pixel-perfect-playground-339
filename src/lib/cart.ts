import { useSyncExternalStore } from "react";
import type { Product } from "./products";

export type Line = { product: Product; qty: number };
let lines: Line[] = [];
let bump = 0;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const subscribe = (f: () => void) => (subs.add(f), () => subs.delete(f));

export const cartActions = {
  add(p: Product, qty = 1) {
    const f = lines.find((l) => l.product.id === p.id);
    lines = f ? lines.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty } : l)) : [...lines, { product: p, qty }];
    bump++;
    emit();
  },
  setQty(id: string, d: number) {
    lines = lines.map((l) => (l.product.id === id ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0);
    emit();
  },
};

const empty: Line[] = [];
export function useCart() {
  const cart = useSyncExternalStore(subscribe, () => lines, () => empty);
  const b = useSyncExternalStore(subscribe, () => bump, () => 0);
  return { cart, bump: b };
}
