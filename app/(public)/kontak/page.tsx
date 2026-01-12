import Card from '@/components/Card'

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Hubungi Kami</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Kami siap membantu dan menjawab pertanyaan Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-l-4 border-[#d4af37]">
          <h2 className="text-3xl font-bold mb-6 text-[#2d5016]">Informasi Kontak</h2>
          
          <div className="space-y-6">
            <div className="flex items-start p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-[#2d5016]">Alamat</h3>
                <p className="text-gray-600 leading-relaxed">
                   Jl. Dieng VIII No.4 Blok C15, RT.001/RW.009<br />
                  Jatimakmur, Kec. Pd. Gede, Kota Bks, Jawa Barat 17413
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-[#2d5016]">Telepon</h3>
                <p className="text-gray-600">0878 7821 0400 - Admin 1</p>
                <p className="text-gray-600">0822 1122 4107 - Admin 2</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-[#2d5016]">Email</h3>
                <p className="text-gray-600">sditannajmrabbani.jatimakmur@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">🕐</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-[#2d5016]">Jam Operasional</h3>
                <p className="text-gray-600">Senin - Jumat: 07.00 - 15.00 WIB</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-[#d4af37]">
          <h2 className="text-3xl font-bold mb-6 text-[#2d5016]">Lokasi Kami</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.1372333969794!2d106.92337577387786!3d-6.278346561455001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d464f3a8bc1%3A0xd2d23d91bf055acc!2sSDIT%20AN%20Najm!5e1!3m2!1sid!2sid!4v1762697471429!5m2!1sid!2sid" 
              width="100%" 
              height="400" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi SDIT ANNAJM"
            />
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-[#2d5016] mb-1">SDIT AN Najm</p>
                <p className="text-sm text-gray-700">
                  Kami berlokasi strategis dan mudah diakses dengan transportasi umum maupun kendaraan pribadi.
                </p>
                <a 
                  href="https://www.google.com/maps/place/SDIT+AN+Najm/@-6.2783466,106.9233758,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698d464f3a8bc1:0xd2d23d91bf055acc!8m2!3d-6.2783466!4d106.9259507!16s%2Fg%2F11h0g2gy_w?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-sm text-green-600 hover:text-green-700 font-semibold"
                >
                  <span>Buka di Google Maps</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="border-none shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/10 to-[#f4d03f]/10 rounded-full blur-3xl"></div>
          
          <div className="relative text-center mb-8">
            <h2 className="text-4xl font-bold text-[#2d5016] mb-3">Ikuti Kami</h2>
            <p className="text-gray-600">Tetap terhubung dengan kami melalui media sosial</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Facebook */}
            <a 
              href="https://facebook.com/sditannajmrabbani" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <p className="text-white font-bold text-sm">Facebook</p>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/sdit.annajm.rabbani" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl p-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <p className="text-white font-bold text-sm">Instagram</p>
                </div>
              </div>
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@sditannajmrabbani7797/shorts" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <p className="text-white font-bold text-sm">YouTube</p>
                </div>
              </div>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@sdit.annajm.rabbani?_r=1&_t=ZS-92twTScdxPm" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <p className="text-white font-bold text-sm">TikTok</p>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/6287878210400" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <p className="text-white font-bold text-sm">WhatsApp</p>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Ikuti media sosial kami untuk update terbaru tentang kegiatan, prestasi, dan informasi sekolah
            </p>
          </div>
        </Card>
      </div>
      </div>
    </div>
  )
}
