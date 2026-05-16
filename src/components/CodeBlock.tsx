import { useState } from "react";
import type { CodeExample } from "../types";
import CodeHighlight from "./CodeHighlight";
import TryItLink from "./TryItLink";

interface CodeBlockProps {
  sample: CodeExample;
  compact?: boolean;
  lessonSlug?: string;
  variant?: "default" | "inline-lesson";
  sampleIndex?: number;
}

function CodeBlock({
  sample,
  compact = false,
  lessonSlug,
  variant = "default",
  sampleIndex = 0,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const inline = variant === "inline-lesson";

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`code-block ${compact ? "code-block-compact" : ""} ${inline ? "code-block--inline-lesson" : ""}`}
    >
      <div className="code-block-header">
        <strong>{sample.title}</strong>
        <span className="code-block-meta">
          {sample.language.toUpperCase()} · {sample.filename ?? "App.tsx"}
        </span>
        <button type="button" className="code-copy-btn" onClick={() => void copyCode()}>
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </div>
      {!inline && <p className="code-block-desc">{sample.description}</p>}
      <pre className="code-block-pre">
        {inline ? (
          <CodeHighlight code={sample.code} sampleIndex={sampleIndex} />
        ) : (
          <code>{sample.code}</code>
        )}
      </pre>
      {lessonSlug && <TryItLink slug={lessonSlug} code={sample.code} />}
      {!inline && !compact && sample.walkthroughSteps.length > 0 && (
        <>
          <p className="code-block-steps-title">Adım adım</p>
          <ol className="code-block-steps">
            {sample.walkthroughSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </>
      )}
      {!inline && (
        <p className="code-block-outcome">
          <strong>Beklenen sonuç:</strong>{" "}
          {sample.expectedOutcome ?? "Kodu çalıştırınca davranışı açıklayabilmelisin."}
        </p>
      )}
    </div>
  );
}

export default CodeBlock;
