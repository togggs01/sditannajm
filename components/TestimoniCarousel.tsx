'use client'

import { useState, useEffect } from 'react'
import Card from './Card'

interface Testimoni {
  name: string
  class: string
  text: string
  rating: number
}

const testimoniData: Testimoni[] = [
  { 
    name: 'Ibu Siti', 
    class: 'Wali Siswa Kelas 3A',
    text: 'Anak saya jadi lebih disiplin dan rajin mengaji setelah sekolah di SDIT AN-NAJM Rabbani. Guru-gurunya sangat perhatian dan metode pembelajarannya menyenangkan.',
    rating: 5
  },
  {
    name: 'Bapak Ahmad',
    class: 'Wali Siswa Kelas 5B',
    text: 'Alhamdulillah, perkembangan akhlak dan prestasi akademik anak saya sangat meningkat. Lingkungan sekolah yang Islami sangat mendukung pembentukan karakter.',
    rating: 5
  },
  {
    name: 'Ibu Fatimah',
    class: 'Wali Siswa Kelas 2C',
    text: 'Program tahfidz di SDIT AN-NAJM sangat bagus. Anak saya sudah hafal beberapa juz dengan lancar dan benar. Terima kasih guru-guru yang sabar membimbing.',
    rating: 5
  },
  {
    name: 'Bapak Yusuf',
    class: 'Wali Siswa Kelas 4A',
    text: 'Fasilitas sekolah sangat lengkap dan bersih. Anak saya merasa nyaman belajar di sini. Komunikasi dengan guru juga sangat baik.',
    rating: 5
  },
  {
    name: 'Ibu Aisyah',
    class: 'Wali Siswa Kelas 1B',
    text: 'Sebagai orang tua baru di SDIT AN-NAJM, saya sangat puas dengan sistem pembelajaran dan perhatian guru terhadap perkembangan anak.',
    rating: 5
  }
]

export default function TestimoniCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimoniData.length)
    }, 3000) // Ganti setiap 5 detik

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
    <div 
      className="relative px-8 md:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimoniData.map((testimoni, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-3"
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50 relative overflow-hidden h-full max-w-2xl mx-auto">
                <div className="absolute top-0 right-0 text-[#d4af37]/10 text-8xl font-bold">"</div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2d5016]">{testimoni.name}</h4>
                      <p className="text-xs text-gray-600">{testimoni.class}</p>
                      <div className="flex mt-1">
                        {[...Array(testimoni.rating)].map((_, i) => (
                          <span key={i} className="text-[#f4d03f] text-sm">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">"{testimoni.text}"</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-[#2d5016] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-[#2d5016] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {testimoniData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-[#d4af37]'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
