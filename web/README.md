# Agent Army

The web catalog for this repository: every org chart as a branch of one tree, on an infinite canvas.

## How it works

- **Overview** (`#/`): Agent Army → wings (Go-to-market, Build, Small teams) → teams. Teams start collapsed so the whole catalog fits on one screen.
- **Team** (`#/<chart-id>`): clicking a team opens its branch along the reporting lines in `chart.json` (orchestrator → specialists; peers side by side) and opens a panel with the import prompt, routines, and source. Click the team again to collapse it.
- **Bot** (`#/<chart-id>?role=<role-id>`): clicking a person shows their summary and **Copy this bot**.
- **Search**: type a role ("Designer"); matching teams open and matching bots are highlighted.
- **Canvas**: drag to pan, scroll to pan, ⌘/Ctrl + scroll or pinch to zoom, **Fit all** to reset.
- **Move this team in**: copies `Import <id> from https://github.com/serenakeyitan/agent-org-chart`, the one-line prompt an agent follows via `PROTOCOL.md`.
- **Team order**: set in `src/lib/catalog.ts`. A chart missing from that list still appears, under "More teams".

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
