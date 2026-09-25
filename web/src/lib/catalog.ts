import type { ChartIndex } from '../types'

export const REPO_URL = 'https://github.com/serenakeyitan/agent-org-chart'

export interface Wing {
  id: string
  label: string
  color: string
}

// Wings group floors by what the team does. Listed bottom → top.
export const WINGS: Wing[] = [
  { id: 'starters', label: 'Small teams', color: '#2a9d8f' },
  { id: 'build', label: 'Build', color: '#3d7dd8' },
  { id: 'gtm', label: 'Go-to-market', color: '#e76f51' },
  { id: 'other', label: 'More teams', color: '#8d7bd8' },
]

// Floor order, ground floor first. Charts not listed land in "More teams" on top,
// so a new chart shows up without touching this file.
const FLOOR_PLAN: Array<[string, Wing['id']]> = [
  ['101', 'starters'],
  ['founders', 'starters'],
  ['product', 'build'],
  ['engineering', 'build'],
  ['game-studio', 'build'],
  ['marketing', 'gtm'],
  ['marops', 'gtm'],
  ['sdr', 'gtm'],
  ['sales-engineering', 'gtm'],
  ['post-sales', 'gtm'],
  ['customer-support', 'gtm'],
]

export interface Floor extends ChartIndex {
  level: number
  wing: Wing
}

export function buildFloors(index: ChartIndex[]): Floor[] {
  const byId = new Map(index.map(c => [c.id, c]))
  const wingById = new Map(WINGS.map(w => [w.id, w]))
  const planned = FLOOR_PLAN.filter(([id]) => byId.has(id)).map(([id, wing]) => ({ chart: byId.get(id)!, wing: wingById.get(wing)! }))
  const plannedIds = new Set(planned.map(p => p.chart.id))
  const extra = index
    .filter(c => !plannedIds.has(c.id))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(chart => ({ chart, wing: wingById.get('other')! }))
  return [...planned, ...extra].map((p, i) => ({ ...p.chart, level: i + 1, wing: p.wing }))
}

export function floorLabel(level: number): string {
  return String(level).padStart(2, '0')
}

export function importPrompt(chartId: string): string {
  return `Import ${chartId} from ${REPO_URL}`
}
