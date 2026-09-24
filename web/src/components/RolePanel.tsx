import type { Role } from '../types'

interface RolePanelProps {
  role: Role | null
  chartId: string
  onCopy: () => void
}

export default function RolePanel({ role, chartId, onCopy }: RolePanelProps) {
  if (!role) {
    return (
      <div className="p-6 flex items-center justify-center h-full min-h-[200px] lg:min-h-0">
        <p className="text-[var(--text-muted)] text-center">
          Select a role to view details
        </p>
      </div>
    )
  }

  const kindLabel: Record<string, string> = {
    orchestrator: 'Orchestrator',
    specialist: 'Specialist',
    optional_peer: 'Optional Peer'
  }

  const kindBadgeColor: Record<string, string> = {
    orchestrator: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    specialist: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    optional_peer: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
  }

  return (
    <div className="p-5 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-[var(--border)]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-xl font-medium text-[var(--text-primary)]">
            {role.name}
          </h2>
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${kindBadgeColor[role.kind]}`}>
            {kindLabel[role.kind]}
          </span>
        </div>
        {role.title && (
          <p className="text-sm text-[var(--text-secondary)]">{role.title}</p>
        )}
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Summary
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          {role.summary}
        </p>
      </div>

      {/* Persona */}
      {role.persona && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Persona
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-wrap">
            {role.persona}
          </p>
        </div>
      )}

      {/* In Scope */}
      {role.in_scope.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            In Scope
          </h3>
          <ul className="space-y-1.5">
            {role.in_scope.map((item, i) => (
              <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Out of Scope */}
      {role.out_of_scope.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Out of Scope
          </h3>
          <ul className="space-y-1.5">
            {role.out_of_scope.map((item, i) => (
              <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                <span className="text-red-400 mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Copy button */}
      <div className="pt-4 border-t border-[var(--border)]">
        <button
          onClick={onCopy}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white
                     px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                     focus:ring-offset-[var(--bg-card)]"
        >
          Copy this bot
        </button>
        <p className="text-xs text-[var(--text-muted)] text-center mt-2">
          charts/{chartId}/chart.json
        </p>
      </div>
    </div>
  )
}
