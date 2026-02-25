import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Role permissions mapping
const ROLE_PERMISSIONS: Record<string, string[]> = {
  'super_admin': ['dashboard', 'guru', 'berita', 'galeri', 'ppdb', 'gelombang-ppdb'],
  'berita_galeri_admin': ['dashboard', 'berita', 'galeri'],
  'ppdb_admin': ['dashboard', 'ppdb', 'gelombang-ppdb']
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only check admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('session')
    
    // If no session, redirect to login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const session = JSON.parse(sessionCookie.value)
      const userRole = session.role

      // Allow dashboard for all authenticated users
      if (pathname === '/admin') {
        return NextResponse.next()
      }

      // Extract page name from pathname
      const pageName = pathname.split('/admin/')[1]?.split('/')[0]
      
      if (pageName) {
        const permissions = ROLE_PERMISSIONS[userRole] || []
        
        // Check if user has permission to access this page
        if (!permissions.includes(pageName)) {
          // Redirect to dashboard if no permission
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      }
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
