import type { CodeExample } from "../../types";

const ROOT = `import { createRoot } from "react-dom/client";\n\n`;

function sample(
  title: string,
  filename: string,
  description: string,
  code: string,
  walkthrough: string[],
  outcome: string,
): CodeExample {
  return {
    title,
    language: "tsx",
    filename,
    description,
    walkthroughSteps: walkthrough,
    expectedOutcome: outcome,
    code,
    lineExplanations: [],
  };
}

function trio(
  slug: string,
  label: string,
  snippet: string,
): CodeExample[] {
  return [
    sample(
      `${label} — temel`,
      `${slug}-basic.tsx`,
      `${label} konusunda minimal çalışan örnek.`,
      `${ROOT}${snippet}\n\ncreateRoot(document.getElementById("root")!).render(<App />);`,
      ["Bileşen tanımını oku.", "createRoot ile mount et.", "Tarayıcıda sonucu doğrula."],
      "Ekranda beklenen UI görünür.",
    ),
    sample(
      `${label} — props/state`,
      `${slug}-state.tsx`,
      "Konuya özgü küçük etkileşim veya veri akışı.",
      `${ROOT}import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("${label}");
  return (
    <button type="button" onClick={() => setMsg(msg + "!")}>
      {msg}
    </button>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`,
      ["useState ile başlangıç değeri.", "onClick ile güncelleme.", "JSX'te state gösterimi."],
      "Tıklayınca metin güncellenir.",
    ),
    sample(
      `${label} — liste/kompozisyon`,
      `${slug}-list.tsx`,
      "map ve key ile küçük liste render.",
      `${ROOT}const items = ["${label}", "Quiz", "Proje"];

function App() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`,
      ["map ile JSX üret.", "key prop kullan.", "createRoot mount."],
      "Liste maddeleri görünür.",
    ),
  ];
}

export const extraSlugCodeSamples: Record<string, CodeExample[]> = {
  "react-intro": trio("intro", "React Giriş", `function App() { return <h1>Merhaba React</h1>; }`),
  "react-get-started": trio("start", "Kurulum", `function App() { return <p>Vite + React hazır</p>; }`),
  "react-first-app": trio("first", "İlk Uygulama", `function App() { return <main><h1>İlk app</h1></main>; }`),
  "react-useeffect": trio(
    "effect",
    "useEffect",
    `import { useEffect, useState } from "react";
function App() {
  const [n, setN] = useState(0);
  useEffect(() => { document.title = String(n); }, [n]);
  return <button type="button" onClick={() => setN(n + 1)}>{n}</button>;
}`,
  ),
  "react-usecontext": trio(
    "ctx",
    "useContext",
    `import { createContext, useContext } from "react";
const ThemeCtx = createContext("light");
function App() {
  const theme = useContext(ThemeCtx);
  return <p>Tema: {theme}</p>;
}`,
  ),
  "react-usereducer": trio(
    "reducer",
    "useReducer",
    `import { useReducer } from "react";
function reducer(s: number, a: { type: "inc" }) {
  return a.type === "inc" ? s + 1 : s;
}
function App() {
  const [n, dispatch] = useReducer(reducer, 0);
  return <button type="button" onClick={() => dispatch({ type: "inc" })}>{n}</button>;
}`,
  ),
  "react-forms": trio(
    "forms",
    "Form",
    `import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}`,
  ),
  "react-router": trio("router", "Router", `function App() { return <p>Route eşlemesi burada</p>; }`),
  "react-events": trio(
    "events",
    "Events",
    `function App() {
  return <button type="button" onClick={() => alert("Tık")}>Tıkla</button>;
}`,
  ),
  "react-lists": trio(
    "lists",
    "Lists",
    `function App() {
  return <ul>{["A", "B"].map((x) => <li key={x}>{x}</li>)}</ul>;
}`,
  ),
  "react-components": trio("comp", "Components", `function Card() { return <article>Kart</article>; }
function App() { return <Card />; }`),
  "react-memo": trio(
    "memo",
    "Memo",
    `import { memo } from "react";
const Row = memo(function Row({ label }: { label: string }) {
  return <p>{label}</p>;
});
function App() { return <Row label="Hızlı" />; }`,
  ),
  "react-conditionals": trio(
    "cond",
    "Conditionals",
    `function App() {
  const ok = true;
  return ok ? <p>Açık</p> : <p>Kapalı</p>;
}`,
  ),
  "react-es6-array-map": trio(
    "es6map",
    "ES6 map",
    `const nums = [1, 2, 3].map((n) => n * 2);
function App() { return <p>{nums.join(", ")}</p>; }`,
  ),
  "react-props": trio(
    "props",
    "Props",
    `function Greet({ name }: { name: string }) { return <h2>Merhaba {name}</h2>; }
function App() { return <Greet name="Ada" />; }`,
  ),
  "react-props-destructuring": trio(
    "propsd",
    "Props destructuring",
    `function User({ name, age }: { name: string; age: number }) {
  return <p>{name} — {age}</p>;
}
function App() { return <User name="Ada" age={20} />; }`,
  ),
};
