import { Link } from 'react-router-dom'
import { motion, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

export default function CtaSection() {
  return (
    <section className="bg-black py-[clamp(60px,10vw,140px)] px-[clamp(24px,5vw,80px)] relative overflow-hidden">
      {/* Large watermark */}
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,16vw,14rem)] font-black uppercase text-[#111] select-none pointer-events-none whitespace-nowrap"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease }}
      >
        Let's Go
      </motion.span>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.p
          className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Got an idea?
        </motion.p>

        <h2 className="mb-10">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-[-0.035em] leading-[1.1] text-off-white"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease }}
            >
              Let&rsquo;s bring your
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-[-0.035em] leading-[1.1] text-off-white"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease }}
            >
              vision to life.
            </motion.span>
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        >
          <Link
            to="/contact"
            className="inline-block text-[clamp(1rem,1.5vw,1.25rem)] font-normal text-gray border-b border-[#444] pb-1 transition-colors duration-200 hover:text-off-white hover:border-off-white"
          >
            Start a conversation &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
