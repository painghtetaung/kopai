# Paing Htet Aung — Portfolio

A warm, editorial frontend portfolio built around “A little code. A lot of feeling.”
Oversized typography, blue ink, a reshaping SVG sculpture, and room for a little play.

## Run locally

```bash
npm install
npm run dev        # Vite development server
npm run build      # TypeScript checks + production build in dist/
npm run preview    # Preview the production build
```

## Content and design

- `src/data/resume.ts` contains the profile, work history, projects, education,
  skills, and personal introduction.
- `src/styles/index.css` contains design tokens, typography, and base styles.
- `src/styles/app.css` contains the page layout and responsive breakpoints.
- Fonts: Inter Tight, Instrument Serif, and DM Mono, loaded from Google Fonts
  with local fallback stacks.
- Project previews are original interface studies with sample data, not
  screenshots of production applications. Project dialogs describe the existing
  work history. Replace the previews with approved production images if available.
- Add only verified profile URLs to `profile.socials`.

## Interactions

- The opening unfolds in two masked headline reveals, followed by the introduction
  and CTA. The sculpture draws itself in, follows the mouse with a soft spring,
  and cycles between four geometric arrangements.
- The main CTA subtly follows the mouse. Keyboard focus remains on the link.
- Project illustrations drift 36 pixels over their scroll range, with independent
  hover treatments. Section reveals run once as content enters the viewport.
- Project details use native dialogs with animated entry and dismissal, Escape
  support, and focus restoration.
- Experience, education, and the full toolkit use native details elements with
  smooth height transitions in supporting browsers and instant native behavior
  otherwise.
- Contact includes an email link and a copy button with success/failure feedback.
- The existing React Three Fiber arcade loads only when someone starts a game.
  All three games retain their keyboard and touch controls.
- The page uses native scrolling and cursors. Motion respects reduced-motion
  preferences, with no continuously animated decoration.

The original cursor, particle field, and smooth-scroll helpers remain in the
repository for reference but are not imported by the redesigned page.

## Verification

Run `npm run build` and check the page in a browser. The build can report a large
chunk warning for the optional 3D engine; it remains separate from the initial
page bundle. Verify the sculpture, project dialogs, expandable history, copy
button, and arcade at desktop and mobile widths before deployment.
