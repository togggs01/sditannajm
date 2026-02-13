'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'

interface FormData {
  // STEP 1 - Data Calon Peserta Didik
  namaLengkap: string
  namaPanggilan: string
  jenisKelamin: string
  tempatLahir: string
  tanggalLahir: string
  agama: string
  kewarganegaraan: string
  bahasaSehari: string[]
  bahasaLainnya: string
  jumlahSaudaraKandung: string
  jumlahSaudaraTiri: string
  jumlahSaudaraAngkat: string
  tinggiBadan: string
  beratBadan: string
  golonganDarah: string
  penyakitPernah: string
  kelainanFisik: string
  alamatRumah: string
  nomorHandphone: string
  jarakRumahSekolah: string
  masukKelas: string
  asalSekolah: string
  
  // STEP 2 - Data Orang Tua/Wali
  // Data Ayah
  namaLengkapAyah: string
  tempatTanggalLahirAyah: string
  pendidikanTerakhirAyah: string
  agamaAyah: string
  nomorHandphoneAyah: string
  pekerjaanAyah: string
  penghasilanAyah: string
  
  // Data Ibu
  namaLengkapIbu: string
  tempatTanggalLahirIbu: string
  pendidikanTerakhirIbu: string
  agamaIbu: string
  nomorHandphoneIbu: string
  pekerjaanIbu: string
  penghasilanIbu: string
  
  // STEP 3 - Upload Berkas
  scanAktaKelahiran: File | null
  pasFoto: File | null
  scanKTPAyah: File | null
  scanKTPIbu: File | null
  scanKartuKeluarga: File | null
}

interface KuotaInfo {
  total: number
  terisi: number
  sisa: number
  penuh: boolean
}

interface PendaftaranStatus {
  isOpen: boolean
  gelombangAktif: any
  message: string
  kuotaInfo: KuotaInfo | null
  reason?: 'NO_ACTIVE_WAVE' | 'QUOTA_FULL' | 'NOT_YET_STARTED' | 'REGISTRATION_CLOSED' | 'OPEN'
}

