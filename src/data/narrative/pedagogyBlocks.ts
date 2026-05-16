import type { TopicFocus } from "../assessments/focusDetect";

export interface PedagogyCopy {
  whatIs: string[];
  howItWorks: string[];
  syntax: string[];
  syntaxTerms: string[];
  spoken: string;
  mistakes: string[];
  legacyNote?: string[];
}

const focusCopy: Record<TopicFocus, PedagogyCopy> = {
  classComponent: {
    whatIs: [
      "Class component, `React.Component` sınıfından türeyen bir ES6 sınıfıdır; ekranda gördüğün arayüzü `render()` metodunun döndürdüğü JSX oluşturur.",
      "Bileşenin hafızası `this.state` nesnesindedir; güncelleme `this.setState()` ile yapılır, dışarıdan gelen veri ise `this.props` üzerinden okunur.",
    ],
    howItWorks: [
      "React önce class örneğini oluşturur, `render()` çıktısını DOM’a yazar. State veya props değişince aynı örnek yeniden `render()` edilir.",
      "Function component’te hook ve fonksiyon gövdesi vardır; class’ta ise metotlar (`render`, `componentDidMount` vb.) vardır — aynı UI farklı sözdizimiyle kurulabilir.",
    ],
    syntax: [
      "`class Car extends React.Component` — bileşen sınıfı tanımı.",
      "`constructor(props) { super(props); this.state = { ... } }` — ilk state kurulumu.",
      "`render() { return <div>...</div> }` — zorunlu JSX çıktısı.",
      "`this.setState({ color: 'mavi' })` — state güncelleme ve yeniden render tetikleme.",
    ],
    syntaxTerms: [
      "extends React.Component",
      "constructor",
      "super(props)",
      "this.state",
      "render()",
      "this.setState",
      "this.props",
    ],
    spoken:
      "Garaj uygulamasında `Car` class’ı rengi state’te tutar; ‘Rengi değiştir’ butonu `setState` çağırır ve başlık anında güncellenir.",
    mistakes: [
      "Constructor’da `super(props)` atlamak.",
      "`this.state.count++` gibi doğrudan mutasyon yapmak.",
      "`render` içinde fetch veya abonelik açmak (lifecycle veya effect kullan).",
    ],
    legacyNote: [
      "Eski kurumsal projelerde class modülleri sık görülür; bu yüzden okuma ve bakım becerisi hâlâ değerlidir.",
    ],
  },
  es6: {
    whatIs: [
      "{title} konusu, React bileşenlerinde kullandığın modern JavaScript (ES6+) sözdizimidir; kodu kısaltır ve state/props taşımayı güvenli hale getirir.",
    ],
    howItWorks: [
      "map ile dizi → JSX listesi, spread ile immutable kopya, destructuring ile props/state okuma — hepsi render döngüsünde tekrar tekrar devreye girer.",
    ],
    syntax: [
      "`const { name } = props` — destructuring.",
      "`setItems(prev => [...prev, item])` — spread ile yeni dizi.",
      "`items.map(x => <li key={x.id}>{x.name}</li>)` — liste JSX.",
    ],
    syntaxTerms: ["destructuring", "spread", "map", "key="],
    spoken: "Sepetten ürün silince spread ile yeni dizi oluşturursun; React hangi satırın kalktığını anlar.",
    mistakes: ["State dizisini push ile mutate etmek.", "map içinde key vermemek."],
  },
  jsx: {
    whatIs: [
      "JSX, JavaScript içinde HTML’e benzeyen arayüz yazma sözdizimidir; tarayıcıya giden sonuç yine JavaScript fonksiyonlarının ürettiği element ağacıdır.",
    ],
    howItWorks: [
      "Her render’da JSX ifadesi değerlendirilir; süslü parantez `{ }` içindeki ifadeler JavaScript’tir.",
    ],
    syntax: [
      "`className` (class değil), `onClick={fn}` (çağrı değil referans), `{user.name}` dinamik metin.",
    ],
    syntaxTerms: ["className", "onClick={", "{", "}", "Fragment"],
    spoken: "Ders başlığını `<h1>{lesson.title}</h1>` ile gösterirsin; title state değişince başlık da değişir.",
    mistakes: ["JSX içinde if/else statement yazmak.", "onClick={save()} yanlış bağlama."],
  },
  hooks: {
    whatIs: [
      "{title} bir React hook’udur; function component içinde state veya yan etki gibi davranışları fonksiyon çağrısıyla eklemeni sağlar.",
    ],
    howItWorks: [
      "Hook’lar her render’da aynı sırada çalışmalıdır; koşul veya döngü içine alınmaz.",
    ],
    syntax: [
      "`const [deger, setDeger] = useState(baslangic)` — state çifti.",
      "`useEffect(() => { ... }, [bagimlilik])` — render sonrası yan etki.",
    ],
    syntaxTerms: ["useState", "useEffect", "useCallback", "useMemo", "useContext", "useReducer"],
    spoken: "Gece modu düğmesi useState ile tema tutar; tıklanınca tüm sayfa yeni className alır.",
    mistakes: ["Hook’ları if içinde çağırmak.", "useEffect dependency listesini boş bırakıp sonsuz döngü."],
  },
  props: {
    whatIs: [
      "Props, ebeveyn bileşenin çocuğa verdiği salt okunur veri sözleşmesidir; çocuk props’u değiştirmez, sadece okur.",
    ],
    howItWorks: [
      "Veri yukarıdan aşağı iner; olaylar callback props ile yukarı bildirilir.",
    ],
    syntax: [
      "`function Card({ title }: { title: string })` — tipli props.",
      "`<Card title=\"React\" onSave={handle} />` — kullanım.",
    ],
    syntaxTerms: ["props", "children", "onClick", "destructuring"],
    spoken: "Sidebar’a slug listesi props olarak gider; tıklanınca parent route değiştirir.",
    mistakes: ["Child içinde parent state’ini doğrudan değiştirmeye çalışmak."],
  },
  events: {
    whatIs: [
      "React olayları (onClick, onChange, onSubmit), kullanıcı eylemlerini bileşen fonksiyonlarına bağlayan sentetik event katmanıdır.",
    ],
    howItWorks: [
      "Handler çalışınca genelde setState veya parent callback tetiklenir; UI bir sonraki render’da güncellenir.",
    ],
    syntax: [
      "`onClick={() => setOpen(true)}` — parametreli handler.",
      "`onSubmit={(e) => e.preventDefault()}` — form.",
    ],
    syntaxTerms: ["onClick", "onChange", "onSubmit", "preventDefault"],
    spoken: "Arama kutusunda her onChange ile filtre state’i güncellenir; liste anında süzülür.",
    mistakes: ["onClick={handle()} anında çağrı.", "preventDefault unutmak."],
  },
  lists: {
    whatIs: [
      "React listesi, dizi verisini `map` ile JSX öğelerine dönüştürerek ekranda tekrarlayan satırlar üretme yöntemidir.",
    ],
    howItWorks: [
      "Her öğe için kararlı `key` verilir; React hangi satırın değiştiğini böyle anlar.",
    ],
    syntax: [
      "`{items.map(item => <li key={item.id}>{item.label}</li>)}`",
    ],
    syntaxTerms: ["map", "key=", "filter"],
    spoken: "63 derslik menüde key olarak slug kullanırsın; sıra değişse bile doğru satır vurgulanır.",
    mistakes: ["Index’i key yapıp sıralama/filtre sonrası karışıklık."],
  },
  conditionals: {
    whatIs: [
      "Koşullu render, state veya props’a göre JSX’in bir bölümünü gösterme veya gizleme tekniğidir.",
    ],
    howItWorks: [
      "Ternary ve `&&` en yaygın kalıplardır; erken return ile de sadeleştirilir.",
    ],
    syntax: [
      "`{ok ? <Success /> : <Error />}` — iki dal.",
      "`{count > 0 && <List />}` — koşullu gösterim.",
    ],
    syntaxTerms: ["? :", "&&", "return null"],
    spoken: "Quiz bitmeden sonuç kartını `finished && <Score />` ile gösterirsin.",
    mistakes: ["`{count && <List />}` when count is 0 → ekranda 0 görünmesi."],
  },
  forms: {
    whatIs: [
      "React formu, input değerlerini state’e bağlayan (controlled) bileşenler bütünüdür; tek kaynak gerçeği state’tir.",
    ],
    howItWorks: [
      "onChange → setState → value güncellenir; submit’te preventDefault ile sayfa yenilenmesi engellenir.",
    ],
    syntax: [
      "`<input value={email} onChange={e => setEmail(e.target.value)} />`",
      "`<form onSubmit={e => { e.preventDefault(); ... }}>`",
    ],
    syntaxTerms: ["value=", "onChange", "onSubmit", "preventDefault", "name="],
    spoken: "Kayıt formunda e-posta yazılırken altta anlık doğrulama çıkar.",
    mistakes: ["value olmadan onChange kullanmak.", "Uncontrolled ile controlled karıştırmak."],
  },
  router: {
    whatIs: [
      "React Router, URL yolunu ekrandaki bileşenle eşleyen istemci tarafı yönlendirme kütüphanesidir.",
    ],
    howItWorks: [
      "Adres değişince ilgili route’un element’i mount olur; Link tam sayfa yenilemeden gezinir.",
    ],
    syntax: [
      "`<Route path=\"/react/:slug\" element={<Lesson />} />`",
      "`<Link to=\"/react/intro\">`",
    ],
    syntaxTerms: ["Route", "path=", "element=", "Link", "useParams"],
    spoken: "/react/react-usestate açılınca useState dersi yüklenir; sidebar sabit kalır.",
    mistakes: ["href ile tam yenileme yapıp SPA avantajını kaybetmek."],
  },
  styling: {
    whatIs: [
      "React’te stil, bileşenlere className, inline style veya CSS modülleri ile verilen görsel katmandır.",
    ],
    howItWorks: [
      "Stil dosyaları import edilir; koşullu className ile tema veya durum yansıtılır.",
    ],
    syntax: [
      "`className={isActive ? 'chip active' : 'chip'}`",
      "`style={{ padding: 8 }}`",
    ],
    syntaxTerms: ["className", "style={{", "import"],
    spoken: "Tamamlanan derste chip’e `topic-chip-done` class’ı eklenir; yeşil tik CSS’ten gelir.",
    mistakes: ["Global CSS’te isim çakışması."],
  },
  portals: {
    whatIs: [
      "Portal, bir bileşenin JSX’ini DOM ağacında başka bir düğüme (genelde body sonuna) render etme yöntemidir.",
    ],
    howItWorks: [
      "Modal katmanı layout’un dışında açılır; focus ve scroll kilidi ayrı yönetilir.",
    ],
    syntax: ["`createPortal(children, document.body)`"],
    syntaxTerms: ["createPortal"],
    spoken: "Onay modal’ı body altına portal ile çıkar; arka plan karartılır.",
    mistakes: ["Focus trap olmadan erişilebilirlik eksik bırakmak."],
  },
  suspense: {
    whatIs: [
      "Suspense, alt bileşen veri veya kod yüklenirken geçici fallback UI göstermenizi sağlayan React sınır bileşenidir.",
    ],
    howItWorks: [
      "Lazy component henüz hazır değilse fallback görünür; hazır olunca asıl içerik swap edilir.",
    ],
    syntax: ["`<Suspense fallback={<Spinner />}><LazyPage /></Suspense>`"],
    syntaxTerms: ["Suspense", "fallback=", "lazy("],
    spoken: "Ders kodu yüklenirken ‘Yükleniyor…’ skeleton, sonra içerik gelir.",
    mistakes: ["Anlamsız boş fallback."],
  },
  transitions: {
    whatIs: [
      "Transition API, düşük öncelikli state güncellemelerini kullanıcı etkileşiminden ayırarak arayüzü akıcı tutan bir React önceliklendirme katmanıdır.",
    ],
    howItWorks: [
      "startTransition ile ağır liste güncellemesi ertelenir; input anında kalır.",
    ],
    syntax: ["`startTransition(() => setFiltered(...))`"],
    syntaxTerms: ["startTransition", "useTransition"],
    spoken: "Arama kutusu anında tepki verir; ağır filtre arka planda güncellenir.",
    mistakes: ["Her setState’i transition yapmak."],
  },
  refs: {
    whatIs: [
      "Ref, render tetiklemeden DOM düğümüne veya değere erişmek için kullanılan React referansıdır.",
    ],
    howItWorks: [
      "useRef ile kutuya focus, ölçüm veya imperative API bağlanır.",
    ],
    syntax: ["`const inputRef = useRef<HTMLInputElement>(null)`", "`inputRef.current?.focus()`"],
    syntaxTerms: ["useRef", "ref=", ".current"],
    spoken: "Modal açılınca ilk input’a ref ile focus verilir.",
    mistakes: ["Ref’i state yerine her yere kullanmak."],
  },
  architecture: {
    whatIs: [
      "HOC (Higher-Order Component), mevcut bir bileşeni sarıp ek props veya davranış veren üst seviye bir React bileşen fabrikasıdır.",
    ],
    howItWorks: [
      "Amaç tekrar eden UI ve mantığı tek yerde toplamak; aşırı soyutlama kaçınılır.",
    ],
    syntax: ["`function withAuth(Component) { ... }` — HOC örneği."],
    syntaxTerms: ["children", "HOC"],
    spoken: "Layout bileşeni children ile sayfa içeriğini sarar.",
    mistakes: ["Gereksiz wrapper cehennemi."],
  },
  compiler: {
    whatIs: [
      "React Compiler, bileşen kodunu analiz ederek otomatik optimizasyon uygulayan derleme katmanıdır.",
    ],
    howItWorks: [
      "Manuel memo ihtiyacını azaltmayı hedefler; yine de ölçüm temelli karar verilir.",
    ],
    syntax: ["Derleyici yapılandırması proje seviyesindedir."],
    syntaxTerms: ["memo", "useMemo"],
    spoken: "Performans sorununda önce profiler, sonra compiler/memo kararı.",
    mistakes: ["Ölçmeden her yere memo."],
  },
  assessment: {
    whatIs: [
      "Bu modül, öğrendiklerini quiz ve alıştırmalarla ölçmen için tasarlanmış değerlendirme bölümüdür.",
    ],
    howItWorks: [
      "Soru → cevap → açıklama döngüsü ile zayıf konuları tekrar hedeflersin.",
    ],
    syntax: ["Quiz bileşenleri state ile skor tutar."],
    syntaxTerms: ["useState", "onClick"],
    spoken: "Lab bitince skor localStorage’a yazılır; sidebar ilerlemeyi gösterir.",
    mistakes: ["Yanlış cevabın açıklamasını okumadan geçmek."],
  },
  interview: {
    whatIs: [
      "Mülakat hazırlığı, React kavramlarını sözlü ve kodla net anlatma pratiğidir.",
    ],
    howItWorks: [
      "Tanım + proje örneği + trade-off üçlüsüyle cevap verilir.",
    ],
    syntax: ["Örnek: useEffect ile fetch + cleanup anlatımı."],
    syntaxTerms: ["useEffect", "useState"],
    spoken: "useState ile form, useEffect ile API — projenden somut örnek ver.",
    mistakes: ["Ezber tanım, örnek yok."],
  },
  roadmap: {
    whatIs: [
      "Çalışma planı modülü, konuları haftalık hedeflere bölerek sürdürülebilir öğrenme rotası sunar.",
    ],
    howItWorks: [
      "Her hafta konu + mini teslim + tekrar quiz önerilir.",
    ],
    syntax: ["İlerleme state veya localStorage ile takip edilebilir."],
    syntaxTerms: ["localStorage", "map"],
    spoken: "Hafta 1: JSX trio; hafta 2: state ve events — planı yaz ve takip et.",
    mistakes: ["Sadece video izleyip kod yazmamak."],
  },
  core: {
    whatIs: [
      "{title} başlığı, React uygulamasında arayüz ve davranış kurmanın bu parçasındaki rolünü tanımlayan temel konudur.",
    ],
    howItWorks: [
      "Bileşen ağacında veri akışı ve render döngüsüyle birlikte çalışır; küçük çalışan örnek kurmak en hızlı öğrenme yoludur.",
    ],
    syntax: [
      "Function component + JSX + createRoot ile minimum uygulama kurulur.",
    ],
    syntaxTerms: ["function ", "return (", "createRoot"],
    spoken: "Tek sayfalık uygulamada header, içerik ve butonu ayrı bileşen yaparsın.",
    mistakes: ["Her şeyi tek dosyada toplamak.", "State ve props’u karıştırmak."],
  },
};

function interpolate(template: string, title: string): string {
  return template.replace(/\{title\}/g, title);
}

function copyForTitle(copy: PedagogyCopy, title: string, slug: string): PedagogyCopy {
  const mapStrings = (arr: string[]) => arr.map((s) => interpolate(s, title));
  if (slug === "react-class") return copy;
  return {
    ...copy,
    whatIs: mapStrings(copy.whatIs),
    howItWorks: mapStrings(copy.howItWorks),
    syntax: mapStrings(copy.syntax),
  };
}

export function getPedagogyCopy(title: string, slug: string, focus: TopicFocus): PedagogyCopy {
  const base = focusCopy[focus] ?? focusCopy.core;
  return copyForTitle(base, title, slug);
}

export function getSyntaxTerms(title: string, slug: string, focus: TopicFocus): string[] {
  return getPedagogyCopy(title, slug, focus).syntaxTerms;
}
