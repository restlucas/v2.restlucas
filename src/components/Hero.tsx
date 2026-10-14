"use client";

import { contactLinks } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useState } from "react";
import { Rich } from "./Rich";

const BANNER = [
  "██      ██    ██  ██████  █████  ███████",
  "██      ██    ██ ██      ██   ██ ██     ",
  "██      ██    ██ ██      ███████ ███████",
  "██      ██    ██ ██      ██   ██      ██",
  "███████  ██████   ██████ ██   ██ ███████",
  "",
  "███████  ██████  ██    ██ ███████  █████ ",
  "██      ██    ██ ██    ██    ███  ██   ██",
  "███████ ██    ██ ██    ██   ███   ███████",
  "     ██ ██    ██ ██    ██  ███    ██   ██",
  "███████  ██████   ██████  ███████ ██   ██",
];

const BANNER_WIDTH = Math.max(...BANNER.map((l) => l.length));

// Each block character becomes a 1x2 cell; consecutive blocks merge into one rect.
function runs(line: string): [number, number][] {
  const out: [number, number][] = [];
  let start = -1;
  for (let i = 0; i <= line.length; i++) {
    const filled = line[i] === "█";
    if (filled && start < 0) start = i;
    if (!filled && start >= 0) {
      out.push([start, i - start]);
      start = -1;
    }
  }
  return out;
}

const COMMAND = "./whoami";

export function Hero() {
  const { t } = useLanguage();
  const [typed, setTyped] = useState(0);

  // Types the command, then the banner and content fade in.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      setTyped((n) => {
        const next = reduced ? COMMAND.length : Math.min(n + 1, COMMAND.length);
        if (next >= COMMAND.length) window.clearInterval(id);
        return next;
      });
    }, reduced ? 0 : 70);
    return () => window.clearInterval(id);
  }, []);

  const done = typed >= COMMAND.length;

  return (
    <section id="intro" data-section="intro" className="flex min-h-[calc(100svh-2.5rem)] flex-col justify-center pb-16 pt-10">
      <p className="mb-6 text-[0.82rem] text-dim">
        <span className="text-accent">lucas@restlucas</span> ~ % {COMMAND.slice(0, typed)}
        <span className="cursor" aria-hidden="true" />
      </p>

      <h1 className="sr-only">Lucas Souza de Oliveira, {t.hero.role}</h1>

      <div className={`boot ${done ? "is-on" : ""}`}>
        <svg
          className="banner"
          viewBox={`0 0 ${BANNER_WIDTH} ${BANNER.length * 2}`}
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {BANNER.map((line, y) => (
            <g key={y} className="banner-line" style={{ animationDelay: `${y * 45}ms` }}>
              {runs(line).map(([x, w]) => (
                <rect key={x} x={x} y={y * 2} width={w} height={2} />
              ))}
            </g>
          ))}
        </svg>

        <p className="mt-8">
          <span className="chip">{t.hero.role}</span>
        </p>

        <p className="mt-6 text-[1.05rem] font-medium leading-relaxed text-ink">
          <Rich text={t.hero.lead} />
        </p>
        <p className="mt-4 leading-relaxed text-dim">
          <Rich text={t.hero.soft} />
        </p>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-dim">
          <Rich text={t.hero.availability} />
        </p>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem]" aria-label="links">
          <a className="link" href={contactLinks.email}>
            {t.hero.links.email}
          </a>
          <a className="link" href={contactLinks.linkedin} target="_blank" rel="noreferrer">
            {t.hero.links.linkedin}
          </a>
          <a className="link" href={contactLinks.github} target="_blank" rel="noreferrer">
            {t.hero.links.github}
          </a>
          <a className="link" href={t.meta.resumeFile} target="_blank" rel="noreferrer">
            {t.hero.links.resume} ↗
          </a>
        </nav>
      </div>
    </section>
  );
}
