# Defne QR - Dijital Menü Sistemi

## 📋 Proje Özeti

Defne QR, restoran ve kafeler için geliştirilmiş kapsamlı bir **dijital menü yönetim platformu**dur. QR kod tabanlı menü sistemi ile müşterilerinize dokunmatik menü deneyimi sunarken, güçlü yönetim paneli ile işletmenizi kolayca yönetebilirsiniz.

**Teknolojiler:**
- **Frontend:** Next.js 15, React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL 15
- **Deployment:** Docker, Docker Compose, Nginx (Reverse Proxy + SSL)
- **Authentication:** JWT (Access + Refresh Token), Google OAuth 2.0

---

## 🎯 Ana Özellikler

### 1. 🍽️ Dijital Menü Sistemi
- **QR Kod ile Menü Erişimi:** Her masa için benzersiz QR kod
- **Çoklu Dil Desteği:** Türkçe, İngilizce, Almanca, Rusça, Arapça
- **Responsive Tasarım:** Mobil, tablet ve desktop uyumlu
- **Görsel Odaklı:** Ürün görselleri, kategori görselleri
- **Fiyat Görünürlüğü:** Admin tercihe göre fiyatları göster/gizle
- **Stok Durumu:** Ürünleri aktif/pasif yapma
- **Özel Ürün Etiketleri:** Vejetaryen, Vegan, Acılı, Glutensiz vb.

### 2. 🏢 Restoran Yönetimi
- **Çoklu Restoran:** Bir hesapla birden fazla restoran yönetimi
- **Restoran Profili:** İsim, açıklama, adres, telefon, logo
- **Benzersiz Slug:** SEO uyumlu URL yapısı
- **Soft Delete:** Silinmiş restoranlar geri yüklenebilir
- **Restoran İstatistikleri:** Kategori, ürün, masa sayıları

### 3. 📁 Kategori Yönetimi
- **Hiyerarşik Yapı:** Ana kategoriler ve alt kategoriler
- **Görsel Yönetimi:** Kategori başlık görselleri
- **Sıralama:** Kategorileri istediğiniz sırada gösterme
- **Global Kategoriler:** Tüm restoranlar için ortak kategori havuzu
- **Kategori Kopyalama:** Global kategorilerden hızlı ekleme
- **Çoklu Dil:** Her kategori için çoklu dil desteği

### 4. 🍔 Ürün Yönetimi
- **Detaylı Ürün Bilgileri:** İsim, açıklama, fiyat, görsel, malzemeler
- **Çoklu Görsel:** Ürün için birden fazla fotoğraf
- **Varyant Sistemi:** Ebat, porsiyon, ekstra malzeme seçenekleri
- **Alerjen Bilgisi:** Yaygın alerjenler için işaretleme sistemi
- **Kalori Bilgisi:** Besin değerleri eklenebilir
- **Stok Kontrolü:** Tükenen ürünleri geçici olarak gizleme
- **Ürün Etiketleri:** Özel, Yeni, Kampanya, Popüler vb.

### 5. 🪑 Masa & QR Kod Yönetimi
- **Masa Oluşturma:** Her restoran için sınırsız masa
- **Benzersiz QR Kodlar:** Her masa için tekil QR kod
- **QR Kod İndirme:** PNG formatında yüksek çözünürlük
- **Masa İsimlendirme:** Özelleştirilebilir masa isimleri (Masa 1, Bahçe 3, vb.)
- **Aktif/Pasif:** Masaları geçici olarak devre dışı bırakma

### 6. 👥 Kullanıcı Yönetimi ve Roller

#### Roller:
- **ADMIN:** Tam yetki, tüm restoranlara erişim, sistem ayarları
- **STAFF:** Kısıtlı yetki, atanan restoranlar
- **RESTAURANT_OWNER:** Kendi restoranlarını yönetme

#### Özellikler:
- **Multi-Factor Authentication (MFA):** Email doğrulama
- **Google OAuth:** Tek tıkla giriş
- **Şifre Sıfırlama:** Email ile güvenli şifre sıfırlama
- **Profil Yönetimi:** Avatar, ad-soyad, telefon güncelleme
- **Hesap Güvenliği:** JWT token bazlı kimlik doğrulama

### 7. 💳 Abonelik Sistemi

