import { describe, expect, it } from "vitest";
import { reactCourse } from "./course";
import { countLessonsWithGames } from "./miniGameCatalog";

describe("mini games coverage", () => {
  it("has games on at least 44 lessons", () => {
    expect(countLessonsWithGames(reactCourse)).toBeGreaterThanOrEqual(44);
  });
});
