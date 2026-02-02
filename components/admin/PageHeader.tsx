'use client'

import { useSidebar } from '@/components/AdminLayoutClient'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export default function PageHeader({ title, description, icon, action }: PageHeaderProps) {
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-[#2d5016] via-[#3d6b1f] to-[#2d5016] px-6 py-8 mb-6 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Toggle Sidebar Button - Desktop Only */}
          <div className="hidden lg:block relative group/toggle">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all hover:scale-105 border border-white/20 relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] opacity-0 group-hover/toggle:opacity-20 transition-opacity"></div>
              
              <svg 
                className={`w-6 h-6 text-white transition-transform duration-300 relative z-10 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Tooltip */}
            <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-white text-[#2d5016] text-xs font-semibold rounded-lg opacity-0 group-hover/toggle:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-50">
              {isCollapsed ? 'Perbesar Sidebar' : 'Perkecil Sidebar'}
              <div className="absolute bottom-full left-6 border-4 border-transparent border-b-white"></div>
            </div>
          </div>

          {icon && (
            <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center text-[#1a3a0f] shadow-xl flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{title}</h1>
            {description && (
              <p className="text-sm text-white/80 mt-1 truncate">{description}</p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
