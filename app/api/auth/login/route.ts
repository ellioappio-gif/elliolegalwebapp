import { NextResponse } from 'next/server';

const demoUser = {
  email: 'demo@ellio.legal',
  password: 'demo123',
};

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Demo authentication - in production, query a real database
    if (email === demoUser.email && password === demoUser.password) {
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        token,
        user: {
          email,
          name: 'Demo User',
          id: '1'
        }
      });
    }

    // Allow any new signup for demo
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    return NextResponse.json({
      success: true,
      token,
      user: {
        email,
        name: email.split('@')[0],
        id: Date.now().toString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
