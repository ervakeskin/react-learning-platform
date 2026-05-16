export interface LineExplanation {
  /** Kodda geçen sembol: super(props), useState, componentDidMount */
  symbol: string;
  explanation: string;
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  filename?: string;
  description: string;
  walkthroughSteps: string[];
  expectedOutcome?: string;
  lineExplanations?: LineExplanation[];
}

/** Tanım: her eleman tam bir cümle */
export interface W3Definition {
  sentences: [string, string];
}

export interface LearningMaterial {
  id: string;
  title: string;
  kind: "theory" | "rule" | "tip" | "warning" | "resource";
  content: string;
}

export type LessonSectionKind = "definition" | "example" | "example-explained";

/** @deprecated Use LessonSection in primarySections */
export interface ContentBlock {
  id: string;
  heading: string;
  paragraphs: string[];
  sectionKind?: LessonSectionKind;
  codeSampleIndex?: number;
  explainedGroupHeading?: string;
  linkedCodeSampleIndex?: number;
  subheadingLevel?: 2 | 3;
}

export interface LessonSection {
  id: string;
  heading: string;
  paragraphs: string[];
  codeSampleIndex?: number;
  sectionKind?: LessonSectionKind;
  explainedGroupHeading?: string;
  linkedCodeSampleIndex?: number;
  subheadingLevel?: 2 | 3;
}

export interface LessonSupplementary {
  learningGoals: string[];
  codingNotes: string[];
  rules: string[];
  commonMistakes: string[];
  deepDiveNotes: string[];
  advancedTechnicalDetail: string[];
  antiPatterns: string[];
  materials: LearningMaterial[];
  realWorldScenario: string;
  syntaxSignature?: string;
  syntaxParameters?: SyntaxParameter[];
}

export interface SyntaxParameter {
  name: string;
  description: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export type QuizQuestionKind = "kavram" | "kod" | "senaryo";

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  codeContext?: string;
  kind?: QuizQuestionKind;
}

export type MiniGameType =
  | "match-pairs"
  | "order-steps"
  | "spot-the-bug"
  | "fill-blank"
  | "true-false-sprint";

export interface MatchPairItem {
  id: string;
  left: string;
  right: string;
}

export interface MatchPairsPayload {
  pairs: MatchPairItem[];
  shuffleRight?: boolean;
}

export interface OrderStepItem {
  id: string;
  label: string;
}

export interface OrderStepsPayload {
  steps: OrderStepItem[];
  correctOrder: string[];
}

export interface SpotTheBugPayload {
  code: string;
  lines: { lineNumber: number; text: string }[];
  buggyLineNumber: number;
  explanation: string;
}

export interface FillBlankPayload {
  template: string;
  blanks: { id: string; answer: string; options: string[] }[];
}

export interface TrueFalseItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface TrueFalseSprintPayload {
  items: TrueFalseItem[];
}

export type MiniGamePayload =
  | MatchPairsPayload
  | OrderStepsPayload
  | SpotTheBugPayload
  | FillBlankPayload
  | TrueFalseSprintPayload;

export interface LessonMiniGame {
  id: string;
  title: string;
  intro: string;
  type: MiniGameType;
  timeLimitSec?: number;
  payload: MiniGamePayload;
  successMessage: string;
  hint?: string;
}

export type LessonDifficulty = "baslangic" | "orta" | "ileri";

export interface LessonContent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  w3schoolsRef?: string;
  difficulty?: LessonDifficulty;
  estimatedMinutes?: number;
  primarySections?: LessonSection[];
  supplementary?: LessonSupplementary;
  exercisePrompt?: string;
  practiceTask: string;
  codeSamples: CodeExample[];
  quizQuestions: QuizQuestion[];
  miniGame?: LessonMiniGame;
  /** Legacy field — migrated to primarySections */
  contentBlocks?: ContentBlock[];
  codingNotes?: string[];
  rules?: string[];
  commonMistakes?: string[];
  learningGoals?: string[];
  realWorldScenario?: string;
  deepDiveNotes?: string[];
  antiPatterns?: string[];
  syntaxSignature?: string;
  syntaxParameters?: SyntaxParameter[];
  advancedTechnicalDetail?: string[];
  materials?: LearningMaterial[];
}

export interface TopicGroup {
  id: string;
  title: string;
  description: string;
  topics: LessonContent[];
}

export interface TutorialCategory {
  id: string;
  title: string;
  description: string;
  groups: TopicGroup[];
}

export interface ExampleProject {
  id: string;
  title: string;
  level: "Baslangic" | "Orta" | "Ileri";
  duration: string;
  projectTopic: string;
  summary: string;
  whatYouBuild: string;
  outcomes: string[];
  techFocus: string[];
  steps: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
  validationChecklist: string[];
  solutionNotes: string[];
  solutionCode: CodeExample;
}

export interface ReactCourseContent {
  title: string;
  subtitle: string;
  categories: TutorialCategory[];
  projectsByTopicId: Record<string, ExampleProject[]>;
}

export interface FlatTopicRef {
  categoryIndex: number;
  groupIndex: number;
  topicIndex: number;
  topicId: string;
  slug: string;
}
