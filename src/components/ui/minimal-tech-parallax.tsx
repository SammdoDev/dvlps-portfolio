"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STACK = ["Next.js", "TypeScript", "React", "Laravel", "PostgreSQL", "Docker"];
const PRINCIPLES = ["Fast initial load", "Accessible by default", "Built to evolve"];

/**
 * A self-contained parallax section built only with type, borders and light.
 * It deliberately needs no images or external assets.
 */
export function MinimalTechParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -180]);
  const headlineY = useTransform(scrollYProgress, [0, 0.55], [45, -16]);
  const cardLeftY = useTransform(scrollYProgress, [0.15, 0.8], [110, -46]);
  const cardRightY = useTransform(scrollYProgress, [0.15, 0.8], [155, -82]);
  const cardRotate = useTransform(scrollYProgress, [0.15, 0.8], [5, -2]);

  return (
    <section ref={sectionRef} id="stack" className="relative h-[175vh] bg-background">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-4 py-20">
        <motion.div
          aria-hidden
          style={{ y: gridY }}
          className="pointer-events-none absolute inset-x-0 -top-36 h-[130%] opacity-30"
        >
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        </motion.div>

        <motion.div
          aria-hidden
          style={{ y: orbY }}
          className="pointer-events-none absolute left-[58%] top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div style={{ y: headlineY }}>
            <p className="mb-5 font-mono-tag text-xs uppercase tracking-[0.26em] text-accent">01 — engineering stack</p>
            <h2 className="max-w-xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.07em] text-foreground sm:text-7xl">
              Minimal surface.
              <br />
              Serious systems.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              A deliberately quiet interface lets the product logic take the lead. Every detail earns its place.
            </p>
            <div className="mt-8 grid max-w-md gap-2 border-t border-white/[0.1] pt-5">
              {PRINCIPLES.map((principle, index) => (
                <div key={principle} className="flex items-center justify-between font-mono-tag text-[11px] text-muted">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-foreground/80">{principle}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative mx-auto h-[365px] w-full max-w-md sm:h-[410px]">
            <motion.article
              style={{ y: cardLeftY, rotate: cardRotate }}
              className="absolute left-0 top-7 w-[76%] rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl sm:p-6"
            >
              <div className="flex items-center justify-between font-mono-tag text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>System / 01</span><span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <p className="mt-14 font-display text-3xl font-medium tracking-tight text-foreground">Fast by design.</p>
              <div className="mt-7 h-px bg-white/10" />
              <p className="mt-4 font-mono-tag text-xs text-muted">PERFORMANCE · ACCESSIBILITY · CLARITY</p>
            </motion.article>

            <motion.article
              style={{ y: cardRightY }}
              className="absolute bottom-0 right-0 w-[72%] rounded-2xl border border-accent/30 bg-[#111116]/90 p-5 shadow-[0_25px_65px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6"
            >
              <div className="flex items-center justify-between font-mono-tag text-[10px] uppercase tracking-[0.2em] text-accent">
                <span>Core tools</span><span>06</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 font-mono-tag text-[11px] text-foreground/80">{item}</span>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
