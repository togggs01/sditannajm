'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'
import VideoUpload from '@/components/VideoUpload'
import PageHeader from '@/components/admin/PageHeader'
import ActionButton from '@/components/admin/ActionButton'
import FormInput from '@/components/admin/FormInput'
import Image from 'next/image'
import { useToast } from '@/hooks/useToast'

export default function AdminGaleriPage() {
  const { showToast, ToastComponent } = useToast()
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
    video: '',
    kategori: '',
    tipe: 'gambar' // 'gambar' atau 'video'
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
    
    try {
      // Validate required fields based on type
      if (!formData.judul || !formData.kategori || !formData.tipe) {
        showToast('Judul, kategori, dan tipe wajib diisi', 'warning')
        return
      }

      // Validate description length
      if (formData.deskripsi && formData.deskripsi.length > 40) {
        showToast('Deskripsi tidak boleh lebih dari 40 karakter', 'warning')
        return
      }

      // Validate media based on type
      if (formData.tipe === 'gambar' && !formData.gambar) {
        showToast('Gambar wajib diisi untuk tipe gambar', 'warning')
        return
      }

      if (formData.tipe === 'video' && !formData.video) {
        showToast('Video wajib diisi untuk tipe video', 'warning')
        return
      }

      console.log('Submitting form data:', formData)

      // Retry mechanism for API calls
      const makeRequest = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            let response
            if (editId) {
              console.log(`Attempt ${i + 1}: Updating existing item with ID:`, editId)
              response = await fetch(`/api/galeri?id=${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              })
            } else {
              console.log(`Attempt ${i + 1}: Creating new item`)
              response = await fetch('/api/galeri', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              })
            }

            console.log(`Attempt ${i + 1} - Response status:`, response.status)
            console.log(`Attempt ${i + 1} - Response ok:`, response.ok)

            // Check if response is HTML (Next.js error page)
            const contentType = response.headers.get('content-type') || ''
            
            if (contentType.includes('text/html')) {
              console.log(`Attempt ${i + 1} - Received HTML response, server might be restarting`)
              if (i < retries - 1) {
                console.log(`Waiting 3 seconds before retry...`)
                await new Promise(resolve => setTimeout(resolve, 3000))
                continue
              } else {
                throw new Error('Server sedang restart. Silakan tunggu beberapa detik dan refresh halaman.')
              }
            }

            if (!response.ok) {
              let errorData: { error?: string } = {}
              
              try {
                if (contentType.includes('application/json')) {
                  errorData = await response.json()
                } else {
                  const errorText = await response.text()
                  errorData = { error: `Server Error (${response.status}): ${response.statusText}` }
                }
              } catch (parseError) {
                errorData = { error: `Server Error (${response.status}): Unable to parse response` }
              }
              
              throw new Error(errorData?.error || `HTTP Error: ${response.status}`)
            }

            // Success - parse JSON response
            const result = await response.json()
            console.log(`Attempt ${i + 1} - Success:`, result)
            return result
            
          } catch (fetchError) {
            console.error(`Attempt ${i + 1} - Fetch Error:`, fetchError)
            
            if (i === retries - 1) {
              throw fetchError
            }
            
            // Wait before retry
            console.log(`Waiting 3 seconds before retry...`)
            await new Promise(resolve => setTimeout(resolve, 3000))
          }
        }
      }

      const result = await makeRequest()
      
      const mediaType = formData.tipe === 'video' ? 'Video' : 'Foto'
      showToast(editId ? `${mediaType} berhasil diupdate!` : `${mediaType} berhasil ditambahkan!`, 'success')
      resetForm()
      fetchGaleri()
      
    } catch (error) {
      console.error('Submit Error Details:', error)
      
      // More detailed error handling
      let errorMessage = 'Terjadi kesalahan tidak diketahui'
      
      if (error instanceof Error) {
        if (error.message.includes('Server sedang restart')) {
          errorMessage = 'Server sedang restart. Silakan tunggu beberapa detik dan refresh halaman.'
        } else if (error.message.includes('JSON')) {
          errorMessage = 'Server sedang restart. Silakan tunggu beberapa detik dan coba lagi.'
        } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Koneksi ke server bermasalah. Pastikan server berjalan dan coba lagi.'
        } else {
          errorMessage = error.message
        }
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      const mediaType = formData.tipe === 'video' ? 'video' : 'foto'
      showToast(`Gagal ${editId ? 'mengupdate' : 'menambahkan'} ${mediaType}: ${errorMessage}`, 'error')
    }
  }

  const handleEdit = (galeri: any) => {
    console.log('Editing galeri:', galeri)
    setFormData({
      judul: galeri.judul || '',
      deskripsi: galeri.deskripsi || '',
      gambar: galeri.gambar || '',
      video: galeri.video || '',
      kategori: galeri.kategori || '',
      tipe: galeri.tipe || 'gambar'
    })
    setEditId(galeri.id)
    setShowForm(true)
    
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      try {
        const response = await fetch(`/api/galeri?id=${id}`, { method: 'DELETE' })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Gagal menghapus foto')
        }
        
        showToast('Foto berhasil dihapus!', 'success')
        fetchGaleri()
      } catch (error) {
        console.error('Delete error:', error)
        showToast(`Gagal menghapus foto: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
      }
    }
  }

  const resetForm = () => {
    setFormData({ judul: '', deskripsi: '', gambar: '', video: '', kategori: '', tipe: 'gambar' })
    setEditId(null)
    setShowForm(false)
  }

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(galeriList.map(item => item.kategori)))]

  return (
    <>
      {ToastComponent}
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
            {showForm ? 'Tutup Form' : 'Tambah Media'}
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
                <h2 className="text-2xl font-bold text-[#2d5016]">{editId ? 'Edit Media' : 'Tambah Media Baru'}</h2>
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

              {/* Deskripsi dengan batas karakter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Deskripsi
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <textarea
                    value={formData.deskripsi}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value.length <= 40) {
                        setFormData({...formData, deskripsi: value})
                      }
                    }}
                    placeholder="Deskripsi singkat tentang dokumentasi (maksimal 40 karakter)"
                    rows={3}
                    maxLength={40}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-white text-gray-900 resize-none"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Deskripsi singkat untuk dokumentasi</span>
                  <span className={`font-medium ${
                    formData.deskripsi.length >= 35 
                      ? formData.deskripsi.length === 40 
                        ? 'text-red-600' 
                        : 'text-orange-600'
                      : 'text-gray-500'
                  }`}>
                    {formData.deskripsi.length}/40 karakter
                  </span>
                </div>
              </div>

              {/* Tipe Media */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Tipe Media
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipe"
                      value="gambar"
                      checked={formData.tipe === 'gambar'}
                      onChange={(e) => setFormData({...formData, tipe: e.target.value, video: '', gambar: ''})}
                      className="w-4 h-4 text-[#2d5016] focus:ring-[#2d5016]"
                    />
                    <span className="text-sm font-medium text-gray-700">📷 Gambar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipe"
                      value="video"
                      checked={formData.tipe === 'video'}
                      onChange={(e) => setFormData({...formData, tipe: e.target.value, gambar: '', video: ''})}
                      className="w-4 h-4 text-[#2d5016] focus:ring-[#2d5016]"
                    />
                    <span className="text-sm font-medium text-gray-700">🎥 Video</span>
                  </label>
                </div>
              </div>

              {/* Conditional Media Upload */}
              {formData.tipe === 'gambar' ? (
                <ImageUpload
                  value={formData.gambar}
                  onChange={(url) => setFormData({...formData, gambar: url})}
                  label="Foto Galeri *"
                />
              ) : (
                <VideoUpload
                  value={formData.video}
                  onChange={(url) => setFormData({...formData, video: url})}
                  label="Video Dokumentasi *"
                />
              )}

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
                  {editId ? 'Update Media' : 'Simpan Media'}
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
            <p className="text-gray-500 font-medium text-lg">Belum ada media di galeri</p>
            <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Media" untuk menambahkan</p>
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
                  {/* Media Type Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      galeri.tipe === 'video' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {galeri.tipe === 'video' ? '🎥' : '📷'}
                      {galeri.tipe === 'video' ? 'Video' : 'Foto'}
                    </span>
                  </div>

                  {galeri.tipe === 'video' && galeri.video ? (
                    <video 
                      src={galeri.video}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    />
                  ) : galeri.gambar ? (
                    <Image 
                      src={galeri.gambar} 
                      alt={galeri.judul} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {galeri.tipe === 'video' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        )}
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{galeri.judul}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{galeri.deskripsi || 'Tidak ada deskripsi'}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f]">
                      {galeri.kategori}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      galeri.tipe === 'video' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {galeri.tipe === 'video' ? 'Video' : 'Gambar'}
                    </span>
                  </div>
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
    </>
  )
}
