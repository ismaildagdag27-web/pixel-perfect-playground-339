import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, formatPrice } from "@/lib/products";
import { useCart, cartActions } from "@/lib/cart";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — LIAMSI TOYS` : "Produit — LIAMSI TOYS";
    const description = p ? `${p.name} — Référence ${p.id}. Prix : ${formatPrice(p.price)}.${p.description ? ` ${p.description}` : ""}` : "Jeux de plein air LIAMSI TOYS.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Produit introuvable</h1>
      <Button asChild variant="hero"><Link to="/">Retour à la boutique</Link></Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { cart, bump } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const available = p.stock === null || p.stock > 0;
  const remaining = p.stock === null ? null : Math.max(0, p.stock - (cart.find((line) => line.product.id === p.id)?.qty ?? 0));
  const related = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold hover:text-primary"><ArrowLeft className="h-5 w-5" /> Boutique</Link>
          <Link to="/" className="font-display text-2xl font-bold">LIAMSI<span className="text-primary">TOYS</span></Link>
          <motion.div key={bump} animate={bump ? { scale: [1, 1.3, 1] } : {}} className="relative rounded-full bg-primary p-2.5 text-primary-foreground">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">{count}</span>}
          </motion.div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-sky" />
          <img src={p.image} alt={p.name} width={1024} height={1024} className="relative aspect-square w-full rounded-[2rem] bg-card object-contain p-6 shadow-soft" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="font-display font-semibold text-primary">Réf. {p.id}</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">{p.name}</h1>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-primary">{formatPrice(p.price)}</span>

          </div>
          {p.description && <p className="mt-6 text-lg text-muted-foreground">{p.description}</p>}
          <dl className="mt-6 space-y-3 border-y border-border py-5">
            {p.category && <div><dt className="text-sm text-muted-foreground">Catégorie</dt><dd>{p.category}</dd></div>}
            <div><dt className="text-sm text-muted-foreground">Stock</dt><dd>{p.stock === null ? "Non renseigné" : `${p.stock} unité${p.stock > 1 ? "s" : ""}`}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-full border-2 border-border px-4 py-2">
              <Button variant="ghost" size="icon" aria-label="Moins" disabled={qty <= 1} onClick={() => setQty(Math.max(1, qty - 1))}><Minus /></Button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <Button variant="ghost" size="icon" aria-label="Plus" disabled={remaining !== null && qty >= remaining} onClick={() => setQty(qty + 1)}><Plus /></Button>
            </div>
            <Button variant="hero" size="lg" className="h-14 flex-1 px-8" disabled={!available || (remaining !== null && (remaining === 0 || qty > remaining))} onClick={() => { cartActions.add(p, qty); setAdded(true); setTimeout(() => setAdded(false), 1800); }}>
              {added ? <><Check /> Ajouté !</> : <><ShoppingCart /> Ajouter au panier</>}
            </Button>
          </div>

          <Button asChild variant="outline" className="mt-8"><a href="tel:+212615893031"><Phone /> +212 615893031</a></Button>
        </motion.div>
      </main>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-3xl font-bold">Vous aimerez aussi</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((r) => (
            <Link key={r.id} to="/produit/$id" params={{ id: r.id }} className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-transform hover:-translate-y-2">
              <img src={r.image} alt={r.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full bg-card object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
              <div className="p-4">
                <p className="font-semibold leading-tight">{r.name}</p>
                <p className="mt-1 font-display text-xl font-bold text-primary">{formatPrice(r.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
