import { useRef, useState } from "react";
import { motion, cubicBezier } from 'framer-motion';

const ease = cubicBezier(0.16, 1, 0.3, 1);

export function ImageSpotlight({ src, colorSrc, alt }: { src: string; colorSrc: string; alt?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
  }

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover filter grayscale"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
      />
      {/* Color image revealed under cursor via CSS mask */}
      <motion.img
        src={colorSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          WebkitMaskImage:
            'radial-gradient(circle 170px at var(--mx) var(--my), #fff 0%, #fff 40%, transparent 60%)',
          maskImage:
            'radial-gradient(circle 170px at var(--mx) var(--my), #fff 0%, #fff 40%, transparent 60%)',
        }}
      />
    </div>
  )
}