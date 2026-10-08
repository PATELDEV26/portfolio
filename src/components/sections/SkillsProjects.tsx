import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// =============================================
// SKILLS SECTION
// =============================================

const SKILL_GROUPS = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "#3B82F6",
    skills: [
      { name: "React.js", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "HTML5 Canvas", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#06B6D4",
    skills: [
      { name: "Node.js / Express", level: 82 },
      { name: "Python", level: 85 },
      { name: "Socket.io / WS", level: 75 },
      { name: "MongoDB", level: 70 },
    ],
  },
  {
    category: "AI / Data",
    icon: "🤖",
    color: "#8B5CF6",
    skills: [
      { name: "Pandas / NumPy", level: 78 },
      { name: "Prompt Engineering", level: 80 },
      { name: "Cosine Similarity", level: 70 },
      { name: "GenAI Foundations", level: 72 },
    ],
  },
  {
    category: "Tooling",
    icon: "🛠️",
    color: "#22C55E",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Linux CLI", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "C / C++ / DSA", level: 72 },
    ],
  },
];

function SkillBar({ name, level, color, inView }: { name: string; level: number; color: string; inView: boolean }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
          {name}
        </span>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          style={{
            height: "100%",
            borderRadius: "100px",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            width: inView ? `${level}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Floating tech logos marquee
  const techStack = [
    "Python", "React", "TypeScript", "Node.js", "Express", "MongoDB",
    "Pandas", "Git", "HTML5", "CSS3", "Socket.io", "Tailwind", "JavaScript",
  ];

  return (
    <section id="skills" className="section-pad" ref={ref}
      style={{
        position: "relative",
        background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            What I Use
          </div>
          <h2 className="section-heading">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              maxWidth: "500px",
              margin: "0 auto",
              marginTop: "12px",
            }}
          >
            Tools I reach for when building real products — frontend, backend, AI, and everything in between.
          </p>
        </motion.div>

        {/* Skill group cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            marginBottom: "60px",
          }}
          className="skills-grid"
        >
          {SKILL_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="glass-card"
              style={{ padding: "28px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${group.color}18`,
                    border: `1px solid ${group.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  {group.icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "var(--text-primary)",
                  }}
                >
                  {group.category}
                </span>
              </div>

              {group.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={group.color}
                  inView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Marquee of tech pills */}
        <div
          style={{
            padding: "24px 0",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="marquee-container">
            <div className="marquee-track">
              {[...techStack, ...techStack].map((tech, idx) => (
                <span
                  key={idx}
                  className="tech-badge"
                  style={{ flexShrink: 0 }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// =============================================
// PROJECTS SECTION
// =============================================

const PROJECTS = [
  {
    id: "cinematch",
    name: "CineMatch",
    year: "2025",
    summary: "Content-based movie recommender using cosine similarity across genre, cast, and director data with live TMDB metadata.",
    highlight: "Recommendation logic first, interface second — built to prove the math works.",
    stack: ["Python", "Pandas", "TMDB API", "Cosine Similarity"],
    repo: "https://github.com/PATELDEV26/cinematch",
    emoji: "🎬",
    accentColor: "#3B82F6",
  },
  {
    id: "visualdsa",
    name: "VisualDSA",
    year: "2024",
    summary: "Visualizer for sorting, graph, and pathfinding algorithms with speed controls across bubble, merge, quick sort, BFS, DFS, Dijkstra, and A*.",
    highlight: "Turned algorithm steps into something you can actually feel and follow.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    repo: "https://github.com/PATELDEV26/VisualDSA",
    emoji: "📊",
    accentColor: "#06B6D4",
  },
  {
    id: "devboard",
    name: "DevBoard",
    year: "2025",
    summary: "Dark-themed developer workspace with dashboard, kanban, search, notifications, and auth scaffolding.",
    highlight: "A structured product UI where layout, navigation, and system thinking clicked.",
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/PATELDEV26/Devboard",
    emoji: "🖥️",
    accentColor: "#8B5CF6",
  },
  {
    id: "neontalk",
    name: "NeonTalk",
    year: "2025",
    summary: "Real-time multi-room chat with a cyberpunk access screen, concurrent users, join/leave events, and live broadcasting.",
    highlight: "A real-time app that taught event flow by breaking, fixing, and scaling it.",
    stack: ["Node.js", "Express", "Socket.io", "WebSockets"],
    repo: "https://github.com/PATELDEV26/NeonTalk",
    emoji: "💬",
    accentColor: "#22C55E",
  },
  {
    id: "retroscrape",
    name: "RetroScrape",
    year: "2024",
    summary: "Pixel-styled scraper where you paste a URL, choose headings, links, images, or tables, and pull the content you need.",
    highlight: "A practical tool built to replace repeated throwaway scraping scripts.",
    stack: ["JavaScript", "Python", "BeautifulSoup"],
    repo: "https://github.com/PATELDEV26/RetroScrape",
    emoji: "🕷️",
    accentColor: "#F59E0B",
  },
  {
    id: "litera",
    name: "Litera",
    year: "2024",
    summary: "Minimal document workspace for uploading and parsing CVs and files.",
    highlight: "A calmer document workflow built around clarity instead of clutter.",
    stack: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/PATELDEV26/Litera",
    emoji: "📄",
    accentColor: "#EC4899",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="section-pad"
      ref={ref}
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        position: "relative",
      }}
    >
      <div className="grid-bg" style={{ opacity: 0.4 }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Selected Work
          </div>
          <h2 className="section-heading">
            Projects Built to{" "}
            <span className="gradient-text">Ship</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              maxWidth: "520px",
              margin: "16px auto 0",
            }}
          >
            Six self-directed builds — no tutorials, no starter templates. Each one built to prove something specific.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="project-card"
              style={{ padding: "28px" }}
            >
              {/* Top: emoji + year */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: `${project.accentColor}15`,
                    border: `1px solid ${project.accentColor}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                  }}
                >
                  {project.emoji}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "6px",
                    padding: "3px 10px",
                  }}
                >
                  {project.year}
                </span>
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "10px",
                }}
              >
                {project.name}
              </h3>

              {/* Summary */}
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}
              >
                {project.summary}
              </p>

              {/* Highlight */}
              <p
                style={{
                  color: project.accentColor,
                  fontSize: "13px",
                  fontStyle: "italic",
                  marginBottom: "20px",
                  opacity: 0.85,
                }}
              >
                "{project.highlight}"
              </p>

              {/* Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "3px 10px",
                      background: `${project.accentColor}12`,
                      border: `1px solid ${project.accentColor}25`,
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                      color: project.accentColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--blue-light)",
                  fontSize: "13px",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--blue-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub ↗
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
