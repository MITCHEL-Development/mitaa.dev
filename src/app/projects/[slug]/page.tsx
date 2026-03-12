import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { Blur } from "@/components/animate-ui/primitives/effects/blur";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: project ? `${project.title} | mitaa.dev` : "Project Not Found",
    description: project?.description,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 py-20">
      {/* Back */}
      <Blur delay={0}>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </Blur>

      {/* Header */}
      <Fade delay={100}>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#999999]">
              {project.category}
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-1.5px] leading-tight text-[#1A1A1A]">
            {project.title}
          </h1>
          <p className="mt-3 text-[15px] text-[#999999] leading-relaxed">
            {project.description}
          </p>
        </div>
      </Fade>

      {/* Links */}
      <Fade delay={200}>
        <div className="flex gap-3 mb-10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F5] text-[#1A1A1A] text-[13px] font-medium hover:bg-[#E8E8E8] transition-colors"
            >
              <GitHubIcon size={14} /> Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-[13px] font-medium hover:bg-[#333333] transition-colors"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </Fade>

      {/* Details grid */}
      <Fade inView>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {project.context && (
            <div>
              <h3 className="text-[12px] font-medium tracking-[0.5px] uppercase text-[#BBBBBB] mb-2">
                Context
              </h3>
              <p className="text-[14px] text-[#1A1A1A]">{project.context}</p>
            </div>
          )}
          {project.role && (
            <div>
              <h3 className="text-[12px] font-medium tracking-[0.5px] uppercase text-[#BBBBBB] mb-2">
                Role
              </h3>
              <p className="text-[14px] text-[#1A1A1A]">{project.role}</p>
            </div>
          )}
          {project.goal && (
            <div>
              <h3 className="text-[12px] font-medium tracking-[0.5px] uppercase text-[#BBBBBB] mb-2">
                Goal
              </h3>
              <p className="text-[14px] text-[#1A1A1A]">{project.goal}</p>
            </div>
          )}
        </div>
      </Fade>

      {/* Overview (markdown content) */}
      {project.contentHtml && (
        <Fade inView>
          <div className="mb-10">
            <h2 className="text-[13px] font-medium tracking-[0.8px] uppercase text-[#999999] mb-4">
              Overview
            </h2>
            <div
              className="prose-blog max-w-none"
              dangerouslySetInnerHTML={{ __html: project.contentHtml }}
            />
          </div>
        </Fade>
      )}

      {/* Tech Stack */}
      <Fade inView>
        <div className="mb-10">
          <h2 className="text-[13px] font-medium tracking-[0.8px] uppercase text-[#999999] mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[13px] px-3 py-1.5 rounded-full bg-[#F5F5F5] text-[#1A1A1A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Fade>

      {/* Features */}
      {project.features && (
        <Fade inView>
          <div className="mb-10">
            <h2 className="text-[13px] font-medium tracking-[0.8px] uppercase text-[#999999] mb-4">
              Key Features
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-[14px] text-[#1A1A1A]"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#BBBBBB] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      )}

      {/* Navigation */}
      <div className="mt-16 pt-6 border-t border-[#F0F0F0]">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>
    </div>
  );
}
