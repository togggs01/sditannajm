import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(guru)
  } catch (error) {
    console.error('Error fetching guru:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/guru - Starting...')
    
    const body = await request.json()
    
    console.log('POST /api/guru - Body:', {
      nama: body.nama,
      nip: body.nip,
      jabatan: body.jabatan,
      hasFoto: !!body.foto,
      fotoLength: body.foto?.length || 0,
      email: body.email,
      telepon: body.telepon
    })
    
    // Validate required fields
    if (!body.nama || !body.jabatan) {
      console.error('POST /api/guru - Missing required fields')
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: {
          nama: !body.nama ? 'required' : 'ok',
          jabatan: !body.jabatan ? 'required' : 'ok'
        }
      }, { status: 400 })
    }
    
    console.log('POST /api/guru - Creating guru...')
    
    const guru = await prisma.guru.create({
      data: {
        nama: body.nama,
        nip: body.nip || null,
        jabatan: body.jabatan,
        foto: body.foto || null,
        email: body.email || null,
        telepon: body.telepon || null
      }
    })
    
    console.log('POST /api/guru - Success:', guru.id)
    
    return NextResponse.json(guru, { status: 201 })
  } catch (error) {
    console.error('POST /api/guru - Error:', error)
    return NextResponse.json({ 
      error: 'Failed to create',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('PUT /api/guru - Starting...')
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    if (!id) {
      console.error('PUT /api/guru - Missing ID')
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    console.log('PUT /api/guru - ID:', id)
    console.log('PUT /api/guru - Body:', {
      nama: body.nama,
      nip: body.nip,
      jabatan: body.jabatan,
      hasFoto: !!body.foto
    })

    const guru = await prisma.guru.update({
      where: { id },
      data: {
        nama: body.nama,
        nip: body.nip || null,
        jabatan: body.jabatan,
        foto: body.foto || null,
        email: body.email || null,
        telepon: body.telepon || null
      }
    })
    
    console.log('PUT /api/guru - Success')
    
    return NextResponse.json(guru)
  } catch (error) {
    console.error('PUT /api/guru - Error:', error)
    return NextResponse.json({ 
      error: 'Failed to update',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.guru.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guru:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
