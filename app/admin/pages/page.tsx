'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/auth/AuthContext'
import { 
  Eye, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  Copy, 
  BarChart3, 
  Users, 
  Briefcase, 
  Globe,
  TrendingUp,
  Shield,
  FileText,
  MessageSquare,
  Phone,
  HelpCircle,
  Star,
  DollarSign,
  Lock,
  BookOpen,
  Award
} from 'lucide-react'

interface PageConfig {
  id: string
  name: string
  path: string
  category: 'landing' | 'auth' | 'dashboard' | 'legal' | 'marketing' | 'support'
  active: boolean
  views: number
  conversions: number
  lastUpdated: string
  url: string
}

const getPageIcon = (path: string) => {
  switch (path) {
    case '/about': return Users
    case '/auth/login': return Shield
    case '/auth/signup': return Shield
    case '/auth/forgot-password': return Shield
    case '/auth/verify-email': return Shield
    case '/blog': return FileText
    case '/careers': return Briefcase
    case '/contact': return Phone
    case '/faq': return HelpCircle
    case '/features': return Star
    case '/how-it-works': return Settings
    case '/press': return FileText
    case '/pricing': return DollarSign
    case '/privacy': return Lock
    case '/resources': return BookOpen
    case '/security': return Shield
    case '/support': return HelpCircle
    case '/terms': return FileText
    case '/testimonials': return Award
    case '/landing': return Globe
    default: return Globe
  }
}

export default function AdminPagesPanel() {
  const { user } = useAuth()
  const [configs, setConfigs] = useState<PageConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/'
      return
    }
    fetchConfigs()
  }, [user])

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/admin/pages/configs')
      if (response.ok) {
        const data = await response.json()
        setConfigs(data)
      }
    } catch (error) {
      console.error('Error fetching configs:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleConfig = async (id: string) => {
    try {
      const response = await fetch('/api/admin/pages/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      if (response.ok) {
        fetchConfigs() // Refresh the list
      }
    } catch (error) {
      console.error('Error toggling config:', error)
    }
  }

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      // Could add toast notification here
    } catch (error) {
      console.error('Error copying URL:', error)
    }
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Access Denied</h1>
          <p className="text-text-secondary">Admin access required.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  const filteredConfigs = filter === 'all' 
    ? configs 
    : configs.filter(config => config.category === filter)

  const categories = ['all', 'landing', 'auth', 'dashboard', 'legal', 'marketing', 'support']

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Site Pages Admin</h1>
          <p className="text-text-secondary">Manage all site pages, toggle visibility, and view analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Pages</p>
                <p className="text-2xl font-bold text-text-primary">{configs.length}</p>
              </div>
              <Globe className="w-8 h-8 text-brand-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Active Pages</p>
                <p className="text-2xl font-bold text-text-primary">
                  {configs.filter(config => config.active).length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-brand-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Views</p>
                <p className="text-2xl font-bold text-text-primary">
                  {configs.reduce((sum, config) => sum + config.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-brand-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Avg Conversion Rate</p>
                <p className="text-2xl font-bold text-text-primary">
                  {configs.length > 0 ? 
                    ((configs.reduce((sum, config) => sum + config.conversions, 0) / configs.reduce((sum, config) => sum + config.views, 0)) * 100).toFixed(1) + '%'
                    : '0%'
                  }
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-brand-purple-600" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-1 inline-flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  filter === category
                    ? 'bg-brand-indigo-100 text-brand-indigo-700'
                    : 'text-text-secondary hover:text-text-primary hover:bg-neutral-50'
                }`}
              >
                {category === 'all' ? 'All Pages' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredConfigs.map((config) => {
            const IconComponent = getPageIcon(config.path)
            return (
              <div key={config.id} className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      config.active ? 'bg-brand-indigo-100' : 'bg-neutral-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        config.active ? 'text-brand-indigo-600' : 'text-text-secondary'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{config.name}</h3>
                      <p className="text-sm text-text-secondary">{config.path}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    config.category === 'landing' ? 'bg-brand-purple-100 text-brand-purple-700' :
                    config.category === 'auth' ? 'bg-brand-orange-100 text-brand-orange-700' :
                    config.category === 'dashboard' ? 'bg-brand-blue-100 text-brand-blue-700' :
                    config.category === 'legal' ? 'bg-neutral-100 text-text-secondary' :
                    config.category === 'marketing' ? 'bg-brand-green-100 text-brand-green-700' :
                    'bg-brand-yellow-100 text-brand-yellow-700'
                  }`}>
                    {config.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{config.views.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{config.conversions}</p>
                    <p className="text-xs text-text-secondary">Conversions</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      config.active 
                        ? 'bg-brand-green-100 text-brand-green-700' 
                        : 'bg-neutral-100 text-text-secondary'
                    }`}>
                      {config.active ? 'Live' : 'Hidden'}
                    </span>
                    <span className="text-xs text-text-secondary">Updated {config.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyUrl(config.url)}
                      className="p-2 rounded-md hover:bg-neutral-100 text-text-secondary hover:text-brand-indigo-600 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleConfig(config.id)}
                      className={`p-2 rounded-md transition-colors ${
                        config.active 
                          ? 'hover:bg-brand-green-50 text-brand-green-600 hover:text-brand-green-700' 
                          : 'hover:bg-neutral-100 text-text-secondary hover:text-brand-indigo-600'
                      }`}
                      title={config.active ? 'Hide Page' : 'Show Page'}
                    >
                      {config.active ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}