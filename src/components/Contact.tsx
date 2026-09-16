import { content } from "@/content/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const LINKS = [
  {
    label: "Email",
    hint: content.email,
    href: `mailto:${content.email}`,
  },
  {
    label: "GitHub",
    hint: content.githubUrl.replace(/^https:\/\/(www\.)?/, ""),
    href: content.githubUrl,
  },
  {
    label: "LinkedIn",
    hint: content.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""),
    href: content.linkedinUrl,
  },
  {
    label: "WhatsApp",
    hint: `wa.me/${content.whatsappNumber}`,
    href: `https://wa.me/${content.whatsappNumber}`,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <SectionHeading
            index="04 · Contact"
            title="Say hello"
            note="Questions, project briefs, or a coffee — pick the channel you prefer."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener"}
                className="group flex items-center justify-between gap-4 rounded-xl border border-hairline bg-panel p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span>
                  <span className="block font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
                    {link.label}
                  </span>
                  <span className="mt-2 block truncate text-[15px] font-medium text-ink group-hover:underline">
                    {link.hint}
                  </span>
                </span>
                <span aria-hidden="true" className="text-ink-muted transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}