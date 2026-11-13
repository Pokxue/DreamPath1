import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserProfile } from '@/stores/useProgressionStore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path - stored in the project root
const DB_PATH = path.join(process.cwd(), 'dreampath.db');

// Initialize database connection
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    initializeSchema(db);
  }
  return db;
}

function initializeSchema(db: Database.Database) {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      handle TEXT,
      avatar_char TEXT,
      age INTEGER,
      joined_date TEXT,
      current_level INTEGER DEFAULT 1,
      education_tier TEXT DEFAULT 'aurora',
      active_career_id TEXT DEFAULT 'software-engineer',
      screen_time_used_minutes INTEGER DEFAULT 0,
      screen_time_max_minutes INTEGER DEFAULT 60,
      read_aloud_enabled INTEGER DEFAULT 1,
      sound_effects_enabled INTEGER DEFAULT 1,
      reduce_motion INTEGER DEFAULT 0,
      color_mode TEXT DEFAULT 'dark',
      parent_name TEXT,
      parent_email TEXT,
      streak_days INTEGER DEFAULT 0,
      missions_completed INTEGER DEFAULT 0,
      learning_time_minutes INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create user_progress table for XP, skills, etc.
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_xp INTEGER DEFAULT 0,
      simulated_salary INTEGER DEFAULT 0,
      completed_quests TEXT DEFAULT '[]',
      skills TEXT DEFAULT '{}',
      achievements TEXT DEFAULT '[]',
      career_progress TEXT DEFAULT '{}',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Insert preset users if they don't exist
  insertPresetUsers(db);
}

