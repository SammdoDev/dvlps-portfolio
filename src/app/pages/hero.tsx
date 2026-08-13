"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LiquidMetalButton } from "../components/liquid-metal-button";

const CODE_LINES = [
  { indent: 0, text: "const developer = {", accent: null },
  { indent: 1, text: "name: 'Sammdo',", accent: "'Sammdo'" },
  {
    indent: 1,
    text: "role: 'Frontend-leaning Full Stack',",
    accent: "'Frontend-leaning Full Stack'",
  },
  {
    indent: 1,
    text: "stack: ['Next.js', 'TypeScript', 'Laravel', 'React'],",
    accent: "['Next.js', 'TypeScript', 'Laravel', 'React']",
  },
  { indent: 1, text: "shipsToProd: true,", accent: "true" },
  { indent: 0, text: "};", accent: null },
];

function renderLine(text: string, accent: string | null) {
  if (!accent) return text;
  const i = text.indexOf(accent);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

export default function Hero({ id = "top" }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

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
        <motion.div style={{ y: textY, opacity: textOpacity }}>
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
                window.location.href = "#projects";
              }}
            />
            <LiquidMetalButton
              label="Contact Me"
              onClick={() => {
                window.location.href = "#contact";
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card relative rounded-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl opacity-40 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
              }}
            />
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono-tag text-[11px] text-muted">
                profile.ts
              </span>
            </div>
            <div className="font-mono-tag text-[13px] leading-relaxed">
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.6 + i * 0.12 }}
                  style={{ paddingLeft: `${line.indent * 16}px` }}
                  className="text-foreground/80"
                >
                  {renderLine(line.text, line.accent)}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mt-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
