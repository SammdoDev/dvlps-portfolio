"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

const SPARKLES = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 96}%`,
  top: `${(index * 53 + 7) % 92}%`,
  size: index % 5 === 0 ? 7 : index % 3 === 0 ? 4 : 2,
  delay: (index % 8) * 0.23,
}));

/** Interactive, asset-free visual frame. It can wrap a profile image later. */
export function SparkleFrame({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerX = useSpring(useMotionValue(180), { stiffness: 180, damping: 22 });
  const pointerY = useSpring(useMotionValue(180), { stiffness: 180, damping: 22 });

  function moveGlow(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  }

  return (
    <div
      ref={frameRef}
      onPointerMove={moveGlow}
      onPointerLeave={() => {
        const rect = frameRef.current?.getBoundingClientRect();
        pointerX.set((rect?.width ?? 360) / 2);
        pointerY.set((rect?.height ?? 360) / 2);
      }}
      className="group relative isolate rounded-[2rem]"
    >
      <motion.div
        aria-hidden
        style={{ left: pointerX, top: pointerY }}
        className="pointer-events-none absolute z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[2rem]">
        {SPARKLES.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]"
            style={{ left: sparkle.left, top: sparkle.top, width: sparkle.size, height: sparkle.size }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.35, 0.7] }}
            transition={{ duration: 2.4 + (sparkle.id % 4) * 0.35, delay: sparkle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-[1.015]">
        {children}
      </div>
      <p className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-background/50 px-3 py-1.5 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
        Move to explore
      </p>
    </div>
  );
}
