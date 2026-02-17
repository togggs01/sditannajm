# Quick Fix - Website Error

## 🚨 Website Error? Jalankan Ini!

### Di Server (SSH/Terminal):

```bash
cd /home/u900997367/public_html

# Jalankan fix script
chmod +x fix-deployment.sh
./fix-deployment.sh

# Atau manual:
npm install
npx prisma generate
npx prisma db push
npm run build
npm start
```

### Di cPanel:

1. **Setup Node.js App**
   - Buka: cPanel → Setup Node.js App
   - Klik: "Restart" button

2. **Environment Variables**
   Pastikan ada:
   ```
   DATABASE_URL=mysql://u900997367_annajm:PASSWORD@localhost:3306/u900997367_annajm
   NEXT_PUBLIC_SITE_URL=https://sditannajm.sch.id
   ```

3. **Run Commands**
   Di terminal cPanel:
   ```bash
   cd ~/public_html
   npm install
   npx prisma generate
   npm run build
   ```

## ✅ Checklist

- [ ] File .env ada dan benar
- [ ] MySQL database running
- [ ] npm install berhasil
- [ ] prisma generate berhasil
- [ ] npm run build berhasil
- [ ] Website bisa diakses

## 📞 Masih Error?

Lihat file: `TROUBLESHOOTING.md`

Atau kirim screenshot error ke developer.
