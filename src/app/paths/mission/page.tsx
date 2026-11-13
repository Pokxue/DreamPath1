'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Code2, HeartPulse, Medal, NotebookPen, Scale, Sparkles, Star, Trophy } from 'lucide-react';
import { CAREER_PATHS } from '@/types/career';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { playSound } from '@/utils/sound';

const doctorSteps = [
  { id: 'listen', label: 'Listen to Mika’s feelings', detail: '“Thank you for sharing. I’ll stay with you.”' },
  { id: 'notes', label: 'Write down what Mika shares', detail: 'Mika feels tired after playing and nervous about seeing the doctor.' },
  { id: 'doctor', label: 'Ask the supervising doctor for help', detail: 'Share the notes and let the doctor examine Mika.' },
];
const safeDoctorOrder = ['listen', 'notes', 'doctor'];

type JourneyStep = 1 | 2 | 3;

function CareerMission() {
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

  const params = useSearchParams();
  const requestedCareer = params.get('career') || 'software-engineer';
  const career = CAREER_PATHS.find((item) => item.id === requestedCareer && ['software-engineer', 'junior-lawyer', 'future-doctor'].includes(item.id)) || CAREER_PATHS[0];
  const isLawyer = career.id === 'junior-lawyer';
  const isDoctor = career.id === 'future-doctor';
  const isEngineer = !isLawyer && !isDoctor;
  const profile = useProgressionStore((state) => state.profile);
  const applyReward = useProgressionStore((state) => state.applyReward);
  const [step, setStep] = useState<JourneyStep>(1);
  const [answer, setAnswer] = useState<string | null>(null);
  const [doctorOrder, setDoctorOrder] = useState(['notes', 'listen', 'doctor']);
  const [rewarded, setRewarded] = useState(false);
  const correct = isDoctor
    ? doctorOrder.every((id, index) => id === safeDoctorOrder[index])
    : answer === (isLawyer ? 'fair' : 'button');
  const title = isLawyer ? 'Review a delivery contract' : isDoctor ? 'Help a patient feel comfortable' : 'Fix the missing button';
  const description = isLawyer
    ? 'Review the order and hear both sides before suggesting a fair next step.'
    : isDoctor
      ? 'Listen to Mika, make a note of what they share, and involve the supervising doctor.'
      : 'The school website is missing its learning button. Choose the HTML element that brings it back.';
  const reward = isLawyer ? { salary: 120, xp: 60, badge: 'Fairness Friend' } : isDoctor ? { salary: 140, xp: 70, badge: 'Caring Helper' } : { salary: 150, xp: 80, badge: 'Bug Fixer' };

  const moveDoctorStep = (id: string, offset: -1 | 1) => {
    setDoctorOrder((current) => {
      const from = current.indexOf(id);
      const to = from + offset;
      if (to < 0 || to >= current.length) return current;
      const next = [...current];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
    playSound('click');
  };

  const finishMission = () => {
    if (!correct) return;
    if (!rewarded) {
      applyReward({ xp: reward.xp, salaryDelta: reward.salary, missionCountDelta: 1 });
      setRewarded(true);
    }
    setStep(2);
    playSound('levelUp');
  };

  const cardBg = isDarkMode
    ? 'bg-[#16172B] border-[#2E3254]'
    : 'bg-white border-slate-200 shadow-sm';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-[#94A3B8]' : 'text-slate-600';

  return (
    <main
      ref={containerRef}
      className={`mx-auto ${isEngineer || isLawyer || isDoctor ? 'max-w-6xl' : 'max-w-4xl'} space-y-6 pb-12 transition-colors duration-200 ${
        isDarkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Link href="/paths" className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}>
          <ArrowLeft className="h-4 w-4" /> Back to Dream Paths
        </Link>
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${
          isDarkMode ? 'border-violet-400/20 bg-violet-400/10 text-violet-200' : 'border-indigo-200 bg-indigo-50 text-indigo-700'
        }`}>
          {career.title}
        </span>
      </div>

      <nav aria-label="Career mission progress" className="grid grid-cols-3 gap-2">
        {(isEngineer || isLawyer || isDoctor ? ['Mission', 'Simulated salary', 'History & achievements'] as const : ['Mission', 'Reward', 'History'] as const).map((label, index) => {
          const target = (index + 1) as JourneyStep;
          const unlocked = target === 1 || (target === 2 && step >= 2) || (target === 3 && step >= 3);
          return (
            <button
              key={label}
              type="button"
              disabled={!unlocked}
              aria-current={step === target ? 'step' : undefined}
              onClick={() => setStep(target)}
              className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-bold transition-all ${
                step === target
                  ? isDarkMode ? 'border-violet-400/50 bg-violet-500/20 text-white' : 'border-indigo-500 bg-indigo-100 text-indigo-900'
                  : unlocked
                    ? isDarkMode ? 'border-violet-400/30 bg-violet-500/10 text-violet-200' : 'border-slate-200 bg-slate-100 text-slate-700'
                    : isDarkMode ? 'border-white/10 bg-white/[.03] text-slate-500 disabled:cursor-not-allowed' : 'border-slate-200 bg-slate-50 text-slate-400 disabled:cursor-not-allowed'
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {unlocked && target < step ? '✓' : index + 1}
              </span>
              {label}
            </button>
          );
        })}
      </nav>

      {step === 1 && <>
        <header>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-violet-300' : 'text-indigo-600'}`}>
            {isEngineer ? 'SOFTWARE ENGINEER · Stage 3 of 8 · 10 min' : isLawyer ? 'JUNIOR LAWYER · Stage 1 of 8 · 8 min' : 'FUTURE DOCTOR · Stage 2 of 8 · 9 min'}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {isEngineer && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 text-2xl shadow-inner animate-pulse">💻✨</span>}
            {isLawyer && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-2xl shadow-inner animate-bounce">⚖️✨</span>}
            {isDoctor && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-500/20 text-2xl shadow-inner animate-bounce">🩺✨</span>}
            <h1 className={`text-3xl font-extrabold ${headingText}`}>{title}</h1>
          </div>
          <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
            {isEngineer || isDoctor ? `Small steps make a difference. Let’s complete this challenge, ${profile.name}!` : description}
          </p>
        </header>

        <div className={isEngineer ? 'grid items-start gap-4 lg:grid-cols-[1.7fr_1fr]' : isLawyer ? 'grid items-start gap-4 lg:grid-cols-[1fr_1.7fr]' : isDoctor ? 'grid items-start gap-4 lg:grid-cols-[1fr_1.7fr]' : 'grid gap-4 lg:grid-cols-[1.4fr_1fr]'}>
          <div className="space-y-4">
            {isEngineer ? <>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-400">👾 Cartoon Code Workspace · Web Debugging</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-400/10 px-2.5 py-0.5 text-[10px] font-bold text-violet-300 animate-pulse">
                  ⚡ Interactive mode
                </span>
              </div>
              <section className={`overflow-hidden rounded-2xl border ${isDarkMode ? 'border-white/10 bg-[#17152b]' : 'border-slate-200 bg-slate-900 text-slate-100'}`}>
                <div className={`flex items-center justify-between border-b px-4 py-3 text-xs ${isDarkMode ? 'border-white/10 bg-white/[.04]' : 'border-slate-800 bg-slate-950'}`}>
                  <span className="flex items-center gap-2 font-mono"><Code2 className="h-4 w-4 text-violet-300" /> index.html</span>
                  <span className="rounded-full bg-violet-400/10 px-2 py-1 text-[10px] text-violet-200">🚀 Cartoon Code Mode</span>
                </div>
                <div className="space-y-1 p-4 font-mono text-sm leading-7 text-slate-300">
                  <div>01&nbsp;&nbsp;<span className="text-violet-400">&lt;main&gt;</span></div>
                  <div>02&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">&lt;h1&gt;</span>Welcome!<span className="text-violet-400">&lt;/h1&gt;</span></div>
                  <div>03&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">&lt;p&gt;</span>Ready to learn today?<span className="text-violet-400">&lt;/p&gt;</span></div>
                  <div className={`rounded-md px-2 ${answer === 'button' ? 'bg-violet-500/20 text-teal-300' : 'bg-white/[.03] text-slate-500'}`}>
                    04&nbsp;&nbsp;&nbsp;&nbsp;{answer === 'button' ? <span className="text-teal-300">&lt;button&gt;Start learning&lt;/button&gt;</span> : <span>{'<!-- button goes here -->'}</span>}
                  </div>
                  <div>05&nbsp;&nbsp;<span className="text-violet-400">&lt;/main&gt;</span></div>
                </div>
              </section>

              <section className={`rounded-2xl border p-4 sm:p-5 ${cardBg}`}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className={`text-sm font-semibold ${headingText}`}>💻 School Website Live Preview</h2>
                  <span className={`rounded-full px-2 py-1 text-[10px] ${answer === 'button' ? 'bg-teal-400/10 text-teal-500 font-bold' : 'bg-slate-100 text-slate-500'}`}>
                    {answer === 'button' ? '✓ Button visible' : 'Button missing'}
                  </span>
                </div>
                <div className="rounded-xl bg-[#f2edff] p-5 text-[#28233c]">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-violet-700">🌈 Rainbow School · Learning Space</p>
                  <h3 className="mt-2 text-xl font-bold">Welcome!</h3>
                  <p className="mt-1 text-xs text-slate-500">Ready to learn today?</p>
                  {answer === 'button' && <button type="button" className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white animate-bounce shadow-md">🚀 Start learning →</button>}
                </div>
              </section>
            </> : (
              <section className={`space-y-4 rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
                {isLawyer ? <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-500 dark:text-amber-300">⚖️ Cartoon Case File · Delivery Dispute</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-500 animate-pulse">
                      ✨ Cartoon mode active
                    </span>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-transparent to-indigo-500/10 p-5">
                    <div className="absolute -right-4 -bottom-6 text-7xl opacity-20 select-none">⚖️</div>
                    <h2 className={`text-lg font-bold ${headingText}`}>One order, a missed delivery</h2>
                    <p className={`mt-1 text-sm leading-relaxed ${subText}`}>A bakery paid RM 200 for 20 boxes. Only 10 arrived by Friday. The supplier says the rest can be delivered on Monday.</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className={`relative rounded-2xl border p-4 transition-all hover:scale-[1.02] ${isDarkMode ? 'border-white/10 bg-white/[.04]' : 'border-slate-200 bg-slate-50 shadow-sm'}`}>
                      <div className="absolute -top-3 left-4 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow">
                        👩‍🍳 Baker Client
                      </div>
                      <div className="mt-2 flex items-start gap-3">
                        <span className="text-3xl">🧑‍🍳</span>
                        <div>
                          <p className={`text-sm font-semibold ${headingText}`}>Nia</p>
                          <p className={`mt-1 text-xs italic ${subText}`}>“I paid for 20 boxes, but received only 10 on Friday!”</p>
                        </div>
                      </div>
                    </div>

                    <div className={`relative rounded-2xl border p-4 transition-all hover:scale-[1.02] ${isDarkMode ? 'border-white/10 bg-white/[.04]' : 'border-slate-200 bg-slate-50 shadow-sm'}`}>
                      <div className="absolute -top-3 left-4 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow">
                        📦 Supplier
                      </div>
                      <div className="mt-2 flex items-start gap-3">
                        <span className="text-3xl">🚚</span>
                        <div>
                          <p className={`text-sm font-semibold ${headingText}`}>Bima</p>
                          <p className={`mt-1 text-xs italic ${subText}`}>“We can deliver the remaining 10 boxes on Monday morning!”</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </> : <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-500 dark:text-teal-300">🩺 Cartoon Clinic · Caring Skills</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-400/10 px-2.5 py-0.5 text-[10px] font-bold text-teal-400 animate-pulse">
                      ✨ Empathy mode active
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-3xl animate-bounce">🧒🏽</div>
                    <div>
                      <h2 className={`font-semibold ${headingText}`}>Mika · Learning friend</h2>
                      <p className={`text-xs ${subText}`}>“I’m nervous about seeing the doctor.”</p>
                    </div>
                  </div>
                  <blockquote className={`rounded-2xl border p-4 text-sm leading-relaxed ${isDarkMode ? 'border-teal-500/20 bg-teal-500/10 text-teal-200' : 'border-teal-200 bg-teal-50 text-teal-900'}`}>
                    “I feel tired after playing. Can you stay and listen to me, friend?”
                  </blockquote>
                  <p className={`text-sm ${subText}`}>Your cartoon role is to listen and take notes with gentle care, not diagnose or give medicine.</p>
                </> }
              </section>
            )}

            {isDoctor && (
              <section className={`rounded-2xl border p-5 ${cardBg}`}>
                <h2 className={`text-sm font-semibold ${headingText}`}>🩺 Your cartoon role: A caring helper</h2>
                <div className={`mt-3 space-y-3 text-sm ${subText}`}>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" />Listen without interrupting with a warm smile</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" />Share your friendly notes with the supervising doctor</p>
                </div>
              </section>
            )}
          </div>

          <aside className={`rounded-2xl border p-5 ${cardBg}`}>
            <div className="flex items-start justify-between gap-2">
              <h2 className={`text-lg font-semibold ${headingText}`}>
                {isDoctor ? '🩺 Arrange the caring steps' : isLawyer ? '⚖️ What should cartoon junior lawyer do?' : '💻 Choose the missing HTML tag'}
              </h2>
              {isLawyer && <span className={`shrink-0 rounded-lg px-2 py-1 text-[9px] ${isDarkMode ? 'bg-amber-400/20 text-amber-300 font-bold' : 'bg-amber-50 text-amber-700 font-bold border border-amber-200'}`}>Your cartoon choice</span>}
              {isEngineer && <span className="shrink-0 rounded-lg bg-violet-400/10 px-2 py-1 text-[9px] font-bold text-violet-300">Code puzzle</span>}
              {isDoctor && <span className="shrink-0 rounded-lg bg-teal-400/10 px-2 py-1 text-[9px] font-semibold text-teal-500 dark:text-teal-300">{doctorOrder.filter((id, index) => id === safeDoctorOrder[index]).length} / 3 arranged</span>}
            </div>
            <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
              {isDoctor ? 'Use the cartoon arrows to put these friendly actions in order.' : isLawyer ? 'Examine the cartoon case documents and pick the fair resolution.' : 'The school website’s learning button is missing. Choose the HTML element that brings it back.'}
            </p>

            <div className="mt-4 space-y-2">
              {isDoctor ? doctorOrder.map((id, index) => {
                const item = doctorSteps.find((entry) => entry.id === id)!;
                return (
                  <div key={id} className={`flex items-start gap-2 rounded-xl border p-3 transition-all hover:bg-teal-500/5 ${isDarkMode ? 'border-white/10 bg-white/[.03]' : 'border-slate-200 bg-slate-50'}`}>
                    <span className="pt-1 text-xs font-bold text-teal-500 dark:text-teal-300">{index + 1}.</span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${headingText}`}>{item.label}</p>
                      <p className={`mt-1 text-xs leading-relaxed ${subText}`}>{item.detail}</p>
                    </div>
                    <div className="flex flex-col">
                      <button type="button" aria-label={`Move ${item.label} up`} onClick={() => moveDoctorStep(id, -1)} disabled={index === 0} className={`rounded p-1 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 ${headingText}`}><ChevronUp className="h-4 w-4" /></button>
                      <button type="button" aria-label={`Move ${item.label} down`} onClick={() => moveDoctorStep(id, 1)} disabled={index === doctorOrder.length - 1} className={`rounded p-1 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 ${headingText}`}><ChevronDown className="h-4 w-4" /></button>
                    </div>
                  </div>
                );
              }) : (
                (isLawyer ? [
                  { id: 'lawsuit', label: '💥 Demand an immediate dramatic lawsuit', detail: 'Skip hearing both sides and jump straight to court!' },
                  { id: 'fair', label: '⚖️ Review evidence and agree a friendly remedy', detail: 'Check the delivery note; arrange Monday delivery + small discount.' },
                  { id: 'ignore', label: '🙈 Ignore the contract entirely', detail: 'Just flip a coin and guess who wins.' }
                ] : [
                  { id: 'p', label: '📝 <p>Start learning</p>', detail: 'A paragraph tag for ordinary text.' },
                  { id: 'button', label: '🚀 <button>Start learning</button>', detail: 'An interactive button tag that users can click!' },
                  { id: 'h1', label: '📌 <h1>Start learning</h1>', detail: 'A heading tag for main titles.' }
                ]).map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    aria-pressed={answer === choice.id}
                    onClick={() => { setAnswer(choice.id); playSound('click'); }}
                    className={`w-full rounded-xl border p-3 text-left text-sm transition transform active:scale-95 ${
                      answer === choice.id
                        ? isLawyer
                          ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold shadow-md ring-2 ring-amber-500/30'
                          : 'border-violet-500 bg-violet-500/20 text-violet-200 font-bold shadow-md ring-2 ring-violet-500/30'
                        : isDarkMode ? 'border-white/10 bg-white/[.03] hover:border-violet-300/40 text-slate-200' : 'border-slate-200 bg-slate-50 hover:border-indigo-300 text-slate-800'
                    }`}
                  >
                    <span className="font-semibold">{choice.label}</span>
                    {'detail' in choice && <span className={`mt-1 block text-xs leading-relaxed ${subText}`}>{choice.detail}</span>}
                  </button>
                ))
              )}
            </div>

            {correct && !isEngineer && <p className="mt-3 flex items-center gap-2 text-xs text-teal-500 dark:text-teal-300 font-bold"><CheckCircle2 className="h-4 w-4" />{isDoctor ? 'That order puts listening first, then notes, then doctor support.' : isLawyer ? '🎉 Fantastic! Both sides agree on a fair and friendly remedy.' : 'Good choice. You have completed this mission step.'}</p>}
            {correct && isEngineer && <p className="mt-3 flex items-center gap-2 text-xs text-violet-400 font-bold"><CheckCircle2 className="h-4 w-4" />🎉 Perfect! The button tag has restored the learning link!</p>}
            
            <button type="button" disabled={!correct} onClick={finishMission} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 shadow-md">
              Complete mission <ArrowRight className="h-4 w-4" />
            </button>
          </aside>
        </div>

        {isDoctor && <>
          <div aria-hidden="true" className={`relative flex h-16 items-end justify-center gap-7 overflow-hidden rounded-xl border pb-2 ${isDarkMode ? 'border-white/10 bg-[#211b3c]' : 'border-slate-200 bg-teal-50'}`}>
            <div className="absolute bottom-3 h-2 w-36 rounded-full bg-teal-400" />
            <span className="z-10 text-3xl animate-bounce">🧒🏽</span>
            <span className="z-10 text-3xl">🩺</span>
            <span className="absolute left-6 top-2 text-lg text-violet-500 dark:text-violet-300">⭐</span>
            <span className="absolute right-8 top-2 text-lg text-teal-500 dark:text-teal-300">❤️</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-teal-400/30 bg-teal-400/[.06] p-4">
            <HeartPulse className="h-5 w-5 shrink-0 text-teal-600 dark:text-teal-300" />
            <div>
              <p className={`text-sm font-semibold ${headingText}`}>Learn to care with cartoon empathy, not to diagnose.</p>
              <p className={`mt-1 text-xs leading-relaxed ${subText}`}>This fictional story teaches empathy; it is not medical advice. If you feel unwell, tell a trusted adult.</p>
            </div>
          </div>
          <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${cardBg}`}>
            <div>
              <p className={`text-sm font-semibold ${headingText}`}>RM 140.00 simulated salary · +70 XP</p>
              <p className={`mt-1 text-xs ${subText}`}>A game reward, not real money or employment.</p>
            </div>
            <button type="button" disabled={!correct} onClick={finishMission} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 shadow-md">
              Complete mission <CheckCircle2 className="h-4 w-4" />
            </button>
          </div>
        </>}

        {isLawyer && <>
          <div className={`flex items-center gap-3 rounded-xl border p-4 ${correct ? 'border-teal-400/30 bg-teal-400/[.06]' : 'border-amber-300/30 bg-amber-300/[.06]'}`}>
            <Sparkles className={`h-5 w-5 shrink-0 ${correct ? 'text-teal-600 dark:text-teal-300' : 'text-amber-500 dark:text-amber-300'}`} />
            <div>
              <p className={`text-sm font-semibold ${headingText}`}>⚖️ Cartoon Junior Lawyer Wisdom</p>
              <p className={`mt-1 text-xs ${subText}`}>A great cartoon lawyer brings people together with fairness and empathy. Learning simulation, not legal advice.</p>
            </div>
          </div>
          <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${cardBg}`}>
            <div>
              <p className={`text-sm font-semibold ${headingText}`}>RM 120.00 simulated salary · +60 XP</p>
              <p className={`mt-1 text-xs ${subText}`}>A game reward, not real money or employment.</p>
            </div>
            <button type="button" disabled={!correct} onClick={finishMission} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 shadow-md">
              Complete mission <CheckCircle2 className="h-4 w-4" />
            </button>
          </div>
        </>}

        {isEngineer && <>
          <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${correct ? 'border-teal-400/30 bg-teal-400/[.06]' : cardBg}`}>
            <p className={`text-sm leading-relaxed ${subText}`}>{correct ? 'Correct! The <button> element tells the site this is a button. Your fix passed all 3 checks.' : 'Choose the missing HTML element to restore the learning button.'}</p>
            <span className="rounded-full bg-teal-400/10 px-3 py-1 text-[10px] text-teal-600 dark:text-teal-300 font-bold">{correct ? '3 checks ready' : '3 checks'}</span>
          </div>
          <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${cardBg}`}>
            <div>
              <p className={`text-sm font-semibold ${headingText}`}>RM {reward.salary}.00 simulated salary · +{reward.xp} XP</p>
              <p className={`mt-1 text-xs ${subText}`}>A game reward, not real money or employment.</p>
            </div>
            <button type="button" disabled={!correct} onClick={finishMission} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 shadow-md">
              Complete mission <CheckCircle2 className="h-4 w-4" />
            </button>
          </div>
        </>}
      </> }

      {step === 2 && <>
        {isEngineer ? <>
          <section className="rounded-[28px] border border-violet-400/25 bg-gradient-to-br from-indigo-900 via-[#201d3b] to-indigo-950 px-6 py-10 text-center sm:px-12 sm:py-12 text-white shadow-xl">
            <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center animate-pulse">
              <div className="absolute inset-2 rounded-full border border-violet-300/30 rotate-[-18deg]" />
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_30%_25%,#d8b4fe,#8b5cf6_55%,#312e81)] shadow-[0_0_45px_rgba(139,92,246,.35)]" />
              <span className="relative z-10 text-5xl">💻</span>
              <Sparkles className="absolute -right-1 top-2 h-5 w-5 text-violet-200" />
              <span className="absolute -left-2 bottom-2 h-2 w-2 rounded-full bg-amber-300" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">Cartoon Mission Complete · Software Engineer</p>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Awesome coding! Button is back!</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">Great debugging, {profile.name}! Code logic mastered.</p>
            <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-12">
              <div><p className="text-[10px] uppercase tracking-wider text-slate-300">Simulated game salary</p><p className="mt-1 text-3xl font-bold">RM 150.00</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-slate-300">XP earned</p><p className="mt-1 text-3xl font-bold text-violet-300">+80 XP</p></div>
            </div>
            <p className="mx-auto mt-5 w-fit rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold text-amber-300">Virtual reward · No cash value</p>
          </section>
          <div className="grid gap-4 md:grid-cols-[1fr_260px]">
            <section className={`rounded-2xl border p-5 ${cardBg}`}><h2 className={`flex items-center gap-2 font-semibold ${headingText}`}><CheckCircle2 className="h-5 w-5 text-teal-500" />Mission result: cartoon success!</h2><p className={`mt-4 text-sm ${headingText}`}>Fix the missing button</p><p className={`mt-2 text-xs leading-relaxed ${subText}`}>The “Start learning” button is visible again and opens the practice page.</p></section>
            <section className={`rounded-2xl border p-5 ${cardBg}`}><p className="text-[10px] font-bold uppercase tracking-wider text-violet-400">New cartoon badge</p><div className="mt-4 flex items-center gap-3"><Medal className="h-8 w-8 text-violet-400 animate-spin" style={{ animationDuration: '8s' }} /><div><p className={`font-semibold ${headingText}`}>Bug Fixer 💻</p><p className={`text-xs ${subText}`}>Awarded to {profile.name}</p></div></div></section>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(1)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}><ArrowLeft className="h-4 w-4" /> Back to mission</button>
            <p className={`text-xs ${subText}`}>This salary is a learning simulation reward, not real income.</p>
            <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-md">View history & achievements <ArrowRight className="h-4 w-4" /></button>
          </div>
        </> : isLawyer ? <>
          <section className="rounded-[28px] border border-amber-300/25 bg-gradient-to-br from-indigo-950 via-[#211d3a] to-slate-900 px-6 py-10 text-center sm:px-12 sm:py-12 text-white shadow-xl">
            <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/30 bg-[#17152b] shadow-lg animate-bounce">
              <span className="absolute left-4 top-6 text-3xl">⚖️</span>
              <span className="absolute right-4 top-4 text-2xl text-amber-300">⭐</span>
              <span className="relative z-10 text-6xl drop-shadow-lg">👩‍⚖️</span>
              <span className="absolute bottom-1 z-20 rounded bg-amber-500 px-2 py-0.5 text-[8px] font-extrabold text-slate-950">CARTOON LAWYER HERO</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Cartoon Mission Complete · Junior Lawyer</p>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Awesome! You solved the dispute!</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">Great cartoon advocacy, {profile.name}! Fairness and smiles all around.</p>
            <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-12">
              <div><p className="text-[10px] uppercase tracking-wider text-slate-300">Simulated game salary</p><p className="mt-1 text-3xl font-bold">RM 120.00</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-slate-300">XP earned</p><p className="mt-1 text-3xl font-bold text-amber-300">+60 XP</p></div>
            </div>
            <p className="mx-auto mt-5 w-fit rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold text-amber-300">Virtual reward · No cash value</p>
          </section>
          <div className="grid gap-4 md:grid-cols-[1fr_260px]">
            <section className={`rounded-2xl border p-5 ${cardBg}`}><h2 className={`flex items-center gap-2 font-semibold ${headingText}`}><CheckCircle2 className="h-5 w-5 text-teal-500" />Mission result: cartoon success!</h2><p className={`mt-4 text-sm ${headingText}`}>Review a delivery contract</p><p className={`mt-2 text-xs leading-relaxed ${subText}`}>Both sides happily agreed on a remedy after your fun cartoon mediation.</p></section>
            <section className={`rounded-2xl border p-5 ${cardBg}`}><p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">New cartoon badge</p><div className="mt-4 flex items-center gap-3"><Medal className="h-8 w-8 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} /><div><p className={`font-semibold ${headingText}`}>Fairness Friend ⚖️</p><p className={`text-xs ${subText}`}>Awarded to {profile.name}</p></div></div></section>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(1)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}><ArrowLeft className="h-4 w-4" /> Back to mission</button>
            <p className={`text-xs ${subText}`}>This salary is a learning simulation reward, not real income.</p>
            <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-md">View history & achievements <ArrowRight className="h-4 w-4" /></button>
          </div>
        </> : isDoctor ? <>
          <section className="rounded-[28px] border border-teal-300/25 bg-gradient-to-br from-teal-950 via-[#1d203c] to-indigo-950 px-6 py-10 text-center sm:px-12 sm:py-12 text-white shadow-xl">
            <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center animate-bounce">
              <div className="absolute bottom-3 h-2 w-24 rounded-full bg-teal-400/80" />
              <div className="absolute bottom-1 h-2 w-28 rounded-full bg-violet-400/20" />
              <span className="relative z-10 text-7xl drop-shadow-lg">🧑🏻‍⚕️</span>
              <span className="absolute left-1 top-4 text-lg text-amber-300">⭐</span>
              <span className="absolute right-1 top-6 text-xl text-teal-300">💖</span>
              <span className="absolute right-0 top-0 rounded-full bg-teal-500 px-2 py-0.5 text-[8px] font-bold">+70 XP</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300">Cartoon Mission Complete · Future Doctor</p>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Wonderful! Mika feels much better!</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">Great empathetic care, {profile.name}! Kindness heals the heart.</p>
            <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-12">
              <div><p className="text-[10px] uppercase tracking-wider text-slate-300">Simulated game salary</p><p className="mt-1 text-3xl font-bold">RM 140.00</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-slate-300">XP earned</p><p className="mt-1 text-3xl font-bold text-teal-300">+70 XP</p></div>
            </div>
            <p className="mx-auto mt-5 w-fit rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-semibold text-amber-300">Virtual reward · No cash value</p>
          </section>
          <div className="grid gap-4 md:grid-cols-[1fr_260px]">
            <section className={`rounded-2xl border p-5 ${cardBg}`}><h2 className={`flex items-center gap-2 font-semibold ${headingText}`}><CheckCircle2 className="h-5 w-5 text-teal-500" />Mission result: cartoon empathy success!</h2><p className={`mt-4 text-sm ${headingText}`}>Help a patient feel comfortable</p><p className={`mt-2 text-xs leading-relaxed ${subText}`}>Mika is smiling, and your kind notes were successfully shared with the doctor.</p></section>
            <section className={`rounded-2xl border p-5 ${cardBg}`}><p className="text-[10px] font-bold uppercase tracking-wider text-teal-400">New cartoon badge</p><div className="mt-4 flex items-center gap-3"><Medal className="h-8 w-8 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} /><div><p className={`font-semibold ${headingText}`}>Caring Helper 🩺</p><p className={`text-xs ${subText}`}>Awarded to {profile.name}</p></div></div></section>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(1)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}><ArrowLeft className="h-4 w-4" /> Back to mission</button>
            <p className={`text-xs ${subText}`}>This salary is a learning simulation reward, not real income.</p>
            <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-md">View history & achievements <ArrowRight className="h-4 w-4" /></button>
          </div>
        </> : <>
          <section className="rounded-[28px] border border-violet-400/25 bg-gradient-to-br from-indigo-900 via-[#201d3b] to-indigo-950 px-6 py-10 text-center sm:px-12 text-white shadow-xl">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20"><HeartPulse className="h-9 w-9 text-teal-200" /></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">Mission complete · {career.title}</p>
            <h1 className="mt-3 text-3xl font-extrabold">Great work, {profile.name}!</h1>
            <p className="mt-2 text-sm text-slate-300">Your practice today is one small step toward your dream.</p>
            <div className="mx-auto mt-7 flex max-w-md justify-center gap-12">
              <div><p className="text-[10px] uppercase text-slate-300">Virtual reward</p><p className="mt-1 text-2xl font-bold">RM {reward.salary}.00</p></div>
              <div><p className="text-[10px] uppercase text-slate-300">XP earned</p><p className="mt-1 text-2xl font-bold text-violet-300">+{reward.xp} XP</p></div>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-2 text-sm font-semibold text-amber-200"><Medal className="h-4 w-4" />{reward.badge}</p>
            <p className="mt-3 text-xs text-slate-400">Learning reward only · no cash value</p>
          </section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(1)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}><ArrowLeft className="h-4 w-4" /> Back to mission</button>
            <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-md">View history <ArrowRight className="h-4 w-4" /></button>
          </div>
        </>}
      </> }

      {step === 3 && (isEngineer ? <>
        <header>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-violet-300' : 'text-indigo-600'}`}>Software Engineer · Cartoon Edition</p>
          <h1 className={`mt-2 text-3xl font-extrabold ${headingText}`}>History & achievements</h1>
          <p className={`mt-2 text-sm ${subText}`}>Every step counts. Here are the results of your learning adventure, {profile.name}.</p>
        </header>
        <section className="grid gap-3 sm:grid-cols-3">
          <div className={`rounded-2xl border p-5 ${cardBg}`}><CheckCircle2 className="h-5 w-5 text-teal-500" /><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>Mission completed</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>1 mission</p></div>
          <div className={`rounded-2xl border p-5 ${cardBg}`}><span className="text-amber-500 font-bold">RM</span><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>Simulated salary earned</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>RM 150.00</p></div>
          <div className={`rounded-2xl border p-5 ${cardBg}`}><Star className="h-5 w-5 text-violet-400" /><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>XP from this mission</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>+80 XP</p></div>
        </section>
        <section className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <article className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
            <div className="flex items-center justify-between"><h2 className={`font-semibold ${headingText}`}>Mission history</h2><span className="rounded-full bg-teal-400/10 px-3 py-1 text-[10px] font-semibold text-teal-600 dark:text-teal-300">Completed</span></div>
            <p className={`mt-4 text-xs ${subText}`}>Today · 10 min · Stage 3 of 8</p>
            <h3 className={`mt-4 text-xl font-semibold ${headingText}`}>Fix the missing button</h3>
            <p className={`mt-3 text-sm leading-relaxed ${subText}`}>The “Start learning” button is visible again and opens the practice page.</p>
            <div className={`mt-5 flex justify-between border-y py-3 text-xs ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <span className="font-semibold text-amber-500 dark:text-amber-300">RM 150.00 · simulated</span>
              <span className="font-semibold text-violet-500 dark:text-violet-300">+80 XP</span>
            </div>
            <p className={`mt-4 flex items-center gap-2 text-xs ${subText}`}><Sparkles className="h-4 w-4 text-violet-400" />Logic & problem solving</p>
          </article>
          <article className={`flex flex-col items-center justify-center rounded-2xl border border-violet-400/30 p-6 text-center ${isDarkMode ? 'bg-violet-500/[.06]' : 'bg-indigo-50/50'}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Cartoon badge earned</p>
            <div className={`mt-4 flex h-20 w-20 items-center justify-center rounded-2xl border ${isDarkMode ? 'border-violet-300/60 bg-[#211b3c]' : 'border-indigo-300 bg-white shadow-sm'} text-4xl animate-bounce`}>💻</div>
            <h2 className={`mt-3 text-lg font-semibold ${headingText}`}>Bug Fixer 💻</h2>
            <p className={`mt-1 text-xs ${subText}`}>{profile.name} · Software Engineer</p>
            <p className={`mt-3 text-xs leading-relaxed ${subText}`}>For your brilliant coding logic, debugging, and successful completion.</p>
          </article>
        </section>
        <section className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <div className="flex items-center justify-between"><h2 className={`font-semibold ${headingText}`}>Your dream keeps growing</h2><span className="text-sm font-semibold text-violet-500 dark:text-violet-300">50%</span></div>
          <div className={`mt-4 h-2 overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}><div className="h-full w-1/2 rounded-full bg-violet-500" /></div>
          <p className={`mt-3 flex items-center gap-2 text-xs ${subText}`}><Sparkles className="h-4 w-4 text-violet-500 dark:text-violet-300" />Stage 4 of 8 unlocked: Build your own study app.</p>
        </section>
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" onClick={() => setStep(2)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}><ArrowLeft className="h-4 w-4" /> Back to simulated salary</button>
          <Link href="/paths" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-md">Back to Dream Paths <Trophy className="h-4 w-4" /></Link>
        </div>
      </> : isLawyer ? <>
        <header>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 dark:text-amber-200">Junior Lawyer · Cartoon Edition</p>
          <h1 className={`mt-2 text-3xl font-extrabold ${headingText}`}>History & achievements</h1>
          <p className={`mt-2 text-sm ${subText}`}>Every step counts. Here are the results of your learning adventure, {profile.name}.</p>
        </header>
        <section className="grid gap-3 sm:grid-cols-3">
          <div className={`rounded-2xl border p-5 ${cardBg}`}><CheckCircle2 className="h-5 w-5 text-teal-500" /><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>Mission completed</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>1 mission</p></div>
          <div className={`rounded-2xl border p-5 ${cardBg}`}><span className="text-amber-500 font-bold">RM</span><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>Simulated salary earned</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>RM 120.00</p></div>
          <div className={`rounded-2xl border p-5 ${cardBg}`}><Star className="h-5 w-5 text-amber-400" /><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>XP from this mission</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>+60 XP</p></div>
        </section>
        <section className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <article className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
            <div className="flex items-center justify-between"><h2 className={`font-semibold ${headingText}`}>Mission history</h2><span className="rounded-full bg-teal-400/10 px-3 py-1 text-[10px] font-semibold text-teal-600 dark:text-teal-300">Completed</span></div>
            <p className={`mt-4 text-xs ${subText}`}>Today · 8 min · Stage 1 of 8</p>
            <h3 className={`mt-4 text-xl font-semibold ${headingText}`}>Review a delivery contract</h3>
            <p className={`mt-3 text-sm leading-relaxed ${subText}`}>Both sides agree on a remedy after reviewing the order and delivery note.</p>
            <div className={`mt-5 flex justify-between border-y py-3 text-xs ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <span className="font-semibold text-amber-500 dark:text-amber-300">RM 120.00 · simulated</span>
              <span className="font-semibold text-amber-500 dark:text-amber-300">+60 XP</span>
            </div>
            <p className={`mt-4 flex items-center gap-2 text-xs ${subText}`}><Scale className="h-4 w-4 text-amber-500 dark:text-amber-300" />Contract review & negotiation</p>
          </article>
          <article className={`flex flex-col items-center justify-center rounded-2xl border border-amber-400/30 p-6 text-center ${isDarkMode ? 'bg-amber-500/[.06]' : 'bg-amber-50/50'}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-200">Cartoon badge earned</p>
            <div className={`mt-4 flex h-32 w-full items-center justify-center rounded-2xl border ${isDarkMode ? 'border-amber-300/30 bg-[#211b3c]' : 'border-amber-200 bg-white shadow-sm'} text-6xl`}>
              <span>👩‍⚖️</span><Medal className="ml-2 h-10 w-10 text-amber-500 dark:text-amber-300 animate-bounce" />
            </div>
            <h2 className={`mt-3 text-lg font-semibold ${headingText}`}>Fairness Friend ⚖️</h2>
            <p className={`mt-1 text-xs ${subText}`}>{profile.name} · Junior Lawyer</p>
            <p className={`mt-3 text-xs leading-relaxed ${subText}`}>For your brilliant cartoon mediation, fairness, and successful mission completion.</p>
          </article>
        </section>
        <section className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <div className="flex items-center justify-between"><h2 className={`font-semibold ${headingText}`}>Your dream keeps growing</h2><span className="text-sm font-semibold text-amber-500 dark:text-amber-200">25%</span></div>
          <div className={`mt-4 h-2 overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}><div className="h-full w-1/4 rounded-full bg-amber-500" /></div>
          <p className={`mt-3 flex items-center gap-2 text-xs ${subText}`}><Scale className="h-4 w-4 text-amber-500 dark:text-amber-200" />Stage 2 of 8 unlocked: Explore rights and responsibilities.</p>
        </section>
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" onClick={() => setStep(2)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-amber-300 hover:text-white' : 'text-amber-600 hover:text-amber-800'}`}><ArrowLeft className="h-4 w-4" /> Back to simulated salary</button>
          <Link href="/paths" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400 shadow-md">Back to Dream Paths <Trophy className="h-4 w-4" /></Link>
        </div>
      </> : isDoctor ? <>
        <header>
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-300">Future Doctor · Cartoon Edition</p>
          <h1 className={`mt-2 text-3xl font-extrabold ${headingText}`}>History & achievements</h1>
          <p className={`mt-2 text-sm ${subText}`}>Every step counts. Here are the results of your learning adventure, {profile.name}.</p>
        </header>
        <section className="grid gap-3 sm:grid-cols-3">
          <div className={`rounded-2xl border p-5 ${cardBg}`}><CheckCircle2 className="h-5 w-5 text-teal-500" /><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>Mission completed</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>1 mission</p></div>
          <div className={`rounded-2xl border p-5 ${cardBg}`}><span className="text-amber-500 font-bold">RM</span><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>Simulated salary earned</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>RM 140.00</p></div>
          <div className={`rounded-2xl border p-5 ${cardBg}`}><Star className="h-5 w-5 text-teal-400" /><p className={`mt-3 text-[10px] uppercase tracking-wider ${subText}`}>XP from this mission</p><p className={`mt-1 text-2xl font-bold ${headingText}`}>+70 XP</p></div>
        </section>
        <section className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <article className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
            <div className="flex items-center justify-between"><h2 className={`font-semibold ${headingText}`}>Mission history</h2><span className="rounded-full bg-teal-400/10 px-3 py-1 text-[10px] font-semibold text-teal-600 dark:text-teal-300">Completed</span></div>
            <p className={`mt-4 text-xs ${subText}`}>Today · 9 min · Stage 2 of 8</p>
            <h3 className={`mt-4 text-xl font-semibold ${headingText}`}>Help a patient feel comfortable</h3>
            <p className={`mt-3 text-sm leading-relaxed ${subText}`}>Mika feels heard, and the notes are shared with the doctor.</p>
            <div className={`mt-5 flex justify-between border-y py-3 text-xs ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <span className="font-semibold text-amber-500 dark:text-amber-300">RM 140.00 · simulated</span>
              <span className="font-semibold text-teal-500 dark:text-teal-300">+70 XP</span>
            </div>
            <p className={`mt-4 flex items-center gap-2 text-xs ${subText}`}><HeartPulse className="h-4 w-4 text-teal-600 dark:text-teal-300" />Empathy & communication</p>
          </article>
          <article className={`flex flex-col items-center justify-center rounded-2xl border border-teal-400/30 p-6 text-center ${isDarkMode ? 'bg-teal-500/[.06]' : 'bg-teal-50/50'}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-300">Cartoon badge earned</p>
            <div className={`mt-4 flex h-20 w-20 items-center justify-center rounded-xl border ${isDarkMode ? 'border-teal-300/60 bg-[#211b3c]' : 'border-teal-200 bg-white shadow-sm'} text-4xl animate-bounce`}>🧑🏻‍⚕️</div>
            <h2 className={`mt-3 text-lg font-semibold ${headingText}`}>Caring Helper 🩺</h2>
            <p className={`mt-1 text-xs ${subText}`}>{profile.name} · Future Doctor</p>
            <p className={`mt-3 text-xs leading-relaxed ${subText}`}>For your wonderful cartoon care, listening, and successful completion.</p>
          </article>
        </section>
        <section className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <div className="flex items-center justify-between"><h2 className={`font-semibold ${headingText}`}>Your dream keeps growing</h2><span className="text-sm font-semibold text-teal-600 dark:text-teal-300">38%</span></div>
          <div className={`mt-4 h-2 overflow-hidden rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}><div className="h-full w-[38%] rounded-full bg-teal-500" /></div>
          <p className={`mt-3 flex items-center gap-2 text-xs ${subText}`}><HeartPulse className="h-4 w-4 text-teal-600 dark:text-teal-300" />Stage 3 of 8 unlocked: Meet the care team.</p>
        </section>
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" onClick={() => setStep(2)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-teal-300 hover:text-white' : 'text-teal-600 hover:text-teal-800'}`}><ArrowLeft className="h-4 w-4" /> Back to simulated salary</button>
          <Link href="/paths" className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-500 shadow-md">Back to Dream Paths <Trophy className="h-4 w-4" /></Link>
        </div>
      </> : <>
        <header>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-violet-300' : 'text-indigo-600'}`}>{career.title}</p>
          <h1 className={`mt-2 text-3xl font-extrabold ${headingText}`}>Mission history & achievement</h1>
          <p className={`mt-2 text-sm ${subText}`}>You completed: {title}</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2">
          <article className={`rounded-2xl border p-5 ${cardBg}`}><p className={`text-xs uppercase tracking-wider ${subText}`}>Mission result</p><h2 className={`mt-2 text-xl font-bold ${headingText}`}>Completed successfully</h2><p className={`mt-2 text-sm ${subText}`}>+{reward.xp} XP · RM {reward.salary}.00 simulated reward</p></article>
          <article className={`rounded-2xl border border-violet-400/25 p-5 ${isDarkMode ? 'bg-violet-500/[.06]' : 'bg-indigo-50/50'}`}><Medal className="h-7 w-7 text-violet-400" /><p className="mt-3 text-xs uppercase tracking-wider text-violet-400">Badge earned</p><h2 className={`mt-1 text-xl font-bold ${headingText}`}>{reward.badge}</h2><p className={`mt-1 text-sm ${subText}`}>Awarded to {profile.name}</p></article>
        </section>
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" onClick={() => setStep(2)} className={`inline-flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-violet-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}`}><ArrowLeft className="h-4 w-4" /> Back to reward</button>
          <Link href="/paths" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 shadow-md">Return to Dream Paths <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </>)}
    </main>
  );
}

export default function CareerMissionPage() {
  return <Suspense fallback={<div className="p-8 text-slate-400">Loading career mission…</div>}><CareerMission /></Suspense>;
}

