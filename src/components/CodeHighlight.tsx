import { useMemo, type ReactNode } from "react";
import { findSymbolRanges, type SymbolRange } from "../data/narrative/symbolMatch";
import { useCodeHighlight } from "../hooks/useCodeHighlight";

interface CodeHighlightProps {
  code: string;
  sampleIndex: number;
}

function renderHighlightedCode(code: string, ranges: SymbolRange[]): ReactNode[] {
  if (ranges.length === 0) return [code];

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const range of sorted) {
    if (range.start < cursor) continue;
    if (range.start > cursor) {
      nodes.push(code.slice(cursor, range.start));
    }
    nodes.push(
      <mark key={`${range.start}-${range.symbol}`} className="code-token code-token--active">
        {code.slice(range.start, range.end)}
      </mark>,
    );
    cursor = range.end;
  }

  if (cursor < code.length) {
    nodes.push(code.slice(cursor));
  }

  return nodes;
}

function CodeHighlight({ code, sampleIndex }: CodeHighlightProps) {
  const { activeSymbol, activeSampleIndex } = useCodeHighlight();

  const ranges = useMemo(() => {
    if (activeSampleIndex !== sampleIndex || !activeSymbol) return [];
    return findSymbolRanges(code, activeSymbol);
  }, [code, sampleIndex, activeSymbol, activeSampleIndex]);

  return <code className="code-block-inline-code">{renderHighlightedCode(code, ranges)}</code>;
}

export default CodeHighlight;
