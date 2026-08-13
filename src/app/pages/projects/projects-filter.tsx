"use client";

import { motion } from "motion/react";
import type { Category } from "./projects-data";

type FilterOption = { id: Category | "all"; label: string };

export function ProjectsFilter({
  categories,
  active,
  onChange,
}: {
  categories: FilterOption[];
  active: Category | "all";
  onChange: (id: Category | "all") => void;
}) {
  return (
    <div className="glass-card inline-flex flex-wrap gap-1 rounded-full p-1">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={`relative rounded-full px-4 py-2 font-mono-tag text-xs transition-colors duration-300 ${
            active === cat.id ? "text-background" : "text-muted hover:text-foreground"
          }`}
        >
          {active === cat.id && (
            <motion.span
              layoutId="active-category-pill"
              className="absolute inset-0 rounded-full bg-foreground"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}