import { getAllProjects, getCategories } from "@/lib/projects";
import ProjectsList from "./ProjectsList";

export const metadata = {
  title: "Projects | mitaa.dev",
  description: "A collection of projects.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getCategories();

  return <ProjectsList curatedProjects={projects} curatedCategories={categories} />;
}
