'use client';

import React, { useState } from 'react';
import {
  User,
  Calendar,
  Award,
  Clock,
  Sparkles,
  TrendingUp,
  Edit2,
  Check,
  Code2,
  Zap
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS, CAREER_PATHS } from '@/types/career';

export default function ProfilePage() {
  const { profile, totalXp, simulatedSalary, skills, updateProfile } = useProgressionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;
  const activeCareer = CAREER_PATHS.find((c) => c.id === profile.activeCareerId) || CAREER_PATHS[0];

  const handleSaveName = () => {
    updateProfile({ name: nameInput });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header section matching screenshot */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
          UNIVELOCITY FOR
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          My Profile
        </h1>
        <p className="mt-1 text-slate-400 text-sm">
          Your dreams, your interests, your own way to grow.
        </p>
      </div>

      {/* Main Profile Hero Banner Card */}
      <div className="p-6 rounded-3xl bg-[#141728] border border-[#232742] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white font-black text-3xl flex items-center justify-center shadow-lg">
            {profile.avatarChar}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {profile.handle || 'Primary'}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-300">
              Level {profile.currentLevel} • Growing dreamer
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 font-medium">
              <span className="flex items-center gap-1 text-purple-400 font-bold">
                <Sparkles className="w-3.5 h-3.5 inline" /> {totalXp.toLocaleString()} XP
              </span>
              <span>•</span>
              <span>{profile.missionsCompleted} missions done</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">{profile.streakDays}-day streak</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2.5 rounded-2xl bg-[#1b203c] hover:bg-[#252c52] text-slate-200 text-xs font-bold border border-[#2e3663] transition-all flex items-center gap-2 shadow-sm"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel' : 'Change avatar'}</span>
        </button>
      </div>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Main Column: About You & Competencies */}
        <div className="lg:col-span-2 space-y-6">
          {/* About You Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141728] border border-[#232742] space-y-5 shadow-xl">
            <div>
              <h3 className="text-xl font-bold text-white">About you</h3>
              <p className="text-xs text-slate-400 mt-0.5">A few details that make this space yours.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Display name</label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-medium rounded-2xl bg-[#101221] border border-indigo-500 text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2.5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-[#101221] border border-[#222749] text-white">
                    {profile.name}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Learning stage</label>
                <div className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-[#101221] border border-[#222749] text-slate-300 flex items-center justify-between">
                  <span>Primary</span>
                  <span className="text-xs text-slate-500">🔒</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">My dream right now</label>
              <div className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-[#101221] border border-[#222749] text-slate-200">
                {activeCareer.title ? `Build things that help people (${activeCareer.title})` : "Build things that help people"}
              </div>
              <p className="text-[11px] text-slate-500 pt-0.5">Your profile is only visible to you and your parent.</p>
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

          {/* Competency Portfolio Card (Retained from your original advanced data) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141728] border border-[#232742] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  COMPETENCY PORTFOLIO
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">Verifiable Skills</h3>
              </div>
              <span className="text-xs text-slate-400">O*NET & ESCO Aligned</span>
            </div>

            <div className="space-y-4 pt-2">
              {Object.entries(skills).map(([skillId, data]) => (
                <div key={skillId} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-200 capitalize">
                      {skillId.replace('-', ' ')}
                    </span>
                    <span className="font-semibold text-purple-400">
                      {data.competency}% ({data.xp} XP)
                    </span>
                  </div>
                  <div className="w-full bg-[#101221] h-2.5 rounded-full overflow-hidden border border-[#222749]">
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

        {/* Right / Sidebar Column: Extra Details & Quick Stats */}
        <div className="space-y-6">
          {/* Milestone card matching screenshot */}
          <div className="p-6 rounded-3xl bg-[#141728] border border-[#232742] space-y-4 shadow-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              YOUR NEXT MILESTONE
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Hello, Level 5.</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Keep exploring. You&apos;re just 320 XP away from your next level.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <div className="w-full bg-[#101221] h-2 rounded-full overflow-hidden border border-[#222749]">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-3/4 rounded-full" />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>1,350 XP</span>
                <span>1,605 XP</span>
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
              <span>Explore dream paths</span>
              <span>→</span>
            </button>
          </div>

          {/* Stats summary row boxes */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#141728] border border-[#232742] text-center shadow-lg">
              <div className="text-xl font-black text-indigo-400">
                {totalXp.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mt-1">Total XP</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141728] border border-[#232742] text-center shadow-lg">
              <div className="text-xl font-black text-amber-400">
                {profile.missionsCompleted}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mt-1">Missions</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141728] border border-[#232742] text-center shadow-lg">
              <div className="text-xl font-black text-emerald-400">
                {profile.streakDays}d
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mt-1">Streak</div>
            </div>
          </div>

          {/* Safe status card matching screenshot */}
          <div className="p-6 rounded-3xl bg-[#141728] border border-[#232742] space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span>🛡️</span>
              <span>Safe to be yourself</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your account is parent supervised. Learning limits and safety settings are managed in Parent Space.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span>🔒 Private profile • Protected learning</span>
            </div>
            <button className="w-full mt-2 py-2.5 rounded-2xl bg-[#1b203c] hover:bg-[#252c52] text-slate-200 text-xs font-bold border border-[#2e3663] transition-all flex items-center justify-center gap-2">
              <span>Go to Parent Space</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}