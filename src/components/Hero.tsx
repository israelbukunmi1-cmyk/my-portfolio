import Image from "next/image";
import Link from "next/link";
import { content } from "@/content/content";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="wrap flex flex-col items-center gap-8 pb-20 pt-16 text-center md:flex-row md:justify-between md:gap-16 md:pb-28 md:pt-24 md:text-left">
        <div className="md:order-2">
          <Image
            src={content.headshotImage}
            alt={`Portrait of ${content.name}`}
            width={800}
            height={800}
            priority
            className="h-36 w-36 rounded-full border-2 border-hairline object-cover"
          />
        </div>

        <div className="max-w-xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
            Hello, I&rsquo;m
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.02em] text-ink md:text-6xl">
            {content.name}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{content.headline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <a href="#projects" className="btn btn-primary">
              View projects
            </a>
            <Link href={content.resumeUrl} target="_blank" rel="noopener" className="btn btn-secondary">
              Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}