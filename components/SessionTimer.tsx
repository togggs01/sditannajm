'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SessionTimer() {
  const router = useRouter()
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check session every minute
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
          cache: 'no-store'
        })

        // If response is not JSON, skip
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          console.warn('SessionTimer: Non-JSON response received')
          return
        }

        const data = await res.json()

        if (res.status === 401) {
          // Session expired, redirect to login
          router.push('/login?expired=true')
          return
        }

        if (data.remainingTime) {
          setRemainingTime(data.remainingTime)
          
          // Show warning if less than 1 hour remaining
          if (data.remainingTime < 3600000) { // 1 hour in ms
            setShowWarning(true)
          }
        }
      } catch (error) {
        console.error('Session check error:', error)
        // Don't redirect on error, just log it
      }
    }

    // Check immediately
    checkSession()

    // Then check every minute
    const interval = setInterval(checkSession, 60000)

    return () => clearInterval(interval)
  }, [router])

  if (!remainingTime) return null

  const hours = Math.floor(remainingTime / (60 * 60 * 1000))
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000))

  if (!showWarning) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-800">
              Sesi akan berakhir
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              {hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`} lagi
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              Simpan pekerjaan Anda sebelum sesi berakhir
            </p>
          </div>
          <button
            onClick={() => setShowWarning(false)}
            className="ml-2 text-yellow-500 hover:text-yellow-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
