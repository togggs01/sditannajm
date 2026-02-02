'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Card from './Card'

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
    photo: '/images/Melly Amalia.jpeg'
  },
  {
    name: 'Anne Nurhasayan Dyah Arizona',
    class: 'Wali Murid Kelas 3 & Anggota Komite',
    text: 'Sekolah yang tidak hanya cerdas secara intelektual, tapi juga cerdas secara spiritual. Fasilitasnya lengkap, gurunya inspiratif, dan kurikulum agamanya sangat kuat. Anak jadi lebih sopan dan mandiri dalam ibadah.',
    rating: 5,
    photo: '/images/Anne Nurhasayan Dyah Arizona.jpeg'
  },
  {
    name: 'Rani Budiarti, SST.PA',
    class: 'Wali murid & Ketua Komite periode 2023 - 2025',
    text: 'Menjadi bagian dari SDIT Annajm Rabbani adalah anugerah, karena sekolah ini membimbing generasi Rabbani dengan pendidikan seimbang antara ilmu dan akhlak. Sebagai wali murid, kami sangat bersyukur atas dedikasi para pendidiknya.',
    rating: 5,
    photo: '/images/Rani Budiarti, SST.PA.jpeg'
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
                    {/* Bingkai Foto dengan Placeholder */}
                    <div className="relative mr-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-[#d4af37] shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                        {testimoni.photo ? (
                          <Image
                            src={testimoni.photo}
                            alt={`Foto ${testimoni.name}`}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
                            {/* Frame Icon */}
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Decorative Ring */}
                      <div className="absolute -inset-1 rounded-full border-2 border-[#d4af37]/30 animate-pulse"></div>
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
