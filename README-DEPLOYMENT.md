# 🚀 Panduan Deployment SDIT ANNAJM

## 📁 Struktur Environment Files

### Development (Local)
- **File**: `.env.local`
- **Database**: `mysql://root:@localhost:3306/annajm`
- **URL**: `http://localhost:3000`
- **NODE_ENV**: `development`

### Production (Hostinger)
- **File**: `.env` dan `.env.production`
- **Database**: `mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm`
- **URL**: `https://sditannajm.sch.id`
- **NODE_ENV**: `production`

## 🔧 Perbaikan yang Sudah Dilakukan

### 1. POST /api/guru Error Handling
✅ Validasi ukuran foto (max 5MB)
✅ Timeout protection (10 detik)
✅ Better error messages
✅ Handle duplicate NIP
✅ Detailed logging

### 2. Webpack Configuration
✅ Optimal code splitting untuk production
✅ Vendor chunks separation
✅ Commons chunks untuk shared code
✅ Proper alias resolution

### 3. Environment Management
✅ `.env` → Production config
✅ `.env.local` → Development config (git ignored)
✅ `.env.production` → Production backup
✅ Proper NODE_ENV handling

## 🚀 Cara Deploy ke Production

### Step 1: Persiapan
```bash
# Pastikan semua perubahan sudah di-commit
git status

# Build production
npm run build
```

### Step 2: Upload ke Hostinger
Upload files berikut ke `/home/u900997367/domains/sditannajm.sch.id/public_html`:
- ✅ `app/` folder
- ✅ `lib/` folder
- ✅ `prisma/` folder
- ✅ `public/` folder
- ✅ `.env` (production config)
- ✅ `.env.production`
- ✅ `next.config.ts`
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `tsconfig.json`
- ❌ JANGAN upload: `node_modules/`, `.next/`, `.env.local`

### Step 3: Di Server Hostinger
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Masuk ke directory
cd /home/u900997367/domains/sditannajm.sch.id/public_html

# Install dependencies
npm ci --production=false

# Generate Prisma Client
npx prisma generate

# Build aplikasi
npm run build

# Restart PM2
pm2 restart sdit-annajm

# Atau jika belum ada, start baru
pm2 start npm --name "sdit-annajm" -- start
pm2 save
```

### Step 4: Verifikasi
```bash
# Check status
pm2 status

# Check logs
pm2 logs sdit-annajm --lines 50

# Test API
curl https://sditannajm.sch.id/api/guru
```

## 🧪 Testing POST /api/guru

### Test dengan curl:
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

### Expected Response (Success):
```json
{
  "id": "...",
  "nama": "Test Guru",
  "nip": "123456789",
  "jabatan": "Guru Kelas",
  "foto": null,
  "email": "test@example.com",
  "telepon": "08123456789",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Expected Response (Error - Foto terlalu besar):
```json
{
  "error": "Foto terlalu besar",
  "message": "Ukuran foto maksimal 5MB"
}
```

## 🐛 Troubleshooting

### Error: Database connection failed
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
node -e "require('./lib/prisma').prisma.\$connect().then(() => console.log('OK')).catch(e => console.error(e))"

# Regenerate Prisma Client
npx prisma generate
```

### Error: POST /api/guru 500
```bash
# Check logs
pm2 logs sdit-annajm | grep "POST /api/guru"

# Check memory
pm2 monit

# Restart
pm2 restart sdit-annajm
```

### Error: Chunk loading failed
```bash
# Clear .next folder
rm -rf .next

# Rebuild
npm run build

# Restart
pm2 restart sdit-annajm
```

## 📊 Monitoring

### Real-time Logs
```bash
pm2 logs sdit-annajm
```

### Memory & CPU Usage
```bash
pm2 monit
```

### Restart if Needed
```bash
pm2 restart sdit-annajm
```

### Auto-restart on Crash
```bash
pm2 startup
pm2 save
```

## 🔐 Security Checklist

- ✅ `.env.local` ada di `.gitignore`
- ✅ `SESSION_SECRET` menggunakan string yang kuat
- ✅ Database password di-encode dengan benar
- ✅ `poweredByHeader: false` di next.config
- ✅ HTTPS enabled di production

## 📝 Notes

1. **Development**: Gunakan `npm run dev` dengan `.env.local`
2. **Production**: Gunakan `npm start` dengan `.env`
3. **Build**: Selalu jalankan `npm run build` sebelum deploy
4. **Prisma**: Jalankan `npx prisma generate` setelah update schema
5. **PM2**: Gunakan PM2 untuk process management di production

## 🆘 Support

Jika ada masalah:
1. Check PM2 logs: `pm2 logs sdit-annajm`
2. Check database connection
3. Verify environment variables
4. Rebuild aplikasi
5. Restart PM2 process
