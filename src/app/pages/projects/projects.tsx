"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { PROJECTS, type Category } from "./projects-data";
import { ProjectsFilter } from "./projects-filter";
import { ProjectsGallery } from "./projects-gallery";

const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "solo", label: "Solos" },
  { id: "duo", label: "Duos" },
  { id: "now", label: "In Development" },
];

export default function Projects() {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active),
    [active],
  );

  return (
    <section id="projects" className="relative py-24">
      <div className="relative mx-auto max-w-5xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-mono-tag text-xs text-accent"
        >
          03 / projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Things I&apos;ve built
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-3 max-w-xl text-sm leading-relaxed text-muted"
        >
          A selection of product interfaces and systems. Open a project detail to see the role, stack, and decisions behind it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-6"
        >
          <ProjectsFilter
            categories={CATEGORIES}
            active={active}
            onChange={setActive}
          />
        </motion.div>
      </div>

      <ProjectsGallery projects={filtered} />
    </section>
  );
}
