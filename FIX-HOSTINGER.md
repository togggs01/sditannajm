# Fix Error di Hostinger - SDIT ANNAJM RABBANI

## Error yang Sering Muncul:

### 1. Error 401 (Unauthorized)
- Session/cookie tidak ter-set dengan benar
- Authentication middleware issue

### 2. Error 500 (Internal Server Error)
- Prisma Client tidak ter-generate
- Database connection failed
- Environment variables tidak ter-load

### 3. Error: chunks/main-app-*.js
- Build tidak complete
- Missing dependencies

---

## SOLUSI CEPAT - Jalankan Script Otomatis

### 1. Login ke SSH Hostinger
```bash
ssh u900997367@sditannajm.sch.id
```

### 2. Masuk ke Directory
```bash
cd ~/public_html
```

### 3. Jalankan Script Deploy
```bash
chmod +x deploy-hostinger.sh
./deploy-hostinger.sh
```

Script ini akan otomatis:
- Stop aplikasi yang running
- Clean build lama
- Install dependencies
- Generate Prisma Client
- Test database connection
- Build production
- Start dengan PM2

---

## SOLUSI MANUAL (Jika Script Gagal)

### 1. Cek Environment Variables
```bash
cat .env
```

Pastikan ada dan benar:
```env
DATABASE_URL="mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
NODE_ENV=production
```

### 2. Stop Aplikasi
```bash
pm2 stop sdit-annajm
# atau
pkill -f "next start"
```

### 3. Clean Build
```bash
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.prisma
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Generate Prisma Client
```bash
npx prisma generate
```

Jika error, cek:
```bash
# Test database connection
mysql -u u900997367_annajm -p u900997367_annajm
```

### 6. Push Database Schema
```bash
npx prisma db push --accept-data-loss
```

### 7. Build Production
```bash
npm run build
```

Jika error memory:
```bash
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

### 8. Start Aplikasi
```bash
pm2 start npm --name sdit-annajm -- start
pm2 save
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


---

## Verifikasi Deployment

### 1. Cek Status PM2
```bash
pm2 status
pm2 logs sdit-annajm --lines 50
```

### 2. Cek Health Check
```bash
chmod +x check-deployment.sh
./check-deployment.sh
```

### 3. Test API Endpoints
```bash
# Test stats API
curl http://localhost:3000/api/stats

# Test gelombang PPDB
curl http://localhost:3000/api/gelombang-ppdb?checkStatus=true
```

### 4. Test di Browser
- Homepage: https://sditannajm.sch.id
- Admin: https://sditannajm.sch.id/admin
- Login: https://sditannajm.sch.id/login

Buka Console (F12) dan pastikan tidak ada error merah.

---

## Troubleshooting Error Spesifik

### Error: "Failed to load resource: 401"
**Penyebab**: Session/authentication issue

**Fix**:
1. Clear browser cookies
2. Restart aplikasi: `pm2 restart sdit-annajm`
3. Cek auth middleware di lib/auth.ts

### Error: "Failed to load resource: 500"
**Penyebab**: Database connection atau Prisma Client issue

**Fix**:
```bash
# Test database
mysql -u u900997367_annajm -p u900997367_annajm

# Regenerate Prisma
npx prisma generate

# Restart
pm2 restart sdit-annajm
```

### Error: "TypeError: Cannot read properties"
**Penyebab**: Data null/undefined dari database

**Fix**:
1. Cek database ada data atau tidak
2. Tambahkan null checks di code
3. Seed database jika kosong

### Error: "ECONNREFUSED"
**Penyebab**: Database server tidak running atau salah host

**Fix**:
```bash
# Cek MySQL running
systemctl status mysql

# Atau di Hostinger
service mysql status

# Cek DATABASE_URL di .env
# Pastikan host: srv1154.hstgr.io atau localhost
```

---

## Monitoring & Logs

### View Real-time Logs
```bash
pm2 logs sdit-annajm --lines 100
```

### View Error Logs Only
```bash
pm2 logs sdit-annajm --err --lines 50
```

### Monitor Resources
```bash
pm2 monit
```

### Restart on Error
```bash
pm2 restart sdit-annajm --watch
```

---

## Quick Commands Reference

```bash
# Deploy ulang dari awal
./deploy-hostinger.sh

# Cek status deployment
./check-deployment.sh

# Restart cepat
pm2 restart sdit-annajm

# View logs
pm2 logs sdit-annajm

# Stop aplikasi
pm2 stop sdit-annajm

# Delete PM2 process
pm2 delete sdit-annajm
```

---

## Contact Developer

Jika masih error setelah semua langkah, kirim:
1. Screenshot error di browser console
2. Output dari: `pm2 logs sdit-annajm --lines 100`
3. Output dari: `./check-deployment.sh`
4. Output dari: `cat .env` (hide password)
