# Admin Access - Hidden Login

## ⚠️ PENTING - RAHASIA ADMIN

Login page **TIDAK ADA** di menu public.
Hanya admin yang tau URL nya.

## 🔐 Cara Login:

### URL Login (Rahasia):
```
https://sditannajm.sch.id/login
```

### Credentials (Hardcoded):
```
Username: admin
Password: admin123
```

## 🚀 Cara Akses Admin Panel:

1. **Buka URL login langsung:**
   - https://sditannajm.sch.id/login
   - JANGAN share URL ini ke orang lain!

2. **Login dengan credentials:**
   - Username: `admin`
   - Password: `admin123`

3. **Setelah login, akan redirect ke:**
   - https://sditannajm.sch.id/admin

4. **Session berlaku 24 jam**
   - Setelah 24 jam, otomatis logout
   - Harus login ulang

## 🔒 Keamanan:

### Yang Sudah Dilakukan:
✅ Login page tidak ada link di website public
✅ Tidak ada button "Login" di navbar/footer
✅ URL login hanya diketahui admin
✅ Credentials hardcoded (tidak pakai database)
✅ Session httpOnly cookie (tidak bisa diakses JavaScript)
✅ Session 24 jam auto logout
✅ CSRF protection

### Tips Keamanan:
- Jangan share URL login ke orang lain
- Jangan save password di browser public
- Logout setelah selesai
- Gunakan incognito/private mode di komputer public
- Ganti password secara berkala (edit di code)

## 📝 Cara Ganti Password:

Edit file: `app/api/auth/login/route.ts`

```typescript
// Hardcoded credentials
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'  // ← Ganti ini
```

Lalu rebuild dan deploy.

## 🛠️ Troubleshooting:

### Tidak bisa login?
1. Pastikan URL benar: `/login` (lowercase)
2. Pastikan credentials benar (case-sensitive)
3. Clear cookies browser
4. Try incognito mode

### Session expired?
- Normal, session 24 jam
- Login ulang dengan credentials yang sama

### Lupa URL login?
- Cek file ini: ADMIN-ACCESS.md
- Atau langsung ke: https://sditannajm.sch.id/login

## 📱 Akses dari Mobile:

1. Buka browser (Chrome/Safari)
2. Ketik URL: https://sditannajm.sch.id/login
3. Login dengan credentials
4. Bookmark URL untuk akses cepat (private bookmark)

## 🔄 Multi-Device:

- Bisa login di laptop, HP, tablet bersamaan
- Masing-masing device punya session sendiri
- Session 24 jam per device

## ⚠️ JANGAN:

❌ Share URL login ke orang lain
❌ Share credentials ke orang lain
❌ Post screenshot login page
❌ Save password di browser public
❌ Lupa logout di komputer public

## ✅ LAKUKAN:

✓ Simpan URL login di tempat aman
✓ Gunakan password manager
✓ Logout setelah selesai
✓ Ganti password berkala
✓ Monitor activity admin panel

---

**File ini RAHASIA - Jangan commit ke public repository!**
