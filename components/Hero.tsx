'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

// Typing Animation Component
function TypingText({ text, delay = 0, speed = 100 }: { text: string; delay?: number; speed?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
      setShowCursor(true)
      let currentIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          // Hide cursor after typing is done
          setTimeout(() => setShowCursor(false), 1000)
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, speed])

  return (
    <span>
      {displayText}
      {showCursor && <span className="typing-cursor text-[#f7e98e]">|</span>}
    </span>
  )
}

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
    <div ref={ref} className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className={`text-2xl sm:text-4xl font-bold text-[#f7e98e] mb-1 sm:mb-2 transition-all duration-500 drop-shadow-lg group-hover:scale-110 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{label}</div>
    </div>
  )
}

export default function Hero() {
  const [hasImage, setHasImage] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [stats, setStats] = useState({ guru: 30, siswa: 200, berita: 10 })
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    // Background fade-in first
    setTimeout(() => setShowBackground(true), 100)
    
    // Staggered fade-in animations
    const timers = [
      setTimeout(() => setShowTitle(true), 300),
      setTimeout(() => setShowSubtitle(true), 1500),
      setTimeout(() => setShowDescription(true), 3000),
      setTimeout(() => setShowButtons(true), 4000),
      setTimeout(() => setShowStats(true), 4500),
    ]

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
          guru: data.guru || 30,
          siswa: data.siswa || 200,
          berita: data.berita || 10
        })
      })
      .catch(() => {
        // Keep default values if fetch fails
      })

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <div className={`relative text-white overflow-hidden pt-20 transition-all duration-1500 ease-out ${
      showBackground ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Background - Image or Gradient */}
      <div className="absolute inset-0 transition-transform duration-700 hover:scale-105">
        {hasImage && !imageError && (
          <Image
            src="/images/school-hero.jpg"
            alt="SDIT ANNAJM RABBANI"
            fill
            className="object-cover transition-all duration-700"
            priority
            quality={90}
            onError={() => setImageError(true)}
          />
        )}
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          hasImage && !imageError
            ? 'bg-gradient-to-br from-[#4a7c2a]/85 via-[#5a8f35]/75 to-[#4a7c2a]/85 hover:from-[#4a7c2a]/80 hover:via-[#5a8f35]/70 hover:to-[#4a7c2a]/80' 
            : 'bg-gradient-to-br from-[#4a7c2a] via-[#5a8f35] to-[#4a7c2a]'
        }`}></div>
      </div>
      
      {/* Decorative Elements with floating animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#f7e98e] to-[#f4d03f] rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#f4d03f] to-[#d4af37] rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#d4af37]/40 to-[#f7e98e]/40 rounded-full filter blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          {/* Title with typing animation */}
          <div className={`transition-all duration-1000 ease-out ${
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-shadow leading-tight px-2 hero-text-glow">
              <TypingText text="Selamat Datang di" delay={0} speed={80} />
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7e98e] via-[#f4d03f] to-[#f7e98e] drop-shadow-lg">
                <TypingText text="SDIT ANNAJM RABBANI" delay={1200} speed={60} />
              </span>
            </h1>
          </div>
          
          {/* Subtitle with fade-in */}
          <div className={`transition-all duration-1000 ease-out ${
            showSubtitle ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <p className="text-base sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
              Membentuk Generasi Qurani yang Berakhlak Mulia dan Berprestasi
            </p>
          </div>
          
          {/* Description with fade-in */}
          <div className={`transition-all duration-1000 ease-out ${
            showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-sm sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Pendidikan Islam terpadu dengan kurikulum nasional dan nilai-nilai Al-Quran
            </p>
          </div>
          
          {/* Buttons with slide-up animation */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transition-all duration-1000 ease-out ${
            showButtons ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}>
            <Link 
              href="/ppdb" 
              className="w-full sm:w-auto group bg-gradient-to-r from-[#f7e98e] via-[#f4d03f] to-[#d4af37] hover:from-[#f4d03f] hover:via-[#f7e98e] hover:to-[#f4d03f] text-[#2d5016] font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-[#f4d03f]/60 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center animate-pulse-glow"
            >
              <span>Daftar Sekarang</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/tentang" 
              className="w-full sm:w-auto group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-300 border-2 border-white/30 hover:border-[#f7e98e]/50 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
            >
              <span>Tentang Kami</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Stats with staggered fade-in */}
          <div className={`mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto px-4 transition-all duration-1000 ease-out ${
            showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className={`transition-all duration-700 delay-100 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CounterStat end={10} label="Tahun Berpengalaman" />
            </div>
            <div className={`transition-all duration-700 delay-200 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CounterStat end={stats.siswa} label="Siswa Aktif" />
            </div>
            <div className={`transition-all duration-700 delay-300 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CounterStat end={stats.guru} label="Guru Profesional" />
            </div>
            <div className={`transition-all duration-700 delay-400 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CounterStat end={stats.berita} label="Prestasi" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Bottom with animation */}
      <div className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 delay-1000 ease-out ${
        showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-105 transition-transform duration-700">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </div>
  )
}
