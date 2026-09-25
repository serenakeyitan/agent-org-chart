import type { Chart, Role } from '../types'

interface BlueprintProps {
  chart: Chart
  selectedRoleId: string | null
  onSelect: (roleId: string) => void
  onCopyBot: () => void
}

function Card({ role, selected, onSelect, onCopyBot }: { role: Role; selected: boolean; onSelect: (id: string) => void; onCopyBot: () => void }) {
  return (
    <div className="bp-cell">
      <button type="button" className={`bp-card${selected ? ' is-selected' : ''}${role.kind === 'orchestrator' ? ' is-lead' : ''}`} onClick={() => onSelect(role.id)} aria-pressed={selected}>
        <span className="bp-name">{role.name}</span>
        <span className="bp-kind">{role.kind === 'orchestrator' ? 'Orchestrator' : role.kind === 'optional_peer' ? 'Optional peer' : 'Specialist'}</span>
        <span className="bp-summary">{role.summary}</span>
      </button>
      {selected && (
        <button type="button" className="btn-secondary bp-copy" onClick={onCopyBot}>Copy this bot</button>
      )}
    </div>
  )
}

export default function Blueprint({ chart, selectedRoleId, onSelect, onCopyBot }: BlueprintProps) {
  const lead = chart.roles.find(r => r.kind === 'orchestrator')
  const rest = chart.roles.filter(r => r !== lead)
  return (
    <div className="blueprint">
      {lead ? (
        <>
          <div className="bp-lead">
            <Card role={lead} selected={selectedRoleId === lead.id} onSelect={onSelect} onCopyBot={onCopyBot} />
          </div>
          <div className="bp-stem" aria-hidden="true" />
          <p className="bp-caption">Reports to {lead.name}</p>
        </>
      ) : (
        <p className="bp-caption">Peers — no manager, one shared table</p>
      )}
      <div className="bp-grid">
        {rest.map(r => (
          <Card key={r.id} role={r} selected={selectedRoleId === r.id} onSelect={onSelect} onCopyBot={onCopyBot} />
        ))}
      </div>
    </div>
  )
}
