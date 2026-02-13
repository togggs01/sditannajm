'use client'

import { useState } from 'react'
import { Berita } from '@prisma/client'
import BeritaSearchFilter from './BeritaSearchFilter'
import Link from 'next/link'
import Card from './Card'
import Image from 'next/image'
import { formatDate } from '@/lib/formatDate'

interface BeritaPageClientProps {
  initialBerita: Berita[]
}

export default function BeritaPageClient({ initialBerita }: BeritaPageClientProps) {
  const [filteredBerita, setFilteredBerita] = useState<Berita[]>(initialBerita)

  const handleFilteredResults = (results: Berita[]) => {
    setFilteredBerita(results)
  }

  return (
    <>
      {/* Search and Filter Section - Without Header Text */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 mb-12 sm:px-6 lg:px-8 relative z-10">
        <BeritaSearchFilter 
          beritaList={initialBerita} 
          onFilteredResults={handleFilteredResults}
        />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        {filteredBerita.length === 0 ? (
          <div className="animate-fade-in">
            <Card className="text-center py-16 border-2 border-dashed border-gray-300">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">🔍</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tidak Ada Hasil</h3>
              <p className="text-gray-600 text-lg mb-6">
                {initialBerita.length === 0 
                  ? "Berita akan segera hadir. Pantau terus untuk update terbaru!"
                  : "Coba ubah kata kunci pencarian atau filter kategori"
                }
              </p>
              {initialBerita.length === 0 ? (
                <Link 
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all"
                >
                  <span>Kembali ke Beranda</span>
                </Link>
              ) : null}
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBerita.map((berita, index) => (
              <div key={berita.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <Card className="flex flex-col h-full border-2 border-gray-200 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                  {/* Enhanced Image */}
                  {berita.gambar && (
                    <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-6 overflow-hidden -m-6 mb-6">
                      <Image
                        src={berita.gambar}
                        alt={berita.judul}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Category Badge on Image */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                          📰 {berita.kategori}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge (if no image) */}
                  {!berita.gambar && (
                    <div className="mb-4">
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                        📰 {berita.kategori}
                      </span>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 text-[#2d5016] group-hover:text-[#3d6b1f] transition-colors leading-tight">
                      {berita.judul}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {berita.konten.substring(0, 150)}...
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-6 pb-4 border-t pt-4">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">✍️</span>
                        </div>
                        <span className="font-medium">{berita.penulis}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">📅</span>
                        </div>
                        <span className="font-medium">{formatDate(berita.createdAt)}</span>
                      </div>
                    </div>
                    
                    {/* Read More Button */}
                    <Link 
                      href={`/berita/${berita.slug}`}
                      className="inline-flex items-center justify-center bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group/btn hover:scale-105 hover:-translate-y-1"
                    >
                      <span>Baca Selengkapnya</span>
                      <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}