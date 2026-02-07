'use client'

import { useRouter } from 'next/navigation'
import SchoolLogo from './SchoolLogo'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <SchoolLogo size="md" showText={false} />
          <div>
            <h1 className="text-base font-bold">Admin Panel</h1>
            <p className="text-[10px] text-[#f4d03f]">SDIT ANNAJM RABBANI</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Home Button */}
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Ke Website"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-600/20 rounded-lg transition"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
