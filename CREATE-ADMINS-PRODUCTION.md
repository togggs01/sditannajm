# 🚀 Cara Membuat 3 Admin di Production (Hosting)

## Langkah-langkah:

### 1. SSH ke Server Hostinger
```bash
ssh u900997367@srv1154.hstgr.io
```

### 2. Masuk ke Folder Project
```bash
cd domains/sditannajm.sch.id/public_html
```

### 3. Jalankan Script Create Admins
```bash
npm run create-three-admins
```

Atau manual:
```bash
npx tsx scripts/create-three-admins.ts
```

### 4. Verifikasi di Database (Optional)
```bash
# Login ke MySQL
mysql -u u900997367_annajm -p u900997367_annajm

# Check admin yang sudah dibuat
SELECT username, role FROM Admin;

# Exit MySQL
exit
```

## 📝 Credentials yang Akan Dibuat:

### Admin 1: Super Admin
```
Username: superadmin
Password: superadmin123
Role: super_admin
Access: Semua halaman
```

### Admin 2: Admin Berita & Galeri
```
Username: adminberita
Password: berita123
Role: berita_galeri_admin
Access: Dashboard, Berita, Galeri
```

### Admin 3: Admin PPDB
```
Username: adminppdb
Password: ppdb123
Role: ppdb_admin
Access: Dashboard, PPDB, Gelombang PPDB
```

## ⚠️ Troubleshooting

### Jika Error "MODULE_NOT_FOUND"
```bash
npm install
```

### Jika Error Prisma
```bash
npx prisma generate
npx prisma db push
```

### Jika Script Tidak Jalan
Buat admin manual via MySQL:

```sql
-- Login ke MySQL
mysql -u u900997367_annajm -p u900997367_annajm

-- Buat Admin 2 (Berita & Galeri)
INSERT INTO Admin (id, username, password, role, createdAt, updatedAt) 
VALUES (
  'admin2_id',
  'adminberita',
  '$2a$10$YourHashedPasswordHere',
  'berita_galeri_admin',
  NOW(),
  NOW()
);

-- Buat Admin 3 (PPDB)
INSERT INTO Admin (id, username, password, role, createdAt, updatedAt) 
VALUES (
  'admin3_id',
  'adminppdb',
  '$2a$10$YourHashedPasswordHere',
  'ppdb_admin',
  NOW(),
  NOW()
);
```

**Note:** Untuk hash password, gunakan bcrypt online generator atau jalankan script.

## 🔍 Cek Admin yang Sudah Ada

Via MySQL:
```sql
SELECT id, username, role, createdAt FROM Admin;
```

Via Node.js (di server):
```bash
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.admin.findMany().then(console.log).finally(() => prisma.\$disconnect())"
```

## ✅ Testing

Setelah admin dibuat, test login di:
```
https://sditannajm.sch.id/login
```

Test dengan ketiga credentials di atas.

## 📞 Jika Masih Bermasalah

1. Check apakah database connection string benar di `.env.production`
2. Pastikan Prisma schema sudah di-push ke database
3. Restart aplikasi: `pm2 restart all` atau restart dari Hostinger panel
