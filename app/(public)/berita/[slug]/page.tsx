import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/formatDate'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const [berita, relatedBerita] = await Promise.all([
    prisma.berita.findUnique({
      where: { slug }
    }),
    prisma.berita.findMany({
      where: { 
        published: true,
        slug: { not: slug }
      },
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
  ])

  if (!berita || !berita.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-yellow-50/50">
      {/* Hero Section with Enhanced Design */}
      <div className="relative bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] pt-24 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f4d03f] rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/30 rounded-full filter blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern-berita" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#f4d03f" strokeWidth="1"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
                <path d="M 50 20 L 50 80 M 20 50 L 80 50" stroke="#f4d03f" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="3" fill="#d4af37"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern-berita)"/>
          </svg>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button with Animation */}
          <div className="animate-fade-in">
            <Link 
              href="/berita"
              className="inline-flex items-center text-white hover:text-[#f4d03f] font-semibold mb-8 transition-all duration-300 group hover:scale-105"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span>Kembali ke Berita</span>
            </Link>
          </div>

          {/* Category Badge with Animation */}
          <div className="mb-6 animate-slide-up-delay-1">
            <span className="inline-flex items-center bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-sm px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="mr-2 text-lg">📰</span>
              {berita.kategori}
            </span>
          </div>

          {/* Title with Typing Effect */}
          <div className="animate-slide-up-delay-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight hero-text-glow">
              {berita.judul}
            </h1>
          </div>

          {/* Enhanced Meta Info */}
          <div className="animate-slide-up-delay-3">
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-xl">✍️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Penulis</p>
                  <p className="font-bold text-white text-lg">{berita.penulis}</p>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-white/30"></div>
              
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-xl">📅</span>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Tanggal</p>
                  <p className="font-bold text-white text-lg">{formatDate(berita.createdAt)}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-white/30"></div>
              
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-xl">👁️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Status</p>
                  <p className="font-bold text-white text-lg">Terpublikasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100 animate-slide-up-delay-4">
          {/* Featured Image with Enhanced Design */}
          {berita.gambar && (
            <div className="relative">
              <div className="relative aspect-[21/9] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <Image
                  src={berita.gambar}
                  alt={berita.judul}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <span className="text-2xl">📰</span>
                  </div>
                </div>
              </div>
              
              {/* Image Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-sm font-medium">{berita.judul}</p>
              </div>
            </div>
          )}

          {/* Article Content with Enhanced Typography */}
          <div className="p-8 sm:p-12 md:p-16">
            {/* Article Header */}
            <div className="mb-10 pb-8 border-b-2 border-gray-100">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">📖</span>
                  </div>
                  <span>Artikel Berita</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">⏱️</span>
                  </div>
                  <span>5 menit baca</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">👥</span>
                  </div>
                  <span>SDIT ANNAJM RABBANI</span>
                </div>
              </div>
            </div>

            {/* Enhanced Content */}
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg sm:text-xl whitespace-pre-line font-light">
                {berita.konten.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 first:text-xl first:font-normal first:text-gray-800 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t-2 border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">✍️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ditulis oleh</p>
                    <p className="font-bold text-gray-800 text-lg">{berita.penulis}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Dipublikasikan</p>
                    <p className="font-bold text-gray-800">{formatDate(berita.createdAt)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Back Button */}
            <div className="mt-12 text-center">
              <Link 
                href="/berita"
                className="inline-flex items-center bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/30 transition-all">
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span>Kembali ke Daftar Berita</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles with 3 Berita Preview */}
        <div className="mt-16 animate-fade-in" style={{animationDelay: '1s'}}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Baca Berita Lainnya</h3>
            <p className="text-gray-600 text-lg">Temukan informasi terbaru dari SDIT ANNAJM RABBANI</p>
          </div>
          
          {relatedBerita.length > 0 ? (
            <>
              {/* 3 Berita Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {relatedBerita.map((artikel, index) => (
                  <div key={artikel.id} className="animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-[#d4af37]/30 group hover:-translate-y-2">
                      {/* Image */}
                      {artikel.gambar && (
                        <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                          <Image
                            src={artikel.gambar}
                            alt={artikel.judul}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                              📰 {artikel.kategori}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6">
                        {/* Category (if no image) */}
                        {!artikel.gambar && (
                          <div className="mb-3">
                            <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                              📰 {artikel.kategori}
                            </span>
                          </div>
                        )}
                        
                        <h4 className="text-lg font-bold text-[#2d5016] mb-3 line-clamp-2 group-hover:text-[#3d6b1f] transition-colors">
                          {artikel.judul}
                        </h4>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {artikel.konten.substring(0, 120)}...
                        </p>
                        
                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-3 border-t pt-3">
                          <div className="flex items-center">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-full flex items-center justify-center mr-2">
                              <span className="text-white text-xs">✍️</span>
                            </div>
                            <span>{artikel.penulis}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center mr-2">
                              <span className="text-white text-xs">📅</span>
                            </div>
                            <span>{formatDate(artikel.createdAt)}</span>
                          </div>
                        </div>
                        
                        {/* Read More */}
                        <Link 
                          href={`/berita/${artikel.slug}`}
                          className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 group/btn hover:scale-105"
                        >
                          <span>Baca Selengkapnya</span>
                          <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
