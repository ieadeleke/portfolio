import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import FooterNew from '../../components/FooterNew'

export default function ContactPage() {
  return (
    <main className="w-full">
      <Hero />
      <ContactForm />
      {/* <LogoMarquee /> */}
      <FooterNew />
    </main>
  )
}
