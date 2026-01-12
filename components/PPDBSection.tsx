'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'
import { formatTanggalIndonesia } from '@/lib/gelombangPPDB'

interface GelombangInfo {
  id: string
  tahunAjaran: string
  gelombang: string
  tanggalMulai: string
  tanggalSelesai: string
  kuota: number | null
  aktif: boolean
  jumlahPendaftar?: number
  sisaKuota?: number
}

export default function PPDBSection() {
  const [tahunAjaran, setTahunAjaran] = useState('2025/2026')
  const [gelombangList, setGelombangList] = useState<GelombangInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTahunAjaran(getCurrentTahunAjaran())
    fetchGelombang()
  }, [])

  const fetchGelombang = async () => {
    try {
      const res = await fetch(`/api/gelombang-ppdb?tahunAjaran=${getCurrentTahunAjaran()}`)
      const data = await res.json()
      setGelombangList(data.filter((g: GelombangInfo) => g.aktif))
    } catch (error) {
      console.error('Error fetching gelombang:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016]"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f4d03f] rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative px-6 sm:px-8 py-12 sm:py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Pendaftaran Siswa Baru</h2>
        <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Tahun Ajaran {tahunAjaran} telah dibuka! Bergabunglah bersama kami untuk masa depan yang lebih cerah
        </p>
        
        {/* Info PPDB */}
        {!loading && gelombangList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {gelombangList.map((gelombang) => {
              const kuotaPenuh = gelombang.kuota !== null && gelombang.sisaKuota !== undefined && gelombang.sisaKuota <= 0
              const kuotaTerbatas = gelombang.kuota !== null && gelombang.sisaKuota !== undefined && gelombang.sisaKuota <= 10 && gelombang.sisaKuota > 0
              
              return (
                <div key={gelombang.id} className={`backdrop-blur-sm rounded-xl p-4 border ${
                  kuotaPenuh 
                    ? 'bg-red-500/20 border-red-300/30' 
                    : kuotaTerbatas
                    ? 'bg-yellow-500/20 border-yellow-300/30'
                    : 'bg-white/10 border-white/20'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#f4d03f] font-bold text-sm">{gelombang.gelombang}</p>
                    {kuotaPenuh && (
                      <span className="text-[10px] font-bold text-red-300 bg-red-500/30 px-2 py-0.5 rounded-full">
                        PENUH
                      </span>
                    )}
                    {kuotaTerbatas && (
                      <span className="text-[10px] font-bold text-yellow-300 bg-yellow-500/30 px-2 py-0.5 rounded-full">
                        TERBATAS
                      </span>
                    )}
                  </div>
                  <p className="text-white text-xs">
                    {formatTanggalIndonesia(gelombang.tanggalMulai)} - {formatTanggalIndonesia(gelombang.tanggalSelesai)}
                  </p>
                  {gelombang.kuota !== null && gelombang.sisaKuota !== undefined ? (
                    <div className="mt-2">
                      <p className={`text-xs font-semibold ${
                        kuotaPenuh ? 'text-red-300' : kuotaTerbatas ? 'text-yellow-300' : 'text-white/80'
                      }`}>
                        {kuotaPenuh 
                          ? `Kuota penuh (${gelombang.kuota} siswa)` 
                          : `Sisa ${gelombang.sisaKuota} dari ${gelombang.kuota} kuota`
                        }
                      </p>
                    </div>
                  ) : (
                    <p className="text-white/80 text-xs mt-1">Kuota: Tidak terbatas</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
        
        {!loading && gelombangList.length === 0 && (
          <div className="max-w-2xl mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <p className="text-white text-sm">Informasi gelombang pendaftaran akan segera diumumkan</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/ppdb" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-[#2d5016] font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-2xl hover:shadow-[#d4af37]/50 transform hover:scale-105"
          >
            <span>Daftar Sekarang</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link 
            href="/ppdb/syarat" 
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-10 rounded-xl text-lg transition-all border-2 border-white/30 hover:border-white/50"
          >
            <span>Lihat Syarat Lengkap</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
