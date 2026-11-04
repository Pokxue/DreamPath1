import { SkillId } from '@/types/career';

export interface ScenarioChoice {
  choiceId: string;
  label: string;
  explanation: string;
  nextNodeId: string;
  isCorrect?: boolean;
  skillImpacts: Array<{
    skillId: SkillId;
    xp: number;
    competencyDelta?: number;
  }>;
  rewards?: {
    xp?: number;
    salaryDelta?: number;
  };
}

export interface ScenarioNode {
  nodeId: string;
  type: 'decision' | 'mentor' | 'terminal';
  prompt: string;
  codeSnippet?: {
    filename: string;
    code: string;
    badge?: string;
  };
  npc?: {
    name: string;
    role: string;
    dialogue: string;
    avatarChar: string;
  };
  choices?: ScenarioChoice[];
  terminalOutcome?: {
    outcomeId: string;
    title: string;
    summary: string;
    stars: 1 | 2 | 3;
    rewards: {
      xp: number;
      salaryDelta: number;
    };
  };
}

export interface CareerScenario {
  scenarioId: string;
  careerId: string;
  categoryBadge: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: ScenarioNode[];
}

export const SCENARIO_DATABASE: Record<string, CareerScenario> = {
  'software-engineer': {
    scenarioId: 'se-incident-1',
    careerId: 'software-engineer',
    categoryBadge: 'CYBER INCIDENT • SOFTWARE ENGINEERING',
    title: 'Stop the silent breach',
    description:
      'The company login system recorded 42 failed attempts from an unknown device. Find the vulnerable line before customer data is taken.',
    startNodeId: 'node-1',
    nodes: [
      {
        nodeId: 'node-1',
        type: 'decision',
        prompt: 'Which action protects the database from SQL injection vulnerabilities first?',
        codeSnippet: {
          filename: 'security-check.js',
          code: `01 const user = request.body.user;
02 const password = request.body.password;
03 query("SELECT * FROM users WHERE
04 name = '" + user + "'");
05 return account;`,
          badge: 'LIVE',
        },
        npc: {
          name: 'Maya Chen',
          role: 'Senior Security Architect',
          dialogue:
            'Notice line 04 concatenating user input directly into SQL text. An attacker passed "OR 1=1" to bypass auth! What do you recommend?',
          avatarChar: 'M',
        },
        choices: [
          {
            choiceId: 'choice-param',
            label: 'Use a parameterized query (Prepared Statements)',
            explanation:
              'Excellent! Parameterized queries separate code from untrusted data, preventing injection altogether.',
            nextNodeId: 'node-2',
            isCorrect: true,
            skillImpacts: [
              { skillId: 'problem-solving', xp: 50, competencyDelta: 8 },
              { skillId: 'javascript', xp: 40, competencyDelta: 6 },
            ],
            rewards: { xp: 60, salaryDelta: 120 },
          },
          {
            choiceId: 'choice-short',
            label: 'Make the user password shorter so it executes faster',
            explanation: 'Shorter passwords actually reduce entropy and make brute-force easier!',
            nextNodeId: 'node-fail-pass',
            isCorrect: false,
            skillImpacts: [{ skillId: 'problem-solving', xp: 10, competencyDelta: 1 }],
            rewards: { xp: 10, salaryDelta: 0 },
          },
          {
            choiceId: 'choice-delete',
            label: 'Delete every user account to purge malicious records',
            explanation: 'Purging users causes catastrophic data loss for legitimate customers.',
            nextNodeId: 'node-fail-delete',
            isCorrect: false,
            skillImpacts: [{ skillId: 'problem-solving', xp: 5, competencyDelta: -2 }],
            rewards: { xp: 5, salaryDelta: 0 },
          },
        ],
      },
      {
        nodeId: 'node-2',
        type: 'decision',
        prompt: 'The query is secured. Now, what rate-limiting policy should we apply to stop automated bot requests?',
        codeSnippet: {
          filename: 'middleware/rate-limiter.ts',
          code: `01 // Configure Redis token bucket
02 const limiter = new RateLimiter({
03   windowMs: 15 * 60 * 1000, // 15 mins
04   maxAttempts: ???,
05 });`,
          badge: 'GUARD',
        },
        npc: {
          name: 'Maya Chen',
          role: 'Senior Security Architect',
          dialogue:
            'Botnets attempt thousands of credential combinations per minute. How strict should our login threshold be?',
          avatarChar: 'M',
        },
        choices: [
          {
            choiceId: 'choice-rate-5',
            label: 'Limit to 5 failed attempts per IP with exponential backoff delay',
            explanation:
              'Spot on! 5 attempts balances legitimate user error while neutralizing brute-force credential stuffing.',
            nextNodeId: 'node-terminal-win',
            isCorrect: true,
            skillImpacts: [
              { skillId: 'problem-solving', xp: 45, competencyDelta: 7 },
              { skillId: 'html-css', xp: 20, competencyDelta: 4 },
            ],
            rewards: { xp: 60, salaryDelta: 140 },
          },
          {
            choiceId: 'choice-rate-unlimited',
            label: 'Allow 10,000 attempts so nobody gets locked out',
            explanation: 'Uncapped attempts invites infinite dictionary attacks.',
            nextNodeId: 'node-fail-pass',
            isCorrect: false,
            skillImpacts: [{ skillId: 'problem-solving', xp: 10, competencyDelta: 1 }],
          },
        ],
      },
      {
        nodeId: 'node-fail-pass',
        type: 'mentor',
        prompt: 'The security team flagged the measure as risky.',
        npc: {
          name: 'Maya Chen',
          role: 'Senior Security Architect',
          dialogue:
            'Security requires defence-in-depth: never trust raw input and always enforce rate limitations. Let us re-trace our steps.',
          avatarChar: 'M',
        },
        choices: [
          {
            choiceId: 'retry',
            label: 'Review code vulnerability again',
            explanation: 'Learning from mistakes is how top security engineers master their craft.',
            nextNodeId: 'node-1',
            skillImpacts: [{ skillId: 'problem-solving', xp: 15 }],
          },
        ],
      },
      {
        nodeId: 'node-fail-delete',
        type: 'mentor',
        prompt: 'Critical service outage triggered!',
        npc: {
          name: 'Maya Chen',
          role: 'Senior Security Architect',
          dialogue:
            'Customers cannot sign in! Remember our golden engineering rule: preserve uptime and data integrity first.',
          avatarChar: 'M',
        },
        choices: [
          {
            choiceId: 'retry-delete',
            label: 'Restore database backup & re-examine patch',
            explanation: 'Restoring backup...',
            nextNodeId: 'node-1',
            skillImpacts: [{ skillId: 'problem-solving', xp: 15 }],
          },
        ],
      },
      {
        nodeId: 'node-terminal-win',
        type: 'terminal',
        prompt: 'Mission Accomplished: System Fortified!',
        terminalOutcome: {
          outcomeId: 'cyber-victory',
          title: 'Database Fortified & Customer Data Protected',
          summary:
            'You successfully implemented parameterized SQL queries and introduced intelligent exponential rate limiting. The botnet was blocked with zero customer data compromised!',
          stars: 3,
          rewards: {
            xp: 120,
            salaryDelta: 260,
          },
        },
      },
    ],
  },
  'junior-lawyer': {
    scenarioId: 'law-playground-1',
    careerId: 'junior-lawyer',
    categoryBadge: 'CIVIC ADVOCACY • JUNIOR LAWYER',
    title: 'The School Playground Dispute',
    description:
      'Two student clubs claim equal rights to use the community amphitheater during lunch. Analyze the charter, weigh witness testimonies, and deliver a fair settlement.',
    startNodeId: 'node-law-1',
    nodes: [
      {
        nodeId: 'node-law-1',
        type: 'decision',
        prompt: 'What primary piece of evidence should you request first to establish legal priority?',
        npc: {
          name: 'Judge Amina',
          role: 'Civic Arbitrator',
          dialogue:
            'Welcome, Counselor. Both clubs are emotional and shouting. In law, we anchor decisions on tangible records, not loudest voices. Where do you start?',
          avatarChar: 'J',
        },
        choices: [
          {
            choiceId: 'law-charter',
            label: 'Review the written amphitheater reservation registry and timestamped booking logs',
            explanation:
              'Excellent procedure! Written contracts and chronological logs form foundational prima facie evidence.',
            nextNodeId: 'node-law-2',
            isCorrect: true,
            skillImpacts: [
              { skillId: 'problem-solving', xp: 45, competencyDelta: 8 },
              { skillId: 'communication', xp: 35, competencyDelta: 7 },
            ],
            rewards: { xp: 50, salaryDelta: 100 },
          },
          {
            choiceId: 'law-flip',
            label: 'Flip a coin and grant access to whichever club calls heads',
            explanation: 'Arbitration requires reasoned principles and precedent, not arbitrary chance.',
            nextNodeId: 'node-law-retry',
            isCorrect: false,
            skillImpacts: [{ skillId: 'communication', xp: 5 }],
          },
        ],
      },
      {
        nodeId: 'node-law-2',
        type: 'decision',
        prompt:
          'The logs show both clubs booked overlapping slots due to a system glitch. What equitable remedy should you propose?',
        npc: {
          name: 'Judge Amina',
          role: 'Civic Arbitrator',
          dialogue:
            'Both acted in good faith with official receipts. How can we ensure mutual satisfaction without alienating either party?',
          avatarChar: 'J',
        },
        choices: [
          {
            choiceId: 'law-split',
            label: 'Propose a shared alternating weekly schedule plus co-hosting a combined community showcase',
            explanation:
              'A textbook restorative mediation! Both clubs keep access and even collaborate on creative synergy.',
            nextNodeId: 'node-law-win',
            isCorrect: true,
            skillImpacts: [
              { skillId: 'communication', xp: 50, competencyDelta: 9 },
              { skillId: 'problem-solving', xp: 40, competencyDelta: 7 },
            ],
            rewards: { xp: 70, salaryDelta: 160 },
          },
          {
            choiceId: 'law-ban',
            label: 'Ban both clubs from the stage for the rest of the semester',
            explanation: 'Punitive overreach discourages student activity and ignores fairness.',
            nextNodeId: 'node-law-retry',
            isCorrect: false,
            skillImpacts: [{ skillId: 'communication', xp: 5 }],
          },
        ],
      },
      {
        nodeId: 'node-law-retry',
        type: 'mentor',
        prompt: 'The mediation stalled.',
        npc: {
          name: 'Judge Amina',
          role: 'Civic Arbitrator',
          dialogue:
            'Justice is about fairness, listening to all sides, and seeking constructive solutions. Let us reconsider the facts.',
          avatarChar: 'J',
        },
        choices: [
          {
            choiceId: 'retry-law',
            label: 'Re-examine the dispute evidence',
            explanation: 'Re-evaluating dispute facts...',
            nextNodeId: 'node-law-1',
            skillImpacts: [{ skillId: 'communication', xp: 10 }],
          },
        ],
      },
      {
        nodeId: 'node-law-win',
        type: 'terminal',
        prompt: 'Case Settled with Mutual Honor!',
        terminalOutcome: {
          outcomeId: 'law-verdict-fair',
          title: 'Fair Mediation & Shared Victory',
          summary:
            'You balanced documented records with compassionate conflict resolution. Both clubs praised the fair alternating timetable and agreed to co-host the spring concert.',
          stars: 3,
          rewards: {
            xp: 120,
            salaryDelta: 260,
          },
        },
      },
    ],
  },
  'future-doctor': {
    scenarioId: 'doc-triage-1',
    careerId: 'future-doctor',
    categoryBadge: 'CLINICAL CARE • FUTURE DOCTOR',
    title: 'The Mystery Fever at Camp',
    description:
      'A 12-year-old camper arrives at the clinic with fatigue, fever (38.8°C), and mild dehydration after a wilderness trek. Formulate an accurate differential diagnosis and safe treatment plan.',
    startNodeId: 'node-doc-1',
    nodes: [
      {
        nodeId: 'node-doc-1',
        type: 'decision',
        prompt: 'What should be your very first clinical assessment step before administering any medication?',
        npc: {
          name: 'Dr. Sarah Patel',
          role: 'Chief Pediatrician',
          dialogue:
            'Welcome to the clinic! The patient is conscious but sluggish. Good physicians always verify vital signs and allergies first.',
          avatarChar: 'D',
        },
        choices: [
          {
            choiceId: 'doc-vitals',
            label: 'Measure vitals (BP, pulse, oxygen saturation) and check for known drug allergies & tick bites',
            explanation:
              'Standard of care! Immediate vitals and systematic inspection guide safe differential diagnosis.',
            nextNodeId: 'node-doc-2',
            isCorrect: true,
            skillImpacts: [
              { skillId: 'problem-solving', xp: 45, competencyDelta: 8 },
              { skillId: 'communication', xp: 30, competencyDelta: 6 },
            ],
            rewards: { xp: 50, salaryDelta: 110 },
          },
          {
            choiceId: 'doc-guess',
            label: 'Give them three energy drinks to restore hydration quickly',
            explanation: 'High caffeine and sugar worsen tachycardia and dehydration!',
            nextNodeId: 'node-doc-retry',
            isCorrect: false,
            skillImpacts: [{ skillId: 'problem-solving', xp: 5 }],
          },
        ],
      },
      {
        nodeId: 'node-doc-2',
        type: 'decision',
        prompt:
          'Vitals show heart rate 98 bpm, SpO2 99%, with signs of heat exhaustion and mild sunstroke. What is the optimal initial therapy?',
        npc: {
          name: 'Dr. Sarah Patel',
          role: 'Chief Pediatrician',
          dialogue:
            'Great diagnostic work. The lungs are clear and no tick bites found. It is acute heat exhaustion. How do we treat them safely?',
          avatarChar: 'D',
        },
        choices: [
          {
            choiceId: 'doc-rehydrate',
            label: 'Oral rehydration salts (ORS), cool damp towels, rest in air-conditioned room, and monitor temperature',
            explanation:
              'Perfect evidence-based response! Gradual cooling and electrolyte replacement reverses heat exhaustion safely.',
            nextNodeId: 'node-doc-win',
            isCorrect: true,
            skillImpacts: [
              { skillId: 'problem-solving', xp: 55, competencyDelta: 9 },
              { skillId: 'accessibility', xp: 30, competencyDelta: 6 },
            ],
            rewards: { xp: 70, salaryDelta: 150 },
          },
          {
            choiceId: 'doc-ice',
            label: 'Submerge the patient directly into freezing ice water',
            explanation:
              'Rapid ice immersion in mild heat exhaustion causes shivering, vasoconstriction, and shock.',
            nextNodeId: 'node-doc-retry',
            isCorrect: false,
            skillImpacts: [{ skillId: 'problem-solving', xp: 5 }],
          },
        ],
      },
      {
        nodeId: 'node-doc-retry',
        type: 'mentor',
        prompt: 'The patient feels uneasy.',
        npc: {
          name: 'Dr. Sarah Patel',
          role: 'Chief Pediatrician',
          dialogue:
            'Remember the Hippocratic oath: First, do no harm. Gentle rehydration and vital monitoring are paramount.',
          avatarChar: 'D',
        },
        choices: [
          {
            choiceId: 'retry-doc',
            label: 'Re-evaluate patient symptoms',
            explanation: 'Re-evaluating patient vitals...',
            nextNodeId: 'node-doc-1',
            skillImpacts: [{ skillId: 'problem-solving', xp: 10 }],
          },
        ],
      },
      {
        nodeId: 'node-doc-win',
        type: 'terminal',
        prompt: 'Patient Fully Recovered!',
        terminalOutcome: {
          outcomeId: 'doc-recovery',
          title: 'Safe Diagnosis & Full Recovery',
          summary:
            'Thanks to your swift diagnostic acumen and measured rehydration protocol, the camper’s temperature normalized to 37.0°C and they safely rejoined their friends.',
          stars: 3,
          rewards: {
            xp: 120,
            salaryDelta: 260,
          },
        },
      },
    ],
  },
};

