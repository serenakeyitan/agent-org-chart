import type { ChartIndex } from '../types'
import { getCreditInfo } from '../credits'

export interface Plate {
  chart: ChartIndex
  number: number
  day: number | null
}

/** Plates are ordered by Galaxy day, then by their order in the index. */
export function toPlates(index: ChartIndex[]): Plate[] {
  return index
    .map((chart, i) => ({ chart, i, day: getCreditInfo(chart.id).day }))
    .sort((a, b) => (a.day ?? Infinity) - (b.day ?? Infinity) || a.i - b.i)
    .map(({ chart, day }, i) => ({ chart, day, number: i + 1 }))
}

export function plateLabel(n: number): string {
  return `No. ${String(n).padStart(2, '0')}`
}

/** The name an army is credited to: a verified @handle, else the org. */
export function armyOwner(chartId: string): { label: string; url: string | null } {
  const credit = getCreditInfo(chartId)
  if (credit.url && credit.text.startsWith('@')) return { label: credit.text, url: credit.url }
  return { label: credit.org || 'this team', url: null }
}

export const kindLabel: Record<string, string> = {
  orchestrator: 'Orchestrator',
  specialist: 'Specialist',
  optional_peer: 'Optional peer'
}
