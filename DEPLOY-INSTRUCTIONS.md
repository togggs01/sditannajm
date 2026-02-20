# 🚀 Panduan Deploy ke Production (Hostinger)

## Yang Sudah Diperbaiki:
1. ✅ Error handling POST /api/guru lebih baik
2. ✅ Validasi ukuran foto (max 5MB)
3. ✅ Timeout protection untuk database query
4. ✅ Better error messages
5. ✅ Prisma connection dengan explicit datasource
6. ✅ Disable code splitting untuk menghindari chunk error

## Langkah Deploy:

### 1. Upload Files ke Hostinger
```bash
# Upload semua file kecuali:
# - node_modules/
# - .next/
# - .env (gunakan .env.production)
```

### 2. Di Server Hostinger, jalankan:
```bash
# Masuk ke directory project
cd /home/u900997367/domains/sditannajm.sch.id/public_html

# Copy .env.production ke .env
cp .env.production .env

# Install dependencies
npm ci --production=false

# Generate Prisma Client
NODE_ENV=production npx prisma generate

# Build aplikasi
NODE_ENV=production npm run build

# Stop proses lama (jika ada)
pm2 stop sdit-annajm

# Start aplikasi
pm2 start npm --name "sdit-annajm" -- start

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup
```

### 3. Verifikasi:
```bash
# Check status
pm2 status

# Check logs
pm2 logs sdit-annajm --lines 50

# Test API
curl -X GET https://sditannajm.sch.id/api/guru
```

### 4. Jika Ada Error:
```bash
# Restart aplikasi
pm2 restart sdit-annajm

# Clear PM2 logs
pm2 flush

# Check database connection
node -e "require('./lib/prisma').prisma.\$connect().then(() => console.log('OK')).catch(e => console.error(e))"
```

## Troubleshooting POST /api/guru Error 500:

### Kemungkinan Penyebab:
1. **Database connection timeout** → Sudah ditambahkan timeout protection
2. **Foto terlalu besar** → Sudah ditambahkan validasi max 5MB
3. **Prisma Client tidak ter-generate** → Jalankan `npx prisma generate`
4. **Environment variables tidak terbaca** → Pastikan `.env` ada di root project

### Check Logs di Production:
```bash
pm2 logs sdit-annajm --lines 100 | grep "POST /api/guru"
```

### Manual Test POST API:
```bash
curl -X POST https://sditannajm.sch.id/api/guru \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test Guru",
    "nip": "123456789",
    "jabatan": "Guru Kelas",
    "email": "test@example.com",
    "telepon": "08123456789"
  }'
```

## File Penting untuk Production:
- ✅ `.env.production` → Config production
- ✅ `app/api/guru/route.ts` → API dengan error handling
- ✅ `lib/prisma.ts` → Prisma client dengan explicit datasource
- ✅ `next.config.ts` → Config dengan splitChunks: false
- ✅ `deploy-production.sh` → Script deploy otomatis

## Monitoring:
```bash
# Real-time logs
pm2 logs sdit-annajm

# Memory usage
pm2 monit

# Restart if needed
pm2 restart sdit-annajm
```
