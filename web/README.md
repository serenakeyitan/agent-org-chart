# Agent Org Charts — 图鉴

An interactive catalog for browsing the org charts in this repository.

## Features

- **Home**: Card grid showing all available charts with title, role count, and source attribution
- **Detail**: Interactive org chart visualization with click-to-select role nodes
- **Side Panel**: View role details including name, kind, summary, persona, in_scope, and out_of_scope
- **Copy Actions**:
  - "Copy this bot" — copies selected role instruction with grounded metadata
  - "Copy whole team" — copies full team instruction including all roles, routines, and handoffs

## Development

```bash
cd web
npm install
npm run dev
```

The dev server runs at http://localhost:5173 by default.

## Build

```bash
npm run build
```

The build output is in `dist/`. During build, chart data is copied from `../charts/` to the public folder.

## Deploy to GitHub Pages

The app is configured for static deployment. After building:

1. The `dist/` folder contains all static files
2. Charts are bundled at `dist/charts/`
3. Can be deployed to GitHub Pages, Vercel, Netlify, or any static host

For GitHub Pages, you can use the `gh-pages` package:

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

Or configure GitHub Actions to deploy from `web/dist`.

## Architecture

- **Vite + React + TypeScript** — fast builds and type safety
- **Tailwind CSS** — utility-first styling with soft neutral palette
- **Chart data** — loaded from `charts/index.json` and individual `chart.json` files
- **No hardcoded data** — all role information comes from the source chart files

## Design

- Quiet, comfortable UI with soft neutrals and one accent color
- Responsive layout: side panel stacks below chart on mobile
- Smooth highlight/dim transitions when selecting roles
- Light/dark mode support via system preference
