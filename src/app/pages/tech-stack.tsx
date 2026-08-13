"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

import type { IconType } from "react-icons";

import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiFlutter,
  SiAndroid,
  SiReact,
  SiFirebase,
  SiDocker,
  SiNestjs,
  SiJest,
  SiPostgresql,
  SiNodedotjs,
  SiPrisma,
  SiGitlab,
  SiAndroidstudio,
  SiGit,
  SiVercel,
  SiCss,
} from "react-icons/si";
import { LiquidMetalButton } from "../components/liquid-metal-button";

type Tech = {
  name: string;
  Icon: IconType;
  color: string;
  desc: string;
};

const CENTER: Tech = {
  name: "React",
  Icon: SiReact,
  color: "#61DAFB",
  desc: "Component-based UI library di balik hampir semua kerjaan frontend-ku.",
};

const RINGS: {
  radius: string;
  duration: number;
  direction: 1 | -1;
  items: Tech[];
}[] = [
  {
    radius: "clamp(64px, 19vw, 104px)",
    duration: 34,
    direction: 1,

    items: [
      {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        desc: "Typed superset of JavaScript — nangkep bug sebelum sampai runtime.",
      },
      {
        name: "JavaScript",
        Icon: SiJavascript,
        color: "#F7DF1E",
        desc: "Bahasa yang dipahami tiap browser, masih jadi tulang punggung.",
      },
      {
        name: "HTML5",
        Icon: SiHtml5,
        color: "#E34F26",
        desc: "Markup semantik — struktur dasar tiap halaman yang aku ship.",
      },
      {
        name: "CSS3",
        Icon: SiCss,
        color: "#1572B6",
        desc: "Fundamental styling, layout, dan animasi di balik tiap desain.",
      },
      {
        name: "Git",
        Icon: SiGit,
        color: "#F05032",
        desc: "Version control — jaring pengaman untuk tiap baris kode.",
      },
    ],
  },

  {
    radius: "clamp(112px, 31vw, 172px)",
    duration: 52,
    direction: -1,

    items: [
      {
        name: "Flutter",
        Icon: SiFlutter,
        color: "#02569B",
        desc: "Toolkit Google untuk bikin app native-feel dari satu codebase.",
      },
      {
        name: "Android",
        Icon: SiAndroid,
        color: "#3DDC84",
        desc: "Native Android development buat ship ke Play Store.",
      },
      {
        name: "Node.js",
        Icon: SiNodedotjs,
        color: "#5FA04E",
        desc: "Runtime JavaScript yang menggerakkan sebagian besar API backend-ku.",
      },
      {
        name: "NestJS",
        Icon: SiNestjs,
        color: "#E0234E",
        desc: "Framework Node backend yang terstruktur & TypeScript-first.",
      },
      {
        name: "PostgreSQL",
        Icon: SiPostgresql,
        color: "#4169E1",
        desc: "Database relasional andalan untuk apa pun yang butuh reliable.",
      },
      {
        name: "Prisma",
        Icon: SiPrisma,
        color: "#5A67D8",
        desc: "ORM type-safe yang bikin query database tetap jujur.",
      },
    ],
  },

  {
    radius: "clamp(160px, 43vw, 246px)",
    duration: 74,
    direction: 1,

    items: [
      {
        name: "Firebase",
        Icon: SiFirebase,
        color: "#FFCA28",
        desc: "Auth, realtime data, dan hosting buat side project yang gerak cepat.",
      },
      {
        name: "Docker",
        Icon: SiDocker,
        color: "#2496ED",
        desc: "Containerize app biar 'works on my machine' bukan lelucon lagi.",
      },
      {
        name: "Jest",
        Icon: SiJest,
        color: "#C21325",
        desc: "Unit & integration testing biar refactor nggak bikin rusak.",
      },
      {
        name: "GitLab",
        Icon: SiGitlab,
        color: "#FC6D26",
        desc: "Repo hosting & CI/CD pipeline buat build dan deploy otomatis.",
      },
      {
        name: "Android Studio",
        Icon: SiAndroidstudio,
        color: "#3DDC84",
        desc: "IDE resmi buat build dan debug aplikasi Android.",
      },
      {
        name: "Vercel",
        Icon: SiVercel,
        color: "#FFFFFF",
        desc: "Deploy & preview zero-config buat project Next.js-ku.",
      },
    ],
  },
];

