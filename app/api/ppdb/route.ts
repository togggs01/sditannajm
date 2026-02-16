import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'
import { getDefaultGelombang, isDateInRange } from '@/lib/gelombangPPDB'


export async function GET(request: NextRequest) {
  try {
    console.log('PPDB API GET: Starting request')
    const { searchParams } = new URL(request.url)
    const tahunAjaran = searchParams.get('tahunAjaran')

    console.log('PPDB API GET: Tahun ajaran filter:', tahunAjaran)

    // Filter berdasarkan tahun ajaran jika ada
    const whereClause = tahunAjaran ? { tahunAjaran } : {}

    console.log('PPDB API GET: Where clause:', whereClause)

    try {
      const ppdb = await prisma.pPDB.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      })
      
      console.log('PPDB API GET: Found records:', ppdb.length)
      
      return NextResponse.json(ppdb)
    } catch (prismaError) {
      console.error('PPDB API GET: Prisma Error:', prismaError)
      
      // Return empty array if database error
      return NextResponse.json([])
    }
    
  } catch (error) {
    console.error('PPDB API GET Error:', error)
    return NextResponse.json({ error: 'Gagal mengambil data pendaftaran' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('PPDB API: Starting POST request')
    
    // Cek status pendaftaran terlebih dahulu
    const tahunAjaran = getCurrentTahunAjaran()
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set ke awal hari untuk perbandingan yang akurat
    
    console.log('PPDB API: Checking gelombang status for tahun ajaran:', tahunAjaran)
    
    const gelombangAktif = await prisma.gelombangPPDB.findFirst({
      where: {
        tahunAjaran,
        aktif: true
      }
    })

    console.log('PPDB API: Gelombang aktif:', gelombangAktif)

    if (!gelombangAktif) {
      return NextResponse.json({ 
        error: `Belum ada gelombang pendaftaran yang dibuka untuk tahun ajaran ${tahunAjaran}. Silakan hubungi sekolah untuk informasi lebih lanjut.` 
      }, { status: 400 })
    }

    // Hitung jumlah pendaftar saat ini
    const jumlahPendaftar = await prisma.pPDB.count({
      where: {
        tahunAjaran,
        gelombang: gelombangAktif.gelombang
      }
    })

    // Konversi tanggal untuk perbandingan yang akurat
    const tanggalMulai = new Date(gelombangAktif.tanggalMulai)
    const tanggalSelesai = new Date(gelombangAktif.tanggalSelesai)
    tanggalMulai.setHours(0, 0, 0, 0)
    tanggalSelesai.setHours(23, 59, 59, 999)

    // Logic pengecekan dengan prioritas yang jelas
    
    // 1. Cek kuota terlebih dahulu (prioritas tertinggi)
    if (gelombangAktif.kuota !== null && jumlahPendaftar >= gelombangAktif.kuota) {
      return NextResponse.json({ 
        error: `Maaf, kuota pendaftaran ${gelombangAktif.gelombang} sudah penuh (${gelombangAktif.kuota} siswa). Silakan tunggu pengumuman gelombang berikutnya.` 
      }, { status: 400 })
    }

    // 2. Cek apakah belum waktunya pendaftaran
    if (today < tanggalMulai) {
      return NextResponse.json({ 
        error: `Pendaftaran ${gelombangAktif.gelombang} akan dibuka pada ${tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. Silakan kembali pada tanggal tersebut.` 
      }, { status: 400 })
    }

    // 3. Cek apakah sudah lewat masa pendaftaran
    if (today > tanggalSelesai) {
      return NextResponse.json({ 
        error: `Pendaftaran ${gelombangAktif.gelombang} sudah ditutup pada ${tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. Silakan tunggu pengumuman gelombang berikutnya.` 
      }, { status: 400 })
    }

    console.log('PPDB API: Processing form data...')
    
    const formData = await request.formData()
    
    // STEP 1 - Data Calon Peserta Didik
    const namaLengkap = formData.get('namaLengkap') as string
    const namaPanggilan = formData.get('namaPanggilan') as string
    const jenisKelamin = formData.get('jenisKelamin') as string
    const tempatLahir = formData.get('tempatLahir') as string
    const tanggalLahir = formData.get('tanggalLahir') as string
    const agama = formData.get('agama') as string
    const kewarganegaraan = formData.get('kewarganegaraan') as string
    const bahasaSehari = formData.get('bahasaSehari') as string
    const bahasaLainnya = formData.get('bahasaLainnya') as string
    const jumlahSaudaraKandung = formData.get('jumlahSaudaraKandung') as string
    const jumlahSaudaraTiri = formData.get('jumlahSaudaraTiri') as string
    const jumlahSaudaraAngkat = formData.get('jumlahSaudaraAngkat') as string
    const tinggiBadan = formData.get('tinggiBadan') as string
    const beratBadan = formData.get('beratBadan') as string
    const golonganDarah = formData.get('golonganDarah') as string
    const penyakitPernah = formData.get('penyakitPernah') as string
    const kelainanFisik = formData.get('kelainanFisik') as string
    const alamatRumah = formData.get('alamatRumah') as string
    const nomorHandphone = formData.get('nomorHandphone') as string
    const jarakRumahSekolah = formData.get('jarakRumahSekolah') as string
    const masukKelas = formData.get('masukKelas') as string
    const asalSekolah = formData.get('asalSekolah') as string
    
    // STEP 2 - Data Orang Tua/Wali
    // Data Ayah
    const namaLengkapAyah = formData.get('namaLengkapAyah') as string
    const tempatTanggalLahirAyah = formData.get('tempatTanggalLahirAyah') as string
    const pendidikanTerakhirAyah = formData.get('pendidikanTerakhirAyah') as string
    const agamaAyah = formData.get('agamaAyah') as string
    const nomorHandphoneAyah = formData.get('nomorHandphoneAyah') as string
    const pekerjaanAyah = formData.get('pekerjaanAyah') as string
    const penghasilanAyah = formData.get('penghasilanAyah') as string
    
    // Data Ibu
    const namaLengkapIbu = formData.get('namaLengkapIbu') as string
    const tempatTanggalLahirIbu = formData.get('tempatTanggalLahirIbu') as string
    const pendidikanTerakhirIbu = formData.get('pendidikanTerakhirIbu') as string
    const agamaIbu = formData.get('agamaIbu') as string
    const nomorHandphoneIbu = formData.get('nomorHandphoneIbu') as string
    const pekerjaanIbu = formData.get('pekerjaanIbu') as string
    const penghasilanIbu = formData.get('penghasilanIbu') as string
    
    // STEP 3 - Upload Berkas
    const scanAktaKelahiran = formData.get('scanAktaKelahiran') as File
    const pasFoto = formData.get('pasFoto') as File
    const scanKTPAyah = formData.get('scanKTPAyah') as File
    const scanKTPIbu = formData.get('scanKTPIbu') as File
    const scanKartuKeluarga = formData.get('scanKartuKeluarga') as File

    // Validasi - hanya field yang benar-benar penting
    console.log('PPDB API: Validating required fields...')
    
    const requiredFields = {
      namaLengkap: !!namaLengkap,
      namaPanggilan: !!namaPanggilan,
      jenisKelamin: !!jenisKelamin,
      tempatLahir: !!tempatLahir,
      tanggalLahir: !!tanggalLahir,
      agama: !!agama,
      alamatRumah: !!alamatRumah,
      nomorHandphone: !!nomorHandphone,
      namaLengkapAyah: !!namaLengkapAyah,
      namaLengkapIbu: !!namaLengkapIbu
    }
    
    console.log('Required fields check:', requiredFields)
    
    // Validasi minimal - hanya field yang benar-benar wajib
    if (!namaLengkap || !namaPanggilan || !jenisKelamin || !tempatLahir || !tanggalLahir || 
        !agama || !alamatRumah || !nomorHandphone || !namaLengkapAyah || !namaLengkapIbu) {
      console.log('PPDB API: Validation failed - missing required fields')
      return NextResponse.json({ error: 'Field wajib belum lengkap' }, { status: 400 })
    }

    // Validasi umur minimal 6.5 tahun
    console.log('PPDB API: Validating age...')
    const birth = new Date(tanggalLahir)
    const cutoffDate = new Date(new Date().getFullYear(), 6, 1) // 1 Juli tahun ini
    const ageInYears = (cutoffDate.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    
    console.log('PPDB API: Age validation:', { birth, cutoffDate, ageInYears })
    
    if (ageInYears < 6.5) {
      console.log('PPDB API: Age validation failed')
      return NextResponse.json({ 
        error: `Calon siswa harus berusia minimal 6,5 tahun pada 1 Juli ${new Date().getFullYear()}. Usia saat ini: ${ageInYears.toFixed(1)} tahun` 
      }, { status: 400 })
    }

    console.log('PPDB API: Processing file uploads...')
    console.log('Files received:', {
      scanAktaKelahiran: !!scanAktaKelahiran,
      pasFoto: !!pasFoto,
      scanKTPAyah: !!scanKTPAyah,
      scanKTPIbu: !!scanKTPIbu,
      scanKartuKeluarga: !!scanKartuKeluarga
    })
    
    // Convert files to base64 for database storage
    let scanAktaKelahiranPath = ''
    let pasFotoPath = ''
    let scanKTPAyahPath = ''
    let scanKTPIbuPath = ''
    let scanKartuKeluargaPath = ''

    if (scanAktaKelahiran && scanAktaKelahiran.size > 0) {
      try {
        const bytes = await scanAktaKelahiran.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        scanAktaKelahiranPath = `data:${scanAktaKelahiran.type};base64,${base64}`
        console.log('PPDB API: Akta kelahiran converted to base64')
      } catch (uploadError) {
        console.error('PPDB API: Error converting akta kelahiran:', uploadError)
      }
    }

    if (pasFoto && pasFoto.size > 0) {
      try {
        const bytes = await pasFoto.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        pasFotoPath = `data:${pasFoto.type};base64,${base64}`
        console.log('PPDB API: Pas foto converted to base64')
      } catch (uploadError) {
        console.error('PPDB API: Error converting pas foto:', uploadError)
      }
    }

    if (scanKTPAyah && scanKTPAyah.size > 0) {
      try {
        const bytes = await scanKTPAyah.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        scanKTPAyahPath = `data:${scanKTPAyah.type};base64,${base64}`
        console.log('PPDB API: KTP Ayah converted to base64')
      } catch (uploadError) {
        console.error('PPDB API: Error converting KTP Ayah:', uploadError)
      }
    }

    if (scanKTPIbu && scanKTPIbu.size > 0) {
      try {
        const bytes = await scanKTPIbu.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        scanKTPIbuPath = `data:${scanKTPIbu.type};base64,${base64}`
        console.log('PPDB API: KTP Ibu converted to base64')
      } catch (uploadError) {
        console.error('PPDB API: Error converting KTP Ibu:', uploadError)
      }
    }

    if (scanKartuKeluarga && scanKartuKeluarga.size > 0) {
      try {
        const bytes = await scanKartuKeluarga.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        scanKartuKeluargaPath = `data:${scanKartuKeluarga.type};base64,${base64}`
        console.log('PPDB API: Kartu Keluarga converted to base64')
      } catch (uploadError) {
        console.error('PPDB API: Error converting Kartu Keluarga:', uploadError)
      }
    }

    const finalTahunAjaran = getCurrentTahunAjaran()
    
    // Ambil gelombang dari setting atau gunakan default
    let gelombang = getDefaultGelombang()
    if (gelombangAktif) {
      gelombang = gelombangAktif.gelombang
    }

    console.log('PPDB API: Creating database record...')
    
    try {
      const ppdb = await prisma.pPDB.create({
        data: {
          // STEP 1 - Data Calon Peserta Didik
          namaLengkap,
          namaPanggilan,
          jenisKelamin,
          tempatLahir,
          tanggalLahir,
          agama,
          kewarganegaraan: kewarganegaraan || 'Indonesia',
          bahasaSehari: bahasaSehari || '["Indonesia"]',
          bahasaLainnya: bahasaLainnya || null,
          jumlahSaudaraKandung: jumlahSaudaraKandung ? parseInt(jumlahSaudaraKandung) : null,
          jumlahSaudaraTiri: jumlahSaudaraTiri ? parseInt(jumlahSaudaraTiri) : null,
          jumlahSaudaraAngkat: jumlahSaudaraAngkat ? parseInt(jumlahSaudaraAngkat) : null,
          tinggiBadan: tinggiBadan ? parseInt(tinggiBadan) : null,
          beratBadan: beratBadan ? parseInt(beratBadan) : null,
          golonganDarah: golonganDarah || null,
          penyakitPernah: penyakitPernah || null,
          kelainanFisik: kelainanFisik || null,
          alamatRumah,
          nomorHandphone,
          jarakRumahSekolah: jarakRumahSekolah || '1 km',
          masukKelas: masukKelas || '1',
          asalSekolah: asalSekolah || 'Tidak Diisi',
          
          // STEP 2 - Data Orang Tua/Wali
          namaLengkapAyah,
          tempatTanggalLahirAyah: tempatTanggalLahirAyah || 'Tidak Diisi',
          pendidikanTerakhirAyah: pendidikanTerakhirAyah || 'SMA/SMK',
          agamaAyah: agamaAyah || 'Islam',
          nomorHandphoneAyah: nomorHandphoneAyah || nomorHandphone,
          pekerjaanAyah: pekerjaanAyah || 'Tidak Diisi',
          penghasilanAyah: penghasilanAyah || '0',
          namaLengkapIbu,
          tempatTanggalLahirIbu: tempatTanggalLahirIbu || 'Tidak Diisi',
          pendidikanTerakhirIbu: pendidikanTerakhirIbu || 'SMA/SMK',
          agamaIbu: agamaIbu || 'Islam',
          nomorHandphoneIbu: nomorHandphoneIbu || nomorHandphone,
          pekerjaanIbu: pekerjaanIbu || 'Tidak Diisi',
          penghasilanIbu: penghasilanIbu || '0',
          
          // STEP 3 - Upload Berkas
          scanAktaKelahiran: scanAktaKelahiranPath || null,
          pasFoto: pasFotoPath || null,
          scanKTPAyah: scanKTPAyahPath || null,
          scanKTPIbu: scanKTPIbuPath || null,
          scanKartuKeluarga: scanKartuKeluargaPath || null,
          
          // System fields
          tahunAjaran: finalTahunAjaran,
          gelombang,
          status: 'pending'
        }
      })

      console.log('PPDB API: Record created successfully:', ppdb.id)
      
      return NextResponse.json({
        success: true,
        message: 'Pendaftaran berhasil disimpan',
        data: ppdb
      }, { status: 201 })
      
    } catch (prismaError) {
      console.error('PPDB API: Prisma Error:', prismaError)
      
      return NextResponse.json({ 
        error: 'Gagal menyimpan ke database',
        details: prismaError instanceof Error ? prismaError.message : 'Database error',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  } catch (error) {
    console.error('PPDB API Error:', error)
    
    // Pastikan error response selalu valid JSON
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json({ 
      error: 'Gagal menyimpan pendaftaran',
      details: errorMessage,
      timestamp: new Date().toISOString()
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

    const ppdb = await prisma.pPDB.update({
      where: { id },
      data: body
    })

    return NextResponse.json(ppdb)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    await prisma.pPDB.delete({ where: { id } })
    return NextResponse.json({ message: 'Data pendaftaran berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 })
  }
}
