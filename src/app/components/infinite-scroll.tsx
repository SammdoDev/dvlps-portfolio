"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

let cloneId = 0;

const InfiniteScroll = ({ children }: { children: ReactNode }) => {
  const [clones, setClones] = useState<number[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // fires while the sentinel is still ~1 viewport away from actually
    // being on screen, so the next clone is already mounted and painted
    // by the time the user scrolls into it — no pop-in, no stutter
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setClones((prev) => [...prev, cloneId++]);
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* the real, interactive content */}
      <div>{children}</div>

      {/* decorative repeats appended forward as the user approaches the
          end — scrollTop is never touched, so the browser's native
          momentum/inertia never gets interrupted or reversed */}
      {clones.map((id) => (
        <div
          key={id}
          aria-hidden="true"
          className="pointer-events-none select-none"
        >
          {children}
        </div>
      ))}

      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
    </>
  );
};

export default InfiniteScroll;
