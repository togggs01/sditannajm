'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from './AdminLayoutClient'
import Image from 'next/image'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  const menuItems = [
    { 
      href: '/admin', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Dashboard',
      badge: null
    },
    { 
      href: '/admin/guru', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      label: 'Guru & Staff',
      badge: null
    },
    { 
      href: '/admin/berita', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      label: 'Berita',
      badge: null
    },
    { 
      href: '/admin/galeri', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Galeri',
      badge: null
    },
    { 
      href: '/admin/ppdb', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Kelola PPDB',
      badge: null
    },
    { 
      href: '/admin/gelombang-ppdb', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Gelombang PPDB',
      badge: null
    },
  ]

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-[#1a3a0f] via-[#2d5016] to-[#1a3a0f] min-h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl rounded-br-3xl overflow-hidden`}>
      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#d4af37]/10 to-transparent pointer-events-none"></div>
      
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/Logo Annajm Rabbani Fix-01.png"
              alt="Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white truncate">Admin Panel</h2>
              <p className="text-[10px] text-[#d4af37] truncate">SDIT ANNAJM RABBANI</p>
            </div>
          )}
        </div>
      </div>



      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-2.5 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] shadow-lg'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className={`flex-shrink-0 ${isActive ? 'text-[#1a3a0f]' : 'text-white/70 group-hover:text-white'}`}>
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-semibold text-[13px]">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#d4af37]"></div>
                </div>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#d4af37] to-[#f4d03f] rounded-r-full shadow-lg"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1.5 mt-auto">
        <Link
          href="/"
          className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          {!isCollapsed && <span className="flex-1 font-semibold text-[13px]">Lihat Website</span>}
          
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#1a3a0f] text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              Lihat Website
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#d4af37]"></div>
            </div>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className={`group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span className="flex-1 font-semibold text-[13px]">Logout</span>}
          
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              Logout
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-red-500"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
