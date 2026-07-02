import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'
import { site } from '../config/site'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const links = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  const toggle = () => {
    const r = btnRef.current?.getBoundingClientRect()
    if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    setOpen((o) => !o)
  }

  // on a link click the episode roll covers the screen; keep the menu covering
  // until it has (≈ the roll's cover time) then close behind it — no clashing circles
  const handleNavigate = () => {
    window.setTimeout(() => setOpen(false), 680)
  }

  return (
    <>
      {/* Top bar — always visible */}
      <div className="fixed top-0 left-0 right-0 z-[130] flex items-center justify-between px-[clamp(24px,5vw,80px)] py-5">
        <Link to="/" className="text-lg font-semibold tracking-[-0.01em] text-off-white">
          {site.name}
        </Link>
        <button
          ref={btnRef}
          type="button"
          onClick={toggle}
          className="flex flex-col gap-[6px] w-7 cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="block h-[2px] bg-off-white origin-center"
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease }}
          />
          <motion.span
            className="block h-[2px] bg-off-white origin-center"
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease }}
          />
        </button>
      </div>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-0 z-[120] flex bg-black [will-change:clip-path]"
            initial={{ clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(150% at ${origin.x}px ${origin.y}px)` }}
            exit={{ clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` }}
            transition={{ duration: 1.3, ease }}
          >
            {/* Left side — links */}
            <div className="flex flex-col justify-end flex-1 px-[clamp(24px,5vw,80px)] pb-[clamp(48px,8vw,100px)]">
              <motion.p
                className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
              >
                Navigation
              </motion.p>
              <div className="flex flex-col">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease }}
                  >
                    <Link
                      to={link.to}
                      onClick={handleNavigate}
                      className="group flex items-center"
                    >
                      <span className="text-[0.625rem] font-medium tracking-[0.1em] text-[#444] tabular-nums py-6 pr-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-none text-off-white uppercase pl-8 py-6 transition-all duration-300 group-hover:pl-12 group-hover:text-[#666]">
                        {link.label}
                      </span>
                      <span className="ml-auto text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#333] transition-all duration-300 group-hover:text-[#666] group-hover:translate-x-[-8px]">
                        &rarr;
                      </span>
                    </Link>
                  </motion.div>
                ))}
                {/* External Resume link */}
                {/* <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + links.length * 0.08, ease }}
                >
                  <a
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center"
                  >
                    <span className="text-[0.625rem] font-medium tracking-[0.1em] text-[#444] tabular-nums py-6 pr-8">
                      {String(links.length + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-none text-off-white uppercase pl-8 py-6 transition-all duration-300 group-hover:pl-12 group-hover:text-[#666]">
                      Resume
                    </span>
                    <span className="ml-auto text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#333] transition-all duration-300 group-hover:text-[#666] group-hover:translate-x-[-8px]">
                      ↗
                    </span>
                  </a>
                </motion.div> */}
              </div>
            </div>

            {/* Right side — info */}
            <motion.div
              className="hidden lg:flex flex-col justify-end w-[320px] px-10 pb-[clamp(48px,8vw,100px)] border-l border-[#222]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              <div className="mb-10">
                <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-4">
                  Get in touch
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm text-[#777] transition-colors duration-200 hover:text-off-white"
                >
                  {site.contact.email}
                </a>
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-4">
                  Social
                </p>
                <div className="flex gap-5">
                  {[
                    { name: 'X', href: site.social.x || site.social.twitter || '#' },
                    { name: 'LinkedIn', href: site.social.linkedin || '#' },
                    { name: 'GitHub', href: site.social.github || '#' },
                    { name: 'Dribbble', href: site.social.dribbble || '#' },
                  ].map((s, i) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-xs font-medium tracking-[0.05em] text-[#777] transition-colors duration-200 hover:text-off-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.05, ease }}
                    >
                      {s.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
