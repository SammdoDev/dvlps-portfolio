"use client";

import { useRef } from "react";
import type { MotionValue } from "motion/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { ExternalLink, Hammer, ImageIcon, User, Users } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "./projects-data";

const CATEGORY_META = {
  solo: { label: "solo", Icon: User },
  duo: { label: "duo", Icon: Users },
  now: { label: "wip", Icon: Hammer },
} as const;

function GalleryItem({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const meta = CATEGORY_META[project.category];

  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const local = useTransform(scrollYProgress, [segStart, segEnd], [0, 1]);

  const imageX = useTransform(local, [0, 1], [120, -120]);
  const ghostX = useTransform(local, [0, 1], [-60, 60]);
  const titleY = useTransform(local, [0, 0.5, 1], [40, 0, -40]);
  const contentOpacity = useTransform(local, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden px-6 sm:px-12">
      <motion.span
        style={{ x: ghostX }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-black leading-none text-white/[0.03]"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
      >
        <motion.div className="relative order-2 h-52 overflow-hidden rounded-lg sm:h-72 md:order-1">
          <motion.div style={{ x: imageX }} className="absolute inset-[-15%]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, var(--accent-glow) 0%, transparent 60%), radial-gradient(circle at 80% 80%, var(--accent) 0%, transparent 55%)",
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/50">
            <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
            <span className="font-mono-tag text-[10px] uppercase tracking-widest">
              add screenshot
            </span>
          </div>
        </motion.div>

        <div className="order-1 md:order-2">
          <div className="flex items-center gap-2 font-mono-tag text-[11px] uppercase tracking-widest text-muted">
            <span className="text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-white/20">/</span>
            <span>{String(total).padStart(2, "0")}</span>
            <span className="ml-3 flex items-center gap-1.5">
              <meta.Icon className="h-3 w-3" />
              {meta.label}
            </span>
          </div>

          <motion.h3
            style={{ y: titleY }}
            className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {project.title}
          </motion.h3>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {project.longDescription}
          </p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 font-mono-tag text-xs leading-relaxed text-foreground/80"
              >
                <span className="text-accent">▸</span>
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono-tag text-[11px] text-muted">
            {project.role} · {project.year}
            {project.collaborator && <> · {project.collaborator}</>}
          </p>
          <p className="mt-1 font-mono-tag text-[11px] text-accent">
            {project.tags.join("  ·  ")}
          </p>

          <div className="mt-5 flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="flex items-center gap-1.5 font-mono-tag text-xs text-muted transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                className="flex items-center gap-1.5 font-mono-tag text-xs text-muted transition-colors hover:text-foreground"
              >
                <SiGithub className="h-3.5 w-3.5" />
                code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActiveIndexLabel({
  value,
  total,
}: {
  value: MotionValue<number>;
  total: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(value, "change", (latest) => {
    if (ref.current) {
      const i = Math.min(total - 1, Math.max(0, Math.floor(latest)));
      ref.current.textContent = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }
  });

  return <span ref={ref}>{`01 / ${String(total).padStart(2, "0")}`}</span>;
}

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const n = Math.max(projects.length, 1);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // vw, not %: the track's own width is n*100vw, so a % offset would be
  // relative to that inflated width and overshoot by a factor of n
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(n - 1) * 100}vw`],
  );
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(n - 1, Math.floor(v * n)),
  );

  function jumpTo(i: number) {
    const el = targetRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (scrollable * i) / Math.max(n - 1, 1);
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (projects.length === 0) return null;

  return (
    <div
      ref={targetRef}
      style={{ height: `${n * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {projects.map((project, i) => (
            <GalleryItem
              key={project.title}
              project={project}
              index={i}
              total={n}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        <div className="absolute inset-x-0 bottom-8 mx-auto flex w-full max-w-md items-center gap-3 px-6">
          <span className="font-mono-tag text-[11px] text-muted">
            <ActiveIndexLabel value={activeIndex} total={n} />
          </span>
          <div className="relative h-px flex-1 bg-white/10">
            <motion.div
              style={{ scaleX: barScale }}
              className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
            />
            <div className="absolute inset-x-0 -top-[3px] flex justify-between">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to ${p.title}`}
                  className="group -mt-1 p-1"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-accent" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
