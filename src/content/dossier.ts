export const SUBJECT = {
  name: "Dev Patel",
  role: "AI-minded full-stack developer",
  location: "Vadodara, Gujarat, IN",
  email: "pateldev2317@gmail.com",
  phone: "+91 70433 38711",
  github: "https://github.com/PATELDEV26",
  linkedin: "https://linkedin.com/in/dev-patel-66363b257",
  resume: "/media/Dev_Patel_Resume_MS_Admissions_Updated.pdf",
  caseNo: "27",
};

export const NAV = [
  { label: "Board", href: "#board" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Credentials", href: "#credentials" },
  { label: "Ledger", href: "#ledger" },
  { label: "Contact", href: "#contact" },
];

export const TICKER = [
  "The Morning Brief",
  "Notes from the Desk",
  "Field Report",
  "Late Edition",
  "On the Record",
  "Wanted",
  "Dev Patel",
];

export const WEATHER = [
  { k: "No. 27", v: "Case file · open" },
  { k: "Vadodara", v: "Based here · remote OK" },
  { k: "2027", v: "CSE · Parul University" },
  { k: "Open", v: "Internships · freelance" },
];

export type Exhibit = {
  id: string;
  letter: string;
  source: string;
  repo: string;
  live?: string;
  /** Primary + extra screenshots (first is the hero). */
  images: string[];
  title: string;
  kicker: string;
  body: string;
  stack: string[];
  period: string;
  classified: string;
};

export const EXHIBITS: Exhibit[] = [
  {
    id: "cinematch",
    letter: "A",
    source: "github.com/PATELDEV26/cinematch",
    repo: "https://github.com/PATELDEV26/cinematch",
    images: [
      "/exhibits/cinematch/01.jpg",
      "/exhibits/cinematch/03.jpg",
      "/exhibits/cinematch/02.jpg",
    ],
    title: "CineMatch",
    kicker: "Machine learning · recommender system",
    body: "Content-based movie recommender built on cosine similarity across genre, cast and director features. Live metadata pulled from the TMDB API; recommendation quality validated through informal testing with friends who were not shy with feedback.",
    stack: ["Python", "Pandas", "TMDB API", "Cosine Similarity"],
    period: "2025",
    classified: "Internal note: first project where the maths mattered more than the UI.",
  },
  {
    id: "visualdsa",
    letter: "B",
    source: "github.com/PATELDEV26/VisualDSA",
    repo: "https://github.com/PATELDEV26/VisualDSA",
    images: [
      "/exhibits/visualdsa/03.jpg",
      "/exhibits/visualdsa/02.jpg",
      "/exhibits/visualdsa/01.jpg",
    ],
    title: "VisualDSA",
    kicker: "Interactive algorithm visualiser",
    body: "A visualiser for sorting, graph and pathfinding algorithms — bubble, merge, quick sort, BFS, DFS, Dijkstra, A* — with speed controls and a terminal-style UI. Built to make the steps visible, not just the answer.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    period: "2024",
    classified: "Internal note: built for exam prep, kept because it actually worked.",
  },
  {
    id: "devboard",
    letter: "C",
    source: "github.com/PATELDEV26/Devboard",
    repo: "https://github.com/PATELDEV26/Devboard",
    images: [
      "/exhibits/devboard/04.jpg",
      "/exhibits/devboard/01.jpg",
      "/exhibits/devboard/02.jpg",
      "/exhibits/devboard/03.jpg",
    ],
    title: "DevBoard",
    kicker: "Project dashboard · kanban",
    body: "A dark-themed developer workspace with dashboard, kanban board and project views. Componentised React structure with search, notifications and auth scaffolding — the first app where the layout system finally clicked.",
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    period: "2025",
    classified: "Internal note: the project where component structure finally clicked.",
  },
  {
    id: "neontalk",
    letter: "D",
    source: "github.com/PATELDEV26/NeonTalk",
    repo: "https://github.com/PATELDEV26/NeonTalk",
    images: ["/exhibits/neontalk/01.jpg", "/exhibits/neontalk/02.jpg", "/exhibits/neontalk/03.jpg"],
    title: "NeonTalk",
    kicker: "Real-time chat · multi-room",
    body: "Full-stack real-time chat with a cyberpunk access screen and live rooms. Built to understand bi-directional communication properly — concurrent users, join/leave events and message broadcasting.",
    stack: ["Node.js", "Express", "Socket.io", "WebSockets"],
    period: "2025",
    classified: "Internal note: websockets learned the hard way, by breaking them repeatedly.",
  },
  {
    id: "retroscrape",
    letter: "E",
    source: "github.com/PATELDEV26/RetroScrape",
    repo: "https://github.com/PATELDEV26/RetroScrape",
    images: [
      "/exhibits/retroscrape/02.jpg",
      "/exhibits/retroscrape/01.jpg",
      "/exhibits/retroscrape/04.jpg",
      "/exhibits/retroscrape/03.jpg",
    ],
    title: "RetroScrape",
    kicker: "Web scraper · retro UI",
    body: "A pixel-era scraping tool: paste a URL, pick headings, links, images or tables, and pull the content. Built so he wouldn't rewrite the same throwaway scraper every other week.",
    stack: ["JavaScript", "Python", "BeautifulSoup"],
    period: "2024",
    classified: "Internal note: replaced roughly six disposable scripts.",
  },
  {
    id: "litera",
    letter: "F",
    source: "github.com/PATELDEV26/Litera",
    repo: "https://github.com/PATELDEV26/Litera",
    images: ["/exhibits/litera/02.jpg", "/exhibits/litera/01.jpg", "/exhibits/litera/03.jpg"],
    title: "Litera",
    kicker: "Document parse · minimal UI",
    body: "A clean document workspace for uploading and parsing CVs or files — drop zone first, chrome second. Focused on a calm editorial interface rather than another noisy SaaS shell.",
    stack: ["JavaScript", "HTML", "CSS"],
    period: "2024",
    classified: "Internal note: the UI was the product this time.",
  },
];

export const SUBSTANCES = [
  { name: "Python", code: "PY", detected: "Most days", finding: "Primary tool" },
  { name: "JavaScript (ES6+)", code: "JS", detected: "Most days", finding: "Primary tool" },
  { name: "React.js", code: "RCT", detected: "Most days", finding: "Primary tool" },
  { name: "Node.js / Express", code: "NODE", detected: "In projects", finding: "Primary tool" },
  { name: "Prompt Engineering", code: "PMPT", detected: "AWS certified", finding: "Primary tool" },
  { name: "Pandas / NumPy", code: "PND", detected: "In projects", finding: "Comfortable" },
  { name: "Tailwind CSS", code: "TWX", detected: "Most days", finding: "Comfortable" },
  { name: "Socket.io / WebSockets", code: "WSK", detected: "In projects", finding: "Comfortable" },
  { name: "MongoDB", code: "MDB", detected: "In projects", finding: "Comfortable" },
  { name: "C / C++ & DSA", code: "CPP", detected: "Coursework", finding: "Comfortable" },
  { name: "HTML5 Canvas API", code: "CNV", detected: "In projects", finding: "Comfortable" },
  { name: "Git / GitHub / Linux CLI", code: "GIT", detected: "Daily", finding: "Comfortable" },
  { name: "SQL", code: "SQL", detected: "Basics", finding: "Trace amount" },
  { name: "AWS", code: "AWS", detected: "Training", finding: "In training" },
];

export type Credential = {
  title: string;
  issuer: string;
  date: string;
  detail: string;
  image?: string;
  verify?: string;
};

export const CREDENTIALS: Credential[] = [
  {
    title: "Foundations of Prompt Engineering",
    issuer: "AWS Training & Certification",
    date: "July 2026",
    detail: "Prompt design patterns, model behaviour and evaluation for production LLM work.",
  },
  {
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "July 2026",
    detail: "Generative AI tools, model families and applied AI fundamentals. 2.00 CPE credits.",
  },
  {
    title: "Getting Started with Generative AI",
    issuer: "IBM SkillsBuild",
    date: "July 2026",
    detail: "IBM SkillsBuild digital badge covering generative AI foundations.",
    verify: "https://www.credly.com/go/PVpF3VtS",
  },
  {
    title: "Kaggle — Python",
    issuer: "Kaggle (Colin Morris & Alexis Cook)",
    date: "May 2024",
    detail: "Core Python for data work — functions, lists, loops, working with external libraries.",
  },
  {
    title: "Kaggle — Intro to Programming",
    issuer: "Kaggle (Alexis Cook)",
    date: "May 2024",
    detail: "Programming fundamentals, the first entry on the record.",
  },
];

export const IN_PROGRESS = ["Google AI", "IBM AI Fundamentals", "Microsoft Azure AI Fundamentals"];

export const LEDGER = [
  {
    period: "2023 — 2027",
    role: "B.Tech, Computer Science Engineering",
    org: "Parul University, Vadodara · CGPA 7+/10",
    body: "Final-year CSE student. Coursework on the record: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks and OOP.",
  },
  {
    period: "2024 — Present",
    role: "Freelance Web Developer",
    org: "Vadodara, Gujarat · Remote",
    body: "Delivered small client projects — landing pages, portfolio sites, simple tools — owning the process from initial brief through deployment. Learned to translate vague requirements into working products.",
  },
  {
    period: "2025 — Present",
    role: "Independent Builder",
    org: "Six full-stack projects, self-directed",
    body: "Six projects shipped end-to-end with no tutorials and no starter templates. Most skills on this page were acquired by building, breaking and fixing.",
  },
  {
    period: "2026 — Now",
    role: "Moving toward AI engineering",
    org: "Generative AI & prompt engineering coursework",
    body: "Deliberately building an AI/ML foundation on top of an existing software engineering base. Currently looking for an internship where both get used from day one.",
  },
];
