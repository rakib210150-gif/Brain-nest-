import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button, Panel } from "./ui";

export function AccountCard() {
  const { user, signOut } = useAuth();
  const [form, setForm] = useState({ display_name: "", school: "", grade: "" });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, school, grade").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setForm({ display_name: data.display_name ?? "", school: data.school ?? "", grade: data.grade ?? "" });
    });
  }, [user]);

  if (!user) return <Panel className="p-5 sm:p-6"><h2 className="text-lg font-bold">Your account</h2><p className="mt-1 text-sm text-muted-foreground">Sign in to save your name, school and class.</p><Link to="/auth" className="mt-4 inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground">Sign in</Link></Panel>;

  async function save() {
    setStatus("Saving…");
    const { error } = await supabase.from("profiles").upsert({ id: user!.id, ...form, updated_at: new Date().toISOString() });
    setStatus(error ? "Couldn't save. Please try again." : "Saved");
  }
  const input = "mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary";
  return <Panel className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-bold">Your account</h2><p className="mt-1 text-sm text-muted-foreground">{user.email}</p></div><Button variant="ghost" onClick={() => signOut()}>Sign out</Button></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      <label className="text-sm font-semibold">Name<input className={input} value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} /></label>
      <label className="text-sm font-semibold">School / university<input className={input} value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} /></label>
      <label className="text-sm font-semibold">Class / year<input className={input} value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} /></label>
    </div>
    <div className="mt-5 flex items-center gap-3"><Button onClick={save}>Save profile</Button>{status && <span className="text-sm text-muted-foreground">{status}</span>}</div></Panel>;
}
