export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  techStack: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  context?: string;
  role?: string;
  goal?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    slug: "smart-home-controller",
    title: "Smart Home Controller",
    description:
      "An embedded IoT controller built with ESP32 for home automation, featuring real-time sensor monitoring and remote control via a web dashboard.",
    longDescription:
      "Designed and built a complete smart home automation system from the ground up. The hardware runs on ESP32 microcontrollers collecting data from temperature, humidity, and motion sensors. The firmware is written in C with FreeRTOS for real-time task scheduling. A React-based web dashboard communicates via MQTT for real-time updates.",
    category: "Embedded",
    techStack: ["C", "ESP32", "FreeRTOS", "MQTT", "React", "Node.js"],
    github: "https://github.com/MITCHEL-Development/smart-home",
    featured: true,
    context: "Personal project to automate home environment monitoring and control.",
    role: "Full-stack developer & hardware designer",
    goal: "Create an affordable, open-source smart home solution.",
    features: [
      "Real-time sensor data streaming via MQTT",
      "FreeRTOS-based multitasking firmware",
      "React web dashboard with live charts",
      "OTA firmware updates",
      "Energy consumption tracking",
    ],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A modern, dark-themed portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.",
    longDescription:
      "This portfolio website showcases my projects, skills, and experience. Built with Next.js 15, TypeScript, and Tailwind CSS with a focus on performance, accessibility, and clean design. Features include dynamic project pages, a blog system, and a contact form.",
    category: "Web",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/MITCHEL-Development/portfolio-site",
    demo: "https://mitaa.dev",
    featured: true,
    context: "Professional portfolio to showcase work and skills.",
    role: "Designer & Developer",
    goal: "Create a minimalistic, high-performance portfolio site.",
    features: [
      "Server-side rendering with Next.js",
      "Dark UI with custom design system",
      "Responsive across all devices",
      "Blog with markdown support",
      "SEO optimized",
    ],
  },
  {
    slug: "ml-image-classifier",
    title: "ML Image Classifier",
    description:
      "A machine learning pipeline for image classification using Python and TensorFlow, trained on custom datasets with 95%+ accuracy.",
    longDescription:
      "Built a complete ML pipeline for classifying industrial components using computer vision. The model uses a fine-tuned ResNet50 architecture trained on a custom dataset of 10,000+ images. Includes data augmentation, transfer learning, and a Flask API for inference.",
    category: "ML",
    techStack: ["Python", "TensorFlow", "OpenCV", "Flask", "Docker"],
    github: "https://github.com/MITCHEL-Development/ml-classifier",
    featured: true,
    context: "Research project for automated quality control in manufacturing.",
    role: "ML Engineer",
    goal: "Achieve 95%+ classification accuracy on industrial components.",
    features: [
      "Transfer learning with ResNet50",
      "Custom data augmentation pipeline",
      "REST API for real-time inference",
      "Docker containerized deployment",
      "Performance monitoring dashboard",
    ],
  },
  {
    slug: "rtos-task-scheduler",
    title: "RTOS Task Scheduler",
    description:
      "A custom real-time task scheduler for STM32 microcontrollers, implementing priority-based preemptive scheduling.",
    longDescription:
      "Developed a lightweight RTOS-like task scheduler for STM32F4 microcontrollers. Implements priority-based preemptive scheduling, inter-task communication via message queues, and hardware timer-based context switching. Written entirely in C and ARM Assembly.",
    category: "Embedded",
    techStack: ["C", "ARM Assembly", "STM32", "KiCad"],
    github: "https://github.com/MITCHEL-Development/rtos-scheduler",
    featured: true,
    context: "Educational project to deeply understand real-time operating systems.",
    role: "Embedded Systems Developer",
    goal: "Build a minimal RTOS from scratch for learning purposes.",
    features: [
      "Priority-based preemptive scheduling",
      "Context switching via PendSV",
      "Inter-task message queues",
      "Semaphores and mutexes",
      "Hardware timer integration",
    ],
  },
  {
    slug: "cli-devtool",
    title: "CLI DevTool",
    description:
      "A Rust-based command-line tool for automating common development workflows including project scaffolding and deployment.",
    longDescription:
      "A fast, ergonomic CLI tool written in Rust that automates repetitive development tasks. Features include project template generation, environment setup, automated testing pipelines, and one-command deployment to various cloud providers.",
    category: "Open Source",
    techStack: ["Rust", "Clap", "Tokio", "GitHub Actions"],
    github: "https://github.com/MITCHEL-Development/cli-devtool",
    featured: false,
    context: "Open source tool to speed up developer workflows.",
    role: "Creator & Maintainer",
    goal: "Reduce project setup time from hours to minutes.",
    features: [
      "Project scaffolding from templates",
      "Environment configuration management",
      "Automated CI/CD pipeline setup",
      "Multi-cloud deployment support",
      "Plugin system for extensibility",
    ],
  },
  {
    slug: "budget-tracker-app",
    title: "Budget Tracker App",
    description:
      "A full-stack budget tracking application with React frontend and Node.js backend, featuring data visualization and recurring transactions.",
    longDescription:
      "A comprehensive personal finance tracker with a clean, intuitive interface. Users can track income and expenses, set budgets by category, and visualize spending patterns. Built with React, Node.js, and PostgreSQL with real-time chart updates.",
    category: "Web",
    techStack: ["React", "Node.js", "PostgreSQL", "Chart.js", "Express"],
    github: "https://github.com/MITCHEL-Development/budget-tracker",
    demo: "https://budget.mitaa.dev",
    featured: false,
    context: "Side project to practice full-stack development.",
    role: "Full-stack Developer",
    goal: "Build a practical app with clean architecture and UX.",
    features: [
      "Category-based expense tracking",
      "Interactive charts and reports",
      "Recurring transaction support",
      "CSV import/export",
      "Responsive mobile design",
    ],
  },
];

export const categories = ["All", "Embedded", "Web", "ML", "Open Source"];
