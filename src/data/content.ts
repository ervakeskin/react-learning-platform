import type { ExampleProject, LessonContent, ReactCourseContent } from "../types";
import { detectFocus } from "./assessments/focusDetect";
import { applyLessonNarrative } from "./narrative/applyNarrative";
import { tutorialTopicTitles } from "./topics/tutorialTopics";

const tutorialTopics = [...tutorialTopicTitles];

const hookTopics = [
  "What is Hooks?",
  "React useState",
  "React useEffect",
  "React useContext",
  "React useRef",
  "React useReducer",
  "React useCallback",
  "React useMemo",
  "React Custom Hooks",
];

const certTopics = ["React Certificate"];

const exerciseTopics = [
  "React Compiler",
  "React Quiz",
  "React Exercises",
  "React Syllabus",
  "React Study Plan",
  "React Server",
  "React Interview Prep",
  "React Bootcamp",
];

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const focusGuide = {
  es6: {
    why: "Modern JavaScript sözdizimi React kodunu kısa ve okunaklı yapar.",
    useCase: "Destructuring, spread ve map ile props/state ve koleksiyon yönetimi.",
    pitfalls: ["State'i mutate etmek", "Spread yerine referansı paylaşmak", "map'te key unutmak"],
  },
  classComponent: {
    why: "Eski ve kurumsal kod tabanlarında class bileşenleri okuyup güvenle bakım yapmanı sağlar.",
    useCase: "setState, render ve lifecycle ile state’li class modüllerini anlamak.",
    pitfalls: ["super(props) atlamak", "State’i doğrudan mutate etmek", "render içinde yan etki açmak"],
  },
  core: {
    why: "React uygulamasının sağlam bir temel üstünde büyümesini sağlar.",
    useCase: "Yeni bir sayfa açıp minimum çalışan sürümü kısa sürede yayına almak.",
    pitfalls: ["Bileşen sınırlarını belirsiz bırakmak", "Her şeyi tek dosyada toplamak", "Veri akışını rastgele taşımak"],
  },
  jsx: {
    why: "Arayüzü okunabilir ve bakım dostu şekilde yazmanı sağlar.",
    useCase: "Kompleks kart/liste yapılarında şablonu sade tutup hızlı geliştirmek.",
    pitfalls: ["Tek root kuralını unutmak", "class yerine className kullanmamak", "JSX içinde statement yazmak"],
  },
  hooks: {
    why: "State ve yan etki yönetimini fonksiyonel bileşenlerde netleştirir.",
    useCase: "API çağrısı, local state ve performans optimizasyonunu aynı akışta yönetmek.",
    pitfalls: ["Dependency listesini eksik yazmak", "Hook sırasını koşullu değiştirmek", "Gereksiz yerde memoization yapmak"],
  },
  router: {
    why: "Uygulamanın çok sayfalı davranışını düzenli hale getirir.",
    useCase: "Dashboard, detay sayfası ve yetki bazlı route kontrolü kurmak.",
    pitfalls: ["Route yapısını plansız büyütmek", "Aktif navigation durumunu takip etmemek", "Sayfa geçişlerinde veri yüklemeyi hesapsız yapmak"],
  },
  forms: {
    why: "Kullanıcıdan veri alırken doğruluk, erişilebilirlik ve test edilebilirlik sağlar.",
    useCase: "Başvuru, kayıt veya profil düzenleme ekranlarında hatasız veri toplamak.",
    pitfalls: ["Controlled/uncontrolled karıştırmak", "Validation mesajlarını geç göstermek", "Submit akışında loading durumunu unutmamak"],
  },
  props: {
    why: "Bileşenler arası veri sözleşmesini şeffaf hale getirir.",
    useCase: "Tekrar kullanılabilir kart, tablo, modal gibi bileşen aileleri üretmek.",
    pitfalls: ["Aşırı prop drilling", "Props adlandırmasını belirsiz yapmak", "Children desenini yanlış kullanmak"],
  },
  events: {
    why: "Kullanıcı eylemlerini net aksiyonlara dönüştürür.",
    useCase: "Filtreleme, seçim, gönderme gibi UI etkileşimlerini yönetmek.",
    pitfalls: ["Event tarafında direkt state mutasyonu", "Callback zincirini gereksiz uzatmak", "Yan etkileri event içine gömmek"],
  },
  lists: {
    why: "Dinamik veriyi performanslı ve doğru anahtarlarla göstermen için kritiktir.",
    useCase: "Arama sonuçları, görev listeleri, kart ızgaraları.",
    pitfalls: ["Yanlış key kullanmak", "Filtre/sıralama sırasında index key kullanmak", "Boş liste durumunu göstermemek"],
  },
  conditionals: {
    why: "Farklı kullanıcı durumlarında doğru arayüzü üretir.",
    useCase: "Loading, empty, error, success durumlarını ayrı göstermek.",
    pitfalls: ["Koşulları iç içe karmaşık hale getirmek", "Kenar durumunu atlamak", "UI kuralını tek bir yerde merkezileştirmemek"],
  },
  styling: {
    why: "Bileşen estetiği ile okunabilirliği bir arada tutar.",
    useCase: "Tema, responsive ve bileşen bazlı stil yönetimi.",
    pitfalls: ["Global stil çakışmaları", "Aynı stilin farklı dosyalarda kopyalanması", "Renk/spacing ölçeğini rastgele kullanmak"],
  },
  portals: {
    why: "Modal, tooltip gibi katmanlı arayüzlerde DOM hiyerarşisi problemlerini çözer.",
    useCase: "Ana layout dışında render edilmesi gereken overlay öğeleri.",
    pitfalls: ["Focus yönetimini ihmal etmek", "Arka plan scroll davranışını kontrol etmemek", "Escape/close davranışını atlamak"],
  },
  suspense: {
    why: "Yükleme bekleme anlarını kullanıcı için daha akıcı hale getirir.",
    useCase: "Kod bölme ve veri bekleme sırasında fallback ekranı göstermek.",
    pitfalls: ["Fallback içeriğini anlamsız bırakmak", "Sınırları plansız yerleştirmek", "Hata sınırı ile birlikte düşünmemek"],
  },
  transitions: {
    why: "Ağır güncellemeleri kullanıcı etkileşiminden ayırarak deneyimi yumuşatır.",
    useCase: "Arama, filtreleme ve liste güncelleme anlarında takılmayı azaltmak.",
    pitfalls: ["Her state güncellemesini transition yapmak", "Önceliklendirmeyi yanlış kurmak", "Performans ölçümü yapmadan optimizasyon eklemek"],
  },
  refs: {
    why: "DOM erişimi gereken noktaları kontrollü şekilde çözmene yardım eder.",
    useCase: "Input focus, ölçüm alma, imperative API yönetimi.",
    pitfalls: ["Ref'i state yerine kullanmak", "ForwardRef sözleşmesini bozmak", "Gereksiz imperative kullanım"],
  },
  architecture: {
    why: "Kod tabanını büyürken düzenli tutar.",
    useCase: "HOC, composability ve sorumluluk ayrımı gerektiren modüller.",
    pitfalls: ["Aşırı soyutlama", "İsimlendirme karmaşası", "Test edilebilirliği ikinci plana atmak"],
  },
  compiler: {
    why: "Derleme ve performans katmanını doğru anlamanı sağlar.",
    useCase: "Build optimizasyonu ve runtime davranışı analizi.",
    pitfalls: ["Derleyici çıktısını kör kabul etmek", "Profiling yapmadan karar almak", "Küçük projede aşırı optimizasyon"],
  },
  assessment: {
    why: "Öğrenmeyi ölçer ve zayıf noktayı görünür hale getirir.",
    useCase: "Konu tekrarı sonrası mini testler ve uygulama kontrolü.",
    pitfalls: ["Sadece teorik soru çözmek", "Yanlış cevap nedenini incelememek", "Pratik üretmeden ilerlemek"],
  },
  interview: {
    why: "Gerçek teknik görüşmelerde net ve güvenli anlatım sağlar.",
    useCase: "System design light, canlı kodlama ve React teorisi hazırlanmak.",
    pitfalls: ["Ezber cevap", "Trade-off konuşmamak", "Kendi proje örneği vermemek"],
  },
  roadmap: {
    why: "Çalışma sürecini sürdürülebilir ve takip edilebilir hale getirir.",
    useCase: "Haftalık öğrenme planı, tekrar döngüsü, portfolyo hazırlığı.",
    pitfalls: ["Hedefleri ölçülemez yazmak", "Sadece içerik tüketmek", "Pratik teslim üretmemek"],
  },
} as const;

