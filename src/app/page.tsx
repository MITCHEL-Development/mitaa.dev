import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Blur } from "@/components/animate-ui/primitives/effects/blur";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";

export default function Home() {
  const blogPosts = getAllPosts();

  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
      {/* Bio Section */}
      <section className="pt-20 sm:pt-28 pb-16">
        <Blur delay={0}>
          <h1 className="text-[40px] sm:text-[48px] font-semibold tracking-[-1.5px] leading-tight text-[#1A1A1A]">
            mitaa.dev
          </h1>
        </Blur>

        <Blur delay={50}>
          <div className="mt-2 flex items-center gap-4">
            <p className="text-[13px] text-[#BBBBBB] font-medium">
              Updated Feb 28, 2026
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
          <Fade delay={100}>
            <p className="text-[13px] leading-[1.7] text-[#1A1A1A]">
              I&apos;m a Junior Embedded Systems Engineer &amp; Software Developer 
              with a strong focus on microcontroller programming, PCB design, 
              and full-stack web development. Currently studying Electrical 
              Engineering and working on projects that bridge hardware and software.
            </p>
          </Fade>

          <Fade delay={200}>
            <p className="text-[13px] leading-[1.7] text-[#1A1A1A]">
              My journey started with curiosity about how electronics work at 
              a fundamental level — from circuit design and signal processing to 
              firmware development and communication protocols. Over time, I expanded 
              into web development and DevOps, giving me a unique perspective that 
              spans from register-level programming to cloud deployment.
            </p>
          </Fade>

          <Fade delay={300}>
            <p className="text-[13px] leading-[1.7] text-[#1A1A1A]">
              I&apos;m passionate about writing efficient, close-to-hardware code 
              and designing systems that are both robust and maintainable. Whether 
              it&apos;s bare-metal firmware for an STM32, a real-time sensor network, 
              or a React dashboard, I bring the same engineering discipline and 
              attention to detail.
            </p>
          </Fade>

          <Fade delay={400}>
            <p className="text-[13px] leading-[1.7] text-[#1A1A1A]">
              Outside of engineering, I&apos;m interested in electronics design, 
              open-source embedded tooling, and emerging technologies like Rust 
              for embedded systems and edge computing with RISC-V.
            </p>
          </Fade>
        </div>
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
