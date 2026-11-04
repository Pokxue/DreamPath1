'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Trophy,
  Users,
  User,
  Settings,
  ShieldCheck,
  Sparkles,
  BookOpen,
  HelpCircle,
  PlayCircle
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useProgressionStore();
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Dream Paths', href: '/paths', icon: Compass },
    { label: 'Learning Modes', href: '/modes', icon: PlayCircle },
    { label: 'Top Dreamers', href: '/leaderboard', icon: Trophy, badge: 'Top 18%' },
    { label: 'Achievements', href: '/achievements', icon: Sparkles, count: '3' },
    { label: 'Parent Space', href: '/parent', icon: Users },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0a0d1b] border-r border-[#1e2338] flex flex-col justify-between shrink-0 h-screen sticky top-0 text-slate-200 select-none">
      {/* Brand & User Header */}
      <div className="p-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-950/50 group-hover:scale-105 transition-transform">
            DP
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-extrabold text-amber-400">
              DREAM
            </div>
            <div className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              CAREER PATH
            </div>
          </div>
        </Link>

        {/* User Quick Info */}
        <div className="mt-6 p-3 rounded-2xl bg-[#12162a] border border-[#212745] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold flex items-center justify-center text-lg">
            {profile.avatarChar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-white truncate">{profile.name}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>{tier.name} • Lv. {profile.currentLevel}</span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="mt-6 space-y-1.5">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#12172f]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Supervised info & Settings */}
      <div className="p-4 border-t border-[#1e2338] bg-[#0c0f20]/60">
        <div className="p-3 rounded-xl bg-[#141933] border border-[#222a55] mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-slate-200">Safe to explore</div>
              <div className="text-[11px] text-slate-400">Parent supervised</div>
            </div>
          </div>
          <Link
            href="/parent"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2"
          >
            Review
          </Link>
        </div>

        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            pathname === '/settings'
              ? 'bg-indigo-600/20 text-indigo-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#13172e]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings & Tiers</span>
        </Link>
      </div>
    </aside>
  );
}

