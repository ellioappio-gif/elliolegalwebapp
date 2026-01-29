'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { useAuth } from '../auth/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import SetupWizard from '@/components/dashboard/SetupWizard'
import TutorialOverlay from '@/components/dashboard/TutorialOverlay'
import {
  Sparkles,
  FileText,
  MessageSquare,
  Users,
  Search,
  Clock,
  ArrowRight,
  Star,
  Zap,
  Shield,
  BarChart3,
  Plus,
  ChevronRight
} from 'lucide-react'

function DashboardContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [showSetupWizard, setShowSetupWizard] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [greeting, setGreeting] = useState('Welcome back')

  // Check if first-time user
  useEffect(() => {
    const setupComplete = localStorage.getItem('ellio_setup_complete')
    if (!setupComplete) {
      setShowSetupWizard(true)
    }
  }, [])

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Good morning')
    } else if (hour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }
  }, [])

  const quickActions = [
    {
      title: 'Ask a question',
      description: 'Get instant answers to legal questions',
      icon: Sparkles,
      href: '/dashboard/ask',
      iconColor: '#394C9A',
      bgColor: 'bg-[#394C9A]/10',
    },
    {
      title: 'Start a chat',
      description: 'Have a conversation with AI',
      icon: MessageSquare,
      href: '/dashboard/chat',
      iconColor: '#5B6BA8',
      bgColor: 'bg-[#5B6BA8]/10',
    },
    {
      title: 'Upload document',
      description: 'Analyze contracts and agreements',
      icon: FileText,
      href: '/dashboard/documents',
      iconColor: '#10b981',
      bgColor: 'bg-[#10b981]/10',
    },
    {
      title: 'Find a lawyer',
      description: 'Connect with legal professionals',
      icon: Users,
      href: '/dashboard/lawyers',
      iconColor: '#A8D4E6',
      bgColor: 'bg-[#A8D4E6]/20',
    },
  ]

  const stats = [
    { label: 'Questions asked', value: '0', change: '+0%', icon: MessageSquare },
    { label: 'Documents analyzed', value: '0', change: '+0%', icon: FileText },
    { label: 'Chats this month', value: '0', change: '+0%', icon: BarChart3 },
  ]

  const recentActivity: any[] = []

  return (
    <DashboardLayout onShowTutorial={() => setShowTutorial(true)}>
      {/* Setup Wizard */}
      {showSetupWizard && (
        <SetupWizard
          onComplete={() => setShowSetupWizard(false)}
          onSkip={() => setShowSetupWizard(false)}
        />
      )}

      {/* Tutorial Overlay */}
      <TutorialOverlay 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-['Quicksand'] text-2xl lg:text-3xl font-semibold text-[#394C9A]">
                {greeting}, {user?.name?.split(' ')[0]}
              </h1>
              <p className="text-[#5B6BA8] mt-1">Here's what's happening with your legal matters</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTutorial(true)}
                className="px-4 py-2.5 text-[#5B6BA8] hover:text-[#394C9A] hover:bg-[#E8ECF8] rounded-lg font-medium text-sm transition-colors"
              >
                View tutorial
              </button>
              <Link
                href="/dashboard/ask"
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg text-white rounded-lg font-medium text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                New question
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group relative bg-white rounded-xl border border-[#D4DAF0] p-5 hover:border-[#394C9A]/30 hover:shadow-lg transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${action.bgColor} flex items-center justify-center mb-4`}>
                <action.icon className="w-5 h-5" style={{ color: action.iconColor }} />
              </div>
              <h3 className="font-['Quicksand'] font-semibold text-[#394C9A] mb-1 group-hover:text-[#5B6BA8] transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-[#5B6BA8]">{action.description}</p>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4DAF0] group-hover:text-[#394C9A] group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-[#D4DAF0] p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8ECF8] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#5B6BA8]" />
                </div>
                <span className="text-xs font-medium text-[#10b981] bg-[#ecfdf5] px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-[#394C9A] mb-1">{stat.value}</p>
              <p className="text-sm text-[#5B6BA8]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#D4DAF0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Quicksand'] text-lg font-semibold text-[#394C9A]">Recent activity</h2>
              <Link href="/dashboard/search" className="text-sm font-medium text-[#394C9A] hover:text-[#5B6BA8] transition-colors">
                View all
              </Link>
            </div>

            {recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E8ECF8] flex items-center justify-center">
                  <Clock className="w-8 h-8 text-[#5B6BA8]" />
                </div>
                <h3 className="font-medium text-[#394C9A] mb-2">No activity yet</h3>
                <p className="text-sm text-[#5B6BA8] mb-4 max-w-sm mx-auto">
                  Start by asking a question or uploading a document. Your activity will appear here.
                </p>
                <Link
                  href="/dashboard/ask"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#394C9A] to-[#5B6BA8] hover:shadow-lg text-white rounded-lg font-medium text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Ask your first question
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Activity items would go here */}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-[#394C9A] to-[#5B6BA8] rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Upgrade to Pro</span>
              </div>
              <h3 className="font-['Quicksand'] text-lg font-semibold mb-2">Unlock unlimited features</h3>
              <p className="text-sm opacity-80 mb-4">
                Get unlimited questions, priority support, and advanced document analysis.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#394C9A] rounded-lg font-medium text-sm hover:bg-[#F5F7FC] transition-colors"
              >
                View plans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl border border-[#D4DAF0] p-6">
              <h3 className="font-['Quicksand'] font-semibold text-[#394C9A] mb-4">Quick tips</h3>
              <div className="space-y-4">
                {[
                  { icon: Star, tip: 'Save important answers to favorites for quick access' },
                  { icon: Shield, tip: 'Your data is encrypted and never shared with third parties' },
                  { icon: Sparkles, tip: 'Be specific in your questions for better answers' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E8ECF8] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-[#5B6BA8]" />
                    </div>
                    <p className="text-sm text-[#5B6BA8] leading-relaxed">{item.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Card */}
            <div className="bg-white rounded-xl border border-[#D4DAF0] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-5 h-5 text-[#5B6BA8]" />
                <h3 className="font-['Quicksand'] font-semibold text-[#394C9A]">Quick search</h3>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations, documents..."
                  className="w-full px-4 py-2.5 bg-[#F5F7FC] border border-[#D4DAF0] rounded-lg text-sm placeholder-[#5B6BA8] focus:outline-none focus:ring-2 focus:ring-[#394C9A] focus:border-[#394C9A] transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      router.push(`/dashboard/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`)
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 bg-white rounded-xl border border-[#D4DAF0] p-6">
          <h2 className="font-['Quicksand'] text-lg font-semibold text-[#394C9A] mb-6">Everything you need</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Sparkles, title: 'AI-powered answers', description: 'Get instant explanations in plain language' },
              { icon: FileText, title: 'Document analysis', description: 'Upload and understand any legal document' },
              { icon: Users, title: 'Lawyer network', description: 'Connect with qualified professionals' },
              { icon: Shield, title: 'Bank-level security', description: 'Your data is encrypted and protected' },
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-[#F5F7FC] rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#D4DAF0] flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#394C9A]" />
                </div>
                <h3 className="font-['Quicksand'] font-medium text-[#394C9A] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#5B6BA8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
