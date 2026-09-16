import { content } from "@/content/content";

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="wrap flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} {content.name}. All rights reserved.
        </p>
        <a
          href={content.sourceRepoUrl}
          target="_blank"
          rel="noopener"
          className="font-mono text-xs text-ink-muted transition-colors hover:text-brand"
        >
          Source on GitHub
        </a>
      </div>
    </footer>
  );
}