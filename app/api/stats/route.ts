import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  // Return mock stats
  return NextResponse.json({
    ppdb: 0,
    berita: 0,
    galeri: 0,
    guru: 0
  })
}
