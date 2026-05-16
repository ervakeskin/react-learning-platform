import type { CodeExample } from "../types";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

interface CodeSnippetProps {
  samples: CodeExample[];
  title?: string;
  lessonSlug?: string;
}

function CodeSnippet({ samples, title = "Tüm kod örnekleri", lessonSlug }: CodeSnippetProps) {
  const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);

  if (samples.length === 0) return null;

  const activeSample = samples[activeSampleIndex] ?? samples[0];

  return (
    <section className="code-snippet container">
      <h3>{title}</h3>

      {samples.length > 1 && (
        <div className="sample-tabs">
          {samples.map((example, index) => (
            <button
              key={example.title}
              type="button"
              className={index === activeSampleIndex ? "sample-tab active" : "sample-tab"}
              onClick={() => setActiveSampleIndex(index)}
            >
              {example.title}
            </button>
          ))}
        </div>
      )}

      <CodeBlock sample={activeSample} lessonSlug={lessonSlug} />
    </section>
  );
}

export default CodeSnippet;
