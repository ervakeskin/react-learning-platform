export interface ProgressState {
  completedTopicIds: string[];
  quizScores: Record<string, number>;
  gamesCompleted: string[];
  labAttemptedTopicIds: string[];
  lastSlug?: string;
}
