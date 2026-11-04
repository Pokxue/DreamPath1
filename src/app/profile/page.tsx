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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          YOUR IDENTITY
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Explorer profile
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
          Your personal information and complete journey in one place.
        </p>
      </div>

      {/* Main Profile Card matching Figma */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#1b203c] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
              {profile.avatarChar}
            </div>

            <div>
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-3 py-1 text-lg font-bold rounded-xl bg-[#141830] border border-indigo-500 text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                )}
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PRIMARY EXPLORER
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {profile.handle} • ID DR-10482
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-[#141830] hover:bg-[#1a2040] text-slate-300 text-xs font-bold border border-[#222a55] transition-all flex items-center gap-2"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel' : 'Edit profile'}</span>
          </button>
        </div>

        {/* 4 Detail Grid Cells matching Figma */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#141830] border border-[#20274e]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              AGE
            </div>
            <div className="text-base font-bold text-white mt-1">
              {profile.age} years old
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141830] border border-[#20274e]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              JOINED
            </div>
            <div className="text-base font-bold text-white mt-1">
              {profile.joinedDate}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141830] border border-[#20274e]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              ACTIVE PATH
            </div>
            <div className="text-base font-bold text-white mt-1 truncate">
              {activeCareer.title}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141830] border border-[#20274e]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              CURRENT LEVEL
            </div>
            <div className="text-base font-bold text-white mt-1 truncate">
              Level {profile.currentLevel} • Pathfinder
            </div>
          </div>
        </div>

        {/* 3 Metric Summary Boxes matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#101429] border border-[#1d2242] text-center">
            <div className="text-2xl font-black text-indigo-400">
              {totalXp.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Total XP</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#101429] border border-[#1d2242] text-center">
            <div className="text-2xl font-black text-amber-400">
              {profile.missionsCompleted}
            </div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Missions</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#101429] border border-[#1d2242] text-center">
            <div className="text-2xl font-black text-emerald-400">
              {profile.streakDays} days
            </div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Best streak</div>
          </div>
        </div>
      </div>

      {/* Skill Competencies from SPEC.md */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              COMPETENCY PORTFOLIO
            </div>
            <h3 className="text-xl font-bold text-white mt-1">Verifiable Skills</h3>
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
                <span className="font-semibold text-indigo-400">
                  {data.competency}% ({data.xp} XP)
                </span>
              </div>
              <div className="w-full bg-[#1b1f3b] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${data.competency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

