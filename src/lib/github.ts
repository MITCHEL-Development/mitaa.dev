import type { Project } from "@/lib/projects";

const GITHUB_USERNAME = "MITCHEL-Development";

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

/** Fetches all public repos for the configured user. Safe to call at build time in a Server Component. */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=public`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) break;

    const data: GitHubRepo[] = await res.json();
    repos.push(...data.filter((r) => !r.fork && !r.archived));

    if (data.length < 100) break;
    page++;
  }

  return repos;
}

/** Convert repo name to readable title: "my-cool-project" → "My Cool Project" */
export function repoNameToTitle(name: string): string {
  return name
    .replaceAll(/[-_]/g, " ")
    .replaceAll(/\b\w/g, (c) => c.toUpperCase());
}

/** Map GitHub language/topics to a project category */
export function inferCategory(language: string | null, topics: string[]): string {
  const topicSet = new Set(topics.map((t) => t.toLowerCase()));

  if (topicSet.has("embedded") || topicSet.has("firmware") || topicSet.has("stm32") || topicSet.has("esp32") || topicSet.has("rtos"))
    return "Embedded";
  if (topicSet.has("iot") || topicSet.has("mqtt") || topicSet.has("smart-home"))
    return "IoT";
  if (topicSet.has("machine-learning") || topicSet.has("ml") || topicSet.has("ai") || topicSet.has("tensorflow") || topicSet.has("pytorch"))
    return "ML";
  if (topicSet.has("devops") || topicSet.has("docker") || topicSet.has("ci-cd") || topicSet.has("kubernetes"))
    return "DevOps";
  if (topicSet.has("cli") || topicSet.has("tool") || topicSet.has("devtool"))
    return "Tools";

  const lang = language?.toLowerCase();
  if (lang === "c" || lang === "c++") return "Embedded";
  if (lang === "rust") return "Rust";
  if (lang === "python") return "Python";
  if (lang === "typescript" || lang === "javascript") return "Web";

  return "Other";
}

/** Map raw GitHub repos to Project objects, deduplicating against curated projects. */
export function mapReposToProjects(
  repos: GitHubRepo[],
  curatedProjects: Project[]
): Project[] {
  const curatedSlugs = new Set(curatedProjects.map((p) => p.slug));
  const curatedGitHubUrls = new Set(
    curatedProjects
      .filter((p) => p.github)
      .map((p) => p.github!.toLowerCase().replace(/\/$/, ""))
  );

  return repos
    .filter((repo) => {
      const slug = repo.name.toLowerCase();
      const url = repo.html_url.toLowerCase().replace(/\/$/, "");
      return !curatedSlugs.has(slug) && !curatedGitHubUrls.has(url);
    })
    .map((repo) => ({
      slug: repo.name.toLowerCase(),
      title: repoNameToTitle(repo.name),
      description: repo.description || "No description provided.",
      category: inferCategory(repo.language, repo.topics),
      techStack: [
        ...(repo.language ? [repo.language] : []),
        ...repo.topics.slice(0, 5),
      ],
      github: repo.html_url,
      demo: repo.homepage || undefined,
      featured: false,
      source: "github" as const,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
    }));
}
