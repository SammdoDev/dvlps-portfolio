"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "glass-card shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-sm font-semibold"
        >
          <span className="font-mono-tag text-accent">~/</span>
          sammdo
        </a>

        <ul className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono-tag text-xs text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="glow-ring rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:border-accent/40"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
