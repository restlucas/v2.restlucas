import { cacheLife } from "next/cache";

// Projects come from GitHub: any public repo of GITHUB_USERNAME tagged with the
// PORTFOLIO_TOPIC topic shows up on the site automatically (refreshed hourly).
const USERNAME = process.env.GITHUB_USERNAME ?? "restlucas";
const TOPIC = process.env.PORTFOLIO_TOPIC ?? "portfolio";

export type Project = {
  name: string;
  description: string | null;
  repoUrl: string;
  liveUrl: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

function prettifyName(name: string) {
  return name.replace(/[-_]+/g, " ").trim();
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`, { headers });
    if (!res.ok) return [];
    const repos = (await res.json()) as GitHubRepo[];

    return repos
      .filter((r) => !r.fork && !r.archived && r.topics?.includes(TOPIC))
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .map((r) => ({
        name: prettifyName(r.name),
        description: r.description,
        repoUrl: r.html_url,
        liveUrl: r.homepage ? r.homepage : null,
        language: r.language,
        topics: (r.topics ?? []).filter((t) => t !== TOPIC).slice(0, 6),
        stars: r.stargazers_count,
        updatedAt: r.pushed_at,
      }));
  } catch {
    // Network or rate-limit issue: the section falls back to the "building" message.
    return [];
  }
}
