"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { LiquidMetalButton } from "../components/liquid-metal-button";
import { SlSocialLinkedin } from "react-icons/sl";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Frontend-Leaning Full Stack</span>{" "}
    <span className="text-primary/60">✦</span>
    <span>Next.js &amp; TypeScript</span>{" "}
    <span className="text-secondary/60">✦</span>
    <span>Ships To Prod</span> <span className="text-primary/60">✦</span>
    <span>Clean Code, Fast Iteration</span>{" "}
    <span className="text-secondary/60">✦</span>
    <span>Open To New Projects</span> <span className="text-primary/60">✦</span>
  </div>
);

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"], // full pass: footer enters -> fully exits
  });

  const giantY = useTransform(scrollYProgress, [0, 1], ["15vh", "-20vh"]);
  const giantScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.2]);
  const giantOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0, 1, 1, 0],
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        ref={wrapperRef}
        className="cinematic-footer-wrapper relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground"
      >
        {/* Giant background text */}
        <motion.div
          style={{ y: giantY, scale: giantScale, opacity: giantOpacity }}
          className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
        >
          SAMMDO
        </motion.div>

        {/* Diagonal Sleek Marquee */}
        <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
          <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* Main Center Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-4 text-center"
          >
            Let&apos;s build something.
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="mb-10 max-w-md text-center text-sm md:text-base text-muted-foreground"
          >
            Open to freelance work and full-time opportunities. Drop a line and
            let&apos;s talk about what you&apos;re building.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col items-center gap-6 w-full"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <LiquidMetalButton
                label="Email Me"
                viewMode="text"
                onClick={() => {
                  window.location.href = "mailto:hello@sammdo.dev";
                }}
              />
              <LiquidMetalButton
                label="View GitHub"
                viewMode="text"
                onClick={() => {
                  window.open(
                    "https://github.com/sammdo",
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
              <a
                href="https://linkedin.com/in/sammdo"
                className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <SlSocialLinkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href="#"
                className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground transition-colors"
              >
                Resume
              </a>
              <a
                href="#"
                className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground transition-colors"
              >
                Blog
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar / Credits */}
        <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
            © 2026 Sammdo. All rights reserved.
          </div>

          <LiquidMetalButton
            label="Back to top"
            viewMode="icon"
            icon={<ArrowUp size={16} style={{ color: "#666666" }} />}
            onClick={scrollToTop}
            className="order-3"
          />
        </div>
      </footer>
    </>
  );
}
