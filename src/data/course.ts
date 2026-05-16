import type { ReactCourseContent } from "../types";
import { getTopicCodeSamples } from "./assessments/topicCodeSamples";
import { getTopicQuizzes } from "./assessments/topicQuizzes";
import { normalizeLesson } from "./migrateLesson";
import { reactCourse as rawCourse } from "./content";
import { applyTopicCatalog } from "./topicCatalog";
import { attachMiniGames } from "./miniGameCatalog";

function enrichLesson(topic: ReactCourseContent["categories"][0]["groups"][0]["topics"][0]) {
  const cataloged = applyTopicCatalog(topic);
  return normalizeLesson(
    attachMiniGames({
      ...cataloged,
      quizQuestions: getTopicQuizzes(cataloged.slug, cataloged.title),
      codeSamples: getTopicCodeSamples(cataloged),
    }),
  );
}

function processCourse(course: ReactCourseContent): ReactCourseContent {
  const categories = course.categories.map((category) => ({
    ...category,
    groups: category.groups.map((group) => ({
      ...group,
      topics: group.topics.map((topic) => enrichLesson(topic)),
    })),
  }));

  return { ...course, categories };
}

export const reactCourse = processCourse(rawCourse);
