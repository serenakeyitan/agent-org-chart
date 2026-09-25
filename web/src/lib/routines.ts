import type { Routine } from '../types'

// The office clock runs one simulated weekday, 07:00 → 19:00, in minutes since midnight.
export const DAY_START = 7 * 60
export const DAY_END = 19 * 60

export interface RoutineRun {
  name: string
  schedule: string
  at: number // minutes since midnight
  kind: 'scheduled' | 'interval' | 'trigger'
}

const TIME_RE = /(\d{1,2}):(\d{2})\s*(AM|PM)/gi
const EVERY_RE = /every\s+(\d+)\s+minutes?/i

// Turns the human schedule strings in chart.json into the runs shown on the clock.
// Unparseable schedules (e.g. "When a webhook fires") get one run at a fixed
// simulated time, labelled as a trigger, so they still appear on the timeline.
export function routineRuns(routines: Routine[] = []): RoutineRun[] {
  const runs: RoutineRun[] = []
  routines.forEach((r, i) => {
    const times = [...r.schedule.matchAll(TIME_RE)].map(m => {
      let h = Number(m[1]) % 12
      if (m[3].toUpperCase() === 'PM') h += 12
      return h * 60 + Number(m[2])
    })
    if (times.length) {
      times.forEach(at => runs.push({ name: r.name, schedule: r.schedule, at, kind: 'scheduled' }))
      return
    }
    const every = r.schedule.match(EVERY_RE)
    if (every) {
      const step = Math.max(5, Number(every[1]))
      for (let at = 9 * 60; at < 17 * 60; at += step) runs.push({ name: r.name, schedule: r.schedule, at, kind: 'interval' })
      return
    }
    runs.push({ name: r.name, schedule: r.schedule, at: 10 * 60 + 40 + i * 157, kind: 'trigger' })
  })
  return runs.sort((a, b) => a.at - b.at)
}

export function formatClock(min: number): string {
  const h24 = Math.floor(min / 60) % 24
  const m = Math.floor(min % 60)
  const h = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h}:${String(m).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`
}
