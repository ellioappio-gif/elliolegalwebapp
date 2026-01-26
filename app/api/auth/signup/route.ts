import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Demo - create new user
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    return NextResponse.json({
      success: true,
      token,
      user: {
        email,
        name,
        id: Date.now().toString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 400 }
    );
  }
}
