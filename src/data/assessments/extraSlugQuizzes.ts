import type { QuizQuestion } from "../../types";
import { q } from "./quizHelpers";

/** Slug-specific quiz overrides (plan hedefi: 20+). */
export const extraSlugQuizzes: Record<string, QuizQuestion[]> = {
  "react-intro": [
    q("intro-1", "React nedir?", [
      { id: "a", text: "Kullanıcı arayüzü oluşturmak için bir JavaScript kütüphanesi" },
      { id: "b", text: "Veritabanı sunucusu" },
      { id: "c", text: "CSS ön işlemcisi" },
    ], "a", "React UI odaklı bir kütüphanedir.", { kind: "kavram" }),
    q("intro-2", "React hangi sorunu çözer?", [
      { id: "a", text: "Büyük UI'ı bileşenlere bölerek yönetmek" },
      { id: "b", text: "DNS kayıtlarını güncellemek" },
      { id: "c", text: "SQL sorgularını derlemek" },
    ], "a", "Bileşen modeli bakımı kolaylaştırır.", { kind: "senaryo" }),
    q("intro-3", "SPA (Single Page Application) ne demektir?", [
      { id: "a", text: "Sayfa yenilemeden içerik güncellenir" },
      { id: "b", text: "Her tıkta sunucu HTML döner" },
      { id: "c", text: "Sadece bir CSS dosyası vardır" },
    ], "a", "React SPA'larda yaygındır.", { kind: "kavram" }),
    q("intro-4", "React 19 ile önerilen root API hangisidir?", [
      { id: "a", text: "createRoot" },
      { id: "b", text: "ReactDOM.render" },
      { id: "c", text: "document.render" },
    ], "a", "createRoot modern mount yöntemidir.", { kind: "kod" }),
  ],
  "react-get-started": [
    q("gs-1", "Vite ile proje oluşturmak için hangi komut kullanılır?", [
      { id: "a", text: "npm create vite@latest" },
      { id: "b", text: "npm install react-only" },
      { id: "c", text: "node start-react" },
    ], "a", "Vite hızlı geliştirme sunucusu sağlar.", { kind: "kavram" }),
    q("gs-2", "main.tsx dosyasının görevi nedir?", [
      { id: "a", text: "Uygulamayı DOM'a mount etmek" },
      { id: "b", text: "Veritabanı bağlantısı" },
      { id: "c", text: "CSS reset" },
    ], "a", "Giriş noktası genelde main.tsx'tir.", { kind: "senaryo" }),
    q("gs-3", "StrictMode ne sağlar?", [
      { id: "a", text: "Geliştirmede ek kontroller ve uyarılar" },
      { id: "b", text: "Production'da hız artışı" },
      { id: "c", text: "TypeScript derlemesi" },
    ], "a", "StrictMode geliştirme deneyimini güçlendirir.", { kind: "kavram" }),
    q("gs-4", "TSX uzantısı ne ifade eder?", [
      { id: "a", text: "TypeScript + JSX" },
      { id: "b", text: "Test XML" },
      { id: "c", text: "Template XHTML" },
    ], "a", "TSX, JSX'in TypeScript ile kullanımıdır.", { kind: "kavram" }),
  ],
  "react-first-app": [
    q("fa-1", "İlk bileşen genelde hangi dosyada tanımlanır?", [
      { id: "a", text: "App.tsx" },
      { id: "b", text: "package-lock.json" },
      { id: "c", text: "vite.config.css" },
    ], "a", "App kök bileşendir.", { kind: "kavram" }),
    q("fa-2", "Bileşen adlandırma kuralı?", [
      { id: "a", text: "PascalCase (ör. UserCard)" },
      { id: "b", text: "snake_case" },
      { id: "c", text: "UPPERCASE" },
    ], "a", "React bileşenleri PascalCase ile adlandırılır.", { kind: "kavram" }),
    q("fa-3", "export default App ne işe yarar?", [
      { id: "a", text: "App'i diğer dosyalarda import etmeyi sağlar" },
      { id: "b", text: "CSS yükler" },
      { id: "c", text: "Router kurar" },
    ], "a", "Modül sistemi ile bileşen paylaşılır.", { kind: "kod" }),
    q("fa-4", "İlk uygulamada en küçük hedef ne olmalı?", [
      { id: "a", text: "Ekranda çalışan tek bileşen" },
      { id: "b", text: "Tüm ekosistemi kurmak" },
      { id: "c", text: "E2E test suite" },
    ], "a", "Küçük çalışan parça güven verir.", { kind: "senaryo" }),
  ],
  "react-useeffect": [
    q("ue-1", "useEffect ne zaman çalışır?", [
      { id: "a", text: "Render commit sonrası" },
      { id: "b", text: "Import anında" },
      { id: "c", text: "Her JSX satırında" },
    ], "a", "Effect paint sonrası yan etkiler içindir.", { kind: "kavram" }),
    q("ue-2", "Boş dependency [] ne anlama gelir?", [
      { id: "a", text: "Mount'ta bir kez çalış (cleanup ile unmount)" },
      { id: "b", text: "Her render'da" },
      { id: "c", text: "Asla çalışmaz" },
    ], "a", "[] mount/unmount desenidir.", { kind: "kod" }),
    q("ue-3", "API fetch için effect içinde ne yapılmalı?", [
      { id: "a", text: "AbortController veya ignore flag ile iptal" },
      { id: "b", text: "State'i doğrudan mutate" },
      { id: "c", text: "document.write" },
    ], "a", "Race condition önlenmelidir.", { kind: "senaryo" }),
    q("ue-4", "Cleanup fonksiyonu ne zaman çalışır?", [
      { id: "a", text: "Yeniden effect öncesi veya unmount'ta" },
      { id: "b", text: "Sadece hata durumunda" },
      { id: "c", text: "Build sırasında" },
    ], "a", "Cleanup abonelik/timer temizler.", { kind: "kavram" }),
  ],
  "react-usecontext": [
    q("uc-1", "Context ne sorunu çözer?", [
      { id: "a", text: "Derin prop drilling'i azaltır" },
      { id: "b", text: "CSS modülleri" },
      { id: "c", text: "SQL bağlantısı" },
    ], "a", "Global benzeri veri paylaşımı sağlar.", { kind: "kavram" }),
    q("uc-2", "useContext hangi değeri döndürür?", [
      { id: "a", text: "Provider'ın value prop'u" },
      { id: "b", text: "DOM node" },
      { id: "c", text: "Router path" },
    ], "a", "En yakın Provider değeri okunur.", { kind: "kod" }),
    q("uc-3", "Tema context'i için doğru yapı?", [
      { id: "a", text: "ThemeProvider + useContext(ThemeContext)" },
      { id: "b", text: "window.theme global" },
      { id: "c", text: "Her bileşende fetch" },
    ], "a", "Provider/Consumer deseni standarttır.", { kind: "senaryo" }),
    q("uc-4", "Context aşırı kullanım riski?", [
      { id: "a", text: "Gereksiz re-render" },
      { id: "b", text: "TypeScript kapanır" },
      { id: "c", text: "JSX çalışmaz" },
    ], "a", "Value değişince tüketiciler render olur.", { kind: "kavram" }),
  ],
  "react-usereducer": [
    q("ur-1", "useReducer ne zaman tercih edilir?", [
      { id: "a", text: "Karmaşık state geçişleri" },
      { id: "b", text: "Sadece statik metin" },
      { id: "c", text: "CSS animasyonu" },
    ], "a", "Reducer ile geçişler merkezileşir.", { kind: "kavram" }),
    q("ur-2", "dispatch ne yapar?", [
      { id: "a", text: "Action göndererek state günceller" },
      { id: "b", text: "DOM'u siler" },
      { id: "c", text: "Route değiştirir" },
    ], "a", "dispatch({ type: '...' }) pattern'i.", { kind: "kod" }),
    q("ur-3", "Reducer fonksiyonu ne döndürmeli?", [
      { id: "a", text: "Yeni state (immutable)" },
      { id: "b", text: "void" },
      { id: "c", text: "Promise" },
    ], "a", "Reducer saf fonksiyon olmalıdır.", { kind: "kavram" }),
    q("ur-4", "Sepet örneğinde action type neden önemli?", [
      { id: "a", text: "Hangi güncelleme yapılacağını belirler" },
      { id: "b", text: "CSS sınıfı seçer" },
      { id: "c", text: "Build hızını artırır" },
    ], "a", "Action type reducer dalını seçer.", { kind: "senaryo" }),
  ],
  "react-forms": [
    q("fm-1", "Controlled input'ta değer nereden gelir?", [
      { id: "a", text: "React state" },
      { id: "b", text: "DOM defaultValue" },
      { id: "c", text: "localStorage otomatik" },
    ], "a", "value + onChange ile state senkron.", { kind: "kavram" }),
    q("fm-2", "onSubmit'te preventDefault neden?", [
      { id: "a", text: "Sayfa yenilenmesini engeller" },
      { id: "b", text: "CSS yükler" },
      { id: "c", text: "Hook çağırır" },
    ], "a", "SPA'da form varsayılan navigate'i durdurur.", { kind: "kod" }),
    q("fm-3", "Çok alanlı formda state yapısı?", [
      { id: "a", text: "Tek nesne + name ile güncelleme" },
      { id: "b", text: "Her alan için global window" },
      { id: "c", text: "Sadece ref, state yok" },
    ], "a", "Nesne state form yönetimini sadeleştirir.", { kind: "senaryo" }),
    q("fm-4", "Erişilebilir label bağlantısı?", [
      { id: "a", text: "htmlFor + id eşleşmesi" },
      { id: "b", text: "placeholder yeterli" },
      { id: "c", text: "title attribute zorunlu" },
    ], "a", "Label-input ilişkisi screen reader için kritik.", { kind: "kavram" }),
  ],
  "react-router": [
    q("rt-1", "React Router ne sağlar?", [
      { id: "a", text: "URL ile görünüm eşlemesi" },
      { id: "b", text: "Veritabanı ORM" },
      { id: "c", text: "CSS grid" },
    ], "a", "Client-side routing için kullanılır.", { kind: "kavram" }),
    q("rt-2", "Route path='/about' ne yapar?", [
      { id: "a", text: "/about URL'inde bileşen gösterir" },
      { id: "b", text: "API çağrısı" },
      { id: "c", text: "State sıfırlar" },
    ], "a", "Path eşleşince element render edilir.", { kind: "kod" }),
    q("rt-3", "Link vs <a href> farkı?", [
      { id: "a", text: "Link tam sayfa yenilemeden gezinir" },
      { id: "b", text: "Fark yok" },
      { id: "c", text: "Link sadece CSS" },
    ], "a", "SPA'da Link client navigation kullanır.", { kind: "senaryo" }),
    q("rt-4", "useParams ne için?", [
      { id: "a", text: "Dinamik route parametrelerini okumak" },
      { id: "b", text: "CSS modülü" },
      { id: "c", text: "Reducer tanımı" },
    ], "a", "ör. /users/:id içindeki id.", { kind: "kavram" }),
  ],
  "react-events": [
    q("ev-1", "React'te olay adları nasıl yazılır?", [
      { id: "a", text: "camelCase (onClick)" },
      { id: "b", text: "onclick küçük" },
      { id: "c", text: "ON_CLICK" },
    ], "a", "Synthetic event sistemi camelCase kullanır.", { kind: "kavram" }),
    q("ev-2", "onClick handler'a ne geçirilir?", [
      { id: "a", text: "Fonksiyon referansı (onClick={handle})" },
      { id: "b", text: "handle() anında çağrı" },
      { id: "c", text: "String 'alert()'" },
    ], "a", "onClick={fn} doğru; onClick={fn()} yanlış.", { kind: "kod" }),
    q("ev-3", "event.preventDefault() ne zaman?", [
      { id: "a", text: "Varsayılan tarayıcı davranışını durdurmak" },
      { id: "b", text: "State güncellemek" },
      { id: "c", text: "Component unmount" },
    ], "a", "Form/link varsayılanını engellemek için.", { kind: "senaryo" }),
    q("ev-4", "Parent'a bilgi iletmek için?", [
      { id: "a", text: "Callback prop (onSave)" },
      { id: "b", text: "Child parent state mutate" },
      { id: "c", text: "document.cookie" },
    ], "a", "Veri yukarı callback ile akar.", { kind: "kavram" }),
  ],
  "react-lists": [
    q("ls-1", "Liste render'da map neden kullanılır?", [
      { id: "a", text: "Diziyi JSX öğelerine dönüştürmek" },
      { id: "b", text: "CSS import" },
      { id: "c", text: "API auth" },
    ], "a", "items.map(item => <li key=...>) pattern'i.", { kind: "kavram" }),
    q("ls-2", "key prop neden önemli?", [
      { id: "a", text: "React'in öğeleri doğru eşlemesi" },
      { id: "b", text: "SEO zorunluluğu" },
      { id: "c", text: "TypeScript tipi" },
    ], "a", "Kararlı key performans ve doğruluk sağlar.", { kind: "kavram" }),
    q("ls-3", "Index key riski?", [
      { id: "a", text: "Sıra değişince yanlış güncelleme" },
      { id: "b", text: "Hiç risk yok" },
      { id: "c", text: "Build hatası" },
    ], "a", "Filtre/sıralamada index key sorunlu olabilir.", { kind: "senaryo" }),
    q("ls-4", "Boş liste UX?", [
      { id: "a", text: "Empty state mesajı göstermek" },
      { id: "b", text: "null döndürmek yeterli her zaman" },
      { id: "c", text: "throw Error" },
    ], "a", "Kullanıcıya bilgi veren boş durum iyi pratiktir.", { kind: "senaryo" }),
  ],
  "react-components": [
    q("cp-1", "Bileşen nedir?", [
      { id: "a", text: "UI'ın yeniden kullanılabilir parçası" },
      { id: "b", text: "npm paketi zorunluluğu" },
      { id: "c", text: "SQL tablosu" },
    ], "a", "Bileşenler UI modülerliği sağlar.", { kind: "kavram" }),
    q("cp-2", "Function component return tipi?", [
      { id: "a", text: "JSX (ReactNode)" },
      { id: "b", text: "number" },
      { id: "c", text: "void zorunlu" },
    ], "a", "Render JSX döndürür.", { kind: "kod" }),
    q("cp-3", "Tek sorumluluk ilkesi?", [
      { id: "a", text: "Bileşen tek işe odaklanmalı" },
      { id: "b", text: "Tek dosyada tüm uygulama" },
      { id: "c", text: "Props kullanmamak" },
    ], "a", "Küçük bileşenler bakımı kolaylaştırır.", { kind: "senaryo" }),
    q("cp-4", "Bileşen kompozisyonu ne demek?", [
      { id: "a", text: "Küçük parçaları birleştirerek UI kurmak" },
      { id: "b", text: "Sadece class kullanmak" },
      { id: "c", text: "Global CSS" },
    ], "a", "children ve nesting ile esnek yapı.", { kind: "kavram" }),
  ],
  "react-memo": [
    q("mm-1", "React.memo ne yapar?", [
      { id: "a", text: "Props değişmediyse yeniden render'ı atlar" },
      { id: "b", text: "State saklar" },
      { id: "c", text: "Router kurar" },
    ], "a", "Memoization performans içindir.", { kind: "kavram" }),
    q("mm-2", "memo ne zaman mantıklı?", [
      { id: "a", text: "Pahalı render + sık parent güncellemesi" },
      { id: "b", text: "Her bileşende zorunlu" },
      { id: "c", text: "Hiçbir zaman" },
    ], "a", "Ölçmeden memo eklenmemeli.", { kind: "senaryo" }),
    q("mm-3", "useMemo ile React.memo farkı?", [
      { id: "a", text: "useMemo değer cache'ler; memo bileşen cache'ler" },
      { id: "b", text: "Aynı şey" },
      { id: "c", text: "useMemo routing" },
    ], "a", "Farklı optimizasyon katmanlarıdır.", { kind: "kavram" }),
    q("mm-4", "Inline object prop memo'yu bozar mı?", [
      { id: "a", text: "Evet, her render yeni referans" },
      { id: "b", text: "Hayır, hiç etkilemez" },
      { id: "c", text: "Sadece production'da" },
    ], "a", "Referans eşitliği shallow compare'da önemli.", { kind: "kod" }),
  ],
  "react-conditionals": [
    q("cd-1", "Koşullu render için yaygın pattern?", [
      { id: "a", text: "condition && <Component />" },
      { id: "b", text: "if JSX içinde statement" },
      { id: "c", text: "for döngüsü return dışında" },
    ], "a", "&& ve ternary JSX içinde kullanılır.", { kind: "kod" }),
    q("cd-2", "loading ? <Spinner /> : <Content /> ne?", [
      { id: "a", text: "Ternary ile koşullu render" },
      { id: "b", text: "Hook tanımı" },
      { id: "c", text: "CSS module" },
    ], "a", "İki dal arasında seçim yapar.", { kind: "kavram" }),
    q("cd-3", "Erken return (early return) avantajı?", [
      { id: "a", text: "İç içe if azalır, okunabilirlik artar" },
      { id: "b", text: "Performans her zaman 100x" },
      { id: "c", text: "Hook kurallarını kaldırır" },
    ], "a", "Guard clause pattern'i.", { kind: "senaryo" }),
    q("cd-4", "0 && <List /> tuzağı?", [
      { id: "a", text: "0 render edilebilir; !!length veya >0 kullan" },
      { id: "b", text: "Sorun yok" },
      { id: "c", text: "TypeScript hata verir" },
    ], "a", "&& sol taraf 0 ise ekranda 0 görünür.", { kind: "kod" }),
  ],
  "react-es6-array-map": [
    q("map-1", "array.map React'te nerede kullanılır?", [
      { id: "a", text: "Liste JSX üretmek" },
      { id: "b", text: "Router tanımı" },
      { id: "c", text: "CSS import" },
    ], "a", "Veri dizisini UI listesine çevirir.", { kind: "kavram" }),
    q("map-2", "map callback ilk parametre?", [
      { id: "a", text: "Eleman" },
      { id: "b", text: "Index zorunlu tek parametre" },
      { id: "c", text: "Reducer state" },
    ], "a", "(item, index) => ...", { kind: "kod" }),
    q("map-3", "map vs forEach?", [
      { id: "a", text: "map yeni dizi döndürür; forEach void" },
      { id: "b", text: "Aynı" },
      { id: "c", text: "forEach JSX döndürür" },
    ], "a", "Render için map uygundur.", { kind: "kavram" }),
    q("map-4", "Filtre + map birlikte?", [
      { id: "a", text: "filter sonra map ile aktif öğeleri göstermek" },
      { id: "b", text: "Yasak" },
      { id: "c", text: "Sadece class component" },
    ], "a", "Yaygın veri pipeline deseni.", { kind: "senaryo" }),
  ],
  "react-es6-spread-operator": [
    q("sp-1", "Spread ile state güncelleme?", [
      { id: "a", text: "setState(prev => ({ ...prev, key: val }))" },
      { id: "b", text: "prev.key = val" },
      { id: "c", text: "delete prev" },
    ], "a", "Immutable güncelleme için spread.", { kind: "kod" }),
    q("sp-2", "Props spread {...props} ne yapar?", [
      { id: "a", text: "Kalan props'u child'a iletir" },
      { id: "b", text: "CSS yükler" },
      { id: "c", text: "Hook çağırır" },
    ], "a", "Wrapper bileşenlerde kullanılır.", { kind: "kavram" }),
    q("sp-3", "Dizi spread ile ekleme?", [
      { id: "a", text: "[...items, newItem]" },
      { id: "b", text: "items.push only" },
      { id: "c", text: "items = newItem" },
    ], "a", "Yeni referans ile state güncellenir.", { kind: "kod" }),
    q("sp-4", "Neden mutate etmiyoruz?", [
      { id: "a", text: "React referans değişimini takip eder" },
      { id: "b", text: "Performans her zaman düşer" },
      { id: "c", text: "JSX izin vermez" },
    ], "a", "Immutable pattern öngörülebilir render sağlar.", { kind: "senaryo" }),
  ],
  "what-is-hooks": [
    q("hi-1", "Hook'lar hangi bileşende?", [
      { id: "a", text: "Function component" },
      { id: "b", text: "Sadece class" },
      { id: "c", text: "HTML" },
    ], "a", "Modern React function + hooks.", { kind: "kavram" }),
    q("hi-2", "Hook kuralı?", [
      { id: "a", text: "Üst seviyede, koşulsuz çağır" },
      { id: "b", text: "if içinde çağır" },
      { id: "c", text: "Döngüde çağır" },
    ], "a", "Sıra her render'da aynı olmalı.", { kind: "kavram" }),
    q("hi-3", "Custom hook amacı?", [
      { id: "a", text: "Mantığı yeniden kullanılabilir fonksiyona taşımak" },
      { id: "b", text: "CSS yazmak" },
      { id: "c", text: "Build config" },
    ], "a", "useX isimlendirmesi ile paylaşılır.", { kind: "senaryo" }),
    q("hi-4", "Class'tan hooks'a geçiş sebebi?", [
      { id: "a", text: "Daha az boilerplate, net yan etki" },
      { id: "b", text: "Hook class'ta çalışmaz diye zorunlu değil" },
      { id: "c", text: "TypeScript yasak" },
    ], "a", "Ekosistem function component merkezli.", { kind: "kavram" }),
  ],
};
