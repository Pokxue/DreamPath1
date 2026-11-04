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
  HelpCircle,
  Volume2
} from 'lucide-react';
import { CAREER_PATHS } from '@/types/career';
import { APTITUDE_QUESTIONS } from '@/data/aptitude';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { speakText, playSound } from '@/utils/sound';

export default function DreamPathsPage() {
  const { profile, setActiveCareer } = useProgressionStore();
  const [currentAptitudeIdx, setCurrentAptitudeIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [recommendedCareer, setRecommendedCareer] = useState<string | null>(null);

  const question = APTITUDE_QUESTIONS[currentAptitudeIdx];

  const handleSelectOption = (careerMatch: string, letter: string) => {
    playSound('click');
    const updated = { ...selectedAnswers, [question.id]: letter };
    setSelectedAnswers(updated);

    if (profile.readAloudEnabled) {
      speakText(`Selected option ${letter}`);
    }

    if (currentAptitudeIdx < APTITUDE_QUESTIONS.length - 1) {
      setCurrentAptitudeIdx(currentAptitudeIdx + 1);
    } else {
      playSound('success');
      setRecommendedCareer(careerMatch);
      setActiveCareer(careerMatch);
      if (profile.readAloudEnabled) {
        speakText("Based on your answers, we recommend exploring the Software Engineer and Technology path!");
      }
    }
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

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          DREAM DISCOVERY
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          What kind of problems excite you?
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
          A short interest and aptitude test helps recommend a path. Your answer is never used to limit your choices.
        </p>
      </div>

      {/* Aptitude Question Card matching Figma style */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1224] border border-[#1e233d] relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold uppercase tracking-wide text-indigo-400">
            Question {currentAptitudeIdx + 1} of {APTITUDE_QUESTIONS.length}
          </span>
          <div className="flex items-center gap-1.5">
            {APTITUDE_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`w-6 h-1.5 rounded-full ${
                  i <= currentAptitudeIdx ? 'bg-indigo-500' : 'bg-[#1b1f3b]'
                }`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
          {question.question}
        </h2>

        {profile.readAloudEnabled && (
          <button
            onClick={() => speakText(question.question)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <Volume2 className="w-4 h-4" />
            <span>Hear question</span>
          </button>
        )}

        <div className="mt-6 space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedAnswers[question.id] === opt.letter;
            return (
              <button
                key={opt.letter}
                onClick={() => handleSelectOption(opt.careerMatch, opt.letter)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500'
                    : 'bg-[#141830] border-[#222952] text-slate-200 hover:bg-[#1a2040] hover:border-indigo-500/40'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-[#1e254d] text-indigo-300 border border-[#2d376b]'
                  }`}
                >
                  {opt.letter}
                </div>
                <div className="flex-1 text-sm font-semibold leading-relaxed">
                  {opt.text}
                </div>
              </button>
            );
          })}
        </div>

        {recommendedCareer && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs uppercase font-extrabold">Recommended Match</div>
                <div className="text-sm font-bold text-white capitalize">
                  {recommendedCareer.replace('-', ' ')}
                </div>
              </div>
            </div>
            <Link
              href={`/simulation?career=${recommendedCareer}`}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              Start simulation
            </Link>
          </div>
        )}
      </div>

      {/* Or Explore Directly */}
      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            OR EXPLORE DIRECTLY
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Career simulations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAREER_PATHS.map((career) => {
            const Icon = getCareerIcon(career.icon);
            return (
              <div
                key={career.id}
                className="p-6 rounded-2xl bg-[#0f1224] border border-[#1e233d] hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#181d39] text-indigo-300 border border-[#2b3360]">
                      {career.stageInfo}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {career.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400 line-clamp-2">{career.subtitle}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {career.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#161b36] text-slate-300 border border-[#232b57]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1b1f38] flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Base: <span className="font-bold text-emerald-400">${career.baseSalary}/mo</span>
                  </div>
                  <Link
                    href={`/simulation?career=${career.id}`}
                    onClick={() => setActiveCareer(career.id)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    Open simulation
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

