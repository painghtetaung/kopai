# CLAUDE.md

## Current design (September 2026)

The portfolio has been redesigned with a warm paper background, blue ink accents,
Inter Tight / Instrument Serif / DM Mono typography, native scrolling and cursors,
and an interactive SVG sculpture. The current section order is Hero, Projects,
About, Experience, Skills, Arcade, Contact. Project details and the arcade use
native dialogs; experience, education, and toolkit use native details elements.
The old cursor, particle field, and Lenis helpers are retained but not mounted.
The older visual descriptions below describe the previous design. For current
design tokens and layout, consult src/styles/index.css and src/styles/app.css.
Content still belongs in src/data/resume.ts, including the studio introduction.
Project artwork is explicitly an interface study, not a production screenshot.
Keep the game engine lazy-loaded and respect reduced-motion preferences.

Project context for Claude Code. This is a personal portfolio site for Paing Htet Aung,
a Frontend Developer. The site is itself a showcase of frontend craft — animation and
interaction are the point, not decoration.

## Stack

- **React 18** + **Vite** + **TypeScript** (strict mode; `.tsx`/`.ts`)
- **Framer Motion** — all reveals, scroll-linked animation, magnetic & tilt interactions
- **Lenis** — smooth inertia scrolling (`src/hooks/useLenis.js`)
- **Canvas 2D** — interactive particle field in the hero (`src/components/AuroraCanvas.tsx`)
- No CSS framework — hand-written CSS with custom properties (design tokens) in `src/styles/`

## Commands

```bash
npm install       # install deps
npm run dev       # dev server (http://localhost:5173)
npm run typecheck # tsc --noEmit (strict)
npm run build     # tsc && vite build -> dist/
npm run preview   # preview the production build
```

There are no unit tests. "Verify it works" = `npm run build` succeeds (which runs
`tsc` first, so it also type-checks) and the dev server renders without console errors.
TypeScript is **strict** with `noUnusedLocals`/`noUnusedParameters` — keep it clean.

## Where things live

```
src/
  data/resume.ts        <- SINGLE SOURCE OF TRUTH for all content.
                           Edit profile, skills, experience, projects, education HERE.
                           Do not hardcode resume content inside components.
  sections/             <- one file per page section, composed in App.tsx in order:
      Hero, About, Skills, Experience, Projects, Arcade, Contact
  games/                <- the 3D arcade (React Three Fiber). Lazy-loaded.
      GameCanvas.tsx     hosts <Canvas>, switches the active game (the lazy chunk
                         that pulls in three/fiber/drei — keeps it out of the main bundle)
      Runner.tsx         Neon Runner: endless dodge, score by distance, localStorage 'runner-best'
      OrbCollector.tsx   collect 8 orbs on a grid, timed, localStorage 'orbs-best'
      Playground.tsx     physics toybox: custom gravity + floor/wall bounce + mouse-fling
      useGameInput.ts    shared directional input (keyboard + on-screen d-pad) -> one ref
      types.ts           shared game types (GameKey, GameInput, HudData, ...)
  components/            <- reusable UI + interaction primitives:
      Cursor.tsx         magnetic custom cursor (dot + spring-lagged ring)
      Magnetic.tsx       wraps children so they pull toward the pointer on hover
      Reveal.tsx         fade/slide-in on scroll (whileInView, triggers once)
      AnimatedText.tsx   splits a string into words and reveals them with a mask-up
      Navbar.tsx         fixed nav + top scroll-progress bar
      AuroraCanvas.tsx   the hero particle constellation
  hooks/useLenis.ts     smooth scroll + in-page anchor handling
  styles/
      index.css         global reset, design tokens (:root vars), fonts, base
      app.css           all section/component styling (large file, organized by section)
```

## Conventions

- **Content changes go in `src/data/resume.ts`.** Components read from it.
- **Design tokens** are CSS custom properties in `src/styles/index.css` `:root`
  (`--accent`, `--bg`, `--text`, etc). Change the palette there, not per-component.
- **Accent color** is `--accent` (#7c6cff purple); secondary accents `--accent-2` (blue),
  `--accent-3` (green). The `.grad-text` class applies the signature gradient to text.
- **Fonts:** Space Grotesk (display/headings, `--font-display`), Inter (body).
- **Interactive elements** get `data-cursor="hover"` so the custom cursor reacts to them.
- **Animation easing:** the house curve is `[0.22, 1, 0.36, 1]` (ease-out expo-ish).
  Reuse it for consistency.
- **Accessibility:** everything must respect `prefers-reduced-motion` (Lenis, the canvas,
  and CSS transitions already gate on it). The custom cursor only enables on
  fine-pointer devices. Keep these guards when adding motion.

## Common tasks

- **Add/edit a job:** edit the `experience` array in `src/data/resume.ts`. The timeline
  renders automatically; `mode: 'Current'` gives the "Now" badge + highlighted card.
- **Add a project:** add an object to `projects` in `resume.ts` (give it an `accent` hex —
  it colors the card's glare and bar).
- **Change skills:** edit the `skills` array (grouped) and the `marquee` list in
  `src/sections/Skills.tsx` if you want different words scrolling.
- **Update links (GitHub/LinkedIn/email):** `profile.socials` and `profile.email` in `resume.ts`.
- **Add a new section:** create `src/sections/Foo.tsx`, style it in `app.css`, and add it to
  `App.tsx`. Use `<Reveal>` for scroll-in and add an `id` if it needs a nav link (add the
  link to the `links` array in `Navbar.tsx`).

## The 3D arcade (`src/games/`)

- Built with **React Three Fiber** (`@react-three/fiber` v8 + `@react-three/drei` v9 +
  `three` — pinned to React-18-compatible versions). Do not bump fiber to v9 (needs React 19).
- **Lazy-loaded:** `Arcade.tsx` does `lazy(() => import('../games/GameCanvas'))`, so three.js
  (~220 KB gzip) only downloads when a visitor starts a game. Keep it that way — never import
  from `games/` outside the lazy `GameCanvas` chunk.
- **Per-frame logic uses refs, not state.** Games mutate positions inside `useFrame` and only
  push HUD numbers to React ~10×/sec (throttled) via the `onHud` callback. Don't call setState
  every frame.
- **Restart** = remount: `Arcade` bumps a `runId` used as the game's React `key`.
- Each game sets its own `<PerspectiveCamera makeDefault>`, lights and colors — self-contained.
- All geometry is procedural (no model/texture/font assets) so nothing needs fetching.

## Deployment

Static Vite build. `npm run build` -> `dist/`. Deploy `dist/` to Netlify or Vercel
(both are already installed on the repo). No server needed. For SPA hosting no rewrites
are required since it's a single page.

## Git

Work is on branch `claude/session-6s3awe`. Default branch is `main` (empty until merged).
