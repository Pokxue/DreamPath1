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
    <header className="h-18 px-6 bg-[#0a0d1b]/95 backdrop-blur border-b border-[#1e2338] flex items-center justify-between sticky top-0 z-30 select-none">
      <div>
        <div className="text-[11px] font-extrabold tracking-widest uppercase text-indigo-400 flex items-center gap-2">
          <span>YOUR DREAM DASHBOARD</span>
          <span className="inline-block w-1 h-1 rounded-full bg-indigo-400"></span>
          <span className="text-amber-400 font-semibold">{tier.name} Tier ({tier.targetAge})</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Good evening, {profile.name}
        </h1>
      </div>

      <div className="flex items-center gap-3.5">
        {/* Streak Counter */}
        <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-2 text-xs font-bold">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
          <span>{profile.streakDays} day streak</span>
        </div>

        {/* Total XP Pill */}
        <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center gap-2 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{totalXp.toLocaleString()} XP</span>
        </div>

        {/* Virtual Salary Pill */}
        <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 items-center gap-1.5 text-xs font-bold">
          <span className="text-emerald-400 font-black">$</span>
          <span>${simulatedSalary.toLocaleString()} /mo</span>
        </div>

        {/* Read Aloud Toggle */}
        <button
          onClick={handleAudioToggle}
          title={profile.readAloudEnabled ? 'Voice Assist On (Click to mute)' : 'Voice Assist Off (Click to activate)'}
          className={`p-2 rounded-xl border transition-all ${
            profile.readAloudEnabled
              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30'
              : 'bg-[#12162a] text-slate-400 border-[#212745] hover:text-white'
          }`}
        >
          {profile.readAloudEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Dark/Light Color Mode Toggle */}
        <button
          onClick={toggleColorMode}
          title="Toggle color mode"
          className="p-2 rounded-xl bg-[#12162a] text-slate-400 border border-[#212745] hover:text-white transition-all"
        >
          {profile.colorMode === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-300" />}
        </button>

        {/* User Avatar Circle */}
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

