import { motion, cubicBezier } from 'framer-motion'
import ExpandLine from '../../../components/ExpandLine'
import creditProLogo from '../../../assets/companies/creditpro.png'
import planGenieLogo from '../../../assets/companies/plangenie.svg'
import lasgLogo from '../../../assets/companies/lasg-mono.png'
import pay4itLogo from '../../../assets/companies/pay4it.svg'
import gaagaLogo from '../../../assets/companies/gaaga.svg'
import vo3Logo from '../../../assets/companies/vo.png'
import ladoxLogo from '../../../assets/companies/ladox-mono.png'
import findworkaLogo from '../../../assets/companies/findworka-mono.png'

const ease = cubicBezier(0.16, 1, 0.3, 1)

type Client = {
  name: string
  alt?: string
  src?: string
  href?: string
  color?: boolean // keep original color (skip the white-silhouette filter)
  h?: string // per-logo height override (default h-8)
}

const clients: Client[] = [
  { name: 'CreditPro', alt: 'CreditPro', src: creditProLogo, h: 'h-6' },
  { name: 'PlanGenie', alt: 'PlanGenie', src: planGenieLogo, h: 'h-4' },
  { name: 'Lagos Theatre', alt: 'Lagos Theatre Igando', src: lasgLogo },
  { name: 'Pay4It', alt: 'Pay4It', src: pay4itLogo, h: 'h-7' },
  { name: 'Gaaga', alt: 'Gaaga', src: gaagaLogo, h: 'h-6' },
  { name: 'VO3 Designs', alt: 'VO3 Designs', src: vo3Logo, h: 'h-6' },
  { name: 'Ladox', alt: 'Ladox Engineering Company', src: ladoxLogo },
  { name: 'Findworka', alt: 'Findworka', src: findworkaLogo, h: 'h-4' },
]

export default function TrustedBy() {
  return (
    <section className="bg-black">
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,5vw,80px)] py-[clamp(60px,12vw,130px)]">
        <motion.div
          className="flex items-center gap-4 mb-[clamp(20px,3vw,32px)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <ExpandLine className="bg-[#333] w-10" />
          <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#666]">
            Trusted by teams at
          </p>
        </motion.div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-6 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              className="group flex items-center justify-center h-20 max-sm:h-16 border border-[#1a1a1a] bg-[#0b0b0b] rounded-sm overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
            >
              {c.src ? (
                <img
                  src={c.src}
                  alt={c.alt ?? c.name}
                  className={`${c.h ?? 'h-8'} w-auto max-sm:scale-75 ${
                    c.color ? '' : 'brightness-0 invert '
                  }opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />
              ) : (
                <span className="text-off-white/60 group-hover:text-off-white transition-colors duration-300 text-[0.9375rem] font-semibold tracking-[0.08em] uppercase">
                  {c.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

