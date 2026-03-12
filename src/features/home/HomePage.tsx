import FooterNew from '../../components/FooterNew'
import Hero from './components/Hero'
import Bio from './components/Bio'
import TechStack from './components/TechStack'
import Services from './components/Services'
import PinnedStats from './components/PinnedStats'
import RecentProjects from './components/RecentProjects'

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <Bio />
      <TechStack />
      <Services />
      <PinnedStats />
      <RecentProjects />
      <FooterNew />
    </main>
  )
}
