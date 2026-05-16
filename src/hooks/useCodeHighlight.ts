import { useContext } from "react";
import { CodeHighlightContext } from "../contexts/codeHighlightContext";

export function useCodeHighlight() {
  const ctx = useContext(CodeHighlightContext);
  if (!ctx) {
    return {
      activeSymbol: null,
      activeSampleIndex: null,
      setHighlight: () => undefined,
    };
  }
  return ctx;
}
