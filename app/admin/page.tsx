import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import StatsCard from '@/components/admin/StatsCard'
import PageHeader from '@/components/admin/PageHeader'

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/login')

  const [
    guruCount,
    beritaCount,
    galeriCount,
    ppdbTotal,
    ppdbPending,
    ppdbApproved,
    ppdbRejected,
    beritaPublished,
    recentPPDB
  ] = await Promise.all([
    prisma.guru.count(),
    prisma.berita.count(),
    prisma.galeri.count(),
    prisma.pPDB.count(),
    prisma.pPDB.count({ where: { status: 'pending' } }),
    prisma.pPDB.count({ where: { status: 'approved' } }),
    prisma.pPDB.count({ where: { status: 'rejected' } }),
    prisma.berita.count({ where: { published: true } }),
    prisma.pPDB.findMany({ 
      take: 5, 
      orderBy: { createdAt: 'desc' },
      select: { namaLengkap: true, createdAt: true, status: true }
    })
  ])

  const totalContent = guruCount + beritaCount + galeriCount
  const ppdbApprovalRate = ppdbTotal > 0 ? Math.round((ppdbApproved / ppdbTotal) * 100) : 0

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description={`Selamat datang kembali, ${session.username}!`}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Guru"
            value={guruCount}
            subtitle="Tenaga Pendidik"
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />

          <StatsCard
            title="Total Berita"
            value={beritaCount}
            subtitle={`${beritaPublished} Published`}
            color="blue"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />

          <StatsCard
            title="Total Galeri"
            value={galeriCount}
            subtitle="Foto Kegiatan"
            color="indigo"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          <StatsCard
            title="Pendaftaran PPDB"
            value={ppdbTotal}
            subtitle={`${ppdbPending} Menunggu`}
            color="yellow"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        </div>

        {/* PPDB Status & Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PPDB Status Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#d4af37]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2d5016]">Status Pendaftaran PPDB</h3>
            </div>
          
          <div className="space-y-4">
            {/* Pending */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Menunggu
                </span>
                <span className="text-sm font-bold text-[#d4af37]">{ppdbPending} ({ppdbTotal > 0 ? Math.round((ppdbPending / ppdbTotal) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${ppdbTotal > 0 ? (ppdbPending / ppdbTotal) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Approved */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Diterima
                </span>
                <span className="text-sm font-bold text-[#2d5016]">{ppdbApproved} ({ppdbTotal > 0 ? Math.round((ppdbApproved / ppdbTotal) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${ppdbTotal > 0 ? (ppdbApproved / ppdbTotal) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Rejected */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ditolak
                </span>
                <span className="text-sm font-bold text-red-600">{ppdbRejected} ({ppdbTotal > 0 ? Math.round((ppdbRejected / ppdbTotal) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${ppdbTotal > 0 ? (ppdbRejected / ppdbTotal) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

            <div className="mt-6 p-5 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Tingkat Penerimaan</p>
                  <p className="text-4xl font-bold">{ppdbApprovalRate}%</p>
                </div>
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent PPDB */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-[#d4af37]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2d5016]">Pendaftar Terbaru</h3>
            </div>
            <div className="space-y-3">
              {recentPPDB.length > 0 ? (
                recentPPDB.map((ppdb, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#2d5016] hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{ppdb.namaLengkap}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(ppdb.createdAt).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                        ppdb.status === 'pending' ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 text-[#d4af37] border border-[#d4af37]/30' :
                        ppdb.status === 'approved' ? 'bg-gradient-to-r from-[#2d5016]/20 to-[#3d6b1f]/20 text-[#2d5016] border border-[#2d5016]/30' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {ppdb.status === 'pending' ? 'Menunggu' : ppdb.status === 'approved' ? 'Diterima' : 'Ditolak'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-500 text-sm">Belum ada pendaftar</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Summary */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#d4af37]/20">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2d5016]">Ringkasan Konten Website</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-[#2d5016]/5 to-[#3d6b1f]/10 rounded-xl border-2 border-[#2d5016]/20">
              <svg className="w-12 h-12 text-[#2d5016] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-3xl font-bold text-[#2d5016] mb-1">{guruCount}</p>
              <p className="text-sm text-[#3d6b1f] font-semibold">Data Guru</p>
              <p className="text-xs text-gray-600 mt-2">{totalContent > 0 ? Math.round((guruCount / totalContent) * 100) : 0}% dari total</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-[#3d6b1f]/5 to-[#2d5016]/10 rounded-xl border-2 border-[#3d6b1f]/20">
              <svg className="w-12 h-12 text-[#3d6b1f] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-3xl font-bold text-[#3d6b1f] mb-1">{beritaCount}</p>
              <p className="text-sm text-[#2d5016] font-semibold">Artikel Berita</p>
              <p className="text-xs text-gray-600 mt-2">{totalContent > 0 ? Math.round((beritaCount / totalContent) * 100) : 0}% dari total</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-[#d4af37]/10 to-[#f4d03f]/10 rounded-xl border-2 border-[#d4af37]/30">
              <svg className="w-12 h-12 text-[#d4af37] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-3xl font-bold text-[#d4af37] mb-1">{galeriCount}</p>
              <p className="text-sm text-[#d4af37] font-semibold">Foto Galeri</p>
              <p className="text-xs text-gray-600 mt-2">{totalContent > 0 ? Math.round((galeriCount / totalContent) * 100) : 0}% dari total</p>
            </div>
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] rounded-xl text-center shadow-lg">
            <p className="text-sm text-white/90 mb-2">Total Konten Website</p>
            <p className="text-5xl font-bold text-white mb-1">{totalContent}</p>
            <p className="text-xs text-[#d4af37]">Guru + Berita + Galeri</p>
          </div>
        </div>
      </div>
    </div>
  )
}
