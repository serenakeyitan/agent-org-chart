# Agent Org Charts — 图鉴

An interactive catalog for browsing the org charts in this repository.

## Features

- **Home**: Plates grouped by Galaxy day, each with a miniature of the army's shape, role count, and credit
- **Detail**: Radial org chart (lead at the center, reports on an orbit, peers sharing a ring); click a node to select it and dim the rest. `←`/`→` browse, `Esc` clears. Narrow screens get a vertical tree.
- **Side Panel**: Army overview (summary, legend, routines, sources) or the selected role's brief: kind, summary, reporting lines, persona, in_scope, out_of_scope
- **Copy Actions**:
  - "Copy this bot" — copies selected role instruction with grounded metadata
  - "Copy this army" — copies full army instruction including all roles, routines, and handoffs
- **Links**: `#/<chart-id>` and `#/<chart-id>/<role-id>` are shareable

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
