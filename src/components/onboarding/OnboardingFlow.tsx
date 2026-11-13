'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, Check, Code2, GraduationCap, Scale, Sparkles, Stethoscope, type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgressionStore } from '@/stores/useProgressionStore';
import type { TierId } from '@/types/career';

const educationOptions: Array<{ id: TierId; title: string; grade: string; description: string }> = [
  { id: 'moonrise', title: 'Pre-school', grade: 'Ages 4–6', description: 'A gentle start full of discovery and play.' },
  { id: 'starlight', title: 'Primary School', grade: 'Ages 7–12', description: 'Build foundations and explore new interests.' },
  { id: 'nebula', title: 'Secondary School', grade: 'Ages 13–18', description: 'Connect your strengths with future possibilities.' },
  { id: 'galaxy', title: 'Tertiary (University)', grade: 'University & beyond', description: 'Turn your ambitions into a focused career path.' },
];

const careerOptions: Array<{ id: string; title: string; description: string; icon: LucideIcon }> = [
  { id: 'future-doctor', title: 'Doctor', description: 'Care for people, understand health, and help patients feel better.', icon: Stethoscope },
  { id: 'software-engineer', title: 'Software Engineer', description: 'Build useful apps, solve puzzles, and shape the digital world.', icon: Code2 },
  { id: 'junior-lawyer', title: 'Lawyer', description: 'Seek fairness, examine evidence, and stand up for others.', icon: Scale },
];

export function OnboardingFlow({ step }: { step: 'education' | 'career' }) {
  const router = useRouter();
  const { user, isLoading, refreshUser } = useAuth();
  const setEducationTier = useProgressionStore((state) => state.setEducationTier);
  const setActiveCareer = useProgressionStore((state) => state.setActiveCareer);
  const [educationTier, setSelectedEducation] = useState<TierId | null>(null);
  const [dreamJobId, setDreamJobId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/auth/signin');
      return;
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (isLoading || !user || step !== 'career') return;
    if (!sessionStorage.getItem(`dreampath-onboarding-${user.id}`)) router.replace('/onboarding/education');
  }, [isLoading, user, step, router]);

  const continueToCareer = () => {
    if (!educationTier || !user) return;
    setEducationTier(educationTier);
    sessionStorage.setItem(`dreampath-onboarding-${user.id}`, educationTier);
    router.push('/onboarding/career');
  };

  const finishOnboarding = async () => {
    if (!user || !dreamJobId) return;
    const savedTier = sessionStorage.getItem(`dreampath-onboarding-${user.id}`) as TierId | null;
    if (!savedTier || !educationOptions.some((option) => option.id === savedTier)) {
      router.replace('/onboarding/education');
      return;
    }
    setError('');
    setIsSaving(true);
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ educationTier: savedTier, dreamJobId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not save your choices.');
      if (!data.user) throw new Error('Your selections were not fully saved. Please try again.');
      setEducationTier(savedTier);
      setActiveCareer(dreamJobId);
      sessionStorage.removeItem(`dreampath-onboarding-${user.id}`);
      await refreshUser();
      router.replace('/home');
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save your choices. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-[#080a14] text-indigo-200">Preparing your journey…</div>;
  }

  const isEducation = step === 'education';
  return (
    <main className="min-h-screen overflow-hidden bg-[#080a14] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2.5" aria-label="DreamPath home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25"><Sparkles className="h-5 w-5" /></span>
            <span className="text-xl font-extrabold tracking-tight">Dream<span className="text-indigo-300">Path</span></span>
          </a>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 sm:text-sm">
            <span className={`rounded-full px-3 py-1.5 ${isEducation ? 'bg-indigo-500/20 text-indigo-200' : 'bg-emerald-500/15 text-emerald-300'}`}>01 <span className="hidden sm:inline">Education</span></span>
            <span className="h-px w-5 bg-slate-700 sm:w-10" />
            <span className={`rounded-full px-3 py-1.5 ${!isEducation ? 'bg-indigo-500/20 text-indigo-200' : 'bg-slate-800'}`}>02 <span className="hidden sm:inline">Dream career</span></span>
          </div>
        </header>

        <div className="mb-8 max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-300"><Sparkles className="h-4 w-4" /> Your path starts here</p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">{isEducation ? 'Where are you on your learning journey?' : 'What would you love to become?'}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400 sm:text-lg">{isEducation ? 'Choose your current school level so we can make every mission feel just right for you.' : 'Pick a career that sparks your curiosity. You can explore other paths any time.'}</p>
        </div>

        {isEducation ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {educationOptions.map((option, index) => {
              const selected = educationTier === option.id;
              const colors = ['#60A5FA', '#FFD166', '#FF6FD8', '#FBBF24'];
              return <button key={option.id} type="button" aria-pressed={selected} onClick={() => setSelectedEducation(option.id)} className={`group relative flex min-h-36 items-start gap-4 rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${selected ? 'border-indigo-400 bg-indigo-500/15 ring-1 ring-indigo-400/40' : 'border-[#252a48] bg-[#111429] hover:border-indigo-500/60'}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-lg font-black" style={{ color: colors[index], backgroundColor: '#211e46' }}>{index + 1}</span>
                <span className="min-w-0 flex-1"><span className="block text-lg font-bold">{option.title}</span><span className="mt-0.5 block text-xs font-semibold" style={{ color: colors[index] }}>{option.grade}</span><span className="mt-2 block text-sm leading-relaxed text-slate-400">{option.description}</span></span>
                <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-600 text-transparent'}`}><Check className="h-3 w-3" /></span>
              </button>;
            })}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {careerOptions.map((career) => {
              const Icon = career.icon;
              const selected = dreamJobId === career.id;
              return <button key={career.id} type="button" aria-pressed={selected} onClick={() => setDreamJobId(career.id)} className={`group flex min-h-52 flex-col rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${selected ? 'border-indigo-400 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 ring-1 ring-indigo-400/40' : 'border-[#252a48] bg-[#111429] hover:border-indigo-500/60'}`}>
                <span className="mb-4 flex items-center justify-between"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${selected ? 'border-indigo-400/40 bg-indigo-500/20 text-indigo-200' : 'border-sky-500/20 bg-sky-500/10 text-sky-300'}`}><Icon className="h-6 w-6" /></span><span className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-600 text-transparent'}`}><Check className="h-3 w-3" /></span></span>
                <span className="text-lg font-bold">{career.title}</span><span className="mt-1 text-sm leading-relaxed text-slate-400">{career.description}</span>
              </button>;
            })}
          </div>
        )}

        {error && <p role="alert" className="mt-5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
        <footer className="mt-8 flex flex-col-reverse gap-3 border-t border-[#252a48] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {isEducation ? <span className="text-sm text-slate-500">Step 1 of 2 · You can change this later</span> : <button type="button" onClick={() => router.push('/onboarding/education')} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/5"><ArrowLeft className="h-4 w-4" /> Back</button>}
          <button type="button" disabled={isEducation ? !educationTier : !dreamJobId || isSaving} onClick={isEducation ? continueToCareer : finishOnboarding} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">
            {isSaving ? 'Saving your path…' : isEducation ? 'Continue' : 'Finish & explore'}
            {isEducation ? <ArrowRight className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
          </button>
        </footer>
      </div>
    </main>
  );
}
