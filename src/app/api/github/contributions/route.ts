import { NextResponse } from "next/server";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
}

const GITHUB_USERNAME = "MITCHEL-Development";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubResponse = await response.json();
    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
