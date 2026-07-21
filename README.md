# Paing Htet Aung — Portfolio

A modern, animation-forward personal portfolio built to show off frontend craft:
custom cursor, magnetic buttons, smooth inertia scrolling, an interactive particle
canvas, scroll-driven timeline, split-text reveals and 3D-tilt project cards.

## Tech

- **React 18** + **Vite**
- **Framer Motion** — reveals, scroll progress, magnetic & tilt interactions
- **Lenis** — smooth inertia scrolling
- **Canvas** — interactive particle constellation in the hero

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

All resume content (profile, skills, experience, projects, education) lives in a
single file: [`src/data/resume.js`](src/data/resume.js). Update values there and
the whole site updates.

## Structure

```
src/
  components/   reusable UI + interactions (Cursor, Magnetic, Reveal, AnimatedText, Navbar, AuroraCanvas)
  sections/     page sections (Hero, About, Skills, Experience, Projects, Contact)
  hooks/        useLenis smooth-scroll hook
  data/         resume.js — single source of truth for content
  styles/       global + app styles
```

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll, particle animation, transitions).
- Custom cursor only activates on fine-pointer devices.
- Particle canvas pauses when the tab is hidden.
