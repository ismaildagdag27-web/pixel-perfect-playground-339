import { describe, expect, it } from "vitest";
import { applyPrices, priceChangeSchema } from "@/lib/price-rules";
import { products } from "@/lib/products";

describe("Modification manuelle des prix", () => {
  it("remplace le prix d’EMMA sans modifier la source", () => {
    const result = applyPrices(products, [{ product_id: "J-10153P9", price: 1499.5 }]);
    expect(result.find((p) => p.id === "J-10153P9")?.price).toBe(1499.5);
    expect(products.find((p) => p.id === "J-10153P9")?.price).toBe(1450);
  });
  it("conserve les prix non modifiés et accepte zéro", () => {
    const result = applyPrices(products, [{ product_id: "J-10153P9", price: 0 }]);
    expect(result.find((p) => p.id === "J-10153P9")?.price).toBe(0);
    expect(result.find((p) => p.id === "230PE")?.price).toBe(2630);
  });
  it("refuse les prix négatifs, les références inconnues et les fractions de centime", () => {
    expect(priceChangeSchema.safeParse({ productId: "J-10153P9", price: -1 }).success).toBe(false);
    expect(priceChangeSchema.safeParse({ productId: "inconnu", price: 1500 }).success).toBe(false);
    expect(priceChangeSchema.safeParse({ productId: "J-10153P9", price: 1.001 }).success).toBe(false);
  });
});