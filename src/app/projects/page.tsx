import { getAllProjects, getCategories } from "@/lib/projects";
import { readGitHubRepos, mapReposToProjects } from "@/lib/github";
import ProjectsList from "./ProjectsList";

export const metadata = {
  title: "Projects | mitaa.dev",
  description: "A collection of projects.",
};

export default async function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getCategories();

  // Read pre-fetched GitHub repos for static export
  const rawRepos = readGitHubRepos();
  const githubProjects = mapReposToProjects(rawRepos, projects);

  return (
    <ProjectsList
      curatedProjects={projects}
      curatedCategories={categories}
      initialGithubProjects={githubProjects}
    />
  );
}
