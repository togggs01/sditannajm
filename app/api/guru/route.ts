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
    const body = await request.json()
    
    // Validate required fields
    if (!body.nama || !body.jabatan) {
      return NextResponse.json({ 
        error: 'Nama dan Jabatan harus diisi'
      }, { status: 400 })
    }
    
    // Create guru - Prisma will auto-generate ID
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
    
    return NextResponse.json(guru, { status: 201 })
  } catch (error) {
    console.error('Error creating guru:', error)
    return NextResponse.json({ 
      error: 'Gagal menyimpan data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

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
    
    return NextResponse.json(guru)
  } catch (error) {
    console.error('Error updating guru:', error)
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
