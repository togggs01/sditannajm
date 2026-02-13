'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Increment by 1 every 50ms = 100 steps * 50ms = 5000ms (5 seconds)
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016]">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f4d03f] rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo Container with Multiple Spinning Rings */}
        <div className="mb-10 relative">
          {/* Outer Ring - Fast Spin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-[6px] border-transparent border-t-[#d4af37] border-r-[#d4af37] rounded-full animate-spin-fast"></div>
          </div>
          
          {/* Middle Ring - Medium Spin Reverse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-[5px] border-transparent border-b-[#f4d03f] border-l-[#f4d03f] rounded-full animate-spin-medium-reverse"></div>
          </div>

          {/* Inner Ring - Slow Spin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-transparent border-t-white/30 border-r-white/30 rounded-full animate-spin-slow"></div>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 bg-gradient-to-br from-[#d4af37]/30 to-[#f4d03f]/30 rounded-full animate-pulse blur-sm"></div>
          </div>

          {/* Logo with Scale Animation */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl p-3 animate-scale-pulse">
              <Image
                src="/images/LogoAnnajmRabbaniFix-01.png"
                alt="SDIT ANNAJM RABBANI Logo"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* School Name with Slide Animation */}
        <div className="mb-8 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-slide-up tracking-wide">
            SDIT ANNAJM RABBANI
          </h1>
          <div className="flex items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37] animate-expand"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37] animate-expand"></div>
          </div>
          <p className="text-white/70 text-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Membentuk Generasi Qurani yang Berakhlak Mulia
          </p>
        </div>

        {/* Progress Bar with Percentage */}
        <div className="w-80 max-w-full mx-auto mb-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            
            {/* Progress Fill */}
            <div 
              className="h-full bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
            </div>
          </div>
          
          {/* Percentage Text */}
          <div className="flex justify-between items-center mt-3">
            <p className="text-white/60 text-xs font-medium">Loading...</p>
            <p className="text-[#f4d03f] text-sm font-bold">{progress}%</p>
          </div>
        </div>

        {/* Animated Loading Dots */}
        <div className="flex items-center justify-center space-x-2 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce-slow"></div>
          <div className="w-2.5 h-2.5 bg-[#f4d03f] rounded-full animate-bounce-slow" style={{ animationDelay: '0.15s' }}></div>
          <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce-slow" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  )
}
