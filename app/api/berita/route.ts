import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(berita)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data berita' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { judul, konten, gambar, penulis, kategori, published } = body

    if (!judul || !konten || !penulis || !kategori) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    const slug = slugify(judul)

    const berita = await prisma.berita.create({
      data: {
        judul,
        slug,
        konten,
        gambar,
        penulis,
        kategori,
        published: published || false
      }
    })

    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menambahkan berita' }, { status: 500 })
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

    if (body.judul) {
      body.slug = slugify(body.judul)
    }

    const berita = await prisma.berita.update({
      where: { id },
      data: body
    })

    return NextResponse.json(berita)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengupdate berita' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
    }

    await prisma.berita.delete({ where: { id } })
    return NextResponse.json({ message: 'Berita berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus berita' }, { status: 500 })
  }
}
