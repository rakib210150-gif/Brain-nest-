import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, children, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return <button className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", variant === "primary" && "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-primary/90", variant === "secondary" && "border border-border bg-secondary text-secondary-foreground hover:border-primary/50 hover:bg-accent", variant === "ghost" && "text-muted-foreground hover:bg-accent hover:text-foreground", className)} {...props}>{children}</button>;
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-lg border border-border bg-card shadow-panel", className)}>{children}</div>;
}

export function Tag({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "pink" | "neutral" }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", tone === "cyan" && "border-primary/25 bg-primary/10 text-primary", tone === "pink" && "border-highlight/25 bg-highlight/10 text-highlight", tone === "neutral" && "border-border bg-secondary text-muted-foreground")}>{children}</span>;
}
