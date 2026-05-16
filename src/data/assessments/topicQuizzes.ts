import type { QuizQuestion } from "../../types";
import type { TopicFocus } from "./focusDetect";
import { detectFocus } from "./focusDetect";
import { extraSlugQuizzes } from "./extraSlugQuizzes";
import { q } from "./quizHelpers";

const slugOverrides: Record<string, QuizQuestion[]> = {
  ...extraSlugQuizzes,
  "react-usestate": [
    q(
      "us-q1",
      "Aşağıdaki kodda hangi satır React kurallarına aykırıdır?",
      [
        { id: "a", text: "const [n, setN] = useState(0);" },
        { id: "b", text: "n = n + 1;" },
        { id: "c", text: "setN(n + 1)" },
      ],
      "b",
      "State doğrudan atanmaz; setter fonksiyonu kullanılmalıdır.",
      { codeContext: "const [n, setN] = useState(0);\n// n = n + 1  // yanlış", kind: "kod" },
    ),
    q(
      "us-q2",
      "useState hook'u kaç değer döndürür?",
      [
        { id: "a", text: "Güncel state ve setter fonksiyonu" },
        { id: "b", text: "Sadece state" },
        { id: "c", text: "Component referansı" },
      ],
      "a",
      "useState [state, setState] şeklinde bir dizi döndürür.",
      { kind: "kavram" },
    ),
    q(
      "us-q3",
      "Sepet uygulamasında ürün adedi artırılırken hangi yaklaşım doğrudur?",
      [
        { id: "a", text: "setCount(count + 1) veya setCount(c => c + 1)" },
        { id: "b", text: "count++" },
        { id: "c", text: "document.getElementById('count').innerText++" },
      ],
      "a",
      "React state güncellemesi setter ile yapılır; DOM'a doğrudan müdahale edilmez.",
      { kind: "senaryo" },
    ),
    q(
      "us-q4",
      "Hook'ları if bloğu içinde çağırmak neden sorun çıkarır?",
      [
        { id: "a", text: "Hook sırası renderlar arasında değişebilir" },
        { id: "b", text: "JSX kapanmaz" },
        { id: "c", text: "TypeScript hata verir" },
      ],
      "a",
      "Hook'lar her render'da aynı sırada çağrılmalıdır; koşullu çağrı bunu bozar.",
      { kind: "kavram" },
    ),
  ],
  "react-jsx-intro": [
    q(
      "jsx-q1",
      "HTML'deki class attribute JSX'te nasıl yazılır?",
      [
        { id: "a", text: "className" },
        { id: "b", text: "class" },
        { id: "c", text: "cssClass" },
      ],
      "a",
      "class JavaScript'te rezerv kelime olduğu için JSX'te className kullanılır.",
      { codeContext: '<div className="card">', kind: "kod" },
    ),
    q(
      "jsx-q2",
      "JSX ifadesi içinde JavaScript değeri göstermek için ne kullanılır?",
      [
        { id: "a", text: "Süslü parantez {}" },
        { id: "b", text: "Köşeli parantez []" },
        { id: "c", text: "Çift tırnak içinde HTML" },
      ],
      "a",
      "JSX'te dinamik değerler {expression} ile yazılır.",
      { kind: "kod" },
    ),
    q(
      "jsx-q3",
      "Aşağıdakilerden hangisi geçerli JSX döndürür?",
      [
        { id: "a", text: "return ( <> <h1>Merhaba</h1> </> );" },
        { id: "b", text: "return <h1>Merhaba</h1> <p>Alt</p>;" },
        { id: "c", text: "return if (ok) <p>OK</p>;" },
      ],
      "a",
      "Tek kök element veya Fragment gerekir; if doğrudan JSX içinde statement olamaz.",
      { kind: "kod" },
    ),
    q(
      "jsx-q4",
      "Favori renk butonları JSX ile neden okunabilir kalır?",
      [
        { id: "a", text: "UI yapısı kodda görünür, HTML ile karışmaz" },
        { id: "b", text: "Tarayıcı JSX'i otomatik çevirir" },
        { id: "c", text: "CSS zorunlu değildir" },
      ],
      "a",
      "JSX, bileşen mantığı ile görünümü aynı dosyada netleştirir.",
      { kind: "senaryo" },
    ),
  ],
  "react-props": [
    q(
      "props-q1",
      "Parent'tan child'a veri aktarmak için hangi mekanizma kullanılır?",
      [
        { id: "a", text: "Props" },
        { id: "b", text: "useRef" },
        { id: "c", text: "document.querySelector" },
      ],
      "a",
      "Props, bileşenler arası tek yönlü veri sözleşmesidir.",
      { kind: "kavram" },
    ),
    q(
      "props-q2",
      "Props'ları değiştirmek için doğru yaklaşım hangisidir?",
      [
        { id: "a", text: "Parent state güncellenir, yeni props child'a iner" },
        { id: "b", text: "Child props.title = 'yeni' yazar" },
        { id: "c", text: "Global window.title kullanılır" },
      ],
      "a",
      "Props salt okunurdur; değişim parent state üzerinden olmalıdır.",
      { kind: "senaryo" },
    ),
    q(
      "props-q3",
      "<Card title=\"React\" /> ifadesinde title nedir?",
      [
        { id: "a", text: "String tipinde bir prop" },
        { id: "b", text: "State" },
        { id: "c", text: "Event handler" },
      ],
      "a",
      "title prop olarak Card bileşenine iletilir.",
      { codeContext: '<Card title="React" />', kind: "kod" },
    ),
    q(
      "props-q4",
      "children prop ne işe yarar?",
      [
        { id: "a", text: "Bileşen etiketleri arasına yerleştirilen içeriği taşır" },
        { id: "b", text: "Sadece sayıları render eder" },
        { id: "c", text: "Router path tanımlar" },
      ],
      "a",
      "children ile slot benzeri esnek içerik verilir.",
      { kind: "kavram" },
    ),
  ],
  "react-es6-destructuring": [
    q(
      "es6d-q1",
      "const { name, age } = user ifadesi ne yapar?",
      [
        { id: "a", text: "user nesnesinden name ve age alanlarını çıkarır" },
        { id: "b", text: "Yeni bir dizi oluşturur" },
        { id: "c", text: "user'ı mutate eder" },
      ],
      "a",
      "Destructuring, nesne alanlarını değişkenlere ayırır.",
      { codeContext: "const { name, age } = user;", kind: "kod" },
    ),
    q(
      "es6d-q2",
      "Props destructuring neden tercih edilir?",
      [
        { id: "a", text: "props.title yerine doğrudan title kullanımı okunabilirliği artırır" },
        { id: "b", text: "Performansı her zaman 10x artırır" },
        { id: "c", text: "Hook kurallarını kaldırır" },
      ],
      "a",
      "Destructuring props kullanımını sadeleştirir.",
      { kind: "senaryo" },
    ),
    q(
      "es6d-q3",
      "const [first, ...rest] = items hangi ES6 özelliğini kullanır?",
      [
        { id: "a", text: "Dizi destructuring ve rest" },
        { id: "b", text: "Sadece template literal" },
        { id: "c", text: "Class inheritance" },
      ],
      "a",
      "Dizi destructuring ile ilk eleman ve kalan ayrılır.",
      { kind: "kod" },
    ),
    q(
      "es6d-q4",
      "useState dönüş değerinde destructuring örneği hangisidir?",
      [
        { id: "a", text: "const [count, setCount] = useState(0)" },
        { id: "b", text: "const count = useState(0)" },
        { id: "c", text: "useState.count = 0" },
      ],
      "a",
      "useState çift değer döndürür; dizi destructuring ile ayrılır.",
      { codeContext: "const [count, setCount] = useState(0);", kind: "kod" },
    ),
  ],
};

