import type { LineExplanation } from "../../types";
import type { TopicFocus } from "../assessments/focusDetect";
import { getSyntaxTerms } from "./pedagogyBlocks";
import { symbolExistsInCode } from "./symbolMatch";

const GLOBAL: Record<string, string> = {
  createRoot:
    "`createRoot(domNode)` React 19 giriş noktasıdır; kök DOM düğümüne bağlanır ve `.render()` ile ağaç çizer.",
  "useState":
    "`useState(initial)` state değeri ve güncelleyici fonksiyon döndürür; setter çağrısı yeniden render tetikler.",
  "useEffect":
    "`useEffect(fn, deps)` render tamamlandıktan sonra yan etkiyi çalıştırır; cleanup fonksiyonu abonelik/timer temizler.",
  "useMemo":
    "`useMemo(factory, deps)` pahalı hesaplamayı önbelleğe alır; bağımlılık değişmedikçe factory yeniden çalışmaz.",
  "useCallback":
    "`useCallback(fn, deps)` fonksiyon referansını sabitler; child memo bileşenlerinde gereksiz render azalır.",
  "useContext":
    "`useContext(Context)` Provider’dan en yakın değeri okur; prop drilling yerine ortak veri taşır.",
  "useReducer":
    "`useReducer(reducer, init)` action tabanlı state geçişlerini tek reducer’da toplar.",
  className:
    "`className` JSX’te CSS sınıfı atar; HTML `class` yerine kullanılır çünkü `class` JS rezerv kelimedir.",
  "onClick":
    "`onClick={handler}` tıklamada handler çağrılır; `onClick={fn()}` anında çağrı yapar, referans verilmelidir.",
  "onChange":
    "`onChange` controlled input’ta her tuş vuruşunda state güncellemek için kullanılır.",
  "onSubmit":
    "`onSubmit` form gönderiminde çalışır; `preventDefault()` ile sayfa yenilemesi engellenir.",
  preventDefault:
    "`event.preventDefault()` tarayıcının varsayılan davranışını (form yenileme vb.) iptal eder.",
  "key=":
    "`key` liste öğelerinde React’in hangi satırın değiştiğini bilmesi için kararlı kimlik sağlar.",
  map: "`array.map(fn)` her öğeyi dönüştürür; JSX listelerinde öğe → element üretir.",
  spread:
    "Spread (`...prev`) immutable kopya oluşturur; state dizisini mutate etmeden güncelleme sağlar.",
  destructuring:
    "Destructuring (`const { x } = obj`) nesne/diziden alan çıkarır; props okumayı kısaltır.",
  Route:
    "`<Route path element>` URL yolunu bileşenle eşler; eşleşince `element` mount olur.",
  Link: "`<Link to>` tam sayfa yenilemeden istemci tarafı geçiş yapar.",
  Suspense:
    "`<Suspense fallback>` alt ağaç hazır değilken geçici UI gösterir; lazy yüklemede kullanılır.",
  createPortal:
    "`createPortal(child, domNode)` JSX’i DOM hiyerarşisinde başka düğüme render eder.",
  startTransition:
    "`startTransition(fn)` düşük öncelikli state güncellemesini kullanıcı girdisinden ayırır.",
  useRef:
    "`useRef(initial)` render tetiklemeden `.current` ile DOM veya değer tutar.",
  useTransition:
    "`useTransition()` acil ve ertelenmiş güncellemeleri ayırmak için `isPending` ve `startTransition` verir.",
};

