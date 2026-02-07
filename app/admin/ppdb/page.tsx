'use client'

import { useState, useEffect } from 'react'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'
import { getGelombangColor } from '@/lib/gelombangPPDB'
import PageHeader from '@/components/admin/PageHeader'
import ActionButton from '@/components/admin/ActionButton'

export default function AdminPPDBPage() {
  const [ppdbList, setPpdbList] = useState<any[]>([])
  const [tahunAjaranList, setTahunAjaranList] = useState<string[]>([])
  const [selectedTahunAjaran, setSelectedTahunAjaran] = useState<string>('')
  const [currentTahunAjaran, setCurrentTahunAjaran] = useState<string>('')
  const [filter, setFilter] = useState('all')
  const [exporting, setExporting] = useState(false)
  const [selectedPPDB, setSelectedPPDB] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const current = getCurrentTahunAjaran()
    setCurrentTahunAjaran(current)
    setSelectedTahunAjaran(current)
    fetchTahunAjaranList()
  }, [])

  useEffect(() => {
    if (selectedTahunAjaran) {
      fetchPPDB()
    }
  }, [selectedTahunAjaran])

  // Refresh tahun ajaran list ketika ada perubahan
  useEffect(() => {
    const handleStorageChange = () => {
      fetchTahunAjaranList()
    }

    const handleFocus = () => {
      // Refresh ketika user kembali ke tab ini
      fetchTahunAjaranList()
    }

    // Listen untuk perubahan dari tab lain
    window.addEventListener('storage', handleStorageChange)
    
    // Listen untuk custom event dari dalam aplikasi
    window.addEventListener('tahunAjaranUpdated', handleStorageChange)
    
    // Listen ketika user kembali ke tab ini
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('tahunAjaranUpdated', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const fetchTahunAjaranList = async () => {
    try {
      const res = await fetch('/api/ppdb/tahun-ajaran')
      if (!res.ok) {
        throw new Error('Failed to fetch tahun ajaran')
      }
      const data = await res.json()
      setTahunAjaranList(Array.isArray(data.available) ? data.available : [getCurrentTahunAjaran()])
    } catch (error) {
      console.error('Error fetching tahun ajaran:', error)
      setTahunAjaranList([getCurrentTahunAjaran()])
    } finally {
      setLoading(false)
    }
  }

  const fetchPPDB = async () => {
    try {
      const res = await fetch(`/api/ppdb?tahunAjaran=${selectedTahunAjaran}`)
      const data = await res.json()
      // Pastikan data adalah array dan filter out null values
      const validData = Array.isArray(data) ? data.filter(item => item && typeof item === 'object') : []
      setPpdbList(validData)
    } catch (error) {
      console.error('Error fetching PPDB:', error)
      setPpdbList([])
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    await fetch(`/api/ppdb?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    fetchPPDB()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus data pendaftaran ini?')) {
      await fetch(`/api/ppdb?id=${id}`, { method: 'DELETE' })
      fetchPPDB()
    }
  }

  // Computed values - harus di atas handleExport
  const filteredList = Array.isArray(ppdbList) ? ppdbList.filter(ppdb => {
    if (filter === 'all') return true
    return ppdb.status === filter
  }) : []

  const stats = {
    total: Array.isArray(ppdbList) ? ppdbList.length : 0,
    pending: Array.isArray(ppdbList) ? ppdbList.filter(p => p.status === 'pending').length : 0,
    approved: Array.isArray(ppdbList) ? ppdbList.filter(p => p.status === 'approved').length : 0,
    rejected: Array.isArray(ppdbList) ? ppdbList.filter(p => p.status === 'rejected').length : 0
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      // Import xlsx dynamically
      const XLSX = await import('xlsx')
      
      // Prepare Excel data dengan semua field
      const excelData = filteredList.map((ppdb, index) => ({
        'No': index + 1,
        'Nama Lengkap': ppdb.namaLengkap || '-',
        'Nama Panggilan': ppdb.namaPanggilan || '-',
        'Jenis Kelamin': ppdb.jenisKelamin || '-',
        'Tempat Lahir': ppdb.tempatLahir || '-',
        'Tanggal Lahir': ppdb.tanggalLahir || '-',
        'Agama': ppdb.agama || '-',
        'Kewarganegaraan': ppdb.kewarganegaraan || '-',
        'Bahasa Sehari-hari': ppdb.bahasaSehari || '-',
        'Bahasa Lainnya': ppdb.bahasaLainnya || '-',
        'Jumlah Saudara Kandung': ppdb.jumlahSaudaraKandung || '-',
        'Jumlah Saudara Tiri': ppdb.jumlahSaudaraTiri || '-',
        'Jumlah Saudara Angkat': ppdb.jumlahSaudaraAngkat || '-',
        'Tinggi Badan (cm)': ppdb.tinggiBadan || '-',
        'Berat Badan (kg)': ppdb.beratBadan || '-',
        'Golongan Darah': ppdb.golonganDarah || '-',
        'Penyakit Pernah Diderita': ppdb.penyakitPernah || '-',
        'Kelainan Fisik': ppdb.kelainanFisik || '-',
        'Alamat Rumah': ppdb.alamatRumah || ppdb.alamat || '-',
        'Nomor Handphone': ppdb.nomorHandphone || ppdb.teleponOrangTua || '-',
        'Jarak Rumah ke Sekolah': ppdb.jarakRumahSekolah || '-',
        'Masuk Kelas': ppdb.masukKelas || '-',
        'Asal Sekolah': ppdb.asalSekolah || '-',
        'Nama Ayah': ppdb.namaLengkapAyah || ppdb.namaAyah || '-',
        'TTL Ayah': ppdb.tempatTanggalLahirAyah || '-',
        'Pendidikan Ayah': ppdb.pendidikanTerakhirAyah || '-',
        'Agama Ayah': ppdb.agamaAyah || '-',
        'No HP Ayah': ppdb.nomorHandphoneAyah || '-',
        'Pekerjaan Ayah': ppdb.pekerjaanAyah || '-',
        'Penghasilan Ayah': ppdb.penghasilanAyah ? `Rp ${parseInt(ppdb.penghasilanAyah).toLocaleString('id-ID')}` : '-',
        'Nama Ibu': ppdb.namaLengkapIbu || ppdb.namaIbu || '-',
        'TTL Ibu': ppdb.tempatTanggalLahirIbu || '-',
        'Pendidikan Ibu': ppdb.pendidikanTerakhirIbu || '-',
        'Agama Ibu': ppdb.agamaIbu || '-',
        'No HP Ibu': ppdb.nomorHandphoneIbu || '-',
        'Pekerjaan Ibu': ppdb.pekerjaanIbu || '-',
        'Penghasilan Ibu': ppdb.penghasilanIbu ? `Rp ${parseInt(ppdb.penghasilanIbu).toLocaleString('id-ID')}` : '-',
        'Scan Akta Kelahiran': ppdb.scanAktaKelahiran ? `http://localhost:3000${ppdb.scanAktaKelahiran}` : '-',
        'Pas Foto': ppdb.pasFoto ? `http://localhost:3000${ppdb.pasFoto}` : '-',
        'Scan KTP Ayah': ppdb.scanKTPAyah ? `http://localhost:3000${ppdb.scanKTPAyah}` : '-',
        'Scan KTP Ibu': ppdb.scanKTPIbu ? `http://localhost:3000${ppdb.scanKTPIbu}` : '-',
        'Scan Kartu Keluarga': ppdb.scanKartuKeluarga ? `http://localhost:3000${ppdb.scanKartuKeluarga}` : '-',
        'Tahun Ajaran': ppdb.tahunAjaran || '-',
        'Gelombang': ppdb.gelombang || '-',
        'Status': ppdb.status === 'pending' ? 'Menunggu' : ppdb.status === 'approved' ? 'Diterima' : 'Ditolak',
        'Tanggal Daftar': ppdb.createdAt ? new Date(ppdb.createdAt).toLocaleDateString('id-ID') : '-'
      }))

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(excelData)

      // Set column widths
      const colWidths = [
        { wch: 5 },   // No
        { wch: 25 },  // Nama Lengkap
        { wch: 15 },  // Nama Panggilan
        { wch: 12 },  // Jenis Kelamin
        { wch: 15 },  // Tempat Lahir
        { wch: 12 },  // Tanggal Lahir
        { wch: 10 },  // Agama
        { wch: 15 },  // Kewarganegaraan
        { wch: 20 },  // Bahasa Sehari-hari
        { wch: 15 },  // Bahasa Lainnya
        { wch: 8 },   // Jumlah Saudara Kandung
        { wch: 8 },   // Jumlah Saudara Tiri
        { wch: 8 },   // Jumlah Saudara Angkat
        { wch: 12 },  // Tinggi Badan
        { wch: 12 },  // Berat Badan
        { wch: 12 },  // Golongan Darah
        { wch: 30 },  // Penyakit Pernah Diderita
        { wch: 30 },  // Kelainan Fisik
        { wch: 40 },  // Alamat Rumah
        { wch: 15 },  // Nomor Handphone
        { wch: 15 },  // Jarak Rumah ke Sekolah
        { wch: 10 },  // Masuk Kelas
        { wch: 20 },  // Asal Sekolah
        { wch: 25 },  // Nama Ayah
        { wch: 20 },  // TTL Ayah
        { wch: 15 },  // Pendidikan Ayah
        { wch: 10 },  // Agama Ayah
        { wch: 15 },  // No HP Ayah
        { wch: 20 },  // Pekerjaan Ayah
        { wch: 15 },  // Penghasilan Ayah
        { wch: 25 },  // Nama Ibu
        { wch: 20 },  // TTL Ibu
        { wch: 15 },  // Pendidikan Ibu
        { wch: 10 },  // Agama Ibu
        { wch: 15 },  // No HP Ibu
        { wch: 20 },  // Pekerjaan Ibu
        { wch: 15 },  // Penghasilan Ibu
        { wch: 50 },  // Scan Akta Kelahiran
        { wch: 50 },  // Pas Foto
        { wch: 50 },  // Scan KTP Ayah
        { wch: 50 },  // Scan KTP Ibu
        { wch: 50 },  // Scan Kartu Keluarga
        { wch: 12 },  // Tahun Ajaran
        { wch: 12 },  // Gelombang
        { wch: 12 },  // Status
        { wch: 15 }   // Tanggal Daftar
      ]
      ws['!cols'] = colWidths

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Data PPDB')

      // Create summary sheet
      const summaryData = [
        { 'Keterangan': 'Total Pendaftar', 'Jumlah': stats.total },
        { 'Keterangan': 'Menunggu', 'Jumlah': stats.pending },
        { 'Keterangan': 'Diterima', 'Jumlah': stats.approved },
        { 'Keterangan': 'Ditolak', 'Jumlah': stats.rejected },
        { 'Keterangan': '', 'Jumlah': '' },
        { 'Keterangan': 'Tahun Ajaran', 'Jumlah': selectedTahunAjaran },
        { 'Keterangan': 'Tanggal Export', 'Jumlah': new Date().toLocaleDateString('id-ID') },
        { 'Keterangan': 'Sekolah', 'Jumlah': 'SDIT AN-NAJM RABBANI' }
      ]
      
      const summaryWs = XLSX.utils.json_to_sheet(summaryData)
      summaryWs['!cols'] = [{ wch: 20 }, { wch: 20 }]
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Ringkasan')

      // Save Excel file
      const filename = `PPDB_${selectedTahunAjaran.replace('/', '-')}_${new Date().toISOString().split('T')[0]}.xlsx`
      XLSX.writeFile(wb, filename)
      
    } catch (error) {
      console.error('Export error:', error)
      alert('Gagal export data')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Kelola PPDB"
        description="Kelola pendaftaran peserta didik baru"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        action={
          <ActionButton
            onClick={handleExport}
            disabled={exporting || ppdbList.length === 0}
            icon={
              exporting ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )
            }
          >
            {exporting ? 'Membuat Excel...' : 'Export Excel'}
          </ActionButton>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Total Pendaftar</p>
                <p className="text-3xl font-bold text-[#2d5016]">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Menunggu</p>
                <p className="text-3xl font-bold text-[#d4af37]">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/20 rounded-xl flex items-center justify-center border-2 border-[#d4af37]/30">
                <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 border-[#2d5016]/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Diterima</p>
                <p className="text-3xl font-bold text-[#2d5016]">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#2d5016]/20 to-[#3d6b1f]/20 rounded-xl flex items-center justify-center border-2 border-[#2d5016]/30">
                <svg className="w-6 h-6 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Ditolak</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border-2 border-red-200">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
            <div className="flex items-end gap-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Ajaran</label>
                <select
                  value={selectedTahunAjaran}
                  onChange={(e) => setSelectedTahunAjaran(e.target.value)}
                  className="w-full md:w-64 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-white text-gray-900 font-semibold"
                >
                  {tahunAjaranList.map(ta => (
                    <option key={ta} value={ta}>{ta}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={fetchTahunAjaranList}
                className="p-3 bg-[#2d5016] hover:bg-[#3d6b1f] text-white rounded-xl transition-all shadow-md hover:shadow-lg"
                title="Refresh Tahun Ajaran"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Semua ({stats.total})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filter === 'pending'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Menunggu ({stats.pending})
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filter === 'approved'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Diterima ({stats.approved})
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filter === 'rejected'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Ditolak ({stats.rejected})
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">TTL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Orang Tua</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kontak</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Gelombang</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">Belum ada pendaftar</p>
                      <p className="text-gray-400 text-sm mt-1">Data pendaftar akan muncul di sini</p>
                    </td>
                  </tr>
                ) : (
                  filteredList.map((ppdb) => {
                    if (!ppdb) return null; // Add null check
                    const gelombangColors = getGelombangColor(ppdb.gelombang || 'Gelombang 1')
                    return (
                    <tr key={ppdb.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{ppdb.namaLengkap}</p>
                        <p className="text-xs text-gray-500">{ppdb.jenisKelamin}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <p className="text-sm">{ppdb.tempatLahir}</p>
                        <p className="text-xs text-gray-500">{new Date(ppdb.tanggalLahir).toLocaleDateString('id-ID')}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <p className="text-sm font-medium">{ppdb.namaLengkapAyah || ppdb.namaAyah || '-'}</p>
                        <p className="text-xs text-gray-500">Ayah: {ppdb.namaLengkapAyah || ppdb.namaAyah || '-'}</p>
                        <p className="text-xs text-gray-500">Ibu: {ppdb.namaLengkapIbu || ppdb.namaIbu || '-'}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <p className="text-sm">{ppdb.nomorHandphone || ppdb.telefonOrangTua || '-'}</p>
                        <p className="text-xs text-gray-500">{ppdb.nomorHandphoneAyah || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${gelombangColors.bg} ${gelombangColors.text} border ${gelombangColors.border}`}>
                          {ppdb.gelombang || 'Gelombang 1'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          ppdb.status === 'pending' 
                            ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 text-[#d4af37] border border-[#d4af37]/30'
                            : ppdb.status === 'approved'
                            ? 'bg-gradient-to-r from-[#2d5016]/20 to-[#3d6b1f]/20 text-[#2d5016] border border-[#2d5016]/30'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {ppdb.status === 'pending' ? 'Menunggu' : ppdb.status === 'approved' ? 'Diterima' : 'Ditolak'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {ppdb.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(ppdb.id, 'approved')}
                                className="p-2 text-[#2d5016] hover:bg-[#2d5016]/10 rounded-lg transition-colors"
                                title="Terima"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(ppdb.id, 'rejected')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Tolak"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          )}
                          
                          {ppdb.status === 'approved' && (ppdb.nomorHandphone || ppdb.teleponOrangTua) && (
                            <a
                              href={`https://wa.me/${(ppdb.nomorHandphone || ppdb.teleponOrangTua).replace(/[^0-9]/g, '')}?text=Assalamu'alaikum%20${encodeURIComponent(ppdb.namaLengkapAyah || ppdb.namaAyah || 'Bapak/Ibu')},%0A%0ASelamat!%20Kami%20informasikan%20bahwa%20putra/putri%20Bapak/Ibu%20*${encodeURIComponent(ppdb.namaLengkap)}*%20telah%20*DITERIMA*%20di%20SDIT%20ANNAJM%20RABBANI%20untuk%20Tahun%20Ajaran%20${encodeURIComponent(ppdb.tahunAjaran)}.%0A%0ASilakan%20hubungi%20kami%20untuk%20informasi%20lebih%20lanjut%20mengenai%20proses%20selanjutnya.%0A%0AJazakumullah%20khairan`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
                              title="Hubungi via WhatsApp"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </a>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPPDB(ppdb)
                              setShowDetailModal(true)
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Detail"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(ppdb.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPPDB && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Detail Pendaftar</h3>
                  <p className="text-green-100 mt-1">Tahun Ajaran {selectedPPDB.tahunAjaran}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Status & Actions */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                    selectedPPDB.status === 'pending' 
                      ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 text-[#d4af37] border-2 border-[#d4af37]/30'
                      : selectedPPDB.status === 'approved'
                      ? 'bg-gradient-to-r from-[#2d5016]/20 to-[#3d6b1f]/20 text-[#2d5016] border-2 border-[#2d5016]/30'
                      : 'bg-red-50 text-red-700 border-2 border-red-200'
                  }`}>
                    {selectedPPDB.status === 'pending' ? '⏳ Menunggu' : selectedPPDB.status === 'approved' ? '✅ Diterima' : '❌ Ditolak'}
                  </span>
                  {(() => {
                    const gelombangColors = getGelombangColor(selectedPPDB.gelombang || 'Gelombang 1')
                    return (
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${gelombangColors.bg} ${gelombangColors.text} border-2 ${gelombangColors.border}`}>
                        📅 {selectedPPDB.gelombang || 'Gelombang 1'}
                      </span>
                    )
                  })()}
                </div>

                {/* WhatsApp Button */}
                {selectedPPDB.status === 'approved' && (selectedPPDB.nomorHandphone || selectedPPDB.telefonOrangTua) && (
                  <a
                    href={`https://wa.me/${(selectedPPDB.nomorHandphone || selectedPPDB.telefonOrangTua).replace(/[^0-9]/g, '')}?text=Assalamu'alaikum%20${encodeURIComponent(selectedPPDB.namaLengkapAyah || selectedPPDB.namaAyah || 'Bapak/Ibu')},%0A%0ASelamat!%20Kami%20informasikan%20bahwa%20putra/putri%20Bapak/Ibu%20*${encodeURIComponent(selectedPPDB.namaLengkap)}*%20telah%20*DITERIMA*%20di%20SDIT%20ANNAJM%20RABBANI%20untuk%20Tahun%20Ajaran%20${encodeURIComponent(selectedPPDB.tahunAjaran)}.%0A%0ASilakan%20hubungi%20kami%20untuk%20informasi%20lebih%20lanjut%20mengenai%20proses%20selanjutnya.%0A%0AJazakumullah%20khairan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Hubungi via WhatsApp
                  </a>
                )}
              </div>

              {/* Data Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Data Calon Peserta Didik */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                    <h4 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center">
                      <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">👤</span>
                      Data Calon Peserta Didik
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nama Lengkap</p>
                          <p className="text-sm font-bold text-gray-900">{selectedPPDB.namaLengkap}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nama Panggilan</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.namaPanggilan || '-'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tempat Lahir</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.tempatLahir}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tanggal Lahir</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.tanggalLahir}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Jenis Kelamin</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.jenisKelamin}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Agama</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.agama || '-'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Kewarganegaraan</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.kewarganegaraan || 'Indonesia'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Bahasa Sehari-hari</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedPPDB.bahasaSehari ? 
                              (typeof selectedPPDB.bahasaSehari === 'string' ? 
                                JSON.parse(selectedPPDB.bahasaSehari).join(', ') : 
                                selectedPPDB.bahasaSehari.join(', ')
                              ) : 'Indonesia'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tinggi / Berat Badan</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.tinggiBadan || '-'} cm / {selectedPPDB.beratBadan || '-'} kg</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Golongan Darah</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.golonganDarah || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Alamat Rumah</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPPDB.alamatRumah || selectedPPDB.alamat || '-'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">No. Handphone</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.nomorHandphone || selectedPPDB.telefonOrangTua || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Masuk Kelas</p>
                          <p className="text-sm font-medium text-gray-900">Kelas {selectedPPDB.masukKelas || '1'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Kesehatan */}
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                    <h4 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center">
                      <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">🏥</span>
                      Data Kesehatan
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Penyakit yang Pernah Diderita</p>
                        <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedPPDB.penyakitPernah || 'Tidak Ada'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Kelainan Fisik</p>
                        <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border">{selectedPPDB.kelainanFisik || 'Tidak Ada'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Orang Tua */}
                <div className="space-y-6">
                  {/* Data Ayah */}
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                    <h4 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center">
                      <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">👨</span>
                      Data Ayah
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nama Lengkap</p>
                        <p className="text-sm font-bold text-gray-900">{selectedPPDB.namaLengkapAyah || selectedPPDB.namaAyah || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tempat, Tanggal Lahir</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPPDB.tempatTanggalLahirAyah || '-'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Pendidikan</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.pendidikanTerakhirAyah || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Agama</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.agamaAyah || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Pekerjaan</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPPDB.pekerjaanAyah || '-'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">No. Handphone</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.nomorHandphoneAyah || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Penghasilan</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedPPDB.penghasilanAyah ? `Rp ${parseInt(selectedPPDB.penghasilanAyah).toLocaleString('id-ID')}` : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Ibu */}
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                    <h4 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center">
                      <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">👩</span>
                      Data Ibu
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nama Lengkap</p>
                        <p className="text-sm font-bold text-gray-900">{selectedPPDB.namaLengkapIbu || selectedPPDB.namaIbu || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tempat, Tanggal Lahir</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPPDB.tempatTanggalLahirIbu || '-'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Pendidikan</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.pendidikanTerakhirIbu || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Agama</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.agamaIbu || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Pekerjaan</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPPDB.pekerjaanIbu || '-'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">No. Handphone</p>
                          <p className="text-sm font-medium text-gray-900">{selectedPPDB.nomorHandphoneIbu || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Penghasilan</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedPPDB.penghasilanIbu ? `Rp ${parseInt(selectedPPDB.penghasilanIbu).toLocaleString('id-ID')}` : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dokumen Upload */}
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                <h4 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center">
                  <span className="w-8 h-8 bg-[#2d5016] text-white rounded-full flex items-center justify-center text-sm mr-3">📄</span>
                  Dokumen Upload
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { label: 'Akta Kelahiran', file: selectedPPDB.scanAktaKelahiran },
                    { label: 'Pas Foto', file: selectedPPDB.pasFoto },
                    { label: 'KTP Ayah', file: selectedPPDB.scanKTPAyah },
                    { label: 'KTP Ibu', file: selectedPPDB.scanKTPIbu },
                    { label: 'Kartu Keluarga', file: selectedPPDB.scanKartuKeluarga }
                  ].map((doc, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{doc.label}</p>
                      {doc.file ? (
                        <a
                          href={`http://localhost:3000${doc.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full p-3 bg-[#2d5016] hover:bg-[#3d6b1f] text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Lihat File
                        </a>
                      ) : (
                        <div className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg text-sm border">
                          Tidak ada file
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedPPDB.status === 'pending' && (
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedPPDB.id, 'approved')
                      setShowDetailModal(false)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Terima Pendaftar
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedPPDB.id, 'rejected')
                      setShowDetailModal(false)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Tolak Pendaftar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
