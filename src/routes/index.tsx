import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";

import { CREDENTIALS, EXHIBITS, IN_PROGRESS, LEDGER, SUBJECT, SUBSTANCES } from "@/content/dossier";

export const Route = createFileRoute("/")({ component: Portfolio });

const PROJECT_COLORS = ["#e8a11b", "#de5d3f", "#8cb0c7", "#d4c0a9", "#b7c957", "#ece5d7"];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.2 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Toolkit", "#toolkit"],
    ["Contact", "#contact"],
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Dev Patel, home">
          <span className="brand-mark">
            <Braces size={19} strokeWidth={2.4} />
          </span>
          <span>DEV PATEL</span>
        </a>
        <div className="nav-center" aria-hidden="true">
          <span>AI SYSTEMS</span>
          <span className="nav-pulse" />
          <span>FULL-STACK</span>
        </div>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open navigation">
          <Menu size={22} />
        </button>
      </nav>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-menu-top">
            <span className="eyebrow">Navigation / 2026</span>
            <button onClick={() => setOpen(false)} aria-label="Close navigation">
              <X />
            </button>
          </div>
          <div className="mobile-menu-links">
            {links.map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </div>
          <a className="mobile-email" href={`mailto:${SUBJECT.email}`}>
            {SUBJECT.email}
          </a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const project = EXHIBITS[active];
  const changeChannel = (direction: number) => {
    setActive((current) => (current + direction + EXHIBITS.length) % EXHIBITS.length);
  };

  return (
    <section id="top" className="tv-hero">
      <div className="tv-hero-head">
        <a href="#top" className="tv-wordmark">
          DEV PATEL<sup>®</sup>
        </a>
        <p>AI ENGINEER / FULL-STACK BUILDER</p>
        <span>VADODARA · INDIA</span>
      </div>

      <h1 className="sr-only">Dev Patel — AI engineer and full-stack builder</h1>

      <div className="tv-stage">
        <img
          className="tv-shell-image"
          src="/ai-terminal-hero.png"
          alt="A retro-futuristic orange AI terminal in a dark engineering studio"
        />
        <div className="tv-screen" aria-live="polite">
          <img
            key={project.id}
            src={project.images[0]}
            alt={`${project.title} project interface`}
          />
          <div className="tv-scanlines" aria-hidden="true" />
          <div className="tv-screen-meta">
            <span>CH {String(active + 1).padStart(2, "0")}</span>
            <span>{project.kicker}</span>
          </div>
          <a href={project.repo} target="_blank" rel="noreferrer" className="tv-open-project">
            Open project <ArrowUpRight size={15} />
          </a>
        </div>
        <button
          className="tv-hardware-button tv-hardware-prev"
          onClick={() => changeChannel(-1)}
          aria-label="Previous project channel"
        >
          <ChevronLeft />
        </button>
        <button
          className="tv-hardware-button tv-hardware-next"
          onClick={() => changeChannel(1)}
          aria-label="Next project channel"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="tv-channel-bar">
        <button onClick={() => changeChannel(-1)} aria-label="Previous channel">
          <ChevronLeft />
        </button>
        <div>
          <span>NOW PLAYING / {String(active + 1).padStart(2, "0")}</span>
          <strong>{project.title}</strong>
        </div>
        <p>{project.body}</p>
        <button onClick={() => changeChannel(1)} aria-label="Next channel">
          <ChevronRight />
        </button>
      </div>

      <a className="tv-scroll" href="#statement">
        Scroll to enter the lab <ArrowDown size={16} />
      </a>
    </section>
  );
}

