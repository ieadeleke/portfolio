import { useEffect, useRef } from 'react'
import leftArt from './hand-left.txt?raw'
import rightArt from './hand-right.txt?raw'

/**
 * "Hand of God" — Michelangelo's Creation of Adam hands drawn from hand-crafted
 * ASCII art on canvas, each glyph centred in a square cell. Layered ambient life:
 *  - counter-parallax drift on pointer move
 *  - one-time "decode-in" reveal on load (glyphs resolve out of noise)
 *  - constant subtle glyph flicker (living code)
 *  - fingertip charge-up, then a spark that streaks the gap and ripples outward
 *  - occasional drifting embers rising off the hands
 */

const COLS = 80
const COLOR = '#983520'
const RIPPLE_COLOR = '#ff8a52'
const SPARK_COLOR = '#ffe4c4'
const EMBER_COLOR = '#c86a44'
const GLYPH_RATIO = 1.2
const PAD_TOP = 0.16
const AMP_X = 15
const AMP_Y = 6
const EDGE_BLEED = AMP_X + 2 // arms overflow their edge so parallax never reveals a gap

// timing (ms)
const INTRO_DUR = 1600 // decode-in reveal
const SPARK_START_DELAY = 700 // pause after decode before the first pulse
const PERIOD = 5200
const SPARK_DUR = 520
const RIPPLE_START = 460
const RIPPLE_DUR = 1550
const CHARGE_DUR = 520 // fingertip charge before each spark

const POOL = '«»[]{}()<>/\\|;:!?+=~^-'.split('')

const leftLines = leftArt.split('\n')
const rightLines = rightArt.split('\n')

type Hand = { cv: HTMLCanvasElement; rows: number }
type Glyph = { ch: string; bx: number; by: number }
type Flicker = { hand: 0 | 1; idx: number; until: number; ch: string }
type Ember = { bx: number; by: number; hand: 0 | 1; vx: number; vy: number; age: number; life: number; ch: string }

function hash(i: number) {
  return (i * 2654435761) >>> 0
}