#### Plan Türleri:
- **FREE:** Ücretsiz deneme (1 restoran, temel özellikler)
- **STARTER:** ₺299/ay (3 restoran)
- **PROFESSIONAL:** ₺599/ay (10 restoran)
- **ENTERPRISE:** ₺999/ay (Sınırsız restoran)

#### Özellikler:
- **Aylık/Yıllık Faturalandırma:** Esnek ödeme seçenekleri
- **Otomatik Yenileme:** Abonelikler otomatik yenilenir
- **Upgrade/Downgrade:** Plan değişikliği
- **Abonelik Geçmişi:** Tüm ödemeler takip edilir
- **Deneme Süresi:** İlk 14 gün ücretsiz
- **Abonelik Bildirimleri:** Süre bitiminden önce uyarı

### 8. 🎟️ Promosyon Kodu Sistemi

#### Kod Türleri:
- **PERCENTAGE:** Yüzde indirim (örn: %20 indirim)
- **FIXED:** Sabit tutar (örn: ₺50 indirim)
- **FREE_TRIAL:** Ücretsiz deneme süresi (örn: 30 gün hediye)

#### Özellikler:
- **Kullanım Limiti:** Toplam kaç kez kullanılabilir
- **Geçerlilik Tarihi:** Başlangıç ve bitiş tarihi
- **Plan Kısıtlaması:** Belirli planlara uygulanabilir
- **Kullanım Takibi:** Kimin, ne zaman kullandığı kayıt altında
- **Admin Paneli:** Kod oluşturma, düzenleme, silme, istatistikler
- **Checkout Entegrasyonu:** Satın alma sırasında kod uygulama

### 9. 🤝 Affiliate Marketing Sistemi

#### İki Farklı Model:

##### A) Restoran Sahipleri İçin (Gün Kazanma Sistemi)
- ✅ **Otomatik Affiliate:** İlk restoran oluşturulduğunda otomatik affiliate olur
- ✅ **Başvuru Yok:** Form doldurmaya gerek yok
- ✅ **Gün Kazanma:** Her referral için abonelik süresine gün eklenir
- ✅ **Admin Ayarı:** Kazanılan gün sayısı ayarlanabilir (default: 7 gün)
- ✅ **Para Yok:** Komisyon ödemesi yok, sadece abonelik uzatması

##### B) Ödenen Affiliate'ler İçin (Para Komisyonu)
- **Başvuru Sistemi:** Kullanıcılar affiliate olmak için başvurur
- **Admin Onayı:** Admin başvuruları inceleyip onaylar
- **Para Komisyonu:** Her abonelikten % bazlı komisyon
- **Banka Bilgileri:** IBAN, hesap sahibi bilgileri
- **Ödeme Yönetimi:** Admin tarafından manuel ödeme yapma
- **Minimum Ödeme:** Belirli tutara ulaşınca ödeme yapılır

#### Genel Özellikler:
- **Benzersiz Referral Link:** Her affiliate'e özel link
- **Cookie Bazlı Takip:** 30 gün boyunca referral takibi
- **Referral İstatistikleri:** Toplam referans, aktif abonelikler, kazançlar
- **Komisyon Geçmişi:** Tüm kazançlar detaylı kayıt altında
- **Sosyal Medya Paylaşım:** Twitter, Facebook, WhatsApp entegrasyonu
- **Admin Dashboard:** Tüm affiliate'leri görüntüleme ve yönetme

### 10. 📊 Dashboard & Analytics
- **Restoran İstatistikleri:** Kategori, ürün, masa sayıları
- **Popüler Ürünler:** En çok görüntülenen ürünler
- **Kullanıcı Aktiviteleri:** Son işlemler ve değişiklikler
- **Gelir Raporları:** Abonelik ve komisyon raporları (admin)
- **Affiliate Performans:** Referral ve kazanç takibi

### 11. 🎨 Modern UI/UX
- **Custom Toast/Alert Sistemi:** Kullanıcı dostu bildirimler
- **Modal Sistem:** Popup formlar ve onaylar
- **Responsive Design:** Tüm ekran boyutlarına uyumlu
- **Dark/Light Mode Ready:** Kolay tema değişimi için hazır altyapı
- **Loading States:** Tüm işlemlerde yükleme göstergeleri
- **Error Handling:** Kullanıcı dostu hata mesajları

