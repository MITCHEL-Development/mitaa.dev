export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "intermediate" | "learning";
  recent?: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C", level: "expert", recent: true },
      { name: "Rust", level: "advanced", recent: true },
      { name: "Python", level: "advanced", recent: true },
      { name: "TypeScript", level: "advanced", recent: true },
      { name: "JavaScript", level: "advanced" },
      { name: "C++", level: "intermediate" },
      { name: "ARM Assembly", level: "intermediate" },
      { name: "SQL", level: "intermediate" },
    ],
  },
  {
    name: "Embedded / Hardware",
    skills: [
      { name: "STM32", level: "expert", recent: true },
      { name: "ESP32", level: "expert", recent: true },
      { name: "FreeRTOS", level: "advanced", recent: true },
      { name: "KiCad", level: "advanced" },
      { name: "MQTT", level: "advanced" },
      { name: "I²C / SPI / UART", level: "expert" },
      { name: "PCB Design", level: "intermediate" },
      { name: "Zephyr RTOS", level: "learning" },
    ],
  },
  {
    name: "Web Development",
    skills: [
      { name: "React", level: "advanced", recent: true },
      { name: "Next.js", level: "advanced", recent: true },
      { name: "Node.js", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced", recent: true },
      { name: "Express", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "REST APIs", level: "advanced" },
      { name: "GraphQL", level: "learning" },
    ],
  },
  {
    name: "Tools & DevOps",
    skills: [
      { name: "Git", level: "expert", recent: true },
      { name: "Docker", level: "advanced", recent: true },
      { name: "Linux", level: "advanced", recent: true },
      { name: "GitHub Actions", level: "advanced" },
      { name: "VS Code", level: "expert" },
      { name: "Make / CMake", level: "advanced" },
      { name: "Jira", level: "intermediate" },
      { name: "Kubernetes", level: "learning" },
    ],
  },
  {
    name: "Machine Learning",
    skills: [
      { name: "TensorFlow", level: "intermediate", recent: true },
      { name: "OpenCV", level: "intermediate" },
      { name: "NumPy / Pandas", level: "intermediate" },
      { name: "scikit-learn", level: "intermediate" },
      { name: "PyTorch", level: "learning" },
    ],
  },
];

export const levelColors: Record<string, string> = {
  expert: "bg-accent-light",
  advanced: "bg-cyan-400",
  intermediate: "bg-cyan-300",
  learning: "bg-cyan-200",
};

export const levelLabels: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  learning: "Learning",
};
