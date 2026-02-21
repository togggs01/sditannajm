'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SchoolLogo from './SchoolLogo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      setIsLoggedIn(res.ok)
    } catch {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkAuth()
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setIsLoggedIn(false)
    router.push('/')
    router.refresh()
  }

  return (
    // Variasi 2: Navbar hijau terang dengan shadow gelap
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#39F914] shadow-xl shadow-[#0B6623]/30 rounded-b-3xl' : 'bg-gradient-to-r from-[#39F914] to-[#39F914]/90 rounded-b-3xl'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <SchoolLogo size="xl" className="group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xl font-bold text-[#0B6623] text-shadow">SDIT ANNAJM RABBANI</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="text-[#0B6623] hover:bg-[#0B6623]/10 px-4 py-2 rounded-lg transition font-medium">Beranda</Link>
            <Link href="/tentang" className="text-[#0B6623] hover:bg-[#0B6623]/10 px-4 py-2 rounded-lg transition font-medium">Tentang</Link>
            <Link href="/guru" className="text-[#0B6623] hover:bg-[#0B6623]/10 px-4 py-2 rounded-lg transition font-medium">Guru</Link>
            <Link href="/galeri" className="text-[#0B6623] hover:bg-[#0B6623]/10 px-4 py-2 rounded-lg transition font-medium">Galeri</Link>
            <Link href="/berita" className="text-[#0B6623] hover:bg-[#0B6623]/10 px-4 py-2 rounded-lg transition font-medium">Berita</Link>
            <Link href="/kontak" className="text-[#0B6623] hover:bg-[#0B6623]/10 px-4 py-2 rounded-lg transition font-medium">Kontak</Link>
            <Link href="/ppdb" className="ml-2 bg-gradient-to-r from-[#0B6623] to-[#0B6623]/90 hover:from-[#0B6623]/90 hover:to-[#0B6623] text-[#39F914] px-6 py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              PPDB 2025
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link href="/admin" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">Logout</button>
              </>
            ) : null}
          </div>

          {/* Mobile: Only PPDB & Login */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link 
              href="/ppdb" 
              className="bg-gradient-to-r from-[#0B6623] to-[#0B6623]/90 text-[#39F914] px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
            >
              PPDB
            </Link>
            
            {isLoggedIn ? (
              <Link href="/admin" className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}