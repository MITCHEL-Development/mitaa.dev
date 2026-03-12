import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const projectsJsonPath = path.join(projectsDirectory, "projects.json");

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  context?: string;
  role?: string;
  goal?: string;
  features?: string[];
  source?: "curated" | "github";
  stars?: number;
  forks?: number;
  updatedAt?: string;
}

export interface ProjectWithHtml extends Project {
  contentHtml: string;
}

interface ProjectEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  context?: string;
  role?: string;
  goal?: string;
  features?: string[];
}

/** Read the projects registry from projects.json. */
function readProjectsJson(): ProjectEntry[] {
  const raw = fs.readFileSync(projectsJsonPath, "utf8");
  return JSON.parse(raw) as ProjectEntry[];
}

/** Get all projects. */
export function getAllProjects(): Project[] {
  return readProjectsJson().map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    techStack: entry.techStack ?? [],
    image: entry.image,
    github: entry.github,
    demo: entry.demo,
    featured: entry.featured ?? false,
    context: entry.context,
    role: entry.role,
    goal: entry.goal,
    features: entry.features,
  }));
}

/** Get all unique categories. */
export function getCategories(): string[] {
  const projects = readProjectsJson();
  const cats = new Set(projects.map((p) => p.category));
  return ["All", ...Array.from(cats)];
}

/** Get all slugs for static generation. */
export function getAllProjectSlugs(): string[] {
  return readProjectsJson().map((entry) => entry.slug);
}

/** Get a single project by slug, with HTML-rendered markdown content. */
export async function getProjectBySlug(slug: string): Promise<ProjectWithHtml | null> {
  const entries = readProjectsJson();
  const entry = entries.find((e) => e.slug === slug);

  if (!entry) return null;

  const mdPath = path.join(projectsDirectory, `${slug}.md`);
  let contentHtml = "";

  if (fs.existsSync(mdPath)) {
    const content = fs.readFileSync(mdPath, "utf8");
    const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
    contentHtml = processed.toString();
  }

  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    techStack: entry.techStack ?? [],
    image: entry.image,
    github: entry.github,
    demo: entry.demo,
    featured: entry.featured ?? false,
    context: entry.context,
    role: entry.role,
    goal: entry.goal,
    features: entry.features,
    contentHtml,
  };
}
