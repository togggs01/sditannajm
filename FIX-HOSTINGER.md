# Fix Error di Hostinger

## Error: chunks/1517-c83267b88939c471.js

### Penyebab:
- Prisma Client tidak ter-generate dengan benar
- Database connection error
- Environment variables tidak ter-load

### Solusi Cepat:

#### 1. Login ke SSH Hostinger
```bash
ssh u900997367@sditannajm.sch.id
```

#### 2. Masuk ke Directory
```bash
cd ~/public_html
```

#### 3. Cek Environment Variables
```bash
cat .env
```

Pastikan ada:
```env
DATABASE_URL="mysql://u900997367_annajm:PASSWORD@localhost:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
NODE_ENV=production
```

#### 4. Jalankan Fix Commands
```bash
# Stop aplikasi dulu
pm2 stop sdit-annajm

# Clean build
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Build production
npm run build

# Start aplikasi
pm2 start npm --name sdit-annajm -- start
# atau
npm start
```

#### 5. Cek Status
```bash
pm2 status
pm2 logs sdit-annajm
```

### Atau Gunakan Script Otomatis:

```bash
chmod +x build-production.sh
./build-production.sh
```

### Verifikasi:

1. Buka: https://sditannajm.sch.id
2. Cek console browser (F12) - tidak ada error
3. Test halaman admin: https://sditannajm.sch.id/admin

### Jika Masih Error:

#### Cek Logs Detail:
```bash
# Lihat error Next.js
cat .next/trace

# Lihat PM2 logs
pm2 logs sdit-annajm --lines 100

# Lihat system logs
journalctl -u nodejs -n 50
```

#### Test Database Connection:
```bash
mysql -u u900997367_annajm -p u900997367_annajm
```

Jika bisa login, database OK.

#### Test Prisma:
```bash
npx prisma db pull
```

Jika berhasil, koneksi Prisma OK.

### Common Issues:

**Issue 1: Permission Denied**
```bash
chmod -R 755 ~/public_html
```

**Issue 2: Port Already in Use**
```bash
lsof -ti:3000 | xargs kill -9
```

**Issue 3: Out of Memory**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

### Contact Support:

Jika masih error setelah semua langkah:
1. Screenshot error di browser
2. Output dari: `npm run build`
3. Output dari: `pm2 logs sdit-annajm`
4. Kirim ke developer
