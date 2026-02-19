# URGENT: Deploy ke Server Production

## Masalah:
- Localhost: ✓ Login WORK
- Production: ✗ Error 503 (Service Unavailable)

## Penyebab:
Server production masih running code lama yang error. Perlu deploy code baru.

## Solusi: Upload & Deploy

### File yang HARUS di-upload ke server:

1. **app/api/auth/login/route.ts** (PENTING!)
2. **app/api/auth/me/route.ts**
3. **app/api/auth/logout/route.ts**
4. **app/admin/layout.tsx**
5. **next.config.ts**
6. **package.json**
7. **fix-all.sh**

### Cara Deploy (Pilih salah satu):

#### Opsi 1: Via SSH (Recommended)

```bash
# 1. Upload semua file di atas via FTP/FileZilla ke server

# 2. SSH ke server
ssh u900997367@sditannajm.sch.id

# 3. Masuk ke directory
cd /home/u900997367/domains/sditannajm.sch.id/public_html/.builds/source/repository

# 4. Jalankan fix-all
chmod +x fix-all.sh
./fix-all.sh
```

#### Opsi 2: Manual via SSH

```bash
# SSH ke server
ssh u900997367@sditannajm.sch.id
cd /home/u900997367/domains/sditannajm.sch.id/public_html/.builds/source/repository

# Stop app
pm2 stop sdit-annajm

# Clean build
rm -rf .next .turbo node_modules/.cache

# Rebuild
npm run build

# Restart
pm2 restart sdit-annajm
pm2 save

# Check logs
pm2 logs sdit-annajm --lines 50
```

#### Opsi 3: Via Hostinger File Manager + Terminal

1. Login ke Hostinger Panel
2. Buka File Manager
3. Upload file-file yang diubah ke folder yang benar
4. Buka Terminal di Hostinger
5. Jalankan command:

```bash
cd domains/sditannajm.sch.id/public_html/.builds/source/repository
pm2 stop sdit-annajm
rm -rf .next
npm run build
pm2 restart sdit-annajm
```

## Kenapa Error 503?

Error 503 (Service Unavailable) terjadi karena:
1. Aplikasi di server crash
2. PM2 process mati
3. Code lama masih running (belum di-deploy)
4. Build error di server

## Setelah Deploy:

Test login dengan:
- URL: https://sditannajm.sch.id/login
- Username: admin
- Password: admin123

Harusnya langsung bisa login dan redirect ke /admin

## Jika Masih Error:

Check logs di server:
```bash
pm2 logs sdit-annajm --lines 100
```

Atau jalankan diagnostic:
```bash
chmod +x diagnose.sh
./diagnose.sh
```
