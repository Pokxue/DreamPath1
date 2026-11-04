export interface StudyArticle {
  id: string;
  careerId: string;
  title: string;
  readTime: string;
  xpReward: number;
  sections: {
    heading: string;
    body: string[];
    keyTerms?: { term: string; definition: string }[];
  }[];
}

export const STUDY_DATABASE: Record<string, StudyArticle> = {
  'software-engineer': {
    id: 'study-se-1',
    careerId: 'software-engineer',
    title: 'How The Internet & Web Applications Actually Work',
    readTime: '4 min read',
    xpReward: 30,
    sections: [
      {
        heading: '1. The Client-Server Conversation',
        body: [
          'Whenever you open an app or click a button in your browser, your computer (the client) prepares an HTTP request message.',
          'This message travels across fiber-optic cables and cell towers to a remote server computer. The server processes the request, checks its database, and replies with an HTTP response containing HTML, CSS, JavaScript, or JSON data.',
        ],
        keyTerms: [
          { term: 'Client', definition: 'The user device (laptop, phone, tablet) requesting web content.' },
          { term: 'Server', definition: 'A high-powered cloud computer hosting files and database records.' },
          { term: 'API', definition: 'Application Programming Interface: the protocol allowing apps to talk to each other.' },
        ],
      },
      {
        heading: '2. The Three Web Building Blocks',
        body: [
          'Every web page is constructed using three specialized technologies:',
          '• HTML (HyperText Markup Language) acts as the skeleton, defining headings, paragraphs, and buttons.',
          '• CSS (Cascading Style Sheets) provides styling: colors, dark mode themes, card grids, and responsive layouts.',
          '• JavaScript brings dynamic intelligence: handling clicks, fetching fresh data without reloads, and running game loops.',
        ],
      },
      {
        heading: '3. What Does a Software Engineer Do Daily?',
        body: [
          'Contrary to movie stereotypes of solitary hackers in hoodies, modern software engineers spend much of their time collaborating with designers, product managers, and customers.',
          'They review code with teammates, design secure database schemas, ensure software is accessible for disabled users, and prevent cyber attacks through defensive programming.',
        ],
      },
    ],
  },
  'junior-lawyer': {
    id: 'study-law-1',
    careerId: 'junior-lawyer',
    title: 'Fundamentals of Justice, Evidence & Civil Rights',
    readTime: '5 min read',
    xpReward: 30,
    sections: [
      {
        heading: '1. What Is the Rule of Law?',
        body: [
          'The Rule of Law ensures that every citizen, including heads of state, judges, and law enforcement, is accountable under the same publicly disclosed laws.',
          'Laws prevent chaos, protect human dignity, resolve property arguments peacefully, and guarantee that vulnerable individuals cannot be arbitrarily mistreated by powerful groups.',
        ],
        keyTerms: [
          { term: 'Jurisprudence', definition: 'The philosophy and theoretical study of law and justice.' },
          { term: 'Due Process', definition: 'The legal requirement that the state must respect all legal rights owed to a person.' },
        ],
      },
      {
        heading: '2. Direct Evidence vs Circumstantial Evidence',
        body: [
          'Direct evidence directly proves a fact without inference (e.g., eyewitness video footage or signed contracts).',
          'Circumstantial evidence requires logical reasoning to connect it to a conclusion of fact (e.g., footprints at the scene matching a shoe size). Both types are valid when analyzed methodically.',
        ],
      },
    ],
  },
  'future-doctor': {
    id: 'study-doc-1',
    careerId: 'future-doctor',
    title: 'The Marvel of Human Physiology & Medical Triage',
    readTime: '5 min read',
    xpReward: 30,
    sections: [
      {
        heading: '1. The Symphony of Organ Systems',
        body: [
          'The human body is an astonishing network of cooperating systems. The circulatory system delivers oxygen and nutrients via 100,000 kilometers of blood vessels.',
          'The nervous system transmits signals at up to 400 km/h, while the immune system produces targeted antibodies to neutralize bacterial and viral invaders.',
        ],
        keyTerms: [
          { term: 'Homeostasis', definition: 'The state of steady internal conditions maintained by living organisms.' },
          { term: 'Triage', definition: 'The sorting of patients to determine medical priority based on injury severity.' },
        ],
      },
      {
        heading: '2. The Scientific Method in Clinical Medicine',
        body: [
          'Doctors are scientific investigators. They gather a patient history, observe visible signs, formulate a differential hypothesis, order targeted tests (blood tests, X-rays), and test treatments while continually reassessing progress.',
        ],
      },
    ],
  },
};

