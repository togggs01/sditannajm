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
      // Pastikan data adalah array
      setPpdbList(Array.isArray(data) ? data : [])
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
      // Import jsPDF dynamically
      const { default: jsPDF } = await import('jspdf')
      const { default: autoTable } = await import('jspdf-autotable')
      
      const doc = new jsPDF('l', 'mm', 'a4') // landscape orientation
      const pageWidth = doc.internal.pageSize.getWidth()
      
      // Add header background
      doc.setFillColor(45, 80, 22) // #2d5016
      doc.rect(0, 0, pageWidth, 35, 'F')
      
      // Add title
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('LAPORAN DATA PPDB', pageWidth / 2, 12, { align: 'center' })
      
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('SDIT AN-NAJM RABBANI', pageWidth / 2, 20, { align: 'center' })
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text(`Tahun Ajaran: ${selectedTahunAjaran}`, pageWidth / 2, 27, { align: 'center' })
      
      // Add date
      const today = new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(9)
      doc.text(`Dicetak pada: ${today}`, 14, 42)
      
      // Prepare table data
      const tableData = filteredList.map((ppdb, index) => [
        index + 1,
        ppdb.namaLengkap,
        `${ppdb.tempatLahir}, ${ppdb.tanggalLahir}`,
        ppdb.jenisKelamin,
        `Ayah: ${ppdb.namaLengkapAyah || ppdb.namaAyah || '-'}\nIbu: ${ppdb.namaLengkapIbu || ppdb.namaIbu || '-'}`,
        ppdb.nomorHandphone || ppdb.teleponOrangTua || '-',
        ppdb.alamatRumah || ppdb.alamat || '-',
        ppdb.status === 'pending' ? 'Menunggu' : ppdb.status === 'approved' ? 'Diterima' : 'Ditolak'
      ])
      
      // Add table
      autoTable(doc, {
        startY: 47,
        head: [['No', 'Nama Lengkap', 'TTL', 'JK', 'Orang Tua', 'No. Telepon', 'Alamat', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [45, 80, 22], // #2d5016
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
          fontSize: 9,
          cellPadding: 4
        },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          lineColor: [200, 200, 200],
          lineWidth: 0.1
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 10 },
          1: { cellWidth: 35 },
          2: { cellWidth: 30 },
          3: { halign: 'center', cellWidth: 12 },
          4: { cellWidth: 35 },
          5: { cellWidth: 25 },
          6: { cellWidth: 45 },
          7: { halign: 'center', cellWidth: 20 }
        },
        alternateRowStyles: {
          fillColor: [250, 250, 250]
        },
        didDrawPage: (data) => {
          // Footer with page number
          const pageCount = doc.getNumberOfPages()
          const pageHeight = doc.internal.pageSize.getHeight()
          
          // Footer line
          doc.setDrawColor(45, 80, 22)
          doc.setLineWidth(0.5)
          doc.line(14, pageHeight - 15, pageWidth - 14, pageHeight - 15)
          
          // Page number
          doc.setFontSize(8)
          doc.setTextColor(100, 100, 100)
          doc.text(
            `Halaman ${data.pageNumber} dari ${pageCount}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          )
          
          // School name in footer
          doc.setFontSize(7)
          doc.text('SDIT AN-NAJM RABBANI', 14, pageHeight - 10)
        }
      })
      
      // Add summary box
      const finalY = (doc as any).lastAutoTable.finalY || 47
      const summaryY = finalY + 10
      
      // Summary box background
      doc.setFillColor(245, 245, 245)
      doc.roundedRect(14, summaryY, 100, 35, 2, 2, 'F')
      
      // Summary border
      doc.setDrawColor(45, 80, 22)
      doc.setLineWidth(0.5)
      doc.roundedRect(14, summaryY, 100, 35, 2, 2, 'S')
      
      // Summary title
      doc.setFillColor(45, 80, 22)
      doc.roundedRect(14, summaryY, 100, 8, 2, 2, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('RINGKASAN:', 17, summaryY + 5.5)
      
      // Summary content
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(`Total Pendaftar: ${stats.total}`, 17, summaryY + 14)
      doc.text(`Menunggu: ${stats.pending}`, 17, summaryY + 20)
      doc.text(`Diterima: ${stats.approved}`, 17, summaryY + 26)
      doc.text(`Ditolak: ${stats.rejected}`, 17, summaryY + 32)
      
      // Save PDF with better filename
      const filename = `PPDB_${selectedTahunAjaran.replace('/', '-')}_${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(filename)
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )
            }
          >
            {exporting ? 'Membuat PDF...' : 'Export PDF'}
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
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <div className="flex-1">
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
                <div className="mt-7">
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
              </div>
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
                        <p className="text-sm font-medium">{selectedPPDB.namaLengkapAyah || selectedPPDB.namaAyah || '-'}</p>
                        <p className="text-xs text-gray-500">Ayah: {selectedPPDB.namaLengkapAyah || selectedPPDB.namaAyah || '-'}</p>
                        <p className="text-xs text-gray-500">Ibu: {selectedPPDB.namaLengkapIbu || selectedPPDB.namaIbu || '-'}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <p className="text-sm">{selectedPPDB.nomorHandphone || selectedPPDB.telefonOrangTua || '-'}</p>
                        <p className="text-xs text-gray-500">{selectedPPDB.nomorHandphoneAyah || '-'}</p>
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Detail Pendaftar</h3>
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
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
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

                {/* WhatsApp Button - Only show if approved */}
                {selectedPPDB.status === 'approved' && (selectedPPDB.nomorHandphone || selectedPPDB.teleponOrangTua) && (
                  <a
                    href={`https://wa.me/${(selectedPPDB.nomorHandphone || selectedPPDB.teleponOrangTua).replace(/[^0-9]/g, '')}?text=Assalamu'alaikum%20${encodeURIComponent(selectedPPDB.namaLengkapAyah || selectedPPDB.namaAyah || 'Bapak/Ibu')},%0A%0ASelamat!%20Kami%20informasikan%20bahwa%20putra/putri%20Bapak/Ibu%20*${encodeURIComponent(selectedPPDB.namaLengkap)}*%20telah%20*DITERIMA*%20di%20SDIT%20ANNAJM%20RABBANI%20untuk%20Tahun%20Ajaran%20${encodeURIComponent(selectedPPDB.tahunAjaran)}.%0A%0ASilakan%20hubungi%20kami%20untuk%20informasi%20lebih%20lanjut%20mengenai%20proses%20selanjutnya.%0A%0AJazakumullah%20khairan`}
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

              {/* Data Grid */}
              <div className="space-y-6">
                {/* Data Siswa */}
                <div>
                  <h4 className="text-lg font-bold text-[#2d5016] mb-3 pb-2 border-b-2 border-[#d4af37]/30">👤 Data Calon Peserta Didik</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Nama Lengkap</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.namaLengkap}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Nama Panggilan</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.namaPanggilan || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Tempat Lahir</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.tempatLahir}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Tanggal Lahir</p>
                      <p className="text-base text-gray-900 font-medium">{new Date(selectedPPDB.tanggalLahir).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Jenis Kelamin</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.jenisKelamin}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Agama</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.agama || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Kewarganegaraan</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.kewarganegaraan || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Bahasa Sehari-hari</p>
                      <p className="text-base text-gray-900 font-medium">
                        {selectedPPDB.bahasaSehari ? 
                          (typeof selectedPPDB.bahasaSehari === 'string' ? 
                            JSON.parse(selectedPPDB.bahasaSehari).join(', ') : 
                            selectedPPDB.bahasaSehari.join(', ')
                          ) : '-'
                        }
                        {selectedPPDB.bahasaLainnya && ` (${selectedPPDB.bahasaLainnya})`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Tinggi / Berat Badan</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.tinggiBadan || '-'} cm / {selectedPPDB.beratBadan || '-'} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Golongan Darah</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.golonganDarah || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Alamat Rumah</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.alamatRumah || selectedPPDB.alamat || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">No. Handphone</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.nomorHandphone || selectedPPDB.teleponOrangTua || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Jarak Rumah - Sekolah</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.jarakRumahSekolah || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Masuk Kelas</p>
                      <p className="text-base text-gray-900 font-medium">Kelas {selectedPPDB.masukKelas || '1'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Asal Sekolah</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.asalSekolah || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Jumlah Saudara</p>
                      <p className="text-base text-gray-900 font-medium">
                        Kandung: {selectedPPDB.jumlahSaudaraKandung || selectedPPDB.jumlahSaudara || '0'}, 
                        Tiri: {selectedPPDB.jumlahSaudaraTiri || '0'}, 
                        Angkat: {selectedPPDB.jumlahSaudaraAngkat || '0'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Penyakit yang Pernah Diderita</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.penyakitPernah || '-'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Kelainan Fisik</p>
                      <p className="text-base text-gray-900 font-medium">{selectedPPDB.kelainanFisik || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Data Orang Tua */}
                <div>
                  <h4 className="text-lg font-bold text-[#2d5016] mb-3 pb-2 border-b-2 border-[#d4af37]/30">👨‍👩‍👧 Data Orang Tua / Wali</h4>
                  
                  {/* Data Ayah */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-bold text-blue-800 mb-3">Data Ayah</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Nama Lengkap</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.namaLengkapAyah || selectedPPDB.namaAyah || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Tempat, Tanggal Lahir</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.tempatTanggalLahirAyah || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Pendidikan Terakhir</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.pendidikanTerakhirAyah || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Agama</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.agamaAyah || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">No. Handphone</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.nomorHandphoneAyah || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Pekerjaan</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.pekerjaanAyah || '-'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-600 mb-1">Penghasilan per Bulan</p>
                        <p className="text-base text-gray-900 font-medium">Rp {selectedPPDB.penghasilanAyah ? parseInt(selectedPPDB.penghasilanAyah).toLocaleString('id-ID') : '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Data Ibu */}
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <h5 className="font-bold text-pink-800 mb-3">Data Ibu</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Nama Lengkap</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.namaLengkapIbu || selectedPPDB.namaIbu || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Tempat, Tanggal Lahir</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.tempatTanggalLahirIbu || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Pendidikan Terakhir</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.pendidikanTerakhirIbu || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Agama</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.agamaIbu || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">No. Handphone</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.nomorHandphoneIbu || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Pekerjaan</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.pekerjaanIbu || '-'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-600 mb-1">Penghasilan per Bulan</p>
                        <p className="text-base text-gray-900 font-medium">Rp {selectedPPDB.penghasilanIbu ? parseInt(selectedPPDB.penghasilanIbu).toLocaleString('id-ID') : '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Administrasi */}
                <div>
                  <h4 className="text-lg font-bold text-[#2d5016] mb-3 pb-2 border-b-2 border-[#d4af37]/30">📄 Berkas Persyaratan</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Dokumen yang Diupload</p>
                      <div className="flex gap-2 flex-wrap">
                        {(selectedPPDB.scanAktaKelahiran || selectedPPDB.fotoAktaLahir) && (
                          <a 
                            href={`http://localhost:3000${selectedPPDB.scanAktaKelahiran || selectedPPDB.fotoAktaLahir}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors border border-purple-200"
                          >
                            📜 Akta Kelahiran
                          </a>
                        )}
                        {(selectedPPDB.pasFoto || selectedPPDB.fotoSiswa) && (
                          <a 
                            href={`http://localhost:3000${selectedPPDB.pasFoto || selectedPPDB.fotoSiswa}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
                          >
                            📷 Pas Foto
                          </a>
                        )}
                        {selectedPPDB.scanKTPAyah && (
                          <a 
                            href={`http://localhost:3000${selectedPPDB.scanKTPAyah}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                          >
                            🆔 KTP Ayah
                          </a>
                        )}
                        {selectedPPDB.scanKTPIbu && (
                          <a 
                            href={`http://localhost:3000${selectedPPDB.scanKTPIbu}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg text-sm font-medium hover:bg-pink-100 transition-colors border border-pink-200"
                          >
                            🆔 KTP Ibu
                          </a>
                        )}
                        {(selectedPPDB.scanKartuKeluarga || selectedPPDB.fotoKK) && (
                          <a 
                            href={`http://localhost:3000${selectedPPDB.scanKartuKeluarga || selectedPPDB.fotoKK}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors border border-yellow-200"
                          >
                            👨‍👩‍👧‍👦 Kartu Keluarga
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Tahun Ajaran</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.tahunAjaran}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Gelombang Pendaftaran</p>
                        <p className="text-base text-gray-900 font-medium">{selectedPPDB.gelombang || 'Gelombang 1'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-600 mb-1">Tanggal Pendaftaran</p>
                        <p className="text-base text-gray-900 font-medium">{new Date(selectedPPDB.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              {selectedPPDB.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateStatus(selectedPPDB.id, 'approved')
                      setShowDetailModal(false)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Terima Pendaftar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateStatus(selectedPPDB.id, 'rejected')
                      setShowDetailModal(false)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
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
