import { useState } from "react";
import { SUBJECT } from "@/content/dossier";
import { SectionHead } from "./SectionHead";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHead
          kicker="Submit a Tip"
          title={["Letters", "&Commissions"]}
          sub="The desk is open for internships & select freelance work — 2026"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="border border-ink bg-paper p-6 sm:p-8"
          >
            <h3 className="font-display text-2xl font-black">Put it in writing</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              A project in mind, a role to fill, or just a good question — send it through and he'll
              get back to you.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <div className="mt-4">
              <Field label="Subject" name="subject" />
            </div>
            <div className="mt-4">
              <label className="label-kicker text-ink-soft" htmlFor="story">
                The story
              </label>
              <textarea
                id="story"
                name="story"
                rows={5}
                required
                className="mt-2 w-full border border-ink bg-paper px-3 py-3 font-body text-base outline-none focus:border-stamp sm:text-sm"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                {sent ? "Filed — thanks for the tip." : "Usually replies within 24 hours"}
              </p>
              <button
                type="submit"
                className="min-h-12 w-full border border-ink bg-ink px-5 py-3 label-kicker text-paper transition-colors hover:border-stamp hover:bg-stamp sm:w-auto"
              >
                {sent ? "Sent ✓" : "Send the letter"}
              </button>
            </div>
          </form>

          <aside className="space-y-6">
            <Block title="Direct line">
              <a
                href={`mailto:${SUBJECT.email}`}
                className="font-display text-lg font-bold underline decoration-stamp underline-offset-4"
              >
                {SUBJECT.email}
              </a>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                For internships, freelance builds, and the occasional good argument about CSS.
              </p>
            </Block>

            <Block title="The Desk">
              <p className="font-display text-lg font-bold">{SUBJECT.location}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                IST — happy to work with teams anywhere, remote-first.
              </p>
            </Block>

            <Block title="On file">
              <div className="flex flex-wrap gap-3">
                <a
                  href={SUBJECT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-ink px-3 py-2 label-kicker transition-colors hover:bg-ink hover:text-paper"
                >
                  GitHub
                </a>
                <a
                  href={SUBJECT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-ink px-3 py-2 label-kicker transition-colors hover:bg-ink hover:text-paper"
                >
                  LinkedIn
                </a>
                <a
                  href={SUBJECT.resume}
                  download="Dev_Patel_Resume_AI_Engineer.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-ink bg-ink px-3 py-2 label-kicker text-paper transition-colors hover:bg-stamp hover:border-stamp"
                >
                  Résumé PDF
                </a>
              </div>
            </Block>
          </aside>
        </div>
      </div>

      <footer className="border-t border-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
          <p className="label-kicker text-ink-soft">
            © {new Date().getFullYear()} {SUBJECT.name} · Printed in Vadodara
          </p>
          <p className="label-kicker text-ink-soft">Late Final Edition · No. {SUBJECT.caseNo}</p>
        </div>
      </footer>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t-[3px] border-double border-ink pt-4">
      <p className="label-kicker text-stamp">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="label-kicker text-ink-soft" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border border-ink bg-paper px-3 py-3 font-body text-base outline-none focus:border-stamp sm:py-2 sm:text-sm"
      />
    </div>
  );
}
