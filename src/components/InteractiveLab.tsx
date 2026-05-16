import { useEffect, useMemo, useRef, useState } from "react";
import { useProgress } from "../hooks/useProgress";
import type { LessonContent, QuizQuestion } from "../types";
import { QUIZ_PASS_PERCENT } from "../utils/lessonCompletion";

interface InteractiveLabProps {
  lesson: LessonContent;
  questions: QuizQuestion[];
}

const kindLabel: Record<string, string> = {
  kavram: "Kavram",
  kod: "Kod okuma",
  senaryo: "Senaryo",
};

function InteractiveLab({ lesson, questions }: InteractiveLabProps) {
  const { finishQuizSession } = useProgress();
  const savedRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const activeQuestion = questions[currentIndex];

  const resetLab = () => {
    savedRef.current = false;
    setCurrentIndex(0);
    setSelectedOptionId("");
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  const total = questions.length;

  const percent = useMemo(
    () => (total > 0 ? Math.round((score / total) * 100) : 0),
    [score, total],
  );

  useEffect(() => {
    if (!finished || savedRef.current) return;
    savedRef.current = true;
    finishQuizSession(lesson, percent);
  }, [finished, finishQuizSession, lesson, percent]);

  if (!activeQuestion || total === 0) {
    return null;
  }

  const isCorrect = selectedOptionId === activeQuestion.correctOptionId;

  const checkAnswer = () => {
    setShowResult(true);
    if (!answered) {
      setAnswered(true);
      if (isCorrect) setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId("");
      setShowResult(false);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <section className="interactive container" aria-live="polite">
        <h3>Etkileşimli Laboratuvar</h3>
        <p className="quiz-topic">{lesson.title}</p>
        <div className="lab-score-card">
          <p className="lab-score-title">Quiz tamamlandı</p>
          <p className="lab-score-value">
            {score} / {total} doğru ({percent}%)
          </p>
          <p className="lab-score-hint">
            {percent >= QUIZ_PASS_PERCENT
              ? "Konuyu iyi kavramışsın. Mini görev veya projeyle pekiştir."
              : `En az %${QUIZ_PASS_PERCENT} için tekrar dene veya mini oyunu tamamla.`}
          </p>
          <button type="button" className="primary-btn" onClick={resetLab}>
            Tekrar dene
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="interactive container">
      <h3>Etkileşimli Laboratuvar</h3>
      <p className="quiz-topic">{lesson.title}</p>
      <p className="quiz-progress">
        Soru {currentIndex + 1} / {total}
        {score > 0 && ` · Doğru: ${score}`}
      </p>
      {activeQuestion.kind && (
        <span className={`quiz-kind-badge quiz-kind-${activeQuestion.kind}`}>
          {kindLabel[activeQuestion.kind] ?? activeQuestion.kind}
        </span>
      )}
      <p className="question">{activeQuestion.question}</p>
      {activeQuestion.codeContext && (
        <pre className="quiz-code-context">
          <code>{activeQuestion.codeContext}</code>
        </pre>
      )}

      <div className="options" role="radiogroup" aria-label={activeQuestion.question}>
        {activeQuestion.options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selectedOptionId === option.id}
            className={`option ${selectedOptionId === option.id ? "active" : ""} ${
              showResult && option.id === activeQuestion.correctOptionId ? "correct-option" : ""
            } ${showResult && selectedOptionId === option.id && !isCorrect ? "wrong-option" : ""}`}
            onClick={() => !showResult && setSelectedOptionId(option.id)}
            disabled={showResult}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="actions">
        <button
          type="button"
          className="primary-btn"
          disabled={!selectedOptionId || showResult}
          onClick={checkAnswer}
        >
          Cevabı kontrol et
        </button>
        <button
          type="button"
          className="secondary-btn"
          disabled={!showResult}
          onClick={handleNext}
        >
          {currentIndex === total - 1 ? "Sonuçları gör" : "Sonraki soru"}
        </button>
      </div>
      {showResult && (
        <p className={isCorrect ? "result success" : "result error"}>
          {isCorrect
            ? activeQuestion.explanation
            : `Yanlış. ${activeQuestion.explanation}`}
        </p>
      )}
    </section>
  );
}

export default InteractiveLab;
