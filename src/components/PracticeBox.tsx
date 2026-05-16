interface PracticeBoxProps {
  practiceTask: string;
  exercisePrompt?: string;
}

function PracticeBox({ practiceTask, exercisePrompt }: PracticeBoxProps) {
  return (
    <section className="practice-box">
      <h3>Dene</h3>
      <p>
        <strong>Mini görev:</strong> {practiceTask}
      </p>
      {exercisePrompt && (
        <p>
          <strong>Soru / egzersiz:</strong> {exercisePrompt}
        </p>
      )}
    </section>
  );
}

export default PracticeBox;
