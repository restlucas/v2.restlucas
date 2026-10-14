# v2.restlucas

Personal portfolio of Lucas Souza, frontend developer. Terminal-inspired, single page, English by default with a Portuguese toggle.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · JetBrains Mono

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

| What | Where |
|---|---|
| All text (EN and PT) | `src/i18n/dictionaries.ts` |
| Language state (default `en`, saved in `localStorage`) | `src/i18n/LanguageProvider.tsx` |
| Hero and ASCII banner | `src/components/Hero.tsx` |
| Sections (about, stack, AI workflow, experience, projects, contact) | `src/components/Content.tsx` |
| Bottom status bar (section, language toggle, accent color, scroll, clock) | `src/components/StatusBar.tsx` |
| Colors, scanlines and animations | `src/app/globals.css` |
| Resumes linked from the site | `public/resume-en.pdf`, `public/resume-pt.pdf` |

Text wrapped in `**double asterisks**` inside the dictionaries is rendered as a highlight.

## Adding a project

Projects are pulled from GitHub (`src/lib/projects.ts`). No code change or redeploy needed:

1. Make the repository public.
2. Add the topic `portfolio` to it (repo page → ⚙ next to "About" → Topics).
3. Fill in the repo **description** (shown as the project text) and **website** (shown as the "live" link). Other topics become tags.

The list refreshes about once an hour. Optional environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `GITHUB_USERNAME` | `restlucas` | Account to read repositories from |
| `PORTFOLIO_TOPIC` | `portfolio` | Topic that marks a repo for the portfolio |
| `GITHUB_TOKEN` | none | Raises the GitHub API rate limit (read-only token is enough) |

While no repository has the topic, the section shows a "building" message.

For local development, copy `.env.example` to `.env.local` and fill in the values.

## Deploying to Railway

The repository is ready for [Railway](https://railway.com): `railway.json` sets the build (`npm run build`), the start command (`npm run start`), a health check on `/` and restart on failure. Node is pinned to 22 via `engines` in `package.json`. `next start` reads the `PORT` variable Railway provides, so no port setup is needed.

1. In Railway, create a project → **Deploy from GitHub repo** → pick this repository.
2. Under **Variables**, add `GITHUB_TOKEN` (see `.env.example`).
3. Under **Settings → Networking**, generate a Railway domain or add a custom one.

Every push to the default branch triggers a new deploy.
