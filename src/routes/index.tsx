import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  Activity,
  BrainCircuit,
  Braces,
  Code2,
  Database,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Radio,
  X,
} from "lucide-react";

import { CREDENTIALS, EXHIBITS, IN_PROGRESS, LEDGER, SUBJECT, SUBSTANCES } from "@/content/dossier";

export const Route = createFileRoute("/")({ component: Portfolio });

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.2 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Projects", "#projects"],
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
  const [frame, setFrame] = useState(0);
  const [powered, setPowered] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const project = EXHIBITS[active];

  useEffect(() => {
    setShowGuide(window.localStorage.getItem("dev-patel-tv-started") !== "yes");
  }, []);

  const togglePower = () => {
    const next = !powered;
    if (next) {
      window.localStorage.setItem("dev-patel-tv-started", "yes");
      setShowGuide(false);
    }
    setPowered(next);
  };

  const changeChannel = (direction: number) => {
    if (!powered) return;
    setActive((current) => (current + direction + EXHIBITS.length) % EXHIBITS.length);
    setFrame(0);
  };

  const selectChannel = (index: number) => {
    if (!powered) return;
    setActive(index);
    setFrame(0);
  };

  const changeFrame = () => {
    if (!powered) return;
    setFrame((current) => (current + 1) % project.images.length);
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

      <div
        className="tv-stage"
        tabIndex={0}
        role="group"
        aria-label="Interactive project television. Use the left and right arrow keys to change channels."
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") changeChannel(-1);
          if (event.key === "ArrowRight") changeChannel(1);
          if (event.key === "ArrowUp") changeFrame();
        }}
      >
        <img
          className="tv-shell-image"
          src="/ai-terminal-hero-v2.png"
          alt="A retro-futuristic orange AI terminal in a dark engineering studio"
        />
        <div className={`tv-screen ${powered ? "is-on" : "is-off"}`} aria-live="polite">
          {powered ? (
            <>
              <img
                key={`${project.id}-${frame}`}
                src={project.images[frame]}
                alt={`${project.title} project interface`}
              />
              <div className="tv-screen-meta">
                <span>CH {String(active + 1).padStart(2, "0")} · INPUT DEV</span>
                <span>
                  {frame + 1}/{project.images.length}
                </span>
              </div>
              <div className="tv-screen-title">
                <span>{project.period} / PROJECT SIGNAL</span>
                <strong>{project.title}</strong>
              </div>
              <a href={project.repo} target="_blank" rel="noreferrer" className="tv-open-project">
                View source
              </a>
            </>
          ) : (
            <div className="tv-off-screen">
              <span>STANDBY</span>
              <strong>NO SIGNAL</strong>
              <small>PRESS POWER TO BEGIN</small>
            </div>
          )}
          <div className="tv-glass-reflection" aria-hidden="true" />
          <div className="tv-scanlines" aria-hidden="true" />
        </div>
        <div className="tv-lcd" aria-hidden="true">
          <span>{powered ? `CH${String(active + 1).padStart(2, "0")}` : "PWR"}</span>
          <strong>{powered ? project.title.toUpperCase() : "STANDBY"}</strong>
        </div>
        <button
          className={`tv-power-button ${powered ? "is-on" : ""}`}
          onClick={togglePower}
          aria-label={powered ? "Turn television off" : "Turn television on"}
          aria-pressed={powered}
        >
          <span className="sr-only">{powered ? "Power off" : "Power on"}</span>
        </button>
        <button
          className="tv-hardware-button tv-hardware-frame"
          onClick={changeFrame}
          disabled={!powered}
          aria-label={`Show next ${project.title} screen`}
        />
        <button
          className="tv-hardware-button tv-hardware-prev"
          onClick={() => changeChannel(-1)}
          disabled={!powered}
          aria-label="Previous project channel"
        />
        <button
          className="tv-hardware-button tv-hardware-next"
          onClick={() => changeChannel(1)}
          disabled={!powered}
          aria-label="Next project channel"
        />
        {showGuide && !powered && (
          <div className="tv-start-guide" role="status">
            <span>FIRST VISIT / START HERE</span>
            <strong>Wake up the TV.</strong>
            <p>
              Press the glowing round power button. Then use the three black buttons to browse
              projects.
            </p>
            <button onClick={togglePower}>Power on TV</button>
          </div>
        )}
      </div>

      <div id="projects" className={`tv-program-guide ${powered ? "is-on" : "is-off"}`}>
        <div className="tv-program-head">
          <div>
            <span>
              {powered
                ? `NOW PLAYING / CHANNEL ${String(active + 1).padStart(2, "0")}`
                : "RECEIVER / STANDBY"}
            </span>
            <strong>{powered ? project.title : "Signal offline"}</strong>
          </div>
          <p>{powered ? project.kicker : "Press power to tune in"}</p>
        </div>
        <p className="tv-program-copy">
          {powered
            ? project.body
            : "The project channels are waiting. Start the television with the glowing button, then tune through six selected builds."}
        </p>
        <ul className="tv-program-stack" aria-label={`${project.title} technologies`}>
          {(powered ? project.stack : ["Power", "Tune", "Explore"]).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="tv-channel-select" aria-label="Project channels">
          {EXHIBITS.map((channel, index) => (
            <button
              key={channel.id}
              className={index === active ? "is-active" : ""}
              onClick={() => selectChannel(index)}
              disabled={!powered}
              aria-label={`Tune to ${channel.title}`}
              aria-pressed={index === active}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {channel.title}
            </button>
          ))}
        </div>
        <div className="tv-control-legend" aria-label="Television controls">
          <span>▲ Next screen</span>
          <span>◀ ▶ Change project</span>
          <span>● Power</span>
        </div>
      </div>

      <a className="tv-scroll" href="#statement">
        Scroll to enter the lab <ArrowDown size={16} />
      </a>
    </section>
  );
}

