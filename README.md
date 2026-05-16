# React TSX Eğitim Platformu

Samsun Üniversitesi Yazılım Mühendisliği final projesi: **React + TypeScript** ile geliştirilmiş, bileşen tabanlı bir React eğitim sitesi.  
İçerik yapısı [W3Schools React Tutorial](https://www.w3schools.com/react/default.asp) ile uyumludur; teknik doğruluk [React resmi dokümantasyonu](https://react.dev/learn) ile desteklenir.

> **Not:** Proje yalnızca React ekosistemindedir (Figma veya harici tasarım aracı kullanılmamıştır).

## Ödev Gereksinimleriyle Uyum

| Gereksinim | Karşılık |
|------------|----------|
| Header / Footer | `Header.tsx`, `Footer.tsx` |
| Ana içerik + konu anlatımı | `LessonPage` — 63 ders, TSX kod örnekleri |
| Görsel / kod örnekleri | Hero görseli, `CodeBlock`, satır satır açıklama |
| Etkileşimli bileşenler | Quiz, mini oyunlar, mobil menü, sidebar arama, ilerleme |
| React + TSX, fonksiyonel bileşenler | React 19, TypeScript, props ve `interface` tanımları |
| Responsive tasarım | Mobil drawer, `@media` kırılımları |
| `npm install` + `npm start` | Aşağıdaki kurulum bölümü |

## Kullanılan Teknolojiler

- **React 19** — fonksiyonel bileşenler, hooks
- **TypeScript** — tip güvenli props ve veri modelleri
- **Vite** — geliştirme ve production build
- **React Router** — ders URL’leri (`/react/:slug`)
- **CSS** — özel, responsive arayüz (Tailwind/SCSS yok)

## Sayfa Yapısı

```
┌─────────────────────────────────────────┐
│ Header (marka, site başlığı)            │
├──────────┬──────────────────────────────┤
│ Sidebar  │ Ana içerik                   │
│ (konular)│  · Ders başlığı + özet       │
│          │  · Tanım (2 cümle)           │
│          │  · Örnek × 3 + açıklama × 3  │
│          │  · Pratik görev              │
│          │  · Quiz / laboratuvar        │
│          │  · Mini oyun (varsa)         │
│          │  · Proje kartları            │
├──────────┴──────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

## Ders İçeriği (W3Schools Tarzı)

Her ders aynı iskeleti izler:

1. **Tanım** — konu adı altında tam 2 teknik cümle  
2. **Örnek (1–3)** — çalışır TSX kodu (`createRoot` dahil)  
3. **Örnek Açıklaması (1–3)** — her sembol madde madde (`useState`, `super(props)` vb.)  
4. **Pratik görev** — teslim edilebilir mini alıştırma  
5. **Quiz** — en az 3 soru, açıklamalı  
6. **Mini oyun** — birçok derste (eşleştirme, sıralama, boşluk doldurma vb.)  
7. **Ekstra detaylar** — `<details>` ile kapalı: hedefler, kurallar, anti-pattern

Özel dersler: React Class (lifecycle vurgusu), useState, useEffect, JSX, Router, Forms ve diğerleri.

## Öne Çıkan Özellikler

- **63 ders** — Tutorial, Hooks, Cert, Exercises kategorileri
- **Sidebar:** arama, kategori aç/kapa, tamamlanan ders ✓, “Devam et”
- **İlerleme:** tarayıcıda `localStorage`; quiz ≥%70 veya mini oyun + lab
- **Kod:** kopyala, Try it; açıklama maddesine hover → kodda vurgu
- **Konu projeleri:** teslim kriterleri, örnek çözüm kodu
- **İçerik doğrulama:** `npm run validate:content` (yapı + quiz + kod kapsamı)

## Kurulum ve Çalıştırma

```bash
npm install
npm start
```

Tarayıcıda varsayılan: `http://localhost:5173`

Alternatif geliştirme sunucusu:

```bash
npm run dev
```

Production önizleme:

```bash
npm run build
npm run preview
```

## Geliştirici Komutları

| Komut | Açıklama |
|-------|----------|
| `npm start` / `npm run dev` | Geliştirme sunucusu |
| `npm run build` | TypeScript + Vite production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest birim testleri |
| `npm run validate:content` | 63 ders içerik kalite kontrolü |
| `npm run test:e2e` | Playwright smoke testleri |

## Proje Yapısı

```text
src/
├── components/          # UI bileşenleri
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LessonPage.tsx
│   ├── LessonSection.tsx
│   ├── CodeBlock.tsx
│   ├── CodeHighlight.tsx
│   ├── InteractiveLab.tsx   # Quiz
│   └── games/               # Mini oyunlar
├── contexts/            # Progress, kod vurgusu
├── hooks/
├── data/
│   ├── content.ts       # Ders ham verisi
│   ├── course.ts        # Zenginleştirilmiş kurs
│   ├── narrative/       # W3 bölümler, kod örnekleri, açıklamalar
│   └── assessments/     # Quiz ve kod şablonları
├── types/
├── utils/
├── App.tsx
├── App.css
└── main.tsx
scripts/
└── validate-content.ts
e2e/
└── smoke.spec.ts
```

## İçerik Referansları

- [W3Schools React Tutorial](https://www.w3schools.com/react/default.asp)
- [W3Schools React Hooks](https://www.w3schools.com/React/react_hooks.asp)
- [React Learn](https://react.dev/learn)
- [useState](https://react.dev/reference/react/useState) · [useEffect](https://react.dev/reference/react/useEffect)

## Teslim

- Proje klasörünü `node_modules` olmadan paylaşın (veya GitHub deposu).
- Değerlendirme için `npm install` ve `npm start` ile çalıştırılabilir olmalıdır.

## Hazırlayan

Erva Nur Keskin — React TSX Final Projesi
