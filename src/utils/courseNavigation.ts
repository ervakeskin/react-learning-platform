import type { FlatTopicRef, ReactCourseContent } from "../types";

export function buildFlatTopics(course: ReactCourseContent): FlatTopicRef[] {
  return course.categories.flatMap((category, categoryIndex) =>
    category.groups.flatMap((group, groupIndex) =>
      group.topics.map((topic, topicIndex) => ({
        categoryIndex,
        groupIndex,
        topicIndex,
        topicId: topic.id,
        slug: topic.slug,
      })),
    ),
  );
}

export function findTopicBySlug(
  course: ReactCourseContent,
  slug: string,
): FlatTopicRef | undefined {
  return buildFlatTopics(course).find((item) => item.slug === slug);
}

export function getTopicPath(slug: string): string {
  return `/react/${slug}`;
}
