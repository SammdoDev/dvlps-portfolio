export type Category = "solo" | "duo" | "now";

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  role: string;
  year: string;
  tags: string[];
  category: Category;
  collaborator?: string;
  liveUrl?: string;
  repoUrl?: string;
};

// TODO: swap these placeholders with real project data (title, descriptions,
// highlights, role, year, tags, category, links) and drop real screenshots
// in once the image slots are wired up.
export const PROJECTS: Project[] = [
  {
    title: "Project One",
    description:
      "One or two sentences on what this project does and the problem it solves.",
    longDescription:
      "A longer case-study style breakdown goes here — the problem, the approach, and the outcome. Two or three sentences is usually enough.",
    highlights: [
      "Key feature or result #1",
      "Key feature or result #2",
      "Key feature or result #3",
    ],
    role: "Full Stack Developer",
    year: "2026",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    category: "solo",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Two",
    description:
      "One or two sentences on what this project does and the problem it solves.",
    longDescription:
      "A longer case-study style breakdown goes here — the problem, the approach, and the outcome. Two or three sentences is usually enough.",
    highlights: [
      "Key feature or result #1",
      "Key feature or result #2",
      "Key feature or result #3",
    ],
    role: "Frontend Developer",
    year: "2025",
    tags: ["React", "Node.js", "Docker"],
    category: "duo",
    collaborator: "with @partner-handle",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Three",
    description:
      "One or two sentences on what this project does and the problem it solves.",
    longDescription:
      "A longer case-study style breakdown goes here — the problem, the approach, and the outcome. Two or three sentences is usually enough.",
    highlights: [
      "Key feature or result #1",
      "Key feature or result #2",
      "Key feature or result #3",
    ],
    role: "Mobile Developer",
    year: "2025",
    tags: ["Flutter", "Firebase"],
    category: "solo",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Four",
    description:
      "One or two sentences on what this project does and the problem it solves.",
    longDescription:
      "A longer case-study style breakdown goes here — the problem, the approach, and the outcome. Two or three sentences is usually enough.",
    highlights: [
      "Key feature or result #1",
      "Key feature or result #2",
      "Key feature or result #3",
    ],
    role: "Backend Developer",
    year: "2024",
    tags: ["Laravel", "PostgreSQL"],
    category: "duo",
    collaborator: "with @partner-handle",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Five",
    description:
      "One or two sentences on what this project does and the problem it solves.",
    longDescription:
      "A longer case-study style breakdown goes here — the problem, the approach, and the outcome. Two or three sentences is usually enough.",
    highlights: [
      "Key feature or result #1",
      "Key feature or result #2",
      "Key feature or result #3",
    ],
    role: "Full Stack Developer",
    year: "2026",
    tags: ["NestJS", "Prisma", "Docker"],
    category: "now",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Six",
    description:
      "One or two sentences on what this project does and the problem it solves.",
    longDescription:
      "A longer case-study style breakdown goes here — the problem, the approach, and the outcome. Two or three sentences is usually enough.",
    highlights: [
      "Key feature or result #1",
      "Key feature or result #2",
      "Key feature or result #3",
    ],
    role: "Frontend Developer",
    year: "2026",
    tags: ["React", "Tailwind CSS"],
    category: "now",
    liveUrl: "#",
    repoUrl: "#",
  },
];
