# Troubleshooting - Website Error

## Error: "An error occurred in the Server Components render"

### Langkah Perbaikan:

### 1. Cek Environment Variables
Pastikan file `.env` ada di server dengan isi yang benar:

```bash
# Di server, cek apakah .env ada
ls -la .env

# Lihat isi .env (tanpa password)
cat .env | grep -v PASSWORD
```

File `.env` harus berisi:
```env
DATABASE_URL="mysql://u900997367_annajm:PASSWORD_ANDA@localhost:3306/u900997367_annajm"
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
```

### 2. Test Database Connection
```bash
# Test koneksi MySQL
mysql -u u900997367_annajm -p u900997367_annajm

# Jika berhasil, cek tabel
SHOW TABLES;
```

### 3. Generate Prisma Client
```bash
cd /home/u900997367/public_html
npx prisma generate
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Rebuild Application
```bash
# Hapus build lama
rm -rf .next

# Build ulang
npm run build
```

### 6. Restart Application
```bash
# Jika pakai PM2
pm2 restart sdit-annajm

# Jika pakai Node.js App di cPanel
# Restart dari cPanel → Setup Node.js App → Restart
```

### 7. Cek Logs
```bash
# Lihat error logs
tail -f ~/.npm/_logs/*.log

# Atau jika pakai PM2
pm2 logs sdit-annajm
```

## Quick Fix Commands

Jalankan semua command ini di server:

```bash
cd /home/u900997367/public_html

# 1. Install dependencies
npm install

# 2. Generate Prisma
npx prisma generate

# 3. Push schema
npx prisma db push

# 4. Build
npm run build

# 5. Start
npm start
```

## Common Issues

### Issue 1: Database Connection Failed
**Error**: `Can't reach database server`

**Fix**:
- Cek MySQL service: `systemctl status mysql`
- Cek DATABASE_URL di .env
- Pastikan user MySQL punya akses

### Issue 2: Prisma Client Not Generated
**Error**: `Cannot find module '@prisma/client'`

**Fix**:
```bash
npx prisma generate
```

### Issue 3: Port Already in Use
**Error**: `Port 3000 is already in use`

**Fix**:
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm start
```

### Issue 4: Permission Denied
**Error**: `EACCES: permission denied`

**Fix**:
```bash
# Fix permissions
chmod -R 755 /home/u900997367/public_html
chown -R u900997367:u900997367 /home/u900997367/public_html
```

## Verifikasi Setelah Fix

1. **Cek website**: https://sditannajm.sch.id
2. **Cek API**: https://sditannajm.sch.id/api/stats
3. **Cek admin**: https://sditannajm.sch.id/admin

## Contact Support

Jika masih error, kirim informasi berikut:
1. Screenshot error
2. Output dari: `npm run build`
3. Output dari: `npx prisma db push`
4. Isi file .env (tanpa password)
