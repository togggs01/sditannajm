import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    
    if (session.loginTime) {
      const now = Date.now()
      const sessionAge = now - session.loginTime
      const maxAge = 86400000 // 24 hours
      
      if (sessionAge > maxAge) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 })
      }
    }

    return NextResponse.json(session)
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
