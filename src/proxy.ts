import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/paths',
  '/home',
  '/achievements',
  '/leaderboard',
  '/modes',
  '/profile',
  '/settings',
  '/parent',
  '/simulation',
  '/onboarding',
];

function isUnderRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) => isUnderRoute(pathname, route));
  const isOnboardingRoute = isUnderRoute(pathname, '/onboarding');

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('dreampath-auth')?.value;
  const hasValidSessionId = Boolean(sessionCookie && /^[1-9]\d*$/.test(sessionCookie));

  if ((isProtectedRoute || isOnboardingRoute) && !hasValidSessionId) {
    const signInUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (pathname === '/auth/signin' && hasValidSessionId) {
    return NextResponse.redirect(new URL('/onboarding/education', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};