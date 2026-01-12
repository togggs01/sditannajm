'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '@/components/Card'
import { getCurrentTahunAjaran } from '@/lib/tahunAjaran'
import { formatTanggalIndonesia, getGelombangColor } from '@/lib/gelombangPPDB'

interface GelombangInfo {
  id: string
  tahunAjaran: string
  gelombang: string
  tanggalMulai: string
  tanggalSelesai: string
  kuota: number | null
  aktif: boolean
}

export default function SyaratPPDBPage() {
  const [tahunAjaran, setTahunAjaran] = useState('')
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              📋 Tahun Ajaran {tahunAjaran || '2025/2026'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Syarat Pendaftaran</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Pastikan Anda memenuhi semua persyaratan sebelum mendaftar
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">
        <Card className="border-t-4 border-[#d4af37]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-2">Persyaratan Umum</h2>
            <p className="text-gray-600">Berikut adalah persyaratan yang harus dipenuhi untuk mendaftar</p>
          </div>

          {/* Persyaratan Usia */}
          <div className="mb-8 p-6 bg-gradient-to-br from-[#2d5016]/5 to-[#3d6b1f]/5 rounded-xl border-2 border-[#2d5016]/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#1a3a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#2d5016] mb-2">1. Persyaratan Usia</h3>
                <p className="text-gray-700 mb-2">
                  Calon siswa harus berusia <span className="font-bold text-[#2d5016]">minimal 6,5 tahun</span> pada tanggal 1 Juli {new Date().getFullYear()}
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-3">
                  <p className="text-sm text-yellow-800">
                    <span className="font-bold">⚠️ Penting:</span> Sistem akan otomatis memvalidasi usia saat Anda mengisi tanggal lahir. Jika belum memenuhi syarat usia, pendaftaran tidak dapat dilanjutkan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dokumen yang Diperlukan */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                <span className="text-[#1a3a0f] font-bold">2</span>
              </div>
              Dokumen yang Diperlukan
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <svg className="w-5 h-5 text-[#2d5016] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Foto Calon Siswa</p>
                  <p className="text-sm text-gray-600">Ukuran 3x4, latar belakang merah/biru</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <svg className="w-5 h-5 text-[#2d5016] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Fotocopy Kartu Keluarga (KK)</p>
                  <p className="text-sm text-gray-600">1 lembar, legalisir</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <svg className="w-5 h-5 text-[#2d5016] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Fotocopy Akta Kelahiran</p>
                  <p className="text-sm text-gray-600">1 lembar, legalisir</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data yang Harus Disiapkan */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                <span className="text-[#1a3a0f] font-bold">3</span>
              </div>
              Data yang Harus Disiapkan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Data Calon Siswa</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Nama lengkap</li>
                  <li>• Tempat & tanggal lahir</li>
                  <li>• Jenis kelamin</li>
                  <li>• Agama</li>
                  <li>• Anak ke berapa</li>
                  <li>• Jumlah saudara</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-900 mb-2">👨‍👩‍👧 Data Orang Tua</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Nama ayah & pekerjaan</li>
                  <li>• Nama ibu & pekerjaan</li>
                  <li>• Nomor telepon aktif</li>
                  <li>• Email</li>
                  <li>• Alamat lengkap</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Jadwal Pendaftaran */}
          {!loading && gelombangList.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                  <span className="text-[#1a3a0f] font-bold">📅</span>
                </div>
                Jadwal Pendaftaran
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gelombangList.map((gelombang) => {
                  const colors = getGelombangColor(gelombang.gelombang)
                  return (
                    <div key={gelombang.id} className={`p-4 ${colors.bg} rounded-lg border-2 ${colors.border}`}>
                      <p className={`font-bold ${colors.text} mb-2`}>{gelombang.gelombang}</p>
                      <p className={`text-sm ${colors.text}`}>
                        {formatTanggalIndonesia(gelombang.tanggalMulai)}
                        <br />
                        s/d {formatTanggalIndonesia(gelombang.tanggalSelesai)}
                      </p>
                      {gelombang.kuota && (
                        <p className={`text-sm ${colors.text} mt-2 font-semibold`}>
                          Kuota: {gelombang.kuota} siswa
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Proses Pendaftaran */}
          <div className="mb-8 p-6 bg-gradient-to-br from-[#d4af37]/10 to-[#f4d03f]/10 rounded-xl border-2 border-[#d4af37]/30">
            <h3 className="text-lg font-bold text-[#2d5016] mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                <span className="text-[#1a3a0f] font-bold">4</span>
              </div>
              Proses Pendaftaran
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#2d5016] flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-900">Isi Data Calon Siswa</p>
                  <p className="text-sm text-gray-600">Lengkapi informasi pribadi calon siswa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#2d5016] flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-900">Isi Data Orang Tua</p>
                  <p className="text-sm text-gray-600">Lengkapi informasi orang tua/wali</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#2d5016] flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-900">Upload Dokumen</p>
                  <p className="text-sm text-gray-600">Upload foto dan dokumen yang diperlukan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#2d5016] flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-gray-900">Verifikasi & Submit</p>
                  <p className="text-sm text-gray-600">Periksa kembali data dan kirim pendaftaran</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-blue-900 mb-1">Informasi Penting</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pastikan semua data yang diisi benar dan sesuai dengan dokumen</li>
                  <li>• File yang diupload maksimal 5MB per file</li>
                  <li>• Format file yang diterima: JPG, PNG, PDF</li>
                  <li>• Setelah mendaftar, Anda akan menerima konfirmasi via email/WhatsApp</li>
                  <li>• Proses verifikasi memakan waktu 1-3 hari kerja</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-4">
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Lanjut ke Formulir Pendaftaran</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
