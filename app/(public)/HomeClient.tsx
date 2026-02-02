'use client'

import Hero from '@/components/Hero'
import Card from '@/components/Card'
import Link from 'next/link'
import Image from 'next/image'
import TestimoniCarousel from '@/components/TestimoniCarousel'
import GaleriShowcase from '@/components/GaleriShowcase'
import PPDBSection from '@/components/PPDBSection'
import { SubtleTopWave, SubtleBottomWave, CornerAccent, SideFlow } from '@/components/WaveOrnaments'

interface HomeProps {
  recentBerita: any[]
  galeriPhotos: any[]
}

export default function HomeClient({ recentBerita, galeriPhotos }: HomeProps) {
  return (
    <div className="bg-gray-50 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern-home" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#2d5016" strokeWidth="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <path d="M 50 20 L 50 80 M 20 50 L 80 50" stroke="#2d5016" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="3" fill="#d4af37"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-home)"/>
        </svg>
      </div>
      
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 sm:px-6 lg:px-8 relative">
        {/* Floating Ornaments - Hidden on mobile */}
        <div className="hidden lg:block">
          {/* Top ornaments */}
          <div className="absolute top-10 right-5 w-3 h-3 bg-[#d4af37]/40 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/20"></div>
          <div className="absolute top-32 right-20 w-2 h-2 bg-[#f4d03f]/50 rounded-full animate-pulse shadow-lg shadow-[#f4d03f]/20" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-56 right-10 w-2.5 h-2.5 bg-[#d4af37]/35 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/15" style={{animationDelay: '1s'}}></div>
          
          {/* Left ornaments */}
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-[#f4d03f]/45 rounded-full animate-pulse shadow-lg shadow-[#f4d03f]/20" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-96 left-10 w-2 h-2 bg-[#d4af37]/50 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/20" style={{animationDelay: '0.8s'}}></div>
          
          {/* Middle ornaments */}
          <div className="absolute top-[30rem] right-1/4 w-3 h-3 bg-[#f4d03f]/40 rounded-full animate-pulse shadow-lg shadow-[#f4d03f]/20" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-[50rem] left-1/4 w-2 h-2 bg-[#d4af37]/45 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/20" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Sambutan Kepala Sekolah */}
        <section className="mb-20 relative">
          {/* Islamic Ornaments */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-sambutan" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <g stroke="#2d5016" strokeWidth="0.5" fill="none">
                    <circle cx="40" cy="40" r="25"/>
                    <circle cx="40" cy="40" r="15"/>
                    <path d="M 40 15 L 40 65 M 15 40 L 65 40"/>
                    <path d="M 25 25 L 55 55 M 55 25 L 25 55"/>
                  </g>
                  <circle cx="40" cy="40" r="2" fill="#d4af37"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-sambutan)"/>
            </svg>
          </div>
          
          {/* Islamic Corner Ornaments */}
          <div className="absolute top-5 left-5 text-[#d4af37]/30 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.2s'}}>☪</div>
          <div className="absolute top-10 right-10 text-[#2d5016]/25 text-3xl -z-10 animate-pulse" style={{animationDelay: '0.8s'}}>✦</div>
          <div className="absolute bottom-5 left-10 text-[#d4af37]/35 text-2xl -z-10 animate-pulse" style={{animationDelay: '1.2s'}}>❋</div>
          <div className="absolute bottom-10 right-5 text-[#2d5016]/30 text-3xl -z-10 animate-pulse" style={{animationDelay: '0.5s'}}>✧</div>
          
          {/* Subtle Wave Ornaments */}
          <CornerAccent colors="green" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#f4d03f]/15 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#2d5016]/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              {/* Foto Kepala Sekolah */}
              <div className="md:col-span-2 relative">
                {/* Bingkai Foto yang Mengisi Seluruh Area */}
                <div className="relative h-64 md:h-full p-4">
                  {/* Bingkai Luar dengan Gradient Hijau-Kuning */}
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#2d5016] via-[#d4af37] to-[#2d5016] p-2 shadow-2xl">
                    {/* Bingkai Tengah */}
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#d4af37] via-[#f4d03f] to-[#2d5016] p-1.5">
                      {/* Bingkai Dalam Putih */}
                      <div className="w-full h-full rounded-lg bg-white p-1.5">
                        {/* Container Foto dengan Background Gradient Hijau-Kuning */}
                        <div className="w-full h-full rounded-md overflow-hidden shadow-inner bg-gradient-to-br from-[#2d5016] via-[#d4af37] to-[#2d5016] relative">
                          {/* Foto dengan Multiple Fallback */}
                          <Image
                            src="/images/potoKepsek.jpeg"
                            alt="Sri Mulyatini, S.S.I., S.Pd - Kepala Sekolah SDIT ANNAJM RABBANI"
                            fill
                            className="object-cover"
                            unoptimized
                            priority
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              if (img.src.includes('/images/potoKepsek.jpeg')) {
                                img.src = '/uploads/potoKepesek.jpeg';
                              } else if (img.src.includes('/uploads/potoKepesek.jpeg')) {
                                img.src = '/potoKepesek.jpeg';
                              } else {
                                // Fallback ke placeholder
                                img.style.display = 'none';
                                const parent = img.parentElement;
                                if (parent && !parent.querySelector('.photo-placeholder')) {
                                  parent.innerHTML = `
                                    <div class="photo-placeholder w-full h-full flex flex-col items-center justify-center text-white">
                                      <div class="text-6xl mb-4">👩‍🏫</div>
                                      <div class="text-lg font-bold">Sri Mulyatini, S.S.I., S.Pd</div>
                                      <div class="text-sm">Kepala Sekolah</div>
                                      <div class="text-sm text-[#d4af37]">SDIT ANNAJM RABBANI</div>
                                    </div>
                                  `;
                                }
                              }
                            }}
                          />
                          
                          {/* Overlay Info di Bagian Bawah */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                            <div className="text-white text-center">
                              <p className="text-lg font-bold mb-1">Sri Mulyatini, S.S.I., S.Pd</p>
                              <p className="text-sm font-semibold mb-1">Kepala Sekolah</p>
                              <p className="text-xs text-[#d4af37]">SDIT ANNAJM RABBANI</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Efek Cahaya di Belakang dengan warna hijau-kuning */}
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#2d5016]/30 via-[#d4af37]/30 to-[#2d5016]/30 blur-xl -z-10"></div>
                  
                  {/* Ornamen Dekoratif di Sekitar Bingkai dengan warna hijau-kuning */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-[#2d5016] rounded-full opacity-70"></div>
                  <div className="absolute -top-1 -right-3 w-4 h-4 bg-[#d4af37] rounded-full opacity-80"></div>
                  <div className="absolute -bottom-3 -left-1 w-5 h-5 border-2 border-[#d4af37] rounded-full opacity-70"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#2d5016] rounded-full opacity-70"></div>
                  
                  {/* Efek Sparkle dengan warna hijau-kuning */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-[#d4af37] rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-4 w-2 h-2 bg-[#2d5016] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Pattern overlay untuk seluruh area */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                </div>
              </div>

              {/* Sambutan */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2d5016] mb-4">
                  Assalamu'alaikum Warahmatullahi Wabarakatuh
                </h2>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed text-base">
                    <span className="font-bold text-[#2d5016]">SDIT ANNAJM RABBANI</span> hadir sebagai sekolah dasar Islam terpadu yang berkomitmen mendampingi orang tua dalam menumbuhkan generasi yang unggul secara akademik, kokoh dalam iman, dan berakhlak mulia melalui pembelajaran yang menyenangkan, bermakna, serta berlandaskan visi <span className="font-semibold text-[#2d5016]">"Berakhlak, Mandiri, Cerdas, dan Ceria"</span>.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Dengan menanamkan nilai-nilai Islam, melatih kemandirian, mengembangkan potensi akademik dan nonakademik, serta menciptakan lingkungan belajar yang aman dan ceria, kami membangun sinergi hangat dengan orang tua demi menghadirkan <span className="font-semibold text-[#2d5016]">pendidikan yang amanah dan berkualitas</span> bagi masa depan anak-anak.
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-[#2d5016] font-bold text-lg">Sri Mulyatini, S.S.I., S.Pd</p>
                    <p className="text-gray-600 text-sm">Kepala SDIT ANNAJM RABBANI</p>
                  </div>
                </div>
                <Link 
                  href="/tentang"
                  className="inline-flex items-center gap-2 text-[#2d5016] hover:text-[#d4af37] font-semibold transition-all group w-fit"
                >
                  <span>Baca Selengkapnya</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Program Unggulan */}
        <section className="mb-20 relative">
          {/* Islamic Ornaments */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-program" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                  <g stroke="#d4af37" strokeWidth="0.8" fill="none">
                    <rect x="30" y="30" width="60" height="60" rx="10"/>
                    <circle cx="60" cy="60" r="20"/>
                    <path d="M 60 40 L 60 80 M 40 60 L 80 60"/>
                    <circle cx="45" cy="45" r="3" fill="#d4af37"/>
                    <circle cx="75" cy="45" r="3" fill="#d4af37"/>
                    <circle cx="45" cy="75" r="3" fill="#d4af37"/>
                    <circle cx="75" cy="75" r="3" fill="#d4af37"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-program)"/>
            </svg>
          </div>
          
          {/* Islamic Geometric Ornaments */}
          <div className="absolute top-8 left-8 text-[#d4af37]/40 text-5xl -z-10 animate-pulse" style={{animationDelay: '0.3s'}}>◈</div>
          <div className="absolute top-16 right-12 text-[#2d5016]/30 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.9s'}}>❋</div>
          <div className="absolute bottom-8 left-16 text-[#d4af37]/35 text-3xl -z-10 animate-pulse" style={{animationDelay: '1.4s'}}>✦</div>
          <div className="absolute bottom-12 right-8 text-[#2d5016]/35 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.6s'}}>◆</div>
          
          {/* Subtle Wave Ornaments */}
          <SubtleBottomWave colors="gold" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#d4af37]/15 to-[#f4d03f]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-[#f4d03f]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 right-10 w-24 h-24 border-2 border-[#d4af37]/30 rounded-full -z-10 shadow-lg shadow-[#d4af37]/10"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#f4d03f]/20 rounded-full -z-10 shadow-lg shadow-[#f4d03f]/15"></div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3">Program Terbaik Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Program-program berkualitas untuk mengembangkan potensi siswa secara optimal</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ), 
                title: 'Tahfidzul Qur\'an', 
                desc: 'Program hafalan bertahap sejak kelas 1', 
                color: 'from-[#2d5016] to-[#3d6b1f]' 
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ), 
                title: 'Full Day School', 
                desc: 'Kegiatan belajar terpadu dari pagi sampai sore', 
                color: 'from-[#3d6b1f] to-[#2d5016]' 
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ), 
                title: 'Public Speaking Islami', 
                desc: 'Melatih siswa berani berbicara dengan adab', 
                color: 'from-[#d4af37] to-[#f4d03f]' 
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ), 
                title: 'Shalat Berjamaah', 
                desc: 'Pembiasaan ibadah Dhuha & Dzuhur harian', 
                color: 'from-[#f4d03f] to-[#d4af37]' 
              }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 p-6 border border-gray-100 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-white`}>
                  {program.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-[#2d5016]">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Galeri Sekolah */}
        <section className="mb-20 relative">
          {/* Islamic Ornaments */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-galeri" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <g stroke="#2d5016" strokeWidth="0.6" fill="none">
                    <polygon points="50,20 65,35 65,65 50,80 35,65 35,35"/>
                    <circle cx="50" cy="50" r="15"/>
                    <path d="M 35 35 L 65 65 M 65 35 L 35 65"/>
                  </g>
                  <circle cx="50" cy="50" r="3" fill="#d4af37"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-galeri)"/>
            </svg>
          </div>
          
          {/* Islamic Camera & Art Ornaments */}
          <div className="absolute top-6 left-6 text-[#d4af37]/35 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.4s'}}>📷</div>
          <div className="absolute top-12 right-8 text-[#2d5016]/30 text-3xl -z-10 animate-pulse" style={{animationDelay: '1.0s'}}>🎨</div>
          <div className="absolute bottom-6 left-12 text-[#d4af37]/40 text-3xl -z-10 animate-pulse" style={{animationDelay: '1.5s'}}>✦</div>
          <div className="absolute bottom-8 right-6 text-[#2d5016]/35 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.7s'}}>◈</div>
          
          {/* Subtle Wave Ornaments */}
          <SideFlow colors="blue" />
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 right-1/4 w-40 h-40 bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/10 rounded-full blur-2xl -z-10"></div>
          <div className="absolute top-20 left-10 w-28 h-28 border-4 border-[#d4af37]/25 rounded-full -z-10 shadow-lg shadow-[#d4af37]/10"></div>
          <div className="absolute bottom-0 right-10 w-20 h-20 bg-[#f4d03f]/25 rounded-full -z-10 shadow-xl shadow-[#f4d03f]/20"></div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3">Dokumentasi Kegiatan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Momen berharga dan suasana belajar di SDIT ANNAJM RABBANI</p>
          </div>

          <GaleriShowcase photos={galeriPhotos} />
        </section>

        {/* Prestasi */}
        <section className="mb-20 relative">
          {/* Islamic Ornaments */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-prestasi" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
                  <g stroke="#d4af37" strokeWidth="1" fill="none">
                    <circle cx="45" cy="45" r="30"/>
                    <circle cx="45" cy="45" r="20"/>
                    <circle cx="45" cy="45" r="10"/>
                    <path d="M 45 15 L 45 75 M 15 45 L 75 45"/>
                    <path d="M 25 25 L 65 65 M 65 25 L 25 65"/>
                  </g>
                  <circle cx="45" cy="45" r="4" fill="#d4af37"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-prestasi)"/>
            </svg>
          </div>
          
          {/* Islamic Trophy & Achievement Ornaments */}
          <div className="absolute top-4 left-4 text-[#d4af37]/40 text-5xl -z-10 animate-pulse" style={{animationDelay: '0.2s'}}>🏆</div>
          <div className="absolute top-8 right-6 text-[#2d5016]/35 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.8s'}}>⭐</div>
          <div className="absolute bottom-4 left-8 text-[#d4af37]/45 text-4xl -z-10 animate-pulse" style={{animationDelay: '1.3s'}}>🥇</div>
          <div className="absolute bottom-6 right-4 text-[#2d5016]/40 text-5xl -z-10 animate-pulse" style={{animationDelay: '0.6s'}}>✦</div>
          
          {/* Subtle Wave Ornaments */}
          <SubtleTopWave colors="purple" />
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-bl from-[#f4d03f]/20 to-[#d4af37]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-0 w-48 h-48 bg-gradient-to-tr from-[#d4af37]/15 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/3 left-10 w-16 h-16 border-2 border-[#d4af37]/35 rounded-full -z-10 animate-pulse shadow-lg shadow-[#d4af37]/15"></div>
          <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-[#f4d03f]/15 rounded-full -z-10 shadow-lg shadow-[#f4d03f]/10"></div>
          {/* Star ornaments */}
          <div className="absolute top-20 left-1/4 text-[#d4af37]/40 text-2xl -z-10 animate-pulse drop-shadow-lg" style={{animationDelay: '0.3s'}}>✦</div>
          <div className="absolute bottom-20 right-1/3 text-[#f4d03f]/35 text-xl -z-10 animate-pulse drop-shadow-lg" style={{animationDelay: '0.7s'}}>✦</div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3">Pencapaian Membanggakan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Prestasi gemilang siswa-siswi SDIT ANNAJM RABBANI</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'Juara 1 Lomba Tahfidz', desc: 'Lomba Tahfidz Tingkat Kota 2024', color: 'from-[#d4af37] to-[#f4d03f]' },
              { icon: '🥇', title: 'Juara Umum Olimpiade', desc: 'Olimpiade Matematika SD 2024', color: 'from-[#2d5016] to-[#3d6b1f]' },
              { icon: '⭐', title: 'Best Presentation', desc: 'Kompetisi Presentasi Islami 2024', color: 'from-[#3d6b1f] to-[#2d5016]' }
            ].map((prestasi, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 p-8 border-4 border-[#2d5016] text-center group">
                <div className="relative w-40 h-40 mx-auto mb-6 group-hover:scale-105 transition-transform">
                  <div className={`absolute inset-0 bg-gradient-to-br ${prestasi.color} rounded-2xl shadow-xl`}></div>
                  <div className="absolute inset-2 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                    <span className="text-6xl">{prestasi.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2d5016]">{prestasi.title}</h3>
                <p className="text-gray-600">{prestasi.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Berita & Kegiatan */}
        <section className="mb-20 relative">
          {/* Islamic Ornaments */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-berita" x="0" y="0" width="110" height="110" patternUnits="userSpaceOnUse">
                  <g stroke="#2d5016" strokeWidth="0.7" fill="none">
                    <rect x="25" y="25" width="60" height="60" rx="15"/>
                    <circle cx="55" cy="55" r="25"/>
                    <circle cx="55" cy="55" r="15"/>
                    <path d="M 40 40 L 70 70 M 70 40 L 40 70"/>
                  </g>
                  <circle cx="55" cy="55" r="2" fill="#d4af37"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-berita)"/>
            </svg>
          </div>
          
          {/* Islamic News & Information Ornaments */}
          <div className="absolute top-5 left-5 text-[#d4af37]/35 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.3s'}}>📰</div>
          <div className="absolute top-10 right-8 text-[#2d5016]/30 text-3xl -z-10 animate-pulse" style={{animationDelay: '0.9s'}}>📢</div>
          <div className="absolute bottom-5 left-10 text-[#d4af37]/40 text-3xl -z-10 animate-pulse" style={{animationDelay: '1.4s'}}>✦</div>
          <div className="absolute bottom-8 right-5 text-[#2d5016]/35 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.6s'}}>◈</div>
          
          {/* Subtle Wave Ornaments */}
          <CornerAccent colors="gradient" />
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 left-1/4 w-56 h-56 bg-gradient-to-br from-[#d4af37]/15 to-[#f4d03f]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-40 right-0 w-40 h-40 border-4 border-[#d4af37]/25 rounded-full -z-10 shadow-lg shadow-[#d4af37]/10"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#f4d03f]/20 rounded-full blur-2xl -z-10 shadow-xl shadow-[#f4d03f]/15"></div>
          <div className="absolute bottom-0 right-1/3 w-20 h-20 border-2 border-[#d4af37]/30 rounded-full -z-10 shadow-lg shadow-[#d4af37]/10"></div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3">Informasi Terbaru</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Update kegiatan dan berita terkini dari SDIT ANNAJM RABBANI</p>
          </div>

          {recentBerita.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBerita.map((berita) => (
                  <div key={berita.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border border-gray-100 group">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      {berita.gambar && (
                        <Image
                          src={berita.gambar}
                          alt={berita.judul}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(berita.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#2d5016] line-clamp-2 group-hover:text-[#d4af37] transition-colors">{berita.judul}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{berita.konten.substring(0, 120)}...</p>
                      <Link 
                        href={`/berita/${berita.slug}`}
                        className="inline-flex items-center gap-2 text-[#2d5016] hover:text-[#d4af37] font-semibold text-sm transition-all group/link"
                      >
                        <span>Baca Selengkapnya</span>
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link 
                  href="/berita"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Lihat Semua Berita</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <Card className="text-center py-12">
              <span className="text-6xl mb-4 block">📰</span>
              <p className="text-gray-500">Berita akan segera hadir</p>
            </Card>
          )}
        </section>

        {/* Testimoni */}
        <section className="mb-20 relative">
          {/* Islamic Ornaments */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-testimoni" x="0" y="0" width="95" height="95" patternUnits="userSpaceOnUse">
                  <g stroke="#d4af37" strokeWidth="0.8" fill="none">
                    <circle cx="47.5" cy="47.5" r="35"/>
                    <circle cx="47.5" cy="47.5" r="25"/>
                    <circle cx="47.5" cy="47.5" r="15"/>
                    <path d="M 47.5 12.5 L 47.5 82.5 M 12.5 47.5 L 82.5 47.5"/>
                    <path d="M 27.5 27.5 L 67.5 67.5 M 67.5 27.5 L 27.5 67.5"/>
                  </g>
                  <circle cx="47.5" cy="47.5" r="3" fill="#d4af37"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-testimoni)"/>
            </svg>
          </div>
          
          {/* Islamic Heart & Love Ornaments */}
          <div className="absolute top-6 left-6 text-[#d4af37]/40 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.4s'}}>💝</div>
          <div className="absolute top-10 right-10 text-[#2d5016]/35 text-3xl -z-10 animate-pulse" style={{animationDelay: '1.0s'}}>🤝</div>
          <div className="absolute bottom-6 left-10 text-[#d4af37]/35 text-3xl -z-10 animate-pulse" style={{animationDelay: '1.5s'}}>✦</div>
          <div className="absolute bottom-10 right-6 text-[#2d5016]/40 text-4xl -z-10 animate-pulse" style={{animationDelay: '0.7s'}}>◈</div>
          
          {/* Subtle Wave Ornaments */}
          <SubtleBottomWave colors="green" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-tl from-[#f4d03f]/15 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-1/3 w-28 h-28 border-4 border-[#d4af37]/30 rounded-full -z-10 shadow-lg shadow-[#d4af37]/15"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-[#f4d03f]/20 rounded-full -z-10 shadow-lg shadow-[#f4d03f]/15"></div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3">Kata Wali Murid</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Pengalaman dan kepercayaan orang tua terhadap SDIT ANNAJM RABBANI</p>
          </div>

          <TestimoniCarousel />
        </section>

        {/* CTA PPDB */}
        <PPDBSection />
      </div>
    </div>
  )
}