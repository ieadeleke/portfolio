import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device — hide custom cursor
    const checkTouch = () => setIsTouch(true)
    window.addEventListener('touchstart', checkTouch, { once: true })

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, textarea, select, [data-cursor]')) {
        setHovering(true)
      }
    }

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest('a, button, input, textarea, select, [data-cursor]')) {
        setHovering(false)
      }
    }

    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      window.removeEventListener('touchstart', checkTouch)
    }
  }, [])

  if (isTouch) return null

  const size = hovering ? 48 : 16

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference bg-white"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
        opacity: { duration: 0.15 },
      }}
    />
  )
}
