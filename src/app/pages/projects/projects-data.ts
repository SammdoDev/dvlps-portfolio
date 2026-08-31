export type Category = "solo" | "duo" | "now";

export type ProjectImage = {
  /** Local file under public/, for example: /projects/project-one/overview.png */
  src: string;
  /** A concise description of the screen or feature shown. */
  alt: string;
};

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  role: string;
  year: string;
  tags: string[];
  images: ProjectImage[];
  category: Category;
  collaborator?: string;
  liveUrl?: string;
  repoUrl?: string;
};

// TODO: replace these placeholders with real project data. Store screenshots
// under public/projects/<project-slug>/, then add them like this:
// images: [
//   { src: "/projects/project-one/overview.png", alt: "Project overview" },
//   { src: "/projects/project-one/dashboard.png", alt: "Dashboard screen" },
// ],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    category: "now",
    liveUrl: "#",
    repoUrl: "#",
  },
];
