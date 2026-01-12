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

// Fungsi untuk cek apakah tanggal dalam range
export function isDateInRange(date: Date, startDate: string, endDate: string): boolean {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const start = new Date(startDate)
  const end = new Date(endDate)
  
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
