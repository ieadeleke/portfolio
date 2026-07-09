import { useRef } from 'react'
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'
import ExpandLine from '../../../components/ExpandLine'
import ifeImg from '../../../assets/ife.webp'
import ifeColorImg from '../../../assets/ife-color.webp'
import { ImageSpotlight } from './ImageSpotlight'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const staggerItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
}

const categories = [
  {
    title: 'Frontend',
    items: [
      'React / Next.js', 'TypeScript', 'Design Systems',
      'Tailwind CSS', 'Accessibility (WCAG)', 'React Server Components',
      'Animations (Framer Motion)', 'State Management',
      'Forms & Validation', 'Component Testing',
    ],
  },
  {
    title: 'Backend & APIs',
    items: [
      'Node.js (Express / Nest)', 'REST / GraphQL', 'Auth (JWT / OAuth)',
      'Prisma / ORM', 'PostgreSQL / MongoDB', 'Caching (Redis)',
      'Queues (BullMQ)', 'Realtime (WebSockets)',
      'File & Image Pipelines', '3rd‑party Integrations',
    ],
  },
  {
    title: 'DevOps & Quality',
    items: [
      'CI/CD (GitHub Actions)', 'Docker & Containers', 'Cloud (AWS / Vercel)',
      'Infra as Code', 'Monitoring (Sentry)', 'Logs & Metrics',
      'Performance Budgets', 'Lighthouse / Web Vitals',
      'E2E + Unit Testing', 'Security & Hardening',
    ],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])
  const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.04, 0.04, 0])

  return (
    <section ref={sectionRef} className="bg-[#DFDFDF] relative overflow-hidden pb-20">
      {/* Scrolling watermark */}
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 text-[clamp(8rem,22vw,20rem)] font-black uppercase text-black select-none pointer-events-none whitespace-nowrap"
        style={{ x: watermarkX, opacity: watermarkOpacity }}
      >
        Tools I Use &mdash; Tools I Use &mdash; Tools I Use
      </motion.span>

      <div className="grid grid-cols-[1fr_1fr_auto] max-lg:grid-cols-1 relative z-10">
        {/* Left — Image with curtain reveal */}
        <div className="relative min-h-[600px] max-lg:min-h-[350px] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-[#DFDFDF] z-10"
            initial={{ y: '0%' }}
            whileInView={{ y: '-101%' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          />
          <ImageSpotlight src={ifeImg} colorSrc={ifeColorImg} alt="Ifeoluwase portrait" />
        </div>

        {/* Center — Content */}
        <div className="py-[clamp(48px,6vw,80px)] px-[clamp(32px,4vw,60px)]">
          <motion.p
            className="text-[0.625rem] font-medium tracking-[0.15em] uppercase text-gray mb-[clamp(2rem,4vw,3.5rem)]"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            full‑stack engineering — fast, accessible, scalable.
          </motion.p>

          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              className={catIndex < categories.length - 1 ? 'mb-10' : ''}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1, ease }}
            >
              <ExpandLine className="bg-gray-light mb-4" delay={catIndex * 0.1} />
              <div className="overflow-hidden mb-4">
                <motion.h3
                  className="text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold tracking-[-0.01em] uppercase text-black"
                  initial={{ y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: 0.1 + catIndex * 0.1, ease }}
                >
                  {cat.title}
                </motion.h3>
              </div>
              <motion.div
                className="grid grid-cols-2 gap-x-8 gap-y-1.5 max-sm:gap-x-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {cat.items.map((item, i) => (
                  <motion.span
                    key={i}
                    className="text-[0.8125rem] text-[#555]"
                    variants={staggerItem}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Right — Rotated "WHAT WE DO" */}
        <div className="flex items-center justify-center w-16 max-lg:hidden relative">
          <motion.span
            className="text-[clamp(3.5rem,6vw,5rem)] font-black tracking-[-0.05em] uppercase text-black whitespace-nowrap what-we-do-vertical"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease }}
          >
            The Tools I Use
          </motion.span>
        </div>
      </div>
    </section>
  );
}
