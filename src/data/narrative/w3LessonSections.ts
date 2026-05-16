import type { CodeExample, ContentBlock, W3Definition } from "../../types";
import type { TopicFocus } from "../assessments/focusDetect";
import { getPedagogyCopy } from "./pedagogyBlocks";
import {
  DEFINITION_MAX_CHARS,
  DEFINITION_MIN_CHARS,
  exampleHeading,
  explainedHeading,
  LIFECYCLE_GROUP_HEADING,
} from "./w3Constants";

function block(
  id: string,
  heading: string,
  paragraphs: string[],
  extra: Partial<ContentBlock> = {},
): ContentBlock {
  return { id, heading, paragraphs, ...extra };
}

function interpolate(template: string, title: string): string {
  return template.replace(/\{title\}/g, title);
}

/** focusCopy.whatIs → tam 2 cümle */
export function buildDefinitionSentences(title: string, slug: string, focus: TopicFocus): W3Definition {
  if (slug === "react-home") {
    return {
      sentences: [
        "Bu platform, React ve TypeScript konularını sıralı dersler, kod örnekleri, quiz ve laboratuvarla öğreten etkileşimli bir çalışma alanıdır.",
        "Her ders iki cümlelik tanım, üç tam kod örneği ve her örneğe bağlı satır satır açıklama iskeletiyle ilerler.",
      ],
    };
  }

  const copy = getPedagogyCopy(title, slug, focus);
  const raw = copy.whatIs.map((s) => interpolate(s, title));

  if (raw.length >= 2) {
    return { sentences: [raw[0], raw[1]] };
  }

  const first = raw[0] ?? `${title} React uygulamasında kullanılan temel bir yapı taşıdır.`;
  const second =
    copy.howItWorks[0]?.replace(/\{title\}/g, title) ??
    "Bileşen ağacında veri akışı ve render döngüsüyle birlikte çalışır; küçük çalışan örnek kurmak en hızlı öğrenme yoludur.";

  return { sentences: [first, second] };
}

export function buildW3ContentBlocks(
  title: string,
  slug: string,
  focus: TopicFocus,
  codeSamples: CodeExample[],
): ContentBlock[] {
  const def = buildDefinitionSentences(title, slug, focus);
  const blocks: ContentBlock[] = [
    block(`${slug}-def`, title, [...def.sentences], {
      sectionKind: "definition",
      subheadingLevel: 2,
    }),
  ];

  const count = Math.min(3, codeSamples.length);
  for (let i = 0; i < count; i++) {
    blocks.push(
      block(`${slug}-ex-${i}`, exampleHeading(i), [], {
        sectionKind: "example",
        codeSampleIndex: i,
        subheadingLevel: 3,
      }),
    );

    const explainedExtra: Partial<ContentBlock> = {
      sectionKind: "example-explained",
      linkedCodeSampleIndex: i,
      subheadingLevel: 3,
    };

    if (slug === "react-class" && i === 2) {
      explainedExtra.explainedGroupHeading = LIFECYCLE_GROUP_HEADING;
    }

    blocks.push(
      block(`${slug}-expl-${i}`, explainedHeading(i), [], explainedExtra),
    );
  }

  return blocks;
}

export function validateDefinitionSentences(sentences: string[]): string[] {
  const issues: string[] = [];
  if (sentences.length !== 2) {
    issues.push(`tanım ${sentences.length} cümle (2 olmalı)`);
    return issues;
  }
  for (const [i, s] of sentences.entries()) {
    const len = s.trim().length;
    if (len < DEFINITION_MIN_CHARS || len > DEFINITION_MAX_CHARS) {
      issues.push(`tanım cümle ${i + 1} uzunluk ${len} (${DEFINITION_MIN_CHARS}–${DEFINITION_MAX_CHARS})`);
    }
  }
  return issues;
}
