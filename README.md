# React TSX Eğitim Platformu

Bu proje, final ödevi için hazırlanmış kapsamlı bir React eğitim uygulamasıdır.  
İçerik akışı, W3Schools React Tutorial yapısını referans alır; teknik doğruluk için React resmi dokümantasyonu ile desteklenir.

## Kullanılan Teknolojiler

- React 19
- TypeScript
- Vite
- CSS (özel, responsive arayüz)

## Öne Çıkan Özellikler

- Kategori > Grup > Konu hiyerarşisi
- Solda sabit (sticky) modern minimal navbar (akış korunmuş):
  - React Tutorial (tüm alt başlıklar)
  - React Hooks (tüm alt başlıklar)
  - React Cert
  - React Exercises (tüm alt başlıklar)
- Her ders için zorunlu eğitim şeması:
  - Giriş ve Kavramsal Tanım
  - Neden Kullanılır?
  - Sentaks ve Parametreler
  - Kıyaslamalı Örnekleme
  - Gerçek Hayat Senaryosu
  - İleri Seviye Teknik Detay
  - Soru / Egzersiz
  - materyal kartları
  - öğrenme hedefleri
  - iki veya daha fazla kod örneği
  - mini görev
  - açıklamalı mini quiz
- Minimal modern tasarım dili:
  - kutusuz liste odaklı sol navigasyon
  - aktif konu için sol çizgi vurgusu
  - sade hover geri bildirimi ve güçlü tipografi ritmi
- Önceki/Sonraki ders akışı
- Toplam ilerleme çubuğu
- Konuya bağlı dinamik proje kartları
- Proje detayında: ne inşa ediyorsun, teslim çıktıları, başarılı sayılma kriterleri
- Manuel kontrol listesi + açılır örnek çözüm kodu + çözüm notları
- Mobil uyumlu profesyonel arayüz
- Tüm başlıklarda konuya özgü derin anlatım:
  - gerçek dünya senaryosu
  - derinlemesine notlar
  - anti-pattern uyarıları
- Kod örneklerinde zorunlu katman:
  - Bu kod ne yapıyor?
  - Adım adım açıklama
  - Beklenen sonuç
- Özel uzun içerik başlıkları:
  - React Class
  - React Forms
  - React Router
  - What is Hooks?
  - React useState
  - React useEffect
  - React Props
  - React Events
- Dokümantasyon stili standardı:
  - kod kutularında sol yeşil border
  - teknik kavramlarda pembe vurgu
  - uzun anlatımda yüksek okunabilirlik (satır yüksekliği ve bölüm aralıkları)

## İçerik Referansları

- [W3Schools React Tutorial](https://www.w3schools.com/react/default.asp)
- [W3Schools React Hooks](https://www.w3schools.com/React/react_hooks.asp)
- [React Learn](https://react.dev/learn)
- [React useState](https://react.dev/reference/react/useState)
- [React useEffect](https://react.dev/reference/react/useEffect)

## Kurulum ve Çalıştırma

```bash
npm install
npm start
```

Alternatif:

```bash
npm run dev
```

## Doğrulama Komutları

```bash
npm run build
npm run lint
```

## Proje Yapısı

```text
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Content.tsx
│   ├── CodeSnippet.tsx
│   ├── InteractiveLab.tsx
│   ├── ProjectsShowcase.tsx
│   └── Footer.tsx
├── data/
│   └── content.ts
├── types/
│   └── index.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Not

Proje yalnızca React + TSX ile geliştirilmiştir; harici tasarım aracı gerektirmez.
