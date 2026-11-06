'use client';

import React, { useState } from 'react';
import {
  Shield,
  Clock,
  Heart,
  TrendingUp,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  Bell,
  ArrowRight,
  SlidersHorizontal,
  Scale
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export default function ParentSpacePage() {
  const { profile, setSettings, addScreenTime } = useProgressionStore();
  const [viewMode, setViewMode] = useState<'child' | 'parent'>('child');
  const [language, setLanguage] = useState<'en' | 'bm'>('en');
  const [parentPasscode, setParentPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;

  const handleUnlockParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (parentPasscode === '1234' || parentPasscode === 'parent') {
      setIsUnlocked(true);
    } else {
      alert('Demo passcode: enter 1234 or parent to unlock parent controls.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 bg-[#0D0E1A] text-slate-100 min-h-screen p-2 sm:p-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5CF6]">
            GROWING TOGETHER • CASE ROOM UI
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-0.5">
            Parent Space
          </h1>
          <p className="mt-1 text-slate-400 text-xs sm:text-sm">
            A little insight into Alex's world. Support their curiosity at a healthy pace.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="inline-flex p-1 rounded-2xl bg-[#16172B] border border-[#21233E]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('bm')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                language === 'bm'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bahasa Melayu
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#16172B] hover:bg-[#1c1e36] border border-[#21233E] text-white text-xs font-bold transition-all shadow-sm">
            <span>Weekly report</span>
            <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
          </button>
        </div>
      </div>

      <div className="inline-flex p-1 rounded-2xl bg-[#16172B] border border-[#21233E]">
        <button
          onClick={() => setViewMode('child')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            viewMode === 'child'
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Child view
        </button>
        <button
          onClick={() => setViewMode('parent')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            viewMode === 'parent'
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Parent view
        </button>
      </div>

      {viewMode === 'child' ? (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#16172B] border border-[#21233E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Safe to explore - Parent supervised
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Age-appropriate adventures, with room for independent discovery.
                </p>
              </div>
            </div>
            <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#21233E] border border-[#3B3C66] text-[#34D399] text-xs font-semibold">
              Primary • Level 4
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-3xl bg-[#16172B] border border-[#21233E] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#21233E] text-[#8B5CF6] flex items-center justify-center shrink-0 border border-[#3B3C66]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  LEARNING THIS WEEK
                </div>
                <div className="text-2xl font-black text-white mt-0.5">
                  4h 32m
                </div>
                <div className="text-[11px] text-[#34D399] font-medium mt-0.5">
                  Healthy pace
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#16172B] border border-[#21233E] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#21233E] text-amber-400 flex items-center justify-center shrink-0 border border-[#3B3C66]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MISSIONS COMPLETED
                </div>
                <div className="text-2xl font-black text-white mt-0.5">
                  24
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Across Alex's learning journey
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#16172B] border border-[#21233E] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#21233E] text-rose-400 flex items-center justify-center shrink-0 border border-[#3B3C66]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  LEARNING STREAK
                </div>
                <div className="text-2xl font-black text-white mt-0.5">
                  7 days
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Building a happy habit
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#16172B] border border-[#21233E] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">A healthy learning rhythm</h3>
                  <span className="text-xs text-slate-400">This week</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span>Daily learning time</span>
                  <span>Daily limit: 60 min</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-32 pt-4 px-2 border-b border-[#21233E] pb-3">
                {[
                  { day: 'Mon', val: '32m', height: '45%' },
                  { day: 'Tue', val: '45m', height: '70%' },
                  { day: 'Wed', val: '40m', height: '60%' },
                  { day: 'Thu', val: '30m', height: '48%' },
                  { day: 'Fri', val: '44m', height: '68%' },
                  { day: 'Sat', val: '38m', height: '58%' },
                  { day: 'Sun', val: '36m', height: '54%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[9px] text-slate-400 font-medium">{item.val}</span>
                    <div
                      style={{ height: item.height }}
                      className={`w-full max-w-[36px] rounded-xl transition-all ${
                        idx === 1
                          ? 'bg-gradient-to-t from-[#8B5CF6] to-[#6D28D9] shadow-lg shadow-indigo-500/20'
                          : 'bg-[#21233E] hover:bg-[#3B3C66]'
                      }`}
                    ></div>
                    <span className="text-xs text-slate-400 font-semibold mt-0.5">{item.day}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#34D399] font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Alex stayed within the daily limit all week.</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#16172B] border border-[#21233E] flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TODAY'S SCREEN TIME
                </div>
                
                <div className="flex flex-col items-center justify-center my-4">
                  <div className="relative w-24 h-24 rounded-full border-4 border-[#21233E] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-[#8B5CF6] border-t-transparent animate-spin-slow"></div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">38</div>
                      <div className="text-[9px] text-slate-400 uppercase">minutes</div>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <div className="text-sm font-bold text-white">38 of 60 minutes</div>
                    <div className="text-xs text-[#8B5CF6] mt-0.5">22 minutes remaining</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  A gentle reminder helps Alex take a break when today's time is up.
                </p>
              </div>

              <button 
                onClick={() => setViewMode('parent')}
                className="w-full mt-4 py-2.5 rounded-2xl bg-[#21233E] hover:bg-[#3B3C66] border border-[#3B3C66] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span>Manage time limit</span>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#16172B] border border-[#21233E] space-y-5">
              <h3 className="text-base font-bold text-white">Where curiosity is growing</h3>

              <div className="p-4 rounded-2xl bg-[#21233E] border border-[#3B3C66]">
                <div className="flex items-center gap-2 text-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>TOP INTEREST THIS WEEK</span>
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  Technology & problem solving
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Alex is exploring how things work — and how to make them better.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                {[
                  { name: 'Software Engineer', percentage: '65%', color: 'from-[#8B5CF6] to-[#6D28D9]', width: '65%' },
                  { name: 'Future Doctor', percentage: '23%', color: 'from-[#10B981] to-[#34D399]', width: '23%' },
                  { name: 'Junior Lawyer', percentage: '12%', color: 'from-amber-500 to-amber-400', width: '12%' },
                ].map((career, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{career.name}</span>
                      <span className="text-slate-400 font-mono">{career.percentage}</span>
                    </div>
                    <div className="h-2 w-full bg-[#21233E] rounded-full overflow-hidden border border-[#3B3C66]">
                      <div style={{ width: career.width }} className={`h-full rounded-full bg-gradient-to-r ${career.color}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#16172B] border border-[#21233E] flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white">A safe space to grow</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-white">Break reminders</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Encourage a pause after learning.</div>
                    </div>
                    <div className="w-11 h-6 bg-[#8B5CF6] rounded-full p-1 cursor-pointer flex items-center justify-end shadow-inner">
                      <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-white">Age-appropriate paths</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Matched to Primary learning.</div>
                    </div>
                    <div className="w-11 h-6 bg-[#8B5CF6] rounded-full p-1 cursor-pointer flex items-center justify-end shadow-inner">
                      <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-white">Weekly progress summary</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Stay in the loop, without pressure.</div>
                    </div>
                    <div className="w-11 h-6 bg-[#8B5CF6] rounded-full p-1 cursor-pointer flex items-center justify-end shadow-inner">
                      <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[#21233E] text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                <span>Parent confirmation required to change</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#16172B] border border-[#21233E] flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#21233E] border border-[#3B3C66] text-[#8B5CF6] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6]">
                A MOMENT TO CONNECT
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                "What would you build to make someone's day easier?"
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Ask Alex about their study app. Celebrate the thinking, not just the result.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {!isUnlocked ? (
            <div className="p-8 rounded-3xl bg-[#16172B] border border-[#21233E] max-w-md mx-auto text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#21233E] border border-[#3B3C66] text-[#8B5CF6] mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Parent Passcode Required</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your 4-digit parent PIN to adjust daily limits and curriculum settings. (Demo PIN: 1234)
              </p>
              <form onSubmit={handleUnlockParent} className="space-y-3 pt-2">
                <input
                  type="password"
                  placeholder="Enter PIN (e.g. 1234)"
                  value={parentPasscode}
                  onChange={(e) => setParentPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#21233E] border border-[#3B3C66] text-white text-center text-sm font-mono tracking-widest focus:outline-none focus:border-[#8B5CF6]"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/20"
                >
                  Unlock Controls
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#16172B] border border-[#21233E] space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#21233E] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Supervision & Healthy Limits</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Logged in as {profile.parentName || 'Parent'} ({profile.parentEmail || 'parent@example.com'})
                  </p>
                </div>
                <button
                  onClick={() => setIsUnlocked(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#21233E] border border-[#3B3C66] text-xs font-semibold text-[#8B5CF6] hover:text-white transition-all"
                >
                  Lock
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#21233E] border border-[#3B3C66]">
                  <div>
                    <div className="text-sm font-bold text-white">Daily Screen Time Limit</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Current setting: {profile.screenTimeMaxMinutes} minutes
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[45, 60, 90, 120].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setSettings({ screenTimeMaxMinutes: mins })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          profile.screenTimeMaxMinutes === mins
                            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow'
                            : 'bg-[#3B3C66] text-slate-300 hover:bg-[#4a4c82]'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#21233E] border border-[#3B3C66] space-y-2">
                  <div className="text-sm font-bold text-white">Weekly Progress Report Overview</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {profile.name || 'Alex'} engaged with <strong>Technology</strong> (65%),{' '}
                    <strong>Civics & Law</strong> (20%), and <strong>Healthcare</strong> (15%) this week. No flagged queries or safety alerts recorded.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}