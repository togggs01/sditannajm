'use client'

import { useState, useEffect } from 'react'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'
import { formatTanggalIndonesia, getGelombangColor } from '@/lib/gelombangPPDB'
import PageHeader from '@/components/admin/PageHeader'
import ActionButton from '@/components/admin/ActionButton'

interface Gelombang {
  id: string
  tahunAjaran: string
  gelombang: string
  tanggalMulai: string
  tanggalSelesai: string
  kuota: number | null
  aktif: boolean
  createdAt: string
  jumlahPendaftar?: number
  sisaKuota?: number | null
}

export default function AdminGelombangPPDBPage() {
  const [gelombangList, setGelombangList] = useState<Gelombang[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    tahunAjaran: getCurrentTahunAjaran(),
    gelombang: 'Gelombang 1',
    tanggalMulai: '',
    tanggalSelesai: '',
    kuota: '',
    aktif: true
  })

  useEffect(() => {
    fetchGelombang()
  }, [])

  const fetchGelombang = async () => {
    try {
      setFetchLoading(true)
      console.log('Fetching gelombang data...')
      const res = await fetch('/api/gelombang-ppdb')
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      console.log('Gelombang data received:', data)
      
      // Pastikan data adalah array
      if (Array.isArray(data)) {
        setGelombangList(data)
      } else {
        console.error('Data is not an array:', data)
        setGelombangList([])
      }
    } catch (error) {
      console.error('Error fetching gelombang:', error)
      setGelombangList([])
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingId ? `/api/gelombang-ppdb?id=${editingId}` : '/api/gelombang-ppdb'
      const method = editingId ? 'PUT' : 'POST'

      // Prepare data dengan konversi tipe yang benar
      const submitData = {
        ...formData,
        kuota: formData.kuota ? parseInt(formData.kuota) : null
      }

      console.log('Submitting gelombang data:', submitData)
      console.log('URL:', url, 'Method:', method)

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      console.log('Response status:', res.status)

      if (res.ok) {
        console.log('Gelombang saved successfully')
        
        // Refresh data gelombang
        await fetchGelombang()
        
        setShowModal(false)
        resetForm()
        
        // Trigger event untuk refresh tahun ajaran di halaman lain
        window.dispatchEvent(new CustomEvent('tahunAjaranUpdated'))
        
        // Juga simpan ke localStorage untuk trigger storage event
        localStorage.setItem('lastTahunAjaranUpdate', Date.now().toString())
        
        alert('Gelombang PPDB berhasil disimpan!')
      } else {
        const data = await res.json()
        console.error('Error response:', data)
        alert(data.error || 'Terjadi kesalahan')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (gelombang: Gelombang) => {
    setEditingId(gelombang.id)
    setFormData({
      tahunAjaran: gelombang.tahunAjaran,
      gelombang: gelombang.gelombang,
      tanggalMulai: gelombang.tanggalMulai,
      tanggalSelesai: gelombang.tanggalSelesai,
      kuota: gelombang.kuota?.toString() || '',
      aktif: gelombang.aktif
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus gelombang ini?')) {
      await fetch(`/api/gelombang-ppdb?id=${id}`, { method: 'DELETE' })
      fetchGelombang()
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      tahunAjaran: getCurrentTahunAjaran(),
      gelombang: 'Gelombang 1',
      tanggalMulai: '',
      tanggalSelesai: '',
      kuota: '',
      aktif: true
    })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Kelola Gelombang PPDB"
        description="Atur periode dan kuota pendaftaran PPDB"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        action={
          <div className="flex gap-2">
            <button
              onClick={fetchGelombang}
              disabled={fetchLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <svg className={`w-5 h-5 ${fetchLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <ActionButton
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Tambah Gelombang
            </ActionButton>
          </div>
        }
      />

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tahun Ajaran</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Gelombang</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Periode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kuota</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fetchLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <svg className="animate-spin h-8 w-8 text-[#2d5016] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-gray-500 font-medium">Memuat data gelombang...</p>
                    </td>
                  </tr>
                ) : gelombangList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">Belum ada gelombang PPDB</p>
                      <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Gelombang" untuk membuat</p>
                    </td>
                  </tr>
                ) : (
                  gelombangList.map((item) => {
                    const colors = getGelombangColor(item.gelombang)
                    const isActive = new Date(today) >= new Date(item.tanggalMulai) && new Date(today) <= new Date(item.tanggalSelesai)
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{item.tahunAjaran}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                            {item.gelombang}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <p className="text-sm">{formatTanggalIndonesia(item.tanggalMulai)}</p>
                          <p className="text-sm">s/d {formatTanggalIndonesia(item.tanggalSelesai)}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.kuota !== null ? (
                            <div>
                              <p className="text-sm font-medium">
                                {item.jumlahPendaftar || 0} / {item.kuota}
                              </p>
                              {item.sisaKuota !== undefined && (
                                <p className={`text-xs mt-1 font-semibold ${
                                  item.sisaKuota <= 0 
                                    ? 'text-red-600' 
                                    : item.sisaKuota <= 10
                                    ? 'text-orange-600'
                                    : 'text-green-600'
                                }`}>
                                  {item.sisaKuota <= 0 
                                    ? '🔴 Penuh' 
                                    : item.sisaKuota <= 10
                                    ? `⚠️ Sisa ${item.sisaKuota}`
                                    : `✅ Sisa ${item.sisaKuota}`
                                  }
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm font-medium">Tidak terbatas</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {item.aktif ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 w-fit">
                                ✓ Aktif
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200 w-fit">
                                ○ Nonaktif
                              </span>
                            )}
                            {isActive && item.aktif && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 text-[#d4af37] border border-[#d4af37]/30 w-fit">
                                Sedang Berjalan
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
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
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{editingId ? 'Edit' : 'Tambah'} Gelombang PPDB</h3>
                <button
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran *</label>
                  <input
                    type="text"
                    required
                    value={formData.tahunAjaran}
                    onChange={(e) => setFormData({...formData, tahunAjaran: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="2025/2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gelombang *</label>
                  <select
                    required
                    value={formData.gelombang}
                    onChange={(e) => setFormData({...formData, gelombang: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Gelombang 1">Gelombang 1</option>
                    <option value="Gelombang 2">Gelombang 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai *</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggalMulai}
                    onChange={(e) => setFormData({...formData, tanggalMulai: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Selesai *</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggalSelesai}
                    onChange={(e) => setFormData({...formData, tanggalSelesai: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kuota Pendaftar</label>
                <input
                  type="number"
                  min="1"
                  value={formData.kuota}
                  onChange={(e) => setFormData({...formData, kuota: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Kosongkan jika tidak terbatas"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="aktif"
                  checked={formData.aktif}
                  onChange={(e) => setFormData({...formData, aktif: e.target.checked})}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="aktif" className="text-sm font-medium text-gray-700">
                  Aktifkan gelombang ini
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white rounded-xl font-semibold transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
