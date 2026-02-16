import { prisma } from '@/lib/prisma'
import BeritaPageClient from '@/components/BeritaPageClient'

export const dynamic = 'force-dynamic'

export default async function BeritaPage() {
  const beritaList = await prisma.berita.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-yellow-50/50">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-24 overflow-hidden">
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
              <pattern id="islamic-pattern-berita-list" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#f4d03f" strokeWidth="1"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
                <path d="M 50 20 L 50 80 M 20 50 L 80 50" stroke="#f4d03f" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="3" fill="#d4af37"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern-berita-list)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-shadow hero-text-glow animate-slide-up">
              Berita & Artikel
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay-1">
              Temukan informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SDIT ANNAJM RABBANI
            </p>
          </div>
        </div>
      </div>

      <BeritaPageClient initialBerita={beritaList} />
    </div>
  )
}