function focusQuizzes(focus: TopicFocus, slug: string, title: string): QuizQuestion[] {
  const base = slug.replace(/[^a-z0-9]/g, "-");
  const templates: Record<TopicFocus, QuizQuestion[]> = {
    es6: [
      q(`${base}-e1`, `${title}: ES6 ile React'te en çok hangi ihtiyaç karşılanır?`, [
        { id: "a", text: "Okunabilir modül, arrow function ve modern sözdizimi" },
        { id: "b", text: "SQL sorguları" },
        { id: "c", text: "Sunucu işletim sistemi" },
      ], "a", "React kodu ES6+ sözdizimiyle yazılır.", { kind: "kavram" }),
      q(`${base}-e2`, "Arrow function bileşenlerde neden yaygındır?", [
        { id: "a", text: "Kısa sözdizimi ve this bağlamı sürprizi azalır" },
        { id: "b", text: "JSX zorunludur" },
        { id: "c", text: "Sadece class ile çalışır" },
      ], "a", "Function component'lerde arrow function pratik bir seçimdir.", { kind: "kavram" }),
      q(`${base}-e3`, "Spread operatörü state güncellerken ne sağlar?", [
        { id: "a", text: "Immutable kopya üzerinde değişiklik" },
        { id: "b", text: "DOM'u doğrudan siler" },
        { id: "c", text: "Hook sırasını değiştirir" },
      ], "a", "...prev spread ile yeni referans oluşturulur.", {
        codeContext: "setUser(prev => ({ ...prev, name: 'Ada' }))",
        kind: "kod",
      }),
      q(`${base}-e4`, `${title} konusunu pratikte nerede görürsün?`, [
        { id: "a", text: "Props/state aktarımı ve koleksiyon işlemleri" },
        { id: "b", text: "Veritabanı indeksleme" },
        { id: "c", text: "DNS yapılandırması" },
      ], "a", "ES6 desenleri React bileşen kodunda sürekli kullanılır.", { kind: "senaryo" }),
    ],
    classComponent: [
      q(`${base}-cl1`, "Class component tanımı için hangi kalıp doğrudur?", [
        { id: "a", text: "class Car extends React.Component" },
        { id: "b", text: "function Car extends React.Component" },
        { id: "c", text: "class Car implements React" },
      ], "a", "Class bileşen React.Component'ten türetilir.", {
        codeContext: "class Car extends React.Component { render() { return <div />; } }",
        kind: "kod",
      }),
      q(`${base}-cl2`, "Constructor içinde neden super(props) çağrılır?", [
        { id: "a", text: "Üst sınıf zincirini başlatmak ve props erişimi" },
        { id: "b", text: "Sadece stil için" },
        { id: "c", text: "render'ı iptal etmek için" },
      ], "a", "super(props) olmadan this.props güvenilir olmayabilir.", { kind: "kavram" }),
      q(`${base}-cl3`, "State güncellemesi class bileşende nasıl yapılmalı?", [
        { id: "a", text: "this.setState({ ... })" },
        { id: "b", text: "this.state.count++ doğrudan" },
        { id: "c", text: "document.body.innerHTML" },
      ], "a", "setState render tetikler; doğrudan mutasyon hatalı davranış üretir.", { kind: "kod" }),
      q(`${base}-cl4`, "componentDidMount tipik olarak ne için kullanılır?", [
        { id: "a", text: "İlk render sonrası API veya abonelik başlatma" },
        { id: "b", text: "JSX döndürme" },
        { id: "c", text: "Props'u child'ta değiştirme" },
      ], "a", "Mount sonrası yan etkiler DidMount'ta toplanır.", { kind: "senaryo" }),
    ],
    jsx: slugOverrides["react-jsx-intro"] ?? [],
    hooks: slugOverrides["react-usestate"] ?? [
      q(`${base}-h1`, "Hook'lar hangi bileşen türünde çalışır?", [
        { id: "a", text: "Function component" },
        { id: "b", text: "Class component içinde serbestçe" },
        { id: "c", text: "Sadece index.html" },
      ], "a", "Hook'lar function component ve custom hook'larda kullanılır.", { kind: "kavram" }),
      q(`${base}-h2`, "useEffect ne zaman çalışır?", [
        { id: "a", text: "Render sonrası, dependency'e göre" },
        { id: "b", text: "Sadece import sırasında" },
        { id: "c", text: "Her JSX satırında" },
      ], "a", "Effect, paint sonrası yan etkiler için çalışır.", { kind: "kavram" }),
      q(`${base}-h3`, "Boş dependency [] ne anlama gelir?", [
        { id: "a", text: "Yalnızca mount'ta çalış" },
        { id: "b", text: "Her render'da çalış" },
        { id: "c", text: "Hiç çalışma" },
      ], "a", "[] mount/unmount yaşam döngüsü için kullanılır.", { codeContext: "useEffect(() => {}, []);", kind: "kod" }),
      q(`${base}-h4`, `${title} ile ilgili yaygın hata hangisidir?`, [
        { id: "a", text: "Dependency listesini eksik bırakmak" },
        { id: "b", text: "className kullanmak" },
        { id: "c", text: "Fragment kullanmak" },
      ], "a", "Eksik dependency sonsuz veya eski closure sorunları doğurur.", { kind: "senaryo" }),
    ],
    props: slugOverrides["react-props"] ?? [],
    events: [
      q(`${base}-ev1`, "React event handler'da parametre nasıl iletilir?", [
        { id: "a", text: "onClick={() => handle(id)} gibi closure" },
        { id: "b", text: "onClick içinde handle(id) anında çağrı" },
        { id: "c", text: "onclick HTML attribute" },
      ], "a", "Fonksiyon referansı veya arrow ile çağrı zamanı kontrol edilir.", { kind: "kod" }),
      q(`${base}-ev2`, "Synthetic event ne sağlar?", [
        { id: "a", text: "Tarayıcılar arası tutarlı event API" },
        { id: "b", text: "CSS modülleri" },
        { id: "c", text: "Server-side rendering" },
      ], "a", "React event sistemi tutarlılık için sarmalar.", { kind: "kavram" }),
      q(`${base}-ev3`, "Form submit'te sayfa yenilenmesini engellemek için?", [
        { id: "a", text: "e.preventDefault()" },
        { id: "b", text: "return false only" },
        { id: "c", text: "type='button' yeterli" },
      ], "a", "preventDefault varsayılan submit davranışını durdurur.", { kind: "kod" }),
      q(`${base}-ev4`, `${title}: buton tıklanınca state güncellemesi nasıl olmalı?`, [
        { id: "a", text: "Setter ile" },
        { id: "b", text: "DOM innerHTML ile" },
        { id: "c", text: "Global değişken mutate" },
      ], "a", "React'te UI state üzerinden güncellenir.", { kind: "senaryo" }),
    ],
    forms: [
      q(`${base}-f1`, "Controlled input'ta değer nereden gelir?", [
        { id: "a", text: "React state" },
        { id: "b", text: "DOM'un kendi hafızası tek kaynak" },
        { id: "c", text: "localStorage otomatik" },
      ], "a", "value ve onChange ile React tek kaynak olur.", {
        codeContext: "value + onChange ile controlled input",
        kind: "kod",
      }),
      q(`${base}-f2`, "Checkbox controlled kullanımı hangisidir?", [
        { id: "a", text: "checked + onChange ile state bağlı" },
        { id: "b", text: "defaultChecked only, state yok" },
        { id: "c", text: "checked attribute statik" },
      ], "a", "checked + onChange controlled desendir.", { kind: "kod" }),
      q(`${base}-f3`, "Çoklu input'u tek state'te tutmak için?", [
        { id: "a", text: "name alanı + spread ile form object" },
        { id: "b", text: "Her input için ayrı document" },
        { id: "c", text: "innerHTML" },
      ], "a", "Form state objesi yaygın desendir.", { kind: "senaryo" }),
      q(`${base}-f4`, `${title}: validation mesajı ne zaman gösterilmeli?`, [
        { id: "a", text: "Submit veya blur sonrası anlamlı geri bildirimle" },
        { id: "b", text: "Hiç gösterilmez" },
        { id: "c", text: "Sadece console.log" },
      ], "a", "Kullanıcıya UI'da net hata gösterilir.", { kind: "senaryo" }),
    ],
    lists: [
      q(`${base}-l1`, "Liste render'da key neden önemlidir?", [
        { id: "a", text: "React hangi öğenin değiştiğini bilir" },
        { id: "b", text: "CSS yüklenir" },
        { id: "c", text: "Hook sırası sabitlenir" },
      ], "a", "Stabil key performans ve doğru güncelleme sağlar.", { kind: "kavram" }),
      q(`${base}-l2`, "map içinde index key kullanımı ne zaman risklidir?", [
        { id: "a", text: "Liste sıralama/filtreleme değişince" },
        { id: "b", text: "Hiçbir zaman" },
        { id: "c", text: "Sadece static listede" },
      ], "a", "Sıra değişince yanlış DOM eşlemesi olabilir.", { kind: "senaryo" }),
      q(`${base}-l3`, "Boş liste için UX ne olmalı?", [
        { id: "a", text: "Empty state mesajı" },
        { id: "b", text: "Hiçbir şey render etme" },
        { id: "c", text: "Hata fırlat" },
      ], "a", "Kullanıcıya bilgi veren boş durum gösterilir.", { kind: "senaryo" }),
      q(`${base}-l4`, "Liste render: map ile li öğesi ve benzersiz key prop kullanımı doğru mu?", [
        { id: "a", text: "Evet, stabil id ile" },
        { id: "b", text: "Hayır, key asla kullanılmaz" },
        { id: "c", text: "Sadece class component'te" },
      ], "a", "Benzersiz stabil key best practice'tir.", { codeContext: "key prop ile item.id", kind: "kod" }),
    ],
    conditionals: [
      q(`${base}-c1`, "loading && Spinner bileşeni ifadesinde loading false ise?", [
        { id: "a", text: "Spinner render edilmez" },
        { id: "b", text: "Spinner her zaman görünür" },
        { id: "c", text: "Hata oluşur" },
      ], "a", "&& kısa devre ile koşullu render yapılır.", { kind: "kod" }),
      q(`${base}-c2`, "items.length && List bileşeni riski nedir?", [
        { id: "a", text: "length 0 iken ekranda 0 görünebilir" },
        { id: "b", text: "Hiç risk yok" },
        { id: "c", text: "Sadece TypeScript'te" },
      ], "a", "length > 0 veya ternary daha güvenlidir.", { kind: "kod" }),
      q(`${base}-c3`, "Üç durumlu UI (loading/error/data) için iyi desen?", [
        { id: "a", text: "if/early return veya ayrı koşullu bloklar" },
        { id: "b", text: "Hepsini aynı anda render et" },
        { id: "c", text: "Sadece CSS ile gizle" },
      ], "a", "Durumlar birbirini dışlamalıdır.", { kind: "senaryo" }),
      q(`${base}-c4`, `${title} ile kullanıcıya hata nasıl gösterilir?`, [
        { id: "a", text: "error state true iken mesaj bileşeni" },
        { id: "b", text: "alert only" },
        { id: "c", text: "console.error yeterli" },
      ], "a", "UI'da anlaşılır hata durumu gösterilir.", { kind: "senaryo" }),
    ],
    router: [
      q(`${base}-r1`, "SPA'da sayfa yenilemeden gezinme için?", [
        { id: "a", text: "React Router Link/Route" },
        { id: "b", text: "Her tıklamada location.reload" },
        { id: "c", text: "iframe" },
      ], "a", "Client-side routing kullanılır.", { kind: "kavram" }),
      q(`${base}-r2`, "Route path='/users/:id' içinde :id nedir?", [
        { id: "a", text: "Dinamik URL parametresi" },
        { id: "b", text: "CSS class" },
        { id: "c", text: "Query string" },
      ], "a", "Param route segmentini yakalar.", { kind: "kod" }),
      q(`${base}-r3`, "useParams hook ne döndürür?", [
        { id: "a", text: "URL parametrelerini object olarak" },
        { id: "b", text: "Tüm API yanıtını" },
        { id: "c", text: "CSS modüllerini" },
      ], "a", "Parametreler bileşende okunur.", { kind: "kavram" }),
      q(`${base}-r4`, `${title}: dashboard alt sayfaları nasıl organize edilir?`, [
        { id: "a", text: "İç içe Route yapısı" },
        { id: "b", text: "Tek dev JSX dosyası, route yok" },
        { id: "c", text: "Her link full reload" },
      ], "a", "Nested route ile modüler yapı kurulur.", { kind: "senaryo" }),
    ],
    styling: [
      q(`${base}-s1`, "CSS Modules'te class nasıl import edilir?", [
        { id: "a", text: "import styles from './X.module.css'" },
        { id: "b", text: "link tag only" },
        { id: "c", text: "inline style zorunlu" },
      ], "a", "Modül scoped class üretir.", { kind: "kod" }),
      q(`${base}-s2`, "Inline style object'te property adları?", [
        { id: "a", text: "camelCase (backgroundColor)" },
        { id: "b", text: "kebab-case (background-color)" },
        { id: "c", text: "snake_case" },
      ], "a", "JS object olduğu için camelCase kullanılır.", { kind: "kod" }),
      q(`${base}-s3`, "Global CSS riski nedir?", [
        { id: "a", text: "Class çakışması" },
        { id: "b", text: "Hook hatası" },
        { id: "c", text: "Router bozulur" },
      ], "a", "İsim çakışması bileşenler arası sızabilir.", { kind: "kavram" }),
      q(`${base}-s4`, `${title}: tema rengini bileşen bazlı yönetmek için?`, [
        { id: "a", text: "CSS Module veya CSS-in-JS" },
        { id: "b", text: "Her yerde !important" },
        { id: "c", text: "table layout" },
      ], "a", "Scoped stil bakımı kolaylaştırır.", { kind: "senaryo" }),
    ],
    portals: [
      q(`${base}-p1`, "createPortal ne işe yarar?", [
        { id: "a", text: "DOM'da farklı node'a render" },
        { id: "b", text: "State sıfırlar" },
        { id: "c", text: "API çağrısı" },
      ], "a", "Modal gibi overlay'ler için kullanılır.", { kind: "kavram" }),
      q(`${base}-p2`, "Modal açıkken focus yönetimi neden önemli?", [
        { id: "a", text: "Erişilebilirlik ve klavye tuşu" },
        { id: "b", text: "Sadece renk" },
        { id: "c", text: "Performans düşer" },
      ], "a", "Focus trap kullanıcı deneyimi için kritiktir.", { kind: "senaryo" }),
      q(`${base}-p3`, "Portal ile modal hâlâ React ağacında mı?", [
        { id: "a", text: "Evet, context ve event bubble korunur" },
        { id: "b", text: "Hayır, tamamen kopuk" },
        { id: "c", text: "Sadece class'ta" },
      ], "a", "Portal DOM konumunu değiştirir, ağaç bağını koparmaz.", { kind: "kavram" }),
      q(`${base}-p4`, `${title} kullanım senaryosu?`, [
        { id: "a", text: "Tooltip, modal, dropdown" },
        { id: "b", text: "Veritabanı migration" },
        { id: "c", text: "Unit test runner" },
      ], "a", "Katmanlı UI öğeleri portal adayıdır.", { kind: "senaryo" }),
    ],
    suspense: [
      q(`${base}-su1`, "Suspense fallback ne zaman görünür?", [
        { id: "a", text: "Alt ağaç veri/kod beklerken" },
        { id: "b", text: "Her click'te" },
        { id: "c", text: "Build time'da" },
      ], "a", "Bekleme süresince fallback UI gösterilir.", { kind: "kavram" }),
      q(`${base}-su2`, "lazy() ile birlikte hangi bileşen gerekir?", [
        { id: "a", text: "Suspense sınırı" },
        { id: "b", text: "useMemo only" },
        { id: "c", text: "Class component" },
      ], "a", "Lazy yükleme Suspense ile sarılır.", { kind: "kod" }),
      q(`${base}-su3`, "Kötü fallback UX nedir?", [
        { id: "a", text: "Boş ekran veya anlamsız spinner" },
        { id: "b", text: "Skeleton veya mesaj" },
        { id: "c", text: "Progress bar" },
      ], "a", "Boş/anlamsız fallback kullanıcıyı şaşırtır.", { kind: "senaryo" }),
      q(`${base}-su4`, `${title} ile code splitting ilişkisi?`, [
        { id: "a", text: "Parça yüklenirken fallback gösterilir" },
        { id: "b", text: "İlgisiz" },
        { id: "c", text: "Sadece CSS için" },
      ], "a", "Suspense lazy route/component ile kullanılır.", { kind: "senaryo" }),
    ],
    transitions: [
      q(`${base}-t1`, "useTransition ne sağlar?", [
        { id: "a", text: "Acil/güncel olmayan güncellemeleri ayırır" },
        { id: "b", text: "CSS import" },
        { id: "c", text: "Router tanımı" },
      ], "a", "UI responsive kalır.", { kind: "kavram" }),
      q(`${base}-t2`, "Ağır filtreleme hangi hook ile yumuşatılır?", [
        { id: "a", text: "useTransition veya useDeferredValue" },
        { id: "b", text: "useRef only" },
        { id: "c", text: "useId" },
      ], "a", "Transition API ağır güncellemeleri erteler.", { kind: "senaryo" }),
      q(`${base}-t3`, "isPending true iken ne gösterilir?", [
        { id: "a", text: "Genelde loading göstergesi" },
        { id: "b", text: "Hiçbir şey değişmez" },
        { id: "c", text: "Sayfa kapanır" },
      ], "a", "Pending state ile geri bildirim verilir.", { kind: "kod" }),
      q(`${base}-t4`, `${title} ne zaman gereksizdir?`, [
        { id: "a", text: "Zaten hızlı güncellemelerde" },
        { id: "b", text: "Her state'te zorunlu" },
        { id: "c", text: "Formlarda asla" },
      ], "a", "Ölçmeden transition eklemek karmaşıklık artırır.", { kind: "senaryo" }),
    ],
    refs: [
      q(`${base}-rf1`, "useRef DOM node referansı için uygun mu?", [
        { id: "a", text: "Evet, .current ile" },
        { id: "b", text: "Hayır, sadece sayı" },
        { id: "c", text: "Sadece class'ta" },
      ], "a", "ref prop ile DOM node erişilir.", { kind: "kod" }),
      q(`${base}-rf2`, "Ref güncellemesi re-render tetikler mi?", [
        { id: "a", text: "Hayır" },
        { id: "b", text: "Her zaman" },
        { id: "c", text: "Sadece production'da" },
      ], "a", "Ref mutable kutudur, render tetiklemez.", { kind: "kavram" }),
      q(`${base}-rf3`, "forwardRef ne zaman gerekir?", [
        { id: "a", text: "Parent'ın child DOM'una ref iletmesi" },
        { id: "b", text: "Router için" },
        { id: "c", text: "CSS için" },
      ], "a", "Bileşen ref'i child'a iletir.", { kind: "kavram" }),
      q(`${base}-rf4`, `${title}: input focus için hangi API?`, [
        { id: "a", text: "useRef + inputRef.current?.focus()" },
        { id: "b", text: "document.querySelector only" },
        { id: "c", text: "useState('focused')" },
      ], "a", "Ref ile imperative focus yaygındır.", { kind: "senaryo" }),
    ],
    architecture: [
      q(`${base}-a1`, "HOC ne yapar?", [
        { id: "a", text: "Bileşeni sarmalayıp ek props ve logic verir" },
        { id: "b", text: "CSS yükler" },
        { id: "c", text: "Veritabanı bağlar" },
      ], "a", "Higher-order component composition desenidir.", { kind: "kavram" }),
      q(`${base}-a2`, "HOC yerine modern alternatif?", [
        { id: "a", text: "Custom hook + composition" },
        { id: "b", text: "jQuery" },
        { id: "c", text: "Global variables" },
      ], "a", "Hook'lar çoğu HOC use case'ini karşılar.", { kind: "senaryo" }),
      q(`${base}-a3`, "Wrapper hell riski nedir?", [
        { id: "a", text: "Çok fazla sarmalayıcı, debug zor" },
        { id: "b", text: "Daha hızlı render" },
        { id: "c", text: "Otomatik test" },
      ], "a", "Aşırı HOC okunabilirliği düşürür.", { kind: "senaryo" }),
      q(`${base}-a4`, `${title} ne zaman mantıklı?`, [
        { id: "a", text: "Ortak yetki/logging sarmalayıcısı" },
        { id: "b", text: "Her küçük buton için" },
        { id: "c", text: "Stil için zorunlu" },
      ], "a", "Cross-cutting concern'lerde kullanılmıştır.", { kind: "senaryo" }),
    ],
    compiler: [
      q(`${base}-cp1`, "React Compiler amacı?", [
        { id: "a", text: "Otomatik memoization / optimizasyon" },
        { id: "b", text: "HTML üretmek" },
        { id: "c", text: "Git branch" },
      ], "a", "Derleme zamanı React optimizasyonu hedefler.", { kind: "kavram" }),
      q(`${base}-cp2`, "Manuel useMemo her zaman gerekli mi?", [
        { id: "a", text: "Hayır, ölçüm sonrası karar" },
        { id: "b", text: "Evet, her değişkende" },
        { id: "c", text: "Sadece JSX'te" },
      ], "a", "Erken optimizasyon gereksiz karmaşıklık ekler.", { kind: "senaryo" }),
      q(`${base}-cp3`, "Build çıktısını anlamak neden önemli?", [
        { id: "a", text: "Bundle boyutu ve performans" },
        { id: "b", text: "Sadece renk" },
        { id: "c", text: "Router path" },
      ], "a", "Üretim davranışı build'e bağlıdır.", { kind: "kavram" }),
      q(`${base}-cp4`, `${title} geliştirici için çıkarım?`, [
        { id: "a", text: "Önce doğru model, sonra optimizasyon" },
        { id: "b", text: "Sadece ezber API" },
        { id: "c", text: "CSS önemsiz" },
      ], "a", "Anlamlı kod compiler'dan önce gelir.", { kind: "senaryo" }),
    ],
    assessment: [
      q(`${base}-as1`, "Quiz sonrası en iyi tekrar yöntemi?", [
        { id: "a", text: "Yanlış soruyu kodla yeniden denemek" },
        { id: "b", text: "Sadece cevaba bakmak" },
        { id: "c", text: "Konuyu atlamak" },
      ], "a", "Pratik tekrar kalıcılığı artırır.", { kind: "senaryo" }),
      q(`${base}-as2`, "Bu platformdaki laboratuvar amacı?", [
        { id: "a", text: "Konuyu anlayıp uygulamak" },
        { id: "b", text: "Puan kasmak only" },
        { id: "c", text: "Kopyala yapıştır" },
      ], "a", "Öğrenme döngüsünü destekler.", { kind: "kavram" }),
      q(`${base}-as3`, "Sertifika hazırlığında ne öncelikli?", [
        { id: "a", text: "Tüm modül konularını çalışıp mini proje" },
        { id: "b", text: "Sadece tek hook" },
        { id: "c", text: "CSS yok saymak" },
      ], "a", "Geniş müfredat + pratik gerekir.", { kind: "senaryo" }),
      q(`${base}-as4`, `${title} ile ilerleme nasıl takip edilir?`, [
        { id: "a", text: "Hoca paneli / localStorage" },
        { id: "b", text: "Screenshot only" },
        { id: "c", text: "Takip gerekmez" },
      ], "a", "İlerleme kaydı motivasyon sağlar.", { kind: "senaryo" }),
    ],
    interview: [
      q(`${base}-i1`, "useState vs useReducer seçimi?", [
        { id: "a", text: "Karmaşık state geçişlerinde useReducer" },
        { id: "b", text: "Her zaman useState yeterli" },
        { id: "c", text: "Hiç fark yok" },
      ], "a", "Karmaşık kurallarda reducer netlik sağlar.", { kind: "senaryo" }),
      q(`${base}-i2`, "React'te key prop mülakat sorusu?", [
        { id: "a", text: "Kimlik ve reconcile" },
        { id: "b", text: "SEO only" },
        { id: "c", text: "CSS module" },
      ], "a", "Key, liste güncellemelerinde kritiktir.", { kind: "kavram" }),
      q(`${base}-i3`, "Virtual DOM kısa açıklama?", [
        { id: "a", text: "Bellekteki ağaç ile minimal DOM güncellemesi" },
        { id: "b", text: "Gerçek DOM'un kopyası değil, soyut model" },
        { id: "c", text: "Sadece CSS" },
      ], "a", "React değişiklikleri önce sanal ağaçta hesaplar.", { kind: "kavram" }),
      q(`${base}-i4`, `${title}: kendi projeni anlatırken?`, [
        { id: "a", text: "Problem, çözüm, trade-off, sonuç" },
        { id: "b", text: "Sadece teknoloji listesi" },
        { id: "c", text: "Ezber cevap" },
      ], "a", "Yapılandırılmış anlatım güven verir.", { kind: "senaryo" }),
    ],
    roadmap: [
      q(`${base}-rd1`, "Haftalık plan neden işe yarar?", [
        { id: "a", text: "Ölçülebilir hedef koyar" },
        { id: "b", text: "Rastgele okumayı artırır" },
        { id: "c", text: "Pratiği engeller" },
      ], "a", "Plan sürdürülebilir öğrenme sağlar.", { kind: "senaryo" }),
      q(`${base}-rd2`, "Sadece video izlemek yeterli mi?", [
        { id: "a", text: "Hayır, kod yazmak şart" },
        { id: "b", text: "Evet, tam yeterli" },
        { id: "c", text: "Sadece quiz" },
      ], "a", "Aktif pratik olmadan kalıcılık düşük.", { kind: "senaryo" }),
      q(`${base}-rd3`, "Bootcamp çıktısı ne olmalı?", [
        { id: "a", text: "Portfolyo projeleri" },
        { id: "b", text: "Sadece sertifika PDF" },
        { id: "c", text: "Not defteri" },
      ], "a", "Somut proje mülakat için önemlidir.", { kind: "senaryo" }),
      q(`${base}-rd4`, `${title} modülü ne sunar?`, [
        { id: "a", text: "Çalışma planı ve tekrar yapısı" },
        { id: "b", text: "Sunucu hosting" },
        { id: "c", text: "Veritabanı lisansı" },
      ], "a", "Yol haritası öğrenme disiplinini destekler.", { kind: "senaryo" }),
    ],
    core: [
      q(`${base}-co1`, `createRoot ile render'ın amacı nedir? (${title})`, [
        { id: "a", text: "React ağacını DOM root'a bağlamak" },
        { id: "b", text: "CSS import" },
        { id: "c", text: "API route" },
      ], "a", "createRoot modern React giriş noktasıdır.", {
        codeContext: "createRoot(document.getElementById('root')!).render(React.createElement(App));",
        kind: "kod",
      }),
      q(`${base}-co2`, "Function component avantajı?", [
        { id: "a", text: "Hook'lar ve daha az boilerplate" },
        { id: "b", text: "lifecycle zorunlu" },
        { id: "c", text: "this binding" },
      ], "a", "Modern React function component merkezlidir.", { kind: "kavram" }),
      q(`${base}-co3`, "Tek yönlü veri akışı ne demek?", [
        { id: "a", text: "Veri parent'tan child'a iner" },
        { id: "b", text: "Child parent state'i doğrudan değiştirir" },
        { id: "c", text: "Global her yerde mutate" },
      ], "a", "Props aşağı, event/callback yukarı akar.", { kind: "kavram" }),
      q(`${base}-co4`, `${title} için ilk adım ne olmalı?`, [
        { id: "a", text: "Çalışan minimal örnek kurmak" },
        { id: "b", text: "Tüm ekosistemi öğrenmek" },
        { id: "c", text: "Optimizasyon" },
      ], "a", "Küçük çalışan parça güven verir.", { kind: "senaryo" }),
    ],
  };

  const fromFocus = templates[focus];
  if (fromFocus?.length >= 4) return fromFocus;

  return templates.core.map((question, i) => ({
    ...question,
    id: `${base}-fallback-${i}`,
    question: question.question.replace(/\([^)]+\)/, `(${title})`),
  }));
}

export function getTopicQuizzes(slug: string, title: string): QuizQuestion[] {
  if (slugOverrides[slug]?.length) return slugOverrides[slug];
  const focus = detectFocus(title, slug);
  const fromFocus = focusQuizzes(focus, slug, title);
  if (fromFocus.length > 0 && (focus !== "jsx" || !slugOverrides["react-jsx-intro"]))
    return fromFocus;
  if (focus === "jsx" && slug.includes("jsx")) return focusQuizzes("jsx", slug, title);
  return fromFocus;
}
