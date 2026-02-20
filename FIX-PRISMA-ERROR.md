# 🔧 Fix Prisma Engine Error di Hostinger

## Error yang Terjadi:
```
Invalid `prisma.guru.create()` invocation:
Prisma Client could not locate the Query Engine for runtime "debian-openssl-1.1.x"

This is likely caused by a bundler that has not copied "libquery_engine-debian-openssl-1.1.x.so.node" next to the resulting bundle.
```

## ✅ Solusi yang Sudah Dilakukan:

### 1. Update prisma/schema.prisma
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.1.x"]
  previewFeatures = []
}
```

### 2. Tambah .npmrc
```
engine-strict=false
legacy-peer-deps=true
prisma-generate-skip-download=false
```

### 3. Update package.json
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && next build"
  }
}
```

## 🚀 Cara Deploy ke Hostinger (Step by Step):

### Step 1: Upload Files
Upload semua files ke server KECUALI:
- `node_modules/`
- `.next/`
- `.env.local`

### Step 2: SSH ke Server
```bash
ssh u900997367@srv1154.hstgr.io
cd /home/u900997367/domains/sditannajm.sch.id/public_html
```

### Step 3: Jalankan Fix Script
```bash
# Buat file executable
chmod +x fix-prisma-production.sh

# Jalankan fix script
./fix-prisma-production.sh
```

Atau manual:
```bash
# 1. Clean install
rm -rf node_modules
npm install

# 2. Generate Prisma dengan binary yang benar
npx prisma generate

# 3. Verify
ls -lh node_modules/.prisma/client/*.node

# 4. Test connection
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => console.log('OK')).catch(e => console.error(e));"
```

### Step 4: Build & Deploy
```bash
# Build aplikasi
npm run build

# Stop PM2
pm2 stop sdit-annajm
pm2 delete sdit-annajm

# Start dengan PM2
pm2 start npm --name "sdit-annajm" -- start

# Save PM2 config
pm2 save

# Setup auto-start
pm2 startup
```

### Step 5: Verifikasi
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs sdit-annajm --lines 50

# Test API
curl http://localhost:3000/api/guru
curl https://sditannajm.sch.id/api/guru
```

## 🐛 Jika Masih Error:

### Opsi 1: Reinstall Prisma
```bash
npm uninstall @prisma/client prisma
npm install @prisma/client@latest prisma@latest
npx prisma generate
npm run build
pm2 restart sdit-annajm
```

### Opsi 2: Check Binary Files
```bash
# Lihat binary yang tersedia
ls -lh node_modules/.prisma/client/

# Seharusnya ada file:
# - libquery_engine-debian-openssl-1.1.x.so.node
# - libquery_engine-windows.dll.node (untuk Windows)
```

### Opsi 3: Force Generate dengan Binary Specific
```bash
# Generate dengan binary target spesifik
PRISMA_CLI_BINARY_TARGETS=debian-openssl-1.1.x npx prisma generate

# Atau
npx prisma generate --generator client
```

### Opsi 4: Check Node.js Version
```bash
# Check Node version (harus >= 18)
node --version

# Jika < 18, upgrade:
nvm install 18
nvm use 18
```

### Opsi 5: Check OpenSSL Version di Server
```bash
# Check OpenSSL version
openssl version

# Output contoh:
# OpenSSL 1.1.1f  31 Mar 2020  → gunakan debian-openssl-1.1.x
# OpenSSL 3.0.2 15 Mar 2022    → gunakan debian-openssl-3.0.x
```

## 📊 Monitoring

### Real-time Logs
```bash
pm2 logs sdit-annajm
```

### Check Prisma Errors
```bash
pm2 logs sdit-annajm | grep "Prisma"
pm2 logs sdit-annajm | grep "Query Engine"
```

### Memory Usage
```bash
pm2 monit
```

## 🎯 Checklist Troubleshooting

- [ ] Prisma schema memiliki `binaryTargets = ["native", "debian-openssl-1.1.x"]`
- [ ] File `.npmrc` ada di root project
- [ ] `npm install` berhasil tanpa error
- [ ] `npx prisma generate` berhasil
- [ ] File `node_modules/.prisma/client/*.node` ada
- [ ] Database connection test berhasil
- [ ] `npm run build` berhasil
- [ ] PM2 process running
- [ ] Logs tidak ada error Prisma

## 💡 Tips

1. **Selalu generate Prisma setelah npm install**
   ```bash
   npm install && npx prisma generate
   ```

2. **Jangan commit node_modules**
   - Prisma binary akan di-generate ulang di server

3. **Check logs setelah deploy**
   ```bash
   pm2 logs sdit-annajm --lines 100
   ```

4. **Restart PM2 setelah perubahan**
   ```bash
   pm2 restart sdit-annajm
   ```

## 🆘 Jika Semua Gagal

### Alternatif 1: Deploy ke Vercel (Gratis & Mudah)
```bash
npm i -g vercel
vercel
vercel --prod
```

### Alternatif 2: Gunakan Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
```

### Alternatif 3: Contact Hostinger Support
Tanyakan:
- OpenSSL version di server
- Node.js version yang supported
- Apakah ada restriction untuk native binaries

## ✅ Status

- [x] Schema updated dengan binaryTargets
- [x] .npmrc created
- [x] postinstall script added
- [x] Fix script created
- [ ] Tested di production
- [ ] POST /api/guru working

## 📝 Notes

- Error ini umum terjadi di shared hosting
- Prisma perlu binary engine yang sesuai dengan OS server
- Hostinger Business menggunakan Debian dengan OpenSSL 1.1.x
- Binary akan di-download otomatis saat `npx prisma generate`
