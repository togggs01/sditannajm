# 🔐 Admin Login Credentials

## 3 Admin Accounts dengan Role Berbeda

### 1️⃣ Super Admin (Full Access)
```
Username: superadmin
Password: superadmin123
Role: super_admin
```
**Akses:**
- ✅ Dashboard
- ✅ Guru & Staff
- ✅ Berita
- ✅ Galeri
- ✅ Kelola PPDB
- ✅ Gelombang PPDB

---

### 2️⃣ Admin Berita & Galeri
```
Username: adminberita
Password: berita123
Role: berita_galeri_admin
```
**Akses:**
- ✅ Dashboard
- ✅ Berita
- ✅ Galeri
- ❌ Guru & Staff
- ❌ Kelola PPDB
- ❌ Gelombang PPDB

---

### 3️⃣ Admin PPDB
```
Username: adminppdb
Password: ppdb123
Role: ppdb_admin
```
**Akses:**
- ✅ Dashboard
- ✅ Kelola PPDB
- ✅ Gelombang PPDB
- ❌ Guru & Staff
- ❌ Berita
- ❌ Galeri

---

## 🚀 Cara Login

1. Buka browser dan akses: `https://sditannajm.sch.id/login`
2. Masukkan username dan password sesuai role yang diinginkan
3. Klik "Login"
4. Anda akan diarahkan ke dashboard dengan menu sesuai hak akses

## 🛡️ Fitur Keamanan

### Menu Filtering
- Sidebar dan bottom navigation otomatis menyembunyikan menu yang tidak bisa diakses
- Admin hanya melihat menu sesuai hak aksesnya

### Route Protection
- Jika admin mencoba akses URL halaman yang tidak diizinkan, akan otomatis redirect ke dashboard
- Contoh: `adminberita` coba akses `/admin/guru` → redirect ke `/admin`

### Session Management
- Session berlaku 24 jam
- Auto logout jika session expired
- Session checker berjalan di background

## 📊 Tabel Hak Akses

| Halaman | Super Admin | Admin Berita | Admin PPDB |
|---------|-------------|--------------|------------|
| Dashboard | ✅ | ✅ | ✅ |
| Guru & Staff | ✅ | ❌ | ❌ |
| Berita | ✅ | ✅ | ❌ |
| Galeri | ✅ | ✅ | ❌ |
| Kelola PPDB | ✅ | ❌ | ✅ |
| Gelombang PPDB | ✅ | ❌ | ✅ |

## 🔄 Re-create Admin Accounts

Jika perlu reset atau buat ulang ketiga admin:

```bash
npm run create-three-admins
```

Script ini akan:
- Update password jika admin sudah ada
- Create admin baru jika belum ada
- Set role sesuai dengan yang ditentukan

## ⚠️ Catatan Penting

1. **Ganti Password Default** - Segera ganti password setelah first login
2. **Minimal 1 Super Admin** - Jangan hapus semua super admin
3. **Role Changes** - Perubahan role memerlukan logout dan login ulang
4. **Jangan Share** - Jangan share credentials ke orang yang tidak berwenang
5. **Session Cookie** - Jangan share session cookie

## 🎯 Use Cases

### Scenario 1: Content Manager
Gunakan `adminberita` untuk staff yang hanya handle konten berita dan galeri foto/video.

### Scenario 2: Admission Officer
Gunakan `adminppdb` untuk staff yang handle pendaftaran siswa baru dan pengaturan gelombang PPDB.

### Scenario 3: School Administrator
Gunakan `superadmin` untuk kepala sekolah atau IT admin yang perlu akses penuh ke semua fitur.

## 📝 Testing Checklist

- [ ] Login dengan `superadmin` - bisa akses semua halaman
- [ ] Login dengan `adminberita` - hanya bisa akses Berita & Galeri
- [ ] Login dengan `adminppdb` - hanya bisa akses PPDB & Gelombang PPDB
- [ ] Coba akses URL langsung ke halaman yang tidak diizinkan - harus redirect
- [ ] Menu sidebar ter-filter sesuai role
- [ ] Bottom nav (mobile) ter-filter sesuai role
- [ ] Logout berfungsi untuk semua role

## 🔧 Troubleshooting

### Menu tidak ter-filter
- Clear browser cache dan cookies
- Logout dan login ulang
- Check console untuk error

### Tidak bisa akses halaman tertentu
- Pastikan role admin sudah benar di database
- Check apakah halaman tersebut memang diizinkan untuk role tersebut
- Coba logout dan login ulang

### Session expired terus
- Check system time
- Verify cookie settings
- Check maxAge di setSession (lib/auth.ts)

---

**⚠️ RAHASIA - Jangan share dokumen ini ke publik!**
