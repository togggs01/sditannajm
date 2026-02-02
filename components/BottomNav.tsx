'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Beranda'
    },
    {
      href: '/tentang',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Tentang'
    },
    {
      href: '/guru',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      label: 'Guru'
    },
    {
      href: '/galeri',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Galeri'
    },
    {
      href: '/berita',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      label: 'Berita'
    },
    {
      href: '/kontak',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Kontak'
    }
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 ease-in-out group ${
                isActive
                  ? 'text-[#2d5016]'
                  : 'text-gray-600'
              }`}
            >
              {/* Background hover effect */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-t from-green-100 to-green-50 scale-100' 
                  : 'bg-gradient-to-t from-green-50 to-transparent scale-0 group-hover:scale-100 group-active:scale-95'
              }`} />
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#2d5016] rounded-b-full" />
              )}
              
              {/* Icon with animation */}
              <div className={`relative z-10 transition-all duration-300 ${
                isActive 
                  ? 'scale-110 text-[#2d5016]' 
                  : 'group-hover:scale-110 group-hover:text-[#2d5016] group-active:scale-95'
              }`}>
                {item.icon}
              </div>
              
              {/* Label with animation */}
              <span className={`relative z-10 text-[10px] mt-0.5 transition-all duration-300 ${
                isActive 
                  ? 'font-bold text-[#2d5016] scale-105' 
                  : 'font-medium group-hover:font-semibold group-hover:text-[#2d5016] group-hover:scale-105'
              }`}>
                {item.label}
              </span>
              
              {/* Ripple effect on tap */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#2d5016] opacity-0 group-active:opacity-10 transition-opacity duration-150" />
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
