import type { CodeExample } from "../../types";
import type { TopicFocus } from "../assessments/focusDetect";
import { getSyntaxTerms } from "./pedagogyBlocks";

const ROOT = `import { createRoot } from "react-dom/client";\n`;

function ex(
  title: string,
  filename: string,
  description: string,
  code: string,
  steps: string[],
  outcome: string,
): CodeExample {
  return {
    title,
    language: "tsx",
    filename,
    description,
    walkthroughSteps: steps,
    expectedOutcome: outcome,
    code,
    lineExplanations: [],
  };
}

function classComponentSamples(title: string, slug: string): CodeExample[] {
  const terms = getSyntaxTerms(title, slug, "classComponent");
  const termNote = terms.join(", ");

  const car = ex(
    `${title} — Car class (state + render)`,
    `${slug}-car-class.tsx`,
    `Temel sözdizimi terimleri kodda yorumlanır: ${termNote}.`,
    `${ROOT}
import React, { Component } from "react";

// extends React.Component — bileşen sınıfı
class Car extends Component {
  // constructor — ilk kurulum
  constructor(props: Record<string, never>) {
    // super(props) — üst sınıf zinciri
    super(props);
    // this.state — bileşen hafızası
    this.state = { brand: "Ford", color: "kırmızı", year: 2020 };
  }

  changeColor = () => {
    // this.setState — güncelleme + yeniden render
    this.setState({ color: "mavi" });
  };

  // render() — zorunlu JSX çıktısı
  render() {
    const { brand, color, year } = this.state;
    return (
      <section>
        <h1>{brand} ({year})</h1>
        <p style={{ color }}>Renk: {color}</p>
        <button type="button" onClick={this.changeColor}>Rengi değiştir</button>
      </section>
    );
  }
}

createRoot(document.getElementById("root")!).render(<Car />);`,
    [
      "extends React.Component ile sınıf bileşen tanımlanır.",
      "constructor + super(props) + this.state ile başlangıç state kurulur.",
      "render() JSX döndürür; setState tıklamada rengi günceller.",
    ],
    "Başlık, renk metni ve buton görünür; tıklanınca renk mavi olur.",
  );

  const garage = ex(
    `${title} — Garage (this.props)`,
    `${slug}-garage-props.tsx`,
    "Parent’tan gelen marka this.props ile okunur.",
    `${ROOT}
import React, { Component } from "react";

type GarageProps = { brand: string };

class Garage extends Component<GarageProps> {
  render() {
    // this.props — dışarıdan gelen veri
    const { brand } = this.props;
    return (
      <p>Garajda şu an: <strong>{brand}</strong></p>
    );
  }
}

function App() {
  return <Garage brand="Ford" />;
}

createRoot(document.getElementById("root")!).render(<App />);`,
    ["Garage props.brand okur.", "App üst bileşen brand verir.", "Child state değiştirmez."],
    "Ekranda ‘Garajda şu an: Ford’ görünür.",
  );

  const lifecycle = ex(
    `${title} — componentDidMount / WillUnmount`,
    `${slug}-lifecycle.tsx`,
    "Lifecycle metotları render dışında yan etki ve temizlik için kullanılır.",
    `${ROOT}
import React, { Component } from "react";

type State = { ticks: number };

class Timer extends Component<Record<string, never>, State> {
  private intervalId?: ReturnType<typeof setInterval>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { ticks: 0 };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((s) => ({ ticks: s.ticks + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  render() {
    return <p>Saniye: {this.state.ticks}</p>;
  }
}

createRoot(document.getElementById("root")!).render(<Timer />);`,
    [
      "componentDidMount interval başlatır.",
      "setState her saniye ticks artırır.",
      "componentWillUnmount interval temizler.",
    ],
    "Sayaç her saniye artar; bileşen kalkınca timer durur.",
  );

  return [car, garage, lifecycle];
}

