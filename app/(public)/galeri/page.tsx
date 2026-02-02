'use client'

import { useState, useEffect, useRef } from 'react'
import { formatDate } from '@/lib/formatDate'
import Card from '@/components/Card'
import Image from 'next/image'

interface GaleriItem {
  id: string
  judul: string
  deskripsi: string | null
  gambar: string | null
  video: string | null
  kategori: string
  tipe: string
  createdAt: Date
}

interface VideoState {
  [key: string]: {
    isPlaying: boolean
    showControls: boolean
  }
}

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([])
  const [filteredList, setFilteredList] = useState<GaleriItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [videoStates, setVideoStates] = useState<VideoState>({})

  const handleVideoPlay = (itemId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [itemId]: {
        isPlaying: true,
        showControls: true
      }
    }))
  }

  const handleVideoPause = (itemId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [itemId]: {
        isPlaying: false,
        showControls: true
      }
    }))
  }

  const handlePlayButtonClick = (itemId: string) => {
    const video = document.querySelector(`#video-${itemId}`) as HTMLVideoElement
    if (video) {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
  }

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Galeri Media</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Dokumentasi foto dan video kegiatan serta momen berharga di SDIT ANNAJM RABBANI
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">
        {/* Filter Section - Sticky */}
        {galeriList.length > 0 && (
          <Card className="mb-6 sticky top-20 z-50 shadow-xl backdrop-blur-md bg-white/98 border border-white/20">
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari media..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all text-sm bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-all hover:scale-105 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
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
                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-xs font-medium hover:scale-105"
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
                <span className="font-semibold text-[#2d5016]">{filteredList.length}</span> dari {galeriList.length} media
              </span>
              {(activeCategory !== 'Semua' || searchQuery) && (
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md font-medium">Filter aktif</span>
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
                ? 'Tidak ada media yang sesuai dengan filter' 
                : 'Belum ada media di galeri'}
            </p>
            {(searchQuery || activeCategory !== 'Semua') && (
              <button
                onClick={() => {
                  setActiveCategory('Semua')
                  setSearchQuery('')
                }}
                className="mt-4 text-[#2d5016] hover:text-[#3d6b1f] font-semibold"
              >
                Tampilkan semua media
              </button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-100 hover:border-yellow-400">
                {/* Media Container */}
                <div className="aspect-video bg-gray-100 relative">
                  {/* Media Content */}
                  {item.tipe === 'video' && item.video ? (
                    <div className="relative w-full h-full">
                      <video 
                        id={`video-${item.id}`}
                        src={item.video}
                        preload="metadata"
                        className="w-full h-full object-cover"
                        poster={item.gambar || undefined}
                        onPlay={() => handleVideoPlay(item.id)}
                        onPause={() => handleVideoPause(item.id)}
                        controls={videoStates[item.id]?.showControls || false}
                      />
                      
                      {/* Play Button */}
                      {!videoStates[item.id]?.isPlaying && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
                          onClick={() => handlePlayButtonClick(item.id)}
                        >
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Video Badge */}
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        VIDEO
                      </div>
                    </div>
                  ) : item.gambar ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={item.gambar} 
                        alt={item.judul}
                        fill
                        className="object-cover" 
                      />
                      
                      {/* Photo Badge */}
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        FOTO
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-base mb-2 text-gray-900 line-clamp-2">
                    {item.judul}
                  </h3>
                  {item.deskripsi && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.deskripsi}</p>
                  )}
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item.kategori}
                    </span>
                    <span className="text-gray-500">{formatDate(item.createdAt)}</span>
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