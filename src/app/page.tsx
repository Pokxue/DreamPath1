'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, ArrowUpRight, BookOpen, Compass, GraduationCap, Sparkles, Star } from 'lucide-react';

const highlights = [
  { icon: Compass, title: 'Discover what fits', text: 'Explore career worlds built around your interests and strengths.' },
  { icon: BookOpen, title: 'Learn by doing', text: 'Try hands-on missions that turn big ideas into real skills.' },
  { icon: GraduationCap, title: 'Grow at your pace', text: 'Follow a path that meets you where you are today.' },
];

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const primaryDestination = isLoading ? '/auth/signin' : isAuthenticated ? '/home' : '/auth/signin';

  return (
    <main className="min-h-screen overflow-hidden bg-[#080a14] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 left-1/3 h-[34rem] w-[34rem] rounded-full bg-indigo-600/15 blur-[110px]" />
        <div className="absolute right-[-9rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[100px]" />
      </div>
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="inline-flex items-center gap-3" aria-label="DreamPath home">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25"><Sparkles className="h-6 w-6 text-white" /></span>
          <span className="text-xl font-black tracking-tight sm:text-2xl">Dream<span className="text-indigo-300">Path</span></span>
        </Link>
        {isAuthenticated ? (
          <Link href="/home" className="relative z-20 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-slate-200 transition hover:border-indigo-300/50 hover:bg-white/[0.08]">
            Go to Dashboard <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link href="/auth/signin" prefetch={false} className="relative z-20 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-slate-200 transition hover:border-indigo-300/50 hover:bg-white/[0.08]">
            Sign In <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-32 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3.5 py-2 text-xs font-bold tracking-wide text-indigo-200"><Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> A little curiosity can take you anywhere</div>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Your future is a path worth <span className="bg-gradient-to-r from-amber-200 via-pink-300 to-indigo-300 bg-clip-text text-transparent">exploring.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">DreamPath helps students discover exciting careers, build real-world skills, and turn “what if?” into “what’s next?” One playful mission at a time.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryDestination} prefetch={isAuthenticated || isLoading ? undefined : false} className="relative z-20 inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-7 text-base font-extrabold shadow-xl shadow-indigo-950/50 transition hover:-translate-y-0.5 hover:brightness-110">Get Started <ArrowRight className="h-5 w-5" /></Link>
            <div className="flex items-center gap-2 px-2 text-sm text-slate-400"><span className="flex -space-x-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080a14] bg-indigo-400 text-xs font-black text-indigo-950">D</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080a14] bg-pink-300 text-xs font-black text-pink-950">R</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080a14] bg-emerald-300 text-xs font-black text-emerald-950">M</span></span><span>Made for curious minds</span></div>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs font-semibold text-slate-400 sm:text-sm"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Explore at your pace</span><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-400" /> Discover new possibilities</span></div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-8 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-[#111429]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-indigo-300">Your next adventure</p><h2 className="mt-1 text-lg font-extrabold">A universe of possibilities</h2></div><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200"><Sparkles className="h-5 w-5" /></span></div>
            <div className="relative my-7 flex min-h-64 items-center justify-center overflow-hidden rounded-3xl border border-indigo-300/10 bg-gradient-to-br from-[#191d42] via-[#171633] to-[#25163d]">
              <div className="absolute h-56 w-56 rounded-full border border-indigo-300/20" /><div className="absolute h-40 w-64 rotate-[-28deg] rounded-[50%] border border-pink-300/20" /><div className="absolute h-48 w-64 rotate-[36deg] rounded-[50%] border border-sky-300/20" />
              <div className="absolute left-[16%] top-[22%] flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-[#111429]/90 text-sky-200 shadow-xl"><Compass className="h-5 w-5" /></div>
              <div className="absolute right-[15%] top-[27%] flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-300/20 bg-[#111429]/90 text-pink-200 shadow-xl"><Sparkles className="h-5 w-5" /></div>
              <div className="absolute bottom-[19%] left-[22%] flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-[#111429]/90 text-amber-200 shadow-xl"><BookOpen className="h-5 w-5" /></div>
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-indigo-200/25 bg-gradient-to-br from-indigo-400 via-indigo-700 to-purple-950 shadow-[inset_-16px_-18px_28px_rgba(0,0,0,.45),0_18px_60px_rgba(99,102,241,.3)]"><span className="absolute left-7 top-5 h-8 w-14 rounded-full bg-white/20 blur-lg" /><Sparkles className="h-12 w-12 text-white/90" /></div>
              <span className="absolute right-[22%] bottom-[19%] h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_14px_4px_rgba(253,230,138,.4)]" /><span className="absolute left-[30%] top-[16%] h-1.5 w-1.5 rounded-full bg-sky-200" />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">{['Discover', 'Explore', 'Decide'].map((label, index) => <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.035] p-3 text-center"><span className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${index === 0 ? 'bg-indigo-400/20 text-indigo-200' : index === 1 ? 'bg-pink-400/20 text-pink-200' : 'bg-amber-400/20 text-amber-200'}`}>0{index + 1}</span><span className="text-xs font-bold text-slate-300">{label}</span></div>)}</div>
          </div>
          <div className="absolute -left-4 top-1/3 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#111429] px-3 py-2 text-xs font-bold text-slate-200 shadow-xl sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Skills in progress</div>
          <div className="absolute -right-3 bottom-12 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#111429] px-3 py-2 text-xs font-bold text-slate-200 shadow-xl sm:flex"><Star className="h-3.5 w-3.5 text-amber-300" /> Find your spark</div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8 lg:px-12">{highlights.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/[0.07] bg-[#111429]/60 p-5 sm:p-6"><span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-200"><Icon className="h-5 w-5" /></span><h3 className="text-base font-extrabold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p></article>)}</div>
      </section>
      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© DreamPath · Your next chapter starts here.</span><Link href="/auth/signin" className="font-semibold text-slate-400 hover:text-white">Ready to begin? Sign in <span aria-hidden="true">→</span></Link></footer>
    </main>
  );
}
