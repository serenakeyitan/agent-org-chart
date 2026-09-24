import { useEffect, useSyncExternalStore } from 'react'
import type { Chart, Role } from '../types'
import OrgChart from '../components/OrgChart'
import RolePanel from '../components/RolePanel'
import CopyButton from '../components/CopyButton'
import SiteHeader from '../components/SiteHeader'
import { armyOwner, composition, plateLabel } from '../lib/catalog'
import { armyInstruction } from '../lib/instructions'
import { getCreditInfo } from '../credits'

interface DetailProps {
  chart: Chart
  plateNumber: number | null
  selectedRoleId: string | null
  onSelectRole: (role: Role | null) => void
}

const WIDE_QUERY = '(min-width: 1021px)'

function useWideLayout(): boolean {
  return useSyncExternalStore(
    onChange => {
      const mql = window.matchMedia(WIDE_QUERY)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(WIDE_QUERY).matches
  )
}

export default function Detail({ chart, plateNumber, selectedRoleId, onSelectRole }: DetailProps) {
  const selectedRole = chart.roles.find(r => r.id === selectedRoleId) ?? null
  const owner = armyOwner(chart.id)
  const day = getCreditInfo(chart.id).day
  const wide = useWideLayout()
  const numeral = plateNumber !== null ? String(plateNumber).padStart(2, '0') : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Escape' && selectedRoleId) {
        onSelectRole(null)
        return
      }
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      const i = chart.roles.findIndex(r => r.id === selectedRoleId)
      const step = e.key === 'ArrowRight' ? 1 : -1
      const next =
        i === -1 ? (step === 1 ? 0 : chart.roles.length - 1) : (i + step + chart.roles.length) % chart.roles.length
      onSelectRole(chart.roles[next])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chart, selectedRoleId, onSelectRole])

  const ownerNode = owner.url ? (
    <a href={owner.url} target="_blank" rel="noopener noreferrer" className="text-link">
      {owner.label}
    </a>
  ) : (
    <span className="study__owner">{owner.label}</span>
  )

  return (
    <div className="page page--wide">
      <SiteHeader back />

      <div className="study">
        <figure className="artboard study__art">
          {numeral && (
            <span className="artboard__numeral" aria-hidden="true">
              {numeral}
            </span>
          )}
          <OrgChart
            key={chart.id}
            roles={chart.roles}
            selectedRoleId={selectedRoleId}
            onSelectRole={onSelectRole}
            fill={wide}
          />
          <figcaption className="artboard__caption">
            <span>
              {numeral && <em>Plate {numeral}</em>} — {chart.title}, {composition(chart.roles)}
            </span>
            <span className="artboard__hint">
              {selectedRole ? 'Esc to clear · ← → to browse' : 'Select a bot · ← → to browse'}
            </span>
          </figcaption>
        </figure>

        <header className="study__heading">
          <p className="eyebrow">
            {plateNumber !== null && <span>{plateLabel(plateNumber)}</span>}
            {plateNumber !== null && day && <span className="eyebrow__sep" aria-hidden="true" />}
            {day && <span>Galaxy Day {day}</span>}
          </p>
          <h1 className="study__title">{chart.title}</h1>
          <p className="study__credit">
            <span className="cjk">复刻</span> {ownerNode} <span className="cjk">的</span> agent army
          </p>
          <p className="study__credit-en">
            Replicate {owner.label}’s army · {chart.roles.length} {chart.roles.length === 1 ? 'bot' : 'bots'}
          </p>
          <div className="study__actions">
            <CopyButton label="Copy this army" variant="quiet" getText={() => armyInstruction(chart)} />
          </div>
        </header>

        <aside className="study__panel" aria-label="Role details">
          <RolePanel chart={chart} role={selectedRole} onSelectRole={onSelectRole} />
        </aside>
      </div>
    </div>
  )
}
