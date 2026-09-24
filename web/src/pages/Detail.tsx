import { useState, useRef } from 'react'
import type { Chart, Role } from '../types'
import OrgChart from '../components/OrgChart'
import RolePanel from '../components/RolePanel'
import { getCreditInfo } from '../credits'

interface DetailProps {
  chart: Chart
  onBack: () => void
}

function CreditLine({ chartId, roleCount }: { chartId: string; roleCount: number }) {
  const credit = getCreditInfo(chartId)
  const armyOwner = credit.url && credit.text.startsWith('@') 
    ? credit.text 
    : credit.org || 'this team'
  
  return (
    <p className="text-sm text-[var(--text-muted)]">
      <span>Replicate </span>
      {credit.url ? (
        <a
          href={credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          {armyOwner}'s
        </a>
      ) : (
        <span className="text-[var(--text-primary)]">{armyOwner}'s</span>
      )}
      <span> army · {roleCount} bots</span>
      {credit.day && <span> · Day {credit.day}</span>}
    </p>
  )
}

export default function Detail({ chart, onBack }: DetailProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const toastRef = useRef<HTMLDivElement>(null)

  const showToast = (message: string) => {
    if (toastRef.current) {
      toastRef.current.textContent = `✓ ${message}`
      toastRef.current.style.backgroundColor = '#059669'
      toastRef.current.style.opacity = '1'
      toastRef.current.style.transform = 'translateX(-50%) translateY(0)'
      
      setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.style.opacity = '0'
          toastRef.current.style.transform = 'translateX(-50%) translateY(1rem)'
        }
      }, 2000)
    }
  }

  const handleCopy = (text: string, label: string) => {
    showToast(label)
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => console.error('Clipboard error:', err))
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const generateRoleInstruction = (role: Role): string => {
    const credit = getCreditInfo(chart.id)
    const armyOwner = credit.url && credit.text.startsWith('@') 
      ? credit.text 
      : credit.org || 'Grok Bot'
    const creditLine = credit.url 
      ? `Credit: ${credit.text} (${credit.url})`
      : `Credit: ${credit.text}`

    const lines: string[] = [
      `# ${role.name}`,
      `> 复刻 ${armyOwner}'s ${chart.title} agent army`,
      '',
      `**Role:** ${role.name}`,
      `**Kind:** ${role.kind}`,
      `**Summary:** ${role.summary}`,
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

    lines.push(
      '',
      '---',
      creditLine,
      `Source: charts/${chart.id}/chart.json`,
      `Repository: https://github.com/serenakeyitan/agent-org-chart`
    )

    if (chart.sources && chart.sources.length > 0) {
      lines.push('', 'Source URLs:')
      chart.sources.forEach(url => lines.push(`- ${url}`))
    }

    return lines.join('\n')
  }

  const generateTeamInstruction = (): string => {
    const credit = getCreditInfo(chart.id)
    const armyOwner = credit.url && credit.text.startsWith('@') 
      ? credit.text 
      : credit.org || 'Grok Bot'
    const creditLine = credit.url 
      ? `Credit: ${credit.text} (${credit.url})`
      : `Credit: ${credit.text}`

    const lines: string[] = [
      `# ${chart.title}`,
      `> 复刻 ${armyOwner}'s agent army`,
      '',
      `**Summary:** ${chart.summary}`,
      '',
      `## Army Structure (${chart.roles.length} bots)`,
      ''
    ]

    const orchestrator = chart.roles.find(r => r.kind === 'orchestrator')
    const specialists = chart.roles.filter(r => r.kind !== 'orchestrator')

    if (orchestrator) {
      lines.push(`### ${orchestrator.name} (Orchestrator)`)
      lines.push(orchestrator.summary)
      lines.push('')
    }

    if (specialists.length > 0) {
      lines.push('### Specialists')
      specialists.forEach(role => {
        lines.push(`- **${role.name}:** ${role.summary}`)
      })
      lines.push('')
    }

    if (chart.routines && chart.routines.length > 0) {
      lines.push('## Routines')
      chart.routines.forEach(routine => {
        lines.push(`- **${routine.name}:** ${routine.schedule}`)
      })
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

    lines.push(
      '---',
      creditLine,
      `Source: charts/${chart.id}/chart.json`,
      `Repository: https://github.com/serenakeyitan/agent-org-chart`
    )

    if (chart.sources && chart.sources.length > 0) {
      lines.push('', 'Source URLs:')
      chart.sources.forEach(url => lines.push(`- ${url}`))
    }

    return lines.join('\n')
  }

  const handleCopyRole = () => {
    if (selectedRole) {
      handleCopy(generateRoleInstruction(selectedRole), 'Copied role')
    }
  }

  const handleCopyTeam = () => {
    handleCopy(generateTeamInstruction(), 'Copied army')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[var(--bg-card)] border-b border-[var(--border)] px-4 py-3 flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors
                     focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                     focus:ring-offset-[var(--bg-card)] rounded p-1"
          aria-label="Back to charts"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium text-[var(--text-primary)]">{chart.title}</h1>
          <CreditLine chartId={chart.id} roleCount={chart.roles.length} />
        </div>
        <button
          onClick={handleCopyTeam}
          className="text-sm bg-[var(--bg-panel)] hover:bg-[var(--highlight)] text-[var(--text-primary)]
                     px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          Copy this army
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Org chart area */}
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <OrgChart 
            roles={chart.roles}
            selectedRoleId={selectedRole?.id || null}
            onSelectRole={setSelectedRole}
          />
        </div>

        {/* Side panel */}
        <aside className="lg:w-96 bg-[var(--bg-card)] border-t lg:border-t-0 lg:border-l border-[var(--border)]">
          <RolePanel 
            role={selectedRole}
            chartId={chart.id}
            onCopy={handleCopyRole}
          />
        </aside>
      </div>

      {/* Copy feedback toast */}
      <div 
        ref={toastRef}
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%) translateY(1rem)',
          opacity: 0,
          zIndex: 99999,
          padding: '16px 32px',
          borderRadius: '8px',
          backgroundColor: '#059669',
          color: 'white',
          minWidth: '200px',
          textAlign: 'center' as const,
          fontSize: '16px',
          fontWeight: 600,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none' as const
        }}
        role="alert"
        aria-live="assertive"
      />
    </div>
  )
}
