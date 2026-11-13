'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Gavel,
  MessageSquareQuote,
  Scale,
  ShieldAlert,
  Sparkles,
  Star
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { playSound } from '@/utils/sound';

type Scene = 'opening' | 'objection' | 'verdict';

function CourtroomSimulation() {
  const params = useSearchParams();
  const career = params.get('career') || 'junior-lawyer';
  const profile = useProgressionStore((state) => state.profile);
  const [scene, setScene] = useState<Scene>('opening');
  const [openingChoice, setOpeningChoice] = useState<string | null>(null);
  const [objectionChoice, setObjectionChoice] = useState<string | null>(null);
  const [openingSubmitted, setOpeningSubmitted] = useState(false);
  const [objectionRaised, setObjectionRaised] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const el = mainRef.current;
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

  const chooseOpening = (choice: string) => {
    setOpeningChoice(choice);
    playSound('click');
  };

  const submitOpening = () => {
    if (!openingChoice) return;
    setOpeningSubmitted(true);
    playSound(openingChoice === 'evidence' ? 'success' : 'click');
  };

  const raiseObjection = () => {
    if (!objectionChoice) return;
    setObjectionRaised(true);
    playSound(objectionChoice === 'timeline' ? 'success' : 'click');
  };

  const advance = (next: Scene) => {
    setScene(next);
    playSound('click');
  };

  const cardSurface = isDarkMode
    ? 'border-white/10 bg-[#111329]'
    : 'border-slate-200 bg-white shadow-sm';

  const sideSurface = isDarkMode
    ? 'border-white/10 bg-white/[.04]'
    : 'border-slate-200 bg-white shadow-sm';

  const subText = isDarkMode ? 'text-slate-300' : 'text-slate-600';
  const mutedText = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <main
      ref={mainRef}
      className={`mx-auto max-w-5xl space-y-5 pb-12 transition-colors duration-200 ${
        isDarkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/modes"
          className={`inline-flex items-center gap-2 text-sm transition-colors ${
            isDarkMode ? 'text-violet-300 hover:text-white' : 'text-violet-600 hover:text-violet-800'
          }`}
        >
          <ArrowLeft className="h-4 w-4" /> Learning Modes
        </Link>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            isDarkMode
              ? 'border-amber-300/20 bg-amber-300/10 text-amber-200'
              : 'border-amber-300 bg-amber-50 text-amber-800'
          }`}
        >
          SIMULATION MODE · CASE 01
        </span>
      </div>

      <header className="space-y-2">
        <p
          className={`text-[10px] font-bold uppercase tracking-[.2em] ${
            isDarkMode ? 'text-violet-300' : 'text-violet-600'
          }`}
        >
          Junior lawyer · Evidence & courtroom skills
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">The Missing Project File</h1>
        <p className={`max-w-3xl text-sm leading-relaxed ${subText}`}>
          A school’s project file disappeared just before the showcase. Your client is accused of taking it. Review the evidence, make a careful opening argument, and challenge testimony only when the record supports it.
        </p>
      </header>

      <nav aria-label="Simulation progress" className="grid grid-cols-3 gap-2">
        {(['opening', 'objection', 'verdict'] as const).map((item, index) => {
          const active = scene === item;
          const done =
            (item === 'opening' && scene !== 'opening') ||
            (item === 'objection' && scene === 'verdict');
          return (
            <button
              key={item}
              type="button"
              onClick={() => {
                setScene(item);
                playSound('click');
              }}
              aria-current={active ? 'step' : undefined}
              aria-label={`Go to ${['opening statement', 'witness testimony', 'case outcome'][index]}`}
              className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition ${
                active
                  ? isDarkMode
                    ? 'border-violet-400/50 bg-violet-500/20 text-white'
                    : 'border-violet-500 bg-violet-50 text-violet-900 font-semibold shadow-xs'
                  : done
                  ? isDarkMode
                    ? 'border-teal-400/30 bg-teal-400/10 text-teal-200'
                    : 'border-teal-300 bg-teal-50 text-teal-800 font-medium'
                  : isDarkMode
                  ? 'border-white/10 bg-white/[.03] text-slate-300 hover:border-violet-300/50'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  isDarkMode ? 'bg-white/10' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {done ? '✓' : index + 1}
              </span>
              {['Opening statement', 'Witness testimony', 'Case outcome'][index]}
            </button>
          );
        })}
      </nav>

      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className={`overflow-hidden rounded-2xl border ${cardSurface}`}>
          <div
            className={`flex items-center justify-between border-b px-4 py-3 ${
              isDarkMode ? 'border-white/10' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <span
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? 'text-amber-200' : 'text-amber-700'
              }`}
            >
              <Scale className="h-4 w-4" /> District Court · Hearing 04
            </span>
            <span className={`text-xs ${mutedText}`}>
              {scene === 'opening'
                ? 'Opening arguments'
                : scene === 'objection'
                ? 'Witness testimony'
                : 'Ruling'}
            </span>
          </div>

          <div className="relative min-h-[210px] overflow-hidden bg-[#17162d] px-5 py-6 sm:px-8">
            <div className="absolute inset-x-0 bottom-0 h-16 border-t-4 border-[#593f54] bg-[#30243d]" />
            <div className="absolute bottom-16 left-0 right-0 h-3 bg-[#7b5362]" />
            <div className="absolute left-[8%] top-8 h-20 w-24 rounded-t-full border-4 border-[#57415f] bg-[#282441]" />
            <div className="absolute right-[8%] top-8 h-20 w-24 rounded-t-full border-4 border-[#57415f] bg-[#282441]" />
            <div className="relative z-10 flex min-h-[155px] flex-wrap items-end justify-center gap-5 sm:gap-10">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#f3bb7a] bg-[#9d5c50] text-3xl shadow-lg">
                  👩🏽‍⚖️
                </div>
                <p className="mt-2 text-[10px] font-bold text-amber-100">JUDGE</p>
              </div>
              <div className="mb-2 rounded-2xl border border-violet-300/30 bg-[#282344] px-4 py-3 text-center shadow-lg">
                <div className="text-3xl">
                  {scene === 'opening' ? '📁' : scene === 'objection' ? '🧑🏽‍💼' : '⚖️'}
                </div>
                <p className="mt-1 text-[10px] font-bold text-violet-200">
                  {scene === 'opening' ? 'CASE FILE' : scene === 'objection' ? 'WITNESS' : 'COURT'}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#f3bb7a] bg-[#4e668e] text-3xl shadow-lg">
                  🧑🏻‍💼
                </div>
                <p className="mt-2 text-[10px] font-bold text-sky-100">YOU · DEFENSE</p>
              </div>
            </div>
            <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#111329]/90 px-3 py-1 text-[10px] text-slate-300">
              {scene === 'opening'
                ? 'The case is ready to begin…'
                : scene === 'objection'
                ? 'Listen closely to the witness…'
                : 'The judge has reviewed the record.'}
            </div>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            {scene === 'opening' && (
              <>
                <div
                  className={`flex gap-3 rounded-xl border p-4 ${
                    isDarkMode
                      ? 'border-white/10 bg-white/[.04]'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <MessageSquareQuote
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      isDarkMode ? 'text-violet-300' : 'text-violet-600'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold">Judge Rivera</p>
                    <p className={`mt-1 text-sm leading-relaxed ${subText}`}>
                      “Counsel, you may make your opening statement. Tell the court what the evidence will show.”
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => chooseOpening('evidence')}
                    aria-pressed={openingChoice === 'evidence'}
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      openingChoice === 'evidence'
                        ? isDarkMode
                          ? 'border-violet-400 bg-violet-500/15'
                          : 'border-violet-500 bg-violet-50 shadow-xs'
                        : isDarkMode
                        ? 'border-white/10 bg-white/[.03] hover:border-violet-300/40'
                        : 'border-slate-200 bg-white hover:border-violet-300'
                    }`}
                  >
                    <span className="font-bold">“We will follow the records.”</span>
                    <span className={`mt-1 block text-xs leading-relaxed ${mutedText}`}>
                      Promise to present the server access log and establish a fair timeline.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => chooseOpening('accuse')}
                    aria-pressed={openingChoice === 'accuse'}
                    className={`rounded-xl border p-4 text-left text-sm transition ${
                      openingChoice === 'accuse'
                        ? isDarkMode
                          ? 'border-violet-400 bg-violet-500/15'
                          : 'border-violet-500 bg-violet-50 shadow-xs'
                        : isDarkMode
                        ? 'border-white/10 bg-white/[.03] hover:border-violet-300/40'
                        : 'border-slate-200 bg-white hover:border-violet-300'
                    }`}
                  >
                    <span className="font-bold">“The witness is lying.”</span>
                    <span className={`mt-1 block text-xs leading-relaxed ${mutedText}`}>
                      Make a personal accusation before the evidence is heard.
                    </span>
                  </button>
                </div>

                {openingSubmitted && (
                  <div
                    role="status"
                    className={`rounded-xl border p-4 text-sm ${
                      openingChoice === 'evidence'
                        ? isDarkMode
                          ? 'border-teal-400/30 bg-teal-400/[.07] text-teal-100'
                          : 'border-teal-300 bg-teal-50 text-teal-900'
                        : isDarkMode
                        ? 'border-amber-300/30 bg-amber-300/[.06] text-amber-100'
                        : 'border-amber-300 bg-amber-50 text-amber-900'
                    }`}
                  >
                    <p className="font-bold">
                      {openingChoice === 'evidence'
                        ? 'A strong, fair opening.'
                        : 'The judge asks you to focus on evidence.'}
                    </p>
                    <p className={`mt-1 text-xs leading-relaxed ${subText}`}>
                      {openingChoice === 'evidence'
                        ? 'You have not assumed what happened. The court will now hear the witness and review the server record.'
                        : 'Personal claims can distract from the facts. You can still make your case by comparing the testimony with the timeline.'}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  disabled={!openingChoice}
                  onClick={openingSubmitted ? () => advance('objection') : submitOpening}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {openingSubmitted ? 'Continue to testimony' : 'Submit decision'}{' '}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}

            {scene === 'objection' && (
              <>
                <div
                  className={`flex gap-3 rounded-xl border p-4 ${
                    isDarkMode
                      ? 'border-white/10 bg-white/[.04]'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <MessageSquareQuote
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      isDarkMode ? 'text-sky-300' : 'text-sky-600'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold">Witness · Project coordinator</p>
                    <p className={`mt-1 text-sm leading-relaxed ${subText}`}>
                      “I saw Alex carry the project folder out of the lab at 3:20. I’m certain it was them.”
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    className={`rounded-xl border p-4 ${
                      isDarkMode
                        ? 'border-amber-300/20 bg-amber-300/[.05]'
                        : 'border-amber-200 bg-amber-50/70'
                    }`}
                  >
                    <p
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                        isDarkMode ? 'text-amber-200' : 'text-amber-800'
                      }`}
                    >
                      <FileText className="h-4 w-4" /> Server access record
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      Alex logged out at{' '}
                      <span className={isDarkMode ? 'text-amber-200' : 'text-amber-700 font-bold'}>
                        3:05 PM
                      </span>
                    </p>
                    <p className={`mt-1 text-xs ${mutedText}`}>
                      The lab door system recorded no entry after logout.
                    </p>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      isDarkMode
                        ? 'border-white/10 bg-white/[.03]'
                        : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      Your next move
                    </p>
                    <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
                      The statement conflicts with the timestamped record. Choose a response that points the court to the discrepancy.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setObjectionChoice('timeline');
                      playSound('click');
                    }}
                    aria-pressed={objectionChoice === 'timeline'}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${
                      objectionChoice === 'timeline'
                        ? isDarkMode
                          ? 'border-amber-300 bg-amber-300/10'
                          : 'border-amber-400 bg-amber-50 shadow-xs'
                        : isDarkMode
                        ? 'border-white/10 bg-white/[.03] hover:border-amber-200/40'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <ShieldAlert
                      className={`h-5 w-5 shrink-0 ${
                        isDarkMode ? 'text-amber-300' : 'text-amber-600'
                      }`}
                    />
                    <span>
                      <b>Raise objection: “The timeline contradicts the record.”</b>
                      <span className={`mt-1 block text-xs ${mutedText}`}>
                        Ask the court to compare the testimony with the server log.
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setObjectionChoice('silent');
                      playSound('click');
                    }}
                    aria-pressed={objectionChoice === 'silent'}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${
                      objectionChoice === 'silent'
                        ? isDarkMode
                          ? 'border-violet-400 bg-violet-500/10'
                          : 'border-violet-500 bg-violet-50 shadow-xs'
                        : isDarkMode
                        ? 'border-white/10 bg-white/[.03] hover:border-violet-300/40'
                        : 'border-slate-200 bg-white hover:border-violet-300'
                    }`}
                  >
                    <span className="text-xl">🤐</span>
                    <span>
                      <b>Stay silent and move on</b>
                      <span className={`mt-1 block text-xs ${mutedText}`}>
                        Do not draw attention to the evidence that could help your client.
                      </span>
                    </span>
                  </button>
                </div>

                {objectionRaised && (
                  <div
                    role="status"
                    className={`rounded-xl border p-4 ${
                      objectionChoice === 'timeline'
                        ? isDarkMode
                          ? 'border-teal-400/30 bg-teal-400/[.07]'
                          : 'border-teal-300 bg-teal-50'
                        : isDarkMode
                        ? 'border-amber-300/30 bg-amber-300/[.06]'
                        : 'border-amber-300 bg-amber-50'
                    }`}
                  >
                    <p
                      className={`text-lg font-black tracking-wide ${
                        objectionChoice === 'timeline'
                          ? isDarkMode
                            ? 'text-teal-200'
                            : 'text-teal-800'
                          : isDarkMode
                          ? 'text-amber-200'
                          : 'text-amber-800'
                      }`}
                    >
                      {objectionChoice === 'timeline'
                        ? 'OBJECTION NOTED!'
                        : 'The testimony stands.'}
                    </p>
                    <p className={`mt-1 text-xs leading-relaxed ${subText}`}>
                      {objectionChoice === 'timeline'
                        ? 'The judge checks the record: Alex had already logged out before the time the witness described. The mismatch gives the court a reason to question the identification.'
                        : 'The record still conflicts with the testimony. You can reconsider and raise the timeline issue.'}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={!objectionChoice}
                    onClick={objectionRaised ? () => advance('verdict') : raiseObjection}
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {objectionRaised
                      ? 'Continue to case outcome'
                      : objectionChoice === 'timeline'
                      ? 'Raise objection!'
                      : 'Submit response'}{' '}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {objectionRaised && objectionChoice === 'silent' && (
                    <button
                      type="button"
                      onClick={() => {
                        setObjectionRaised(false);
                        setObjectionChoice(null);
                      }}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        isDarkMode
                          ? 'border-white/15 text-slate-300 hover:bg-white/5'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Reconsider
                    </button>
                  )}
                </div>
              </>
            )}

            {scene === 'verdict' && (
              <div className="space-y-5 text-center">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${
                    isDarkMode
                      ? 'border-teal-300/30 bg-teal-400/10'
                      : 'border-teal-300 bg-teal-50'
                  }`}
                >
                  <Gavel
                    className={`h-8 w-8 ${isDarkMode ? 'text-teal-200' : 'text-teal-700'}`}
                  />
                </div>

                <p
                  className={`text-xs font-bold uppercase tracking-[.2em] ${
                    isDarkMode ? 'text-teal-200' : 'text-teal-700'
                  }`}
                >
                  Case review complete
                </p>

                <h2 className="text-2xl font-extrabold">
                  {objectionChoice === 'timeline'
                    ? 'You defended your client with evidence.'
                    : 'A lesson in speaking up.'}
                </h2>

                <p className={`mx-auto max-w-xl text-sm leading-relaxed ${subText}`}>
                  {objectionChoice === 'timeline'
                    ? 'You compared the witness’s statement with the server record instead of relying on assumptions. The timeline raised reasonable doubt, and the judge ordered a fair review before any decision.'
                    : 'You noticed the conflict between testimony and the server record. In a real courtroom, a lawyer should raise relevant evidence respectfully so it can be considered.'}
                </p>

                <div className="mx-auto grid max-w-lg gap-3 text-left sm:grid-cols-2">
                  <div
                    className={`rounded-xl border p-4 ${
                      isDarkMode
                        ? 'border-white/10 bg-white/[.04]'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        isDarkMode ? 'text-amber-300' : 'text-amber-500'
                      }`}
                    />
                    <p className="mt-2 text-sm font-bold">Evidence first</p>
                    <p className={`mt-1 text-xs ${mutedText}`}>
                      Check records before making claims.
                    </p>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      isDarkMode
                        ? 'border-white/10 bg-white/[.04]'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <Sparkles
                      className={`h-5 w-5 ${
                        isDarkMode ? 'text-violet-300' : 'text-violet-600'
                      }`}
                    />
                    <p className="mt-2 text-sm font-bold">Fair advocacy</p>
                    <p className={`mt-1 text-xs ${mutedText}`}>
                      Challenge inconsistencies respectfully.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    href="/modes"
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                      isDarkMode
                        ? 'border-white/15 text-slate-200 hover:bg-white/5'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" /> Learning Modes
                  </Link>
                  <Link
                    href="/paths"
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
                  >
                    Back to Dream Paths <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className={`text-xs ${mutedText}`}>
                  Fictional learning scenario · {profile.name} · {career.replaceAll('-', ' ')}
                </p>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <section className={`rounded-2xl border p-5 ${sideSurface}`}>
            <p
              className={`text-[10px] font-bold uppercase tracking-wider ${
                isDarkMode ? 'text-violet-300' : 'text-violet-600'
              }`}
            >
              Case brief
            </p>
            <h2 className="mt-2 text-lg font-bold">The missing project file</h2>
            <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
              A class project folder vanished before the school showcase. The witness says your client carried it away, but the digital access record may tell a different story.
            </p>
            <div
              className={`mt-4 space-y-3 border-t pt-4 text-xs ${
                isDarkMode ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}
            >
              <p className="flex items-start gap-2">
                <CheckCircle2
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    isDarkMode ? 'text-teal-300' : 'text-teal-600'
                  }`}
                />
                Separate facts from assumptions
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    isDarkMode ? 'text-teal-300' : 'text-teal-600'
                  }`}
                />
                Use records to test a timeline
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    isDarkMode ? 'text-teal-300' : 'text-teal-600'
                  }`}
                />
                Speak up respectfully
              </p>
            </div>
          </section>

          <section
            className={`rounded-2xl border p-5 ${
              isDarkMode
                ? 'border-amber-300/20 bg-amber-300/[.04]'
                : 'border-amber-200 bg-amber-50/70'
            }`}
          >
            <p
              className={`text-xs font-bold ${
                isDarkMode ? 'text-amber-100' : 'text-amber-900'
              }`}
            >
              Counsel’s reminder
            </p>
            <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
              An objection should identify a real issue in the testimony. Here, the timestamped record and the witness’s timeline do not match.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default function SimulationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading courtroom…</div>}>
      <CourtroomSimulation />
    </Suspense>
  );
}