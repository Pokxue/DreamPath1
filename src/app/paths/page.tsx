'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Scale,
  Stethoscope,
  Palette,
  UtensilsCrossed,
  CheckCircle2,
  Lock,
  Search,
  Compass
} from 'lucide-react';
import { CAREER_PATHS } from '@/types/career';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { playSound } from '@/utils/sound';

export default function DreamPathsPage() {
  const { profile, setActiveCareer } = useProgressionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'my-paths' | 'discover'>('my-paths');

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

  const filteredCareers = CAREER_PATHS.filter((career) =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-white animate-fade-in pb-12">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
          CHOOSE YOUR JOURNEY
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Dream Paths
        </h1>
        <p className="mt-1 text-[#94A3B8] text-sm leading-relaxed">
          Big possibilities. Small steps. Find the future that feels like you.
        </p>
      </div>

      <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#171a33] via-[#1b1c43] to-[#251b47] border border-[#2E3254] p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
            YOUR NEXT SMALL STEP
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            A little code. A big possibility.
          </h2>

          <p className="mt-2 text-[#94A3B8] text-sm leading-relaxed">
            Continue your Software Engineer journey with today's quest: fix the missing button in a school website.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <Link
              href={`/paths/mission?career=software-engineer`}
              onClick={() => {
                setActiveCareer('software-engineer');
                playSound('click');
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-bold text-sm shadow-xl shadow-purple-900/40 transition-all hover:scale-105 active:scale-95"
            >
              <span>Continue Mission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-[#94A3B8] flex items-center gap-1.5">
              <span>10 min</span>
              <span>•</span>
              <span className="text-[#F59E0B] font-bold">+80 XP</span>
            </span>
          </div>
        </div>

        <div className="relative mt-6 md:mt-0 flex items-center justify-center">
          <div className="w-44 h-44 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl" />
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 via-indigo-600 to-purple-900 shadow-inner relative flex items-center justify-center border border-indigo-400/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400/30 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-[-10px] border border-indigo-500/30 rounded-full rotate-[-15deg] pointer-events-none" />
            <div className="absolute top-2 right-4 w-3 h-3 bg-purple-300 rounded-full shadow-glow animate-pulse" />
            <div className="absolute bottom-2 left-4 w-2 h-2 bg-amber-400 rounded-full shadow-glow" />
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 bg-[#16172B] p-1.5 rounded-full border border-[#2E3254]">
          <button
            onClick={() => setActiveTab('my-paths')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'my-paths'
                ? 'bg-[#1F213D] text-white border border-[#2E3254]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            My paths • 3
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'discover'
                ? 'bg-[#1F213D] text-white border border-[#2E3254]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Discover
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search dream paths"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16172B] border border-[#2E3254] rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCareers.slice(0, 3).map((career) => {
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
                  <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {career.title}
                </h3>
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

              <div className="mt-6 pt-4 border-t border-[#2E3254]/50 flex items-center justify-end">
                <Link
                  href={`/paths/mission?career=${career.id}`}
                  onClick={() => {
                    setActiveCareer(career.id);
                    playSound('click');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
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

      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Your Software Engineer roadmap
          </h3>
          <span className="text-xs text-[#94A3B8]">3 of 8 stages reached</span>
        </div>

        <div className="p-6 sm:p-8 rounded-[24px] bg-[#16172B] border border-[#2E3254] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Meet your future</h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">Discover the world of code</p>
            </div>
            <div className="text-[11px] font-bold text-[#10B981] pt-1">Completed</div>
          </div>

          <div className="space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Think like a coder</h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">Patterns & problem solving</p>
            </div>
            <div className="text-[11px] font-bold text-[#10B981] pt-1">Completed</div>
          </div>

          <div className="space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Build something small</h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">Your first friendly study app</p>
            </div>
            <div className="text-[11px] font-bold text-indigo-400 pt-1">In progress</div>
          </div>

          <div className="space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#1F213D] border border-[#2E3254] flex items-center justify-center text-[#94A3B8]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400">Make it your own</h4>
              <p className="text-xs text-[#94A3B8]/60 mt-0.5">Unlock after stage 3</p>
            </div>
            <div className="text-[11px] font-bold text-[#94A3B8]/60 pt-1">Up next</div>
          </div>
        </div>
      </section>

      <section className="p-6 rounded-[24px] bg-gradient-to-r from-[#16172B] to-[#1F213D] border border-[#2E3254] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">You don't have to choose just one dream.</h4>
            <p className="text-xs text-[#94A3B8]">Try a new path whenever you're curious. Your progress will always be here.</p>
          </div>
        </div>
        <Link
          href="/paths"
          onClick={() => playSound('click')}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#0B0C15] font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>Discover more</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}