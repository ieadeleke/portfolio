import { useRef } from 'react'
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'
import HandOfGod from './HandOfGod'


const ease = cubicBezier(0.16, 1, 0.3, 1)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <HandOfGod />
        <motion.div
          className="absolute bottom-8 left-12 right-12 z-[1] flex items-end justify-between max-lg:bottom-6 max-lg:left-6 max-lg:right-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease }}
          >
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-white/50">
              Based in Lagos, NG
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease }}
          >
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-white/50">
              Scroll &darr;
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-[1] border-t border-white/10 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap py-[clamp(14px,2vw,20px)]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold tracking-[0.2em] uppercase text-off-white mx-[clamp(20px,3vw,40px)]">
                    Fullstack Developer
                  </span>
                  <span className="text-[0.5rem] text-[#555]">&#10038;</span>
                  <span className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold tracking-[0.2em] uppercase text-off-white mx-[clamp(20px,3vw,40px)]">
                    Design &times; Code
                  </span>
                  <span className="text-[0.5rem] text-[#555]">&#10038;</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
