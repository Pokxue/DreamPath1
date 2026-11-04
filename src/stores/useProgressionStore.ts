import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TierId, SkillId, CAREER_PATHS } from '@/types/career';

export interface SkillProgress {
  xp: number;
  competency: number; // 0 - 100
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarChar: string;
  age: number;
  joinedDate: string;
  currentLevel: number;
  educationTier: TierId;
  activeCareerId: string;
  screenTimeUsedMinutes: number;
  screenTimeMaxMinutes: number;
  readAloudEnabled: boolean;
  soundEffectsEnabled: boolean;
  reduceMotion: boolean;
  colorMode: 'dark' | 'light';
  parentName: string;
  parentEmail: string;
  streakDays: number;
  missionsCompleted: number;
  learningTimeMinutes: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
  icon: string;
  tier: string;
  unlockedAt?: string;
}

interface ProgressionState {
  profile: UserProfile;
  totalXp: number;
  simulatedSalary: number;
  skills: Record<SkillId, SkillProgress>;
  achievements: AchievementItem[];
  careerProgress: Record<string, number>; // careerId -> progressPercent
  completedQuests: string[];
  
  // Actions
  setColorMode: (mode: 'dark' | 'light') => void;
  toggleColorMode: () => void;
  setEducationTier: (tier: TierId) => void;
  setActiveCareer: (careerId: string) => void;
  setSettings: (settings: Partial<Pick<UserProfile, 'readAloudEnabled' | 'soundEffectsEnabled' | 'reduceMotion' | 'screenTimeMaxMinutes'>>) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addScreenTime: (mins: number) => void;
  
