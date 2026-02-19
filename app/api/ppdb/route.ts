import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json([])
}

export async function POST(request: NextRequest) {
  try {
    await request.json()
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await request.json()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true })
}
