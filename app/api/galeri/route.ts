import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(galeri)
  } catch (error) {
    console.error('GET /api/galeri Error:', error)
    return NextResponse.json({ error: 'Gagal mengambil data galeri' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/galeri - Starting request')
    
    // Parse request body with error handling
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('POST /api/galeri - JSON Parse Error:', parseError)
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }
    
    console.log('POST /api/galeri - Request body:', body)
    
    const { judul, deskripsi, gambar, video, kategori, tipe } = body

    // Basic validation
    if (!judul || !kategori || !tipe) {
      console.log('POST /api/galeri - Validation failed: missing basic fields')
      return NextResponse.json({ error: 'Judul, kategori, dan tipe wajib diisi' }, { status: 400 })
    }

    // Validasi panjang deskripsi
    if (deskripsi && deskripsi.length > 40) {
      console.log('POST /api/galeri - Validation failed: deskripsi too long')
      return NextResponse.json({ error: 'Deskripsi tidak boleh lebih dari 40 karakter' }, { status: 400 })
    }

    // Validasi berdasarkan tipe
    if (tipe === 'gambar' && !gambar) {
      console.log('POST /api/galeri - Validation failed: missing gambar for type gambar')
      return NextResponse.json({ error: 'Gambar wajib diisi untuk tipe gambar' }, { status: 400 })
    }

    if (tipe === 'video' && !video) {
      console.log('POST /api/galeri - Validation failed: missing video for type video')
      return NextResponse.json({ error: 'Video wajib diisi untuk tipe video' }, { status: 400 })
    }

    console.log('POST /api/galeri - Creating database record...')
    
    const galeriData = {
      judul: String(judul).trim(), 
      deskripsi: deskripsi ? String(deskripsi).trim() : null, 
      gambar: tipe === 'gambar' && gambar ? String(gambar) : null,
      video: tipe === 'video' && video ? String(video) : null,
      kategori: String(kategori).trim(), 
      tipe: String(tipe).trim()
    }
    
    console.log('POST /api/galeri - Data to create:', galeriData)

    // Validate tipe value
    if (!['gambar', 'video'].includes(galeriData.tipe)) {
      return NextResponse.json({ error: 'Tipe harus "gambar" atau "video"' }, { status: 400 })
    }

    // Try-catch specifically for Prisma operation
    let galeri
    try {
      galeri = await prisma.galeri.create({
        data: galeriData
      })
    } catch (prismaError) {
      console.error('POST /api/galeri - Prisma Error:', prismaError)
      
      // Check if it's a schema issue
      if (prismaError instanceof Error) {
        if (prismaError.message.includes('Unknown field')) {
          return NextResponse.json({ 
            error: 'Database schema error. Field tidak ditemukan di database.',
            details: prismaError.message
          }, { status: 500 })
        }
        
        if (prismaError.message.includes('Unique constraint')) {
          return NextResponse.json({ 
            error: 'Data sudah ada di database',
            details: prismaError.message
          }, { status: 400 })
        }
      }
      
      throw prismaError
    }

    console.log('POST /api/galeri - Success:', galeri)
    return NextResponse.json(galeri, { status: 201 })
    
  } catch (error) {
    console.error('POST /api/galeri - Unexpected Error:', error)
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('POST /api/galeri - Error message:', error.message)
      console.error('POST /api/galeri - Error stack:', error.stack)
    }
    
    // Always return JSON response
    return NextResponse.json({ 
      error: 'Gagal menambahkan item galeri',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    console.log('PUT request - ID:', id, 'Body:', body)

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    // Validate required fields
    if (!body.judul || !body.kategori || !body.tipe) {
      return NextResponse.json({ error: 'Judul, kategori, dan tipe wajib diisi' }, { status: 400 })
    }

    // Validasi panjang deskripsi
    if (body.deskripsi && body.deskripsi.length > 40) {
      return NextResponse.json({ error: 'Deskripsi tidak boleh lebih dari 40 karakter' }, { status: 400 })
    }

    // Validasi berdasarkan tipe
    if (body.tipe === 'gambar' && !body.gambar) {
      return NextResponse.json({ error: 'Gambar wajib diisi untuk tipe gambar' }, { status: 400 })
    }

    if (body.tipe === 'video' && !body.video) {
      return NextResponse.json({ error: 'Video wajib diisi untuk tipe video' }, { status: 400 })
    }

    // Check if record exists
    const existingGaleri = await prisma.galeri.findUnique({
      where: { id }
    })

    if (!existingGaleri) {
      return NextResponse.json({ error: 'Item galeri tidak ditemukan' }, { status: 404 })
    }

    const galeri = await prisma.galeri.update({
      where: { id },
      data: {
        judul: body.judul,
        deskripsi: body.deskripsi || null,
        gambar: body.tipe === 'gambar' ? body.gambar : null,
        video: body.tipe === 'video' ? body.video : null,
        kategori: body.kategori,
        tipe: body.tipe
      }
    })

    console.log('Updated galeri:', galeri)
    return NextResponse.json(galeri)
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ 
      error: 'Gagal mengupdate item galeri',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    await prisma.galeri.delete({ where: { id } })
    return NextResponse.json({ message: 'Foto berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus foto' }, { status: 500 })
  }
}
