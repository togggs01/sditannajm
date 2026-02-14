'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show loading screen for 6 seconds total
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 z-50 transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <LoadingScreen />
        </div>
      )}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  )
}
