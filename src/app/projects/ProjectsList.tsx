"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, Star, GitFork, ArrowLeft } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/lib/projects";
import { Blur } from "@/components/animate-ui/primitives/effects/blur";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";

interface Props {
  curatedProjects: Project[];
  curatedCategories: string[];
  initialGithubProjects: Project[];
}

export default function ProjectsList({ curatedProjects, curatedCategories, initialGithubProjects }: Readonly<Props>) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const curatedWithSource = curatedProjects.map((p) => ({ ...p, source: "curated" as const }));
  const allProjects = [...curatedWithSource, ...initialGithubProjects];

  const dynamicCategories = new Set(allProjects.map((p) => p.category));
  const allCategories = ["All", ...Array.from(dynamicCategories)];

  const filtered = allProjects.filter((p) => {
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) =>
        t.toLowerCase().includes(search.toLowerCase())
      );
    return matchCategory && matchSearch;
  });

  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-20">
      {/* Back */}
      <Blur delay={0}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> mitaa.dev
        </Link>
      </Blur>

      {/* Header */}
      <Blur delay={50}>
        <h1 className="text-[13px] font-medium tracking-[0.8px] uppercase text-[#999999] mb-8">
          Projects
        </h1>
      </Blur>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-[#F5F5F5] text-[#999999] hover:text-[#1A1A1A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:ml-auto">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBBBBB]"
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-56 pl-8 pr-3 py-1.5 rounded-full bg-[#F5F5F5] border-none text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]/10 transition-colors"
          />
        </div>
      </div>

      {/* Project grid */}
      <div className="divide-y divide-[#F0F0F0]">
        {filtered.map((project, i) => {
          const isCurated = project.source === "curated";
          const projectHref = isCurated
            ? `/projects/${project.slug}`
            : project.github || "#";

          const CardContent = (
            <div className="group py-5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#666666] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#999999]">
                      {project.category}
                    </span>
                    {!isCurated && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#BBBBBB]">
                        GitHub
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-[#999999] line-clamp-1 max-w-xl mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#999999]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {!isCurated && project.stars ? (
                    <span className="flex items-center gap-1 text-[13px] text-[#BBBBBB]">
                      <Star size={12} /> {project.stars}
                    </span>
                  ) : null}
                  {!isCurated && project.forks ? (
                    <span className="flex items-center gap-1 text-[13px] text-[#BBBBBB]">
                      <GitFork size={12} /> {project.forks}
                    </span>
                  ) : null}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && <GitHubIcon size={14} className="text-[#999999]" />}
                    {project.demo && <ExternalLink size={14} className="text-[#999999]" />}
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <Fade key={project.slug} inView delay={i * 40}>
              {isCurated ? (
                <Link href={projectHref}>{CardContent}</Link>
              ) : (
                <a
                  href={projectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CardContent}
                </a>
              )}
            </Fade>
          );
        })}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-[#999999] text-[14px]">No projects found</p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearch("");
            }}
            className="mt-3 text-[#1A1A1A] hover:underline text-[13px]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
