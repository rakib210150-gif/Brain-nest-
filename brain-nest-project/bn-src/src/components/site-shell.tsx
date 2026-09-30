import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Bookmark, BrainCircuit, ChartNoAxesCombined, CircleUserRound, FileSearch, Home, LogOut, Menu, Sparkles, X, Zap } from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { Button } from "./ui";
import { useAuth } from "@/hooks/use-auth";

const nav = [
  { label: "Home", to: "/", icon: Home },
  { label: "Study", to: "/study", icon: BrainCircuit },
  { label: "Question Analysis", to: "/question-analysis", icon: FileSearch },
  { label: "Quiz", to: "/quiz", icon: Zap },
  { label: "Dashboard", to: "/dashboard", icon: ChartNoAxesCombined },
  { label: "Saved", to: "/saved", icon: Bookmark },
  { label: "Profile", to: "/profile", icon: CircleUserRound },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  return <div className="min-h-screen bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-6 px-4 lg:px-8">
        <Link to="/" aria-label="Brain Nest home"><Brand /></Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label="Primary navigation">
          {nav.slice(0, 5).map((item) => <Link key={item.to} to={item.to} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${path === item.to ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item.label}</Link>)}
        </nav>
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <Button variant="ghost" aria-label="Notifications"><Bell size={18} /></Button>
          {user ? <><Link to="/profile" className="px-3 text-sm font-semibold text-muted-foreground hover:text-foreground">{(user.user_metadata?.['full_name'] as string) || user.email}</Link><Button variant="ghost" onClick={() => signOut()}><LogOut size={16} />Sign out</Button></> : <Link to="/auth" className="px-3 text-sm font-semibold text-muted-foreground hover:text-foreground">Sign in</Link>}
          <Link to="/study" className="ml-2 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground shadow-glow"><Sparkles size={16} />Start learning</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="ml-auto grid size-11 place-items-center rounded-md border border-border bg-secondary text-foreground xl:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-border bg-background p-3 xl:hidden">{nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm ${path === item.to ? "bg-accent text-foreground" : "text-muted-foreground"}`}><item.icon size={18} />{item.label}</Link>)}{user ? <button onClick={() => { signOut(); setOpen(false); }} className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm text-muted-foreground"><LogOut size={18} />Sign out</button> : <Link to="/auth" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-bold text-primary">Sign in</Link>}</nav>}
    </header>
    <main className="pt-16 pb-20 md:pb-0">{children}</main>
    <nav className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-5 border-t border-border bg-background/95 px-2 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
      {nav.slice(0, 5).map((item) => <Link key={item.to} to={item.to} className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${path === item.to ? "text-primary" : "text-muted-foreground"}`}><item.icon size={18} />{item.label === "Question Analysis" ? "Analyze" : item.label}</Link>)}
    </nav>
  </div>;
}
