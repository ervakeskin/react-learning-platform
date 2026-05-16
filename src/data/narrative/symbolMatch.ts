/** Regex-safe escape for symbol literals */
export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const SHORT_CONTEXT_SYMBOLS = new Set(["props", "ref", "state", "render"]);

function isCompoundSymbol(symbol: string): boolean {
  return /[.(]|\s/.test(symbol);
}

/** props in id="props-id" must not match */
function propsExistsInCode(code: string): boolean {
  if (/\bthis\.props\b/.test(code)) return true;
  if (/\(\s*props\s*[,:)]/.test(code)) return true;
  if (/\bprops\s*\./.test(code)) return true;
  if (/\{\s*props\s*\}/.test(code)) return true;
  if (/\bprops\s*:/.test(code)) return true;
  const re = /\bprops\b/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    const next = code[match.index + match[0].length];
    if (next === "-" || next === "_") continue;
    const prev = code.slice(Math.max(0, match.index - 12), match.index);
    if (/["'`]\s*$/.test(prev)) continue;
    return true;
  }
  return false;
}

function wordBoundaryMatch(code: string, symbol: string): boolean {
  const escaped = escapeRegex(symbol);
  return new RegExp(`\\b${escaped}\\b`).test(code);
}

/** Whether symbol appears in code with boundary / context safety */
export function symbolExistsInCode(code: string, symbol: string): boolean {
  const trimmed = symbol.trim();
  if (!trimmed) return false;

  if (trimmed === "props") return propsExistsInCode(code);

  if (isCompoundSymbol(trimmed)) {
    const flexible = escapeRegex(trimmed).replace(/\s+/g, "\\s*");
    return new RegExp(flexible).test(code);
  }

  if (SHORT_CONTEXT_SYMBOLS.has(trimmed)) {
    if (trimmed === "render" && /\brender\s*\(/.test(code)) return true;
    if (trimmed === "state" && /\bthis\.state\b/.test(code)) return true;
    if (trimmed === "ref" && /\buseRef\b/.test(code)) return true;
    return wordBoundaryMatch(code, trimmed);
  }

  return wordBoundaryMatch(code, trimmed);
}

export interface SymbolRange {
  start: number;
  end: number;
  symbol: string;
}

function findCompoundRanges(code: string, symbol: string): SymbolRange[] {
  const flexible = escapeRegex(symbol.trim()).replace(/\s+/g, "\\s*");
  const re = new RegExp(flexible, "g");
  const ranges: SymbolRange[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    ranges.push({ start: match.index, end: match.index + match[0].length, symbol });
  }
  return ranges;
}

function findWordRanges(code: string, symbol: string): SymbolRange[] {
  const escaped = escapeRegex(symbol);
  const re = new RegExp(`\\b${escaped}\\b`, "g");
  const ranges: SymbolRange[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    if (symbol === "props") {
      const next = code[match.index + match[0].length];
      if (next === "-" || next === "_") continue;
    }
    ranges.push({ start: match.index, end: match.index + match[0].length, symbol });
  }
  return ranges;
}

/** All highlight ranges for a symbol in code */
export function findSymbolRanges(code: string, symbol: string): SymbolRange[] {
  if (!symbolExistsInCode(code, symbol)) return [];
  if (isCompoundSymbol(symbol)) return findCompoundRanges(code, symbol);
  return findWordRanges(code, symbol);
}

/** Terms in code not covered by any explanation symbol */
export function getMissingKeywords(
  code: string,
  explanations: { symbol: string }[],
  requiredTerms: string[],
): string[] {
  const missing: string[] = [];

  for (const exp of explanations) {
    if (!symbolExistsInCode(code, exp.symbol)) {
      missing.push(`[geçersiz sembol] ${exp.symbol}`);
    }
  }

  for (const term of requiredTerms) {
    if (!symbolExistsInCode(code, term)) continue;
    const covered = explanations.some(
      (e) =>
        e.symbol === term ||
        e.symbol.includes(term) ||
        term.includes(e.symbol) ||
        (symbolExistsInCode(code, e.symbol) && e.symbol.replace(/\s/g, "") === term.replace(/\s/g, "")),
    );
    if (!covered) missing.push(term);
  }

  return [...new Set(missing)];
}
