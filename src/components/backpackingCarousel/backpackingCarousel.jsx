'use client'
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

const HimachalHigh = () => {
  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <Image
        src="/images/homepage/himachalhigh.webp" // Replace with your image path
        alt="Christmas Image"
        className="w-full h-auto object-cover  max-h-screen"
        height={1000}
        width={1000}
      />
      <Link
        href="/christmas-special/himachal-high" // Replace with your target link
        className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 md:px-6 md:py-3 bg-black text-white text-sm md:text-lg md:font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out animate-glow"
      >
        Start Adventure
      </Link>

      {/* Keyframes for glowing effect */}
      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.6),
              0 0 20px rgba(255, 255, 0, 0.6), 0 0 30px rgba(255, 0, 0, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8),
              0 0 30px rgba(255, 255, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.8);
          }
        }

        .animate-glow {
          animation: glow 1.5s infinite alternate;
        }
      `}</style>
    </div>
  )
}

const SpitiHigh = () => {
  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <Image
        src="/images/homepage/Spiti_high_banner.webp" // Replace with your image path
        alt="Christmas Image"
        className="w-full h-auto object-cover  max-h-screen"
        height={1000}
        width={1000}
      />
      <Link
        href="/spiti-high-11d" // Replace with your target link
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 md:px-6 md:py-3 bg-black text-white text-sm md:text-lg md:font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out animate-glow"
      >
        Start Adventure
      </Link>

      {/* Keyframes for glowing effect */}
      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.6),
              0 0 20px rgba(255, 255, 0, 0.6), 0 0 30px rgba(255, 0, 0, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8),
              0 0 30px rgba(255, 255, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.8);
          }
        }

        .animate-glow {
          animation: glow 1.5s infinite alternate;
        }
      `}</style>
    </div>
  )
}

const BackpackingCarousel = ({ destinations }) => {
  const backpackings = destinations.filter((trip) =>
    trip.category.includes('backpacking')
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
    <div>
      <section className="my-12">
        <HimachalHigh />
      </section>
      <div className="p-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-start md:justify-between items-start md:items-center">
          <h2 className="text-3xl text-left font-bold my-4">
            Best Backpacking <br /> Experience
          </h2>
          <p className="max-w-lg">
            Set out on India’s ultimate backpacking journeys, where every step
            reveals a new story. Wander through lush valleys, scale rugged
            peaks, and immerse yourself in the rich tapestry of diverse
            cultures. Discover hidden trails, offbeat treasures, and
            unforgettable experiences as you embrace the spirit of adventure.
            Experience backpacking like never before with us!
          </p>
        </div>
        <div className="my-12">
          <Carousel opts={{ align: 'start' }} className="w-full ">
            <CarouselContent className="">
              {backpackings.map((trip) => (
                <CarouselItem
                  key={trip.id}
                  className="w-full sm:basis-1/2 md:basis-1/3 flex-shrink-0"
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
                        <h3 className="text-md font-semibold text-white hover:underline">
                          {trip.title}
                        </h3>
                      </Link>
                      {renderStars(4.5)}
                      <p className="text-sm  text-white overflow-hidden text-ellipsis">
                        {trip.metaDescription.slice(0, 50)}
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
      <section className="my-12">
        <SpitiHigh />
      </section>
    </div>
  )
}

export default BackpackingCarousel
