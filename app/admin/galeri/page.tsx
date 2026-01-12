'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'
import PageHeader from '@/components/admin/PageHeader'
import ActionButton from '@/components/admin/ActionButton'
import FormInput from '@/components/admin/FormInput'
import Image from 'next/image'

export default function AdminGaleriPage() {
  const [galeriList, setGaleriList] = useState<any[]>([])
  const [filteredList, setFilteredList] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    gambar: '',
    kategori: ''
  })

  useEffect(() => {
    fetchGaleri()
  }, [])

  useEffect(() => {
    filterGaleri()
  }, [activeCategory, searchQuery, galeriList])

  const fetchGaleri = async () => {
    const res = await fetch('/api/galeri')
    const data = await res.json()
    setGaleriList(data)
    setFilteredList(data)
  }

  const filterGaleri = () => {
    let filtered = galeriList

    // Filter by category
    if (activeCategory !== 'Semua') {
      filtered = filtered.filter(item => item.kategori === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredList(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editId) {
      await fetch(`/api/galeri?id=${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    } else {
      await fetch('/api/galeri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }

    resetForm()
    fetchGaleri()
  }

  const handleEdit = (galeri: any) => {
    setFormData(galeri)
    setEditId(galeri.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      await fetch(`/api/galeri?id=${id}`, { method: 'DELETE' })
      fetchGaleri()
    }
  }

  const resetForm = () => {
    setFormData({ judul: '', deskripsi: '', gambar: '', kategori: '' })
    setEditId(null)
    setShowForm(false)
  }

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(galeriList.map(item => item.kategori)))]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Kelola Galeri"
        description="Tambah, edit, dan hapus foto galeri kegiatan"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
            {showForm ? 'Tutup Form' : 'Tambah Foto'}
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
                <h2 className="text-2xl font-bold text-[#2d5016]">{editId ? 'Edit Foto' : 'Tambah Foto Baru'}</h2>
                <p className="text-sm text-gray-600">Lengkapi form di bawah ini dengan data yang valid</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Judul Foto"
                value={formData.judul}
                onChange={(value) => setFormData({...formData, judul: value})}
                placeholder="Masukkan judul foto"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                }
              />

              <FormInput
                label="Deskripsi"
                type="textarea"
                value={formData.deskripsi}
                onChange={(value) => setFormData({...formData, deskripsi: value})}
                placeholder="Deskripsi singkat tentang foto"
                rows={4}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                }
              />

              <ImageUpload
                value={formData.gambar}
                onChange={(url) => setFormData({...formData, gambar: url})}
                label="Foto Galeri *"
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
                    <option value="Kegiatan Rutin">Kegiatan Rutin</option>
                    <option value="Pembelajaran">Pembelajaran</option>
                    <option value="Kompetisi">Kompetisi</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
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
                  {editId ? 'Update Foto' : 'Simpan Foto'}
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

        {/* Filter Section - Minimalis */}
        {!showForm && galeriList.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-4 relative">
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari foto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all text-sm bg-white"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 items-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                
                {/* Reset Button */}
                {(activeCategory !== 'Semua' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('Semua')
                      setSearchQuery('')
                    }}
                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-xs font-medium cursor-pointer"
                    title="Reset filter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <span>
                <span className="font-semibold text-[#2d5016]">{filteredList.length}</span> dari {galeriList.length} foto
              </span>
              {(activeCategory !== 'Semua' || searchQuery) && (
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Filter aktif</span>
              )}
            </div>
          </div>
        )}

        {/* Grid Gallery */}
        {galeriList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-12 text-center">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 font-medium text-lg">Belum ada foto di galeri</p>
            <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Foto" untuk menambahkan</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-12 text-center">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 font-medium text-lg">Tidak ada foto yang sesuai dengan filter</p>
            <p className="text-gray-400 text-sm mt-1">Coba ubah kata kunci pencarian atau kategori</p>
            <button
              onClick={() => {
                setActiveCategory('Semua')
                setSearchQuery('')
              }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Tampilkan Semua Foto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((galeri) => (
              <div key={galeri.id} className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {galeri.gambar ? (
                    <Image 
                      src={galeri.gambar} 
                      alt={galeri.judul} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{galeri.judul}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{galeri.deskripsi || 'Tidak ada deskripsi'}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] mb-4">
                    {galeri.kategori}
                  </span>
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button 
                      type="button"
                      onClick={() => handleEdit(galeri)} 
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[#2d5016] hover:bg-[#2d5016]/10 rounded-lg transition-colors font-semibold text-sm cursor-pointer"
                    >
                      <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDelete(galeri.id)} 
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold text-sm cursor-pointer"
                    >
                      <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
