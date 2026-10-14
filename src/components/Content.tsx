"use client";

import { contactLinks } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/lib/projects";import { Rich } from "./Rich";
import { Section } from "./Section";

export function About() {
  const { t } = useLanguage();
  return (
    <Section id="about">
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-10">
        {/* Rendered at 1/4 and 1/2 of the file size so each 2px dot lands on whole device pixels. */}
        <div
          role="img"
          aria-label={t.about.avatarAlt}
          className="avatar avatar-float w-[131.5px] md:order-last md:w-[263px]"
        />
        <div className="space-y-4 leading-relaxed text-dim">
          {t.about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : undefined}>
              <Rich text={p} />
            </p>
          ))}
        </div>
      </div>
      <dl className="mt-8 space-y-2 text-[0.88rem]">
        {t.about.facts.map((f) => (
          <div key={f.key} className="grid grid-cols-[6.5rem_1fr] gap-4 sm:grid-cols-[7.5rem_1fr]">
            <dt className="text-dim">{f.key}</dt>
            <dd className="text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Stack() {
  const { t } = useLanguage();
  return (
    <Section id="stack">
      <p className="mb-6 text-dim">{t.stack.intro}</p>
      <ul className="tree text-[0.9rem]">
        {t.stack.groups.map((g, i) => (
          <li key={g.label} className="grid gap-1 py-2 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <span className="text-dim">
              <span className="text-faint">{i === t.stack.groups.length - 1 ? "└─ " : "├─ "}</span>
              {g.label}
            </span>
            <span className="flex flex-wrap gap-x-3 gap-y-1 pl-6 sm:pl-0">
              {g.items.map((item) => (
                <span key={item} className="text-ink">
                  {item}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AiWorkflow() {
  const { t } = useLanguage();
  return (
    <Section id="ai">
      <p className="mb-8 leading-relaxed text-ink">{t.ai.intro}</p>
      <ol className="space-y-6">
        {t.ai.items.map((item, i) => (
          <li key={item.title} className="flex gap-4">
            <span className="font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-1 leading-relaxed text-dim">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="terminal-box mt-10">
        <span className="text-dim">{t.ai.resultLabel} › </span>
        <Rich text={t.ai.result} />
      </div>
    </Section>
  );
}

export function Experience() {
  const { t } = useLanguage();
  return (
    <Section id="experience">
      <ol>
        {t.experience.entries.map((e) => (
          <li key={e.id} className="entry">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[0.8rem] text-accent">{e.id}</span>
              <h3 className="font-medium text-ink">{e.role}</h3>
              <span className="text-dim">@ {e.company}</span>
              <span className="basis-full whitespace-nowrap sm:ml-auto sm:basis-auto text-[0.74rem] uppercase tracking-wider text-dim">
                {e.period}
              </span>
            </div>
            <p className="mt-1 text-[0.8rem] text-faint-ink">{e.meta}</p>
            <ul className="mt-4 space-y-2">
              {e.bullets.map((b, i) => (
                <li key={i} className="bullet leading-relaxed text-dim">
                  <Rich text={b} />
                </li>
              ))}
            </ul>
            <p className="mt-4 flex flex-wrap gap-2 text-[0.74rem]">
              {e.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

// Below this count the list ends with a "more on the way" placeholder.
const MIN_PROJECTS = 3;

export function Projects({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();

  if (projects.length === 0) {
    return (
      <Section id="projects">
        <div className="terminal-box">
          <p className="text-[0.8rem] text-dim">
            <span className="status-dot" aria-hidden="true" /> {t.projects.status}
          </p>
          <p className="mt-3 leading-relaxed text-ink">
            <Rich text={t.projects.body} />
            <span className="cursor" aria-hidden="true" />
          </p>
          <a className="link mt-5 inline-block text-[0.88rem]" href={contactLinks.github} target="_blank" rel="noreferrer">
            ▸ {t.projects.follow}
          </a>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects">
      <ol>
        {projects.map((p, i) => (
          <li key={p.repoUrl} className="entry">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-medium text-ink">{p.name}</h3>
              <span className="basis-full whitespace-nowrap sm:ml-auto sm:basis-auto text-[0.74rem] uppercase tracking-wider text-dim">
                {[p.language, p.updatedAt.slice(0, 4)].filter(Boolean).join(" · ")}
              </span>
            </div>
            {p.description && <p className="mt-2 pl-8 leading-relaxed text-dim">{p.description}</p>}
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 pl-8 text-[0.85rem]">
              {p.liveUrl && (
                <a className="link" href={p.liveUrl} target="_blank" rel="noreferrer">
                  ▸ {t.projects.live}
                </a>
              )}
              <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">
                ▸ {t.projects.code}
              </a>
            </p>
            {p.topics.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-2 pl-8 text-[0.74rem]">
                {p.topics.map((topic) => (
                  <span key={topic} className="tag">
                    {topic}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
        {projects.length < MIN_PROJECTS && (
          <li className="entry">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-bold text-faint-ink">{String(projects.length + 1).padStart(2, "0")}</span>
              <p className="text-dim">
                <span className="status-dot" aria-hidden="true" /> {t.projects.more}
                <span className="cursor" aria-hidden="true" />
              </p>
            </div>
            <p className="mt-3 pl-8 text-[0.85rem]">
              <a className="link" href={contactLinks.github} target="_blank" rel="noreferrer">
                ▸ {t.projects.follow}
              </a>
            </p>
          </li>
        )}
      </ol>
    </Section>
  );
}

export function Contact() {
  const { t } = useLanguage();
  return (
    <Section id="contact">
      <p className="mb-8 leading-relaxed text-ink">{t.contact.lead}</p>
      <dl className="space-y-3">
        {t.contact.rows.map((row) => (
          <div key={row.key} className="grid grid-cols-[6rem_1fr] gap-4">
            <dt className="text-dim">{row.key}</dt>
            <dd>
              {row.href ? (
                <a
                  className="link"
                  href={row.href}
                  {...(row.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {row.value}
                </a>
              ) : (
                <span className="font-medium text-ink">{row.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <footer className="mt-20 text-[0.75rem] text-dim">
        © 2026 {t.footer}
      </footer>
    </Section>
  );
}
