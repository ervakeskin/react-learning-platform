import { describe, expect, it } from "vitest";
import { reactCourse } from "./course";
import { validateW3LessonStructure } from "./qualityRubric";

function findLesson(slug: string) {
  for (const cat of reactCourse.categories) {
    for (const group of cat.groups) {
      const topic = group.topics.find((t) => t.slug === slug);
      if (topic) return topic;
    }
  }
  throw new Error(`Lesson not found: ${slug}`);
}

describe("validateW3LessonStructure", () => {
  it("react-class passes W3 structure", () => {
    const lesson = findLesson("react-class");
    const issues = validateW3LessonStructure(lesson);
    expect(issues).toEqual([]);
  });

  it("react-usestate passes W3 structure", () => {
    const lesson = findLesson("react-usestate");
    const issues = validateW3LessonStructure(lesson);
    expect(issues).toEqual([]);
  });

  it("fails when lineExplanations missing", () => {
    const lesson = findLesson("react-intro");
    const broken = {
      ...lesson,
      codeSamples: lesson.codeSamples.map((s) => ({ ...s, lineExplanations: [] })),
    };
    const issues = validateW3LessonStructure(broken);
    expect(issues.some((i) => i.includes("lineExplanations"))).toBe(true);
  });
});