const buildTopic = (title: string, categoryTitle: string): LessonContent => {
  const slug = toSlug(title);
  const focus = detectFocus(title, slug);
  const guide = focusGuide[focus];

  const base: LessonContent = {
    id: slug,
    slug,
    title,
    summary: `${title}, ${categoryTitle} içinde ${guide.why.toLowerCase()} odaklı kritik bir başlıktır.`,
    contentBlocks: [
      {
        id: `${slug}-intro`,
        heading: "Konu Tanımı",
        paragraphs: [
          `${title} bölümünde amaç sadece API ezberlemek değil; React akışında bu başlığın neden var olduğunu anlamaktır.`,
          `Bu konuyu doğru kurduğunda ${guide.useCase.toLowerCase()} gibi gerçek senaryolarda daha az hata ve daha hızlı teslim alırsın.`,
          "Bu başlık aynı zamanda ekip içi iletişim için ortak bir teknik dil üretir; kod incelemede tartışmalar daha net ve ölçülebilir hale gelir.",
          "Özellikle büyüyen kod tabanlarında bu konunun doğru uygulanması, refactor maliyetini düşürerek uzun vadede geliştirme hızını artırır.",
        ],
      },
      {
        id: `${slug}-before-after`,
        heading: "Neden Kullanılır",
        paragraphs: [
          `${title} öğrenilmeden önce ekipler çoğu zaman davranışı hızlıca çalıştırsa da sürdürülebilirlikte zorlanır.`,
          `${title} doğru uygulandığında aynı davranış daha az yan etkiyle, daha net bileşen sınırlarıyla ve daha güvenli geliştirme döngüsüyle yönetilir.`,
          "Bu fark, özellikle proje büyüdüğünde kod inceleme hızında ve hata ayıklama süresinde net şekilde görünür.",
        ],
      },
      {
        id: `${slug}-where`,
        heading: "Temel Kullanım",
        paragraphs: [
          `Üretim projelerinde ${title} en çok kullanıcı etkileşimi, veri akışı ve bileşen organizasyonu kesişiminde ortaya çıkar.`,
          "Konuya hakim ekipler, yeni özellik eklerken geriye dönük kırılmaları azaltır ve kod inceleme sürecini hızlandırır.",
          "Bu başlığın etkisi yalnızca teknik değildir; ürün tarafında daha tutarlı deneyim, daha az beklenmeyen davranış ve daha net geri bildirim sağlar.",
          "Mülakatlarda da bu konu çoğu zaman doğrudan değil, problem çözme soruları içinde dolaylı biçimde ölçülür.",
        ],
      },
      {
        id: `${slug}-implementation`,
        heading: "İleri Kullanım",
        paragraphs: [
          "Önce minimum çalışan örneği kur, ardından kenar durumlarını ekle; bu yaklaşım hem öğrenmeyi hem bakım kolaylığını artırır.",
          "İyileştirme adımında performans, okunabilirlik ve test edilebilirlik birlikte değerlendirilmelidir.",
          "Kod yazarken yalnızca bugünün ihtiyacını değil, bir sonraki genişletme adımını da düşünmek konuya hakimiyetin temel göstergesidir.",
          "Bir yaklaşımı seçerken alternatifleri kısa notla karşılaştırmak, ekip içinde karar kalitesini artırır.",
        ],
      },
      {
        id: `${slug}-history`,
        heading: "Tarihsel/Kavramsal Bağlam",
        paragraphs: [
          `${title} başlığı React ekosisteminin erken dönemlerinden bu yana farklı sürümlerde olgunlaşarak bugünkü pratiğe dönüşmüştür.`,
          "Bu evrimi bilmek, eski projelerde neden farklı kalıplar görüldüğünü anlamanı sağlar ve migration kararlarında hata riskini düşürür.",
          "Modern yaklaşımda önerilen desenlerin arkasında, geçmişte yaşanan bakım ve performans sorunlarından öğrenilmiş güçlü gerekçeler bulunur.",
        ],
      },
      {
        id: `${slug}-advanced-usage`,
        heading: "Sık Hatalar / Anti-pattern",
        paragraphs: [
          `${title} tek başına öğrenildiğinde değil, diğer React başlıklarıyla birlikte kullanıldığında gerçek değer üretir.`,
          "Bu nedenle konuyu çalışırken props, state, event ve render ilişkisini birlikte ele almak gerekir.",
          "İleri seviyede hedef, yalnızca çalışan kod değil; ekip tarafından hızlıca okunabilen ve güvenle genişletilebilen kod yazmaktır.",
        ],
      },
    ],
    codingNotes: [
      "Veri kaynağını tek yerde tut ve görünümü o kaynaktan türet.",
      "Bileşeni küçük sorumluluklara ayır; büyük JSX bloklarını parçala.",
      "Her adımda UI durumlarını (loading/empty/error/success) kontrol et.",
      "Karmaşık bir davranış eklemeden önce mevcut davranışı test ederek güvenli genişleme yap.",
      "Kodun niyetini anlatan isimler kullan; yorum yerine doğru isimlendirme ile okunabilirliği yükselt.",
    ],
    rules: [
      "Adlandırma net olmalı: eylem, durum ve bileşen isimleri amacı anlatmalı.",
      "Önce doğru çalışan akış, sonra optimizasyon.",
      "Konuya ait kararları yorum veya kısa notla görünür bırak.",
      "Yeni özellik eklerken mevcut kullanıcı akışını kırmadığını kontrol et.",
      "Teknik kararları ölçülebilir kriterlerle (performans, okunabilirlik, test) destekle.",
    ],
    commonMistakes: [...guide.pitfalls],
    learningGoals: [
      `${title} konusunu tek başına anlatabilecek seviyeye gelmek`,
      "Konu bilgisini en az bir mini projede çalışır hale getirmek",
      "Kod kalitesi bozulmadan yeni gereksinim ekleyebilmek",
    ],
    realWorldScenario: `${title} genellikle ekip içinde sürdürülen üretim projelerinde kullanıcı davranışı, veri yönetimi ve arayüz kararlılığı aynı anda yönetilirken kritik hale gelir.`,
    deepDiveNotes: [
      `${title} konusunu öğrenirken yalnızca "nasıl" sorusuna değil "neden" sorusuna da cevap üretmek gerekir.`,
      "Teknik borcu azaltmak için kararların maliyetini (okunabilirlik, test, bakım) birlikte değerlendirmek gerekir.",
      "Konuya ait güçlü bir zihinsel model, hata ayıklama süresini dramatik biçimde düşürür.",
      "Aynı problemi iki farklı yaklaşımla çözüp trade-off kıyası yapmak öğrenmeyi kalıcı hale getirir.",
      "Kod incelemede bu başlıkla ilgili geri bildirimleri kategorize etmek, hangi alanda gelişmen gerektiğini hızla gösterir.",
    ],
    antiPatterns: [
      "Konuya ait desenleri bağlamdan kopuk kopyalamak.",
      "Kısa vadeli hız için yapı bütünlüğünü bozmak.",
      "Kenar durumları bilinçli şekilde ele almamak.",
      "Sadece mutlu yol çalışıyor diye teslim vermek.",
      "İsimlendirme ve dosya yapısı dağınık olduğu halde teknik borcu ertelemek.",
    ],
    practiceTask: `${title} kullanarak küçük bir ekran geliştir; önce temel akışı, sonra bir hata/kenar durumunu özellikle ekle.`,
    materials: [
      {
        id: `${slug}-mat-1`,
        title: "Konu Özeti",
        kind: "theory",
        content: `${title} başlığının React mimarisindeki rolü ve hangi problemi çözdüğü.`,
      },
      {
        id: `${slug}-mat-2`,
        title: "Uygulama Rehberi",
        kind: "tip",
        content: `Bu başlığı uygularken ${guide.useCase.toLowerCase()} senaryosunu referans al.`,
      },
      {
        id: `${slug}-mat-3`,
        title: "Sık Hata Uyarısı",
        kind: "warning",
        content: guide.pitfalls[0],
      },
      {
        id: `${slug}-mat-4`,
        title: "Çalışma Önerisi",
        kind: "resource",
        content: "Önce örnek kodu çalıştır, sonra aynı davranışı farklı veriyle tekrar kur ve farkları not et.",
      },
    ],
    codeSamples: [
      {
        title: `${title} | Temel`,
        language: "tsx",
        filename: "main.tsx",
        description: "Bu örnek, konunun en yalın kullanımını gösterir: küçük bir state ve kullanıcı aksiyonuna cevap veren tek bir arayüz davranışı.",
        walkthroughSteps: [
          "Bileşen açılırken başlangıç state'i tanımlanır.",
          "Kullanıcı butona bastığında state değişir.",
          "State değişimi doğrudan UI metnine yansır.",
          "Bu en temel örnek, bir sonraki genişletilmiş sürüm için güvenli temel oluşturur.",
        ],
        code: `import { useState } from "react";

export default function TopicBasic() {
  const [text, setText] = useState("${title}");

  return (
    <section>
      <h2>${title}</h2>
      <p>{text}</p>
      <button onClick={() => setText("Güncellendi")}>Güncelle</button>
    </section>
  );
}`,
      },
      {
        title: `${title} | Uygulama`,
        language: "tsx",
        filename: "main.tsx",
        description: "Bu örnek, gerçek proje hissine yakındır: koleksiyon verisi, türetilmiş değer ve kullanıcı aksiyonlarını tek akışta birleştirir.",
        walkthroughSteps: [
          "Dizi tabanlı state ile dinamik veri tutulur.",
          "useMemo ile türetilmiş değer (toplam) hesaplanır.",
          "Yeni kayıt ekleme davranışı immutable güncellemeyle yapılır.",
          "Bu yapı, performans ve okunabilirlik dengesini birlikte ele aldığı için üretim senaryosuna daha yakındır.",
        ],
        code: `import { useMemo, useState } from "react";

type Item = { id: number; label: string };

export default function TopicPractical() {
  const [items, setItems] = useState<Item[]>([{ id: 1, label: "${title}" }]);
  const total = useMemo(() => items.length, [items]);

  return (
    <section>
      <p>Toplam: {total}</p>
      <button onClick={() => setItems((prev) => [...prev, { id: Date.now(), label: "Yeni" }])}>
        Ekle
      </button>
    </section>
  );
}`,
      },
    ],
    quizQuestions: [
      {
        id: `${slug}-q1`,
        question: `${title} başlığını üretim projesinde kullanmanın en doğru nedeni nedir?`,
        options: [
          { id: "a", text: guide.why },
          { id: "b", text: "Sadece dosya sayısını artırmak" },
          { id: "c", text: "Kod okumayı zorlaştırmak" },
        ],
        correctOptionId: "a",
        explanation: "Bu başlık, uygulamanın davranışını öngörülebilir ve sürdürülebilir hale getirmek için kullanılır.",
      },
      {
        id: `${slug}-q2`,
        question: "Bu konuda en iyi öğrenme yaklaşımı hangisidir?",
        options: [
          { id: "a", text: "Minimum çalışan sürüm + kenar durum + refactor" },
          { id: "b", text: "Doğrudan karmaşık final sürüm" },
          { id: "c", text: "Sadece teorik not okumak" },
        ],
        correctOptionId: "a",
        explanation: "Kademeli öğrenme, hem kalıcı kavrayış hem daha temiz kod üretimi sağlar.",
      },
      {
        id: `${slug}-q3`,
        question: "Aşağıdakilerden hangisi bu konuda riskli bir pratiktir?",
        options: [
          { id: "a", text: guide.pitfalls[0] },
          { id: "b", text: "Anlamlı isimlendirme ile kodu sadeleştirmek" },
          { id: "c", text: "Kenar durumları test etmek" },
        ],
        correctOptionId: "a",
        explanation: "Bu hata kısa vadede görünmez olsa da büyüyen projelerde bakım maliyetini hızla artırır.",
      },
    ],
  };
  return applyLessonNarrative(base);
};

const buildClassTopic = (): LessonContent => {
  const slug = "react-class";
  return {
    id: slug,
    slug,
    title: "React Class",
    summary:
      "Class component, state ve render’ı ES6 sınıfı ve lifecycle metotlarıyla yöneten React bileşen türüdür; okuma ve bakım için hâlâ önemlidir.",
    contentBlocks: [],
    codingNotes: [
      "render içinde side effect yapma; lifecycle metotlarına dağıt.",
      "State güncellemesini her zaman `setState` ile yap.",
      "Props ve state sorumluluklarını karıştırmadan ayrı tut.",
      "Lifecycle akışını debug ederken metod sırasını log ile doğrula.",
    ],
    rules: [
      "`class X extends React.Component` kalıbını doğru kur.",
      "Constructor içinde `super(props)` çağrısını unutma.",
      "State değişimini doğrudan `this.state =` ile yapma (ilk tanım hariç).",
      "Lifecycle metodlarını gerçek ihtiyaç yoksa aşırı kullanma.",
    ],
    commonMistakes: [
      "Constructor’da `super(props)` çağrısını atlamak.",
      "State'i doğrudan mutate etmek.",
      "Lifecycle metodlarında gereksiz API çağrısı çoğaltmak.",
      "Render içinde hesaplama yükünü kontrolsüz büyütmek.",
    ],
    learningGoals: [
      "Class component temelini ve render sözleşmesini doğru kurmak",
      "Constructor/state/props ilişkisini güvenli kullanmak",
      "Lifecycle metotlarını ne zaman kullanıp ne zaman kaçınacağını bilmek",
    ],
    realWorldScenario:
      "Kurumsal projelerde halen class tabanlı modüller bulunur; bu yapılarda yeni geliştirme yaparken lifecycle ve setState davranışını doğru okumak, regresyon riskini ciddi biçimde azaltır.",
    deepDiveNotes: [
      "Class yaşam döngüsü, uygulamadaki veri akışını zaman ekseninde düşünmeyi öğretir.",
      "Hook'lara geçişte class mantığını bilmek, migration kararlarını teknik borç oluşturmadan almayı kolaylaştırır.",
      "Legacy kod tabanlarında sorunların önemli kısmı lifecycle yanlış kullanımından çıkar.",
    ],
    antiPatterns: [
      "Her güncellemede gereksiz setState çağırmak.",
      "Lifecycle metotlarını iş mantığı deposu gibi kullanmak.",
      "Props değişimini normalize etmeden render akışına taşımak.",
    ],
    practiceTask:
      "Car ve Garage adında iki class component oluştur; constructor ile başlangıç state tanımla, butonla renk güncelle, ardından `componentDidMount` içinde zamanlayıcıyla ikinci bir güncelleme yap.",
    materials: [
      {
        id: "class-mat-1",
        title: "Konu Özeti",
        kind: "theory",
        content: "Class Components, React'in state ve lifecycle geçmişini anlamak için temel başlıktır.",
      },
      {
        id: "class-mat-2",
        title: "Öğrenme Stratejisi",
        kind: "tip",
        content: "Aynı davranışı önce class, sonra function + hooks ile yazarak farkları karşılaştır.",
      },
      {
        id: "class-mat-3",
        title: "Sık Hata",
        kind: "warning",
        content: "setState yerine doğrudan state mutasyonu component davranışını bozabilir.",
      },
      {
        id: "class-mat-4",
        title: "Kaynak",
        kind: "resource",
        content: "React docs: Class Component API ve legacy lifecycle açıklamaları.",
      },
    ],
    codeSamples: [
      {
        title: "Class Component - Temel",
        language: "tsx",
        filename: "main.tsx",
        description: "Basit bir class component tanımı ve render akışını gösterir.",
        walkthroughSteps: [
          "Car sınıfı React.Component'den kalıtım alır.",
          "render metodu JSX döndürür.",
          "Component root üzerinde `<Car />` ile çalıştırılır.",
        ],
        code: `class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}

createRoot(document.getElementById("root")!).render(<Car />);`,
      },
      {
        title: "Constructor + State + setState",
        language: "tsx",
        filename: "main.tsx",
        description: "Constructor'da state kurulumu ve butonla kontrollü state güncellemesi örneğidir.",
        walkthroughSteps: [
          "Constructor içinde `super(props)` çağrılır.",
          "İlk state nesnesi tanımlanır.",
          "Buton tıklaması `setState` ile rengi günceller ve yeniden render tetikler.",
        ],
        code: `class Car extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = { color: "red" };
  }

  changeColor = () => {
    this.setState({ color: "blue" });
  };

  render() {
    return (
      <div>
        <h2>I am a {(this.state as { color: string }).color} Car!</h2>
        <button onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}`,
      },
      {
        title: "Lifecycle Akışı",
        language: "tsx",
        filename: "main.tsx",
        description: "Mount sonrası state güncellemesiyle lifecycle davranışını gözlemlemeyi sağlar.",
        walkthroughSteps: [
          "Component mount olduğunda `componentDidMount` çağrılır.",
          "setTimeout ile gecikmeli state güncellenir.",
          "Yeni state ile render tekrar çalışır.",
        ],
        code: `class Header extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = { favoritecolor: "red" };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoritecolor: "yellow" });
    }, 1000);
  }

  render() {
    return <h1>My Favorite Color is {(this.state as { favoritecolor: string }).favoritecolor}</h1>;
  }
}`,
      },
    ],
    quizQuestions: [
      {
        id: "class-q1",
        question: "Class component içinde state güncellemek için doğru yöntem hangisidir?",
        options: [
          { id: "a", text: "this.setState(...)" },
          { id: "b", text: "this.state = ... (render sırasında)" },
          { id: "c", text: "props ile doğrudan override" },
        ],
        correctOptionId: "a",
        explanation: "Class component güncellemelerinde React'in render döngüsüne girmek için setState kullanılmalıdır.",
      },
      {
        id: "class-q2",
        question: "Constructor içinde neden `super(props)` çağrılır?",
        options: [
          { id: "a", text: "Parent constructor zincirini başlatmak için" },
          { id: "b", text: "JSX dönüşünü zorunlu yapmak için" },
          { id: "c", text: "componentDidMount'u manuel çağırmak için" },
        ],
        correctOptionId: "a",
        explanation: "super(props), React.Component fonksiyonlarına erişim ve props zinciri için gereklidir.",
      },
      {
        id: "class-q3",
        question: "Updating fazında render öncesi kontrol için kullanılan method hangisidir?",
        options: [
          { id: "a", text: "shouldComponentUpdate" },
          { id: "b", text: "componentDidMount" },
          { id: "c", text: "constructor" },
        ],
        correctOptionId: "a",
        explanation: "shouldComponentUpdate, render devam etsin mi etmesin mi kararını verir.",
      },
    ],
  };
};

