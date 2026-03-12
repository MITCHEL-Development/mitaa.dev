"use client";

import {
  ScrollProgressProvider,
  ScrollProgress,
} from "@/components/animate-ui/primitives/animate/scroll-progress";

export default function ScrollProgressBar() {
  return (
    <ScrollProgressProvider global>
      <ScrollProgress className="fixed top-16 left-0 z-[60] h-[2px] bg-gradient-to-r from-accent via-accent-light to-cyan-300" />
    </ScrollProgressProvider>
  );
}
