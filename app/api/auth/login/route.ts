import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 })
    }

    await setSession({
      id: admin.id,
      username: admin.username,
      role: admin.role
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login API Error:', error)
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat login',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
