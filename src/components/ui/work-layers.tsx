"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LAYERS = [
  {
    number: "01",
    title: "Product clarity",
    detail: "Menyederhanakan kebutuhan yang rumit menjadi alur yang mudah dipahami.",
    tag: "DISCOVER",
    output: "flows · priorities · product language",
  },
  {
    number: "02",
    title: "Interface systems",
    detail: "Membangun komponen yang konsisten, responsif, dan mudah dikembangkan.",
    tag: "DESIGN",
    output: "tokens · components · responsive states",
  },
  {
    number: "03",
    title: "Reliable delivery",
    detail: "Mengubah rancangan menjadi produk cepat dengan fondasi teknis yang tahan lama.",
    tag: "SHIP",
    output: "quality checks · handoff · iteration",
  },
] as const;

/** A calm parallax follow-up section for the roadmap. */
export function WorkLayers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headingY = useTransform(scrollYProgress, [0, 0.65], [40, -24]);
  const firstY = useTransform(scrollYProgress, [0.1, 0.75], [72, -12]);
  const secondY = useTransform(scrollYProgress, [0.1, 0.75], [112, -32]);
  const thirdY = useTransform(scrollYProgress, [0.1, 0.75], [156, -54]);
  const cardY = [firstY, secondY, thirdY];

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/[0.06] bg-background px-4 py-28 sm:py-36">
      <motion.div aria-hidden style={{ y: gridY }} className="pointer-events-none absolute inset-0 opacity-30">
        <div className="h-[130%] w-full bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_82%,transparent)]" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div style={{ y: headingY }} className="flex flex-col justify-between gap-6 border-b border-white/[0.1] pb-9 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tag text-xs uppercase tracking-[0.24em] text-accent">How I build</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              The layers behind a calm product.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
            Detail di balik layar menjaga pengalaman di depan tetap terasa sederhana.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {LAYERS.map((layer, index) => (
            <motion.article
              key={layer.number}
              style={{ y: cardY[index] }}
              className="group relative min-h-64 overflow-hidden rounded-2xl border border-white/[0.09] bg-surface/80 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-accent/50 sm:min-h-72"
            >
              <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between font-mono-tag text-xs">
                <span className="text-muted">/{layer.number}</span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] tracking-[0.16em] text-accent">{layer.tag}</span>
              </div>
              <div className="relative mt-16">
                <h3 className="font-display text-2xl font-medium tracking-tight text-foreground">{layer.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{layer.detail}</p>
              </div>
              <p className="absolute bottom-6 left-6 right-6 border-t border-white/[0.09] pt-3 font-mono-tag text-[9px] uppercase tracking-[0.14em] text-foreground/45">{layer.output}</p>
              <div aria-hidden className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
