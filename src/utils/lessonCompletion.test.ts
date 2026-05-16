import { describe, expect, it } from "vitest";
import { meetsCompletionCriteria, QUIZ_PASS_PERCENT } from "./lessonCompletion";
import type { ProgressState } from "../types/progress";

const baseLesson = {
  id: "test-lesson",
  slug: "test-lesson",
  quizQuestions: [{ id: "1" }],
  miniGame: {
    id: "g1",
    title: "G",
    intro: "",
    type: "true-false-sprint" as const,
    payload: { items: [] },
    successMessage: "OK",
  },
};

describe("meetsCompletionCriteria", () => {
  it("passes when quiz score meets threshold", () => {
    const progress: ProgressState = {
      completedTopicIds: [],
      quizScores: { "test-lesson": QUIZ_PASS_PERCENT },
      gamesCompleted: [],
      labAttemptedTopicIds: [],
    };
    expect(meetsCompletionCriteria(baseLesson, progress)).toBe(true);
  });

  it("passes with mini game and lab when quiz below threshold", () => {
    const progress: ProgressState = {
      completedTopicIds: [],
      quizScores: { "test-lesson": 40 },
      gamesCompleted: ["test-lesson:g1"],
      labAttemptedTopicIds: ["test-lesson"],
    };
    expect(meetsCompletionCriteria(baseLesson, progress)).toBe(true);
  });
});
