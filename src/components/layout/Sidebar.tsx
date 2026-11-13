'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Trophy,
  User,
  Settings,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useProgressionStore();
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;
  const asideRef = useRef<HTMLElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;

    const shellEl = el.closest('.min-h-screen.flex') || el.parentElement;
    if (!shellEl) return;

    const syncTheme = () => {
      const isLight =
        shellEl.classList.contains('bg-slate-100') ||
        shellEl.classList.contains('bg-slate-50') ||
        shellEl.classList.contains('bg-white');
      setIsDarkMode(!isLight);
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(shellEl, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Dream Paths', href: '/paths', icon: Compass },
    { label: 'Learning Modes', href: '/modes', icon: PlayCircle },
    { label: 'Top Dreamers', href: '/leaderboard', icon: Trophy, badge: 'Top 18%' },
    { label: 'Achievements', href: '/achievements', icon: Sparkles, count: '3' },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <aside
      ref={asideRef}
      className={`w-64 border-r flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#0a0d1b] border-[#1e2338] text-slate-200'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      <div className="p-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-950/30 group-hover:scale-105 transition-transform">
            DP
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-extrabold text-amber-500">
              DREAM
            </div>
            <div
              className={`text-sm font-black tracking-tight flex items-center gap-1.5 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              CAREER PATH
            </div>
          </div>
        </Link>

        <div
          className={`mt-6 p-3 rounded-2xl border flex items-center gap-3 ${
            isDarkMode
              ? 'bg-[#12162a] border-[#212745]'
              : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl border font-bold flex items-center justify-center text-lg ${
              isDarkMode
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                : 'bg-indigo-100 text-indigo-600 border-indigo-200'
            }`}
          >
            {profile.avatarChar}
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`text-sm font-bold truncate ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {profile.name}
            </div>
            <div
              className={`text-xs flex items-center gap-1.5 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>
                {tier.name} Lv. {profile.currentLevel}
              </span>
            </div>
          </div>
        </div>

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
                    ? isDarkMode
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-[#12172f]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? isDarkMode
                          ? 'text-indigo-400'
                          : 'text-indigo-600'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full border ${
                      isDarkMode
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        : 'bg-indigo-100 text-indigo-600 border-indigo-200'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded border ${
                      isDarkMode
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-amber-100 text-amber-700 border-amber-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`p-4 border-t ${
          isDarkMode
            ? 'border-[#1e2338] bg-[#0c0f20]/60'
            : 'border-slate-200 bg-slate-50/80'
        }`}
      >
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            pathname === '/settings'
              ? isDarkMode
                ? 'bg-indigo-600/20 text-indigo-300'
                : 'bg-indigo-50 text-indigo-600'
              : isDarkMode
              ? 'text-slate-400 hover:text-slate-200 hover:bg-[#13172e]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings & Tiers</span>
        </Link>
      </div>
    </aside>
  );
}