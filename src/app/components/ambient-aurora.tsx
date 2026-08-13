"use client";

// Single continuous ambient background for the whole page, mounted once
// (e.g. in layout.tsx or page.tsx, as the first child, before Hero/Footer).
// Previously Hero and Footer each rendered their own AmbientAurora/AmbientGrid
// with opacity tied to that section's own scroll progress. Because those two
// progress ranges don't perfectly overlap, there was a window where BOTH
// faded near-zero at the same time — the visible "patah" gap between them.
// A single fixed layer behind everything removes that seam entirely: it's
// always there, so no cross-section fade math has to line up.

export const AMBIENT_STYLES = `
@keyframes ambient-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.9; }
}
.animate-ambient-breathe {
  animation: ambient-breathe 8s ease-in-out infinite alternate;
}

.ambient-grid-pattern {
  background-size: 60px 60px;
  background-attachment: fixed;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
}

.ambient-aurora-glow {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--accent) 18%, transparent) 0%,
    color-mix(in oklch, var(--accent-glow) 18%, transparent) 40%,
    transparent 70%
  );
}
`;

export function SiteAmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="ambient-grid-pattern absolute inset-0" />
      <div className="ambient-aurora-glow animate-ambient-breathe absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
    </div>
  );
}
