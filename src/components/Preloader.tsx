import { useEffect, useRef } from 'react'
import { motion, cubicBezier } from 'framer-motion'
import leftArt from '../features/home/components/hand-left.txt?raw'
import rightArt from '../features/home/components/hand-right.txt?raw'

/**
 * "Genesis" preloader — an overture to the hero. The Creation-of-Adam hands
 * assemble from scattered crimson glyphs, the fingertips charge, a spark leaps
 * the gap, and a light bloom lifts away to reveal the site. Because the hero
 * renders beneath this overlay from t=0, its hands are already alive by the
 * time the bloom clears — so the handoff is one continuous beat.
 */

const ease = cubicBezier(0.16, 1, 0.3, 1)

// geometry — matched to HandOfGod so the revealed hands sit where these did
const COLS = 80
const COLOR = '#c9542f'
const RIPPLE_COLOR = '#ff8a52'
const SPARK_COLOR = '#ffe4c4'
const FLASH_CORE = '#fff6ea'
const GLYPH_RATIO = 1.2
const PAD_TOP = 0.16
const EDGE_BLEED = 17
const STACK_BP = 768 // below this width the hands stack vertically (matches HandOfGod)

// choreography (ms)
const ASSEMBLE_DUR = 1080
const CHARGE_START = 320 // after assemble
const CHARGE_DUR = 480
const SPARK_START = CHARGE_START + CHARGE_DUR
const SPARK_DUR = 640 // slow, visible bolt crossing the gap
const IMPACT_HOLD = 150 // beat where the bolt rests on Adam's fingertip
const FLASH_START = SPARK_START + SPARK_DUR + IMPACT_HOLD // kaboom only after contact
const FLASH_DUR = 400
const RIPPLE_DUR = 1000

const POOL = '«»[]{}()<>/\\|;:!?+=~^-'.split('')

const leftLines = leftArt.split('\n')
const rightLines = rightArt.split('\n')

function hash(i: number) {
  return (i * 2654435761) >>> 0
}

