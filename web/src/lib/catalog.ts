import type { Chart } from '../types'

export const REPO_URL = 'https://github.com/serenakeyitan/agent-org-chart'

export interface Wing {
  id: string
  label: string
  color: string
}

export const WINGS: Wing[] = [
  { id: 'gtm', label: 'Go-to-market', color: '#e76f51' },
  { id: 'build', label: 'Build', color: '#3d7dd8' },
  { id: 'starters', label: 'Small teams', color: '#2a9d8f' },
  { id: 'other', label: 'More teams', color: '#8d7bd8' },
]

// Team order on the canvas, top to bottom. Charts not listed land in "More teams",
// so a new chart shows up without touching this file.
const PLAN: Array<[string, Wing['id']]> = [
  ['marketing', 'gtm'],
  ['marops', 'gtm'],
  ['sdr', 'gtm'],
  ['sales-engineering', 'gtm'],
  ['post-sales', 'gtm'],
  ['customer-support', 'gtm'],
  ['product', 'build'],
  ['engineering', 'build'],
  ['game-studio', 'build'],
  ['founders', 'starters'],
  ['101', 'starters'],
]

export interface Team {
  chart: Chart
  wing: Wing
}

export function buildTeams(charts: Chart[]): Team[] {
  const byId = new Map(charts.map(c => [c.id, c]))
  const wingById = new Map(WINGS.map(w => [w.id, w]))
  const planned = PLAN.filter(([id]) => byId.has(id)).map(([id, wing]) => ({ chart: byId.get(id)!, wing: wingById.get(wing)! }))
  const plannedIds = new Set(planned.map(t => t.chart.id))
  const extra = charts
    .filter(c => !plannedIds.has(c.id))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(chart => ({ chart, wing: wingById.get('other')! }))
  return [...planned, ...extra]
}

export function importPrompt(chartId: string): string {
  return `Import ${chartId} from ${REPO_URL}`
}
