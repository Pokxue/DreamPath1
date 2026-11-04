'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  Code2,
  Scale,
  Stethoscope,
  Palette,
  UtensilsCrossed,
  Shield,
  Award,
  Zap,
  Volume2
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { CAREER_PATHS, EDUCATION_TIERS } from '@/types/career';
import { speakText, playSound } from '@/utils/sound';

export default function HomePage() {
  const {
    profile,
    totalXp,
    simulatedSalary,
    completedQuests,
    completeQuest,
    skills,
    setActiveCareer
  } = useProgressionStore();

  const [questStarted, setQuestStarted] = useState(false);
  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;

  const activeCareer =
    CAREER_PATHS.find((c) => c.id === profile.activeCareerId) || CAREER_PATHS[0];

  const handleStartDailyQuest = () => {
    playSound('click');
    setQuestStarted(true);
    if (profile.readAloudEnabled) {
      speakText(
        "Mission: Fix the missing button. A small part of the school website disappeared. Use your logic to bring it back!"
      );
    }
  };

  const handleFinishQuest = () => {
    playSound('success');
    completeQuest('quest-btn-1', 80);
    setQuestStarted(false);
  };

  const getCareerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Scale':
        return Scale;
      case 'Stethoscope':
        return Stethoscope;
      case 'Palette':
        return Palette;
      case 'UtensilsCrossed':
        return UtensilsCrossed;
      default:
        return Sparkles;
    }
  };

  const isQuestDone = completedQuests.includes('quest-btn-1');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner Section matching Figma styling */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171a33] via-[#1b1c43] to-[#251b47] border border-[#2b2f56] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider uppercase border border-indigo-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>YOUR NEXT ADVENTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Every dream starts with a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300">
              small step.
            </span>
          </h2>

          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore real-world careers through playful missions made just for your{' '}
            <span className="font-semibold text-white">{tier.name}</span> level. Earn simulated salary, build verifiable skills, and master your path.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <Link
              href={`/simulation?career=${activeCareer.id}`}
              onClick={() => playSound('click')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Continue your journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/paths"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#141830] hover:bg-[#1a1f3d] text-slate-200 font-semibold border border-[#2b3360] transition-all"
            >
              <span>Explore all paths</span>
            </Link>

            {profile.readAloudEnabled && (
              <button
                onClick={() =>
                  speakText(
                    "Welcome to your Dream Dashboard. Explore real world careers through playful missions made just for your level!"
                  )
                }
                className="p-3 rounded-2xl bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 hover:text-white"
                title="Read aloud banner"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3 Metric Summary Cards matching Figma layout */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Total XP */}
        <div className="p-6 rounded-2xl bg-custom-card border border-[#1e233d] relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">TOTAL XP</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              +120 this week
            </span>
          </div>
          <div className="mt-3 text-3xl font-black text-white">{totalXp.toLocaleString()}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next milestone at 1,500 XP</span>
          </div>
          <div className="mt-3 w-full bg-[#1b1f3b] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalXp / 1500) * 100)}%` }}
            />
          </div>
        </div>

        {/* Missions Done */}
        <div className="p-6 rounded-2xl bg-custom-card border border-[#1e233d] relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">MISSIONS DONE</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">
              Top 18%
            </span>
          </div>
          <div className="mt-3 text-3xl font-black text-white">{profile.missionsCompleted}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Level 4 Pathfinder Rank</span>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= 4 ? 'bg-amber-400' : 'bg-[#1b1f3b]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Learning Time */}
        <div className="p-6 rounded-2xl bg-custom-card border border-[#1e233d] relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">LEARNING TIME</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              Healthy pace
            </span>
          </div>
          <div className="mt-3 text-3xl font-black text-white">4h 32m</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profile.screenTimeUsedMinutes} of {profile.screenTimeMaxMinutes} mins today</span>
          </div>
          <div className="mt-3 w-full bg-[#1b1f3b] h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{
                width: `${(profile.screenTimeUsedMinutes / profile.screenTimeMaxMinutes) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Choose your journey / Explore dream paths */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">CHOOSE YOUR JOURNEY</div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Explore dream paths</h3>
          </div>
          <Link
            href="/paths"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View all paths</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAREER_PATHS.slice(0, 3).map((career) => {
            const Icon = getCareerIcon(career.icon);
            const isCurrent = profile.activeCareerId === career.id;
            return (
              <div
                key={career.id}
                onClick={() => setActiveCareer(career.id)}
                className={`p-6 rounded-2xl bg-custom-card border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isCurrent
                    ? 'border-indigo-500 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                    : 'border-[#1e233d] hover:border-[#2d355c]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#181d39] text-indigo-300 border border-[#2b3360]">
                      {career.stageInfo}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {career.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-400 line-clamp-2">{career.subtitle}</p>

                  <div className="mt-5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Path progress</span>
                      <span className="font-bold text-white">{career.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#1b1f3b] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${career.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1b1f38] flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Base: <span className="font-bold text-emerald-400">${career.baseSalary}/mo</span>
                  </div>
                  <Link
                    href={`/simulation?career=${career.id}`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-[#181d39] hover:bg-[#20264b] text-indigo-300 border border-[#2b3360]'
                    }`}
                  >
                    {isCurrent ? 'Continue mission' : 'Explore path'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom 2-Column Split: Daily Quest & Parent Space info */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Daily Quest Card (2 Cols) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121630] to-[#151a3a] border border-[#222955] relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-extrabold uppercase">
                MISSION 08
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1f2652] text-slate-300">
                  10 min
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                  +80 XP
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  Beginner
                </span>
              </div>
            </div>

            <div className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-1">
              TODAY'S DAILY QUEST
            </div>
            <h3 className="text-2xl font-black text-white">Fix the missing button</h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              A small part of the school website disappeared. Use your logic and HTML skills to bring it back and verify accessibility labels.
            </p>

            {questStarted && (
              <div className="mt-5 p-4 rounded-2xl bg-[#0b0e22] border border-indigo-500/40 space-y-3">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  Interactive Quest Console
                </div>
                <div className="p-3 bg-[#060814] rounded-xl font-mono text-xs text-emerald-300 border border-[#1e254d]">
                  &lt;button type="submit" aria-label="Enroll Course"&gt;Join Study Club&lt;/button&gt;
                </div>
                <p className="text-xs text-slate-300">
                  Click the button below to assemble the HTML element and inject it into the school portal:
                </p>
                <button
                  onClick={handleFinishQuest}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Deploy & Claim +80 XP</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e254e] flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Skill Focus: Problem Solving & HTML</span>
            </div>

            {isQuestDone ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Mission Completed</span>
              </div>
            ) : !questStarted ? (
              <button
                onClick={handleStartDailyQuest}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Start mission
              </button>
            ) : null}
          </div>
        </div>

        {/* Parent Space Widget matching Figma */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                PARENT SPACE
              </span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>

            <h4 className="text-lg font-bold text-white">Healthy progress</h4>
            <p className="mt-1 text-xs text-slate-400">
              Clear learning supervision for {profile.name} without intrusive monitoring.
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-[#141933] border border-[#212952] flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-indigo-300 leading-none">
                  {profile.screenTimeUsedMinutes}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">min</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  TODAY'S SCREEN TIME
                </div>
                <div className="text-sm font-bold text-white">
                  {profile.screenTimeUsedMinutes} of {profile.screenTimeMaxMinutes} minutes
                </div>
                <div className="text-xs text-emerald-400">
                  {profile.screenTimeMaxMinutes - profile.screenTimeUsedMinutes} minutes remaining
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-[#12162c] border border-[#1e2342]">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                TOP INTEREST THIS WEEK
              </div>
              <div className="text-sm font-bold text-white mt-1">
                Technology & problem solving
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1b203c]">
            <Link
              href="/parent"
              className="w-full block py-2.5 text-center rounded-xl bg-[#161c3a] hover:bg-[#1f2752] text-indigo-300 font-bold text-xs border border-[#2a3466] transition-all"
            >
              View supervision dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
