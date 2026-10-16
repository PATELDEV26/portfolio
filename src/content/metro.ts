export const DESIGN_TOKENS = {
  colors: {
    backgroundDark: "#111820",
    backgroundLight: "#f3f7fb",
    surfaceDark: "#18222c",
    surfaceLight: "#ffffff",
    accent: "#0f6cbd",
    accentAlt: "#00aba9",
    textDark: "#f8fbff",
    textLight: "#0f1720",
    mutedDark: "#8fa3b8",
    mutedLight: "#516577",
    panelDark: "#0c1218",
    panelLight: "#dfe7ef",
  },
  type: {
    display: '"Space Grotesk", "Segoe UI", system-ui, sans-serif',
    body: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
  },
  tileScale: {
    small: "1x1",
    wide: "2x1",
    large: "2x2",
  },
} as const;

export type AccentName = "cobalt" | "teal" | "magenta" | "lime";
export type ThemeName = "dark" | "light";
export type AppId = "about" | "projects" | "skills" | "certifications" | "career" | "contact";

export type Project = {
  id: string;
  name: string;
  year: string;
  summary: string;
  highlight: string;
  stack: string[];
  repo: string;
  images: string[];
};

export type TourStep = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  target: AppId | "start";
};

export const PROFILE = {
  name: "Dev Patel",
  role: "Full-Stack Developer / AI Engineering Track",
  shortRole: "FINAL-YEAR CSE STUDENT",
  headline: "Shipping bold web products now, building toward AI engineering next.",
  location: "Vadodara, Gujarat, India",
  timezone: "IST (UTC+5:30)",
  status: "Open to internships, remote work, and freelance builds.",
  email: "pateldev2317@gmail.com",
  github: "https://github.com/PATELDEV26",
  linkedin: "https://linkedin.com/in/dev-patel-66363b257",
  resume: "/media/Dev_Patel_Resume_MS_Admissions_Updated.pdf",
  replyTime: "Usually replies within 24 hours.",
  bio: "I'm a final-year Computer Science Engineering student at Parul University in Vadodara, building full-stack web products with React, TypeScript, Node, and Postgres while moving toward AI engineering. I freelance for local shops and clinics around Vadodara, and I like taking ideas from a rough brief to a working, deployed product.",
  microPitch:
    "React, TypeScript, Node, product thinking, and a growing AI foundation - all in one portfolio built to be remembered.",
  facts: [
    "Class of 2027 at Parul University.",
    "CGPA 7+/10 and focused on shipping real products.",
    "Freelances for shops and clinics around Vadodara.",
    "Building toward AI engineering from a full-stack base.",
  ],
} as const;

export const PROJECTS: Project[] = [
  {
    id: "cinematch",
    name: "CineMatch",
    year: "2025",
    summary:
      "Content-based movie recommender using cosine similarity across genre, cast, and director data with live TMDB metadata.",
    highlight: "Recommendation logic first, interface second - built to prove the math works.",
    stack: ["Python", "Pandas", "TMDB API", "Cosine Similarity"],
    repo: "https://github.com/PATELDEV26/cinematch",
    images: [
      "/exhibits/cinematch/01.jpg",
      "/exhibits/cinematch/02.jpg",
      "/exhibits/cinematch/03.jpg",
    ],
  },
  {
    id: "visualdsa",
    name: "VisualDSA",
    year: "2024",
    summary:
      "Visualizer for sorting, graph, and pathfinding algorithms with speed controls across bubble, merge, quick sort, BFS, DFS, Dijkstra, and A*.",
    highlight: "Turned algorithm steps into something you can actually feel and follow.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    repo: "https://github.com/PATELDEV26/VisualDSA",
    images: [
      "/exhibits/visualdsa/01.jpg",
      "/exhibits/visualdsa/02.jpg",
      "/exhibits/visualdsa/03.jpg",
    ],
  },
  {
    id: "devboard",
    name: "DevBoard",
    year: "2025",
    summary:
      "Dark-themed developer workspace with dashboard, kanban, search, notifications, and auth scaffolding.",
    highlight: "A structured product UI where layout, navigation, and system thinking clicked.",
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/PATELDEV26/Devboard",
    images: [
      "/exhibits/devboard/01.jpg",
      "/exhibits/devboard/02.jpg",
      "/exhibits/devboard/03.jpg",
      "/exhibits/devboard/04.jpg",
    ],
  },
  {
    id: "neontalk",
    name: "NeonTalk",
    year: "2025",
    summary:
      "Real-time multi-room chat with a cyberpunk access screen, concurrent users, join and leave events, and live broadcasting.",
    highlight: "A real-time app that taught event flow by breaking, fixing, and scaling it.",
    stack: ["Node.js", "Express", "Socket.io", "WebSockets"],
    repo: "https://github.com/PATELDEV26/NeonTalk",
    images: ["/exhibits/neontalk/01.jpg", "/exhibits/neontalk/02.jpg", "/exhibits/neontalk/03.jpg"],
  },
  {
    id: "retroscrape",
    name: "RetroScrape",
    year: "2024",
    summary:
      "Pixel-styled scraper where you paste a URL, choose headings, links, images, or tables, and pull the content you need.",
    highlight: "A practical tool built to replace repeated throwaway scraping scripts.",
    stack: ["JavaScript", "Python", "BeautifulSoup"],
    repo: "https://github.com/PATELDEV26/RetroScrape",
    images: [
      "/exhibits/retroscrape/01.jpg",
      "/exhibits/retroscrape/02.jpg",
      "/exhibits/retroscrape/03.jpg",
      "/exhibits/retroscrape/04.jpg",
    ],
  },
  {
    id: "litera",
    name: "Litera",
    year: "2024",
    summary: "Minimal document workspace for uploading and parsing CVs and files.",
    highlight: "A calmer document workflow built around clarity instead of clutter.",
    stack: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/PATELDEV26/Litera",
    images: ["/exhibits/litera/01.jpg", "/exhibits/litera/02.jpg", "/exhibits/litera/03.jpg"],
  },
];

