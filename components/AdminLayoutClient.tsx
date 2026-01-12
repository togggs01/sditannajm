'use client'

import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader from '@/components/AdminHeader'
import AdminBottomNav from '@/components/AdminBottomNav'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { useState, createContext, useContext, useEffect } from 'react'

const SidebarContext = createContext({
  isCollapsed: false,
  setIsCollapsed: (value: boolean) => {}
})

export const useSidebar = () => useContext(SidebarContext)

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show WhatsApp button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Mobile Header */}
        <AdminHeader />

        {/* Main Content */}
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full lg:w-auto pt-16 pb-16 lg:pt-0 lg:pb-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 ${
            isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          }`}
        >
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <AdminBottomNav />

        {/* WhatsApp Floating Button - dengan posisi khusus untuk admin */}
        <div className="lg:hidden">
          {/* Mobile: posisi lebih tinggi agar tidak tertutup bottom nav */}
          <WhatsAppFloat className={`fixed bottom-20 right-6 z-[9999] transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`} />
        </div>
        <div className="hidden lg:block">
          {/* Desktop: posisi normal */}
          <WhatsAppFloat />
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
