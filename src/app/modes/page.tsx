'use client';

import React, { useState } from 'react';
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
  const { profile, applyReward, applySkillImpacts } = useProgressionStore();
  const [activeTab, setActiveTab] = useState<'hub' | 'quiz' | 'study'>('hub');
  
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

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Modes Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            THREE INTERACTIVE LEARNING MODES
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Game Mode Hub
          </h1>
          <p className="mt-1 text-slate-300 text-sm">
            Learn theory, test comprehension through MCQs, or engage in real-world branching scenarios.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-[#0f1224] rounded-2xl border border-[#1e233d]">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('hub');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hub'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hub Overview
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('quiz');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quiz Mode
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('study');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'study'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Study Notes
          </button>
        </div>
      </div>

      {activeTab === 'hub' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Study Mode Card */}
          <div className="p-6 rounded-3xl bg-[#0e1224] border border-[#1e233d] flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                MODE 01 • READ & LEARN
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Study Mode</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Interactive theory notes, key terminology glossaries, and audio read-aloud support for deeper understanding.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('study')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#141933] hover:bg-[#1a2040] text-emerald-300 font-bold text-xs border border-[#222a55] transition-all flex items-center justify-center gap-2"
            >
              <span>Read interactive notes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quiz Mode Card */}
          <div className="p-6 rounded-3xl bg-[#0e1224] border border-[#1e233d] flex flex-col justify-between group hover:border-amber-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                MODE 02 • TEST KNOWLEDGE
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Quiz Mode</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Card-based multiple choice challenges with immediate explanations, star rating calculators, and instant XP gains.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#141933] hover:bg-[#1a2040] text-amber-300 font-bold text-xs border border-[#222a55] transition-all flex items-center justify-center gap-2"
            >
              <span>Start quiz challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Simulation Mode Card */}
          <div className="p-6 rounded-3xl bg-[#0e1224] border border-[#1e233d] flex flex-col justify-between group hover:border-indigo-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <PlayCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                MODE 03 • CASE STUDIES
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Simulation Mode</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Branching incident trees, NPC mentor guidance, and real consequences affecting career salary and skill milestones.
              </p>
            </div>
            <Link
              href={`/simulation?career=${activeCareer.id}`}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Launch live simulation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* QUIZ MODE VIEW */}
      {activeTab === 'quiz' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                QUIZ CHALLENGE • {activeCareer.title}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{quiz.title}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
              +{quiz.xpReward} XP
            </span>
          </div>

          {quizFinished ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
              </div>
              <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
              <p className="text-sm text-slate-300">
                You scored <span className="font-bold text-white">{quizScore}</span> out of{' '}
                <span className="font-bold text-white">{quiz.questions.length}</span> correct.
              </p>
              <div className="inline-flex gap-2 text-amber-400 justify-center">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-6 h-6 ${
                      s <= (quizScore >= 3 ? 3 : quizScore >= 2 ? 2 : 1)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-600'
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
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Question {currentQIdx + 1} of {quiz.questions.length}
              </div>
              <div className="text-lg font-bold text-white leading-relaxed">
                {quiz.questions[currentQIdx].question}
              </div>

              {profile.readAloudEnabled && (
                <button
                  onClick={() => speakText(quiz.questions[currentQIdx].question)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
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
                            ? 'bg-emerald-500/20 border-emerald-500 text-white'
                            : 'bg-rose-500/20 border-rose-500 text-white'
                          : 'bg-[#141830] border-[#222952] text-slate-200 hover:bg-[#1a2040]'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#1f2652] text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {opt.label}
                      </span>
                      <div className="flex-1 text-sm">
                        <div>{opt.text}</div>
                        {isSelected && (
                          <div className="mt-2 text-xs text-slate-300 italic">
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
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-[#181d39] text-slate-500 cursor-not-allowed'
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
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-6">
          <div className="flex items-center justify-between border-b border-[#1b203c] pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                STUDY NOTES • {activeCareer.title}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{study.title}</h2>
              <div className="text-xs text-slate-400 mt-1">{study.readTime}</div>
            </div>
            {profile.readAloudEnabled && (
              <button
                onClick={() =>
                  speakText(
                    study.sections.map((s) => `${s.heading}. ${s.body.join(' ')}`).join('. ')
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen to article</span>
              </button>
            )}
          </div>

          <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
            {study.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-white">{section.heading}</h3>
                {section.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.keyTerms && (
                  <div className="mt-3 p-4 rounded-2xl bg-[#141833] border border-[#232b57] space-y-2">
                    <div className="text-xs font-extrabold uppercase tracking-wide text-indigo-400">
                      Key Vocabulary
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.keyTerms.map((term) => (
                        <div key={term.term} className="text-xs">
                          <span className="font-bold text-white">{term.term}: </span>
                          <span className="text-slate-400">{term.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1b203c] flex items-center justify-between">
            <span className="text-xs text-slate-400">Earn +{study.xpReward} XP upon completion</span>
            {studyReadCompleted ? (
              <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </div>
            ) : (
              <button
                onClick={handleMarkStudyCompleted}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
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

