import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'

import { IoStarSharp, IoStarHalfSharp } from 'react-icons/io5'

const PlacesCarousel = ({ destinations }) => {
  const roadtrips = destinations.filter((trip) =>
    trip.category.includes('roadtrip')
  )
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex items-center my-2">
        {Array.from({ length: fullStars }).map((_, index) => (
          <IoStarSharp key={index} className="text-yellow-400 w-4 h-4" />
        ))}
        {hasHalfStar && <IoStarHalfSharp className="text-yellow-400 w-4 h-4" />}
      </div>
    )
  }
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 justify-start md:justify-between items-start md:items-center">
        <h2 className="text-3xl text-left font-bold my-4">Our Best Roadtrips</h2>
        <p className="max-w-lg">
          Embark on India&apos;s Most Scenic Road Trips. From Coastal Highways
          to Mountain Passes, Every Route Promises Unforgettable Journeys.
          Discover India&apos;s Hidden Gems, Iconic Landmarks, and Breathtaking
          Landscapes as You Cruise Through Adventure.
        </p>
      </div>
      <div className="my-12">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="">
            {roadtrips.map((trip) => (
              <CarouselItem
                key={trip.id}
                className="w-full sm:basis-1/2  flex-shrink-0"
              >
                <div
                  className="border-2 rounded-xl relative h-[450px] flex flex-col justify-end bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${
                      trip.images
                        ? trip.images[0]
                        : '/images/homepage/phonebanner1.webp'
                    }')`,
                  }}
                >
                  <Link
                    href={`/destination/${trip.id}`}
                    className="absolute inset-0 z-10"
                  />

                  {/* Glass effect text overlay */}
                  <div className="relative z-20 bg-black/10 brightness-90 backdrop-blur-md rounded-b-xl p-4">
                    <Link href={`/destination/${trip.id}`} className="z-10">
                      <h3 className="text-xl font-semibold text-white hover:underline">
                        {trip.title}
                      </h3>
                    </Link>
                    {renderStars(4.5)}
                    <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
                      {trip.metaDescription.slice(0, 70)}
                      {trip.metaDescription.length > 50 && '...'}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default PlacesCarousel
