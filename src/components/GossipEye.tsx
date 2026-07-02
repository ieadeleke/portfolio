import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * GossipEye — a nosy pair of eyes parked in the corner. They stay watching the
 * whole time (darting, blinking, the odd wink), and only duck away while you're
 * scrolling — popping back a beat after you stop.
 */
const HIDE_AFTER_SCROLL_MS = 600
const GAZE_MAX_X = 5 // pupil deflection range within the sclera
const GAZE_MAX_Y = 8
const GAZE_IDLE_MS = 1400 // mouse-still time before the eyes go back to wandering

type Expr = 'open' | 'blink' | 'wink'

export default function GossipEye() {
  const [awake, setAwake] = useState(true)
  const [expr, setExpr] = useState<Expr>('open')
  const timer = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const following = useRef(false)
  const followTimer = useRef<number>(0)

  // shared gaze offset (both pupils look the same way)
  const gx = useSpring(useMotionValue(0), { stiffness: 140, damping: 15 })
  const gy = useSpring(useMotionValue(0), { stiffness: 140, damping: 15 })
  const lx = useTransform(gx, (v) => 16 + v)
  const rx = useTransform(gx, (v) => 46 + v)
  const cy = useTransform(gy, (v) => 20 + v)
  const lcx = useTransform(gx, (v) => 16 + v - 1.8)
  const rcx = useTransform(gx, (v) => 46 + v - 1.8)
  const ccy = useTransform(gy, (v) => 20 + v - 1.8)

  // hide while scrolling, then pop back a beat after it stops
  useEffect(() => {
    const onScroll = () => {
      setAwake(false)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setAwake(true), HIDE_AFTER_SCROLL_MS)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // follow the cursor while it's moving; hand back to autonomous darting when still
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = containerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const len = Math.hypot(dx, dy) || 1
      gx.set((dx / len) * GAZE_MAX_X)
      gy.set((dy / len) * GAZE_MAX_Y)
      following.current = true
      window.clearTimeout(followTimer.current)
      followTimer.current = window.setTimeout(() => {
        following.current = false
      }, GAZE_IDLE_MS)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.clearTimeout(followTimer.current)
    }
  }, [gx, gy])

  // dart the eyeballs + blink/wink while awake
  useEffect(() => {
    if (!awake) {
      gx.set(0)
      gy.set(0)
      return
    }
    const dart = window.setInterval(() => {
      if (following.current) return // cursor has the wheel
      gx.set(-5 + Math.random() * 10)
      gy.set(-8 + Math.random() * 16)
    }, 850)
    const blinker = window.setInterval(() => {
      const winking = Math.random() < 0.4
      setExpr(winking ? 'wink' : 'blink')
      window.setTimeout(() => setExpr('open'), winking ? 260 : 150)
    }, 2600)
    return () => {
      window.clearInterval(dart)
      window.clearInterval(blinker)
    }
  }, [awake, gx, gy])

  const leftClosed = expr === 'blink'
  const rightClosed = expr === 'blink' || expr === 'wink'

  return (
    <AnimatePresence>
      {awake && (
        <motion.div
          ref={containerRef}
          className="pointer-events-none fixed bottom-8 right-8 z-50 flex items-end gap-2.5 max-sm:bottom-4 max-sm:right-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          {/* eyes */}
          <svg
            viewBox="0 0 62 40"
            className="h-11 w-16 shrink-0 drop-shadow-[0_0_10px_rgba(152,53,32,0.45)]"
          >
            {/* left eye */}
            {leftClosed ? (
              <>
                <ellipse cx={16} cy={20} rx={13} ry={4.5} fill="none" stroke="#f2ede2" strokeWidth={2} />
                <ellipse cx={16} cy={20} rx={12} ry={3} fill="#e9dbc2" stroke="#000000" strokeWidth={1.5} />
              </>
            ) : (
              <>
                <ellipse cx={16} cy={20} rx={13.8} ry={16.4} fill="none" stroke="#f2ede2" strokeWidth={2} />
                <ellipse cx={16} cy={20} rx={12.5} ry={15} fill="#e9dbc2" stroke="#000000" strokeWidth={1.5} />
                <motion.circle cx={lx} cy={cy} r={5.6} fill="#7a4326" stroke="#37190c" strokeWidth={0.8} />
                <motion.circle cx={lx} cy={cy} r={2.6} fill="#0a0604" />
                <motion.circle cx={lcx} cy={ccy} r={1.1} fill="#fff6ea" />
              </>
            )}
            {/* right eye */}
            {rightClosed ? (
              <>
                <ellipse cx={46} cy={20} rx={13} ry={4.5} fill="none" stroke="#f2ede2" strokeWidth={2} />
                <ellipse cx={46} cy={20} rx={12} ry={3} fill="#e9dbc2" stroke="#000000" strokeWidth={1.5} />
              </>
            ) : (
              <>
                <ellipse cx={46} cy={20} rx={13.8} ry={16.4} fill="none" stroke="#f2ede2" strokeWidth={2} />
                <ellipse cx={46} cy={20} rx={12.5} ry={15} fill="#e9dbc2" stroke="#000000" strokeWidth={1.5} />
                <motion.circle cx={rx} cy={cy} r={5.6} fill="#7a4326" stroke="#37190c" strokeWidth={0.8} />
                <motion.circle cx={rx} cy={cy} r={2.6} fill="#0a0604" />
                <motion.circle cx={rcx} cy={ccy} r={1.1} fill="#fff6ea" />
              </>
            )}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
