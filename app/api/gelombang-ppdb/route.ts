import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET - Return empty array (no database dependency)
export async function GET(request: NextRequest) {
  try {
    // Return empty array untuk admin panel
    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching gelombang:', error)
    return NextResponse.json([], { status: 200 })
  }
}

// POST - Return success (no database)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      success: true,
      message: 'Gelombang created (mock)'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// PUT - Return success (no database)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      success: true,
      message: 'Gelombang updated (mock)'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// DELETE - Return success (no database)
export async function DELETE(request: NextRequest) {
  try {
    return NextResponse.json({ 
      success: true,
      message: 'Gelombang deleted (mock)'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
