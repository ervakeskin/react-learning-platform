import type { LessonContent } from "../../types";
import { detectFocus } from "../assessments/focusDetect";
import { buildLineExplanations } from "./explainCode";
import { getRichCodeSamples } from "./richCodeSamples";
import { slugNarratives } from "./slugNarratives";
import { buildW3ContentBlocks } from "./w3LessonSections";

/** buildTopic gövdesi UI'da kullanılmaz; W3 tanım + 3×(Örnek + Açıklama). */
export function applyLessonNarrative(lesson: LessonContent): LessonContent {
  const { slug, title } = lesson;
  const narrative = slugNarratives[slug];
  const focus = detectFocus(title, slug);

  const codeSamples = getRichCodeSamples(title, slug, focus).map((sample) => ({
    ...sample,
    lineExplanations: buildLineExplanations(sample.code, focus, title, slug),
  }));

  const contentBlocks = buildW3ContentBlocks(title, slug, focus, codeSamples);

  return {
    ...lesson,
    summary: narrative?.summary ?? lesson.summary,
    contentBlocks,
    codeSamples,
    practiceTask: narrative?.practiceTask ?? lesson.practiceTask,
    realWorldScenario: narrative?.realWorldScenario ?? lesson.realWorldScenario,
  };
}
