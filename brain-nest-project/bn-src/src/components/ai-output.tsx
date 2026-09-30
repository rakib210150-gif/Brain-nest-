import ReactMarkdown from "react-markdown";

export function AiOutput({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-sm leading-7 text-muted-foreground [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mt-5 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-4 [&_h3]:font-bold [&_h3]:text-foreground [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:text-foreground [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_ul]:list-disc [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
