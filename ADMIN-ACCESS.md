# 🔐 Akses Admin Panel

## Button Login Sudah Di-Hide

Button "Login" sudah dihilangkan dari navbar public untuk keamanan.
Hanya yang tau URL login yang bisa akses admin panel.

## 🔑 Cara Akses Admin Panel

### 1. Akses Langsung ke URL Login
```
https://sditannajm.sch.id/login
```

### 2. Login dengan Credentials
```
Username: admin
Password: [password admin]
```

### 3. Setelah Login
- Button "Dashboard" akan muncul di navbar
- Button "Logout" akan muncul di navbar
- Bisa akses semua fitur admin

## 📱 Akses di Mobile

### Desktop/Laptop:
```
https://sditannajm.sch.id/login
```

### Mobile:
```
https://sditannajm.sch.id/login
```

## 🛡️ Keamanan

### Yang Sudah Dilakukan:
✅ Button Login di-hide dari navbar public
✅ Hanya yang tau URL `/login` yang bisa akses
✅ Session-based authentication
✅ Auto-logout setelah 24 jam
✅ Protected routes dengan middleware

### Tips Keamanan:
1. **Jangan share URL login** ke sembarang orang
2. **Gunakan password yang kuat** (min 8 karakter, kombinasi huruf, angka, simbol)
3. **Logout setelah selesai** menggunakan admin panel
4. **Jangan login di komputer umum** atau warnet
5. **Gunakan HTTPS** (sudah otomatis di production)

## 🔄 Jika Lupa Password

### Cara Reset Password:

#### Opsi 1: Via Database (Recommended)
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Masuk ke MySQL
mysql -u u900997367_annajm -p u900997367_annajm

# Update password (contoh: password123)
UPDATE Admin SET password = '$2a$10$...' WHERE username = 'admin';
```

#### Opsi 2: Via Prisma Studio
```bash
# Di local development
npx prisma studio

# Edit password di tabel Admin
```

#### Opsi 3: Via Script
Buat file `reset-password.js`:
```javascript
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetPassword() {
  const newPassword = 'password_baru_123';
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  await prisma.admin.update({
    where: { username: 'admin' },
    data: { password: hashedPassword }
  });
  
  console.log('Password berhasil direset!');
  console.log('Username: admin');
  console.log('Password:', newPassword);
}

resetPassword();
```

Jalankan:
```bash
node reset-password.js
```

## 📋 Checklist Setelah Deploy

- [ ] Test akses `https://sditannajm.sch.id/login`
- [ ] Button Login tidak muncul di navbar public
- [ ] Bisa login dengan credentials admin
- [ ] Setelah login, button Dashboard & Logout muncul
- [ ] Bisa akses semua fitur admin
- [ ] Logout berfungsi dengan baik

## 🎯 URL Penting

### Public URLs:
- Homepage: `https://sditannajm.sch.id`
- PPDB: `https://sditannajm.sch.id/ppdb`
- Tentang: `https://sditannajm.sch.id/tentang`
- Guru: `https://sditannajm.sch.id/guru`
- Galeri: `https://sditannajm.sch.id/galeri`
- Berita: `https://sditannajm.sch.id/berita`
- Kontak: `https://sditannajm.sch.id/kontak`

### Admin URLs (Hidden):
- Login: `https://sditannajm.sch.id/login` ⚠️ RAHASIA
- Dashboard: `https://sditannajm.sch.id/admin`
- Kelola Guru: `https://sditannajm.sch.id/admin/guru`
- Kelola Berita: `https://sditannajm.sch.id/admin/berita`
- Kelola Galeri: `https://sditannajm.sch.id/admin/galeri`
- Kelola PPDB: `https://sditannajm.sch.id/admin/ppdb`
- Gelombang PPDB: `https://sditannajm.sch.id/admin/gelombang-ppdb`

## 💡 Tips

1. **Bookmark URL Login** di browser untuk akses cepat
2. **Simpan credentials** di password manager (LastPass, 1Password, dll)
3. **Jangan screenshot** halaman login dengan password terlihat
4. **Gunakan incognito mode** jika login di komputer orang lain
5. **Selalu logout** setelah selesai

## 🚨 Jika Ada Masalah

### Login Tidak Bisa:
1. Check credentials (username & password)
2. Clear browser cache & cookies
3. Coba browser lain (Chrome, Firefox, Edge)
4. Coba incognito mode
5. Contact developer

### Session Expired:
- Login ulang di `/login`
- Session berlaku 24 jam

### Lupa Password:
- Contact developer untuk reset password
- Atau gunakan cara reset password di atas

## 📞 Contact Developer

Jika ada masalah atau butuh bantuan:
- Email: [email developer]
- WhatsApp: [nomor developer]
- Telegram: [username developer]

---

**PENTING**: Jangan share dokumen ini ke publik!
Simpan di tempat yang aman dan hanya untuk admin sekolah.
