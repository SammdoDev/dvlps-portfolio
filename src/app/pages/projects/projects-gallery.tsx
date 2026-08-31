"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { MotionValue } from "motion/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Hammer,
  ImageIcon,
  User,
  Users,
  X,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "./projects-data";

const CATEGORY_META = {
  solo: { label: "solo", Icon: User },
  duo: { label: "duo", Icon: Users },
  now: { label: "wip", Icon: Hammer },
} as const;

function ProjectImageDeck({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState(0);
  const image = project.images[activeImage];

  if (!image) {
    return (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, var(--accent-glow) 0%, transparent 60%), radial-gradient(circle at 80% 80%, var(--accent) 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/50">
          <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
          <span className="font-mono-tag text-[10px] uppercase tracking-widest">
            Add project images
          </span>
        </div>
      </>
    );
  }

  const selectImage = (index: number) => {
    setActiveImage((index + project.images.length) % project.images.length);
  };

  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />

      {project.images.length > 1 && (
        <>
          <div className="absolute inset-x-3 top-3 flex items-center justify-between">
            <span className="rounded-full border border-white/20 bg-black/45 px-2 py-1 font-mono-tag text-[10px] text-white/80 backdrop-blur-sm">
              {String(activeImage + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => selectImage(activeImage - 1)}
                aria-label="Previous project image"
                className="rounded-full border border-white/20 bg-black/45 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => selectImage(activeImage + 1)}
                aria-label="Next project image"
                className="rounded-full border border-white/20 bg-black/45 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex gap-2">
            {project.images.slice(0, 4).map((thumbnail, index) => (
              <button
                key={thumbnail.src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show image ${index + 1}: ${thumbnail.alt}`}
                aria-pressed={index === activeImage}
                className={`relative h-9 w-12 overflow-hidden rounded-md border transition-colors ${
                  index === activeImage
                    ? "border-white"
                    : "border-white/25 hover:border-white/60"
                }`}
              >
                <Image
                  src={thumbnail.src}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </button>
            ))}
            {project.images.length > 4 && (
              <span className="grid h-9 w-9 place-items-center rounded-md border border-white/25 bg-black/45 font-mono-tag text-[10px] text-white/80 backdrop-blur-sm">
                +{project.images.length - 4}
              </span>
            )}
          </div>
        </>
      )}
    </>
  );
}

function GalleryItem({
  project,
  index,
  total,
  scrollYProgress,
  onOpenDetail,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onOpenDetail: () => void;
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
            <ProjectImageDeck project={project} />
          </motion.div>
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
            <button
              type="button"
              onClick={onOpenDetail}
              className="flex items-center gap-1.5 font-mono-tag text-xs text-foreground transition-colors hover:text-accent"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              details
            </button>
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

function ProjectDetailDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onMouseDown={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onMouseDown={(event) => event.stopPropagation()}
        className="relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.16] bg-[#090909] p-6 shadow-2xl sm:p-8"
      >
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full border border-white/[0.14] p-2 text-muted transition-colors hover:border-white/40 hover:text-foreground" aria-label="Close details">
          <X className="h-4 w-4" />
        </button>
        <p className="font-mono-tag text-[11px] uppercase tracking-[0.2em] text-muted">Case study / {project.year}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{project.longDescription}</p>
        {project.images.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.images.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2 text-xs text-muted">
                  {image.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="mt-7 grid gap-6 border-y border-white/[0.1] py-6 sm:grid-cols-2">
          <div>
            <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">Role</p>
            <p className="mt-2 text-sm text-foreground">{project.role}</p>
          </div>
          <div>
            <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">Stack</p>
            <p className="mt-2 text-sm text-foreground">{project.tags.join(" · ")}</p>
          </div>
        </div>
        <ul className="mt-6 grid gap-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm text-foreground/85"><span className="font-mono-tag text-white/50">01</span>{highlight}</li>
          ))}
        </ul>
      </motion.article>
    </motion.div>
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
              onOpenDetail={() => setSelectedProject(project)}
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
      <ProjectDetailDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
