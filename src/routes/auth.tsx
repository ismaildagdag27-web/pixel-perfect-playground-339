import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Connexion administration — LIAMSI TOYS" },
    { name: "description", content: "Connexion sécurisée à l’administration des prix LIAMSI TOYS." },
    { property: "og:title", content: "Administration — LIAMSI TOYS" },
    { property: "og:description", content: "Accès sécurisé au tableau de bord de la boutique." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => { if (active && data.user) void navigate({ to: "/dashboard", replace: true }); });
    return () => { active = false; };
  }, [navigate]);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage("Si ce compte existe, un lien de réinitialisation vous a été envoyé.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
        if (error) throw error;
        if (data.session) await navigate({ to: "/dashboard" });
        else setMessage("Vérifiez votre boîte mail et confirmez votre compte avant de vous connecter.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await navigate({ to: "/dashboard" });
      }
    } catch { setError(mode === "login" ? "Connexion impossible. Vérifiez votre e-mail, votre mot de passe et la confirmation du compte." : "Impossible de poursuivre. Réessayez dans un instant."); }
    finally { setBusy(false); }
  }
  async function social(provider: "google" | "lovable") {
    setBusy(true); setError("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) throw result.error;
      if (!result.redirected) await navigate({ to: "/dashboard" });
    } catch { setError("La connexion n’a pas abouti. Réessayez."); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-muted px-4 py-10 text-foreground">
    <div className="mx-auto max-w-md">
      <Button asChild variant="ghost"><Link to="/"><ArrowLeft />Boutique</Link></Button>
      <p className="mt-10 font-display text-3xl font-bold">LIAMSI<span className="text-primary"> TOYS</span></p>
      <div className="mt-6 rounded-lg border border-border bg-card p-6 shadow-soft">
        <LockKeyhole className="mb-4 h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">{mode === "forgot" ? "Mot de passe oublié" : mode === "signup" ? "Créer votre compte" : "Administration"}</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label htmlFor="admin-email" className="text-sm font-semibold">Adresse e-mail</label><Input id="admin-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" /></div>
          {mode !== "forgot" && <div><label htmlFor="admin-password" className="text-sm font-semibold">Mot de passe</label><Input id="admin-password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" /></div>}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {message && <p role="status" className="text-sm text-primary">{message}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Veuillez patienter…" : mode === "forgot" ? "Envoyer le lien" : mode === "signup" ? "Créer le compte" : "Se connecter"}</Button>
        </form>
        {mode !== "forgot" && <div className="mt-5 space-y-3 border-t border-border pt-5">
          <Button variant="outline" disabled={busy} onClick={() => social("google")} className="w-full">Continuer avec Google</Button>
          <Button className="lovable-auth-button w-full" disabled={busy} onClick={() => social("lovable")}>Continuer avec Lovable</Button>
        </div>}
        <div className="mt-4 flex flex-wrap justify-center gap-1">
          <Button variant="link" size="sm" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); setError(""); }}>{mode === "login" ? "Créer un compte" : "Retour à la connexion"}</Button>
          {mode === "login" && <Button variant="link" size="sm" onClick={() => { setMode("forgot"); setError(""); setMessage(""); }}>Mot de passe oublié ?</Button>}
        </div>
      </div>
    </div>
  </main>;
}