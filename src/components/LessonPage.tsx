import type { ExampleProject, LessonContent } from "../types";
import { CodeHighlightProvider } from "../contexts/CodeHighlightProvider";
import { useLessonMeta } from "../hooks/useLessonMeta";
import InteractiveLab from "./InteractiveLab";
import LessonExtras from "./LessonExtras";
import LessonNav from "./LessonNav";
import LessonSection from "./LessonSection";
import MiniGameHub from "./games/MiniGameHub";
import PracticeBox from "./PracticeBox";
import ProjectsShowcase from "./ProjectsShowcase";

interface LessonPageProps {
  lesson: LessonContent;
  categoryTitle: string;
  groupTitle: string;
  projects: ExampleProject[];
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  progressLabel: string;
}

function LessonPage({
  lesson,
  categoryTitle,
  groupTitle,
  projects,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  progressLabel,
}: LessonPageProps) {
  useLessonMeta(lesson.slug, lesson.title, lesson.summary);

  const sections = lesson.primarySections ?? [];

  return (
    <article className="lesson-page">
      <p className="breadcrumb">
        {categoryTitle} / {groupTitle}
      </p>
      <header className="lesson-header">
        <h1>{lesson.title}</h1>
        <p className="lesson-summary">{lesson.summary}</p>
        <p className="lesson-meta">
          {progressLabel} · ~{lesson.estimatedMinutes ?? 25} dk ·{" "}
          <span className={`difficulty difficulty-${lesson.difficulty ?? "orta"}`}>
            {lesson.difficulty ?? "orta"}
          </span>
          {!lesson.miniGame && (
            <span className="lesson-read-only-badge"> · Okuma + quiz/lab</span>
          )}
        </p>
      </header>

      <LessonNav
        position="top"
        onPrevious={onPrevious}
        onNext={onNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />

      <CodeHighlightProvider>
        <div className="lesson-body">
          {sections.map((section) => (
            <LessonSection
              key={section.id}
              section={section}
              codeSamples={lesson.codeSamples}
              lessonSlug={lesson.slug}
            />
          ))}
        </div>
      </CodeHighlightProvider>

      <PracticeBox practiceTask={lesson.practiceTask} exercisePrompt={lesson.exercisePrompt} />

      <InteractiveLab key={`lab-${lesson.slug}`} lesson={lesson} questions={lesson.quizQuestions} />

      {lesson.miniGame && (
        <MiniGameHub key={`game-${lesson.slug}`} lesson={lesson} game={lesson.miniGame} />
      )}

      <ProjectsShowcase key={`project-${lesson.id}`} topicTitle={lesson.title} projects={projects} />

      <LessonExtras lesson={lesson} />

      <LessonNav
        position="bottom"
        onPrevious={onPrevious}
        onNext={onNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </article>
  );
}

export default LessonPage;
