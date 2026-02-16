import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentTahunAjaran, generateTahunAjaranList } from '@/lib/tahunAjaran'

export async function GET() {
  try {
    // Ambil semua tahun ajaran yang ada di database PPDB
    const ppdbData = await prisma.pPDB.findMany({
      select: { tahunAjaran: true },
      distinct: ['tahunAjaran'],
      orderBy: { tahunAjaran: 'desc' }
    })

    // Ambil semua tahun ajaran yang ada di database GelombangPPDB
    const gelombangData = await prisma.gelombangPPDB.findMany({
      select: { tahunAjaran: true },
      distinct: ['tahunAjaran'],
      orderBy: { tahunAjaran: 'desc' }
    })

    const tahunAjaranFromPPDB = ppdbData.map(item => item.tahunAjaran)
    const tahunAjaranFromGelombang = gelombangData.map(item => item.tahunAjaran)

    // Generate list tahun ajaran dari 2020 sampai sekarang
    const allTahunAjaran = generateTahunAjaranList(2020)

    // Gabungkan semua sumber dan deduplicate
    const uniqueTahunAjaran = Array.from(new Set([
      ...allTahunAjaran, 
      ...tahunAjaranFromPPDB, 
      ...tahunAjaranFromGelombang
    ]))
      .sort((a, b) => {
        const [yearA] = a.split('/').map(Number)
        const [yearB] = b.split('/').map(Number)
        return yearB - yearA // Descending
      })

    return NextResponse.json({
      current: getCurrentTahunAjaran(),
      available: uniqueTahunAjaran
    })
  } catch (error) {
    console.error('Error getting tahun ajaran:', error)
    return NextResponse.json({ error: 'Gagal mengambil data tahun ajaran' }, { status: 500 })
  }
}
