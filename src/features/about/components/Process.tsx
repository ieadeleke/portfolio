import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import ExpandLine from "../../../components/ExpandLine";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const ProcessList = [
  {
    name: 'Discover & align',
    tone: 'lime',
    shape: 1,
    pattern: 'pattern-topo',
    desc:
      'I start by understanding the request, the users, and the goals. We define success, constraints, and risks together.',
  },
  {
    name: 'Plan & slice (agile)',
    tone: 'dark',
    shape: 2,
    pattern: 'pattern-topo',
    desc:
      'I break the work into small, visible, and testable goals the client can track — a backlog that moves in short iterations.',
  },
  {
    name: 'Ship the MVP',
    tone: 'olive',
    shape: 3,
    pattern: 'pattern-topo',
    desc:
      'We ship a lean, production‑ready MVP early to validate direction. Releases stay small and frequent.',
  },
  {
    name: 'Learn & iterate',
    tone: 'night',
    shape: 4,
    pattern: 'pattern-topo',
    desc:
      'I gather user/client insights and metrics, then turn them into the next set of improvements — performance, UX, features.',
  },
]

const Process = () => {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const titleRefs = useRef<HTMLDivElement[]>([])
  const [titleWidths, setTitleWidths] = useState<number[]>([])

  useEffect(() => {
    const measure = () => {
      const widths = ProcessList.map((_, idx) => {
        const el = titleRefs.current[idx]
        return el ? Math.ceil(el.getBoundingClientRect().width) : 0
      })
      setTitleWidths(widths)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section className="bg-black">
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,5vw,80px)]">
        <motion.div
          className="flex items-center gap-4 mb-[clamp(20px,3vw,32px)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <ExpandLine className="bg-[#333] w-10" />
          <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#666]">My Development Process</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {ProcessList.map((c, i) => {
            const palette =
              c.tone === 'lime'
                ? { bg: 'var(--color-mint-200)', fg: 'var(--color-black)' }
                : c.tone === 'olive'
                ? { bg: 'var(--color-olive-700)', fg: 'var(--color-gray-light)' }
                : c.tone === 'night'
                ? { bg: 'var(--color-charcoal)', fg: 'var(--color-off-white)' }
                : { bg: 'var(--color-charcoal)', fg: 'var(--color-off-white)' }

            const isExpanded = expanded === i
            const isHover = hovered === i
            const showDesc = isExpanded || isHover
            return (
              <motion.div
                key={c.name}
                className={`tile group relative min-h-[17rem] border border-[#1a1a1a] overflow-hidden rounded-sm flex items-center justify-center ${c.pattern}`}
                data-expanded={isExpanded}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((curr) => (curr === i ? null : curr))}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
              >
                {/* Soft darkening overlay */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-500" />
                <div
                  className={`shape shape-${c.shape}`}
                  style={{ background: palette.bg, color: palette.fg }}
                >
                  <span aria-hidden className="shape-deco">✦</span>
                  <motion.div
                    className="flex flex-col items-center text-center gap-2"
                    layout
                    transition={{ layout: { type: 'spring', stiffness: 280, damping: 28 } }}
                  >
                    <motion.div
                      ref={(el) => {
                        if (el) titleRefs.current[i] = el
                      }}
                      // style={{ width: titleWidths[i] ? `${titleWidths[i]}px` : undefined }}
                      style={{ width: '100%' }}
                      animate={{ y: showDesc ? -10 : 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <h3 className="shape-title text-[clamp(0.95rem,1.6vw,1.35rem)] leading-[1.05] z-[1]">
                        {c.name.split(' ').map((word, wIdx) => (
                          <motion.span
                            key={`${c.name}-${wIdx}`}
                            className="inline-block mr-[0.35ch]"
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.55, delay: wIdx * 0.035, ease }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </h3>
                    </motion.div>
                    <motion.div layout transition={{ layout: { type: 'spring', stiffness: 240, damping: 32 }, duration: 0.35 }} className="w-full flex flex-col items-center">
                    <AnimatePresence initial={false}>
                      {showDesc && (
                        <motion.div
                          key="desc"
                          // style={{ width: titleWidths[i] ? `${titleWidths[i]}px` : undefined, overflow: 'hidden' }}
                          initial={{ opacity: 0, height: 0, y: 4 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: 4 }}
                          transition={{ duration: 0.5, ease }}
                        >
                          <p
                            className="text-[clamp(0.8rem,1.2vw,0.9rem)] leading-[1.55] opacity-80"
                            style={{ color: palette.fg }}
                          >
                            {c.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </div>
                <button
                  type="button"
                  aria-label={(isExpanded ? `Collapse` : `Expand`) + ` ${c.name}`}
                  className="tile-plus"
                  onClick={() => setExpanded(isExpanded ? null : i)}
                >
                  {isExpanded || isHover ? '−' : '+'}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
