import { useState, useEffect } from 'react'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'
import ExpandLine from '../../../components/ExpandLine'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const techPanels = [
  ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Figma', 'React Native', 'GraphQL', 'Docker', 'AWS'],
  ['Websockets', 'Redis', 'Firebase', 'Prisma', 'Jest', 'Cypress', 'Git', 'Linux', 'Vercel', 'Stripe', 'Supabase', 'REST APIs'],
]

export default function TechStack() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === 0 ? 1 : 0))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#DFDFDF] pb-[clamp(48px,6vw,80px)] px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-[clamp(2rem,4vw,3.5rem)]">
          <motion.p
            className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gray"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            Tech Stack
          </motion.p>
          <div className="flex gap-2">
            {techPanels.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  active === i ? 'bg-black' : 'bg-[#bbb]'
                }`}
                aria-label={`Panel ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <ExpandLine className="bg-[#c8c8c8]" />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
            >
              {techPanels[active].map((tech, i) => (
                <motion.div
                  key={tech}
                  className="flex items-center justify-center h-[clamp(72px,9vw,100px)] border-b border-r border-[#c8c8c8] max-lg:[&:nth-child(3n)]:border-r-0 max-sm:[&:nth-child(3n)]:border-r max-sm:[&:nth-child(2n)]:border-r-0 last:border-r-0 [&:nth-child(4n)]:border-r-0 max-lg:[&:nth-child(4n)]:border-r"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                >
                  <motion.span
                    className="text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-gray-dark cursor-default select-none"
                    whileHover={{ scale: 1.15, color: '#0a0a0a' }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
