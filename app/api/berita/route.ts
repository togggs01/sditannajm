import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(berita)
  } catch (error) {
    console.error('Error fetching berita:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/berita - Starting...')
    
    const body = await request.json()
    
    console.log('POST /api/berita - Body:', {
      judul: body.judul,
      penulis: body.penulis,
      kategori: body.kategori,
      hasGambar: !!body.gambar,
      gambarLength: body.gambar?.length || 0,
      published: body.published
    })
    
    // Validate required fields
    if (!body.judul || !body.konten || !body.penulis || !body.kategori) {
      console.error('POST /api/berita - Missing required fields')
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: {
          judul: !body.judul ? 'required' : 'ok',
          konten: !body.konten ? 'required' : 'ok',
          penulis: !body.penulis ? 'required' : 'ok',
          kategori: !body.kategori ? 'required' : 'ok'
        }
      }, { status: 400 })
    }
    
    console.log('POST /api/berita - Generating slug...')
    
    // Generate slug from judul
    const slug = slugify(body.judul)
    
    console.log('POST /api/berita - Slug:', slug)
    console.log('POST /api/berita - Creating berita...')
    
    const berita = await prisma.berita.create({
      data: {
        judul: body.judul,
        slug: slug,
        konten: body.konten,
        gambar: body.gambar || null,
        penulis: body.penulis,
        kategori: body.kategori,
        published: body.published ?? true
      }
    })
    
    console.log('POST /api/berita - Success:', berita.id)
    
    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    console.error('POST /api/berita - Error:', error)
    return NextResponse.json({ 
      error: 'Failed to create',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error
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

    console.log('Updating berita:', id, {
      judul: body.judul,
      hasGambar: !!body.gambar,
      gambarLength: body.gambar?.length || 0
    })

    // Generate new slug if judul changed
    const slug = slugify(body.judul)

    const berita = await prisma.berita.update({
      where: { id },
      data: {
        judul: body.judul,
        slug: slug,
        konten: body.konten,
        gambar: body.gambar || null,
        penulis: body.penulis,
        kategori: body.kategori,
        published: body.published ?? true
      }
    })
    
    console.log('Berita updated successfully')
    
    return NextResponse.json(berita)
  } catch (error) {
    console.error('Error updating berita:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.berita.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting berita:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
