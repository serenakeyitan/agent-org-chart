# Agent Army

The web catalog for this repository: pick an agent team and see its org chart on an infinite canvas, with the little people from the office sim.

## How it works

- **Team list** (left on desktop; the home screen on phones): every chart, grouped by what the team does (Go-to-market, Build, Small teams). Search by team or role ("Designer"). Click a team to show it. Desktop opens on the first team; on phones a picked team replaces the list until **← Teams**.
- **Canvas**: the team → its lead(s) → their reports, from `chart.json`. Orchestrators wear gold. Teams with routines show a clock and a count.
- **Team panel**: copy the one-line import prompt (`Import <id> from https://github.com/serenakeyitan/agent-org-chart`, which any agent can follow via `PROTOCOL.md`), copy `chart.json`, view it on GitHub, and see the team's routines. Click a bot for its summary and **Copy this bot**.
- **Routines**: each routine shows its schedule and its cron expression (`routines[].cron`); click one to copy that line, or **Copy all as crontab**. Event-driven routines (`routines[].trigger`) show as events with no cron.
- **Links**: `#/?team=sdr` and `#/?team=sdr&role=email`. Older links (`#/sdr`, `#/?hired=…`) still open the right team.
- **Canvas controls**: drag or scroll to pan, ⌘/Ctrl + scroll or pinch to zoom, **Fit all** to reset.
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
