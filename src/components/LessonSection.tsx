import type { CodeExample, LessonSection as LessonSectionType } from "../types";
import { useCodeHighlight } from "../hooks/useCodeHighlight";
import CodeBlock from "./CodeBlock";

interface LessonSectionProps {
  section: LessonSectionType;
  codeSamples: CodeExample[];
  lessonSlug?: string;
}

function LessonSection({ section, codeSamples, lessonSlug }: LessonSectionProps) {
  const { setHighlight } = useCodeHighlight();
  const linkedSample =
    section.codeSampleIndex !== undefined ? codeSamples[section.codeSampleIndex] : undefined;
  const explainedSample =
    section.linkedCodeSampleIndex !== undefined
      ? codeSamples[section.linkedCodeSampleIndex]
      : linkedSample;

  const headingTag = section.subheadingLevel === 3 ? "h3" : "h2";
  const Heading = headingTag;

  if (section.sectionKind === "example" && linkedSample) {
    return (
      <section className="lesson-section lesson-section--w3-example">
        <Heading>{section.heading}</Heading>
        <CodeBlock
          sample={linkedSample}
          lessonSlug={lessonSlug}
          variant="inline-lesson"
          sampleIndex={section.codeSampleIndex}
        />
      </section>
    );
  }

  if (section.sectionKind === "example-explained" && explainedSample) {
    const sampleIndex = section.linkedCodeSampleIndex ?? 0;
    const lines = explainedSample.lineExplanations ?? [];
    const lifecycleLines = lines.filter((l) =>
      /componentDidMount|componentWillUnmount|componentDidUpdate|lifecycle/i.test(l.symbol),
    );
    const coreLines =
      section.explainedGroupHeading && lifecycleLines.length > 0
        ? lines.filter((l) => !lifecycleLines.includes(l))
        : lines;

    return (
      <section
        className="lesson-section lesson-section--w3-explained"
        aria-labelledby={`${section.id}-heading`}
      >
        <Heading id={`${section.id}-heading`}>{section.heading}</Heading>
        {section.explainedGroupHeading && lifecycleLines.length > 0 && (
          <>
            <ul className="w3-explained-list">
              {coreLines.map((line) => (
                <li
                  key={line.symbol}
                  onMouseEnter={() => setHighlight(sampleIndex, line.symbol)}
                  onMouseLeave={() => setHighlight(sampleIndex, null)}
                  onFocus={() => setHighlight(sampleIndex, line.symbol)}
                  onBlur={() => setHighlight(sampleIndex, null)}
                >
                  <code className="w3-explained-symbol">{line.symbol}</code>
                  <span>{line.explanation}</span>
                </li>
              ))}
            </ul>
            <h4 className="explained-group-heading">{section.explainedGroupHeading}</h4>
            <ul className="w3-explained-list">
              {lifecycleLines.map((line) => (
                <li
                  key={line.symbol}
                  onMouseEnter={() => setHighlight(sampleIndex, line.symbol)}
                  onMouseLeave={() => setHighlight(sampleIndex, null)}
                  onFocus={() => setHighlight(sampleIndex, line.symbol)}
                  onBlur={() => setHighlight(sampleIndex, null)}
                >
                  <code className="w3-explained-symbol">{line.symbol}</code>
                  <span>{line.explanation}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {!section.explainedGroupHeading || lifecycleLines.length === 0 ? (
          <ul className="w3-explained-list">
            {lines.map((line) => (
              <li
                key={line.symbol}
                onMouseEnter={() => setHighlight(sampleIndex, line.symbol)}
                onMouseLeave={() => setHighlight(sampleIndex, null)}
                onFocus={() => setHighlight(sampleIndex, line.symbol)}
                onBlur={() => setHighlight(sampleIndex, null)}
              >
                <code className="w3-explained-symbol">{line.symbol}</code>
                <span>{line.explanation}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  }

  return (
    <section
      className={`lesson-section${section.sectionKind === "definition" ? " lesson-section--w3-definition" : ""}`}
    >
      <Heading>{section.heading}</Heading>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="lesson-paragraph">
          {paragraph}
        </p>
      ))}
      {linkedSample && (
        <CodeBlock sample={linkedSample} lessonSlug={lessonSlug} sampleIndex={section.codeSampleIndex} />
      )}
    </section>
  );
}

export default LessonSection;
