"use client";

import { useState } from "react";
import { content } from "@/content/content";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M8 5.14v13.72l11-6.86-11-6.86z" />
    </svg>
  );
}

export default function VideoTestimonial() {
  const { videoId, summary } = content.videoTestimonial;
  const [playing, setPlaying] = useState(false);

  if (videoId === "placeholder") {
    return (
      <div className="flex h-full flex-col rounded-xl border border-hairline bg-panel p-6">
        <div className="flex aspect-video items-center justify-center rounded-lg border border-hairline bg-app">
          <span className="font-mono text-xs text-ink-muted">Video coming soon</span>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{summary}</p>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-hairline bg-panel p-6">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Video testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{summary}</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video testimonial"
      className="flex h-full w-full flex-col rounded-xl border border-hairline bg-panel p-6 text-left transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-hairline bg-app">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-contrast">
          <PlayIcon />
        </span>
      </span>
      <span className="mt-4 text-[15px] leading-relaxed text-ink-muted">{summary}</span>
    </button>
  );
}