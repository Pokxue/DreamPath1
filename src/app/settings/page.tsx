'use client';

import React, { useState, useEffect, useRef } from 'react';
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

  const cardBg = isDarkMode
    ? 'bg-[#16172B] border-white/5'
    : 'bg-white border-slate-200 shadow-sm';

  const innerCardBg = isDarkMode
    ? 'bg-[#0D0E1A]/40 border-white/5'
    : 'bg-slate-50 border-slate-200/80';

  const headingText = isDarkMode ? 'text-white' : 'text-slate-900';
  const subText = isDarkMode ? 'text-slate-400' : 'text-slate-600';

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
    <div
      ref={containerRef}
      className={`min-h-screen font-sans space-y-8 max-w-5xl mx-auto p-6 md:p-10 transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0D0E1A] text-white' : 'bg-transparent text-slate-900'
      }`}
    >
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-500">
          PREFERENCES
        </div>
        <h1 className={`text-3xl font-extrabold tracking-tight mt-1 ${headingText}`}>
          Settings
        </h1>
        <p className={`mt-2 text-sm max-w-2xl leading-relaxed ${subText}`}>
          Make DreamPath comfortable, accessible, and safe for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${cardBg}`}>
          <h3 className={`text-base font-bold mb-2 ${headingText}`}>Learning experience</h3>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${innerCardBg}`}>
            <div>
              <div className={`text-sm font-bold ${headingText}`}>Read questions aloud</div>
              <div className={`text-xs ${subText}`}>Hear instructions and important clues</div>
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

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${innerCardBg}`}>
            <div>
              <div className={`text-sm font-bold ${headingText}`}>Sound effects</div>
              <div className={`text-xs ${subText}`}>Mission feedback and celebration sounds</div>
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

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${innerCardBg}`}>
            <div>
              <div className={`text-sm font-bold ${headingText}`}>Reduce motion</div>
              <div className={`text-xs ${subText}`}>Use fewer animations and transitions</div>
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

        <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${cardBg}`}>
          <h3 className={`text-base font-bold mb-2 ${headingText}`}>Account & safety</h3>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${innerCardBg}`}>
            <div>
              <div className={`text-sm font-bold ${headingText}`}>Personal information</div>
              <div className={`text-xs ${subText}`}>Name, age, education level</div>
            </div>
            <span className="text-xs font-semibold text-indigo-500">View</span>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${innerCardBg}`}>
            <div>
              <div className={`text-sm font-bold ${headingText}`}>Parent connection</div>
              <div className={`text-xs ${subText}`}>{profile.parentName} • Verified</div>
            </div>
            <span className="text-xs font-semibold text-emerald-500">Active</span>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${innerCardBg}`}>
            <div>
              <div className={`text-sm font-bold ${headingText}`}>Screen time</div>
              <div className={`text-xs ${subText}`}>{profile.screenTimeMaxMinutes} minute daily limit</div>
            </div>
            <span className="text-xs font-semibold text-amber-500">Configured</span>
          </div>
        </div>
      </div>

      <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${cardBg}`}>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            PEDAGOGICAL FRAMEWORK
          </div>
          <h3 className={`text-xl font-bold mt-1 ${headingText}`}>
            Educational Tier Switcher (5 Tiers)
          </h3>
          <p className={`mt-1 text-xs ${subText}`}>
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
                    : isDarkMode
                    ? 'bg-[#0D0E1A]/40 border-white/5 text-slate-300 hover:bg-[#16172B]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold">{t.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className={`text-[11px] ${subText}`}>{t.gradeDesc}</div>
                  <div className="text-[10px] text-indigo-500 font-semibold">{t.targetAge}</div>
                </div>

                <div className={`mt-4 pt-2 border-t text-[10px] ${isDarkMode ? 'border-white/5 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  Phase: <strong className={headingText}>{t.phase}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}