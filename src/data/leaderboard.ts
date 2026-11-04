export interface LeaderboardEntry {
  rank: number;
  initial: string;
  name: string;
  careerTitle: string;
  pointsXp: number;
  earningsUsd: number;
  isCurrentUser?: boolean;
}

export const LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    initial: 'N',
    name: 'Nadia K.',
    careerTitle: 'Cyber Security Lead',
    pointsXp: 8940,
    earningsUsd: 12400,
  },
  {
    rank: 2,
    initial: 'T',
    name: 'Theo J.',
    careerTitle: 'Senior Pediatrician',
    pointsXp: 8720,
    earningsUsd: 11980,
  },
  {
    rank: 3,
    initial: 'A',
    name: 'Amir S.',
    careerTitle: 'Human Rights Counsel',
    pointsXp: 8340,
    earningsUsd: 11250,
  },
  {
    rank: 4,
    initial: 'S',
    name: 'Sofia Lin',
    careerTitle: 'Full-Stack Developer',
    pointsXp: 7420,
    earningsUsd: 9800,
  },
  {
    rank: 5,
    initial: 'D',
    name: 'Damon Vance',
    careerTitle: 'AI Research Scientist',
    pointsXp: 6890,
    earningsUsd: 9150,
  },
  {
    rank: 6,
    initial: 'M',
    name: 'Mei Ling',
    careerTitle: 'Constitutional Arbitrator',
    pointsXp: 5400,
    earningsUsd: 7300,
  },
  {
    rank: 7,
    initial: 'Z',
    name: 'Zackariah O.',
    careerTitle: 'Neurologist',
    pointsXp: 4950,
    earningsUsd: 6800,
  },
  {
    rank: 8,
    initial: 'K',
    name: 'Kayla M.',
    careerTitle: 'Design Lead',
    pointsXp: 4320,
    earningsUsd: 5900,
  },
];

