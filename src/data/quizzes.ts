export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface CareerQuiz {
  careerId: string;
  title: string;
  description: string;
  xpReward: number;
  questions: QuizQuestion[];
}

export const QUIZ_DATABASE: Record<string, CareerQuiz> = {
  'software-engineer': {
    careerId: 'software-engineer',
    title: 'Web Fundamentals & Logical Thinking',
    description: 'Test your understanding of HTML structure, algorithmic thinking, and user safety on the web.',
    xpReward: 60,
    questions: [
      {
        id: 'se-q1',
        question: 'Which HTML element should always be used for an interactive clickable action that submits or triggers a script?',
        options: [
          { label: 'A', text: '<button type="button">', isCorrect: true, explanation: 'Buttons have built-in keyboard accessibility (Enter/Space) and proper screen reader roles.' },
          { label: 'B', text: '<div onclick="...">', isCorrect: false, explanation: 'Divs lack keyboard accessibility, focus indicators, and ARIA semantic roles.' },
          { label: 'C', text: '<span class="btn">', isCorrect: false, explanation: 'Spans are inline generic containers with no native interactivity.' },
          { label: 'D', text: '<p style="cursor:pointer">', isCorrect: false, explanation: 'Paragraphs represent text blocks, not clickable action controls.' },
        ],
      },
      {
        id: 'se-q2',
        question: 'What is the primary role of a CSS stylesheet in building a web application?',
        options: [
          { label: 'A', text: 'Store user passwords securely in the database', isCorrect: false, explanation: 'CSS does not handle databases or server logic.' },
          { label: 'B', text: 'Define the visual styling, layout, responsive sizing, and colors', isCorrect: true, explanation: 'Cascading Style Sheets control visual presentation and responsive design.' },
          { label: 'C', text: 'Compile the JavaScript code into binary machine instructions', isCorrect: false, explanation: 'JavaScript engines handle code compilation, not CSS.' },
          { label: 'D', text: 'Send network requests to cloud satellites', isCorrect: false, explanation: 'Network requests are handled via APIs like fetch() or HTTP clients.' },
        ],
      },
      {
        id: 'se-q3',
        question: 'Why do developers avoid storing raw passwords in plain text inside databases?',
        options: [
          { label: 'A', text: 'Plain text uses up too much internet bandwidth', isCorrect: false, explanation: 'Text strings use negligible data storage.' },
          { label: 'B', text: 'If the database is leaked, hashed and salted passwords prevent attackers from immediately reading them', isCorrect: true, explanation: 'Cryptographic hashing safeguards user credentials against data breaches.' },
          { label: 'C', text: 'Databases only understand Roman numerals', isCorrect: false, explanation: 'Databases store standard UTF-8 text and binary formats.' },
          { label: 'D', text: 'Because computer monitors can only display numbers', isCorrect: false, explanation: 'Monitors render any character sets.' },
        ],
      },
    ],
  },
  'junior-lawyer': {
    careerId: 'junior-lawyer',
    title: 'Legal Principles & Civic Ethics',
    description: 'Explore the foundations of evidence, impartial hearing, and constitutional fairness.',
    xpReward: 60,
    questions: [
      {
        id: 'law-q1',
        question: 'What does the fundamental legal standard "Presumption of Innocence" signify in justice systems?',
        options: [
          { label: 'A', text: 'A person is considered innocent until proven guilty according to law', isCorrect: true, explanation: 'The burden of proof rests upon the prosecution to prove guilt beyond reasonable doubt.' },
          { label: 'B', text: 'Everyone in court must wear matching colored uniforms', isCorrect: false, explanation: 'Dress codes have no bearing on the presumption of innocence.' },
          { label: 'C', text: 'The judge decides the verdict before any witnesses speak', isCorrect: false, explanation: 'Pre-judging violates the right to a fair hearing.' },
          { label: 'D', text: 'Guilt is decided by who argues the loudest', isCorrect: false, explanation: 'Decisions must be based on proven facts and law.' },
        ],
      },
      {
        id: 'law-q2',
        question: 'Why is cross-examination of witnesses critical in a courtroom trial?',
        options: [
          { label: 'A', text: 'To test the accuracy, credibility, and consistency of the witness testimony', isCorrect: true, explanation: 'Cross-examination tests witness memory and detects contradictions.' },
          { label: 'B', text: 'To give the jury extra time to eat lunch', isCorrect: false, explanation: 'Cross-examination is an essential legal test of credibility.' },
          { label: 'C', text: 'To replace written laws with personal opinions', isCorrect: false, explanation: 'Laws govern the validity of testimony.' },
        ],
      },
      {
        id: 'law-q3',
        question: 'What is a legally binding contract?',
        options: [
          { label: 'A', text: 'A mutual agreement between parties with consideration and lawful purpose', isCorrect: true, explanation: 'Contracts establish legal duties enforceable by courts.' },
          { label: 'B', text: 'A fictional story written in cursive', isCorrect: false, explanation: 'Contracts are legal instruments.' },
          { label: 'C', text: 'A secret handshake between friends', isCorrect: false, explanation: 'Secret gestures lack legal recognition.' },
        ],
      },
    ],
  },
  'future-doctor': {
    careerId: 'future-doctor',
    title: 'Human Physiology & Emergency Triage',
    description: 'Test your understanding of the circulatory system, vital signs, and patient empathy.',
    xpReward: 60,
    questions: [
      {
        id: 'med-q1',
        question: 'Which organ pumps oxygenated blood throughout the human body?',
        options: [
          { label: 'A', text: 'The Heart', isCorrect: true, explanation: 'The heart pumps blood through arteries to deliver oxygen and nutrients to organs.' },
          { label: 'B', text: 'The Stomach', isCorrect: false, explanation: 'The stomach breaks down food.' },
          { label: 'C', text: 'The Femur', isCorrect: false, explanation: 'The femur is the thigh bone.' },
          { label: 'D', text: 'The Gallbladder', isCorrect: false, explanation: 'The gallbladder stores bile for digestion.' },
        ],
      },
      {
        id: 'med-q2',
        question: 'What is considered a normal resting heart rate for healthy children aged 10 and above?',
        options: [
          { label: 'A', text: '60 to 100 beats per minute', isCorrect: true, explanation: '60–100 bpm is standard for resting adolescents and adults.' },
          { label: 'B', text: '300 to 450 beats per minute', isCorrect: false, explanation: '300 bpm indicates life-threatening ventricular arrhythmia.' },
          { label: 'C', text: '10 to 15 beats per minute', isCorrect: false, explanation: 'Extremely low and fatal without pacing.' },
        ],
      },
      {
        id: 'med-q3',
        question: 'What does a pulse oximeter measure on a patient’s finger?',
        options: [
          { label: 'A', text: 'Blood oxygen saturation percentage (SpO2)', isCorrect: true, explanation: 'Pulse oximeters use light wavelengths to detect hemoglobin oxygenation.' },
          { label: 'B', text: 'The weight of their shoes', isCorrect: false, explanation: 'It is a photometric blood oxygen sensor.' },
          { label: 'C', text: 'How much water they drank yesterday', isCorrect: false, explanation: 'Hydration is assessed clinically.' },
        ],
      },
    ],
  },
};

