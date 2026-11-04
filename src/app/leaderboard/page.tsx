'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, TrendingUp, DollarSign, Award, Flame, Sparkles } from 'lucide-react';
import { LEADERBOARD_ENTRIES } from '@/data/leaderboard';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function LeaderboardPage() {
  const { profile, totalXp, simulatedSalary } = useProgressionStore();

  const userEntry = {
    rank: 18,
    initial: profile.avatarChar,
    name: `${profile.name} (YOU)`,
    careerTitle: profile.activeCareerId.replace('-', ' '),
    pointsXp: totalXp,
    earningsUsd: simulatedSalary,
    isCurrentUser: true,
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header matching Figma */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          GLOBAL LEADERBOARD
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Top Dreamers
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
          Points and virtual earnings reward learning, consistency, and smart decisions—not screen time.
        </p>
      </div>

      {/* 3 Overview Stat Badges matching Figma */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            GLOBAL RANK
          </div>
          <div className="mt-2 text-3xl font-black text-white">#18</div>
          <div className="mt-2 text-xs text-indigo-400 font-semibold">
            Top 18% of all students
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            TOTAL POINTS
          </div>
          <div className="mt-2 text-3xl font-black text-white">
            {totalXp.toLocaleString()} XP
          </div>
          <div className="mt-2 text-xs text-amber-400 font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{profile.streakDays} day streak</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            VIRTUAL EARNINGS
          </div>
          <div className="mt-2 text-3xl font-black text-emerald-400">
            ${simulatedSalary.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Simulated career monthly salary
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-3xl bg-[#0e1224] border border-[#1e233d] overflow-hidden">
        <div className="p-5 border-b border-[#1b203c] grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-6 sm:col-span-7">RANK & DREAMER</div>
          <div className="col-span-3 sm:col-span-3 text-right">POINTS</div>
          <div className="col-span-3 sm:col-span-2 text-right">EARNINGS</div>
        </div>

        <div className="divide-y divide-[#171b34]">
          {LEADERBOARD_ENTRIES.map((entry) => (
            <div
              key={entry.rank}
              className="p-4 sm:p-5 grid grid-cols-12 items-center hover:bg-[#12162f] transition-colors"
            >
              <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
                <span
                  className={`w-6 text-center text-sm font-extrabold ${
                    entry.rank === 1
                      ? 'text-amber-400'
                      : entry.rank === 2
                      ? 'text-slate-300'
                      : entry.rank === 3
                      ? 'text-amber-600'
                      : 'text-slate-500'
                  }`}
                >
                  {entry.rank}
                </span>

                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 font-black border border-indigo-500/30 flex items-center justify-center text-sm">
                  {entry.initial}
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{entry.name}</div>
                  <div className="text-xs text-slate-400 capitalize">{entry.careerTitle}</div>
                </div>
              </div>

              <div className="col-span-3 sm:col-span-3 text-right font-bold text-sm text-indigo-300">
                {entry.pointsXp.toLocaleString()} XP
              </div>

              <div className="col-span-3 sm:col-span-2 text-right font-bold text-sm text-emerald-400">
                ${entry.earningsUsd.toLocaleString()}
              </div>
            </div>
          ))}

          {/* Sticky Current User Highlight Row */}
          <div className="p-4 sm:p-5 grid grid-cols-12 items-center bg-indigo-950/40 border-t-2 border-indigo-500/50">
            <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
              <span className="w-6 text-center text-sm font-extrabold text-indigo-400">
                {userEntry.rank}
              </span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow">
                {userEntry.initial}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>{userEntry.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500 text-white font-black">
                    YOU
                  </span>
                </div>
                <div className="text-xs text-indigo-300 capitalize">
                  {userEntry.careerTitle}
                </div>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-3 text-right font-extrabold text-sm text-amber-300">
              {userEntry.pointsXp.toLocaleString()} XP
            </div>

            <div className="col-span-3 sm:col-span-2 text-right font-extrabold text-sm text-emerald-400">
              ${userEntry.earningsUsd.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

