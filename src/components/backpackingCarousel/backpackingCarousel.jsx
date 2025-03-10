'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Card from '../common/Card'

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
        href="/himachal-high" // Replace with your target link
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
          <Card data={backpackings} noOfCards={3} />
        </div>
      </div>
      <section className="my-12">
        <SpitiHigh />
      </section>
    </div>
  )
}

export default BackpackingCarousel