const buildFormsTopic = (): LessonContent => {
  const slug = "react-forms";
  return {
    id: slug,
    slug,
    title: "React Forms",
    summary:
      "React Forms, kullanıcıdan gelen veriyi kontrollü ve doğrulanabilir şekilde yönetmenin temel yoludur; üretim uygulamalarında veri kalitesini doğrudan etkiler.",
    contentBlocks: [
      {
        id: "forms-basics",
        heading: "React Forms Neden Kritik?",
        paragraphs: [
          "Formlar, ürünün kullanıcıyla en doğrudan temas ettiği katmandır. Hatalı form yönetimi veri bozulmasına ve kötü deneyime yol açar.",
          "Controlled component yaklaşımıyla input değeri React state üzerinden yönetilir; bu sayede UI ve veri her zaman senkron kalır.",
          "Büyük ölçekli projelerde form mimarisi, validasyon stratejisi ve hata mesajlarının dili bir ürün kalitesi göstergesidir.",
        ],
      },
      {
        id: "forms-controlled",
        heading: "Controlled vs Uncontrolled",
        paragraphs: [
          "Controlled formda input değeri state'e bağlıdır; değişim `onChange` ile state'e yazılır.",
          "Uncontrolled yaklaşım bazı basit senaryolarda hızlı olabilir, ancak doğrulama ve çok alanlı akışlarda izlenebilirliği düşürür.",
          "React eğitiminde önerilen varsayılan yaklaşım controlled yapıdır çünkü test ve bakım açısından öngörülebilirlik sağlar.",
        ],
      },
      {
        id: "forms-validation",
        heading: "Validation ve Kullanıcı Geri Bildirimi",
        paragraphs: [
          "İyi bir form, sadece veri toplamaz; kullanıcıyı doğru adımda yönlendirir.",
          "Field-level ve form-level doğrulamayı ayrıştırmak, karmaşıklığı azaltır.",
          "Hata mesajlarının teknik değil yönlendirici yazılması dönüşüm oranını artırır.",
        ],
      },
      {
        id: "forms-advanced",
        heading: "İleri Seviye Form Akışları",
        paragraphs: [
          "Çok adımlı formlarda state modelini önceden tasarlamak gerekir; aksi halde adımlar arası veri tutarsızlığı oluşur.",
          "Textarea, select, checkbox, radio gibi alanlar tek bir generic handler ile yönetilebilir.",
          "Submit sırasında loading, success ve error durumlarının açık biçimde sunulması güven oluşturur.",
        ],
      },
    ],
    codingNotes: [
      "Form state yapısını başlangıçta şema olarak çıkar.",
      "onChange handler'ını standardize et, alan bazlı özel durumu minimumda tut.",
      "Doğrulama mesajlarını kullanıcı aksiyonuna göre göster (blur/submit stratejisi).",
      "Submit sırasında buton durumunu kilitleyerek çift gönderimi engelle.",
    ],
    rules: [
      "Mümkün olduğunda controlled bileşen kullan.",
      "Validation ve submit mantığını render katmanından ayır.",
      "Hata mesajı kullanıcıya eylem önermeli.",
      "Form alanlarını erişilebilir etiketlerle bağla.",
    ],
    commonMistakes: [
      "State'i dağınık tutup alanlar arası bağımlılığı kaybetmek.",
      "Input değerini hem DOM hem state üzerinden çift kaynakla yönetmek.",
      "Submit sırasında async hata durumunu UI'da göstermemek.",
    ],
    learningGoals: [
      "Controlled form yaklaşımını güvenli kurmak",
      "Validation + submit akışını ölçeklenebilir tasarlamak",
      "Kullanıcıya net geri bildirim üreten form deneyimi geliştirmek",
    ],
    realWorldScenario:
      "Kayıt, ödeme, profil ve başvuru ekranlarında form yönetimi hataları doğrudan iş kaybı yaratır; bu yüzden React Forms bilgisi ürün kalitesinin temelidir.",
    deepDiveNotes: [
      "Form state modeli, uygulamanın domain modeliyle uyumlu olmalıdır.",
      "Validation kararlarını erken almak, sonradan refactor maliyetini ciddi azaltır.",
      "Kullanıcı davranışına göre hata gösterim zamanlaması UX kalitesini belirler.",
    ],
    antiPatterns: [
      "Her input için ayrı ve tekrarlı handler yazmak.",
      "Submit sonrası hataları swallow edip kullanıcıyı belirsizlikte bırakmak.",
      "Form state'i resetlerken kullanıcı bağlamını tamamen kaybetmek.",
    ],
    practiceTask:
      "Ad, e-posta, rol (select), sözleşme (checkbox) ve açıklama (textarea) alanlı bir kayıt formu geliştir; field-level hata gösterimi ve submit loading akışı ekle.",
    materials: [
      { id: "forms-m1", title: "Temel Kavram", kind: "theory", content: "Controlled form, input değerini state üzerinden yönetir." },
      { id: "forms-m2", title: "Pratik İpucu", kind: "tip", content: "Tek bir `handleChange` ile çok alanlı formu ölçeklenebilir yönet." },
      { id: "forms-m3", title: "Sık Hata", kind: "warning", content: "Validation yoksa kullanıcı hatayı ancak submit sonrası fark eder." },
      { id: "forms-m4", title: "Kaynak", kind: "resource", content: "React docs: Managing state and form inputs." },
    ],
    codeSamples: [
      {
        title: "Controlled Form - Temel",
        language: "tsx",
        filename: "main.tsx",
        description: "Tek alanlı controlled form örneği; input değeri state ile senkron tutulur.",
        walkthroughSteps: [
          "useState ile input değeri tutulur.",
          "onChange içinde yeni değer state'e yazılır.",
          "UI her değişimde güncel state'i gösterir.",
        ],
        code: `const [name, setName] = useState("");
return <input value={name} onChange={(e) => setName(e.target.value)} />;`,
      },
      {
        title: "Çok Alanlı Form + Generic Handler",
        language: "tsx",
        filename: "main.tsx",
        description: "Birden fazla form alanını tek handler ile yönetir; büyüyen formlarda tekrar azaltır.",
        walkthroughSteps: [
          "Form state'i nesne olarak tanımlanır.",
          "name/value ikilisiyle doğru alan güncellenir.",
          "Submit anında merkezi doğrulama çalıştırılır.",
        ],
        code: `const [form, setForm] = useState({ email: "", role: "student" });
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};`,
      },
    ],
    quizQuestions: [
      {
        id: "forms-q1",
        question: "Controlled form yaklaşımında input değeri nerede tutulur?",
        options: [
          { id: "a", text: "React state içinde" },
          { id: "b", text: "Sadece DOM içinde" },
          { id: "c", text: "Sadece localStorage içinde" },
        ],
        correctOptionId: "a",
        explanation: "Controlled yaklaşımda input değeri state ile yönetilir, böylece veri akışı izlenebilir olur.",
      },
      {
        id: "forms-q2",
        question: "Çok alanlı formda tekrar azaltmak için en iyi yaklaşım hangisi?",
        options: [
          { id: "a", text: "Her alan için ayrı submit fonksiyonu" },
          { id: "b", text: "Generic handleChange + name/value kullanımı" },
          { id: "c", text: "State kullanmadan sadece ref ile yönetim" },
        ],
        correctOptionId: "b",
        explanation: "Generic handler, form büyüdüğünde kod tekrarını azaltır ve bakımı kolaylaştırır.",
      },
    ],
  };
};

const buildRouterTopic = (): LessonContent => {
  const slug = "react-router";
  return {
    id: slug,
    slug,
    title: "React Router",
    summary:
      "React Router, tek sayfa uygulamalarda ekran geçişlerini URL tabanlı yöneten temel navigasyon katmanıdır.",
    contentBlocks: [
      {
        id: "router-why",
        heading: "Router Neden Gerekli?",
        paragraphs: [
          "SPA uygulamalarda farklı sayfa hissi üretmek için route tabanlı bir yapı gerekir.",
          "React Router, URL ile UI arasındaki ilişkiyi standartlaştırır ve navigasyonu yönetilebilir hale getirir.",
          "Route planı doğru kurulmadığında uygulama büyüdükçe ekranlar arası bağımlılık karmaşıklaşır.",
        ],
      },
      {
        id: "router-core",
        heading: "Temel Kavramlar",
        paragraphs: [
          "`Routes`, `Route`, `Link`, `Navigate` gibi yapılarla görünüm akışı kontrol edilir.",
          "Nested route yaklaşımı, layout paylaşımı ve modüler sayfa mimarisi için güçlü bir araçtır.",
          "Dinamik route parametreleri (`:id`) detay sayfalarını ölçeklenebilir hale getirir.",
        ],
      },
      {
        id: "router-guards",
        heading: "Koruma ve Akış Yönetimi",
        paragraphs: [
          "Auth guard benzeri yapılarla kullanıcı rolüne göre erişim kontrolü uygulanabilir.",
          "Yanlış route yakalama (`*`) ve fallback sayfaları ürün deneyiminde kritik rol oynar.",
          "Navigasyon sırasında veri yükleme stratejisi (loading, skeleton, error) tutarlı olmalıdır.",
        ],
      },
    ],
    codingNotes: [
      "Önce route haritasını çiz, sonra bileşenleri bağla.",
      "Layout route ile tekrarlanan UI parçalarını merkezileştir.",
      "Parametreli route'larda veri yok durumunu da ele al.",
    ],
    rules: [
      "Her route için net sorumluluk tanımla.",
      "Fallback route'u (`*`) her zaman düşün.",
      "Navigasyon davranışını test senaryosu ile doğrula.",
    ],
    commonMistakes: [
      "Route yapısını sayfa sayısı arttıkça plansız bırakmak.",
      "Parametreli route'larda geçersiz id durumunu ele almamak.",
      "Layout tekrarını her sayfada manuel yazmak.",
    ],
    learningGoals: [
      "Temel Router kurulumunu sıfırdan yapmak",
      "Nested route ile modüler layout kurgulamak",
      "Hatalı URL ve erişim senaryolarını güvenli yönetmek",
    ],
    realWorldScenario:
      "Dashboard, e-ticaret ve eğitim platformlarında route planı kötü kurulduğunda kullanıcı kaybolur; doğru Router mimarisi ürün akışını netleştirir.",
    deepDiveNotes: [
      "Route tasarımı aslında bilgi mimarisi tasarımıdır.",
      "URL okunabilirliği SEO ve paylaşılabilirlik açısından değerlidir.",
      "Navigasyon performansı kullanıcı algısını doğrudan etkiler.",
    ],
    antiPatterns: [
      "Ekran geçişlerini state ile taklit edip URL'yi ihmal etmek.",
      "Her route için ayrı layout kopyalamak.",
      "Koruma katmanını route yerine component içine dağınık yazmak.",
    ],
    practiceTask:
      "Anasayfa, ders listesi, ders detayı ve profil route'larını kur; geçersiz URL için 404 ekranı ve basit auth guard ekle.",
    materials: [
      { id: "router-m1", title: "Temel Kavram", kind: "theory", content: "Routes/Route eşleşmesi URL -> component bağını kurar." },
      { id: "router-m2", title: "Pratik İpucu", kind: "tip", content: "Nested route ile ortak layout'u tek yerde topla." },
      { id: "router-m3", title: "Sık Hata", kind: "warning", content: "Fallback route yoksa kullanıcı boş ekranda kalabilir." },
      { id: "router-m4", title: "Kaynak", kind: "resource", content: "React Router docs: route configuration and nested routes." },
    ],
    codeSamples: [
      {
        title: "Router Temel Kurulum",
        language: "tsx",
        filename: "main.tsx",
        description: "Temel route yapılandırmasını ve sayfalar arası geçiş mantığını gösterir.",
        walkthroughSteps: [
          "Routes içinde her path için Route tanımlanır.",
          "Link ile client-side geçiş sağlanır.",
          "Tarayıcı yenilenmeden ekran değişir.",
        ],
        code: `<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/courses" element={<Courses />} />
  <Route path="/courses/:id" element={<CourseDetail />} />
</Routes>`,
      },
      {
        title: "Koruma (Guard) Örneği",
        language: "tsx",
        filename: "main.tsx",
        description: "Giriş durumuna göre belirli route'lara erişimi kontrol eden basit guard örneğidir.",
        walkthroughSteps: [
          "Auth durumu kontrol edilir.",
          "Yetkisiz kullanıcı `Navigate` ile yönlendirilir.",
          "Yetkili kullanıcı hedef component'i görür.",
        ],
        code: `function ProtectedRoute({ isAuthed, children }: { isAuthed: boolean; children: JSX.Element }) {
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}`,
      },
    ],
    quizQuestions: [
      {
        id: "router-q1",
        question: "SPA içinde URL tabanlı ekran yönetimi için temel araç hangisidir?",
        options: [
          { id: "a", text: "React Router" },
          { id: "b", text: "setInterval" },
          { id: "c", text: "localStorage" },
        ],
        correctOptionId: "a",
        explanation: "React Router, URL ile ekran eşleşmesini yöneten standart çözümdür.",
      },
      {
        id: "router-q2",
        question: "Nested route yaklaşımının temel avantajı nedir?",
        options: [
          { id: "a", text: "Layout tekrarını azaltmak" },
          { id: "b", text: "JSX yazmayı engellemek" },
          { id: "c", text: "State'i kaldırmak" },
        ],
        correctOptionId: "a",
        explanation: "Nested route ile ortak layout ve alt sayfalar daha temiz organize edilir.",
      },
    ],
  };
};

