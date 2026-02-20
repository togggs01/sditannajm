import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Get unique tahun ajaran from gelombang PPDB
    const gelombangList = await prisma.gelombangPPDB.findMany({
      select: {
        tahunAjaran: true
      },
      distinct: ['tahunAjaran'],
      orderBy: {
        tahunAjaran: 'desc'
      }
    })
    
    const availableTahunAjaran = gelombangList.map(g => g.tahunAjaran)
    
    return NextResponse.json({
      available: availableTahunAjaran,
      count: availableTahunAjaran.length
    })
  } catch (error) {
    console.error('Error fetching tahun ajaran:', error)
    return NextResponse.json({ 
      available: [],
      count: 0
    }, { status: 200 })
  }
}
