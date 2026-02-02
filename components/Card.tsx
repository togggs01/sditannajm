import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'luxury' | 'minimal'
}

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseClasses = 'bg-white transition-all duration-500 ease-out'
  
  const variantClasses = {
    default: 'rounded-xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 card-hover',
    luxury: 'rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-gray-200/50 backdrop-blur-sm bg-gradient-to-br from-white via-white to-gray-50/30 hover:from-white hover:via-gray-50/20 hover:to-white hover:scale-[1.02] hover:border-[#d4af37]/30',
    minimal: 'rounded-lg shadow-md hover:shadow-lg p-4 border border-gray-100'
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
