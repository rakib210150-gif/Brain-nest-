import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: ReactNode }) {
  return <section className="border-b border-border bg-surface-elevated"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"><div className="max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p><h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{copy}</p>{action && <div className="mt-7">{action}</div>}</div></div></section>;
}
