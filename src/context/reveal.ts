import { createContext, useContext } from 'react'

/**
 * True once the Genesis preloader has finished and lifted away. The home hero
 * holds its foreground entrance until this flips, so the "movie" starts as the
 * curtain clears instead of playing out behind it.
 */
export const RevealContext = createContext(false)
export const useRevealed = () => useContext(RevealContext)
