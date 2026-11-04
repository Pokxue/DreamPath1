'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ShieldAlert,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Terminal,
  Volume2,
  RotateCcw,
  Star
} from 'lucide-react';
import { SCENARIO_DATABASE, ScenarioNode, ScenarioChoice } from '@/data/scenarios';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { speakText, playSound } from '@/utils/sound';
import confetti from 'canvas-confetti';

function SimulationEngine() {
  const searchParams = useSearchParams();
  const careerParam = searchParams.get('career') || 'software-engineer';

  const {
    profile,
    applySkillImpacts,
    applyReward,
    unlockAchievement,
    setActiveCareer
  } = useProgressionStore();

  const scenario = SCENARIO_DATABASE[careerParam] || SCENARIO_DATABASE['software-engineer'];

  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.startNodeId);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [choiceFeedback, setChoiceFeedback] = useState<ScenarioChoice | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [earnedStars, setEarnedStars] = useState<number>(0);

  // Sync active career with store
  useEffect(() => {
    setActiveCareer(careerParam);
    setCurrentNodeId(scenario.startNodeId);
    setSelectedChoiceId(null);
    setChoiceFeedback(null);
    setVisitedNodes([]);
  }, [careerParam, scenario.startNodeId, setActiveCareer]);

  const currentNode: ScenarioNode =
    scenario.nodes.find((n) => n.nodeId === currentNodeId) || scenario.nodes[0];

  const handleSelectChoice = (choice: ScenarioChoice) => {
    playSound('click');
    setSelectedChoiceId(choice.choiceId);
    setChoiceFeedback(choice);

    if (profile.readAloudEnabled) {
      speakText(choice.label);
    }
  };

  const handleSubmitDecision = () => {
    if (!choiceFeedback) return;

    if (choiceFeedback.isCorrect) {
      playSound('success');
    }

    // Apply skill impacts
    if (choiceFeedback.skillImpacts?.length) {
      applySkillImpacts(choiceFeedback.skillImpacts);
    }

    // Apply rewards
    if (choiceFeedback.rewards) {
      applyReward(choiceFeedback.rewards);
    }

    // Transition to next node
    const nextNodeId = choiceFeedback.nextNodeId;
    setVisitedNodes((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(nextNodeId);
    setSelectedChoiceId(null);
    setChoiceFeedback(null);

    // If next node is terminal, trigger celebration
    const nextNode = scenario.nodes.find((n) => n.nodeId === nextNodeId);
    if (nextNode && nextNode.type === 'terminal') {
      const stars = nextNode.terminalOutcome?.stars ?? 3;
      setEarnedStars(stars);
      playSound('levelUp');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe canvas fallback
      }

      if (careerParam === 'software-engineer') {
        unlockAchievement('cyber-guardian');
      } else if (careerParam === 'junior-lawyer') {
        unlockAchievement('sharp-advocate');
      } else if (careerParam === 'future-doctor') {
        unlockAchievement('careful-clinician');
      }

      if (profile.readAloudEnabled && nextNode.terminalOutcome) {
        speakText(
          `${nextNode.terminalOutcome.title}. ${nextNode.terminalOutcome.summary}`
        );
      }
    } else if (profile.readAloudEnabled && nextNode?.prompt) {
      speakText(nextNode.prompt);
    }
  };

  const handleRestart = () => {
    playSound('click');
    setCurrentNodeId(scenario.startNodeId);
    setSelectedChoiceId(null);
    setChoiceFeedback(null);
    setVisitedNodes([]);
    setEarnedStars(0);
  };

  const isTerminal = currentNode.type === 'terminal';
  const terminalOutcome = currentNode.terminalOutcome;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button and Career Badge */}
      <div className="flex items-center justify-between">
        <Link
          href="/paths"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to paths</span>
        </Link>

        <div className="flex items-center gap-2">
          {profile.readAloudEnabled && (
            <button
              onClick={() => speakText(`${scenario.title}. ${currentNode.prompt}`)}
              className="px-3 py-1.5 rounded-xl bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>
          )}

          <button
            onClick={handleRestart}
            className="px-3 py-1.5 rounded-xl bg-[#141830] border border-[#232b57] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Mission</span>
          </button>
        </div>
      </div>

      {/* Main Incident Header */}
      <div>
        <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
          {scenario.categoryBadge}
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          {scenario.title}
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-3xl leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {/* Terminal Win View */}
      {isTerminal && terminalOutcome ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#121630] via-[#1a1f42] to-[#121630] border border-emerald-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center text-3xl font-black">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-8 h-8 ${
                  starIdx <= (terminalOutcome.stars || earnedStars)
                    ? 'text-amber-400 fill-amber-400 animate-pulse'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              MISSION COMPLETED • {terminalOutcome.stars} STARS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {terminalOutcome.title}
            </h2>
            <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              {terminalOutcome.summary}
            </p>
          </div>

          {/* Rewards Callout */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#090b17]/80 border border-[#212952] flex items-center justify-around">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">XP REWARD</div>
              <div className="text-xl font-black text-amber-400">
                +{terminalOutcome.rewards.xp} XP
              </div>
            </div>
            <div className="w-px h-8 bg-[#212952]" />
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">SALARY BOOST</div>
              <div className="text-xl font-black text-emerald-400">
                +${terminalOutcome.rewards.salaryDelta}/mo
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              href="/paths"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Explore Next Path
            </Link>
            <Link
              href="/leaderboard"
              className="px-6 py-3 rounded-2xl bg-[#141830] hover:bg-[#1a2040] text-slate-200 font-bold text-sm border border-[#2b3360] transition-all"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      ) : (
        /* Split Screen Mission Console matching Figma screenshot */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Code / Evidence & Mentor Dialogue */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#0e1224] border border-[#1e233d] relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wide text-indigo-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>ACTIVE MISSION</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  +120 XP
                </span>
              </div>

              {currentNode.codeSnippet ? (
                <div className="rounded-2xl bg-[#070a16] border border-[#1b2142] overflow-hidden">
                  <div className="px-4 py-2 bg-[#0d1226] border-b border-[#1b2142] flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{currentNode.codeSnippet.filename}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {currentNode.codeSnippet.badge || 'LIVE'}
                    </span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{currentNode.codeSnippet.code}</code>
                  </pre>
                </div>
              ) : null}

              {/* Mentor NPC Box */}
              {currentNode.npc && (
                <div className="mt-4 p-4 rounded-2xl bg-[#141833] border border-[#232b57] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold flex items-center justify-center text-sm shrink-0">
                    {currentNode.npc.avatarChar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{currentNode.npc.name}</span>
                      <span className="text-[10px] text-indigo-300 px-1.5 py-0.2 rounded bg-indigo-500/20">
                        {currentNode.npc.role}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed italic">
                      "{currentNode.npc.dialogue}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Decision Choices & Submission */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                DECISION STEP
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                {currentNode.prompt}
              </h2>

              <div className="mt-6 space-y-3">
                {currentNode.choices?.map((choice) => {
                  const isSelected = selectedChoiceId === choice.choiceId;
                  return (
                    <button
                      key={choice.choiceId}
                      onClick={() => handleSelectChoice(choice)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-[#141830] border-[#222952] text-slate-200 hover:bg-[#1a2040] hover:border-indigo-500/40'
                      }`}
                    >
                      <span className="text-sm font-semibold leading-snug">
                        {choice.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 ml-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              {choiceFeedback && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#12172f] border border-[#1f2854] text-xs text-slate-300 leading-relaxed">
                  <div className="font-bold text-indigo-300 mb-1">Impact Preview:</div>
                  {choiceFeedback.explanation}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#1b203c]">
              <button
                disabled={!selectedChoiceId}
                onClick={handleSubmitDecision}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
                  selectedChoiceId
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-[#181d39] text-slate-500 cursor-not-allowed border border-[#242b54]'
                }`}
              >
                Submit decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SimulationPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">Loading career simulation engine...</div>}>
      <SimulationEngine />
    </Suspense>
  );
}