### 12. 🔐 Güvenlik
- **JWT Authentication:** Access ve Refresh token sistemi
- **Role-Based Access Control (RBAC):** Rol bazlı yetkilendirme
- **Password Hashing:** bcrypt ile şifre şifreleme
- **CORS Protection:** Cross-origin güvenliği
- **Rate Limiting:** API isteklerinde hız sınırlaması
- **Input Validation:** Tüm girdilerde doğrulama (express-validator)
- **SQL Injection Protection:** Prisma ORM ile güvenli sorgular
- **XSS Protection:** Frontend'de input sanitization

### 13. 📤 Dosya Yönetimi
- **Çoklu Dosya Yükleme:** Drag & drop ile kolay yükleme
- **Görsel Optimizasyonu:** Otomatik boyutlandırma ve sıkıştırma
- **Desteklenen Formatlar:** JPG, PNG, WEBP, GIF
- **Dosya Boyutu Kontrolü:** Max 5MB limit
- **CDN Ready:** Statik dosyalar için CDN desteği hazır

### 14. 🌐 SEO & Marketing
- **SEO Friendly URLs:** Slug bazlı temiz URL'ler
- **Meta Tags:** Her sayfa için özelleştirilebilir meta bilgileri
- **Open Graph:** Sosyal medya paylaşımları için
- **Sitemap:** Otomatik sitemap oluşturma
- **Robots.txt:** Arama motoru yönetimi
- **Analytics Ready:** Google Analytics entegrasyon hazır

### 15. 🔧 Admin Paneli

#### Restoran Yönetimi:
- Tüm restoranları listeleme ve filtreleme
- Restoran detayları ve düzenleme
- Restoran sahipleri yönetimi
- İstatistikler ve raporlar

#### Kullanıcı Yönetimi:
- Tüm kullanıcıları listeleme
- Rol değiştirme (Admin, Staff, Restaurant Owner)
- Hesap dondurma/aktifleştirme
- Kullanıcı aktivite logları

#### Abonelik Yönetimi:
- Aktif abonelikleri görüntüleme
- Manuel abonelik oluşturma/iptal etme
- Ödeme geçmişi
- Gelir raporları

#### Promosyon Kod Yönetimi:
- Kod oluşturma (%, sabit, ücretsiz deneme)
- Kullanım istatistikleri
- Aktif/pasif yapma
- Kod kullanım geçmişi

#### Affiliate Yönetimi:
- Tüm affiliate partner'ları listeleme
- Başvuruları onaylama/reddetme
- Komisyon ayarları (% oranı, minimum ödeme)
- Gün kazanma sistemi ayarları (restoran sahipleri için)
- Ödeme yapma ve takibi
- Affiliate istatistikleri

### 16. 🏪 Restoran Sahibi Paneli

#### Dashboard:
- Restoran listesi ve hızlı erişim
- Abonelik durumu ve kalan gün
- Referral linki ve kazanılan gün sayısı
- Hızlı istatistikler

#### Restoran Yönetimi:
- Yeni restoran ekleme
- Restoran bilgilerini güncelleme
- Logo ve görsel yönetimi
- Restoran silme (soft delete)

#### Menü Yönetimi:
- Kategori ekleme/düzenleme/silme
- Ürün ekleme/düzenleme/silme
- Global kategorilerden kopyalama
- Toplu ürün import (gelecek özellik)

#### Masa Yönetimi:
- Masa ekleme/düzenleme
- QR kod oluşturma ve indirme
- Masa durumu (aktif/pasif)

#### Affiliate Dashboard:
- Özel referral linki
- Kazanılan gün sayısı
- Referral listesi
- Sosyal medya paylaşım butonları

### 17. 🔗 API Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - Yeni kullanıcı kaydı (referral tracking ile)
- `POST /login` - Email/şifre ile giriş
- `POST /refresh` - Token yenileme
- `POST /logout` - Çıkış yapma
- `GET /me` - Mevcut kullanıcı bilgileri
- `POST /forgot-password` - Şifre sıfırlama isteği
- `POST /reset-password` - Şifre sıfırlama
- `POST /verify-email` - Email doğrulama

