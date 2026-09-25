// Isometric projection helpers. World units: x runs to the screen's lower right,
// y to the lower left, z is height in screen pixels.
export const TILE_W = 44
export const TILE_H = 22

export type Pt = [number, number]
export type Faces = [top: string, left: string, right: string]

export function iso(x: number, y: number, z = 0): Pt {
  return [((x - y) * TILE_W) / 2, ((x + y) * TILE_H) / 2 - z]
}

const pts = (list: Pt[]) => list.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

export function boxSvg(x: number, y: number, z: number, w: number, d: number, h: number, c: Faces, opacity?: number): string {
  const top = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)]
  const left = [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)]
  const right = [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)]
  const o = opacity === undefined ? '' : ` fill-opacity="${opacity}"`
  return `<polygon points="${pts(left)}" fill="${c[1]}"${o}/><polygon points="${pts(right)}" fill="${c[2]}"${o}/><polygon points="${pts(top)}" fill="${c[0]}"${o}/>`
}

export function quadSvg(corners: Pt[], fill: string, extra = ''): string {
  return `<polygon points="${pts(corners)}" fill="${fill}"${extra ? ' ' + extra : ''}/>`
}

// Position along a polyline, t in [0, 1].
export function alongPath(path: Pt[], t: number): Pt {
  if (path.length === 1) return path[0]
  const seg: number[] = []
  let total = 0
  for (let i = 1; i < path.length; i++) {
    const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1])
    seg.push(d)
    total += d
  }
  let dist = Math.min(Math.max(t, 0), 1) * total
  for (let i = 0; i < seg.length; i++) {
    if (dist <= seg[i] || i === seg.length - 1) {
      const k = seg[i] === 0 ? 1 : Math.min(dist / seg[i], 1)
      return [path[i][0] + (path[i + 1][0] - path[i][0]) * k, path[i][1] + (path[i + 1][1] - path[i][1]) * k]
    }
    dist -= seg[i]
  }
  return path[path.length - 1]
}

export function pathLength(path: Pt[]): number {
  let total = 0
  for (let i = 1; i < path.length; i++) total += Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1])
  return total
}
