import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const studySchema = z.object({
  material: z.string().trim().min(40, "Please add a bit more material (at least a few sentences).").max(60000),
  output: z.enum(["Study notes", "Topic summary", "Exam answer", "Important questions", "Quick revision", "Quiz"]),
  subject: z.string().max(80),
  difficulty: z.string().max(80),
  chapter: z.string().max(160).optional().default(""),
  topic: z.string().max(160).optional().default(""),
});

const guides: Record<string, string> = {
  "Study notes": "Write well-structured study notes with headings, key definitions, formulas and worked examples.",
  "Topic summary": "Write a concise summary of the main ideas in under 350 words.",
  "Exam answer": "Write a model exam answer, structured as an examiner expects, highlighting marking points.",
  "Important questions": "List the 10 most likely exam questions with a one-line hint for each.",
  "Quick revision": "Produce a one-page quick revision sheet: bullet points, formulas, mnemonics and common mistakes.",
  Quiz: "Create 8 multiple-choice questions (A–D). After all questions, give an answer key with short explanations.",
};

export const generateStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => studySchema.parse(d))
  .handler(async ({ data }) => {
    const { generateStudyText } = await import("./ai.server");
    const system = `You are Brain Nest, an expert, encouraging tutor for school and university students. Use only the student's material as the main source; add brief, accurate context when useful. Format with Markdown. ${guides[data.output]}`;
    const prompt = `Subject: ${data.subject}\nDifficulty: ${data.difficulty}\nChapter: ${data.chapter || "not specified"}\nFocus topic: ${data.topic || "not specified"}\n\nStudy material:\n"""\n${data.material}\n"""`;
    try {
      return { ok: true as const, text: await generateStudyText(system, prompt) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Something went wrong." };
    }
  });

export const analyzeQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ papers: z.string().trim().min(40, "Please paste some past questions first.").max(60000), subject: z.string().max(80) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { generateStudyText } = await import("./ai.server");
    const system =
      "You are Brain Nest, an exam-pattern analyst. Analyse the past exam questions given. Format with Markdown: 1) Most repeated topics ranked, with how often each appears; 2) Question format mix (long, short, numerical, MCQ) as percentages; 3) Top 3 topics most likely to appear next, with honest reasoning (never promise certainty); 4) A focused 5-step study plan.";
    try {
      return { ok: true as const, text: await generateStudyText(system, `Subject: ${data.subject}\n\nPast questions:\n"""\n${data.papers}\n"""`) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Something went wrong." };
    }
  });
