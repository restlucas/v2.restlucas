"use client";

import type { SectionId } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Scramble } from "./Scramble";
import { useInView } from "./useInView";

export function Section({ id, children }: { id: SectionId; children: React.ReactNode }) {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id={id}
      data-section={id}
      ref={ref}
      className={`reveal scroll-mt-10 py-16 sm:py-20 ${inView ? "is-visible" : ""}`}
    >
      <h2 className="mb-8 text-[0.82rem] tracking-wide text-accent">
        <span className="text-dim">$ </span>
        <Scramble text={t.commands[id]} />
      </h2>
      {children}
    </section>
  );
}
