import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLayoutClient from '@/components/AdminLayoutClient'

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie?.value) {
      redirect('/login')
    }

    // Parse and validate session
    const session = JSON.parse(sessionCookie.value)
    const now = Date.now()
    
    // Check if session expired (24 hours)
    if (session.expiresAt && now > session.expiresAt) {
      // Session expired, clear cookie and redirect
      cookieStore.delete('session')
      redirect('/login?expired=true')
    }

    // Also check loginTime as fallback
    if (session.loginTime) {
      const sessionAge = now - session.loginTime
      const maxAge = 86400000 // 24 hours
      
      if (sessionAge > maxAge) {
        cookieStore.delete('session')
        redirect('/login?expired=true')
      }
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>
  } catch (error) {
    console.error('Admin layout error:', error)
    redirect('/login')
  }
}
