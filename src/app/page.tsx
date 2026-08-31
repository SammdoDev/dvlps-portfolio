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
      <main>
        <Hero />
        <MinimalTechParallax />
        <Projects />
        <Skiper19 />
        <WorkLayers />

        <section
          id="about"
          className="border-y border-white/[0.06] px-4 py-24 sm:py-32"
        >
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[0.7fr_1.3fr] sm:gap-16">
            <p className="font-mono-tag text-xs uppercase tracking-[0.22em] text-accent">
              About / 04
            </p>
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                A practical partner for products that need to work.
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                I build web and mobile experiences that make complex work feel
                clear. My approach connects product thinking, interface craft,
                and implementation detail so a good idea can become a
                dependable product.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                From an early concept to a growing platform, I focus on the
                decisions that matter: understanding the user, shaping the
                right flow, building a maintainable system, and iterating with
                purpose after launch.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:col-start-2 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.1] bg-surface/70 p-4">
                <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">
                  01 / Product thinking
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  Start with the problem, the audience, and the decision each
                  screen should support.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] bg-surface/70 p-4">
                <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">
                  02 / Durable systems
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  Turn recurring patterns into flexible components and
                  foundations that can grow.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] bg-surface/70 p-4">
                <p className="font-mono-tag text-[10px] uppercase tracking-[0.18em] text-muted">
                  03 / Steady delivery
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  Ship useful increments while keeping room for feedback and
                  the next iteration.
                </p>
              </div>
            </div>

            <div className="grid gap-8 border-t border-white/[0.08] pt-8 sm:col-start-2 sm:grid-cols-2">
              <div>
                <p className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-accent">
                  Working style
                </p>
                <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-foreground/80">
                  <li>Clear communication, early alignment, and visible progress.</li>
                  <li>Thoughtful defaults for responsiveness, accessibility, and performance.</li>
                  <li>A collaborative process that values questions as much as execution.</li>
                </ul>
              </div>
              <div>
                <p className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-accent">
                  What I enjoy building
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Dashboards, operational tools, product platforms, and mobile
                  experiences where information needs to be useful at a glance
                  and reliable in daily use.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The best work pairs a calm, intentional interface with an
                  engineering foundation the next team can confidently extend.
                </p>
              </div>
            </div>
          </div>
        </section>
        <AvailabilitySection />
      </main>
      <Footer />
    </>
  );
}