function insertPresetUsers(db: Database.Database) {
  const presetUsers = [
    {
      email: 'alex@dreampath.com',
      password: 'alex123',
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
      learningTimeMinutes: 272,
    },
    {
      email: 'sarah@dreampath.com',
      password: 'sarah123',
      name: 'Sarah Chen',
      handle: '@sarahcodes',
      avatarChar: 'S',
      age: 14,
      joinedDate: '3 March 2025',
      currentLevel: 6,
      educationTier: 'nebula',
      activeCareerId: 'product-designer',
      screenTimeUsedMinutes: 45,
      screenTimeMaxMinutes: 90,
      readAloudEnabled: false,
      soundEffectsEnabled: true,
      reduceMotion: false,
      colorMode: 'light',
      parentName: 'David Chen',
      parentEmail: 'david.chen@example.com',
      streakDays: 12,
      missionsCompleted: 38,
      learningTimeMinutes: 520,
    },
    {
      email: 'jordan@dreampath.com',
      password: 'jordan123',
      name: 'Jordan Kim',
      handle: '@jordanjr',
      avatarChar: 'J',
      age: 9,
      joinedDate: '18 June 2025',
      currentLevel: 3,
      educationTier: 'starlight',
      activeCareerId: 'future-doctor',
      screenTimeUsedMinutes: 22,
      screenTimeMaxMinutes: 45,
      readAloudEnabled: true,
      soundEffectsEnabled: true,
      reduceMotion: true,
      colorMode: 'dark',
      parentName: 'Lisa Kim',
      parentEmail: 'lisa.kim@example.com',
      streakDays: 5,
      missionsCompleted: 15,
      learningTimeMinutes: 180,
    },
  ];

  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (
      email, password_hash, name, handle, avatar_char, age, joined_date,
      current_level, education_tier, active_career_id,
      screen_time_used_minutes, screen_time_max_minutes,
      read_aloud_enabled, sound_effects_enabled, reduce_motion,
      color_mode, parent_name, parent_email,
      streak_days, missions_completed, learning_time_minutes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertProgress = db.prepare(`
    INSERT OR IGNORE INTO user_progress (user_id, total_xp, simulated_salary, completed_quests, skills, achievements, career_progress)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const user of presetUsers) {
    // Simple password hashing for demo (in production, use bcrypt)
    const passwordHash = hashPassword(user.password);

    const result = insertUser.run(
      user.email,
      passwordHash,
      user.name,
      user.handle,
      user.avatarChar,
      user.age,
      user.joinedDate,
      user.currentLevel,
      user.educationTier,
      user.activeCareerId,
      user.screenTimeUsedMinutes,
      user.screenTimeMaxMinutes,
      user.readAloudEnabled ? 1 : 0,
      user.soundEffectsEnabled ? 1 : 0,
      user.reduceMotion ? 1 : 0,
      user.colorMode,
      user.parentName,
      user.parentEmail,
      user.streakDays,
      user.missionsCompleted,
      user.learningTimeMinutes
    );

    const userId = result.lastInsertRowid as number;

    if (userId > 0) {
      // Insert default progress for new user
      const defaultSkills = {
        'html-css': { xp: 0, competency: 0 },
        javascript: { xp: 0, competency: 0 },
        'problem-solving': { xp: 0, competency: 0 },
        communication: { xp: 0, competency: 0 },
        accessibility: { xp: 0, competency: 0 },
      };

      const defaultAchievements = [
        { id: 'cyber-guardian', title: 'Cyber Guardian', desc: 'Block your first SQL breach in simulation', unlocked: false, icon: 'ShieldCheck', tier: 'Gold' },
        { id: 'sharp-advocate', title: 'Sharp Advocate', desc: 'Win a defense case with objective evidence', unlocked: false, icon: 'Scale', tier: 'Silver' },
        { id: 'careful-clinician', title: 'Careful Clinician', desc: 'Choose safe antibiotic treatment in medical round', unlocked: false, icon: 'HeartPulse', tier: 'Bronze' },
        { id: 'master-architect', title: 'Code Architect', desc: 'Implement responsive accessibility rules across 5 apps', unlocked: false, icon: 'Code2', tier: 'Gold' },
        { id: 'streak-master', title: 'Week Explorer', desc: 'Maintain a 7-day exploration streak', unlocked: false, icon: 'Flame', tier: 'Gold' },
        { id: 'plan-b-strategist', title: 'Plan B Strategist', desc: 'Explore alternative vocational paths across 3 distinct fields', unlocked: false, icon: 'Compass', tier: 'Platinum' },
      ];

      const defaultCareerProgress = {
        'software-engineer': 0,
        'junior-lawyer': 0,
        'future-doctor': 0,
        'product-designer': 0,
        'master-chef': 0,
      };

      insertProgress.run(
        userId,
        0,
        0,
        '[]',
        JSON.stringify(defaultSkills),
        JSON.stringify(defaultAchievements),
        JSON.stringify(defaultCareerProgress)
      );
    }
  }
}

// Simple password hashing for demo purposes
// In production, use bcrypt or argon2
function hashPassword(password: string): string {
  // Using a simple hash for demo - replace with bcrypt in production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `demo_hash_${Math.abs(hash).toString(16)}_${password.length}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const expectedHash = hashPassword(password);
  return expectedHash === hash;
}

export interface UserWithProgress {
  id: number;
  email: string;
  name: string;
  handle: string;
  avatarChar: string;
  age: number;
  joinedDate: string;
  currentLevel: number;
  educationTier: string;
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
  totalXp: number;
  simulatedSalary: number;
  completedQuests: string[];
  skills: Record<string, { xp: number; competency: number }>;
  achievements: Array<{
    id: string;
    title: string;
    desc: string;
    unlocked: boolean;
    icon: string;
    tier: string;
    unlockedAt?: string;
  }>;
  careerProgress: Record<string, number>;
}

// Database row types
interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  handle: string | null;
  avatar_char: string;
  age: number;
  joined_date: string;
  current_level: number;
  education_tier: string;
  active_career_id: string;
  screen_time_used_minutes: number;
  screen_time_max_minutes: number;
  read_aloud_enabled: number;
  sound_effects_enabled: number;
  reduce_motion: number;
  color_mode: string;
  parent_name: string | null;
  parent_email: string | null;
  streak_days: number;
  missions_completed: number;
  learning_time_minutes: number;
  created_at: string;
  updated_at: string;
}

interface ProgressRow {
  user_id: number;
  total_xp: number;
  simulated_salary: number;
  completed_quests: string;
  skills: string;
  achievements: string;
  career_progress: string;
  created_at: string;
  updated_at: string;
}

export function getUserByEmail(email: string): UserWithProgress | null {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;
  return user ? mapUserWithProgress(db, user) : null;
}

export function getUserById(id: number): UserWithProgress | null {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined;
  return user ? mapUserWithProgress(db, user) : null;
}

function mapUserWithProgress(db: Database.Database, user: UserRow): UserWithProgress {
  const progress = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(user.id) as ProgressRow | undefined;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    handle: user.handle ?? '',
    avatarChar: user.avatar_char,
    age: user.age,
    joinedDate: user.joined_date,
    currentLevel: user.current_level,
    educationTier: user.education_tier,
    activeCareerId: user.active_career_id,
    screenTimeUsedMinutes: user.screen_time_used_minutes,
    screenTimeMaxMinutes: user.screen_time_max_minutes,
    readAloudEnabled: Boolean(user.read_aloud_enabled),
    soundEffectsEnabled: Boolean(user.sound_effects_enabled),
    reduceMotion: Boolean(user.reduce_motion),
    colorMode: user.color_mode as 'dark' | 'light',
    parentName: user.parent_name ?? '',
    parentEmail: user.parent_email ?? '',
    streakDays: user.streak_days,
    missionsCompleted: user.missions_completed,
    learningTimeMinutes: user.learning_time_minutes,
    totalXp: progress?.total_xp ?? 0,
    simulatedSalary: progress?.simulated_salary ?? 0,
    completedQuests: progress ? JSON.parse(progress.completed_quests) : [],
    skills: progress ? JSON.parse(progress.skills) : {},
    achievements: progress ? JSON.parse(progress.achievements) : [],
    careerProgress: progress ? JSON.parse(progress.career_progress) : {},
  };
}

