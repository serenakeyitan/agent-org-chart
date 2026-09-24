import type { ChartIndex } from '../types'
import { armyOwner, plateLabel, toPlates, type Plate } from '../lib/catalog'
import Constellation from '../components/Constellation'
import SiteHeader from '../components/SiteHeader'

export default function Home({ charts }: { charts: ChartIndex[] }) {
  const plates = toPlates(charts)
  const rooms = groupByDay(plates)

  return (
    <div className="page">
      <SiteHeader />

      <section className="intro">
        <p className="eyebrow">An illustrated catalog · 图鉴</p>
        <h1 className="intro__title">
          A field guide to <em>agent armies.</em>
        </h1>
        <p className="intro__lede">
          <span className="cjk">复刻</span> notable agent teams, one plate at a time. Starting with the Grok Bot
          workflows shown at the Galaxy livestream — study the shape, then copy a single bot or the whole army.
        </p>
      </section>

      {rooms.map(room => (
        <section key={room.day ?? 'other'} className="room" aria-labelledby={`room-${room.day ?? 'other'}`}>
          <header className="room__header">
            <h2 id={`room-${room.day ?? 'other'}`} className="room__title">
              {room.day ? `Day ${room.day}` : 'Other armies'}
            </h2>
            <p className="room__meta">
              {room.day ? 'Galaxy livestream · ' : ''}
              {room.plates.length} {room.plates.length === 1 ? 'plate' : 'plates'}
            </p>
          </header>
          <ul className="plates">
            {room.plates.map(p => (
              <li key={p.chart.id} style={{ '--i': p.number } as React.CSSProperties}>
                <PlateCard plate={p} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className="colophon">
        <p>
          Every plate is drawn from <code>charts/*/chart.json</code> in{' '}
          <a
            className="text-link"
            href="https://github.com/serenakeyitan/agent-org-chart"
            target="_blank"
            rel="noopener noreferrer"
          >
            serenakeyitan/agent-org-chart
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

function PlateCard({ plate }: { plate: Plate }) {
  const { chart, number } = plate
  const owner = armyOwner(chart.id)

  return (
    <article className="plate">
      <div className="plate__art">
        <Constellation shape={chart.shape} />
      </div>
      <div className="plate__caption">
        <p className="plate__number">{plateLabel(number)}</p>
        <h3 className="plate__title">
          <a href={`#/${chart.id}`} className="plate__link">
            {chart.title}
          </a>
        </h3>
        <p className="plate__credit">
          Replicate{' '}
          {owner.url ? (
            <a href={owner.url} target="_blank" rel="noopener noreferrer" className="plate__handle">
              {owner.label}
            </a>
          ) : (
            <span className="plate__owner">{owner.label}</span>
          )}
          ’s army
        </p>
        <p className="plate__meta">
          {chart.roleCount} {chart.roleCount === 1 ? 'bot' : 'bots'}
        </p>
      </div>
    </article>
  )
}

function groupByDay(plates: Plate[]) {
  const rooms: { day: number | null; plates: Plate[] }[] = []
  for (const p of plates) {
    const last = rooms[rooms.length - 1]
    if (last && last.day === p.day) last.plates.push(p)
    else rooms.push({ day: p.day, plates: [p] })
  }
  return rooms
}
