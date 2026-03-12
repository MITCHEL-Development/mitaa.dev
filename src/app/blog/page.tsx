import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Blur } from "@/components/animate-ui/primitives/effects/blur";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";

export const metadata = {
  title: "Blog | mitaa.dev",
  description: "Technical articles, devlogs, and tutorials.",
};

export default function BlogPage() {
  const blogPosts = getAllPosts();

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
          Blog
        </h1>
      </Blur>

      {/* Posts */}
      <div className="divide-y divide-[#F0F0F0]">
        {blogPosts.map((post, i) => (
          <Fade key={post.slug} inView delay={i * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-5 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#666666] transition-colors">
                      {post.title}
                    </h2>
                    {post.tags.length > 0 && (
                      <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32]">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-[#999999] line-clamp-1 max-w-xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[13px] text-[#BBBBBB]">
                    {post.readTime}
                  </span>
                  <span className="text-[13px] text-[#BBBBBB]">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </Fade>
        ))}
      </div>
    </div>
  );
}
