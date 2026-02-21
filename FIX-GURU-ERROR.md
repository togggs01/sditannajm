# Solusi Error Tidak Bisa Membuat Guru Baru

## Masalah
Error saat membuat guru baru di admin panel dengan pesan:
```
Failed to create
Database connection failed
Tidak dapat terhubung ke database
```

## Penyebab Utama
1. **Schema Prisma tidak sinkron dengan database** - Field `id` tidak memiliki `@default(cuid())` sehingga Prisma tidak bisa auto-generate ID
2. Prisma Client belum di-generate dengan benar
3. Binary targets tidak sesuai dengan environment production
4. Connection pooling tidak optimal

## Solusi yang Diterapkan

### 1. Fix Prisma Schema
Menambahkan `@default(cuid())` dan `@updatedAt` di semua model:
```prisma
model Guru {
  id        String   @id @default(cuid())  // ← Ditambahkan @default(cuid())
  nama      String   @db.VarChar(255)
  nip       String?  @unique @db.VarChar(100)
  jabatan   String   @db.VarChar(255)
  foto      String?  @db.LongText
  email     String?  @db.VarChar(255)
  telepon   String?  @db.VarChar(50)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt  // ← Ditambahkan @updatedAt

  @@index([nip])
}
```

### 2. Update Binary Targets
Menambahkan `binaryTargets` di `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

### 3. Optimize Database Connection
Update DATABASE_URL dengan connection pooling:
```env
DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=5&pool_timeout=20&connect_timeout=10"
```

### 4. Improve Error Handling
Menambahkan retry logic dan error handling yang lebih baik di:
- `lib/prisma.ts` - Retry connection dengan 3 attempts
- `app/api/guru/route.ts` - Test koneksi sebelum create, retry logic, pesan error yang informatif

### 5. Push Schema & Generate Client
```bash
npx prisma db push --accept-data-loss
npx prisma generate
```

## Cara Menggunakan

### Development
```bash
# Generate Prisma Client
npx prisma generate

# Start dev server
npm run dev
```

### Production
```bash
# Generate Prisma Client
npx prisma generate

# Build aplikasi
npm run build

# Start production server
npm start
```

## Testing
1. Buka halaman admin guru: http://localhost:3000/admin/guru
2. Klik "Tambah Guru"
3. Isi form dengan data:
   - Nama: Test Guru
   - Jabatan: Guru Kelas
   - (field lain opsional)
4. Klik "Simpan Data"
5. Data harus tersimpan tanpa error

## Troubleshooting

### Jika masih error "Argument id is missing"
```bash
# Pastikan schema sudah benar
npx prisma db push --accept-data-loss

# Generate ulang Prisma Client
npx prisma generate
```

### Jika error "Database connection failed"
1. Cek file `.env` pastikan `DATABASE_URL` benar
2. Test koneksi database:
```bash
npx prisma db pull
```
3. Pastikan koneksi internet stabil
4. Cek apakah database server aktif

### Jika error di production (Hostinger)
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Masuk ke direktori aplikasi
cd domains/sditannajm.sch.id/public_html

# Push schema ke database
npx prisma db push --accept-data-loss

# Generate Prisma Client
npx prisma generate

# Restart PM2
pm2 restart ecosystem.config.js
```

## Catatan Penting
- ✅ Setiap kali update schema Prisma, harus jalankan `npx prisma db push` dan `npx prisma generate`
- ✅ Binary targets disesuaikan dengan server production (Debian)
- ✅ Connection pooling sudah dioptimalkan untuk menghindari timeout
- ✅ Error handling sudah ditambahkan dengan retry logic
- ✅ Semua model sudah memiliki `@default(cuid())` untuk auto-generate ID
- ✅ Field `updatedAt` sudah menggunakan `@updatedAt` untuk auto-update timestamp
