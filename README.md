# Portfolio

A single-page portfolio built with **plain HTML, CSS, and JavaScript** — no framework, no build step. Deploys to GitHub Pages automatically on every push to `main`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content and structure |
| `styles.css` | Styling, responsive layout, light/dark theme |
| `script.js` | Mobile menu, scroll-reveal animations, video player |
| `assets/` | Images, resume, favicon, social card |

## Making it yours

Everything lives in `index.html` — the browser-friendly version of this template has no separate content file.

1. Open `index.html` and replace the placeholder details (name, headline, social links, email, WhatsApp number).
2. Update the `<title>`, `<meta name="description">`, and Open Graph/Twitter tags in the `<head>`.
3. Replace the placeholder images in `assets/` (see specs below).
4. Commit and push — GitHub Actions publishes the change automatically.

Holding a quick edit session? Do a find-and-replace for `alexcarter`, `Alex Carter`, and `example.com` first — those cover most of the placeholders (the site name is now **Israel Bukunmi Akintoye**).

## Asset specs

| Asset | Path | Spec |
| --- | --- | --- |
| Headshot | `assets/headshot.png` | 800×800 px, square, under 100 KB. |
| Project images | `assets/projects/<name>.png` | 1200×750 px (16:10-ish, cropped by the card's `aspect-ratio`), keep under ~150 KB each. |
| Resume | `assets/resume.pdf` | Your CV, opened from the Hero "Resume" button. |
| Social card | `assets/og-image.png` | 1200×630 px for Open Graph / Twitter previews. |
| Favicon | `assets/favicon.ico` | 32×32. |
| Apple touch icon | `assets/apple-touch-icon.png` | 180×180 px. |

## Deployment

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**. (If already set from before, leave it.)
3. Every push to `main` runs `.github/workflows/deploy.yml`, which publishes the repository contents directly — no build step.

### Notes

- Uses **relative paths** for all links and assets, so it works at both a root URL (`<username>.github.io`) and a subpath (`<username>.github.io/<repo>`).
- `.nojekyll` stops GitHub Pages from running Jekyll over the files.
- Dark mode follows the OS theme via `prefers-color-scheme`; motion is disabled under `prefers-reduced-motion`.