  applySkillImpacts: (impacts: Array<{ skillId: SkillId; xp: number; competencyDelta?: number }>) => void;
  applyReward: (reward: { xp?: number; salaryDelta?: number; missionCountDelta?: number }) => void;
  completeQuest: (questId: string, xpReward: number) => void;
  unlockAchievement: (achievementId: string) => void;
  calculateSalary: () => number;
}

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'cyber-guardian',
    title: 'Cyber Guardian',
    desc: 'Block your first SQL breach in simulation',
    unlocked: true,
    icon: 'ShieldCheck',
    tier: 'Gold',
    unlockedAt: 'Yesterday',
  },
  {
    id: 'sharp-advocate',
    title: 'Sharp Advocate',
    desc: 'Win a defense case with objective evidence',
    unlocked: true,
    icon: 'Scale',
    tier: 'Silver',
    unlockedAt: '3 days ago',
  },
  {
    id: 'careful-clinician',
    title: 'Careful Clinician',
    desc: 'Choose safe antibiotic treatment in medical round',
    unlocked: true,
    icon: 'HeartPulse',
    tier: 'Bronze',
    unlockedAt: '1 week ago',
  },
  {
    id: 'master-architect',
    title: 'Code Architect',
    desc: 'Implement responsive accessibility rules across 5 apps',
    unlocked: false,
    icon: 'Code2',
    tier: 'Gold',
  },
  {
    id: 'streak-master',
    title: 'Week Explorer',
    desc: 'Maintain a 7-day exploration streak',
    unlocked: true,
    icon: 'Flame',
    tier: 'Gold',
    unlockedAt: 'Today',
  },
  {
    id: 'plan-b-strategist',
    title: 'Plan B Strategist',
    desc: 'Explore alternative vocational paths across 3 distinct fields',
    unlocked: false,
    icon: 'Compass',
    tier: 'Platinum',
  },
];

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      profile: {
        name: 'Alex Rivera',
        handle: '@alexdreams',
        avatarChar: 'A',
        age: 11,
        joinedDate: '12 January 2025',
        currentLevel: 4,
        educationTier: 'aurora',
        activeCareerId: 'software-engineer',
        screenTimeUsedMinutes: 38,
        screenTimeMaxMinutes: 60,
        readAloudEnabled: true,
        soundEffectsEnabled: true,
        reduceMotion: false,
        colorMode: 'dark',
        parentName: 'Maria Rivera',
        parentEmail: 'maria.rivera@example.com',
        streakDays: 7,
        missionsCompleted: 24,
        learningTimeMinutes: 272, // 4h 32m
      },
      totalXp: 1280,
      simulatedSalary: 2160,
      skills: {
        'html-css': { xp: 450, competency: 78 },
        javascript: { xp: 320, competency: 55 },
        'problem-solving': { xp: 510, competency: 82 },
        communication: { xp: 260, competency: 64 },
        accessibility: { xp: 190, competency: 48 },
      },
      achievements: INITIAL_ACHIEVEMENTS,
      careerProgress: {
        'software-engineer': 38,
        'junior-lawyer': 12,
        'future-doctor': 25,
        'product-designer': 20,
        'master-chef': 10,
      },
      completedQuests: ['quest-btn-1'],

      setColorMode: (mode) =>
        set((state) => ({ profile: { ...state.profile, colorMode: mode } })),

      toggleColorMode: () =>
        set((state) => ({
          profile: {
            ...state.profile,
            colorMode: state.profile.colorMode === 'dark' ? 'light' : 'dark',
          },
        })),

      setEducationTier: (tier) =>
        set((state) => ({ profile: { ...state.profile, educationTier: tier } })),

      setActiveCareer: (careerId) =>
        set((state) => ({ profile: { ...state.profile, activeCareerId: careerId } })),

      setSettings: (settings) =>
        set((state) => ({ profile: { ...state.profile, ...settings } })),

      updateProfile: (updated) =>
        set((state) => ({ profile: { ...state.profile, ...updated } })),

      addScreenTime: (mins) =>
        set((state) => ({
          profile: {
            ...state.profile,
            screenTimeUsedMinutes: Math.min(
              state.profile.screenTimeMaxMinutes,
              state.profile.screenTimeUsedMinutes + mins
            ),
          },
        })),

      applySkillImpacts: (impacts) =>
        set((state) => {
          const nextSkills = { ...state.skills };
          let gainedXp = 0;
          for (const impact of impacts) {
            const current = nextSkills[impact.skillId] ?? { xp: 0, competency: 0 };
            nextSkills[impact.skillId] = {
              xp: current.xp + impact.xp,
              competency: Math.max(0, Math.min(100, current.competency + (impact.competencyDelta ?? 0))),
            };
            gainedXp += Math.max(0, impact.xp);
          }

          const newTotalXp = state.totalXp + gainedXp;
          const newLevel = Math.max(1, Math.floor(newTotalXp / 300) + 1);

          // Recalculate salary
          const activeCareer = CAREER_PATHS.find((c) => c.id === state.profile.activeCareerId);
          const base = activeCareer?.baseSalary ?? 5000;
          const competencySum = Object.values(nextSkills).reduce(
            (acc, curr) => acc + (curr.competency / 100) * 150,
            0
          );
          const calculatedSalary = Math.round(base * 0.25 + newTotalXp * 0.8 + competencySum);

          return {
            skills: nextSkills,
            totalXp: newTotalXp,
            simulatedSalary: calculatedSalary,
            profile: {
              ...state.profile,
              currentLevel: newLevel,
            },
          };
        }),

      applyReward: ({ xp = 0, salaryDelta = 0, missionCountDelta = 0 }) =>
        set((state) => {
          const newXp = state.totalXp + xp;
          const newLevel = Math.max(1, Math.floor(newXp / 300) + 1);
          return {
            totalXp: newXp,
            simulatedSalary: state.simulatedSalary + salaryDelta,
            profile: {
              ...state.profile,
              currentLevel: newLevel,
              missionsCompleted: state.profile.missionsCompleted + missionCountDelta,
            },
          };
        }),

      completeQuest: (questId, xpReward) =>
        set((state) => {
          if (state.completedQuests.includes(questId)) return state;
          const newXp = state.totalXp + xpReward;
          return {
            completedQuests: [...state.completedQuests, questId],
            totalXp: newXp,
            simulatedSalary: state.simulatedSalary + 80,
            profile: {
              ...state.profile,
              missionsCompleted: state.profile.missionsCompleted + 1,
            },
          };
        }),

      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, unlocked: true, unlockedAt: 'Just now' } : a
          ),
        })),

      calculateSalary: () => {
        const state = get();
        const activeCareer = CAREER_PATHS.find((c) => c.id === state.profile.activeCareerId);
        const base = activeCareer?.baseSalary ?? 5000;
        return Math.round(base * 0.25 + state.totalXp * 0.8);
      },
    }),
    {
      name: 'dreampath-user-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

