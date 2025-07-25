import Image from 'next/image'
import Hero from '@/components/hero/hero'
import ReviewCarousel from '@/components/reviewcarousel/reviewcarousel'
import CategoryTrips from '@/components/categoryTrips/CategoryTrips'
import About from '@/components/aboutSection/About'
import InternationalTours from '@/components/internationalTours/InternationalTours'
import Feedback from '@/components/feedback/Feedback'
import BlogsSection from '@/components/blogsSections/BlogsSection'
import TrendingDestinations from '@/components/trendingDestinations'
import FeaturedDestinations from '@/components/featuredTrips'
import TripModalWrapper from '@/components/modal/ModalWrapper'
import { destinations } from '@/data/destinations/destinations'
import ImageSlider from '@/components/imagesSlider'
import WhyChooseUs from '@/components/WhyChooseUs'
import SpecialCategories from '@/components/specialCategories'
import { fetchAllCategories } from './fetchTrip'
import { DomesticTrips, InternationalTrips } from '@/components/domesticTrips'
import UpcomingBatches from '@/components/upcomingBatches'
export default async function Home() {

  // const categories = await fetchAllCategories();
// const trendingTrips = await fetchTrendingTrips();
  return (
    <div className="min-h-screen">
      <Hero />
      <TrendingDestinations />
      <WhyChooseUs />
      {/* <ReviewCarousel /> */}
      {/* {categories.map((categoryObj) => (
        // Skip customized/customised categories as they might be duplicates
        !categoryObj.category.toLowerCase().includes('custom') && (
          <section className='my-12' key={categoryObj._id} id={categoryObj.category.toLowerCase().replace(' ', '-')}>
            <CategoryTrips 
              categoryObj={categoryObj} 
              title={`${categoryObj.category}`} 
              noOfCards={3} 
            />
          </section>
        )
      ))} */}
      <DomesticTrips />
      <InternationalTrips />
      <SpecialCategories />
      <UpcomingBatches />
      <FeaturedDestinations/>
      <ImageSlider />
      <About />
      {/* <InternationalTours /> */}
      <TripModalWrapper />
      <BlogsSection />
    </div>
  )
}
// todo - category page too long fix that too many cards
// add loading skeleton 
//  linkk upcoming batches to trip page
// add 4 cards of main cats back trek biki weekend