import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// =============================================
// HOOK: Typewriter
// =============================================
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timer = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

// =============================================
// HERO SECTION
// =============================================
export function HeroSection() {
  const role = useTypewriter(
    ["Full-Stack Developer", "AI Engineer", "Freelancer", "React Specialist"],
    75,
    2000
  );
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 100% 80% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 70%), var(--bg-primary)",
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" />
      <div className="radial-overlay" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--blue-primary)",
            animation: `particleFloat ${p.duration} ${p.delay} ease-in-out infinite`,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Animated rings */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          pointerEvents: "none",
          display: "none",
        }}
        className="lg-rings"
      />

      <motion.div
        style={{ y, opacity }}
        className="hero-motion-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "60px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Text content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  display: "inline-block",
                  animation: "glowPulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--cyan)",
                  letterSpacing: "0.1em",
                }}
              >
                OPEN TO INTERNSHIPS & FREELANCE
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "var(--text-primary)" }}>Hi, I'm </span>
              <span className="gradient-text">Dev Patel</span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                marginBottom: "28px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minHeight: "2.5rem",
              }}
            >
              <span style={{ color: "var(--blue-light)" }}>{role}</span>
              <span className="cursor" />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                maxWidth: "560px",
                marginBottom: "40px",
              }}
            >
              Final-year CSE student at Parul University shipping full-stack web
              products with React, TypeScript & Node — moving toward AI
              engineering with real project depth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
            >
              <a href="#projects" className="btn-glow" style={{ display: "inline-block", textDecoration: "none" }}>
                <span>View My Work</span>
              </a>
              <a
                href="/media/Dev_Patel_Resume_AI_Engineer.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ display: "inline-block", textDecoration: "none" }}
              >
                Download Resume ↗
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ display: "flex", gap: "12px", marginTop: "40px" }}
            >
              <a
                href="https://github.com/PATELDEV26"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/dev-patel-66363b257"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:pateldev2317@gmail.com"
                className="social-icon"
                title="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="hero-avatar"
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              flexShrink: 0,
            }}
          >
            {/* Outer glow ring */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
                animation: "glowPulse 3s ease-in-out infinite",
              }}
            />
            {/* Rotating orbit ring */}
            <div
              style={{
                position: "absolute",
                inset: "-30px",
                borderRadius: "50%",
                border: "1px dashed rgba(59,130,246,0.25)",
                animation: "rotateSlow 20s linear infinite",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  transform: "translateY(-50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 10px var(--cyan)",
                }}
              />
            </div>
            {/* Second orbit */}
            <div
              style={{
                position: "absolute",
                inset: "-50px",
                borderRadius: "50%",
                border: "1px dashed rgba(139, 92, 246, 0.15)",
                animation: "rotateSlow 35s linear infinite reverse",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "5%",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--purple)",
                  boxShadow: "0 0 8px var(--purple)",
                }}
              />
            </div>

            {/* Avatar image */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid rgba(59,130,246,0.4)",
                boxShadow:
                  "0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.1)",
                background: "var(--bg-secondary)",
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <img
                src="/avatar.jpg"
                alt="Dev Patel"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Floating badge: React */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                position: "absolute",
                top: "10%",
                right: "-30px",
                background: "var(--bg-glass)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <span style={{ fontSize: "20px" }}>⚛️</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>React 19</span>
            </motion.div>

            {/* Floating badge: AI */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              style={{
                position: "absolute",
                bottom: "15%",
                left: "-40px",
                background: "var(--bg-glass)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                borderRadius: "12px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <span style={{ fontSize: "20px" }}>🤖</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--cyan)" }}>AI Engineer</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>
            SCROLL
          </span>
          <div
            style={{
              width: "24px",
              height: "38px",
              border: "2px solid rgba(59,130,246,0.3)",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              paddingTop: "6px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "8px",
                borderRadius: "2px",
                background: "var(--blue-primary)",
                animation: "float 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
          }
          .hero-avatar {
            width: 240px !important;
            height: 240px !important;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}

// =============================================
// MANIFESTO BANNER
// =============================================
export function ManifestoBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "80px 0",
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.05) 50%, rgba(139,92,246,0.08) 100%)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Moving text track */}
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(2)].map((_, repeatIdx) => (
            <span key={repeatIdx} style={{ display: "inline-flex", gap: "48px", alignItems: "center" }}>
              {[
                "Full-Stack Delivery",
                "AI Engineering",
                "React & TypeScript",
                "Real-Time Systems",
                "Node.js & APIs",
                "Problem Solver",
                "Freelance Builds",
                "Clean Code",
              ].map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    fontWeight: 700,
                    color: idx % 2 === 0 ? "var(--text-primary)" : "transparent",
                    WebkitTextStroke: idx % 2 !== 0 ? "1px rgba(59,130,246,0.4)" : "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginRight: "48px",
                  }}
                >
                  {item}
                  {idx < 7 && (
                    <span
                      style={{
                        display: "inline-block",
                        margin: "0 24px",
                        color: "var(--blue-primary)",
                        opacity: 0.6,
                      }}
                    >
                      ✦
                    </span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Center statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          marginTop: "60px",
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          "Coding is more than a skill — it's how I turn ideas into things that{" "}
          <span className="gradient-text">actually work</span> in the real world."
        </p>
      </motion.div>
    </section>
  );
}

// =============================================
// ABOUT SECTION
// =============================================
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { label: "Projects Shipped", value: 6, suffix: "" },
    { label: "Years Building", value: 2, suffix: "+" },
    { label: "Certifications", value: 5, suffix: "" },
    { label: "Response Time", value: 24, suffix: "h" },
  ];

  return (
    <section id="about" className="section-pad" ref={ref} style={{ position: "relative" }}>
      <div className="grid-bg" style={{ opacity: 0.5 }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">About Me</div>
          <h2 className="section-heading">
            The Dev Behind the{" "}
            <span className="gradient-text">Code</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            marginTop: "50px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: "28px",
              }}
            >
              I'm a final-year Computer Science Engineering student at{" "}
              <span style={{ color: "var(--blue-light)", fontWeight: 500 }}>Parul University</span> in Vadodara. I build full-stack web products with React, TypeScript, Node, and Postgres while moving toward AI engineering.
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: "36px",
              }}
            >
              I freelance for local shops and clinics around Vadodara, and I like taking ideas from a rough brief to a working, deployed product. Six projects shipped — all self-directed, no tutorials.
            </p>

            {/* Facts list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "🎓", text: "Class of 2027 — Parul University" },
                { icon: "📍", text: "Vadodara, Gujarat, India (IST)" },
                { icon: "💼", text: "Open to internships & remote work" },
                { icon: "🤖", text: "Building toward AI Engineering" },
              ].map((fact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 18px",
                    background: "rgba(59,130,246,0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{fact.icon}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{fact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats + tech pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="glass-card"
                  style={{ padding: "24px", textAlign: "center" }}
                >
                  <div className="stat-number">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "6px" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack pills */}
            <div style={{ marginBottom: "12px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "14px" }}>
                TECH STACK
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Python", "JavaScript", "TypeScript", "React.js", "Node.js", "Express", "Pandas", "NumPy", "Socket.io", "MongoDB", "Tailwind CSS", "HTML5 Canvas", "Git/GitHub", "Linux CLI", "Prompt Eng."].map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
