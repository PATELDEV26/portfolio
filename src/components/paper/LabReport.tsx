import { SUBSTANCES } from "@/content/dossier";
import { SectionHead } from "./SectionHead";

export function LabReport() {
  return (
    <section id="stack" className="border-b border-ink bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHead
          kicker="Forensics"
          title={["The", "Lab Report"]}
          sub="What he reaches for when building — not a ranking, just the tools on the desk."
        />

        {/* Mobile: stacked rows. Desktop: table. */}
        <ul className="mt-8 divide-y divide-rule border border-ink md:hidden">
          {SUBSTANCES.map((s) => (
            <li key={s.code} className="bg-paper px-4 py-3.5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-base font-bold">{s.name}</p>
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] ${
                    s.finding === "Primary tool" ? "text-stamp" : "text-ink-soft"
                  }`}
                >
                  {s.finding}
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                {s.code} · {s.detected}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 hidden overflow-x-auto border border-ink md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-ink text-paper">
                {["Substance", "Code", "Detected", "Finding"].map((h) => (
                  <th key={h} className="px-4 py-3 label-kicker font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBSTANCES.map((s, i) => (
                <tr key={s.code} className={`border-t border-rule ${i % 2 ? "bg-paper/40" : ""}`}>
                  <td className="px-4 py-3 font-display text-base font-bold">{s.name}</td>
                  <td className="px-4 py-3 font-mono text-[11px] tracking-[0.16em] text-ink-soft">
                    {s.code}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    {s.detected}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                        s.finding === "Primary tool" ? "text-stamp" : "text-ink-soft"
                      }`}
                    >
                      {s.finding}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-ink-soft">Day-to-day tools — not a scoreboard.</p>
      </div>
    </section>
  );
}
