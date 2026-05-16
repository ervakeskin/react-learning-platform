import type { ContentBlock, LessonContent, LessonSection, LessonSupplementary } from "../types";

export function w3BlocksToSections(blocks: ContentBlock[]): LessonSection[] {
  return blocks.map((block) => ({
    id: block.id,
    heading: block.heading,
    paragraphs: block.paragraphs,
    codeSampleIndex: block.codeSampleIndex,
    sectionKind: block.sectionKind,
    explainedGroupHeading: block.explainedGroupHeading,
    linkedCodeSampleIndex: block.linkedCodeSampleIndex,
    subheadingLevel: block.subheadingLevel,
  }));
}

export function blocksToSections(blocks: ContentBlock[]): LessonSection[] {
  if (blocks[0]?.sectionKind === "definition") {
    return w3BlocksToSections(blocks);
  }
  return blocks.map((block, index) => ({
    id: block.id,
    heading: block.heading,
    paragraphs: block.paragraphs,
    codeSampleIndex: index < 4 ? index : undefined,
  }));
}

export function migrateLesson(lesson: LessonContent): LessonContent {
  const primarySections =
    lesson.primarySections && lesson.primarySections.length > 0
      ? lesson.primarySections
      : blocksToSections(lesson.contentBlocks ?? []);

  const supplementary: LessonSupplementary = lesson.supplementary ?? {
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

  return {
    ...lesson,
    primarySections,
    supplementary,
    difficulty: lesson.difficulty ?? "orta",
    estimatedMinutes: lesson.estimatedMinutes ?? 25,
    w3schoolsRef: lesson.w3schoolsRef,
  };
}

const genericHeadings = new Set([
  "Giriş ve Kavramsal Tanım",
  "Neden Kullanılır?",
  "Sentaks ve Parametreler",
  "Kıyaslamalı Örnekleme",
  "Gerçek Hayat Senaryosu",
  "İleri Seviye Teknik Detay",
  "Soru / Egzersiz",
  "Bu nedir?",
  "Nasıl çalışır?",
  "Temel sözdizimi",
  "Sözlü örnek",
  "Sık hatalar",
]);

export function normalizeLesson(lesson: LessonContent): LessonContent {
  const migrated = migrateLesson(lesson);
  const isW3 = migrated.primarySections?.[0]?.sectionKind === "definition";

  const baseSections = migrated.primarySections ?? [];
  const filteredSections = isW3
    ? baseSections
    : baseSections.filter((section) => !genericHeadings.has(section.heading));

  const sectionsWithCode = (filteredSections.length > 0 ? filteredSections : baseSections).map(
    (section) => ({
      ...section,
      codeSampleIndex:
        section.sectionKind === "example" ? section.codeSampleIndex : undefined,
    }),
  );

  return {
    ...migrated,
    primarySections: sectionsWithCode,
    codeSamples: migrated.codeSamples,
    quizQuestions: migrated.quizQuestions,
  };
}
