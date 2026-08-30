"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ImageStreamHero, {
  type StreamImage,
} from "@/components/ui/image-stream-hero";

const STREAM_IMAGES: StreamImage[] = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern workspace with a monitor",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    alt: "Colourful interface design study",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    alt: "Team working around a table",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative studio meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Circuit board close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    alt: "Collaborative planning session",
  },
];

export default function GalleryStreamSection({
  id = "gallery",
}: {
  id?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  // Same two-phase pattern as Hero: exit tracks the section scrolling away
  // once it hits the top, entrance tracks it arriving from below so it can
  // hand off with whatever sits above it.
  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const textY = useTransform(exitProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(exitProgress, [0, 0.7], [1, 0]);

  // The corridor itself keeps animating on its own CSS loop regardless of
  // scroll (it's a background effect, not scroll-scrubbed) — what we tie to
  // scroll is how present it is: it fades/scales in as the section enters,
  // and gently recedes as it exits, so it reads as part of the same
  // parallax language as the hero's blob.
  const streamEnterOpacity = useTransform(enterProgress, [0, 1], [0, 1]);
  const streamExitOpacity = useTransform(exitProgress, [0, 1], [1, 0.35]);
  const streamOpacity = useTransform(
    [streamEnterOpacity, streamExitOpacity],
    ([enter, exit]: number[]) => enter * exit,
  );

  const streamEnterScale = useTransform(enterProgress, [0, 1], [0.92, 1]);
  const streamExitScale = useTransform(exitProgress, [0, 1], [1, 1.06]);
  const streamScale = useTransform(
    [streamEnterScale, streamExitScale],
    ([enter, exit]: number[]) => enter * exit,
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative overflow-hidden py-32"
    >
      <motion.div
        style={{ opacity: streamOpacity, scale: streamScale }}
        className="absolute inset-0"
      >
        <ImageStreamHero
          images={STREAM_IMAGES}
          cards={9}
          speed={18}
          axis={55}
          className="h-full w-full"
        />
        {/* fade the corridor into the page background at top/bottom so it
            reads as a section, not a hard-edged box */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono-tag text-[11px] text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          shipped screens
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
        >
          Interfaces, in motion.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-[15px] leading-relaxed text-muted"
        >
          Real screens from ERP dashboards, fintech PWAs, and data platforms
          shipped to production.
        </motion.p>
      </motion.div>
    </section>
  );
}
