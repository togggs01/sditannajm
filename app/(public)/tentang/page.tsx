import Card from '@/components/Card'
import SchoolLogo from '@/components/SchoolLogo'

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Tentang SDIT ANNAJM</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Mengenal lebih dekat visi, misi, dan fasilitas sekolah kami
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8 relative">
        {/* Floating Ornaments */}
        <div className="hidden lg:block">
          <div className="absolute top-10 right-5 w-3 h-3 bg-[#d4af37]/40 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/20"></div>
          <div className="absolute top-32 left-10 w-2 h-2 bg-[#f4d03f]/50 rounded-full animate-pulse shadow-lg shadow-[#f4d03f]/20" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 right-20 w-2.5 h-2.5 bg-[#d4af37]/35 rounded-full animate-pulse shadow-lg shadow-[#d4af37]/15" style={{animationDelay: '1s'}}></div>
        </div>
      
      {/* Profil Sekolah */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#f4d03f]/15 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {/* Logo Section */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] p-10 md:p-12 flex items-center justify-center relative">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-5 right-5 w-20 h-20 border-2 border-white/10 rounded-full"></div>
              <div className="absolute bottom-5 left-5 w-16 h-16 border-2 border-[#d4af37]/20 rounded-full"></div>
              
              <div className="text-center relative z-10 space-y-8">
                {/* Logo with glow */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-3xl blur-2xl opacity-50"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/20">
                    <SchoolLogo size="xl" />
                  </div>
                </div>
                
                {/* School Name */}
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white tracking-wide">SDIT AN-NAJM RABBANI</h3>
                </div>
                
                {/* Established Year */}
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-2 tracking-wider">BERDIRI SEJAK</p>
                  <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-3 rounded-2xl border border-white/20">
                    <p className="text-5xl font-bold text-[#d4af37]">2017</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-3 p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-6">Website SDIT ANNAJM RABBANI</h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-[#2d5016]">Website SDIT ANNAJM RABBANI</span> hadir sebagai media informasi dan komunikasi bagi orang tua dan masyarakat, dengan komitmen mewujudkan visi <span className="font-semibold text-[#2d5016]">"Berakhlak, Mandiri, Cerdas, dan Ceria"</span> melalui pendidikan yang menekankan nilai keislaman, pembentukan karakter, serta pengembangan potensi peserta didik, dengan dukungan sinergi antara <span className="font-semibold text-[#2d5016]">sekolah, orang tua, dan masyarakat</span>.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-l-4 border-[#d4af37] hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Akreditasi</p>
                    <p className="text-2xl font-bold text-[#2d5016]">B</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-l-4 border-[#2d5016] hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Jumlah Siswa</p>
                    <p className="text-2xl font-bold text-[#2d5016]">200+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 left-10 w-20 h-20 border-4 border-[#d4af37]/30 rounded-full -z-10 animate-pulse shadow-lg shadow-[#d4af37]/10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-[#f4d03f]/20 rounded-full -z-10"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-[#f4d03f]/20 rounded-full -z-10 animate-pulse shadow-xl shadow-[#f4d03f]/20" style={{animationDelay: '0.5s'}}></div>
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">Visi & Misi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Landasan dan arah pendidikan SDIT ANNAJM RABBANI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Visi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#2d5016] hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d5016]">Visi Kami</h3>
              </div>
              
              <div className="bg-gradient-to-br from-[#2d5016]/5 to-[#3d6b1f]/5 rounded-xl p-6 border-l-4 border-[#2d5016] text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-[#2d5016] font-bold text-xl leading-relaxed">
                  "BERAKHLAK, MANDIRI, CERDAS DAN CERIA"
                </p>
                <div className="mt-4 pt-4 border-t border-[#2d5016]/20">
                  <p className="text-gray-600 text-sm italic">
                    Menjadi lembaga pendidikan Islam terpadu yang unggul dalam membentuk generasi Qurani
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Misi */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#d4af37] hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d5016]">Misi Kami</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  'Turut berkontribusi dalam membangun generasi yang berakhlak cerdas dan ceria',
                  'Membangun hubungan edukatif, sosial dan produktif dengan orang tua/wali murid, masyarakat dan pemerintah',
                  'Menanam kedisiplinan dan rasa tanggung jawab siswa',
                  'Membangun terciptanya lingkungan yang kondusif di sekolah',
                  'Mengembangkan potensi anak sesuai dengan bakat dan kemampuan',
                  'Menumbuhkan semangat warga sekolah',
                  'Menanamkan budaya peduli sesama dan budi pekerti yang luhur'
                ].map((misi, index) => (
                  <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border-l-4 border-[#d4af37] hover:shadow-md transition-all duration-300 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-[#2d5016] text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Sekolah */}
      <section className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#d4af37]/15 to-[#f4d03f]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-[#f4d03f]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 border-2 border-[#d4af37]/30 rounded-full -z-10 shadow-lg shadow-[#d4af37]/10"></div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">Fasilitas Sekolah</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Sarana dan prasarana lengkap untuk mendukung pembelajaran optimal</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Ruang Kelas Full AC */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏫</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Ruang Kelas Full AC</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ruang kelas ber-AC dengan suasana belajar yang nyaman dan kondusif</p>
            </div>

            {/* Laboratorium Komputer */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b1f] to-[#2d5016] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Laboratorium Komputer</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lab komputer dengan perangkat modern untuk pembelajaran teknologi</p>
            </div>

            {/* Laboratorium IPA */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Laboratorium IPA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lab IPA lengkap untuk praktikum sains dan eksperimen</p>
            </div>

            {/* Perpustakaan */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Perpustakaan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Koleksi buku yang beragam dan ruang baca yang nyaman</p>
            </div>

            {/* Mushola */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🕌</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Mushola</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mushola sekolah untuk kegiatan ibadah dan pembelajaran agama</p>
            </div>

            {/* UKS */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">UKS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Unit Kesehatan Sekolah untuk pelayanan kesehatan siswa</p>
            </div>

            {/* Aula Serbaguna */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b1f] to-[#2d5016] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎭</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Aula Serbaguna</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Ruang serbaguna untuk kegiatan sekolah dan acara besar</p>
            </div>

            {/* Kantin */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Kantin</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Kantin sehat dengan menu bergizi dan higienis</p>
            </div>

            {/* Toilet Putra & Putri */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🚻</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Toilet Putra & Putri</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Fasilitas toilet terpisah yang bersih dan terawat</p>
            </div>

            {/* Lahan Parkir */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🅿️</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Lahan Parkir</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Area parkir yang luas dan aman untuk kendaraan</p>
            </div>

            {/* Sarana Olahraga */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b1f] to-[#2d5016] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚽</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Sarana Olahraga</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Lapangan dan peralatan olahraga untuk aktivitas fisik</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler */}
      <section className="mb-20 relative">
        {/* Decorative Elements */}
        <div className="absolute -top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#f4d03f]/20 to-[#d4af37]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-tl from-[#2d5016]/15 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/3 left-20 w-20 h-20 border-2 border-[#f4d03f]/30 rounded-full -z-10 shadow-lg shadow-[#f4d03f]/10"></div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5016] mb-4">Ekstrakurikuler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Beragam kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Pramuka */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏕️</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Pramuka</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Kegiatan kepramukaan untuk membentuk karakter dan jiwa kepemimpinan</p>
            </div>

            {/* Futsal */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b1f] to-[#2d5016] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚽</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Futsal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Olahraga futsal untuk mengembangkan keterampilan dan kerjasama tim</p>
            </div>

            {/* Robotik */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Robotik</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Pembelajaran robotik dan teknologi untuk masa depan digital</p>
            </div>

            {/* Panahan */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏹</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Panahan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Olahraga panahan untuk melatih fokus dan ketepatan</p>
            </div>

            {/* Pencak Silat */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🥋</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Pencak Silat</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Seni bela diri tradisional Indonesia untuk kebugaran dan karakter</p>
            </div>

            {/* Melukis */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Melukis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Seni lukis untuk mengembangkan kreativitas dan ekspresi artistik</p>
            </div>

            {/* Berenang */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b1f] to-[#2d5016] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏊</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Berenang</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Olahraga renang untuk kesehatan dan kebugaran jasmani</p>
            </div>

            {/* Arabic Club */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🕌</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Arabic Club</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Klub bahasa Arab untuk memperdalam pemahaman bahasa Al-Quran</p>
            </div>

            {/* Al Quran Club */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">📖</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Al Quran Club</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Klub Al-Quran untuk tahfidz dan tilawah yang indah</p>
            </div>

            {/* Math Club */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔢</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Math Club</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Klub matematika untuk mengasah kemampuan logika dan problem solving</p>
            </div>

            {/* English Club */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b1f] to-[#2d5016] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🇬🇧</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">English Club</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Klub bahasa Inggris untuk meningkatkan kemampuan komunikasi global</p>
            </div>

            {/* Hadroh */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f4d03f] to-[#d4af37] rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🥁</span>
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2d5016]">Hadroh</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Seni musik islami dengan alat musik tradisional dan sholawat</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
