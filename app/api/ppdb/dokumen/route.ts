import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type') // akta, foto, ktp_ayah, ktp_ibu, kk
    
    if (!id || !type) {
      return NextResponse.json({ error: 'ID dan type wajib diisi' }, { status: 400 })
    }

    const ppdb = await prisma.pPDB.findUnique({
      where: { id },
      select: {
        scanAktaKelahiran: true,
        pasFoto: true,
        scanKTPAyah: true,
        scanKTPIbu: true,
        scanKartuKeluarga: true
      }
    })

    if (!ppdb) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 })
    }

    let dokumen = ''
    switch (type) {
      case 'akta':
        dokumen = ppdb.scanAktaKelahiran || ''
        break
      case 'foto':
        dokumen = ppdb.pasFoto || ''
        break
      case 'ktp_ayah':
        dokumen = ppdb.scanKTPAyah || ''
        break
      case 'ktp_ibu':
        dokumen = ppdb.scanKTPIbu || ''
        break
      case 'kk':
        dokumen = ppdb.scanKartuKeluarga || ''
        break
      default:
        return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 })
    }

    if (!dokumen) {
      return NextResponse.json({ error: 'Dokumen tidak ada' }, { status: 404 })
    }

    // Return HTML page with image
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Dokumen PPDB</title>
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            background: #f0f0f0; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
          }
          img { 
            max-width: 100%; 
            height: auto; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
            background: white; 
          }
        </style>
      </head>
      <body>
        <img src="${dokumen}" alt="Dokumen PPDB" />
      </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  } catch (error) {
    console.error('Error serving dokumen:', error)
    return NextResponse.json({ error: 'Gagal mengambil dokumen' }, { status: 500 })
  }
}
