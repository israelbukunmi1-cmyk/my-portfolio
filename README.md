# Portfolio

A single-page, statically exported portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. Deploys to GitHub Pages via GitHub Actions — after the first push, every change to `main` publishes automatically.

All content lives in `src/content/content.ts`. Edit that one file to update your details; no component code needs to change.

## Setup

Requirements: Node.js 18.18 or newer, npm.

```bash
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:3000
npm run build        # production build + static export to ./out
npm run typecheck    # TypeScript check (no emit)
```

Preview the production export locally:

```bash
npx serve out
```

## Where to put your details

Open `src/content/content.ts`. Every editable string is typed and documented in that file:

- **Identity + socials** — `name`, `headline`, `about`, `email`, `githubUrl`, `linkedinUrl`, `whatsappNumber`, `siteUrl`, `sourceRepoUrl`, `headshotImage`
- **Projects** — add an object to the `projects` array with `slug`, `name`, `stack`, `outcome`, `liveUrl`, `repoUrl`, `image`
- **Testimonials** — add an object to the `testimonials` array with `quote`, `name`, `role`, `company`
- **Video testimonial** — set `videoTestimonial.videoId` to a YouTube ID. While it reads `"placeholder"`, the site renders a neutral "Video coming soon" block instead of the player.

### Add a project, step by step

1. Drop an image at `public/projects/<slug>.png` (see specs below).
2. Add a `Project` object to `content.projects`:

```ts
{
  slug: "my-project",
  name: "My Project",
  stack: ["Next.js", "TypeScript"],
  outcome: "One line about what it does and the result.",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/you/my-project",
  image: "/projects/my-project.png",
},
```

3. `npm run build && npm run typecheck`, commit, push. Done.

### Add a written testimonial

```ts
{
  quote: "A short quote in their words.",
  name: "Jane Doe",
  role: "Product Manager",
  company: "Some Company",
},
```

Add it to `content.testimonials` and push. The 3-column reviews grid handles any count up to the available column space; keep it to a handful of quotes.

## Asset specs

Replace the placeholders in `public/` with your real assets at these exact paths:

| Asset | Path | Spec |
| --- | --- | --- |
| Headshot | `public/headshot.png` | 800×800 px, square, under 100 KB. A compressed `.webp` at the same path also works. |
| Project images | `public/projects/<slug>.png` | 1200×750 px (16:10-ish, cropped to the card's `aspect-video`), keep under ~150 KB each. One per project, named after its `slug`. |
| Resume | `public/resume.pdf` | Your CV. Opened in a new tab from the Hero "Resume" button. |
| Social card | `public/og-image.png` | 1200×630 px, used for Open Graph / Twitter card previews. |
| Favicon | `public/favicon.ico` | 32×32. |
| Apple touch icon | `public/apple-touch-icon.png` | 180×180 px. |

Images are served unoptimized (Next's image optimizer does not run on a static host), so compress before committing: PNG via `pngquant` or a WebP export at ~80% quality is plenty for screenshots.

## GitHub Pages setup

1. Push this repository to GitHub. The repo can be named `<username>.github.io` (root URL) or anything else (subpath URL).
2. Go to **Settings → Pages** in the repo.
3. Under **Source**, select **GitHub Actions** — *not* "Deploy from a branch". The workflow in `.github/workflows/deploy.yml` takes over publishing from here. (If it asks, leave it on "GitHub Actions" and let the first push enable Pages.)
4. Push to `main`. The workflow builds the static export and publishes it.
5. Once the first run completes, the URL is shown under **Settings → Pages → Deployments / Sites** (also in the Actions run summary).

### Subpath vs root URL

- Repo named `<username>.github.io` → site at `https://<username>.github.io`. No config change needed.
- Any other repo name → site at `https://<username>.github.io/<repo-name>`. Uncomment and set `basePath` and `assetPrefix` in `next.config.mjs` (the file has a commented block explaining exactly which lines to change). Update `content.siteUrl` in `src/content/content.ts` to the final URL.

### Notes

- `public/.nojekyll` stops GitHub Pages from running Jekyll over the exported `_next` folder.
- No contact form backend, API routes, or middleware — this site is 100% static by design.
- Dark mode follows the OS theme via `prefers-color-scheme`; motion is disabled under `prefers-reduced-motion`.