import type { CodeExample, LessonContent } from "../../types";
import type { TopicFocus } from "./focusDetect";
import { detectFocus } from "./focusDetect";
import { buildLineExplanations } from "../narrative/explainCode";
import { getRichCodeSamples } from "../narrative/richCodeSamples";
import { extraSlugCodeSamples } from "./extraSlugCodeSamples";

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

const slugCodeOverrides: Record<string, CodeExample[]> = {
  ...extraSlugCodeSamples,
  "react-usestate": [
    sample(
      "Favori renk — import ve state",
      "FavoriteColor.tsx",
      "W3Schools tarzı useState: renk state'te tutulur, butonlar setter çağırır.",
      `${ROOT}import { useState } from "react";

function FavoriteColor() {
  const [color, setColor] = useState("kırmızı");

  return (
    <>
      <h1>Favori rengim: {color}</h1>
      <button type="button" onClick={() => setColor("mavi")}>Mavi</button>
      <button type="button" onClick={() => setColor("kırmızı")}>Kırmızı</button>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<FavoriteColor />);`,
      [
        "useState başlangıç değeri 'kırmızı' ile çağrılır.",
        "color JSX içinde gösterilir.",
        "onClick içinde setColor yeni değer verir; state doğrudan atanmaz.",
      ],
      "Butona basınca başlık metni seçilen renge güncellenir.",
    ),
    sample(
      "Sayaç — fonksiyonel güncelleme",
      "Counter.tsx",
      "setCount(c => c + 1) ile önceki state'e güvenilir artış.",
      `${ROOT}import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Tıklandı: {count}
    </button>
  );
}

createRoot(document.getElementById("root")!).render(<Counter />);`,
      ["useState(0) ile sayaç başlar.", "Setter fonksiyonel form alır.", "Her tıkta count artar."],
      "Sayaç her tıklamada 1 artar.",
    ),
    sample(
      "Görev listesi — nesne dizisi state",
      "TodoList.tsx",
      "Dizi state immutable güncellenir; map ile liste render edilir.",
      `${ROOT}import { useState } from "react";

type Todo = { id: number; text: string; done: boolean };

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "React öğren", done: false }]);

  const toggle = (id: number) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
          {t.text}
          <button type="button" onClick={() => toggle(t.id)}>Tamamla</button>
        </li>
      ))}
    </ul>
  );
}

createRoot(document.getElementById("root")!).render(<TodoList />);`,
      [
        "Todo tipi ile state şeması net.",
        "toggle map + spread ile immutable günceller.",
        "key={t.id} ile liste öğeleri tanınır.",
      ],
      "Tamamla ile görev üstü çizili hale gelir.",
    ),
  ],
  "react-jsx-intro": [
    sample(
      "İlk JSX",
      "HelloJsx.tsx",
      "className ve süslü parantez ile JSX temelleri.",
      `${ROOT}function Hello() {
  const name = "React öğrencisi";
  return (
    <div className="greeting">
      <h1>Merhaba, {name}!</h1>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<Hello />);`,
      [
        "JSX HTML benzeri ama className kullanır.",
        "{name} ile JavaScript ifadesi gömülür.",
        "Tek kök div içinde h1 render edilir.",
      ],
      "Ekranda kişiselleştirilmiş selamlama görünür.",
    ),
    sample(
      "className ve style",
      "StyledBox.tsx",
      "HTML class yerine className; inline style nesne alır.",
      `${ROOT}function StyledBox() {
  return (
    <div className="card" style={{ padding: 12, borderRadius: 8 }}>
      <p>JSX attribute kuralları</p>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<StyledBox />);`,
      ["className DOM'a class yazar.", "style={{ }} camelCase anahtar kullanır.", "Tek kök div."],
      "Kutulu paragraf görünür.",
    ),
    sample(
      "Koşullu JSX",
      "LoginBadge.tsx",
      "&& ile koşullu render.",
      `${ROOT}function LoginBadge({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header>
      <h1>Panel</h1>
      {loggedIn && <span className="badge">Çevrimiçi</span>}
    </header>
  );
}
createRoot(document.getElementById("root")!).render(<LoginBadge loggedIn />);`,
      ["loggedIn true ise badge render edilir.", "false ise span yok.", "Props tipi açık."],
      "Giriş yapılmışken rozet görünür.",
    ),
  ],
};

