# Deployment Guide - SDIT ANNAJM RABBANI

## Prerequisites
- Node.js 18+ 
- MySQL Database
- Linux Server (cPanel/VPS)

## Environment Variables

Buat file `.env` di server dengan isi:

```env
# MySQL Database Connection
DATABASE_URL="mysql://u900997367_annajm:PASSWORD_ANDA@localhost:3306/u900997367_annajm"

# Site Configuration
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
```

## Deployment Steps

### 1. Upload Files
Upload semua file project ke server (kecuali node_modules)

### 2. Install Dependencies
```bash
npm install --production
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Build Application
```bash
npm run build
```

### 6. Start Application
```bash
npm start
```

## cPanel Deployment

### Setup Node.js App
1. Buka cPanel → Setup Node.js App
2. Node.js version: 18.x atau lebih tinggi
3. Application mode: Production
4. Application root: /home/u900997367/public_html
5. Application URL: sditannajm.sch.id
6. Application startup file: server.js atau gunakan npm start

### Environment Variables di cPanel
Tambahkan di Node.js App → Environment Variables:
- `DATABASE_URL`: mysql://u900997367_annajm:PASSWORD@localhost:3306/u900997367_annajm
- `NEXT_PUBLIC_SITE_NAME`: SDIT ANNAJM RABBANI
- `NEXT_PUBLIC_SITE_URL`: https://sditannajm.sch.id

### Run Commands
```bash
cd /home/u900997367/public_html
npm install
npx prisma generate
npx prisma db push
npm run build
```

## Troubleshooting

### Error: @next/swc-win32-x64-msvc
Sudah diperbaiki! Package platform-specific sudah dihapus dari dependencies.

### Error: Prisma Client
Jalankan: `npx prisma generate`

### Error: Database Connection
Pastikan DATABASE_URL benar dan MySQL server running.

### Port Already in Use
Default port 3000. Ubah dengan: `PORT=3001 npm start`

## Post-Deployment

### Create Admin User
Jalankan seed script atau insert manual ke database:
```sql
INSERT INTO Admin (id, username, password, role) 
VALUES ('admin1', 'admin', 'hashed_password', 'admin');
```

### Test Website
- Public: https://sditannajm.sch.id
- Admin: https://sditannajm.sch.id/admin
- Login: https://sditannajm.sch.id/login

## Maintenance

### Update Application
```bash
git pull origin main
npm install
npx prisma generate
npm run build
pm2 restart sdit-annajm
```

### Backup Database
```bash
mysqldump -u u900997367_annajm -p u900997367_annajm > backup.sql
```

### View Logs
```bash
pm2 logs sdit-annajm
```
