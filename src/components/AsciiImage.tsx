import { useEffect, useRef } from 'react'

/**
 * Renders any image as crimson ASCII glyphs on a canvas — the same image→glyph
 * technique as the hero's Hand of God, reusable across the site.
 *  - invert=true  : dark pixels → dense glyphs (good for light-bg screenshots)
 *  - invert=false : light pixels → dense glyphs (good for a lit subject on a
 *    darker/greyer background, e.g. a studio portrait)
 */
const RAMP = ' .·:;~=+ox*%#«»@'

export default function AsciiImage({
  src,
  cols = 120,
  color = '#983520',
  invert = true,
  className = '',
}: {
  src: string
  cols?: number
  color?: string
  invert?: boolean
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let cancelled = false
    const img = new Image()

    const render = () => {
      if (cancelled || !img.width) return
      const W = canvas.parentElement?.clientWidth || 600
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cell = W / cols
      const aspect = img.height / img.width
      const rows = Math.max(1, Math.round(cols * aspect))
      const H = rows * cell

      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d', { willReadFrequently: true })!
      octx.drawImage(img, 0, 0, cols, rows)
      const data = octx.getImageData(0, 0, cols, rows).data

      canvas.width = Math.ceil(W * dpr)
      canvas.height = Math.ceil(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.font = `${(cell * 1.05).toFixed(2)}px "Courier New", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = color

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
          const d = invert ? 1 - lum : lum
          const ch = RAMP[Math.floor(d * (RAMP.length - 1))]
          if (ch !== ' ') ctx.fillText(ch, c * cell + cell / 2, r * cell + cell / 2)
        }
      }
    }

    img.onload = render
    img.src = src

    let t = 0
    const onResize = () => {
      window.clearTimeout(t)
      t = window.setTimeout(render, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      window.clearTimeout(t)
    }
  }, [src, cols, color, invert])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
