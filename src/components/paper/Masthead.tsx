import { useEffect, useState } from "react";

import { NAV, SUBJECT } from "@/content/dossier";

function useDeskClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function Masthead() {
  const now = useDeskClock();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-paper/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <a href="#top" className="min-w-0" onClick={closeMenu}>
          <span className="block truncate font-display text-xl font-black tracking-tight sm:text-2xl">
            {SUBJECT.name}
          </span>
          <span className="hidden label-kicker text-ink-soft sm:block">
            {SUBJECT.location} · {now ? `${now} IST` : `${new Date().getFullYear()} Edition`}
          </span>
        </a>

        <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ul className="hidden items-center gap-5 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="label-kicker text-ink-soft transition-colors hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SUBJECT.resume}
            download="Dev_Patel_Resume_AI_Engineer.pdf"
            className="hidden border border-ink px-3 py-2.5 label-kicker transition-colors hover:bg-ink hover:text-paper lg:inline-block"
          >
            Résumé
          </a>
          <a
            href="#contact"
            className="hidden border border-ink bg-ink px-3 py-2.5 label-kicker text-paper transition-colors hover:border-stamp hover:bg-stamp sm:inline-block"
          >
            Hire him
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center border border-ink md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-full bg-ink transition-transform ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-0.5 w-full bg-ink transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] block h-0.5 w-full bg-ink transition-transform ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      {menuOpen ? (
        <div id="mobile-nav" className="border-t border-ink bg-paper md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {NAV.map((n) => (
              <li key={n.href} className="border-b border-rule last:border-0">
                <a
                  href={n.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center font-display text-lg font-bold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 border-t border-rule px-4 py-4 sm:px-6">
            <a
              href={SUBJECT.resume}
              download="Dev_Patel_Resume_AI_Engineer.pdf"
              onClick={closeMenu}
              className="flex min-h-11 flex-1 items-center justify-center border border-ink px-3 label-kicker"
            >
              Résumé
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="flex min-h-11 flex-1 items-center justify-center border border-ink bg-ink px-3 label-kicker text-paper"
            >
              Hire him
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
