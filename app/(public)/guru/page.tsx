import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function GuruPage() {
  let guruList = []
  
  try {
    guruList = await prisma.guru.findMany({
      orderBy: { nama: 'asc' }
    })
  } catch (error) {
    console.error('Error fetching guru:', error)
    // Continue with empty array
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Background Image */}
      <div className="relative pt-32 pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/guru.jpeg"
            alt="Guru Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d5016]/90 via-[#3d6b1f]/85 to-[#2d5016]/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">Guru & Staff</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg">
            Tim pendidik profesional dan berdedikasi untuk membimbing generasi Qurani
          </p>
        </div>
      </div>

      {/* Content Section with Overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20 relative z-20">
        {guruList.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="text-7xl mb-4">👨‍🏫</div>
            <p className="text-gray-600 text-lg">Belum ada data guru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guruList.map((guru) => (
              <div key={guru.id} className="bg-white rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300">
                {/* Photo with thick yellow border - smaller size */}
                <div className="w-40 h-40 mx-auto mb-4 rounded-full flex items-center justify-center p-1.5 shadow-xl group-hover:scale-105 transition-transform" style={{ border: '6px solid #e6c547' }}>
                  <div className="w-full h-full bg-white rounded-full overflow-hidden relative">
                    {guru.foto ? (
                      <Image 
                        src={guru.foto} 
                        alt={guru.nama} 
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-5xl">👤</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-bold mb-2 text-[#2d5016]">{guru.nama}</h3>
                
                {/* NIP */}
                {guru.nip && (
                  <p className="text-sm text-gray-500 mb-3">
                    NIP: {guru.nip}
                  </p>
                )}
                
                {/* Jabatan Badge */}
                <div className="inline-block bg-gradient-to-r from-[#e6c547] to-[#f4d03f] text-[#2d5016] px-6 py-2 rounded-full text-sm font-bold shadow-md">
                  {guru.jabatan}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
