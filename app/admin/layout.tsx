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
    
    // Check if session expired
    if (session.loginTime) {
      const now = Date.now()
      const sessionAge = now - session.loginTime
      const maxAge = 24 * 60 * 60 * 1000
      
      if (sessionAge > maxAge) {
        redirect('/login')
      }
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>
  } catch (error) {
    console.error('Admin layout error:', error)
    redirect('/login')
  }
}
