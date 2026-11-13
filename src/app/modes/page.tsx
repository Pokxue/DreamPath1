'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  HelpCircle,
  PlayCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Volume2,
  Star
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { CAREER_PATHS } from '@/types/career';
import { QUIZ_DATABASE } from '@/data/quizzes';
import { STUDY_DATABASE } from '@/data/studies';
import { speakText, playSound } from '@/utils/sound';

export default function ModesHubPage() {
  const { profile, applyReward, applySkillImpacts, setActiveCareer } = useProgressionStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'hub' | 'quiz' | 'study'>('hub');

  
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
  
  // Quiz state
  const activeCareer = CAREER_PATHS.find((c) => c.id === profile.activeCareerId) || CAREER_PATHS[0];
  const quiz = QUIZ_DATABASE[activeCareer.id] || QUIZ_DATABASE['software-engineer'];
  const study = STUDY_DATABASE[activeCareer.id] || STUDY_DATABASE['software-engineer'];

  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [studyReadCompleted, setStudyReadCompleted] = useState(false);

  const handleAnswerQuiz = (index: number) => {
    playSound('click');
    setSelectedOpt(index);
    const isCorrect = quiz.questions[currentQIdx].options[index].isCorrect;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQIdx < quiz.questions.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      playSound('success');
      setQuizFinished(true);
      applyReward({ xp: quiz.xpReward, salaryDelta: 100, missionCountDelta: 1 });
      applySkillImpacts([{ skillId: 'problem-solving', xp: quiz.xpReward, competencyDelta: 5 }]);
    }
  };

  const handleMarkStudyCompleted = () => {
    playSound('success');
    setStudyReadCompleted(true);
    applyReward({ xp: study.xpReward, salaryDelta: 60 });
  };

  
  const cardBg = isDarkMode
    ? 'bg-[#16172B] border-white/5'
    : 'bg-white border-slate-200 shadow-sm';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div
      ref={containerRef}
      className={`space-y-8 max-w-5xl mx-auto transition-colors duration-200 ${
        isDarkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Modes Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-2">
            THREE INTERACTIVE LEARNING MODES
          </div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${headingText}`}>
            Game Mode Hub
          </h1>
          <p className={`mt-1 text-sm ${subText}`}>
            Learn theory, test comprehension through MCQs, or engage in real-world branching scenarios.
          </p>
        </div>

        <div className={`flex items-center gap-1.5 p-1 rounded-2xl border ${
          isDarkMode ? 'bg-[#16172B] border-white/5' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('hub');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hub'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : `${subText} hover:${headingText}`
            }`}
          >
            Hub Overview
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('quiz');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : `${subText} hover:${headingText}`
            }`}
          >
            Quiz Mode
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('study');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'study'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : `${subText} hover:${headingText}`
            }`}
          >
            Study Notes
          </button>
        </div>
      </div>

      {activeTab === 'hub' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Study Mode Card */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between h-full group hover:border-emerald-500/40 transition-all ${cardBg}`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                MODE 01 • READ & LEARN
              </span>
              <h3 className={`text-xl font-bold mt-1 ${headingText}`}>Study Mode</h3>
              <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
                Interactive theory notes, key terminology glossaries, and audio read-aloud support for deeper understanding.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('study')}
              className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? 'bg-[#0D0E1A]/60 hover:bg-[#0D0E1A] text-emerald-400 border-white/5' 
                  : 'bg-slate-100 hover:bg-slate-200 text-emerald-600 border-slate-200'
              }`}
            >
              <span>Read interactive notes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quiz Mode Card */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between h-full group hover:border-amber-500/40 transition-all ${cardBg}`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                MODE 02 • TEST KNOWLEDGE
              </span>
              <h3 className={`text-xl font-bold mt-1 ${headingText}`}>Quiz Mode</h3>
              <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
                Card-based multiple choice challenges with immediate explanations, star rating calculators, and instant XP gains.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? 'bg-[#0D0E1A]/60 hover:bg-[#0D0E1A] text-amber-400 border-white/5' 
                  : 'bg-slate-100 hover:bg-slate-200 text-amber-600 border-slate-200'
              }`}
            >
              <span>Start quiz challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Simulation Mode Card */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between h-full group hover:border-indigo-500/40 transition-all sm:col-span-2 lg:col-span-1 ${cardBg}`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center mb-4">
                <PlayCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                MODE 03 • CASE STUDIES
              </span>
              <h3 className={`text-xl font-bold mt-1 ${headingText}`}>Simulation Mode</h3>
              <p className={`mt-2 text-sm leading-relaxed ${subText}`}>
                Step into a courtroom case, weigh witness testimony against records, and practice making evidence-based objections.
              </p>
            </div>
            <Link
              href="/simulation?career=junior-lawyer"
              onClick={() => {
                setActiveCareer('junior-lawyer');
                playSound('click');
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Launch live simulation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* QUIZ MODE VIEW */}
      {activeTab === 'quiz' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                QUIZ CHALLENGE • {activeCareer.title}
              </span>
              <h2 className={`text-2xl font-bold mt-1 ${headingText}`}>{quiz.title}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
              +{quiz.xpReward} XP
            </span>
          </div>

          {quizFinished ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 mx-auto flex items-center justify-center">
                <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
              </div>
              <h3 className={`text-2xl font-black ${headingText}`}>Quiz Completed!</h3>
              <p className={`text-sm ${subText}`}>
                You scored <span className={`font-bold ${headingText}`}>{quizScore}</span> out of{' '}
                <span className={`font-bold ${headingText}`}>{quiz.questions.length}</span> correct.
              </p>
              <div className="inline-flex gap-2 text-amber-400 justify-center">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-6 h-6 ${
                      s <= (quizScore >= 3 ? 3 : quizScore >= 2 ? 2 : 1)
                        ? 'fill-amber-400 text-amber-400'
                        : isDarkMode ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setCurrentQIdx(0);
                    setSelectedOpt(null);
                    setQuizScore(0);
                    setQuizFinished(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={`text-xs font-semibold mb-2 ${subText}`}>
                Question {currentQIdx + 1} of {quiz.questions.length}
              </div>
              <div className={`text-lg font-bold leading-relaxed ${headingText}`}>
                {quiz.questions[currentQIdx].question}
              </div>

              {profile.readAloudEnabled && (
                <button
                  onClick={() => speakText(quiz.questions[currentQIdx].question)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-400 font-semibold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Read aloud question</span>
                </button>
              )}

              <div className="mt-5 space-y-3">
                {quiz.questions[currentQIdx].options.map((opt, i) => {
                  const isSelected = selectedOpt === i;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswerQuiz(i)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-slate-900 dark:text-white'
                            : 'bg-rose-500/15 border-rose-500/40 text-slate-900 dark:text-white'
                          : isDarkMode
                            ? 'bg-[#0D0E1A]/40 border-white/5 text-slate-200 hover:border-indigo-500/30'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-500/30'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-bold text-xs flex items-center justify-center shrink-0">
                        {opt.label}
                      </span>
                      <div className="flex-1 text-sm break-words">
                        <div>{opt.text}</div>
                        {isSelected && (
                          <div className={`mt-2 text-xs italic ${subText}`}>
                            {opt.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  disabled={selectedOpt === null}
                  onClick={handleNextQuizQuestion}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    selectedOpt !== null
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                      : isDarkMode
                        ? 'bg-[#0D0E1A]/40 text-slate-600 cursor-not-allowed border border-white/5'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-transparent'
                  }`}
                >
                  {currentQIdx < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STUDY MODE VIEW */}
      {activeTab === 'study' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${cardBg}`}>
          <div className={`flex items-center justify-between border-b pb-4 ${
            isDarkMode ? 'border-white/5' : 'border-slate-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                STUDY NOTES • {activeCareer.title}
              </span>
              <h2 className={`text-2xl font-bold mt-1 ${headingText}`}>{study.title}</h2>
              <div className={`text-xs mt-1 ${subText}`}>{study.readTime}</div>
            </div>
            {profile.readAloudEnabled && (
              <button
                onClick={() =>
                  speakText(
                    study.sections.map((s) => `${s.heading}. ${s.body.join(' ')}`).join('. ')
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen to article</span>
              </button>
            )}
          </div>

          <div className={`space-y-6 text-sm leading-relaxed ${subText}`}>
            {study.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className={`text-base font-bold ${headingText}`}>{section.heading}</h3>
                {section.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.keyTerms && (
                  <div className={`mt-3 p-4 rounded-2xl border space-y-2 ${
                    isDarkMode ? 'bg-[#0D0E1A]/40 border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                      Key Vocabulary
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.keyTerms.map((term) => (
                        <div key={term.term} className="text-xs break-words">
                          <span className={`font-bold ${headingText}`}>{term.term}: </span>
                          <span className={subText}>{term.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`pt-4 border-t flex items-center justify-between ${
            isDarkMode ? 'border-white/5' : 'border-slate-200'
          }`}>
            <span className={`text-xs ${subText}`}>Earn +{study.xpReward} XP upon completion</span>
            {studyReadCompleted ? (
              <div className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </div>
            ) : (
              <button
                onClick={handleMarkStudyCompleted}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
              >
                Mark as read (+{study.xpReward} XP)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}