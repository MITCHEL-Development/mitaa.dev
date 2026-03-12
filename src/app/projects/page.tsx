import { getAllProjects, getCategories } from "@/lib/projects";
import { fetchGitHubRepos, mapReposToProjects } from "@/lib/github";
import ProjectsList from "./ProjectsList";

export const metadata = {
  title: "Projects | mitaa.dev",
  description: "A collection of projects.",
};

export default async function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getCategories();

  // Fetch GitHub repos at build time so they work with static export
  const rawRepos = await fetchGitHubRepos();
  const githubProjects = mapReposToProjects(rawRepos, projects);

  return (
    <ProjectsList
      curatedProjects={projects}
      curatedCategories={categories}
      initialGithubProjects={githubProjects}
    />
  );
}
