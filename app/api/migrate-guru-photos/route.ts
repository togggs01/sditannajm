import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Update semua guru yang fotonya masih berupa path /uploads/
    const result = await prisma.guru.updateMany({
      where: {
        foto: {
          startsWith: '/uploads/'
        }
      },
      data: {
        foto: null // Reset foto ke null, nanti bisa diupload ulang
      }
    })

    return NextResponse.json({
      success: true,
      message: `Berhasil mereset ${result.count} foto guru. Silakan upload ulang foto dari admin panel.`,
      count: result.count
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Gagal migrasi data' },
      { status: 500 }
    )
  }
}
