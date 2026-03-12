import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { Blur } from "@/components/animate-ui/primitives/effects/blur";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import TableOfContents from "@/components/TableOfContents";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? `${post.title} | Blog | mitaa.dev` : "Post Not Found",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-20">
      {/* Back */}
      <Blur delay={0}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </Blur>

      {/* Header */}
      <Fade delay={100}>
        <article>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[13px] text-[#BBBBBB]">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-[13px] text-[#BBBBBB]">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-1.5px] leading-tight text-[#1A1A1A] mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mobile TOC (between title and content on small screens) */}
          {post.toc.length > 0 && (
            <div className="lg:hidden mb-8">
              <TableOfContents items={post.toc} />
            </div>
          )}

          {/* Content + TOC side by side */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-[720px]">
              <div
                className="prose-blog max-w-none"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </div>

            {/* Sidebar TOC */}
            {post.toc.length > 0 && (
              <aside className="hidden lg:block w-[200px] shrink-0">
                <TableOfContents items={post.toc} />
              </aside>
            )}
          </div>
        </article>
      </Fade>

      {/* Navigation */}
      <div className="mt-16 pt-6 border-t border-[#F0F0F0]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    </div>
  );
}
