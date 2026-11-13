'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Flame,
  Compass,
  Lock,
  Sparkles,
  Star,
  Trophy,
  Footprints,
  Rocket
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function AchievementsPage() {
  const { profile, totalXp } = useProgressionStore();
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

  const cardBg = isDarkMode
    ? 'bg-[#16172B] border-white/5'
    : 'bg-white border-slate-200 shadow-sm';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div
      ref={containerRef}
      className={`min-h-screen font-sans p-6 md:p-10 transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0D0E1A] text-white' : 'bg-transparent text-slate-900'
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-2">
            EVERY STEP COUNTS
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Achievements
          </h1>
          <p className={`${subText} text-sm`}>
            Look how far you've come, {profile?.name || 'Alex'}. Your curiosity is turning into something great.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl border flex items-start gap-4 ${cardBg}`}>
            <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Total XP</div>
              <div className="text-2xl font-bold mb-1">{totalXp ? totalXp.toLocaleString() : '1,280'}</div>
              <div className="text-xs text-indigo-500 font-medium">+120 this week</div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border flex items-start gap-4 ${cardBg}`}>
            <div className="w-12 h-12 shrink-0 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Missions Done</div>
              <div className="text-2xl font-bold mb-1">24</div>
              <div className="text-xs text-amber-500 font-medium">Top 18%</div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border flex items-start gap-4 ${cardBg}`}>
            <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Current Streak</div>
              <div className="text-2xl font-bold mb-1">7 days</div>
              <div className="text-xs text-orange-500 font-medium">A little learning, every day</div>
            </div>
          </div>
        </div>

        <div className={`p-6 md:p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-6 md:gap-8 ${cardBg}`}>
          <div
            className={`w-24 h-24 shrink-0 rounded-full border-4 border-[#8B5CF6] flex flex-col items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.15)] relative ${
              isDarkMode ? 'bg-[#16172B]' : 'bg-slate-50'
            }`}
          >
            <span className="text-[10px] text-slate-400 font-bold -mb-1 mt-1">LEVEL</span>
            <span className={`text-4xl font-black ${headingText}`}>4</span>
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h2 className={`text-xl md:text-2xl font-bold ${headingText}`}>Growing dreamer</h2>
              <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 w-max">
                Primary
              </span>
            </div>
            <p className={`text-sm mb-6 ${subText}`}>
              Every mission brings a new possibility. Just 320 XP to Level 5!
            </p>
            <div
              className={`h-2 w-full rounded-full overflow-hidden mb-2 ${
                isDarkMode ? 'bg-[#0D0E1A]' : 'bg-slate-200'
              }`}
            >
              <div className="h-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] w-[80%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>1,280 XP</span>
              <span>1,600 XP - Level 5</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${headingText}`}>Your badge collection</h2>
            <div className="flex gap-3">
              <div className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
                All badges - 6
              </div>
              <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                Unlocked - 3
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 hover:border-indigo-500/40 transition-colors ${cardBg}`}>
              <div className="w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 mb-1">
                <Footprints className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1.5 ${headingText}`}>First small step</h3>
                <p className={`text-xs ${subText}`}>Complete your very first mission.</p>
              </div>
              <div className="text-[10px] font-bold text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full mt-2">
                Unlocked
              </div>
            </div>

            <div className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 hover:border-orange-500/40 transition-colors ${cardBg}`}>
              <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20 mb-1">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1.5 ${headingText}`}>Week of wonder</h3>
                <p className={`text-xs ${subText}`}>Keep a 7-day learning streak.</p>
              </div>
              <div className="text-[10px] font-bold text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full mt-2">
                Unlocked
              </div>
            </div>

            <div className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 hover:border-emerald-500/40 transition-colors ${cardBg}`}>
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-1">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1.5 ${headingText}`}>Curious explorer</h3>
                <p className={`text-xs ${subText}`}>Explore 3 different dream paths.</p>
              </div>
              <div className="text-[10px] font-bold text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full mt-2">
                Unlocked
              </div>
            </div>

            <div
              className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 ${
                isDarkMode
                  ? 'bg-[#16172B]/50 border-transparent'
                  : 'bg-white/60 border-slate-200/80'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${
                  isDarkMode ? 'bg-[#21233E] text-slate-500' : 'bg-slate-200/80 text-slate-500'
                }`}
              >
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Mission maker
                </h3>
                <p className="text-xs text-slate-500">Complete 30 playful missions.</p>
              </div>
              <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 24 / 30 missions
              </div>
            </div>

            <div
              className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 ${
                isDarkMode
                  ? 'bg-[#16172B]/50 border-transparent'
                  : 'bg-white/60 border-slate-200/80'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${
                  isDarkMode ? 'bg-[#21233E] text-slate-500' : 'bg-slate-200/80 text-slate-500'
                }`}
              >
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Code creator
                </h3>
                <p className="text-xs text-slate-500">Finish your Software Engineer path.</p>
              </div>
              <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 38% of path completed
              </div>
            </div>

            <div
              className={`p-8 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 ${
                isDarkMode
                  ? 'bg-[#16172B]/50 border-transparent'
                  : 'bg-white/60 border-slate-200/80'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${
                  isDarkMode ? 'bg-[#21233E] text-slate-500' : 'bg-slate-200/80 text-slate-500'
                }`}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Two weeks strong
                </h3>
                <p className="text-xs text-slate-500">Build a 14-day learning streak.</p>
              </div>
              <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 7 / 14 days
              </div>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border mt-6 ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-bold ${headingText}`}>Little wins, big feelings</h2>
            <span className={`text-[11px] ${subText}`}>Recent milestones</span>
          </div>

          <div className="space-y-3">
            <div
              className={`flex items-center justify-between p-4 rounded-2xl border ${
                isDarkMode
                  ? 'bg-[#0D0E1A]/40 border-white/5'
                  : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold mb-0.5 ${headingText}`}>A whole week of wonder!</h4>
                  <p className={`text-xs ${subText}`}>You showed up for 7 days in a row.</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Today</span>
            </div>

            <div
              className={`flex items-center justify-between p-4 rounded-2xl border ${
                isDarkMode
                  ? 'bg-[#0D0E1A]/40 border-white/5'
                  : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold mb-0.5 ${headingText}`}>Your curiosity crossed new paths</h4>
                  <p className={`text-xs ${subText}`}>Software Engineer, Junior Lawyer & Future Doctor.</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">This week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}