#### OAuth (`/api/oauth`)
- `GET /google` - Google OAuth başlatma
- `GET /google/callback` - Google OAuth callback (referral tracking ile)

#### Restaurants (`/api/restaurants`)
- `GET /` - Tüm restoranlar (admin) / Kullanıcının restoranları
- `POST /` - Yeni restoran (ilk restoran = otomatik affiliate)
- `GET /:id` - Restoran detayları
- `PUT /:id` - Restoran güncelleme
- `DELETE /:id` - Restoran silme
- `GET /slug/:slug` - Slug ile restoran bulma

#### Categories (`/api/categories`)
- `GET /restaurant/:restaurantId` - Restoran kategorileri
- `POST /` - Yeni kategori
- `PUT /:id` - Kategori güncelleme
- `DELETE /:id` - Kategori silme
- `GET /global` - Global kategoriler
- `POST /copy-from-global` - Global'den kopyalama

#### Products (`/api/products`)
- `GET /restaurant/:restaurantId` - Restoran ürünleri
- `GET /category/:categoryId` - Kategoriye göre ürünler
- `POST /` - Yeni ürün
- `PUT /:id` - Ürün güncelleme
- `DELETE /:id` - Ürün silme
- `GET /:id` - Ürün detayları

#### Tables (`/api/tables`)
- `GET /restaurant/:restaurantId` - Restoran masaları
- `POST /` - Yeni masa
- `PUT /:id` - Masa güncelleme
- `DELETE /:id` - Masa silme
- `GET /qr/:id` - QR kod oluşturma

#### Subscriptions (`/api/subscriptions`)
- `GET /plans` - Tüm abonelik planları
- `POST /` - Yeni abonelik (referral commission tracking ile)
- `GET /my` - Kullanıcının abonelikleri
- `GET /:id` - Abonelik detayları
- `DELETE /:id` - Abonelik iptali
- `POST /:id/upgrade` - Plan yükseltme

#### Promo Codes (`/api/promo-codes`)
- `GET /` - Tüm promosyon kodları (admin)
- `POST /` - Yeni kod oluştur (admin)
- `PUT /:id` - Kod güncelle (admin)
- `DELETE /:id` - Kod sil (admin)
- `POST /validate` - Kod doğrulama
- `POST /apply` - Kodu uygulama
- `GET /my-usages` - Kullanıcının kullandığı kodlar
- `GET /:id/usages` - Kod kullanım geçmişi (admin)

#### Affiliates (`/api/affiliates`)
##### Kullanıcı Endpoints:
- `POST /apply` - Affiliate başvurusu (sadece normal kullanıcılar)
- `GET /me` - Kendi affiliate bilgileri
- `GET /me/link` - Referral linki
- `GET /me/referrals` - Referanslar listesi
- `GET /me/commissions` - Komisyon geçmişi
- `PUT /me/bank-info` - Banka bilgilerini güncelle

##### Admin Endpoints:
- `GET /` - Tüm affiliate partner'lar
- `PUT /:id/status` - Affiliate durumu güncelle (onay/red)
- `GET /:id/stats` - Affiliate istatistikleri
- `GET /settings` - Affiliate ayarları
- `PUT /settings` - Affiliate ayarlarını güncelle
- `POST /payouts` - Ödeme oluştur
- `PUT /payouts/:id` - Ödeme durumu güncelle
- `GET /payouts` - Tüm ödemeler

### 18. 📱 Public API (Müşteri Tarafı)

#### Menu Viewing (`/api/public/menu`)
- `GET /restaurant/:slug` - Restoran bilgileri
- `GET /restaurant/:slug/categories` - Kategoriler
- `GET /restaurant/:slug/products` - Ürünler
- `GET /table/:tableId/menu` - Masa QR ile menü

### 19. 🎨 Custom UI Components

#### Toast/Alert System:
- **Başarı Bildirimleri:** Yeşil, check icon
- **Hata Bildirimleri:** Kırmızı, error icon
- **Uyarı Bildirimleri:** Sarı, warning icon
- **Bilgi Bildirimleri:** Mavi, info icon
- **Otomatik Kapanma:** 5 saniye sonra kaybolur
- **Detay Gösterimi:** Plan limit bilgileri vb.

