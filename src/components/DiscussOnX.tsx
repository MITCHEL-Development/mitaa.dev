import { XIcon } from "@/components/icons";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";

interface DiscussOnXProps {
  url?: string;
}

export default function DiscussOnX({ url }: DiscussOnXProps) {
  if (!url) return null;

  return (
    <Fade delay={100}>
      <div className="mt-12 pt-8 border-t border-[#F0F0F0]">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1A1A1A] text-white text-[13px] font-medium hover:bg-[#333333] transition-colors"
        >
          <XIcon size={14} />
          Discuss this post on X
        </a>
        <p className="mt-3 text-[12px] text-[#BBBBBB]">
          Have thoughts on this article? Join the conversation on X.
        </p>
      </div>
    </Fade>
  );
}
