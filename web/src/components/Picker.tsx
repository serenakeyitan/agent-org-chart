import Avatar from './Avatar'
import { REPO_URL, WINGS, type Team } from '../lib/catalog'
import { getCreditInfo } from '../credits'

interface PickerProps {
  teams: Team[]
  hired: string[]
  query: string
  open: boolean // narrow screens: the picker is a drawer
  onQuery: (q: string) => void
  onToggleHire: (teamId: string) => void
  onOpenTeam: (teamId: string) => void
  onClose: () => void
}

export default function Picker({ teams, hired, query, open, onQuery, onToggleHire, onOpenTeam, onClose }: PickerProps) {
  const q = query.trim().toLowerCase()
  const hits = (t: Team) => (q ? t.chart.roles.filter(r => r.name.toLowerCase().includes(q)).map(r => r.id) : [])
  const visible = teams.filter(t => !q || t.chart.title.toLowerCase().includes(q) || hits(t).length)
  const groups = WINGS.map(w => ({ wing: w, teams: visible.filter(t => t.wing.id === w.id) })).filter(g => g.teams.length)

  return (
    <aside className={`picker${open ? ' is-open' : ''}`} aria-label="Teams you can hire">
      <header className="picker-head">
        <div>
          <h1>Agent Army</h1>
          <p>You're the boss. Hire the agent teams you want and watch your org take shape.</p>
        </div>
        <button type="button" className="icon-btn picker-close" onClick={onClose} aria-label="Close team list">×</button>
      </header>
      <label htmlFor="role-search" className="sr-only">Find a team or role</label>
      <input
        id="role-search"
        type="search"
        placeholder="Find a team or role — try Designer"
        value={query}
        onChange={e => onQuery(e.target.value)}
        autoComplete="off"
      />
      <div className="picker-list">
        {groups.length === 0 && <p className="picker-empty">No team has a “{query.trim()}”.</p>}
        {groups.map(({ wing, teams: list }) => (
          <section key={wing.id}>
            <h2>
              <span className="swatch" style={{ background: wing.color }} aria-hidden="true" />
              {wing.label}
            </h2>
            <ul>
              {list.map(t => {
                const isHired = hired.includes(t.chart.id)
                const credit = getCreditInfo(t.chart.id)
                const matched = hits(t)
                return (
                  <li key={t.chart.id} className={isHired ? 'is-hired' : ''}>
                    <button type="button" className="pick-main" onClick={() => (isHired ? onOpenTeam(t.chart.id) : onToggleHire(t.chart.id))}>
                      <span className="pick-title">
                        {t.chart.title}
                        {credit.url && <span className="pick-credit">{credit.text}</span>}
                      </span>
                      <span className="pick-people" aria-hidden="true">
                        {t.chart.roles.map((r, i) => (
                          <Avatar key={r.id} index={i} lead={r.kind === 'orchestrator'} height={26} />
                        ))}
                      </span>
                      <span className="pick-meta">
                        {matched.length
                          ? `Has ${t.chart.roles.filter(r => matched.includes(r.id)).map(r => r.name).join(', ')}`
                          : `${t.chart.roles.length} bots${t.chart.roles.some(r => r.kind === 'orchestrator') ? '' : ' · peers'}`}
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`hire-btn${isHired ? ' is-hired' : ''}`}
                      onClick={() => onToggleHire(t.chart.id)}
                      aria-pressed={isHired}
                      aria-label={isHired ? `Let ${t.chart.title} go` : `Hire ${t.chart.title}`}
                    >
                      <span className="when-idle">{isHired ? 'Hired ✓' : 'Hire'}</span>
                      {isHired && <span className="when-hover">Let go</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
      <footer className="picker-foot">
        Charts live in <a href={REPO_URL} target="_blank" rel="noopener noreferrer">serenakeyitan/agent-org-chart</a>
      </footer>
    </aside>
  )
}
