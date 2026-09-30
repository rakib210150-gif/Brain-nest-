import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ErrorComponentProps, Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui";
import { AuthProvider } from "@/hooks/use-auth";

function NotFoundComponent() { return <div className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><p className="font-display text-8xl font-bold text-primary">404</p><h1 className="mt-3 text-2xl font-bold">This page left the nest</h1><p className="mt-2 text-muted-foreground">The resource may have moved or no longer exists.</p><Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground">Return home</Link></div></div>; }
function ErrorComponent({ error, reset }: ErrorComponentProps) { const router = useRouter(); useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]); return <div className="grid min-h-screen place-items-center bg-background px-4 text-center"><div><h1 className="text-2xl font-bold">This page didn’t load</h1><p className="mt-2 text-muted-foreground">Let’s give it another try.</p><Button className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Try again</Button></div></div>; }

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }], links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700&display=swap" }, { rel: "icon", href: "/favicon.ico" }] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><AuthProvider><SiteShell><Outlet /></SiteShell></AuthProvider></QueryClientProvider>; }
