import { BeforeAfter } from './components/BeforeAfter'
import { Contact } from './components/Contact'
import { EmergencyBanner } from './components/EmergencyBanner'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ServiceAreas } from './components/ServiceAreas'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { MeetMario } from './components/MeetMario'
import { MobileCallBar } from './components/MobileCallBar'
import { WhyChooseUs } from './components/WhyChooseUs'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <WhyChooseUs />
        <MeetMario />
        <Gallery />
        <BeforeAfter />
        <Testimonials />
        <ServiceAreas />
        <EmergencyBanner />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
