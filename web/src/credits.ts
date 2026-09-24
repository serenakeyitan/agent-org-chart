/**
 * Credits for Grok Bot team workflow demonstrations.
 * 
 * Each chart may have a demonstrator credited by their X/Twitter handle.
 * Only fill handles when verified from public livestream/agenda context.
 * If unknown, leave handle empty — UI will show "Grok Bot team".
 */

export interface ChartCredit {
  handle?: string        // X/Twitter handle without @ (e.g. "joshckim")
  displayName?: string   // Fallback display name if handle unknown
  day?: number           // Galaxy livestream day (1, 2, or 3)
  note?: string          // Additional context
}

export const credits: Record<string, ChartCredit> = {
  '101': {
    day: 1,
    note: 'Galaxy Day 1 livestream'
  },
  'customer-support': {
    day: 2,
    note: 'Galaxy Day 2 livestream'
  },
  'engineering': {
    day: 1,
    note: 'Galaxy Day 1 Meet the team slide'
  },
  'founders': {
    day: 1,
    note: 'Galaxy Day 1 livestream grid'
  },
  'game-studio': {
    day: 2,
    note: 'Galaxy Day 2 livestream'
  },
  'marketing': {
    handle: 'joshckim',
    displayName: 'Josh Kim',
    day: 3,
    note: 'Josh Kim session, Galaxy Day 3'
  },
  'marops': {
    day: 3,
    note: 'Galaxy Day 3 sidebar'
  },
  'post-sales': {
    day: 3,
    note: 'Galaxy Day 3 Meet the team slide'
  },
  'product': {
    day: 1,
    note: 'Galaxy Day 1 livestream'
  },
  'sales-engineering': {
    day: 2,
    note: 'Galaxy Day 2 livestream'
  },
  'sdr': {
    day: 2,
    note: 'Galaxy Day 2 livestream'
  }
}

/**
 * Get the credit line for a chart.
 * Returns @handle linked text if handle known, otherwise "Grok Bot team".
 */
export function getCreditText(chartId: string): string {
  const credit = credits[chartId]
  if (!credit) return 'Grok Bot team'
  
  if (credit.handle) {
    return `@${credit.handle}`
  }
  if (credit.displayName) {
    return credit.displayName
  }
  return 'Grok Bot team'
}

/**
 * Get the X/Twitter profile URL if handle is known.
 */
export function getCreditUrl(chartId: string): string | null {
  const credit = credits[chartId]
  if (credit?.handle) {
    return `https://x.com/${credit.handle}`
  }
  return null
}

/**
 * Get credit info for display.
 */
export function getCreditInfo(chartId: string): {
  text: string
  url: string | null
  day: number | null
} {
  const credit = credits[chartId]
  return {
    text: getCreditText(chartId),
    url: getCreditUrl(chartId),
    day: credit?.day ?? null
  }
}
