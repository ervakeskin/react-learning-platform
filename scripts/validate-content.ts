import { reactCourse } from "../src/data/course";
import { validateLessonMetadata, validateW3LessonStructure } from "../src/data/qualityRubric";
import { countLessonsWithGames } from "../src/data/miniGameCatalog";

const allLessons = reactCourse.categories.flatMap((c) =>
  c.groups.flatMap((g) => g.topics),
);

let issueCount = 0;
for (const lesson of allLessons) {
  const issues = [
    ...validateLessonMetadata(lesson),
    ...validateW3LessonStructure(lesson),
  ];
  for (const issue of issues) {
    console.error(issue);
    issueCount += 1;
  }
}

const gameCount = countLessonsWithGames(reactCourse);
console.log(`Ders sayısı: ${allLessons.length}`);
console.log(`Mini oyunlu ders: ${gameCount}/${allLessons.length}`);

if (issueCount > 0) {
  console.error(`\n${issueCount} kalite uyarısı bulundu.`);
  process.exit(1);
}

console.log("İçerik doğrulaması başarılı (0 kritik uyarı).");
