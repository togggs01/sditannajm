'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface SchoolLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  showText?: boolean
  textColor?: string
}

const sizeMap = {
  sm: { container: 'w-10 h-10', emoji: 'text-xl', image: 40 },
  md: { container: 'w-12 h-12', emoji: 'text-2xl', image: 48 },
  lg: { container: 'w-14 h-14', emoji: 'text-3xl', image: 56 },
  xl: { container: 'w-16 h-16', emoji: 'text-4xl', image: 64 },
  '2xl': { container: 'w-20 h-20', emoji: 'text-5xl', image: 80 }
}

export default function SchoolLogo({ 
  size = 'md', 
  className = '',
  showText = false,
  textColor = 'text-white'
}: SchoolLogoProps) {
  const [hasLogo, setHasLogo] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Check if logo exists
    fetch('/images/Logo Annajm Rabbani Fix-01.png', { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setHasLogo(true)
        }
      })
      .catch(() => {
        setHasLogo(false)
      })
  }, [])

  const sizes = sizeMap[size]

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizes.container} rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden`}>
        {hasLogo && !imageError ? (
          <Image
            src="/images/Logo Annajm Rabbani Fix-01.png"
            alt="Logo SDIT ANNAJM RABBANI"
            width={sizes.image}
            height={sizes.image}
            className="object-contain p-1"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className={sizes.emoji}>🕌</span>
        )}
      </div>
      
      {showText && (
        <div>
          <h2 className={`text-xl font-bold ${textColor}`}>SDIT ANNAJM RABBANI</h2>
        </div>
      )}
    </div>
  )
}
