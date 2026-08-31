"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  type ICloud,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud";
import type { DynamicCloudProps, HoveredTech } from "./icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
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

const TECH_DESCRIPTIONS: Record<string, string> = {
  nextdotjs: "A React framework for fast, production-ready web applications.",
  typescript: "A typed JavaScript superset for more reliable applications.",
  javascript: "The language behind interactive experiences on the web.",
  html5: "Semantic markup that gives every interface a solid structure.",
  css3: "Responsive layout, visual detail, and motion for polished UI.",
  tailwindcss: "A utility-first CSS framework for building consistent UI quickly.",
  laravel: "A full-stack PHP framework for elegant, practical web products.",
  php: "A mature server-side language that powers robust web applications.",
  git: "Version control that keeps collaborative work safe and traceable.",
  github: "Collaboration, code review, and automated workflows in one place.",
  flutter: "Google's toolkit for building expressive cross-platform apps.",
  android: "Native Android development for dependable mobile experiences.",
  nodedotjs: "A JavaScript runtime for fast, scalable backend services.",
  express: "A lightweight Node.js framework for flexible web APIs.",
  nestjs: "A structured, TypeScript-first framework for Node.js APIs.",
  postgresql: "A reliable relational database for production-ready data.",
  mysql: "A widely used relational database for dependable application data.",
  mongodb: "A flexible document database for evolving product data models.",
  redis: "An in-memory data store for caching, queues, and fast responses.",
  prisma: "A type-safe ORM that makes database work more predictable.",
  firebase: "Authentication, real-time data, and hosting for rapid delivery.",
  docker: "Container tooling that makes environments consistent everywhere.",
  linux: "A dependable operating system foundation for modern infrastructure.",
  nginx: "A high-performance web server and reverse proxy for production apps.",
  amazonwebservices: "Cloud infrastructure for scalable, reliable applications.",
  figma: "A collaborative space for translating product ideas into interface systems.",
  postman: "A practical toolkit for designing, testing, and documenting APIs.",
  vite: "A fast development environment for modern frontend projects.",
  jest: "Testing tools for confident refactors and dependable releases.",
  gitlab: "Source control and CI/CD pipelines for automated delivery.",
  androidstudio: "The official IDE for building and debugging Android apps.",
  vercel: "A streamlined platform for deploying modern web applications.",
  react: "A component-based library for thoughtful, interactive interfaces.",
};

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
  const tech: HoveredTech = {
    title: icon.title,
    desc: TECH_DESCRIPTIONS[slug] ?? "",
  };

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
      onClick: (event: React.MouseEvent) => event.preventDefault(),
      onMouseEnter: () => onHover(tech),
      onMouseLeave: () => onHover(null),
      onFocus: () => onHover(tech),
      onBlur: () => onHover(null),
    },
  });
}

export function IconCloudRenderer({
  iconSlugs,
  onIconHover,
}: DynamicCloudProps) {
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
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
