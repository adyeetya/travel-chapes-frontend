import Image from 'next/image'
import Hero from '@/components/hero/hero'
import ReviewCarousel from '@/components/reviewcarousel/reviewcarousel'
import TripCarousel from '@/components/weekendCarousel/weekendCarousel'
import TrekCarousel from '@/components/trekCarousel/trekCarousel'
import PlacesCarousel from '@/components/placesCarousel/roadtripCarousel'
import BackpackingCarousel from '@/components/backpackingCarousel/backpackingCarousel'
import About from '@/components/aboutSection/About'
import InternationalTours from '@/components/internationalTours/InternationalTours'
import Feedback from '@/components/feedback/Feedback'
import BlogsSection from '@/components/blogsSections/BlogsSection'
import { destinations } from '@/data/destinations/destinations'
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ReviewCarousel />
      <section id="weekend-fun">
        <TripCarousel destinations={destinations} />
      </section>
      <section id="treks">
        <TrekCarousel destinations={destinations} />
      </section>
      <PlacesCarousel destinations={destinations} />
      <section id="backpacking">
        <BackpackingCarousel destinations={destinations} />
      </section>
      <About />
      <InternationalTours />
      {/* <Feedback /> */}
      {/* <BlogsSection /> */}
    </div>
  )
}
