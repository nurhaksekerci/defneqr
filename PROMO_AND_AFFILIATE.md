# 🎟️ Promosyon Kodları & 🤝 Affiliate Marketing Sistemi

## 📋 Genel Bakış

Bu dokümantasyon, Defne Qr projesine eklenen **Promosyon Kodları** ve **Affiliate Marketing** sistemlerini açıklar.

---

## 🎟️ Promosyon Kodları Sistemi

### Özellikler

- **3 Tip Promosyon Kodu:**
  - **PERCENTAGE**: Yüzde indirim (%10, %25 gibi)
  - **FIXED**: Sabit tutar indirim (₺50, ₺100 gibi)
  - **FREE_TRIAL**: Ücretsiz deneme süresi (30 gün, 60 gün gibi)

- **Kullanım Limitleri:**
  - Maksimum kullanım sayısı
  - Geçerlilik tarihleri (başlangıç ve bitiş)
  - Belirli planlara özel kodlar
  - Kullanıcı başına bir kez kullanım

### API Endpoints

#### Admin Routes
```
POST   /api/promo-codes              - Yeni promosyon kodu oluştur
GET    /api/promo-codes              - Tüm kodları listele
PUT    /api/promo-codes/:id          - Kodu güncelle
DELETE /api/promo-codes/:id          - Kodu sil
GET    /api/promo-codes/:id/usages   - Kullanım geçmişi
```

#### User Routes
```
GET    /api/promo-codes/validate/:code  - Kodu doğrula
POST   /api/promo-codes/apply           - Kodu uygula
GET    /api/promo-codes/my-usages       - Kendi kullanımlarım
```

### Frontend Sayfaları

- **Admin Panel**: `/admin/promo-codes`
  - Kod oluşturma, düzenleme, silme
  - Kullanım istatistikleri
  - Aktif/pasif durumu değiştirme

- **Checkout**: `/subscription/checkout`
  - Promosyon kodu uygulama
  - İndirim hesaplama
  - Ödeme işlemi

### Kullanım Örneği

```javascript
// Promosyon kodu doğrulama
const response = await api.get('/promo-codes/validate/YILBASI2026?planId=xxx');

// Promosyon kodu uygulama
const applyResponse = await api.post('/promo-codes/apply', {
  code: 'YILBASI2026',
  subscriptionAmount: 500,
  planId: 'xxx'
});

// { originalAmount: 500, discountAmount: 50, finalAmount: 450 }
```

---

## 🤝 Affiliate Marketing Sistemi

### Özellikler

- **Affiliate Partner Başvurusu:**
  - Kullanıcılar affiliate olmak için başvurabilir
  - Admin onayı gerektirebilir (ayarlanabilir)
  - Benzersiz referral code oluşturulur

- **Referral Tracking:**
  - Referral link üzerinden kayıt takibi
  - Cookie-based tracking (30 gün varsayılan)
  - IP ve User Agent kaydı

- **Komisyon Sistemi:**
  - Her abonelikten otomatik komisyon hesaplama
  - Komisyon oranı ayarlanabilir (%10 varsayılan)
  - Ödenmemiş/ödenmiş komisyon takibi

- **Ödeme Yönetimi:**
  - Minimum ödeme tutarı (₺100 varsayılan)
  - Toplu ödeme oluşturma
  - Banka bilgileri saklama
  - Ödeme durumu takibi

### Database Schema

#### AffiliatePartner
- `userId`: Kullanıcı ID (unique)
- `referralCode`: Benzersiz referral kodu
- `totalReferrals`: Toplam referans sayısı
- `totalEarnings`: Toplam kazanç
- `pendingEarnings`: Bekleyen kazanç
- `paidEarnings`: Ödenen kazanç
- `status`: PENDING | ACTIVE | SUSPENDED | BANNED
- Banka bilgileri: `bankName`, `accountHolder`, `iban`

#### Referral
- `affiliateId`: Hangi affiliate'in referansı
- `referredUserId`: Referans edilen kullanıcı
- `hasSubscribed`: Abonelik satın aldı mı?
- `firstSubscription`: İlk abonelik tarihi
- IP ve User Agent tracking

#### AffiliateCommission
- `affiliateId`: Komisyonu kazanan affiliate
- `referredUserId`: Komisyonu tetikleyen kullanıcı
- `subscriptionId`: İlgili abonelik
- `amount`: Komisyon tutarı
- `percentage`: Komisyon oranı (kayıt anındaki)
- `isPaid`: Ödendi mi?

#### AffiliatePayout
- `affiliateId`: Ödeme yapılan affiliate
- `amount`: Ödeme tutarı
- `commissionIds`: Hangi komisyonlar ödendi (JSON)
- `method`: Ödeme yöntemi
- `status`: PENDING | COMPLETED | FAILED

#### AffiliateSettings (Sistem Geneli)
- `commissionRate`: Komisyon oranı (%)
- `minimumPayout`: Minimum ödeme tutarı (₺)
- `isEnabled`: Sistem aktif mi?
- `requireApproval`: Başvuru onayı gerekli mi?
- `cookieDuration`: Cookie süresi (gün)

