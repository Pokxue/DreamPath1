'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { useProgressionStore } from '@/stores/useProgressionStore';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { profile } = useProgressionStore();
  const pathname = usePathname();
  const isLight = profile.colorMode === 'light';

  if (pathname === '/' || pathname.startsWith('/auth/') || pathname.startsWith('/onboarding')) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className={`min-h-screen flex ${isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#080a14] text-slate-100'}`}>

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}

