import { createContext } from "react";

export interface CodeHighlightContextValue {
  activeSymbol: string | null;
  activeSampleIndex: number | null;
  setHighlight: (sampleIndex: number, symbol: string | null) => void;
}

export const CodeHighlightContext = createContext<CodeHighlightContextValue | null>(null);
