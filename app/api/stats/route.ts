import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [guruCount, siswaCount, beritaCount] = await Promise.all([
      prisma.guru.count(),
      prisma.pPDB.count({ where: { status: 'diterima' } }),
      prisma.berita.count({ where: { published: true } })
    ])

    return NextResponse.json({
      guru: guruCount,
      siswa: siswaCount,
      berita: beritaCount
    })
  } catch (error) {
    console.error('Stats API Error:', error)
    return NextResponse.json({ 
      error: 'Gagal mengambil statistik',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
