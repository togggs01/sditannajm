import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'
import Card from '@/components/Card'

export const dynamic = 'force-dynamic'

export default async function BeritaPage() {
  const beritaList = await prisma.berita.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Berita & Artikel</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Update terbaru seputar kegiatan, prestasi, dan pengumuman SDIT ANNAJM
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">
        {beritaList.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-600 text-lg">Belum ada berita yang dipublikasikan.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <Card key={berita.id} className="flex flex-col">
                {berita.gambar && (
                  <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden -m-6 mb-6">
                    <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="mb-3">
                  <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] text-xs px-3 py-1 rounded-full font-semibold">
                    {berita.kategori}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-[#2d5016] hover:text-[#3d6b1f] transition">
                  {berita.judul}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {berita.konten.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pb-4 border-t pt-4">
                  <span className="flex items-center">
                    <span className="mr-1">✍️</span>
                    {berita.penulis}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {formatDate(berita.createdAt)}
                  </span>
                </div>
                <Link 
                  href={`/berita/${berita.slug}`}
                  className="inline-flex items-center text-[#2d5016] font-semibold hover:text-[#d4af37] transition group"
                >
                  <span>Baca Selengkapnya</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
