import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { nama: 'asc' }
    })
    return NextResponse.json(guru)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data guru' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, nip, jabatan, foto, email, telepon } = body

    console.log('POST /api/guru - Request body:', { 
      nama, 
      nip, 
      jabatan, 
      email, 
      telepon,
      fotoLength: foto ? foto.length : 0 
    })

    if (!nama || !jabatan) {
      return NextResponse.json({ error: 'Nama dan jabatan wajib diisi' }, { status: 400 })
    }

    const guru = await prisma.guru.create({
      data: { nama, nip, jabatan, foto, email, telepon }
    })

    console.log('POST /api/guru - Success:', guru.id)
    return NextResponse.json(guru, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/guru - Error:', error)
    
    // Handle unique constraint error
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'NIP sudah digunakan oleh guru lain. Silakan gunakan NIP yang berbeda.' 
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: 'Gagal menambahkan guru',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    const guru = await prisma.guru.update({
      where: { id },
      data: body
    })

    return NextResponse.json(guru)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengupdate guru' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    await prisma.guru.delete({ where: { id } })
    return NextResponse.json({ message: 'Guru berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus guru' }, { status: 500 })
  }
}