### API Endpoints

#### User Routes
```
POST   /api/affiliates/apply              - Affiliate başvurusu
GET    /api/affiliates/me                 - Kendi bilgilerim
GET    /api/affiliates/me/link            - Referral linkim
GET    /api/affiliates/me/referrals       - Referanslarım
GET    /api/affiliates/me/commissions     - Komisyonlarım
PUT    /api/affiliates/me/bank-info       - Banka bilgilerimi güncelle
```

#### Admin Routes
```
GET    /api/affiliates/all                - Tüm affiliate partnerlar
PUT    /api/affiliates/:id/status         - Başvuru onayla/reddet
GET    /api/affiliates/stats              - Genel istatistikler
GET    /api/affiliates/settings           - Ayarları getir
PUT    /api/affiliates/settings           - Ayarları güncelle
POST   /api/affiliates/payouts            - Ödeme oluştur
GET    /api/affiliates/payouts            - Tüm ödemeleri listele
PUT    /api/affiliates/payouts/:id        - Ödeme durumunu güncelle
```

### Frontend Sayfaları

#### Kullanıcı Sayfaları
- **Affiliate Dashboard**: `/dashboard/affiliate`
  - Affiliate başvurusu yapma
  - Referral link paylaşımı (Twitter, Facebook, WhatsApp)
  - Referanslar listesi
  - Komisyonlar ve kazanç takibi
  - Banka bilgileri yönetimi

#### Admin Sayfaları
- **Affiliate Partners**: `/admin/affiliates`
  - Tüm affiliate partnerları görüntüleme
  - Başvuru onaylama/reddetme
  - Durum güncelleme (Active, Suspended, Banned)
  - Ödeme oluşturma

- **Affiliate Settings**: `/admin/affiliate-settings`
  - Komisyon oranı belirleme
  - Minimum ödeme tutarı
  - Sistem aktif/pasif
  - Başvuru onayı ayarı
  - Cookie süresi

### Referral Flow

1. **Kullanıcı Affiliate Başvurusu Yapar**
   ```
   POST /api/affiliates/apply
   {
     "bankName": "...",
     "accountHolder": "...",
     "iban": "..."
   }
   ```

2. **Admin Başvuruyu Onaylar**
   ```
   PUT /api/affiliates/:id/status
   { "status": "ACTIVE" }
   ```

3. **Affiliate Referral Link Alır**
   ```
   GET /api/affiliates/me/link
   // Returns: https://defneqr.com/auth/register?ref=ABC123
   ```

4. **Kullanıcı Referral Link ile Kayıt Olur**
   - Middleware `ref` parametresini algılar
   - Cookie'ye kaydeder (30 gün)
   - Kayıt sırasında `Referral` oluşturulur

5. **Referans Kullanıcı Abonelik Satın Alır**
   - Otomatik `AffiliateCommission` oluşturulur
   - Affiliate'in kazançları güncellenir

6. **Affiliate Ödeme Talep Eder**
   - Minimum tutara ulaştığında
   - Admin ödemeyi onaylar

### Komisyon Hesaplama

```javascript
// Örnek: %10 komisyon oranı, ₺500 abonelik
const subscriptionAmount = 500;
const commissionRate = 10;
const commissionAmount = (subscriptionAmount * commissionRate) / 100;
// = ₺50
```

### Cookie & Tracking

```javascript
// Referral code cookie'ye kaydedilir
res.cookie('referral_code', 'ABC123', {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});

// Kayıt sırasında cookie okunur
const referralCode = req.cookies?.referral_code;
if (referralCode) {
  await processReferral(referralCode, newUser.id, req.ip, req.headers['user-agent']);
}
```

---

## 🎨 Custom Toast/Alert Component

### Kullanım

```tsx
import { Toast, useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { toast, showToast, closeToast } = useToast();

  const handleSuccess = () => {
    showToast('success', 'Başarılı', 'İşlem tamamlandı');
  };

  const handleError = () => {
    showToast('error', 'Hata', 'Bir şeyler yanlış gitti');
  };

  const handleWarning = () => {
    showToast('warning', 'Uyarı', 'Limit aşıldı', {
      currentCount: 5,
      maxCount: 10,
      planName: 'Ücretsiz'
    });
  };

  return (
    <>
      {/* ... component content ... */}
      
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          details={toast.details}
          onClose={closeToast}
        />
      )}
    </>
  );
}
```

### Toast Tipleri

- **success**: Yeşil, başarılı işlemler için
- **error**: Kırmızı, hata durumları için
- **warning**: Sarı, uyarılar ve limitler için
- **info**: Mavi, bilgilendirme için

### Özellikler

- Modal-style overlay
- Otomatik kapanma (5 saniye varsayılan)
- Plan limit detayları gösterimi
- "Planı Yükselt" butonu (warning tipinde)
- Animasyonlu giriş/çıkış

