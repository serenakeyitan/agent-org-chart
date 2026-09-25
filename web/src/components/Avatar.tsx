const SHIRTS = ['#4f7cff', '#2bb673', '#d9534f', '#9b59b6', '#16a2b8', '#e67e22', '#3d5a80', '#c0392b', '#27ae60', '#8e44ad', '#d35400']
const LEAD_SHIRT = '#e0a526'
const SKIN = ['#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#ffdbac']
const HAIR = ['#3b2a1a', '#1c1c1c', '#7a4a21', '#b5651d', '#4a3222']

// The little standing person from the office sim. Colours come from the role's
// position in its chart, so a bot looks the same everywhere; orchestrators wear gold.
export default function Avatar({ index, lead, height = 48, selected = false }: { index: number; lead: boolean; height?: number; selected?: boolean }) {
  const shirt = lead ? LEAD_SHIRT : SHIRTS[index % SHIRTS.length]
  const skin = SKIN[(index * 3) % SKIN.length]
  const hair = HAIR[(index * 2) % HAIR.length]
  return (
    <svg className="person" width={(height * 30) / 48} height={height} viewBox="0 0 30 48" aria-hidden="true" style={{ ['--i' as string]: index }}>
      <ellipse cx="15" cy="44" rx="10" ry="4" fill="#000" fillOpacity="0.18" />
      {selected && <ellipse cx="15" cy="44" rx="14" ry="5.5" fill="none" stroke="var(--accent)" strokeWidth="2.2" />}
      <g className="person-body">
        <rect x="8.5" y="20" width="13" height="19" rx="4.5" fill={shirt} />
        <circle cx="15" cy="14" r="7" fill={skin} />
        <path d="M8 13a7 7 0 0 1 14 0z" fill={hair} />
      </g>
    </svg>
  )
}
