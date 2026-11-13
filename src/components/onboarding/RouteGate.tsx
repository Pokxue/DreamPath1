'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function RouteGate() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isLandingPage = pathname === '/';
    const isOnboarding = pathname.startsWith('/onboarding');

    // The public landing page stays outside the authenticated dashboard flow.
    if (isLandingPage) return;

    if (!user && isOnboarding) router.replace('/auth/signin');
  }, [isLoading, user, pathname, router]);

  return null;
}
