import type { LessonContent, LessonMiniGame } from "../types";
import { getTemplateGame } from "./miniGameTemplates";

const gamesBySlug: Record<string, LessonMiniGame> = {
  "react-events": {
    id: "events-bug",
    title: "Bug Hunt",
    intro: "Kodda gizli hatayı bul — event handler edition.",
    type: "spot-the-bug",
    payload: {
      code: "",
      lines: [
        { lineNumber: 1, text: "const [n, setN] = useState(0);" },
        { lineNumber: 2, text: "const click = () => { n = n + 1; };" },
        { lineNumber: 3, text: "return button onClick={click}" },
        { lineNumber: 4, text: "const click = () => setN(n + 1);" },
        { lineNumber: 5, text: "onClick={() => setN(n + 1)}" },
        { lineNumber: 6, text: "e.preventDefault() in submit handler" },
        { lineNumber: 7, text: "type='button' for non-submit" },
      ],
      buggyLineNumber: 2,
      explanation: "State doğrudan atanmaz; setN(n + 1) kullanılmalıdır.",
    },
    successMessage: "Event handler'da setter kullanımını doğru tespit ettin!",
  },
  "react-lists": {
    id: "lists-order",
    title: "Liste Render Sırası",
    intro: "map ve key kullanım sırasını kur.",
    type: "order-steps",
    payload: {
      steps: [
        { id: "1", label: "Veri dizisini hazırla" },
        { id: "2", label: "map ile JSX üret" },
        { id: "3", label: "Her öğeye stabil key ver" },
        { id: "4", label: "Boş liste için empty state" },
        { id: "5", label: "Güncellemede immutable dizi kopyası" },
        { id: "6", label: "Reconcile ile DOM güncelle" },
      ],
      correctOrder: ["1", "2", "3", "4", "5", "6"],
    },
    successMessage: "Liste render akışını doğru kurdun!",
  },
  "react-forms": {
    id: "forms-fill",
    title: "Form Fix",
    intro: "Controlled input boşluğunu doldur — form gönderilmeden önce!",
    type: "fill-blank",
    payload: {
      template: "___={name} onChange={(e) => setName(e.target.___)}",
      blanks: [
        { id: "v1", answer: "value", options: ["value", "name", "key"] },
        { id: "v2", answer: "value", options: ["value", "checked", "type"] },
      ],
    },
    successMessage: "Controlled input desenini doğru seçtin!",
  },
  "react-router": {
    id: "router-match",
    title: "Route Puzzle",
    intro: "Router parçalarını eşleştir — SPA gezinmeyi çöz.",
    type: "match-pairs",
    payload: {
      pairs: [
        { id: "1", left: "Routes", right: "Eşleşen route kapsayıcısı" },
        { id: "2", left: "Link", right: "Sayfa yenilemeden gezinme" },
        { id: "3", left: "path", right: "URL deseni prop'u" },
        { id: "4", left: "useParams", right: "URL parametrelerini okur" },
        { id: "5", left: "Navigate", right: "Programatik yönlendirme" },
        { id: "6", left: "Outlet", right: "İç içe route çıkışı" },
      ],
    },
    successMessage: "Router yapı taşlarını eşleştirdin!",
  },
  "react-conditionals": {
    id: "cond-bug",
    title: "Koşul Hatası",
    intro: "&& ile 0 render tuzak satırını bul.",
    type: "spot-the-bug",
    payload: {
      code: "",
      lines: [
        { lineNumber: 1, text: "items.length && List — 0 render riski" },
        { lineNumber: 2, text: "items.length > 0 && List" },
        { lineNumber: 3, text: "items.length ? List : Empty" },
        { lineNumber: 4, text: "loading && Spinner" },
        { lineNumber: 5, text: "error ? ErrorBanner : null" },
        { lineNumber: 6, text: "isLoggedIn ? Dashboard : Login" },
        { lineNumber: 7, text: "count > 0 && Badge" },
      ],
      buggyLineNumber: 1,
      explanation: "length 0 iken && ifadesi 0 render edebilir; > 0 veya ternary tercih edilir.",
    },
    successMessage: "Koşullu render tuzaklarını yakaladın!",
  },
  "react-custom-hooks": {
    id: "custom-fill",
    title: "Hook İsimlendirme",
    intro: "Custom hook adını seç.",
    type: "fill-blank",
    payload: {
      template: "function ___() { ... } // özel hook; ad ___ ile başlamalı",
      blanks: [
        { id: "n1", answer: "useFetch", options: ["fetch", "useFetch", "getFetch"] },
        { id: "n2", answer: "use", options: ["use", "get", "with"] },
      ],
    },
    successMessage: "Custom hook isim kuralını biliyorsun!",
  },
  "react-jsx-expressions": {
    id: "jsx-expr-fill",
    title: "JSX İfade",
    intro: "Süslü parantez içinde ifade kullanımını seç.",
    type: "fill-blank",
    payload: {
      template: "Toplam: {items.___} — map: items.___(x => x)",
      blanks: [
        { id: "m1", answer: "length", options: ["length", "map", "push"] },
        { id: "m2", answer: "map", options: ["map", "filter", "reduce"] },
      ],
    },
    successMessage: "JSX içinde JavaScript ifadesi doğru!",
  },
  "react-components": {
    id: "comp-tf",
    title: "Bileşen Sprint",
    intro: "Bileşen kuralları — doğru mu?",
    type: "true-false-sprint",
    payload: {
      items: [
        { id: "1", statement: "Bileşen adı küçük harfle başlamalıdır.", isTrue: false, explanation: "Bileşen adları büyük harfle başlar." },
        { id: "2", statement: "Bir bileşen JSX döndürebilir.", isTrue: true, explanation: "Doğru." },
        { id: "3", statement: "Props read-only kabul edilir.", isTrue: true, explanation: "Child props mutate etmez." },
        { id: "4", statement: "Her bileşen state tutmak zorundadır.", isTrue: false, explanation: "Stateless bileşen olabilir." },
        { id: "5", statement: "Composition, kalıtımdan daha yaygındır.", isTrue: true, explanation: "React'te composition tercih edilir." },
        { id: "6", statement: "Tek kök element veya Fragment gerekir.", isTrue: true, explanation: "JSX tek kök kuralı." },
      ],
    },
    successMessage: "Bileşen temellerini pekiştirdin!",
  },
  "react-usecontext": {
    id: "ctx-match",
    title: "Context Eşleştir",
    intro: "Provider ve Consumer rollerini eşleştir.",
    type: "match-pairs",
    payload: {
      pairs: [
        { id: "1", left: "Provider", right: "Değeri alt ağaca iletir" },
        { id: "2", left: "useContext", right: "Hook ile değer okur" },
        { id: "3", left: "createContext", right: "Context nesnesi üretir" },
        { id: "4", left: "value prop", right: "Provider'da paylaşılan veri" },
        { id: "5", left: "default value", right: "Provider yoksa fallback" },
      ],
    },
    successMessage: "Context modelini doğru eşleştirdin!",
  },
  "react-useref": {
    id: "ref-tf",
    title: "useRef",
    intro: "Ref ne zaman kullanılır?",
    type: "true-false-sprint",
    payload: {
      items: [
        { id: "1", statement: "useRef render tetiklemez.", isTrue: true, explanation: "Ref güncellemesi re-render yapmaz." },
        { id: "2", statement: "Her state yerine ref kullanmak best practice'tir.", isTrue: false, explanation: "UI için state tercih edilir." },
        { id: "3", statement: "ref.current DOM node tutabilir.", isTrue: true, explanation: "Imperative erişim." },
        { id: "4", statement: "forwardRef parent'tan ref iletir.", isTrue: true, explanation: "Child DOM'a ref." },
        { id: "5", statement: "Ref değişince otomatik re-render olur.", isTrue: false, explanation: "State gibi değildir." },
        { id: "6", statement: "input.focus() için ref kullanılabilir.", isTrue: true, explanation: "Yaygın kullanım." },
      ],
    },
    successMessage: "useRef kullanımını anladın!",
  },
  "react-usereducer": {
    id: "reducer-order",
    title: "Reducer Akışı",
    intro: "dispatch akışını sırala.",
    type: "order-steps",
    payload: {
      steps: [
        { id: "1", label: "Kullanıcı olayı tetikler" },
        { id: "2", label: "dispatch(action) çağrılır" },
        { id: "3", label: "Reducer yeni state döner" },
        { id: "4", label: "State güncellenir" },
        { id: "5", label: "Bileşen yeniden render olur" },
        { id: "6", label: "UI yeni state'i yansıtır" },
      ],
      correctOrder: ["1", "2", "3", "4", "5", "6"],
    },
    successMessage: "useReducer akışını doğru kurdun!",
  },
  "react-usecallback": {
    id: "cb-match",
    title: "useCallback",
    intro: "Ne zaman useCallback?",
    type: "match-pairs",
    payload: {
      pairs: [
        { id: "1", left: "useCallback", right: "Fonksiyon referansını sabitler" },
        { id: "2", left: "useMemo", right: "Hesaplanan değeri önbelleğe alır" },
        { id: "3", left: "dependency array", right: "Ne zaman yeniden hesaplanır" },
        { id: "4", left: "child memo", right: "Sabit prop ile fayda" },
        { id: "5", left: "inline arrow", right: "Her render yeni referans" },
      ],
    },
    successMessage: "Performans hook'larını ayırt ettin!",
  },
  "react-usememo": {
    id: "memo-match",
    title: "useMemo vs memo",
    intro: "Memo türlerini eşleştir.",
    type: "match-pairs",
    payload: {
      pairs: [
        { id: "1", left: "React.memo", right: "Bileşen yeniden renderını önler" },
        { id: "2", left: "useMemo", right: "Pahalı hesaplamayı önbelleğe alır" },
        { id: "3", left: "useCallback", right: "Callback referansını sabitler" },
        { id: "4", left: "referential equality", right: "memo props karşılaştırması" },
        { id: "5", left: "gereksiz memo", right: "Maliyet artırabilir" },
      ],
    },
    successMessage: "Memo stratejilerini ayırt ettin!",
  },
  "react-memo": {
    id: "memo-comp",
    title: "React.memo",
    intro: "memo ne zaman faydalı?",
    type: "true-false-sprint",
    payload: {
      items: [
        { id: "1", statement: "memo, props değişmeyince yeniden render'ı atlar.", isTrue: true, explanation: "Doğru." },
        { id: "2", statement: "Her bileşene memo uygulamak her zaman hızlandırır.", isTrue: false, explanation: "Gereksiz memo maliyet ekleyebilir." },
        { id: "3", statement: "memo bir HOC değil, bileşen sarmalayıcıdır.", isTrue: true, explanation: "Higher-order wrapper." },
        { id: "4", statement: "Shallow compare varsayılan davranıştır.", isTrue: true, explanation: "Props yüzeysel karşılaştırılır." },
        { id: "5", statement: "memo state güncellemelerini engeller.", isTrue: false, explanation: "Kendi state'i varsa render olur." },
        { id: "6", statement: "Pahalı listelerde memo faydalı olabilir.", isTrue: true, explanation: "Ölçümle karar ver." },
      ],
    },
    successMessage: "React.memo kullanımını anladın!",
  },
  "what-is-hooks": {
    id: "hooks-rules",
    title: "Hook Kuralları",
    intro: "Hook kurallarını doğrula.",
    type: "true-false-sprint",
    payload: {
      items: [
        { id: "1", statement: "Hook'lar yalnızca üst seviyede çağrılır.", isTrue: true, explanation: "Doğru." },
        { id: "2", statement: "Hook'lar class içinde de çalışır.", isTrue: false, explanation: "Hook'lar function component içindir." },
        { id: "3", statement: "Hook adları use ile başlar.", isTrue: true, explanation: "İsim kuralı." },
        { id: "4", statement: "Koşullu hook çağrısı güvenlidir.", isTrue: false, explanation: "Sıra bozulur." },
        { id: "5", statement: "Custom hook mantığı paylaşır.", isTrue: true, explanation: "Tekrar kullanım." },
        { id: "6", statement: "useEffect yan etki içindir.", isTrue: true, explanation: "Render sonrası." },
      ],
    },
    successMessage: "Hook kurallarını biliyorsun!",
  },
};

const gameSlugs = new Set(Object.keys(gamesBySlug));

export function attachMiniGames(lesson: LessonContent): LessonContent {
  if (lesson.miniGame) return lesson;
  const catalog = gamesBySlug[lesson.slug];
  if (catalog) return { ...lesson, miniGame: catalog };
  const templated = getTemplateGame(lesson.slug);
  if (templated) return { ...lesson, miniGame: templated };
  return lesson;
}

export function countLessonsWithGames(course: { categories: { groups: { topics: LessonContent[] }[] }[] }): number {
  let n = 0;
  for (const c of course.categories) {
    for (const g of c.groups) {
      for (const t of g.topics) {
        if (t.miniGame) n++;
      }
    }
  }
  return n;
}

export { gameSlugs };
