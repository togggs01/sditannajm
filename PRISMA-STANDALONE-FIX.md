# Prisma Standalone Build - Final Fix

## Masalah
Error: **"Prisma Client could not locate the Query Engine"** di production standalone build.

Engine files (`libquery_engine-debian-openssl-1.1.x.so.node`) tidak ter-copy ke `.next/standalone/node_modules/.prisma/client/`

## Solusi Final

### 1. Update next.config.ts
Tambahkan `outputFileTracingIncludes` untuk auto-copy Prisma engine files:

```typescript
const nextConfig: NextConfig = {
  output: "standalone",
  
  // Include Prisma engine files in standalone build
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/.prisma/client/**/*',
      './node_modules/@prisma/client/**/*',
    ],
  },
  
  // ... other configs
}
```

### 2. Binary Targets di prisma/schema.prisma
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "linux-musl", "rhel-openssl-1.0.x"]
}
```

### 3. Postinstall Script di package.json
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

## Cara Kerja

### Development (Windows)
```powershell
npm install  # Auto-generate Prisma Client
npm run dev
```

### Build & Test Standalone (Windows)
```powershell
npm run build

# Verify Prisma files in standalone
dir .next\standalone\node_modules\.prisma\client

# Run standalone
node .next\standalone\server.js
```

### Production (Hostinger/Linux)
```bash
# Deploy
bash deploy-hostinger-v2.sh

# Prisma engine files akan OTOMATIS ter-copy ke:
# .next/standalone/node_modules/.prisma/client/
# .next/standalone/node_modules/@prisma/client/
```

## Verifikasi

### Cek Engine Files di Standalone
```bash
# Di server
ls -la .next/standalone/node_modules/.prisma/client/

# Harus ada file:
# - libquery_engine-debian-openssl-1.1.x.so.node
# - libquery_engine-debian-openssl-3.0.x.so.node
# - schema.prisma
# - index.js
# - dll
```

### Test Database Connection
```bash
# Di server
node -e "const { PrismaClient } = require('./.next/standalone/node_modules/@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => console.log('OK')).catch(e => console.error(e));"
```

## Troubleshooting

### Jika Engine Files Tidak Ter-copy Otomatis
```bash
# Copy manual dengan script
bash copy-prisma-to-standalone.sh

# Atau manual
mkdir -p .next/standalone/node_modules/.prisma
mkdir -p .next/standalone/node_modules/@prisma
cp -r node_modules/.prisma/client .next/standalone/node_modules/.prisma/
cp -r node_modules/@prisma/client .next/standalone/node_modules/@prisma/
```

### Jika Masih Error di Server
```bash
# Quick fix
bash fix-prisma-server.sh

# Atau rebuild
rm -rf .next node_modules/.cache
npm install
npm run build
pm2 restart sdit-annajm
```

## Keuntungan Solusi Ini

✅ **Otomatis:** Prisma engine files ter-copy otomatis saat build
✅ **Reliable:** Tidak perlu copy manual lagi
✅ **Portable:** Standalone build bisa di-copy ke server manapun
✅ **Optimal:** Ukuran build lebih kecil, hanya include yang diperlukan
✅ **Multi-platform:** Support Windows, Linux, Docker

## Kesimpulan

Dengan `outputFileTracingIncludes` di next.config.ts:
- Next.js akan otomatis trace dan include Prisma engine files
- Standalone build akan lengkap dengan semua dependencies
- Database connection akan berfungsi di production tanpa error

**Tidak perlu copy Prisma manual lagi!** 🎉
