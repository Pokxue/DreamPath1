'use client';

import React from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Shield,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS, TierId } from '@/types/career';
import { speakText, stopSpeaking } from '@/utils/sound';

export default function SettingsPage() {
  const { profile, setSettings, setEducationTier } = useProgressionStore();

  const handleReadAloudToggle = () => {
    const nextVal = !profile.readAloudEnabled;
    setSettings({ readAloudEnabled: nextVal });
    if (nextVal) {
      speakText('Voice assistance enabled.');
    } else {
      stopSpeaking();
    }
  };

  const handleSoundEffectsToggle = () => {
    setSettings({ soundEffectsEnabled: !profile.soundEffectsEnabled });
  };

  const handleReduceMotionToggle = () => {
    setSettings({ reduceMotion: !profile.reduceMotion });
  };

  const tiersList: TierId[] = ['moonrise', 'starlight', 'aurora', 'nebula', 'galaxy'];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          PREFERENCES
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Settings
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
          Make DreamPath comfortable, accessible, and safe for you.
        </p>
      </div>

      {/* 2-Column Grid matching Figma settings screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Learning Experience toggles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Learning experience</h3>

          {/* Read questions aloud */}
          <div className="p-4 rounded-2xl bg-[#141830] border border-[#212850] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Read questions aloud</div>
              <div className="text-xs text-slate-400">Hear instructions and important clues</div>
            </div>
            <button
              onClick={handleReadAloudToggle}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                profile.readAloudEnabled ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  profile.readAloudEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sound effects */}
          <div className="p-4 rounded-2xl bg-[#141830] border border-[#212850] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Sound effects</div>
              <div className="text-xs text-slate-400">Mission feedback and celebration sounds</div>
            </div>
            <button
              onClick={handleSoundEffectsToggle}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                profile.soundEffectsEnabled ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  profile.soundEffectsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduce motion */}
          <div className="p-4 rounded-2xl bg-[#141830] border border-[#212850] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Reduce motion</div>
              <div className="text-xs text-slate-400">Use fewer animations and transitions</div>
            </div>
            <button
              onClick={handleReduceMotionToggle}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                profile.reduceMotion ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  profile.reduceMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Account & Safety items */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Account & safety</h3>

          <div className="p-4 rounded-2xl bg-[#141830] border border-[#212850] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Personal information</div>
              <div className="text-xs text-slate-400">Name, age, education level</div>
            </div>
            <span className="text-xs font-semibold text-indigo-400">View</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#141830] border border-[#212850] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Parent connection</div>
              <div className="text-xs text-slate-400">{profile.parentName} • Verified</div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#141830] border border-[#212850] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Screen time</div>
              <div className="text-xs text-slate-400">{profile.screenTimeMaxMinutes} minute daily limit</div>
            </div>
            <span className="text-xs font-semibold text-amber-400">Configured</span>
          </div>
        </div>
      </div>

      {/* Educational Tier Framework Switcher from SPEC.md */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1224] border border-[#1e233d] space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            PEDAGOGICAL FRAMEWORK
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Educational Tier Switcher (5 Tiers from SPEC.md)
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Adapts vocabulary, UI tap targets, quiz questions count, and XP multipliers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {tiersList.map((tierKey) => {
            const t = EDUCATION_TIERS[tierKey];
            const isSelected = profile.educationTier === tierKey;
            return (
              <button
                key={tierKey}
                onClick={() => setEducationTier(tierKey)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/20 ring-1 ring-indigo-500 text-white'
                    : 'bg-[#141830] border-[#20274e] text-slate-300 hover:bg-[#1a2040]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold">{t.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400">{t.gradeDesc}</div>
                  <div className="text-[10px] text-indigo-300 font-semibold">{t.targetAge}</div>
                </div>

                <div className="mt-4 pt-2 border-t border-[#1e2447] text-[10px] text-slate-400">
                  Phase: <strong className="text-white">{t.phase}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