#### Modal System:
- **Form Modals:** Veri girişi için
- **Confirmation Modals:** Onay isteme
- **Info Modals:** Bilgilendirme
- **Overlay:** Arka plan karartma
- **ESC ile kapanma:** Klavye desteği

#### Cards:
- **CardHeader:** Başlık ve eylemler
- **CardContent:** İçerik alanı
- **CardFooter:** Alt bölüm
- **Özelleştirilebilir:** Tailwind sınıfları ile

#### Forms:
- **Input:** Text, number, email, password
- **Select:** Dropdown seçim
- **Textarea:** Uzun metinler
- **Checkbox:** Çoklu seçim
- **Radio:** Tekli seçim
- **File Upload:** Drag & drop destekli

### 20. 🔄 Middleware & Helpers

#### Authentication Middleware:
- `authenticate`: Token doğrulama
- `authorize(['ADMIN'])`: Rol kontrolü
- `trackReferral`: Referral cookie ayarlama

#### Validation Middleware:
- Input validation (express-validator)
- File upload validation (multer)
- Sanitization

#### Error Handling:
- Global error handler
- Custom error classes
- Structured error responses

#### Utilities:
- Slug generation (benzersiz URL)
- Pagination helper
- Date formatting
- Currency formatting
- QR code generation

---

## 🗄️ Database Schema

### Temel Modeller:
- **User:** Kullanıcılar ve kimlik bilgileri
- **Restaurant:** Restoran bilgileri
- **Category:** Kategori yönetimi (global + restoran bazlı)
- **Product:** Ürün detayları ve varyantlar
- **Table:** Masa ve QR kod bilgileri

### Abonelik Modelleri:
- **SubscriptionPlan:** Abonelik planları
- **Subscription:** Aktif abonelikler
- **Payment:** Ödeme kayıtları

### Promosyon Modelleri:
- **PromoCode:** Promosyon kodları
- **PromoCodeUsage:** Kod kullanım geçmişi

### Affiliate Modelleri:
- **AffiliatePartner:** Affiliate partner bilgileri
- **Referral:** Referral kayıtları
- **AffiliateCommission:** Komisyon kayıtları
- **AffiliatePayout:** Ödeme kayıtları
- **AffiliateSettings:** Sistem ayarları

### Audit & Logging:
- Tüm modellerde `createdAt`, `updatedAt`
- Soft delete için `isDeleted`, `deletedAt`
- `createdBy`, `updatedBy` için user ID tracking

---

## 🚀 Deployment Yapısı

### Docker Services:
1. **postgres:** PostgreSQL 15 veritabanı
2. **backend:** Node.js/Express API
3. **frontend:** Next.js web uygulaması
4. **nginx:** Reverse proxy + SSL termination

### Nginx Configuration:
- `defneqr.com` → Frontend (port 3000)
- `api.defneqr.com` → Backend (port 5000)
- SSL/TLS with Let's Encrypt
- GZIP compression
- Static file caching
- WebSocket support

### Environment Variables:
```env
# Database
DB_NAME=defneqr
DB_USER=defneqr
DB_PASSWORD=***

# JWT
JWT_SECRET=***
JWT_REFRESH_SECRET=***
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# URLs
FRONTEND_URL=https://defneqr.com
NEXT_PUBLIC_API_URL=https://api.defneqr.com/api

# OAuth
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=***
GOOGLE_CALLBACK_URL=https://api.defneqr.com/api/oauth/google/callback

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=/app/public/uploads
```

---

## 📈 İstatistikler ve Özellik Sayıları

- **Backend API Endpoints:** 60+
- **Frontend Pages:** 25+
- **Database Tables:** 20+
- **Custom UI Components:** 15+
- **User Roles:** 3
- **Subscription Plans:** 4
- **Supported Languages:** 5
- **Authentication Methods:** 2 (Email/Password + Google OAuth)

---

## 🎁 Benzersiz Özellikler

### 1. İki Farklı Affiliate Modeli
- **Para Komisyonu:** Ödenen affiliate'ler için
- **Gün Kazanma:** Restoran sahipleri için (sektörde yenilikçi)

### 2. Otomatik Affiliate Sistemi
- İlk restoran oluşturulduğunda otomatik affiliate
- Form doldurmaya gerek yok

