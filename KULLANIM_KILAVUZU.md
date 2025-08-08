# Dr. Mert Yeşiladalı Web Sitesi - Kullanım Kılavuzu

Bu kılavuz, Dr. Mert Yeşiladalı'nın web sitesinin nasıl kullanılacağını ve güncelleneceğini açıklar.

## 🚀 Hızlı Başlangıç

### 1. GitHub Repository Oluşturma
1. GitHub'da yeni bir repository oluşturun: `mertyesiladali`
2. Bu projeyi repository'ye yükleyin
3. GitHub Pages'i etkinleştirin (Settings > Pages)

### 2. Yerel Geliştirme
```bash
# Projeyi klonlayın
git clone https://github.com/kullaniciadi/mertyesiladali.git
cd mertyesiladali

# Hugo server'ı başlatın
hugo server --buildDrafts

# Tarayıcıda http://localhost:1313 adresini açın
```

## 📝 İçerik Güncelleme

### Yeni Sayfa Ekleme

#### Türkçe Sayfa
```bash
hugo new content yeni-sayfa.md
```

#### İngilizce Sayfa
```bash
hugo new content en/yeni-sayfa.md
```

### Mevcut Sayfaları Düzenleme

#### Türkçe Sayfalar
- `content/about.md` - Hakkımda sayfası
- `content/services.md` - Hizmetler sayfası
- `content/contact.md` - İletişim sayfası

#### İngilizce Sayfalar
- `content/en/about.md` - About page
- `content/en/services.md` - Services page
- `content/en/contact.md` - Contact page

### Markdown Formatı
```markdown
---
title: "Sayfa Başlığı"
date: 2024-01-15
description: "Sayfa açıklaması"
---

# Ana Başlık

## Alt Başlık

Normal metin içeriği.

### Daha Küçük Başlık

- Liste öğesi 1
- Liste öğesi 2

**Kalın metin** ve *italik metin*.
```

## 🎨 Tasarım Güncelleme

### Renk Değişiklikleri
`themes/medical-theme/layouts/_default/baseof.html` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #2563eb;    /* Ana renk */
    --secondary-color: #1e40af;  /* İkincil renk */
    --accent-color: #3b82f6;     /* Vurgu rengi */
    --text-color: #1f2937;       /* Metin rengi */
    --light-bg: #f8fafc;         /* Açık arka plan */
    --white: #ffffff;            /* Beyaz */
}
```

### Yeni Bölüm Ekleme
Ana sayfaya yeni bölüm eklemek için `themes/medical-theme/layouts/index.html` dosyasını düzenleyin.

## 🌐 Çok Dilli İçerik

### Dil Dosyaları
- `i18n/tr.yaml` - Türkçe çeviriler
- `i18n/en.yaml` - İngilizce çeviriler

### Yeni Çeviri Ekleme
```yaml
# i18n/tr.yaml
hello: "Merhaba"
welcome: "Hoş geldiniz"

# i18n/en.yaml
hello: "Hello"
welcome: "Welcome"
```

## 🔧 Konfigürasyon

### Site Ayarları
`hugo.toml` dosyasında şu ayarları güncelleyebilirsiniz:

```toml
baseURL = 'https://mertyesiladali.github.io/'
title = 'Dr. Mert Yeşiladalı - Jinekolog'

[params]
  description = "Site açıklaması"
  email = "e-posta@adres.com"
  phone = "+90 212 211 40 00"
  hospital_url = "https://hastane-adresi.com"
```

### Menü Güncelleme
```toml
[menu]
  [[menu.main]]
    identifier = "yeni-sayfa"
    name = "Yeni Sayfa"
    url = "/yeni-sayfa/"
    weight = 5
```

## 📱 Responsive Tasarım

Site otomatik olarak mobil uyumludur. Test etmek için:
1. Tarayıcıda F12 tuşuna basın
2. Responsive tasarım simgesine tıklayın
3. Farklı ekran boyutlarını test edin

## 🚀 Deployment

### Otomatik Deployment
GitHub Actions otomatik olarak siteyi yayınlar:
1. `main` branch'e push yapın
2. GitHub Actions çalışır
3. Site otomatik olarak yayınlanır

### Manuel Deployment
```bash
# Siteyi derleyin
hugo --minify

# public/ klasörünü web sunucusuna yükleyin
```

## 📊 SEO Optimizasyonu

### Meta Etiketleri
Her sayfada şu meta etiketleri bulunur:
- Title
- Description
- Author
- Language

### Sitemap
Site otomatik olarak `sitemap.xml` oluşturur.

## 🔍 Sorun Giderme

### Yaygın Sorunlar

#### Site Görünmüyor
1. GitHub Pages ayarlarını kontrol edin
2. Repository'nin public olduğundan emin olun
3. GitHub Actions'ın başarılı olduğunu kontrol edin

#### Çok Dilli İçerik Çalışmıyor
1. `hugo.toml` dosyasındaki dil ayarlarını kontrol edin
2. İçerik dosyalarının doğru klasörde olduğundan emin olun

#### Tasarım Bozuk
1. CSS dosyalarının yüklendiğini kontrol edin
2. Bootstrap CDN bağlantılarını kontrol edin

## 📞 Destek

Sorunlar için:
1. GitHub Issues kullanın
2. Hugo dokümantasyonunu inceleyin
3. Web geliştirici ile iletişime geçin

## 📚 Faydalı Kaynaklar

- [Hugo Dokümantasyonu](https://gohugo.io/documentation/)
- [Bootstrap 5 Dokümantasyonu](https://getbootstrap.com/docs/5.0/)
- [GitHub Pages](https://pages.github.com/)
- [Markdown Rehberi](https://www.markdownguide.org/)

---

*Bu kılavuz sürekli güncellenmektedir. Son güncellemeler için GitHub repository'sini kontrol edin.*