const buildHooksIntroTopic = (): LessonContent => {
  const slug = "what-is-hooks";
  return {
    id: slug,
    slug,
    title: "What is Hooks?",
    summary:
      "Hooks, function component içinde state ve lifecycle benzeri davranışları class yazmadan yönetmeyi mümkün kılar.",
    contentBlocks: [
      {
        id: "hooks-intro",
        heading: "Hooks'e Giriş",
        paragraphs: [
          "Hooks, React 16.8 ile geldi ve function component'leri daha güçlü hale getirdi.",
          "useState, useEffect gibi hook'lar sayesinde class component zorunluluğu büyük ölçüde ortadan kalktı.",
          "Modern React kod tabanlarında çoğu yeni geliştirme hook tabanlı yapılır.",
        ],
      },
      {
        id: "hooks-rules",
        heading: "Hook Kuralları",
        paragraphs: [
          "Hook'lar component'in en üst seviyesinde çağrılmalıdır; koşul, döngü veya iç fonksiyon içinde çağırmak hataya yol açar.",
          "Hook sırası her render'da aynı kalmalıdır; aksi halde React internal state eşleşmesi bozulur.",
          "Bu kurallar sadece söz dizimi değil, React'in çalışma modelinin temel güvenlik katmanıdır.",
        ],
      },
      {
        id: "hooks-practical",
        heading: "Pratik Kullanım Yaklaşımı",
        paragraphs: [
          "Başlangıçta state yönetimini useState ile kur, yan etkileri useEffect ile ayır.",
          "Aynı mantık birden fazla yerde tekrar ediyorsa custom hook ile soyutla.",
          "Performans optimizasyonlarını (useMemo/useCallback) gerçek ihtiyaç oluşmadan ekleme.",
        ],
      },
    ],
    codingNotes: [
      "Hook çağrı sırasını sabit tut.",
      "Effect içinde cleanup gerektiren durumları ihmal etme.",
      "Custom hook isimlerini `use` ile başlat.",
    ],
    rules: [
      "Hook'ları sadece React function component veya custom hook içinde çağır.",
      "Hook çağrılarını koşula bağlama.",
      "Dependency listelerini bilinçli oluştur.",
    ],
    commonMistakes: [
      "Hook'u if bloğu içinde çağırmak.",
      "Effect dependency listesini eksik bırakmak.",
      "Her state değişiminde gereksiz ağır hesap çalıştırmak.",
    ],
    learningGoals: [
      "Hook mantığını class yaklaşımıyla karşılaştırarak kavramak",
      "Temel hook'larla güvenli bileşen geliştirmek",
      "Custom hook tasarımına giriş yapmak",
    ],
    realWorldScenario:
      "Üretim projelerinde hook yapısı doğru kurulursa özellik geliştirme hızlanır; yanlış kurulduğunda ise effect döngüleri ve performans sorunları büyür.",
    deepDiveNotes: [
      "Hook modeli, UI mantığını lifecycle yerine fonksiyonel veri akışıyla düşünmeyi öğretir.",
      "Custom hook kullanımı ekip içinde tekrar eden davranışları standardize eder.",
      "Hook kurallarına uyum, debug süresini ciddi şekilde azaltır.",
    ],
    antiPatterns: [
      "Tüm iş mantığını tek component içine doldurmak.",
      "Effect içinde gereksiz state zinciri kurmak.",
      "Custom hook yerine kopyala-yapıştır mantık kullanmak.",
    ],
    practiceTask:
      "useState + useEffect kullanan küçük bir sayaç ekranı yap; ardından aynı davranışın bir kısmını custom hook'a taşı.",
    materials: [
      { id: "hooks-m1", title: "Temel Kavram", kind: "theory", content: "Hooks, function component içinde state ve effect yönetimi sağlar." },
      { id: "hooks-m2", title: "Pratik İpucu", kind: "tip", content: "Hook kurallarını eslint plugin ile sürekli kontrol et." },
      { id: "hooks-m3", title: "Sık Hata", kind: "warning", content: "Koşullu hook çağrısı React'te ciddi bug üretir." },
      { id: "hooks-m4", title: "Kaynak", kind: "resource", content: "React docs: Rules of Hooks ve built-in hooks referansı." },
    ],
    codeSamples: [
      {
        title: "useState Temeli",
        language: "tsx",
        filename: "main.tsx",
        description: "Hook yaklaşımının en temel örneği; local state ile UI güncellemesi.",
        walkthroughSteps: [
          "useState başlangıç değeri alır.",
          "setState çağrısı render'ı tetikler.",
          "Yeni state değeri UI'a yansır.",
        ],
        code: `const [count, setCount] = useState(0);
return <button onClick={() => setCount((p) => p + 1)}>Count: {count}</button>;`,
      },
      {
        title: "useEffect Temeli",
        language: "tsx",
        filename: "main.tsx",
        description: "State değişiminde yan etki çalıştırma ve dependency mantığını gösterir.",
        walkthroughSteps: [
          "Effect ilk render'da çalışır.",
          "Dependency değiştiğinde tekrar tetiklenir.",
          "Cleanup ihtiyacı varsa return ile temizlenir.",
        ],
        code: `useEffect(() => {
  document.title = String(count);
}, [count]);`,
      },
    ],
    quizQuestions: [
      {
        id: "hooks-q1",
        question: "Hook çağrılarında temel kural hangisidir?",
        options: [
          { id: "a", text: "Hook'lar component üst seviyesinde çağrılmalı" },
          { id: "b", text: "Hook'lar if bloğu içinde daha iyi çalışır" },
          { id: "c", text: "Hook'lar sadece class component'te çağrılır" },
        ],
        correctOptionId: "a",
        explanation: "Hook sırası sabit kalmalı; bu yüzden çağrılar üst seviyede olmalıdır.",
      },
      {
        id: "hooks-q2",
        question: "useEffect dependency listesi neden önemlidir?",
        options: [
          { id: "a", text: "Effect'in ne zaman çalışacağını belirler" },
          { id: "b", text: "JSX'i kapatır" },
          { id: "c", text: "Route değiştirir" },
        ],
        correctOptionId: "a",
        explanation: "Dependency listesi, effect çalışma zamanını kontrol eder ve gereksiz tetiklemeyi önler.",
      },
    ],
  };
};

const requiredHeadings = [
  "Giriş ve Kavramsal Tanım",
  "Neden Kullanılır?",
  "Sentaks ve Parametreler",
  "Kıyaslamalı Örnekleme",
  "Gerçek Hayat Senaryosu",
  "İleri Seviye Teknik Detay",
  "Soru / Egzersiz",
] as const;

const ensureMandatoryLessonStructure = (lesson: LessonContent): LessonContent => {
  const existingHeadings = new Set((lesson.contentBlocks ?? []).map((block) => block.heading));
  const additionalBlocks = requiredHeadings
    .filter((heading) => !existingHeadings.has(heading))
    .map((heading, index) => ({
      id: `${lesson.slug}-required-${index + 1}`,
      heading,
      paragraphs:
        heading === "Sentaks ve Parametreler"
          ? [
              `${lesson.title} için temel kullanım kalıbı: ${lesson.syntaxSignature ?? `${lesson.title}(...parametreler)`}.`,
              "Parametreleri doğru modellemek, bileşenin davranışını öngörülebilir ve test edilebilir hale getirir.",
            ]
          : heading === "Kıyaslamalı Örnekleme"
            ? [
                "Aynı problemi önce bu özelliği kullanmadan çöz, ardından bu özelliği kullanarak tekrar çöz ve farkları karşılaştır.",
                "Karşılaştırma yaparken okunabilirlik, bakım maliyeti ve hata riski üzerinden analiz yap.",
              ]
            : heading === "Gerçek Hayat Senaryosu"
              ? [
                  "Bu başlığı bir ürün parçasında (panel, form, modal, tablo, filtreleme vb.) uygulayarak gerçek kullanıcı akışında test et.",
                  "Üretim senaryosunda loading, empty ve error durumlarını da ele almak zorunludur.",
                ]
              : heading === "İleri Seviye Teknik Detay"
                ? [
                    "Bu konunun React bileşen ağacı ve DOM davranışı üzerindeki teknik etkisini analiz et.",
                    "Performans, event akışı ve state tutarlılığı açısından trade-off değerlendirmesi yap.",
                  ]
                : heading === "Soru / Egzersiz"
                  ? [
                      "Bu bölümdeki quiz sorusunu cevapladıktan sonra aynı davranışı farklı veriyle yeniden kodlayarak bilgini pekiştir.",
                      "Kendi çözümünü örnek çözümle karşılaştır ve farkları teknik not olarak kaydet.",
                    ]
                  : [
                      `${lesson.title} konusunu yalnızca tanım olarak değil, neden-sonuç ilişkisiyle öğrenmek uzun vadeli kalıcılığı artırır.`,
                      "Kavramı doğru anladığında aynı deseni farklı problemlerde güvenle uygulayabilirsin.",
                    ],
    }));

  const syntaxParameters =
    lesson.syntaxParameters && lesson.syntaxParameters.length > 0
      ? lesson.syntaxParameters
      : [
          { name: "parametre1", description: "Temel davranışı kontrol eden birincil parametre." },
          { name: "parametre2", description: "Senaryoya göre opsiyonel yapılandırma parametresi." },
        ];

  const advancedTechnicalDetail =
    lesson.advancedTechnicalDetail && lesson.advancedTechnicalDetail.length > 0
      ? lesson.advancedTechnicalDetail
      : [
          "React ağacı ve gerçek DOM ağacı her zaman birebir aynı davranmaz; bu farkı bilmek debugging kalitesini artırır.",
          "State güncellemelerinin zamanlaması ve render etkisi, ileri seviye performans kararlarında belirleyicidir.",
        ];

  const normalizedSamples = lesson.codeSamples.map((sample, index) => ({
    ...sample,
    description:
      sample.description ??
      `${lesson.title} konusunun ${index === 0 ? "temel" : "ileri"} seviyedeki kullanımını gösterir.`,
    walkthroughSteps:
      sample.walkthroughSteps && sample.walkthroughSteps.length > 0
        ? sample.walkthroughSteps
        : [
            "Bileşeni oluştur ve gerekli state/props alanlarını tanımla.",
            "Konuya ait React desenini bileşende uygulayarak davranışı üret.",
            "Çıktıyı kullanıcı etkileşimiyle test et ve beklenen sonuçla karşılaştır.",
          ],
    expectedOutcome:
      sample.expectedOutcome ??
      `${lesson.title} kullanımını gerçek bir arayüz akışında güvenle açıklayabilir ve tekrar edebilirsin.`,
  }));

  const ensuredSamples =
    normalizedSamples.length >= 2
      ? normalizedSamples
      : [
          ...normalizedSamples,
          {
            title: `${lesson.title} | Kıyaslamalı Uygulama`,
            language: "tsx",
            filename: "main.tsx",
            description: "Aynı problemi daha okunabilir bir React deseniyle çözen ikinci örnek.",
            walkthroughSteps: [
              "İlk örnekteki problemi tanımla ve tekrar eden kodu belirle.",
              "Bu başlığın önerdiği React yaklaşımıyla akışı sadeleştir.",
              "Yeni akışın bakım ve test kolaylığını kısa notla değerlendir.",
            ],
            expectedOutcome:
              "İki yaklaşım arasındaki farkları teknik gerekçeyle karşılaştırabilir hale gelirsin.",
            code: `type KartProps = { baslik: string; icerik: string };

const BilgiKarti = ({ baslik, icerik }: KartProps) => (
  <article>
    <h4>{baslik}</h4>
    <p>{icerik}</p>
  </article>
);

export default function OrnekUygulama() {
  return <BilgiKarti baslik="${lesson.title}" icerik="Kıyaslamalı ikinci TSX örneği." />;
}`,
          },
        ];

  return {
    ...lesson,
    syntaxSignature: lesson.syntaxSignature ?? `${lesson.title}(parametre1, parametre2)`,
    syntaxParameters,
    advancedTechnicalDetail,
    exercisePrompt: lesson.exercisePrompt ?? `${lesson.title} için verilen örneği farklı bir veri setiyle yeniden uygula ve sonucu açıklayan kısa teknik not yaz.`,
    contentBlocks: [...(lesson.contentBlocks ?? []), ...additionalBlocks],
    codeSamples: ensuredSamples,
  };
};

