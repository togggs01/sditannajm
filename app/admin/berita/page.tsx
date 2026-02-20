'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'
import PageHeader from '@/components/admin/PageHeader'
import ActionButton from '@/components/admin/ActionButton'
import FormInput from '@/components/admin/FormInput'

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: '',
    penulis: '',
    kategori: '',
    published: true
  })

  useEffect(() => {
    fetchBerita()
  }, [])

  const fetchBerita = async () => {
    const res = await fetch('/api/berita')
    const data = await res.json()
    setBeritaList(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Submitting berita:', {
      judul: formData.judul,
      penulis: formData.penulis,
      kategori: formData.kategori,
      hasGambar: !!formData.gambar,
      gambarLength: formData.gambar?.length || 0,
      gambarPreview: formData.gambar?.substring(0, 50) + '...'
    })
    
    if (editId) {
      const response = await fetch(`/api/berita?id=${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      console.log('Update response:', result)
    } else {
      const response = await fetch('/api/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      console.log('Create response:', result)
    }

    resetForm()
    fetchBerita()
  }

  const handleEdit = (berita: any) => {
    setFormData(berita)
    setEditId(berita.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      await fetch(`/api/berita?id=${id}`, { method: 'DELETE' })
      fetchBerita()
    }
  }

  const resetForm = () => {
    setFormData({ judul: '', konten: '', gambar: '', penulis: '', kategori: '', published: true })
    setEditId(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Kelola Berita"
        description="Tambah, edit, dan hapus berita sekolah"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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
            {showForm ? 'Tutup Form' : 'Tambah Berita'}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  )}
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2d5016]">{editId ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
                <p className="text-sm text-gray-600">Lengkapi form di bawah ini dengan data yang valid</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Judul Berita"
                value={formData.judul}
                onChange={(value) => setFormData({...formData, judul: value})}
                placeholder="Masukkan judul berita"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                }
              />

              <FormInput
                label="Konten Berita"
                type="textarea"
                value={formData.konten}
                onChange={(value) => setFormData({...formData, konten: value})}
                placeholder="Tulis konten berita di sini..."
                required
                rows={8}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />

              <ImageUpload
                value={formData.gambar}
                onChange={(url) => setFormData({...formData, gambar: url})}
                label="Gambar Berita"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Penulis"
                  value={formData.penulis}
                  onChange={(value) => setFormData({...formData, penulis: value})}
                  placeholder="Nama penulis"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Kategori
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-white text-gray-900"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Berita">Berita</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="w-5 h-5 text-[#2d5016] border-gray-300 rounded focus:ring-[#2d5016]"
                />
                <label htmlFor="published" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Publikasikan berita ini
                </label>
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
                  {editId ? 'Update Berita' : 'Simpan Berita'}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold">Judul</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Gambar</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Penulis</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {beritaList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p className="text-gray-500 font-medium">Belum ada berita</p>
                      <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Berita" untuk menambahkan</p>
                    </td>
                  </tr>
                ) : (
                  beritaList.map((berita) => (
                    <tr key={berita.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900 line-clamp-2">{berita.judul}</p>
                      </td>
                      <td className="px-6 py-4">
                        {berita.gambar ? (
                          <img 
                            src={berita.gambar} 
                            alt={berita.judul}
                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f]">
                          {berita.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{berita.penulis}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          berita.published 
                            ? 'bg-gradient-to-r from-[#2d5016]/20 to-[#3d6b1f]/20 text-[#2d5016] border border-[#2d5016]/30' 
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}>
                          {berita.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(berita)} 
                            className="p-2 text-[#2d5016] hover:bg-[#2d5016]/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(berita.id)} 
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
