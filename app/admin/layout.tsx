'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayoutClient from '@/components/AdminLayoutClient'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check session on client side
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
          cache: 'no-store'
        })

        if (!res.ok) {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
