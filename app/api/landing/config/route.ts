import { NextRequest, NextResponse } from 'next/server'

// Mock data structure - will be replaced with database
let landingConfigs = [
  {
    id: 'general-a',
    name: 'General Landing Page',
    version: 'general',
    variant: 'a',
    active: true,
    url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/landing?v=general&variant=a`,
    views: 1247,
    conversions: 89,
    lastUpdated: new Date().toISOString(),
    content: {
      hero: {
        title: 'Legal Help Made Simple',
        subtitle: 'Get instant answers to legal questions with AI-powered assistance and connect with qualified attorneys when you need them.',
        ctaText: 'Get Started Free',
        ctaUrl: '/auth/signup'
      },
      features: [
        {
          title: 'AI Legal Assistant',
          description: 'Get instant answers to legal questions in plain language',
          icon: 'sparkles'
        },
        {
          title: 'Expert Network',
          description: 'Connect with qualified attorneys in your area',
          icon: 'users'
        },
        {
          title: 'Document Analysis',
          description: 'Upload and understand any legal document',
          icon: 'file-text'
        }
      ]
    }
  },
  {
    id: 'lawyers-a',
    name: 'Lawyers Landing Page',
    version: 'lawyers',
    variant: 'a',
    active: true,
    url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/landing?v=lawyers&variant=a`,
    views: 856,
    conversions: 67,
    lastUpdated: new Date().toISOString(),
    content: {
      hero: {
        title: 'Expand Your Legal Practice',
        subtitle: 'Join our network of qualified attorneys and connect with clients who need your expertise.',
        ctaText: 'Join Our Network',
        ctaUrl: '/auth/signup?type=lawyer'
      },
      benefits: [
        'Access to pre-qualified clients',
        'AI-assisted case preparation',
        'Streamlined client communication',
        'Professional marketing support'
      ]
    }
  },
  {
    id: 'users-a',
    name: 'Users Landing Page', 
    version: 'users',
    variant: 'a',
    active: true,
    url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/landing?v=users&variant=a`,
    views: 2103,
    conversions: 156,
    lastUpdated: new Date().toISOString(),
    content: {
      hero: {
        title: 'Legal Questions Answered Instantly',
        subtitle: 'No more expensive consultations for simple questions. Get AI-powered legal guidance in seconds.',
        ctaText: 'Ask Your First Question',
        ctaUrl: '/auth/signup?redirect=/dashboard/ask'
      },
      useCases: [
        'Contract reviews',
        'Tenant rights',
        'Small business questions',
        'Employment law'
      ]
    }
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const version = searchParams.get('v')
  const variant = searchParams.get('variant')

  if (version && variant) {
    // Return specific config
    const config = landingConfigs.find(c => c.version === version && c.variant === variant)
    if (config) {
      // Increment view count
      config.views += 1
      return NextResponse.json(config)
    }
    return NextResponse.json({ error: 'Config not found' }, { status: 404 })
  }

  // Return all configs (admin only)
  return NextResponse.json(landingConfigs)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, configId, updates } = body

    if (action === 'toggle') {
      const config = landingConfigs.find(c => c.id === configId)
      if (config) {
        config.active = !config.active
        config.lastUpdated = new Date().toISOString()
        return NextResponse.json(config)
      }
      return NextResponse.json({ error: 'Config not found' }, { status: 404 })
    }

    if (action === 'update') {
      const configIndex = landingConfigs.findIndex(c => c.id === configId)
      if (configIndex >= 0) {
        landingConfigs[configIndex] = { 
          ...landingConfigs[configIndex], 
          ...updates, 
          lastUpdated: new Date().toISOString() 
        }
        return NextResponse.json(landingConfigs[configIndex])
      }
      return NextResponse.json({ error: 'Config not found' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}