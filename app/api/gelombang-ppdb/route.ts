import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'
import { isDateInRange } from '@/lib/gelombangPPDB'

// GET - Ambil semua gelombang atau cek status pendaftaran
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const checkStatus = searchParams.get('checkStatus')
    const tahunAjaran = searchParams.get('tahunAjaran') || getCurrentTahunAjaran()

    if (checkStatus === 'true') {
      // Cek status pendaftaran dengan logic yang lebih bersih
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set ke awal hari untuk perbandingan yang akurat
      
      // Cari gelombang yang aktif untuk tahun ajaran ini
      const gelombangAktif = await prisma.gelombangPPDB.findFirst({
        where: {
          tahunAjaran,
          aktif: true
        },
        orderBy: { tanggalMulai: 'asc' }
      })

      // Jika tidak ada gelombang aktif
      if (!gelombangAktif) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif: null,
          message: `Belum ada gelombang pendaftaran yang dibuka untuk tahun ajaran ${tahunAjaran}. Silakan hubungi sekolah untuk informasi lebih lanjut.`,
          kuotaInfo: null,
          reason: 'NO_ACTIVE_WAVE'
        })
      }

      // Hitung jumlah pendaftar untuk gelombang ini
      const jumlahPendaftar = await prisma.pPDB.count({
        where: {
          tahunAjaran,
          gelombang: gelombangAktif.gelombang
        }
      })

      // Buat info kuota
      const kuotaInfo = gelombangAktif.kuota !== null ? {
        total: gelombangAktif.kuota,
        terisi: jumlahPendaftar,
        sisa: Math.max(0, gelombangAktif.kuota - jumlahPendaftar),
        penuh: jumlahPendaftar >= gelombangAktif.kuota
      } : null

      // Konversi tanggal untuk perbandingan yang akurat
      const tanggalMulai = new Date(gelombangAktif.tanggalMulai)
      const tanggalSelesai = new Date(gelombangAktif.tanggalSelesai)
      tanggalMulai.setHours(0, 0, 0, 0)
      tanggalSelesai.setHours(23, 59, 59, 999) // Set ke akhir hari
      
      // Logic pengecekan status dengan prioritas yang jelas
      
      // 1. Cek apakah kuota sudah penuh (prioritas tertinggi)
      if (kuotaInfo && kuotaInfo.penuh) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Pendaftaran ${gelombangAktif.gelombang} sudah ditutup karena kuota telah penuh (${gelombangAktif.kuota} siswa). Silakan tunggu pengumuman gelombang berikutnya.`,
          kuotaInfo,
          reason: 'QUOTA_FULL'
        })
      }

      // 2. Cek apakah belum waktunya pendaftaran
      if (today < tanggalMulai) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Pendaftaran ${gelombangAktif.gelombang} akan dibuka pada ${tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. Silakan kembali pada tanggal tersebut.`,
          kuotaInfo,
          reason: 'NOT_YET_STARTED'
        })
      }

      // 3. Cek apakah sudah lewat masa pendaftaran
      if (today > tanggalSelesai) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Pendaftaran ${gelombangAktif.gelombang} sudah ditutup pada ${tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. Silakan tunggu pengumuman gelombang berikutnya.`,
          kuotaInfo,
          reason: 'REGISTRATION_CLOSED'
        })
      }

      // 4. Jika semua kondisi terpenuhi, pendaftaran dibuka
      let sisaKuotaMessage = ''
      if (kuotaInfo) {
        if (kuotaInfo.sisa <= 5) {
          sisaKuotaMessage = ` ⚠️ Hanya tersisa ${kuotaInfo.sisa} kuota lagi!`
        } else if (kuotaInfo.sisa <= 20) {
          sisaKuotaMessage = ` Tersisa ${kuotaInfo.sisa} kuota dari ${kuotaInfo.total} total kuota.`
        } else {
          sisaKuotaMessage = ` Tersisa ${kuotaInfo.sisa} kuota dari ${kuotaInfo.total} total kuota.`
        }
      } else {
        sisaKuotaMessage = ' Kuota tidak terbatas.'
      }

      return NextResponse.json({
        isOpen: true,
        gelombangAktif,
        message: `Pendaftaran ${gelombangAktif.gelombang} sedang dibuka hingga ${tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.${sisaKuotaMessage}`,
        kuotaInfo,
        reason: 'OPEN'
      })
    }

    // Ambil semua gelombang dengan statistik
    const gelombang = await prisma.gelombangPPDB.findMany({
      where: tahunAjaran ? { tahunAjaran } : {},
      orderBy: [
        { tahunAjaran: 'desc' },
        { tanggalMulai: 'asc' }
      ]
    })

    // Tambahkan info jumlah pendaftar untuk setiap gelombang
    const gelombangWithStats = await Promise.all(
      gelombang.map(async (g) => {
        const jumlahPendaftar = await prisma.pPDB.count({
          where: {
            tahunAjaran: g.tahunAjaran,
            gelombang: g.gelombang
          }
        })

        return {
          ...g,
          jumlahPendaftar,
          sisaKuota: g.kuota !== null ? g.kuota - jumlahPendaftar : null,
          status: getGelombangStatus(g, jumlahPendaftar)
        }
      })
    )

    return NextResponse.json(gelombangWithStats)
  } catch (error) {
    console.error('Error fetching gelombang:', error)
    return NextResponse.json({ error: 'Gagal mengambil data gelombang' }, { status: 500 })
  }
}

// Helper function untuk menentukan status gelombang
function getGelombangStatus(gelombang: any, jumlahPendaftar: number): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const startDate = new Date(gelombang.tanggalMulai)
  const endDate = new Date(gelombang.tanggalSelesai)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 999)

  if (!gelombang.aktif) {
    return 'INACTIVE'
  }

  // Prioritas: Kuota penuh > Tanggal
  if (gelombang.kuota !== null && jumlahPendaftar >= gelombang.kuota) {
    return 'QUOTA_FULL'
  }

  if (today < startDate) {
    return 'NOT_YET_STARTED'
  }

  if (today > endDate) {
    return 'CLOSED'
  }

  return 'OPEN'
}

// POST - Buat gelombang baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tahunAjaran, gelombang, tanggalMulai, tanggalSelesai, kuota, aktif } = body

    if (!tahunAjaran || !gelombang || !tanggalMulai || !tanggalSelesai) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // Validasi tanggal
    if (new Date(tanggalMulai) >= new Date(tanggalSelesai)) {
      return NextResponse.json({ error: 'Tanggal mulai harus lebih awal dari tanggal selesai' }, { status: 400 })
    }

    const newGelombang = await prisma.gelombangPPDB.create({
      data: {
        tahunAjaran,
        gelombang,
        tanggalMulai,
        tanggalSelesai,
        kuota: kuota ? parseInt(kuota) : null,
        aktif: aktif !== false
      }
    })

    return NextResponse.json(newGelombang, { status: 201 })
  } catch (error) {
    console.error('Error creating gelombang:', error)
    return NextResponse.json({ error: 'Gagal membuat gelombang' }, { status: 500 })
  }
}

// PUT - Update gelombang
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    // Validasi tanggal jika ada
    if (body.tanggalMulai && body.tanggalSelesai) {
      if (new Date(body.tanggalMulai) >= new Date(body.tanggalSelesai)) {
        return NextResponse.json({ error: 'Tanggal mulai harus lebih awal dari tanggal selesai' }, { status: 400 })
      }
    }

    // Prepare data dengan konversi tipe yang benar
    const updateData: any = {
      tahunAjaran: body.tahunAjaran,
      gelombang: body.gelombang,
      tanggalMulai: body.tanggalMulai,
      tanggalSelesai: body.tanggalSelesai,
      aktif: body.aktif
    }

    // Convert kuota ke integer atau null
    if (body.kuota !== undefined && body.kuota !== null && body.kuota !== '') {
      updateData.kuota = parseInt(body.kuota)
    } else {
      updateData.kuota = null
    }

    const updated = await prisma.gelombangPPDB.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating gelombang:', error)
    return NextResponse.json({ error: 'Gagal mengupdate gelombang' }, { status: 500 })
  }
}

// DELETE - Hapus gelombang
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    await prisma.gelombangPPDB.delete({ where: { id } })
    return NextResponse.json({ message: 'Gelombang berhasil dihapus' })
  } catch (error) {
    console.error('Error deleting gelombang:', error)
    return NextResponse.json({ error: 'Gagal menghapus gelombang' }, { status: 500 })
  }
}