---

## 🚀 Deployment

### 1. Migration Uygula

```bash
# Docker ortamında
docker compose exec backend npx prisma migrate deploy

# Veya SQL dosyasını manuel çalıştır
docker compose exec postgres psql -U defneqr defneqr < backend/prisma/migrations/20260220_add_promo_codes_and_affiliate_system/migration.sql
```

### 2. Backend Restart

```bash
docker compose restart backend
```

### 3. Frontend Build

```bash
docker compose build frontend
docker compose restart frontend
```

### 4. Default Affiliate Settings Oluştur

İlk affiliate başvurusu geldiğinde otomatik oluşturulacak. 
Manuel oluşturmak için:

```bash
docker compose exec backend node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.affiliateSettings.create({
  data: {
    commissionRate: 10,
    minimumPayout: 100,
    isEnabled: true,
    requireApproval: true,
    cookieDuration: 30
  }
}).then(() => console.log('✅ Affiliate settings created')).finally(() => prisma.\$disconnect());
"
```

---

## 📊 Test Senaryoları

### Promo Code Test

1. Admin panelde `/admin/promo-codes` sayfasına git
2. Yeni kod oluştur (örn: `TEST50`, PERCENTAGE, 50%)
3. Logout yap ve farklı hesapla login ol
4. Checkout sayfasında kodu uygula
5. İndirimin uygulandığını doğrula

### Affiliate Test

1. Normal bir kullanıcı hesabı ile `/dashboard/affiliate` sayfasına git
2. Affiliate başvurusu yap
3. Admin hesabı ile `/admin/affiliates` sayfasına git
4. Başvuruyu onayla
5. Kullanıcı hesabına dön ve referral linki kopyala
6. Gizli/incognito pencerede referral link ile kayıt ol
7. Admin panelden `/admin/subscriptions` ile yeni kullanıcıya abonelik ekle
8. Affiliate dashboard'da komisyonun oluştuğunu kontrol et

---

## 🔧 Yapılandırma

### Environment Variables

Mevcut `.env` dosyasına eklemeniz gereken yeni değişken yok. 
Tüm ayarlar veritabanı üzerinden yapılıyor.

### Affiliate Settings

Admin panelden `/admin/affiliate-settings` sayfasında:
- **Komisyon Oranı**: Varsayılan %10
- **Minimum Ödeme**: Varsayılan ₺100
- **Cookie Süresi**: Varsayılan 30 gün
- **Başvuru Onayı**: Varsayılan Aktif
- **Sistem Durumu**: Varsayılan Aktif

---

## 📈 İzleme ve Raporlama

### Admin İstatistikler

- `/admin/promo-codes`: Promosyon kodu kullanım oranları
- `/admin/affiliates`: Affiliate istatistikleri (toplam partner, aktif, bekleyen)
- `/admin/affiliates` stats API: Toplam referans, komisyon, kazanç

### User Dashboard

- `/dashboard/affiliate`: Kişisel referans sayısı, kazançlar, bekleyen ödemeler

---

## 🎯 Önemli Notlar

1. **Referral Tracking**: 
   - Referral code cookie'de saklanır (HttpOnly, Secure)
   - Cookie süresi affiliate settings'den okunur
   - Kullanıcı kendi referral linki ile kayıt olamaz

2. **Komisyon Oluşturma**: 
   - Sadece referans kullanıcı ilk aboneliği satın aldığında
   - Komisyon oranı ayarlardaki güncel oran kullanılır
   - Otomatik olarak affiliate istatistikleri güncellenir

3. **Promosyon Kodu Kontrolü**:
   - Kod her zaman uppercase'e çevrilir
   - Kullanıcı başına bir kez kullanım
   - Maksimum kullanım, geçerlilik tarihleri otomatik kontrol edilir

4. **Toast Component**:
   - Modal component'e benzer kullanım
   - Plan limit hatalarında detaylı bilgi gösterimi
   - `alert()` yerine kullanılması önerilir

---

## 🔐 Güvenlik

- Tüm admin routes `authorize('ADMIN')` middleware ile korunmuş
- Promosyon kodları case-insensitive (hep uppercase kaydedilir)
- Affiliate banka bilgileri şifrelenmemiş (ekstra güvenlik gerekebilir)
- Referral tracking için IP ve User Agent loglanır

---

## 📝 TODO - Gelecek Geliştirmeler

- [ ] Gerçek ödeme entegrasyonu (Stripe, iyzico)
- [ ] Email bildirimleri (başvuru onayı, komisyon kazanma, ödeme)
- [ ] Affiliate dashboard grafikler (zaman içinde kazanç)
- [ ] Promo code kullanım analitiği
- [ ] Affiliate leaderboard (en çok kazananlar)
- [ ] Promosyon kodu otomatik oluşturma
- [ ] Banka bilgileri şifreleme
- [ ] CSV export (affiliate raporları)

---

## 📞 Destek

Sorularınız için: destek@defneqr.com
