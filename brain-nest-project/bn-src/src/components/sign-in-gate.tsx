import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Panel } from "./ui";

export function SignInGate({ action }: { action: string }) {
  return (
    <Panel className="p-5 text-center">
      <Lock className="mx-auto text-primary" size={22} />
      <p className="mt-3 font-bold">Sign in to {action}</p>
      <p className="mt-1 text-sm text-muted-foreground">A free student account keeps your work private and personal.</p>
      <Link to="/auth" className="mt-4 inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground">Sign in or create account</Link>
    </Panel>
  );
}
