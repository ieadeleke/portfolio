import { useEffect, useRef } from 'react'

/**
 * The footer's accent stripe rendered as an ASCII gradient — a full-width band
 * of monospace glyphs coloured across the orange→red→pink gradient, matching
 * the site's ASCII language.
 */

const GLYPHS = '·:;~=+*xX#«»▒▓█'.split('')
const STOPS: [number, [number, number, number]][] = [
  [0, [0xff, 0x6a, 0x45]],
  [0.45, [0xff, 0x49, 0x3f]],
  [1, [0xff, 0x3b, 0x5c]],
]

function hash(c: number, r: number) {
  const n = (c * 374761393 + r * 668265263) ^ 0x5bd1e995
  return (((n ^ (n >>> 13)) >>> 0) & 0xffffffff) / 4294967295
}

function grad(t: number): string {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [t0, c0] = STOPS[i]
    const [t1, c1] = STOPS[i + 1]
    if (t >= t0 && t <= t1) {
      const f = (t - t0) / (t1 - t0)
      const r = Math.round(c0[0] + (c1[0] - c0[0]) * f)
      const g = Math.round(c0[1] + (c1[1] - c0[1]) * f)
      const b = Math.round(c0[2] + (c1[2] - c0[2]) * f)
      return `rgb(${r},${g},${b})`
    }
  }
  const last = STOPS[STOPS.length - 1][1]
  return `rgb(${last[0]},${last[1]},${last[2]})`
}

export default function AsciiGradientBand({ height = 34 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cell = 7

    function draw() {
      const W = canvas!.parentElement?.clientWidth || 1200
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cols = Math.ceil(W / cell)
      const rows = Math.max(1, Math.round(height / cell))
      const H = rows * cell
      canvas!.width = Math.ceil(W * dpr)
      canvas!.height = Math.ceil(H * dpr)
      canvas!.style.width = `${W}px`
      canvas!.style.height = `${H}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)
      ctx!.font = `${(cell * 1.25).toFixed(1)}px "Courier New", monospace`
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'
      for (let c = 0; c < cols; c++) {
        ctx!.fillStyle = grad(cols > 1 ? c / (cols - 1) : 0)
        for (let r = 0; r < rows; r++) {
          ctx!.fillText(GLYPHS[Math.floor(hash(c, r) * GLYPHS.length)], c * cell + cell / 2, r * cell + cell / 2)
        }
      }
    }

    draw()
    let t = 0
    const onResize = () => {
      window.clearTimeout(t)
      t = window.setTimeout(draw, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(t)
    }
  }, [height])

  return <canvas ref={canvasRef} className="block w-full" aria-hidden="true" />
}
