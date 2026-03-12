import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, cubicBezier } from 'framer-motion'
import ExpandLine from '../../../components/ExpandLine'
import friendsGif from '../../../assets/friends.gif'
import arsenalGif from '../../../assets/arsenal.gif'
import tictacGif from '../../../assets/tictac.gif'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const facts = [
  {
    gif: friendsGif,
    alt: 'Friends',
    text: "I watch Friends every single year. I've seen every episode at least 10 times.",
  },
  {
    gif: arsenalGif,
    alt: 'Arsenal',
    text: 'Die-hard Arsenal fan. Match days are sacred — no meetings, no calls.',
  },
  {
    gif: tictacGif,
    alt: 'Tic Tac Toe',
    text: 'Unbeatable at Tic Tac Toe. Seriously, try me.',
  },
]

export default function FunFacts() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % facts.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="bg-black relative overflow-hidden">
      {/* Scroll-driven marquee behind content */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none z-0"
        style={{ x: marqueeX }}
      >
        <span className="text-[clamp(6rem,18vw,14rem)] font-black uppercase text-[#0f0f0f] tracking-[-0.04em]">
          Fun Facts &mdash; Fun Facts &mdash; Fun Facts &mdash; Fun Facts
        </span>
      </motion.div>

      <div className="grid grid-cols-2 max-lg:grid-cols-1 relative z-10">
        {/* Left — GIF with curtain reveal */}
        <div className="relative overflow-hidden min-h-[400px] max-lg:min-h-[300px]">
          <motion.div
            className="absolute inset-0 bg-black z-10"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{ transformOrigin: 'bottom' }}
          />
          <AnimatePresence mode="wait">
            <motion.img
              key={facts[active].alt}
              src={facts[active].gif}
              alt={facts[active].alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease }}
            />
          </AnimatePresence>
        </div>

        {/* Right — Facts */}
        <div className="py-[clamp(32px,4vw,60px)] px-[clamp(24px,4vw,60px)] flex flex-col justify-center">
          <motion.div
            className="flex items-center gap-4 mb-[clamp(1.5rem,3vw,2.5rem)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <ExpandLine className="bg-[#333] w-8" />
            <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555]">
              Facts about me
            </p>
          </motion.div>

          <div className="flex flex-col">
            {facts.map((fact, i) => (
              <div key={fact.alt}>
                <ExpandLine className="bg-[#222]" delay={i * 0.06} />
                <motion.button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex gap-[clamp(0.75rem,1.5vw,1.5rem)] py-[clamp(1rem,1.5vw,1.5rem)] items-start text-left w-full transition-opacity duration-700 ease-in-out ${
                    i === active ? 'opacity-100' : 'opacity-30 cursor-pointer hover:opacity-50'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: i === active ? 1 : 0.3, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease }}
                >
                  <span className="text-[0.625rem] font-semibold text-[#444] tracking-[0.05em] pt-[0.15em] shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[clamp(1rem,1.6vw,1.3rem)] font-medium leading-[1.5] text-off-white">
                    {fact.text}
                  </p>
                </motion.button>
              </div>
            ))}
            <ExpandLine className="bg-[#222]" delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  )
}
