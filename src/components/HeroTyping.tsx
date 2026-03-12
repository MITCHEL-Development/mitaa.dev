"use client";

import { TypingText, TypingTextCursor } from "@/components/animate-ui/primitives/texts/typing";

export default function HeroTyping() {
  return (
    <TypingText
      text={[
        "Embedded Systems Engineer",
        "Electrical Engineer",
        "Firmware Developer",
        "PCB Designer",
        "Software Developer",
      ]}
      loop
      duration={80}
      holdDelay={2000}
      delay={500}
      className="inline"
    >
      <TypingTextCursor className="ml-0.5 inline-block w-[2px] h-[1.2em] bg-accent-light align-text-bottom" />
    </TypingText>
  );
}
