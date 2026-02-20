import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(galeri)
  } catch (error) {
    console.error('Error fetching galeri:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const galeri = await prisma.galeri.create({
      data: body
    })
    return NextResponse.json(galeri, { status: 201 })
  } catch (error) {
    console.error('Error creating galeri:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const galeri = await prisma.galeri.update({
      where: { id },
      data: body
    })
    return NextResponse.json(galeri)
  } catch (error) {
    console.error('Error updating galeri:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.galeri.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting galeri:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
