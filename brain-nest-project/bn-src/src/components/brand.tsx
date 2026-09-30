import { BrainCircuit } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary shadow-glow"><BrainCircuit size={20} /></span>{!compact && <span className="font-display text-lg font-bold text-foreground">Brain<span className="text-primary">Nest</span></span>}</div>;
}
