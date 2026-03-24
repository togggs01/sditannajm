/**
 * Mendapatkan tahun ajaran saat ini
 * Format: "2025/2026"
 * Logic: Jika bulan >= Juli (7), maka tahun ajaran dimulai dari tahun ini
 *        Jika bulan < Juli, maka tahun ajaran masih tahun lalu
 */
export function getCurrentTahunAjaran(): string {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 0-11 -> 1-12

  // Jika bulan >= Januari (tahun baru), tampilkan tahun ajaran yang akan datang
  // Contoh: Maret 2026 -> 2026/2027
  return `${currentYear}/${currentYear + 1}`
}

/**
 * Mendapatkan tahun ajaran berikutnya
 */
export function getNextTahunAjaran(): string {
  const current = getCurrentTahunAjaran()
  const [year1] = current.split('/')
  const nextYear1 = parseInt(year1) + 1
  return `${nextYear1}/${nextYear1 + 1}`
}

/**
 * Generate list tahun ajaran dari tahun tertentu sampai sekarang
 */
export function generateTahunAjaranList(startYear: number = 2020): string[] {
  const current = getCurrentTahunAjaran()
  const [currentYear1] = current.split('/').map(Number)
  
  const list: string[] = []
  for (let year = startYear; year <= currentYear1; year++) {
    list.push(`${year}/${year + 1}`)
  }
  
  return list.reverse() // Terbaru di atas
}

/**
 * Format tahun ajaran untuk display
 */
export function formatTahunAjaran(tahunAjaran: string): string {
  return `Tahun Ajaran ${tahunAjaran}`
}
