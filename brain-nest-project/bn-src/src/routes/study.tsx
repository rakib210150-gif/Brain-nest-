import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Check, Copy, FileText, Loader2, Sparkles, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Button, Panel, Tag } from "@/components/ui";
import { AiOutput } from "@/components/ai-output";
import { SignInGate } from "@/components/sign-in-gate";
import { useAuth } from "@/hooks/use-auth";
import { generateStudy } from "@/lib/study.functions";

export const Route = createFileRoute("/study")({ head: () => ({ meta: [{ title: "AI Study Generator — Brain Nest" }, { name: "description", content: "Upload study material and generate personalized exam notes, summaries, revision guides, and practice." }, { property: "og:title", content: "AI Study Generator — Brain Nest" }, { property: "og:description", content: "Turn your course materials into focused learning resources." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: StudyPage });
const outputs = ["Study notes", "Topic summary", "Exam answer", "Important questions", "Quick revision", "Quiz"] as const;
type Output = (typeof outputs)[number];

function StudyPage() {
  const { user } = useAuth();
  const run = useServerFn(generateStudy);
  const [file, setFile] = useState<string | null>(null);
  const [material, setMaterial] = useState("");
  const [output, setOutput] = useState<Output>("Study notes");
  const [subject, setSubject] = useState("Physics");
  const [difficulty, setDifficulty] = useState("Exam standard");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  async function onFile(f?: File) {
    if (!f) return;
    setError(null);
    if (!/\.(txt|md|csv)$/i.test(f.name) && !f.type.startsWith("text/")) {
      setError("For now, please upload a text file (.txt or .md), or paste the text from your PDF or slides below.");
      return;
    }
    setFile(f.name);
    setMaterial((await f.text()).slice(0, 60000));
  }

  async function generate() {
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await run({ data: { material, output, subject, difficulty, chapter, topic } });
      if (r.ok) setResult(r.text); else setError(r.error);
    } catch (e) {
      setError(e instanceof Error && e.message.includes("at least") ? "Please add a bit more material (at least a few sentences)." : "Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const ready = material.trim().length >= 40;
  return <><PageHero eyebrow="AI study generator" title="Turn your material into a smarter study session" copy="Upload or paste a syllabus, textbook chapter, lecture notes, or question paper. Choose what you need and let Brain Nest structure the work." />
  <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8"><div className="space-y-6"><Panel className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold">1. Add your material</h2><p className="mt-1 text-sm text-muted-foreground">Upload a text file or paste your notes</p></div><Tag>Private</Tag></div><input ref={input} type="file" accept=".txt,.md,.csv,text/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />{file ? <div className="mt-5 flex items-center gap-3 rounded-md border border-primary/30 bg-primary/5 p-4"><span className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary"><FileText size={20} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{file}</p><p className="text-xs text-primary">Loaded — ready to analyze</p></div><Button variant="ghost" aria-label="Remove file" onClick={() => { setFile(null); setMaterial(""); }}><X size={18} /></Button></div> : <button onClick={() => input.current?.click()} className="mt-5 flex min-h-32 w-full flex-col items-center justify-center rounded-md border border-dashed border-border bg-secondary/40 p-6 text-center transition hover:border-primary/60 hover:bg-primary/5"><span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary"><Upload /></span><span className="mt-4 font-bold">Browse for a text file</span><span className="mt-1 text-xs text-muted-foreground">.txt or .md — or paste below</span></button>}
  <textarea value={material} onChange={(e) => setMaterial(e.target.value)} rows={7} placeholder="…or paste your chapter, notes or questions here" className="mt-4 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-primary" /><p className="mt-1 text-right text-xs text-muted-foreground">{material.length.toLocaleString()} / 60,000</p></Panel>
  <Panel className="p-5 sm:p-6"><h2 className="text-lg font-bold">2. Set your focus</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Subject"><select value={subject} onChange={(e) => setSubject(e.target.value)}>{["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English", "History", "Economics"].map((s) => <option key={s}>{s}</option>)}</select></Field><Field label="Difficulty"><select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>Exam standard</option><option>Foundation</option><option>Advanced</option></select></Field><Field label="Chapter"><input value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="e.g. Electromagnetism" /></Field><Field label="Topic"><input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Optional focus" /></Field></div></Panel></div>
  <div className="space-y-6"><Panel className="p-5 sm:p-6"><h2 className="text-lg font-bold">3. Choose an output</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{outputs.map((item) => <button key={item} onClick={() => setOutput(item)} className={`min-h-20 rounded-md border p-3 text-left text-sm font-semibold transition ${output === item ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground hover:text-foreground"}`}>{item}{output === item && <Check className="mt-2" size={16} />}</button>)}</div>
  {user ? <><Button className="mt-6 w-full" disabled={!ready || loading} onClick={generate}>{loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}{loading ? "Generating…" : `Generate ${output}`}</Button>{!ready && <p className="mt-2 text-center text-xs text-muted-foreground">Add at least a few sentences of material to continue</p>}</> : <div className="mt-6"><SignInGate action="generate study material" /></div>}
  {error && <p className="mt-3 text-sm text-destructive">{error}</p>}</Panel>
  {result ? <Panel className="border-primary/30 p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase text-primary">Generated by Brain Nest AI</p><h2 className="mt-1 text-xl font-bold">{output}{topic || chapter ? ` — ${topic || chapter}` : ""}</h2></div><Button variant="ghost" aria-label="Copy" onClick={() => navigator.clipboard.writeText(result)}><Copy size={18} /></Button></div><div className="mt-5 border-t border-border pt-5"><AiOutput text={result} /></div></Panel> : <Panel className="grid min-h-64 place-items-center p-8 text-center"><div>{loading ? <Loader2 className="mx-auto animate-spin text-primary" size={36} /> : <BookOpen className="mx-auto text-muted-foreground" size={36} />}<h3 className="mt-4 font-bold">{loading ? "Brain Nest is reading your material…" : "Your learning resource will appear here"}</h3><p className="mt-2 max-w-sm text-sm text-muted-foreground">{loading ? "This usually takes 15–40 seconds." : "Add your material and choose an output. Brain Nest will organize the result into a focused, readable format."}</p></div></Panel>}</div></section></>;
}
function Field({label, children}: {label: string; children: React.ReactNode}) { return <label className="text-sm font-semibold">{label}<div className="mt-2 [&>input]:h-11 [&>input]:w-full [&>input]:rounded-md [&>input]:border [&>input]:border-input [&>input]:bg-background [&>input]:px-3 [&>input]:outline-none [&>input]:focus:border-primary [&>select]:h-11 [&>select]:w-full [&>select]:rounded-md [&>select]:border [&>select]:border-input [&>select]:bg-background [&>select]:px-3 [&>select]:outline-none">{children}</div></label> }
