import FooterNew from '../../components/FooterNew'
import Hero from './components/Hero'
import Bio from './components/Bio'
import TechStack from './components/TechStack'
import Services from './components/Services'
import RecentProjects from './components/RecentProjects'
import Writing from './components/Writing'
import ScrollRibbon from './components/ScrollRibbon'

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <Bio />
      <TechStack />
      {/* black region: red ribbon flows down behind the content */}
      <div className="relative bg-black overflow-x-hidden">
        <ScrollRibbon />
        <Services />
        <RecentProjects />
        <Writing />
      </div>
      <FooterNew />
    </main>
  )
}
