import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

// GET - List all admins
export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(admins)
  } catch (error) {
    console.error('Error fetching admins:', error)
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 })
  }
}

// POST - Create new admin
export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { username, password, role } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        role: role || 'admin'
      },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(admin, { status: 201 })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 })
  }
}

// PUT - Update admin
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, username, password, role } = body

    if (!id) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 })
    }

    const updateData: any = {}
    
    if (username) updateData.username = username
    if (role) updateData.role = role
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const admin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(admin)
  } catch (error) {
    console.error('Error updating admin:', error)
    return NextResponse.json({ error: 'Failed to update admin' }, { status: 500 })
  }
}

// DELETE - Delete admin
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 })
    }

    // Prevent deleting yourself
    if (id === session.id) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus akun sendiri' },
        { status: 400 }
      )
    }

    await prisma.admin.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting admin:', error)
    return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 })
  }
}
