# SPEC.md — DreamPath Unified Technical & Product Specification

This document provides a comprehensive, unified technical and product specification for **DreamPath**, an AI-powered gamified career exploration web application built for students. It combines internal Human-Computer Interaction (HCI) research, educational tier designs, route structures, and user personas with external technical research covering open occupational datasets (O*NET & ESCO), JSON scenario schemas, Zustand state management architecture, and LLM token optimization.

---

## 1. Executive Overview & Target Audience

### 1.1 Mission & Vision
Many students, particularly in developing regions like Indonesia, possess ambitious career goals but lack early guidance, structured roadmaps, and experiential insights. DreamPath bridges this guidance gap by transforming career exploration into a gamified, interactive journey. Players explore real-world vocations, complete educational quizzes, engage in branching job simulations, earn virtual salaries, and build verifiable skills.

### 1.2 Educational Tier Framework
DreamPath adapts its UI theme, target age group, mechanics, touch targets, and pedagogical goals across 5 distinct educational tiers:

| Tier Name | Target Grade & Age | Journey Phase | Quiz Setup & Count | XP Structure | UI Style & Accessibility |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Moonrise** | Pre-school (Ages 4–6) | Discover | 15 stages (3 units × 5 stages); 3 Qs/quiz, 5 Qs/checkpoint | 10 XP/quiz, 20 XP/checkpoint (180 Total) | Silver dusk (#1A2455), 64px tap targets, full audio read-aloud, stars only (no ranks). |
| **Starlight** | Lower Primary (Ages 7–9) | Explore | 15 stages (3 units × 5 stages); 4 Qs/quiz, 6 Qs/checkpoint | 20 XP/quiz, 40 XP/checkpoint (360 Total) | Indigo night (#231C52) & Gold sparkle (#FFD166), 56px tap targets, audio support. |
| **Aurora** | Upper Primary (Ages 10–12) | Connect | 15 stages (3 units × 5 stages); 5 Qs/quiz, 8 Qs/checkpoint | 30 XP/quiz, 60 XP/checkpoint (540 Total) | Night teal (#0C3140) & Mint (#4DF0C0), 48px tap targets, 8 career fields. |
| **Nebula** | Lower Secondary (Ages 13–15) | Plan | 15 stages (3 units × 5 stages); 6 Qs/quiz, 10 Qs/checkpoint | 40 XP/quiz, 80 XP/checkpoint (720 Total) | Plum night (#34154A) & Pink (#FF6FD8), goal-setting cards, subject path mapping. |
| **Galaxy** | Upper Secondary (Ages 16–18+) | Decide | 15 stages (3 units × 5 stages); 7 Qs/quiz, 12 Qs/checkpoint | 50 XP/quiz, 100 XP/checkpoint (900 Total) | Deep violet (#1F1456) & Gold core (#FFD166), full virtual salary leaderboard, Plan B mapping. |

*Total System XP across all 5 tiers = 2,700 XP.*

### 1.3 Target User Personas
1. **Tan Mei Ling (19, Diploma / Foundation)**: Career-focused, seeks proof of employability, prefers Simulation/Quiz modes, benchmarks herself on the Virtual Salary Leaderboard for finance/law.
2. **Aiman Hakim (14, Form 4 Secondary Boarding School)**: High achiever, limited access to mentors, wants realistic case-study simulations to test his ambition of becoming a lawyer.
3. **Priya Devi (21, Undergraduate)**: Undecided across multiple STEM fields, needs multi-field career roadmaps, AI virtual mentorship, CV portfolio tools, and Expert Rank certificates.
4. **Noor Aisyah (18, University Matriculation)**: Torn between healthcare, ICT, and education; requires the AI Career Pathfinding Quiz up front, rapid career switching, and streak counters.

---

## 2. Prescribed Tech Stack

- **Frontend Framework**: Next.js 14+ (App Router, Server Components, Route Handlers) with React 18 & TypeScript 5.x.
- **Styling & UI Components**: Tailwind CSS, shadcn/ui component library, Radix UI primitives, Lucide React icons, Framer Motion for micro-interactions and star animations.
- **State Management**: Zustand 4.x using sliced stores (`useSessionStore`, `useProgressionStore`, `useQuestStore`, `useSimulationStore`) with local storage persistence and optimistic UI updates.
- **Backend & Database**: Supabase (PostgreSQL, Row-Level Security, Supabase Auth, Storage for certificates/portfolios, Edge Functions).
- **Validation**: Zod for runtime API/form validation; Ajv for client/server JSON Schema validation of scenario graphs.
- **AI & Dataset Integration**: OpenAI API / Vercel AI SDK (`ai/react`) for structured streaming mentorship, mapped to edge-cached O*NET Web Services v2 and ESCO APIs.

---

## 3. Route Map & Screen Layouts

DreamPath follows a flat, 5-tab global navigation architecture (Home, Quests/Modes, Leaderboard, Achievements, Profile) to adhere to HCI rules of spatial consistency and shallow hierarchy depth.

```
/ (Landing Page)
├── /onboarding
│   ├── /login
│   ├── /register
│   ├── /career-quiz
│   ├── /education
│   └── /career-select
├── /home (Main Student Dashboard)
├── /modes (Game Mode Hub)
│   ├── /study (Study Mode - Interactive Notes)
│   ├── /quiz (Quiz Mode - Theory MCQs)
│   └── /simulation (Simulation Mode - Case Study Engine)
├── /quests/daily (Daily Quest Runner)
├── /leaderboard (Virtual Salary "Top Dreamers")
├── /achievements (Badges & Certificate Generator)
├── /profile (User Portfolio & Mock Interview Prep)
└── /settings (Accessibility & Parent Controls)
```

### 3.1 Onboarding Routes

#### `GET /` — Landing Screen
- **Layout**: Full-screen hero section with floating ambient star background.
- **Components**: DreamPath logo banner, "Start Your Dream!" CTA button, AI Career Quiz card ("Can't think of your dream ambition? Take our AI quiz").
- **User Actions**: Click CTA to enter registration or click AI Quiz preview.

#### `GET /onboarding/login` & `/onboarding/register`
- **Layout**: Centered card container with high contrast, single-column input layout.
- **Components**: Username/Password inputs, OAuth buttons, educational tier dropdown.
- **User Actions**: Authenticate or switch to signup mode.

#### `GET /onboarding/career-quiz` — AI Pathfinding Quiz
- **Layout**: Multi-step wizard with smooth horizontal slide transitions.
- **Components**: 5-question interest/quirk questionnaire, progress indicator, AI suggestion cards with career match percentages.
- **User Actions**: Select interests, view AI-suggested career shortlist, select starting career.

#### `GET /onboarding/education` — Tier Selector
- **Layout**: 5 horizontal cards featuring custom tier themes (Moonrise to Galaxy).
- **Components**: Color badges, target age ranges, journey phase tags.
- **User Actions**: Choose active education tier.

#### `GET /onboarding/career-select` — Career Path Picker
- **Layout**: Grid layout of career cards (Software Developer, Doctor, Designer, Chef, Lawyer).
- **Components**: Career icon, estimated base salary, skill tags.
- **User Actions**: Set primary active career.

---

### 3.2 Core Application Routes

#### `GET /home` — Main Dashboard
- **Layout**: Top status bar + 2-column main area + persistent bottom 5-tab menu.
- **Key Components**:
  1. *Header*: Avatar, greeting, level badge (e.g. Lv. 7), active career switcher pills.
  2. *Knowledge Indicator*: Visual progress bar from Beginner to Master at the top of the dashboard.
  3. *Experience Bar*: XP progress toward next level (e.g. "660 XP / 780 XP to Level 8").
  4. *Skill Progress Bars*: Individual competency percentages (e.g. HTML/CSS at 90%, JS at 62%).
  5. *Daily Quest Card*: Active task banner with timer and start button ("Daily Quest: Build a button — +50 XP").
- **User Actions**: Switch active career, start daily quest, tap navigation bar icons.

#### `GET /modes` — Game Mode Hub
- **Layout**: 3 prominent interactive mode cards.
- **Key Components**:
  - *Study Mode Card*: Interactive theory notes & background reading.
  - *Quiz Mode Card*: Multiple-choice questions (MCQs) for knowledge testing.
  - *Simulation Mode Card*: Real-world short-answer & branching case study scenarios.
- **User Actions**: Tap any card to launch the respective learning route.

#### `GET /modes/study` — Study Mode
- **Layout**: Reader view with collapsible table of contents and progress tracker.
- **Key Components**: Markdown lesson renderer, key term callouts, audio read-aloud control, "Mark Complete" button (+20 XP).

#### `GET /modes/quiz` — Quiz Mode
- **Layout**: Card-based quiz player with immediate visual/audio feedback.
- **Key Components**: Question counter, question prompt, option buttons, star rating calculator, progress summary modal.

#### `GET /modes/simulation` — Simulation Mode
- **Layout**: Dialogue-heavy split-screen layout (Mentor NPC portrait + interactive scenario tree).
- **Key Components**: Mentor NPC dialogue bubble, dynamic scenario prompt, decision choices with skill delta previews, feedback pane, terminal summary card.

#### `GET /leaderboard` — Virtual Salary Leaderboard ("Top Dreamers")
- **Layout**: Top stats summary cards + 3-stage podium + scrollable leaderboard table.
- **Key Components**:
  1. *Stats Row*: Streak counter (e.g., 17 days), completed challenges (27), collected quiz points (67,231), level (Lv. 8).
  2. *Top 3 Podium*: Avatars, names, career titles, and simulated monthly salary (e.g. #1 Rahf Fathy — RM 18,000/month).
  3. *Rankings Table*: Ranks #4–#10+ displaying user avatar, name, career role, level badge, and monthly salary in RM.
  4. *User Sticky Rank*: Sticky footer showing current user's rank (e.g., #14 Username — RM 8,320/month) and distance to Top 10.

#### `GET /achievements` — Badges & Certificates
- **Layout**: Badge grid + certificate preview modal.
- **Key Components**: Unlocked level badges (Moonrise to Galaxy), skill milestone icons, Expert Rank downloadable PDF/PNG certificate generator.

#### `GET /profile` — User Portfolio & Interview Prep
- **Layout**: Two-tab layout (Portfolio Builder / Mock Interview Prep).
- **Key Components**: Saved scenario outcomes, project artifacts, audio/text mock interview simulator with AI feedback.

#### `GET /settings` — Accessibility & Parent Controls
- **Layout**: Grouped settings menu.
- **Key Components**: Read-aloud audio toggle, sound effects slider, reduce-motion toggle, adult/parent override lock (to switch child age tiers).

---

## 4. Game Mechanics & State Management

### 4.1 Scoring, XP & Salary Formulas

#### 1. Star Rating Calculation (Per Stage)
$$\text{Accuracy} = \frac{\text{Correct Knowledge Answers}}{\text{Total Knowledge Questions}} \times 100$$
$$\text{Stars} = \begin{cases} 3 & \text{if } \text{Accuracy} \ge 90\% \\ 2 & \text{if } 60\% \le \text{Accuracy} < 90\% \\ 1 & \text{if } \text{Completion only} \end{cases}$$

#### 2. XP Multipliers & Rewards
$$\text{Quiz XP} = 10 \times \text{Tier Level Number} \quad (\text{Moonrise}=10, \text{Starlight}=20, \text{Aurora}=30, \text{Nebula}=40, \text{Galaxy}=50)$$
$$\text{Checkpoint XP} = \text{Quiz XP} \times 2$$

#### 3. Virtual Monthly Salary Calculation (RM)
$$\text{Simulated Salary (RM)} = \text{Base Salary} + (\text{Total XP} \times 15) + \sum (\text{Skill Competency Level} \times 250)$$

---

### 4.2 Zustand State Architecture

State is split across 4 modular client stores using Zustand with `persist` middleware:

```typescript
// stores/useProgressionStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SkillId = 'html-css' | 'javascript' | 'problem-solving' | 'communication' | 'accessibility';

export interface SkillProgress {
  xp: number;
  competency: number; // 0 to 100
}

interface ProgressionState {
  userId: string | null;
  totalXp: number;
  simulatedSalary: number;
  skills: Record<SkillId, SkillProgress>;
  careerFit: Record<string, number>;
  pendingOps: number;
  hydrateUser: (userId: string, initial: Partial<ProgressionState>) => void;
  applySkillImpacts: (impacts: Array<{ skillId: SkillId; xp: number; competencyDelta?: number }>) => void;
  applyReward: (reward: { xp?: number; salaryDelta?: number }) => void;
}

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      userId: null,
      totalXp: 0,
      simulatedSalary: 0,
      skills: {
        'html-css': { xp: 0, competency: 0 },
        javascript: { xp: 0, competency: 0 },
        'problem-solving': { xp: 0, competency: 0 },
        communication: { xp: 0, competency: 0 },
        accessibility: { xp: 0, competency: 0 },
      },
      careerFit: {},
      pendingOps: 0,
      hydrateUser: (userId, initial) =>
        set((state) => ({
          userId,
          totalXp: initial.totalXp ?? state.totalXp,
          simulatedSalary: initial.simulatedSalary ?? state.simulatedSalary,
          skills: { ...state.skills, ...(initial.skills ?? {}) },
          careerFit: { ...state.careerFit, ...(initial.careerFit ?? {}) },
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
          return {
            skills: nextSkills,
            totalXp: state.totalXp + gainedXp,
            pendingOps: state.pendingOps + 1,
          };
        }),
      applyReward: ({ xp = 0, salaryDelta = 0 }) =>
        set((state) => ({
          totalXp: state.totalXp + xp,
          simulatedSalary: state.simulatedSalary + salaryDelta,
          pendingOps: state.pendingOps + 1,
        })),
    }),
    {
      name: 'dreampath-progression',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        totalXp: state.totalXp,
        simulatedSalary: state.simulatedSalary,
        skills: state.skills,
        careerFit: state.careerFit,
      }),
    }
  )
);
```

---

### 4.3 Branching Scenario JSON Schema & Graph Structure

Scenario graphs use node IDs rather than nested trees to support loops, shared endings, and deterministic branching.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://dreampath.app/schemas/career-scenario.json",
  "title": "DreamPath Career Scenario Graph",
  "type": "object",
  "required": ["schemaVersion", "scenarioId", "careerId", "startNodeId", "nodes"],
  "properties": {
    "schemaVersion": { "type": "string", "const": "1.0.0" },
    "scenarioId": { "type": "string" },
    "careerId": { "type": "string" },
    "title": { "type": "string" },
    "startNodeId": { "type": "string" },
    "nodes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["nodeId", "type", "prompt"],
        "properties": {
          "nodeId": { "type": "string" },
          "type": { "type": "string", "enum": ["decision", "mentor", "terminal"] },
          "prompt": { "type": "string" },
          "npc": {
            "type": "object",
            "required": ["name", "role", "dialogue"],
            "properties": {
              "name": { "type": "string" },
              "role": { "type": "string" },
              "dialogue": { "type": "string" }
            }
          },
          "choices": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["choiceId", "label", "nextNodeId"],
              "properties": {
                "choiceId": { "type": "string" },
                "label": { "type": "string" },
                "nextNodeId": { "type": "string" },
                "skillImpacts": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["skillId", "xp"],
                    "properties": {
                      "skillId": { "type": "string" },
                      "xp": { "type": "integer" },
                      "competencyDelta": { "type": "number" }
                    }
                  }
                },
                "rewards": {
                  "type": "object",
                  "properties": {
                    "xp": { "type": "integer" },
                    "salaryDelta": { "type": "integer" }
                  }
                }
              }
            }
          },
          "terminalOutcome": {
            "type": "object",
            "required": ["outcomeId", "title", "summary"],
            "properties": {
              "outcomeId": { "type": "string" },
              "title": { "type": "string" },
              "summary": { "type": "string" },
              "rewards": {
                "type": "object",
                "properties": {
                  "xp": { "type": "integer" },
                  "salaryDelta": { "type": "integer" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

---

### 4.4 LLM Latency & Token Optimization

DreamPath enforces a **hybrid simulation architecture**:
1. **Deterministic Scenario Graph**: All XP, skill impacts, branching logic, and career facts are pre-computed in static JSON.
2. **Dynamic LLM Layer**: LLMs generate personalized mentor advice, conversational tone, and context-aware feedback.
3. **Prompt Caching**: System instructions and career context are cached separately from volatile turn data.

```
[SYSTEM PROMPT - CACHED]
You are Maya, a supportive Senior Front-End Engineer mentoring a student on DreamPath.
Keep feedback encouraging, practical, and under 80 words. Return JSON only.

[CAREER CONTEXT - CACHED PER CAREER]
Career: Junior Front-End Developer (O*NET 15-1252.00)
Core Skills: HTML/CSS, JavaScript, Problem Solving, Accessibility.

[VOLATILE STATE - UNCACHED]
Current Node: mobile-checkout-bug
Student Choice: "Reproduce the bug before patching"
Skill Delta: HTML/CSS +10, Problem Solving +15
```

---

## 5. Database Schema & External APIs

### 5.1 Supabase PostgreSQL Database DDL

```sql
-- Supabase Core Schema for DreamPath

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  education_tier TEXT NOT NULL DEFAULT 'Nebula', -- Moonrise, Starlight, Aurora, Nebula, Galaxy
  primary_career_id TEXT,
  total_xp INTEGER NOT NULL DEFAULT 0,
  simulated_salary INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE careers (
  id TEXT PRIMARY KEY, -- e.g. 'software-developer'
  title TEXT NOT NULL,
  family TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 5),
  description TEXT NOT NULL,
  base_salary INTEGER NOT NULL DEFAULT 5000,
  onet_code TEXT,
  esco_uri TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE skills (
  id TEXT PRIMARY KEY, -- e.g. 'html-css'
  name TEXT NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE user_skills (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id TEXT REFERENCES skills(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  competency NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE quests (
  id TEXT PRIMARY KEY,
  career_id TEXT REFERENCES careers(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  quest_type TEXT NOT NULL DEFAULT 'daily'
);

CREATE TABLE user_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id TEXT REFERENCES quests(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'completed', -- 'active', 'completed'
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE scenarios (
  id TEXT PRIMARY KEY,
  career_id TEXT REFERENCES careers(id),
  title TEXT NOT NULL,
  graph_json JSONB NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can read own skills" ON user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read own quest history" ON user_quests FOR SELECT USING (auth.uid() = user_id);
```

### 5.2 External Dataset Ingestion Architecture

DreamPath ingests data from **O*NET Web Services v2** and **ESCO APIs** into a unified internal representation:

```typescript
interface ExternalCareerRef {
  source: 'onet' | 'esco';
  externalId: string; // O*NET-SOC code (e.g. '15-1252.00') or ESCO URI
  retrievedAt: string;
}

interface SkillRequirement {
  skillId: string;
  onetElementId?: string;
  escoUri?: string;
  importance: number; // 0-100
  level: number; // 0-100
}

interface DreamPathCareer {
  careerId: string;
  title: string;
  family: 'technology' | 'healthcare' | 'design' | 'law' | 'culinary';
  tier: 1 | 2 | 3 | 4 | 5;
  description: string;
  dailyTasks: string[];
  requiredSkills: SkillRequirement[];
  externalRefs: ExternalCareerRef[];
}
```

---

## 6. Step-by-Step Antigravity Implementation Roadmap

### Phase 1: Scaffolding & Design System (Week 1)
- [ ] Initialize Next.js 14 App Router project with TypeScript and Tailwind CSS.
- [ ] Install shadcn/ui components (`button`, `card`, `progress`, `dialog`, `tabs`, `avatar`).
- [ ] Set up global color variables for the 5 tiers (Moonrise silver, Starlight gold, Aurora mint, Nebula pink, Galaxy deep violet).
- [ ] Build global bottom 5-tab persistent navigation bar and global header layout.
- [ ] Implement local routing for `/onboarding` screens and `/home`.

### Phase 2: Game State & Simulation Engine (Week 2)
- [ ] Implement Zustand stores (`useProgressionStore`, `useSimulationStore`, `useQuestStore`, `useSessionStore`) with `persist` middleware.
- [ ] Integrate Ajv JSON Schema validator for career scenario graphs.
- [ ] Build `/modes/simulation` engine component capable of parsing scenario nodes, rendering mentor dialogue, and executing choice branching.
- [ ] Implement optimistic XP, skill competency, and virtual salary state updates.
- [ ] Construct `/modes/quiz` component with star calculation algorithms (1–3 stars).

### Phase 3: Supabase Backend Integration (Week 3)
- [ ] Deploy PostgreSQL schema, RLS policies, and triggers on Supabase.
- [ ] Connect Supabase Auth for registration and login flows.
- [ ] Create edge route handlers (`/api/mentor`, `/api/quests`) for syncing client progression events with PostgreSQL.
- [ ] Seed career catalog with pre-computed O*NET/ESCO normalized dataset profiles.

### Phase 4: Polish, AI Mentorship & Micro-interactions (Week 4)
- [ ] Integrate Vercel AI SDK for streaming mentor responses in `/modes/simulation` with fallback static nodes.
- [ ] Add Framer Motion micro-animations for star rewards, level-up popups, and XP progress bar fills.
- [ ] Build `/leaderboard` "Top Dreamers" component with real-time rankings by virtual salary.
- [ ] Implement accessibility toggles (Read-Aloud speech synthesis, sound effects, reduce-motion) and Parent Controls overlay in `/settings`.
