import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Check, LogOut, Save, Search, Package, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { catalogQuery } from "@/lib/catalog-query";
import { getAdminAccess, updatePrice } from "@/lib/catalog.functions";
import { formatPrice, products, type Product } from "@/lib/products";
import { priceChangeSchema } from "@/lib/price-rules";

export const Route = createFileRoute("/_authenticated/dashboard")({
  loader: async ({ context }) => {
    const admin = await getAdminAccess();
    if (admin) await context.queryClient.ensureQueryData(catalogQuery);
    return { admin };
  },
  head: () => ({ meta: [
    { title: "Tableau de bord des prix — LIAMSI TOYS" },
    { name: "description", content: "Gestion sécurisée des prix du catalogue LIAMSI TOYS." },
    { property: "og:title", content: "Tableau de bord — LIAMSI TOYS" },
    { property: "og:description", content: "Administration des prix de la boutique LIAMSI TOYS." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: Dashboard,
});

function Dashboard() {
  const { admin } = Route.useLoaderData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  async function signOut() {
    await queryClient.cancelQueries(); queryClient.clear();
    await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true });
  }
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border bg-card"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
      <Link to="/" className="font-display text-2xl font-bold">LIAMSI<span className="text-primary"> TOYS</span></Link>
      <div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link to="/"><ArrowLeft />Boutique</Link></Button><Button variant="ghost" size="sm" onClick={signOut}><LogOut />Déconnexion</Button></div>
    </div></header>
    {admin ? <PriceEditor /> : <main className="mx-auto max-w-6xl px-4 py-12"><h1 className="text-3xl font-bold">Accès réservé</h1><p className="mt-4 text-muted-foreground">Ce compte n’est pas autorisé à modifier les prix.</p></main>}
  </div>;
}

function PriceEditor() {
  const { data: catalog } = useSuspenseQuery(catalogQuery);
  const [search, setSearch] = useState("");
  const changed = catalog.filter((p) => p.price !== products.find((s) => s.id === p.id)?.price).length;
  const visible = catalog.filter((p) => `${p.name} ${p.id}`.toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr")));
  return <main className="mx-auto max-w-6xl px-4 py-10">
    <p className="font-semibold text-primary">Administration</p><h1 className="mt-1 text-3xl font-bold">Prix du catalogue</h1>
    <div className="my-8 flex flex-wrap gap-8 border-y border-border py-5">
      <div className="flex items-center gap-3"><Package className="text-primary" /><div><p className="text-2xl font-bold">{catalog.length}</p><p className="text-sm text-muted-foreground">Produits</p></div></div>
      <div className="flex items-center gap-3"><Pencil className="text-secondary" /><div><p className="text-2xl font-bold">{changed}</p><p className="text-sm text-muted-foreground">Prix modifiés</p></div></div>
    </div>
    <div className="relative max-w-md"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input aria-label="Rechercher un produit" placeholder="Nom ou référence…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
    <div className="mt-6 hidden grid grid-cols-[minmax(0,1fr)_140px_240px] gap-4 border-b border-border pb-3 text-sm font-semibold text-muted-foreground md:grid"><span>Produit</span><span>Prix actuel</span><span>Nouveau prix</span></div>
    <div className="mt-4 md:mt-0">{visible.map((p) => <PriceRow key={`${p.id}:${p.price}`} product={p} />)}</div>
    {!visible.length && <p className="py-12 text-muted-foreground">Aucun produit trouvé.</p>}
  </main>;
}

function PriceRow({ product: p }: { product: Product }) {
  const [value, setValue] = useState(String(p.price));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const savePrice = useServerFn(updatePrice);
  const queryClient = useQueryClient();
  const n = value.trim() === "" ? NaN : Number(value.replace(",", "."));
  async function save(e: React.FormEvent) {
    e.preventDefault(); setError(""); setSaved(false);
    const parsed = priceChangeSchema.safeParse({ productId: p.id, price: n });
    if (!parsed.success) { setError("Saisissez un prix positif ou nul, avec deux décimales maximum."); return; }
    setBusy(true);
    try {
      await savePrice({ data: parsed.data });
      setSaved(true); await queryClient.invalidateQueries({ queryKey: catalogQuery.queryKey });
    } catch { setError("Le prix n’a pas été enregistré. Réessayez."); }
    finally { setBusy(false); }
  }
  return <article className="grid gap-4 border-b border-border py-5 md:grid-cols-[minmax(0,1fr)_140px_240px] md:items-center">
    <div className="flex min-w-0 items-center gap-4"><img src={p.image} alt={p.name} className="h-16 w-16 shrink-0 rounded-md border border-border bg-card object-contain" /><div className="min-w-0"><Link to="/produit/$id" params={{ id: p.id }} className="font-semibold hover:text-primary">{p.name}</Link><p className="mt-1 break-all text-xs text-muted-foreground">Réf. {p.id}</p></div></div>
    <p className="font-display text-xl font-bold text-primary"><span className="mr-2 font-body text-sm font-normal text-muted-foreground md:hidden">Prix actuel</span>{formatPrice(p.price)}</p>
    <form onSubmit={save}><div className="flex items-center gap-2"><Input aria-label={`Nouveau prix ${p.id}`} inputMode="decimal" value={value} disabled={busy} onChange={(e) => { setValue(e.target.value); setSaved(false); setError(""); }} /><Button type="submit" size="icon" disabled={busy || n === p.price} aria-label={`Enregistrer ${p.id}`} title="Enregistrer le prix">{saved ? <Check /> : <Save />}</Button></div>
      {busy && <p role="status" className="mt-2 text-xs text-muted-foreground">Enregistrement…</p>}{saved && <p role="status" className="mt-2 text-xs text-primary">Prix enregistré</p>}{error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
    </form>
  </article>;
}