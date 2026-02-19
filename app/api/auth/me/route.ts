import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = request.cookies.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse session data
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session expired (24 hours)
    if (session.loginTime) {
      const now = Date.now()
      const sessionAge = now - session.loginTime
      const maxAge = 24 * 60 * 60 * 1000
      
      if (sessionAge > maxAge) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 })
      }
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error('Get session error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
