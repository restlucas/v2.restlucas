"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MASCOT_KINDS, MASCOTS, spriteRects, type MascotKind } from "./mascots";

export type MascotChoice = MascotKind | "off";

const CHOICES: MascotChoice[] = [...MASCOT_KINDS, "off"];
const STORAGE_KEY = "mascot";
const CHANGE_EVENT = "mascotchange";

function readChoice(): MascotChoice {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as MascotChoice | null;
    if (saved && CHOICES.includes(saved)) return saved;
  } catch {
    // ignore
  }
  return "cat";
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Saved mascot choice. Null on the server and during hydration, so nothing flashes.
export function useMascotChoice() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => null);

  const cycle = () => {
    const current = choice ?? readChoice();
    const next = CHOICES[(CHOICES.indexOf(current) + 1) % CHOICES.length];
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return [choice, cycle] as const;
}

export function SpriteSvg({ rows, eyesClosed = false, cell }: { rows: string[]; eyesClosed?: boolean; cell: number }) {
  return (
    <svg
      viewBox={`0 0 16 ${rows.length}`}
      width={16 * cell}
      height={rows.length * cell}
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
      className="block"
    >
      {spriteRects(rows, eyesClosed).map(({ x, y, w }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={1} />
      ))}
    </svg>
  );
}

const CELL = 3; // screen pixels per sprite cell
const SIZE = 16 * CELL;
const EDGE = 16; // keeps the mascot off the screen edges
const STOP_MS = 300; // no scroll for this long means it stopped walking
const SLEEP_MS = 10_000;

type Mode = "walk" | "rest" | "sleep";

// Walks along the status bar following the reading progress.
export function Mascot({ kind }: { kind: MascotKind }) {
  const sprite = MASCOTS[kind];
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("rest");
  const [dir, setDir] = useState<1 | -1>(1);
  const [step, setStep] = useState(0);
  const [blink, setBlink] = useState(false);
  const [hops, setHops] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastY = window.scrollY;
    let atEnd = false;
    let stopTimer = 0;
    let sleepTimer = 0;

    const place = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const track = window.innerWidth - SIZE - EDGE * 2;
      el.style.transform = `translateX(${Math.round(EDGE + progress * track)}px)`;
      return progress;
    };
    const sleepLater = () => {
      window.clearTimeout(sleepTimer);
      sleepTimer = window.setTimeout(() => setMode("sleep"), SLEEP_MS);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (y === lastY) return;
      setDir(y > lastY ? 1 : -1);
      lastY = y;
      setMode("walk");
      const progress = place();
      window.clearTimeout(sleepTimer);
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => {
        setMode("rest");
        sleepLater();
      }, STOP_MS);
      // Celebrates once on reaching the end of the page.
      const end = progress > 0.995;
      if (end && !atEnd) setHops((h) => h + 1);
      atEnd = end;
    };

    // First placement skips the slide, so a newly picked mascot appears in place.
    el.style.transition = "none";
    place();
    void el.offsetWidth;
    el.style.transition = "";
    sleepLater();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.clearTimeout(stopTimer);
      window.clearTimeout(sleepTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", place);
    };
  }, []);

  // Walk cycle and idle blinking. Skipped entirely for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (mode === "walk") {
      const id = window.setInterval(() => setStep((s) => s ^ 1), 160);
      return () => window.clearInterval(id);
    }
    if (mode === "rest") {
      let off = 0;
      const id = window.setInterval(() => {
        setBlink(true);
        off = window.setTimeout(() => setBlink(false), 140);
      }, 3200);
      return () => {
        window.clearInterval(id);
        window.clearTimeout(off);
      };
    }
  }, [mode]);

  const walking = mode === "walk";
  const rows = walking ? sprite.walk[step] : sprite.rest;
  const lift = walking && step ? (kind === "cursor" ? 2 : 1) * CELL : 0;

  return (
    <div ref={ref} className={`mascot mascot-${kind}`} data-mode={mode} aria-hidden="true">
      {/* Decorative: clicking only makes it hop. */}
      <div className="mascot-body" onClick={() => setHops((h) => h + 1)}>
        <div key={hops} className={hops ? "mascot-hop" : undefined}>
          <div style={{ transform: `translateY(${-lift}px) scaleX(${dir})` }}>
            <SpriteSvg rows={rows} eyesClosed={mode === "sleep" || blink} cell={CELL} />
          </div>
        </div>
        {mode === "sleep" && (
          <span className="mascot-zzz">
            <span>z</span>
            <span>z</span>
            <span>z</span>
          </span>
        )}
      </div>
    </div>
  );
}
