# Solusi Error Tidak Bisa Membuat Guru Baru

## Masalah
Error saat membuat guru baru di admin panel dengan pesan:
```
Failed to create
prisma.guru.create() invocation
Error response: "Failed to create"
```

## Penyebab
1. Prisma Client belum di-generate dengan benar
2. Binary targets tidak sesuai dengan environment production
3. Query Engine tidak ditemukan

## Solusi yang Diterapkan

### 1. Update Prisma Schema
Menambahkan `binaryTargets` di `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

### 2. Improve Error Handling
Menambahkan error handling yang lebih baik di `app/api/guru/route.ts`:
- Test koneksi database sebelum create
- Deteksi error Query Engine
- Pesan error yang lebih informatif

### 3. Update Prisma Client Configuration
Menambahkan graceful shutdown di `lib/prisma.ts`

### 4. Generate Prisma Client
Jalankan command:
```bash
npx prisma generate
```

## Cara Menggunakan

### Development
```bash
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
1. Buka halaman admin guru: https://sditannajm.sch.id/admin/guru
2. Klik "Tambah Guru"
3. Isi form dengan data:
   - Nama: Test Guru
   - Jabatan: Guru Kelas
   - (field lain opsional)
4. Klik "Simpan Data"
5. Data harus tersimpan tanpa error

## Troubleshooting

### Jika masih error "Query Engine not found"
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules
npm install

# Generate ulang Prisma Client
npx prisma generate

# Restart server
```

### Jika error "Database connection failed"
1. Cek file `.env` pastikan `DATABASE_URL` benar
2. Test koneksi database:
```bash
npx prisma db pull
```

### Jika error di production (Hostinger)
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Masuk ke direktori aplikasi
cd domains/sditannajm.sch.id/public_html

# Generate Prisma Client
npx prisma generate

# Restart PM2
pm2 restart ecosystem.config.js
```

## Catatan
- Setiap kali update schema Prisma, harus jalankan `npx prisma generate`
- Binary targets disesuaikan dengan server production (Debian)
- Error handling sudah ditambahkan untuk memberikan pesan yang lebih jelas
