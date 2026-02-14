# 🏫 SDIT ANNAJM RABBANI - Website Sekolah

Website resmi SDIT ANNAJM RABBANI dengan fitur lengkap untuk manajemen sekolah dan PPDB online.

## 🚀 Tech Stack

- **Framework:** Next.js 15.1.3
- **Database:** MySQL (Prisma ORM)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## 📋 Features

- ✅ Halaman Beranda dengan Hero Section
- ✅ Profil Sekolah (Tentang)
- ✅ Data Guru & Staff
- ✅ Galeri Foto & Video
- ✅ Berita & Artikel
- ✅ PPDB Online (Pendaftaran Siswa Baru)
- ✅ Admin Dashboard
- ✅ Export Data (Excel & PDF)
- ✅ Upload Gambar
- ✅ Responsive Design

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- MySQL 8+
- npm atau yarn

### Setup

1. Clone repository:
```bash
git clone <repository-url>
cd companyprofile
```

2. Install dependencies:
```bash
npm install
```

3. Setup database MySQL:
```sql
CREATE DATABASE annajm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. Copy `.env.example` ke `.env` dan update:
```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/annajm"
NEXT_PUBLIC_SITE_NAME="SDIT ANNAJM RABBANI"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

5. Push database schema:
```bash
npx prisma db push
```

6. Seed data (optional):
```bash
npm run db:seed
```

7. Run development server:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
├── prisma/               # Database schema
├── public/               # Static files
└── scripts/              # Utility scripts
```

## 🔐 Admin Access

Default login (setelah seed):
- Username: `admin`
- Password: `admin123`

**⚠️ Ganti password setelah login pertama!**

## 📦 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run db:push      # Push schema ke database
npm run db:seed      # Seed data
npm run db:studio    # Prisma Studio (GUI)
```

## 🌐 Deployment

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap deployment.

### Quick Deploy ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push ke GitHub
2. Import di Vercel
3. Set environment variables
4. Deploy!

## 📝 License

© 2025 SDIT ANNAJM RABBANI. All rights reserved.

## 🤝 Support

Untuk bantuan, hubungi tim IT sekolah.
