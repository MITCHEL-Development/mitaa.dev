export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-rtos-from-scratch",
    title: "Building an RTOS from Scratch on STM32",
    date: "2026-01-15",
    excerpt:
      "A deep dive into building a minimal real-time operating system from scratch on ARM Cortex-M4, covering context switching, scheduling, and synchronization primitives.",
    tags: ["Embedded", "C", "RTOS", "STM32"],
    readTime: "12 min read",
    content: `
## Introduction

Building a real-time operating system from scratch is one of the most educational exercises in embedded systems engineering. In this post, I'll walk through the key concepts and implementation details of my custom RTOS for STM32F4 microcontrollers.

## Why Build Your Own RTOS?

While production systems should use battle-tested solutions like FreeRTOS or Zephyr, building your own teaches you:

- **Context switching** at the hardware level
- **Scheduling algorithms** and their trade-offs
- **Synchronization primitives** and race conditions
- **Memory management** in constrained environments

## The Scheduler

The heart of any RTOS is its scheduler. I implemented a priority-based preemptive scheduler that uses the ARM Cortex-M4's PendSV exception for context switching.

\`\`\`c
void scheduler_run(void) {
    task_t *next = get_highest_priority_ready();
    if (next != current_task) {
        trigger_pendsv(); // Request context switch
    }
}
\`\`\`

## Context Switching

The PendSV handler saves the current task's context (registers R4-R11, LR) onto its stack and restores the next task's context. This happens entirely in ARM Assembly for precise control.

## What's Next

In the next post, I'll cover implementing message queues and semaphores for inter-task communication.
    `,
  },
  {
    slug: "rust-for-embedded-developers",
    title: "Why Rust is the Future of Embedded Development",
    date: "2025-12-08",
    excerpt:
      "Exploring how Rust's ownership model and zero-cost abstractions make it an excellent choice for safety-critical embedded systems.",
    tags: ["Rust", "Embedded", "Safety"],
    readTime: "8 min read",
    content: `
## The Problem with C in Embedded

C has been the lingua franca of embedded development for decades, but it comes with well-known pitfalls: buffer overflows, null pointer dereferences, and data races. In safety-critical systems, these bugs can be catastrophic.

## Enter Rust

Rust's ownership model prevents entire classes of bugs at compile time:

- **No null pointers** — Option types instead
- **No data races** — ownership and borrowing rules
- **No buffer overflows** — bounds checking
- **Zero-cost abstractions** — no runtime overhead

\`\`\`rust
fn read_sensor(peripheral: &mut SensorPeripheral) -> Result<f32, SensorError> {
    let raw = peripheral.read_register(TEMP_REG)?;
    Ok(raw as f32 * 0.0625)
}
\`\`\`

## The Ecosystem

The embedded Rust ecosystem has matured significantly with projects like \`embassy\`, \`probe-rs\`, and hardware abstraction layers for most popular MCU families.

## Conclusion

While C isn't going anywhere soon, Rust offers a compelling path forward for new embedded projects, especially those with safety or reliability requirements.
    `,
  },
  {
    slug: "nextjs-portfolio-devlog",
    title: "Devlog: Building My Portfolio with Next.js 15",
    date: "2026-02-10",
    excerpt:
      "A behind-the-scenes look at designing and building a modern developer portfolio with Next.js, Tailwind CSS, and a dark-first design approach.",
    tags: ["Web", "Next.js", "Design", "Tailwind"],
    readTime: "6 min read",
    content: `
## Design Philosophy

For my portfolio, I wanted three things:

1. **Dark UI** — easier on the eyes, modern feel
2. **Minimalistic** — content-first, no clutter
3. **Fast** — instantaneous page loads

## Tech Stack Decisions

- **Next.js 15** with App Router for server components and routing
- **Tailwind CSS** for rapid, consistent styling
- **TypeScript** for type safety
- **Lucide icons** for clean, consistent iconography

## Color Palette

I built the design system around purple accents on a near-black background:

- Background: \`#0a0a0a\`
- Card: \`#111111\`
- Accent: \`#6d28d9\` (violet-700)
- Text: \`#ededed\`

## Key Features

The site includes animated page transitions, a responsive mobile navigation, and project detail pages with rich content. Everything is statically generated for maximum performance.

## Deployment

Deployed on Vercel with automatic preview deployments for every PR. The site scores 100/100 on Lighthouse across all metrics.
    `,
  },
];
