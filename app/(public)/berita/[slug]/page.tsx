import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/formatDate'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let berita = null
  let relatedBerita = []
  
  try {
    const results = await Promise.allSettled([
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
    
    berita = results[0].status === 'fulfilled' ? results[0].value : null
    relatedBerita = results[1].status === 'fulfilled' ? results[1].value : []
  } catch (error) {
    console.error('Error fetching berita detail:', error)
  }

  if (!berita || !berita.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 to-white">
      {/* Hero Section - Full Green Background */}
      <div className="relative bg-gradient-to-br from-[#2d5016] to-[#4a7c2a] pt-20 pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Title - Centered */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {berita.judul}
          </h1>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Featured Image */}
          {berita.gambar && (
            <div className="relative w-full aspect-video bg-gray-100 rounded-t-3xl overflow-hidden">
              {berita.gambar.startsWith('data:') ? (
                <img
                  src={berita.gambar}
                  alt={berita.judul}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={berita.gambar}
                  alt={berita.judul}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {/* Floating Icon */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <span className="text-xl">📰</span>
                </div>
              </div>
              {/* Image Caption */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <p className="text-white text-sm font-semibold drop-shadow-lg">{berita.judul}</p>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 sm:p-10">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2d5016] flex items-center justify-center">
                  <span className="text-white text-xs">📖</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Artikel Berita</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#f4d03f] flex items-center justify-center">
                  <span className="text-white text-xs">📂</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">{berita.kategori}</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <span className="text-white text-xs">🏫</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">SDIT ANNAJM RABBANI</span>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-gray max-w-none mb-10">
              <div className="text-gray-700 leading-relaxed space-y-4">
                {berita.konten.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-base sm:text-lg first:text-lg sm:first:text-xl first:font-semibold first:text-gray-900">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Author Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2d5016] flex items-center justify-center">
                  <span className="text-white text-lg">✍️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ditulis oleh</p>
                  <p className="font-bold text-gray-900">{berita.penulis}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f4d03f] flex items-center justify-center">
                  <span className="text-white text-lg">📅</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dipublikasikan</p>
                  <p className="font-bold text-gray-900">{formatDate(berita.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Back Button - Centered */}
            <div className="mt-10 text-center">
              <Link 
                href="/berita"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#2d5016] to-[#4a7c2a] hover:from-[#4a7c2a] hover:to-[#2d5016] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali ke Daftar Berita</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBerita.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Baca Berita Lainnya</h2>
              <p className="text-gray-600">Temukan informasi terbaru dari SDIT ANNAJM RABBANI</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBerita.map((artikel) => (
                <Link 
                  key={artikel.id}
                  href={`/berita/${artikel.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >
                  {/* Image */}
                  {artikel.gambar && (
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <Image
                        src={artikel.gambar}
                        alt={artikel.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#f4d03f] text-[#2d5016] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          📰 {artikel.kategori}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-5">
                    {!artikel.gambar && (
                      <div className="mb-3">
                        <span className="bg-[#f4d03f] text-[#2d5016] text-xs font-bold px-3 py-1.5 rounded-full">
                          📰 {artikel.kategori}
                        </span>
                      </div>
                    )}
                    
                    <h3 className="font-bold text-[#2d5016] mb-2 line-clamp-2 group-hover:text-[#4a7c2a] transition-colors">
                      {artikel.judul}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {artikel.konten.substring(0, 100)}...
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                      <div className="flex items-center gap-1.5">
                        <span>✍️</span>
                        <span className="truncate">{artikel.penulis}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>📅</span>
                        <span>{formatDate(artikel.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
