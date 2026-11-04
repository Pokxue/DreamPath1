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
  Bell
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export default function ParentSpacePage() {
  const { profile, setSettings, addScreenTime } = useProgressionStore();
  const [viewMode, setViewMode] = useState<'child' | 'parent'>('child');
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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          SAFE & SUPPORTED
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Parent Space
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
          A clear supervision area for healthy learning—not surveillance.
        </p>
      </div>

      {/* Child / Parent View Switcher matching Figma */}
      <div className="inline-flex p-1 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
        <button
          onClick={() => setViewMode('child')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            viewMode === 'child'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Child view
        </button>
        <button
          onClick={() => setViewMode('parent')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            viewMode === 'parent'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Parent view
        </button>
      </div>

      {viewMode === 'child' ? (
        /* Child View Info matching Figma */
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white text-2xl font-black flex items-center justify-center shrink-0">
              M
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                MY LINKED PARENT
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{profile.parentName}</h2>
              <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                Your parent can see your progress, selected dream paths, and screen-time summary.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified parent</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                SCREEN TIME LIMIT
              </div>
              <div className="mt-2 text-2xl font-black text-white">
                {profile.screenTimeUsedMinutes} / {profile.screenTimeMaxMinutes} mins
              </div>
              <p className="mt-2 text-xs text-slate-400">
                You have {profile.screenTimeMaxMinutes - profile.screenTimeUsedMinutes} minutes remaining today.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                SAFETY LEVEL
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-400">
                Child Protected
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Chat filters and COPPA compliant safeguards active.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                CURRICULUM TIER
              </div>
              <div className="mt-2 text-2xl font-black text-indigo-300">
                {tier.name}
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Optimized for {tier.gradeDesc} ({tier.targetAge}).
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Parent View with Controls */
        <div className="space-y-6">
          {!isUnlocked ? (
            <div className="p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] max-w-md mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Parent Passcode Required</h2>
              <p className="text-xs text-slate-400">
                Enter your 4-digit parent PIN to adjust daily limits and curriculum settings. (Demo PIN: 1234)
              </p>
              <form onSubmit={handleUnlockParent} className="space-y-3">
                <input
                  type="password"
                  placeholder="Enter PIN (e.g. 1234)"
                  value={parentPasscode}
                  onChange={(e) => setParentPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141830] border border-[#232b57] text-white text-center text-sm font-mono tracking-widest focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Unlock Controls
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-6">
              <div className="flex items-center justify-between border-b border-[#1b203c] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Supervision & Healthy Limits</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Logged in as {profile.parentName} ({profile.parentEmail})
                  </p>
                </div>
                <button
                  onClick={() => setIsUnlocked(false)}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Lock
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#141830] border border-[#212952]">
                  <div>
                    <div className="text-sm font-bold text-white">Daily Screen Time Limit</div>
                    <div className="text-xs text-slate-400">
                      Current setting: {profile.screenTimeMaxMinutes} minutes
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[45, 60, 90, 120].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setSettings({ screenTimeMaxMinutes: mins })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          profile.screenTimeMaxMinutes === mins
                            ? 'bg-indigo-600 text-white'
                            : 'bg-[#1e264f] text-slate-300 hover:bg-[#283266]'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141830] border border-[#212952] space-y-2">
                  <div className="text-sm font-bold text-white">Weekly Progress Report</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {profile.name} engaged with <strong>Technology</strong> (65%),{' '}
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

