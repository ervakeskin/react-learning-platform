export type TopicFocus =
  | "core"
  | "classComponent"
  | "es6"
  | "jsx"
  | "hooks"
  | "router"
  | "forms"
  | "props"
  | "events"
  | "lists"
  | "conditionals"
  | "styling"
  | "portals"
  | "suspense"
  | "transitions"
  | "refs"
  | "architecture"
  | "compiler"
  | "assessment"
  | "interview"
  | "roadmap";

export function detectFocus(title: string, slug?: string): TopicFocus {
  const lower = title.toLowerCase();
  const slugLower = slug?.toLowerCase() ?? "";

  if (slugLower === "react-class" || lower === "react class") return "classComponent";
  if (lower.includes("es6") || slugLower.includes("es6")) return "es6";
  if (lower.includes("memo") && !lower.includes("usememo")) return "hooks";
  if (lower.includes("jsx")) return "jsx";
  if (lower.includes("hook") || lower.startsWith("react use") || lower.includes("usestate") || lower.includes("useeffect")) return "hooks";
  if (lower.includes("router")) return "router";
  if (
    lower.includes("form") ||
    lower.includes("input") ||
    lower.includes("checkbox") ||
    lower.includes("radio") ||
    lower.includes("textarea") ||
    lower.includes("select")
  )
    return "forms";
  if (lower.includes("props")) return "props";
  if (lower.includes("event")) return "events";
  if (lower.includes("list")) return "lists";
  if (lower.includes("condition")) return "conditionals";
  if (lower.includes("css") || lower.includes("sass")) return "styling";
  if (lower.includes("portal")) return "portals";
  if (lower.includes("suspense")) return "suspense";
  if (lower.includes("transition")) return "transitions";
  if (lower.includes("forward ref") || lower.includes("ref")) return "refs";
  if (lower.includes("hoc")) return "architecture";
  if (lower.includes("compiler")) return "compiler";
  if (lower.includes("quiz") || lower.includes("exercise")) return "assessment";
  if (lower.includes("interview")) return "interview";
  if (lower.includes("bootcamp") || lower.includes("study") || lower.includes("syllabus")) return "roadmap";
  return "core";
}
