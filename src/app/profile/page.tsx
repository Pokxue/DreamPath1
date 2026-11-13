'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Edit2,
  Check
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { CAREER_PATHS } from '@/types/career';

export default function ProfilePage() {
  const { profile, totalXp, skills, updateProfile } = useProgressionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
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

  const activeCareer = CAREER_PATHS.find((c) => c.id === profile.activeCareerId) || CAREER_PATHS[0];

  const handleSaveName = () => {
    updateProfile({ name: nameInput });
    setIsEditing(false);
  };

  const cardBg = isDarkMode
    ? 'bg-[#141728] border-[#232742] shadow-xl'
    : 'bg-white border-slate-200 shadow-sm';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const fieldBox = isDarkMode
    ? 'bg-[#101221] border-[#222749] text-white'
    : 'bg-slate-50 border-slate-200 text-slate-900';

  return (
    <div ref={containerRef} className="space-y-6 max-w-6xl mx-auto pb-12 transition-colors duration-200">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-purple-500">
          UNIVELOCITY FOR
        </div>
        <h1 className={`text-3xl font-extrabold tracking-tight mt-1 ${headingText}`}>
          My Profile
        </h1>
        <p className={`mt-1 text-sm ${subText}`}>
          Your dreams, your interests, your own way to grow.
        </p>
      </div>

      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${cardBg}`}>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white font-black text-3xl flex items-center justify-center shadow-lg">
            {profile.avatarChar}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className={`text-2xl font-bold ${headingText}`}>{profile.name}</h2>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isDarkMode
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                }`}
              >
                {profile.handle || 'Primary'}
              </span>
            </div>
            <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Level {profile.currentLevel} Growing dreamer
            </div>
            <div className={`flex items-center gap-3 text-xs pt-1 font-medium ${subText}`}>
              <span className="flex items-center gap-1 text-purple-500 font-bold">
                <Sparkles className="w-3.5 h-3.5 inline" /> {totalXp.toLocaleString()} XP
              </span>
              <span>•</span>
              <span>{profile.missionsCompleted} missions done</span>
              <span>•</span>
              <span className="text-amber-500 font-bold">{profile.streakDays}-day streak</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 shadow-xs ${
            isDarkMode
              ? 'bg-[#1b203c] hover:bg-[#252c52] text-slate-200 border-[#2e3663]'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel' : 'Edit name'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${cardBg}`}>
            <div>
              <h3 className={`text-xl font-bold ${headingText}`}>About you</h3>
              <p className={`text-xs mt-0.5 ${subText}`}>A few details that make this space yours.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-xs font-bold ${subText}`}>Display name</label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm font-medium rounded-2xl border focus:outline-none ${
                        isDarkMode
                          ? 'bg-[#101221] border-indigo-500 text-white'
                          : 'bg-white border-indigo-500 text-slate-900'
                      }`}
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2.5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className={`w-full px-4 py-2.5 text-sm font-medium rounded-2xl border ${fieldBox}`}>
                    {profile.name}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-bold ${subText}`}>Learning stage</label>
                <div
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-2xl border flex items-center justify-between ${
                    isDarkMode
                      ? 'bg-[#101221] border-[#222749] text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>Primary</span>
                  <span className="text-xs text-slate-400">🔒</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold ${subText}`}>My dream right now</label>
              <div
                className={`w-full px-4 py-3 text-sm font-medium rounded-2xl border ${
                  isDarkMode
                    ? 'bg-[#101221] border-[#222749] text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                {activeCareer.title ? `Build things that help people (${activeCareer.title})` : 'Build things that help people'}
              </div>
              <p className={`text-[11px] pt-0.5 ${subText}`}>
                Your profile is customized for your active career path.
              </p>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveName}
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save changes</span>
                </button>
              </div>
            )}
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-500">
                  COMPETENCY PORTFOLIO
                </div>
                <h3 className={`text-xl font-bold mt-0.5 ${headingText}`}>Verifiable Skills</h3>
              </div>
              <span className={`text-xs ${subText}`}>O*NET & ESCO Aligned</span>
            </div>

            <div className="space-y-4 pt-2">
              {Object.entries(skills).map(([skillId, data]) => (
                <div key={skillId} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className={`font-bold capitalize ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                      {skillId.replace('-', ' ')}
                    </span>
                    <span className="font-semibold text-purple-500">
                      {data.competency}% ({data.xp} XP)
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden border ${
                      isDarkMode
                        ? 'bg-[#101221] border-[#222749]'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${data.competency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 ${cardBg}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${subText}`}>
              YOUR NEXT MILESTONE
            </div>
            <div>
              <h4 className={`text-xl font-bold ${headingText}`}>Hello, Level 5.</h4>
              <p className={`text-xs mt-1 leading-relaxed ${subText}`}>
                Keep exploring. You&apos;re just 320 XP away from your next level.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <div
                className={`w-full h-2 rounded-full overflow-hidden border ${
                  isDarkMode
                    ? 'bg-[#101221] border-[#222749]'
                    : 'bg-slate-100 border-slate-200'
                }`}
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-3/4 rounded-full" />
              </div>
              <div className={`flex justify-between text-[11px] font-semibold ${subText}`}>
                <span>1,350 XP</span>
                <span>1,605 XP</span>
              </div>
            </div>

            <Link
              href="/paths"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>Explore dream paths</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border text-center ${cardBg}`}>
              <div className="text-xl font-black text-indigo-500">
                {totalXp.toLocaleString()}
              </div>
              <div className={`text-[11px] font-semibold mt-1 ${subText}`}>Total XP</div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${cardBg}`}>
              <div className="text-xl font-black text-amber-500">
                {profile.missionsCompleted}
              </div>
              <div className={`text-[11px] font-semibold mt-1 ${subText}`}>Missions</div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${cardBg}`}>
              <div className="text-xl font-black text-emerald-500">
                {profile.streakDays}d
              </div>
              <div className={`text-[11px] font-semibold mt-1 ${subText}`}>Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}