import { z } from "zod";
import { products, type Product } from "./products";

export const priceChangeSchema = z.object({
  productId: z.string().refine((id) => products.some((p) => p.id === id), "Référence inconnue"),
  price: z.number().finite().min(0).max(9999999999.99).refine((n) => Math.abs(n * 100 - Math.round(n * 100)) < 0.0001, "Deux décimales maximum"),
});

export function applyPrices(catalog: Product[], prices: { product_id: string; price: number }[]) {
  const byId = new Map(prices.map((p) => [p.product_id, p.price]));
  return catalog.map((p) => ({ ...p, price: byId.get(p.id) ?? p.price }));
}