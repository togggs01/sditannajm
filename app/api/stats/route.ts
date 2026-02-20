import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [guru, berita, galeri, ppdb] = await Promise.all([
      prisma.guru.count(),
      prisma.berita.count(),
      prisma.galeri.count(),
      prisma.pPDB.count()
    ])
    
    return NextResponse.json({
      guru,
      berita,
      galeri,
      ppdb
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({
      guru: 0,
      berita: 0,
      galeri: 0,
      ppdb: 0
    })
  }
}
