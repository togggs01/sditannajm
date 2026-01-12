'use client'

import { useState, useEffect } from 'react'
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
}

export default function PPDBPage() {
  const [tahunAjaran, setTahunAjaran] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [pendaftaranStatus, setPendaftaranStatus] = useState<PendaftaranStatus | null>(null)
  const [message, setMessage] = useState('')
  const [ageError, setAgeError] = useState('')
  
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
        setMessage('Pendaftaran berhasil! Kami akan menghubungi Anda segera.')
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
    <div className="min-h-screen bg-gray-50">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendaftaran Belum Dibuka</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{pendaftaranStatus?.message}</p>
              
              {pendaftaranStatus?.gelombangAktif && (
                <div className={`border-2 rounded-xl p-6 max-w-md mx-auto mb-6 ${
                  pendaftaranStatus.kuotaInfo?.penuh 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className={`text-sm font-semibold mb-2 ${
                    pendaftaranStatus.kuotaInfo?.penuh ? 'text-red-900' : 'text-blue-900'
                  }`}>
                    {pendaftaranStatus.kuotaInfo?.penuh ? '⚠️ Kuota Penuh' : '📅 Informasi Pendaftaran'}
                  </p>
                  <p className={`font-medium ${
                    pendaftaranStatus.kuotaInfo?.penuh ? 'text-red-800' : 'text-blue-800'
                  }`}>
                    {pendaftaranStatus.gelombangAktif.gelombang}
                  </p>
                  <p className={`text-sm mt-2 ${
                    pendaftaranStatus.kuotaInfo?.penuh ? 'text-red-700' : 'text-blue-700'
                  }`}>
                    {new Date(pendaftaranStatus.gelombangAktif.tanggalMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {' - '}
                    {new Date(pendaftaranStatus.gelombangAktif.tanggalSelesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  
                  {pendaftaranStatus.kuotaInfo && (
                    <div className="mt-4 pt-4 border-t border-current/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-semibold ${
                          pendaftaranStatus.kuotaInfo.penuh ? 'text-red-800' : 'text-blue-800'
                        }`}>
                          Kuota Pendaftar
                        </span>
                        <span className={`text-sm font-bold ${
                          pendaftaranStatus.kuotaInfo.penuh ? 'text-red-900' : 'text-blue-900'
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
        <Card className="border-t-4 border-[#d4af37]">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="relative">
              {/* Progress Line Background */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-10"></div>
              <div className={`absolute top-5 left-5 h-0.5 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] -z-10 transition-all duration-500`} 
                   style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
              
              <div className="flex items-center justify-between">
                {[
                  { step: 1, label: 'Data Calon Peserta Didik', icon: '👤' },
                  { step: 2, label: 'Data Orang Tua/Wali', icon: '👨‍👩‍👧' },
                  { step: 3, label: 'Upload Berkas', icon: '📄' }
                ].map(({ step, label, icon }) => (
                  <div key={step} className="flex flex-col items-center relative">
                    {/* Step Circle */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 shadow-lg ${
                      currentStep > step 
                        ? 'bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white scale-110' 
                        : currentStep === step
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] scale-110'
                        : 'bg-white border-2 border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm">{step}</span>
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <div className="text-lg mb-1">{icon}</div>
                      <span className={`text-sm font-medium transition-colors ${
                        currentStep >= step ? 'text-[#2d5016]' : 'text-gray-500'
                      }`}>
                        {label}
                      </span>
                      {currentStep === step && (
                        <div className="mt-1 w-2 h-2 bg-[#d4af37] rounded-full mx-auto animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Data Calon Peserta Didik */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2d5016] mb-2">STEP 1 — Data Calon Peserta Didik</h2>
                  <p className="text-gray-600">Lengkapi data pribadi calon peserta didik</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.namaLengkap}
                    onChange={(e) => setFormData({...formData, namaLengkap: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Panggilan *</label>
                  <input
                    type="text"
                    required
                    value={formData.namaPanggilan}
                    onChange={(e) => setFormData({...formData, namaPanggilan: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin *</label>
                  <select
                    required
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir *</label>
                    <input
                      type="text"
                      required
                      value={formData.tempatLahir}
                      onChange={(e) => setFormData({...formData, tempatLahir: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir *</label>
                    <input
                      type="date"
                      required
                      value={formData.tanggalLahir}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {ageError && (
                      <p className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                        ⚠️ {ageError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agama *</label>
                    <select
                      required
                      value={formData.agama}
                      onChange={(e) => setFormData({...formData, agama: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Pilih</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kewarganegaraan *</label>
                    <input
                      type="text"
                      required
                      value={formData.kewarganegaraan}
                      onChange={(e) => setFormData({...formData, kewarganegaraan: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bahasa Sehari-hari *</label>
                  <div className="flex flex-wrap gap-4">
                    {['Indonesia', 'Inggris', 'Lainnya'].map((bahasa) => (
                      <label key={bahasa} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.bahasaSehari.includes(bahasa)}
                          onChange={(e) => handleBahasaChange(bahasa, e.target.checked)}
                          className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{bahasa}</span>
                      </label>
                    ))}
                  </div>
                  {formData.bahasaSehari.includes('Lainnya') && (
                    <input
                      type="text"
                      placeholder="Sebutkan bahasa lainnya"
                      value={formData.bahasaLainnya}
                      onChange={(e) => setFormData({...formData, bahasaLainnya: e.target.value})}
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Saudara Kandung *</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.jumlahSaudaraKandung}
                      onChange={(e) => setFormData({...formData, jumlahSaudaraKandung: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Saudara Tiri *</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.jumlahSaudaraTiri}
                      onChange={(e) => setFormData({...formData, jumlahSaudaraTiri: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Saudara Angkat *</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.jumlahSaudaraAngkat}
                      onChange={(e) => setFormData({...formData, jumlahSaudaraAngkat: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tinggi Badan (cm) *</label>
                    <input
                      type="number"
                      min="50"
                      max="200"
                      required
                      value={formData.tinggiBadan}
                      onChange={(e) => setFormData({...formData, tinggiBadan: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Berat Badan (kg) *</label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      required
                      value={formData.beratBadan}
                      onChange={(e) => setFormData({...formData, beratBadan: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Golongan Darah *</label>
                    <select
                      required
                      value={formData.golonganDarah}
                      onChange={(e) => setFormData({...formData, golonganDarah: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Pilih</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Penyakit yang Pernah Diderita *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Sebutkan penyakit yang pernah diderita atau tulis 'Tidak Ada'"
                      value={formData.penyakitPernah}
                      onChange={(e) => setFormData({...formData, penyakitPernah: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kelainan Fisik *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Sebutkan kelainan fisik atau tulis 'Tidak Ada'"
                      value={formData.kelainanFisik}
                      onChange={(e) => setFormData({...formData, kelainanFisik: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Rumah *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.alamatRumah}
                    onChange={(e) => setFormData({...formData, alamatRumah: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={formData.nomorHandphone}
                      onChange={(e) => setFormData({...formData, nomorHandphone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jarak dari Rumah ke Sekolah *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 2 km"
                      value={formData.jarakRumahSekolah}
                      onChange={(e) => setFormData({...formData, jarakRumahSekolah: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Masuk Menjadi Murid Kelas *</label>
                    <select
                      required
                      value={formData.masukKelas}
                      onChange={(e) => setFormData({...formData, masukKelas: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asal Sekolah *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama TK/RA atau sekolah sebelumnya"
                      value={formData.asalSekolah}
                      onChange={(e) => setFormData({...formData, asalSekolah: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!!ageError}
                    className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center"
                  >
                    <span>Lanjut</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Data Orang Tua/Wali */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2d5016] mb-2">STEP 2 — Data Orang Tua / Wali</h2>
                  <p className="text-gray-600">Lengkapi data orang tua atau wali calon peserta didik</p>
                </div>

                {/* Data Ayah */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">Data Ayah</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap Ayah *</label>
                      <input
                        type="text"
                        required
                        value={formData.namaLengkapAyah}
                        onChange={(e) => setFormData({...formData, namaLengkapAyah: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tempat, Tanggal Lahir (Ayah) *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Jakarta, 15 Januari 1980"
                        value={formData.tempatTanggalLahirAyah}
                        onChange={(e) => setFormData({...formData, tempatTanggalLahirAyah: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pendidikan Terakhir (Ayah) *</label>
                        <select
                          required
                          value={formData.pendidikanTerakhirAyah}
                          onChange={(e) => setFormData({...formData, pendidikanTerakhirAyah: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Pilih</option>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Agama (Ayah) *</label>
                        <select
                          required
                          value={formData.agamaAyah}
                          onChange={(e) => setFormData({...formData, agamaAyah: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Pilih</option>
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone / WhatsApp (Ayah) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={formData.nomorHandphoneAyah}
                        onChange={(e) => setFormData({...formData, nomorHandphoneAyah: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pekerjaan (Ayah) *</label>
                      <input
                        type="text"
                        required
                        value={formData.pekerjaanAyah}
                        onChange={(e) => setFormData({...formData, pekerjaanAyah: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Penghasilan Perbulan (Ayah) * (Dalam Rupiah / Rp)</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 5000000"
                        value={formData.penghasilanAyah}
                        onChange={(e) => setFormData({...formData, penghasilanAyah: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Data Ibu */}
                <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
                  <h3 className="text-lg font-bold text-pink-800 mb-4">Data Ibu</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap Ibu *</label>
                      <input
                        type="text"
                        required
                        value={formData.namaLengkapIbu}
                        onChange={(e) => setFormData({...formData, namaLengkapIbu: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tempat, Tanggal Lahir (Ibu) *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bandung, 20 Februari 1985"
                        value={formData.tempatTanggalLahirIbu}
                        onChange={(e) => setFormData({...formData, tempatTanggalLahirIbu: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pendidikan Terakhir (Ibu) *</label>
                        <select
                          required
                          value={formData.pendidikanTerakhirIbu}
                          onChange={(e) => setFormData({...formData, pendidikanTerakhirIbu: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Pilih</option>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Agama (Ibu) *</label>
                        <select
                          required
                          value={formData.agamaIbu}
                          onChange={(e) => setFormData({...formData, agamaIbu: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Pilih</option>
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone / WhatsApp (Ibu) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={formData.nomorHandphoneIbu}
                        onChange={(e) => setFormData({...formData, nomorHandphoneIbu: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pekerjaan (Ibu) *</label>
                      <input
                        type="text"
                        required
                        value={formData.pekerjaanIbu}
                        onChange={(e) => setFormData({...formData, pekerjaanIbu: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Penghasilan Perbulan (Ibu) * (Dalam Rupiah / Rp)</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 3000000"
                        value={formData.penghasilanIbu}
                        onChange={(e) => setFormData({...formData, penghasilanIbu: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-xl transition-all flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Kembali</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center"
                  >
                    <span>Lanjut</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Upload Berkas Persyaratan */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2d5016] mb-2">STEP 3 — Upload Berkas Persyaratan</h2>
                  <p className="text-gray-600">Upload dokumen yang diperlukan untuk pendaftaran</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">📌 Ketentuan Upload</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>✓ Semua berkas dalam format .jpg</li>
                    <li>✓ Ukuran maksimal 10 MB</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scan Akta Kelahiran Calon Peserta Didik *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, 'scanAktaKelahiran')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {formData.scanAktaKelahiran && (
                      <p className="mt-1 text-sm text-green-600">✓ {formData.scanAktaKelahiran.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pas Foto Calon Peserta Didik *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, 'pasFoto')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {formData.pasFoto && (
                      <p className="mt-1 text-sm text-green-600">✓ {formData.pasFoto.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scan KTP Ayah Calon Peserta Didik *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, 'scanKTPAyah')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {formData.scanKTPAyah && (
                      <p className="mt-1 text-sm text-green-600">✓ {formData.scanKTPAyah.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scan KTP Ibu Calon Peserta Didik *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, 'scanKTPIbu')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {formData.scanKTPIbu && (
                      <p className="mt-1 text-sm text-green-600">✓ {formData.scanKTPIbu.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scan Kartu Keluarga Calon Peserta Didik *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, 'scanKartuKeluarga')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {formData.scanKartuKeluarga && (
                      <p className="mt-1 text-sm text-green-600">✓ {formData.scanKartuKeluarga.name}</p>
                    )}
                  </div>
                </div>

                {message && (
                  <div className={`p-4 rounded-lg ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-xl transition-all flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Kembali</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <span>Kirim Pendaftaran</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
    </div>
  )
}
