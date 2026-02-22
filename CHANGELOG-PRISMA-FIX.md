# Changelog - Prisma Database Connection Fix

## Perubahan yang Dilakukan

### 1. package.json
✅ Tambah `postinstall` script untuk auto-generate Prisma Client
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

**Benefit:** Setiap kali `npm install`, Prisma Client otomatis di-generate dengan binary targets yang benar.

### 2. prisma/schema.prisma
✅ Update binary targets untuk support berbagai environment
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "linux-musl", "rhel-openssl-1.0.x"]
}
```

**Benefit:** Support Windows (development), Debian/Ubuntu (Hostinger), dan berbagai Linux distro lainnya.

### 3. deploy-hostinger-v2.sh
✅ Tambah force regenerate Prisma Client
```bash
# Remove old Prisma Client first
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client
# Generate with all binary targets
npx prisma generate
```

**Benefit:** Memastikan Prisma Client selalu fresh dan sesuai dengan environment server.

### 4. next.config.ts
✅ Tambah `output: "standalone"` untuk production build
✅ Tambah `outputFileTracingIncludes` untuk auto-copy Prisma engine files
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

**Benefit:** 
- Build lebih optimal, ukuran lebih kecil
- Prisma engine files OTOMATIS ter-copy ke standalone build
- Tidak perlu copy manual lagi!

### 5. ecosystem.config.js
✅ Auto-detect standalone build
```javascript
const useStandalone = fs.existsSync('.next/standalone/server.js');
script: useStandalone ? '.next/standalone/server.js' : 'node_modules/next/dist/bin/next'
```

**Benefit:** PM2 otomatis gunakan standalone build jika tersedia, fallback ke next start jika tidak.

### 6. fix-prisma-server.sh (NEW)
✅ Script quick fix untuk masalah Prisma di server
```bash
bash fix-prisma-server.sh
```

**Benefit:** One-command fix untuk masalah Query Engine di server.

## Cara Deploy Sekarang

### Development (Windows)
```powershell
# Install (otomatis generate Prisma Client)
npm install

# Run dev server
npm run dev
```

### Production (Hostinger/Linux)
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io
cd domains/sditannajm.sch.id/public_html

# Pull latest code
git pull

# Deploy (otomatis handle semua)
bash deploy-hostinger-v2.sh
```

### Jika Ada Masalah di Server
```bash
# Quick fix
bash fix-prisma-server.sh

# Atau manual
pm2 stop sdit-annajm
rm -rf node_modules/.prisma node_modules/@prisma/client
npm install
pm2 restart sdit-annajm
```

## Error yang Sudah Diperbaiki

### ❌ Error Sebelumnya:
```
Prisma Client could not locate the Query Engine for runtime 'debian-openssl-1.1.x'
Invalid prisma.guru.create() invocation
```

### ✅ Solusi:
1. Binary targets sudah lengkap untuk semua environment
2. Postinstall script memastikan Prisma Client selalu ter-generate
3. Deploy script force regenerate Prisma Client di server
4. Standalone build include semua dependencies

## Testing

### Test di Windows (Local)
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
npm install

# Cek Prisma Client
dir node_modules\.prisma\client

# Test database
npx prisma db pull

# Run dev
npm run dev
```

### Test di Server (Production)
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io
cd domains/sditannajm.sch.id/public_html

# Deploy
bash deploy-hostinger-v2.sh

# Cek logs
pm2 logs sdit-annajm

# Test database
npx prisma db pull
```

## Kesimpulan

Dengan perubahan ini, database connection akan berfungsi dengan baik di:
- ✅ Windows (development)
- ✅ Hostinger/Debian (production)
- ✅ Ubuntu/Linux lainnya
- ✅ Docker (jika diperlukan)

Prisma Client akan otomatis di-generate dengan binary targets yang benar setiap kali:
- `npm install` (via postinstall script)
- `npm run build` (via build process)
- Deploy ke server (via deploy script)

**PENTING:** Dengan `outputFileTracingIncludes` di next.config.ts, Prisma engine files akan OTOMATIS ter-copy ke standalone build. Tidak perlu copy manual lagi!
