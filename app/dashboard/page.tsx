'use client'

import { ProtectedRoute } from '../auth/ProtectedRoute'
import { useAuth } from '../auth/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, FileText, Brain, MessageSquare, Settings, User } from 'lucide-react'

function DashboardContent() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#5B7EFF', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#1E3A8A', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="110" rx="45" ry="50" fill="url(#headerGrad)"/>
                <circle cx="100" cy="60" r="35" fill="url(#headerGrad)"/>
              </svg>
              <span className="text-xl font-bold text-gray-900">ellio legal</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <Link href="/dashboard/profile" className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition">
                  {user?.name}
                </Link>
                <p className="text-gray-600 text-xs">{user?.email}</p>
              </div>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-lg text-gray-600">Your AI-powered legal assistant is ready to help</p>
        </div>

        {/* Quick actions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FileText, title: 'New Question', description: 'Ask about contracts or legal matters', href: '/dashboard/ask' },
            { icon: Brain, title: 'Analyze Document', description: 'Upload and review documents', href: '/dashboard/documents' },
            { icon: MessageSquare, title: 'Chat with AI', description: 'Have a conversation', href: '/dashboard/chat' },
            { icon: User, title: 'Find Lawyer', description: 'Connect with a specialist', href: '/dashboard/lawyers' },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <action.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Features grid */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'AI Legal Analysis', description: 'Get instant analysis of legal documents' },
              { title: 'Contract Review', description: 'Understand contracts in plain language' },
              { title: 'Document Upload', description: 'Secure cloud storage for your documents' },
              { title: 'Lawyer Network', description: 'Connect with qualified legal professionals' },
              { title: 'Chat Support', description: '24/7 AI-powered legal assistant' },
              { title: 'Secure Storage', description: 'Bank-level encryption for privacy' },
            ].map((feature, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity / Quick stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Documents Analyzed', value: '0', icon: FileText },
            { label: 'Questions Asked', value: '0', icon: MessageSquare },
            { label: 'Connected Lawyers', value: '0', icon: User },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