const buildHomeTopic = (): LessonContent => {
  const slug = "react-home";
  return {
    id: slug,
    slug,
    title: "React Home",
    summary:
      "React Home bölümü, bu eğitim platformundaki tüm konuların nasıl ilerleyeceğini, neden bu sırayla öğrenileceğini ve her başlığın projede nerede işine yarayacağını anlatır.",
    contentBlocks: [
      {
        id: "home-overview",
        heading: "Bu Eğitimin Yapısı",
        paragraphs: [
          "Bu içerik, yalnızca konu ezberletmek için değil, gerçek projede karar verebilen geliştirici yetiştirmek için hazırlanmıştır.",
          "Her başlıkta önce kavramı, sonra kullanım bağlamını, ardından çalışan kodu ve en sonda mini görev/quiz akışını göreceksin.",
          "Amaç, React'i parça parça değil, bütün bir ürün geliştirme sistemi olarak öğrenmendir.",
        ],
      },
      {
        id: "home-roadmap",
        heading: "Öğrenme Yol Haritası",
        paragraphs: [
          "Önce JSX, component ve props ile arayüzü ifade etmeyi öğrenirsin.",
          "Daha sonra state, events, forms ve hooks ile davranışı yönetirsin.",
          "Son aşamada router, optimizasyon, mimari ve proje teslim kriterleriyle üretim seviyesine çıkarsın.",
        ],
      },
    ],
    codingNotes: [
      "Her konuyu bitirdiğinde küçük bir mini teslim üret.",
      "Kod örneklerini birebir kopyalamak yerine kendi verinle tekrar kur.",
      "Aynı davranışı iki farklı yaklaşımla deneyip farkları not et.",
    ],
    rules: ["Sıralı ilerle", "Her başlık sonunda mini görev çöz", "Quiz sonucuna göre zayıf başlığı tekrar et"],
    commonMistakes: ["Sadece okumak", "Kod çalıştırmadan geçmek", "Hata mesajını incelemeden çözümü kopyalamak"],
    learningGoals: ["React öğrenme planını doğru kurmak", "Konu-proje bağlantısını görmek", "Kendi öğrenme döngünü yönetmek"],
    realWorldScenario:
      "Bootcamp ve staj süreçlerinde en çok başarısızlık nedeni düzensiz öğrenme akışıdır; bu bölüm, düzenli bir React çalışma sistemi kurmanı sağlar.",
    deepDiveNotes: [
      "Öğrenme hızı kadar öğrenme kalitesi de önemlidir.",
      "Küçük ama düzenli teslimler, büyük ama bitmeyen projelerden daha etkilidir.",
    ],
    antiPatterns: ["10 konu okuyup 0 proje yapmak", "Sadece video izleyip kod yazmamak", "Tek bir kaynağa kör bağımlı kalmak"],
    practiceTask: "3 günlük React çalışma planı oluştur: her gün bir konu + bir mini teslim + bir quiz.",
    materials: [
      { id: "home-m1", title: "Plan Notu", kind: "theory", content: "React'i konu değil sistem olarak öğren." },
      { id: "home-m2", title: "Uygulama Notu", kind: "tip", content: "Her gün minimum 1 çalışan ekran üret." },
    ],
    codeSamples: [
      {
        title: "Öğrenme Takip Kartı",
        language: "tsx",
        filename: "StudyTracker.tsx",
        description:
          "Günlük hedefleri state’te tutan, tamamlananları işaretleyen ve ilerleme yüzdesini gösteren tam bir bileşen.",
        walkthroughSteps: [
          "goals dizisi state olarak tanımlanır.",
          "toggleGoal immutable map ile günceller.",
          "doneCount türetilmiş değer olarak yüzde hesabına girer.",
        ],
        code: `import { useState } from "react";
import { createRoot } from "react-dom/client";

type Goal = { id: string; label: string; done: boolean };

function StudyTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", label: "JSX", done: false },
    { id: "2", label: "Props", done: false },
    { id: "3", label: "useState", done: false },
  ]);

  const done = goals.filter((g) => g.done).length;
  const percent = Math.round((done / goals.length) * 100);

  const toggle = (id: string) =>
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));

  return (
    <section style={{ padding: "1.25rem", fontFamily: "system-ui" }}>
      <h1>React çalışma planı</h1>
      <p>İlerleme: %{percent}</p>
      <ul>
        {goals.map((g) => (
          <li key={g.id}>
            <label>
              <input type="checkbox" checked={g.done} onChange={() => toggle(g.id)} />
              {g.label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<StudyTracker />);`,
      },
    ],
    quizQuestions: [
      {
        id: "home-q1",
        question: "En etkili React öğrenme yaklaşımı hangisidir?",
        options: [
          { id: "a", text: "Konu + kod + mini görev + tekrar döngüsü" },
          { id: "b", text: "Sadece teori okumak" },
          { id: "c", text: "Sadece proje kodu kopyalamak" },
        ],
        correctOptionId: "a",
        explanation: "Kalıcı öğrenme için teori ve pratik birlikte ilerlemelidir.",
      },
    ],
  };
};

const buildIntroTopic = (): LessonContent => {
  const slug = "react-intro";
  return {
    id: slug,
    slug,
    title: "React Intro",
    summary: "React Intro, React'in ne olduğunu, neden tercih edildiğini ve modern frontend geliştirmede hangi problemleri çözdüğünü açıklar.",
    contentBlocks: [
      {
        id: "intro-what",
        heading: "React Nedir?",
        paragraphs: [
          "React, kullanıcı arayüzü geliştirmek için kullanılan bileşen tabanlı bir JavaScript kütüphanesidir.",
          "En güçlü yönü, büyük ekranları küçük ve tekrar kullanılabilir parçalara ayırarak yönetilebilir hale getirmesidir.",
          "Bu sayede hem geliştirme hızı artar hem de bakım maliyeti düşer.",
        ],
      },
      {
        id: "intro-why",
        heading: "Neden React?",
        paragraphs: [
          "Tek yönlü veri akışı sayesinde uygulama davranışı daha tahmin edilebilir olur.",
          "Geniş ekosistem, güçlü topluluk ve üretim tecrübesi sayesinde ekipler için güvenli seçimdir.",
          "Özellikle dashboard, e-ticaret ve eğitim platformları gibi dinamik uygulamalarda yüksek verim sağlar.",
        ],
      },
      {
        id: "intro-before-after",
        heading: "React Olmadan / React ile",
        paragraphs: [
          "React olmadan karmaşık DOM güncellemeleri manuel yazılır ve hızla kontrol edilemez hale gelir.",
          "React ile state değişimi odaklı düşünerek UI güncellemesini sistematik şekilde yönetirsin.",
        ],
      },
    ],
    codingNotes: ["UI'ı bileşenlere böl", "Veri akışını yukarıdan aşağı kur", "Önce çalışan minimum sürüm çıkar"],
    rules: ["Tek sorumluluklu bileşen", "Anlamlı isimlendirme", "Kodu okunabilir küçük parçalara ayır"],
    commonMistakes: ["Her şeyi App içine yazmak", "Bileşen sorumluluklarını karıştırmak"],
    learningGoals: ["React'in temel değer önerisini anlatmak", "Bileşen düşüncesini uygulamak"],
    realWorldScenario: "Kurumsal ekiplerde React, farklı geliştiricilerin aynı ürün üzerinde düzenli çalışmasını kolaylaştırır.",
    deepDiveNotes: ["React öğrenmek UI çizmekten fazlasıdır; veri ve davranış tasarımı gerektirir."],
    antiPatterns: ["Yalnızca görsele odaklanıp veri akışını ihmal etmek"],
    practiceTask: "Header, CourseCard, Footer bileşenleriyle küçük bir eğitim ana sayfası oluştur.",
    materials: [{ id: "intro-m1", title: "Kısa Tanım", kind: "theory", content: "React, bileşen tabanlı UI geliştirme yaklaşımıdır." }],
    codeSamples: [
      {
        title: "Eğitim ana sayfası iskeleti",
        language: "tsx",
        filename: "IntroApp.tsx",
        description:
          "Header, CourseCard listesi ve Footer ile bileşenlere ayrılmış ilk uygulama — props ve map birlikte.",
        walkthroughSteps: [
          "CourseCard props ile başlık alır.",
          "courses dizisi map ile listelenir.",
          "createRoot tek giriş noktasıdır.",
        ],
        code: `import { createRoot } from "react-dom/client";

function Header() {
  return <header><h1>React Eğitim Platformu</h1></header>;
}

function CourseCard({ title, minutes }: { title: string; minutes: number }) {
  return (
    <article style={{ border: "1px solid #ddd", padding: "0.75rem", marginBottom: "0.5rem" }}>
      <h2>{title}</h2>
      <p>~{minutes} dakika</p>
    </article>
  );
}

function Footer() {
  return <footer><small>Samsun Üniversitesi — Yazılım Mühendisliği</small></footer>;
}

const courses = [
  { id: "intro", title: "React Intro", minutes: 20 },
  { id: "jsx", title: "JSX Intro", minutes: 35 },
];

function IntroApp() {
  return (
    <>
      <Header />
      <main>
        {courses.map((c) => (
          <CourseCard key={c.id} title={c.title} minutes={c.minutes} />
        ))}
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<IntroApp />);`,
      },
    ],
    quizQuestions: [
      {
        id: "intro-q1",
        question: "React'in en temel gücü nedir?",
        options: [
          { id: "a", text: "Bileşen tabanlı, tekrar kullanılabilir yapı" },
          { id: "b", text: "Sadece stil yazmak" },
          { id: "c", text: "Backend kodu üretmek" },
        ],
        correctOptionId: "a",
        explanation: "React'in temel değeri UI'ı modüler ve yönetilebilir hale getirmesidir.",
      },
    ],
  };
};

const buildUseStateTopic = (): LessonContent => {
  const slug = "react-usestate";
  return {
    id: slug,
    slug,
    title: "React useState",
    summary:
      "useState, function component içinde yerel durumu yönetmenin en temel ve en kritik hook'udur; UI davranışı state değişimiyle şekillenir.",
    contentBlocks: [
      {
        id: "usestate-what",
        heading: "useState Nedir?",
        paragraphs: [
          "useState, bileşen içinde değişebilir veriyi saklar ve güncellemek için bir setter fonksiyonu döndürür.",
          "Her state güncellemesi, ilgili bileşenin yeniden render edilmesine neden olur ve UI yeni durumu yansıtır.",
          "Bu mekanizma React'in deklaratif modelinin merkezindedir: 'durum değişirse görünüm değişir'.",
        ],
      },
      {
        id: "usestate-mental-model",
        heading: "State Zihinsel Modeli",
        paragraphs: [
          "State, component'in o anki iç gerçeğidir; kullanıcı etkileşimi ve asenkron sonuçlar state üzerinden UI'a bağlanır.",
          "State'i ne kadar iyi modellersen, bileşen davranışını o kadar tahmin edilebilir hale getirirsin.",
          "Dağınık state modeli, küçük projede görünmeyen ama büyük projede kritik hatalara yol açar.",
        ],
      },
      {
        id: "usestate-update-patterns",
        heading: "Güncelleme Desenleri",
        paragraphs: [
          "Sayısal artış/azalış gibi durumlarda fonksiyonel güncelleme (`setX(prev => ...)`) tercih edilmelidir.",
          "Nesne/dizi state'lerinde immutable güncelleme zorunludur; mevcut referansı mutate etmek render tutarsızlığı doğurur.",
          "Birden fazla alanı yönetirken state şemasını önceden planlamak bakım maliyetini düşürür.",
        ],
      },
      {
        id: "usestate-when-not",
        heading: "Ne Zaman Kaçınmalı?",
        paragraphs: [
          "Türetilmiş veriyi ayrıca state'te tutmak çoğu zaman gereksizdir; render sırasında hesaplanabilir.",
          "Global paylaşılan veriler için sadece useState yeterli olmayabilir; context/reducer gibi yaklaşımlar düşünülmelidir.",
          "Aşırı state parçalama, component içinde karmaşa yaratır ve hata ayıklamayı zorlaştırır.",
        ],
      },
    ],
    codingNotes: [
      "State isimlerini veri niyetine göre ver (`isOpen`, `selectedId`, `formData`).",
      "Bir state değişiminin UI etkisini tek bakışta görebilecek sade yapı kur.",
      "Nesne/dizi güncellerken spread veya mapper yaklaşımı kullan.",
      "Gereksiz state yerine türetilmiş hesap kullanmayı düşün.",
    ],
    rules: [
      "Setter çağrısını doğrudan render içinde yapma.",
      "State güncellemesini immutable şekilde gerçekleştir.",
      "Önce state modelini netleştir, sonra UI kodunu yaz.",
      "Aynı veriyi birden fazla state'te kopyalama.",
    ],
    commonMistakes: [
      "setState içinde eski state'e bağımlı güncellemeyi düz değerle yapmak.",
      "Dizi/nesneyi mutate edip React'in değişimi algılamasını beklemek.",
      "Bir bileşende gereğinden fazla state tanımlamak.",
    ],
    learningGoals: [
      "useState ile güvenli state modeli kurmak",
      "Güncelleme desenlerinde doğru yöntem seçmek",
      "State tasarımını büyüyen projeye uygun planlamak",
    ],
    realWorldScenario:
      "Görev yönetimi, sepet, filtreleme ve modal gibi neredeyse tüm UI davranışlarında useState doğru kullanımı ürün stabilitesini doğrudan etkiler.",
    deepDiveNotes: [
      "State sayısı değil state modelinin doğruluğu performansı belirler.",
      "İyi state modeli, bug raporlarını yeniden üretmeyi kolaylaştırır.",
      "Fonksiyonel güncelleme, eşzamanlı kullanıcı aksiyonlarında güvenli sonuç verir.",
    ],
    antiPatterns: [
      "UI'da görünen her değeri state'e koymak.",
      "State'i farklı yerlerde kopyalayarak kaynak çoğaltmak.",
      "Setter'ı event dışında rastgele tetiklemek.",
    ],
    practiceTask:
      "Filtrelenebilir görev listesi geliştir: görev ekle/sil, tamamlandı işaretle, durum filtresi uygula ve toplam sayı göstergesi ekle.",
    materials: [
      { id: "usestate-m1", title: "Kavram Notu", kind: "theory", content: "useState, yerel UI davranışını yönetir." },
      { id: "usestate-m2", title: "Pratik İpucu", kind: "tip", content: "Önce state şemasını kağıtta çiz, sonra kodla." },
      { id: "usestate-m3", title: "Sık Hata", kind: "warning", content: "Mutable güncelleme React render akışını bozabilir." },
    ],
    codeSamples: [
      {
        title: "useState - Basit Sayaç",
        language: "tsx",
        filename: "main.tsx",
        description: "State değişimi ile UI güncellemesinin en temel örneği.",
        walkthroughSteps: [
          "count state'i 0 ile başlatılır.",
          "Buton tıklaması setter çağrısı yapar.",
          "Yeni count değeri render çıktısına anında yansır.",
        ],
        code: `const [count, setCount] = useState(0);
return <button onClick={() => setCount((p) => p + 1)}>Count: {count}</button>;`,
      },
      {
        title: "useState - Dizi Güncelleme",
        language: "tsx",
        filename: "main.tsx",
        description: "Immutable dizi güncelleme ile liste yönetimi gösterilir.",
        walkthroughSteps: [
          "Liste state'i dizi olarak tutulur.",
          "Yeni eleman ekleme spread ile yapılır.",
          "Eski referans korunmaz, yeni dizi render edilir.",
        ],
        code: `const [items, setItems] = useState<string[]>([]);
const addItem = () => setItems((prev) => [...prev, "Yeni Öğe"]);`,
      },
    ],
    quizQuestions: [
      {
        id: "usestate-q1",
        question: "Eski state'e bağlı güncellemede en güvenli yaklaşım hangisidir?",
        options: [
          { id: "a", text: "setX(prev => prev + 1)" },
          { id: "b", text: "setX(x + 1) (her durumda)" },
          { id: "c", text: "state'i doğrudan mutate etmek" },
        ],
        correctOptionId: "a",
        explanation: "Fonksiyonel güncelleme, eşzamanlı güncellemelerde doğru sonucu garanti eder.",
      },
      {
        id: "usestate-q2",
        question: "Dizi state güncellerken neden immutable yaklaşım gerekir?",
        options: [
          { id: "a", text: "React'in değişimi güvenilir algılaması için" },
          { id: "b", text: "Sadece lint kuralı olduğu için" },
          { id: "c", text: "TypeScript zorunlu kıldığı için" },
        ],
        correctOptionId: "a",
        explanation: "Yeni referans üretmek, React'in render kararını doğru vermesini sağlar.",
      },
    ],
  };
};

