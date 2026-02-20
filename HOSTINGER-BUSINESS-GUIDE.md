# 🚀 Panduan Deploy ke Hostinger Business

## ✅ Yang Sudah Diperbaiki

### 1. Error Handling di Frontend (app/admin/guru/page.tsx)
✅ Tambah try-catch di semua fetch
✅ Logging detail untuk debugging
✅ Alert user-friendly untuk error
✅ Validasi response status

### 2. Error Handling di Backend (app/api/guru/route.ts)
✅ Timeout protection (10 detik)
✅ Validasi ukuran foto (max 5MB)
✅ Better error messages
✅ Handle duplicate NIP
✅ Detailed console logging

### 3. Database Connection
✅ Menggunakan database online Hostinger
✅ Auto-connect on startup
✅ Connection error logging

## 🔍 Cara Cek Error di Production

### 1. Buka Browser Console (F12)
Saat POST error, lihat di Console tab:
```
POST /api/guru - Starting...
POST /api/guru - Body received: {...}
POST /api/guru - Creating guru in database...
POST /api/guru - Success: xxx
```

Atau jika error:
```
POST /api/guru - Error: {...}
Error: Failed to create
```

### 2. Check PM2 Logs di Server
```bash
# SSH ke server
ssh u900997367@srv1154.hstgr.io

# Lihat logs
pm2 logs sdit-annajm --lines 100

# Filter POST errors
pm2 logs sdit-annajm | grep "POST /api/guru"
```

### 3. Test API Manual
```bash
# Test GET
curl https://sditannajm.sch.id/api/guru

# Test POST
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

## 🐛 Kemungkinan Penyebab Error POST

### 1. Database Connection Timeout
**Gejala**: Error "Database timeout" atau "Connection timeout"

**Solusi**:
```bash
# Check DATABASE_URL
cat .env | grep DATABASE_URL

# Test connection
npx prisma db pull

# Regenerate Prisma Client
npx prisma generate
```

### 2. Foto Terlalu Besar
**Gejala**: Error "Foto terlalu besar" atau "Ukuran foto maksimal 5MB"

**Solusi**:
- Compress foto sebelum upload
- Maksimal ukuran: 5MB
- Format recommended: JPG/PNG

### 3. PM2 Process Mati
**Gejala**: Website tidak bisa diakses atau API tidak response

**Solusi**:
```bash
# Check status
pm2 status

# Restart
pm2 restart sdit-annajm

# Jika masih error, rebuild
cd /home/u900997367/domains/sditannajm.sch.id/public_html
npm run build
pm2 restart sdit-annajm
```

### 4. Node.js Memory Limit
**Gejala**: Error "JavaScript heap out of memory"

**Solusi**:
```bash
# Stop PM2
pm2 stop sdit-annajm

# Start dengan memory limit lebih besar
NODE_OPTIONS="--max-old-space-size=2048" pm2 start npm --name "sdit-annajm" -- start
pm2 save
```

### 5. Port Conflict
**Gejala**: Error "Port 3000 already in use"

**Solusi**:
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 pm2 start npm --name "sdit-annajm" -- start
```

## 📦 Deploy ke Hostinger Business

### Step 1: Upload Files
```bash
# Via FTP/SFTP, upload ke:
/home/u900997367/domains/sditannajm.sch.id/public_html

# Files yang diupload:
- app/
- lib/
- prisma/
- public/
- .env (production config)
- next.config.ts
- package.json
- package-lock.json
- tsconfig.json

# JANGAN upload:
- node_modules/
- .next/
- .env.local
```

### Step 2: SSH ke Server
```bash
ssh u900997367@srv1154.hstgr.io
cd /home/u900997367/domains/sditannajm.sch.id/public_html
```

### Step 3: Install & Build
```bash
# Install dependencies
npm ci

# Generate Prisma Client
npx prisma generate

# Build aplikasi
npm run build
```

### Step 4: Start dengan PM2
```bash
# Stop proses lama
pm2 stop sdit-annajm
pm2 delete sdit-annajm

# Start baru
pm2 start npm --name "sdit-annajm" -- start

# Save config
pm2 save

# Setup auto-start on reboot
pm2 startup
```

### Step 5: Setup Nginx (Jika Belum)
```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/sditannajm.sch.id
```

Config:
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/sditannajm.sch.id /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 6: Verifikasi
```bash
# Check PM2
pm2 status
pm2 logs sdit-annajm

# Check Nginx
sudo systemctl status nginx

# Test website
curl http://localhost:3000/api/guru
curl https://sditannajm.sch.id/api/guru
```

## 🧪 Testing Setelah Deploy

### 1. Test di Browser
1. Buka https://sditannajm.sch.id/admin/guru
2. Login dengan credentials admin
3. Klik "Tambah Guru"
4. Isi form dan submit
5. Buka Console (F12) untuk lihat logs
6. Jika error, screenshot dan kirim ke developer

### 2. Test dengan curl
```bash
# Test POST
curl -X POST https://sditannajm.sch.id/api/guru \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test Guru",
    "nip": "123456789",
    "jabatan": "Guru Kelas",
    "email": "test@example.com",
    "telepon": "08123456789"
  }' \
  -v
```

## 📊 Monitoring

### Real-time Logs
```bash
pm2 logs sdit-annajm
```

### Memory & CPU
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

## 🆘 Troubleshooting Checklist

- [ ] PM2 process running? → `pm2 status`
- [ ] Database connected? → Check logs
- [ ] Nginx running? → `sudo systemctl status nginx`
- [ ] Port 3000 open? → `netstat -tulpn | grep :3000`
- [ ] .env file exists? → `cat .env`
- [ ] Prisma Client generated? → `npx prisma generate`
- [ ] Build successful? → `npm run build`
- [ ] Logs show errors? → `pm2 logs sdit-annajm`

## ✅ Status Saat Ini

✅ Frontend error handling: **FIXED**
✅ Backend error handling: **FIXED**
✅ Database connection: **OK**
✅ Build production: **SUCCESS**
✅ Development server: **RUNNING**

## 🎯 Next Steps

1. **Test di localhost** dengan browser console terbuka
2. **Lihat error message** yang muncul di console
3. **Screenshot error** jika masih ada masalah
4. **Deploy ke production** jika localhost sudah OK
5. **Monitor PM2 logs** setelah deploy

## 📝 Notes

- Hostinger Business **support Node.js** dengan PM2
- Perlu setup **Nginx reverse proxy** untuk production
- Database menggunakan **MySQL online** (Hostinger)
- Logs bisa dilihat di **PM2** dan **Browser Console**
- Error handling sudah **lengkap** di frontend & backend
