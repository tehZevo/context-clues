export interface CourseMeta {
  code: string;
  title: string;
  tagline: string;
  live: boolean;
}

export const COURSES: CourseMeta[] = [
  {
    code: '101',
    title: 'AI Foundations',
    tagline: 'What AI, ML, and LLMs actually are — no hype, no math.',
    live: true,
  },
  {
    code: '201',
    title: 'Agentic AI',
    tagline: 'Models, harnesses, and AI that acts on your behalf.',
    live: false,
  },
  {
    code: '301',
    title: 'Beyond Text',
    tagline: 'Images, audio, video — seeing and being seen by models.',
    live: false,
  },
  // hidden for now
  // {
  //   code: '401',
  //   title: 'The Singularity',
  //   tagline: 'AGI, ASI, and the accelerators we are living through.',
  //   live: false,
  // },
];

export const SITE_NAME = 'Context Clues';
