'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'
import PageHeader from '@/components/admin/PageHeader'
import ActionButton from '@/components/admin/ActionButton'
import FormInput from '@/components/admin/FormInput'

export default function AdminGuruPage() {
  const [guruList, setGuruList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    jabatan: '',
    email: '',
    telepon: '',
    foto: ''
  })

  useEffect(() => {
    fetchGuru()
  }, [])

  const fetchGuru = async () => {
    try {
      console.log('Fetching guru data...')
      const res = await fetch('/api/guru', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Fetch response status:', res.status)
      
      if (!res.ok) {
        console.error('Fetch failed with status:', res.status)
        setGuruList([])
        setLoading(false)
        return
      }
      
      const data = await res.json()
      console.log('Guru data received:', data.length, 'items')
      setGuruList(data)
      setLoading(false)
    } catch (error) {
      console.error('Fetch guru error:', error)
      setGuruList([])
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editId ? `/api/guru?id=${editId}` : '/api/guru'
      const method = editId ? 'PUT' : 'POST'
      
      console.log('Submitting to:', url, 'Method:', method)
      console.log('Form data:', formData)
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        alert(`Error: ${errorData.message || errorData.error || 'Gagal menyimpan data'}`)
        return
      }
      
      const result = await response.json()
      console.log('Success:', result)
      
      alert(editId ? 'Data berhasil diupdate!' : 'Data berhasil ditambahkan!')
      resetForm()
      fetchGuru()
    } catch (error) {
      console.error('Submit error:', error)
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.')
    }
  }

  const handleEdit = (guru: any) => {
    setFormData(guru)
    setEditId(guru.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data guru ini?')) return
    
    try {
      console.log('Deleting guru:', id)
      const response = await fetch(`/api/guru?id=${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      
      console.log('Delete response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Delete error:', errorData)
        alert(`Error: ${errorData.message || errorData.error || 'Gagal menghapus data'}`)
        return
      }
      
      alert('Data berhasil dihapus!')
      fetchGuru()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Terjadi kesalahan saat menghapus data. Silakan coba lagi.')
    }
  }

  const resetForm = () => {
    setFormData({ nama: '', nip: '', jabatan: '', email: '', telepon: '', foto: '' })
    setEditId(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Kelola Guru & Staff"
        description="Tambah, edit, dan hapus data guru dan staff"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
        action={
          <ActionButton
            onClick={() => setShowForm(!showForm)}
            icon={
              showForm ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )
            }
          >
            {showForm ? 'Tutup Form' : 'Tambah Guru'}
          </ActionButton>
        }
      />

      <div className="p-6 space-y-6">
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#d4af37]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {editId ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  )}
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2d5016]">{editId ? 'Edit Data Guru' : 'Tambah Guru Baru'}</h2>
                <p className="text-sm text-gray-600">Lengkapi form di bawah ini dengan data yang valid</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nama Lengkap"
                  value={formData.nama}
                  onChange={(value) => setFormData({...formData, nama: value})}
                  placeholder="Masukkan nama lengkap"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <FormInput
                  label="NIP"
                  value={formData.nip}
                  onChange={(value) => setFormData({...formData, nip: value})}
                  placeholder="Nomor Induk Pegawai"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  }
                />

                <FormInput
                  label="Jabatan"
                  value={formData.jabatan}
                  onChange={(value) => setFormData({...formData, jabatan: value})}
                  placeholder="Contoh: Guru Kelas, Kepala Sekolah"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />

                <FormInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData({...formData, email: value})}
                  placeholder="email@example.com"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />

                <FormInput
                  label="Telepon"
                  type="tel"
                  value={formData.telepon}
                  onChange={(value) => setFormData({...formData, telepon: value})}
                  placeholder="08xxxxxxxxxx"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />
              </div>

              <div>
                <ImageUpload
                  value={formData.foto}
                  onChange={(url) => setFormData({...formData, foto: url})}
                  label="Foto Guru"
                />
              </div>

              <div className="flex gap-3 pt-6 border-t-2 border-[#d4af37]/20">
                <ActionButton
                  type="submit"
                  variant="primary"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                >
                  {editId ? 'Update Data' : 'Simpan Data'}
                </ActionButton>
                <ActionButton
                  type="button"
                  variant="secondary"
                  onClick={resetForm}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  }
                >
                  Batal
                </ActionButton>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Foto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">NIP</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Jabatan</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {guruList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-gray-500 font-medium">Belum ada data guru</p>
                      <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Guru" untuk menambahkan data</p>
                    </td>
                  </tr>
                ) : (
                  guruList.map((guru) => (
                    <tr key={guru.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-[#d4af37]">
                          {guru.foto ? (
                            <img src={guru.foto} alt={guru.nama} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{guru.nama}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{guru.nip || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016]">
                          {guru.jabatan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(guru)} 
                            className="p-2 text-[#2d5016] hover:bg-[#2d5016]/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(guru.id)} 
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