const BY_FOCUS: Partial<Record<TopicFocus, Record<string, string>>> = {
  classComponent: {
    "extends React.Component":
      "`extends React.Component` class’ı React bileşen sınıfına bağlar; `render()` zorunludur.",
    "extends Component":
      "`extends Component` import edilen `Component` taban sınıfından türetme yapar.",
    constructor:
      "`constructor(props)` örnek oluşturulurken bir kez çalışır; ilk `this.state` burada kurulur.",
    "super(props)":
      "`super(props)` üst sınıfın kurucu metodunu tetikler ve `this` kullanımını etkinleştirir.",
    "this.state":
      "`this.state` bileşenin dahili hafızasıdır; UI bu nesneye bağlı olarak yeniden çizilir.",
    "this.setState":
      "`this.setState()` React’e state değiştiğini bildirir ve `render()` metodunu otomatik yeniden tetikler.",
    "this.props":
      "`this.props` ebeveynden gelen salt okunur veridir; child doğrudan mutate etmez.",
    "render()":
      "`render()` zorunlu metottur; döndürdüğü JSX ekrandaki çıktıyı tanımlar.",
    componentDidMount:
      "`componentDidMount()` ilk render sonrası çalışır; API, abonelik veya timer burada başlatılır.",
    componentWillUnmount:
      "`componentWillUnmount()` bileşen DOM’dan kalkmadan önce çalışır; kaynak temizliği yapılır.",
    componentDidUpdate:
      "`componentDidUpdate(prevProps, prevState)` güncelleme sonrası çalışır; önceki değerlerle karşılaştırma yapılabilir.",
  },
  hooks: {
    "useState":
      "`useState` hook’u `[deger, setDeger]` çifti döndürür; setter ile state güncellenir ve bileşen yeniden render edilir.",
    "useEffect":
      "`useEffect` callback’i commit sonrası çalışır; `[]` yalnızca mount, `[dep]` dep değişince tekrarlar.",
  },
  jsx: {
    className:
      "`className` JSX attribute’udur; stil dosyasındaki sınıf adını DOM elementine bağlar.",
    "{": "Süslü parantez JSX içinde JavaScript ifadesi başlatır; değer render sırasında hesaplanır.",
    "}": "Süslü parantez kapanışı ifade alanını sonlandırır.",
    children:
      "`children` alt içerik slotudur; `<Card><p /></Card>` içindeki `<p />` children olur.",
  },
  props: {
    props:
      "`props` ebeveynden child’a veri taşır; tek yönlü akışta aşağı iner.",
    children: "`children` özel prop’tur; bileşen etiketleri arası içeriği taşır.",
  },
  forms: {
    "value=":
      "`value={state}` controlled input’ta görünen değeri state’e bağlar; tek kaynak gerçeği state’tir.",
    "name=":
      "`name` çok alanlı formlarda hangi alanın güncelleneceğini tanımlamaya yardım eder.",
  },
  router: {
    "useParams":
      "`useParams()` URL parametrelerini (ör. `:slug`) nesne olarak okur.",
    "path=": "`path` route’un eşleşeceği URL kalıbını tanımlar.",
    "element=": "`element` eşleşmede mount edilecek React bileşenidir.",
  },
  lists: {
    filter:
      "`filter` diziyi süzer; JSX’te önce filter sonra map ile iki aşamalı liste üretmek yaygındır.",
  },
};

const LIFECYCLE_TERMS = ["componentDidMount", "componentWillUnmount", "componentDidUpdate"];

function mergeTemplates(focus: TopicFocus): Record<string, string> {
  return { ...GLOBAL, ...(BY_FOCUS[focus] ?? {}), ...(BY_FOCUS.classComponent ?? {}) };
}

function pickSymbolsForCode(
  code: string,
  focus: TopicFocus,
  syntaxTerms: string[],
): string[] {
  const templates = mergeTemplates(focus);
  const candidates = new Set<string>([
    ...syntaxTerms,
    ...Object.keys(templates),
    ...LIFECYCLE_TERMS,
    "createRoot",
    "useState",
    "useEffect",
    "useMemo",
    "className",
    "onClick",
    "onChange",
    "map",
    "key=",
  ]);

  return [...candidates].filter((sym) => symbolExistsInCode(code, sym));
}

function firstIndex(code: string, symbol: string): number {
  const idx = code.indexOf(symbol);
  if (idx >= 0) return idx;
  if (symbolExistsInCode(code, symbol)) return code.search(new RegExp(escapeForSearch(symbol)));
  return 99999;
}

function escapeForSearch(symbol: string): string {
  return symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fallbackExplanation(symbol: string): string {
  return `\`${symbol}\` bu örnekte konuya özgü sözdizimini temsil eder; davranışı render ve state akışı içinde gözlemlenir.`;
}

/** Satır satır Örnek Açıklaması üretir; kodda olmayan semboller atılır */
export function buildLineExplanations(
  code: string,
  focus: TopicFocus,
  title: string,
  slug: string,
): LineExplanation[] {
  const syntaxTerms = getSyntaxTerms(title, slug, focus);
  const templates = mergeTemplates(focus);
  const symbols = pickSymbolsForCode(code, focus, syntaxTerms);

  const explanations: LineExplanation[] = [];
  for (const symbol of symbols) {
    const explanation = templates[symbol] ?? fallbackExplanation(symbol);
    if (symbolExistsInCode(code, symbol)) {
      explanations.push({ symbol, explanation });
    }
  }

  explanations.sort((a, b) => firstIndex(code, a.symbol) - firstIndex(code, b.symbol));

  return explanations;
}

export function attachLineExplanations(
  samples: { code: string }[],
  focus: TopicFocus,
  title: string,
  slug: string,
): void {
  for (const sample of samples) {
    (sample as { lineExplanations?: LineExplanation[] }).lineExplanations =
      buildLineExplanations(sample.code, focus, title, slug);
  }
}

export function getRequiredTermsForSample(
  code: string,
  focus: TopicFocus,
  title: string,
  slug: string,
): string[] {
  return pickSymbolsForCode(code, focus, getSyntaxTerms(title, slug, focus));
}