function Statement() {
  return (
    <section id="statement" className="statement-section">
      <p className="eyebrow">What I do / Why it matters</p>
      <h2>
        Software with
        <br />
        <em>intelligence</em>
        <br />
        built in.
      </h2>
      <div>
        <p>
          I turn rough ideas into working products—then add the data, automation and AI that make
          them more useful.
        </p>
        <a href="#work">
          Explore the case files <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}

function Marquee() {
  const text =
    "PYTHON · REACT · TYPESCRIPT · NODE · GENERATIVE AI · WEBSOCKETS · PRODUCT THINKING · ";
  return (
    <div className="marquee" aria-label={text}>
      <div className="marquee-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="work-section">
      <div className="section-intro">
        <p className="eyebrow">01 / Selected systems</p>
        <h2>
          Proof lives
          <br />
          in the build.
        </h2>
        <p className="section-copy">
          Six end-to-end projects across machine learning, real-time systems, tooling and interface
          engineering.
        </p>
      </div>
      <div className="case-stack">
        {EXHIBITS.map((project, index) => (
          <article
            className="case-card"
            key={project.id}
            style={
              {
                "--case-color": PROJECT_COLORS[index],
                "--case-offset": `${84 + Math.min(index, 3) * 9}px`,
              } as React.CSSProperties
            }
          >
            <div className="case-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="case-media">
              <img
                src={project.images[0]}
                alt={`${project.title} interface`}
                loading={index < 2 ? "eager" : "lazy"}
              />
              <span className="case-year">{project.period}</span>
            </div>
            <div className="case-info">
              <div>
                <p className="eyebrow">{project.kicker}</p>
                <h3>{project.title}</h3>
              </div>
              <p className="case-description">{project.body}</p>
              <div className="case-bottom">
                <ul>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  View source <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-heading">
        <p className="eyebrow">02 / Operating principle</p>
        <h2>
          Curious enough
          <br />
          to go deep.
          <br />
          <em>Practical enough</em>
          <br />
          to ship.
        </h2>
      </div>
      <div className="about-body">
        <figure className="portrait-wrap">
          <img src="/media/dev-photo.jpg" alt="Dev Patel" loading="lazy" />
          <figcaption>Dev Patel / Vadodara, India</figcaption>
        </figure>
        <div className="about-copy">
          <p className="about-lead">
            I’m a final-year computer science student building toward AI engineering from a strong
            full-stack base.
          </p>
          <p>
            My best learning happens inside real products: a recommender where the maths drives the
            experience, a chat app that handles live state, a visualiser that turns algorithms into
            motion, or a scraper that replaces repetitive work.
          </p>
          <p>
            I care about the full arc—from understanding the problem and structuring the system to
            making the interface feel obvious.
          </p>
          <div className="about-facts">
            <div>
              <strong>06</strong>
              <span>Independent products</span>
            </div>
            <div>
              <strong>2027</strong>
              <span>CSE graduation</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Typical reply time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  const groups = useMemo(
    () => [
      { label: "Build", items: SUBSTANCES.slice(0, 5) },
      { label: "Engineer", items: SUBSTANCES.slice(5, 10) },
      { label: "Explore", items: SUBSTANCES.slice(10) },
    ],
    [],
  );
  return (
    <section id="toolkit" className="toolkit-section">
      <div className="toolkit-title">
        <p className="eyebrow">03 / Toolkit</p>
        <h2>
          What I use
          <br />
          to make ideas real.
        </h2>
      </div>
      <div className="tool-groups">
        {groups.map((group, groupIndex) => (
          <div className="tool-group" key={group.label}>
            <div className="tool-group-head">
              <span>0{groupIndex + 1}</span>
              <h3>{group.label}</h3>
            </div>
            {group.items.map((item) => (
              <div className="tool-row" key={item.code}>
                <span className="tool-code">{item.code}</span>
                <span>{item.name}</span>
                <small>{item.finding}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey-section">
      <div className="journey-title">
        <p className="eyebrow">04 / Trajectory</p>
        <h2>
          Learning in public.
          <br />
          Building for real.
        </h2>
        <p>
          Software foundations first. Applied AI next. A record of steady motion, not overnight
          expertise.
        </p>
      </div>
      <div className="journey-list">
        {LEDGER.map((item, index) => (
          <article key={item.period}>
            <span className="journey-index">0{index + 1}</span>
            <div>
              <p>{item.period}</p>
              <h3>{item.role}</h3>
            </div>
            <div>
              <strong>{item.org}</strong>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="credentials">
        <div className="credentials-head">
          <span className="eyebrow">Credentials / Recent</span>
          <span>{CREDENTIALS.length} completed</span>
        </div>
        <div className="credential-grid">
          {CREDENTIALS.map((credential, index) => (
            <article key={credential.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{credential.title}</h3>
              <p>{credential.issuer}</p>
              <small>{credential.date}</small>
            </article>
          ))}
        </div>
        <p className="in-progress">
          <span>In progress</span>
          {IN_PROGRESS.join(" · ")}
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-top">
        <p className="eyebrow">05 / Contact</p>
        <span>Vadodara, IN · Remote friendly</span>
      </div>
      <h2>
        Let’s build
        <br />
        <em>something useful.</em>
      </h2>
      <div className="contact-actions">
        <a className="contact-email" href={`mailto:${SUBJECT.email}`}>
          {SUBJECT.email}
          <ArrowUpRight />
        </a>
        <div className="socials">
          <a href={SUBJECT.github} target="_blank" rel="noreferrer">
            <Github /> GitHub
          </a>
          <a href={SUBJECT.linkedin} target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn
          </a>
          <a href={SUBJECT.resume} target="_blank" rel="noreferrer">
            <ArrowUpRight /> Résumé
          </a>
        </div>
      </div>
      <div className="footer-line">
        <span>© {new Date().getFullYear()} Dev Patel</span>
        <span>Designed & engineered in India</span>
        <a href="#top">
          Back to top <ArrowDown className="back-arrow" size={16} />
        </a>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="portfolio-shell">
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <Statement />
        <Marquee />
        <Work />
        <About />
        <Toolkit />
        <Journey />
      </main>
      <Contact />
      <a className="floating-mail" href={`mailto:${SUBJECT.email}`} aria-label="Email Dev Patel">
        <Mail size={19} />
      </a>
    </div>
  );
}
