import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Hardcoded credentials (bypass database)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = body.username
    const password = body.password

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' }, 
        { status: 400 }
      )
    }

    // Check hardcoded credentials
    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Username atau password salah' }, 
        { status: 401 }
      )
    }

    const now = Date.now()
    const expiresAt = now + 86400000 // 24 hours
    
    const sessionData = {
      id: '1',
      username: ADMIN_USERNAME,
      role: 'admin',
      loginTime: now,
      expiresAt: expiresAt
    }

    const response = NextResponse.json({ 
      success: true,
      user: {
        id: '1',
        username: ADMIN_USERNAME,
        role: 'admin'
      }
    })

    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat login'
    }, { status: 500 })
  }
}
