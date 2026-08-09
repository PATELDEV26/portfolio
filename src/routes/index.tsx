import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import {
  CAREER_TIMELINE,
  CERTIFICATIONS,
  IN_PROGRESS_CERTS,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  type Project,
} from "@/content/metro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dev Patel | Full-Stack Developer & AI Engineer" },
      {
        name: "description",
        content:
          "Dev Patel is a full-stack developer in Vadodara building expressive digital products with React, TypeScript, Node, Python, and AI.",
      },
      { property: "og:title", content: "Dev Patel | The Dev Field" },
      {
        property: "og:description",
        content:
          "Selected systems, experiments, and the story of a full-stack developer moving toward AI engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function Home() {
  const reduceMotion = Boolean(useReducedMotion());
  const [entered, setEntered] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectImageIndex, setProjectImageIndex] = useState(0);
  const [cursorLabel, setCursorLabel] = useState("");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflow = entered && !activeProject ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, entered]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeProject) setActiveProject(null);
      if ((event.key === "Enter" || event.key === " ") && !entered) setEntered(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject, entered]);

  const openProject = (project: Project) => {
    setProjectImageIndex(0);
    setActiveProject(project);
  };

  return (
    <div className="portfolio-shell">
      <AnimatePresence mode="wait">
        {!entered ? (
          <EntryPortal key="entry" onEnter={() => setEntered(true)} reduceMotion={reduceMotion} />
        ) : (
          <motion.div
            key="experience"
            className="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.65 }}
          >
            <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
            <CursorHalo label={cursorLabel} />
            <SiteHeader />
            <main>
              <Hero reduceMotion={reduceMotion} />
              <Manifesto />
              <Work
                openProject={openProject}
                setCursorLabel={setCursorLabel}
                reduceMotion={reduceMotion}
              />
              <Profile />
              <Skills />
              <Journey />
              <Credentials />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeProject ? (
          <ProjectStory
            project={activeProject}
            imageIndex={projectImageIndex}
            setImageIndex={setProjectImageIndex}
            onClose={() => setActiveProject(null)}
            reduceMotion={reduceMotion}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function EntryPortal({ onEnter, reduceMotion }: { onEnter: () => void; reduceMotion: boolean }) {
  return (
    <motion.section
      className="entry"
      aria-label="Portfolio introduction"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.035 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: EASE }}
    >
      <div className="entry__grain" />
      <div className="entry__topline">
        <FieldMark />
        <span>DEV PATEL / PORTFOLIO 2026</span>
        <span>VADODARA, IN</span>
      </div>

      <motion.div
        className="entry__orb"
        initial={{ scale: reduceMotion ? 1 : 0.5, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: EASE }}
      >
        <span>FULL-STACK</span>
        <span>AI / NEXT</span>
      </motion.div>

      <div className="entry__copy">
        <span className="eyebrow">WELCOME TO</span>
        <h1>
          THE DEV
          <br />
          FIELD<sup>TM</sup>
        </h1>
        <p>A living portfolio of code, systems, curiosity, and forward motion.</p>
      </div>

      <button className="entry__button" onClick={onEnter} autoFocus>
        <span>Enter the field</span>
        <ArrowDown aria-hidden="true" />
      </button>
    </motion.section>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Dev Patel, back to top">
        <FieldMark />
        <span>
          DEV PATEL
          <small>FULL-STACK / AI</small>
        </span>
      </a>

      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#profile">Profile</a>
        <a href="#journey">Journey</a>
      </nav>

      <a className="availability" href={`mailto:${PROFILE.email}`}>
        <i aria-hidden="true" /> Available for work
      </a>
    </header>
  );
}

function Hero({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="hero" id="top">
      <div className="hero__orbit" aria-hidden="true">
        <div className="hero__sun" />
        <span className="orbit orbit--one" />
        <span className="orbit orbit--two" />
        <span className="orbit orbit--three" />
      </div>

      <div className="hero__kicker">
        <span>01 / INTRODUCTION</span>
        <span>SCROLL TO DISCOVER</span>
      </div>

      <motion.h1
        initial={{ y: reduceMotion ? 0 : 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1, ease: EASE, delay: 0.1 }}
      >
        <span className="hero__name hero__name--dev">DEV</span>
        <span className="hero__name hero__name--patel">PATEL</span>
      </motion.h1>

      <div className="hero__footer">
        <p>{PROFILE.headline}</p>
        <div className="hero__coordinates">
          <MapPin aria-hidden="true" />
          <span>22.3072 N / 73.1812 E</span>
        </div>
        <a href="#work" className="round-link" aria-label="Explore selected projects">
          <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto">
      <Reveal>
        <p className="section-label">THE OPERATING IDEA</p>
      </Reveal>
      <Reveal>
        <h2>
          I turn <em>curiosity</em> into useful systems, then sweat the details until they feel
          inevitable.
        </h2>
      </Reveal>
      <Reveal>
        <div className="manifesto__meta">
          <span>REACT / TYPESCRIPT / NODE</span>
          <p>
            Full-stack today. AI engineering tomorrow. Always building the bridge by shipping real
            work.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Work({
  openProject,
  setCursorLabel,
  reduceMotion,
}: {
  openProject: (project: Project) => void;
  setCursorLabel: (label: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <section className="work" id="work">
      <div className="section-intro">
        <p className="section-label">02 / SELECTED SYSTEMS</p>
        <h2>Proof over promises.</h2>
        <p>Six self-directed builds across product UI, algorithms, real-time systems, and AI.</p>
      </div>

      <div className="project-list">
        {PROJECTS.map((project, index) => (
          <ProjectChapter
            key={project.id}
            project={project}
            index={index}
            openProject={openProject}
            setCursorLabel={setCursorLabel}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectChapter({
  project,
  index,
  openProject,
  setCursorLabel,
  reduceMotion,
}: {
  project: Project;
  index: number;
  openProject: (project: Project) => void;
  setCursorLabel: (label: string) => void;
  reduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cardRef.current.style.setProperty("--tilt-x", `${y * -2.5}deg`);
    cardRef.current.style.setProperty("--tilt-y", `${x * 3.5}deg`);
  };

  return (
    <motion.article
      className={`project project--${(index % 3) + 1}`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, ease: EASE }}
    >
      <button
        ref={cardRef}
        className="project__button"
        onClick={() => openProject(project)}
        onPointerEnter={() => setCursorLabel("VIEW")}
        onPointerLeave={() => {
          setCursorLabel("");
          cardRef.current?.style.setProperty("--tilt-x", "0deg");
          cardRef.current?.style.setProperty("--tilt-y", "0deg");
        }}
        onPointerMove={onPointerMove}
        aria-label={`Open ${project.name} case study`}
      >
        <div className="project__index">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>

        <div className="project__image-wrap">
          <motion.img
            layoutId={`project-image-${project.id}`}
            src={project.images[0]}
            alt={`${project.name} interface preview`}
            loading={index > 1 ? "lazy" : "eager"}
          />
          <span className="project__stamp">CASE / {String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="project__copy">
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <div className="project__tags">
            {project.stack.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <span className="project__open" aria-hidden="true">
          OPEN STORY <ArrowUpRight />
        </span>
      </button>
    </motion.article>
  );
}

function Profile() {
  return (
    <section className="profile" id="profile">
      <div className="profile__image">
        <img src="/media/dev-photo.jpg" alt="Dev Patel, full-stack developer" loading="lazy" />
        <span className="profile__image-label">THE HUMAN / BEHIND THE SYSTEMS</span>
      </div>

      <div className="profile__content">
        <p className="section-label">03 / PROFILE</p>
        <h2>
          Builder by habit.
          <br />
          Engineer by direction.
        </h2>
        <p className="profile__bio">{PROFILE.bio}</p>

        <div className="profile__facts">
          <div>
            <strong>06</strong>
            <span>SHIPPED PROJECTS</span>
          </div>
          <div>
            <strong>2027</strong>
            <span>GRADUATION</span>
          </div>
          <div>
            <strong>&lt;24H</strong>
            <span>REPLY RHYTHM</span>
          </div>
        </div>

        <div className="profile__status">
          <span>NOW</span>
          <p>{PROFILE.status}</p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__heading">
        <p className="section-label">04 / CAPABILITY FIELD</p>
        <h2>Tools with mileage.</h2>
        <p>Grouped honestly by confidence, not padded for keyword count.</p>
      </div>

      <div className="skill-rows">
        {SKILL_GROUPS.map((group, index) => (
          <div className="skill-row" key={group.title}>
            <div className="skill-row__meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{group.title}</p>
            </div>
            <div className="skill-row__track">
              <div className="skill-row__items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="journey__header">
        <p className="section-label">05 / TRAJECTORY</p>
        <h2>The route so far.</h2>
      </div>

      <div className="timeline">
        {CAREER_TIMELINE.map((item, index) => (
          <motion.article
            key={item.period}
            className="timeline__item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
          >
            <span className="timeline__number">{String(index + 1).padStart(2, "0")}</span>
            <span className="timeline__period">{item.period}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  const visualCredentials = CERTIFICATIONS.filter((credential) => "image" in credential);
  const compactCredentials = CERTIFICATIONS.filter((credential) => !("image" in credential));

  return (
    <section className="credentials" id="credentials">
      <div className="credentials__header">
        <p className="section-label">06 / SIGNALS OF PROGRESS</p>
        <h2>Learning in public.</h2>
      </div>

      <div className="credential-grid">
        {visualCredentials.map((credential, index) => {
          const card = (
            <>
              <div className="credential-card__image">
                <img
                  src={credential.image}
                  alt={`${credential.title} certificate`}
                  loading="lazy"
                />
              </div>
              <span>
                {String(index + 1).padStart(2, "0")} / {credential.date}
              </span>
              <h3>{credential.title}</h3>
              <p>{credential.issuer}</p>
            </>
          );

          return "verify" in credential ? (
            <a
              className="credential-card"
              href={credential.verify}
              target="_blank"
              rel="noreferrer"
              key={credential.title}
            >
              {card}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : (
            <article className="credential-card" key={credential.title}>
              {card}
            </article>
          );
        })}
      </div>

      <div className="credential-notes">
        <div>
          <span>ALSO ON RECORD</span>
          <p>{compactCredentials.map((item) => item.title).join(" / ")}</p>
        </div>
        <div>
          <span>NEXT IN LINE</span>
          <p>{IN_PROGRESS_CERTS.join(" / ")}</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact__orbit" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="contact__top">
        <p className="section-label">07 / OPEN CHANNEL</p>
        <span>{PROFILE.replyTime}</span>
      </div>

      <h2>
        LET&apos;S BUILD
        <br />
        <em>THE NEXT THING.</em>
      </h2>

      <a className="contact__email" href={`mailto:${PROFILE.email}`}>
        <span>{PROFILE.email}</span>
        <ArrowUpRight aria-hidden="true" />
      </a>

      <div className="contact__footer">
        <div className="contact__links">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" /> GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" /> LinkedIn
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noreferrer">
            <Download aria-hidden="true" /> Resume
          </a>
        </div>
        <p>
          {PROFILE.location}
          <br />
          {PROFILE.timezone}
        </p>
        <a href="#top">
          BACK TO ORBIT <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

function ProjectStory({
  project,
  imageIndex,
  setImageIndex,
  onClose,
  reduceMotion,
}: {
  project: Project;
  imageIndex: number;
  setImageIndex: (index: number) => void;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const next = () => setImageIndex((imageIndex + 1) % project.images.length);
  const previous = () =>
    setImageIndex((imageIndex - 1 + project.images.length) % project.images.length);

  useEffect(() => {
    const resetScroll = () => {
      if (overlayRef.current) overlayRef.current.scrollTop = 0;
    };

    resetScroll();
    closeRef.current?.focus({ preventScroll: true });
    const frame = window.requestAnimationFrame(resetScroll);
    const settleTimer = window.setTimeout(resetScroll, reduceMotion ? 0 : 750);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
    };
  }, [project.id, reduceMotion]);

  return (
    <motion.div
      ref={overlayRef}
      className="story-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} project story`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.article
        className="story"
        initial={{ y: reduceMotion ? 0 : "100%" }}
        animate={{ y: 0 }}
        exit={{ y: reduceMotion ? 0 : "100%" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
      >
        <header className="story__header">
          <div>
            <FieldMark />
            <span>PROJECT STORY / {project.year}</span>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close project story">
            CLOSE <X aria-hidden="true" />
          </button>
        </header>

        <div className="story__title">
          <span>SELECTED SYSTEM / {project.id.toUpperCase()}</span>
          <h2>{project.name}</h2>
        </div>

        <div className="story__visual">
          <AnimatePresence mode="wait">
            <motion.img
              key={project.images[imageIndex]}
              layoutId={imageIndex === 0 ? `project-image-${project.id}` : undefined}
              src={project.images[imageIndex]}
              alt={`${project.name} screen ${imageIndex + 1} of ${project.images.length}`}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
            />
          </AnimatePresence>
          <div className="story__controls">
            <button onClick={previous} aria-label="Previous screenshot">
              <ArrowLeft aria-hidden="true" />
            </button>
            <span>
              {String(imageIndex + 1).padStart(2, "0")} /{" "}
              {String(project.images.length).padStart(2, "0")}
            </span>
            <button onClick={next} aria-label="Next screenshot">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="story__body">
          <p className="story__summary">{project.summary}</p>
          <div>
            <span className="story__label">WHY IT MATTERS</span>
            <p>{project.highlight}</p>
          </div>
          <div>
            <span className="story__label">BUILT WITH</span>
            <div className="story__tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <a href={project.repo} target="_blank" rel="noreferrer" className="story__repo">
            <Github aria-hidden="true" /> VIEW SOURCE <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CursorHalo({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={ref} className="cursor-halo" data-active={Boolean(label)} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

function FieldMark() {
  return (
    <svg className="field-mark" viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="20" />
      <path d="M9 34 38 10M18 43l25-21" />
      <circle cx="39" cy="12" r="3" className="field-mark__dot" />
    </svg>
  );
}
