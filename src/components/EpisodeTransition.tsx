import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, cubicBezier } from 'framer-motion'

/**
 * Friends-style page transition. Intercepts internal-link clicks and, instead of
 * navigating immediately, rolls a black circle in FROM THE RIGHT over the current
 * page, announces "The One Where…", navigates while fully covered (so the new
 * page never peeks), then rolls the circle back out to reveal it.
 */
const ease = cubicBezier(0.76, 0, 0.24, 1)
const contentEase = cubicBezier(0.16, 1, 0.3, 1)
const COVER_MS = 620
const HOLD_MS = 1400
const REVEAL_MS = 650
const COLLAPSED = 'circle(0% at 100% 50%)'
const EXPANDED = 'circle(150% at 100% 50%)'

const TITLES: Record<string, { prefix: string; rest: string }> = {
  '/': { prefix: 'The One Where', rest: 'It All Begins' },
  '/about': { prefix: 'The One Where', rest: 'I Tell You About Myself' },
  '/projects': { prefix: 'The One With', rest: 'All the Work' },
  '/contact': { prefix: 'The One Where', rest: 'We Say Hello' },
}

const DOTS = ['#e14b4b', '#f4c430', '#4a90d9', '#5aa469']

type Phase = 'idle' | 'cover' | 'hold' | 'reveal'

export default function EpisodeTransition() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('idle')
  const [dest, setDest] = useState('/')
  const phaseRef = useRef<Phase>('idle')
  const navRef = useRef(navigate)
  const timersRef = useRef<number[]>([])

  // keep navigate fresh without re-subscribing the click listener
  useEffect(() => {
    navRef.current = navigate
  }, [navigate])

  useEffect(() => {
    const set = (p: Phase) => {
      phaseRef.current = p
      setPhase(p)
    }
    const clearTimers = () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest?.('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || a.getAttribute('target') === '_blank') return
      if (href === window.location.pathname) return
      e.preventDefault() // stop the Link from navigating; we drive it
      if (phaseRef.current !== 'idle') return

      setDest(href)
      set('cover')
      clearTimers()
      timersRef.current.push(
        window.setTimeout(() => {
          navRef.current(href) // swap the page while fully covered
          set('hold')
        }, COVER_MS),
        window.setTimeout(() => set('reveal'), COVER_MS + HOLD_MS),
        window.setTimeout(() => set('idle'), COVER_MS + HOLD_MS + REVEAL_MS),
      )
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      clearTimers()
    }
  }, [])

  if (phase === 'idle') return null

  const title = TITLES[dest] ?? { prefix: 'The One', rest: '' }
  const covered = phase === 'cover' || phase === 'hold'

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black px-8 [will-change:clip-path]"
      initial={{ clipPath: COLLAPSED }}
      animate={{ clipPath: covered ? EXPANDED : COLLAPSED }}
      transition={{ duration: (phase === 'reveal' ? REVEAL_MS : COVER_MS) / 1000, ease }}
    >
      <motion.div
        className="text-center"
        animate={{ opacity: phase === 'hold' ? 1 : 0, y: phase === 'hold' ? 0 : 12 }}
        transition={{ duration: 0.4, ease: contentEase }}
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          {DOTS.map((c, i) => (
            <motion.span
              key={c}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: c }}
              animate={{ scale: phase === 'hold' ? 1 : 0 }}
              transition={{ delay: phase === 'hold' ? 0.1 + i * 0.08 : 0, type: 'spring', stiffness: 400, damping: 14 }}
            />
          ))}
        </div>
        <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-white/45">
          {title.prefix}
        </p>
        <h2
          className="text-[clamp(1.6rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-off-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title.rest}
        </h2>
      </motion.div>
    </motion.div>
  )
}
