"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

const GLYPHS = "!<>-_\\/[]{}=+*^?#░▒▓";

// Decodes the text from random glyphs when it scrolls into view (and again when it changes).
export function Scramble({ text, className }: { text: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [frameText, setFrameText] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const total = text.length * 2 + 8;
    const id = window.setInterval(() => {
      frame++;
      if (frame >= total) {
        window.clearInterval(id);
        setFrameText(null);
        return;
      }
      const revealed = Math.floor((frame / total) * text.length);
      setFrameText(
        text
          .split("")
          .map((ch, i) => (i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
    }, 28);
    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{frameText ?? text}</span>
    </span>
  );
}
