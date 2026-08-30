"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import {
  Cloud,
  fetchSimpleIcons,
  type ICloud,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: 330,
      height: 330,
      paddingTop: 24,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: null,
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

/**
 * name/desc keyed by the simple-icons slug you pass in `iconSlugs`. Extend
 * this alongside `iconSlugs` when you add a new tech.
 */
export const TECH_DESCRIPTIONS: Record<string, string> = {
  typescript:
    "Typed superset of JavaScript — nangkep bug sebelum sampai runtime.",
  javascript: "Bahasa yang dipahami tiap browser, masih jadi tulang punggung.",
  html5: "Markup semantik — struktur dasar tiap halaman yang aku ship.",
  css3: "Fundamental styling, layout, dan animasi di balik tiap desain.",
  git: "Version control — jaring pengaman untuk tiap baris kode.",
  flutter: "Toolkit Google untuk bikin app native-feel dari satu codebase.",
  android: "Native Android development buat ship ke Play Store.",
  nodedotjs:
    "Runtime JavaScript yang menggerakkan sebagian besar API backend-ku.",
  nestjs: "Framework Node backend yang terstruktur & TypeScript-first.",
  postgresql: "Database relasional andalan untuk apa pun yang butuh reliable.",
  prisma: "ORM type-safe yang bikin query database tetap jujur.",
  firebase:
    "Auth, realtime data, dan hosting buat side project yang gerak cepat.",
  docker: "Containerize app biar 'works on my machine' bukan lelucon lagi.",
  jest: "Unit & integration testing biar refactor nggak bikin rusak.",
  gitlab: "Repo hosting & CI/CD pipeline buat build dan deploy otomatis.",
  androidstudio: "IDE resmi buat build dan debug aplikasi Android.",
  vercel: "Deploy & preview zero-config buat project Next.js-ku.",
  react:
    "Component-based UI library di balik hampir semua kerjaan frontend-ku.",
};

export type HoveredTech = { title: string; desc: string } | null;

/**
 * Renders one icon. Hover/focus is reported up via callbacks instead of a
 * CSS ::after tooltip anchored to the icon itself — the cloud's items get
 * repositioned by 3D transforms on every frame, which made a per-icon
 * floating tooltip flicker and clip against the container edge. A single
 * fixed panel driven by React state (see IconCloud below) doesn't have
 * that problem.
 */
function renderCustomIcon(
  icon: SimpleIcon,
  theme: string,
  onHover: (tech: HoveredTech) => void,
) {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  const slug =
    typeof icon.slug === "string" ? icon.slug : icon.title.toLowerCase();
  const desc = TECH_DESCRIPTIONS[slug] ?? "";
  const tech: HoveredTech = { title: icon.title, desc };

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      className: "icon-cloud-item",
      onClick: (e: React.MouseEvent) => e.preventDefault(),
      onMouseEnter: () => onHover(tech),
      onMouseLeave: () => onHover(null),
      onFocus: () => onHover(tech),
      onBlur: () => onHover(null),
    },
  });
}

export type DynamicCloudProps = {
  iconSlugs: string[];
  /** Called with the hovered/focused icon, or null when nothing's active. */
  onIconHover?: (tech: HoveredTech) => void;
};

export function IconCloud({ iconSlugs, onIconHover }: DynamicCloudProps) {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof fetchSimpleIcons>
  > | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light", onIconHover ?? (() => {})),
    );
  }, [data, theme, onIconHover]);

  return (
    // @ts-ignore — Cloud's children typing doesn't like a fragment of nodes
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}

export function TechHoverPanel({ tech }: { tech: HoveredTech }) {
  return (
    <div className="relative min-h-[52px] pt-3">
      <AnimatePresence mode="wait">
        {tech ? (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <p className="font-display text-[13px] font-semibold text-foreground">
              {tech.title}
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
              {tech.desc}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default IconCloud;
