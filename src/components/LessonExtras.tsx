import type { LessonContent } from "../types";

interface LessonExtrasProps {
  lesson: LessonContent;
}

function LessonExtras({ lesson }: LessonExtrasProps) {
  const s = lesson.supplementary ?? {
    learningGoals: lesson.learningGoals ?? [],
    codingNotes: lesson.codingNotes ?? [],
    rules: lesson.rules ?? [],
    commonMistakes: lesson.commonMistakes ?? [],
    deepDiveNotes: lesson.deepDiveNotes ?? [],
    advancedTechnicalDetail: lesson.advancedTechnicalDetail ?? [],
    antiPatterns: lesson.antiPatterns ?? [],
    materials: lesson.materials ?? [],
    realWorldScenario: lesson.realWorldScenario ?? "",
    syntaxSignature: lesson.syntaxSignature,
    syntaxParameters: lesson.syntaxParameters,
  };

  return (
    <section className="lesson-extras container">
      <h3>Ekstra detaylar</h3>
      <p className="lesson-extras-intro">İleri okuma ve referans notları. Ana anlatımı bitirdikten sonra aç.</p>

      <details className="extras-panel">
        <summary>Öğrenme hedefleri ve kurallar</summary>
        <h4>Öğrenme hedefleri</h4>
        <ul>
          {s.learningGoals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Kodlama notları</h4>
        <ul>
          {s.codingNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Kurallar</h4>
        <ul>
          {s.rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details className="extras-panel">
        <summary>Yaygın hatalar ve anti-pattern</summary>
        <h4>Yaygın hatalar</h4>
        <ul>
          {s.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Anti-pattern uyarıları</h4>
        <ul>
          {s.antiPatterns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details className="extras-panel">
        <summary>Sentaks ve ileri teknik detay</summary>
        {s.syntaxSignature && (
          <p className="lesson-paragraph">
            <span className="pink-highlight">Sentaks:</span> <code>{s.syntaxSignature}</code>
          </p>
        )}
        <ul>
          {(s.syntaxParameters ?? []).map((item) => (
            <li key={`${item.name}-${item.description}`}>
              <span className="pink-highlight">{item.name}</span>: {item.description}
            </li>
          ))}
        </ul>
        <h4>Derinlemesine notlar</h4>
        <ul>
          {s.deepDiveNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>İleri seviye teknik detay</h4>
        <ul>
          {s.advancedTechnicalDetail.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details className="extras-panel">
        <summary>Gerçek dünya senaryosu ve materyaller</summary>
        <p className="lesson-paragraph">{s.realWorldScenario}</p>
        <ul className="materials-list">
          {s.materials.map((material) => (
            <li key={material.id} className={`material-item material-${material.kind}`}>
              <strong>{material.title}</strong>
              <p>{material.content}</p>
            </li>
          ))}
        </ul>
      </details>

      {lesson.w3schoolsRef && (
        <p className="w3s-ref">
          W3Schools referans:{" "}
          <a href={lesson.w3schoolsRef} target="_blank" rel="noreferrer">
            {lesson.w3schoolsRef}
          </a>
        </p>
      )}
    </section>
  );
}

export default LessonExtras;
