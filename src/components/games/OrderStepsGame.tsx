import { useState } from "react";
import type { LessonMiniGame, OrderStepsPayload } from "../../types";

interface Props {
  game: LessonMiniGame;
  payload: OrderStepsPayload;
  onComplete: () => void;
}

function OrderStepsGame({ game, payload, onComplete }: Props) {
  const [order, setOrder] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const total = payload.correctOrder.length;

  const addStep = (id: string) => {
    if (order.includes(id) || done) return;
    setOrder((prev) => [...prev, id]);
    setError("");
  };

  const removeFromIndex = (index: number) => {
    if (done) return;
    setOrder((prev) => prev.slice(0, index));
    setError("");
  };

  const check = () => {
    const ok =
      order.length === total && order.every((id, i) => id === payload.correctOrder[i]);
    if (ok) {
      setDone(true);
      onComplete();
    } else {
      setError(game.hint ?? "Sıra yanlış. Adımları baştan düşün.");
    }
  };

  const reset = () => {
    setOrder([]);
    setError("");
    setDone(false);
  };

  const stepById = (id: string) => payload.steps.find((s) => s.id === id);

  return (
    <div className="mini-game order-steps-game">
      <p className="mini-game-progress-label">
        İlerleme: {order.length}/{total}
      </p>
      <p>Doğru sırayı oluştur — havuzdan adıma tıkla:</p>
      <ul className="order-steps-list order-steps-pool">
        {payload.steps.map((step) => {
          const picked = order.includes(step.id);
          return (
            <li key={step.id}>
              <button
                type="button"
                className={`mini-game-btn ${picked ? "step-picked" : ""}`}
                onClick={() => addStep(step.id)}
                disabled={done || picked}
              >
                {step.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="order-sequence-panel">
        <p className="order-sequence-title">Senin sıran (geri almak için tıkla):</p>
        {order.length === 0 ? (
          <p className="order-sequence-empty">—</p>
        ) : (
          <ol className="order-sequence-list">
            {order.map((id, index) => (
              <li key={`${id}-${index}`}>
                <button
                  type="button"
                  className="mini-game-btn step-in-sequence"
                  onClick={() => removeFromIndex(index)}
                  disabled={done}
                >
                  {index + 1}. {stepById(id)?.label}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="order-steps-actions">
        <button
          type="button"
          className="primary-btn"
          onClick={check}
          disabled={done || order.length !== total}
        >
          Kontrol et
        </button>
        <button type="button" className="secondary-btn" onClick={reset}>
          Sıfırla
        </button>
      </div>
      {done && <p className="mini-game-result success">{game.successMessage}</p>}
      {error && <p className="mini-game-result error">{error}</p>}
    </div>
  );
}

export default OrderStepsGame;
