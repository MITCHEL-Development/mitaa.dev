import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getBio } from "@/lib/bio";
import { Blur } from "@/components/animate-ui/primitives/effects/blur";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function Home() {
  const blogPosts = getAllPosts();
  const bio = getBio();

  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
      {/* Bio Section */}
      <section className="pt-20 sm:pt-28 pb-16">
        <Blur delay={0}>
          <h1 className="text-[40px] sm:text-[48px] font-semibold tracking-[-1.5px] leading-tight text-[#1A1A1A]">
            {bio.title}
          </h1>
        </Blur>

        <Blur delay={50}>
          <div className="mt-2 flex items-center gap-4">
            <p className="text-[13px] text-[#BBBBBB] font-medium">
              Updated {bio.updated}
            </p>
            <span className="text-[#E0E0E0]">·</span>
            <nav className="flex items-center gap-3">
              <Link href="/projects" className="text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors font-medium">
                Projects
              </Link>
              <Link href="/blog" className="text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors font-medium">
                Blog
              </Link>
            </nav>
          </div>
        </Blur>

        <div className="mt-10 max-w-[720px] space-y-6">
          {bio.paragraphs.map((html, i) => (
            <Fade key={i} delay={100 + i * 100}>
              <p
                className="text-[13px] leading-[1.7] text-[#1A1A1A]"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Fade>
          ))}
        </div>
      </section>

      {/* Store / Products Section */}
      <section className="pb-16 pt-8">
        <Blur delay={50} inView inViewMargin="-50px">
          <h2 className="text-[13px] font-medium tracking-[0.8px] uppercase text-[#999999] mb-6 flex items-center gap-2">
            <ShoppingBag size={14} /> Store
          </h2>
        </Blur>

        <Fade delay={100} inView>
          <Link
            href="/products/dummy-app"
            className="group block rounded-xl border border-[#F0F0F0] bg-white p-6 transition-all hover:border-[#E0E0E0] hover:shadow-sm"
          >
            <div className="flex items-start tracking-[-0.5px] justify-between gap-4">
              <div>
                <div className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-800 mb-3">
                  Featured Product
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-black mb-2">
                  DevBoost Pro
                </h3>
                <p className="text-[14px] text-[#666666] leading-relaxed max-w-[500px]">
                  De ultieme tool om je ontwikkelingsworkflow te versnellen. Krijg meer gedaan in minder tijd met slimme automatiseringen en ingebouwde templates.
                </p>
              </div>
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FAFAFA] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                <ArrowRight size={18} />
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-[13px] font-medium">
              <span className="text-[#1A1A1A] font-bold">€49,00</span>
              <span className="text-[#BBBBBB]">Lifetime License</span>
            </div>
          </Link>
        </Fade>
      </section>

      {/* Blog / Writing Section */}
      <section className="pb-16">
        <Blur delay={100} inView inViewMargin="-50px">
          <h2 className="text-[13px] font-medium tracking-[0.8px] uppercase text-[#999999] mb-6">
            Blog
          </h2>
        </Blur>

        <div className="divide-y divide-[#F0F0F0]">
          {blogPosts.map((post, i) => (
            <Fade key={post.slug} inView delay={i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#666666] transition-colors">
                    {post.title}
                  </h3>
                  {post.tags.length > 0 && (
                    <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32]">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <span className="text-[13px] text-[#BBBBBB] shrink-0">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}
