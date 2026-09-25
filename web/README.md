# Agent Army Tower

The web catalog for this repository: every org chart is one floor of an isometric office tower.

## How it works

- **Lobby** (`#/`): the tower and a floor directory. Search by role (`#/?q=designer`) to light up the floors that have one.
- **Floor** (`#/<chart-id>`): the team's office, laid out from `chart.json`. An orchestrator gets the corner office and specialists sit in the open plan. A team of peers shares one table.
- **Clock**: one simulated weekday. Routines from `chart.json` fire at their scheduled times, and the orchestrator walks to the meeting room. Coffee runs and walking are ambient simulation, not chart data.
- **Move this team in**: copies `Import <id> from https://github.com/serenakeyitan/agent-org-chart`, the one-line prompt an agent follows via `PROTOCOL.md`. Selecting a bot (`?role=<id>`) lets you copy just that bot.
- **Blueprint** (`#/<chart-id>/blueprint`): the same team as a plain org chart.
- **Floor order**: set in `src/lib/catalog.ts`. A chart missing from that list still appears, on a top floor under "More teams".

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
