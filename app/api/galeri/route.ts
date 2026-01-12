import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(galeri)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data galeri' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { judul, deskripsi, gambar, kategori } = body

    if (!judul || !gambar || !kategori) {
      return NextResponse.json({ error: 'Judul, gambar, dan kategori wajib diisi' }, { status: 400 })
    }

    const galeri = await prisma.galeri.create({
      data: { judul, deskripsi, gambar, kategori }
    })

    return NextResponse.json(galeri, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menambahkan foto' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    const galeri = await prisma.galeri.update({
      where: { id },
      data: body
    })

    return NextResponse.json(galeri)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengupdate foto' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    await prisma.galeri.delete({ where: { id } })
    return NextResponse.json({ message: 'Foto berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus foto' }, { status: 500 })
  }
}
