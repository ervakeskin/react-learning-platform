import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CodeHighlightContext } from "./codeHighlightContext";

export function CodeHighlightProvider({ children }: { children: ReactNode }) {
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [activeSampleIndex, setActiveSampleIndex] = useState<number | null>(null);

  const setHighlight = useCallback((sampleIndex: number, symbol: string | null) => {
    setActiveSampleIndex(symbol === null ? null : sampleIndex);
    setActiveSymbol(symbol);
  }, []);

  const value = useMemo(
    () => ({ activeSymbol, activeSampleIndex, setHighlight }),
    [activeSymbol, activeSampleIndex, setHighlight],
  );

  return (
    <CodeHighlightContext.Provider value={value}>{children}</CodeHighlightContext.Provider>
  );
}
