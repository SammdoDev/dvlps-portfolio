"use client";

import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";

const SERVICES = ["Product interfaces", "Design systems", "Web platforms"];

export function AvailabilitySection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface px-4 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.12),transparent_26%)]" />
      <div className="relative mx-auto grid max-w-5xl gap-10 rounded-[2rem] border border-white/[0.1] bg-background/60 p-6 backdrop-blur-sm sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-3 py-1 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
            Open for selected work
          </div>
          <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
            Have a thoughtful problem to solve?
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Mari ubah ide yang rumit menjadi produk digital yang terasa jelas, cepat, dan siap berkembang.
          </p>
          <div className="mt-8"><ContactForm /></div>
        </div>

        <div className="border-t border-white/[0.1] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-mono-tag text-[10px] uppercase tracking-[0.22em] text-muted">Typical collaboration</p>
          <ul className="mt-5 space-y-4">
            {SERVICES.map((service) => (
              <li key={service} className="flex items-center gap-3 text-sm text-foreground/90">
                <CheckCircle2 size={16} className="shrink-0 text-accent" />
                {service}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-white/[0.1] pt-5">
            <p className="font-mono-tag text-[10px] uppercase tracking-[0.22em] text-muted">First steps</p>
            <div className="mt-3 grid gap-2 font-mono-tag text-[11px] text-foreground/75">
              <p><span className="mr-3 text-muted">01</span>Share the context</p>
              <p><span className="mr-3 text-muted">02</span>Align the scope</p>
              <p><span className="mr-3 text-muted">03</span>Choose a clear next step</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
