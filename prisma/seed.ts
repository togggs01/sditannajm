import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed Guru
  await prisma.guru.createMany({
    data: [
      {
        nama: 'Ahmad Fauzi, S.Pd.I',
        nip: '123456789',
        jabatan: 'Kepala Sekolah',
        email: 'ahmad.fauzi@sditannajm.sch.id',
        telepon: '081234567890'
      },
      {
        nama: 'Siti Nurhaliza, S.Pd',
        nip: '123456790',
        jabatan: 'Guru Kelas 1',
        email: 'siti.nurhaliza@sditannajm.sch.id',
        telepon: '081234567891'
      },
      {
        nama: 'Muhammad Rizki, S.Pd',
        nip: '123456791',
        jabatan: 'Guru Kelas 2',
        email: 'muhammad.rizki@sditannajm.sch.id',
        telepon: '081234567892'
      },
      {
        nama: 'Fatimah Az-Zahra, S.Pd.I',
        nip: '123456792',
        jabatan: 'Guru Tahfidz',
        email: 'fatimah@sditannajm.sch.id',
        telepon: '081234567893'
      }
    ]
  })

  // Seed Berita
  await prisma.berita.createMany({
    data: [
      {
        judul: 'Pembukaan Tahun Ajaran Baru 2025/2026',
        slug: 'pembukaan-tahun-ajaran-baru-2025-2026',
        konten: 'SDIT An-Najm dengan bangga mengumumkan pembukaan tahun ajaran baru 2025/2026. Kegiatan pembelajaran akan dimulai pada tanggal 15 Juli 2025. Kami mengajak seluruh siswa dan orang tua untuk mempersiapkan diri dengan baik.\n\nTahun ajaran ini akan dimulai dengan kegiatan Masa Orientasi Siswa (MOS) selama 3 hari untuk siswa baru. Kegiatan ini bertujuan untuk memperkenalkan lingkungan sekolah dan membangun keakraban antar siswa.',
        penulis: 'Admin SDIT An-Najm',
        kategori: 'Pengumuman',
        published: true
      },
      {
        judul: 'Prestasi Gemilang di Olimpiade Sains Nasional',
        slug: 'prestasi-gemilang-di-olimpiade-sains-nasional',
        konten: 'Alhamdulillah, siswa SDIT An-Najm berhasil meraih medali emas dalam Olimpiade Sains Nasional tingkat SD. Muhammad Farhan dari kelas 6 berhasil mengalahkan ratusan peserta dari seluruh Indonesia.\n\nPrestasi ini merupakan hasil dari kerja keras dan dedikasi siswa serta dukungan penuh dari guru pembimbing. Kami berharap prestasi ini dapat memotivasi siswa lainnya untuk terus berprestasi.',
        penulis: 'Tim Redaksi',
        kategori: 'Prestasi',
        published: true
      },
      {
        judul: 'Kegiatan Outing Class ke Museum Nasional',
        slug: 'kegiatan-outing-class-ke-museum-nasional',
        konten: 'Siswa kelas 5 SDIT An-Najm melaksanakan kegiatan outing class ke Museum Nasional Jakarta. Kegiatan ini bertujuan untuk memberikan pengalaman belajar di luar kelas dan mengenalkan sejarah Indonesia kepada siswa.\n\nPara siswa sangat antusias mengikuti kegiatan ini. Mereka belajar tentang berbagai koleksi bersejarah dan budaya Indonesia. Kegiatan ini juga melatih kemandirian dan kerjasama antar siswa.',
        penulis: 'Guru Pendamping',
        kategori: 'Kegiatan',
        published: true
      }
    ]
  })

  // Seed Galeri
  await prisma.galeri.createMany({
    data: [
      {
        judul: 'Upacara Bendera Senin',
        deskripsi: 'Kegiatan rutin upacara bendera setiap hari Senin',
        gambar: '/images/upacara.jpg',
        kategori: 'Kegiatan Rutin'
      },
      {
        judul: 'Pembelajaran Tahfidz',
        deskripsi: 'Siswa sedang menghafal Al-Quran dengan bimbingan ustadz',
        gambar: '/images/tahfidz.jpg',
        kategori: 'Pembelajaran'
      },
      {
        judul: 'Lomba Cerdas Cermat',
        deskripsi: 'Kompetisi cerdas cermat antar kelas',
        gambar: '/images/lomba.jpg',
        kategori: 'Kompetisi'
      },
      {
        judul: 'Praktikum Sains',
        deskripsi: 'Siswa melakukan eksperimen di laboratorium sains',
        gambar: '/images/lab.jpg',
        kategori: 'Pembelajaran'
      }
    ]
  })

  // Seed Admin
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    }
  })

  console.log('✅ Seeding completed!')
  console.log('📝 Admin login: admin / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
