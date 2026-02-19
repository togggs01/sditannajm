# Quick Commands Cheatsheet

## SSH ke Server
```bash
ssh u900997367@sditannajm.sch.id
cd /home/u900997367/domains/sditannajm.sch.id/public_html/.builds/source/repository
```

## Fix Scripts (Pilih salah satu)

### 0. Fix All (RECOMMENDED - Most comprehensive)
```bash
chmod +x fix-all.sh
./fix-all.sh
```
Untuk: Semua masalah, test lengkap dari component sampai API

### 1. Complete Fix (Thorough dengan fresh install)
```bash
chmod +x complete-fix.sh
./complete-fix.sh
```
Untuk: Fresh install, missing packages, database issues

### 2. Force Restart (Untuk app yang crash)
```bash
chmod +x force-restart.sh
./force-restart.sh
```
Untuk: App crash, port issues, process stuck

### 3. Clean Rebuild (Untuk masalah chunk/build)
```bash
chmod +x rebuild-clean.sh
./rebuild-clean.sh
```
Untuk: Error di chunk files, webpack issues, build corruption

### 4. Quick Fix (Cepat, untuk error Tailwind/Prisma)
```bash
chmod +x quick-fix.sh
./quick-fix.sh
```
Untuk: Missing Tailwind/Prisma packages

### 5. Diagnostic (Check masalah)
```bash
chmod +x diagnose.sh
./diagnose.sh
```
Untuk: Cek status dan diagnosa masalah

### 6. Test Scripts
```bash
# Test components
node test-components.js

# Test database & admin user
node test-database.js

# Test API
chmod +x test-api.sh
./test-api.sh
```

## Manual Commands

### Stop & Start
```bash
pm2 stop sdit-annajm
pm2 start sdit-annajm
pm2 restart sdit-annajm
```

### View Logs
```bash
# Last 100 lines
pm2 logs sdit-annajm --lines 100

# Follow real-time
pm2 logs sdit-annajm

# Using script
chmod +x check-logs.sh
./check-logs.sh
```

### Rebuild Only
```bash
pm2 stop sdit-annajm
rm -rf .next
npm run build
pm2 start sdit-annajm
```

### Install Missing Packages
```bash
npm install @tailwindcss/postcss tailwindcss @prisma/client --save
npx prisma generate
```

### Database Commands
```bash
# Generate Prisma Client
npx prisma generate

# Push schema
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Troubleshooting Specific Errors

### Error di chunk files / webpack
```bash
chmod +x rebuild-clean.sh
./rebuild-clean.sh
```
Atau manual:
```bash
pm2 stop sdit-annajm
rm -rf .next .turbo node_modules/.cache
npm run build
pm2 restart sdit-annajm
```

### Error: Cannot find module '@tailwindcss/postcss'
```bash
npm install @tailwindcss/postcss tailwindcss --save
rm -rf .next
npm run build
pm2 restart sdit-annajm
```

### Error: PrismaClient is unable to run in this browser environment
```bash
npx prisma generate
rm -rf .next
npm run build
pm2 restart sdit-annajm
```

### Error 500 di API routes
```bash
# Check logs first
pm2 logs sdit-annajm --lines 50

# Then rebuild
rm -rf .next
npm run build
pm2 restart sdit-annajm
```

### App tidak start
```bash
pm2 delete sdit-annajm
npm run build
pm2 start npm --name sdit-annajm -- start
pm2 save
```

## Monitoring

```bash
# Status
pm2 status

# Monitor resources
pm2 monit

# Process info
pm2 info sdit-annajm

# Save current state
pm2 save

# Resurrect saved state
pm2 resurrect
```

## Emergency Reset

Jika semua cara gagal:
```bash
# 1. Stop everything
pm2 stop all
pm2 delete all

# 2. Clean everything
rm -rf .next node_modules

# 3. Fresh install
npm install --production=false

# 4. Generate Prisma
npx prisma generate

# 5. Build
npm run build

# 6. Start
pm2 start npm --name sdit-annajm -- start
pm2 save
```
