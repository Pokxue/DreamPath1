'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Code2,
  Scale,
  Stethoscope,
  Palette,
  UtensilsCrossed,
  Award,
  Zap,
  Volume2,
  Heart,
  Wrench,
  AlertCircle
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { CAREER_PATHS, EDUCATION_TIERS } from '@/types/career';
import { speakText, playSound } from '@/utils/sound';

export default function DashboardHomePage() {
  const {
    profile,
    totalXp,
    completedQuests,
    completeQuest,
    setActiveCareer
  } = useProgressionStore();

  const [questStarted, setQuestStarted] = useState(false);
  const [selectedFix, setSelectedFix] = useState<'correct' | 'wrong' | null>(null);
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

  const tier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.aurora;

  const activeCareer =
    CAREER_PATHS.find((c) => c.id === profile.activeCareerId) || CAREER_PATHS[0];

  const handleStartDailyQuest = () => {
    playSound('click');
    setQuestStarted(true);
    setSelectedFix(null);
    if (profile.readAloudEnabled) {
      speakText(
        "Mission: Fix the missing button. A small part of the school website disappeared. Pick the right code block to bring it back!"
      );
    }
  };

  const handleSelectOption = (option: 'correct' | 'wrong') => {
    playSound('click');
    setSelectedFix(option);
  };

  const handleFinishQuest = () => {
    playSound('success');
    completeQuest('quest-btn-1', 80);
    setQuestStarted(false);
    setSelectedFix(null);
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

  const cardBg = isDarkMode
    ? 'bg-[#16172B] border-[#2E3254]'
    : 'bg-white border-slate-200 shadow-sm';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-[#94A3B8]' : 'text-slate-600';
  const trackBg = isDarkMode ? 'bg-[#1F213D]' : 'bg-slate-200';

  return (
    <div
      ref={containerRef}
      className={`space-y-8 animate-fade-in transition-colors duration-200 ${headingText}`}
    >
      <section
        className={`relative overflow-hidden rounded-[24px] border p-6 sm:p-10 transition-colors duration-200 ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#171a33] via-[#1b1c43] to-[#251b47] border-[#2E3254] shadow-2xl'
            : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-sky-50 border-indigo-200/80 shadow-sm'
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-400/20'
          }`}
        />
        <div
          className={`absolute -bottom-10 -left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isDarkMode ? 'bg-amber-500/10' : 'bg-amber-400/20'
          }`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border mb-4 ${
                isDarkMode
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  : 'bg-white/80 text-indigo-600 border-indigo-200 shadow-xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>YOUR NEXT ADVENTURE</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Every dream starts with a{' '}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isDarkMode
                    ? 'from-amber-300 via-pink-400 to-indigo-300'
                    : 'from-amber-500 via-pink-500 to-indigo-600'
                }`}
              >
                small step.
              </span>
            </h2>

            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed ${
                isDarkMode ? 'text-[#94A3B8]' : 'text-slate-600'
              }`}
            >
              Explore real-world careers through playful missions made just for your{' '}
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {tier.name}
              </span>{' '}
              level. Earn simulated salary, build verifiable skills, and master your path.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <Link
                href={`/paths/mission?career=${activeCareer.id}`}
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-bold shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Continue your journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/paths"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold border transition-all ${
                  isDarkMode
                    ? 'bg-[#16172B] hover:bg-[#1F213D] text-slate-200 border-[#2E3254]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                }`}
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
                  className={`p-3 rounded-full border transition-colors ${
                    isDarkMode
                      ? 'bg-indigo-900/30 border-indigo-500/30 text-indigo-300 hover:text-white'
                      : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 shadow-xs'
                  }`}
                  title="Read aloud banner"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="relative w-80 h-72 flex-shrink-0 hidden sm:flex items-center justify-center">
            <div className="absolute top-4 right-8 animate-pulse z-20">
              <Sparkles
                className={`w-6 h-6 ${
                  isDarkMode
                    ? 'text-indigo-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                }`}
              />
            </div>

            <div
              className={`absolute w-72 h-44 rounded-[100%] border transform -rotate-12 scale-100 pointer-events-none ${
                isDarkMode ? 'border-indigo-400/30' : 'border-indigo-400/40'
              }`}
            />
            <div
              className={`absolute w-64 h-36 rounded-[100%] border transform rotate-35 scale-95 pointer-events-none ${
                isDarkMode ? 'border-indigo-300/25' : 'border-purple-400/35'
              }`}
            />

            <div
              className={`relative z-10 w-48 h-48 rounded-full flex items-center justify-center border overflow-hidden ${
                isDarkMode
                  ? 'bg-gradient-to-br from-[#686de0] via-[#4834d4] to-[#130f40] shadow-[inset_-18px_-18px_35px_rgba(0,0,0,0.6),0_20px_40px_rgba(31,22,79,0.7)] border-indigo-400/30'
                  : 'bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#3730a3] shadow-[inset_-14px_-14px_28px_rgba(30,27,75,0.45),0_20px_35px_rgba(99,102,241,0.3)] border-indigo-300'
              }`}
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/20 blur-md pointer-events-none" />
            </div>

            <div
              className={`absolute left-2 top-16 z-20 p-3 rounded-2xl backdrop-blur-md border flex items-center justify-center ${
                isDarkMode
                  ? 'bg-[#1e1e3f]/90 border-indigo-400/40 text-indigo-300 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                  : 'bg-white/95 border-indigo-200 text-indigo-600 shadow-lg shadow-indigo-500/10'
              }`}
            >
              <Code2 className="w-5 h-5" />
            </div>

            <div
              className={`absolute right-4 bottom-8 z-20 p-3 rounded-2xl backdrop-blur-md border flex items-center justify-center ${
                isDarkMode
                  ? 'bg-[#1e1e3f]/90 border-pink-500/40 text-pink-400 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                  : 'bg-white/95 border-pink-200 text-pink-500 shadow-lg shadow-pink-500/10'
              }`}
            >
              <Heart className="w-5 h-5 fill-pink-500/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className={`p-6 rounded-[20px] border relative overflow-hidden group hover:border-indigo-500/50 transition-all ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${subText}`}>TOTAL XP</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/30">
              +120 this week
            </span>
          </div>
          <div className={`mt-3 text-3xl font-black ${headingText}`}>{totalXp.toLocaleString()}</div>
          <div className={`mt-2 text-xs flex items-center gap-1.5 ${subText}`}>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            <span>Next milestone at 1,500 XP</span>
          </div>
          <div className={`mt-3 w-full h-2 rounded-full overflow-hidden ${trackBg}`}>
            <div
              className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalXp / 1500) * 100)}%` }}
            />
          </div>
        </div>

        <div className={`p-6 rounded-[20px] border relative overflow-hidden group hover:border-indigo-500/50 transition-all ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${subText}`}>MISSIONS DONE</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 font-bold border border-indigo-500/30">
              Top 18%
            </span>
          </div>
          <div className={`mt-3 text-3xl font-black ${headingText}`}>{profile.missionsCompleted}</div>
          <div className={`mt-2 text-xs flex items-center gap-1.5 ${subText}`}>
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Level 4 Pathfinder Rank</span>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= 4 ? 'bg-[#F59E0B]' : trackBg
                }`}
              />
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-[20px] border relative overflow-hidden group hover:border-indigo-500/50 transition-all ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${subText}`}>LEARNING TIME</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/30">
              Healthy pace
            </span>
          </div>
          <div className={`mt-3 text-3xl font-black ${headingText}`}>4h 32m</div>
          <div className={`mt-2 text-xs flex items-center gap-1.5 ${subText}`}>
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{profile.screenTimeUsedMinutes} of {profile.screenTimeMaxMinutes} mins today</span>
          </div>
          <div className={`mt-3 w-full h-2 rounded-full overflow-hidden ${trackBg}`}>
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
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-500">CHOOSE YOUR JOURNEY</div>
            <h3 className={`text-2xl font-bold tracking-tight ${headingText}`}>Explore dream paths</h3>
          </div>
          <Link
            href="/paths"
            className="text-sm font-semibold text-sky-500 hover:underline flex items-center gap-1"
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
                onClick={() => {
                  setActiveCareer(career.id);
                  playSound('click');
                }}
                className={`p-6 rounded-[20px] border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isDarkMode
                    ? isCurrent
                      ? 'bg-[#16172B] border-indigo-500 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                      : 'bg-[#16172B] border-[#2E3254] hover:border-[#3E4472]'
                    : isCurrent
                    ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg border ${
                        isDarkMode
                          ? 'bg-[#1F213D] text-[#38BDF8] border-[#2E3254]'
                          : 'bg-sky-50 text-sky-600 border-sky-200'
                      }`}
                    >
                      {career.stageInfo}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4
                    className={`text-lg font-bold transition-colors ${
                      isDarkMode
                        ? 'text-white group-hover:text-indigo-300'
                        : 'text-slate-900 group-hover:text-indigo-600'
                    }`}
                  >
                    {career.title}
                  </h4>
                  <p className={`mt-1 text-sm line-clamp-2 ${subText}`}>{career.subtitle}</p>

                  <div className="mt-5 space-y-1.5">
                    <div className={`flex items-center justify-between text-xs ${subText}`}>
                      <span>Path progress</span>
                      <span className={`font-bold ${headingText}`}>{career.progressPercent}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${trackBg}`}>
                      <div
                        className="bg-gradient-to-r from-[#38BDF8] to-[#3B82F6] h-full rounded-full transition-all"
                        style={{ width: `${career.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between ${
                    isDarkMode ? 'border-[#2E3254]/50' : 'border-slate-100'
                  }`}
                >
                  <div className={`text-xs ${subText}`}>
                    Base: <span className="font-bold text-[#10B981]">${career.baseSalary}/mo</span>
                  </div>
                  <Link
                    href={`/paths/mission?career=${career.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCareer(career.id);
                      playSound('click');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all inline-block ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-md'
                        : isDarkMode
                        ? 'bg-[#1F213D] hover:bg-[#2A2E52] text-indigo-300 border border-[#2E3254]'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200'
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

      <section>
        <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden flex flex-col justify-between ${cardBg}`}>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-[10px] font-bold uppercase tracking-wider">
                  TODAY'S DAILY QUEST
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-500">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>UI Bug Fix</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    isDarkMode ? 'bg-[#1F213D] text-[#94A3B8]' : 'bg-slate-100 text-slate-600'
                  }`}
                >
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

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className={`text-2xl font-bold ${headingText}`}>Fix the missing button</h3>
                <p className={`mt-1.5 text-sm sm:text-base leading-relaxed max-w-2xl ${subText}`}>
                  A small part of the school website disappeared. Use your logic to pick the right HTML tag and restore the action button!
                </p>
              </div>

              {!questStarted && !isQuestDone && (
                <button
                  onClick={handleStartDailyQuest}
                  className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-purple-900/20 transition-all hover:scale-105 active:scale-95"
                >
                  Start mission ▷
                </button>
              )}

              {isQuestDone && (
                <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold border border-[#10B981]/30">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Mission Completed (+80 XP)</span>
                </div>
              )}
            </div>
          </div>

          {questStarted && (
            <div
              className={`mt-6 p-5 rounded-[18px] border space-y-4 ${
                isDarkMode ? 'bg-[#0B0C15] border-[#2E3254]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">
                  Interactive Quest Console — Broken Code
                </span>
                <button
                  onClick={() => setQuestStarted(false)}
                  className={`text-xs hover:underline ${subText}`}
                >
                  Cancel
                </button>
              </div>

              <div className="p-4 bg-[#060814] rounded-[12px] font-mono text-xs border border-[#2E3254] space-y-1.5">
                <div className="text-slate-400">&lt;div class="welcome-card"&gt;</div>
                <div className="pl-4 text-slate-200">&lt;h1&gt;Welcome Students!&lt;/h1&gt;</div>
                <div className="pl-4 text-amber-400">
                  {selectedFix === 'correct'
                    ? '<button class="btn-primary">Start learning</button>'
                    : selectedFix === 'wrong'
                    ? '<p>Start learning</p>   // ❌ Not clickable!'
                    : '<!-- MISSING: Add clickable button here -->'}
                </div>
                <div className="text-slate-400">&lt;/div&gt;</div>
              </div>

              <div>
                <p className={`text-xs font-semibold mb-2.5 ${headingText}`}>
                  Choose the correct snippet to fix the missing button:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSelectOption('correct')}
                    className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                      selectedFix === 'correct'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                        : isDarkMode
                        ? 'border-[#2E3254] bg-[#16172B] text-slate-300 hover:border-indigo-500/50'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    &lt;button&gt;Start learning&lt;/button&gt;
                  </button>

                  <button
                    onClick={() => handleSelectOption('wrong')}
                    className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                      selectedFix === 'wrong'
                        ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                        : isDarkMode
                        ? 'border-[#2E3254] bg-[#16172B] text-slate-300 hover:border-indigo-500/50'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    &lt;p&gt;Start learning&lt;/p&gt;
                  </button>
                </div>
              </div>

              {selectedFix === 'wrong' && (
                <div className="flex items-center gap-2 text-xs text-rose-500 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Close! A &lt;p&gt; tag only creates plain text. Try the clickable button tag!</span>
                </div>
              )}

              {selectedFix === 'correct' && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs font-semibold text-emerald-500">
                    ✓ Great job! The button is restored and clickable now.
                  </span>
                  <button
                    onClick={handleFinishQuest}
                    className="px-5 py-2.5 rounded-full bg-[#10B981] hover:opacity-90 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete mission & claim +80 XP</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <div
            className={`mt-6 pt-4 border-t flex items-center justify-between ${
              isDarkMode ? 'border-[#2E3254]/50' : 'border-slate-100'
            }`}
          >
            <div className={`text-xs flex items-center gap-2 ${subText}`}>
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span>Logic & problem solving</span>
            </div>
            <span className={`text-xs ${subText}`}>
              {isQuestDone ? '1 / 1 daily quest completed' : '0 / 1 daily quest completed'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}