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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#3a6020] shadow-xl rounded-b-3xl' : 'bg-gradient-to-r from-[#3a6020] to-[#4a7c2a] rounded-b-3xl'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <SchoolLogo size="xl" className="group-hover:scale-110 transition-transform" />
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white text-shadow">SDIT ANNAJM RABBANI</span>
              </div>
              <div className="sm:hidden">
                <span className="text-lg font-bold text-white text-shadow">SDIT<br/>ANNAJM RABBANI</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition font-medium relative group">
              Beranda
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/tentang" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition font-medium relative group">
              Tentang
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/guru" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition font-medium relative group">
              Guru
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/galeri" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition font-medium relative group">
              Galeri
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/berita" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition font-medium relative group">
              Berita
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/kontak" className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition font-medium relative group">
              Kontak
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/ppdb" className="ml-2 bg-gradient-to-r from-[#e6c547] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#e6c547] text-[#2d5016] px-6 py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              PPDB 2025
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link href="/admin" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">Logout</button>
              </>
            ) : (
              <Link href="/login" className="ml-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition backdrop-blur-sm">Login</Link>
            )}
          </div>

          {/* Mobile: Only PPDB & Login */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link 
              href="/ppdb" 
              className="bg-gradient-to-r from-[#e6c547] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#e6c547] text-[#2d5016] px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              PPDB
            </Link>
            
            {isLoggedIn ? (
              <Link 
                href="/admin" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold text-sm backdrop-blur-sm border border-white/20 transition-all transform hover:scale-105 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
