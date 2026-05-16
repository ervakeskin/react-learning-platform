import type { CodeExample } from "../../types";

/** Slug bazlı özet ve ek alanlar; ana anlatım buildW3ContentBlocks ile üretilir. */
export interface SlugNarrative {
  summary: string;
  codeSamples?: CodeExample[];
  practiceTask?: string;
  realWorldScenario?: string;
}

export const slugNarratives: Record<string, SlugNarrative> = {
  "react-home": {
    summary:
      "Bu sayfa, 63 derslik React yolculuğunun haritasıdır: hangi sırayla gideceğini, her bölümde ne üreteceğini ve ilerlemeni nasıl takip edeceğini netleştirirsin.",
    practiceTask:
      "Üç günlük kişisel plan yaz: her gün bir slug, bir kopyalanabilir kod örneği ve quiz sonucunu not et. Dördüncü gün planını gözden geçirip zayıf konuyu tekrarla.",
  },
  "react-intro": {
    summary:
      "React, kullanıcı arayüzünü küçük bileşenlere bölerek yönetmeni sağlayan bir kütüphanedir; bu derste ‘neden React?’ sorusuna günlük dilde cevap veriyoruz.",
    realWorldScenario:
      "Kurumsal paneller, eğitim siteleri ve mobil web’de React; ekip içi bileşen kütüphaneleri sayesinde tasarım ve mantık ayrışır.",
  },
  "react-get-started": {
    summary:
      "Vite ile proje ayağa kaldırma, dosya yapısını okuma ve ilk bileşeni çalıştırma — ‘bilgisayarımda React var’ dediğin andır.",
    practiceTask: "Kendi proje adınla Vite kur; App içinde adını ve bugünün konusunu gösteren tek satırlık JSX yaz.",
  },
  "react-first-app": {
    summary:
      "İlk uygulama: tek ekran, birkaç bileşen, anlamlı isimlendirme — ‘çalışıyor’ hissini 30 dakikada yakalarsın.",
  },
  "react-jsx-intro": {
    summary:
      "JSX, JavaScript içinde arayüz yazma dilidir; HTML’e benzer ama kuralları farklıdır — className, tek kök, süslü parantez.",
  },
  "react-props": {
    summary:
      "Props, bileşenlere dışarıdan verilen okuma-only sözleşmedir; veri aşağı iner, olaylar callback ile yukarı çıkar.",
  },
  "react-usestate": {
    summary:
      "useState, function component’in hafızasıdır: sayaç, form metni, açık/kapalı panel — kullanıcı etkileşiminin kaydedildiği yer.",
  },
  "react-useeffect": {
    summary:
      "useEffect, render sonrası yan etkiler içindir: API çağrısı, abonelik, document.title, localStorage senkronu.",
  },
  "react-forms": {
    summary:
      "Formlarda controlled component: input değeri state’te, her tuş vuruşu onChange ile kayda geçer; submit’te preventDefault şart.",
  },
  "react-router": {
    summary:
      "React Router, URL ile ekran eşlemesi yapar; Link ile tam sayfa yenilemeden dersler arası geçiş sağlanır.",
  },
  "react-es6-array-map": {
    summary:
      "Dizi map metodu, React listelerinin bel kemiğidir: her öğeyi JSX’e çevirirken key vermeyi unutmamak gerekir.",
  },
  "react-lists": {
    summary:
      "Listeler state’ten gelir; key, boş liste ve sıralama bu derste pratikte oturur.",
  },
  "react-events": {
    summary:
      "Olay işleyicileri kullanıcıyı state’e bağlar; doğru handler bağlama ve form olayları bu derste.",
  },
  "react-usecontext": {
    summary:
      "useContext, derin prop zincirini kısaltır; tema, dil veya oturum gibi global ama sık değişmeyen veriler için uygundur.",
  },
  "react-usereducer": {
    summary:
      "useReducer, karmaşık state geçişlerini action + reducer ile toplar; sepet ve çok adımlı formlar için uygundur.",
  },
  "react-memo": {
    summary:
      "React.memo ve useMemo, gereksiz render’ı azaltır; önce ölç, sonra optimize et prensibi bu derste.",
  },
  "what-is-hooks": {
    summary:
      "Hook’lar, function component’lere state ve yan etki yeteneği veren fonksiyonlardır; class yazmadan modern React geliştirirsin.",
  },
};
