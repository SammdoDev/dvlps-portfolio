"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const ROADMAP = [
  { stage: "01", label: "SD", title: "Rasa ingin tahu", detail: "Membangun fondasi: mengamati, bertanya, dan mencoba." },
  { stage: "02", label: "SMP", title: "Eksplorasi logika", detail: "Mulai menyusun cara berpikir yang lebih terstruktur." },
  { stage: "03", label: "SMA", title: "Membuat pertama kali", detail: "Ide berubah menjadi eksperimen, proyek, dan kebiasaan belajar." },
  { stage: "04", label: "NOW", title: "Shipping systems", detail: "Merancang pengalaman digital yang jelas, cepat, dan dapat diandalkan." },
] as const;

const Skiper19 = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <section
      ref={ref}
      id="experience"
      className="relative h-[220vh] border-y border-white/[0.06] bg-surface"
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(255,255,255,0.10),transparent_28%)]" />
        <div className="relative mx-auto w-full max-w-5xl">
          <div className="mb-10 max-w-xl sm:mb-14">
            <p className="font-mono-tag text-xs uppercase tracking-[0.24em] text-accent">Roadmap / journey</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-6xl">
              Growing through
              <br />
              every version.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Sebuah garis waktu sederhana tentang fondasi, eksplorasi, dan karya yang terus berkembang.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl pl-10 sm:pl-20">
            <LinePath className="absolute -left-6 top-0 h-full w-28 sm:left-0 sm:w-40" scrollYProgress={scrollYProgress} />
            <div className="relative grid gap-4 sm:gap-5">
              {ROADMAP.map((item, index) => (
                <RoadmapEntry key={item.stage} item={item} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Skiper19 };

function RoadmapEntry({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof ROADMAP)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index * 0.18;
  const opacity = useTransform(scrollYProgress, [start, start + 0.16], [0.35, 1]);
  const x = useTransform(scrollYProgress, [start, start + 0.2], [28, 0]);

  return (
    <motion.article style={{ opacity, x }} className="group rounded-2xl border border-white/[0.09] bg-background/70 p-4 backdrop-blur-sm transition-colors hover:border-accent/50 sm:grid sm:grid-cols-[88px_1fr] sm:items-start sm:gap-5 sm:p-5">
      <div className="flex items-center gap-3 font-mono-tag text-xs text-accent sm:block">
        <span className="block text-[10px] tracking-[0.22em] text-muted">{item.stage}</span>
        <span className="mt-1 inline-block rounded-full border border-accent/30 bg-accent/10 px-2 py-1 font-medium tracking-[0.16em]">{item.label}</span>
      </div>
      <div className="mt-4 sm:mt-0">
        <h3 className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">{item.title}</h3>
        <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">{item.detail}</p>
      </div>
    </motion.article>
  );
}

function LinePath({ className, scrollYProgress }: { className: string; scrollYProgress: MotionValue<number> }) {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);

  return (
    <svg viewBox="0 0 160 540" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <motion.path
        d="M80 4C22 44 130 82 80 136C30 190 130 230 80 280C30 332 130 380 80 432C48 466 70 500 80 536"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ pathLength, strokeDashoffset }}
      />
    </svg>
  );
}
