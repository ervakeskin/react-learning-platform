import type { LessonContent, LessonSection } from "../types";
import { detectFocus } from "./assessments/focusDetect";
import { getRequiredTermsForSample } from "./narrative/explainCode";
import { getMissingKeywords } from "./narrative/symbolMatch";
import {
  ASSERTIVE_ENDING,
  EXAMPLE_HEADING,
  EXPLAINED_HEADING,
  GENERIC_EXPLANATION,
  HISTORY_FIRST,
  META_LANGUAGE,
} from "./narrative/w3Constants";
import { validateDefinitionSentences } from "./narrative/w3LessonSections";

/** Hoca sunumu / ders yayın öncesi kalite kontrol listesi */
export const lessonQualityChecklist = [
  "W3Schools referans URL (w3schoolsRef) tanımlı",
  "W3 iskelet: tanım (2 cümle) + 3×(Örnek + Örnek Açıklaması)",
  "En az 3 çalışır TSX kod örneği (createRoot / React 19)",
  "Her kod örneğinde lineExplanations ve anahtar kelime kapsamı",
  "Quiz: 3+ soru, her biri explanation içerir",
  "practiceTask somut ve teslim edilebilir",
] as const;

function sectionsFromLesson(lesson: LessonContent): LessonSection[] {
  if (lesson.primarySections?.length) return lesson.primarySections;
  return (lesson.contentBlocks ?? []).map((b) => ({
    id: b.id,
    heading: b.heading,
    paragraphs: b.paragraphs,
    sectionKind: b.sectionKind,
    codeSampleIndex: b.codeSampleIndex,
    explainedGroupHeading: b.explainedGroupHeading,
    linkedCodeSampleIndex: b.linkedCodeSampleIndex,
    subheadingLevel: b.subheadingLevel,
  }));
}

function isExampleHeading(h: string): boolean {
  return h === EXAMPLE_HEADING || h.startsWith(`${EXAMPLE_HEADING} (`);
}

function isExplainedHeading(h: string): boolean {
  return h === EXPLAINED_HEADING || h.startsWith(`${EXPLAINED_HEADING} (`);
}

