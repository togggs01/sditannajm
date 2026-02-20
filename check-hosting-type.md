# 🔍 Diagnosa Masalah Hosting

## Kemungkinan Penyebab POST Error di Production:

### 1. **Hostinger Shared Hosting** (Tidak Support Node.js Dynamic)
Jika hosting kamu adalah **Shared Hosting**, maka:
- ❌ Tidak bisa jalankan Node.js server
- ❌ Tidak bisa pakai PM2
- ❌ API routes tidak berfungsi
- ✅ Hanya bisa static HTML/CSS/JS

**Solusi**: Upgrade ke **VPS** atau **Cloud Hosting**

### 2. **Hostinger VPS** (Support Node.js)
Jika hosting kamu adalah **VPS**, maka:
- ✅ Bisa jalankan Node.js server
- ✅ Bisa pakai PM2
- ✅ API routes berfungsi
- ⚠️ Perlu konfigurasi yang benar

**Solusi**: Perbaiki konfigurasi

## 🧪 Cara Cek Tipe Hosting

### Di Server, jalankan:
```bash
# Cek apakah bisa akses PM2
pm2 --version

# Cek Node.js
node --version

# Cek apakah ada akses root
sudo -v

# Cek port yang terbuka
netstat -tulpn | grep :3000
```

### Hasil:
- **Jika semua command berhasil** → VPS ✅
- **Jika ada error "command not found"** → Shared Hosting ❌

## 🚀 Solusi Berdasarkan Tipe Hosting

### A. Jika Shared Hosting (Tidak Support Node.js)

**Opsi 1: Upgrade ke VPS** (Recommended)
- Hostinger VPS mulai dari ~$4/bulan
- Full control, bisa install Node.js, PM2, dll

**Opsi 2: Pakai Hosting Lain yang Support Node.js**
- Vercel (Free, recommended untuk Next.js)
- Netlify (Free tier available)
- Railway (Free tier available)
- Render (Free tier available)

**Opsi 3: Deploy ke Vercel** (Paling Mudah & Gratis)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### B. Jika VPS (Support Node.js)

Masalahnya kemungkinan di konfigurasi. Cek:

1. **Port tidak terbuka**
```bash
# Buka port 3000
sudo ufw allow 3000
```

2. **PM2 tidak jalan dengan benar**
```bash
# Restart PM2
pm2 restart sdit-annajm

# Check logs
pm2 logs sdit-annajm --lines 100
```

3. **Nginx/Apache tidak dikonfigurasi**
```bash
# Perlu reverse proxy dari port 80/443 ke 3000
```

4. **Environment variables tidak terbaca**
```bash
# Check .env
cat .env

# Test manual
NODE_ENV=production npm start
```

## 🔧 Quick Fix untuk VPS

Jika kamu pakai VPS, jalankan ini:

```bash
# 1. Stop semua
pm2 stop all
pm2 delete all

# 2. Clean install
rm -rf node_modules .next
npm install

# 3. Generate Prisma
npx prisma generate

# 4. Build
npm run build

# 5. Start dengan port yang benar
PORT=3000 pm2 start npm --name "sdit-annajm" -- start

# 6. Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/sditannajm.sch.id
```

Nginx config:
```nginx
server {
    listen 80;
    server_name sditannajm.sch.id www.sditannajm.sch.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Cek Error di Production

### 1. Lihat PM2 Logs
```bash
pm2 logs sdit-annajm --lines 100
```

### 2. Test API Manual
```bash
# Test dari server
curl http://localhost:3000/api/guru

# Test POST
curl -X POST http://localhost:3000/api/guru \
  -H "Content-Type: application/json" \
  -d '{"nama":"Test","jabatan":"Guru"}'
```

### 3. Check Process
```bash
pm2 status
ps aux | grep node
netstat -tulpn | grep :3000
```

## 🎯 Kesimpulan

**Jika Shared Hosting:**
- ❌ Tidak bisa pakai Next.js dengan API routes
- ✅ Harus upgrade ke VPS atau pakai Vercel

**Jika VPS:**
- ✅ Bisa pakai Next.js dengan API routes
- ⚠️ Perlu konfigurasi Nginx/Apache reverse proxy
- ⚠️ Perlu buka port 3000 atau setup proxy

## 💡 Rekomendasi

**Untuk kemudahan dan gratis:**
→ Deploy ke **Vercel** (paling cocok untuk Next.js)

**Untuk full control:**
→ Upgrade ke **Hostinger VPS** atau **DigitalOcean**

**Untuk tetap di Hostinger Shared:**
→ Tidak bisa pakai dynamic features, hanya static export