export default function PPDBPage() {
  const router = useRouter()
  const [tahunAjaran, setTahunAjaran] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [pendaftaranStatus, setPendaftaranStatus] = useState<PendaftaranStatus | null>(null)
  const [message, setMessage] = useState('')
  const [ageError, setAgeError] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Helper function untuk format angka dengan titik pemisah ribuan
  const formatNumber = (value: string) => {
    // Hapus semua karakter non-digit
    const numbers = value.replace(/\D/g, '')
    // Format dengan titik pemisah ribuan
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  // Helper function untuk mendapatkan nilai asli tanpa titik
  const getUnformattedValue = (value: string) => {
    return value.replace(/\./g, '')
  }
  
  const [formData, setFormData] = useState<FormData>({
    // STEP 1 - Data Calon Peserta Didik
    namaLengkap: '',
    namaPanggilan: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    agama: '',
    kewarganegaraan: 'Indonesia',
    bahasaSehari: [],
    bahasaLainnya: '',
    jumlahSaudaraKandung: '',
    jumlahSaudaraTiri: '',
    jumlahSaudaraAngkat: '',
    tinggiBadan: '',
    beratBadan: '',
    golonganDarah: '',
    penyakitPernah: '',
    kelainanFisik: '',
    alamatRumah: '',
    nomorHandphone: '',
    jarakRumahSekolah: '',
    masukKelas: '1',
    asalSekolah: '',
    
    // STEP 2 - Data Orang Tua/Wali
    // Data Ayah
    namaLengkapAyah: '',
    tempatTanggalLahirAyah: '',
    pendidikanTerakhirAyah: '',
    agamaAyah: '',
    nomorHandphoneAyah: '',
    pekerjaanAyah: '',
    penghasilanAyah: '',
    
    // Data Ibu
    namaLengkapIbu: '',
    tempatTanggalLahirIbu: '',
    pendidikanTerakhirIbu: '',
    agamaIbu: '',
    nomorHandphoneIbu: '',
    pekerjaanIbu: '',
    penghasilanIbu: '',
    
    // STEP 3 - Upload Berkas
    scanAktaKelahiran: null,
    pasFoto: null,
    scanKTPAyah: null,
    scanKTPIbu: null,
    scanKartuKeluarga: null
  })

  useEffect(() => {
    setTahunAjaran(getCurrentTahunAjaran())
    checkPendaftaranStatus()
  }, [])

  const checkPendaftaranStatus = async () => {
    try {
      const res = await fetch('/api/gelombang-ppdb?checkStatus=true')
      const data = await res.json()
      setPendaftaranStatus(data)
    } catch (error) {
      console.error('Error checking status:', error)
    } finally {
      setCheckingStatus(false)
    }
  }

  // Validasi umur minimal 6.5 tahun
  const validateAge = (birthDate: string): boolean => {
    if (!birthDate) return false
    
    const birth = new Date(birthDate)
    const cutoffDate = new Date(new Date().getFullYear(), 6, 1) // 1 Juli tahun ini
    const ageInYears = (cutoffDate.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    
    if (ageInYears < 6.5) {
      setAgeError(`Maaf, calon siswa harus berusia minimal 6,5 tahun pada 1 Juli ${new Date().getFullYear()}. Usia saat ini: ${ageInYears.toFixed(1)} tahun`)
      return false
    }
    
    setAgeError('')
    return true
  }

  const handleDateChange = (date: string) => {
    setFormData({...formData, tanggalLahir: date})
    validateAge(date)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'scanAktaKelahiran' | 'pasFoto' | 'scanKTPAyah' | 'scanKTPIbu' | 'scanKartuKeluarga') => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB')
        return
      }
      if (!file.type.includes('image/jpeg') && !file.type.includes('image/jpg')) {
        alert('Format file harus .jpg')
        return
      }
      setFormData({...formData, [field]: file})
    }
  }

  const handleBahasaChange = (bahasa: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, bahasaSehari: [...formData.bahasaSehari, bahasa]})
    } else {
      setFormData({...formData, bahasaSehari: formData.bahasaSehari.filter(b => b !== bahasa)})
    }
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validasi step 1
      if (!formData.namaLengkap || !formData.namaPanggilan || !formData.jenisKelamin || 
          !formData.tempatLahir || !formData.tanggalLahir || !formData.agama || 
          !formData.kewarganegaraan || !formData.alamatRumah || !formData.nomorHandphone ||
          !formData.jarakRumahSekolah || !formData.masukKelas) {
        alert('Mohon lengkapi semua field yang wajib diisi (*)')
        return
      }
      if (!validateAge(formData.tanggalLahir)) {
        return
      }
    } else if (currentStep === 2) {
      // Validasi step 2
      if (!formData.namaLengkapAyah || !formData.tempatTanggalLahirAyah || 
          !formData.pendidikanTerakhirAyah || !formData.agamaAyah || 
          !formData.nomorHandphoneAyah || !formData.pekerjaanAyah || 
          !formData.penghasilanAyah || !formData.namaLengkapIbu || 
          !formData.tempatTanggalLahirIbu || !formData.pendidikanTerakhirIbu || 
          !formData.agamaIbu || !formData.nomorHandphoneIbu || 
          !formData.pekerjaanIbu || !formData.penghasilanIbu) {
        alert('Mohon lengkapi semua data orang tua yang wajib diisi (*)')
        return
      }
    }
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Starting form submission...')
    
    // Validasi step 3
    if (!formData.scanAktaKelahiran || !formData.pasFoto || !formData.scanKTPAyah || 
        !formData.scanKTPIbu || !formData.scanKartuKeluarga) {
      alert('Mohon upload semua dokumen yang diperlukan')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const submitData = new FormData()
      
      console.log('Preparing form data...')
      
      // STEP 1 - Data Calon Peserta Didik
      submitData.append('namaLengkap', formData.namaLengkap)
      submitData.append('namaPanggilan', formData.namaPanggilan)
      submitData.append('jenisKelamin', formData.jenisKelamin)
      submitData.append('tempatLahir', formData.tempatLahir)
      submitData.append('tanggalLahir', formData.tanggalLahir)
      submitData.append('agama', formData.agama)
      submitData.append('kewarganegaraan', formData.kewarganegaraan)
      submitData.append('bahasaSehari', JSON.stringify(formData.bahasaSehari))
      submitData.append('bahasaLainnya', formData.bahasaLainnya || '')
      submitData.append('jumlahSaudaraKandung', formData.jumlahSaudaraKandung || '0')
      submitData.append('jumlahSaudaraTiri', formData.jumlahSaudaraTiri || '0')
      submitData.append('jumlahSaudaraAngkat', formData.jumlahSaudaraAngkat || '0')
      submitData.append('tinggiBadan', formData.tinggiBadan || '')
      submitData.append('beratBadan', formData.beratBadan || '')
      submitData.append('golonganDarah', formData.golonganDarah || '')
      submitData.append('penyakitPernah', formData.penyakitPernah || '')
      submitData.append('kelainanFisik', formData.kelainanFisik || '')
      submitData.append('alamatRumah', formData.alamatRumah)
      submitData.append('nomorHandphone', formData.nomorHandphone)
      submitData.append('jarakRumahSekolah', formData.jarakRumahSekolah)
      submitData.append('masukKelas', formData.masukKelas)
      submitData.append('asalSekolah', formData.asalSekolah)
      
      // STEP 2 - Data Orang Tua/Wali
      submitData.append('namaLengkapAyah', formData.namaLengkapAyah)
      submitData.append('tempatTanggalLahirAyah', formData.tempatTanggalLahirAyah)
      submitData.append('pendidikanTerakhirAyah', formData.pendidikanTerakhirAyah)
      submitData.append('agamaAyah', formData.agamaAyah)
      submitData.append('nomorHandphoneAyah', formData.nomorHandphoneAyah)
      submitData.append('pekerjaanAyah', formData.pekerjaanAyah)
      submitData.append('penghasilanAyah', formData.penghasilanAyah)
      submitData.append('namaLengkapIbu', formData.namaLengkapIbu)
      submitData.append('tempatTanggalLahirIbu', formData.tempatTanggalLahirIbu)
      submitData.append('pendidikanTerakhirIbu', formData.pendidikanTerakhirIbu)
      submitData.append('agamaIbu', formData.agamaIbu)
      submitData.append('nomorHandphoneIbu', formData.nomorHandphoneIbu)
      submitData.append('pekerjaanIbu', formData.pekerjaanIbu)
      submitData.append('penghasilanIbu', formData.penghasilanIbu)
      
      // STEP 3 - Upload Berkas
      submitData.append('scanAktaKelahiran', formData.scanAktaKelahiran)
      submitData.append('pasFoto', formData.pasFoto)
      submitData.append('scanKTPAyah', formData.scanKTPAyah)
      submitData.append('scanKTPIbu', formData.scanKTPIbu)
      submitData.append('scanKartuKeluarga', formData.scanKartuKeluarga)

      console.log('Sending request to API...')
      
      const res = await fetch('/api/ppdb', {
        method: 'POST',
        body: submitData
      })

      console.log('Response status:', res.status)
      
      let data
      try {
        const responseText = await res.text()
        console.log('Raw response:', responseText)
        
        if (responseText) {
          data = JSON.parse(responseText)
        } else {
          data = { error: 'Empty response from server' }
        }
        console.log('Response data:', data)
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError)
        data = { error: 'Invalid response from server' }
      }

      if (res.ok) {
        // Tampilkan popup success
        setShowSuccessModal(true)
        // Reset form
        setFormData({
          namaLengkap: '',
          namaPanggilan: '',
          jenisKelamin: '',
          tempatLahir: '',
          tanggalLahir: '',
          agama: '',
          kewarganegaraan: 'Indonesia',
          bahasaSehari: [],
          bahasaLainnya: '',
          jumlahSaudaraKandung: '',
          jumlahSaudaraTiri: '',
          jumlahSaudaraAngkat: '',
          tinggiBadan: '',
          beratBadan: '',
          golonganDarah: '',
          penyakitPernah: '',
          kelainanFisik: '',
          alamatRumah: '',
          nomorHandphone: '',
          jarakRumahSekolah: '',
          masukKelas: '1',
          asalSekolah: '',
          namaLengkapAyah: '',
          tempatTanggalLahirAyah: '',
          pendidikanTerakhirAyah: '',
          agamaAyah: '',
          nomorHandphoneAyah: '',
          pekerjaanAyah: '',
          penghasilanAyah: '',
          namaLengkapIbu: '',
          tempatTanggalLahirIbu: '',
          pendidikanTerakhirIbu: '',
          agamaIbu: '',
          nomorHandphoneIbu: '',
          pekerjaanIbu: '',
          penghasilanIbu: '',
          scanAktaKelahiran: null,
          pasFoto: null,
          scanKTPAyah: null,
          scanKTPIbu: null,
          scanKartuKeluarga: null
        })
        setCurrentStep(1)
      } else {
        console.error('API Error:', data)
        setMessage(data.error || 'Terjadi kesalahan')
      }
    } catch (error) {
      console.error('Submit Error:', error)
      setMessage('Terjadi kesalahan saat mengirim data: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-yellow-50/50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Pendaftaran Siswa Baru</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Bergabunglah bersama kami untuk masa depan yang lebih cerah dan berakhlak mulia
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">
        {checkingStatus ? (
          <Card className="border-t-4 border-[#d4af37]">
            <div className="text-center py-12">
              <svg className="animate-spin h-12 w-12 text-[#2d5016] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Memeriksa status pendaftaran...</p>
            </div>
          </Card>
        ) : !pendaftaranStatus?.isOpen ? (
          <Card className="border-t-4 border-red-500">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              {/* Dynamic title based on reason */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {pendaftaranStatus?.reason === 'QUOTA_FULL' && 'Kuota Pendaftaran Penuh'}
                {pendaftaranStatus?.reason === 'NOT_YET_STARTED' && 'Pendaftaran Belum Dibuka'}
                {pendaftaranStatus?.reason === 'REGISTRATION_CLOSED' && 'Pendaftaran Sudah Ditutup'}
                {pendaftaranStatus?.reason === 'NO_ACTIVE_WAVE' && 'Belum Ada Gelombang Aktif'}
                {!pendaftaranStatus?.reason && 'Pendaftaran Belum Dibuka'}
              </h2>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{pendaftaranStatus?.message}</p>
              
              {pendaftaranStatus?.gelombangAktif && (
                <div className={`border-2 rounded-xl p-6 max-w-md mx-auto mb-6 ${
                  pendaftaranStatus.reason === 'QUOTA_FULL'
                    ? 'bg-red-50 border-red-200' 
                    : pendaftaranStatus.reason === 'NOT_YET_STARTED'
                    ? 'bg-blue-50 border-blue-200'
                    : pendaftaranStatus.reason === 'REGISTRATION_CLOSED'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className={`text-sm font-semibold mb-2 ${
                    pendaftaranStatus.reason === 'QUOTA_FULL'
                      ? 'text-red-900' 
                      : pendaftaranStatus.reason === 'NOT_YET_STARTED'
                      ? 'text-blue-900'
                      : pendaftaranStatus.reason === 'REGISTRATION_CLOSED'
                      ? 'text-gray-900'
                      : 'text-yellow-900'
                  }`}>
                    {pendaftaranStatus.reason === 'QUOTA_FULL' && '⚠️ Kuota Penuh'}
                    {pendaftaranStatus.reason === 'NOT_YET_STARTED' && '⏰ Belum Dimulai'}
                    {pendaftaranStatus.reason === 'REGISTRATION_CLOSED' && '🔒 Sudah Ditutup'}
                    {!pendaftaranStatus.reason && '📅 Informasi Pendaftaran'}
                  </p>
                  <p className={`font-medium ${
                    pendaftaranStatus.reason === 'QUOTA_FULL'
                      ? 'text-red-800' 
                      : pendaftaranStatus.reason === 'NOT_YET_STARTED'
                      ? 'text-blue-800'
                      : pendaftaranStatus.reason === 'REGISTRATION_CLOSED'
                      ? 'text-gray-800'
                      : 'text-yellow-800'
                  }`}>
                    {pendaftaranStatus.gelombangAktif.gelombang}
                  </p>
                  <p className={`text-sm mt-2 ${
                    pendaftaranStatus.reason === 'QUOTA_FULL'
                      ? 'text-red-700' 
                      : pendaftaranStatus.reason === 'NOT_YET_STARTED'
                      ? 'text-blue-700'
                      : pendaftaranStatus.reason === 'REGISTRATION_CLOSED'
                      ? 'text-gray-700'
                      : 'text-yellow-700'
                  }`}>
                    {new Date(pendaftaranStatus.gelombangAktif.tanggalMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {' - '}
                    {new Date(pendaftaranStatus.gelombangAktif.tanggalSelesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  
                  {pendaftaranStatus.kuotaInfo && (
                    <div className="mt-4 pt-4 border-t border-current/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-semibold ${
                          pendaftaranStatus.reason === 'QUOTA_FULL'
                            ? 'text-red-800' 
                            : pendaftaranStatus.reason === 'NOT_YET_STARTED'
                            ? 'text-blue-800'
                            : pendaftaranStatus.reason === 'REGISTRATION_CLOSED'
                            ? 'text-gray-800'
                            : 'text-yellow-800'
                        }`}>
                          Kuota Pendaftar
                        </span>
                        <span className={`text-sm font-bold ${
                          pendaftaranStatus.reason === 'QUOTA_FULL'
                            ? 'text-red-900' 
                            : pendaftaranStatus.reason === 'NOT_YET_STARTED'
                            ? 'text-blue-900'
                            : pendaftaranStatus.reason === 'REGISTRATION_CLOSED'
                            ? 'text-gray-900'
                            : 'text-yellow-900'
                        }`}>
                          {pendaftaranStatus.kuotaInfo.terisi} / {pendaftaranStatus.kuotaInfo.total}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            pendaftaranStatus.kuotaInfo.penuh 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : pendaftaranStatus.kuotaInfo.sisa <= 10
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-green-500 to-green-600'
                          }`}
                          style={{ width: `${(pendaftaranStatus.kuotaInfo.terisi / pendaftaranStatus.kuotaInfo.total) * 100}%` }}
                        />
                      </div>
                      
                      <p className={`text-xs mt-2 font-medium ${
                        pendaftaranStatus.kuotaInfo.penuh 
                          ? 'text-red-700' 
                          : pendaftaranStatus.kuotaInfo.sisa <= 10
                          ? 'text-orange-700'
                          : 'text-green-700'
                      }`}>
                        {pendaftaranStatus.kuotaInfo.penuh 
                          ? '🔴 Kuota sudah penuh' 
                          : pendaftaranStatus.kuotaInfo.sisa <= 10
                          ? `⚠️ Sisa ${pendaftaranStatus.kuotaInfo.sisa} kuota lagi!`
                          : `✅ Tersisa ${pendaftaranStatus.kuotaInfo.sisa} kuota`
                        }
                      </p>
                    </div>
                  )}
                  
                  {!pendaftaranStatus.kuotaInfo && pendaftaranStatus.gelombangAktif.kuota === null && (
                    <p className="text-sm text-blue-700 mt-2">Kuota: Tidak terbatas</p>
                  )}
                </div>
              )}
              
              <div className="flex gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke Beranda
                </a>
                <a
                  href="/ppdb/syarat"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-semibold rounded-xl transition-all shadow-lg"
                >
                  Lihat Syarat Pendaftaran
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </Card>
        ) : (
        <Card className="border-2 border-[#d4af37] shadow-lg">
          {/* Premium Progress Steps */}
          <div className="mb-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="relative">
              {/* Clean Progress Line */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md h-0.5 bg-gray-200"></div>
              <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#d4af37] transition-all duration-500 ease-out`} 
                   style={{ width: `${((currentStep - 1) / 2) * 100}%`, maxWidth: `${((currentStep - 1) / 2) * 384}px` }}></div>
              
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto relative">
                {[
                  { 
                    step: 1, 
                    label: 'Data Calon Peserta Didik', 
                    shortLabel: 'Data Siswa', 
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )
                  },
                  { 
                    step: 2, 
                    label: 'Data Orang Tua/Wali', 
                    shortLabel: 'Data Ortu', 
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  { 
                    step: 3, 
                    label: 'Upload Berkas', 
                    shortLabel: 'Upload', 
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )
                  }
                ].map(({ step, label, shortLabel, icon }) => (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    {/* Premium Step Circle */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-medium transition-all duration-300 ${
                      currentStep > step 
                        ? 'bg-[#d4af37] text-white shadow-md' 
                        : currentStep === step
                        ? 'bg-[#d4af37] text-white shadow-lg'
                        : 'bg-white border-2 border-[#d4af37] text-gray-400 shadow-sm'
                    }`}>
                      {currentStep > step ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{step}</span>
                      )}
                    </div>
                    
                    {/* Clean Step Label */}
                    <div className="mt-4 text-center w-full px-2">
                      <div className={`mb-3 flex justify-center transition-colors duration-300 ${
                        currentStep >= step ? 'text-[#d4af37]' : 'text-gray-400'
                      }`}>
                        {icon}
                      </div>
                      <span className={`text-xs font-medium transition-colors block leading-tight ${
                        currentStep >= step ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        <span className="hidden sm:inline">{label}</span>
                        <span className="sm:hidden">{shortLabel}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Data Calon Peserta Didik */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-[#2d5016] mb-3">Data Calon Peserta Didik</h2>
                  <p className="text-gray-600 text-lg">Lengkapi data pribadi calon peserta didik dengan teliti</p>
                </div>

                {/* Identitas Dasar */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    Identitas Dasar
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.namaLengkap}
                        onChange={(e) => setFormData({...formData, namaLengkap: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Masukkan nama lengkap sesuai akta kelahiran"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Panggilan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.namaPanggilan}
                        onChange={(e) => setFormData({...formData, namaPanggilan: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Nama yang biasa dipanggil sehari-hari"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.jenisKelamin}
                        onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kewarganegaraan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.kewarganegaraan}
                        onChange={(e) => setFormData({...formData, kewarganegaraan: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Indonesia"
                      />
                    </div>
                  </div>
                </div>

                {/* Tempat & Tanggal Lahir */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    Tempat & Tanggal Lahir
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tempat Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.tempatLahir}
                        onChange={(e) => setFormData({...formData, tempatLahir: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Kota tempat lahir"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.tanggalLahir}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      />
                      {ageError && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            {ageError}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Agama & Bahasa */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                    Agama & Bahasa
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Agama <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.agama}
                        onChange={(e) => setFormData({...formData, agama: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="">Pilih agama</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Bahasa Sehari-hari <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-4 mb-3">
                        {['Indonesia', 'Inggris', 'Lainnya'].map((bahasa) => (
                          <label key={bahasa} className="flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-[#2d5016] transition-all cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.bahasaSehari.includes(bahasa)}
                              onChange={(e) => handleBahasaChange(bahasa, e.target.checked)}
                              className="mr-3 h-4 w-4 text-[#2d5016] focus:ring-[#2d5016] border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">{bahasa}</span>
                          </label>
                        ))}
                      </div>
                      {formData.bahasaSehari.includes('Lainnya') && (
                        <input
                          type="text"
                          placeholder="Sebutkan bahasa lainnya"
                          value={formData.bahasaLainnya}
                          onChange={(e) => setFormData({...formData, bahasaLainnya: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Data Keluarga */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                    Data Keluarga
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Jumlah Saudara Kandung <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.jumlahSaudaraKandung}
                        onChange={(e) => setFormData({...formData, jumlahSaudaraKandung: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Jumlah Saudara Tiri <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.jumlahSaudaraTiri}
                        onChange={(e) => setFormData({...formData, jumlahSaudaraTiri: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Jumlah Saudara Angkat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.jumlahSaudaraAngkat}
                        onChange={(e) => setFormData({...formData, jumlahSaudaraAngkat: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Fisik & Kesehatan */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">5</span>
                    Data Fisik & Kesehatan
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tinggi Badan (cm) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="50"
                          max="200"
                          required
                          value={formData.tinggiBadan}
                          onChange={(e) => setFormData({...formData, tinggiBadan: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                          placeholder="120"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Berat Badan (kg) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          required
                          value={formData.beratBadan}
                          onChange={(e) => setFormData({...formData, beratBadan: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Golongan Darah <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={formData.golonganDarah}
                          onChange={(e) => setFormData({...formData, golonganDarah: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        >
                          <option value="">Pilih golongan darah</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                          <option value="Tidak Tahu">Tidak Tahu</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Penyakit yang Pernah Diderita <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Sebutkan penyakit yang pernah diderita atau tulis 'Tidak Ada'"
                          value={formData.penyakitPernah}
                          onChange={(e) => setFormData({...formData, penyakitPernah: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Kelainan Fisik <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Sebutkan kelainan fisik atau tulis 'Tidak Ada'"
                          value={formData.kelainanFisik}
                          onChange={(e) => setFormData({...formData, kelainanFisik: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alamat & Kontak */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">6</span>
                    Alamat & Kontak
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat Rumah <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.alamatRumah}
                        onChange={(e) => setFormData({...formData, alamatRumah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all resize-none"
                        placeholder="Masukkan alamat lengkap tempat tinggal"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nomor Handphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="08xxxxxxxxxx"
                          value={formData.nomorHandphone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            if (value.length <= 13) {
                              setFormData({...formData, nomorHandphone: value})
                            }
                          }}
                          maxLength={13}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">Maksimal 13 digit angka</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Jarak dari Rumah ke Sekolah <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 2 km"
                          value={formData.jarakRumahSekolah}
                          onChange={(e) => setFormData({...formData, jarakRumahSekolah: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Sekolah */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">7</span>
                    Data Sekolah
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Masuk Menjadi Murid Kelas <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.masukKelas}
                        onChange={(e) => setFormData({...formData, masukKelas: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="1">Kelas 1</option>
                        <option value="2">Kelas 2</option>
                        <option value="3">Kelas 3</option>
                        <option value="4">Kelas 4</option>
                        <option value="5">Kelas 5</option>
                        <option value="6">Kelas 6</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Asal Sekolah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama TK/RA atau sekolah sebelumnya"
                        value={formData.asalSekolah}
                        onChange={(e) => setFormData({...formData, asalSekolah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center pt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!!ageError}
                    className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-12 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center text-lg"
                  >
                    <span>Lanjut ke Step 2</span>
                    <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Data Orang Tua/Wali */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-[#2d5016] mb-3">Data Orang Tua / Wali</h2>
                  <p className="text-gray-600 text-lg">Lengkapi data orang tua atau wali calon peserta didik dengan teliti</p>
                </div>

                {/* Data Ayah */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    Data Ayah
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap Ayah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.namaLengkapAyah}
                        onChange={(e) => setFormData({...formData, namaLengkapAyah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Masukkan nama lengkap ayah"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tempat, Tanggal Lahir Ayah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Jakarta, 15 Januari 1980"
                        value={formData.tempatTanggalLahirAyah}
                        onChange={(e) => setFormData({...formData, tempatTanggalLahirAyah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pendidikan Terakhir Ayah <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.pendidikanTerakhirAyah}
                        onChange={(e) => setFormData({...formData, pendidikanTerakhirAyah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="">Pilih pendidikan terakhir</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA/SMK">SMA/SMK</option>
                        <option value="D3">D3</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Agama Ayah <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.agamaAyah}
                        onChange={(e) => setFormData({...formData, agamaAyah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="">Pilih agama</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Handphone Ayah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={formData.nomorHandphoneAyah}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 13) {
                            setFormData({...formData, nomorHandphoneAyah: value})
                          }
                        }}
                        maxLength={13}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maksimal 13 digit angka</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pekerjaan Ayah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pekerjaanAyah}
                        onChange={(e) => setFormData({...formData, pekerjaanAyah: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Contoh: Pegawai Swasta, Wiraswasta, PNS"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Penghasilan Perbulan Ayah <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">Rp</span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="5.000.000"
                          value={formatNumber(formData.penghasilanAyah)}
                          onChange={(e) => {
                            const unformattedValue = getUnformattedValue(e.target.value)
                            setFormData({...formData, penghasilanAyah: unformattedValue})
                          }}
                          className="w-full pl-12 pr-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Masukkan dalam rupiah, contoh: 5.000.000 untuk 5 juta</p>
                    </div>
                  </div>
                </div>

                {/* Data Ibu */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    Data Ibu
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap Ibu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.namaLengkapIbu}
                        onChange={(e) => setFormData({...formData, namaLengkapIbu: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Masukkan nama lengkap ibu"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tempat, Tanggal Lahir Ibu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bandung, 20 Februari 1985"
                        value={formData.tempatTanggalLahirIbu}
                        onChange={(e) => setFormData({...formData, tempatTanggalLahirIbu: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pendidikan Terakhir Ibu <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.pendidikanTerakhirIbu}
                        onChange={(e) => setFormData({...formData, pendidikanTerakhirIbu: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="">Pilih pendidikan terakhir</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA/SMK">SMA/SMK</option>
                        <option value="D3">D3</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Agama Ibu <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.agamaIbu}
                        onChange={(e) => setFormData({...formData, agamaIbu: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      >
                        <option value="">Pilih agama</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Handphone Ibu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={formData.nomorHandphoneIbu}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 13) {
                            setFormData({...formData, nomorHandphoneIbu: value})
                          }
                        }}
                        maxLength={13}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maksimal 13 digit angka</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pekerjaan Ibu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pekerjaanIbu}
                        onChange={(e) => setFormData({...formData, pekerjaanIbu: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        placeholder="Contoh: Ibu Rumah Tangga, Guru, Pegawai Swasta"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Penghasilan Perbulan Ibu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">Rp</span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="3.000.000"
                          value={formatNumber(formData.penghasilanIbu)}
                          onChange={(e) => {
                            const unformattedValue = getUnformattedValue(e.target.value)
                            setFormData({...formData, penghasilanIbu: unformattedValue})
                          }}
                          className="w-full pl-12 pr-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Masukkan dalam rupiah, contoh: 3.000.000 untuk 3 juta. Tulis 0 jika tidak bekerja.</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all flex items-center text-lg"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Kembali ke Step 1</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center text-lg"
                  >
                    <span>Lanjut ke Step 3</span>
                    <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Upload Berkas Persyaratan */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-[#2d5016] mb-3">Upload Berkas Persyaratan</h2>
                  <p className="text-gray-600 text-lg">Upload dokumen yang diperlukan untuk pendaftaran dengan teliti</p>
                </div>

                {/* Ketentuan Upload */}
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm mr-3">📌</span>
                    Ketentuan Upload Berkas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-yellow-700">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Format file: JPG, JPEG, PNG</span>
                    </div>
                    <div className="flex items-center text-yellow-700">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Ukuran maksimal: 10 MB per file</span>
                    </div>
                    <div className="flex items-center text-yellow-700">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Pastikan dokumen jelas dan terbaca</span>
                    </div>
                    <div className="flex items-center text-yellow-700">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Semua berkas wajib diupload</span>
                    </div>
                  </div>
                </div>

                {/* Upload Berkas */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#2d5016] mb-6 flex items-center">
                    <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    Dokumen yang Diperlukan
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Scan Akta Kelahiran Calon Peserta Didik <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        required
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'scanAktaKelahiran')}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d5016] file:text-white hover:file:bg-[#3d6b1f]"
                      />
                      {formData.scanAktaKelahiran && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-700 font-medium">{formData.scanAktaKelahiran.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Pas Foto Calon Peserta Didik <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        required
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'pasFoto')}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d5016] file:text-white hover:file:bg-[#3d6b1f]"
                      />
                      {formData.pasFoto && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-700 font-medium">{formData.pasFoto.name}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Pas foto terbaru ukuran 3x4 dengan latar belakang merah</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Scan KTP Ayah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        required
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'scanKTPAyah')}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d5016] file:text-white hover:file:bg-[#3d6b1f]"
                      />
                      {formData.scanKTPAyah && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-700 font-medium">{formData.scanKTPAyah.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Scan KTP Ibu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        required
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'scanKTPIbu')}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d5016] file:text-white hover:file:bg-[#3d6b1f]"
                      />
                      {formData.scanKTPIbu && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-700 font-medium">{formData.scanKTPIbu.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Scan Kartu Keluarga <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        required
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'scanKartuKeluarga')}
                        className="w-full px-4 py-3 border-2 border-[#d4af37] rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d5016] file:text-white hover:file:bg-[#3d6b1f]"
                      />
                      {formData.scanKartuKeluarga && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-700 font-medium">{formData.scanKartuKeluarga.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Pesan */}
                {message && (
                  <div className={`p-4 rounded-xl border ${message.includes('berhasil') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    <div className="flex items-center">
                      {message.includes('berhasil') ? (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      )}
                      <span className="font-medium">{message}</span>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all flex items-center text-lg"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Kembali ke Step 2</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-12 rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center text-lg"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim Pendaftaran...
                      </>
                    ) : (
                      <>
                        <span>Kirim Pendaftaran</span>
                        <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </Card>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-[#2d5016] mb-4">
                Pendaftaran Berhasil
              </h2>
              
              {/* Message */}
              <div className="text-gray-600 mb-8 space-y-3">
                <p className="leading-relaxed">
                  Terima kasih telah melakukan pendaftaran PPDB secara online. Data Anda telah kami terima dan akan diproses oleh panitia.
                </p>
                <p className="leading-relaxed font-medium text-[#2d5016]">
                  Silakan menunggu informasi selanjutnya melalui WhatsApp.
                </p>
              </div>
              
              {/* WhatsApp Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  router.push('/')
                }}
                className="w-full bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


