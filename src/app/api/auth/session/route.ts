import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/database';

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('dreampath-auth')?.value;
  const userId = Number(sessionCookie);

  if (!sessionCookie || !Number.isSafeInteger(userId) || userId <= 0) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const user = getUserById(userId);
    if (!user) {
      const response = NextResponse.json({ user: null }, { status: 401 });
      response.cookies.set('dreampath-auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Session lookup error:', error);
    return NextResponse.json({ error: 'Unable to verify session' }, { status: 500 });
  }
}
