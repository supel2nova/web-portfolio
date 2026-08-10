# supel2nova.dev

Personal portfolio for **Panupong Yapradith** — frontend-focused Software Engineer.

Single-page site with scroll-driven motion, dark/light theme, and content driven by TypeScript data files (no CMS).

## Features

- Intro splash + magnetic cursor accents
- Sections: Hero, Skills, Projects, Experience, Contact
- Project feature modals with screenshots
- Dark / light theme (persisted)
- `prefers-reduced-motion` support
- Resume PDF download

## Stack

| Layer  | Tech                                            |
| ------ | ----------------------------------------------- |
| UI     | React 19, TypeScript                            |
| Build  | Vite 8                                          |
| Styles | Tailwind CSS v4                                 |
| Motion | GSAP + `@gsap/react` + ScrollTrigger            |
| Icons  | `@thesvg/react`                                 |
| Deploy | Cloudflare Workers (static assets via Wrangler) |

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server                             |
| `npm run build`     | Typecheck + production build → `dist/` |
| `npm run preview`   | Preview production build locally       |
| `npm run typecheck` | `tsc --noEmit`                         |
| `npm run lint`      | Oxlint + Prettier check                |
| `npm run format`    | Format with Prettier                   |
| `npm run deploy`    | Build + deploy to Cloudflare Workers   |

## Project structure

```
src/
  components/   # UI sections + shared pieces
  context/      # Theme provider
  data/         # All editable content
  hooks/        # Theme + reduced-motion
  lib/          # Animation / asset helpers
  types/        # Shared TypeScript types
public/         # Static files (favicon, CV PDF)
```

## Edit content

Content lives in `src/data/` — change those files, not hard-coded copy in components.

| File            | What it controls                         |
| --------------- | ---------------------------------------- |
| `profile.ts`    | Name, role, bio, facts, resume path      |
| `skills.ts`     | Skill grid + icons                       |
| `projects.ts`   | Project cards, tags, feature screenshots |
| `experience.ts` | Work history                             |
| `contact.ts`    | Email, phone, social links               |
| `nav.ts`        | Nav labels / anchors                     |

Resume PDF: `public/Panupong_Yapradith_CV.pdf` (referenced by `RESUME_URL` in `profile.ts`).

Project screenshots: under `src/assets/` (wired via `src/lib/assets.ts`).

## CI / Deploy

Single workflow: `.github/workflows/ci.yml`

- **check** — lint, typecheck, build (push + PR)
- **deploy** — Cloudflare Workers, only after check passes on `main`

Repo secret required for deploy:

| Secret                 | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` | API token — use template **Edit Cloudflare Workers** |

`account_id` is set in `wrangler.jsonc`. `CLOUDFLARE_ACCOUNT_ID` secret is optional (overrides config).

Concurrency is per job: `check` cancels superseded runs, `deploy` queues instead — so a push during
a deploy never cancels `wrangler deploy` halfway.

### Cloudflare Workers Builds

GitHub Actions is the only deploy path. **Workers Builds** (Cloudflare's own git-connected CI) must
stay disconnected — if it is connected, every push deploys twice and it fails with:

> The build token selected for this build has been deleted or rolled and cannot be used for this build.

That token lives in the Cloudflare dashboard, not in this repo. Either disconnect the build
(Workers & Pages → the Worker → Settings → Builds → disconnect) or pick a valid build token there.

## Deploy

Build output is a static SPA. Wrangler serves `dist/` as Cloudflare Workers assets (`wrangler.jsonc`).

```bash
npm run deploy
```

Local auth: `npx wrangler login` once.

## SEO

- `index.html` carries title, description, canonical, Open Graph and a `Person` JSON-LD block
  (name, `alternateName` supel2nova / Supernova, job title, location, skills).
- `public/robots.txt` + `public/sitemap.xml` point at `https://supel2nova.dev/`.
- The hero name is the page's single `<h1>`.

The JSON-LD is inline, so its **sha256 is pinned in `public/_headers`**. Editing that block changes
the hash — recompute it or the CSP will silently drop the structured data:

```bash
npm run build
node -e "const h=require('crypto').createHash('sha256');const m=require('fs').readFileSync('dist/index.html','utf8').match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);h.update(m[1]);console.log('sha256-'+h.digest('base64'))"
```

## Security

`public/_headers` (served by Cloudflare Workers static assets):

| Header                      | Effect                                                    |
| --------------------------- | --------------------------------------------------------- |
| `Content-Security-Policy`   | Only same-origin scripts; Google Fonts allowed explicitly |
| `Strict-Transport-Security` | HTTPS only, 1 year, `preload`                             |
| `X-Content-Type-Options`    | No MIME sniffing                                          |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                         |
| `Permissions-Policy`        | Camera / mic / geolocation / payment off                  |
| `frame-ancestors 'none'`    | No embedding — blocks clickjacking                        |

The site has no forms, no API and no user input, so the remaining surface is transport and
embedding, which the headers above cover. Rate limiting / bot protection is Cloudflare-side
(WAF, Bot Fight Mode) — not configured from this repo.

## License

Private portfolio — all rights reserved.
