import { useState, useEffect, useRef } from 'react'
import { motion, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let frame: number
    let start: number
    const duration = 1800

    const tick = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)

      if (next < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => onCompleteRef.current(), 500)
      }
    }

    // Start counting after name reveals
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, 900)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease }}
    >
      {/* Name — text mask reveal */}
      <div className="overflow-hidden">
        <motion.h1
          className="text-[clamp(1.5rem,4vw,3rem)] font-extrabold tracking-[-0.04em] uppercase text-off-white"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          Ifeoluwase
        </motion.h1>
      </div>

      {/* Progress bar + counter */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="w-48 h-[1px] bg-[#222] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-off-white"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
        <span className="text-[0.625rem] font-medium tracking-[0.25em] text-[#444] tabular-nums">
          {progress}%
        </span>
      </motion.div>
    </motion.div>
  )
}
