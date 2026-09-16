import Image from "next/image";
import { content } from "@/content/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <SectionHeading
            index="01 · Projects"
            title="Things I&rsquo;ve built"
            note="Three projects that show how I work: typed end to end, tested, and shipped."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.projects.map((project, index) => (
            <Reveal key={project.slug} className="h-full" delay={index * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-panel transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden border-b border-hairline">
                  <Image
                    src={project.image}
                    alt={`${project.name} — screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
                  <p className="mt-2 font-mono text-xs text-brand">{project.stack.join(" · ")}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-muted">
                    {project.outcome}
                  </p>
                  <div className="mt-6 flex gap-6 border-t border-hairline pt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-sm font-medium text-brand transition-colors hover:text-brand-strong hover:underline"
                    >
                      Live demo →
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-sm font-medium text-brand transition-colors hover:text-brand-strong hover:underline"
                    >
                      Source
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}