export const SKILL_GROUPS = [
  {
    title: "Primary Tool",
    items: ["Python", "JavaScript (ES6+)", "React.js", "Node.js/Express", "Prompt Engineering"],
  },
  {
    title: "Comfortable",
    items: [
      "Pandas/NumPy",
      "Tailwind CSS",
      "Socket.io/WebSockets",
      "MongoDB",
      "C/C++ & DSA",
      "HTML5 Canvas API",
      "Git/GitHub/Linux CLI",
    ],
  },
  {
    title: "Trace Amount",
    items: ["SQL"],
  },
  {
    title: "In Training",
    items: ["AWS"],
  },
] as const;

export const SKILL_CODES = ["PY", "JS", "RCT", "NODE", "SQL", "AWS"] as const;

export const CERTIFICATIONS = [
  {
    title: "Foundations of Prompt Engineering",
    issuer: "AWS Training & Certification",
    date: "July 2026",
    detail: "Prompt design patterns and model behavior for practical LLM work.",
    image: "/media/cert-aws.jpg",
  },
  {
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "July 2026",
    detail: "Generative AI fundamentals with 2.00 CPE credits.",
    image: "/media/cert-linkedin.jpg",
  },
  {
    title: "Getting Started with Generative AI",
    issuer: "IBM SkillsBuild",
    date: "July 2026",
    detail: "Generative AI foundations with a Credly verification link.",
    image: "/media/cert-ibm.jpg",
    verify: "https://www.credly.com/go/PVpF3VtS",
  },
  {
    title: 'Kaggle "Python"',
    issuer: "Kaggle",
    date: "May 2024",
    detail: "Core Python skills for everyday programming and data work.",
  },
  {
    title: 'Kaggle "Intro to Programming"',
    issuer: "Kaggle",
    date: "May 2024",
    detail: "Programming fundamentals and early problem-solving practice.",
  },
] as const;

export const IN_PROGRESS_CERTS = [
  "Google AI",
  "IBM AI Fundamentals",
  "Microsoft Azure AI Fundamentals",
] as const;

export const CAREER_TIMELINE = [
  {
    period: "2023-2027",
    title: "B.Tech CSE, Parul University",
    body: "Coursework includes DSA, DBMS, Operating Systems, Computer Networks, and OOP.",
  },
  {
    period: "2024-Present",
    title: "Freelance Web Developer",
    body: "Landing pages, portfolio sites, and small tools for clients in Vadodara and remote.",
  },
  {
    period: "2025-Present",
    title: "Independent Builder",
    body: "Six full-stack projects built self-directed, without tutorials or starter templates.",
  },
  {
    period: "2026-Now",
    title: "Moving Toward AI Engineering",
    body: "Generative AI and prompt engineering coursework while looking for an internship.",
  },
] as const;

export const ACCENTS: Record<
  AccentName,
  { label: string; color: string; tile: string; tileAlt: string }
> = {
  cobalt: { label: "Cobalt", color: "#0f6cbd", tile: "#0f6cbd", tileAlt: "#185f94" },
  teal: { label: "Teal", color: "#00aba9", tile: "#008272", tileAlt: "#00aba9" },
  magenta: { label: "Magenta", color: "#b91d47", tile: "#b91d47", tileAlt: "#d24f87" },
  lime: { label: "Lime", color: "#8cbf26", tile: "#8cbf26", tileAlt: "#5f8c13" },
};

export const SIGNALS = [
  { label: "Status", value: "Open to internships" },
  { label: "Time zone", value: "Vadodara / IST" },
  { label: "Projects", value: "6 shipped builds" },
  { label: "Contact", value: "<24h reply rhythm" },
] as const;

export const FEATURE_LINES = [
  "Full-stack delivery from brief to deploy",
  "AI engineering direction built on real product work",
  "Interfaces that feel intentional, not templated",
] as const;

export const TOUR_STEPS: TourStep[] = [
  {
    id: "intro",
    eyebrow: "Start Here",
    title: "A portfolio that behaves like a product.",
    body: "This experience opens like a system, because the work inside it is about building systems: interface, logic, motion, and polish working together.",
    target: "start",
  },
  {
    id: "about",
    eyebrow: "Profile",
    title: "Dev Patel, full-stack now, AI next.",
    body: "Final-year CSE student in Vadodara with freelance delivery experience, production-minded React and Node skills, and a clear move toward AI engineering.",
    target: "about",
  },
  {
    id: "projects",
    eyebrow: "Work",
    title: "Projects chosen to show range, not repetition.",
    body: "From recommender systems to algorithm visualizers to real-time chat, the project set proves breadth across UI, logic, and tooling.",
    target: "projects",
  },
  {
    id: "career",
    eyebrow: "Momentum",
    title: "The story is upward and active.",
    body: "Coursework, freelance builds, self-directed shipping, and AI coursework all point in the same direction: someone already building, not just preparing.",
    target: "career",
  },
] as const;
