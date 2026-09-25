import Avatar from './Avatar'
import type { Team } from '../lib/catalog'
import { REPO_URL, importPrompt } from '../lib/catalog'
import { crontab, routineLine } from '../lib/copy'
import { getCreditInfo } from '../credits'

interface TeamPanelProps {
  team: Team
  hired: boolean // false = previewing a candidate
  roleId: string | null
  flash: boolean
  onRole: (roleId: string | null) => void
  onClose: () => void
  onCopyImport: () => void
  onCopyJson: () => void
  onCopyBot: () => void
  onCopyText: (text: string, what: string) => void
  onHire: () => void
  onLetGo: () => void
}

export default function TeamPanel({ team, hired, roleId, flash, onRole, onClose, onCopyImport, onCopyJson, onCopyBot, onCopyText, onHire, onLetGo }: TeamPanelProps) {
  const { chart } = team
  const routines = chart.routines ?? []
  const credit = getCreditInfo(chart.id)
  const lead = chart.roles.find(r => r.kind === 'orchestrator')
  const roleIndex = chart.roles.findIndex(r => r.id === roleId)
  const role = roleIndex >= 0 ? chart.roles[roleIndex] : null
  const manager = role?.reports_to ? chart.roles.find(r => r.id === role.reports_to) : null

  return (
    <aside className="panel" aria-label={`${chart.title} team`}>
      <header className="panel-head">
        <div>
          <p className="panel-wing">
            <span className="swatch" style={{ background: team.wing.color }} aria-hidden="true" />
            {team.wing.label}
          </p>
          <h2>{chart.title}</h2>
          <p className="panel-meta">
            {chart.roles.length} bots · {lead ? `led by ${lead.name}` : 'peers, no manager'}
            {credit.url && (
              <> · <a href={credit.url} target="_blank" rel="noopener noreferrer">{credit.text}</a></>
            )}
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close panel">×</button>
      </header>

      {hired ? (
        <div className="hire-status is-hired">
          <span>✓ In your org</span>
          <button type="button" className="btn-quiet" onClick={onLetGo}>Let go</button>
        </div>
      ) : (
        <div className="hire-status">
          <button type="button" className="btn-primary" onClick={onHire}>＋ Hire this team</button>
          <span className="muted">Previewing — not in your org yet.</span>
        </div>
      )}

      {role && (
        <section className="bot" aria-label={role.name}>
          <div className="bot-head">
            <Avatar index={roleIndex} lead={role.kind === 'orchestrator'} height={48} />
            <div>
              <h3>{role.name}</h3>
              <p className="muted">
                {role.kind === 'orchestrator' ? 'Orchestrator' : manager ? (
                  <>Reports to <button type="button" className="inline-link" onClick={() => onRole(manager.id)}>{manager.name}</button></>
                ) : 'Peer'}
              </p>
            </div>
            <button type="button" className="icon-btn" onClick={() => onRole(null)} aria-label="Back to the team">×</button>
          </div>
          <p>{role.summary}</p>
          <button type="button" className="btn-secondary" onClick={onCopyBot}>Copy this bot</button>
        </section>
      )}

      <section className={`move${flash ? ' is-flash' : ''}`} aria-labelledby="move-h">
        <h3 id="move-h">Move this team in</h3>
        <p>Paste this into any agent that can spawn teammates. It reads the chart and hires the whole team.</p>
        <div className="prompt"><code>{importPrompt(chart.id)}</code></div>
        <button type="button" className={hired ? 'btn-primary' : 'btn-quiet btn-wide'} onClick={onCopyImport}>Copy import prompt</button>
        <div className="move-links">
          <button type="button" className="btn-quiet" onClick={onCopyJson}>Copy chart.json</button>
          <a className="btn-quiet" href={`${REPO_URL}/tree/main/charts/${chart.id}`} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </section>

      {!role && (
        <p className="panel-hint">Click anyone on this team to see what they do.</p>
      )}

      <section className="routines" aria-labelledby="routines-h">
        <div className="routines-head">
          <h3 id="routines-h">Routines{routines.length ? ` · ${routines.length}` : ''}</h3>
          {routines.length > 0 && (
            <button type="button" className="btn-quiet btn-small" onClick={() => onCopyText(crontab(chart), 'Crontab')}>Copy all as crontab</button>
          )}
        </div>
        {routines.length === 0 ? (
          <p className="muted routines-none">No routines published for this team.</p>
        ) : (
          <ul>
            {routines.map(r => (
              <li key={r.name}>
                <span className="routine-name">{r.name}</span>
                <span className="muted">{r.schedule}</span>
                {r.cron ? (
                  <button type="button" className="cron" onClick={() => onCopyText(routineLine(chart, r), `${r.name} cron`)} title="Copy this cron line" aria-label={`Copy cron for ${r.name}: ${r.cron}`}>
                    <code>{r.cron}</code>
                    <span className="cron-copy" aria-hidden="true">Copy</span>
                  </button>
                ) : (
                  <span className="cron cron-event">Event · {r.trigger ?? 'trigger'}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {chart.sources && chart.sources.length > 0 && (
        <p className="source">
          Source:{' '}
          {chart.sources.map((u, i) => (
            <a key={u} href={u} target="_blank" rel="noopener noreferrer">{chart.sources!.length > 1 ? `link ${i + 1}` : 'original broadcast'}</a>
          ))}
        </p>
      )}
    </aside>
  )
}