type Hand = { cv: HTMLCanvasElement; rows: number }
type Glyph = { ch: string; bx: number; by: number }

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dpr = 1
    let cell = 8
    let W = 0
    let H = 0
    let stacked = false
    // stacked-layout geometry
    let sxA = 0
    let syA = 0
    let sxG = 0
    let syG = 0
    let hhA = 0
    let hhG = 0
    let lwS = 0
    let left: Hand | null = null
    let right: Hand | null = null
    let glyphsL: Glyph[] = []
    let glyphsR: Glyph[] = []
    let tipGlyphsL: Glyph[] = []
    let tipGlyphsR: Glyph[] = []
    let godTipX = 0
    let godTipY = 0
    let adamTipX = 0
    let adamTipY = 0
    let maxDist = 1
    let raf = 0
    let start = 0
    let done = false

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

    // y0 overrides the centred origin (stacked layout); flip reverses row order.
    function collect(lines: string[], x0: number, y0?: number, flip?: boolean): Glyph[] {
      const rows = lines.length
      const oy = y0 ?? originY(rows)
      const out: Glyph[] = []
      for (let r = 0; r < rows; r++) {
        const line = lines[r]
        const rr = flip ? rows - 1 - r : r
        for (let col = 0; col < Math.min(COLS, line.length); col++) {
          if (line[col] !== ' ') out.push({ ch: line[col], bx: x0 + col * cell + cell / 2, by: oy + rr * cell + cell / 2 })
        }
      }
      return out
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      stacked = W < STACK_BP
      cell = stacked
        ? Math.max(3.5, Math.min(W / COLS, 9))
        : Math.max(6, Math.min(W * 0.0057, 11))
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

      if (stacked) {
        buildStacked()
        return
      }

      const lw = COLS * cell
      glyphsL = collect(leftLines, 0)
      glyphsR = collect(rightLines, W - lw)
      adamTipX = -Infinity
      for (const g of glyphsL) if (g.bx > adamTipX) { adamTipX = g.bx; adamTipY = g.by }
      godTipX = Infinity
      for (const g of glyphsR) if (g.bx < godTipX) { godTipX = g.bx; godTipY = g.by }
      // the blast originates where the bolt lands — Adam's fingertip
      maxDist = 1
      for (const g of glyphsL) { const d = Math.hypot(g.bx - adamTipX, g.by - adamTipY); if (d > maxDist) maxDist = d }
      for (const g of glyphsR) { const d = Math.hypot(g.bx - adamTipX, g.by - adamTipY); if (d > maxDist) maxDist = d }
      const near = cell * 4.5
      tipGlyphsL = glyphsL.filter((g) => Math.hypot(g.bx - adamTipX, g.by - adamTipY) < near)
      tipGlyphsR = glyphsR.filter((g) => Math.hypot(g.bx - godTipX, g.by - godTipY) < near)
    }

    // Narrow layout, matched to HandOfGod: Adam on top (as-is), God flipped
    // upside-down below it, centred by real glyph content (ignoring empty rows).
    function buildStacked() {
      lwS = COLS * cell
      hhA = left!.rows * cell
      hhG = right!.rows * cell
      sxA = (W - lwS) / 2
      sxG = (W - lwS) / 2

      const extentOf = (arr: Glyph[]) => {
        let mn = Infinity
        let mx = -Infinity
        for (const g of arr) { if (g.by < mn) mn = g.by; if (g.by > mx) mx = g.by }
        return { mn, h: mx - mn }
      }
      const eL = extentOf(collect(leftLines, sxA, 0, false))
      const eR = extentOf(collect(rightLines, sxG, 0, true))
      const jointGap = cell * 40 // must match HandOfGod so the handoff is continuous
      const contentTop = (H - (eL.h + jointGap + eR.h)) / 2
      syA = contentTop - eL.mn
      syG = contentTop + eL.h + jointGap - eR.mn

      glyphsL = collect(leftLines, sxA, syA, false)
      glyphsR = collect(rightLines, sxG, syG, true)

      const cx = W / 2
      const cy = contentTop + eL.h + jointGap / 2
      adamTipX = cx; adamTipY = cy
      let best = Infinity
      for (const g of glyphsL) { const d = Math.hypot(g.bx - cx, g.by - cy); if (d < best) { best = d; adamTipX = g.bx; adamTipY = g.by } }
      godTipX = cx; godTipY = cy
      best = Infinity
      for (const g of glyphsR) { const d = Math.hypot(g.bx - cx, g.by - cy); if (d < best) { best = d; godTipX = g.bx; godTipY = g.by } }
      // blast originates where the bolt lands — Adam's fingertip
      maxDist = 1
      for (const g of glyphsL) { const d = Math.hypot(g.bx - adamTipX, g.by - adamTipY); if (d > maxDist) maxDist = d }
      for (const g of glyphsR) { const d = Math.hypot(g.bx - adamTipX, g.by - adamTipY); if (d > maxDist) maxDist = d }
      const near = cell * 4.5
      tipGlyphsL = glyphsL.filter((g) => Math.hypot(g.bx - adamTipX, g.by - adamTipY) < near)
      tipGlyphsR = glyphsR.filter((g) => Math.hypot(g.bx - godTipX, g.by - godTipY) < near)
    }

    const lox = -EDGE_BLEED
    const rox = EDGE_BLEED

    function finish() {
      if (done) return
      done = true
      onCompleteRef.current()
    }

    // Base hands for the stacked layout: Adam upright on top, God flipped below.
    function drawStackedBase() {
      ctx!.drawImage(left!.cv, sxA, syA, lwS, hhA)
      ctx!.save()
      ctx!.translate(sxG, syG + hhG)
      ctx!.scale(1, -1)
      ctx!.drawImage(right!.cv, 0, 0, lwS, hhG)
      ctx!.restore()
    }

    function drawStacked(now: number, elapsed: number) {
      if (reduceMotion) {
        drawStackedBase()
        if (elapsed > 650) finish()
        raf = requestAnimationFrame(draw)
        return
      }

      // --- 1. assemble: decode out of noise ---
      if (elapsed < ASSEMBLE_DUR) {
        const p = elapsed / ASSEMBLE_DUR
        ctx!.fillStyle = COLOR
        const decode = (arr: Glyph[]) => {
          for (let i = 0; i < arr.length; i++) {
            const g = arr[i]
            const rv = (hash(i) % 1000) / 1000 * 0.6
            const local = (p - rv) / 0.4
            let ch: string
            let a: number
            if (local <= 0) { ch = randGlyph(i + ((now / 70) | 0)); a = 0.14 }
            else if (local < 1) { ch = local < 0.65 ? randGlyph(i + ((now / 50) | 0)) : g.ch; a = 0.14 + local * 0.86 }
            else { ch = g.ch; a = 1 }
            ctx!.globalAlpha = a
            ctx!.fillText(ch, g.bx, g.by)
          }
        }
        decode(glyphsL)
        decode(glyphsR)
        ctx!.globalAlpha = 1
        raf = requestAnimationFrame(draw)
        return
      }

      const post = elapsed - ASSEMBLE_DUR
      drawStackedBase()

      // --- 2. charge: God's fingertips flare ---
      if (post >= CHARGE_START && post < CHARGE_START + CHARGE_DUR) {
        const ci = (post - CHARGE_START) / CHARGE_DUR
        const flick = 0.6 + 0.4 * Math.abs(Math.sin(now / 40))
        ctx!.fillStyle = SPARK_COLOR
        for (const g of tipGlyphsR) { ctx!.globalAlpha = ci * flick; ctx!.fillText(g.ch, g.bx, g.by) }
        ctx!.globalAlpha = 1
      }

      // --- 3. spark: God's fingertip fires a bolt across the gap to Adam's ---
      const sp = post - SPARK_START
      if (sp >= 0 && sp < SPARK_DUR) {
        const head = sp / SPARK_DUR
        const gx = godTipX
        const gy = godTipY
        const ax = adamTipX
        const ay = adamTipY
        const steps = Math.max(2, Math.round(Math.hypot(ax - gx, ay - gy) / cell))
        ctx!.fillStyle = SPARK_COLOR
        for (let i = 0; i <= steps; i++) {
          const u = i / steps
          if (u > head) break
          const behind = head - u
          if (behind > 0.4) continue
          ctx!.globalAlpha = 1 - behind / 0.4
          ctx!.fillText(behind < 0.08 ? '*' : '=', gx + (ax - gx) * u, gy + (ay - gy) * u)
        }
        ctx!.globalAlpha = 1
      }

      // --- 3b. impact: the bolt rests on Adam's fingertip before the blast ---
      if (sp >= SPARK_DUR && post < FLASH_START) {
        const pulse = 0.6 + 0.4 * Math.abs(Math.sin(now / 45))
        ctx!.fillStyle = SPARK_COLOR
        for (const g of tipGlyphsL) { ctx!.globalAlpha = pulse; ctx!.fillText(g.ch, g.bx, g.by) }
        ctx!.globalAlpha = pulse
        ctx!.fillText('*', adamTipX, adamTipY)
        ctx!.globalAlpha = 1
      }

      // --- 4. KABOOM: ripple + light bloom from Adam's fingertip ---
      const fl = post - FLASH_START
      if (fl >= 0) {
        const exX = adamTipX
        const exY = adamTipY
        if (fl < RIPPLE_DUR) {
          const rp = fl / RIPPLE_DUR
          const radius = rp * maxDist
          const band = cell * 7
          const tail = 1 - rp * 0.55
          ctx!.fillStyle = RIPPLE_COLOR
          const paint = (arr: Glyph[]) => {
            for (const g of arr) {
              const dd = Math.abs(Math.hypot(g.bx - adamTipX, g.by - adamTipY) - radius)
              if (dd < band) {
                ctx!.globalAlpha = (1 - dd / band) * tail
                ctx!.fillText(g.ch, g.bx, g.by)
              }
            }
          }
          paint(glyphsL)
          paint(glyphsR)
          ctx!.globalAlpha = 1
        }
        const fp = Math.min(1, fl / FLASH_DUR)
        const eased = fp * fp
        const R = eased * Math.hypot(W, H) * 0.85
        const grad = ctx!.createRadialGradient(exX, exY, 0, exX, exY, Math.max(1, R))
        grad.addColorStop(0, FLASH_CORE)
        grad.addColorStop(0.55, `rgba(255,228,196,${0.9 * fp})`)
        grad.addColorStop(1, 'rgba(152,53,32,0)')
        ctx!.globalAlpha = Math.min(1, fp * 1.2)
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(exX, exY, Math.max(1, R), 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
        if (fp >= 1) { finish(); return }
      }

      raf = requestAnimationFrame(draw)
    }

    function draw(now: number) {
      if (!start) start = now
      const elapsed = now - start
      ctx!.clearRect(0, 0, W, H)
      if (!left || !right) { raf = requestAnimationFrame(draw); return }

      if (stacked) {
        drawStacked(now, elapsed)
        return
      }

      const lw = COLS * cell
      const oyL = originY(left.rows)
      const oyR = originY(right.rows)

      if (reduceMotion) {
        ctx!.drawImage(left.cv, lox, oyL, lw, left.rows * cell)
        ctx!.drawImage(right.cv, W - lw + rox, oyR, lw, right.rows * cell)
        if (elapsed > 650) finish()
        raf = requestAnimationFrame(draw)
        return
      }

      // --- 1. assemble: decode out of noise ---
      if (elapsed < ASSEMBLE_DUR) {
        const p = elapsed / ASSEMBLE_DUR
        ctx!.fillStyle = COLOR
        const decode = (arr: Glyph[], ox: number) => {
          for (let i = 0; i < arr.length; i++) {
            const g = arr[i]
            const rv = (hash(i) % 1000) / 1000 * 0.6
            const local = (p - rv) / 0.4
            let ch: string
            let a: number
            if (local <= 0) { ch = randGlyph(i + ((now / 70) | 0)); a = 0.14 }
            else if (local < 1) { ch = local < 0.65 ? randGlyph(i + ((now / 50) | 0)) : g.ch; a = 0.14 + local * 0.86 }
            else { ch = g.ch; a = 1 }
            ctx!.globalAlpha = a
            ctx!.fillText(ch, g.bx + ox, g.by)
          }
        }
        decode(glyphsL, lox)
        decode(glyphsR, rox)
        ctx!.globalAlpha = 1
        raf = requestAnimationFrame(draw)
        return
      }

      const post = elapsed - ASSEMBLE_DUR

      // --- base hands ---
      ctx!.drawImage(left.cv, lox, oyL, lw, left.rows * cell)
      ctx!.drawImage(right.cv, W - lw + rox, oyR, lw, right.rows * cell)

      // --- 2. charge: only God's fingertips flare, building the shot ---
      if (post >= CHARGE_START && post < CHARGE_START + CHARGE_DUR) {
        const ci = (post - CHARGE_START) / CHARGE_DUR
        const flick = 0.6 + 0.4 * Math.abs(Math.sin(now / 40))
        ctx!.fillStyle = SPARK_COLOR
        for (const g of tipGlyphsR) { ctx!.globalAlpha = ci * flick; ctx!.fillText(g.ch, g.bx + rox, g.by) }
        ctx!.globalAlpha = 1
      }

      // --- 3. spark: God's fingertip fires a bolt across the gap ---
      const sp = post - SPARK_START
      if (sp >= 0 && sp < SPARK_DUR) {
        const head = sp / SPARK_DUR
        const gx = godTipX + rox
        const gy = godTipY
        const ax = adamTipX + lox
        const ay = adamTipY
        const steps = Math.max(2, Math.round(Math.hypot(ax - gx, ay - gy) / cell))
        ctx!.fillStyle = SPARK_COLOR
        for (let i = 0; i <= steps; i++) {
          const u = i / steps
          if (u > head) break
          const behind = head - u
          if (behind > 0.4) continue
          ctx!.globalAlpha = 1 - behind / 0.4
          ctx!.fillText(behind < 0.08 ? '*' : '=', gx + (ax - gx) * u, gy + (ay - gy) * u)
        }
        ctx!.globalAlpha = 1
      }

      // --- 3b. impact: the bolt rests on Adam's fingertip, glowing, before the blast ---
      if (sp >= SPARK_DUR && post < FLASH_START) {
        const pulse = 0.6 + 0.4 * Math.abs(Math.sin(now / 45))
        ctx!.fillStyle = SPARK_COLOR
        for (const g of tipGlyphsL) { ctx!.globalAlpha = pulse; ctx!.fillText(g.ch, g.bx + lox, g.by) }
        ctx!.globalAlpha = pulse
        ctx!.fillText('*', adamTipX + lox, adamTipY)
        ctx!.globalAlpha = 1
      }

      // --- 4. KABOOM: ripple + light bloom bursting from Adam's fingertip, then lift away ---
      const fl = post - FLASH_START
      if (fl >= 0) {
        const exX = adamTipX + lox
        const exY = adamTipY
        // ripple ring bursting outward through both hands
        if (fl < RIPPLE_DUR) {
          const rp = fl / RIPPLE_DUR
          const radius = rp * maxDist
          const band = cell * 7
          const tail = 1 - rp * 0.55
          ctx!.fillStyle = RIPPLE_COLOR
          const paint = (arr: Glyph[], ox: number) => {
            for (const g of arr) {
              const dd = Math.abs(Math.hypot(g.bx - adamTipX, g.by - adamTipY) - radius)
              if (dd < band) {
                ctx!.globalAlpha = (1 - dd / band) * tail
                ctx!.fillText(g.ch, g.bx + ox, g.by)
              }
            }
          }
          paint(glyphsL, lox)
          paint(glyphsR, rox)
          ctx!.globalAlpha = 1
        }
        // light bloom
        const fp = Math.min(1, fl / FLASH_DUR)
        const eased = fp * fp
        const R = eased * Math.hypot(W, H) * 0.85
        const grad = ctx!.createRadialGradient(exX, exY, 0, exX, exY, Math.max(1, R))
        grad.addColorStop(0, FLASH_CORE)
        grad.addColorStop(0.55, `rgba(255,228,196,${0.9 * fp})`)
        grad.addColorStop(1, 'rgba(152,53,32,0)')
        ctx!.globalAlpha = Math.min(1, fp * 1.2)
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(exX, exY, Math.max(1, R), 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
        if (fp >= 1) { finish(); return }
      }

      raf = requestAnimationFrame(draw)
    }

    let resizeTimer = 0
    function onResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 150)
    }

    build()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black"
      style={{ transformOrigin: '50% 42%' }}
      exit={{ opacity: 0, scale: 1.16 }}
      transition={{ duration: 0.7, ease }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </motion.div>
  )
}
