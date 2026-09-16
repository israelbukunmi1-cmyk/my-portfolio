interface SectionHeadingProps {
  index: string;
  title: string;
  note: string;
}

export default function SectionHeading({ index, title, note }: SectionHeadingProps) {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
        {index}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.015em] text-ink md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink-muted">{note}</p>
    </div>
  );
}