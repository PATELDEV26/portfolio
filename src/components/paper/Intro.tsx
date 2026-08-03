import { useCallback, useEffect, useRef, useState } from "react";
import { SUBJECT } from "@/content/dossier";

/** Fake newsprint columns used as the "case wall" the reader searches. */
function Newsprint({ sharp }: { sharp?: boolean }) {
  const cols = 6;
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid gap-6 px-6 py-8 sm:gap-10 sm:px-12"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {Array.from({ length: cols }).map((_, c) => (
        <div key={c} className="space-y-[7px]">
          {Array.from({ length: 78 }).map((_, r) => {
            const isHead = (r + c * 3) % 17 === 0;
            const w = isHead ? 62 + ((r * 13) % 30) : 55 + ((r * 29 + c * 7) % 45);
            return (
              <div
                key={r}
                style={{ width: `${w}%` }}
                className={
                  isHead
                    ? "h-[7px] bg-ink/75"
                    : sharp
                      ? "h-[3px] bg-ink/35"
                      : "h-[3px] bg-ink/25"
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return coarse;
}

export function Intro({ onDone }: { onDone: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [found, setFound] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const coarse = useIsCoarsePointer();

  const finish = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onDone, 700);
  }, [leaving, onDone]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: r.width * 0.5, y: r.height * 0.42 });
    setReady(true);
  }, []);

  // Touch devices: show the poster immediately — no drag-the-glass ritual.
  useEffect(() => {
    if (coarse) setFound(true);
  }, [coarse]);

  const move = useCallback(
    (clientX: number, clientY: number) => {
      if (coarse) return;
      const el = wrapRef.current;
      const poster = posterRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      setPos({ x, y });
      if (poster && !found) {
        const p = poster.getBoundingClientRect();
        const inside =
          clientX > p.left - 40 &&
          clientX < p.right + 40 &&
          clientY > p.top - 40 &&
          clientY < p.bottom + 40;
        if (inside) setFound(true);
      }
    },
    [found, coarse],
  );

  useEffect(() => {
    if (!found || coarse) return;
    const t = window.setTimeout(finish, 1200);
    return () => window.clearTimeout(t);
  }, [found, finish, coarse]);

  const R = found ? 190 : 105;

  return (
    <div
      ref={wrapRef}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onClick={() => {
        if (coarse || found) finish();
      }}
      className={`fixed inset-0 z-50 overflow-hidden bg-paper-deep paper-grain select-none ${
        coarse ? "cursor-pointer" : "cursor-none"
      } ${leaving ? "curtain-up" : ""}`}
    >
      <div className="absolute inset-0 opacity-70 blur-[2px]">
        <Newsprint />
      </div>

      <div
        className="absolute inset-0"
        style={{
          clipPath: coarse
            ? "none"
            : ready
              ? `circle(${R}px at ${pos.x}px ${pos.y}px)`
              : "circle(0px at 50% 50%)",
          transition: coarse ? undefined : "clip-path 120ms linear",
        }}
      >
        <div className="absolute inset-0 bg-paper" />
        <Newsprint sharp />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <WantedPoster ref={posterRef} found={found} />
        </div>
      </div>

      {!coarse && ready && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: pos.x - R,
            top: pos.y - R,
            width: R * 2,
            height: R * 2,
            border: "10px solid var(--ink)",
            boxShadow:
              "0 0 0 2px color-mix(in oklab, var(--ink) 30%, transparent), 0 24px 50px -12px color-mix(in oklab, var(--ink) 55%, transparent), inset 0 0 40px color-mix(in oklab, var(--ink) 10%, transparent)",
            transition: "width 300ms ease, height 300ms ease, left 120ms linear, top 120ms linear",
          }}
        />
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 min-h-11 cursor-pointer border border-ink bg-paper px-4 py-2.5 label-kicker hover:bg-ink hover:text-paper"
      >
        Skip →
      </button>

      <p className="pointer-events-none absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] px-4 text-center label-kicker text-ink-soft">
        {coarse
          ? "Tap anywhere to open the file"
          : found
            ? "Subject identified — opening the file"
            : "Move the glass — find the subject"}
      </p>
    </div>
  );
}

const WantedPoster = ({
  ref,
  found,
}: {
  ref: React.Ref<HTMLDivElement>;
  found: boolean;
}) => (
  <div
    ref={ref}
    className={`w-56 max-w-full border-2 border-ink bg-paper px-4 py-4 text-center transition-transform duration-500 ${
      found ? "scale-105" : ""
    }`}
  >
    <p className="label-kicker">Wanted</p>
    <div className="my-2 h-px bg-ink/40" />
    <p className="font-display text-2xl font-black leading-none">{SUBJECT.name}</p>
    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
      for building things
    </p>
    <p className="mt-3 font-mono text-[10px] text-ink-soft">Case No. {SUBJECT.caseNo}</p>
  </div>
);
