# Paing Htet Aung — Portfolio

A modern, animation-forward personal portfolio built to show off frontend craft:
custom cursor, magnetic buttons, smooth inertia scrolling, an interactive particle
canvas, scroll-driven timeline, split-text reveals and 3D-tilt project cards.

## Tech

- **React 18** + **Vite** + **TypeScript** (strict)
- **React Three Fiber** (`@react-three/fiber` + `drei` + `three`) — the 3D arcade, lazy-loaded
- **Framer Motion** — reveals, scroll progress, magnetic & tilt interactions
- **Lenis** — smooth inertia scrolling
- **Canvas** — interactive particle constellation in the hero

## Getting started

```bash
npm install
npm run dev        # start dev server
npm run typecheck  # tsc --noEmit (strict)
npm run build      # tsc && vite build → dist/
npm run preview    # preview the production build
```

## Editing content

All resume content (profile, skills, experience, projects, education) lives in a
single file: [`src/data/resume.ts`](src/data/resume.ts). Update values there and
the whole site updates.

## Structure

```
src/
  components/   reusable UI + interactions (Cursor, Magnetic, Reveal, AnimatedText, Navbar, AuroraCanvas)
  sections/     page sections (Hero, About, Skills, Experience, Projects, Arcade, Contact)
  games/        the 3D arcade — Runner, OrbCollector, Playground (React Three Fiber, lazy-loaded)
  hooks/        useLenis smooth-scroll hook
  data/         resume.ts — single source of truth for content
  styles/       global + app styles
```

## The arcade

The **Play** section has three self-contained WebGL mini-games (Neon Runner,
Orb Collector, Physics Toybox) built with React Three Fiber. The whole 3D engine
is lazy-loaded — it only downloads when a visitor starts a game, so the initial
page stays light.

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll, particle animation, transitions).
- Custom cursor only activates on fine-pointer devices.
- Particle canvas pauses when the tab is hidden.
