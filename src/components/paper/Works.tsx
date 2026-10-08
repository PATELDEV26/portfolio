import { useState } from "react";
import { EXHIBITS, type Exhibit } from "@/content/dossier";
import { SectionHead } from "./SectionHead";

function ExhibitGallery({ exhibit, priority }: { exhibit: Exhibit; priority?: boolean }) {
  const [active, setActive] = useState(0);
  const shots = exhibit.images;
  const current = shots[active] ?? shots[0];

  return (
    <figure className="min-w-0">
      <div className="border border-ink bg-card p-1.5 sm:p-2">
        <img
          key={current}
          src={current}
          alt={`${exhibit.title} — screenshot ${active + 1}`}
          width={1440}
          height={900}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[16/10] w-full bg-paper-deep object-cover object-top sm:aspect-[16/9]"
        />
      </div>

      {shots.length > 1 ? (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-pressed={i === active}
              className={`relative h-14 w-20 shrink-0 overflow-hidden border sm:h-16 sm:w-24 ${
                i === active ? "border-ink" : "border-rule opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                width={192}
                height={108}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      ) : null}

      <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
        <span>
          Fig. {exhibit.letter} · {exhibit.period}
          {shots.length > 1 ? ` · ${active + 1}/${shots.length}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}

export function Works() {
  return (
    <section id="work" className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHead
          kicker="The Evidence"
          title={["Selected", "Works"]}
          sub="Six projects built end to end — real screenshots, source linked."
        />

        <div className="mt-10 space-y-0 border-t border-ink sm:mt-12">
          {EXHIBITS.map((ex, i) => (
            <article
              key={ex.id}
              id={`exhibit-${ex.id}`}
              className="scroll-mt-28 border-b border-ink py-8 sm:py-12"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
                <ExhibitGallery exhibit={ex} priority={i < 2} />

                <div className="flex min-w-0 flex-col">
                  <p className="label-kicker text-stamp">Exhibit {ex.letter}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    {ex.kicker}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">
                    {ex.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-[14px] sm:leading-[1.8]">
                    {ex.body}
                  </p>
                  <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-ink-soft/90 italic">
                    {ex.classified.replace(/^Internal note:\s*/i, "")}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ex.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-rule px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2 sm:mt-auto sm:flex-row sm:flex-wrap sm:items-center sm:pt-6">
                    {ex.live ? (
                      <a
                        href={ex.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-4 py-2.5 label-kicker text-paper transition-colors hover:border-stamp hover:bg-stamp"
                      >
                        Open live demo
                      </a>
                    ) : null}
                    <a
                      href={ex.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 items-center justify-center border border-ink px-4 py-2.5 label-kicker transition-colors hover:bg-ink hover:text-paper"
                    >
                      {ex.live ? "View source" : "View on GitHub"}
                    </a>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft sm:ml-auto">
                      {String(i + 1).padStart(2, "0")} / {String(EXHIBITS.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-[10px] leading-relaxed text-ink-soft">
                    {ex.source}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
