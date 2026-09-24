import type { Chart, Role } from '../types'
import { kindLabel } from '../lib/catalog'
import { roleInstruction } from '../lib/instructions'
import CopyButton from './CopyButton'

interface RolePanelProps {
  chart: Chart
  role: Role | null
  onSelectRole: (role: Role | null) => void
}

export default function RolePanel({ chart, role, onSelectRole }: RolePanelProps) {
  return (
    <div className="panel">
      <div key={role?.id ?? '__overview'} className="panel__body">
        {role ? <RoleBrief chart={chart} role={role} onSelectRole={onSelectRole} /> : <Overview chart={chart} />}
      </div>
    </div>
  )
}

function Overview({ chart }: { chart: Chart }) {
  const kinds = Array.from(new Set(chart.roles.map(r => r.kind)))
  return (
    <>
      <p className="eyebrow">About this army</p>
      <p className="panel__lead">{chart.summary}</p>

      <p className="panel__hint">
        <span className="panel__hint-dot" aria-hidden="true" />
        Select a bot on the plate to read its brief.
      </p>

      <Section title="Legend">
        <ul className="legend">
          {kinds.map(k => (
            <li key={k} className={`node--${k}`}>
              <span className="node__dot" aria-hidden="true" />
              {kindLabel[k]}
              <span className="legend__count">{chart.roles.filter(r => r.kind === k).length}</span>
            </li>
          ))}
        </ul>
      </Section>

      {chart.routines && chart.routines.length > 0 && (
        <Section title="Routines">
          <dl className="routines">
            {chart.routines.map(r => (
              <div key={r.name}>
                <dt>{r.name}</dt>
                <dd>{r.schedule}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {chart.sources && chart.sources.length > 0 && (
        <Section title="Source">
          <ul className="sources">
            {chart.sources.map(url => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-link">
                  {prettyUrl(url)}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}

function RoleBrief({ chart, role, onSelectRole }: { chart: Chart; role: Role; onSelectRole: (r: Role | null) => void }) {
  const lead = role.reports_to ? chart.roles.find(r => r.id === role.reports_to) : undefined
  const reports = chart.roles.filter(r => r.reports_to === role.id)
  const peers = !lead && reports.length === 0 ? chart.roles.filter(r => r.id !== role.id && !r.reports_to) : []

  return (
    <>
      <p className={`eyebrow eyebrow--kind node--${role.kind}`}>
        <span className="node__dot" aria-hidden="true" />
        {kindLabel[role.kind]}
      </p>
      <h2 className="panel__title">{role.name}</h2>
      {role.title && <p className="panel__subtitle">{role.title}</p>}
      <p className="panel__lead">{role.summary}</p>

      {(lead || reports.length > 0 || peers.length > 0) && (
        <dl className="relations">
          {lead && (
            <div>
              <dt>Reports to</dt>
              <dd>
                <RoleLink role={lead} onSelectRole={onSelectRole} />
              </dd>
            </div>
          )}
          {reports.length > 0 && (
            <div>
              <dt>Leads</dt>
              <dd>
                {reports.map((r, i) => (
                  <span key={r.id}>
                    <RoleLink role={r} onSelectRole={onSelectRole} />
                    {i < reports.length - 1 && <span className="relations__sep">, </span>}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {peers.length > 0 && (
            <div>
              <dt>Alongside</dt>
              <dd>
                {peers.map((r, i) => (
                  <span key={r.id}>
                    <RoleLink role={r} onSelectRole={onSelectRole} />
                    {i < peers.length - 1 && <span className="relations__sep">, </span>}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      )}

      {role.persona && (
        <Section title="Persona">
          <p className="panel__persona">{role.persona}</p>
        </Section>
      )}

      {role.in_scope.length > 0 && (
        <Section title="In scope">
          <ul className="scope">
            {role.in_scope.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {role.out_of_scope.length > 0 && (
        <Section title="Out of scope">
          <ul className="scope scope--out">
            {role.out_of_scope.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      <div className="panel__actions">
        <CopyButton label="Copy this bot" getText={() => roleInstruction(chart, role)} />
        <p className="panel__note">
          A Markdown brief from <code>charts/{chart.id}/chart.json</code>
        </p>
      </div>
    </>
  )
}

function RoleLink({ role, onSelectRole }: { role: Role; onSelectRole: (r: Role | null) => void }) {
  return (
    <button type="button" className="text-link" onClick={() => onSelectRole(role)}>
      {role.name}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel__section">
      <h3 className="eyebrow">{title}</h3>
      {children}
    </section>
  )
}

function prettyUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname === 'x.com' && u.pathname.includes('/broadcasts/')) return 'Livestream on X'
    return u.hostname.replace(/^www\./, '') + (u.pathname === '/' ? '' : u.pathname)
  } catch {
    return url
  }
}
