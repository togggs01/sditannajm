'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function SessionChecker() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only check on admin pages
    if (!pathname.startsWith('/admin')) return

    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
          cache: 'no-store'
        })
        
        // Check if response is JSON
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          console.warn('SessionChecker: Non-JSON response received')
          return
        }

        if (!res.ok) {
          // Session expired or invalid
          alert('Sesi Anda telah berakhir. Silakan login kembali.')
          router.push('/login')
        }
      } catch (error) {
        console.error('Session check error:', error)
        // Don't redirect on network errors
      }
    }

    // Check immediately
    checkSession()

    // Check every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [pathname, router])

  return null
}
