import { prisma } from '@/lib/prisma'
import Card from '@/components/Card'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function GuruPage() {
  const guruList = await prisma.guru.findMany({
    orderBy: { nama: 'asc' }
  })

  return (
    <div className="min-h-screen bg-yellow-50/50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Guru & Staff</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Tim pendidik profesional dan berdedikasi untuk membimbing generasi Qurani
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 sm:px-6 lg:px-8">
        {guruList.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">👨‍🏫</div>
            <p className="text-gray-600 text-lg">Belum ada data guru.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guruList.map((guru) => (
              <Card key={guru.id} className="text-center group border-2 border-[#d4af37]/30 hover:border-[#d4af37]/60 transition-colors duration-300">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center p-1 shadow-xl group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden relative">
                    {guru.foto ? (
                      <Image 
                        src={guru.foto} 
                        alt={guru.nama} 
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-5xl">👤</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#2d5016]">{guru.nama}</h3>
                {guru.nip && <p className="text-sm text-gray-500 mb-2">NIP: {guru.nip}</p>}
                <div className="inline-block bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#2d5016] px-4 py-1 rounded-full text-sm font-semibold">
                  {guru.jabatan}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
