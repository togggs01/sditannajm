# 🔐 Admin Role-Based Access Control

Sistem admin panel sekarang memiliki 3 level akses berbeda dengan hak akses yang berbeda-beda.

## 👥 Admin Accounts

### 1. Super Admin (Full Access)
- **Username:** `superadmin`
- **Password:** `superadmin123`
- **Role:** `super_admin`
- **Akses:**
  - ✅ Dashboard
  - ✅ Guru & Staff
  - ✅ Berita
  - ✅ Galeri
  - ✅ Kelola PPDB
  - ✅ Gelombang PPDB

### 2. Admin Berita & Galeri
- **Username:** `adminberita`
- **Password:** `berita123`
- **Role:** `berita_galeri_admin`
- **Akses:**
  - ✅ Dashboard
  - ✅ Berita
  - ✅ Galeri
  - ❌ Guru & Staff
  - ❌ Kelola PPDB
  - ❌ Gelombang PPDB

### 3. Admin PPDB
- **Username:** `adminppdb`
- **Password:** `ppdb123`
- **Role:** `ppdb_admin`
- **Akses:**
  - ✅ Dashboard
  - ✅ Kelola PPDB
  - ✅ Gelombang PPDB
  - ❌ Guru & Staff
  - ❌ Berita
  - ❌ Galeri

## 🛡️ Security Features

### 1. Menu Filtering
- Sidebar dan bottom navigation otomatis menyembunyikan menu yang tidak bisa diakses
- Admin hanya melihat menu sesuai hak aksesnya

### 2. Route Protection
- Middleware otomatis redirect jika admin mencoba akses halaman yang tidak diizinkan
- Jika admin tidak punya akses, akan di-redirect ke dashboard

### 3. Session Management
- Session berlaku 24 jam
- Auto logout jika session expired
- Session checker berjalan di background

## 🔧 Technical Implementation

### Role Permissions Mapping
```typescript
const ROLE_PERMISSIONS = {
  'super_admin': ['dashboard', 'guru', 'berita', 'galeri', 'ppdb', 'gelombang-ppdb'],
  'berita_galeri_admin': ['dashboard', 'berita', 'galeri'],
  'ppdb_admin': ['dashboard', 'ppdb', 'gelombang-ppdb']
}
```

### Files Modified
1. `lib/auth.ts` - Added role permissions and helper functions
2. `components/AdminSidebar.tsx` - Added role-based menu filtering
3. `components/AdminBottomNav.tsx` - Added role-based nav filtering
4. `middleware.ts` - Added route protection based on role
5. `app/api/auth/me/route.ts` - New endpoint to get current user info

### Database Schema
```prisma
model Admin {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 📝 How to Create More Admins

### Using Script
```bash
npm run create-three-admins
```

### Manual via Database
```sql
INSERT INTO Admin (id, username, password, role) 
VALUES (
  'cuid_here',
  'username',
  'bcrypt_hashed_password',
  'super_admin' -- or 'berita_galeri_admin' or 'ppdb_admin'
);
```

## 🧪 Testing

1. Login dengan `superadmin` - Harus bisa akses semua halaman
2. Login dengan `adminberita` - Hanya bisa akses Berita & Galeri
3. Login dengan `adminppdb` - Hanya bisa akses PPDB & Gelombang PPDB
4. Coba akses URL langsung (misal `/admin/guru` dengan `adminberita`) - Harus redirect ke dashboard

## 🔄 Changing Admin Roles

Untuk mengubah role admin yang sudah ada:

```sql
UPDATE Admin 
SET role = 'super_admin' 
WHERE username = 'username_here';
```

Available roles:
- `super_admin`
- `berita_galeri_admin`
- `ppdb_admin`

## ⚠️ Important Notes

1. **Jangan hapus Super Admin** - Minimal harus ada 1 super admin untuk manage semua
2. **Password Security** - Ganti password default setelah first login
3. **Role Changes** - Perubahan role memerlukan logout dan login ulang
4. **Session** - Session disimpan di cookie, jangan share session cookie

## 🎯 Use Cases

### Scenario 1: Content Manager
Gunakan `berita_galeri_admin` untuk staff yang hanya handle konten berita dan galeri.

### Scenario 2: Admission Officer
Gunakan `ppdb_admin` untuk staff yang handle pendaftaran siswa baru.

### Scenario 3: School Administrator
Gunakan `super_admin` untuk kepala sekolah atau IT admin yang perlu akses penuh.
