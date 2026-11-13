'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Trophy, Sparkles, User, Settings } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/home', icon: Home },
    { label: 'Paths', href: '/paths', icon: Compass },
    { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { label: 'Badges', href: '/achievements', icon: Sparkles },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0a0d1b]/95 backdrop-blur border-t border-[#1e2338] z-40 flex items-center justify-around px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all ${
              isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

