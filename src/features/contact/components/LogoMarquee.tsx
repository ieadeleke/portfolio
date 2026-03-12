import { motion, cubicBezier } from 'framer-motion'
import ExpandLine from '../../../components/ExpandLine'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const logos = [
  { name: 'APEX', style: 'tracking-[0.25em] font-medium text-[0.8125rem]' },
  { name: 'NEXUS', style: 'tracking-[-0.03em] font-extrabold text-[1.125rem]' },
  { name: 'ORBITAL', style: 'tracking-[0.15em] font-light text-[0.875rem]' },
  { name: 'PRISM', style: 'tracking-[0.08em] font-bold text-[1rem] italic' },
  { name: 'VERTEX', style: 'tracking-[-0.04em] font-black text-[1.25rem]' },
  { name: 'FLUX', style: 'tracking-[0.2em] font-medium text-[0.75rem]' },
  { name: 'HELIX', style: 'tracking-[0.1em] font-semibold text-[0.9375rem]' },
]

export default function LogoMarquee() {
  return (
    <section className="bg-black">
        <div className="px-[clamp(24px,5vw,80px)] pt-[clamp(48px,6vw,80px)]">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              className="flex items-center gap-4 mb-[clamp(2rem,4vw,3.5rem)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <ExpandLine className="bg-[#333] w-12" />
              <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555]">
                Trusted By
              </p>
            </motion.div>
          </div>
        </div>

        <ExpandLine className="bg-[#222]" />

        {/* First row — scrolls left */}
        <div className="overflow-hidden border-b border-[#222]">
          <motion.div
            className="flex whitespace-nowrap py-[clamp(24px,3vw,40px)]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          >
            {[0, 1].map((set) => (
              <div key={set} className="flex shrink-0 items-center">
                {logos.map((logo) => (
                  <span
                    key={`${set}-${logo.name}`}
                    className={`uppercase text-[#444] select-none mx-[clamp(32px,5vw,64px)] transition-colors duration-300 hover:text-off-white ${logo.style}`}
                  >
                    {logo.name}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row — scrolls right (reversed) */}
        <div className="overflow-hidden border-b border-[#222]">
          <motion.div
            className="flex whitespace-nowrap py-[clamp(24px,3vw,40px)]"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
          >
            {[0, 1].map((set) => (
              <div key={set} className="flex shrink-0 items-center">
                {[...logos].reverse().map((logo) => (
                  <span
                    key={`${set}-${logo.name}`}
                    className={`uppercase text-[#444] select-none mx-[clamp(32px,5vw,64px)] transition-colors duration-300 hover:text-off-white ${logo.style}`}
                  >
                    {logo.name}
                  </span>
                ))}
                <span className="text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-[#333] mx-[clamp(32px,5vw,64px)]">
                  Your brand here
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="h-[clamp(48px,6vw,80px)]" />
      </section>
  )
}
