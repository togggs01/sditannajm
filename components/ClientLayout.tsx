'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted
    setMounted(true)
    
    // Show loading screen for 6 seconds total
    // Progress bar reaches 100% at 5 seconds, then holds for 1 more second
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 800) // Wait for fade out animation
    }, 6000) // Total 6 seconds (5s progress + 1s hold at 100%)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#2d5016]">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <>
      {isLoading && (
        <div className={`transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <LoadingScreen />
        </div>
      )}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  )
}
