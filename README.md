# SDIT An-Najm - Website Sekolah

Website resmi SDIT An-Najm yang dibangun dengan Next.js, TypeScript, Tailwind CSS, dan Prisma.

## Fitur

- 🏠 Halaman Beranda dengan Hero Section
- 📖 Profil Sekolah (Visi, Misi, Fasilitas)
- 👨‍🏫 Daftar Guru
- 📰 Berita & Artikel
- 🖼️ Galeri Foto
- 📝 Pendaftaran Online (PPDB)
- 📞 Halaman Kontak
- 🔌 REST API untuk CRUD data

## Teknologi

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite dengan Prisma ORM
- **Deployment**: Vercel (recommended)

## Instalasi

1. Clone repository ini
2. Install dependencies:
```bash
npm install
```

3. Setup database:
```bash
npx prisma generate
npx prisma db push
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000)

## Struktur Database

### Tabel Guru
- id, nama, nip, jabatan, foto, email, telepon

### Tabel Berita
- id, judul, slug, konten, gambar, penulis, kategori, published

### Tabel Galeri
- id, judul, deskripsi, gambar, kategori

### Tabel PPDB
- id, namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, alamat, namaOrangTua, teleponOrangTua, email, status

## API Endpoints

### Guru
- GET `/api/guru` - Ambil semua data guru
- POST `/api/guru` - Tambah guru baru
- DELETE `/api/guru?id={id}` - Hapus guru

### Berita
- GET `/api/berita` - Ambil semua berita
- POST `/api/berita` - Tambah berita baru
- DELETE `/api/berita?id={id}` - Hapus berita

### Galeri
- GET `/api/galeri` - Ambil semua foto
- POST `/api/galeri` - Tambah foto baru
- DELETE `/api/galeri?id={id}` - Hapus foto

### PPDB
- GET `/api/ppdb` - Ambil semua pendaftaran
- POST `/api/ppdb` - Tambah pendaftaran baru
- DELETE `/api/ppdb?id={id}` - Hapus pendaftaran

## Deployment

Deploy ke Vercel dengan satu klik atau gunakan Vercel CLI:

```bash
npm install -g vercel
vercel
```

Jangan lupa setup environment variables di Vercel dashboard.

## Lisensi

© 2025 SDIT An-Najm. All rights reserved.
