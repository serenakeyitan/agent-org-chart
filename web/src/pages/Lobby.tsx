import { useMemo, useState } from 'react'
import Tower from '../components/Tower'
import { REPO_URL, WINGS, floorLabel, type Floor } from '../lib/catalog'
import { getCreditInfo } from '../credits'

interface LobbyProps {
  floors: Floor[]
  query: string
  onQuery: (q: string) => void
  onPick: (id: string) => void
}

export default function Lobby({ floors, query, onQuery, onPick }: LobbyProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const q = query.trim().toLowerCase()

  const matches = useMemo(() => {
    if (!q) return null
    const m = new Map<string, string[]>()
    floors.forEach(f => {
      const roles = f.roles.filter(r => r.name.toLowerCase().includes(q)).map(r => r.id)
      if (roles.length || f.title.toLowerCase().includes(q)) m.set(f.id, roles)
    })
    return m
  }, [floors, q])

  const matchIds = matches ? new Set(matches.keys()) : null
  const topDown = [...floors].reverse()
  const wings = WINGS.map(w => ({ wing: w, floors: topDown.filter(f => f.wing.id === w.id && (!matchIds || matchIds.has(f.id))) }))
    .filter(g => g.floors.length)
    .sort((a, b) => b.floors[0].level - a.floors[0].level)

  const totalBots = floors.reduce((n, f) => n + f.roleCount, 0)

  return (
    <div className="lobby">
      <header className="lobby-head">
        <p className="eyebrow">A directory of agent org charts</p>
        <h1>Agent Army Tower</h1>
        <p className="lede">
          Every floor is a real agent team. Walk in, meet the bots, then move the whole team into your own agent with one prompt.
        </p>
        <p className="stats">
          {floors.length} floors · {totalBots} bots
        </p>
      </header>

      <div className="lobby-grid">
        <div className="tower-wrap">
          <Tower floors={floors} hoveredId={hoveredId} matchIds={matchIds} onHover={setHoveredId} onPick={onPick} />
        </div>

        <section className="directory" aria-label="Floor directory">
          <div className="dir-search">
            <label htmlFor="role-search" className="sr-only">Find a role</label>
            <input
              id="role-search"
              type="search"
              placeholder="Find a role — try Designer or Recruiter"
              value={query}
              onChange={e => onQuery(e.target.value)}
              autoComplete="off"
            />
          </div>

          {wings.length === 0 && (
            <p className="dir-empty">
              No floor has a “{query.trim()}”. <button type="button" onClick={() => onQuery('')}>Clear search</button>
            </p>
          )}

          {wings.map(({ wing, floors: list }) => (
            <div key={wing.id} className="dir-wing">
              <h2 className="dir-wing-label">
                <span className="swatch" style={{ background: wing.color }} aria-hidden="true" />
                {wing.label}
              </h2>
              <ul>
                {list.map(f => {
                  const credit = getCreditInfo(f.id)
                  const hits = matches?.get(f.id) ?? []
                  return (
                    <li key={f.id}>
                      <a
                        href={`#/${f.id}`}
                        className={`dir-row${hoveredId === f.id ? ' is-hot' : ''}`}
                        onMouseEnter={() => setHoveredId(f.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(f.id)}
                        onBlur={() => setHoveredId(null)}
                      >
                        <span className="dir-level" style={{ borderColor: f.wing.color }}>{floorLabel(f.level)}</span>
                        <span className="dir-main">
                          <span className="dir-title">
                            {f.title}
                            {credit.url && <span className="dir-credit">{credit.text}</span>}
                          </span>
                          <span className="dir-roles">
                            {f.roles.map(r => (
                              <span key={r.id} className={`chip${hits.includes(r.id) ? ' is-hit' : ''}${r.kind === 'orchestrator' ? ' is-lead' : ''}`}>
                                {r.name}
                              </span>
                            ))}
                          </span>
                        </span>
                        <span className="dir-count">{f.roleCount} bots</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <footer className="site-foot">
        Charts live in <a href={REPO_URL} target="_blank" rel="noopener noreferrer">serenakeyitan/agent-org-chart</a>. Structure comes from each chart.json; the office life is simulated.
      </footer>
    </div>
  )
}
