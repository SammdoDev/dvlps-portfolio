"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";

export type HoveredTech = { title: string; desc: string } | null;

export type DynamicCloudProps = {
  iconSlugs: string[];
  /** Called with the hovered/focused icon, or null when nothing is active. */
  onIconHover?: (tech: HoveredTech) => void;
};

const IconCloudRenderer = dynamic(
  () =>
    import("./icon-cloud-renderer").then(
      (module) => module.IconCloudRenderer,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{ width: "100%", minHeight: 330, height: 330, paddingTop: 24 }}
      />
    ),
  },
);

/**
 * react-icon-cloud creates random canvas IDs. Loading it only in the browser
 * keeps the server HTML deterministic and prevents hydration mismatches.
 */
export function IconCloud(props: DynamicCloudProps) {
  return <IconCloudRenderer {...props} />;
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
