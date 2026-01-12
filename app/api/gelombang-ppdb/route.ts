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
      // Cek apakah pendaftaran sedang dibuka
      const today = new Date()
      const gelombangAktif = await prisma.gelombangPPDB.findFirst({
        where: {
          tahunAjaran,
          aktif: true
        },
        orderBy: { tanggalMulai: 'asc' }
      })

      if (!gelombangAktif) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif: null,
          message: 'Pendaftaran belum dibuka untuk tahun ajaran ini',
          kuotaInfo: null
        })
      }

      const isInRange = isDateInRange(today, gelombangAktif.tanggalMulai, gelombangAktif.tanggalSelesai)

      // Hitung jumlah pendaftar dan sisa kuota
      const jumlahPendaftar = await prisma.pPDB.count({
        where: {
          tahunAjaran,
          gelombang: gelombangAktif.gelombang
        }
      })

      const kuotaInfo = gelombangAktif.kuota !== null ? {
        total: gelombangAktif.kuota,
        terisi: jumlahPendaftar,
        sisa: gelombangAktif.kuota - jumlahPendaftar,
        penuh: jumlahPendaftar >= gelombangAktif.kuota
      } : null

      if (!isInRange) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Pendaftaran ${gelombangAktif.gelombang} akan dibuka pada ${new Date(gelombangAktif.tanggalMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          kuotaInfo
        })
      }

      // Cek apakah kuota penuh
      if (kuotaInfo && kuotaInfo.penuh) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Maaf, kuota pendaftaran ${gelombangAktif.gelombang} sudah penuh (${gelombangAktif.kuota} siswa)`,
          kuotaInfo
        })
      }

      return NextResponse.json({
        isOpen: true,
        gelombangAktif,
        message: `Pendaftaran ${gelombangAktif.gelombang} sedang dibuka`,
        kuotaInfo
      })
    }

    // Ambil semua gelombang
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
          sisaKuota: g.kuota !== null ? g.kuota - jumlahPendaftar : null
        }
      })
    )

    return NextResponse.json(gelombangWithStats)
  } catch (error) {
    console.error('Error fetching gelombang:', error)
    return NextResponse.json({ error: 'Gagal mengambil data gelombang' }, { status: 500 })
  }
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
