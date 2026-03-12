import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })
  const watermarkScale = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1])
  const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0, 0.06, 0.06, 0])

  return (
    <footer ref={footerRef} className="bg-black border-t border-[#222] relative overflow-hidden">
      {/* Watermark */}
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,18vw,16rem)] font-black uppercase text-white select-none pointer-events-none whitespace-nowrap"
        style={{ scale: watermarkScale, opacity: watermarkOpacity }}
      >
        Let's Talk
      </motion.span>

      <div className="px-[clamp(24px,5vw,80px)] relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_0.6fr] gap-[clamp(40px,8vw,120px)] py-[clamp(60px,10vw,120px)] max-lg:grid-cols-1 max-lg:gap-[clamp(48px,6vw,72px)]">
          {/* Left — CTA */}
          <div>
            <motion.p
              className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Don&rsquo;t be a stranger
            </motion.p>
            <motion.h2
              className="text-[clamp(2rem,4.5vw,4rem)] font-bold tracking-[-0.035em] leading-[1.1] text-off-white mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Got a project in mind? Let&rsquo;s create something great together.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3"
              >
                <span className="text-[clamp(1rem,1.5vw,1.25rem)] font-normal text-[#777] border-b border-[#444] pb-1 transition-colors duration-200 group-hover:text-off-white group-hover:border-off-white">
                  hello@ifeoluwase.dev
                </span>
                <span className="text-[#555] text-lg transition-all duration-300 group-hover:text-off-white group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right — Links & info */}
          <motion.div
            className="grid grid-cols-2 gap-x-[clamp(24px,3vw,48px)] gap-y-[clamp(32px,4vw,48px)]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem}>
              <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-5">
                Navigation
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link to="/projects" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={staggerItem}>
              <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-5">
                Social
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-normal text-[#666] transition-colors duration-200 hover:text-off-white">
                    Medium
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={staggerItem} className="col-span-2 border-t border-[#222] pt-[clamp(20px,3vw,32px)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3">
                    Availability
                  </p>
                  <p className="flex items-center gap-2 text-sm font-normal text-[#666]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0 animate-pulse" />
                    Open for projects
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3">
                    Location
                  </p>
                  <p className="text-sm font-normal text-[#666]">
                    Lagos, NG
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#1a1a1a] px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center py-[clamp(16px,2vw,24px)] max-sm:flex-col max-sm:gap-2">
          <span className="text-[0.5625rem] font-normal tracking-[0.08em] text-[#333]">
            &copy; 2024 Ifeoluwase. All rights reserved.
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[0.5625rem] font-medium tracking-[0.12em] uppercase text-[#333] transition-colors duration-200 hover:text-off-white cursor-pointer"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  )
}
