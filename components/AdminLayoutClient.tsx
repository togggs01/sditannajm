'use client'

import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader from '@/components/AdminHeader'
import AdminBottomNav from '@/components/AdminBottomNav'
import SessionChecker from '@/components/SessionChecker'
import { useState, createContext, useContext } from 'react'

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

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <SessionChecker />
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
      </div>
    </SidebarContext.Provider>
  )
}
