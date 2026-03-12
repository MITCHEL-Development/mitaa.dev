"use client";

import { useEffect, useState } from "react";
import { GitHubIcon } from "@/components/icons";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const LEVEL_COLORS = [
  "bg-white/[0.03]",       // 0 contributions
  "bg-cyan-500/20",        // level 1
  "bg-cyan-500/40",        // level 2
  "bg-cyan-500/60",        // level 3
  "bg-cyan-400/80",        // level 4
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTH_LABELS[month], col: i });
      lastMonth = month;
    }
  });

  return labels;
}

export default function GitHubContributions() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) return null; // silently hide if no token configured

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-[120px] py-16">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold font-mono flex items-center justify-center gap-2">
          <GitHubIcon size={20} className="text-accent-light" />
          git log --contributions
        </h2>
        <p className="mt-1 text-muted text-xs font-mono">
          // activity over the past year
        </p>
      </div>

      <div className="p-5 rounded bg-card border border-dashed border-border overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center gap-3 text-muted text-sm">
              <div className="w-4 h-4 rounded-full border-2 border-accent-light border-t-transparent animate-spin" />
              Loading contributions...
            </div>
          </div>
        )}
        {!loading && data && (
          <>
            {/* Total contributions */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted">
                <span className="text-foreground font-semibold">
                  <CountingNumber
                    number={data.totalContributions}
                    inView
                  />
                </span>{" "}
                contributions in the last year
              </p>
              <a
                href="https://github.com/MITCHEL-Development"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent-light hover:underline"
              >
                View on GitHub
              </a>
            </div>

            {/* Heatmap grid */}
            <div className="relative overflow-x-auto pb-2">
              {/* Month labels */}
              <div className="flex mb-2 ml-8 text-xs text-muted select-none">
                {getMonthLabels(data.weeks).map(({ label, col }, idx) => (
                  <span
                    key={`${label}-${idx}`}
                    className="absolute"
                    style={{ left: `${col * 14 + 32}px` }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex gap-[2px] mt-6 relative">
                {/* Day labels */}
                <div className="flex flex-col gap-[2px] mr-1 text-[10px] text-muted select-none shrink-0">
                  <span className="h-[10px]" />
                  <span className="h-[10px] leading-[10px]">Mon</span>
                  <span className="h-[10px]" />
                  <span className="h-[10px] leading-[10px]">Wed</span>
                  <span className="h-[10px]" />
                  <span className="h-[10px] leading-[10px]">Fri</span>
                  <span className="h-[10px]" />
                </div>

                {/* Weeks */}
                {data.weeks.map((week) => (
                  <div key={week.contributionDays[0]?.date ?? Math.random()} className="flex flex-col gap-[2px]">
                    {week.contributionDays.map((day) => {
                      const level = getLevel(day.contributionCount);
                      return (
                        <div
                          key={day.date}
                          className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[level]} transition-colors hover:ring-1 hover:ring-accent-light/50`}
                          title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted">
              <span>Less</span>
              {LEVEL_COLORS.map((color) => (
                <div
                  key={color}
                  className={`w-[10px] h-[10px] rounded-[2px] ${color}`}
                />
              ))}
              <span>More</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
