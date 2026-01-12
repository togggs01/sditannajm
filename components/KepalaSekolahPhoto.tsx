'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function KepalaSekolahPhoto() {
  const [imageError, setImageError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('/uploads/potoKepesek.jpeg')

  const handleImageError = () => {
    if (currentSrc === '/uploads/potoKepesek.jpeg') {
      setCurrentSrc('/potoKepesek.jpeg')
    } else if (currentSrc === '/potoKepesek.jpeg') {
      setCurrentSrc('/images/potoKepesek.jpeg')
    } else if (currentSrc === '/images/potoKepesek.jpeg') {
      setCurrentSrc('/public/potoKepesek.jpeg')
    } else {
      setImageError(true)
    }
  }

  return (
    <div className="relative w-40 h-40 mx-auto mb-4">
      {/* Bingkai Luar dengan Gradient Hijau-Kuning */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2d5016] via-[#d4af37] to-[#2d5016] p-1.5 shadow-2xl">
        {/* Bingkai Tengah */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4af37] via-[#f4d03f] to-[#2d5016] p-1">
          {/* Bingkai Dalam Putih */}
          <div className="w-full h-full rounded-full bg-white p-1">
            {/* Container Foto dengan Background Gradient Hijau-Kuning */}
            <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-gradient-to-br from-[#2d5016] via-[#d4af37] to-[#2d5016] flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={currentSrc}
                  alt="Sri Mulyatini, S.S.I., S.Pd - Kepala Sekolah SDIT ANNAJM RABBANI"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  unoptimized
                  onError={handleImageError}
                  priority
                />
              ) : (
                /* Fallback dengan bingkai tetap indah */
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                  <div className="text-4xl mb-2">👩‍🏫</div>
                  <div className="text-xs text-center px-2">
                    Foto Kepala Sekolah
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Efek Cahaya di Belakang dengan warna hijau-kuning */}
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#2d5016]/40 via-[#d4af37]/40 to-[#2d5016]/40 blur-lg -z-10"></div>
      {/* Efek Sparkle dengan warna hijau-kuning */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-[#d4af37] rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 left-2 w-2 h-2 bg-[#2d5016] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
    </div>
  )
}