function OrbitIcon({
  tech,
  angle,
  duration,
  direction,
  paused,
  onEnter,
  onLeave,
}: {
  tech: Tech;
  angle: number;
  duration: number;
  direction: 1 | -1;
  paused: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleEnter = () => {
    setOpen(true);
    onEnter();
  };

  const handleLeave = () => {
    setOpen(false);
    onLeave();
  };

  return (
    <div
      className={`orbit-pos absolute left-1/2 top-1/2 ${
        open ? "z-[9999]" : "z-10"
      }`}
      style={
        {
          transform: `
            rotate(${angle}deg)
            translateX(calc(var(--r) * var(--spread)))
            rotate(${-angle}deg)
          `,
        } as React.CSSProperties
      }
    >
      <div
        className="orbit-counter -translate-x-1/2 -translate-y-1/2"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === 1 ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onFocus={handleEnter}
          onBlur={handleLeave}
        >
          <LiquidMetalButton
            viewMode="icon"
            icon={
              <tech.Icon
                style={{
                  color: tech.color,
                  filter: `drop-shadow(0 0 5px ${tech.color}55)`,
                }}
                className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
              />
            }
            onClick={() => {
              setOpen((v) => !v);
              onEnter();
            }}
          />
        </div>

        {/* DESCRIPTION */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 6,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 6,
                scale: 0.95,
              }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              className="
                glass-card
                absolute
                bottom-full
                left-1/2
                z-[9999]
                mb-3
                w-56
                -translate-x-1/2
                rounded-xl
                px-3.5
                py-3
                text-left
                shadow-[0_12px_30px_rgba(0,0,0,0.45)]
              "
            >
              <div className="mb-1 flex items-center gap-1.5 font-display text-xs font-semibold text-foreground">
                <tech.Icon
                  style={{ color: tech.color }}
                  className="h-3.5 w-3.5 shrink-0"
                />

                {tech.name}
              </div>

              <p className="font-sans text-[11px] leading-relaxed text-muted">
                {tech.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TechStack() {
  const [active, setActive] = useState<Tech | null>(null);
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);

  const orbitRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: orbitRef,
    offset: ["start end", "end start"],
  });

  const spread = useTransform(scrollYProgress, [0, 1], [0.15, 5]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 1, 1, 0.3],
  );

  return (
    <section id="stack" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-mono-tag text-xs text-accent"
        >
          02 / stack
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Tools I reach for daily
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-sm text-muted"
        >
          Hover (atau tap) badge yang lagi mengorbit buat lihat itu dipakai
          untuk apa.
        </motion.p>

        <motion.div
          ref={orbitRef}
          style={
            {
              "--spread": spread,
              scale,
              opacity,
            } as unknown as React.CSSProperties
          }
          className="orbit-visual relative mx-auto mt-12 aspect-square w-full max-w-[560px]"
        >
          {RINGS.map((ring, i) => (
            <div
              key={`rail-${i}`}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
              style={{
                width: `calc(var(--r${i}) * 2)`,
                height: `calc(var(--r${i}) * 2)`,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="glass-card flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
              style={{
                boxShadow: `
                  0 0 0 1px ${CENTER.color}40,
                  0 0 32px ${CENTER.color}55
                `,
              }}
            >
              <CENTER.Icon
                style={{ color: CENTER.color }}
                className="h-8 w-8 sm:h-9 sm:w-9"
              />
            </div>
          </motion.div>

          <div
            className="absolute inset-0"
            style={
              {
                "--r0": RINGS[0].radius,
                "--r1": RINGS[1].radius,
                "--r2": RINGS[2].radius,
              } as React.CSSProperties
            }
          >
            {RINGS.map((ring, ringIndex) => (
              <div
                key={ringIndex}
                className="orbit-ring absolute inset-0"
                data-dir={ring.direction}
                style={
                  {
                    animationDuration: `${ring.duration}s`,
                    animationPlayState:
                      hoveredRing === ringIndex ? "paused" : "running",
                    "--r": `var(--r${ringIndex})`,
                  } as React.CSSProperties
                }
              >
                {ring.items.map((tech, i) => {
                  const angle = (360 / ring.items.length) * i + ringIndex * 18;

                  return (
                    <OrbitIcon
                      key={tech.name}
                      tech={tech}
                      angle={angle}
                      duration={ring.duration}
                      direction={ring.direction}
                      paused={hoveredRing === ringIndex}
                      onEnter={() => {
                        setHoveredRing(ringIndex);
                        setActive(tech);
                      }}
                      onLeave={() => {
                        setHoveredRing(null);
                        setActive(null);
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
