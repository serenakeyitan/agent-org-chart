import { DAY_END, DAY_START, formatClock, type RoutineRun } from '../lib/routines'

interface ClockBarProps {
  minute: number
  playing: boolean
  runs: RoutineRun[]
  onToggle: () => void
  onSeek: (minute: number) => void
}

const pct = (m: number) => `${((m - DAY_START) / (DAY_END - DAY_START)) * 100}%`

export default function ClockBar({ minute, playing, runs, onToggle, onSeek }: ClockBarProps) {
  const markers = runs.filter(r => r.kind !== 'interval')
  const interval = runs.find(r => r.kind === 'interval')
  const next = markers.find(r => r.at > minute) ?? markers[0]
  const hours = Array.from({ length: (DAY_END - DAY_START) / 60 + 1 }, (_, i) => DAY_START + i * 60)

  return (
    <div className="clock">
      <div className="clock-row">
        <button type="button" className="clock-play" onClick={onToggle} aria-label={playing ? 'Pause the day' : 'Play the day'}>
          {playing ? (
            <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
          )}
        </button>
        <span className="clock-time" aria-live="off">{formatClock(minute)}</span>
        <span className="clock-next">
          {markers.length === 0 && !interval && 'No routines on this chart — just a regular day.'}
          {next && (
            <>
              Next routine: <strong>{next.name}</strong> · {next.kind === 'trigger' ? `${next.schedule.toLowerCase()} (simulated time)` : formatClock(next.at)}
            </>
          )}
          {!next && interval && (
            <>
              <strong>{interval.name}</strong> · {interval.schedule.toLowerCase()}
            </>
          )}
        </span>
      </div>
      <div className="clock-track">
        <input
          type="range"
          min={DAY_START}
          max={DAY_END}
          step={1}
          value={Math.floor(minute)}
          onChange={e => onSeek(Number(e.target.value))}
          aria-label="Time of day"
          aria-valuetext={formatClock(minute)}
        />
        <div className="clock-ticks" aria-hidden="true">
          {hours.map(h => (
            <span key={h} style={{ left: pct(h) }}>{h % 180 === 0 ? formatClock(h).replace(':00', '') : ''}</span>
          ))}
        </div>
        <div className="clock-marks">
          {markers.map((r, i) => (
            <button
              key={`${r.name}-${r.at}-${i}`}
              type="button"
              className={`clock-mark${r.kind === 'trigger' ? ' is-trigger' : ''}`}
              style={{ left: pct(r.at) }}
              onClick={() => onSeek(r.at - 7)}
              title={`${r.name} — ${r.schedule}`}
              aria-label={`Jump to ${r.name}, ${r.kind === 'trigger' ? r.schedule : formatClock(r.at)}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
