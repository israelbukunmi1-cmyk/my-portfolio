import { content } from "@/content/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VideoTestimonial from "@/components/VideoTestimonial";

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <SectionHeading
            index="02 · Reviews"
            title="What people say"
            note="A video walkthrough and two written notes from people I&rsquo;ve shipped with."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal className="h-full">
            <VideoTestimonial />
          </Reveal>

          {content.testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} className="h-full" delay={index * 80}>
              <figure className="flex h-full flex-col rounded-xl border border-hairline bg-panel p-6">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 font-mono text-xs leading-relaxed text-ink-muted">
                  {testimonial.name}, {testimonial.role}, {testimonial.company}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}