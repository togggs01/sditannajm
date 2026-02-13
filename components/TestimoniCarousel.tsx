'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Testimoni {
  name: string
  class: string
  text: string
  rating: number
  photo?: string
}

const testimoniData: Testimoni[] = [
  { 
    name: 'Ibunda Sabiya', 
    class: 'Wali Murid Kelas 1',
    text: 'Alhamdulillah setelah bersekolah di An-Najm ada beberapa kemajuan dari Sabiya, dengan kelas yang nyaman serta metode belajar yang fun anak saya lebih bisa memahami pelajaran yang diajarkan, dan ada beberapa pilihan eskul yang seru sesuai minat anak.',
    rating: 5,
    photo: '/images/ibunda_sabiya.jpeg'
  },
  {
    name: 'Ibunda Yasmin',
    class: 'Wali Murid Kelas 1',
    text: 'ANNAJM bukan hanya tempat belajar, tetapi tempat membentuk karakter. Anak kami belajar ilmu, adab, dan akhlak dalam suasana yang menyenangkan.',
    rating: 5,
    photo: '/images/ortu_testimoni.jpeg'
  },
  {
    name: 'Fakhria Ahminarrizqie',
    class: 'Wali Murid Kelas 4 & Ketua Komite SDIT ANNAJM RABBANI',
    text: 'Sebagai wali murid dan Ketua Komite, saya menilai SDIT An Najm Rabbani berkomitmen pada pendidikan akademik dan akhlak Islami, didukung guru berdedikasi dan lingkungan belajar yang kondusif.',
    rating: 5,
    photo: '/images/f.jpeg'
  },
  {
    name: 'Melly Amalia',
    class: 'Wali Murid Kelas 2 & Anggota Komite',
    text: 'Kami bersyukur anak kami bersekolah di SDIT Annajm Rabbani, dengan guru yang sabar dan perhatian, sehingga anak berkembang mandiri, berakhlak baik, dan terbantu oleh pembelajaran Islami serta pembiasaan ibadah.',
    rating: 5,
    photo: '/images/Melly.jpeg'
  },
  {
    name: 'Anne Nurhasayan Dyah Arizona',
    class: 'Wali Murid Kelas 3 & Anggota Komite',
    text: 'Sekolah yang tidak hanya cerdas secara intelektual, tapi juga cerdas secara spiritual. Fasilitasnya lengkap, gurunya inspiratif, dan kurikulum agamanya sangat kuat. Anak jadi lebih sopan dan mandiri dalam ibadah.',
    rating: 5,
    photo: '/images/AnneNurhasayanDyahArizona.jpeg'
  },
  {
    name: 'Rani Budiarti, SST.PA',
    class: 'Wali murid & Ketua Komite periode 2023 - 2025',
    text: 'Menjadi bagian dari SDIT Annajm Rabbani adalah anugerah, karena sekolah ini membimbing generasi Rabbani dengan pendidikan seimbang antara ilmu dan akhlak. Sebagai wali murid, kami sangat bersyukur atas dedikasi para pendidiknya.',
    rating: 5,
    photo: '/images/Rani.jpeg'
  }
]

export default function TestimoniCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimoniData.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimoniData.length) % testimoniData.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimoniData.length)
  }

  return (
    <div className="relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Quote Icons */}
        <div className="absolute top-10 left-10 text-[#d4af37]/5 text-9xl font-serif transform -rotate-12 animate-pulse">"</div>
        <div className="absolute bottom-10 right-10 text-[#2d5016]/5 text-9xl font-serif transform rotate-12 animate-pulse">"</div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-[#d4af37]/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-[#2d5016]/5 to-[#d4af37]/5 rounded-lg transform rotate-45 animate-float"></div>
        
        {/* Sparkle Effects */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#d4af37] rounded-full animate-twinkle"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#f4d03f] rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-[#2d5016] rounded-full animate-twinkle" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Container */}
      <div 
        className="relative px-4 md:px-8 lg:px-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-3xl">
          <div 
            className="flex transition-all duration-1000 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimoniData.map((testimoni, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4 md:px-6"
              >
                {/* Enhanced Card Design */}
                <div className="relative max-w-4xl mx-auto">
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#2d5016]/10 rounded-3xl blur-xl"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden group hover:shadow-3xl transition-all duration-700 hover:scale-[1.02]">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] rounded-3xl p-[2px]">
                      <div className="bg-white rounded-3xl h-full w-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative p-8 md:p-12">
                      {/* Large Quote Mark */}
                      <div className="absolute top-6 right-8 text-[#d4af37]/15 text-8xl md:text-9xl font-serif leading-none select-none">"</div>
                      
                      {/* Header Section */}
                      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-8">
                        {/* Enhanced Photo Frame */}
                        <div className="relative flex-shrink-0">
                          {/* Outer Glow Ring */}
                          <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full blur-lg opacity-30 animate-pulse"></div>
                          
                          {/* Decorative Ring */}
                          <div className="absolute -inset-2 border-2 border-[#d4af37]/30 rounded-full animate-spin-slow"></div>
                          
                          {/* Main Photo Frame */}
                          <div className="relative w-20 h-20 md:w-24 md:h-24">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] p-1 shadow-xl">
                              <div className="w-full h-full rounded-full bg-white p-1">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                  {testimoni.photo ? (
                                    <Image
                                      src={testimoni.photo}
                                      alt={`Foto ${testimoni.name}`}
                                      width={96}
                                      height={96}
                                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
                                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating Sparkles */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f4d03f] rounded-full animate-bounce"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                        </div>
                        
                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl md:text-2xl font-bold text-[#2d5016] mb-2 group-hover:text-[#3d6b1f] transition-colors">
                            {testimoni.name}
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-3 leading-relaxed">
                            {testimoni.class}
                          </p>
                          
                          {/* Enhanced Star Rating */}
                          <div className="flex justify-center md:justify-start items-center gap-1">
                            {[...Array(testimoni.rating)].map((_, i) => (
                              <div key={i} className="relative">
                                <span className="text-[#f4d03f] text-lg md:text-xl drop-shadow-sm animate-twinkle" style={{animationDelay: `${i * 0.2}s`}}>★</span>
                              </div>
                            ))}
                            <span className="ml-2 text-sm text-gray-500 font-medium">({testimoni.rating}.0)</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Testimonial Text */}
                      <div className="relative">
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg italic font-medium text-center md:text-left relative z-10">
                          <span className="text-[#d4af37] text-2xl font-serif mr-1">"</span>
                          {testimoni.text}
                          <span className="text-[#d4af37] text-2xl font-serif ml-1">"</span>
                        </p>
                        
                        {/* Subtle Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="w-full h-full bg-gradient-to-r from-[#2d5016] via-transparent to-[#d4af37] rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 group bg-white/90 backdrop-blur-sm hover:bg-white text-[#2d5016] p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20 border border-white/20"
          aria-label="Previous testimonial"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 group bg-white/90 backdrop-blur-sm hover:bg-white text-[#2d5016] p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20 border border-white/20"
          aria-label="Next testimonial"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Enhanced Dots Indicator */}
        <div className="flex justify-center mt-12 gap-3">
          {testimoniData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative transition-all duration-500 ${
                index === currentIndex
                  ? 'w-12 h-4'
                  : 'w-4 h-4 hover:w-6'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] shadow-lg'
                  : 'bg-gray-300 group-hover:bg-gray-400'
              }`}></div>
              
              {/* Active Indicator Animation */}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#f4d03f] to-[#d4af37] rounded-full animate-pulse"></div>
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
