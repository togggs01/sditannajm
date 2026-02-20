import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tahunAjaran = searchParams.get('tahunAjaran')
    
    const ppdb = await prisma.pPDB.findMany({
      where: tahunAjaran ? { tahunAjaran } : {},
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(ppdb)
  } catch (error) {
    console.error('Error fetching ppdb:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('PPDB POST - Starting...')
    
    // Parse FormData
    const formData = await request.formData()
    
    console.log('PPDB POST - FormData received')
    
    // Get active gelombang
    const gelombangAktif = await prisma.gelombangPPDB.findFirst({
      where: {
        aktif: true
      }
    })
    
    if (!gelombangAktif) {
      return NextResponse.json({ 
        error: 'Tidak ada gelombang pendaftaran yang aktif' 
      }, { status: 400 })
    }
    
    console.log('PPDB POST - Active gelombang:', gelombangAktif.gelombang, gelombangAktif.tahunAjaran)
    
    // Check if registration is open
    const now = new Date()
    const startDate = new Date(gelombangAktif.tanggalMulai)
    const endDate = new Date(gelombangAktif.tanggalSelesai)
    
    if (now < startDate) {
      return NextResponse.json({ 
        error: 'Pendaftaran belum dibuka' 
      }, { status: 400 })
    }
    
    if (now > endDate) {
      return NextResponse.json({ 
        error: 'Pendaftaran sudah ditutup' 
      }, { status: 400 })
    }
    
    // Check quota if exists
    if (gelombangAktif.kuota !== null) {
      const count = await prisma.pPDB.count({
        where: {
          tahunAjaran: gelombangAktif.tahunAjaran,
          gelombang: gelombangAktif.gelombang
        }
      })
      
      if (count >= gelombangAktif.kuota) {
        return NextResponse.json({ 
          error: 'Kuota pendaftaran sudah penuh' 
        }, { status: 400 })
      }
    }
    
    // Convert files to base64
    const convertFileToBase64 = async (file: File | null): Promise<string | null> => {
      if (!file) return null
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      return `data:${file.type};base64,${base64}`
    }
    
    // Process file uploads
    const scanAktaKelahiran = await convertFileToBase64(formData.get('scanAktaKelahiran') as File)
    const pasFoto = await convertFileToBase64(formData.get('pasFoto') as File)
    const scanKTPAyah = await convertFileToBase64(formData.get('scanKTPAyah') as File)
    const scanKTPIbu = await convertFileToBase64(formData.get('scanKTPIbu') as File)
    const scanKartuKeluarga = await convertFileToBase64(formData.get('scanKartuKeluarga') as File)
    
    console.log('PPDB POST - Files processed')
    
    // Parse bahasa sehari (JSON string)
    const bahasaSehariStr = formData.get('bahasaSehari') as string
    const bahasaSehari = bahasaSehariStr ? JSON.parse(bahasaSehariStr).join(', ') : ''
    
    // Create PPDB with tahunAjaran and gelombang from active gelombang
    const ppdb = await prisma.pPDB.create({
      data: {
        // Step 1 - Data Calon Peserta Didik
        namaLengkap: formData.get('namaLengkap') as string,
        namaPanggilan: formData.get('namaPanggilan') as string,
        jenisKelamin: formData.get('jenisKelamin') as string,
        tempatLahir: formData.get('tempatLahir') as string,
        tanggalLahir: formData.get('tanggalLahir') as string,
        agama: formData.get('agama') as string,
        kewarganegaraan: formData.get('kewarganegaraan') as string,
        bahasaSehari: bahasaSehari,
        bahasaLainnya: formData.get('bahasaLainnya') as string || '',
        jumlahSaudaraKandung: parseInt(formData.get('jumlahSaudaraKandung') as string) || 0,
        jumlahSaudaraTiri: parseInt(formData.get('jumlahSaudaraTiri') as string) || 0,
        jumlahSaudaraAngkat: parseInt(formData.get('jumlahSaudaraAngkat') as string) || 0,
        tinggiBadan: parseInt(formData.get('tinggiBadan') as string) || null,
        beratBadan: parseInt(formData.get('beratBadan') as string) || null,
        golonganDarah: formData.get('golonganDarah') as string || '',
        penyakitPernah: formData.get('penyakitPernah') as string || '',
        kelainanFisik: formData.get('kelainanFisik') as string || '',
        alamatRumah: formData.get('alamatRumah') as string,
        nomorHandphone: formData.get('nomorHandphone') as string,
        jarakRumahSekolah: formData.get('jarakRumahSekolah') as string,
        masukKelas: formData.get('masukKelas') as string,
        asalSekolah: formData.get('asalSekolah') as string,
        
        // Step 2 - Data Orang Tua/Wali
        namaLengkapAyah: formData.get('namaLengkapAyah') as string,
        tempatTanggalLahirAyah: formData.get('tempatTanggalLahirAyah') as string,
        pendidikanTerakhirAyah: formData.get('pendidikanTerakhirAyah') as string,
        agamaAyah: formData.get('agamaAyah') as string,
        nomorHandphoneAyah: formData.get('nomorHandphoneAyah') as string,
        pekerjaanAyah: formData.get('pekerjaanAyah') as string,
        penghasilanAyah: formData.get('penghasilanAyah') as string,
        namaLengkapIbu: formData.get('namaLengkapIbu') as string,
        tempatTanggalLahirIbu: formData.get('tempatTanggalLahirIbu') as string,
        pendidikanTerakhirIbu: formData.get('pendidikanTerakhirIbu') as string,
        agamaIbu: formData.get('agamaIbu') as string,
        nomorHandphoneIbu: formData.get('nomorHandphoneIbu') as string,
        pekerjaanIbu: formData.get('pekerjaanIbu') as string,
        penghasilanIbu: formData.get('penghasilanIbu') as string,
        
        // Step 3 - Upload Berkas
        scanAktaKelahiran: scanAktaKelahiran,
        pasFoto: pasFoto,
        scanKTPAyah: scanKTPAyah,
        scanKTPIbu: scanKTPIbu,
        scanKartuKeluarga: scanKartuKeluarga,
        
        // Auto-filled
        tahunAjaran: gelombangAktif.tahunAjaran,
        gelombang: gelombangAktif.gelombang,
        status: 'pending'
      }
    })
    
    console.log('PPDB POST - Created successfully:', ppdb.id)
    
    return NextResponse.json(ppdb, { status: 201 })
  } catch (error) {
    console.error('Error creating ppdb:', error)
    return NextResponse.json({ 
      error: 'Failed to create',
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

    const ppdb = await prisma.pPDB.update({
      where: { id },
      data: body
    })
    return NextResponse.json(ppdb)
  } catch (error) {
    console.error('Error updating ppdb:', error)
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

    await prisma.pPDB.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting ppdb:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
