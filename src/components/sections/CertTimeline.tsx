import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// =============================================
// CERTIFICATIONS SECTION
// =============================================

const CERTIFICATIONS = [
  {
    title: "Foundations of Prompt Engineering",
    issuer: "AWS Training & Certification",
    date: "July 2026",
    detail: "Prompt design patterns and model behavior for practical LLM work.",
    icon: "☁️",
    color: "#F59E0B",
    verify: null,
    badge: "AWS",
  },
  {
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "July 2026",
    detail: "Generative AI fundamentals with 2.00 CPE credits.",
    icon: "🎓",
    color: "#3B82F6",
    verify: null,
    badge: "LI",
  },
  {
    title: "Getting Started with Generative AI",
    issuer: "IBM SkillsBuild",
    date: "July 2026",
    detail: "Generative AI foundations — Credly verified.",
    icon: "🏆",
    color: "#8B5CF6",
    verify: "https://www.credly.com/go/PVpF3VtS",
    badge: "IBM",
  },
  {
    title: 'Kaggle "Python"',
    issuer: "Kaggle",
    date: "May 2024",
    detail: "Core Python skills for everyday programming and data work.",
    icon: "🐍",
    color: "#06B6D4",
    verify: null,
    badge: "KGL",
  },
  {
    title: 'Kaggle "Intro to Programming"',
    issuer: "Kaggle",
    date: "May 2024",
    detail: "Programming fundamentals and early problem-solving practice.",
    icon: "💡",
    color: "#22C55E",
    verify: null,
    badge: "KGL",
  },
];

const IN_PROGRESS = [
  { name: "Google AI Essentials", progress: 60 },
  { name: "IBM AI Fundamentals", progress: 40 },
  { name: "Microsoft Azure AI-900", progress: 25 },
];

export function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certifications"
      className="section-pad"
      ref={ref}
      style={{
        position: "relative",
        background:
          "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)",
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
            Credentials
          </div>
          <h2 className="section-heading">
            Certifications &{" "}
            <span className="gradient-text">Learning</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              maxWidth: "480px",
              margin: "12px auto 0",
            }}
          >
            Verified credentials from AWS, IBM, LinkedIn, and Kaggle — with more in progress.
          </p>
        </motion.div>

        {/* Earned certs grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "50px",
          }}
          className="certs-grid"
        >
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.09 }}
              className="cert-card"
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                  }}
                >
                  {cert.icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: cert.color,
                    background: `${cert.color}12`,
                    border: `1px solid ${cert.color}25`,
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontWeight: 700,
                  }}
                >
                  {cert.badge}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                  lineHeight: 1.3,
                }}
              >
                {cert.title}
              </h3>

              {/* Issuer + date */}
              <p
                style={{
                  fontSize: "13px",
                  color: cert.color,
                  marginBottom: "10px",
                  fontWeight: 500,
                }}
              >
                {cert.issuer} · {cert.date}
              </p>

              {/* Detail */}
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  marginBottom: cert.verify ? "16px" : "0",
                }}
              >
                {cert.detail}
              </p>

              {/* Verify link */}
              {cert.verify && (
                <a
                  href={cert.verify}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: cert.color,
                    textDecoration: "none",
                    fontFamily: "var(--font-mono)",
                    borderBottom: `1px solid ${cert.color}40`,
                    paddingBottom: "1px",
                    transition: "border-color 0.2s",
                  }}
                >
                  ✓ Verify on Credly ↗
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* In Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            padding: "36px 40px",
            background: "var(--bg-glass)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "20px",
          }}
          className="in-progress-card"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 10px #22C55E",
                animation: "glowPulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Currently In Progress
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {IN_PROGRESS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--cyan)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item.progress}%
                  </span>
                </div>
                <div className="skill-bar-track">
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "100px",
                      background: "linear-gradient(90deg, var(--cyan), var(--purple))",
                      transition: `width 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.7 + idx * 0.15}s`,
                      width: isInView ? `${item.progress}%` : "0%",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .certs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .certs-grid { grid-template-columns: 1fr !important; }
          .in-progress-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}

// =============================================
// CAREER TIMELINE SECTION
// =============================================

const TIMELINE = [
  {
    period: "2023 – 2027",
    title: "B.Tech CSE, Parul University",
    body: "Coursework includes DSA, DBMS, Operating Systems, Computer Networks, and OOP. CGPA 7+ and focused on shipping real products.",
    icon: "🎓",
    color: "#3B82F6",
  },
  {
    period: "2024 – Present",
    title: "Freelance Web Developer",
    body: "Landing pages, portfolio sites, and small tools for clients in Vadodara and remote. Turning client briefs into deployed, working products.",
    icon: "💼",
    color: "#06B6D4",
  },
  {
    period: "2025 – Present",
    title: "Independent Builder",
    body: "Six full-stack projects built self-directed, without tutorials or starter templates. From algorithm visualizers to real-time chat systems.",
    icon: "🚀",
    color: "#8B5CF6",
  },
  {
    period: "2026 – Now",
    title: "Moving Toward AI Engineering",
    body: "Generative AI and prompt engineering coursework with AWS, IBM, and Google certifications while actively looking for an internship.",
    icon: "🤖",
    color: "#22C55E",
  },
];

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="timeline"
      className="section-pad"
      ref={ref}
      style={{
        position: "relative",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="grid-bg" />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "70px" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Career Path
          </div>
          <h2 className="section-heading">
            The{" "}
            <span className="gradient-text">Journey</span>{" "}
            So Far
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, transparent, var(--blue-primary) 10%, var(--blue-primary) 90%, transparent)",
              transform: "translateX(-50%)",
            }}
            className="timeline-center"
          />

          {TIMELINE.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-end" : "flex-start",
                  marginBottom: "50px",
                  position: "relative",
                }}
                className="timeline-item"
              >
                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    width: "calc(50% - 40px)",
                    padding: "24px",
                    marginRight: isLeft ? "40px" : "0",
                    marginLeft: isLeft ? "0" : "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: item.color,
                        fontWeight: 700,
                      }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.body}
                  </p>
                </div>

                {/* Center dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "24px",
                    transform: "translate(-50%, 0)",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: item.color,
                    border: "3px solid var(--bg-secondary)",
                    boxShadow: `0 0 12px ${item.color}`,
                    zIndex: 2,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .timeline-center { left: 20px !important; }
          .timeline-item { justify-content: flex-start !important; }
          .timeline-item > .glass-card {
            width: calc(100% - 50px) !important;
            margin-left: 50px !important;
            margin-right: 0 !important;
          }
          .timeline-item > div:last-child {
            left: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
