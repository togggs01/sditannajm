'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import SchoolLogo from './SchoolLogo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          </div>

          {/* Mobile: Only PPDB */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link 
              href="/ppdb" 
              className="bg-gradient-to-r from-[#0B6623] to-[#0B6623]/90 text-[#39F914] px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
            >
              PPDB
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}