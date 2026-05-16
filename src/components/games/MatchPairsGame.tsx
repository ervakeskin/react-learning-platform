import { useEffect, useMemo, useState } from "react";
import type { LessonMiniGame, MatchPairsPayload } from "../../types";

interface Props {
  game: LessonMiniGame;
  payload: MatchPairsPayload;
  onComplete: () => void;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function MatchPairsGame({ game, payload, onComplete }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [wrongFlash, setWrongFlash] = useState(false);
  const [lastMatchedId, setLastMatchedId] = useState<string | null>(null);

  const rightItems = useMemo(() => {
    const items = [...payload.pairs];
    return payload.shuffleRight !== false ? shuffle(items) : items;
  }, [payload.pairs, payload.shuffleRight]);

  useEffect(() => {
    if (!lastMatchedId) return;
    const t = window.setTimeout(() => setLastMatchedId(null), 450);
    return () => window.clearTimeout(t);
  }, [lastMatchedId]);

  useEffect(() => {
    if (!wrongFlash) return;
    const t = window.setTimeout(() => setWrongFlash(false), 420);
    return () => window.clearTimeout(t);
  }, [wrongFlash]);

  const handleLeft = (pairId: string) => {
    if (matched.has(pairId)) return;
    setMessage("");
    if (selectedLeft === pairId) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(pairId);
  };

  const handleRight = (pairId: string) => {
    if (!selectedLeft || matched.has(pairId)) return;
    if (selectedLeft === pairId) {
      const next = new Set(matched);
      next.add(pairId);
      setMatched(next);
      setSelectedLeft(null);
      setMessage("");
      setLastMatchedId(pairId);
      if (next.size === payload.pairs.length) onComplete();
    } else {
      setWrongFlash(true);
      setMessage(game.hint ?? "Eşleşmedi. Sol kartı tekrar seçip dene.");
      setSelectedLeft(null);
    }
  };

  const matchedCount = matched.size;
  const total = payload.pairs.length;

  return (
    <div className="mini-game match-pairs-game">
      <p className="mini-game-progress-label">
        Eşleşme: {matchedCount}/{total}
      </p>
      <div className={`match-pairs-grid ${wrongFlash ? "match-pairs-shake" : ""}`}>
        <div className="mini-game-grid match-pairs-column">
          <p className="match-column-title">Kavram</p>
          {payload.pairs.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`mini-game-btn ${matched.has(item.id) ? "correct match-pair-success" : ""} ${selectedLeft === item.id ? "active" : ""} ${lastMatchedId === item.id ? "match-pair-pop" : ""}`}
              disabled={matched.has(item.id)}
              onClick={() => handleLeft(item.id)}
            >
              {item.left}
            </button>
          ))}
        </div>
        <div className="mini-game-grid match-pairs-column">
          <p className="match-column-title">Anlam</p>
          {rightItems.map((item) => (
            <button
              key={`r-${item.id}`}
              type="button"
              className={`mini-game-btn ${matched.has(item.id) ? "correct match-pair-success" : ""} ${lastMatchedId === item.id ? "match-pair-pop" : ""}`}
              disabled={matched.has(item.id)}
              onClick={() => handleRight(item.id)}
            >
              {item.right}
            </button>
          ))}
        </div>
      </div>
      {message && <p className="mini-game-result error">{message}</p>}
    </div>
  );
}

export default MatchPairsGame;
