# 🚀 Deployment Guide - SDIT ANNAJM RABBANI

## Database Configuration

Aplikasi ini menggunakan **MySQL** sebagai database.

### Local Development

1. Install MySQL di komputer kamu
2. Buat database:
```sql
CREATE DATABASE annajm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Update `.env`:
```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/annajm"
```

4. Push schema:
```bash
npm run db:push
```

5. Seed data (optional):
```bash
npm run db:seed
```

### Production Deployment

#### Option 1: Vercel + PlanetScale (Recommended)

1. **Setup PlanetScale:**
   - Daftar di https://planetscale.com
   - Buat database baru
   - Copy connection string

2. **Deploy ke Vercel:**
   - Push code ke GitHub
   - Import project di Vercel
   - Set environment variables:
     ```
     DATABASE_URL=mysql://user:pass@host/annajm?sslaccept=strict
     NEXT_PUBLIC_SITE_NAME=SDIT ANNAJM RABBANI
     NEXT_PUBLIC_SITE_URL=https://sditannajm.sch.id
     ```

3. **Push Schema:**
   ```bash
   npx prisma db push
   ```

#### Option 2: Railway

1. Deploy MySQL di Railway
2. Copy connection string
3. Set di environment variables
4. Deploy aplikasi

#### Option 3: Hosting Sendiri (VPS)

1. Install MySQL di VPS
2. Buat database
3. Set environment variables
4. Build dan deploy:
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

Wajib di-set di production:

```env
DATABASE_URL="mysql://user:pass@host:3306/annajm"
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="https://sditannajm.sch.id"
```

## Troubleshooting

### Error 503 - Database Connection Failed

- Pastikan MySQL server running
- Cek kredensial di DATABASE_URL
- Pastikan database sudah dibuat
- Cek firewall/network access

### Error: Table doesn't exist

```bash
npx prisma db push
```

### Reset Database

```bash
npx prisma db push --force-reset
npm run db:seed
```

## Admin Login

Default admin (setelah seed):
- Username: `admin`
- Password: `admin123`

**⚠️ WAJIB ganti password setelah login pertama!**
