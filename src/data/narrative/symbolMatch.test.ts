import { describe, expect, it } from "vitest";
import { getMissingKeywords, symbolExistsInCode } from "./symbolMatch";

describe("symbolExistsInCode", () => {
  it("does not match props inside props-id attribute", () => {
    const code = '<input id="props-id" name="props-id" />';
    expect(symbolExistsInCode(code, "props")).toBe(false);
  });

  it("matches this.props in class component", () => {
    const code = "const brand = this.props.brand;";
    expect(symbolExistsInCode(code, "props")).toBe(true);
    expect(symbolExistsInCode(code, "this.props")).toBe(true);
  });

  it("matches super(props) literally", () => {
    const code = "constructor(props) {\n  super(props);\n}";
    expect(symbolExistsInCode(code, "super(props)")).toBe(true);
  });
});

describe("getMissingKeywords", () => {
  it("reports missing explanation for code term", () => {
    const code = "const [n, setN] = useState(0);";
    const missing = getMissingKeywords(code, [], ["useState"]);
    expect(missing).toContain("useState");
  });
});
