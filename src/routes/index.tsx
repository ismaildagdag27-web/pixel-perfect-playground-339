import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, cartActions } from "@/lib/cart";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search, Heart, ShoppingCart, Menu, X, Star, ShieldCheck, Sun, Truck, HeartHandshake,
  ArrowRight, Plus, Minus, Cloud, Leaf, Instagram, Facebook, Youtube, Quote, ChevronLeft, ChevronRight, Sparkles, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, products, testimonials, formatPrice, type Product } from "@/lib/products";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIAMSI TOYS — Transformez votre jardin en terrain d'aventures" },
      { name: "description", content: "Balançoires, toboggans, trampolines et maisonnettes de qualité pour faire jouer vos enfants dehors." },
      { property: "og:title", content: "LIAMSI TOYS — Jeux de plein air pour enfants" },
      { property: "og:description", content: "Balançoires, toboggans, trampolines et maisonnettes pour des jardins pleins d'aventures." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

function Burst({ id }: { id: number }) {
  const colors = ["bg-primary", "bg-accent", "bg-secondary", "bg-coral"];
  return (
    <div key={id} className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <motion.span key={i} className={`absolute h-2 w-2 rounded-full ${colors[i % 4]}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * 50, y: Math.sin(a) * 50, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }} />
        );
      })}
    </div>
  );
}

function Index() {
  const { cart, bump } = useCart();
  const [wish, setWish] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => s + l.qty * l.product.price, 0);
  const add = (p: Product) => cartActions.add(p);
  const setQty = cartActions.setQty;
  const toggleWish = (id: string) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Announcement */}
      <div className="overflow-hidden bg-foreground py-2 text-sm font-semibold text-background">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Livraison rapide & sécurisée | Qualité garantie pour le plein air</span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
          <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-pop"><Sun className="h-6 w-6" /></span>
            LIAMSI<span className="text-primary">TOYS</span>
          </a>
          <nav className="ml-6 hidden gap-6 font-semibold lg:flex">
            {categories.map((c) => (
              <a key={c.name} href="#categories" className="relative transition-colors hover:text-primary">{c.name}</a>
            ))}
          </nav>
          <div className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-input bg-muted px-4 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input aria-label="Rechercher" placeholder="Rechercher un jeu..." className="w-full bg-transparent text-sm outline-none" />
          </div>
          <button aria-label="Liste de souhaits" className="relative ml-auto rounded-full p-2 transition hover:bg-muted md:ml-0">
            <Heart className="h-6 w-6" />
            {wish.length > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-bold text-primary-foreground">{wish.length}</span>}
          </button>
          <motion.button key={bump} animate={bump ? { scale: [1, 1.3, 0.9, 1], rotate: [0, -12, 12, 0] } : {}} transition={{ duration: 0.5 }}
            aria-label="Panier" onClick={() => setOpen(true)} className="relative rounded-full bg-primary p-2.5 text-primary-foreground">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">{count}</span>}
          </motion.button>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border lg:hidden">
              <div className="flex flex-col gap-3 px-4 py-4 font-semibold">
                {categories.map((c) => <a key={c.name} href="#categories" onClick={() => setMenu(false)}>{c.name}</a>)}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <HeroSection />

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-20">
        <Reveal>
          <p className="font-display font-semibold text-primary">Nos univers</p>
          <h2 className="mt-1 text-4xl font-bold md:text-5xl">Choisissez votre aventure</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <a href="#bestsellers" className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                <img src={c.image} alt={c.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-background">
                  <h3 className="text-2xl font-bold">{c.name}</h3>
                  <p className="text-sm opacity-80">{c.count} produits</p>
                  <span className="mt-3 inline-flex translate-y-4 items-center gap-1 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Explorer <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section id="bestsellers" className="bg-sky-gradient py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-display font-semibold text-primary">Les chouchous des familles</p>
            <h2 className="mt-1 text-4xl font-bold md:text-5xl">Nos Meilleures Ventes</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.08}>
                <ProductCard p={p} onAdd={() => add(p)} wished={wish.includes(p.id)} onWish={() => toggleWish(p.id)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <Reveal><h2 className="text-center text-4xl font-bold md:text-5xl">Pourquoi Choisir <span className="text-primary">LIAMSI TOYS</span> ?</h2></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Sécurité & Qualité", d: "Matériaux robustes et certifiés", c: "bg-primary" },
            { icon: Sun, t: "Jeu en plein air", d: "Encourager le mouvement et la découverte", c: "bg-accent" },
            { icon: Truck, t: "Livraison facile", d: "Expédition rapide chez vous", c: "bg-secondary" },
            { icon: HeartHandshake, t: "Plaisir en famille", d: "Des souvenirs inoubliables", c: "bg-coral" },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }} className="h-full rounded-3xl border-2 border-border bg-card p-7 text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${b.c} text-foreground`}>
                  <b.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{b.t}</h3>
                <p className="mt-2 text-muted-foreground">{b.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:flex md:items-center md:justify-between md:gap-8 md:p-12">
            <div>
              <h3 className="text-3xl font-bold">Rejoignez la tribu LIAMSI TOYS</h3>
              <p className="mt-2 opacity-90">Recevez nos conseils & promotions directement dans votre boîte mail.</p>
            </div>
            <Newsletter />
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-bold">LIAMSI<span className="text-primary">TOYS</span></p>
              <p className="mt-2 text-sm opacity-70">Des jardins actifs, fun et créatifs pour toute la famille.</p>
              <div className="mt-4 flex gap-3">
                {[Instagram, Facebook, Youtube].map((I, i) => (
                  <a key={i} href="#" aria-label="Réseau social" className="rounded-full bg-background/10 p-2 transition hover:-translate-y-1 hover:bg-primary"><I className="h-5 w-5" /></a>
                ))}
              </div>
            </div>
            {([
              { t: "Aide", l: ["FAQ", "Infos livraison", "Retours"] },
              { t: "Légal", l: ["Mentions légales", "CGV", "Confidentialité"] },
              { t: "Contact", l: ["Nous contacter", "Service client", "À propos"], phone: CONTACT_PHONE },
            ] as { t: string; l: string[]; phone?: string }[]).map((c) => (
              <div key={c.t}>
                <p className="font-display text-lg font-semibold">{c.t}</p>
                <ul className="mt-3 space-y-2 text-sm opacity-70">{c.l.map((x) => <li key={x}><a href="#" className="hover:text-primary">{x}</a></li>)}</ul>
                {c.phone && (
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-primary">
                    <Phone className="h-4 w-4" />{c.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-6 text-sm opacity-70 md:flex-row">
            <p>© 2026 LIAMSI TOYS. Tous droits réservés.</p>
            <div className="flex gap-2">
              {["VISA", "Mastercard", "PayPal", "Apple Pay"].map((p) => <span key={p} className="rounded-md bg-background px-2 py-1 text-xs font-bold text-foreground">{p}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-foreground/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-soft"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26 }}>
              <div className="flex items-center justify-between border-b border-border p-5">
                <h3 className="text-2xl font-bold">Votre panier ({count})</h3>
                <button aria-label="Fermer" onClick={() => setOpen(false)}><X /></button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {cart.length === 0 && (
                  <div className="py-16 text-center text-muted-foreground">
                    <ShoppingCart className="mx-auto h-12 w-12 animate-floaty" />
                    <p className="mt-4">Votre panier est vide… pour l'instant !</p>
                  </div>
                )}
                {cart.map((l) => (
                  <motion.div layout key={l.product.id} className="flex gap-4 rounded-2xl bg-muted p-3">
                    <img src={l.product.image} alt={l.product.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold leading-tight">{l.product.name}</p>
                      <p className="font-display font-bold text-primary">{formatPrice(l.product.price)}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <button aria-label="Moins" onClick={() => setQty(l.product.id, -1)} className="rounded-full bg-background p-1"><Minus className="h-4 w-4" /></button>
                        <span className="font-bold">{l.qty}</span>
                        <button aria-label="Plus" onClick={() => setQty(l.product.id, 1)} className="rounded-full bg-background p-1"><Plus className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-border p-5">
                <div className="mb-4 flex justify-between text-lg font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
                <Button variant="hero" size="lg" className="w-full" disabled={!cart.length}>Passer commande</Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 150]);
  const y2 = useTransform(scrollY, [0, 600], [0, -80]);
  return (
    <section className="relative overflow-hidden bg-sky-gradient">
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute inset-0">
        <Cloud className="absolute top-10 h-20 w-20 animate-drift fill-background text-background" />
        <Cloud className="absolute top-32 h-14 w-14 animate-drift fill-background text-background [animation-delay:-25s]" />
        <Cloud className="absolute top-52 h-24 w-24 animate-drift fill-background text-background [animation-delay:-40s]" />
        <Sun className="absolute right-[8%] top-8 h-24 w-24 animate-spin-slow fill-accent text-accent" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute inset-0">
        <Leaf className="absolute left-[6%] top-[60%] h-8 w-8 animate-floaty text-primary" />
        <Leaf className="absolute right-[45%] top-[15%] h-6 w-6 animate-floaty text-primary [animation-delay:-2s]" />
        <Star className="absolute left-[40%] bottom-[10%] h-7 w-7 animate-floaty fill-accent text-accent [animation-delay:-1s]" />
      </motion.div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-sm font-bold text-primary shadow-soft">
            <Sun className="h-4 w-4" /> Collection Plein Air 2026
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 text-5xl font-bold leading-[1.05] md:text-6xl xl:text-7xl">
            Transformez votre jardin en <span className="text-primary">terrain d'aventures</span> !
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 max-w-lg text-lg text-muted-foreground">
            Des jeux de plein air robustes et joyeux pour que vos enfants bougent, explorent et créent des souvenirs en famille.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="lg" className="h-14 px-8"><a href="#categories">Découvrir la collection <ArrowRight /></a></Button>
            <Button asChild variant="sunny" size="lg" className="h-14 px-8"><a href="#bestsellers">Nos Meilleures Ventes</a></Button>
          </motion.div>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}</div>
            4,9/5 · plus de 2 000 familles conquises
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8 }} className="relative">
          <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-accent" />
          <img src={hero} alt="Enfants jouant sur une balançoire et un toboggan dans le jardin" width={1600} height={1008} className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 -left-4 flex animate-floaty items-center gap-3 rounded-2xl bg-background p-4 shadow-soft">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div><p className="font-display font-bold">Certifié EN 71</p><p className="text-xs text-muted-foreground">Sécurité garantie</p></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ p, onAdd, wished, onWish }: { p: Product; onAdd: () => void; wished: boolean; onWish: () => void }) {
  const [burst, setBurst] = useState(0);
  const badgeColor = p.badge === "Nouveau" ? "bg-secondary" : p.badge === "Incontournable" ? "bg-coral text-primary-foreground" : "bg-accent";
  return (
    <motion.div whileHover={{ y: -8 }} className="group h-full overflow-hidden rounded-3xl bg-card shadow-soft">
      <div className="relative aspect-square overflow-hidden">
        <Link to="/produit/$id" params={{ id: p.id }} aria-label={p.name}>
          <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </Link>
        {p.badge && <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${badgeColor}`}>{p.badge}</span>}
        <button aria-label="Ajouter aux favoris" onClick={onWish} className="absolute right-3 top-3 rounded-full bg-background p-2 transition hover:scale-110">
          <Heart className={`h-4 w-4 ${wished ? "fill-coral text-coral" : ""}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 translate-y-16 transition-transform duration-300 group-hover:translate-y-0">
          <div className="relative">
            <Button variant="hero" className="w-full" onClick={() => { onAdd(); setBurst((b) => b + 1); }}>
              <ShoppingCart className="group-hover:animate-bounce" /> Ajouter au panier
            </Button>
            {burst > 0 && <Burst key={burst} id={burst} />}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-muted px-2.5 py-1 font-bold text-muted-foreground">{p.age}</span>
          <span className="flex items-center gap-1 font-semibold"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{p.rating} ({p.reviews})</span>
        </div>
        <Link to="/produit/$id" params={{ id: p.id }}><h3 className="mt-3 text-lg font-semibold leading-tight hover:text-primary">{p.name}</h3></Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-primary">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i] ?? testimonials[0]!;
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <Reveal><h2 className="text-4xl font-bold md:text-5xl">Les parents en parlent</h2></Reveal>
        <div className="relative mt-10 min-h-64 rounded-3xl bg-card p-8 shadow-soft md:p-12">
          <Quote className="mx-auto h-10 w-10 text-primary" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <div className="mt-4 flex justify-center">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-accent text-accent" />)}</div>
              <p className="mt-4 text-xl font-semibold leading-relaxed">« {t.text} »</p>
              <p className="mt-4 font-display font-bold">{t.name} <span className="font-sans font-normal text-muted-foreground">— {t.city}</span></p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button aria-label="Précédent" onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="rounded-full bg-muted p-2 hover:bg-primary hover:text-primary-foreground"><ChevronLeft className="h-5 w-5" /></button>
            {testimonials.map((_, k) => <span key={k} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2 bg-border"}`} />)}
            <button aria-label="Suivant" onClick={() => setI((i + 1) % testimonials.length)} className="rounded-full bg-muted p-2 hover:bg-primary hover:text-primary-foreground"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return done ? (
    <p className="mt-6 font-display text-xl font-bold md:mt-0">Merci, bienvenue dans la tribu ! 🎉</p>
  ) : (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-6 flex w-full max-w-md gap-2 md:mt-0">
      <input required type="email" aria-label="Email" placeholder="votre@email.com" className="flex-1 rounded-full bg-background px-5 py-3 text-foreground outline-none" />
      <Button type="submit" variant="sunny" className="h-12 px-6">S'inscrire</Button>
    </form>
  );
}
