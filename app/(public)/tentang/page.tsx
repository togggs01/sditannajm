'use client'

import { useEffect, useRef } from 'react'
import Card from '@/components/Card'
import SchoolLogo from '@/components/SchoolLogo'

export default function TentangPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Force autoplay when component mounts
      const playVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          console.log('Autoplay prevented:', error)
          // If autoplay fails, we can show a play button or handle it gracefully
        }
      }
      
      // Small delay to ensure video is loaded
      setTimeout(playVideo, 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-yellow-50/50">
      {/* Video Hero Section - Same size as original hero */}
      <div className="relative overflow-hidden pt-32 pb-20">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          webkit-playsinline="true"
        >
          <source src="/videos/annajm.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5016]/70 via-[#3d6b1f]/60 to-[#2d5016]/70"></div>
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-shadow">Tentang SDIT ANNAJM RABBANI</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Mengenal lebih dekat visi, misi, dan fasilitas sekolah kami
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8 relative">
        {/* Floating Ornaments */}
        <div className="hidden lg:block">
          <div className="absolute top-10 right-5 w-3 h-3 bg-[#d4af37]/40 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/20"></div>
          <div className="absolute top-32 left-10 w-2 h-2 bg-[#f4d03f]/50 rounded-full animate-pulse shadow-lg shadow-[#f4d03f]/20" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 right-20 w-2.5 h-2.5 bg-[#d4af37]/35 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/15" style={{animationDelay: '1s'}}></div>
        </div>
      
      {/* Profil Sekolah */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#f4d03f]/15 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {/* Logo Section */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] p-10 md:p-12 flex items-center justify-center relative">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-5 right-5 w-20 h-20 border-2 border-white/10 rounded-full"></div>
              <div className="absolute bottom-5 left-5 w-16 h-16 border-2 border-[#d4af37]/20 rounded-full"></div>
              
              <div className="text-center relative z-10 space-y-8">
                {/* Logo with glow */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-3xl blur-2xl opacity-50"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/20">
                    <SchoolLogo size="xl" />
                  </div>
                </div>
                
                {/* School Name */}
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white tracking-wide">SDIT AN-NAJM RABBANI</h3>
                </div>
                
                {/* Established Year */}
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-2 tracking-wider">BERDIRI SEJAK</p>
                  <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-3 rounded-2xl border border-white/20">
                    <p className="text-5xl font-bold text-[#d4af37]">2013</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-3 p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-6">Website SDIT ANNAJM RABBANI</h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-[#2d5016]">Website SDIT ANNAJM RABBANI</span> hadir sebagai media informasi dan komunikasi bagi orang tua dan masyarakat, dengan komitmen mewujudkan visi <span className="font-semibold text-[#2d5016]">"Berakhlak, Mandiri, Cerdas, dan Ceria"</span> melalui pendidikan yang menekankan nilai keislaman, pembentukan karakter, serta pengembangan potensi peserta didik, dengan dukungan sinergi antara <span className="font-semibold text-[#2d5016]">sekolah, orang tua, dan masyarakat</span>.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-l-4 border-[#d4af37] hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Akreditasi</p>
                    <p className="text-2xl font-bold text-[#2d5016]">B</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-l-4 border-[#2d5016] hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Jumlah Siswa</p>
                    <p className="text-2xl font-bold text-[#2d5016]">200+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 left-10 w-20 h-20 border-4 border-[#d4af37]/30 rounded-full -z-10 animate-pulse shadow-lg shadow-[#d4af37]/10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-[#f4d03f]/20 rounded-full -z-10"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-[#f4d03f]/20 rounded-full -z-10 animate-pulse shadow-xl shadow-[#f4d03f]/20" style={{animationDelay: '0.5s'}}></div>
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">Visi & Misi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Landasan dan arah pendidikan SDIT ANNAJM RABBANI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Visi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#2d5016] hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d5016]">Visi Kami</h3>
              </div>
              
              <div className="bg-gradient-to-br from-[#2d5016]/5 to-[#3d6b1f]/5 rounded-xl p-6 border-l-4 border-[#2d5016] text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-[#2d5016]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#2d5016] font-bold text-xl leading-relaxed">
                  "BERAKHLAK, MANDIRI, CERDAS DAN CERIA"
                </p>
                <div className="mt-4 pt-4 border-t border-[#2d5016]/20">
                  <p className="text-gray-600 text-sm italic">
                    Menjadi lembaga pendidikan Islam terpadu yang unggul dalam membentuk generasi Qurani
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Misi */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#d4af37] hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-[#2d5016]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d5016]">Misi Kami</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  'Turut berkontribusi dalam membangun generasi yang berakhlak cerdas dan ceria',
                  'Membangun hubungan edukatif, sosial dan produktif dengan orang tua/wali murid, masyarakat dan pemerintah',
                  'Menanam kedisiplinan dan rasa tanggung jawab siswa',
                  'Membangun terciptanya lingkungan yang kondusif di sekolah',
                  'Mengembangkan potensi anak sesuai dengan bakat dan kemampuan',
                  'Menumbuhkan semangat warga sekolah',
                  'Menanamkan budaya peduli sesama dan budi pekerti yang luhur'
                ].map((misi, index) => (
                  <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border-l-4 border-[#d4af37] hover:shadow-md transition-all duration-300 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-[#2d5016] text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Sekolah */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#d4af37]/25 to-[#f4d03f]/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-[#f4d03f]/35 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 border-2 border-[#d4af37]/50 rounded-full -z-10 shadow-lg shadow-[#d4af37]/20"></div>
        
        <div className="bg-gradient-to-br from-white via-[#f4d03f]/5 to-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-[#d4af37]/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">Fasilitas Sekolah</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Sarana dan prasarana lengkap untuk mendukung pembelajaran optimal</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Ruang Kelas Full AC */}
            <div className="bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Ruang Kelas Full AC</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ruang kelas ber-AC dengan suasana belajar yang nyaman dan kondusif</p>
            </div>

            {/* Laboratorium Komputer */}
            <div className="bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Laboratorium Komputer</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lab komputer dengan perangkat modern untuk pembelajaran teknologi</p>
            </div>

            {/* Laboratorium IPA */}
            <div className="bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4H9V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 4V8L6 14V20C6 21.1046 6.89543 22 8 22H16C17.1046 22 18 21.1046 18 20V14L15 8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
                  <circle cx="9" cy="18" r="1" fill="currentColor"/>
                  <circle cx="15" cy="18" r="1" fill="currentColor"/>
                  <circle cx="11" cy="13" r="0.8" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Laboratorium IPA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lab IPA lengkap untuk praktikum sains dan eksperimen</p>
            </div>

            {/* Perpustakaan */}
            <div className="bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Perpustakaan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Koleksi buku yang beragam dan ruang baca yang nyaman</p>
            </div>

            {/* Mushola */}
            <div className="bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V9H22V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 9H22V21H2V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9V21M10 9V21M14 9V21M18 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Mushola</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mushola sekolah untuk kegiatan ibadah dan pembelajaran agama</p>
            </div>

            {/* UKS */}
            <div className="bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V13C3 17.55 6.84 21.74 12 23C17.16 21.74 21 17.55 21 13V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">UKS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Unit Kesehatan Sekolah untuk pelayanan kesehatan siswa</p>
            </div>

            {/* Aula Serbaguna */}
            <div className="bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 9H21M9 21V9M15 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Aula Serbaguna</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ruang serbaguna untuk kegiatan sekolah dan acara besar</p>
            </div>

            {/* Kantin */}
            <div className="bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 2L5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6L21 2H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Kantin</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Kantin sehat dengan menu bergizi dan higienis</p>
            </div>

            {/* Toilet Putra & Putri */}
            <div className="bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="5" r="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 7V13M9 13L7 21M9 13L11 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 7V13M12 13H18M12 13L11 21M18 13L19 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Toilet Putra & Putri</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Fasilitas toilet terpisah yang bersih dan terawat</p>
            </div>

            {/* Lahan Parkir */}
            <div className="bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V6L4.5 2H15.5L18 6V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="13" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 6H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Lahan Parkir</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Area parkir yang luas dan aman untuk kendaraan</p>
            </div>

            {/* Sarana Olahraga */}
            <div className="bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2C12 2 15 6 15 12C15 18 12 22 12 22M12 2C12 2 9 6 9 12C9 18 12 22 12 22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Sarana Olahraga</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lapangan dan peralatan olahraga untuk aktivitas fisik</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#2d5016]/25 to-[#3d6b1f]/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-tl from-[#2d5016]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/3 left-20 w-20 h-20 border-2 border-[#2d5016]/40 rounded-full -z-10 shadow-lg shadow-[#2d5016]/15"></div>
        
        <div className="bg-gradient-to-br from-white via-[#2d5016]/5 to-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-[#2d5016]/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">Ekstrakurikuler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Beragam kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Pramuka */}
            <div className="relative bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/pramuka.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 15L8 3L12 15L8 12L4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 8H20L17 12L20 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Pramuka</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Kegiatan kepramukaan untuk membentuk karakter dan jiwa kepemimpinan</p>
              </div>
            </div>

            {/* Futsal */}
            <div className="relative bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/futsal.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2C12 2 9 5 9 9C9 13 12 16 12 16M12 2C12 2 15 5 15 9C15 13 12 16 12 16M12 16C12 16 9 19 9 22M12 16C12 16 15 19 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12C2 12 5 9 9 9C13 9 16 12 16 12M22 12C22 12 19 9 15 9M16 12C16 12 19 15 22 15M2 12C2 12 5 15 9 15C13 15 16 12 16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 6L9 9M17 6L15 9M7 18L9 15M17 18L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Futsal</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Olahraga futsal untuk mengembangkan keterampilan dan kerjasama tim</p>
              </div>
            </div>

            {/* Robotik */}
            <div className="relative bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/robotik.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="11" r="1.5" fill="currentColor"/>
                    <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 2V6M12 18V22M5 6V2M19 6V2M5 18V22M19 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Robotik</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Pembelajaran robotik dan teknologi untuk masa depan digital</p>
              </div>
            </div>

            {/* Panahan */}
            <div className="relative bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/archery.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12L22 2L12 22L10 14L2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Panahan</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Olahraga panahan untuk melatih fokus dan ketepatan</p>
              </div>
            </div>

            {/* Pencak Silat */}
            <div className="relative bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/silat.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7L10 11L7 13L10 15L12 19L14 15L17 13L14 11L12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 13L5 15M17 13L19 15M10 15L8 19M14 15L16 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Pencak Silat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Seni bela diri tradisional Indonesia untuk kebugaran dan karakter</p>
              </div>
            </div>

            {/* Melukis */}
            <div className="relative bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/melukis.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Melukis</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Seni lukis untuk mengembangkan kreativitas dan ekspresi artistik</p>
              </div>
            </div>

            {/* Berenang */}
            <div className="relative bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/berenang.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 15C3.5 15 4.5 16 6 16C7.5 16 8.5 15 10 15C11.5 15 12.5 16 14 16C15.5 16 16.5 15 18 15C19.5 15 20.5 16 22 16M2 20C3.5 20 4.5 21 6 21C7.5 21 8.5 20 10 20C11.5 20 12.5 21 14 21C15.5 21 16.5 20 18 20C19.5 20 20.5 21 22 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="7" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 5L18 9L14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Berenang</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Olahraga renang untuk kesehatan dan kebugaran jasmani</p>
              </div>
            </div>

            {/* Arabic Club */}
            <div className="relative bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/arabic.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 7H16M8 11H16M8 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Arabic Club</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Klub bahasa Arab untuk memperdalam pemahaman bahasa Al-Quran</p>
              </div>
            </div>

            {/* Al Quran Club */}
            <div className="relative bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/quran.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Al Quran Club</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Klub Al-Quran untuk tahfidz dan tilawah yang indah</p>
              </div>
            </div>

            {/* Math Club */}
            <div className="relative bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/math-club.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 8H16M8 12H16M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="15" cy="16" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Math Club</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Klub matematika untuk mengasah kemampuan logika dan problem solving</p>
              </div>
            </div>

            {/* English Club */}
            <div className="relative bg-gradient-to-br from-white to-[#2d5016]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#2d5016]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/english-club.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 9H16M8 13H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">English Club</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Klub bahasa Inggris untuk meningkatkan kemampuan komunikasi global</p>
              </div>
            </div>

            {/* Hadroh */}
            <div className="relative bg-gradient-to-br from-white to-[#d4af37]/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#d4af37]/10 group overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-300">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                  backgroundImage: `url('/images/ekstrakurikuler/marawis.jpeg')`
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/50 to-white/30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    <path d="M12 2V6M12 18V22M22 12H18M6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Marawis</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Seni musik islami dengan alat musik tradisional dan sholawat</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}







