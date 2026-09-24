import type { ChartIndex, RoleShape } from '../types'
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

/** e.g. "1 lead · 5 specialists", or "4 peers · no lead" when nobody reports to anyone. */
export function composition(shape: RoleShape[]): string {
  if (shape.length > 1 && shape.every(r => !r.reports_to) && !shape.some(r => r.kind === 'orchestrator')) {
    return `${shape.length} peers · no lead`
  }
  const count = (kind: RoleShape['kind']) => shape.filter(r => r.kind === kind).length
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
  const parts: string[] = []
  if (count('orchestrator')) parts.push(plural(count('orchestrator'), 'lead'))
  if (count('specialist')) parts.push(plural(count('specialist'), 'specialist'))
  if (count('optional_peer')) parts.push(`${count('optional_peer')} optional`)
  return parts.join(' · ')
}

export const kindLabel: Record<string, string> = {
  orchestrator: 'Orchestrator',
  specialist: 'Specialist',
  optional_peer: 'Optional peer'
}
