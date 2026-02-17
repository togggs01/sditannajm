import { prisma } from '@/lib/prisma'
import Hero from '@/components/Hero'
import Card from '@/components/Card'
import Link from 'next/link'
import Image from 'next/image'
import TestimoniCarousel from '@/components/TestimoniCarousel'
import GaleriShowcase from '@/components/GaleriShowcase'
import PPDBSection from '@/components/PPDBSection'
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch data with error handling
  let recentBerita: any[] = []
  let galeriPhotos: any[] = []
  
  try {
    const results = await Promise.allSettled([
      prisma.berita.findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: 'desc' }
      }).catch(() => []),
      prisma.galeri.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' }
      }).catch(() => [])
    ])
    
    recentBerita = results[0].status === 'fulfilled' ? results[0].value : []
    galeriPhotos = results[1].status === 'fulfilled' ? results[1].value : []
  } catch (error) {
    console.error('Error fetching home data:', error)
    // Continue with empty arrays
  }

  return (
    <div className="bg-yellow-50/60 relative overflow-hidden">
      
      {/* Animated Hero Section */}
      <div className="animate-fade-in">
        <Hero />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 sm:px-6 lg:px-8 relative">
        
        {/* Sambutan Kepala Sekolah with slide-up animation */}
        <section className="mb-20 relative animate-slide-up-delay-1">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#2d5016]/20 hover:shadow-2xl hover:scale-[1.01] transition-all duration-700 hover:border-[#d4af37]/30">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              {/* Foto Kepala Sekolah */}
              <div className="md:col-span-2 relative animate-fade-in-left">
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
                          />
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
              </div>

              {/* Sambutan */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center animate-fade-in-right">
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

        {/* Program Unggulan with clean grid design */}
        <section className="mb-20 relative animate-slide-up-delay-2">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3 animate-slide-up">
              Mengapa SDIT Annajm Rabbani<br />
              menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f4d03f]">PILIHAN UTAMA</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up-delay-1">
              Lima alasan utama mengapa orang tua mempercayakan pendidikan terbaik untuk buah hati mereka di SDIT Annajm Rabbani
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                number: '01',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
                title: 'Sekolah berbasis karakter',
                desc: 'Membangun kepribadian islami yang kuat dengan akhlak mulia'
              },
              {
                number: '02',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
                title: 'Tenaga pengajar ahli',
                desc: 'Guru profesional dan berpengalaman dengan sertifikasi pendidik'
              },
              {
                number: '03',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
                title: 'Kurikulum Unggulan',
                desc: 'Perpaduan kurikulum nasional dengan program unggulan sekolah'
              },
              {
                number: '04',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
                title: 'Pembelajaran Qur\'an',
                desc: 'Program tahfidz intensif dengan target hafalan 2 juz'
              },
              {
                number: '05',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                title: 'Biaya Terjangkau',
                desc: 'Pendidikan berkualitas tinggi dengan investasi terjangkau'
              }
            ].map((item, index) => (
              <div key={index} className="group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#2d5016]/10 hover:border-[#d4af37]/40 group-hover:-translate-y-1 h-full">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-[#2d5016]">{item.number}</span>
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 text-white">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#2d5016] mb-3 text-center leading-tight group-hover:text-[#3d6b1f] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Galeri Sekolah with fade-in animation */}
        <section className="mb-20 relative animate-slide-up-delay-3">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3 animate-slide-up">Dokumentasi Kegiatan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up-delay-1">Momen berharga dan suasana belajar di SDIT ANNAJM RABBANI</p>
          </div>

          <GaleriShowcase photos={galeriPhotos} />
        </section>

        {/* Prestasi with bounce animations */}
        <section className="mb-20 relative animate-slide-up-delay-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3 animate-slide-up">Pencapaian Membanggakan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up-delay-1">Prestasi gemilang siswa-siswi SDIT ANNAJM RABBANI</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { image: '/images/prestasi1.jpeg', title: 'Juara 3 Lomba Kaligrafi', desc: 'Lomba kaligrafi PENTAS PAI Tingkat pondok gede', color: 'from-[#d4af37] to-[#f4d03f]' },
              { image: '/images/prestasi2.jpeg', title: 'Juara 1 Regu Terbaik ', desc: 'lomba pramuka Tangkas Galang Kec.Pondokgede 2024', color: 'from-[#d4af37] to-[#f4d03f]' },
              { image: '/images/prestasi3.jpeg', title: 'Medali emas lomba silat', desc: 'Kompetisi Presentasi Islami 2024', color: 'from-[#d4af37] to-[#f4d03f]' }
            ].map((prestasi, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl smooth-hover p-8 border-3 border-[#2d5016] text-center group animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                {/* Bingkai Foto Prestasi */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Bingkai Luar dengan Gradient */}
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${prestasi.color} p-2 shadow-2xl group-hover:scale-105 transition-transform`}>
                    {/* Bingkai Tengah */}
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-white to-gray-50 p-1.5">
                      {/* Bingkai Dalam */}
                      <div className={`w-full h-full rounded-lg bg-gradient-to-br ${prestasi.color} p-0.5`}>
                        {/* Area Foto */}
                        <div className="w-full h-full rounded-md overflow-hidden shadow-inner relative bg-gray-100">
                          <Image
                            src={prestasi.image}
                            alt={prestasi.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Efek Cahaya di Belakang */}
                  <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${prestasi.color} opacity-30 blur-xl -z-10`}></div>
                  
                  {/* Ornamen Dekoratif di Sudut */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-2 border-[#d4af37] rounded-full opacity-70"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#d4af37] rounded-full opacity-80"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#f4d03f] rounded-full opacity-70"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-2 border-[#f4d03f] rounded-full opacity-70"></div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#2d5016]">{prestasi.title}</h3>
                <p className="text-gray-600">{prestasi.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Berita & Kegiatan with slide animations */}
        <section className="mb-20 relative animate-slide-up-delay-5">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3 animate-slide-up">Informasi Terbaru</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up-delay-1">Update kegiatan dan berita terkini dari SDIT ANNAJM RABBANI</p>
          </div>

          {recentBerita.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBerita.map((berita, index) => (
                  <div key={berita.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl smooth-hover overflow-hidden border-2 border-yellow-400 group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
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
              <div className="text-center mt-10 animate-fade-in" style={{animationDelay: '0.5s'}}>
                <Link 
                  href="/berita"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-8 rounded-xl smooth-hover shadow-lg hover:shadow-xl"
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

        {/* Testimoni with fade-in animation */}
        <section className="mb-20 relative animate-slide-up-delay-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-3 animate-slide-up">Kata Wali Murid</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up-delay-1">Pengalaman dan kepercayaan orang tua terhadap SDIT ANNAJM RABBANI</p>
          </div>

          <TestimoniCarousel />
        </section>

        {/* CTA PPDB with final animation */}
        <div className="animate-slide-up-delay-6">
          <PPDBSection />
        </div>
      </div>
    </div>
  )
}