import Hero from './components/Hero'
import Editorial from './components/Editorial'
import Services from './components/Services'
import FooterNew from '../../components/FooterNew'
import Process from './components/Process'
import TrustedBy from './components/TrustedBy'

export default function AboutPage() {
  return (
    <main className="w-full">
      <Hero />
      <Editorial />
      <Services />
      <TrustedBy />
      <Process />
      <FooterNew />
    </main>
  )
}
