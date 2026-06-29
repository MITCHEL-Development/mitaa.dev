#!/usr/bin/env node
/**
 * Pre-build script that fetches GitHub data and writes it to public/data/.
 * This allows the static site to include live GitHub data without API routes.
 *
 * Run manually:   node scripts/fetch-github-data.mjs
 * Or via npm:     npm run prebuild
 */

import fs from "node:fs";
import path from "node:path";

const GITHUB_USERNAME = "MITCHEL-Development";
const TOKEN = process.env.GITHUB_TOKEN;

const OUT_DIR = path.join(process.cwd(), "public", "data");

// Ensure output directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function fetchContributions() {
  if (!TOKEN) {
    console.warn("⚠️  GITHUB_TOKEN not set. Skipping contributions fetch.");
    return null;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  } catch (error) {
    console.error("❌ Failed to fetch contributions:", error.message);
    return null;
  }
}

async function fetchRepos() {
  const headers = {
    Accept: "application/vnd.github+json",
  };

  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }

  const repos = [];
  let page = 1;

  try {
    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=public`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      repos.push(...data.filter((r) => !r.fork && !r.archived));

      if (data.length < 100) break;
      page++;
    }

    // Pick only the fields we need to keep the JSON small
    return repos.map((r) => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      topics: r.topics,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      updated_at: r.updated_at,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch repos:", error.message);
    return null;
  }
}

async function main() {
  console.log("🔧 Fetching GitHub data for static export...\n");

  // Fetch contributions
  const contributions = await fetchContributions();
  if (contributions) {
    fs.writeFileSync(
      path.join(OUT_DIR, "github-contributions.json"),
      JSON.stringify(contributions, null, 2)
    );
    console.log(`✅ Contributions saved (${contributions.totalContributions} total)`);
  }

  // Fetch repos
  const repos = await fetchRepos();
  if (repos) {
    fs.writeFileSync(
      path.join(OUT_DIR, "github-repos.json"),
      JSON.stringify(repos, null, 2)
    );
    console.log(`✅ Repos saved (${repos.length} repos)`);
  }

  console.log("\n🎉 Done! GitHub data is ready for static build.");
}

main();