const buildUseEffectTopic = (): LessonContent => {
  const slug = "react-useeffect";
  return {
    id: slug,
    slug,
    title: "React useEffect",
    summary:
      "useEffect, render sonrası çalışan yan etkileri (API çağrısı, abonelik, timer, DOM etkileşimi) yönetmek için kullanılır.",
    contentBlocks: [
      {
        id: "useeffect-what",
        heading: "useEffect Nedir?",
        paragraphs: [
          "useEffect, bileşenin render sürecinden ayrı yürütülmesi gereken işleri kapsar.",
          "Ağ isteği, event listener, timer veya dış sistem senkronizasyonu gibi etkiler bu hook ile yönetilir.",
          "Doğru dependency kullanımı, hem doğruluk hem performans için kritik önemdedir.",
        ],
      },
      {
        id: "useeffect-deps",
        heading: "Dependency Mantığı",
        paragraphs: [
          "Dependency dizisi, effect'in ne zaman tekrar çalışacağını belirler.",
          "Boş dizi (`[]`) yalnızca ilk mount sonrası çalıştırır; dependency verdiğinde ilgili değer değişiminde yeniden tetiklenir.",
          "Eksik dependency çoğu zaman stale data veya beklenmeyen davranış üretir.",
        ],
      },
      {
        id: "useeffect-cleanup",
        heading: "Cleanup ve Kaynak Yönetimi",
        paragraphs: [
          "Timer, subscription veya listener kurduğunda cleanup fonksiyonu ile kaynakları serbest bırakmak gerekir.",
          "Cleanup ihmal edilirse memory leak, çift event tetikleme veya bozuk kullanıcı deneyimi oluşabilir.",
          "Unmount senaryosunu düşünmek, effect tasarımının ayrılmaz parçasıdır.",
        ],
      },
      {
        id: "useeffect-splitting",
        heading: "Effect Bölme Stratejisi",
        paragraphs: [
          "Aynı effect içinde ilgisiz işleri toplamak yerine birden fazla küçük effect kullanmak okunabilirliği artırır.",
          "Her effect tek sorumluluk taşıdığında bug kökenini bulmak kolaylaşır.",
          "Bu yaklaşım özellikle büyüyen bileşenlerde teknik borcu ciddi azaltır.",
        ],
      },
    ],
    codingNotes: [
      "Effect içinde async işlem yaparken race condition düşün.",
      "Her dependency eklemenin nedenini açıklayabilir ol.",
      "Cleanup gerektiren effect'lerde dönüş fonksiyonunu ihmal etme.",
    ],
    rules: [
      "Effect içinde senkron render mantığı yazma.",
      "Dependency listesini tahmine değil kanıta göre kur.",
      "İlgisiz effect işlerini ayrı bloklara böl.",
    ],
    commonMistakes: [
      "Dependency listesini eksik bırakmak.",
      "Effect içinde sonsuz döngü üreten setter zinciri kurmak.",
      "Cleanup yazmadan listener/timer bırakmak.",
    ],
    learningGoals: [
      "Yan etki kavramını render mantığından ayırmak",
      "Dependency ve cleanup modelini güvenli kurmak",
      "Büyük bileşende effect parçalama pratiği kazanmak",
    ],
    realWorldScenario:
      "Gerçek projelerde API polling, websocket dinleme veya document title senkronizasyonu gibi etkiler useEffect yönetimi zayıfsa hatalı davranış üretir.",
    deepDiveNotes: [
      "Effect tasarımı aslında veri zamanlaması tasarımıdır.",
      "Eksik dependency kısa vadede 'çalışıyor' görünse de üretimde kırılmaya açıktır.",
      "Cleanup, performans optimizasyonu kadar doğruluk için de gereklidir.",
    ],
    antiPatterns: [
      "Her şeyi tek effect içinde toplamak.",
      "Dependency uyarılarını kör şekilde kapatmak.",
      "Unmount sonrası güncelleme riskini yok saymak.",
    ],
    practiceTask:
      "Arama yapan bir bileşen oluştur: query değiştiğinde API çağrısı yap, loading/error durumlarını göster ve component kapanırken istek iptalini yönet.",
    materials: [
      { id: "useeffect-m1", title: "Kavram Notu", kind: "theory", content: "useEffect render sonrası yan etkileri yönetir." },
      { id: "useeffect-m2", title: "Pratik İpucu", kind: "tip", content: "Tek sorumluluk için effect'leri böl." },
      { id: "useeffect-m3", title: "Sık Hata", kind: "warning", content: "Eksik dependency stale davranış üretir." },
    ],
    codeSamples: [
      {
        title: "useEffect - Document Title",
        language: "tsx",
        filename: "main.tsx",
        description: "State değişimini dış dünya (document title) ile senkronlar.",
        walkthroughSteps: [
          "count dependency olarak verilir.",
          "count değişince effect tekrar çalışır.",
          "title her güncellemede yeni değeri alır.",
        ],
        code: `useEffect(() => {
  document.title = String(count);
}, [count]);`,
      },
      {
        title: "useEffect - Cleanup Örneği",
        language: "tsx",
        filename: "main.tsx",
        description: "Interval kurup unmount sırasında cleanup ile temizler.",
        walkthroughSteps: [
          "Effect içinde interval başlatılır.",
          "Cleanup fonksiyonunda clearInterval çağrılır.",
          "Bileşen kapanınca kaynak serbest bırakılır.",
        ],
        code: `useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);`,
      },
    ],
    quizQuestions: [
      {
        id: "useeffect-q1",
        question: "Dependency listesi neyi kontrol eder?",
        options: [
          { id: "a", text: "Effect'in yeniden çalışma zamanını" },
          { id: "b", text: "JSX sözdizimini" },
          { id: "c", text: "Route sırasını" },
        ],
        correctOptionId: "a",
        explanation: "Dependency, effect tetiklenme zamanını belirleyen temel mekanizmadır.",
      },
      {
        id: "useeffect-q2",
        question: "Cleanup fonksiyonu neden önemlidir?",
        options: [
          { id: "a", text: "Kaynak sızıntısı ve çift abonelikleri önler" },
          { id: "b", text: "Build süresini azaltır" },
          { id: "c", text: "TypeScript tiplerini üretir" },
        ],
        correctOptionId: "a",
        explanation: "Cleanup, effect tarafında kurulan dış kaynakların güvenli kapanışını sağlar.",
      },
    ],
  };
};

const buildPropsTopic = (): LessonContent => {
  const slug = "react-props";
  return {
    id: slug,
    slug,
    title: "React Props",
    summary:
      "Props, parent component'ten child component'e veri taşıyan sözleşmedir; tekrar kullanılabilir bileşen mimarisinin temelidir.",
    contentBlocks: [
      {
        id: "props-basics",
        heading: "Props Nedir?",
        paragraphs: [
          "Props, fonksiyon parametresi gibi çalışır; component dışından veri almayı sağlar.",
          "Bu mekanizma, bileşenlerin yeniden kullanılabilir ve konfigüre edilebilir olmasının ana nedenidir.",
          "Props tabanlı tasarım, büyük uygulamalarda component API disiplini oluşturur.",
        ],
      },
      {
        id: "props-design",
        heading: "Props Tasarım İlkeleri",
        paragraphs: [
          "Her prop'ın tek ve net bir sorumluluğu olmalı; belirsiz isimler bakım maliyetini artırır.",
          "Zorunlu ve opsiyonel prop ayrımını tip seviyesinde açık tutmak, kullanım hatalarını erken yakalar.",
          "Aşırı prop taşımak yerine component sınırını yeniden düşünmek daha sürdürülebilir sonuç verir.",
        ],
      },
      {
        id: "props-patterns",
        heading: "Yaygın Desenler",
        paragraphs: [
          "Destructuring ile prop kullanımı kodu okunabilir hale getirir.",
          "`children` prop'ı ile içeriği dışarıdan enjekte eden esnek component yapısı kurulabilir.",
          "Callback prop'lar ile child -> parent iletişimi kontrollü şekilde yönetilir.",
        ],
      },
    ],
    codingNotes: [
      "Props adlarını semantik seç (`title`, `onSubmit`, `variant`).",
      "Callback prop sözleşmesini component dokümantasyonunda açıkla.",
      "Props fazlalığında component bölmeyi düşün.",
    ],
    rules: [
      "Props'ı mutate etme; salt okunur veri gibi düşün.",
      "Tip tanımını component sözleşmesinin parçası yap.",
      "children kullanımında yapısal beklentiyi netleştir.",
    ],
    commonMistakes: [
      "Aynı amacı taşıyan birden fazla benzer prop tanımlamak.",
      "İsimlendirmesi belirsiz callback prop kullanmak.",
      "Props ile geçmesi gereken veriyi global state'e taşımak.",
    ],
    learningGoals: [
      "Props sözleşmesi tasarlamak",
      "children ve callback desenlerini doğru kullanmak",
      "Tip güvenli component API yazmak",
    ],
    realWorldScenario:
      "Design system ve ortak bileşen kütüphanelerinde props kalitesi düşükse ekip çapında kullanım hataları ve tekrar eden bug'lar artar.",
    deepDiveNotes: [
      "İyi props API'si, bileşeni doküman okumadan kullanılabilir hale getirir.",
      "Props tasarımı aslında component UX tasarımıdır.",
    ],
    antiPatterns: [
      "Prop drilling sorunu görünmesine rağmen component yapısını hiç revize etmemek.",
      "Tek prop içine çok farklı sorumluluklar yüklemek.",
      "children yerine sabit içerik dayatmak.",
    ],
    practiceTask:
      "Reusable `CourseCard` bileşeni yaz: `title`, `level`, `onSelect`, `children` prop'larını desteklesin ve iki farklı ekranda farklı veriyle kullan.",
    materials: [
      { id: "props-m1", title: "Kavram Notu", kind: "theory", content: "Props, component sözleşmesidir." },
      { id: "props-m2", title: "Pratik İpucu", kind: "tip", content: "Props API'sini componenti yazmadan önce tasarla." },
      { id: "props-m3", title: "Sık Hata", kind: "warning", content: "Belirsiz prop adları bakım maliyetini artırır." },
    ],
    codeSamples: [
      {
        title: "Props Temeli",
        language: "tsx",
        filename: "main.tsx",
        description: "Parent'ten child'a veri geçişinin temel örneği.",
        walkthroughSteps: [
          "Child component prop tipini tanımlar.",
          "Parent component prop değerini gönderir.",
          "Child prop'u render içinde kullanır.",
        ],
        code: `function Car({ color }: { color: string }) {
  return <h2>I am a {color} Car!</h2>;
}`,
      },
      {
        title: "children + callback props",
        language: "tsx",
        filename: "main.tsx",
        description: "Esnek içerik ve etkileşim taşıyan gelişmiş props kullanımını gösterir.",
        walkthroughSteps: [
          "children ile görünüm içeriği dışarıdan gelir.",
          "onSelect callback'i parent tarafında tanımlanır.",
          "Child içinde buton tetikleyince parent aksiyonu çalışır.",
        ],
        code: `function Card({ children, onSelect }: { children: React.ReactNode; onSelect: () => void }) {
  return <div onClick={onSelect}>{children}</div>;
}`,
      },
    ],
    quizQuestions: [
      {
        id: "props-q1",
        question: "Props için en doğru tanım hangisidir?",
        options: [
          { id: "a", text: "Parent'ten child'a veri taşıyan sözleşme" },
          { id: "b", text: "Yalnızca global state anahtarı" },
          { id: "c", text: "Sadece CSS değeri" },
        ],
        correctOptionId: "a",
        explanation: "Props, component'ler arası tek yönlü veri akışının temel mekanizmasıdır.",
      },
      {
        id: "props-q2",
        question: "children prop'ı ne sağlar?",
        options: [
          { id: "a", text: "Component içine esnek içerik enjekte etmeyi" },
          { id: "b", text: "API çağrısı yapmayı" },
          { id: "c", text: "State'i otomatik global yapmayı" },
        ],
        correctOptionId: "a",
        explanation: "children, component kompozisyonunda en esnek içerik geçirme yöntemidir.",
      },
    ],
  };
};