function focusSamples(focus: TopicFocus, title: string, slug: string): CodeExample[] {
  const t = title.replace(/"/g, "'");
  const builders: Partial<Record<TopicFocus, () => CodeExample[]>> = {
    hooks: () => slugCodeOverrides["react-usestate"] ?? [],
    jsx: () =>
      slug.includes("jsx-intro")
        ? slugCodeOverrides["react-jsx-intro"]!
        : [
            sample(
              `${title} — JSX ifade`,
              "JsxExpr.tsx",
              "Dinamik değer ve attribute birlikte.",
              `${ROOT}function Card() {
  const score = 42;
  return <p className="score">Puan: {score}</p>;
}
createRoot(document.getElementById("root")!).render(<Card />);`,
              ["score değişkeni süslü parantez ile yazılır.", "className CSS class atar."],
              "Puan ekranda görünür.",
            ),
            sample(
              `${title} — Liste JSX`,
              "JsxList.tsx",
              "map ile JSX listesi.",
              `${ROOT}const items = ["JSX", "Props", "State"];
function List() {
  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}
createRoot(document.getElementById("root")!).render(<List />);`,
              ["map her öğe için li üretir.", "key benzersiz string."],
              "Üç maddelik liste render olur.",
            ),
            sample(
              `${title} — Koşullu JSX`,
              "JsxCond.tsx",
              "&& ile koşullu blok.",
              `${ROOT}import { useState } from "react";
function Panel() {
  const [on, setOn] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOn(!on)}>Aç/Kapa</button>
      {on && <p>${t} paneli açık</p>}
    </>
  );
}
createRoot(document.getElementById("root")!).render(<Panel />);`,
              ["on state toggle edilir.", "on true iken paragraf görünür."],
              "Butonla panel metni gelir/gider.",
            ),
          ],
    props: () => [
      sample(
        "Props ile kart",
        "UserCard.tsx",
        "Parent child'a title ve subtitle props gönderir.",
        `${ROOT}type CardProps = { title: string; subtitle: string };

function UserCard({ title, subtitle }: CardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </article>
  );
}

function App() {
  return <UserCard title="${t}" subtitle="Props ile veri aktarımı" />;
}

createRoot(document.getElementById("root")!).render(<App />);`,
        ["CardProps tipi sözleşmeyi tanımlar.", "Destructuring ile props okunur."],
        "Kart başlık ve alt metin gösterir.",
      ),
      sample(
        "children prop",
        "Layout.tsx",
        "Sarmalayıcı bileşen children ile içerik alır.",
        `${ROOT}function Box({ children }: { children: React.ReactNode }) {
  return <section className="box">{children}</section>;
}
function App() {
  return (
    <Box>
      <h1>${t}</h1>
    </Box>
  );
}
createRoot(document.getElementById("root")!).render(<App />);`,
        ["Box içine nested JSX children olarak girer."],
        "Sarmalayıcı içinde başlık görünür.",
      ),
      sample(
        "Dinamik props",
        "Badge.tsx",
        "Parent state değişince props güncellenir.",
        `${ROOT}import { useState } from "react";
function Badge({ level }: { level: number }) {
  return <span>Seviye {level}</span>;
}
function App() {
  const [level, setLevel] = useState(1);
  return (
    <>
      <Badge level={level} />
      <button type="button" onClick={() => setLevel((l) => l + 1)}>Artır</button>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);`,
        ["level prop child'a iner.", "Parent setter ile prop değişir."],
        "Artır ile seviye metni güncellenir.",
      ),
    ],
    forms: () => [
      sample(
        "Controlled input",
        "SignUpForm.tsx",
        "Tek input controlled pattern.",
        `${ROOT}import { useState } from "react";
function SignUpForm() {
  const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        E-posta
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <p>Önizleme: {email || "(boş)"}</p>
    </form>
  );
}
createRoot(document.getElementById("root")!).render(<SignUpForm />);`,
        ["value state'e bağlı.", "onChange state günceller.", "preventDefault submit'i durdurur."],
        "Yazdıkça önizleme güncellenir.",
      ),
      sample(
        "Çoklu alan form state",
        "ProfileForm.tsx",
        "Object spread ile form state.",
        `${ROOT}import { useState } from "react";
function ProfileForm() {
  const [form, setForm] = useState({ name: "", city: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form>
      <input name="name" value={form.name} onChange={onChange} placeholder="Ad" />
      <input name="city" value={form.city} onChange={onChange} placeholder="Şehir" />
    </form>
  );
}
createRoot(document.getElementById("root")!).render(<ProfileForm />);`,
        ["name attribute ile alan eşlenir.", "spread ile tek handler."],
        "İki alan bağımsız güncellenir.",
      ),
      sample(
        "Checkbox controlled",
        "TermsForm.tsx",
        "checked + onChange checkbox.",
        `${ROOT}import { useState } from "react";
function TermsForm() {
  const [accepted, setAccepted] = useState(false);
  return (
    <label>
      <input
        type="checkbox"
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
      />
      Şartları kabul ediyorum
    </label>
  );
}
createRoot(document.getElementById("root")!).render(<TermsForm />);`,
        ["checked state'e bağlı.", "onChange boolean günceller."],
        "Kutucuk işaretlenince label true olur.",
      ),
    ],
    events: () => [
      sample(
        "Click handler",
        "LikeButton.tsx",
        "onClick ile state artışı.",
        `${ROOT}import { useState } from "react";
function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button type="button" onClick={() => setLikes((n) => n + 1)}>
      Beğen ({likes})
    </button>
  );
}
createRoot(document.getElementById("root")!).render(<LikeButton />);`,
        ["onClick arrow function setter çağırır.", "likes UI'da gösterilir."],
        "Her tıkta sayaç artar.",
      ),
      sample(
        "Parametreli handler",
        "TagFilter.tsx",
        "Closure ile id iletimi.",
        `${ROOT}import { useState } from "react";
const tags = ["Tümü", "React", "TS"];
function TagFilter() {
  const [active, setActive] = useState("Tümü");
  return (
    <div>
      {tags.map((tag) => (
        <button key={tag} type="button" onClick={() => setActive(tag)}>
          {tag}
        </button>
      ))}
      <p>Seçili: {active}</p>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<TagFilter />);`,
        ["Her buton kendi tag değerini setActive'e iletir."],
        "Tıklanan etiket seçili satırda görünür.",
      ),
      sample(
        "Form submit",
        "SearchForm.tsx",
        "submit + preventDefault.",
        `${ROOT}import { useState } from "react";
function SearchForm() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setResult(q ? \`Aranan: \${q}\` : "Boş arama");
      }}
    >
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <button type="submit">Ara</button>
      <p>{result}</p>
    </form>
  );
}
createRoot(document.getElementById("root")!).render(<SearchForm />);`,
        ["submit'te preventDefault.", "result state mesaj gösterir."],
        "Ara ile sonuç metni güncellenir.",
      ),
    ],
    lists: () => [
      sample(
        "map + key",
        "ProductList.tsx",
        "Ürün listesi stabil key ile.",
        `${ROOT}const products = [
  { id: "p1", name: "Kitap" },
  { id: "p2", name: "Kurs" },
];
function ProductList() {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
createRoot(document.getElementById("root")!).render(<ProductList />);`,
        ["key=id stabil.", "map JSX listesi üretir."],
        "İki ürün listelenir.",
      ),
      sample(
        "Filtrelenmiş liste",
        "FilteredList.tsx",
        "Türetilmiş dizi + map.",
        `${ROOT}import { useState } from "react";
const items = ["React", "Router", "Redux"];
function FilteredList() {
  const [q, setQ] = useState("");
  const visible = items.filter((x) => x.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtre" />
      <ul>{visible.map((x) => <li key={x}>{x}</li>)}</ul>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<FilteredList />);`,
        ["filter türetilmiş dizi.", "map visible üzerinde."],
        "Filtre yazdıkça liste daralır.",
      ),
      sample(
        "Boş liste durumu",
        "EmptyCart.tsx",
        "length kontrolü ile empty state.",
        `${ROOT}import { useState } from "react";
function EmptyCart() {
  const [items, setItems] = useState<string[]>([]);
  return (
    <>
      <button type="button" onClick={() => setItems(["Ürün"])}>Ürün ekle</button>
      {items.length === 0 ? <p>Sepet boş</p> : <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>}
    </>
  );
}
createRoot(document.getElementById("root")!).render(<EmptyCart />);`,
        ["ternary empty vs list.", "length === 0 güvenli."],
        "Boşken mesaj, ürün eklenince liste.",
      ),
    ],
    es6: () => [
      sample(
        `${title} — class`,
        "Car.ts",
        "ES6 class ve constructor.",
        `class Car {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
  describe() {
    return this.brand;
  }
}
const car = new Car("React Motors");
console.log(car.describe());`,
        ["class ile tip tanımı.", "constructor alan atar."],
        "Konsolda marka yazdırılır.",
      ),
      sample(
        `${title} — arrow`,
        "Greeter.ts",
        "Arrow function kısa sözdizimi.",
        `const greet = (name: string) => \`Merhaba, \${name}\`;
console.log(greet("${t}"));`,
        ["Arrow tek ifade döner.", "Template literal string birleştirir."],
        "Merhaba mesajı konsolda.",
      ),
      sample(
        `${title} — spread`,
        "SpreadState.tsx",
        "Spread ile immutable güncelleme.",
        `${ROOT}import { useState } from "react";
function UserEditor() {
  const [user, setUser] = useState({ name: "Ada", role: "dev" });
  const promote = () => setUser((u) => ({ ...u, role: "senior" }));
  return (
    <>
      <p>{user.name} — {user.role}</p>
      <button type="button" onClick={promote}>Terfi</button>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<UserEditor />);`,
        ["spread önceki alanları korur.", "role güncellenir."],
        "Terfi ile role senior olur.",
      ),
    ],
    core: () => [
      sample(
        `${title} — createRoot`,
        "main.tsx",
        "Modern React giriş noktası.",
        `${ROOT}function App() {
  return <h1>${t} — çalışıyor</h1>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
        ["createRoot DOM'a bağlanır.", "App render edilir."],
        "Başlık ekranda görünür.",
      ),
      sample(
        `${title} — bileşen ayrımı`,
        "Welcome.tsx",
        "Küçük bileşen kompozisyonu.",
        `${ROOT}function Title({ text }: { text: string }) {
  return <h1>{text}</h1>;
}
function App() {
  return <Title text="${t}" />;
}
createRoot(document.getElementById("root")!).render(<App />);`,
        ["Title props alır.", "App compose eder."],
        "Başlık render olur.",
      ),
      sample(
        `${title} — etkileşim`,
        "ClickMe.tsx",
        "State + event birleşimi.",
        `${ROOT}import { useState } from "react";
function ClickMe() {
  const [msg, setMsg] = useState("Henüz tıklanmadı");
  return <button type="button" onClick={() => setMsg("Tıklandı!")}>{msg}</button>;
}
createRoot(document.getElementById("root")!).render(<ClickMe />);`,
        ["state mesaj tutar.", "click setter çağırır."],
        "Tıklayınca metin değişir.",
      ),
    ],
  };

  const builder = builders[focus];
  if (builder) return builder();

  return (
    builders.core?.() ?? [
      sample(
        `${title} — temel`,
        "App.tsx",
        `${title} için minimal çalışan örnek.`,
        `${ROOT}function App() {
  return <main><h1>${t}</h1><p>Bu örnek createRoot ile mount edilir.</p></main>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
        ["Bileşen JSX döndürür.", "createRoot render eder."],
        "Başlık ve paragraf görünür.",
      ),
      sample(
        `${title} — state`,
        "Interactive.tsx",
        "Etkileşimli minimal örnek.",
        `${ROOT}import { useState } from "react";
function Interactive() {
  const [on, setOn] = useState(false);
  return (
    <button type="button" onClick={() => setOn(!on)}>
      {on ? "Açık" : "Kapalı"}
    </button>
  );
}
createRoot(document.getElementById("root")!).render(<Interactive />);`,
        ["useState boolean.", "toggle tıkla."],
        "Buton metni değişir.",
      ),
      sample(
        `${title} — liste`,
        "Items.tsx",
        "map ile basit liste.",
        `${ROOT}const items = ["${t}", "Pratik", "Quiz"];
function Items() {
  return <ol>{items.map((x) => <li key={x}>{x}</li>)}</ol>;
}
createRoot(document.getElementById("root")!).render(<Items />);`,
        ["map + key.", "Sabit dizi."],
        "Liste maddeleri sıralı görünür.",
      ),
    ]
  );
}

export function getTopicCodeSamples(lesson: Pick<LessonContent, "slug" | "title">): CodeExample[] {
  const override = slugCodeOverrides[lesson.slug];
  const focus = detectFocus(lesson.title, lesson.slug);
  const rich = getRichCodeSamples(lesson.title, lesson.slug, focus);
  const fromFocus = focusSamples(focus, lesson.title, lesson.slug);

  let result: CodeExample[];

  if (override?.length) {
    if (override.length >= 3) result = override;
    else {
      const merged = [...override];
      for (const sample of rich) {
        if (merged.length >= 3) break;
        if (!merged.some((s) => s.filename === sample.filename)) merged.push(sample);
      }
      result = merged;
    }
  } else if (rich.length >= 3) result = rich;
  else if (fromFocus.length >= 3) result = fromFocus;
  else {
    const merged = [...rich];
    for (const sample of fromFocus) {
      if (merged.length >= 3) break;
      if (!merged.some((s) => s.filename === sample.filename)) merged.push(sample);
    }
    result = merged;
  }

  return withExplanations(result, lesson.title, lesson.slug, focus);
}

function withExplanations(
  samples: CodeExample[],
  title: string,
  slug: string,
  focus: TopicFocus,
): CodeExample[] {
  return samples.map((s) => ({
    ...s,
    lineExplanations:
      (s.lineExplanations?.length ?? 0) > 0
        ? s.lineExplanations
        : buildLineExplanations(s.code, focus, title, slug),
  }));
}
