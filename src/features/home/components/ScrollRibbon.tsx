import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * A scroll-reactive red ribbon that grows down the center of the black
 * lower half of the homepage. Its length is tied to scroll position — it
 * extends downward and trails behind you as you move — and its curve morphs
 * (arc → S → C) as it grows. Drawn as a round-capped stroke in real pixel
 * space so the thickness stays even and the ends stay rounded.
 */
const RED = '#a8331b' // muted brick red that sinks into the black rather than clashing
const OPACITY = 0.2 // kept low so it reads as an ambient backdrop behind the content
const N = 64 // sample points down the spine
const THICKNESS = 26 // px, uniform ribbon width
const GAP_FILL = 0.82 // ribbon holds a gap under the tip until near the bottom
const CLOSE_START = 0.9 // scroll progress at which the gap begins closing to reach the bottom

/** How much of p's length to draw: a held gap that closes only near the bottom. */
function fillFor(p: number) {
  const t = Math.max(0, Math.min(1, (p - CLOSE_START) / (1 - CLOSE_START)))
  const s = t * t * (3 - 2 * t) // smoothstep
  return GAP_FILL + (1 - GAP_FILL) * s
}

/** Spine x (px) at absolute height fraction yFrac, morphing with scroll p. */
function spineX(yFrac: number, p: number, W: number) {
  const phase = p * Math.PI * 2.2
  const f = Math.PI * 2 * 1.35 // ~1.35 primary waves over the full height
  const amp = 0.125 + 0.055 * Math.sin(p * Math.PI * 2) // primary swing breathes
  const amp2 = 0.035 + 0.02 * Math.cos(p * Math.PI * 2) // secondary detail
  return (
    W *
    (0.5 +
      amp * Math.sin(yFrac * f + phase) +
      amp2 * Math.sin(yFrac * f * 2.15 + phase * 1.35))
  )
}

/**
 * Polyline for the spine revealed up to scroll progress p. `fill` scales that
 * length: 1 while scrolling down/idle (reaches the bottom), easing toward
 * UP_FILL while scrolling up so a gap opens under the tip and the retraction
 * reads as motion.
 */
function spinePath(p: number, fill: number, W: number, H: number) {
  if (W === 0 || H === 0) return ''
  // start above the top edge so the ribbon bleeds off the top (no round cap,
  // no gap); the round tip only shows at the growing bottom end.
  const yStart = -Math.max(THICKNESS, 0.05 * H)
  // going down the tip crosses the bottom edge (+THICKNESS) so its round cap is
  // clipped → flat bleed at the bottom; scrolling up, `fill` pulls it up and the
  // rounded tip reappears with space beneath it.
  const yEnd = Math.max(0.001, p) * (H + THICKNESS) * fill
  let d = ''
  for (let i = 0; i <= N; i++) {
    const y = yStart + (i / N) * (yEnd - yStart)
    const x = spineX(y / H, p, W)
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `
  }
  return d.trim()
}

export default function ScrollRibbon() {
  const ref = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    // fully drawn to the bottom once the section's end reaches the viewport bottom
    offset: ['start end', 'end end'],
  })
  // tighter, overdamped spring — tracks scroll closely (little retract lag) with no bounce
  const smooth = useSpring(scrollYProgress, { stiffness: 130, damping: 28 })
  // gap depends only on scroll position (not direction/velocity), so stopping
  // never lurches — the tip only closes to the bottom at the very end.
  const d = useTransform(smooth, (v) => spinePath(v, fillFor(v), size.w, size.h))

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
      >
        <motion.path
          d={d}
          fill="none"
          stroke={RED}
          strokeOpacity={OPACITY}
          strokeWidth={THICKNESS}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
