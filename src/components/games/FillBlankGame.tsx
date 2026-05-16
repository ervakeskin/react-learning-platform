import { useState } from "react";
import type { FillBlankPayload, LessonMiniGame } from "../../types";

interface Props {
  game: LessonMiniGame;
  payload: FillBlankPayload;
  onComplete: () => void;
}

function FillBlankGame({ game, payload, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allCorrect = payload.blanks.every((b) => answers[b.id]?.trim() === b.answer);

  const submit = () => {
    setChecked(true);
    if (allCorrect) onComplete();
  };

  const parts = payload.template.split("___");

  return (
    <div className="mini-game fill-blank-game">
      <div className="fill-blank-template">
        {parts.map((part, i) => (
          <span key={`part-${i}`}>
            {part}
            {i < payload.blanks.length && (
              <select
                id={payload.blanks[i].id}
                className={`fill-blank-input fill-blank-inline ${checked && answers[payload.blanks[i].id]?.trim() !== payload.blanks[i].answer ? "fill-blank-wrong" : ""}`}
                value={answers[payload.blanks[i].id] ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [payload.blanks[i].id]: e.target.value }))
                }
              >
                <option value="">…</option>
                {payload.blanks[i].options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </span>
        ))}
      </div>
      <button type="button" className="primary-btn" onClick={submit}>
        Kontrol et
      </button>
      {checked && allCorrect && <p className="mini-game-result success">{game.successMessage}</p>}
      {checked && !allCorrect && (
        <p className="mini-game-result error">{game.hint ?? "Bazı boşluklar yanlış."}</p>
      )}
    </div>
  );
}

export default FillBlankGame;
