import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import PageMeta from './components/PageMeta'
import EpisodeTransition from './components/EpisodeTransition'
import GossipEye from './components/GossipEye'
import { RevealContext } from './context/reveal'
import HomePage from './features/home/HomePage'
import AboutPage from './features/about/AboutPage'
import ProjectsPage from './features/projects/ProjectsPage'
// import WritingPage from './features/writing/WritingPage' // hidden until there are more articles
import ContactPage from './features/contact/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      {/* <Route path="/writing" element={<WritingPage />} /> */}
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [revealed, setRevealed] = useState(false)

  // Smooth scroll — Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Lock scroll during preloader
  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : ''
  }, [showPreloader])

  return (
    <>
      <PageMeta />
      <AnimatePresence>
        {showPreloader && (
          <Preloader
            key="preloader"
            onComplete={() => {
              setShowPreloader(false)
              setRevealed(true)
            }}
          />
        )}
      </AnimatePresence>
      <CustomCursor />
      <ScrollToTop />
      <EpisodeTransition />
      <Nav />
      <RevealContext.Provider value={revealed}>
        <AnimatedRoutes />
      </RevealContext.Provider>
      <GossipEye />
    </>
  )
}

export default App
