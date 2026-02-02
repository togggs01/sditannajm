'use client'

import Image from 'next/image'
import Link from 'next/link'

interface GaleriPhoto {
  id: string
  judul: string
  gambar: string | null
  video: string | null
  kategori: string
  tipe: string
}

interface GaleriShowcaseProps {
  photos: GaleriPhoto[]
}

export default function GaleriShowcase({ photos }: GaleriShowcaseProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl border border-gray-200 shadow-lg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#2d5016] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#d4af37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="inline-block p-8 bg-gradient-to-br from-[#2d5016]/10 via-[#d4af37]/5 to-[#2d5016]/10 rounded-full mb-6 shadow-inner">
            <div className="w-20 h-20 bg-gradient-to-br from-[#2d5016]/20 to-[#d4af37]/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">📸</span>
            </div>
          </div>
          <h3 className="text-gray-700 text-xl font-bold mb-2">Galeri Akan Segera Hadir</h3>
          <p className="text-gray-500 text-base mb-4 max-w-md mx-auto">Dokumentasi kegiatan dan momen berharga sekolah sedang dipersiapkan untuk Anda</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-[#2d5016] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-[#2d5016] rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#2d5016]/5 to-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#d4af37]/5 to-[#2d5016]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Masonry Grid Layout */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px] relative z-10">
        {photos.filter(photo => (photo.gambar && photo.gambar.trim() !== '') || (photo.video && photo.video.trim() !== '')).map((photo, index) => {
          // Enhanced layout pattern untuk tampilan yang lebih dinamis dan seimbang
          let gridClass = ''
          const pattern = index % 10
          
          switch (pattern) {
            case 0:
              gridClass = 'col-span-12 md:col-span-8 row-span-2' // Hero large
              break
            case 1:
              gridClass = 'col-span-6 md:col-span-4 row-span-2' // Tall right
              break
            case 2:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Medium
              break
            case 3:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Medium
              break
            case 4:
              gridClass = 'col-span-12 md:col-span-4 row-span-1' // Medium wide
              break
            case 5:
              gridClass = 'col-span-6 md:col-span-5 row-span-2' // Medium tall
              break
            case 6:
              gridClass = 'col-span-6 md:col-span-3 row-span-1' // Small
              break
            case 7:
              gridClass = 'col-span-6 md:col-span-4 row-span-1' // Medium
              break
            case 8:
              gridClass = 'col-span-12 md:col-span-6 row-span-1' // Wide
              break
            case 9:
              gridClass = 'col-span-6 md:col-span-3 row-span-1' // Small
              break
            default:
              gridClass = 'col-span-6 md:col-span-4 row-span-1'
          }

          return (
            <Link
              href="/galeri"
              key={photo.id}
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-white/30 hover:border-[#d4af37]/40 backdrop-blur-sm ${gridClass}`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              {/* Media Content */}
              <div className="relative w-full h-full overflow-hidden">
                {photo.tipe === 'video' && photo.video && photo.video.trim() !== '' ? (
                  <video
                    src={photo.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                ) : photo.gambar && photo.gambar.trim() !== '' ? (
                  <Image
                    src={photo.gambar}
                    alt={photo.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {photo.tipe === 'video' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        )}
                      </svg>
                      <p className="text-gray-500 text-sm">Media tidak tersedia</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-95 transition-all duration-500" />
              
              {/* Content Container */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                {/* Category Badge - Enhanced */}
                <div className="mb-3 md:mb-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] text-[#2d5016] text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl backdrop-blur-sm border border-[#d4af37]/30">
                    <div className="w-2 h-2 bg-[#2d5016] rounded-full animate-pulse"></div>
                    {photo.kategori}
                  </span>
                </div>
                
                {/* Title - Enhanced */}
                <h3 className="text-white font-bold text-sm md:text-lg lg:text-xl xl:text-2xl mb-2 md:mb-3 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 drop-shadow-lg">
                  {photo.judul}
                </h3>
                
                {/* Media Type Indicator */}
                <div className="flex items-center gap-3 mb-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150">
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    {photo.tipe === 'video' ? (
                      <>
                        <div className="w-6 h-6 bg-red-500/90 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <span className="font-medium">Video</span>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 bg-blue-500/90 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">Foto</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* View Button - Enhanced */}
                <div className="hidden md:flex items-center gap-2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <span>Lihat Detail</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Enhanced Zoom Icon */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-md p-2.5 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-xl border border-white/50">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>

              {/* Enhanced Decorative Corner */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#d4af37]/30 via-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-br-3xl" />
              
              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-transparent group-hover:border-[#d4af37]/50 transition-all duration-500 pointer-events-none" />
            </Link>
          )
        })}
      </div>

      {/* Enhanced View All Button */}
      <div className="text-center mt-16">
        <div className="relative inline-block">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] rounded-3xl blur-xl opacity-30 scale-110"></div>
          
          <Link 
            href="/galeri"
            className="relative inline-flex items-center gap-4 bg-gradient-to-r from-[#2d5016] via-[#3d6b1f] to-[#2d5016] hover:from-[#3d6b1f] hover:via-[#2d5016] hover:to-[#3d6b1f] text-white font-bold py-5 px-12 rounded-3xl transition-all duration-700 shadow-2xl hover:shadow-3xl hover:scale-105 transform group border border-[#d4af37]/20 hover:border-[#d4af37]/40 backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, #2d5016 0%, #3d6b1f 50%, #2d5016 100%)',
              boxShadow: '0 20px 40px rgba(45, 80, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Icon with enhanced animation */}
            <div className="relative">
              <svg className="w-7 h-7 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="absolute inset-0 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
            </div>
            
            {/* Text with gradient effect */}
            <span className="text-lg bg-gradient-to-r from-white to-gray-100 bg-clip-text">
              Jelajahi Semua Media
            </span>
            
            {/* Arrow with enhanced animation */}
            <div className="relative">
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
          </Link>
        </div>
        
        {/* Subtitle */}
        <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
          Temukan lebih banyak dokumentasi kegiatan dan momen berharga sekolah
        </p>
      </div>
    </div>
  )
}
