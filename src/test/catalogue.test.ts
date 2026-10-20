import { describe, expect, it } from "vitest";
import { products, formatPrice } from "@/lib/products";

describe("Catalogue fourni", () => {
  it("reprend les 51 lignes avec des références distinctes", () => {
    expect(products).toHaveLength(51);
    expect(new Set(products.map((p) => p.id)).size).toBe(51);
  });
  it("reprend le nom et le prix de la première ligne", () => {
    expect(products.find((p) => p.id === "J-10153P9")).toMatchObject({ name: "EMMA PORTIQUE BEBE 1M20", price: 1450 });
  });
  it("reprend la dernière ligne", () => {
    expect(products.find((p) => p.id === "230PE")).toMatchObject({ name: "PORTIQUE SHERWOOD AMANDIER PEFC", price: 2630 });
  });
  it("ne déduit ni descriptions, ni catégories, ni devise absentes", () => {
    expect(products.every((p) => p.description === null && p.category === null)).toBe(true);
    expect(formatPrice(1450)).toBe("1\u202f450,00");
  });
  it("ne reprend que le stock explicitement indiqué", () => {
    expect(products.filter((p) => p.stock !== null).map((p) => ({ id: p.id, stock: p.stock }))).toEqual([{ id: "J-18640P4", stock: 1 }]);
  });
});