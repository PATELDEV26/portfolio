# Dev Patel Portfolio

An original cinematic portfolio for Dev Patel, built with React, TypeScript, Vite, TanStack Start, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:8080`.

Production checks:

```bash
npm run build
npx tsc --noEmit
```

## Content and assets

- Portfolio data: `src/content/metro.ts`
- Main experience: `src/routes/index.tsx`
- Visual system: `src/styles.css`
- Resume: `public/media/Dev_Patel_Resume_MS_Admissions_Updated.pdf`
- Portrait and certificates: `public/media/`
- Project screenshots: `public/exhibits/<project-slug>/`

Project screenshots use numbered filenames such as `01.jpg`, `02.jpg`, and `03.jpg`. When the number of screenshots changes, update that project's `images` array in `src/content/metro.ts`.

## Interaction notes

- Select any project chapter to open its full-screen story and screenshot gallery.
- Press `Escape` to close an open project.
- Motion is automatically shortened when `prefers-reduced-motion` is enabled.
- Contact uses a direct `mailto:` link and requires no backend.
