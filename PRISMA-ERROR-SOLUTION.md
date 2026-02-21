# 🔧 Solusi Final - Prisma Engine Error

## Error:
```
Invalid `prisma.guru.create()` invocation:
Prisma Client could not locate the Query Engine for runtime "debian-openssl-1.1.x"
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

### 2. Update next.config.ts
- Tambah webpack config untuk include Prisma binaries
- Optimize chunks untuk production

### 3. Buat Script Deploy
- `FINAL-DEPLOY-HOSTINGER.sh` - Script deploy lengkap dengan verifikasi

## 🚀 Cara Deploy ke Hostinger (FINAL):

### Step 1: Upload Files
Upload semua files ke server via FTP/SFTP:
```
/home/u900997367/domains/sditannajm.sch.id/public_html
```

Files yang diupload:
- ✅ `app/` folder
- ✅ `lib/` folder
- ✅ `prisma/` folder
- ✅ `public/` folder
- ✅ `components/` folder
- ✅ `.env` (production config)
- ✅ `next.config.ts`
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `tsconfig.json`
- ✅ `FINAL-DEPLOY-HOSTINGER.sh`
- ❌ JANGAN: `node_modules/`, `.next/`, `.env.local`

### Step 2: SSH ke Server
```bash
ssh u900997367@srv1154.hstgr.io
cd /home/u900997367/domains/sditannajm.sch.id/public_html
```

### Step 3: Jalankan Deploy Script
```bash
# Buat executable
chmod +x FINAL-DEPLOY-HOSTINGER.sh

# Jalankan
./FINAL-DEPLOY-HOSTINGER.sh
```

Script akan otomatis:
1. ✅ Stop PM2
2. ✅ Clean old files
3. ✅ Install dependencies
4. ✅ Generate Prisma Client
5. ✅ Verify Prisma binaries
6. ✅ Test database connection
7. ✅ Build application
8. ✅ Start PM2

### Step 4: Verifikasi
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs sdit-annajm --lines 50

# Test API
curl https://sditannajm.sch.id/api/guru
```

## 🐛 Jika Masih Error:

### Opsi 1: Manual Deploy
```bash
# 1. Clean install
rm -rf node_modules .next
npm install

# 2. Generate Prisma
npx prisma generate

# 3. Verify binaries
ls -lh node_modules/.prisma/client/*.node

# 4. Test connection
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => console.log('OK')).catch(e => console.error(e));"

# 5. Build
npm run build

# 6. Start
pm2 restart sdit-annajm
```

### Opsi 2: Check OpenSSL Version
```bash
# Check OpenSSL version di server
openssl version

# Output contoh:
# OpenSSL 1.1.1f → gunakan debian-openssl-1.1.x ✅
# OpenSSL 3.0.2  → gunakan debian-openssl-3.0.x

# Jika OpenSSL 3.0.x, update schema.prisma:
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

### Opsi 3: Force Reinstall Prisma
```bash
npm uninstall @prisma/client prisma
npm install @prisma/client@latest prisma@latest
npx prisma generate
npm run build
pm2 restart sdit-annajm
```

### Opsi 4: Check Node.js Version
```bash
# Check Node version
node --version

# Harus >= 18.x
# Jika < 18, upgrade:
nvm install 18
nvm use 18
nvm alias default 18
```

## 📊 Monitoring

### Real-time Logs
```bash
pm2 logs sdit-annajm
```

### Filter Prisma Errors
```bash
pm2 logs sdit-annajm | grep "Prisma"
pm2 logs sdit-annajm | grep "Query Engine"
pm2 logs sdit-annajm | grep "POST /api/guru"
```

### Memory & CPU
```bash
pm2 monit
```

## ✅ Checklist

- [ ] Schema memiliki `binaryTargets = ["native", "debian-openssl-1.1.x"]`
- [ ] `npm install` berhasil
- [ ] `npx prisma generate` berhasil
- [ ] File `node_modules/.prisma/client/*.node` ada
- [ ] Database connection test berhasil
- [ ] `npm run build` berhasil
- [ ] PM2 process running
- [ ] Logs tidak ada error Prisma
- [ ] Test POST /api/guru berhasil

## 🎯 Expected Result

Setelah deploy berhasil:
1. ✅ Website bisa diakses: `https://sditannajm.sch.id`
2. ✅ Admin panel bisa diakses: `https://sditannajm.sch.id/login`
3. ✅ POST /api/guru berfungsi (tambah guru berhasil)
4. ✅ Tidak ada error Prisma di logs
5. ✅ Semua fitur admin berfungsi normal

## 💡 Tips

1. **Selalu generate Prisma setelah npm install**
2. **Verify binaries sebelum build**
3. **Test database connection sebelum start**
4. **Monitor logs setelah deploy**
5. **Backup database sebelum deploy**

## 🆘 Contact

Jika masih ada masalah setelah mengikuti semua langkah:
1. Screenshot error di browser console
2. Copy logs dari `pm2 logs sdit-annajm`
3. Check OpenSSL version di server
4. Contact developer dengan info lengkap

---

**Last Updated**: [Date]
**Status**: Ready for Production Deploy
