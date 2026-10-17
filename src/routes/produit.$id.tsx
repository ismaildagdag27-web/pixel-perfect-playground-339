import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Minus, Plus, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, formatPrice } from "@/lib/products";
import { useCart, cartActions } from "@/lib/cart";

const details: Record<string, { desc: string; specs: string[] }> = {
  "Balançoires": { desc: "Une structure en bois massif traité autoclave, pensée pour des heures de balancement en toute sécurité. Ancrages au sol fournis et cordes réglables.", specs: ["Bois de pin traité classe 4", "Charge max. 50 kg par siège", "Ancrages au sol inclus", "Montage : environ 3 h"] },
  "Toboggans": { desc: "Glissade douce et rebords hauts pour les petits aventuriers. Plastique robuste anti-UV qui garde ses couleurs saison après saison.", specs: ["Polyéthylène anti-UV", "Marches antidérapantes", "Pliable pour le rangement", "Montage sans outils"] },
  "Trampolines": { desc: "Rebond dynamique avec filet de protection intégral et coussin de ressorts épais. Idéal pour se dépenser en famille.", specs: ["Cadre acier galvanisé", "Filet de sécurité intégré", "Coussins de protection 20 mm", "Charge max. 150 kg"] },
  "Maisonnettes": { desc: "Un vrai petit chez-soi au fond du jardin : fenêtres, porte et jardinières pour imaginer mille histoires.", specs: ["Bois épicéa 12 mm", "Toit bitumé étanche", "Fenêtres en plexiglas", "Plancher inclus"] },
};

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — LIAMSI TOYS` : "Produit — LIAMSI TOYS";
    const description = p ? `${p.name} (${p.age}) à ${formatPrice(p.price)}. ${details[p.category]?.desc ?? ""}` : "Jeux de plein air LIAMSI TOYS.";
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
  const d = details[p.category]!;
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
          <img src={p.image} alt={p.name} width={1024} height={1024} className="relative aspect-square w-full rounded-[2rem] object-cover shadow-soft" />
          {p.badge && <span className="absolute left-5 top-5 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">{p.badge}</span>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="font-display font-semibold text-primary">{p.category}</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">{p.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.round(p.rating) ? "fill-accent text-accent" : "text-border"}`} />)}</span>
            <span className="font-semibold">{p.rating} · {p.reviews} avis</span>
            <span className="rounded-full bg-muted px-3 py-1 font-bold text-muted-foreground">{p.age}</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-primary">{formatPrice(p.price)}</span>
            {p.oldPrice && <span className="text-lg text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}
          </div>
          <p className="mt-6 text-lg text-muted-foreground">{d.desc}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {d.specs.map((s) => <li key={s} className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" />{s}</li>)}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-full border-2 border-border px-4 py-2">
              <button aria-label="Moins" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <button aria-label="Plus" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></button>
            </div>
            <Button variant="hero" size="lg" className="h-14 flex-1 px-8" onClick={() => { cartActions.add(p, qty); setAdded(true); setTimeout(() => setAdded(false), 1800); }}>
              {added ? <><Check /> Ajouté !</> : <><ShoppingCart /> Ajouter au panier</>}
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[{ i: ShieldCheck, t: "Certifié sécurité" }, { i: Truck, t: "Livraison rapide" }, { i: RotateCcw, t: "Retour 30 jours" }].map((b) => (
              <div key={b.t} className="flex items-center gap-2 rounded-2xl bg-muted p-3 text-sm font-semibold"><b.i className="h-5 w-5 text-primary" />{b.t}</div>
            ))}
          </div>
        </motion.div>
      </main>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-3xl font-bold">Vous aimerez aussi</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((r) => (
            <Link key={r.id} to="/produit/$id" params={{ id: r.id }} className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-transform hover:-translate-y-2">
              <img src={r.image} alt={r.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
