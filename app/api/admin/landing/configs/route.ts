import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // In production, this would check admin authentication
  const configs = [
    {
      id: 'general-a',
      name: 'General Landing Page',
      version: 'general',
      variant: 'a',
      active: true,
      url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/landing?v=general&variant=a`,
      views: 1247,
      conversions: 89,
      lastUpdated: new Date().toISOString()
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
      lastUpdated: new Date().toISOString()
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
      lastUpdated: new Date().toISOString()
    }
  ]

  return NextResponse.json(configs)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { configId } = body

    // In production, this would:
    // 1. Check admin authentication
    // 2. Update database
    // 3. Return updated config

    // Mock response
    return NextResponse.json({ success: true, configId })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}