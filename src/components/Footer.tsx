import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-[#F0F0F0]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 pt-16 pb-20">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/MITCHEL-Development"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors"
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
          <a
            href="mailto:hello@mitaa.dev"
            className="inline-flex items-center gap-2 text-[13px] text-[#999999] hover:text-[#1A1A1A] transition-colors"
          >
            <Mail size={16} />
            hello@mitaa.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
