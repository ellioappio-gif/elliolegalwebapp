import { NextRequest, NextResponse } from 'next/server'

// Mock data for all site pages - replace with database calls in production
const mockPageConfigs = [
  // Landing Pages
  {
    id: 'landing-general-a',
    name: 'General Landing A',
    path: '/landing?v=general&variant=a',
    category: 'landing',
    active: true,
    views: 15420,
    conversions: 847,
    lastUpdated: '2 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/landing?v=general&variant=a`
  },
  {
    id: 'landing-lawyers-a',
    name: 'Lawyers Landing A',
    path: '/landing?v=lawyers&variant=a',
    category: 'landing',
    active: true,
    views: 8932,
    conversions: 523,
    lastUpdated: '4 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/landing?v=lawyers&variant=a`
  },
  {
    id: 'landing-users-a',
    name: 'Users Landing A',
    path: '/landing?v=users&variant=a',
    category: 'landing',
    active: false,
    views: 6745,
    conversions: 392,
    lastUpdated: '1 day ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/landing?v=users&variant=a`
  },

  // Auth Pages
  {
    id: 'auth-login',
    name: 'Login',
    path: '/auth/login',
    category: 'auth',
    active: true,
    views: 24567,
    conversions: 18234,
    lastUpdated: '1 hour ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/login`
  },
  {
    id: 'auth-signup',
    name: 'Sign Up',
    path: '/auth/signup',
    category: 'auth',
    active: true,
    views: 19876,
    conversions: 12543,
    lastUpdated: '3 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/signup`
  },
  {
    id: 'auth-forgot-password',
    name: 'Forgot Password',
    path: '/auth/forgot-password',
    category: 'auth',
    active: true,
    views: 5432,
    conversions: 3287,
    lastUpdated: '5 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/forgot-password`
  },
  {
    id: 'auth-verify-email',
    name: 'Verify Email',
    path: '/auth/verify-email',
    category: 'auth',
    active: true,
    views: 8765,
    conversions: 7234,
    lastUpdated: '2 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/verify-email`
  },

  // Marketing Pages
  {
    id: 'about',
    name: 'About',
    path: '/about',
    category: 'marketing',
    active: true,
    views: 12345,
    conversions: 678,
    lastUpdated: '6 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`
  },
  {
    id: 'features',
    name: 'Features',
    path: '/features',
    category: 'marketing',
    active: true,
    views: 18765,
    conversions: 1234,
    lastUpdated: '4 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/features`
  },
  {
    id: 'pricing',
    name: 'Pricing',
    path: '/pricing',
    category: 'marketing',
    active: true,
    views: 22456,
    conversions: 2876,
    lastUpdated: '2 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pricing`
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    path: '/testimonials',
    category: 'marketing',
    active: true,
    views: 9876,
    conversions: 543,
    lastUpdated: '8 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/testimonials`
  },
  {
    id: 'how-it-works',
    name: 'How It Works',
    path: '/how-it-works',
    category: 'marketing',
    active: false,
    views: 7654,
    conversions: 432,
    lastUpdated: '1 day ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/how-it-works`
  },
  {
    id: 'blog',
    name: 'Blog',
    path: '/blog',
    category: 'marketing',
    active: true,
    views: 15432,
    conversions: 876,
    lastUpdated: '5 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`
  },
  {
    id: 'careers',
    name: 'Careers',
    path: '/careers',
    category: 'marketing',
    active: true,
    views: 6789,
    conversions: 234,
    lastUpdated: '12 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/careers`
  },
  {
    id: 'press',
    name: 'Press',
    path: '/press',
    category: 'marketing',
    active: false,
    views: 3456,
    conversions: 123,
    lastUpdated: '2 days ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/press`
  },

  // Support Pages
  {
    id: 'contact',
    name: 'Contact',
    path: '/contact',
    category: 'support',
    active: true,
    views: 11234,
    conversions: 2345,
    lastUpdated: '3 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`
  },
  {
    id: 'support',
    name: 'Support',
    path: '/support',
    category: 'support',
    active: true,
    views: 8765,
    conversions: 1543,
    lastUpdated: '4 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/support`
  },
  {
    id: 'faq',
    name: 'FAQ',
    path: '/faq',
    category: 'support',
    active: true,
    views: 13456,
    conversions: 876,
    lastUpdated: '6 hours ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/faq`
  },

  // Legal Pages
  {
    id: 'privacy',
    name: 'Privacy Policy',
    path: '/privacy',
    category: 'legal',
    active: true,
    views: 5678,
    conversions: 0,
    lastUpdated: '1 week ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/privacy`
  },
  {
    id: 'terms',
    name: 'Terms of Service',
    path: '/terms',
    category: 'legal',
    active: true,
    views: 4321,
    conversions: 0,
    lastUpdated: '1 week ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/terms`
  },
  {
    id: 'security',
    name: 'Security',
    path: '/security',
    category: 'legal',
    active: true,
    views: 2345,
    conversions: 0,
    lastUpdated: '2 weeks ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/security`
  },

  // Dashboard Pages (subset for demo)
  {
    id: 'dashboard-main',
    name: 'Dashboard',
    path: '/dashboard',
    category: 'dashboard',
    active: true,
    views: 45678,
    conversions: 23456,
    lastUpdated: '30 min ago',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard`
  }
]

export async function GET(request: NextRequest) {
  try {
    // In production, fetch from database with user authentication
    return NextResponse.json(mockPageConfigs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch page configurations' },
      { status: 500 }
    )
  }
}