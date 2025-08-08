# Dr. Mert Yeşiladalı - Jinekolog Web Sitesi

Bu proje, Dr. Mert Yeşiladalı'nın kişisel jinekolog web sitesidir. Hugo static site generator kullanılarak oluşturulmuştur.

## Özellikler

- **Çok Dilli Destek**: Türkçe ve İngilizce
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Modern UI**: Bootstrap 5 ve Font Awesome kullanımı
- **Hızlı Yükleme**: Static site olarak optimize edilmiş
- **SEO Dostu**: Arama motorları için optimize edilmiş

## Sayfalar

### Türkçe
- Ana Sayfa (`/`)
- Hakkımda (`/about/`)
- Hizmetler (`/services/`)
- İletişim (`/contact/`)

### İngilizce
- Ana Sayfa (`/en/`)
- Hakkımda (`/en/about/`)
- Hizmetler (`/en/services/`)
- İletişim (`/en/contact/`)

## Hizmetler

- Gebelik Takibi
- Jinekolojik Muayene
- Kısırlık Tedavisi
- Miyom Tedavisi
- Jinekolojik Ameliyatlar
- Aile Planlaması

## Teknolojiler

- **Hugo**: Static site generator
- **Bootstrap 5**: CSS framework
- **Font Awesome**: İkonlar
- **Google Fonts**: Tipografi

## Kurulum ve Geliştirme

### Gereksinimler
- Hugo Extended (v0.148.2+)

### Yerel Geliştirme
```bash
# Projeyi klonlayın
git clone <repository-url>
cd dr-mert-yesiladali

# Hugo server'ı başlatın
hugo server --buildDrafts

# Tarayıcıda http://localhost:1313 adresini açın
```

### Siteyi Derleme
```bash
# Production build
hugo --minify

# Build dosyaları public/ klasöründe oluşturulur
```

## GitHub Pages Deployment

Bu site GitHub Pages üzerinde yayınlanmaktadır. Ana branch'teki değişiklikler otomatik olarak yayınlanır.

### GitHub Actions Workflow

`.github/workflows/hugo.yml` dosyası otomatik deployment için yapılandırılmıştır.

## İçerik Güncelleme

### Yeni Sayfa Ekleme
```bash
# Türkçe sayfa
hugo new content sayfa-adi.md

# İngilizce sayfa
hugo new content en/sayfa-adi.md
```

### Mevcut İçeriği Düzenleme
`content/` klasöründeki markdown dosyalarını düzenleyin.

## İletişim Bilgileri

- **Hastane**: Yeditepe Üniversitesi Hastanesi
- **Telefon**: +90 212 211 40 00
- **E-posta**: mert.yesiladali@yeditepehastaneleri.com
- **Randevu**: [Hastane Randevu Sistemi](https://yeditepehastaneleri.com/doktorlar/mert-yesiladali)

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

*Dr. Mert Yeşiladalı - Kadın Hastalıkları ve Doğum Uzmanı*
# Test update
# Test GitHub Actions
# Force GitHub Pages update
