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
  Volume2,
  Heart
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
    <div className="space-y-8 animate-fade-in text-white">
      <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#171a33] via-[#1b1c43] to-[#251b47] border border-[#2E3254] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold tracking-wider uppercase border border-indigo-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>YOUR NEXT ADVENTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Every dream starts with a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300">
                small step.
              </span>
            </h2>

            <p className="mt-3 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Explore real-world careers through playful missions made just for your{' '}
              <span className="font-semibold text-white">{tier.name}</span> level. Earn simulated salary, build verifiable skills, and master your path.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <Link
                href={`/simulation?career=${activeCareer.id}`}
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-bold shadow-lg shadow-purple-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Continue your journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/paths"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#16172B] hover:bg-[#1F213D] text-slate-200 font-semibold border border-[#2E3254] transition-all"
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
                  className="p-3 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 hover:text-white"
                  title="Read aloud banner"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="relative w-80 h-72 flex-shrink-0 hidden sm:flex items-center justify-center">
            <div className="absolute top-4 right-8 text-indigo-200 animate-pulse z-20">
              <Sparkles className="w-6 h-6 text-indigo-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>

            <div className="absolute w-72 h-44 rounded-[100%] border border-indigo-400/30 transform -rotate-12 scale-100 pointer-events-none" />
            <div className="absolute w-64 h-36 rounded-[100%] border border-indigo-300/25 transform rotate-35 scale-95 pointer-events-none" />

            <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-[#686de0] via-[#4834d4] to-[#130f40] shadow-[inset_-18px_-18px_35px_rgba(0,0,0,0.6),0_20px_40px_rgba(31,22,79,0.7)] flex items-center justify-center border border-indigo-400/30 overflow-hidden">
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-indigo-300/10 blur-md pointer-events-none" />
            </div>

            <div className="absolute left-2 top-16 z-20 p-3 rounded-2xl bg-[#1e1e3f]/90 backdrop-blur-md border border-indigo-400/40 text-indigo-300 shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-indigo-300" />
            </div>

            <div className="absolute right-4 bottom-8 z-20 p-3 rounded-2xl bg-[#1e1e3f]/90 backdrop-blur-md border border-pink-500/40 text-pink-400 shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 rounded-[20px] bg-[#16172B] border border-[#2E3254] relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">TOTAL XP</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/30">
              +120 this week
            </span>
          </div>
          <div className="mt-3 text-3xl font-black text-white">{totalXp.toLocaleString()}</div>
          <div className="mt-2 text-xs text-[#94A3B8] flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next milestone at 1,500 XP</span>
          </div>
          <div className="mt-3 w-full bg-[#1F213D] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalXp / 1500) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-[20px] bg-[#16172B] border border-[#2E3254] relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">MISSIONS DONE</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
              Top 18%
            </span>
          </div>
          <div className="mt-3 text-3xl font-black text-white">{profile.missionsCompleted}</div>
          <div className="mt-2 text-xs text-[#94A3B8] flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Level 4 Pathfinder Rank</span>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= 4 ? 'bg-[#F59E0B]' : 'bg-[#1F213D]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 rounded-[20px] bg-[#16172B] border border-[#2E3254] relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">LEARNING TIME</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/30">
              Healthy pace
            </span>
          </div>
          <div className="mt-3 text-3xl font-black text-white">4h 32m</div>
          <div className="mt-2 text-xs text-[#94A3B8] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profile.screenTimeUsedMinutes} of {profile.screenTimeMaxMinutes} mins today</span>
          </div>
          <div className="mt-3 w-full bg-[#1F213D] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#10B981] h-full rounded-full transition-all duration-500"
              style={{
                width: `${(profile.screenTimeUsedMinutes / profile.screenTimeMaxMinutes) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">CHOOSE YOUR JOURNEY</div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Explore dream paths</h3>
          </div>
          <Link
            href="/paths"
            className="text-sm font-semibold text-[#38BDF8] hover:underline flex items-center gap-1"
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
                className={`p-6 rounded-[20px] bg-[#16172B] border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isCurrent
                    ? 'border-indigo-500 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                    : 'border-[#2E3254] hover:border-[#3E4472]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg bg-[#1F213D] text-[#38BDF8] border border-[#2E3254]">
                      {career.stageInfo}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {career.title}
                  </h4>
                  <p className="mt-1 text-sm text-[#94A3B8] line-clamp-2">{career.subtitle}</p>

                  <div className="mt-5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>Path progress</span>
                      <span className="font-bold text-white">{career.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#1F213D] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#38BDF8] to-[#3B82F6] h-full rounded-full transition-all"
                        style={{ width: `${career.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#2E3254]/50 flex items-center justify-between">
                  <div className="text-xs text-[#94A3B8]">
                    Base: <span className="font-bold text-[#10B981]">${career.baseSalary}/mo</span>
                  </div>
                  <Link
                    href={`/simulation?career=${career.id}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-md'
                        : 'bg-[#1F213D] hover:bg-[#2A2E52] text-indigo-300 border border-[#2E3254]'
                    }`}
                  >
                    {isCurrent ? 'Continue mission ▷' : 'Explore path ▷'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-[24px] bg-[#16172B] border border-[#2E3254] relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-[10px] font-bold uppercase">
                TODAY'S DAILY QUEST
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1F213D] text-[#94A3B8] font-bold">
                  10 min
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] font-bold">
                  +80 XP
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold">
                  Beginner
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white">Fix the missing button</h3>
            <p className="mt-2 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              A small part of the school website disappeared. Use your logic to bring it back.
            </p>

            {questStarted && (
              <div className="mt-5 p-4 rounded-[16px] bg-[#0B0C15] border border-[#2E3254] space-y-3">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  Interactive Quest Console
                </div>
                <div className="p-3 bg-[#060814] rounded-[12px] font-mono text-xs text-emerald-300 border border-[#2E3254]">
                  &lt;button&gt;Start learning&lt;/button&gt;
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Click the button below to complete your daily challenge:
                </p>
                <button
                  onClick={handleFinishQuest}
                  className="px-4 py-2 rounded-full bg-[#10B981] hover:opacity-90 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete mission ✓</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2E3254]/50 flex items-center justify-between">
            <div className="text-xs text-[#94A3B8] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span>Logic & problem solving</span>
            </div>

            {isQuestDone ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold border border-[#10B981]/30">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Mission Completed</span>
              </div>
            ) : !questStarted ? (
              <button
                onClick={handleStartDailyQuest}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Start mission ▷
              </button>
            ) : null}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-[24px] bg-[#16172B] border border-[#2E3254] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                PARENT SPACE
              </span>
              <Shield className="w-4 h-4 text-[#10B981]" />
            </div>

            <h4 className="text-lg font-bold text-white">Healthy progress</h4>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Clear learning supervision for {profile.name}.
            </p>

            <div className="mt-5 p-4 rounded-[16px] bg-[#1F213D] border border-[#2E3254] flex items-center gap-4">
              <div className="w-14 h-14 rounded-[12px] bg-indigo-600/20 border border-indigo-500/30 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-indigo-300 leading-none">
                  {profile.screenTimeUsedMinutes}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-medium">min</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wide">
                  TODAY'S SCREEN TIME
                </div>
                <div className="text-sm font-bold text-white">
                  {profile.screenTimeUsedMinutes} of {profile.screenTimeMaxMinutes} minutes
                </div>
                <div className="text-xs text-[#10B981]">
                  {profile.screenTimeMaxMinutes - profile.screenTimeUsedMinutes} minutes remaining
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-[16px] bg-[#1F213D] border border-[#2E3254]">
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wide">
                TOP INTEREST THIS WEEK
              </div>
              <div className="text-sm font-bold text-white mt-1">
                Technology & problem solving
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2E3254]/50">
            <Link
              href="/parent"
              className="w-full block py-2.5 text-center rounded-full bg-[#1F213D] hover:bg-[#2A2E52] text-indigo-300 font-bold text-xs border border-[#2E3254] transition-all"
            >
              View supervision dashboard →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}