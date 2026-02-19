import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    const now = Date.now()
    
    if (session.expiresAt && now > session.expiresAt) {
      return NextResponse.json({ 
        error: 'Session expired',
        expired: true
      }, { status: 401 })
    }

    if (session.loginTime) {
      const sessionAge = now - session.loginTime
      if (sessionAge > 86400000) {
        return NextResponse.json({ 
          error: 'Session expired',
          expired: true
        }, { status: 401 })
      }
    }

    const remainingTime = session.expiresAt ? session.expiresAt - now : null
    
    return NextResponse.json({
      id: session.id,
      username: session.username,
      role: session.role,
      remainingTime: remainingTime
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
