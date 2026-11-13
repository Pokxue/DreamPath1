'use client';

import React from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { Moon, Sun, Flame, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { EDUCATION_TIERS } from '@/types/career';
import { speakText, stopSpeaking } from '@/utils/sound';

export function Header() {
  const { profile, toggleColorMode, setSettings, totalXp, simulatedSalary } = useProgressionStore();
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;
  const isDarkMode = profile.colorMode === 'dark';

  const handleAudioToggle = () => {
    const nextVal = !profile.readAloudEnabled;
    setSettings({ readAloudEnabled: nextVal });
    if (nextVal) {
      speakText(`Voice assistance enabled for ${profile.name}. Explore your dreams with confidence!`);
    } else {
      stopSpeaking();
    }
  };

  return (
    <header
      className={`h-18 px-6 backdrop-blur border-b flex items-center justify-between sticky top-0 z-30 select-none transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#0a0d1b]/95 border-[#1e2338]'
          : 'bg-white/95 border-slate-200 shadow-xs'
      }`}
    >
      <div>
        <div className="text-[11px] font-extrabold tracking-widest uppercase text-indigo-500 flex items-center gap-2">
          <span>YOUR DREAM DASHBOARD</span>
          <span className="inline-block w-1 h-1 rounded-full bg-indigo-500"></span>
          <span className="text-amber-500 font-semibold">
            {tier.name} Tier ({tier.targetAge})
          </span>
        </div>
        <h1 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Good evening, {profile.name}
        </h1>
      </div>

      <div className="flex items-center gap-3.5">
        <div
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
            isDarkMode
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
              : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
          <span>{profile.streakDays} day streak</span>
        </div>

        <div
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
            isDarkMode
              ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>{totalXp.toLocaleString()} XP</span>
        </div>

        <div
          className={`hidden sm:flex px-3 py-1.5 rounded-xl border items-center gap-1.5 text-xs font-bold ${
            isDarkMode
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          <span className="text-emerald-500 font-black">$</span>
          <span>${simulatedSalary.toLocaleString()} /mo</span>
        </div>

        <button
          onClick={handleAudioToggle}
          title={profile.readAloudEnabled ? 'Voice Assist On (Click to mute)' : 'Voice Assist Off (Click to activate)'}
          className={`p-2 rounded-xl border transition-all ${
            profile.readAloudEnabled
              ? isDarkMode
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30'
                : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
              : isDarkMode
              ? 'bg-[#12162a] text-slate-400 border-[#212745] hover:text-white'
              : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-slate-900'
          }`}
        >
          {profile.readAloudEnabled ? (
            <Volume2 className="w-4 h-4 text-indigo-500" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={toggleColorMode}
          title="Toggle color mode"
          className={`p-2 rounded-xl border transition-all ${
            isDarkMode
              ? 'bg-[#12162a] text-slate-400 border-[#212745] hover:text-white'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        <Link
          href="/profile"
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow-md hover:scale-105 transition-transform"
        >
          {profile.avatarChar}
        </Link>
      </div>
    </header>
  );
}