interface LessonNavProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  position?: "top" | "bottom";
}

function LessonNav({ onPrevious, onNext, hasPrevious, hasNext, position = "top" }: LessonNavProps) {
  return (
    <nav className={`lesson-nav-bar lesson-nav-${position}`} aria-label="Ders navigasyonu">
      <button type="button" className="lesson-nav-link" onClick={onPrevious} disabled={!hasPrevious}>
        ← Önceki Ders
      </button>
      <button type="button" className="lesson-nav-link lesson-nav-next" onClick={onNext} disabled={!hasNext}>
        Sonraki Ders →
      </button>
    </nav>
  );
}

export default LessonNav;
