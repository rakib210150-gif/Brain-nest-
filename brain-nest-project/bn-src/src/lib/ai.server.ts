import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export class AiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/** Streams a Lovable AI Gateway Responses call and returns the final text. */
export async function generateStudyText(system: string, prompt: string): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new AiError("AI is not configured for this app yet.", 500);
  const provider = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  let failure: unknown;
  const result = streamText({
    model: provider.responses(MODEL),
    system,
    prompt,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
    onError: ({ error }) => {
      failure = error;
    },
  });
  let text = "";
  for await (const chunk of result.textStream) text += chunk;
  if (failure || !text.trim()) {
    const status = (failure as { statusCode?: number })?.statusCode ?? 500;
    if (status === 429) throw new AiError("Brain Nest is busy right now. Please try again in a minute.", 429);
    if (status === 402) throw new AiError("AI credits have run out for this workspace. Please add credits to continue.", 402);
    if (status === 403) throw new AiError("This request could not be processed.", 403);
    console.error("AI generation failed", failure);
    throw new AiError("We couldn't generate this right now. Please try again.", status);
  }
  return text;
}
