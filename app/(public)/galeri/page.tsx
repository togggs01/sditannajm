'use client'

import { useState, useEffect } from 'react'
import { formatDate } from '@/lib/formatDate'
import Card from '@/components/Card'
import Image from 'next/image'

interface GaleriItem {
  id: string
  judul: string
  deskripsi: string | null
  gambar: string
  kategori: string
  createdAt: Date
}

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([])
  const [filteredList, setFilteredList] = useState<GaleriItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGaleri()
  }, [])

  useEffect(() => {
    filterGaleri()
  }, [activeCategory, searchQuery, galeriList])

  const fetchGaleri = async () => {
    try {
      const res = await fetch('/api/galeri')
      const data = await res.json()
      setGaleriList(data)
      setFilteredList(data)
    } catch (error) {
      console.error('Error fetching galeri:', error)
    } finally {
      setLoading(false)
    }
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

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(galeriList.map(item => item.kategori)))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Galeri Foto</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen berharga di SDIT ANNAJM
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">
        {/* Filter Section - Minimalis */}
        {galeriList.length > 0 && (
          <Card className="mb-6 sticky top-20 z-10 shadow-lg backdrop-blur-sm bg-white/95">
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari foto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-all ${
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
                    onClick={() => {
                      setActiveCategory('Semua')
                      setSearchQuery('')
                    }}
                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-xs font-medium"
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
          </Card>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2d5016] border-t-transparent"></div>
            <p className="text-gray-600 mt-4">Memuat galeri...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">
              {searchQuery || activeCategory !== 'Semua' ? '🔍' : '🖼️'}
            </div>
            <p className="text-gray-600 text-lg font-semibold mb-2">
              {searchQuery || activeCategory !== 'Semua' 
                ? 'Tidak ada foto yang sesuai dengan filter' 
                : 'Belum ada foto di galeri'}
            </p>
            {(searchQuery || activeCategory !== 'Semua') && (
              <button
                onClick={() => {
                  setActiveCategory('Semua')
                  setSearchQuery('')
                }}
                className="mt-4 text-[#2d5016] hover:text-[#3d6b1f] font-semibold"
              >
                Tampilkan semua foto
              </button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden -m-6 mb-6 relative">
                  {item.gambar ? (
                    <Image 
                      src={item.gambar} 
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-6xl">🖼️</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#2d5016] group-hover:text-[#3d6b1f] transition-colors">
                  {item.judul}
                </h3>
                {item.deskripsi && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.deskripsi}</p>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] px-3 py-1 rounded-full font-semibold text-xs">
                    {item.kategori}
                  </span>
                  <span className="text-gray-500 flex items-center text-xs">
                    <span className="mr-1">📅</span>
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