const buildEventsTopic = (): LessonContent => {
  const slug = "react-events";
  return {
    id: slug,
    slug,
    title: "React Events",
    summary:
      "React Events, kullanıcı etkileşimlerini (click, input, submit vb.) kontrollü iş mantığına bağlayan köprüdür.",
    contentBlocks: [
      {
        id: "events-core",
        heading: "Event Mantığı",
        paragraphs: [
          "React'te event'ler JSX üzerinde handler fonksiyonlarına bağlanır.",
          "Handler tarafında state güncellemesi veya iş mantığı tetiklenerek UI davranışı üretilir.",
          "Doğru event tasarımı, kullanıcı aksiyonunu tahmin edilebilir sisteme dönüştürür.",
        ],
      },
      {
        id: "events-flow",
        heading: "Etkileşim Akışı Tasarımı",
        paragraphs: [
          "Event'i sadece 'tıklama' olarak düşünmek yerine kullanıcı niyetine göre modellemek gerekir.",
          "Örneğin `onSave`, `onCancel`, `onFilterChange` gibi isimler akışı semantik olarak görünür kılar.",
          "Bu yaklaşım test yazmayı ve hata ayıklamayı kolaylaştırır.",
        ],
      },
      {
        id: "events-common",
        heading: "Sık Senaryolar",
        paragraphs: [
          "Buton click, input change, form submit ve klavye olayları en yaygın event aileleridir.",
          "Submit akışlarında `preventDefault` ve loading yönetimi kritik rol oynar.",
          "Event zinciri büyüdüğünde handler bölme ve yardımcı fonksiyon kullanımı gerekir.",
        ],
      },
    ],
    codingNotes: [
      "Event handler isimlerini kullanıcı niyetine göre yaz.",
      "Uzun handler fonksiyonlarını parçalayarak okunabilir tut.",
      "Event sonrası state etkisini net ve tek yönlü tasarla.",
    ],
    rules: [
      "JSX içinde fonksiyon referansı ver, fonksiyon çağrısı yazma.",
      "Form submit davranışını bilinçli yönet.",
      "Handler içinde yan etkileri kontrolsüz büyütme.",
    ],
    commonMistakes: [
      "onClick içinde doğrudan ağır iş mantığı gömmek.",
      "Event parametresini yanlış zamanda kullanmak.",
      "Aynı handler'a birden fazla farklı sorumluluk yüklemek.",
    ],
    learningGoals: [
      "Event akışını kullanıcı niyetiyle modellemek",
      "Temiz handler tasarlamak",
      "Form ve input etkileşimlerini güvenli yönetmek",
    ],
    realWorldScenario:
      "Ödeme, filtreleme, kayıt ve arama gibi ürün çekirdek akışlarında event tasarımı zayıfsa kullanıcı aksiyonu kaybolur ve dönüşüm düşer.",
    deepDiveNotes: [
      "Event yönetimi, UI davranışının domain mantığıyla buluştuğu yerdir.",
      "Handler kalitesi doğrudan hata oranını etkiler.",
    ],
    antiPatterns: [
      "Tek bir mega handler ile tüm aksiyonları yönetmek.",
      "Event adlarını teknik ama anlamsız bırakmak.",
      "Etkileşim sonrası kullanıcıya geri bildirim vermemek.",
    ],
    practiceTask:
      "Arama kutusu + filtre butonları + submit formu olan küçük panel geliştir; her event için ayrı ve anlamlı handler kullan.",
    materials: [
      { id: "events-m1", title: "Kavram Notu", kind: "theory", content: "Event, kullanıcı niyetini iş mantığına bağlar." },
      { id: "events-m2", title: "Pratik İpucu", kind: "tip", content: "Handler'ları kısa tut, niyete göre adlandır." },
      { id: "events-m3", title: "Sık Hata", kind: "warning", content: "JSX içinde handler'ı yanlış bağlamak beklenmeyen tetikleme yapar." },
    ],
    codeSamples: [
      {
        title: "Click Event",
        language: "tsx",
        filename: "main.tsx",
        description: "Buton tıklamasını state değişimine bağlayan temel örnek.",
        walkthroughSteps: [
          "onClick handler fonksiyon referansı alır.",
          "Handler içinde setter çağrılır.",
          "UI yeni state ile tekrar render edilir.",
        ],
        code: `const [count, setCount] = useState(0);
const handleClick = () => setCount((p) => p + 1);
return <button onClick={handleClick}>Artır</button>;`,
      },
      {
        title: "Form Submit Event",
        language: "tsx",
        filename: "main.tsx",
        description: "Submit akışını kontrol edip kullanıcı verisini güvenli şekilde işler.",
        walkthroughSteps: [
          "onSubmit içinde default davranış engellenir.",
          "Form verisi doğrulanır.",
          "Sonuç state veya API çağrısıyla işlenir.",
        ],
        code: `const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // validate and submit
};`,
      },
    ],
    quizQuestions: [
      {
        id: "events-q1",
        question: "Event handler isimlendirmesinde en iyi yaklaşım hangisidir?",
        options: [
          { id: "a", text: "Kullanıcı niyetini anlatan adlar (`handleSave`)" },
          { id: "b", text: "Rastgele kısa adlar (`x`, `doIt`)" },
          { id: "c", text: "İsimsiz fonksiyon zinciri" },
        ],
        correctOptionId: "a",
        explanation: "Niyeti anlatan handler isimleri bakım ve test kalitesini artırır.",
      },
      {
        id: "events-q2",
        question: "Form submit eventinde en kritik adım nedir?",
        options: [
          { id: "a", text: "e.preventDefault ile varsayılan davranışı kontrol etmek" },
          { id: "b", text: "Her durumda sayfayı yenilemek" },
          { id: "c", text: "Event'i tamamen yok saymak" },
        ],
        correctOptionId: "a",
        explanation: "Submit akışını React tarafında yönetmek için varsayılan tarayıcı davranışı kontrol edilmelidir.",
      },
    ],
  };
};

const buildJsxIntroTopic = (): LessonContent => {
  const slug = "react-jsx-intro";
  return {
    id: slug,
    slug,
    title: "React JSX Intro",
    summary: "JSX, React içinde HTML benzeri yapıyı JavaScript ile birlikte yazmanı sağlar; okunabilirlik, hız ve bakım avantajı sunar.",
    contentBlocks: [
      {
        id: "jsx-what",
        heading: "What is JSX?",
        paragraphs: [
          "JSX, JavaScript XML anlamına gelir. React tarafında arayüzü JavaScript dosyası içinde yazmayı mümkün kılar.",
          "JSX zorunlu değildir; React.createElement ile aynı sonuç alınabilir. Fakat JSX, bileşen kodunu insan için daha anlaşılır hale getirir.",
          "Pratikte JSX, ürün geliştirme hızını artırır çünkü ekip üyeleri UI niyetini tek bakışta okuyabilir.",
          "React ekosistemindeki araçlar da (lint, format, IDE yardımı) JSX sözdizimi üzerinde daha güçlü geri bildirim verir.",
        ],
      },
      {
        id: "jsx-coding",
        heading: "Coding JSX",
        paragraphs: [
          "JSX yazdığında React bu ifadeyi JavaScript fonksiyon çağrılarına çevirir. Yani arka planda hâlâ saf JS çalışır.",
          "Bu sayede createElement/appendChild gibi düşük seviye DOM adımlarını elle yazmadan, bileşen odaklı geliştirme yaparsın.",
          "Büyük arayüzlerde JSX'i küçük bileşenlere bölmek, karmaşıklığı yönetilebilir hale getirir ve test yazmayı kolaylaştırır.",
          "JSX içinde mantık yoğunluğu artıyorsa bunun sinyali genelde bileşeni parçalama zamanının geldiğidir.",
        ],
      },
      {
        id: "jsx-rules",
        heading: "Temel Kurallar",
        paragraphs: [
          "Tek bir top-level eleman zorunludur; birden fazla eleman döneceksen parent veya fragment kullanmalısın.",
          "Etiketler düzgün kapanmalı, `class` yerine `className` kullanılmalı, expression'lar `{}` içinde yazılmalıdır.",
          "Bu kurallar yalnızca sözdizimi için değil, kodun sürdürülebilirliği için de kritiktir; ekip standardını korur.",
          "JSX kurallarına erken aşamada dikkat etmek, üretimde karşılaşılacak derleme ve render hatalarını büyük ölçüde azaltır.",
        ],
      },
      {
        id: "jsx-expression",
        heading: "Expressions in JSX",
        paragraphs: [
          "JSX içinde `{}` bloğuna geçerli JavaScript expression'ı yazabilirsin.",
          "Değişken, fonksiyon sonucu veya aritmetik ifade doğrudan UI içinde üretilebilir.",
          "Expression kullanımı güçlüdür ancak aşırı karmaşık ifadeler okunabilirliği düşürür; gerektiğinde ara değişkenler tercih edilmelidir.",
          "İyi bir pratik, ifadeyi okuyanın niyeti tek bakışta anlamasını sağlamaktır.",
        ],
      },
      {
        id: "jsx-history",
        heading: "Neden Bu Kadar Yaygınlaştı?",
        paragraphs: [
          "JSX'in yaygınlaşma nedeni sadece yazım kolaylığı değil, bileşen tabanlı mimariyi görünür ve sürdürülebilir hale getirmesidir.",
          "Modern React eğitimlerinde JSX genellikle ilk haftalarda öğretilir çünkü diğer tüm konuların okunabilir bir temel üstüne oturmasını sağlar.",
        ],
      },
    ],
    codingNotes: [
      "Çok satırlı JSX için parantez kullan.",
      "Süslü paranteze statement değil expression yaz.",
      "Gereksiz wrapper yerine fragment tercih et.",
    ],
    rules: [
      "Tek root veya fragment kuralını ihlal etme.",
      "Self-closing etiketleri `/>` ile kapat.",
      "class yerine className kullan.",
      "JSX yorumlarını `{/* yorum */}` biçiminde yaz.",
    ],
    commonMistakes: [
      "Birden fazla kardeş elemanı rootsuz döndürmek.",
      "class yazıp derleyici hatası almak.",
      "Expression yerine geçersiz JS ifadesi kullanmak.",
    ],
    learningGoals: [
      "JSX ile JSX'siz yaklaşımın ilişkisini açıklamak",
      "Temel kuralları hatasız uygulamak",
      "Okunabilir, bakım dostu JSX yazmak",
    ],
    realWorldScenario: "JSX, büyük bileşen ağaçlarında arayüz kodunu okunur tutarak ekip içi geliştirme hızını ve kod inceleme kalitesini yükseltir.",
    deepDiveNotes: [
      "JSX bir şablon dili değil, JavaScript üzerinde çalışan bir sözdizim katmanıdır.",
      "Doğru JSX yapısı, state/props akışının zihinde daha kolay takip edilmesini sağlar.",
      "Bileşen sınırları netleştikçe JSX karmaşıklığı azalır ve test yazımı kolaylaşır.",
      "JSX'te okunabilirlik hedefi, yalnızca bugünün geliştiricisi için değil gelecekte kodu devralacak ekip arkadaşları içindir.",
      "Aynı çıktı farklı yollarla üretilebilse de en iyi çözüm, bakım maliyeti en düşük olandır.",
    ],
    antiPatterns: [
      "Uzun JSX bloklarını parçalamadan tek dosyada büyütmek.",
      "Aynı görsel kalıbı tekrar tekrar kopyalamak.",
      "Expression ve markup sorumluluklarını ayırmamak.",
      "Sadece çalıştığı için karmaşık ifadeleri düzeltmeden bırakmak.",
      "Koşullu render bloklarını standartlaştırmadan rastgele yazmak.",
    ],
    practiceTask: "Aynı UI çıktısını hem JSX hem React.createElement ile yaz; iki yaklaşımın okunabilirlik farkını not et.",
    materials: [
      {
        id: "jsx-mat-1",
        title: "Tanım Kartı",
        kind: "theory",
        content: "JSX, React arayüzünü JavaScript içinde yazmayı kolaylaştıran sözdizimidir.",
      },
      {
        id: "jsx-mat-2",
        title: "Kural Kartı",
        kind: "rule",
        content: "Tek root, doğru kapanış, className ve expression kuralları temel omurgadır.",
      },
      {
        id: "jsx-mat-3",
        title: "Sık Hata",
        kind: "warning",
        content: "Root kuralı ihlali ve className unutmak en sık karşılaşılan sorunlardır.",
      },
      {
        id: "jsx-mat-4",
        title: "Kaynak",
        kind: "resource",
        content: "React docs: Writing Markup with JSX, JavaScript in JSX with Curly Braces.",
      },
    ],
    codeSamples: [
      {
        title: "Example 1 - JSX",
        language: "tsx",
        filename: "main.tsx",
        description: "JSX kullanan sürüm, arayüz niyetini doğrudan gösterir ve başlangıç seviyesi için okunabilirliği artırır.",
        walkthroughSteps: [
          "myElement JSX ile tanımlanır.",
          "createRoot ile root bağlanır.",
          "Element doğrudan render edilerek ekran çıktısı üretilir.",
        ],
        code: `const myElement = <h1>I Love JSX!</h1>;

createRoot(document.getElementById("root")!).render(myElement);`,
      },
      {
        title: "Example 2 - Without JSX",
        language: "tsx",
        filename: "main.tsx",
        description: "Aynı çıktının JSX'siz sürümüdür; React.createElement çağrısının JSX'in arka planındaki karşılığı olduğunu gösterir.",
        walkthroughSteps: [
          "createElement ile etiket tipi, props ve içerik verilir.",
          "Üretilen React elementi değişkende tutulur.",
          "Bu element root üzerinden render edilir.",
        ],
        code: `const myElement = React.createElement("h1", {}, "I do not use JSX!");

createRoot(document.getElementById("root")!).render(myElement);`,
      },
      {
        title: "Expressions in JSX",
        language: "tsx",
        filename: "main.tsx",
        description: "JSX içinde JavaScript expression kullanımını gösterir; dinamik hesaplar doğrudan metinle birleştirilebilir.",
        walkthroughSteps: [
          "Süslü parantez içinde expression yazılır.",
          "Expression runtime sırasında hesaplanır.",
          "Sonuç, JSX metni içine yerleştirilir.",
        ],
        code: `const myElement = <h1>React is {5 + 5} times better with JSX</h1>;`,
      },
      {
        title: "Fragment Example",
        language: "tsx",
        filename: "main.tsx",
        description: "Birden fazla kardeş elemanı gereksiz DOM düğümü üretmeden döndürmek için fragment kullanımını gösterir.",
        walkthroughSteps: [
          "Fragment açılış/kapanış etiketleri kullanılır.",
          "Kardeş elemanlar aynı blokta döndürülür.",
          "DOM tarafında ekstra wrapper oluşmaz.",
        ],
        code: `const myElement = (
  <>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </>
);`,
      },
    ],
    quizQuestions: [
      {
        id: "jsx-q1",
        question: "JSX expression yazımı için doğru örnek hangisidir?",
        options: [
          { id: "a", text: "<h1>React is {5 + 5} times better with JSX</h1>" },
          { id: "b", text: "<h1>React is [5 + 5] times better with JSX</h1>" },
          { id: "c", text: "<h1>React is (5 + 5) times better with JSX</h1>" },
        ],
        correctOptionId: "a",
        explanation: "JSX expressionları süslü parantez içinde yazılır.",
      },
      {
        id: "jsx-q2",
        question: "Aşağıdakilerden hangisi JSX kuralıdır?",
        options: [
          { id: "a", text: "Tek top-level eleman veya fragment gerekir" },
          { id: "b", text: "class doğrudan kullanılmalıdır" },
          { id: "c", text: "Kapanış etiketi zorunlu değildir" },
        ],
        correctOptionId: "a",
        explanation: "JSX, XML benzeri yapıda olduğundan kök ve kapanış kurallarına uyar.",
      },
      {
        id: "jsx-q3",
        question: "JSX'te class için hangi attribute kullanılır?",
        options: [
          { id: "a", text: "class" },
          { id: "b", text: "className" },
          { id: "c", text: "styleClass" },
        ],
        correctOptionId: "b",
        explanation: "JavaScript'te class rezerv kelime olduğu için JSX tarafında className kullanılır.",
      },
    ],
  };
};

