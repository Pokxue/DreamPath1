export type TierId = 'moonrise' | 'starlight' | 'aurora' | 'nebula' | 'galaxy';

export interface EducationTier {
  id: TierId;
  name: string;
  targetAge: string;
  gradeDesc: string;
  phase: string;
  primaryColor: string;
  accentColor: string;
  bgDark: string;
  bgLight: string;
  cardBg: string;
  borderSubtle: string;
  textColor: string;
  minTapTarget: string;
  description: string;
  quizQuestionsCount: number;
  xpPerQuiz: number;
  checkpointXp: number;
}

export const EDUCATION_TIERS: Record<TierId, EducationTier> = {
  moonrise: {
    id: 'moonrise',
    name: 'Moonrise',
    targetAge: 'Ages 4–6',
    gradeDesc: 'Pre-school',
    phase: 'Discover',
    primaryColor: '#1A2455',
    accentColor: '#60A5FA',
    bgDark: '#0B112C',
    bgLight: '#F0F4FF',
    cardBg: '#131B42',
    borderSubtle: '#23306B',
    textColor: '#E0E7FF',
    minTapTarget: 'h-16 w-16 text-lg',
    description: 'Silver dusk theme, large friendly tap targets, full audio support, playful star exploration.',
    quizQuestionsCount: 3,
    xpPerQuiz: 10,
    checkpointXp: 20,
  },
  starlight: {
    id: 'starlight',
    name: 'Starlight',
    targetAge: 'Ages 7–9',
    gradeDesc: 'Lower Primary',
    phase: 'Explore',
    primaryColor: '#231C52',
    accentColor: '#FFD166',
    bgDark: '#0D0924',
    bgLight: '#F7F5FF',
    cardBg: '#1B1440',
    borderSubtle: '#362973',
    textColor: '#F3E8FF',
    minTapTarget: 'h-14 w-14',
    description: 'Indigo night & Gold sparkle, joyful guidance with interactive audio read-aloud.',
    quizQuestionsCount: 4,
    xpPerQuiz: 20,
    checkpointXp: 40,
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    targetAge: 'Ages 10–12',
    gradeDesc: 'Upper Primary',
    phase: 'Connect',
    primaryColor: '#0C3140',
    accentColor: '#4DF0C0',
    bgDark: '#061922',
    bgLight: '#F0FDF9',
    cardBg: '#0F3B4E',
    borderSubtle: '#1C5B77',
    textColor: '#E6FFFA',
    minTapTarget: 'h-12 w-12',
    description: 'Night teal & Mint glow, hands-on logic puzzles and expanding career realms.',
    quizQuestionsCount: 5,
    xpPerQuiz: 30,
    checkpointXp: 60,
  },
  nebula: {
    id: 'nebula',
    name: 'Nebula',
    targetAge: 'Ages 13–15',
    gradeDesc: 'Lower Secondary',
    phase: 'Plan',
    primaryColor: '#34154A',
    accentColor: '#FF6FD8',
    bgDark: '#1E0A2D',
    bgLight: '#FDF4FB',
    cardBg: '#3F195B',
    borderSubtle: '#62268D',
    textColor: '#FCE7F3',
    minTapTarget: 'h-11 w-11',
    description: 'Plum night & Neon Pink, goal-setting roadmaps, realistic case studies and subject path mapping.',
    quizQuestionsCount: 6,
    xpPerQuiz: 40,
    checkpointXp: 80,
  },
  galaxy: {
    id: 'galaxy',
    name: 'Galaxy',
    targetAge: 'Ages 16–18+',
    gradeDesc: 'Upper Secondary / Foundation',
    phase: 'Decide',
    primaryColor: '#1F1456',
    accentColor: '#FBBF24',
    bgDark: '#0F0933',
    bgLight: '#FAF9FF',
    cardBg: '#281B6D',
    borderSubtle: '#432EAB',
    textColor: '#F5F3FF',
    minTapTarget: 'h-10 w-10',
    description: 'Deep violet & Gold core, full virtual salary leaderboard, verified credentials & Plan B contingency mapping.',
    quizQuestionsCount: 7,
    xpPerQuiz: 50,
    checkpointXp: 100,
  },
};

export type SkillId = 'html-css' | 'javascript' | 'problem-solving' | 'communication' | 'accessibility';

export interface Career {
  id: string;
  title: string;
  subtitle: string;
  family: 'technology' | 'law' | 'healthcare' | 'design' | 'culinary';
  tierLevel: number;
  stageInfo: string;
  progressPercent: number;
  description: string;
  baseSalary: number; // in MYR/USD, e.g. 5200
  onetCode?: string;
  escoUri?: string;
  tags: string[];
  icon: string; // lucide icon identifier
}

export const CAREER_PATHS: Career[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    subtitle: 'Build a friendly study app & secure digital systems',
    family: 'technology',
    tierLevel: 3,
    stageInfo: 'Stage 3 of 8',
    progressPercent: 38,
    description: 'Design interactive web apps, squash security vulnerabilities, and solve logic algorithms.',
    baseSalary: 6200,
    onetCode: '15-1252.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2512',
    tags: ['Web Dev', 'Cybersecurity', 'Algorithm'],
    icon: 'Code2',
  },
  {
    id: 'junior-lawyer',
    title: 'Junior Lawyer',
    subtitle: 'Solve a fair playground case & review citizen contracts',
    family: 'law',
    tierLevel: 2,
    stageInfo: 'Stage 1 of 8',
    progressPercent: 12,
    description: 'Advocate for justice, analyze legal evidence, debate ethically, and uphold community fairness.',
    baseSalary: 5500,
    onetCode: '23-1011.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2611',
    tags: ['Advocacy', 'Evidence', 'Ethics'],
    icon: 'Scale',
  },
  {
    id: 'future-doctor',
    title: 'Future Doctor',
    subtitle: 'Help a patient feel better & diagnose clinical cases',
    family: 'healthcare',
    tierLevel: 2,
    stageInfo: 'Stage 2 of 8',
    progressPercent: 25,
    description: 'Investigate symptoms, select patient treatments, and understand medical sciences.',
    baseSalary: 7500,
    onetCode: '29-1229.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2212',
    tags: ['Diagnosis', 'Care', 'Biology'],
    icon: 'Stethoscope',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    subtitle: 'Craft accessible interfaces and delightful prototypes',
    family: 'design',
    tierLevel: 2,
    stageInfo: 'Stage 2 of 8',
    progressPercent: 20,
    description: 'Form user wireframes, research accessibility criteria, and test UX interactions.',
    baseSalary: 5000,
    onetCode: '27-1024.00',
    escoUri: 'http://data.europa.eu/esco/occupation/2163',
    tags: ['UI/UX', 'Figma', 'Accessibility'],
    icon: 'Palette',
  },
  {
    id: 'master-chef',
    title: 'Master Chef',
    subtitle: 'Balance nutritional culinary recipes & kitchen pace',
    family: 'culinary',
    tierLevel: 1,
    stageInfo: 'Stage 1 of 6',
    progressPercent: 10,
    description: 'Lead culinary creation, balance taste with nutrition, and run sustainable kitchen operations.',
    baseSalary: 4500,
    onetCode: '35-1011.00',
    tags: ['Culinary', 'Nutrition', 'Management'],
    icon: 'UtensilsCrossed',
  },
];

