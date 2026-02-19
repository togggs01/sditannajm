import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        expired: false 
      }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    const now = Date.now()
    
    // Check if session expired (24 hours)
    if (session.expiresAt && now > session.expiresAt) {
      // Session expired, return 401 with expired flag
      return NextResponse.json({ 
        error: 'Session expired',
        expired: true,
        message: 'Sesi Anda telah berakhir. Silakan login kembali.'
      }, { status: 401 })
    }

    // Also check loginTime as fallback
    if (session.loginTime) {
      const sessionAge = now - session.loginTime
      const maxAge = 86400000 // 24 hours in milliseconds
      
      if (sessionAge > maxAge) {
        return NextResponse.json({ 
          error: 'Session expired',
          expired: true,
          message: 'Sesi Anda telah berakhir. Silakan login kembali.'
        }, { status: 401 })
      }
    }

    // Return session with remaining time
    const remainingTime = session.expiresAt ? session.expiresAt - now : null
    
    return NextResponse.json({
      ...session,
      remainingTime: remainingTime,
      remainingHours: remainingTime ? Math.floor(remainingTime / (60 * 60 * 1000)) : null
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Unauthorized',
      expired: false 
    }, { status: 401 })
  }
}
