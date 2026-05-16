import type { LessonContent } from "../types";
import type { ProgressState } from "../types/progress";

export const QUIZ_PASS_PERCENT = 70;

export function getMiniGameProgressId(lesson: Pick<LessonContent, "slug" | "miniGame">): string | null {
  if (!lesson.miniGame) return null;
  return `${lesson.slug}:${lesson.miniGame.id}`;
}

export function isQuizPassed(lesson: Pick<LessonContent, "id" | "quizQuestions">, progress: ProgressState): boolean {
  if (lesson.quizQuestions.length === 0) return false;
  const percent = progress.quizScores[lesson.id] ?? 0;
  return percent >= QUIZ_PASS_PERCENT;
}

export function isMiniGameDone(lesson: Pick<LessonContent, "slug" | "miniGame">, progress: ProgressState): boolean {
  const gameId = getMiniGameProgressId(lesson);
  if (!gameId) return false;
  return progress.gamesCompleted.includes(gameId);
}

export function isLabAttempted(lesson: Pick<LessonContent, "id">, progress: ProgressState): boolean {
  return progress.labAttemptedTopicIds.includes(lesson.id);
}

/** Quiz ≥70% veya (mini oyun tamam + lab denemesi). */
export function meetsCompletionCriteria(
  lesson: Pick<LessonContent, "id" | "slug" | "miniGame" | "quizQuestions">,
  progress: ProgressState,
): boolean {
  if (isQuizPassed(lesson, progress)) return true;
  if (lesson.miniGame && isMiniGameDone(lesson, progress) && isLabAttempted(lesson, progress)) {
    return true;
  }
  return false;
}

export function isTopicMarkedComplete(topicId: string, progress: ProgressState): boolean {
  return progress.completedTopicIds.includes(topicId);
}
