import { describe, expect, it } from "vitest";
import { getTopicQuizzes } from "./topicQuizzes";

describe("getTopicQuizzes", () => {
  it("returns slug override for useState", () => {
    const quiz = getTopicQuizzes("react-usestate", "React useState");
    expect(quiz.length).toBeGreaterThanOrEqual(4);
    expect(quiz[0]?.id).toBe("us-q1");
  });

  it("returns extra override for intro", () => {
    const quiz = getTopicQuizzes("react-intro", "React Intro");
    expect(quiz.some((q) => q.id === "intro-1")).toBe(true);
  });
});
