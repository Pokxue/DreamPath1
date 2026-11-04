'use client';

import React from 'react';
import {
  ShieldCheck,
  Scale,
  HeartPulse,
  Code2,
  Flame,
  Compass,
  Lock,
  Download,
  Sparkles
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS } from '@/types/career';

export default function AchievementsPage() {
  const { profile, achievements, totalXp } = useProgressionStore();
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Scale':
        return Scale;
      case 'HeartPulse':
        return HeartPulse;
      case 'Code2':
        return Code2;
      case 'Flame':
        return Flame;
      case 'Compass':
        return Compass;
      default:
        return Sparkles;
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          YOUR COLLECTION
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Recent achievements
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
          Badges recognize mastery of ethical choices, algorithmic reasoning, and medical triage.
        </p>
      </div>

      {/* Badges Grid matching Figma design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                item.unlocked
                  ? 'bg-[#0e1224] border-[#1e233d] hover:border-indigo-500/50'
                  : 'bg-[#0a0d1b]/60 border-[#151930] opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      item.unlocked
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.unlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      item.unlocked
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    {item.tier}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1b203c] flex items-center justify-between text-xs">
                <span className="text-slate-500">Status</span>
                <span
                  className={`font-semibold ${
                    item.unlocked ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {item.unlocked ? `Unlocked • ${item.unlockedAt || 'Recent'}` : 'Locked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verifiable Certificate Generator Section */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#121630] via-[#161c40] to-[#121630] border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
            OFFICIAL ACCREDITATION
          </div>
          <h2 className="text-2xl font-black text-white">
            {tier.name} Pathfinder Certificate
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Issued to <span className="font-bold text-white">{profile.name}</span> for completing{' '}
            {profile.missionsCompleted} career exploration missions with {totalXp.toLocaleString()} XP.
          </p>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Certificate</span>
        </button>
      </div>
    </div>
  );
}

