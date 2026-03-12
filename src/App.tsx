import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, cubicBezier } from 'framer-motion'
import Lenis from 'lenis'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import PageMeta from './components/PageMeta'
import HomePage from './features/home/HomePage'
import AboutPage from './features/about/AboutPage'
import ProjectsPage from './features/projects/ProjectsPage'
import ContactPage from './features/contact/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: cubicBezier(0.16, 1, 0.3, 1) },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true)

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
            onComplete={() => setShowPreloader(false)}
          />
        )}
      </AnimatePresence>
      <CustomCursor />
      <ScrollToTop />
      <Nav />
      <AnimatedRoutes />
    </>
  )
}

export default App
