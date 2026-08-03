import { SUBJECT, WEATHER } from "@/content/dossier";

export function FrontPage() {
  return (
    <section id="top" className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
          <p className="label-kicker">
            Front Page <span className="hidden text-ink-soft sm:inline">· Open file</span>
          </p>
          <p className="label-kicker text-stamp">Case No. {SUBJECT.caseNo}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-10">
          <div className="min-w-0">
            <p className="font-display text-4xl font-black tracking-tight sm:text-5xl">
              {SUBJECT.name}
            </p>
            <p className="mt-2 text-sm text-ink-soft sm:text-base">{SUBJECT.role}</p>

            <h1 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-ink-soft sm:mt-6 sm:text-2xl">
              Builds full-stack apps — and is learning to put AI into them.
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-lg">
              Final-year CSE at Parul University, Vadodara. Ships side projects that outlive the
              semester, freelances for local shops, and runs the campus coding club.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#work"
                className="inline-flex min-h-12 items-center justify-center border border-ink bg-ink px-5 py-3 label-kicker text-paper transition-colors hover:border-stamp hover:bg-stamp"
              >
                See the work
              </a>
              <a
                href={SUBJECT.resume}
                download="Dev_Patel_Resume_AI_Engineer.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-12 items-center justify-center border border-ink px-5 py-3 label-kicker transition-colors hover:bg-ink hover:text-paper"
              >
                Download résumé
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center border border-ink px-5 py-3 label-kicker transition-colors hover:bg-ink hover:text-paper min-[400px]:col-span-2 sm:col-span-1"
              >
                Get in touch
              </a>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule sm:mt-10 sm:grid-cols-4">
              {WEATHER.map((w) => (
                <div key={w.k} className="bg-paper px-3 py-3.5 sm:py-4">
                  <dt className="font-display text-base font-black leading-none sm:text-lg">{w.k}</dt>
                  <dd className="mt-2 text-[11px] leading-snug text-ink-soft sm:text-xs">{w.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="min-w-0">
            <figure className="border border-ink bg-card p-2 sm:p-3">
              <img
                src="/media/dev-photo.jpg"
                width={1080}
                height={1350}
                alt={`${SUBJECT.name}`}
                className="aspect-[4/5] w-full object-cover object-[center_12%] sm:aspect-auto sm:max-h-[28rem]"
              />
              <figcaption className="mt-3 border-t border-rule pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                {SUBJECT.name} · Class of 2027 · Vadodara
              </figcaption>
            </figure>

            <div className="mt-6 border-t-[3px] border-double border-ink pt-5 text-[14px] leading-[1.75] text-ink-soft sm:col-2 sm:text-[13px]">
              <p className="dropcap text-ink">
                He likes the whole arc — a rough idea on a whiteboard turned into something people
                actually open on a Tuesday. React and TypeScript up front, Node and Postgres
                underneath.
              </p>
              <p className="mt-3">
                When a build needs it he reaches for Python and a bit of Docker. Outside class he
                freelances for shops and clinics around Vadodara.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
