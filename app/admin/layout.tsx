import { getSession } from '@/lib/auth'
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
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
