import InfiniteScroll from "./components/infinite-scroll";
import { Footer } from "./pages/footer";
import Hero from "./pages/hero";
import Navbar from "./pages/navbar";
import Projects from "./pages/projects/projects";
import TechStack from "./pages/tech-stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <InfiniteScroll>
        <main>
          <Hero />
          <TechStack />
          <Projects />

          <section id="experience" className="px-4 py-20">
            <div className="mx-auto max-w-5xl text-muted">
              Experience section — coming soon.
            </div>
          </section>
          <section id="about" className="px-4 py-20">
            <div className="mx-auto max-w-5xl text-muted">
              About section — coming soon.
            </div>
          </section>
        </main>
        <Footer />
      </InfiniteScroll>
    </>
  );
}
