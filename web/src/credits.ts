/**
 * Generic attribution model for workflow credits.
 * 
 * Designed for extensibility: today's content is Grok Bot team workflows,
 * but the catalog can later include workflows from other notable people/orgs.
 * 
 * Only fill handles when verified from public sources.
 * If unknown, leave handle empty — UI will fall back to org or displayName.
 */

export interface ChartCredit {
  handle?: string        // X/Twitter handle without @ (e.g. "joshkim")
  displayName?: string   // Person's display name if known
  org?: string           // Organization or team (e.g. "Grok Bot", "SpaceX")
  note?: string          // Additional context for internal reference
}

export const credits: Record<string, ChartCredit> = {
  '101': {
    org: 'Grok Bot',
    note: 'Galaxy Day 1 livestream'
  },
  'customer-support': {
    org: 'Grok Bot',
    note: 'Galaxy Day 2 livestream'
  },
  'engineering': {
    org: 'Grok Bot',
    note: 'Galaxy Day 1 Meet the team slide'
  },
  'founders': {
    org: 'Grok Bot',
    note: 'Galaxy Day 1 livestream grid'
  },
  'game-studio': {
    org: 'Grok Bot',
    note: 'Galaxy Day 2 livestream'
  },
  'marketing': {
    handle: 'joshkim',
    displayName: 'Josh Kim',
    org: 'Grok Bot',
    note: 'Josh Kim session, Galaxy Day 3'
  },
  'marops': {
    org: 'Grok Bot',
    note: 'Galaxy Day 3 sidebar'
  },
  'post-sales': {
    org: 'Grok Bot',
    note: 'Galaxy Day 3 Meet the team slide'
  },
  'product': {
    org: 'Grok Bot',
    note: 'Galaxy Day 1 livestream'
  },
  'sales-engineering': {
    org: 'Grok Bot',
    note: 'Galaxy Day 2 livestream'
  },
  'sdr': {
    org: 'Grok Bot',
    note: 'Galaxy Day 2 livestream'
  }
}

/**
 * Get the credit line for a chart.
 * Priority: @handle > displayName > org > "Unknown"
 */
export function getCreditText(chartId: string): string {
  const credit = credits[chartId]
  if (!credit) return 'Unknown'
  
  if (credit.handle) {
    return `@${credit.handle}`
  }
  if (credit.displayName) {
    return credit.displayName
  }
  if (credit.org) {
    return credit.org
  }
  return 'Unknown'
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
 * Get full credit info for display.
 */
export function getCreditInfo(chartId: string): {
  text: string
  url: string | null
  org: string | null
} {
  const credit = credits[chartId]
  return {
    text: getCreditText(chartId),
    url: getCreditUrl(chartId),
    org: credit?.org ?? null
  }
}
