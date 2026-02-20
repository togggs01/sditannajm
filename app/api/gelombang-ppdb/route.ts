import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tahunAjaran = searchParams.get('tahunAjaran')
    const checkStatus = searchParams.get('checkStatus')
    
    // Check registration status
    if (checkStatus === 'true') {
      const gelombangAktif = await prisma.gelombangPPDB.findFirst({
        where: { aktif: true }
      })
      
      if (!gelombangAktif) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif: null,
          message: 'Belum ada gelombang pendaftaran yang aktif. Silakan hubungi admin sekolah untuk informasi lebih lanjut.',
          kuotaInfo: null,
          reason: 'NO_ACTIVE_WAVE'
        })
      }
      
      const now = new Date()
      const startDate = new Date(gelombangAktif.tanggalMulai)
      const endDate = new Date(gelombangAktif.tanggalSelesai)
      
      // Check if registration period has started
      if (now < startDate) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Pendaftaran ${gelombangAktif.gelombang} akan dibuka pada ${startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          kuotaInfo: null,
          reason: 'NOT_YET_STARTED'
        })
      }
      
      // Check if registration period has ended
      if (now > endDate) {
        return NextResponse.json({
          isOpen: false,
          gelombangAktif,
          message: `Pendaftaran ${gelombangAktif.gelombang} telah ditutup pada ${endDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          kuotaInfo: null,
          reason: 'REGISTRATION_CLOSED'
        })
      }
      
      // Check quota
      let kuotaInfo = null
      if (gelombangAktif.kuota !== null) {
        const count = await prisma.pPDB.count({
          where: {
            tahunAjaran: gelombangAktif.tahunAjaran,
            gelombang: gelombangAktif.gelombang
          }
        })
        
        const sisa = gelombangAktif.kuota - count
        const penuh = sisa <= 0
        
        kuotaInfo = {
          total: gelombangAktif.kuota,
          terisi: count,
          sisa: Math.max(0, sisa),
          penuh
        }
        
        if (penuh) {
          return NextResponse.json({
            isOpen: false,
            gelombangAktif,
            message: `Kuota pendaftaran ${gelombangAktif.gelombang} sudah penuh (${count}/${gelombangAktif.kuota} pendaftar)`,
            kuotaInfo,
            reason: 'QUOTA_FULL'
          })
        }
      }
      
      // Registration is open
      return NextResponse.json({
        isOpen: true,
        gelombangAktif,
        message: `Pendaftaran ${gelombangAktif.gelombang} sedang dibuka`,
        kuotaInfo,
        reason: 'OPEN'
      })
    }
    
    // Regular GET - list all gelombang
    const gelombang = await prisma.gelombangPPDB.findMany({
      where: tahunAjaran ? { tahunAjaran } : {},
      orderBy: [
        { tahunAjaran: 'desc' },
        { tanggalMulai: 'asc' }
      ]
    })
    
    // Add jumlah pendaftar and sisa kuota for each gelombang
    const gelombangWithStats = await Promise.all(
      gelombang.map(async (g) => {
        const jumlahPendaftar = await prisma.pPDB.count({
          where: {
            tahunAjaran: g.tahunAjaran,
            gelombang: g.gelombang
          }
        })
        
        const sisaKuota = g.kuota !== null ? Math.max(0, g.kuota - jumlahPendaftar) : null
        
        return {
          ...g,
          jumlahPendaftar,
          sisaKuota
        }
      })
    )
    
    return NextResponse.json(gelombangWithStats)
  } catch (error) {
    console.error('Error fetching gelombang:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/gelombang-ppdb - Starting...')
    
    const body = await request.json()
    console.log('POST /api/gelombang-ppdb - Body:', body)
    
    // Validate required fields
    if (!body.tahunAjaran || !body.gelombang || !body.tanggalMulai || !body.tanggalSelesai) {
      console.error('POST /api/gelombang-ppdb - Missing required fields')
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: {
          tahunAjaran: !body.tahunAjaran ? 'required' : 'ok',
          gelombang: !body.gelombang ? 'required' : 'ok',
          tanggalMulai: !body.tanggalMulai ? 'required' : 'ok',
          tanggalSelesai: !body.tanggalSelesai ? 'required' : 'ok'
        }
      }, { status: 400 })
    }
    
    console.log('POST /api/gelombang-ppdb - Creating gelombang...')
    
    const gelombang = await prisma.gelombangPPDB.create({
      data: {
        tahunAjaran: body.tahunAjaran,
        gelombang: body.gelombang,
        tanggalMulai: body.tanggalMulai,
        tanggalSelesai: body.tanggalSelesai,
        kuota: body.kuota ? parseInt(body.kuota) : null,
        aktif: body.aktif !== false
      }
    })
    
    console.log('POST /api/gelombang-ppdb - Success:', gelombang.id)
    
    return NextResponse.json(gelombang, { status: 201 })
  } catch (error) {
    console.error('POST /api/gelombang-ppdb - Error:', error)
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

    const gelombang = await prisma.gelombangPPDB.update({
      where: { id },
      data: {
        tahunAjaran: body.tahunAjaran,
        gelombang: body.gelombang,
        tanggalMulai: body.tanggalMulai,
        tanggalSelesai: body.tanggalSelesai,
        kuota: body.kuota ? parseInt(body.kuota) : null,
        aktif: body.aktif
      }
    })
    return NextResponse.json(gelombang)
  } catch (error) {
    console.error('Error updating gelombang:', error)
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

    await prisma.gelombangPPDB.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gelombang:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
