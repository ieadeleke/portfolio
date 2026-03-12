import { motion, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

export default function RevealWords({
  text,
  delay = 0,
  stagger = 0.04,
  className = '',
}: {
  text: string
  delay?: number
  stagger?: number
  className?: string
}) {
  const words = text.split(/\s+/)
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
            style={{ marginRight: '0.3em' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

