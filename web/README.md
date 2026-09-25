# Agent Army

The web catalog for this repository. You're the boss: hire agent teams from the list and your org chart grows on an infinite canvas.

## How it works

- **Team list** (left; a drawer on phones): every chart, grouped by what the team does (Go-to-market, Build, Small teams). Search by team or role ("Designer"). Each row has two fixed actions: click the row to **look the team over**, and use the switch on the right to **＋ Hire** / **✓ Hired** (click again to let go).
- **Preview**: a team you're looking at but haven't hired hangs off You as a dashed "candidate" branch with its people, and the panel offers **＋ Hire this team**. Close the panel and the candidate goes away.
- **Canvas**: You (the boss) → each hired team → that team's reporting lines from `chart.json`. Bots are the little people from the office sim, with name tags; orchestrators wear gold. Hired team cards have a **×** to let them go.
- **Hiring never interrupts**: hiring from the list doesn't open a panel; the team joins your org and pulses once. Hiring and letting go both show a toast with **Undo**.
- **Team panel**: import prompt, `chart.json`, routines, source, and **Copy this bot** for a selected bot. A hired team shows "✓ In your org · Let go".
- **Your org bar**: copies one import line per hired team, e.g. `Import sdr from https://github.com/serenakeyitan/agent-org-chart`, for any agent that follows `PROTOCOL.md`.
- **Links**: the org lives in the hash, e.g. `#/?hired=sdr,marketing&team=sdr&role=email`. Old links like `#/sdr` still work (they hire and open that team).
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
