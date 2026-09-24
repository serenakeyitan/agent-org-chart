import type { Chart, Role } from '../types'
import { getCreditInfo } from '../credits'

function armyOwnerFor(chartId: string): string {
  const credit = getCreditInfo(chartId)
  return credit.url && credit.text.startsWith('@') ? credit.text : credit.org || 'Grok Bot'
}

function creditLineFor(chartId: string): string {
  const credit = getCreditInfo(chartId)
  return credit.url ? `Credit: ${credit.text} (${credit.url})` : `Credit: ${credit.text}`
}

function footer(chart: Chart): string[] {
  const lines = [
    creditLineFor(chart.id),
    `Source: charts/${chart.id}/chart.json`,
    `Repository: https://github.com/serenakeyitan/agent-org-chart`
  ]
  if (chart.sources && chart.sources.length > 0) {
    lines.push('', 'Source URLs:')
    chart.sources.forEach(url => lines.push(`- ${url}`))
  }
  return lines
}

export function roleInstruction(chart: Chart, role: Role): string {
  const lines: string[] = [
    `# ${role.name}`,
    `> 复刻 ${armyOwnerFor(chart.id)}'s ${chart.title} agent army`,
    '',
    `**Role:** ${role.name}`,
    `**Kind:** ${role.kind}`,
    `**Summary:** ${role.summary}`
  ]

  if (role.persona) {
    lines.push('', `**Persona:**`, role.persona)
  }
  if (role.in_scope.length > 0) {
    lines.push('', `**In Scope:**`)
    role.in_scope.forEach(item => lines.push(`- ${item}`))
  }
  if (role.out_of_scope.length > 0) {
    lines.push('', `**Out of Scope:**`)
    role.out_of_scope.forEach(item => lines.push(`- ${item}`))
  }

  lines.push('', '---', ...footer(chart))
  return lines.join('\n')
}

export function armyInstruction(chart: Chart): string {
  const lines: string[] = [
    `# ${chart.title}`,
    `> 复刻 ${armyOwnerFor(chart.id)}'s agent army`,
    '',
    `**Summary:** ${chart.summary}`,
    '',
    `## Army Structure (${chart.roles.length} bots)`,
    ''
  ]

  const orchestrator = chart.roles.find(r => r.kind === 'orchestrator')
  const specialists = chart.roles.filter(r => r.kind !== 'orchestrator')

  if (orchestrator) {
    lines.push(`### ${orchestrator.name} (Orchestrator)`, orchestrator.summary, '')
  }
  if (specialists.length > 0) {
    lines.push('### Specialists')
    specialists.forEach(role => lines.push(`- **${role.name}:** ${role.summary}`))
    lines.push('')
  }
  if (chart.routines && chart.routines.length > 0) {
    lines.push('## Routines')
    chart.routines.forEach(routine => lines.push(`- **${routine.name}:** ${routine.schedule}`))
    lines.push('')
  }
  if (chart.handoffs && chart.handoffs.length > 0) {
    lines.push('## Handoffs')
    chart.handoffs.forEach(handoff => {
      const from = chart.roles.find(r => r.id === handoff.from_role_id)?.name || handoff.from_role_id
      const to = chart.roles.find(r => r.id === handoff.to_role_id)?.name || handoff.to_role_id
      lines.push(`- ${from} → ${to}: ${handoff.when}`)
    })
    lines.push('')
  }

  lines.push('---', ...footer(chart))
  return lines.join('\n')
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to the legacy path (e.g. insecure context or denied permission).
  }
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.setAttribute('readonly', '')
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textArea)
    return ok
  } catch {
    return false
  }
}