export function validateW3LessonStructure(lesson: LessonContent): string[] {
  const issues: string[] = [];
  const sections = sectionsFromLesson(lesson);

  if (sections.length === 0) {
    issues.push(`${lesson.slug}: içerik bölümü yok`);
    return issues;
  }

  const def = sections[0];
  if (def.sectionKind !== "definition") {
    issues.push(`${lesson.slug}: ilk bölüm definition olmalı`);
  }
  if (def.heading !== lesson.title) {
    issues.push(`${lesson.slug}: tanım başlığı ders adıyla eşleşmeli`);
  }
  if (def.paragraphs.length !== 2) {
    issues.push(`${lesson.slug}: tanım tam 2 paragraf/cümle olmalı (şu an: ${def.paragraphs.length})`);
  } else {
    for (const msg of validateDefinitionSentences(def.paragraphs)) {
      issues.push(`${lesson.slug}: ${msg}`);
    }
    for (const [i, p] of def.paragraphs.entries()) {
      if (HISTORY_FIRST.test(p)) {
        issues.push(`${lesson.slug}: tanım cümle ${i + 1} tarihçe içeriyor`);
      }
      if (META_LANGUAGE.test(p)) {
        issues.push(`${lesson.slug}: tanım cümle ${i + 1} meta-dil içeriyor`);
      }
      if (i === 0 && !ASSERTIVE_ENDING.test(p)) {
        issues.push(`${lesson.slug}: tanım ilk cümlesi assertive bitmeli (-dır/-dir vb.)`);
      }
    }
  }

  let exampleCount = 0;
  let explainedCount = 0;

  for (let i = 1; i < sections.length; i++) {
    const sec = sections[i];
    if (isExampleHeading(sec.heading)) {
      exampleCount++;
      if (sec.sectionKind !== "example") {
        issues.push(`${lesson.slug}: "${sec.heading}" example kind olmalı`);
      }
      if (sec.codeSampleIndex === undefined) {
        issues.push(`${lesson.slug}: "${sec.heading}" codeSampleIndex eksik`);
      }
      const next = sections[i + 1];
      if (!next || !isExplainedHeading(next.heading)) {
        issues.push(`${lesson.slug}: "${sec.heading}" sonrasında Örnek Açıklaması yok`);
      }
    } else if (isExplainedHeading(sec.heading)) {
      explainedCount++;
      if (sec.sectionKind !== "example-explained") {
        issues.push(`${lesson.slug}: "${sec.heading}" example-explained kind olmalı`);
      }
      const idx = sec.linkedCodeSampleIndex ?? explainedCount - 1;
      const sample = lesson.codeSamples[idx];
      if (!sample) {
        issues.push(`${lesson.slug}: açıklama #${idx + 1} için kod örneği yok`);
        continue;
      }
      if (!sample.lineExplanations?.length) {
        issues.push(`${lesson.slug}: örnek #${idx + 1} lineExplanations boş`);
      }
      for (const line of sample.lineExplanations ?? []) {
        if (GENERIC_EXPLANATION.test(line.explanation.trim())) {
          issues.push(`${lesson.slug}: jenerik açıklama — ${line.symbol}`);
        }
        if (META_LANGUAGE.test(line.explanation)) {
          issues.push(`${lesson.slug}: meta-dil açıklamada — ${line.symbol}`);
        }
      }
      const focus = detectFocus(lesson.title, lesson.slug);
      const required = getRequiredTermsForSample(sample.code, focus, lesson.title, lesson.slug);
      const missing = getMissingKeywords(sample.code, sample.lineExplanations ?? [], required);
      for (const m of missing) {
        issues.push(`${lesson.slug}: örnek #${idx + 1} eksik açıklama — ${m}`);
      }
    }
  }

  if (exampleCount !== 3) {
    issues.push(`${lesson.slug}: 3 Örnek bölümü olmalı (şu an: ${exampleCount})`);
  }
  if (explainedCount !== 3) {
    issues.push(`${lesson.slug}: 3 Örnek Açıklaması olmalı (şu an: ${explainedCount})`);
  }

  if (lesson.slug === "react-class") {
    const thirdExplained = sections.find(
      (s, i) => i > 0 && isExplainedHeading(s.heading) && s.linkedCodeSampleIndex === 2,
    ) ?? sections.filter((s) => isExplainedHeading(s.heading)).at(2);
    if (!thirdExplained?.explainedGroupHeading?.includes("Lifecycle")) {
      issues.push(`${lesson.slug}: 3. açıklamada Lifecycle alt başlığı eksik`);
    }
    const sample = lesson.codeSamples[2];
    if (sample) {
      const text = (sample.lineExplanations ?? []).map((l) => l.symbol).join(" ");
      if (!text.includes("componentDidMount") || !text.includes("componentWillUnmount")) {
        issues.push(`${lesson.slug}: 3. örnekte lifecycle terimleri açıklanmalı`);
      }
    }
  }

  return issues;
}

/** @deprecated use validateW3LessonStructure */
export function validatePedagogicalStructure(lesson: LessonContent): string[] {
  return validateW3LessonStructure(lesson);
}

export function validateLessonMetadata(lesson: {
  slug: string;
  w3schoolsRef?: string;
  codeSamples: { lineExplanations?: unknown[] }[];
  quizQuestions: unknown[];
  practiceTask: string;
}): string[] {
  const issues: string[] = [];
  if (!lesson.w3schoolsRef) issues.push(`${lesson.slug}: w3schoolsRef eksik`);
  if (lesson.codeSamples.length < 3) issues.push(`${lesson.slug}: kod örneği < 3`);
  if (lesson.quizQuestions.length < 3) issues.push(`${lesson.slug}: quiz < 3`);
  if (!lesson.practiceTask?.trim()) issues.push(`${lesson.slug}: practiceTask boş`);
  for (const [i, sample] of lesson.codeSamples.entries()) {
    if (!sample.lineExplanations?.length) {
      issues.push(`${lesson.slug}: kod örneği #${i + 1} lineExplanations eksik`);
    }
  }
  return issues;
}
