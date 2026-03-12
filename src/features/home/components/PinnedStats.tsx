import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'


const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
]

function CounterDisplay({
  value,
  suffix,
  scrollProgress,
  delay,
}: {
  value: number
  suffix: string
  scrollProgress: MotionValue<number>
  delay: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useTransform(scrollProgress, [0.2 + delay, 0.5 + delay], [0, value])

  useEffect(() => {
    const unsubscribe = count.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(Math.max(0, Math.min(v, value)))}${suffix}`
      }
    })
    return unsubscribe
  }, [count, value, suffix])

  return (
    <span
      ref={ref}
      className="block text-[clamp(3rem,10vw,8rem)] font-black leading-none text-off-white tabular-nums"
    >
      0{suffix}
    </span>
  )
}

export default function PinnedStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const containerOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const containerScale = useTransform(scrollYProgress, [0.1, 0.3], [0.85, 1])
  const bgTextOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 0.4, 0.4, 0])
  const bgTextScale = useTransform(scrollYProgress, [0.15, 0.35], [0.6, 1])
  const labelOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1])

  return (
    <section ref={sectionRef} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background text */}
        <motion.span
          className="absolute text-[clamp(4rem,20vw,18rem)] font-black uppercase text-[#111] select-none pointer-events-none"
          style={{ opacity: bgTextOpacity, scale: bgTextScale }}
        >
          Impact
        </motion.span>

        {/* Stats grid */}
        <motion.div
          className="relative z-10 grid grid-cols-3 gap-[clamp(24px,6vw,80px)] max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)] max-sm:grid-cols-1 max-sm:gap-12"
          style={{ opacity: containerOpacity, scale: containerScale }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <CounterDisplay
                value={stat.value}
                suffix={stat.suffix}
                scrollProgress={scrollYProgress}
                delay={i * 0.05}
              />
              <motion.p
                className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-[#555] mt-2"
                style={{ opacity: labelOpacity }}
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
