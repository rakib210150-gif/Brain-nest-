import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { Brand } from "@/components/brand";
import { Button, Panel } from "@/components/ui";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Brain Nest" },
      { name: "description", content: "Sign in or create your free Brain Nest student account." },
      { property: "og:title", content: "Sign in — Brain Nest" },
      { property: "og:description", content: "Create your free Brain Nest student account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => { if (user) navigate({ to: "/study" }); }, [user, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (mode === "up") {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { full_name: name } } });
      if (error) setMsg({ ok: false, text: error.message });
      else if (!data.session) setMsg({ ok: true, text: "Check your email to confirm your account, then sign in." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ ok: false, text: error.message });
    }
    setBusy(false);
  }

  async function google() {
    setMsg(null);
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) setMsg({ ok: false, text: "Google sign-in didn't complete. Please try again." });
  }

  const input = "mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary";
  return (
    <section className="grid-fade grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <Panel className="w-full max-w-md p-6 sm:p-8">
        <Brand />
        <h1 className="mt-6 font-display text-2xl font-bold">{mode === "in" ? "Welcome back" : "Create your student account"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your notes, analyses and progress — all in one place.</p>
        <Button variant="secondary" className="mt-6 w-full" onClick={google}>Continue with Google</Button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <form onSubmit={submit} className="space-y-4">
          {mode === "up" && <label className="block text-sm font-semibold">Full name<input required value={name} onChange={(e) => setName(e.target.value)} className={input} /></label>}
          <label className="block text-sm font-semibold">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></label>
          <label className="block text-sm font-semibold">Password<input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={input} /></label>
          {msg && <p className={`text-sm ${msg.ok ? "text-primary" : "text-destructive"}`}>{msg.text}</p>}
          <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</Button>
        </form>
        <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }} className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          {mode === "in" ? "New to Brain Nest? Create an account" : "Already have an account? Sign in"}
        </button>
      </Panel>
    </section>
  );
}