/** Konu başlığına göre uzun, çalışır TSX örnekleri (createRoot dahil). */
export function getRichCodeSamples(title: string, slug: string, focus: TopicFocus): CodeExample[] {
  if (focus === "classComponent") return classComponentSamples(title, slug);

  const t = title.replace(/^React\s+/i, "");

  const starter = ex(
    `${title} — adım adım başlangıç`,
    `${slug}-starter.tsx`,
    "Tek dosyada mount, state ve kullanıcı etkileşimini bir arada gösteren tam örnek.",
    `${ROOT}
import { useState } from "react";

function LessonStarter() {
  const [note, setNote] = useState("${t} konusunu şimdi uyguluyorum");
  const [step, setStep] = useState(1);

  return (
    <main style={{ fontFamily: "system-ui", padding: "1.5rem", maxWidth: 640 }}>
      <h1>${title}</h1>
      <p>{note}</p>
      <p>Adım: {step} / 3</p>
      <button
        type="button"
        onClick={() => setStep((s) => Math.min(3, s + 1))}
      >
        Sonraki adım
      </button>
      <button type="button" onClick={() => setNote("Kod çalıştı — ${t} anlaşıldı")}>
        Notu güncelle
      </button>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<LessonStarter />);`,
    [
      "createRoot ile uygulama DOM’a bağlanır.",
      "useState ile metin ve adım sayısı tutulur.",
      "İki buton farklı setter’ları çağırır; UI anında güncellenir.",
    ],
    "Sayfada başlık, not ve adım sayısı görünür; butonlarla değişir.",
  );

  const workshop = ex(
    `${title} — mini atölye (liste + form)`,
    `${slug}-workshop.tsx`,
    "Gerçek derse yakın: kayıt listesi, ekleme formu ve özet satırı — yaklaşık 40 satır.",
    `${ROOT}
import { useMemo, useState } from "react";

type Entry = { id: number; label: string; done: boolean };

function LessonWorkshop() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, label: "${t} — ilk madde", done: false },
  ]);
  const [draft, setDraft] = useState("");

  const doneCount = useMemo(() => entries.filter((e) => e.done).length, [entries]);

  const addEntry = () => {
    const text = draft.trim();
    if (!text) return;
    setEntries((prev) => [...prev, { id: Date.now(), label: text, done: false }]);
    setDraft("");
  };

  const toggle = (id: number) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));

  return (
    <section style={{ padding: "1rem" }}>
      <h2>${title} atölyesi</h2>
      <p>Tamamlanan: {doneCount} / {entries.length}</p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Yeni madde"
          aria-label="Yeni madde"
        />
        <button type="button" onClick={addEntry}>Ekle</button>
      </div>
      <ul>
        {entries.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<LessonWorkshop />);`,
    [
      "entries dizisi state’te; ekleme spread ile immutable yapılır.",
      "useMemo ile türetilmiş doneCount gereksiz hesaplamayı azaltır.",
      "Checkbox ile toggle, key ile liste öğeleri tanınır.",
    ],
    "Liste büyür, tamamlanan sayı güncellenir, boş taslak eklenmez.",
  );

  const focusExtra: Partial<Record<TopicFocus, CodeExample>> = {
    jsx: ex(
      `${title} — JSX ve bileşen ağacı`,
      `${slug}-jsx-tree.tsx`,
      "className, süslü parantez ve alt bileşenlerle okunaklı JSX ağacı.",
      `${ROOT}
function Badge({ text }: { text: string }) {
  return <span className="badge">{text}</span>;
}

function LessonCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="lesson-card">
      <h2>{title}</h2>
      <Badge text="JSX" />
      <div className="lesson-body">{children}</div>
    </article>
  );
}

function App() {
  const topic = "${t}";
  return (
    <LessonCard title={topic}>
      <p>Merhaba, bugün <strong>{topic}</strong> çalışıyoruz.</p>
    </LessonCard>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`,
      ["children ile içerik slotu.", "Süslü parantezde topic değişkeni.", "Alt bileşen Badge ayrı dosya gibi düşünülür."],
      "Kart içinde başlık, rozet ve paragraf görünür.",
    ),
  };

  const third =
    focusExtra[focus] ??
    ex(
      `${title} — üretim desenine yakın`,
      `${slug}-production.tsx`,
      "Loading / empty / success üç durumunu modelleyen küçük panel.",
      `${ROOT}
import { useState } from "react";

type Status = "loading" | "empty" | "ready";

function StatusPanel() {
  const [status, setStatus] = useState<Status>("loading");
  const [items, setItems] = useState<string[]>([]);

  const load = () => {
    setStatus("loading");
    window.setTimeout(() => {
      const data = ["${t} — örnek A", "${t} — örnek B"];
      setItems(data);
      setStatus(data.length ? "ready" : "empty");
    }, 600);
  };

  return (
    <section>
      <h2>${title}</h2>
      <button type="button" onClick={load}>Veriyi yükle</button>
      {status === "loading" && <p>Yükleniyor…</p>}
      {status === "empty" && <p>Henüz kayıt yok.</p>}
      {status === "ready" && (
        <ul>
          {items.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<StatusPanel />);`,
      ["status state UI dalını seçer.", "setTimeout ile async hissi.", "map ile liste render."],
      "Yükle sonrası iki satırlık liste görünür.",
    );

  return [starter, workshop, third];
}
