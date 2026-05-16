import { useState } from "react";
import type { LessonMiniGame, TrueFalseSprintPayload } from "../../types";

interface Props {
  game: LessonMiniGame;
  payload: TrueFalseSprintPayload;
  onComplete: () => void;
}

function TrueFalseSprint({ game, payload, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackKind, setFeedbackKind] = useState<"ok" | "err" | "">("");
  const [finished, setFinished] = useState(false);
  const [fade, setFade] = useState(false);

  const item = payload.items[index];
  const total = payload.items.length;
  const passThreshold = Math.ceil(total * 0.7);

  const answer = (value: boolean) => {
    if (!item || finished) return;
    const ok = value === item.isTrue;
    const newScore = ok ? score + 1 : score;
    const newStreak = ok ? streak + 1 : 0;
    if (ok) setScore(newScore);
    setStreak(newStreak);
    setFeedbackKind(ok ? "ok" : "err");
    setFeedback(
      ok
        ? newStreak >= 2
          ? `Doğru! Streak x${newStreak}`
          : "Doğru! +10 XP"
        : item.explanation,
    );

    setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setFade(false);
        if (index >= total - 1) {
          setFinished(true);
          if (newScore >= passThreshold) onComplete();
          setFeedback(game.successMessage);
          setFeedbackKind("ok");
        } else {
          setIndex((i) => i + 1);
          setFeedback("");
          setFeedbackKind("");
        }
      }, 180);
    }, 750);
  };

  if (finished) {
    return (
      <div className="mini-game true-false-sprint">
        <p className="mini-game-progress-label">
          Skor: {score}/{total} (geçmek için {passThreshold}+)
        </p>
        <p className={`mini-game-result ${score >= passThreshold ? "success" : "error"}`}>{feedback}</p>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="mini-game true-false-sprint">
      <p className="mini-game-progress-label">
        Soru {index + 1}/{total} · Skor: {score}
        {streak >= 2 && ` · Streak x${streak}`}
      </p>
      <p className={`tf-statement ${fade ? "tf-fade" : ""}`}>{item.statement}</p>
      <div className="tf-actions">
        <button type="button" className="primary-btn" onClick={() => answer(true)}>
          Doğru
        </button>
        <button type="button" className="secondary-btn" onClick={() => answer(false)}>
          Yanlış
        </button>
      </div>
      {feedback && (
        <p className={`mini-game-result ${feedbackKind === "ok" ? "success" : "error"}`}>{feedback}</p>
      )}
    </div>
  );
}

export default TrueFalseSprint;