function Statement() {
  return (
    <section id="statement" className="field-intro">
      <div className="field-intro-rail" aria-hidden="true">
        <span>FIELD MANUAL</span>
        <span>VOL. 01 / 2026</span>
      </div>
      <Reveal className="field-intro-main">
        <p className="eyebrow">Beyond the screen / How I think</p>
        <h2>
          Useful software.
          <br />
          <em>Intelligence</em> where
          <br />
          it earns its place.
        </h2>
        <p className="field-intro-summary">
          I turn unclear problems into working systems—then use data, automation and AI where they
          create a real advantage, not just a headline.
        </p>
      </Reveal>
      <div className="field-principles">
        {[
          [
            "01",
            "Understand first",
            "Start with the person, the constraint and the actual job to be done.",
          ],
          [
            "02",
            "Engineer the core",
            "Build the data flow, product logic and interfaces as one connected system.",
          ],
          [
            "03",
            "Make it obvious",
            "A smart product still has to feel calm, fast and natural to use.",
          ],
        ].map(([number, title, body]) => (
          <Reveal className="field-principle" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const text =
    "FRAME THE PROBLEM  /  BUILD THE SYSTEM  /  TEST THE EDGE CASES  /  SHIP THE USEFUL THING  /  ";
  return (
    <div className="marquee data-tape" aria-label={text}>
      <span className="data-tape-label">LIVE PROCESS</span>
      <div className="marquee-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="operator-section">
      <div className="operator-grid">
        <Reveal className="operator-heading">
          <p className="eyebrow">01 / Human in the loop</p>
          <h2>
            Meet the
            <br />
            <em>operator.</em>
          </h2>
          <p>
            Final-year computer science student. Full-stack builder. Moving deliberately toward AI
            engineering—one shipped system at a time.
          </p>
        </Reveal>

        <Reveal className="operator-visual">
          <div className="portrait-scanner">
            <img src="/media/dev-photo.jpg" alt="Dev Patel" loading="lazy" />
            <div className="scanner-line" aria-hidden="true" />
            <span className="scanner-corner scanner-corner-a" aria-hidden="true" />
            <span className="scanner-corner scanner-corner-b" aria-hidden="true" />
            <span className="operator-id">DP / 027</span>
            <span className="operator-status">
              <i /> AVAILABLE
            </span>
          </div>
          <figcaption>DEV PATEL · VADODARA, INDIA · REMOTE FRIENDLY</figcaption>
        </Reveal>

        <Reveal className="operator-log">
          <div className="operator-log-head">
            <Radio size={16} />
            <span>OPERATOR LOG / CURRENT SIGNAL</span>
          </div>
          <p className="operator-lead">
            I learn best by building the entire product, not isolated demos.
          </p>
          <p>
            That has meant making recommendation logic matter to the interface, handling live state
            in a chat system, animating algorithms so their behavior is visible, and turning repeat
            scripts into usable tools.
          </p>
          <p>
            I care about the full arc: understanding the problem, structuring the system, testing
            assumptions and making the final experience feel obvious.
          </p>
          <dl className="operator-facts">
            <div>
              <dt>Products shipped</dt>
              <dd>06</dd>
            </div>
            <div>
              <dt>Graduating</dt>
              <dd>2027</dd>
            </div>
            <div>
              <dt>Current vector</dt>
              <dd>AI ENG.</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

const PROCESS = [
  {
    code: "P-01",
    title: "Frame",
    body: "Turn a vague request into a clear user, constraint and success condition.",
    output: "Problem map",
  },
  {
    code: "P-02",
    title: "Prototype",
    body: "Find the smallest honest version that can prove the risky part of the idea.",
    output: "Working proof",
  },
  {
    code: "P-03",
    title: "Engineer",
    body: "Connect interface, data and backend with maintainable boundaries and useful feedback.",
    output: "System core",
  },
  {
    code: "P-04",
    title: "Evaluate",
    body: "Test behavior, edge cases and—when AI is involved—the quality of the output itself.",
    output: "Evidence",
  },
  {
    code: "P-05",
    title: "Ship",
    body: "Polish the details, deploy the product and learn from how it behaves in the real world.",
    output: "Live product",
  },
];

function Process() {
  return (
    <section className="process-section" aria-labelledby="process-title">
      <Reveal className="process-heading">
        <div>
          <p className="eyebrow">02 / Build protocol</p>
          <span className="process-state">
            <i /> SYSTEMATIC, NOT STATIC
          </span>
        </div>
        <h2 id="process-title">How an idea becomes a system.</h2>
        <p>
          The tools change. The discipline does not. Each build moves through the same five gates,
          with room to loop back when the evidence says so.
        </p>
      </Reveal>
      <div className="process-list">
        {PROCESS.map((step, index) => (
          <motion.article
            key={step.code}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <span className="process-code">{step.code}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <strong>{step.output}</strong>
          </motion.article>
        ))}
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
    <section id="toolkit" className="capability-section">
      <Reveal className="capability-heading">
        <div>
          <p className="eyebrow">03 / Capability matrix</p>
          <h2>
            Built across
            <br />
            the whole stack.
          </h2>
        </div>
        <p>
          A practical toolkit shaped by shipped projects. Strongest in product engineering,
          expanding into data and applied AI.
        </p>
      </Reveal>
      <div className="capability-console">
        <div className="capability-console-bar">
          <span>
            <i /> DEV_SYSTEMS / SKILL_SCAN
          </span>
          <span>14 SIGNALS DETECTED</span>
        </div>
        {groups.map((group, groupIndex) => (
          <Reveal className="capability-group" key={group.label}>
            <header>
              <span>BUS_0{groupIndex + 1}</span>
              <h3>{group.label}</h3>
              {groupIndex === 0 ? <Code2 /> : groupIndex === 1 ? <Layers3 /> : <BrainCircuit />}
            </header>
            {group.items.map((item) => (
              <div className="capability-row" key={item.code}>
                <span className="capability-code">{item.code}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span className="capability-track" aria-hidden="true">
                    <i />
                  </span>
                </div>
                <small>{item.detected}</small>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="signal-section">
      <Reveal className="signal-heading">
        <div>
          <p className="eyebrow">04 / Signal log</p>
          <span>
            <Activity size={15} /> TRAJECTORY ACTIVE
          </span>
        </div>
        <h2>Progress leaves a trace.</h2>
        <p>
          Software foundations first. Applied AI next. This is a record of steady motion—not a claim
          of overnight expertise.
        </p>
      </Reveal>
      <div className="signal-timeline">
        {LEDGER.map((item, index) => (
          <Reveal className="signal-entry" key={item.period}>
            <div className="signal-node">
              <i />
              <span>0{index + 1}</span>
            </div>
            <div className="signal-period">{item.period}</div>
            <div className="signal-role">
              <h3>{item.role}</h3>
              <strong>{item.org}</strong>
            </div>
            <div className="signal-copy">
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="learning-board">
        <div className="learning-board-head">
          <div>
            <Database size={17} />
            <span>LEARNING ARCHIVE / VERIFIED INPUTS</span>
          </div>
          <span>{CREDENTIALS.length} RECORDS</span>
        </div>
        <div className="learning-grid">
          {CREDENTIALS.map((credential, index) => (
            <article key={credential.title}>
              <span className="learning-index">REC-{String(index + 1).padStart(2, "0")}</span>
              <small>{credential.date}</small>
              <h3>{credential.title}</h3>
              <p>{credential.issuer}</p>
              <p className="learning-detail">{credential.detail}</p>
            </article>
          ))}
        </div>
        <div className="learning-active">
          <span>
            <i /> CURRENTLY LOADING
          </span>
          <p>{IN_PROGRESS.join("  /  ")}</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="channel-section">
      <div className="channel-top">
        <p className="eyebrow">05 / Open channel</p>
        <span>
          <i /> AVAILABLE FOR THE RIGHT BUILD
        </span>
      </div>
      <h2>
        Have a hard
        <br />
        problem? <em>Good.</em>
      </h2>
      <div className="channel-deck">
        <div>
          <p>
            I’m looking for AI engineering internships, thoughtful freelance work and teams that
            care about how the product actually feels.
          </p>
          <span>Usually replies within 24 hours · Vadodara / Remote</span>
        </div>
        <a className="channel-email" href={`mailto:${SUBJECT.email}`}>
          <span>START A CONVERSATION</span>
          <strong>{SUBJECT.email}</strong>
        </a>
      </div>
      <div className="channel-links">
        <div className="channel-socials">
          <a href={SUBJECT.github} target="_blank" rel="noreferrer">
            <Github /> GitHub
          </a>
          <a href={SUBJECT.linkedin} target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn
          </a>
          <a href={SUBJECT.resume} target="_blank" rel="noreferrer">
            <span className="resume-mark">CV</span> Résumé
          </a>
        </div>
        <a className="channel-top-link" href="#top">
          BACK TO TOP
        </a>
      </div>
      <div className="channel-footer">
        <span>© {new Date().getFullYear()} Dev Patel</span>
        <span>DESIGNED & ENGINEERED IN INDIA</span>
        <span>AI SYSTEMS / FULL-STACK</span>
      </div>
    </footer>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
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
        <About />
        <Process />
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
