import { CREDENTIALS, IN_PROGRESS, SUBJECT } from "@/content/dossier";
import { SectionHead } from "./SectionHead";

const SCANS: Record<string, string> = {
  "Foundations of Prompt Engineering": "/media/cert-aws.jpg",
  "What Is Generative AI?": "/media/cert-linkedin.jpg",
  "Getting Started with Generative AI": "/media/cert-ibm.jpg",
};

export function Credentials() {
  return (
    <section id="credentials" className="border-b border-ink bg-paper-deep/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHead
          kicker="Papers in the file"
          title={["Certified", "Documents"]}
          sub="Filed credentials, scanned and attached to the case"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CREDENTIALS.filter((c) => SCANS[c.title]).map((c) => (
            <figure key={c.title} className="border border-ink bg-card p-3">
              <div className="overflow-hidden border border-rule bg-paper">
                <img
                  src={SCANS[c.title]}
                  alt={`${c.title} certificate issued to Dev Patel by ${c.issuer}`}
                  width={1650}
                  height={1275}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3">
                <p className="label-kicker text-stamp">{c.date}</p>
                <h3 className="mt-1 font-display text-lg font-black leading-tight">{c.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {c.issuer}
                </p>
                <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{c.detail}</p>
                {c.verify && (
                  <a
                    href={c.verify}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.14em] underline underline-offset-4 hover:text-stamp"
                  >
                    Verify credential →
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-rule pt-8 md:grid-cols-2">
          <div>
            <p className="label-kicker text-ink-soft">Also on file</p>
            <ul className="mt-3 space-y-2">
              {CREDENTIALS.filter((c) => !SCANS[c.title]).map((c) => (
                <li key={c.title} className="text-[13px] leading-[1.7]">
                  <span className="font-display font-bold">{c.title}</span>{" "}
                  <span className="italic text-ink-soft">
                    · {c.issuer}, {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-kicker text-ink-soft">Pending investigation</p>
            <p className="mt-3 text-[13px] leading-[1.7] text-ink-soft">
              Coursework currently in progress: {IN_PROGRESS.join(", ")}.
            </p>
            <a
              href={SUBJECT.resume}
              download="Dev_Patel_Resume_MS_Admissions_Updated.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-block border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-stamp"
            >
              Download the full dossier (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
