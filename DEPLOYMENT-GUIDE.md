# Deployment Guide - SDIT ANNAJM RABBANI

## Development di Windows (Local)

### Setup Awal
```powershell
# Install dependencies (akan otomatis generate Prisma Client)
npm install

# Jika perlu generate manual
npx prisma generate

# Push database schema
npx prisma db push
```

**Note:** Script `postinstall` sudah ditambahkan di package.json, jadi Prisma Client akan otomatis di-generate setiap kali `npm install`.

### Jalankan Development Server
```powershell
npm run dev
```
Buka: http://localhost:3000

### Test Production Build di Windows
```powershell
# Build aplikasi
npm run build

# Jalankan production server
# Jika standalone build tersedia:
node .next\standalone\server.js

# Atau pakai next start:
npm start
```

## Production di Hostinger (Linux)

### Upload ke Server
```bash
# Via Git (recommended)
git add .
git commit -m "Update"
git push origin main

# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Masuk ke direktori
cd domains/sditannajm.sch.id/public_html

# Pull latest code
git pull origin main
```

### Deploy dengan Script
```bash
# Jalankan deployment script
bash deploy-hostinger-v2.sh
```

Script akan otomatis:
1. Stop aplikasi yang sedang running
2. Clean build dan cache
3. Install dependencies
4. Generate Prisma Client
5. Push database schema
6. Build aplikasi (dengan standalone mode)
7. Start dengan PM2

### Manual Deploy (Jika Script Gagal)
```bash
# Stop aplikasi
pm2 stop sdit-annajm
pm2 delete sdit-annajm

# Clean
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
npm install --production=false

# Generate Prisma Client
npx prisma generate

# Build
npm run build

# Copy files untuk standalone (jika ada)
if [ -d ".next/standalone" ]; then
    cp -r public .next/standalone/
    cp -r .next/static .next/standalone/.next/
fi

# Start dengan PM2
pm2 start ecosystem.config.js
pm2 save
```

## PM2 Commands (Di Server)

```bash
# Lihat status
pm2 status

# Lihat logs
pm2 logs sdit-annajm

# Restart aplikasi
pm2 restart sdit-annajm

# Stop aplikasi
pm2 stop sdit-annajm

# Monitor real-time
pm2 monit

# Lihat info detail
pm2 info sdit-annajm
```

## Troubleshooting

### Error: Prisma Client could not locate the Query Engine
Ini error paling umum saat deploy. Solusinya:

**Di Server (SSH):**
```bash
# Quick fix dengan script
bash fix-prisma-server.sh

# Atau manual:
pm2 stop sdit-annajm
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client
rm -rf .next/standalone/node_modules/.prisma
rm -rf .next/standalone/node_modules/@prisma
npm install
npx prisma generate

# Copy Prisma to standalone
bash copy-prisma-to-standalone.sh

pm2 restart sdit-annajm
```

**Pastikan binary targets sudah benar di `prisma/schema.prisma`:**
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "linux-musl", "rhel-openssl-1.0.x"]
}
```

### Error: Engine not found in standalone build
Jika error muncul setelah build standalone:
```bash
# Copy Prisma engine files ke standalone
bash copy-prisma-to-standalone.sh

# Atau manual
mkdir -p .next/standalone/node_modules/.prisma
mkdir -p .next/standalone/node_modules/@prisma
cp -r node_modules/.prisma/client .next/standalone/node_modules/.prisma/
cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/
```

### Error: Prisma Client not found
```bash
npx prisma generate
pm2 restart sdit-annajm
```

### Error: Database connection failed
```bash
# Cek .env file
cat .env

# Test koneksi
npx prisma db pull

# Restart
pm2 restart sdit-annajm
```

### Error: Port already in use
```bash
# Cari process yang pakai port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Atau restart PM2
pm2 restart sdit-annajm
```

### Build Error
```bash
# Clean semua
rm -rf .next node_modules/.cache

# Reinstall
npm install --production=false

# Build lagi
npm run build
```

## Environment Variables

### .env (Production)
```env
DATABASE_URL="mysql://user:pass@host:3306/database"
NODE_ENV=production
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
SESSION_SECRET="your-secret-key"
```

### .env.local (Development)
```env
DATABASE_URL="mysql://user:pass@host:3306/database"
NODE_ENV=development
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SESSION_SECRET="your-secret-key"
```

## URLs

- Website: https://sditannajm.sch.id
- Admin Panel: https://sditannajm.sch.id/admin
- PPDB: https://sditannajm.sch.id/ppdb

## Notes

- Standalone build (`output: "standalone"`) sudah aktif di `next.config.ts`
- PM2 akan otomatis detect standalone build dan gunakan `.next/standalone/server.js`
- Jika standalone tidak tersedia, akan fallback ke `next start`
- Database menggunakan MySQL di Hostinger
- Prisma Client harus di-generate setiap kali deploy
