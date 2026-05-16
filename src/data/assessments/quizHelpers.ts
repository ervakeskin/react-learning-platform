import type { QuizQuestion, QuizQuestionKind } from "../../types";

export function q(
  id: string,
  question: string,
  options: { id: string; text: string }[],
  correctOptionId: string,
  explanation: string,
  extra?: { codeContext?: string; kind?: QuizQuestionKind },
): QuizQuestion {
  return {
    id,
    question,
    options,
    correctOptionId,
    explanation,
    codeContext: extra?.codeContext,
    kind: extra?.kind ?? "kavram",
  };
}
