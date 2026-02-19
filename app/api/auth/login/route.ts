import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { username, password } = body

    console.log('Login attempt:', { username })

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' }, 
        { status: 400 }
      )
    }

    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() }
    })

    console.log('Admin found:', admin ? 'Yes' : 'No')

    // Check credentials
    if (!admin) {
      return NextResponse.json(
        { error: 'Username atau password salah' }, 
        { status: 401 }
      )
    }

    if (admin.password !== password) {
      return NextResponse.json(
        { error: 'Username atau password salah' }, 
        { status: 401 }
      )
    }

    // Create session data
    const sessionData = {
      id: admin.id,
      username: admin.username,
      role: admin.role,
      loginTime: Date.now()
    }

    // Create response with cookie
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    })

    // Set cookie directly in response
    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    console.log('Login successful for:', username)
    return response

  } catch (error) {
    console.error('Login API Error:', error)
    
    // Return detailed error
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat login',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