### 3. Global Kategori Havuzu
- Ortak kategori kütüphanesi
- Tek tıkla kopyalama
- Zaman tasarrufu

### 4. Çoklu Restoran Yönetimi
- Tek hesaptan sınırsız restoran
- Her restoran için bağımsız menü
- Merkezi yönetim

### 5. QR Kod Sistemi
- Her masa için benzersiz kod
- Yüksek çözünürlük
- Anında menü erişimi

---

## 🔄 Gelecek Geliştirmeler (Roadmap)

### Kısa Vadeli:
- [ ] Sipariş sistemi (QR'dan sipariş alma)
- [ ] Garson çağırma özelliği
- [ ] Canlı bildirimler (WebSocket)
- [ ] Excel/CSV ile toplu ürün import
- [ ] Ürün stok takibi

### Orta Vadeli:
- [ ] Mobil uygulama (React Native)
- [ ] Ödeme gateway entegrasyonu (Stripe, iyzico)
- [ ] Otomatik invoice/fatura oluşturma
- [ ] Multi-tenant architecture
- [ ] Analytics dashboard (Charts.js/Recharts)

### Uzun Vadeli:
- [ ] AI-powered menu recommendations
- [ ] Customer feedback system
- [ ] Loyalty program (sadakat puanı)
- [ ] Table reservation system
- [ ] Kitchen display system (KDS)
- [ ] POS integration

---

## 📚 Dokümantasyon

- **README.md:** Kurulum ve başlangıç rehberi
- **PROMO_AND_AFFILIATE.md:** Promosyon ve affiliate sistemi detayları
- **RESTAURANT_OWNER_REFERRAL_SYSTEM.md:** Restoran sahibi referral sistemi
- **API Documentation:** (Swagger/OpenAPI gelecek)

---

## 👨‍💻 Geliştirici Bilgileri

### Proje Yapısı:
```
defneqr/
├── backend/
│   ├── src/
│   │   ├── controllers/     # İş mantığı
│   │   ├── routes/          # API route tanımları
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── config/          # Konfigürasyon (database, jwt, oauth)
│   │   ├── utils/           # Yardımcı fonksiyonlar
│   │   └── server.js        # Express app başlatma
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   ├── scripts/             # Utility scripts
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js 15 App Router
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities (api, auth)
│   │   └── styles/          # Global CSS
│   └── Dockerfile
├── nginx/
│   ├── nginx.conf           # Nginx configuration
│   └── ssl/                 # SSL certificates
├── docker-compose.yml       # Docker orchestration
└── .env                     # Environment variables
```

### Git Workflow:
- **Branch:** `main` (production)
- **Commits:** Conventional commits
- **Deployment:** Push to main → Pull on server → Docker rebuild

### Code Standards:
- **Backend:** CommonJS, async/await, try-catch
- **Frontend:** TypeScript, functional components, hooks
- **Naming:** camelCase (JS), PascalCase (Components), kebab-case (files)
- **Comments:** Sadece gerekli yerlerde, açıklayıcı

---

## 🎉 Öne Çıkan Başarılar

1. ✅ **Modüler Architecture:** Kolay genişletilebilir yapı
2. ✅ **Type Safety:** TypeScript ile hata önleme
3. ✅ **Performance:** Docker cache, optimized builds
4. ✅ **Security:** JWT, RBAC, input validation
5. ✅ **User Experience:** Modern UI, responsive design
6. ✅ **Scalability:** Multi-tenant ready, horizontal scaling
7. ✅ **SEO Optimized:** SSR with Next.js, clean URLs
8. ✅ **Developer Experience:** Hot reload, TypeScript, Prisma Studio

---

## 📞 Destek ve İletişim

**Proje:** Defne QR - Dijital Menü Sistemi  
**Domain:** https://defneqr.com  
**API:** https://api.defneqr.com  
**Versiyon:** 1.0.0  
**Son Güncelleme:** 22 Şubat 2026

---

## 🏆 Özel Teşekkürler

Bu proje, modern web teknolojileri ve best practices kullanılarak geliştirilmiştir. 
Restoran sahipleri için işlerini kolaylaştıran, müşterilere modern deneyim sunan 
ve affiliate'ler için kazanç kapısı açan bir platform haline gelmiştir.

**🚀 Başarılı Deployment ve Kullanım Dileriz!**
