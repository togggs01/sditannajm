# 🚀 Setup Final - SDIT ANNAJM

## ✅ Konfigurasi yang Sudah Berfungsi

### Database Configuration
**Menggunakan Database Online (Hostinger) untuk Development & Production**

```
Host: srv1154.hstgr.io
Port: 3306
Database: u900997367_annajm
Username: u900997367_annajm
Password: Vu7tBK^|A92^
```

### Environment Files

#### 1. `.env` (Production - Hostinger)
```env
DATABASE_URL="mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
NODE_ENV=production
```

#### 2. `.env.local` (Development - Localhost)
```env
DATABASE_URL="mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV=development
```

#### 3. `.env.production` (Production Backup)
```env
DATABASE_URL="mysql://u900997367_annajm:Vu7tBK%5E%7CA92%5E@srv1154.hstgr.io:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
NODE_ENV=production
```

## 🔧 Perbaikan yang Sudah Dilakukan

### 1. POST /api/guru
✅ Validasi ukuran foto (max 5MB)
✅ Timeout protection (10 detik)
✅ Better error messages
✅ Handle duplicate NIP
✅ Detailed logging

### 2. Webpack Configuration
✅ Optimal code splitting
✅ Vendor chunks separation
✅ Commons chunks untuk shared code

### 3. Database Connection
✅ Menggunakan database online Hostinger
✅ Auto-connect on startup
✅ Better error logging

## 🚀 Cara Menjalankan

### Development (Localhost)
```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run development server
npm run dev

# Buka browser: http://localhost:3000
```

### Production Build
```bash
# Build aplikasi
npm run build

# Run production server
npm start

# Atau dengan PM2
pm2 start npm --name "sdit-annajm" -- start
```

## 📦 Deploy ke Hostinger

### Step 1: Upload Files
Upload ke `/home/u900997367/domains/sditannajm.sch.id/public_html`:
- ✅ Semua folder: `app/`, `lib/`, `prisma/`, `public/`
- ✅ Config files: `.env`, `next.config.ts`, `package.json`
- ❌ JANGAN upload: `node_modules/`, `.next/`, `.env.local`

### Step 2: Di Server
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Masuk ke directory
cd /home/u900997367/domains/sditannajm.sch.id/public_html

# Install dependencies
npm ci

# Generate Prisma Client
npx prisma generate

# Build
npm run build

# Restart PM2
pm2 restart sdit-annajm
```

### Step 3: Verifikasi
```bash
# Check status
pm2 status

# Check logs
pm2 logs sdit-annajm

# Test API
curl https://sditannajm.sch.id/api/guru
```

## 🧪 Testing

### Test GET API
```bash
curl http://localhost:3000/api/guru
```

### Test POST API
```bash
curl -X POST http://localhost:3000/api/guru \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test Guru",
    "nip": "123456789",
    "jabatan": "Guru Kelas",
    "email": "test@example.com",
    "telepon": "08123456789"
  }'
```

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check DATABASE_URL di .env.local
cat .env.local | grep DATABASE_URL

# Test connection
npx prisma db pull

# Regenerate Prisma Client
npx prisma generate
```

### POST /api/guru Error 500
```bash
# Check logs di browser console
# Atau check server logs
pm2 logs sdit-annajm | grep "POST /api/guru"
```

### Chunk Loading Error
```bash
# Clear cache
rm -rf .next

# Rebuild
npm run build

# Restart
npm run dev
```

## 📝 Important Notes

1. **Database**: Menggunakan database online Hostinger untuk development & production
2. **Environment**: `.env.local` untuk development, `.env` untuk production
3. **Build**: Selalu jalankan `npm run build` sebelum deploy
4. **Prisma**: Jalankan `npx prisma generate` setelah update schema atau clone project

## ✅ Checklist Sebelum Deploy

- [ ] Test di localhost: `npm run dev`
- [ ] Build berhasil: `npm run build`
- [ ] Test POST /api/guru di localhost
- [ ] Upload files ke server
- [ ] Install dependencies di server: `npm ci`
- [ ] Generate Prisma Client: `npx prisma generate`
- [ ] Build di server: `npm run build`
- [ ] Restart PM2: `pm2 restart sdit-annajm`
- [ ] Test API production: `curl https://sditannajm.sch.id/api/guru`

## 🎉 Status

✅ Development: **BERFUNGSI**
✅ Database: **ONLINE (Hostinger)**
✅ POST /api/guru: **FIXED**
✅ Webpack Chunks: **OPTIMIZED**
✅ Ready for Production: **YES**
