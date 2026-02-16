import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tahunAjaran = searchParams.get('tahunAjaran')

    if (!tahunAjaran) {
      return NextResponse.json({ error: 'Tahun ajaran harus dipilih' }, { status: 400 })
    }

    // Ambil data PPDB berdasarkan tahun ajaran
    const ppdbData = await prisma.pPDB.findMany({
      where: { tahunAjaran },
      orderBy: { createdAt: 'desc' }
    })

    if (ppdbData.length === 0) {
      return NextResponse.json({ error: 'Tidak ada data untuk tahun ajaran ini' }, { status: 404 })
    }

    // Convert ke CSV
    const headers = [
      'No',
      'Nama Lengkap',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Jenis Kelamin',
      'Alamat',
      'Nama Orang Tua',
      'Nomor HP',
      'Kontak',
      'Tahun Ajaran',
      'Status',
      'Tanggal Daftar'
    ]

    const csvRows = [headers.join(',')]

    ppdbData.forEach((item, index) => {
      const row = [
        index + 1,
        `"${item.namaLengkap}"`,
        `"${item.tempatLahir}"`,
        `"${item.tanggalLahir}"`,
        `"${item.jenisKelamin}"`,
        `"${item.alamatRumah}"`, // Menggunakan alamatRumah bukan alamat
        `"${item.namaLengkapAyah} / ${item.namaLengkapIbu}"`, // Gabungan nama orang tua
        `"${item.nomorHandphone}"`, // Menggunakan nomorHandphone
        `"${item.nomorHandphone}"`, // Email tidak ada di schema, gunakan nomor HP
        `"${item.tahunAjaran}"`,
        `"${item.status}"`,
        `"${new Date(item.createdAt).toLocaleDateString('id-ID')}"`
      ]
      csvRows.push(row.join(','))
    })

    const csvContent = csvRows.join('\n')

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="PPDB_${tahunAjaran.replace('/', '-')}_${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Gagal export data' }, { status: 500 })
  }
}
