import { NextResponse } from "next/server";

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

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Fetch all public repos (paginated, up to 100 per page)
    const repos: GitHubRepo[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=public`,
        {
          headers,
          next: { revalidate: 3600 }, // cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubRepo[] = await response.json();

      if (data.length === 0) {
        hasMore = false;
      } else {
        repos.push(...data);
        page++;
        if (data.length < 100) hasMore = false;
      }
    }

    // Filter out forks and archived repos
    const filtered = repos.filter((repo) => !repo.fork && !repo.archived);

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
