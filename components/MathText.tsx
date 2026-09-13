"use client";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useState } from "react";
export function MathText({ children }: { children: string }) {
  const markdown = children.replace(
    /\$\$([\s\S]+?)\$\$/g,
    (_, math: string) => `\n\n$$\n${math.trim()}\n$$\n\n`,
  );
  return (
    <div className="prose">
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: "warn", trust: false }]]}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
export function FormulaCopies({ text }: { text: string }) {
  const [copied, setCopied] = useState<number | null>(null),
    [error, setError] = useState("");
  const formulas = [...text.matchAll(/\$\$([\s\S]+?)\$\$/g)].map((m) =>
    m[1].trim(),
  );
  if (!formulas.length) return null;
  return (
    <div className="formula-copies">
      {formulas.map((formula, i) => (
        <button
          className="text-button"
          key={i}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(formula);
              setCopied(i);
              setError("");
            } catch {
              setError(
                "Clipboard unavailable. Select the formula source below.",
              );
            }
          }}
        >
          {copied === i ? "Copied LaTeX" : `Copy equation ${i + 1}`}
        </button>
      ))}
      {error && (
        <details open>
          <summary>{error}</summary>
          <pre>{formulas.join("\n\n")}</pre>
        </details>
      )}
    </div>
  );
}
