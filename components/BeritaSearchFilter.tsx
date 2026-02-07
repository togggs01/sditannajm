'use client'

import { useState, useMemo, useEffect } from 'react'
import { Berita } from '@prisma/client'

interface BeritaSearchFilterProps {
  beritaList: Berita[]
  onFilteredResults: (results: Berita[]) => void
}

export default function BeritaSearchFilter({ beritaList, onFilteredResults }: BeritaSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = beritaList.map(berita => berita.kategori)
    return Array.from(new Set(cats))
  }, [beritaList])

  // Filter and sort berita
  const filteredBerita = useMemo(() => {
    let filtered = beritaList.filter(berita => {
      const matchesSearch = berita.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           berita.konten.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           berita.penulis.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || berita.kategori === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'title':
          return a.judul.localeCompare(b.judul)
        default:
          return 0
      }
    })

    return filtered
  }, [beritaList, searchTerm, selectedCategory, sortBy])

  // Update parent component with filtered results
  useEffect(() => {
    onFilteredResults(filteredBerita)
  }, [filteredBerita, onFilteredResults])

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-3xl p-6 sm:p-8 border border-[#d4af37]/20 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/5 to-[#f4d03f]/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#2d5016]/5 to-[#3d6b1f]/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Filter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Search Input */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-[#2d5016] mb-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            Pencarian
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[#2d5016]/60 group-focus-within:text-[#d4af37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Ketik kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-white/90 border-2 border-gray-200/60 rounded-2xl text-[#2d5016] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:bg-white hover:border-gray-300/80"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#d4af37] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-[#2d5016] mb-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11H5m14-7l2 2-2 2m0 8l2 2-2 2" />
              </svg>
            </div>
            Kategori
          </label>
          <div className="relative group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-5 py-4 bg-white/90 border-2 border-gray-200/60 rounded-2xl text-[#2d5016] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all duration-300 appearance-none cursor-pointer font-medium shadow-sm hover:shadow-md hover:bg-white hover:border-gray-300/80"
            >
              <option value="all" className="bg-white text-[#2d5016] py-2">📂 Semua Kategori</option>
              {categories.map(category => (
                <option key={category} value={category} className="bg-white text-[#2d5016] py-2">
                  📰 {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[#2d5016]/60 group-focus-within:text-[#d4af37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-[#2d5016] mb-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            Urutkan
          </label>
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-5 py-4 bg-white/90 border-2 border-gray-200/60 rounded-2xl text-[#2d5016] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all duration-300 appearance-none cursor-pointer font-medium shadow-sm hover:shadow-md hover:bg-white hover:border-gray-300/80"
            >
              <option value="newest" className="bg-white text-[#2d5016] py-2">🕒 Terbaru</option>
              <option value="oldest" className="bg-white text-[#2d5016] py-2">📅 Terlama</option>
              <option value="title" className="bg-white text-[#2d5016] py-2">🔤 A-Z</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[#2d5016]/60 group-focus-within:text-[#d4af37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Reset Button - Only show when filters are active */}
      {(searchTerm || selectedCategory !== 'all' || sortBy !== 'newest') && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSortBy('newest')
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 group text-sm"
          >
            <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Filter</span>
          </button>
        </div>
      )}
    </div>
  )
}