export default function HandOfGod() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dpr = 1
    let cell = 8
    let W = 0
    let H = 0
    let left: Hand | null = null
    let right: Hand | null = null
    let glyphsL: Glyph[] = []
    let glyphsR: Glyph[] = []
    let tipGlyphsL: Glyph[] = []
    let tipGlyphsR: Glyph[] = []
    let contactX = 0
    let contactY = 0
    let godTipX = 0
    let godTipY = 0
    let adamTipX = 0
    let adamTipY = 0
    let maxDist = 1
    let raf = 0
    let start = 0
    let lastNow = 0
    const flickers: Flicker[] = []
    const embers: Ember[] = []

    const randGlyph = (seed: number) => POOL[hash(seed) % POOL.length]

    function buildHand(lines: string[]): Hand {
      const rows = lines.length
      const cv = document.createElement('canvas')
      cv.width = Math.ceil(COLS * cell * dpr)
      cv.height = Math.ceil(rows * cell * dpr)
      const c = cv.getContext('2d')!
      c.scale(dpr, dpr)
      c.font = `${(cell * GLYPH_RATIO).toFixed(2)}px "Courier New", monospace`
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillStyle = COLOR
      for (let r = 0; r < rows; r++) {
        const line = lines[r]
        for (let col = 0; col < Math.min(COLS, line.length); col++) {
          if (line[col] !== ' ') c.fillText(line[col], col * cell + cell / 2, r * cell + cell / 2)
        }
      }
      return { cv, rows }
    }

    function originY(rows: number) {
      return (H + PAD_TOP * H - rows * cell) / 2
    }

    function collect(lines: string[], x0: number): Glyph[] {
      const oy = originY(lines.length)
      const out: Glyph[] = []
      for (let r = 0; r < lines.length; r++) {
        const line = lines[r]
        for (let col = 0; col < Math.min(COLS, line.length); col++) {
          if (line[col] !== ' ') out.push({ ch: line[col], bx: x0 + col * cell + cell / 2, by: oy + r * cell + cell / 2 })
        }
      }
      return out
    }

    function build() {
      const rect = wrap!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = rect.width
      H = rect.height
      cell = Math.max(6, Math.min(W * 0.0057, 11))
      canvas!.width = Math.ceil(W * dpr)
      canvas!.height = Math.ceil(H * dpr)
      canvas!.style.width = `${W}px`
      canvas!.style.height = `${H}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.font = `${(cell * GLYPH_RATIO).toFixed(2)}px "Courier New", monospace`
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'
      left = buildHand(leftLines)
      right = buildHand(rightLines)

      const lw = COLS * cell
      glyphsL = collect(leftLines, 0)
      glyphsR = collect(rightLines, W - lw)
      adamTipX = -Infinity
      for (const g of glyphsL) if (g.bx > adamTipX) { adamTipX = g.bx; adamTipY = g.by }
      godTipX = Infinity
      for (const g of glyphsR) if (g.bx < godTipX) { godTipX = g.bx; godTipY = g.by }
      contactX = (adamTipX + godTipX) / 2
      contactY = (adamTipY + godTipY) / 2
      maxDist = 1
      for (const g of glyphsL) { const d = Math.hypot(g.bx - contactX, g.by - contactY); if (d > maxDist) maxDist = d }
      for (const g of glyphsR) { const d = Math.hypot(g.bx - contactX, g.by - contactY); if (d > maxDist) maxDist = d }
      const near = cell * 4.5
      tipGlyphsL = glyphsL.filter((g) => Math.hypot(g.bx - adamTipX, g.by - adamTipY) < near)
      tipGlyphsR = glyphsR.filter((g) => Math.hypot(g.bx - godTipX, g.by - godTipY) < near)
      flickers.length = 0
      embers.length = 0
    }

    const pointer = { tx: 0, ty: 0, x: 0, y: 0 }

    function draw(now: number) {
      if (!start) { start = now; lastNow = now }
      const dt = Math.min(64, now - lastNow)
      lastNow = now
      const elapsed = now - start
      ctx!.clearRect(0, 0, W, H)
      if (!left || !right) { raf = requestAnimationFrame(draw); return }

      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      const dx = pointer.x * AMP_X
      const dy = pointer.y * AMP_Y
      const lw = COLS * cell
      // baseline outward bleed keeps each arm past its screen edge through the full parallax range
      const lox = -dx - EDGE_BLEED
      const rox = dx + EDGE_BLEED
      const oyL = originY(left.rows) + dy
      const oyR = originY(right.rows) + dy

      if (reduceMotion) {
        ctx!.drawImage(left.cv, lox, oyL, lw, left.rows * cell)
        ctx!.drawImage(right.cv, W - lw + rox, oyR, lw, right.rows * cell)
        return
      }

      // --- decode-in reveal (one time) ---
      if (elapsed < INTRO_DUR) {
        const p = elapsed / INTRO_DUR
        ctx!.fillStyle = COLOR
        const decode = (arr: Glyph[], ox: number) => {
          for (let i = 0; i < arr.length; i++) {
            const g = arr[i]
            const rv = (hash(i) % 1000) / 1000 * 0.65
            const local = (p - rv) / 0.35
            let ch: string
            let a: number
            if (local <= 0) { ch = randGlyph(i + ((now / 70) | 0)); a = 0.16 }
            else if (local < 1) { ch = local < 0.65 ? randGlyph(i + ((now / 50) | 0)) : g.ch; a = 0.16 + local * 0.84 }
            else { ch = g.ch; a = 1 }
            ctx!.globalAlpha = a
            ctx!.fillText(ch, g.bx + ox, g.by + dy)
          }
        }
        decode(glyphsL, lox)
        decode(glyphsR, rox)
        ctx!.globalAlpha = 1
        raf = requestAnimationFrame(draw)
        return
      }

      // --- base hands ---
      ctx!.drawImage(left.cv, lox, oyL, lw, left.rows * cell)
      ctx!.drawImage(right.cv, W - lw + rox, oyR, lw, right.rows * cell)

      // --- ambient glyph flicker ---
      for (let k = flickers.length - 1; k >= 0; k--) if (flickers[k].until < now) flickers.splice(k, 1)
      while (flickers.length < 26) {
        const hand: 0 | 1 = Math.random() < 0.5 ? 0 : 1
        const arr = hand ? glyphsR : glyphsL
        flickers.push({ hand, idx: (Math.random() * arr.length) | 0, until: now + 120 + Math.random() * 260, ch: randGlyph((Math.random() * 9999) | 0) })
      }
      ctx!.fillStyle = COLOR
      for (const f of flickers) {
        const arr = f.hand ? glyphsR : glyphsL
        const g = arr[f.idx]
        if (!g) continue
        const x = g.bx + (f.hand ? rox : lox)
        const y = g.by + dy
        ctx!.clearRect(x - cell / 2, y - cell / 2, cell, cell)
        ctx!.fillText(f.ch, x, y)
      }

      // --- spark pulse cycle ---
      const st = elapsed - INTRO_DUR - SPARK_START_DELAY
      if (st > 0) {
        const t = st % PERIOD

        // charge-up: fingertips flare just before the spark
        if (t > PERIOD - CHARGE_DUR) {
          const ci = (t - (PERIOD - CHARGE_DUR)) / CHARGE_DUR
          const flick = 0.6 + 0.4 * Math.abs(Math.sin(now / 40))
          ctx!.fillStyle = SPARK_COLOR
          for (const g of tipGlyphsL) { ctx!.globalAlpha = ci * flick; ctx!.fillText(g.ch, g.bx + lox, g.by + dy) }
          for (const g of tipGlyphsR) { ctx!.globalAlpha = ci * flick; ctx!.fillText(g.ch, g.bx + rox, g.by + dy) }
          ctx!.globalAlpha = 1
        }

        // ripple: expanding ring of brightened glyphs from the contact point
        if (t >= RIPPLE_START && t < RIPPLE_START + RIPPLE_DUR) {
          const p = (t - RIPPLE_START) / RIPPLE_DUR
          const radius = p * maxDist
          const band = cell * 7
          const tail = 1 - p * 0.55
          ctx!.fillStyle = RIPPLE_COLOR
          const paint = (arr: Glyph[], ox: number) => {
            for (let i = 0; i < arr.length; i++) {
              const g = arr[i]
              const dd = Math.abs(Math.hypot(g.bx - contactX, g.by - contactY) - radius)
              if (dd < band) {
                ctx!.globalAlpha = (1 - dd / band) * tail
                ctx!.fillText(g.ch, g.bx + ox, g.by + dy)
              }
            }
          }
          paint(glyphsL, lox)
          paint(glyphsR, rox)
          ctx!.globalAlpha = 1
        }

        // spark: bright streak crossing the gap, brightest at its head
        if (t < SPARK_DUR) {
          const head = t / SPARK_DUR
          // endpoints follow the actual (bled + parallax) fingertip positions
          const gx = godTipX + rox
          const gy = godTipY + dy
          const ax = adamTipX + lox
          const ay = adamTipY + dy
          const steps = Math.max(2, Math.round(Math.hypot(ax - gx, ay - gy) / cell))
          ctx!.fillStyle = SPARK_COLOR
          for (let i = 0; i <= steps; i++) {
            const u = i / steps
            if (u > head) break
            const behind = head - u
            if (behind > 0.45) continue
            ctx!.globalAlpha = 1 - behind / 0.45
            ctx!.fillText(behind < 0.06 ? '*' : '=', gx + (ax - gx) * u, gy + (ay - gy) * u)
          }
          ctx!.globalAlpha = 1
        }
      }

      // --- drifting embers ---
      if (embers.length < 22 && Math.random() < 0.04) {
        const fromR = Math.random() < 0.5
        const arr = fromR ? glyphsR : glyphsL
        const g = arr[(Math.random() * arr.length) | 0]
        if (g) embers.push({ bx: g.bx, by: g.by, hand: fromR ? 1 : 0, vx: (Math.random() - 0.5) * 14, vy: -(24 + Math.random() * 34), age: 0, life: 1300 + Math.random() * 900, ch: randGlyph((Math.random() * 9999) | 0) })
      }
      ctx!.fillStyle = EMBER_COLOR
      for (let k = embers.length - 1; k >= 0; k--) {
        const e = embers[k]
        e.age += dt
        if (e.age >= e.life) { embers.splice(k, 1); continue }
        const tt = e.age / e.life
        const secs = e.age / 1000
        ctx!.globalAlpha = (1 - tt) * 0.6
        ctx!.fillText(e.ch, e.bx + (e.hand ? rox : lox) + e.vx * secs, e.by + dy + e.vy * secs)
      }
      ctx!.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    function onMove(e: PointerEvent) {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    let resizeTimer = 0
    function onResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        build()
        if (reduceMotion) draw(0)
      }, 150)
    }

    build()
    raf = requestAnimationFrame(draw)
    if (!reduceMotion) window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.7 }} />
    </div>
  )
}
