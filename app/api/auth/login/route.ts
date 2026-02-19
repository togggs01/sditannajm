import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { setSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { username, password } = body

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

    // Set session
    await setSession({
      id: admin.id,
      username: admin.username,
      role: admin.role
    })

    // Return success
    return NextResponse.json({ 
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    })

  } catch (error) {
    console.error('Login API Error:', error)
    
    // Return detailed error in development
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        error: 'Terjadi kesalahan saat login',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }, { status: 500 })
    }
    
    // Return generic error in production
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat login'
    }, { status: 500 })
  }
}
