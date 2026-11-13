'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Flame } from 'lucide-react';
import { LEADERBOARD_ENTRIES } from '@/data/leaderboard';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function LeaderboardPage() {
  const { profile, totalXp, simulatedSalary } = useProgressionStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
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

  const userEntry = {
    rank: 18,
    initial: profile.avatarChar,
    name: `${profile.name} (YOU)`,
    careerTitle: profile.activeCareerId.replace('-', ' '),
    pointsXp: totalXp,
    earningsUsd: simulatedSalary,
    isCurrentUser: true,
  };

  const cardBg = isDarkMode
    ? 'bg-[#0f1224] border-[#1e233d]'
    : 'bg-white border-slate-200 shadow-sm';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div ref={containerRef} className="space-y-8 max-w-5xl mx-auto transition-colors duration-200">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-500">
          GLOBAL LEADERBOARD
        </div>
        <h1 className={`text-3xl font-extrabold tracking-tight mt-1 ${headingText}`}>
          Top Dreamers
        </h1>
        <p className={`mt-2 text-sm max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Points and virtual earnings reward learning, consistency, and smart decisions—not screen time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border ${cardBg}`}>
          <div className={`text-xs font-bold uppercase tracking-wider ${subText}`}>
            GLOBAL RANK
          </div>
          <div className={`mt-2 text-3xl font-black ${headingText}`}>#18</div>
          <div className="mt-2 text-xs text-indigo-500 font-semibold">
            Top 18% of all students
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${cardBg}`}>
          <div className={`text-xs font-bold uppercase tracking-wider ${subText}`}>
            TOTAL POINTS
          </div>
          <div className={`mt-2 text-3xl font-black ${headingText}`}>
            {totalXp.toLocaleString()} XP
          </div>
          <div className="mt-2 text-xs text-amber-500 font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{profile.streakDays} day streak</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${cardBg}`}>
          <div className={`text-xs font-bold uppercase tracking-wider ${subText}`}>
            VIRTUAL EARNINGS
          </div>
          <div className="mt-2 text-3xl font-black text-emerald-500">
            ${simulatedSalary.toLocaleString()}
          </div>
          <div className={`mt-2 text-xs ${subText}`}>
            Simulated career monthly salary
          </div>
        </div>
      </div>

      <div
        className={`rounded-3xl border overflow-hidden ${
          isDarkMode
            ? 'bg-[#0e1224] border-[#1e233d]'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div
          className={`p-5 border-b grid grid-cols-12 text-xs font-bold uppercase tracking-wider ${
            isDarkMode
              ? 'border-[#1b203c] text-slate-400'
              : 'border-slate-200 text-slate-500 bg-slate-50/70'
          }`}
        >
          <div className="col-span-6 sm:col-span-7">RANK & DREAMER</div>
          <div className="col-span-3 sm:col-span-3 text-right">POINTS</div>
          <div className="col-span-3 sm:col-span-2 text-right">EARNINGS</div>
        </div>

        <div className={`divide-y ${isDarkMode ? 'divide-[#171b34]' : 'divide-slate-100'}`}>
          {LEADERBOARD_ENTRIES.map((entry) => (
            <div
              key={entry.rank}
              className={`p-4 sm:p-5 grid grid-cols-12 items-center transition-colors ${
                isDarkMode ? 'hover:bg-[#12162f]' : 'hover:bg-slate-50'
              }`}
            >
              <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
                <span
                  className={`w-6 text-center text-sm font-extrabold ${
                    entry.rank === 1
                      ? 'text-amber-500'
                      : entry.rank === 2
                      ? isDarkMode
                        ? 'text-slate-300'
                        : 'text-slate-600'
                      : entry.rank === 3
                      ? 'text-amber-600'
                      : subText
                  }`}
                >
                  {entry.rank}
                </span>

                <div
                  className={`w-10 h-10 rounded-xl font-black border flex items-center justify-center text-sm ${
                    isDarkMode
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                  }`}
                >
                  {entry.initial}
                </div>

                <div className="min-w-0">
                  <div className={`text-sm font-bold truncate ${headingText}`}>{entry.name}</div>
                  <div className={`text-xs capitalize ${subText}`}>{entry.careerTitle}</div>
                </div>
              </div>

              <div
                className={`col-span-3 sm:col-span-3 text-right font-bold text-sm ${
                  isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                }`}
              >
                {entry.pointsXp.toLocaleString()} XP
              </div>

              <div className="col-span-3 sm:col-span-2 text-right font-bold text-sm text-emerald-500">
                ${entry.earningsUsd.toLocaleString()}
              </div>
            </div>
          ))}

          <div
            className={`p-4 sm:p-5 grid grid-cols-12 items-center border-t-2 border-indigo-500/50 ${
              isDarkMode ? 'bg-indigo-950/40' : 'bg-indigo-50/70'
            }`}
          >
            <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
              <span className="w-6 text-center text-sm font-extrabold text-indigo-500">
                {userEntry.rank}
              </span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow">
                {userEntry.initial}
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-extrabold flex items-center gap-1.5 ${headingText}`}>
                  <span>{userEntry.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500 text-white font-black">
                    YOU
                  </span>
                </div>
                <div
                  className={`text-xs capitalize ${
                    isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                  }`}
                >
                  {userEntry.careerTitle}
                </div>
              </div>
            </div>

            <div
              className={`col-span-3 sm:col-span-3 text-right font-extrabold text-sm ${
                isDarkMode ? 'text-amber-300' : 'text-amber-600'
              }`}
            >
              {userEntry.pointsXp.toLocaleString()} XP
            </div>

            <div className="col-span-3 sm:col-span-2 text-right font-extrabold text-sm text-emerald-500">
              ${userEntry.earningsUsd.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}