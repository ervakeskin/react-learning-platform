import { useState } from "react";
import type { LessonMiniGame, SpotTheBugPayload } from "../../types";

interface Props {
  game: LessonMiniGame;
  payload: SpotTheBugPayload;
  onComplete: () => void;
}

function SpotTheBugGame({ game, payload, onComplete }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const select = (lineNumber: number) => {
    if (completed) return;
    if (picked === lineNumber) {
      setPicked(null);
      return;
    }
    setPicked(lineNumber);
    if (lineNumber === payload.buggyLineNumber) {
      setCompleted(true);
      onComplete();
    }
  };

  const correct = picked === payload.buggyLineNumber;
  const wrong = picked !== null && !correct;

  return (
    <div className="mini-game spot-bug-game">
      <p className="mini-game-progress-label">Hatalı satırı bul — seçimi kaldırmak için tekrar tıkla.</p>
      <div className="bug-lines">
        {payload.lines.map((line) => (
          <button
            key={line.lineNumber}
            type="button"
            className={`bug-line mini-game-btn ${picked === line.lineNumber ? (correct ? "correct match-pair-pop" : "wrong match-pair-shake") : ""}`}
            onClick={() => select(line.lineNumber)}
          >
            {line.lineNumber}. {line.text}
          </button>
        ))}
      </div>
      {correct && <p className="mini-game-result success">{game.successMessage}</p>}
      {wrong && <p className="mini-game-result error">{payload.explanation}</p>}
    </div>
  );
}

export default SpotTheBugGame;
