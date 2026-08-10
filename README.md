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

GitHub Actions:

- `.github/workflows/ci.yml` — lint, typecheck, build on push/PR to `main`
- `.github/workflows/deploy.yml` — build + `wrangler deploy` on push to `main`

Repo secrets required for deploy:

| Secret                  | Purpose                            |
| ----------------------- | ---------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Token with Workers edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID              |

## Deploy

Build output is a static SPA. Wrangler serves `dist/` as Cloudflare Workers assets (`wrangler.jsonc`).

```bash
npm run deploy
```

Local auth: `npx wrangler login` once.

## License

Private portfolio — all rights reserved.
