'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/auth/AuthContext'
import {
  Home,
  MessageSquare,
  FileText,
  Users,
  Search,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  User,
  Sparkles,
  Menu,
  X,
  FolderOpen
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  onShowTutorial?: () => void
}

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Ask AI', href: '/dashboard/ask', icon: Sparkles },
  { name: 'Cases', href: '/dashboard/cases', icon: FolderOpen },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Lawyers', href: '/dashboard/lawyers', icon: Users },
  { name: 'Search', href: '/dashboard/search', icon: Search },
  { name: 'Favorites', href: '/dashboard/favorites', icon: Star },
]

const secondaryNavigation = [
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Security', href: '/dashboard/security', icon: Shield },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
]

export default function DashboardLayout({ children, onShowTutorial }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const NavLink = ({ item, collapsed }: { item: typeof navigation[0], collapsed: boolean }) => {
    const active = isActive(item.href)
    return (
      <Link
        href={item.href}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
          ${active 
            ? 'bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] text-white shadow-sm' 
            : 'text-[#5B6BA8] hover:bg-[#E8ECF8] hover:text-[#394C9A]'
          }
          ${collapsed ? 'justify-center' : ''}
        `}
        title={collapsed ? item.name : undefined}
      >
        <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-[#5B6BA8]'}`} />
        {!collapsed && (
          <span className="font-medium text-sm">{item.name}</span>
        )}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D4DAF0] px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#394C9A] hover:bg-[#E8ECF8] rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mobileLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#818cf8', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#4338ca', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="110" rx="50" ry="55" fill="url(#mobileLogoGrad)"/>
              <circle cx="100" cy="55" r="40" fill="url(#mobileLogoGrad)"/>
              <ellipse cx="70" cy="45" rx="22" ry="32" fill="url(#mobileLogoGrad)" opacity="0.95"/>
              <ellipse cx="130" cy="45" rx="22" ry="32" fill="url(#mobileLogoGrad)" opacity="0.95"/>
              <circle cx="135" cy="85" r="8" fill="white"/>
              <path d="M155 130 Q175 125 170 145" stroke="url(#mobileLogoGrad)" strokeWidth="12" fill="none" strokeLinecap="round"/>
            </svg>
            <span className="text-lg font-semibold text-[#0f172a]">ellio</span>
          </Link>

          <Link href="/dashboard/notifications" className="relative p-2 text-[#334155] hover:bg-[#f1f5f9] rounded-lg">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full" />
          </Link>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-[#e2e8f0]">
              <Link href="/dashboard" className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="mobileSidebarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#818cf8', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#4338ca', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <ellipse cx="100" cy="110" rx="50" ry="55" fill="url(#mobileSidebarGrad)"/>
                  <circle cx="100" cy="55" r="40" fill="url(#mobileSidebarGrad)"/>
                  <ellipse cx="70" cy="45" rx="22" ry="32" fill="url(#mobileSidebarGrad)" opacity="0.95"/>
                  <ellipse cx="130" cy="45" rx="22" ry="32" fill="url(#mobileSidebarGrad)" opacity="0.95"/>
                  <circle cx="135" cy="85" r="8" fill="white"/>
                  <path d="M155 130 Q175 125 170 145" stroke="url(#mobileSidebarGrad)" strokeWidth="12" fill="none" strokeLinecap="round"/>
                </svg>
                <span className="text-lg font-semibold text-[#0f172a]">ellio</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#334155] hover:bg-[#f1f5f9] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="p-4 space-y-1">
              {navigation.map((item) => (
                <NavLink key={item.name} item={item} collapsed={false} />
              ))}
              
              <div className="my-4 border-t border-[#e2e8f0]" />
              
              {secondaryNavigation.map((item) => (
                <NavLink key={item.name} item={item} collapsed={false} />
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e2e8f0] bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#38bdf8] flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0f172a] truncate">{user?.name}</p>
                  <p className="text-xs text-[#64748b] truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[#64748b] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside 
        className={`
          hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50
          bg-white border-r border-[#D4DAF0] transition-all duration-300
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-[#D4DAF0] ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          <Link href="/dashboard" className="flex items-center gap-2">
            <img 
              src="https://ellio.solutions/logo.png" 
              alt="ellio" 
              className="w-9 h-9 rounded-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect fill="%23394C9A" width="40" height="40" rx="8"/><text x="50%" y="50%" fill="white" font-family="Arial" font-size="20" text-anchor="middle" dy=".35em">e</text></svg>';
              }}
            />
            {!sidebarCollapsed && (
              <span className="text-xl font-['Quicksand'] font-semibold text-[#394C9A]">ellio</span>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="p-1.5 text-[#5B6BA8] hover:text-[#394C9A] hover:bg-[#E8ECF8] rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Collapse button when collapsed */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="mx-auto mt-4 p-1.5 text-[#5B6BA8] hover:text-[#394C9A] hover:bg-[#E8ECF8] rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto py-4 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>

          <div className={`my-4 border-t border-[#D4DAF0] ${sidebarCollapsed ? 'mx-2' : ''}`} />

          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <NavLink key={item.name} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>
        </nav>

        {/* Help & User section */}
        <div className={`border-t border-[#D4DAF0] ${sidebarCollapsed ? 'p-2' : 'p-3'}`}>
          {/* Help button */}
          <button
            onClick={onShowTutorial}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg
              text-[#5B6BA8] hover:bg-[#E8ECF8] hover:text-[#394C9A] transition-colors
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? 'Help & Tutorial' : undefined}
          >
            <HelpCircle className="w-5 h-5 text-[#5B6BA8]" />
            {!sidebarCollapsed && <span className="font-medium text-sm">Help & Tutorial</span>}
          </button>

          {/* User profile */}
          <div className={`flex items-center gap-3 px-3 py-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#394C9A] to-[#A8D4E6] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#394C9A] truncate">{user?.name}</p>
                <p className="text-xs text-[#5B6BA8] truncate">{user?.email}</p>
              </div>
            )}
          </div>

          {/* Sign out */}
          <button
            onClick={logout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg
              text-[#5B6BA8] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? 'Sign out' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium text-sm">Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main 
        className={`
          min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        {children}
      </main>
    </div>
  )
}
