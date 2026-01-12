'use client'

interface WaveOrnamentsProps {
  variant?: 'subtle-top' | 'subtle-bottom' | 'corner-accent' | 'side-flow'
  colors?: 'green' | 'gold' | 'blue' | 'purple' | 'gradient'
  className?: string
}

export default function WaveOrnaments({ 
  variant = 'subtle-top', 
  colors = 'green',
  className = ''
}: WaveOrnamentsProps) {
  const getColors = () => {
    switch (colors) {
      case 'green':
        return {
          primary: '#2d5016',
          secondary: '#3d6b1f',
          accent: '#4a7c2a'
        }
      case 'gold':
        return {
          primary: '#d4af37',
          secondary: '#f4d03f',
          accent: '#f7e98e'
        }
      case 'blue':
        return {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#60a5fa'
        }
      case 'purple':
        return {
          primary: '#7c3aed',
          secondary: '#a855f7',
          accent: '#c084fc'
        }
      case 'gradient':
        return {
          primary: '#2d5016',
          secondary: '#d4af37',
          accent: '#f4d03f'
        }
      default:
        return {
          primary: '#2d5016',
          secondary: '#3d6b1f',
          accent: '#4a7c2a'
        }
    }
  }

  const colorScheme = getColors()

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Subtle Top Wave */}
      {variant === 'subtle-top' && (
        <div className="absolute top-0 left-0 right-0 h-24">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 C300,20 600,100 900,40 C1050,10 1150,80 1200,50 L1200,0 L0,0 Z"
              fill={colorScheme.primary}
              opacity="0.03"
            />
            <path
              d="M0,80 C200,40 400,120 600,60 C800,20 1000,100 1200,70 L1200,0 L0,0 Z"
              fill={colorScheme.secondary}
              opacity="0.02"
            />
          </svg>
        </div>
      )}

      {/* Subtle Bottom Wave */}
      {variant === 'subtle-bottom' && (
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 C300,100 600,20 900,80 C1050,110 1150,40 1200,70 L1200,120 L0,120 Z"
              fill={colorScheme.primary}
              opacity="0.03"
            />
            <path
              d="M0,40 C200,80 400,0 600,60 C800,100 1000,20 1200,50 L1200,120 L0,120 Z"
              fill={colorScheme.secondary}
              opacity="0.02"
            />
          </svg>
        </div>
      )}

      {/* Corner Accent */}
      {variant === 'corner-accent' && (
        <>
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
              <path
                d="M0,0 C50,80 80,50 200,0 L200,100 C120,80 80,120 0,100 Z"
                fill={colorScheme.primary}
                opacity="0.04"
              />
            </svg>
          </div>
          
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
              <path
                d="M200,200 C150,120 120,150 0,200 L0,100 C80,120 120,80 200,100 Z"
                fill={colorScheme.accent}
                opacity="0.04"
              />
            </svg>
          </div>
        </>
      )}

      {/* Side Flow */}
      {variant === 'side-flow' && (
        <>
          {/* Left Side */}
          <div className="absolute left-0 top-1/4 w-32 h-1/2">
            <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="none">
              <path
                d="M0,200 C30,100 70,300 100,150 C70,50 30,350 0,250"
                stroke={colorScheme.primary}
                strokeWidth="2"
                fill="none"
                opacity="0.06"
              />
              <path
                d="M0,180 C40,80 60,280 100,130 C60,30 40,330 0,230"
                stroke={colorScheme.secondary}
                strokeWidth="1.5"
                fill="none"
                opacity="0.04"
              />
            </svg>
          </div>
          
          {/* Right Side */}
          <div className="absolute right-0 top-1/4 w-32 h-1/2">
            <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="none">
              <path
                d="M100,200 C70,100 30,300 0,150 C30,50 70,350 100,250"
                stroke={colorScheme.accent}
                strokeWidth="2"
                fill="none"
                opacity="0.06"
              />
              <path
                d="M100,180 C60,80 40,280 0,130 C40,30 60,330 100,230"
                stroke={colorScheme.primary}
                strokeWidth="1.5"
                fill="none"
                opacity="0.04"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

// Komponen yang lebih rapi dan terorganisir
export function SubtleTopWave({ colors = 'green' }: { colors?: 'green' | 'gold' | 'blue' | 'purple' | 'gradient' }) {
  return (
    <WaveOrnaments 
      variant="subtle-top" 
      colors={colors} 
      className="z-0"
    />
  )
}

export function SubtleBottomWave({ colors = 'green' }: { colors?: 'green' | 'gold' | 'blue' | 'purple' | 'gradient' }) {
  return (
    <WaveOrnaments 
      variant="subtle-bottom" 
      colors={colors} 
      className="z-0"
    />
  )
}

export function CornerAccent({ colors = 'green' }: { colors?: 'green' | 'gold' | 'blue' | 'purple' | 'gradient' }) {
  return (
    <WaveOrnaments 
      variant="corner-accent" 
      colors={colors} 
      className="z-0"
    />
  )
}

export function SideFlow({ colors = 'green' }: { colors?: 'green' | 'gold' | 'blue' | 'purple' | 'gradient' }) {
  return (
    <WaveOrnaments 
      variant="side-flow" 
      colors={colors} 
      className="z-0"
    />
  )
}