export function authenticateUser(email: string, password: string): UserWithProgress | null {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;

  if (!user) return null;

  if (!verifyPassword(password, user.password_hash)) return null;

  return getUserByEmail(email);
}

export function updateUserProgress(userId: number, progress: Partial<UserWithProgress>): void {
  const db = getDb();
  const existingProgress = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(userId) as
    | {
        user_id: number;
        total_xp: number;
        simulated_salary: number;
        completed_quests: string;
        skills: string;
        achievements: string;
        career_progress: string;
      }
    | undefined;

  if (!existingProgress) return;

  const updatedProgress = {
    total_xp: progress.totalXp ?? existingProgress.total_xp,
    simulated_salary: progress.simulatedSalary ?? existingProgress.simulated_salary,
    completed_quests: progress.completedQuests ? JSON.stringify(progress.completedQuests) : existingProgress.completed_quests,
    skills: progress.skills ? JSON.stringify(progress.skills) : existingProgress.skills,
    achievements: progress.achievements ? JSON.stringify(progress.achievements) : existingProgress.achievements,
    career_progress: progress.careerProgress ? JSON.stringify(progress.careerProgress) : existingProgress.career_progress,
  };

  db.prepare(`
    UPDATE user_progress
    SET total_xp = ?, simulated_salary = ?, completed_quests = ?, skills = ?, achievements = ?, career_progress = ?, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `).run(
    updatedProgress.total_xp,
    updatedProgress.simulated_salary,
    updatedProgress.completed_quests,
    updatedProgress.skills,
    updatedProgress.achievements,
    updatedProgress.career_progress,
    userId
  );
}

export function updateUserProfile(userId: number, profile: Partial<UserWithProgress>): void {
  const db = getDb();

  const fields: string[] = [];
  const values: (string | number | boolean)[] = [];

  const fieldMap: Record<string, string> = {
    name: 'name',
    handle: 'handle',
    avatarChar: 'avatar_char',
    age: 'age',
    currentLevel: 'current_level',
    educationTier: 'education_tier',
    activeCareerId: 'active_career_id',
    screenTimeUsedMinutes: 'screen_time_used_minutes',
    screenTimeMaxMinutes: 'screen_time_max_minutes',
    readAloudEnabled: 'read_aloud_enabled',
    soundEffectsEnabled: 'sound_effects_enabled',
    reduceMotion: 'reduce_motion',
    colorMode: 'color_mode',
    parentName: 'parent_name',
    parentEmail: 'parent_email',
    streakDays: 'streak_days',
    missionsCompleted: 'missions_completed',
    learningTimeMinutes: 'learning_time_minutes',
  };

  for (const [key, dbField] of Object.entries(fieldMap)) {
    if (key in profile && profile[key as keyof UserWithProgress] !== undefined) {
      fields.push(`${dbField} = ?`);
      const value = profile[key as keyof UserWithProgress];
      if (typeof value === 'boolean') {
        values.push(value ? 1 : 0);
      } else if (typeof value === 'string' || typeof value === 'number') {
        values.push(value);
      }
    }
  }

  if (fields.length === 0) return;

  values.push(userId);
  db.prepare(`UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}