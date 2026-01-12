'use client'

import Image from 'next/image'
import Link from 'next/link'

interface GaleriPhoto {
  id: string
  judul: string
  gambar: string
  kategori: string
}

interface GaleriShowcaseProps {
  photos: GaleriPhoto[]
}

export default function GaleriShowcase({ photos }: GaleriShowcaseProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-300">
        <div className="inline-block p-6 bg-gradient-to-br from-[#2d5016]/10 to-[#d4af37]/10 rounded-full mb-4">
          <span className="text-6xl">📸</span>
        </div>
        <p className="text-gray-500 text-lg font-medium">Galeri akan segera hadir</p>
        <p className="text-gray-400 text-sm mt-2">Dokumentasi kegiatan sekolah sedang dipersiapkan</p>
      </div>
    )
  }

  return (
    <div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
        {photos.map((photo, index) => {
          // Pola layout yang bervariasi untuk tampilan yang menarik
          let gridClass = ''
          const pattern = index % 7
          
          switch (pattern) {
            case 0:
              gridClass = 'col-span-12 md:col-span-8 row-span-2' // Large horizontal
              break
            case 1:
              gridClass = 'col-span-6 md:col-span-4 row-span-2' // Tall
              break
            case 2:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Small
              break
            case 3:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Small
              break
            case 4:
              gridClass = 'col-span-12 md:col-span-4 row-span-2' // Tall
              break
            case 5:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Small
              break
            case 6:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Small
              break
            default:
              gridClass = 'col-span-6 md:col-span-4 row-span-1'
          }

          return (
            <Link
              href="/galeri"
              key={photo.id}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${gridClass}`}
            >
              {/* Image */}
              <Image
                src={photo.gambar}
                alt={photo.judul}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Category Badge */}
                <div className="mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {photo.kategori}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {photo.judul}
                </h3>
                
                {/* View Button */}
                <div className="flex items-center gap-2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <span>Lihat Detail</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          )
        })}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link 
          href="/galeri"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Jelajahi Semua Galeri</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
