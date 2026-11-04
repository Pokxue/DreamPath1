export interface AptitudeQuestion {
  id: number;
  question: string;
  options: {
    letter: string;
    text: string;
    careerMatch: string; // careerId
    matchReason: string;
  }[];
}

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: 1,
    question: 'When a group faces a difficult problem, what do you enjoy most?',
    options: [
      {
        letter: 'A',
        text: 'Finding the pattern and building a solution with technology',
        careerMatch: 'software-engineer',
        matchReason: 'Analytical problem solver & systems thinker',
      },
      {
        letter: 'B',
        text: 'Listening to both sides and making a fair, reasoned case',
        careerMatch: 'junior-lawyer',
        matchReason: 'Empathetic mediator & civic advocate',
      },
      {
        letter: 'C',
        text: 'Understanding what someone needs bodily or emotionally and helping them heal',
        careerMatch: 'future-doctor',
        matchReason: 'Compassionate caregiver & biological investigator',
      },
    ],
  },
  {
    id: 2,
    question: 'What kind of project would you be most proud to finish over the weekend?',
    options: [
      {
        letter: 'A',
        text: 'Creating an interactive website or game that your classmates love using',
        careerMatch: 'software-engineer',
        matchReason: 'Digital creator & interactive builder',
      },
      {
        letter: 'B',
        text: 'Drafting community guidelines for a school club to make everyone feel respected',
        careerMatch: 'junior-lawyer',
        matchReason: 'Constitutional architect & ethical leader',
      },
      {
        letter: 'C',
        text: 'Creating a first-aid kit guide and teaching friends how to treat sports injuries',
        careerMatch: 'future-doctor',
        matchReason: 'Practical health guardian & emergency responder',
      },
    ],
  },
  {
    id: 3,
    question: 'Which tool would you pick first when exploring something new?',
    options: [
      {
        letter: 'A',
        text: 'A code editor or terminal terminal to test hypotheses',
        careerMatch: 'software-engineer',
        matchReason: 'Technology experimentation & rapid prototyping',
      },
      {
        letter: 'B',
        text: 'An archive of books, articles, and historical precedents',
        careerMatch: 'junior-lawyer',
        matchReason: 'Deep literature researcher & precedent analyst',
      },
      {
        letter: 'C',
        text: 'A microscope or medical sensor measuring real physiological signals',
        careerMatch: 'future-doctor',
        matchReason: 'Clinical observer & empirical scientist',
      },
    ],
  },
];

