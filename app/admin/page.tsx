'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/admin/StatsCard'
import PageHeader from '@/components/admin/PageHeader'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    guruCount: 0,
    beritaCount: 0,
    galeriCount: 0,
    ppdbTotal: 0
  })

  useEffect(() => {
    // Check auth
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) router.push('/login')
        return res.json()
      })
      .then(() => {
        // Fetch stats
        return fetch('/api/stats')
      })
      .then(res => res.json())
      .then(data => {
        setStats({
          guruCount: data.guru || 0,
          beritaCount: data.berita || 0,
          galeriCount: data.galeri || 0,
          ppdbTotal: data.ppdb || 0
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [router])

  const totalContent = stats.guruCount + stats.beritaCount + stats.galeriCount

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2d5016] border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Dashboard"
        description="Selamat datang kembali!"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        }
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Guru"
            value={stats.guruCount}
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
            value={stats.beritaCount}
            subtitle="Artikel"
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />

          <StatsCard
            title="Total Galeri"
            value={stats.galeriCount}
            subtitle="Foto Kegiatan"
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          <StatsCard
            title="Pendaftaran PPDB"
            value={stats.ppdbTotal}
            subtitle="Total Pendaftar"
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-[#d4af37]/20 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#d4af37]/20">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2d5016]">Ringkasan Konten Website</h3>
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
