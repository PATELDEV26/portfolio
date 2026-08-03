import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { EXHIBITS, SUBJECT } from "@/content/dossier";
import { useReveal } from "@/hooks/use-reveal";
import { SectionHead } from "./SectionHead";

type Node = {
  id: string;
  label: string;
  title: string;
  note: string;
  /** position in % of the board box */
  x: number;
  y: number;
  tilt: number;
};

const NODES: Node[] = [
  {
    id: EXHIBITS[0].id,
    label: `Exhibit ${EXHIBITS[0].letter}`,
    title: EXHIBITS[0].title,
    note: EXHIBITS[0].kicker,
    x: 8,
    y: 6,
    tilt: -3.5,
  },
  {
    id: EXHIBITS[1].id,
    label: `Exhibit ${EXHIBITS[1].letter}`,
    title: EXHIBITS[1].title,
    note: EXHIBITS[1].kicker,
    x: 66,
    y: 2,
    tilt: 2.6,
  },
  {
    id: EXHIBITS[2].id,
    label: `Exhibit ${EXHIBITS[2].letter}`,
    title: EXHIBITS[2].title,
    note: EXHIBITS[2].kicker,
    x: 2,
    y: 56,
    tilt: 2.2,
  },
  {
    id: EXHIBITS[4].id,
    label: `Exhibit ${EXHIBITS[4].letter}`,
    title: EXHIBITS[4].title,
    note: EXHIBITS[4].kicker,
    x: 70,
    y: 60,
    tilt: -2.4,
  },
];

const LINKS = NODES.map((n) => n.id);

export function EvidenceBoard() {
  const { ref: sectionRef, shown } = useReveal<HTMLDivElement>(0.15);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState<{ id: string; d: string }[]>([]);

  const measure = useCallback(() => {
    const board = boardRef.current;
    const hub = hubRef.current;
    if (!board || !hub) return;
    const b = board.getBoundingClientRect();
    setSize({ w: b.width, h: b.height });

    const hb = hub.getBoundingClientRect();
    const hx = hb.left - b.left + hb.width / 2;
    const hy = hb.top - b.top + hb.height / 2;

    const next: { id: string; d: string }[] = [];
    for (const id of LINKS) {
      const el = nodeRefs.current[id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const nx = r.left - b.left + r.width / 2;
      const ny = r.top - b.top + r.height / 2;
      const mx = (hx + nx) / 2;
      const my = (hy + ny) / 2 + Math.min(46, Math.abs(nx - hx) * 0.14) + 12;
      next.push({ id, d: `M ${hx} ${hy} Q ${mx} ${my} ${nx} ${ny}` });
    }
    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(measure, 350);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, [measure]);

  return (
    <section id="board" className="border-b border-ink bg-card">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHead
          kicker="The Board"
          title={["Connecting", "the dots"]}
          sub="A few projects pinned — tap any card to jump to the full write-up."
        />

        <div
          ref={boardRef}
          className="corkboard relative mt-12 overflow-hidden border border-ink p-4 sm:p-8 md:min-h-[36rem]"
        >
          <svg
            className="pointer-events-none absolute inset-0 hidden md:block"
            width={size.w || undefined}
            height={size.h || undefined}
            viewBox={size.w ? `0 0 ${size.w} ${size.h}` : undefined}
            aria-hidden="true"
          >
            {paths.map((p, i) => (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke="var(--stamp)"
                strokeWidth={1.6}
                strokeLinecap="round"
                className={shown ? "string-draw" : "opacity-0"}
                style={{ animationDelay: `${0.25 + i * 0.16}s` }}
              />
            ))}
          </svg>

          {/* Hub card */}
          <div className="relative z-10 flex justify-center py-4 md:py-28">
            <div
              ref={hubRef}
              className={`pin-card w-[15rem] max-w-full rotate-[-1.5deg] ${shown ? "fade-up" : "opacity-0"}`}
            >
              <img
                src="/media/dev-photo.jpg"
                alt={`${SUBJECT.name}, the subject of the investigation`}
                width={640}
                height={512}
                loading="lazy"
                className="h-32 w-full object-cover object-[center_18%]"
              />
              <p className="mt-2 font-display text-lg font-black leading-tight">{SUBJECT.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                Subject · Case No. {SUBJECT.caseNo}
              </p>
            </div>
          </div>

          {/* Satellite cards */}
          <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 md:mt-0 md:block">
            {NODES.map((n, i) => (
              <a
                key={n.id}
                href={`#exhibit-${n.id}`}
                ref={(el) => {
                  nodeRefs.current[n.id] = el;
                }}
                className={`pin-card group block w-full no-underline md:absolute md:w-[13.5rem] ${shown ? "fade-up" : "md:opacity-0"}`}
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  ["--tilt" as string]: `${n.tilt}deg`,
                  animationDelay: `${0.15 + i * 0.12}s`,
                }}
              >
                <p className="label-kicker text-stamp">{n.label}</p>
                <p className="mt-1 font-display text-base font-black leading-tight">{n.title}</p>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-ink-soft">{n.note}</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-stamp opacity-70 transition-opacity group-hover:opacity-100">
                  See exhibit →
                </p>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          Fig. 1 — Every thread leads back to the same desk.
        </p>
      </div>
    </section>
  );
}
