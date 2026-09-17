export interface Project {
  slug: string;
  name: string;
  stack: string[];
  outcome: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
}

export interface WrittenTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface SiteContent {
  name: string;
  headline: string;
  about: string[];
  siteUrl: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
  resumeUrl: string;
  sourceRepoUrl: string;
  headshotImage: string;
  projects: Project[];
  videoTestimonial: {
    videoId: string;
    summary: string;
  };
  testimonials: WrittenTestimonial[];
}

/*
 * NOTE: Everything in this file is PLACEHOLDER content — name, socials,
 * projects and reviews are all stand-ins so the site builds and looks right.
 * Replace the values below with your real details; no other file needs to
 * change for content edits.
 *
 * Asset paths refer to files in /public (see README for exact specs).
 * Set videoTestimonial.videoId to a real YouTube ID ("placeholder" hides the
 * player and shows a "coming soon" block instead).
 */
export const content: SiteContent = {
  name: "Alex Carter",
  headline: "Full-stack developer building fast, reliable web apps.",
  about: [
    "I'm a full-stack developer who turns product ideas into fast, accessible web applications. I work primarily in TypeScript and React, usually with Next.js and Tailwind CSS on the front end, backed by Node.js and PostgreSQL when there is real logic to do.",
    "I care about the parts that separate working software from credible software: clean architecture, typed contracts, automated tests, and performance budgets. When a page loads in under a second and a screen reader can move through it without a fight, the details are done.",
  ],
  siteUrl: "https://israelbukunmi1-cmyk.github.io/my-portfolio",
  email: "hello@example.com",
  githubUrl: "https://github.com/alexcarter",
  linkedinUrl: "https://www.linkedin.com/in/alexcarter",
  whatsappNumber: "15551234567",
  resumeUrl: "/resume.pdf",
  sourceRepoUrl: "https://github.com/alexcarter/alexcarter.github.io",
  headshotImage: "/headshot.png",

  projects: [
    {
      slug: "ledger",
      name: "Ledger",
      stack: ["Next.js", "TypeScript", "PostgreSQL"],
      outcome: "A double-entry bookkeeping dashboard for freelancers, with monthly rollups and export.",
      liveUrl: "https://example.com/ledger",
      repoUrl: "https://github.com/alexcarter/ledger",
      image: "/projects/ledger.png",
    },
    {
      slug: "pulse",
      name: "Pulse",
      stack: ["React", "TypeScript", "WebSocket"],
      outcome: "A real-time analytics board that keeps key metrics in one glanceable view.",
      liveUrl: "https://example.com/pulse",
      repoUrl: "https://github.com/alexcarter/pulse",
      image: "/projects/pulse.png",
    },
    {
      slug: "format",
      name: "Format",
      stack: ["Node.js", "TypeScript", "React"],
      outcome: "A Markdown-to-PDF document pipeline wrapped in a drag-and-drop editor.",
      liveUrl: "https://example.com/format",
      repoUrl: "https://github.com/alexcarter/format",
      image: "/projects/format.png",
    },
  ],

  videoTestimonial: {
    videoId: "placeholder",
    summary: "A two-minute conversation with a founder about what it was like shipping together.",
  },

  testimonials: [
    {
      quote:
        "Alex rebuilt our checkout in two weeks and conversion jumped 23%. The code was clean enough that our own team took over without a handover document.",
      name: "Maya Chen",
      role: "Product Lead",
      company: "Northwind Labs",
    },
    {
      quote:
        "The rare developer who argues about accessibility budgets as hard as about feature work. Our scores finally look respectable.",
      name: "Jonas Weber",
      role: "CTO",
      company: "Baltic Systems",
    },
  ],
};