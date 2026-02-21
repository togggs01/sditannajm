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
    
    console.log('POST /api/guru - Body received:', {
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
    
    // Validate foto size (max 5MB in base64)
    if (body.foto && body.foto.length > 7000000) {
      console.error('POST /api/guru - Foto too large:', body.foto.length)
      return NextResponse.json({ 
        error: 'Foto terlalu besar',
        message: 'Ukuran foto maksimal 5MB'
      }, { status: 400 })
    }
    
    console.log('POST /api/guru - Testing database connection...')
    
    // Test database connection with retry
    let connectionRetries = 3
    let connectionOk = false
    
    while (connectionRetries > 0 && !connectionOk) {
      try {
        await prisma.$queryRaw`SELECT 1`
        connectionOk = true
        console.log('POST /api/guru - Database connection OK')
      } catch (dbError) {
        connectionRetries--
        console.error(`POST /api/guru - Database connection attempt failed (${connectionRetries} retries left):`, dbError)
        
        if (connectionRetries === 0) {
          return NextResponse.json({ 
            error: 'Database connection failed',
            message: 'Tidak dapat terhubung ke database. Pastikan koneksi internet stabil dan database server aktif.'
          }, { status: 503 })
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log('POST /api/guru - Creating guru in database...')
    
    // Create guru with timeout protection
    const guru = await Promise.race([
      prisma.guru.create({
        data: {
          nama: body.nama,
          nip: body.nip || null,
          jabatan: body.jabatan,
          foto: body.foto || null,
          email: body.email || null,
          telepon: body.telepon || null
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 15000)
      )
    ]) as any
    
    console.log('POST /api/guru - Success:', guru.id)
    
    return NextResponse.json(guru, { status: 201 })
  } catch (error) {
    console.error('POST /api/guru - Error:', error)
    
    // Better error handling
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return NextResponse.json({ 
          error: 'Database timeout',
          message: 'Koneksi database timeout, coba lagi'
        }, { status: 504 })
      }
      
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json({ 
          error: 'Duplicate entry',
          message: 'NIP sudah terdaftar'
        }, { status: 409 })
      }
      
      if (error.message.includes('Query Engine')) {
        return NextResponse.json({ 
          error: 'Database engine error',
          message: 'Prisma Client belum di-generate dengan benar. Jalankan: npx prisma generate'
        }, { status: 500 })
      }
      
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json({ 
          error: 'Connection refused',
          message: 'Tidak dapat terhubung ke database server. Periksa koneksi internet atau hubungi administrator.'
        }, { status: 503 })
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to create',
      message: error instanceof Error ? error.message : 'Unknown error'
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
