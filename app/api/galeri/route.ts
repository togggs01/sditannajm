import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(galeri)
  } catch (error) {
    console.error('Error fetching galeri:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/galeri - Starting...')
    
    const body = await request.json()
    console.log('POST /api/galeri - Body:', {
      judul: body.judul,
      kategori: body.kategori,
      tipe: body.tipe,
      hasGambar: !!body.gambar,
      hasVideo: !!body.video,
      gambarLength: body.gambar?.length || 0,
      videoLength: body.video?.length || 0
    })
    
    // Validate required fields
    if (!body.judul || !body.kategori || !body.tipe) {
      console.error('POST /api/galeri - Missing required fields')
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: {
          judul: !body.judul ? 'required' : 'ok',
          kategori: !body.kategori ? 'required' : 'ok',
          tipe: !body.tipe ? 'required' : 'ok'
        }
      }, { status: 400 })
    }
    
    // Validate tipe
    if (body.tipe !== 'gambar' && body.tipe !== 'video') {
      console.error('POST /api/galeri - Invalid tipe:', body.tipe)
      return NextResponse.json({ 
        error: 'Invalid tipe. Must be "gambar" or "video"'
      }, { status: 400 })
    }
    
    console.log('POST /api/galeri - Creating galeri...')
    
    const galeri = await prisma.galeri.create({
      data: {
        judul: body.judul,
        deskripsi: body.deskripsi || null,
        gambar: body.gambar || null,
        video: body.video || null,
        kategori: body.kategori,
        tipe: body.tipe
      }
    })
    
    console.log('POST /api/galeri - Success:', galeri.id)
    
    return NextResponse.json(galeri, { status: 201 })
  } catch (error) {
    console.error('POST /api/galeri - Error:', error)
    return NextResponse.json({ 
      error: 'Failed to create',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('PUT /api/galeri - Starting...')
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    if (!id) {
      console.error('PUT /api/galeri - Missing ID')
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    console.log('PUT /api/galeri - ID:', id)
    console.log('PUT /api/galeri - Body:', {
      judul: body.judul,
      kategori: body.kategori,
      tipe: body.tipe,
      hasGambar: !!body.gambar,
      hasVideo: !!body.video
    })

    const galeri = await prisma.galeri.update({
      where: { id },
      data: {
        judul: body.judul,
        deskripsi: body.deskripsi || null,
        gambar: body.gambar || null,
        video: body.video || null,
        kategori: body.kategori,
        tipe: body.tipe
      }
    })
    
    console.log('PUT /api/galeri - Success')
    
    return NextResponse.json(galeri)
  } catch (error) {
    console.error('PUT /api/galeri - Error:', error)
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

    await prisma.galeri.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting galeri:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
