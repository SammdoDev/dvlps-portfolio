import { Footer } from "./pages/footer";
import Hero from "./pages/hero";
import Navbar from "./pages/navbar";
import Projects from "./pages/projects/projects";
import { Skiper19 } from "@/components/ui/svg-follow-scroll";
import { MinimalTechParallax } from "@/components/ui/minimal-tech-parallax";
import { WorkLayers } from "@/components/ui/work-layers";
import { AvailabilitySection } from "@/components/ui/availability-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <>
        <main>
          <Hero />
          <MinimalTechParallax />
          <Projects />
          <Skiper19 />
          <WorkLayers />

          <section id="about" className="border-y border-white/[0.06] px-4 py-24 sm:py-32">
            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[0.7fr_1.3fr] sm:gap-16">
              <p className="font-mono-tag text-xs uppercase tracking-[0.22em] text-accent">
                About / 02
              </p>
              <div>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  A calm interface for complex work.
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  I turn product requirements into clear, durable web experiences—balancing thoughtful interaction design with the engineering detail that keeps a system dependable.
                </p>
              </div>
              <div className="mt-10 grid gap-3 sm:col-start-2 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.1] bg-surface/70 p-4">
                  <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">01 / Intent</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">Start with the decision a user needs to make.</p>
                </div>
                <div className="rounded-xl border border-white/[0.1] bg-surface/70 p-4">
                  <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">02 / Structure</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">Turn recurring patterns into a system, not a one-off screen.</p>
                </div>
                <div className="rounded-xl border border-white/[0.1] bg-surface/70 p-4">
                  <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">03 / Momentum</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">Keep shipping while preserving room for the next iteration.</p>
                </div>
              </div>
            </div>
          </section>
          <AvailabilitySection />

          <section className="hidden">
            <div className="mx-auto max-w-5xl text-muted">
              Experience section — coming soon.
            </div>
          </section>
          <section id="about-placeholder" className="hidden">
            <div className="mx-auto max-w-5xl text-muted">
              About section — coming soon.
            </div>
          </section>
        </main>
        <Footer />
      </>
    </>
  );
}
