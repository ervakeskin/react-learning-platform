import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LessonContent } from "../types";
import type { ProgressState } from "../types/progress";
import { meetsCompletionCriteria } from "../utils/lessonCompletion";

const STORAGE_KEY = "react-edu-progress";

const defaultState: ProgressState = {
  completedTopicIds: [],
  quizScores: {},
  gamesCompleted: [],
  labAttemptedTopicIds: [],
};

function normalizeStored(raw: ProgressState): ProgressState {
  return {
    ...defaultState,
    ...raw,
    labAttemptedTopicIds: raw.labAttemptedTopicIds ?? [],
  };
}

export interface ProgressContextValue {
  progress: ProgressState;
  markTopicComplete: (topicId: string) => void;
  recordQuiz: (topicId: string, scorePercent: number) => void;
  markGameComplete: (gameId: string) => void;
  markLabAttempt: (topicId: string) => void;
  setLastSlug: (slug: string) => void;
  tryCompleteLesson: (lesson: LessonContent) => void;
  finishQuizSession: (lesson: LessonContent, scorePercent: number) => void;
  finishGameSession: (lesson: LessonContent, gameId: string) => void;
  isLessonComplete: (lesson: LessonContent) => boolean;
  exportJson: () => string;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? normalizeStored(JSON.parse(raw) as ProgressState) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markTopicComplete = useCallback((topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedTopicIds: prev.completedTopicIds.includes(topicId)
        ? prev.completedTopicIds
        : [...prev.completedTopicIds, topicId],
    }));
  }, []);

  const recordQuiz = useCallback((topicId: string, scorePercent: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [topicId]: Math.max(prev.quizScores[topicId] ?? 0, scorePercent),
      },
    }));
  }, []);

  const markGameComplete = useCallback((gameId: string) => {
    setProgress((prev) => ({
      ...prev,
      gamesCompleted: prev.gamesCompleted.includes(gameId)
        ? prev.gamesCompleted
        : [...prev.gamesCompleted, gameId],
    }));
  }, []);

  const markLabAttempt = useCallback((topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      labAttemptedTopicIds: prev.labAttemptedTopicIds.includes(topicId)
        ? prev.labAttemptedTopicIds
        : [...prev.labAttemptedTopicIds, topicId],
    }));
  }, []);

  const setLastSlug = useCallback((slug: string) => {
    setProgress((prev) => (prev.lastSlug === slug ? prev : { ...prev, lastSlug: slug }));
  }, []);

  const isLessonComplete = useCallback(
    (lesson: LessonContent) =>
      progress.completedTopicIds.includes(lesson.id) ||
      meetsCompletionCriteria(lesson, progress),
    [progress],
  );

  const tryCompleteLesson = useCallback((lesson: LessonContent) => {
    setProgress((prev) => {
      if (!meetsCompletionCriteria(lesson, prev)) return prev;
      if (prev.completedTopicIds.includes(lesson.id)) return prev;
      return {
        ...prev,
        completedTopicIds: [...prev.completedTopicIds, lesson.id],
      };
    });
  }, []);

  const finishQuizSession = useCallback((lesson: LessonContent, scorePercent: number) => {
    setProgress((prev) => {
      const next: ProgressState = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [lesson.id]: Math.max(prev.quizScores[lesson.id] ?? 0, scorePercent),
        },
        labAttemptedTopicIds: prev.labAttemptedTopicIds.includes(lesson.id)
          ? prev.labAttemptedTopicIds
          : [...prev.labAttemptedTopicIds, lesson.id],
      };
      if (meetsCompletionCriteria(lesson, next) && !next.completedTopicIds.includes(lesson.id)) {
        next.completedTopicIds = [...next.completedTopicIds, lesson.id];
      }
      return next;
    });
  }, []);

  const finishGameSession = useCallback((lesson: LessonContent, gameId: string) => {
    setProgress((prev) => {
      const next: ProgressState = {
        ...prev,
        gamesCompleted: prev.gamesCompleted.includes(gameId)
          ? prev.gamesCompleted
          : [...prev.gamesCompleted, gameId],
      };
      if (meetsCompletionCriteria(lesson, next) && !next.completedTopicIds.includes(lesson.id)) {
        next.completedTopicIds = [...next.completedTopicIds, lesson.id];
      }
      return next;
    });
  }, []);

  const exportJson = useCallback(() => JSON.stringify(progress, null, 2), [progress]);

  const reset = useCallback(() => setProgress(defaultState), []);

  const value = useMemo(
    () => ({
      progress,
      markTopicComplete,
      recordQuiz,
      markGameComplete,
      markLabAttempt,
      setLastSlug,
      tryCompleteLesson,
      finishQuizSession,
      finishGameSession,
      isLessonComplete,
      exportJson,
      reset,
    }),
    [
      progress,
      markTopicComplete,
      recordQuiz,
      markGameComplete,
      markLabAttempt,
      setLastSlug,
      tryCompleteLesson,
      finishQuizSession,
      finishGameSession,
      isLessonComplete,
      exportJson,
      reset,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook paired with provider
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
