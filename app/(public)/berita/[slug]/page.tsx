import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/formatDate'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const berita = await prisma.berita.findUnique({
    where: { slug }
  })

  if (!berita || !berita.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] pt-24 pb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f4d03f] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            href="/berita"
            className="inline-flex items-center text-white hover:text-[#f4d03f] font-semibold mb-6 transition-all group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Berita</span>
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-sm px-5 py-2 rounded-full font-bold shadow-lg">
              📰 {berita.kategori}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {berita.judul}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">✍️</span>
              </div>
              <div>
                <p className="text-xs text-gray-300">Penulis</p>
                <p className="font-semibold">{berita.penulis}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <p className="text-xs text-gray-300">Tanggal</p>
                <p className="font-semibold">{formatDate(berita.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Featured Image */}
          {berita.gambar && (
            <div className="relative aspect-[21/9] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
              <Image
                src={berita.gambar}
                alt={berita.judul}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 sm:p-10 md:p-12">
            {/* Content */}
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {berita.konten}
              </div>
            </article>

            {/* Divider */}
            <div className="my-10 border-t-2 border-gray-200"></div>

            {/* Back to List Button */}
            <div className="mt-10 text-center">
              <Link 
                href="/berita"
                className="inline-flex items-center bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali ke Daftar Berita</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
