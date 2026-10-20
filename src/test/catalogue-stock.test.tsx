import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cartActions, useCart } from "@/lib/cart";
import { products } from "@/lib/products";

describe("Stock du catalogue", () => {
  it("limite AMILY à l’unique unité de reliquat indiquée", () => {
    const product = products.find((p) => p.id === "J-18640P4");
    if (!product) throw new Error("AMILY absent du catalogue");
    const { result } = renderHook(() => useCart());
    act(() => cartActions.add(product));
    act(() => cartActions.add(product));
    act(() => cartActions.setQty(product.id, 1));
    expect(result.current.cart.find((line) => line.product.id === product.id)?.qty).toBe(1);
    act(() => cartActions.setQty(product.id, -1));
  });
});