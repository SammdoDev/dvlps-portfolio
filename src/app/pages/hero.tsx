"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LiquidMetalButton } from "../components/liquid-metal-button";
import {
  IconCloud,
  TechHoverPanel,
  type HoveredTech,
} from "../components/icon-cloud";
import { SparkleFrame } from "@/components/ui/sparkle-frame";

const TECH_SLUGS = [
  "typescript",
  "javascript",
  "html5",
  "css3",
  "git",
  "flutter",
  "android",
  "nodedotjs",
  "nestjs",
  "postgresql",
  "prisma",
  "firebase",
  "docker",
  "jest",
  "gitlab",
  "androidstudio",
  "vercel",
  "react",
];

const HERO_FACTS = [
  ["Focus", "Product UI"],
  ["Stack", "Next.js + TS"],
  ["Mode", "Remote / Jakarta"],
] as const;

export default function Hero({ id = "top" }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredTech, setHoveredTech] = useState<HoveredTech>(null);

  // exit: hero scrolling away, top of viewport onward
  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // entrance: hero arriving from below the viewport — this is the phase
  // that overlaps with the footer above it exiting, so the two can hand
  // off to each other visually
  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const textY = useTransform(exitProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(exitProgress, [0, 0.7], [1, 0]);

  const cardY = useTransform(exitProgress, [0, 1], [0, -160]);
  const cardScale = useTransform(exitProgress, [0, 1], [1, 0.9]);
  const cardOpacity = useTransform(exitProgress, [0, 0.6], [1, 0]);

  const blobExitY = useTransform(exitProgress, [0, 1], ["0%", "40%"]);
  const blobExitScale = useTransform(exitProgress, [0, 1], [1, 1.3]);

  // mirrors the footer's SAMMDO zoom-out: blob grows in from small +
  // transparent as the hero rises into view, roughly meeting the footer
  // text's fade-out timing above it
  const blobEnterScale = useTransform(enterProgress, [0, 1], [0.5, 1]);
  const blobEnterOpacity = useTransform(enterProgress, [0, 1], [0, 1]);

  // combine: enter phase ramps opacity/scale up 0->1, exit phase then
  // takes over ramping further — each hook clamps outside its own range,
  // so multiplying them together gives a single continuous curve
  const blobY = blobExitY;
  const blobScale = useTransform(
    [blobEnterScale, blobExitScale],
    ([enter, exit]: number[]) => enter * exit,
  );
  const blobOpacity = useTransform(
    [blobEnterOpacity],
    ([enter]: number[]) => enter * 0.3, // 0.3 matches original opacity-30 cap
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative overflow-hidden px-4 pb-24 pt-40 sm:pt-48"
    >
      <motion.div
        aria-hidden
        style={{ y: blobY, scale: blobScale, opacity: blobOpacity }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[120px] z-0"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono-tag text-[11px] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            Building{" "}
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-black footer-text-glow tracking-tighter mb-4 text-center"
            >
              interfaces
            </motion.span>{" "}
            that feel as solid as the systems behind them.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-muted"
          >
            Frontend-leaning Full Stack Developer working across{" "}
            <span className="font-mono-tag text-foreground/90">Next.js</span>,{" "}
            <span className="font-mono-tag text-foreground/90">TypeScript</span>
            , <span className="font-mono-tag text-foreground/90">Laravel</span>{" "}
            and <span className="font-mono-tag text-foreground/90">React</span>{" "}
            — shipping enterprise dashboards, fintech PWAs, and data platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <LiquidMetalButton
              label="View Projects"
              onClick={() => {
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <LiquidMetalButton
              label="Contact Me"
              variant="secondary"
              onClick={() => {
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </motion.div>
          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 grid max-w-lg grid-cols-3 border-y border-white/[0.09] py-4"
          >
            {HERO_FACTS.map(([label, value]) => (
              <div
                key={label}
                className="border-r border-white/[0.09] px-3 first:pl-0 last:border-0"
              >
                <dt className="font-mono-tag text-[9px] uppercase tracking-[0.16em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-[11px] font-medium text-foreground/85 sm:text-xs">
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
        <motion.div
          style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
        >
          <SparkleFrame>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <IconCloud iconSlugs={TECH_SLUGS} onIconHover={setHoveredTech} />
              <TechHoverPanel tech={hoveredTech} />
            </motion.div>
          </SparkleFrame>
        </motion.div>
      </div>
    </section>
  );
}
