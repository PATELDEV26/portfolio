import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Intro } from "@/components/paper/Intro";
import { Masthead } from "@/components/paper/Masthead";
import { FrontPage } from "@/components/paper/FrontPage";
import { EvidenceBoard } from "@/components/paper/EvidenceBoard";
import { Works } from "@/components/paper/Works";
import { LabReport } from "@/components/paper/LabReport";
import { Credentials } from "@/components/paper/Credentials";
import { Ledger } from "@/components/paper/Ledger";
import { Contact } from "@/components/paper/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dev Patel — Full-Stack Developer | Vadodara" },
      {
        name: "description",
        content:
          "The case file on Dev Patel: final-year CSE student at Parul University, Vadodara, building full-stack web apps with React, TypeScript, Node and Postgres.",
      },
      { property: "og:title", content: "Dev Patel — The Investigation Desk" },
      {
        property: "og:description",
        content:
          "A newspaper-style case file on Dev Patel — selected works, stack findings, career ledger and how to reach the desk.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Paper() {
  return (
    <div className="paper-grain relative min-h-screen">
      <Masthead />
      <main>
        <FrontPage />
        <EvidenceBoard />
        <Works />
        <LabReport />
        <Credentials />
        <Ledger />
        <Contact />
      </main>
    </div>
  );
}

function Home() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dp-intro-seen") === "1") setIntroDone(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  return (
    <>
      <Paper />
      <ClientOnly>
        {!introDone && (
          <Intro
            onDone={() => {
              sessionStorage.setItem("dp-intro-seen", "1");
              setIntroDone(true);
            }}
          />
        )}
      </ClientOnly>
    </>
  );
}
