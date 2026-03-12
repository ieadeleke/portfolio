import { motion, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

export default function RevealText({
  children,
  delay = 0,
  inline = false,
}: {
  children: React.ReactNode
  delay?: number
  inline?: boolean
}) {
  return (
    <span className={`${inline ? 'inline-block align-baseline' : 'block'} overflow-hidden ${inline ? '' : 'pb-1'}`}>
      <motion.span
        className={inline ? 'inline-block' : 'block'}
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}
