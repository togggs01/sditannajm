import SchoolLogo from './SchoolLogo'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#1a2f0e] via-[#2d5016] to-[#1a2f0e] text-white mt-12 sm:mt-20 mb-16 lg:mb-0 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#f4d03f] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Mobile: Clean & Minimalist Layout */}
        <div className="lg:hidden space-y-6">
          {/* Logo Section */}
          <div className="text-center pb-6 border-b border-white/20">
            <div className="flex justify-center mb-4">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <SchoolLogo size="xl" showText textColor="text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
              Membentuk Generasi Qurani Berakhlak Mulia
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Buka Senin - Jumat, 07:00 - 15:00</span>
            </div>
          </div>

          {/* Social Media - Horizontal */}
          <div className="flex justify-center items-center space-x-6 py-4">
            <a 
              href="https://facebook.com/sditannajmrabbani" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center space-y-2"
            >
              <div className="relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-blue-600 hover:to-blue-700 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition">Facebook</span>
            </a>

            <a 
              href="https://www.instagram.com/sdit.annajm.rabbani" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center space-y-2"
            >
              <div className="relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-pink-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition">Instagram</span>
            </a>

            <a 
              href="https://www.youtube.com/@sditannajmrabbani7797/shorts" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center space-y-2"
            >
              <div className="relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-red-600 hover:to-red-700 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition">YouTube</span>
            </a>

            <a 
              href="https://www.tiktok.com/@sdit.annajm.rabbani?_r=1&_t=ZS-92twTScdxPm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center space-y-2"
            >
              <div className="relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-black hover:to-gray-800 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gray-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition">TikTok</span>
            </a>

            <a 
              href="https://wa.me/6287878210400" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center space-y-2"
            >
              <div className="relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-green-500 hover:to-green-600 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition">WhatsApp</span>
            </a>
          </div>

          {/* Quick Contact */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-5 mx-2 border border-white/10 shadow-xl">
            <h3 className="text-sm font-bold text-[#f4d03f] mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Hubungi Kami
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:087878210400" 
                className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group hover:shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Telepon</p>
                    <p className="text-sm font-semibold text-white">0878 7821 0400</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#f4d03f] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a 
                href="mailto:sditannajmrabbani.jatimakmur@gmail.com" 
                className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group hover:shadow-lg"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-semibold text-white break-words leading-tight">
                      sditannajmrabbani<br className="sm:hidden" />.jatimakmur@gmail.com
                    </p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#f4d03f] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#f4d03f]/30 to-yellow-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#f4d03f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Alamat</p>
                    <p className="text-sm font-medium text-white leading-relaxed">Jl. Pendidikan No. 123, Jakarta Selatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Enhanced Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-5">
            <div className="mb-6 transform hover:scale-105 transition-transform duration-300 inline-block">
              <SchoolLogo size="2xl" showText textColor="text-white" />
            </div>
            <p className="text-base text-gray-300 leading-relaxed mb-6 max-w-md">
              Sekolah Dasar Islam Terpadu yang mengintegrasikan pendidikan akademik berkualitas dengan nilai-nilai Islam yang kuat, membentuk generasi yang cerdas, berakhlak mulia, dan berprestasi.
            </p>
            
            {/* Operating Hours */}
            <div className="mb-6 inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <div>
                <p className="text-xs text-gray-400">Jam Operasional</p>
                <p className="text-sm font-semibold text-white">Senin - Jumat, 07:00 - 15:00 WIB</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="https://facebook.com/sditannajmrabbani" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-blue-600 hover:to-blue-700 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/sdit.annajm.rabbani" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@sditannajmrabbani7797/shorts" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-red-600 hover:to-red-700 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@sdit.annajm.rabbani?_r=1&_t=ZS-92twTScdxPm" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-black hover:to-gray-800 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://wa.me/6287878210400" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-green-500 hover:to-green-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-4">
            <h3 className="text-xl font-bold mb-6 text-[#f4d03f] flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kontak Kami
            </h3>
            <ul className="space-y-3 text-base text-gray-300">
              <li className="group">
                <div className="flex items-start p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#f4d03f]/30 to-yellow-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mr-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-[#f4d03f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Alamat</p>
                    <p className="text-sm font-medium leading-relaxed">Jl. Dieng VIII No.4 Blok C15, RT.001/RW.009<br/>Jatimakmur, Kec. Pd. Gede, Kota Bekasi, Jawa Barat 17413</p>
                  </div>
                </div>
              </li>
              <li className="group">
                <a href="tel:087878210400" className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mr-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Telepon</p>
                    <p className="text-sm font-semibold">0878 7821 0400</p>
                  </div>
                </a>
              </li>
              <li className="group">
                <a href="mailto:sditannajmrabbani.jatimakmur@gmail.com" className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mr-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-semibold break-words">sditannajmrabbani.jatimakmur@gmail.com</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-3">
            <h3 className="text-xl font-bold mb-6 text-[#f4d03f] flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Link Cepat
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <a href="/tentang" className="group flex items-center text-gray-300 hover:text-[#f4d03f] transition-all duration-300 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1">
                  <span className="mr-3 text-[#f4d03f] group-hover:translate-x-1 transition-transform">→</span>
                  <span className="font-medium">Tentang Kami</span>
                </a>
              </li>
              <li>
                <a href="/guru" className="group flex items-center text-gray-300 hover:text-[#f4d03f] transition-all duration-300 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1">
                  <span className="mr-3 text-[#f4d03f] group-hover:translate-x-1 transition-transform">→</span>
                  <span className="font-medium">Guru & Staff</span>
                </a>
              </li>
              <li>
                <a href="/berita" className="group flex items-center text-gray-300 hover:text-[#f4d03f] transition-all duration-300 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1">
                  <span className="mr-3 text-[#f4d03f] group-hover:translate-x-1 transition-transform">→</span>
                  <span className="font-medium">Berita</span>
                </a>
              </li>
              <li>
                <a href="/galeri" className="group flex items-center text-gray-300 hover:text-[#f4d03f] transition-all duration-300 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1">
                  <span className="mr-3 text-[#f4d03f] group-hover:translate-x-1 transition-transform">→</span>
                  <span className="font-medium">Galeri</span>
                </a>
              </li>
              <li>
                <a href="/ppdb" className="group flex items-center text-gray-300 hover:text-[#f4d03f] transition-all duration-300 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1">
                  <span className="mr-3 text-[#f4d03f] group-hover:translate-x-1 transition-transform">→</span>
                  <span className="font-medium">Pendaftaran</span>
                </a>
              </li>
              <li>
                <a href="/kontak" className="group flex items-center text-gray-300 hover:text-[#f4d03f] transition-all duration-300 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1">
                  <span className="mr-3 text-[#f4d03f] group-hover:translate-x-1 transition-transform">→</span>
                  <span className="font-medium">Hubungi Kami</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright - Clean & Centered */}
        <div className="border-t border-white/20 pt-6 mt-8">
          <div className="text-center space-y-2">
            <p className="text-gray-300 text-sm font-medium">
              &copy; {new Date().getFullYear()} <span className="text-[#f4d03f]">SDIT ANNAJM RABBANI</span>. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs flex items-center justify-center">
              Made with <span className="text-red-500 mx-1 animate-pulse">❤️</span> for Education Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
