import { LEDGER } from "@/content/dossier";
import { SectionHead } from "./SectionHead";

export function Ledger() {
  return (
    <section id="ledger" className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHead
          kicker="Known Whereabouts"
          title={["The", "Career Ledger"]}
          sub="Movements on record since 2023"
        />

        <ol className="mt-12 border-l border-ink pl-6 sm:pl-10">
          {LEDGER.map((e) => (
            <li key={e.period} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-paper sm:-left-[47px]" />
              <p className="label-kicker text-stamp">{e.period}</p>
              <h3 className="mt-2 font-display text-xl font-black sm:text-2xl">
                {e.role} <span className="font-normal italic text-ink-soft">· {e.org}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-[13px] leading-[1.8] text-ink-soft">{e.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
