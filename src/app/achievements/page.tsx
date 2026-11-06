'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  Code2,
  Flame,
  Compass,
  Lock,
  Sparkles,
  Star,
  Trophy,
  Sun,
  Moon,
  Footprints,
  Rocket
} from 'lucide-react';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function AchievementsPage() {
  const { profile, totalXp } = useProgressionStore();
  
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#0D0E1A] text-white font-sans p-6 md:p-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
            YOUR DREAM DASHBOARD
          </div>
          <div className="text-xl font-semibold">
            Good evening, {profile?.name || 'Alex'}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#16172B] rounded-full p-1 border border-white/5">
            <button className="bg-[#8B5CF6] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-md">
              English
            </button>
            <button className="text-slate-400 hover:text-slate-300 px-5 py-1.5 rounded-full text-xs font-bold transition-colors">
              Bahasa Melayu
            </button>
          </div>
          <div className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <span className="text-orange-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" /> 7
            </span> 
            day streak
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-9 h-9 rounded-full bg-[#16172B] flex items-center justify-center text-slate-400 hover:text-white border border-white/5 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="w-9 h-9 rounded-full bg-orange-900/40 text-orange-300 flex items-center justify-center font-bold text-sm border border-orange-500/20">
            A
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">
            EVERY STEP COUNTS
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Achievements
          </h1>
          <p className="text-slate-400 text-sm">
            Look how far you've come, {profile?.name || 'Alex'}. Your curiosity is turning into something great.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#16172B] p-6 rounded-2xl border border-white/5 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Total XP</div>
              <div className="text-2xl font-bold mb-1">{totalXp ? totalXp.toLocaleString() : '1,280'}</div>
              <div className="text-xs text-indigo-400 font-medium">+120 this week</div>
            </div>
          </div>

          <div className="bg-[#16172B] p-6 rounded-2xl border border-white/5 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Missions Done</div>
              <div className="text-2xl font-bold mb-1">24</div>
              <div className="text-xs text-amber-500 font-medium">Top 18%</div>
            </div>
          </div>

          <div className="bg-[#16172B] p-6 rounded-2xl border border-white/5 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-1">Current Streak</div>
              <div className="text-2xl font-bold mb-1">7 days</div>
              <div className="text-xs text-orange-400 font-medium">A little learning, every day</div>
            </div>
          </div>
        </div>

        <div className="bg-[#16172B] p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-24 h-24 shrink-0 rounded-full border-4 border-[#8B5CF6] flex flex-col items-center justify-center bg-[#16172B] shadow-[0_0_25px_rgba(139,92,246,0.15)] relative">
            <span className="text-[10px] text-slate-400 font-bold -mb-1 mt-1">LEVEL</span>
            <span className="text-4xl font-black text-white">4</span>
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">Growing dreamer</h2>
              <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 w-max">
                Primary
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Every mission brings a new possibility. Just 320 XP to Level 5!
            </p>
            <div className="h-2 w-full bg-[#0D0E1A] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] w-[80%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>1,280 XP</span>
              <span>1,600 XP - Level 5</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your badge collection</h2>
            <div className="flex gap-3">
               <div className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
                  All badges - 6
               </div>
               <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  Unlocked - 3
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             <div className="bg-[#16172B] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center justify-center gap-3 hover:border-indigo-500/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-1">
                   <Footprints className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-sm font-bold text-white mb-1.5">First small step</h3>
                   <p className="text-xs text-slate-400">Complete your very first mission.</p>
                </div>
                <div className="text-[10px] font-bold text-[#34D399] border border-[#34D399]/30 bg-[#34D399]/10 px-3 py-1 rounded-full mt-2">
                   Unlocked
                </div>
             </div>

             <div className="bg-[#16172B] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center justify-center gap-3 hover:border-orange-500/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 mb-1">
                   <Flame className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-sm font-bold text-white mb-1.5">Week of wonder</h3>
                   <p className="text-xs text-slate-400">Keep a 7-day learning streak.</p>
                </div>
                <div className="text-[10px] font-bold text-[#34D399] border border-[#34D399]/30 bg-[#34D399]/10 px-3 py-1 rounded-full mt-2">
                   Unlocked
                </div>
             </div>

             <div className="bg-[#16172B] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center justify-center gap-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-1">
                   <Compass className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-sm font-bold text-white mb-1.5">Curious explorer</h3>
                   <p className="text-xs text-slate-400">Explore 3 different dream paths.</p>
                </div>
                <div className="text-[10px] font-bold text-[#34D399] border border-[#34D399]/30 bg-[#34D399]/10 px-3 py-1 rounded-full mt-2">
                   Unlocked
                </div>
             </div>
             
             <div className="bg-[#16172B]/50 p-8 rounded-3xl border border-transparent flex flex-col items-center text-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#21233E] text-slate-500 flex items-center justify-center mb-1">
                   <Rocket className="w-6 h-6" /> 
                </div>
                <div>
                   <h3 className="text-sm font-bold text-slate-300 mb-1.5">Mission maker</h3>
                   <p className="text-xs text-slate-500">Complete 30 playful missions.</p>
                </div>
                <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                   <Lock className="w-3.5 h-3.5" /> 24 / 30 missions
                </div>
             </div>
             
             <div className="bg-[#16172B]/50 p-8 rounded-3xl border border-transparent flex flex-col items-center text-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#21233E] text-slate-500 flex items-center justify-center mb-1">
                   <Code2 className="w-6 h-6" /> 
                </div>
                <div>
                   <h3 className="text-sm font-bold text-slate-300 mb-1.5">Code creator</h3>
                   <p className="text-xs text-slate-500">Finish your Software Engineer path.</p>
                </div>
                <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                   <Lock className="w-3.5 h-3.5" /> 38% of path completed
                </div>
             </div>
             
             <div className="bg-[#16172B]/50 p-8 rounded-3xl border border-transparent flex flex-col items-center text-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#21233E] text-slate-500 flex items-center justify-center mb-1">
                   <Sparkles className="w-6 h-6" /> 
                </div>
                <div>
                   <h3 className="text-sm font-bold text-slate-300 mb-1.5">Two weeks strong</h3>
                   <p className="text-xs text-slate-500">Build a 14-day learning streak.</p>
                </div>
                <div className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                   <Lock className="w-3.5 h-3.5" /> 7 / 14 days
                </div>
             </div>
          </div>
        </div>

        <div className="bg-[#16172B] p-8 rounded-3xl border border-white/5 mt-6">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Little wins, big feelings</h2>
              <span className="text-[11px] text-slate-400">Recent milestones</span>
           </div>
           
           <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0D0E1A]/40 border border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                       <Flame className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-white mb-0.5">A whole week of wonder!</h4>
                       <p className="text-xs text-slate-400">You showed up for 7 days in a row.</p>
                    </div>
                 </div>
                 <span className="text-[11px] text-slate-500 font-medium">Today</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0D0E1A]/40 border border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                       <Compass className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-white mb-0.5">Your curiosity crossed new paths</h4>
                       <p className="text-xs text-slate-400">Software Engineer, Junior Lawyer & Future Doctor.</p>
                    </div>
                 </div>
                 <span className="text-[11px] text-slate-500 font-medium">This week</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}