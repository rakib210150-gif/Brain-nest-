import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, AudioLines, BookOpenCheck, BrainCircuit, ChartNoAxesCombined, Check, ChevronRight, FileSearch, Network, ScanSearch, Sparkles, TimerReset, Upload, WandSparkles, Zap } from "lucide-react";
import heroAsset from "@/assets/brain-nest-reference.jpg.asset.json";
import { Panel, Tag } from "@/components/ui";
import { Brand } from "@/components/brand";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Brain Nest — AI-Powered Exam Preparation" }, { name: "description", content: "Turn your study materials into personalized notes, questions, quizzes, and revision plans with AI." }, { property: "og:title", content: "Brain Nest — Study Smarter With AI" }, { property: "og:description", content: "Your complete AI study ecosystem for focused exam preparation." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: HomePage,
});

const features = [
  { icon: BookOpenCheck, title: "AI Notes", text: "Structured, exam-ready notes from all your material." },
  { icon: FileSearch, title: "PDF Analyzer", text: "Find key concepts across textbooks and lecture slides." },
  { icon: ScanSearch, title: "Important Questions", text: "Surface high-value questions from recurring patterns." },
  { icon: TimerReset, title: "Quick Revision", text: "Compress entire chapters into focused review sessions." },
  { icon: AudioLines, title: "AI Audio", text: "Turn difficult concepts into clear spoken explanations." },
  { icon: Network, title: "Dependency Graph", text: "See how concepts connect and what to learn first." },
  { icon: Zap, title: "Quiz & Mock Tests", text: "Practice under pressure with adaptive assessments." },
  { icon: ChartNoAxesCombined, title: "Performance", text: "Track weak topics and get a smarter revision plan." },
];
const flow = ["Upload", "AI analysis", "Learn", "Practice", "Improve"];

function HomePage() {
  return <>
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-border aurora grid-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/25 to-background" />
      <img src={heroAsset.url} alt="Glowing digital brain above a laptop" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-lighten sm:object-[center_60%] lg:left-auto lg:w-[62%] lg:opacity-70" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-end px-4 pb-14 pt-20 sm:px-6 lg:items-center lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <Tag><Sparkles size={13} className="mr-1.5" />Your AI study ecosystem</Tag>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.06] sm:text-6xl lg:text-7xl">Study smarter.<br />Learn faster.<br /><span className="text-primary">With AI.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Transform your syllabus, textbooks, PDFs, and previous exam questions into personalized, exam-focused learning resources.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/study" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-bold text-primary-foreground shadow-glow">Start learning with AI <ArrowRight size={18} /></Link><a href="#features" className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-secondary/80 px-6 font-bold text-foreground backdrop-blur">Explore features</a></div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">{["Built for exams", "Personalized revision", "One connected workspace"].map(t => <span key={t} className="flex items-center gap-2"><Check size={16} className="text-primary" />{t}</span>)}</div>
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-surface-elevated"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mb-10 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">One intelligent flow</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From source material to exam confidence</h2></div><div className="grid gap-3 sm:grid-cols-5">{flow.map((step, i) => <div key={step} className="flex items-center gap-3 sm:block"><span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 font-bold text-primary">0{i + 1}</span><p className="mt-0 text-sm font-bold sm:mt-4">{step}</p>{i < 4 && <ChevronRight className="ml-auto text-muted-foreground sm:hidden" />}</div>)}</div></div></section>

    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-highlight">Built around your exam</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Everything you need to learn, practice, and improve</h2></div><Link to="/study" className="flex items-center gap-2 text-sm font-bold text-primary">Open study workspace <ArrowRight size={16} /></Link></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(({icon: Icon, title, text}, i) => <Panel key={title} className={`group p-5 transition hover:-translate-y-1 hover:border-primary/40 ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}><span className="grid size-10 place-items-center rounded-md bg-accent text-primary"><Icon size={20} /></span><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></Panel>)}</div></section>

    <section className="border-y border-border bg-surface-elevated"><div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><Tag tone="pink"><WandSparkles size={13} className="mr-1.5" />Personal by design</Tag><h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">A study plan that responds to how you perform</h2><p className="mt-4 leading-7 text-muted-foreground">Brain Nest connects what you upload, what you understand, and where you struggle—then turns that signal into your next best action.</p></div><Panel className="overflow-hidden"><div className="border-b border-border p-5"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">Today’s focus</p><p className="mt-1 text-xs text-muted-foreground">Physics • Electromagnetism</p></div><Tag>78% ready</Tag></div></div><div className="grid gap-5 p-5 sm:grid-cols-3"><Metric value="24m" label="Review time" /><Metric value="8" label="Key concepts" /><Metric value="12" label="Practice items" /></div><div className="border-t border-border p-5"><p className="mb-3 text-xs font-bold uppercase text-muted-foreground">Recommended next</p><div className="flex items-center gap-3 rounded-md bg-secondary p-4"><span className="grid size-10 place-items-center rounded-md bg-highlight/10 text-highlight"><BrainCircuit size={20} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">Review Faraday’s law</p><p className="text-xs text-muted-foreground">Weak-link detected from your last quiz</p></div><ArrowRight size={18} className="text-primary" /></div></div></Panel></div></section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="overflow-hidden rounded-lg border border-primary/30 bg-card p-7 shadow-glow sm:p-10"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><Brand /><h2 className="mt-7 font-display text-3xl font-bold sm:text-4xl">Ready to study smarter?</h2><p className="mt-3 max-w-xl text-muted-foreground">Bring your material. Brain Nest will help you turn it into understanding, practice, and progress.</p></div><Link to="/study" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-bold text-primary-foreground">Start learning <ArrowRight size={18} /></Link></div></div></section>
    <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><Brand /><p>Focused learning for ambitious students.</p><p>© 2026 Brain Nest</p></div></footer>
  </>;
}
function Metric({ value, label }: { value: string; label: string }) { return <div><p className="font-display text-3xl font-bold text-foreground">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>; }
