"use client";

import { locales, sectionIds, type SectionId } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useRef, useState } from "react";

const ACCENTS = ["#8AAEE8", "#7EE0A1", "#F2C46D", "#C3A6FF", "#FF8FA3"];
const ACCENT_KEY = "accent";

function applyAccent(color: string) {
  document.documentElement.style.setProperty("--ac", color);
}

export function StatusBar() {
  const { t, locale, setLocale } = useLanguage();
  const [active, setActive] = useState<SectionId>("intro");
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");
  const accentIndex = useRef(0);

  // Restore saved accent.
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(ACCENT_KEY));
      if (Number.isInteger(saved) && saved > 0 && saved < ACCENTS.length) {
        accentIndex.current = saved;
        applyAccent(ACCENTS[saved]);
      }
    } catch {
      // ignore
    }
  }, []);

  // Track the section closest to the top of the viewport.
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.querySelector<HTMLElement>(`[data-section="${id}"]`))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.getAttribute("data-section") as SectionId);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    const raf = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Local time in Brazil, so remote teams can see the time zone at a glance.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const tick = () => setTime(fmt.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const cycleAccent = () => {
    const next = (accentIndex.current + 1) % ACCENTS.length;
    accentIndex.current = next;
    applyAccent(ACCENTS[next]);
    try {
      localStorage.setItem(ACCENT_KEY, String(next));
    } catch {
      // ignore
    }
  };

  const filled = Math.round(progress / 10);

  return (
    <div className="statusbar">
      <div className="flex min-w-0 items-center gap-3">
        <span className="hidden text-dim sm:inline">[lucas@restlucas]</span>
        <a href={`#${active}`} className="truncate font-medium text-ink">
          ▸ {t.sections[active]}
        </a>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="lang-toggle" role="group" aria-label={t.statusBar.language}>
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={locale === l ? "is-active" : undefined}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={cycleAccent}
          className="accent-btn"
          aria-label={t.statusBar.theme}
          title={t.statusBar.theme}
        >
          ◐
        </button>

        <span className="hidden text-accent md:inline" aria-hidden="true">
          {"▮".repeat(filled)}
          <span className="text-faint">{"▯".repeat(10 - filled)}</span>
        </span>
        <span className="hidden w-9 text-right text-dim sm:inline">{progress}%</span>
        {time && <span className="hidden text-dim sm:inline">UTC-3 {time}</span>}
      </div>
    </div>
  );
}
