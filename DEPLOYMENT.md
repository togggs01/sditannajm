# Deployment Guide - SDIT ANNAJM RABBANI

## Cara Deploy ke Hostinger

### Opsi 1: Full Deployment (Recommended untuk first time atau major issues)

```bash
# SSH ke server
ssh u900997367@sditannajm.sch.id

# Masuk ke directory project
cd /home/u900997367/domains/sditannajm.sch.id/public_html/.builds/source/repository

# Upload file terbaru (via FTP/Git)
# Pastikan file berikut sudah terupload:
# - package.json (updated)
# - deploy-hostinger-v2.sh (new)
# - next.config.ts (updated)

# Jalankan deployment
chmod +x deploy-hostinger-v2.sh
./deploy-hostinger-v2.sh
```

### Opsi 2: Quick Fix (Untuk error Tailwind saja)

```bash
# SSH ke server
ssh u900997367@sditannajm.sch.id

# Masuk ke directory project
cd /home/u900997367/domains/sditannajm.sch.id/public_html/.builds/source/repository

# Upload quick-fix.sh
# Jalankan quick fix
chmod +x quick-fix.sh
./quick-fix.sh
```

### Opsi 3: Manual Fix

```bash
# SSH ke server
ssh u900997367@sditannajm.sch.id
cd /home/u900997367/domains/sditannajm.sch.id/public_html/.builds/source/repository

# Stop app
pm2 stop sdit-annajm

# Install Tailwind packages
npm install @tailwindcss/postcss tailwindcss --save

# Clean and rebuild
rm -rf .next
npm run build

# Restart
pm2 restart sdit-annajm
pm2 save
```

## Troubleshooting

### Error: Cannot find module '@tailwindcss/postcss'

**Penyebab:** Package Tailwind tidak terinstall di production

**Solusi:**
1. Pastikan `@tailwindcss/postcss` dan `tailwindcss` ada di `dependencies` (bukan devDependencies)
2. Jalankan `npm install --production=false` untuk install semua packages
3. Atau gunakan quick-fix.sh script

### Error: Module not found '@/components/...' atau '@/lib/...'

**Penyebab:** Cache webpack yang corrupt

**Solusi:**
```bash
rm -rf .next
npm run build
pm2 restart sdit-annajm
```

### Error 404 di API routes

**Penyebab:** Build tidak complete atau PM2 tidak restart dengan benar

**Solusi:**
```bash
pm2 delete sdit-annajm
npm run build
pm2 start npm --name sdit-annajm -- start
pm2 save
```

## Monitoring

```bash
# Lihat status
pm2 status

# Lihat logs
pm2 logs sdit-annajm

# Lihat logs realtime
pm2 logs sdit-annajm --lines 100

# Monitor resources
pm2 monit

# Restart jika perlu
pm2 restart sdit-annajm
```

## Checklist Sebelum Deploy

- [ ] File .env sudah ada di server dengan DATABASE_URL yang benar
- [ ] package.json sudah terupload
- [ ] next.config.ts sudah terupload
- [ ] Deploy script sudah terupload dan executable
- [ ] Database sudah ready dan accessible
- [ ] PM2 sudah terinstall di server

## Important Notes

- Selalu gunakan `--production=false` saat install untuk memastikan Tailwind terinstall
- Tailwind v4 membutuhkan `@tailwindcss/postcss` saat build time
- Jangan lupa `pm2 save` setelah start agar auto-restart on reboot
