export const EXAMPLE_HEADING = "Örnek";
export const EXPLAINED_HEADING = "Örnek Açıklaması";
export const LIFECYCLE_GROUP_HEADING = "Lifecycle (Yaşam Döngüsü)";

export const DEFINITION_MIN_CHARS = 40;
export const DEFINITION_MAX_CHARS = 320;

export const META_LANGUAGE =
  /şimdi\s+bu\s+konuyu|harika\s+bir\s+konu|react\s+dünyasında|inceleyelim|geldi(?:n|k)?\s*$/i;

export const GENERIC_EXPLANATION =
  /^bu\s+kod\s+bir\s+.+\s+oluşturur\.?$/i;

export const HISTORY_FIRST =
  /React\s+16\.8\s+öncesinde|Hooks\s+öncesi|öncesinde\s+state|eskiden\s+temel\s+yaklaşım|16\.8\s+öncesi/i;

export const ASSERTIVE_ENDING =
  /\b\w*(dır|dir|dur|dür|tur|tür|yapısıdır|yöntemidir|katmanıdır|bileşenidir|sınıfıdır|hook'udur|hookudur|desenidir|alanıdır|kütüphanesidir)\b/i;

export function exampleHeading(index: number): string {
  return index === 0 ? EXAMPLE_HEADING : `${EXAMPLE_HEADING} (${index + 1})`;
}

export function explainedHeading(index: number): string {
  return index === 0 ? EXPLAINED_HEADING : `${EXPLAINED_HEADING} (${index + 1})`;
}
