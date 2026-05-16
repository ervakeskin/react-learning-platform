import { useState } from "react";
import type { LessonContent, LessonMiniGame } from "../../types";
import { useProgress } from "../../hooks/useProgress";
import FillBlankGame from "./FillBlankGame";
import "./game.css";
import MatchPairsGame from "./MatchPairsGame";
import OrderStepsGame from "./OrderStepsGame";
import SpotTheBugGame from "./SpotTheBugGame";
import TrueFalseSprint from "./TrueFalseSprint";

interface MiniGameHubProps {
  lesson: LessonContent;
  game: LessonMiniGame;
}

function MiniGameHub({ lesson, game }: MiniGameHubProps) {
  const [completed, setCompleted] = useState(false);
  const [xp, setXp] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const { finishGameSession } = useProgress();

  const onComplete = () => {
    setCompleted(true);
    setXp(10);
    finishGameSession(lesson, `${lesson.slug}:${game.id}`);
  };

  const replay = () => {
    setCompleted(false);
    setXp(0);
    setPlayKey((k) => k + 1);
  };

  const gameKey = `${lesson.slug}-${game.id}-${playKey}`;

  return (
    <section className="mini-game-hub container" aria-label="Mini oyun">
      <div className="mini-game-header-row">
        <div>
          <span className="mini-game-badge">Bonus level</span>
          <h3>{game.title}</h3>
        </div>
        {xp > 0 && <span className="mini-game-xp">+{xp} XP</span>}
      </div>
      <p className="mini-game-intro">{game.intro}</p>
      {!completed ? (
        <div key={gameKey}>
          {game.type === "match-pairs" && (
            <MatchPairsGame
              game={game}
              payload={game.payload as import("../../types").MatchPairsPayload}
              onComplete={onComplete}
            />
          )}
          {game.type === "order-steps" && (
            <OrderStepsGame
              game={game}
              payload={game.payload as import("../../types").OrderStepsPayload}
              onComplete={onComplete}
            />
          )}
          {game.type === "spot-the-bug" && (
            <SpotTheBugGame
              game={game}
              payload={game.payload as import("../../types").SpotTheBugPayload}
              onComplete={onComplete}
            />
          )}
          {game.type === "fill-blank" && (
            <FillBlankGame
              game={game}
              payload={game.payload as import("../../types").FillBlankPayload}
              onComplete={onComplete}
            />
          )}
          {game.type === "true-false-sprint" && (
            <TrueFalseSprint
              game={game}
              payload={game.payload as import("../../types").TrueFalseSprintPayload}
              onComplete={onComplete}
            />
          )}
        </div>
      ) : (
        <div className="mini-game-win-panel">
          <p className="mini-game-result success">{game.successMessage}</p>
          <p className="mini-game-win-sub">Konuyu kapattın — sonraki derse geçebilirsin.</p>
          <button type="button" className="secondary-btn hub-replay-btn" onClick={replay}>
            Yeniden oyna
          </button>
        </div>
      )}
    </section>
  );
}

export default MiniGameHub;
