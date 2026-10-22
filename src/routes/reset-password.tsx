import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Réinitialiser le mot de passe — LIAMSI TOYS" },
    { name: "description", content: "Choisissez un nouveau mot de passe pour votre compte LIAMSI TOYS." },
    { property: "og:title", content: "Réinitialisation — LIAMSI TOYS" },
    { property: "og:description", content: "Récupération sécurisée de votre compte administrateur." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: ResetPassword,
});
function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!window.location.hash.includes("type=recovery")) { setMessage("Ouvrez le lien reçu par e-mail pour réinitialiser votre mot de passe."); return; }
    void supabase.auth.getUser().then(({ data }) => { setReady(Boolean(data.user)); if (!data.user) setMessage("Ce lien a expiré. Demandez un nouveau lien."); });
  }, []);
  return <main className="min-h-screen bg-muted px-4 py-16"><div className="mx-auto max-w-md rounded-lg border border-border bg-card p-6">
    <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
    {ready && !done && <form className="mt-6 space-y-4" onSubmit={async (e) => {
      e.preventDefault(); if (password !== confirmation) { setMessage("Les mots de passe ne correspondent pas."); return; }
      setBusy(true);
      const { error } = await supabase.auth.updateUser({ password });
      setBusy(false); setDone(!error); setMessage(error ? "Impossible de modifier le mot de passe." : "Votre mot de passe a été modifié.");
    }}>
      <label className="block text-sm font-semibold">Mot de passe<Input className="mt-2" type="password" minLength={8} required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <label className="block text-sm font-semibold">Confirmer le mot de passe<Input className="mt-2" type="password" minLength={8} required autoComplete="new-password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} /></label>
      <Button type="submit" disabled={busy}>Enregistrer</Button>
    </form>}
    {message && <p role="status" className="mt-4 text-sm">{message}</p>}
    <Button asChild variant="link" className="mt-4"><Link to="/auth">Retour à la connexion</Link></Button>
  </div></main>;
}