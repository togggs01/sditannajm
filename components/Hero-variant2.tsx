'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

function CounterStat({ end, suffix = '+', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimatedRef = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setIsVisible(true)
          hasAnimatedRef.current = true
          
          const duration = 2000
          const startTime = Date.now()
          
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function untuk smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = Math.floor(easeOutQuart * end)
            
            setCount(currentCount)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(end)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [end])

  return (
    <div ref={ref} className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
      <div className={`text-2xl sm:text-4xl font-bold text-[#39F914] mb-1 sm:mb-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-300">{label}</div>
    </div>
  )
}

export default function Hero() {
  const [hasImage, setHasImage] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [stats, setStats] = useState({ guru: 10, siswa: 200, berita: 10 })

  useEffect(() => {
    // Check if image exists
    fetch('/images/school-hero.jpg', { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setHasImage(true)
        }
      })
      .catch(() => {
        setHasImage(false)
      })

    // Fetch stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats({
          guru: data.guru || 10,
          siswa: data.siswa || 200,
          berita: data.berita || 10
        })
      })
      .catch(() => {
        // Keep default values if fetch fails
      })
  }, [])

  return (
    <div className="relative text-white overflow-hidden pt-20">
      {/* Background - Image or Gradient */}
      <div className="absolute inset-0">
        {hasImage && !imageError && (
          <Image
            src="/images/school-hero.jpg"
            alt="SDIT ANNAJM RABBANI"
            fill
            className="object-cover"
            priority
            quality={90}
            onError={() => setImageError(true)}
          />
        )}
        {/* Overlay Gradient - Variasi 2: Hijau tua solid dengan accent terang */}
        <div className={`absolute inset-0 ${
          hasImage && !imageError
            ? 'bg-[#0B6623]/95' 
            : 'bg-[#0B6623]'
        }`}></div>
      </div>
      
      {/* Decorative Elements - Accent hijau terang */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#39F914] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#39F914]/60 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#39F914]/30 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-shadow leading-tight px-2">
            Selamat Datang di<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39F914] via-[#39F914]/80 to-[#39F914]">
              SDIT ANNAJM RABBANI
            </span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
            Membentuk Generasi Qurani yang Berakhlak Mulia dan Berprestasi
          </p>
          
          <p className="text-sm sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Pendidikan Islam terpadu dengan kurikulum nasional dan nilai-nilai Al-Quran
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link 
              href="/ppdb" 
              className="w-full sm:w-auto group bg-gradient-to-r from-[#39F914] to-[#39F914]/80 hover:from-[#39F914]/90 hover:to-[#39F914] text-[#0B6623] font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all shadow-2xl hover:shadow-[#39F914]/50 transform hover:scale-105 flex items-center justify-center"
            >
              <span>Daftar Sekarang</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/tentang" 
              className="w-full sm:w-auto group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all border-2 border-white/30 hover:border-[#39F914]/50 flex items-center justify-center"
            >
              <span>Tentang Kami</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto px-4">
            <CounterStat end={10} label="Tahun Berpengalaman" />
            <CounterStat end={stats.siswa} label="Siswa Aktif" />
            <CounterStat end={stats.guru} label="Guru Profesional" />
            <CounterStat end={stats.berita} label="Prestasi" />
          </div>
        </div>
      </div>
      
      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </div>
  )
}