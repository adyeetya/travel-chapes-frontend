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
import TrendingDestinations from '@/components/trendingDestinations'
import TripModalWrapper from '@/components/modal/ModalWrapper'
import { destinations } from '@/data/destinations/destinations'
import ImageSlider from '@/components/imagesSlider'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function Home() {
  // todo - move the videos to s3 and update the links the hero vid and the memories one

  return (
    <div className="min-h-screen">
      <Hero />
      <TrendingDestinations destinations={destinations}/>
      <WhyChooseUs />
      <ReviewCarousel />
      <section id="weekend-fun">
        <TripCarousel destinations={destinations} />
      </section>
      <section id="treks">
        <TrekCarousel destinations={destinations} />
      </section>
      <ImageSlider />
      <PlacesCarousel destinations={destinations} />
      <section id="backpacking">
        <BackpackingCarousel destinations={destinations} />
      </section>
      <About />
      <InternationalTours />
      <TripModalWrapper />
      <BlogsSection />
    </div>
  )
}
