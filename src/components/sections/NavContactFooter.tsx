import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// =============================================
// NAVBAR COMPONENT
// =============================================

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 60);
    }, { passive: true });
  }

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certs", href: "#certifications" },
    { label: "Timeline", href: "#timeline" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled
          ? "rgba(7, 14, 26, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(59, 130, 246, 0.1)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--blue-light)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          {"< DEV />"}
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-glow"
            style={{
              display: "inline-block",
              textDecoration: "none",
              padding: "8px 20px",
              fontSize: "14px",
              borderRadius: "8px",
            }}
          >
            <span>Hire Me</span>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            padding: "4px",
          }}
          aria-label="Toggle menu"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "2px",
                  transition: "all 0.3s",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-7px) rotate(-45deg)"
                      : menuOpen && i === 1
                      ? "scaleX(0)"
                      : "none",
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(7, 14, 26, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 500,
                padding: "8px 0",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-glow"
            style={{
              display: "block",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            <span>Hire Me</span>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// =============================================
// CONTACT SECTION
// =============================================

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mailto fallback
    const mailtoUrl = `mailto:pateldev2317@gmail.com?subject=Contact from ${formState.name}&body=${formState.message}%0A%0AFrom: ${formState.email}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="section-pad"
      ref={ref}
      style={{
        position: "relative",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.1) 0%, transparent 70%)",
      }}
    >
      <div className="grid-bg" />
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get In Touch
          </div>
          <h2 className="section-heading">
            Let's Build{" "}
            <span className="gradient-text">Something</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              maxWidth: "480px",
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Open to internships, freelance builds, and remote work. Drop a message and I'll get back within 24 hours.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
              {[
                { icon: "✉️", label: "Email", value: "pateldev2317@gmail.com", href: "mailto:pateldev2317@gmail.com" },
                { icon: "📍", label: "Location", value: "Vadodara, Gujarat, India" },
                { icon: "⏰", label: "Response Time", value: "Usually within 24 hours" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 20px",
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: "2px" }}>
                      {item.label.toUpperCase()}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ color: "var(--blue-light)", fontSize: "14px", textDecoration: "none" }}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "14px" }}>
                FIND ME ON
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
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
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "50px 30px",
                  background: "rgba(34, 197, 94, 0.08)",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                  borderRadius: "16px",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
                  Opening your email client!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  The message has been pre-filled in your email app.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="input-field"
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    id="contact-name"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="input-field"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    id="contact-email"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
                    MESSAGE
                  </label>
                  <textarea
                    required
                    placeholder="Hi Dev, I'd like to..."
                    className="input-field"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    style={{ resize: "vertical", fontFamily: "inherit" }}
                    id="contact-message"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-glow"
                  style={{ width: "100%", padding: "14px", fontSize: "15px" }}
                  id="contact-submit"
                >
                  <span>Send Message →</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// =============================================
// FOOTER COMPONENT
// =============================================

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <a
            href="#home"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--blue-light)",
              textDecoration: "none",
            }}
          >
            {"< DEV />"}
          </a>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            © 2026 Dev Patel · Built with React + TypeScript + Framer Motion
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { href: "https://github.com/PATELDEV26", label: "GitHub" },
              { href: "https://linkedin.com/in/dev-patel-66363b257", label: "LinkedIn" },
              { href: "mailto:pateldev2317@gmail.com", label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--blue-light)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
