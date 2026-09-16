import { content } from "@/content/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <SectionHeading
            index="03 · About"
            title="How I work"
            note="The stack I reach for, and the standards I hold it to."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 flex max-w-2xl flex-col gap-6">
            {content.about.map((paragraph, index) => (
              <p key={index} className="text-[17px] leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}