'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password
        }),
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Login successful, redirect to admin
        router.push('/admin')
        router.refresh()
      } else {
        // Show error message
        setError(data.error || 'Login gagal. Silakan coba lagi.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Terjadi kesalahan koneksi. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced 3D Islamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a0f] via-[#2d5016] via-[#3d6b1f] to-[#1a3a0f]">
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#f4d03f]/20 to-transparent rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-white/10 to-transparent rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Enhanced Islamic Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="35" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="60" cy="60" r="25" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="60" cy="60" r="15" fill="none" stroke="white" strokeWidth="1"/>
                <path d="M 60 25 L 60 95 M 25 60 L 95 60" stroke="white" strokeWidth="1.5"/>
                <path d="M 38 38 L 82 82 M 82 38 L 38 82" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
          </svg>
        </div>

        {/* Enhanced Mosque Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.15]">
          <svg viewBox="0 0 1200 320" className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mosque-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="white" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M0,220 Q150,170 300,220 T600,220 T900,220 T1200,220 L1200,320 L0,320 Z" fill="url(#mosque-gradient)"/>
            <circle cx="600" cy="160" r="45" fill="white" opacity="0.3"/>
            <rect x="575" y="160" width="50" height="160" fill="white" opacity="0.3"/>
            <path d="M600,110 L625,140 L575,140 Z" fill="white" opacity="0.4"/>
            <circle cx="400" cy="180" r="30" fill="white" opacity="0.2"/>
            <rect x="385" y="180" width="30" height="140" fill="white" opacity="0.2"/>
            <circle cx="800" cy="180" r="30" fill="white" opacity="0.2"/>
            <rect x="785" y="180" width="30" height="140" fill="white" opacity="0.2"/>
          </svg>
        </div>

        {/* Floating Stars/Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-[#d4af37]/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute top-[40%] right-[15%] w-2 h-2 bg-[#f4d03f]/40 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
          <div className="absolute top-[80%] left-[25%] w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-[15%] right-[30%] w-1 h-1 bg-[#d4af37]/45 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Back to Home Button - Enhanced Layout */}
      <Link 
        href="/"
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 inline-flex items-center gap-2 text-white bg-white/15 hover:bg-white/25 backdrop-blur-lg px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40 hover:scale-105 text-sm md:text-base"
      >
        <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-md md:rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all">
          <svg className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="hidden sm:inline">Kembali ke Beranda</span>
        <span className="sm:hidden">Beranda</span>
      </Link>

      {/* Main Login Container - Split Layout */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* LEFT SIDE - Logo & Branding */}
            <div className="relative bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#1a3a0f] p-12 flex flex-col items-center justify-center text-white overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="logo-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1.5"/>
                      <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1"/>
                      <path d="M 50 20 L 50 80 M 20 50 L 80 50" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#logo-pattern)"/>
                </svg>
              </div>

              {/* Gradient Orbs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4af37]/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#f4d03f]/20 rounded-full filter blur-3xl"></div>

              {/* Content */}
              <div className="relative z-10 text-center space-y-8">
                {/* Logo */}
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <div className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl p-6 ring-4 ring-white/30">
                    <Image
                      src="/images/LogoAnnajmRabbaniFix-01.png"
                      alt="SDIT ANNAJM RABBANI Logo"
                      width={120}
                      height={120}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold drop-shadow-lg">Admin Portal</h1>
                  <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full shadow-lg">
                    <p className="text-[#1a3a0f] text-xl font-bold">SDIT ANNAJM RABBANI</p>
                  </div>
                  <p className="text-white/90 text-base font-medium max-w-md mx-auto leading-relaxed">
                    Sistem Informasi Manajemen Sekolah
                  </p>
                </div>

                {/* Decorative Quote */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <div className="flex items-center justify-center gap-3 text-white/80">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p className="text-sm font-semibold italic">Mengelola Pendidikan dengan Teknologi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="relative p-8 md:p-12 flex flex-col justify-center">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#d4af37]/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3d6b1f]/10 to-transparent rounded-tr-full"></div>
              
              <div className="relative z-10 max-w-md mx-auto w-full">
                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang</h2>
                  <p className="text-gray-600">Silakan masuk ke akun admin Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Field */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span>Username</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-gray-50 focus:bg-white shadow-sm hover:border-gray-300"
                      placeholder="Masukkan username"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span>Password</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full px-4 py-3.5 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-gray-50 focus:bg-white shadow-sm hover:border-gray-300"
                        placeholder="Masukkan password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2d5016] transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 text-sm font-semibold">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] hover:from-[#3d6b1f] hover:to-[#2d5016] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Masuk ke Dashboard</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-xl border-2 border-blue-200/50">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-bold mb-2">Demo Credentials:</p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">👤</span>
                          <span className="font-bold text-[#2d5016]">admin</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">🔑</span>
                          <span className="font-bold text-[#2d5016]">admin123</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/10 rounded-full animate-pulse hidden xl:block"></div>
      <div className="absolute top-20 right-20 w-16 h-16 border-4 border-[#d4af37]/20 rounded-full animate-pulse hidden xl:block" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 border-4 border-[#f4d03f]/20 rounded-full animate-pulse hidden xl:block" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 border-4 border-white/10 rounded-full animate-pulse hidden xl:block" style={{ animationDelay: '1.5s' }}></div>
    </div>
  )
}
