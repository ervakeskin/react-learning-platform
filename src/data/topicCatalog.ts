import type { LessonContent, LessonMiniGame } from "../types";

export interface TopicCatalogEntry {
  w3schoolsRef: string;
  difficulty: LessonContent["difficulty"];
  estimatedMinutes: number;
  miniGame?: LessonMiniGame;
}

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const w3 = (path: string) => `https://www.w3schools.com/react/${path}`;

export const topicCatalog: Record<string, TopicCatalogEntry> = {
  "react-home": { w3schoolsRef: w3("default.asp"), difficulty: "baslangic", estimatedMinutes: 15 },
  "react-intro": { w3schoolsRef: w3("react_intro.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-get-started": { w3schoolsRef: w3("react_getstarted.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-first-app": { w3schoolsRef: w3("react_first_app.asp"), difficulty: "baslangic", estimatedMinutes: 30 },
  "react-render-html": { w3schoolsRef: w3("react_render.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-upgrade": { w3schoolsRef: w3("react_upgrade.asp"), difficulty: "orta", estimatedMinutes: 20 },
  "react-es6-classes": { w3schoolsRef: w3("react_es6_classes.asp"), difficulty: "baslangic", estimatedMinutes: 30 },
  "react-es6-arrow-functions": { w3schoolsRef: w3("react_es6_arrow.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-es6-variables": { w3schoolsRef: w3("react_es6_variables.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-es6-array-map": { w3schoolsRef: w3("react_es6_array_map.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-es6-destructuring": { w3schoolsRef: w3("react_es6_destructuring.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-es6-spread-operator": { w3schoolsRef: w3("react_es6_spread.asp"), difficulty: "orta", estimatedMinutes: 25 },
  "react-es6-modules": { w3schoolsRef: w3("react_es6_modules.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-es6-ternary": { w3schoolsRef: w3("react_es6_ternary.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-es6-template-strings": { w3schoolsRef: w3("react_es6_template_literals.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-jsx-intro": {
    w3schoolsRef: w3("react_jsx.asp"),
    difficulty: "baslangic",
    estimatedMinutes: 35,
    miniGame: {
      id: "jsx-fill",
      title: "JSX Challenge",
      intro: "Hızlı tur: className ve {} kurallarını seç — 60 saniyelik beyin egzersizi.",
      type: "fill-blank",
      payload: {
        template: "JSX'te HTML class yerine ___ kullanılır; JavaScript ifadesi ___ içine yazılır.",
        blanks: [
          { id: "b1", answer: "className", options: ["class", "className", "cssClass"] },
          { id: "b2", answer: "{}", options: ["()", "{}", "[]"] },
        ],
      },
      successMessage: "JSX sözdizimi kurallarını doğru eşleştirdin!",
      hint: "class rezerv kelimedir; ifadeler için süslü parantez kullanılır.",
    },
  },
  "react-props": {
    w3schoolsRef: w3("react_props.asp"),
    difficulty: "baslangic",
    estimatedMinutes: 35,
    miniGame: {
      id: "props-match",
      title: "Props Puzzle",
      intro: "Sol kart prop, sağ kart anlam — eşleştir ve kilidi aç.",
      type: "match-pairs",
      payload: {
        pairs: [
          { id: "1", left: "title", right: "Kart başlığı metni" },
          { id: "2", left: "onClick", right: "Tıklama olayı fonksiyonu" },
          { id: "3", left: "children", right: "Bileşen içine yerleştirilen içerik" },
          { id: "4", left: "defaultProps", right: "Eksik prop için varsayılan" },
          { id: "5", left: "spread props", right: "Kalan props'u iletme" },
        ],
      },
      successMessage: "Props sözleşmesini doğru kurdun!",
    },
  },
  "react-usestate": {
    w3schoolsRef: w3("react_usestate.asp"),
    difficulty: "baslangic",
    estimatedMinutes: 40,
    miniGame: {
      id: "usestate-tf",
      title: "State Boss Fight",
      intro: "Doğru mu yanlış mı? useState kurallarını hızlıca test et.",
      type: "true-false-sprint",
      payload: {
        items: [
          { id: "1", statement: "State doğrudan color = 'blue' ile güncellenmelidir.", isTrue: false, explanation: "Setter fonksiyonu kullanılmalıdır." },
          { id: "2", statement: "useState iki değer döndürür: state ve setter.", isTrue: true, explanation: "Doğru." },
          { id: "3", statement: "Hook'lar if bloğu içinde çağrılabilir.", isTrue: false, explanation: "Hook'lar üst seviyede çağrılmalıdır." },
          { id: "4", statement: "setCount(c => c + 1) önceki state'e güvenilir.", isTrue: true, explanation: "Fonksiyonel güncelleme." },
          { id: "5", statement: "State güncellemesi senkron render tetikler.", isTrue: true, explanation: "Planlı re-render." },
          { id: "6", statement: "useState ile API verisi anında gelir.", isTrue: false, explanation: "Async için effect gerekir." },
        ],
      },
      successMessage: "useState kurallarını pekiştirdin!",
    },
  },
  "react-useeffect": {
    w3schoolsRef: w3("react_useeffect.asp"),
    difficulty: "orta",
    estimatedMinutes: 45,
    miniGame: {
      id: "effect-order",
      title: "Effect Sırası",
      intro: "Mount ve effect akışını sırala.",
      type: "order-steps",
      payload: {
        steps: [
          { id: "a", label: "Bileşen mount olur" },
          { id: "b", label: "İlk render tamamlanır" },
          { id: "c", label: "useEffect çalışır" },
          { id: "d", label: "Dependency değişirse effect tekrar" },
          { id: "e", label: "Cleanup önceki effect'ten" },
          { id: "f", label: "Unmount'ta son cleanup" },
          { id: "g", label: "Bileşen ağaçtan kaldırılır" },
        ],
        correctOrder: ["a", "b", "c", "d", "e", "f", "g"],
      },
      successMessage: "Effect yaşam döngüsünü doğru sıraladın!",
    },
  },
  "react-memo": { w3schoolsRef: w3("react_memo.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-usecontext": { w3schoolsRef: w3("react_usecontext.asp"), difficulty: "orta", estimatedMinutes: 35 },
  "react-useref": { w3schoolsRef: w3("react_useref.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-usereducer": { w3schoolsRef: w3("react_usereducer.asp"), difficulty: "orta", estimatedMinutes: 40 },
  "react-usecallback": { w3schoolsRef: w3("react_usecallback.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-usememo": { w3schoolsRef: w3("react_usememo.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-custom-hooks": { w3schoolsRef: w3("react_custom_hooks.asp"), difficulty: "ileri", estimatedMinutes: 40 },
  "what-is-hooks": { w3schoolsRef: w3("react_hooks_intro.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-jsx-expressions": { w3schoolsRef: w3("react_jsx_expressions.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-jsx-attributes": { w3schoolsRef: w3("react_jsx_attributes.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-jsx-if-statements": { w3schoolsRef: w3("react_jsx_if.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-components": { w3schoolsRef: w3("react_components.asp"), difficulty: "baslangic", estimatedMinutes: 30 },
  "react-class": { w3schoolsRef: w3("react_class.asp"), difficulty: "orta", estimatedMinutes: 35 },
  "react-props-destructuring": { w3schoolsRef: w3("react_props_destructuring.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-props-children": { w3schoolsRef: w3("react_props_children.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-conditionals": { w3schoolsRef: w3("react_conditional_rendering.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-lists": { w3schoolsRef: w3("react_lists.asp"), difficulty: "baslangic", estimatedMinutes: 30 },
  "react-forms-submit": { w3schoolsRef: w3("react_forms_submit.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-textarea": { w3schoolsRef: w3("react_textarea.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-select": { w3schoolsRef: w3("react_select.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-multiple-inputs": { w3schoolsRef: w3("react_multiple_inputs.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-checkbox": { w3schoolsRef: w3("react_checkbox.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-radio": { w3schoolsRef: w3("react_radio.asp"), difficulty: "baslangic", estimatedMinutes: 20 },
  "react-portals": { w3schoolsRef: w3("react_portals.asp"), difficulty: "ileri", estimatedMinutes: 30 },
  "react-suspense": { w3schoolsRef: w3("react_suspense.asp"), difficulty: "ileri", estimatedMinutes: 35 },
  "react-css-styling": { w3schoolsRef: w3("react_css.asp"), difficulty: "baslangic", estimatedMinutes: 25 },
  "react-css-modules": { w3schoolsRef: w3("react_css_modules.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-css-in-js": { w3schoolsRef: w3("react_css_in_js.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-transitions": { w3schoolsRef: w3("react_transitions.asp"), difficulty: "ileri", estimatedMinutes: 35 },
  "react-forward-ref": { w3schoolsRef: w3("react_forward_ref.asp"), difficulty: "ileri", estimatedMinutes: 30 },
  "react-hoc": { w3schoolsRef: w3("react_hoc.asp"), difficulty: "ileri", estimatedMinutes: 35 },
  "react-sass": { w3schoolsRef: w3("react_sass.asp"), difficulty: "orta", estimatedMinutes: 25 },
  "react-certificate": { w3schoolsRef: w3("react_quiz.asp"), difficulty: "orta", estimatedMinutes: 20 },
  "react-quiz": { w3schoolsRef: w3("react_quiz.asp"), difficulty: "orta", estimatedMinutes: 30 },
  "react-exercises": { w3schoolsRef: w3("react_exercises.asp"), difficulty: "orta", estimatedMinutes: 40 },
  "react-compiler": { w3schoolsRef: w3("react_compiler.asp"), difficulty: "ileri", estimatedMinutes: 25 },
};

function inferW3Ref(lessonSlug: string): string {
  const path = lessonSlug.replace(/^react-/, "react_").replace(/-/g, "_") + ".asp";
  return w3(path);
}

export function applyTopicCatalog(lesson: LessonContent): LessonContent {
  const entry =
    topicCatalog[lesson.slug] ??
    topicCatalog[lesson.id] ??
    topicCatalog[slug(lesson.title)];

  const fallback: TopicCatalogEntry = {
    w3schoolsRef: inferW3Ref(lesson.slug),
    difficulty: "orta",
    estimatedMinutes: 28,
  };

  const merged = entry ?? fallback;

  return {
    ...lesson,
    w3schoolsRef: merged.w3schoolsRef,
    difficulty: lesson.difficulty ?? merged.difficulty,
    estimatedMinutes: lesson.estimatedMinutes ?? merged.estimatedMinutes,
    miniGame: merged.miniGame ?? lesson.miniGame,
  };
}

export const learningOutcomes = [
  "ES6 özelliklerini React bağlamında kullanmak",
  "JSX ile bileşen arayüzü tanımlamak",
  "Props ve state ile veri akışını yönetmek",
  "Olaylar, koşullar ve listelerle UI üretmek",
  "Formlarda controlled bileşen kullanmak",
  "React Router ile çok sayfalı uygulama kurmak",
  "Hook'larla state ve yan etkileri yönetmek",
  "React.memo ve useMemo ile performans iyileştirmek",
  "CSS Modules ve Sass ile stil vermek",
  "Custom hook ile tekrar kullanılabilir mantık yazmak",
];
