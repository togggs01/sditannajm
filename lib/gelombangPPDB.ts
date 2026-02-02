export interface GelombangInfo {
  id: string
  tahunAjaran: string
  gelombang: string
  tanggalMulai: string
  tanggalSelesai: string
  kuota: number | null
  aktif: boolean
}

export interface PendaftaranStatus {
  isOpen: boolean
  gelombangAktif: GelombangInfo | null
  message: string
}

// Fungsi untuk cek apakah tanggal dalam range dengan handling yang lebih akurat
export function isDateInRange(date: Date, startDate: string, endDate: string): boolean {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  // Set waktu untuk perbandingan yang akurat
  current.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  end.setHours(23, 59, 59, 999) // Set ke akhir hari
  
  return current >= start && current <= end
}

// Fungsi untuk format tanggal Indonesia
export function formatTanggalIndonesia(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

// Fungsi untuk mendapatkan badge color berdasarkan gelombang
export function getGelombangColor(gelombang: string): {
  bg: string
  text: string
  border: string
} {
  if (gelombang === 'Gelombang 1') {
    return {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    }
  } else {
    return {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200'
    }
  }
}

// Fungsi untuk mendapatkan gelombang default (fallback jika belum ada setting)
export function getDefaultGelombang(date: Date = new Date()): string {
  const month = date.getMonth() + 1 // 1-12
  
  if (month >= 1 && month <= 3) {
    return 'Gelombang 1'
  } else if (month >= 4 && month <= 6) {
    return 'Gelombang 2'
  } else {
    return 'Gelombang 1'
  }
}

// Fungsi untuk mendapatkan status pendaftaran dengan logic yang bersih
export function getRegistrationStatus(
  gelombang: GelombangInfo | null, 
  jumlahPendaftar: number,
  currentDate: Date = new Date()
): {
  isOpen: boolean
  reason: 'NO_ACTIVE_WAVE' | 'QUOTA_FULL' | 'NOT_YET_STARTED' | 'REGISTRATION_CLOSED' | 'OPEN'
  message: string
} {
  // Set waktu untuk perbandingan yang akurat
  const today = new Date(currentDate)
  today.setHours(0, 0, 0, 0)

  if (!gelombang || !gelombang.aktif) {
    return {
      isOpen: false,
      reason: 'NO_ACTIVE_WAVE',
      message: 'Belum ada gelombang pendaftaran yang dibuka. Silakan hubungi sekolah untuk informasi lebih lanjut.'
    }
  }

  const tanggalMulai = new Date(gelombang.tanggalMulai)
  const tanggalSelesai = new Date(gelombang.tanggalSelesai)
  tanggalMulai.setHours(0, 0, 0, 0)
  tanggalSelesai.setHours(23, 59, 59, 999)

  // Prioritas pengecekan: Kuota > Tanggal
  
  // 1. Cek kuota penuh
  if (gelombang.kuota !== null && jumlahPendaftar >= gelombang.kuota) {
    return {
      isOpen: false,
      reason: 'QUOTA_FULL',
      message: `Pendaftaran ${gelombang.gelombang} sudah ditutup karena kuota telah penuh (${gelombang.kuota} siswa).`
    }
  }

  // 2. Cek belum dimulai
  if (today < tanggalMulai) {
    return {
      isOpen: false,
      reason: 'NOT_YET_STARTED',
      message: `Pendaftaran ${gelombang.gelombang} akan dibuka pada ${tanggalMulai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`
    }
  }

  // 3. Cek sudah berakhir
  if (today > tanggalSelesai) {
    return {
      isOpen: false,
      reason: 'REGISTRATION_CLOSED',
      message: `Pendaftaran ${gelombang.gelombang} sudah ditutup pada ${tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`
    }
  }

  // 4. Pendaftaran terbuka
  return {
    isOpen: true,
    reason: 'OPEN',
    message: `Pendaftaran ${gelombang.gelombang} sedang dibuka hingga ${tanggalSelesai.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`
  }
}
