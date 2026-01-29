'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import LandingGeneral from '@/components/landing/LandingGeneral'
import LandingLawyers from '@/components/landing/LandingLawyers'
import LandingUsers from '@/components/landing/LandingUsers'

interface LandingConfig {
  active: boolean
  content?: any
  [key: string]: any
}

function DynamicLandingContent() {
  const searchParams = useSearchParams()
  const [landingConfig, setLandingConfig] = useState<LandingConfig | null>(null)
  const [loading, setLoading] = useState(true)

  const version = searchParams.get('v') || 'general'
  const variant = searchParams.get('variant') || 'a'

  useEffect(() => {
    fetchLandingConfig()
  }, [version, variant])

  const fetchLandingConfig = async () => {
    try {
      const response = await fetch(`/api/landing/config?v=${version}&variant=${variant}`)
      if (response.ok) {
        const config = await response.json()
        setLandingConfig(config)
      }
    } catch (error) {
      console.error('Error fetching landing config:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  if (!landingConfig || !landingConfig.active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Page Not Available</h1>
          <p className="text-text-secondary">This landing page is currently not active.</p>
        </div>
      </div>
    )
  }

  const renderLandingPage = () => {
    switch (version) {
      case 'lawyers':
        return <LandingLawyers config={landingConfig} />
      case 'users':
        return <LandingUsers config={landingConfig} />
      default:
        return <LandingGeneral config={landingConfig} />
    }
  }

  return renderLandingPage()
}

export default function DynamicLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    }>
      <DynamicLandingContent />
    </Suspense>
  )
}