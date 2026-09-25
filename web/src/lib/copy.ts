import type { Chart, Role } from '../types'
import { getCreditInfo } from '../credits'
import { REPO_URL } from './catalog'

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the textarea path (e.g. clipboard API blocked in an iframe)
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

function creditLine(chartId: string): string {
  const credit = getCreditInfo(chartId)
  return credit.url ? `Credit: ${credit.text} (${credit.url})` : `Credit: ${credit.text}`
}

export function roleInstruction(chart: Chart, role: Role): string {
  const manager = role.reports_to ? chart.roles.find(r => r.id === role.reports_to) : null
  const lines = [
    `# ${role.name}`,
    `> One bot from the ${chart.title} team`,
    '',
    `**Role:** ${role.name}`,
    `**Kind:** ${role.kind.replace('_', ' ')}`,
  ]
  if (manager) lines.push(`**Reports to:** ${manager.name}`)
  lines.push(`**Summary:** ${role.summary}`)
  if (role.persona) lines.push('', '**Persona:**', role.persona)
  if (role.in_scope.length) lines.push('', '**In scope:**', ...role.in_scope.map(s => `- ${s}`))
  if (role.out_of_scope.length) lines.push('', '**Out of scope:**', ...role.out_of_scope.map(s => `- ${s}`))
  lines.push('', '---', creditLine(chart.id), `Source: ${REPO_URL}/blob/main/charts/${chart.id}/chart.json`)
  return lines.join('\n')
}
