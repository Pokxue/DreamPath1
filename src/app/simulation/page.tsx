'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Gavel, MessageSquareQuote, Scale, ShieldAlert, Sparkles, Star } from 'lucide-react';
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

  return (
    <main className="mx-auto max-w-5xl space-y-5 pb-12 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/modes" className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> Learning Modes</Link>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">SIMULATION MODE · CASE 01</span>
      </div>

      <header className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-300">Junior lawyer · Evidence & courtroom skills</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">The Missing Project File</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300">A school’s project file disappeared just before the showcase. Your client is accused of taking it. Review the evidence, make a careful opening argument, and challenge testimony only when the record supports it.</p>
      </header>

      <nav aria-label="Simulation progress" className="grid grid-cols-3 gap-2">
        {(['opening', 'objection', 'verdict'] as const).map((item, index) => {
          const active = scene === item;
          const done = (item === 'opening' && scene !== 'opening') || (item === 'objection' && scene === 'verdict');
          return <button key={item} type="button" onClick={() => { setScene(item); playSound('click'); }} aria-current={active ? 'step' : undefined} aria-label={`Go to ${['opening statement', 'witness testimony', 'case outcome'][index]}`} className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition hover:border-violet-300/50 ${active ? 'border-violet-400/50 bg-violet-500/20 text-white' : done ? 'border-teal-400/30 bg-teal-400/10 text-teal-200' : 'border-white/10 bg-white/[.03] text-slate-300'}`}><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">{done ? '✓' : index + 1}</span>{['Opening statement', 'Witness testimony', 'Case outcome'][index]}</button>;
        })}
      </nav>

      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111329]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200"><Scale className="h-4 w-4" /> District Court · Hearing 04</span><span className="text-xs text-slate-400">{scene === 'opening' ? 'Opening arguments' : scene === 'objection' ? 'Witness testimony' : 'Ruling'}</span></div>
          <div className="relative min-h-[210px] overflow-hidden bg-[#17162d] px-5 py-6 sm:px-8">
            <div className="absolute inset-x-0 bottom-0 h-16 border-t-4 border-[#593f54] bg-[#30243d]" />
            <div className="absolute bottom-16 left-0 right-0 h-3 bg-[#7b5362]" />
            <div className="absolute left-[8%] top-8 h-20 w-24 rounded-t-full border-4 border-[#57415f] bg-[#282441]" />
            <div className="absolute right-[8%] top-8 h-20 w-24 rounded-t-full border-4 border-[#57415f] bg-[#282441]" />
            <div className="relative z-10 flex min-h-[155px] flex-wrap items-end justify-center gap-5 sm:gap-10">
              <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#f3bb7a] bg-[#9d5c50] text-3xl shadow-lg">👩🏽‍⚖️</div><p className="mt-2 text-[10px] font-bold text-amber-100">JUDGE</p></div>
              <div className="mb-2 rounded-2xl border border-violet-300/30 bg-[#282344] px-4 py-3 text-center shadow-lg"><div className="text-3xl">{scene === 'opening' ? '📁' : scene === 'objection' ? '🧑🏽‍💼' : '⚖️'}</div><p className="mt-1 text-[10px] font-bold text-violet-200">{scene === 'opening' ? 'CASE FILE' : scene === 'objection' ? 'WITNESS' : 'COURT'}</p></div>
              <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#f3bb7a] bg-[#4e668e] text-3xl shadow-lg">🧑🏻‍💼</div><p className="mt-2 text-[10px] font-bold text-sky-100">YOU · DEFENSE</p></div>
            </div>
            <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#111329]/90 px-3 py-1 text-[10px] text-slate-300">{scene === 'opening' ? 'The case is ready to begin…' : scene === 'objection' ? 'Listen closely to the witness…' : 'The judge has reviewed the record.'}</div>
          </div>
          <div className="space-y-4 p-5 sm:p-6">
            {scene === 'opening' && <>
              <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[.04] p-4"><MessageSquareQuote className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" /><div><p className="text-sm font-semibold">Judge Rivera</p><p className="mt-1 text-sm leading-relaxed text-slate-300">“Counsel, you may make your opening statement. Tell the court what the evidence will show.”</p></div></div>
              <div className="grid gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => chooseOpening('evidence')} aria-pressed={openingChoice === 'evidence'} className={`rounded-xl border p-4 text-left text-sm transition ${openingChoice === 'evidence' ? 'border-violet-400 bg-violet-500/15' : 'border-white/10 bg-white/[.03] hover:border-violet-300/40'}`}><span className="font-bold">“We will follow the records.”</span><span className="mt-1 block text-xs leading-relaxed text-slate-400">Promise to present the server access log and establish a fair timeline.</span></button>
                <button type="button" onClick={() => chooseOpening('accuse')} aria-pressed={openingChoice === 'accuse'} className={`rounded-xl border p-4 text-left text-sm transition ${openingChoice === 'accuse' ? 'border-violet-400 bg-violet-500/15' : 'border-white/10 bg-white/[.03] hover:border-violet-300/40'}`}><span className="font-bold">“The witness is lying.”</span><span className="mt-1 block text-xs leading-relaxed text-slate-400">Make a personal accusation before the evidence is heard.</span></button>
              </div>
              {openingSubmitted && <div role="status" className={`rounded-xl border p-4 text-sm ${openingChoice === 'evidence' ? 'border-teal-400/30 bg-teal-400/[.07] text-teal-100' : 'border-amber-300/30 bg-amber-300/[.06] text-amber-100'}`}><p className="font-bold">{openingChoice === 'evidence' ? 'A strong, fair opening.' : 'The judge asks you to focus on evidence.'}</p><p className="mt-1 text-xs leading-relaxed text-slate-300">{openingChoice === 'evidence' ? 'You have not assumed what happened. The court will now hear the witness and review the server record.' : 'Personal claims can distract from the facts. You can still make your case by comparing the testimony with the timeline.'}</p></div>}
              <button type="button" disabled={!openingChoice} onClick={openingSubmitted ? () => advance('objection') : submitOpening} className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-bold hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40">{openingSubmitted ? 'Continue to testimony' : 'Submit decision'} <ArrowRight className="h-4 w-4" /></button>
            </>}

            {scene === 'objection' && <>
              <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[.04] p-4"><MessageSquareQuote className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" /><div><p className="text-sm font-semibold">Witness · Project coordinator</p><p className="mt-1 text-sm leading-relaxed text-slate-300">“I saw Alex carry the project folder out of the lab at 3:20. I’m certain it was them.”</p></div></div>
              <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200"><FileText className="h-4 w-4" /> Server access record</p><p className="mt-2 text-sm font-semibold">Alex logged out at <span className="text-amber-200">3:05 PM</span></p><p className="mt-1 text-xs text-slate-400">The lab door system recorded no entry after logout.</p></div><div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Your next move</p><p className="mt-2 text-sm leading-relaxed text-slate-300">The statement conflicts with the timestamped record. Choose a response that points the court to the discrepancy.</p></div></div>
              <div className="space-y-2"><button type="button" onClick={() => { setObjectionChoice('timeline'); playSound('click'); }} aria-pressed={objectionChoice === 'timeline'} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm ${objectionChoice === 'timeline' ? 'border-amber-300 bg-amber-300/10' : 'border-white/10 bg-white/[.03] hover:border-amber-200/40'}`}><ShieldAlert className="h-5 w-5 shrink-0 text-amber-300" /><span><b>Raise objection: “The timeline contradicts the record.”</b><span className="mt-1 block text-xs text-slate-400">Ask the court to compare the testimony with the server log.</span></span></button><button type="button" onClick={() => { setObjectionChoice('silent'); playSound('click'); }} aria-pressed={objectionChoice === 'silent'} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm ${objectionChoice === 'silent' ? 'border-violet-400 bg-violet-500/10' : 'border-white/10 bg-white/[.03] hover:border-violet-300/40'}`}><span className="text-xl">🤐</span><span><b>Stay silent and move on</b><span className="mt-1 block text-xs text-slate-400">Do not draw attention to the evidence that could help your client.</span></span></button></div>
              {objectionRaised && <div role="status" className={`rounded-xl border p-4 ${objectionChoice === 'timeline' ? 'border-teal-400/30 bg-teal-400/[.07]' : 'border-amber-300/30 bg-amber-300/[.06]'}`}><p className={`text-lg font-black tracking-wide ${objectionChoice === 'timeline' ? 'text-teal-200' : 'text-amber-200'}`}>{objectionChoice === 'timeline' ? 'OBJECTION NOTED!' : 'The testimony stands.'}</p><p className="mt-1 text-xs leading-relaxed text-slate-300">{objectionChoice === 'timeline' ? 'The judge checks the record: Alex had already logged out before the time the witness described. The mismatch gives the court a reason to question the identification.' : 'The record still conflicts with the testimony. You can reconsider and raise the timeline issue.'}</p></div>}
              <div className="flex flex-wrap gap-3"><button type="button" disabled={!objectionChoice} onClick={objectionRaised ? () => advance('verdict') : raiseObjection} className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-bold hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40">{objectionRaised ? 'Continue to case outcome' : objectionChoice === 'timeline' ? 'Raise objection!' : 'Submit response'} <ArrowRight className="h-4 w-4" /></button>{objectionRaised && objectionChoice === 'silent' && <button type="button" onClick={() => { setObjectionRaised(false); setObjectionChoice(null); }} className="rounded-xl border border-white/15 px-4 py-3 text-sm text-slate-300 hover:bg-white/5">Reconsider</button>}</div>
            </>}

            {scene === 'verdict' && <div className="space-y-5 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal-300/30 bg-teal-400/10"><Gavel className="h-8 w-8 text-teal-200" /></div><p className="text-xs font-bold uppercase tracking-[.2em] text-teal-200">Case review complete</p><h2 className="text-2xl font-extrabold">{objectionChoice === 'timeline' ? 'You defended your client with evidence.' : 'A lesson in speaking up.'}</h2><p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300">{objectionChoice === 'timeline' ? 'You compared the witness’s statement with the server record instead of relying on assumptions. The timeline raised reasonable doubt, and the judge ordered a fair review before any decision.' : 'You noticed the conflict between testimony and the server record. In a real courtroom, a lawyer should raise relevant evidence respectfully so it can be considered.'}</p><div className="mx-auto grid max-w-lg gap-3 text-left sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/[.04] p-4"><Star className="h-5 w-5 text-amber-300" /><p className="mt-2 text-sm font-bold">Evidence first</p><p className="mt-1 text-xs text-slate-400">Check records before making claims.</p></div><div className="rounded-xl border border-white/10 bg-white/[.04] p-4"><Sparkles className="h-5 w-5 text-violet-300" /><p className="mt-2 text-sm font-bold">Fair advocacy</p><p className="mt-1 text-xs text-slate-400">Challenge inconsistencies respectfully.</p></div></div><div className="flex flex-wrap justify-center gap-3 pt-2"><Link href="/modes" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"><ArrowLeft className="h-4 w-4" /> Learning Modes</Link><Link href="/paths" className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold hover:bg-violet-400">Back to Dream Paths <ArrowRight className="h-4 w-4" /></Link></div><p className="text-xs text-slate-500">Fictional learning scenario · {profile.name} · {career.replaceAll('-', ' ')}</p></div>}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-violet-300">Case brief</p><h2 className="mt-2 text-lg font-bold">The missing project file</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">A class project folder vanished before the school showcase. The witness says your client carried it away, but the digital access record may tell a different story.</p><div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-xs text-slate-300"><p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />Separate facts from assumptions</p><p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />Use records to test a timeline</p><p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />Speak up respectfully</p></div></section>
          <section className="rounded-2xl border border-amber-300/20 bg-amber-300/[.04] p-5"><p className="text-xs font-bold text-amber-100">Counsel’s reminder</p><p className="mt-2 text-sm leading-relaxed text-slate-300">An objection should identify a real issue in the testimony. Here, the timestamped record and the witness’s timeline do not match.</p></section>
        </aside>
      </div>
    </main>
  );
}

export default function SimulationPage() {
  return <Suspense fallback={<div className="p-8 text-slate-400">Loading courtroom…</div>}><CourtroomSimulation /></Suspense>;
}