const buildProjectsForTopic = (topic: LessonContent): ExampleProject[] => {
  const focus = detectFocus(topic.title, topic.slug);
  const projectTheme =
    focus === "forms"
      ? "Kullanıcı Kayıt ve Doğrulama"
      : focus === "router"
        ? "Çok Sayfalı Dashboard"
        : focus === "hooks"
          ? "Durum ve Yan Etki Yönetimi"
          : focus === "jsx"
            ? "Bileşen Kütüphanesi Demo Sayfası"
            : focus === "assessment"
              ? "Quiz ve Değerlendirme Modülü"
              : "Eğitim Paneli";

  const primary: ExampleProject = {
    id: `${topic.id}-project-core`,
    title: `${projectTheme} | Core`,
    level: focus === "router" || focus === "hooks" ? "Orta" : "Baslangic",
    duration: "4-6 saat",
    projectTopic: topic.title,
    summary: `${topic.title} konusunu tek bir hedefte netleştiren uygulanabilir mini proje.`,
    whatYouBuild: `${projectTheme} odağında, kullanıcı aksiyonunu state ve görünümle doğru eşleyen işlevsel bir ekran.`,
    outcomes: ["Konu bilgisini gerçek senaryoya aktarma", "Temiz bileşen ayrımı", "Doğru kullanıcı geri bildirimi"],
    techFocus: [topic.title, "React", "TypeScript"],
    steps: [
      "İlk sürümü tek kullanıcı akışıyla çalışır hale getir.",
      "Kenar durumları (boş, hatalı, loading) ekle.",
      "Görünümü küçük alt bileşenlere ayır.",
      "Sonuçları kontrol listesiyle doğrula.",
    ],
    deliverables: ["Çalışan uygulama akışı", "Bileşen yapısı", "Kısa teknik açıklama"],
    acceptanceCriteria: [
      "Ana kullanıcı akışı hatasız tamamlanıyor.",
      "Başlık konusunun katkısı kod içinde açık görülüyor.",
      "Kod okunabilirlik açısından ekip standartlarına yakın.",
    ],
    validationChecklist: [
      "Beklenen kullanıcı senaryosu tamamlandı mı?",
      "Yanlış girişlerde kontrollü mesaj gösteriliyor mu?",
      "State tek kaynakta yönetiliyor mu?",
      "Kod tekrarı makul seviyede mi?",
    ],
    solutionNotes: [
      "Bileşenleri önce fonksiyonel doğruluğa göre yaz, sonra görünüm iyileştir.",
      "UI'da her durumun kullanıcıya net bir karşılığı olmalı.",
    ],
    solutionCode: {
      title: `${topic.title} | Örnek Çözüm`,
      language: "tsx",
      filename: "solution.tsx",
      description: "Core çözüm, minimum çalışan akışı temiz ve okunabilir şekilde kurar.",
      walkthroughSteps: [
        "Input state'i kontrollü bileşen olarak yönetilir.",
        "Kullanıcı girdisi koşullu sonuç metnine yansıtılır.",
        "Basit ama genişlemeye açık yapı korunur.",
      ],
      code: `import { useState } from "react";

export default function CoreSolution() {
  const [query, setQuery] = useState("");

  return (
    <section>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>{query ? "Sonuç hazır" : "Arama bekleniyor"}</p>
    </section>
  );
}`,
      lineExplanations: [],
    },
  };

  const advanced: ExampleProject = {
    id: `${topic.id}-project-advanced`,
    title: `${projectTheme} | Portfolio`,
    level: focus === "forms" ? "Orta" : "Ileri",
    duration: "1-2 gün",
    projectTopic: topic.title,
    summary: "Gerçek ürün davranışını taklit eden, portfolyoda anlatılabilir kapsamlı proje.",
    whatYouBuild: "Çok adımlı kullanıcı akışı, durum yönetimi, doğrulama ve raporlama içeren gelişmiş uygulama.",
    outcomes: ["Üretim mantığı", "Teslim kalitesi", "Performans + bakım dengesi"],
    techFocus: [topic.title, "Component Architecture", "State Flow"],
    steps: [
      "Akışı sayfa/bileşen planına böl.",
      "Veri modelini ve props sözleşmesini yaz.",
      "Ana fonksiyonu tamamla, sonra hata/boş durumları ekle.",
      "Son adımda performans ve okunabilirlik iyileştir.",
    ],
    deliverables: ["Çalışan senaryo", "Kabul kriteri raporu", "Kod inceleme notu"],
    acceptanceCriteria: [
      "Akış başlangıçtan sona test edilebilir.",
      "Kenar durumlarda UI tutarlılığı bozulmuyor.",
      "Yeni geliştirici dosya yapısını kısa sürede anlayabiliyor.",
    ],
    validationChecklist: [
      "State güncellemeleri öngörülebilir mi?",
      "Navigasyon ve etkileşim beklenen sırada mı?",
      "Kod içinde gereksiz karmaşıklık var mı?",
      "Teslim kriterleri tek tek karşılanıyor mu?",
    ],
    solutionNotes: [
      "Tekrar eden logic'i yardımcı fonksiyon ya da custom hook'a taşı.",
      "Büyük JSX bloklarında okunabilirliği artırmak için alt bileşen kullan.",
    ],
    solutionCode: {
      title: `${topic.title} | Portfolio Çözüm`,
      language: "tsx",
      filename: "solution.tsx",
      description: "Portfolio çözümünde liste yönetimi ve türetilmiş değer hesaplaması birlikte kullanılarak üretim senaryosu simüle edilir.",
      walkthroughSteps: [
        "Todo tip modeli ile veri sözleşmesi tanımlanır.",
        "State dizisi üzerinden görev akışı yönetilir.",
        "useMemo ile tamamlanan görev sayısı hesaplanır.",
      ],
      code: `import { useMemo, useState } from "react";

type Todo = { id: number; label: string; done: boolean };

export default function PortfolioSolution() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const doneCount = useMemo(() => todos.filter((t) => t.done).length, [todos]);

  return (
    <section>
      <p>Tamamlanan: {doneCount}</p>
      <button onClick={() => setTodos((prev) => [...prev, { id: Date.now(), label: "Yeni görev", done: false }])}>
        Görev Ekle
      </button>
    </section>
  );
}`,
      lineExplanations: [],
    },
  };

  return [primary, advanced];
};

const tutorialLessons = tutorialTopics.map((title) => {
  if (title === "React Home") return buildHomeTopic();
  if (title === "React Intro") return buildIntroTopic();
  if (title === "React JSX Intro") return buildJsxIntroTopic();
  if (title === "React Class") return buildClassTopic();
  if (title === "React Forms") return buildFormsTopic();
  if (title === "React Router") return buildRouterTopic();
  if (title === "React Props") return buildPropsTopic();
  if (title === "React Events") return buildEventsTopic();
  return buildTopic(title, "React Tutorial");
}).map(ensureMandatoryLessonStructure).map(applyLessonNarrative);
const hookLessons = hookTopics.map((title) => {
  if (title === "What is Hooks?") return buildHooksIntroTopic();
  if (title === "React useState") return buildUseStateTopic();
  if (title === "React useEffect") return buildUseEffectTopic();
  return buildTopic(title, "React Hooks");
}).map(ensureMandatoryLessonStructure).map(applyLessonNarrative);
const certLessons = certTopics.map((title) => buildTopic(title, "React Cert"));
const exerciseLessons = exerciseTopics
  .map((title) => buildTopic(title, "React Exercises"))
  .map(ensureMandatoryLessonStructure)
  .map(applyLessonNarrative);
const normalizedCertLessons = certLessons.map(ensureMandatoryLessonStructure).map(applyLessonNarrative);

const allTopics = [...tutorialLessons, ...hookLessons, ...normalizedCertLessons, ...exerciseLessons];
const projectsByTopicId = Object.fromEntries(allTopics.map((topic) => [topic.id, buildProjectsForTopic(topic)]));

export const reactCourse: ReactCourseContent = {
  title: "React Öğrenme Platformu",
  subtitle: "Soldaki sabit konu ağacıyla başlıklar arasında kaybolmadan, öğretici anlatım ve gerçek proje pratiğiyle ilerle.",
  categories: [
    {
      id: "react-tutorial",
      title: "React Tutorial",
      description: "Temelden ileriye tüm React yapı taşlarını adım adım anlatan ana ders hattı.",
      groups: [
        {
          id: "react-tutorial-topics",
          title: "React Tutorial Konuları",
          description: "React temel modülleri",
          topics: tutorialLessons,
        },
      ],
    },
    {
      id: "react-hooks",
      title: "React Hooks",
      description: "Hook ailesini kullanım amacı, sınırları ve performans etkisiyle öğren.",
      groups: [
        {
          id: "react-hooks-topics",
          title: "React Hooks Konuları",
          description: "State, effect ve optimizasyon odaklı konu seti",
          topics: hookLessons,
        },
      ],
    },
    {
      id: "react-cert",
      title: "React Cert",
      description: "Sertifika hazırlığı için özet, pratik ve ölçme adımları.",
      groups: [
        {
          id: "react-cert-topics",
          title: "React Cert Konuları",
          description: "Sınav odaklı çalışma",
          topics: normalizedCertLessons,
        },
      ],
    },
    {
      id: "react-exercises",
      title: "React Exercises",
      description: "Quiz, alıştırma ve çalışma planı odaklı tekrar alanı.",
      groups: [
        {
          id: "react-exercises-topics",
          title: "React Exercises Konuları",
          description: "Pratik ve değerlendirme modülü",
          topics: exerciseLessons,
        },
      ],
    },
  ],
  projectsByTopicId,
};
