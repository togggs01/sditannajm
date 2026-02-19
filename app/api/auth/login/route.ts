import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' }, 
        { status: 400 }
      )
    }

    const admin = await prisma.admin.findUnique({
      where: { username: String(username).trim() }
    })

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { error: 'Username atau password salah' }, 
        { status: 401 }
      )
    }

    // Create session with 24 hour expiry
    const now = Date.now()
    const expiresAt = now + (24 * 60 * 60 * 1000) // 24 hours from now
    
    const sessionData = {
      id: admin.id,
      username: admin.username,
      role: admin.role,
      loginTime: now,
      expiresAt: expiresAt
    }

    const response = NextResponse.json({ 
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      },
      expiresAt: new Date(expiresAt).toISOString()
    })

    // Set cookie with 24 hour expiry
    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours in seconds
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat login',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
