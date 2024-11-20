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
import { useState, useEffect } from 'react'
import { destinations } from '@/data/destinations/destinations'
import { IoStarSharp, IoStarHalfSharp } from 'react-icons/io5'




const treks = [
  {
    id: '1',
    name: 'Trek 1',
    image: 'https://via.placeholder.com/200',
    description: 'Description of Trek 1',
    link: '#',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Trek 2',
    image: 'https://via.placeholder.com/200',
    description: 'Description of Trek 2',
    link: '#',
    rating: 4,
  },
  {
    id: '3',
    name: 'Trek 3',
    image: 'https://via.placeholder.com/200',
    description: 'Description of Trek 3',
    link: '#',
    rating: 3.5,
  },
  {
    id: '4',
    name: 'Trek 4',
    image: 'https://via.placeholder.com/200',
    description: 'Description of Trek 4',
    link: '#',
    rating: 5,
  },
  {
    id: '5',
    name: 'Trek 5',
    image: 'https://via.placeholder.com/200',
    description: 'Description of Trek 5',
    link: '#',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Trek 6',
    image: 'https://via.placeholder.com/200',
    description: 'Description of Trek 6',
    link: '#',
    rating: 4,
  },
]
const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    setSnowflakes(
      Array(30)
        .fill(0)
        .map((_, i) => ({
          id: i,
          left: Math.random() * 100, // Only set left position
          size: Math.random() * 1.5 + 0.5,
          duration: 3 + Math.random() * 5,
          delay: Math.random() * 5,
        }))
    )
  }, [])

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: `${flake.left}vw`,
            fontSize: `${flake.size}rem`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄️
        </div>
      ))}
      {/* Styled JSX */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(
              -80vh
            ); /* Start slightly above the viewport */
            opacity: 1;
          }
          100% {
            transform: translateY(100vh); /* End below the viewport */
            opacity: 0.5;
          }
        }
        .animate-fall {
          position: absolute;
          top: -40px; /* Start at the top */
          animation: fall linear infinite;
        }
      `}</style>
    </>
  )
}

const Hero = () => {
  return (
    <div className="relative z-0 w-full h-[100vh] rounded-b-[2rem] -mt-16 overflow-hidden">
      {/* Desktop Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="/images/christmas/Xmas_page_banner_video.webm"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[100vh] min-h-screen object-cover brightness-50"
        />
      </div>

      {/* Foreground Content */}
      <div className="absolute mt-16 inset-0 z-20 flex flex-col justify-between items-start px-4">
        <div className="flex w-full md:mt-12 mb-20 py-4 h-full justify-start items-end md:items-center overflow-hidden max-w-screen-xl mx-auto">
          <div className="text-left z-30">
            <h1 className="text-4xl mb-1 2xl:text-6xl font-bold text-gray-100 tracking-wide 2xl:tracking-widest">
              This Winter 🎄
            </h1>
            <h1 className="text-4xl 2xl:text-4xl font-bold text-gray-100 tracking-wide 2xl:tracking-widest">
              Chase Dreams | Create Memories
            </h1>
            <p className="text-lg mb-12 text-gold-200 italic text-white">
              TravelChapes – Where dreams meet destinations.
            </p>
            <button className="px-3 py-1 mt-3 bg-red-500 hover:bg-red-700 text-white rounded-full shadow-lg transition-all">
              Start Your Festive Journey ✨
            </button>
          </div>
        </div>
      </div>

      {/* Snowflake Emojis */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <Snowflakes />
      </div>
    </div>
  )
}

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

const XmasBanner = () => {
  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <Image
        src="/images/christmas/xmasbanner.webp" // Replace with your image path
        alt="Christmas Image"
        className="w-full h-auto object-cover  max-h-screen"
        height={1000}
        width={1000}
      />
    </div>
  )
}

const Heading = () => {
  return (
    <div>
      <h1 className="font-semibold text-4xl text-red-500 text-center p-4">
        Get Exclusive Festive Deals on Below Tours
      </h1>
    </div>
  )
}

const PlacesCarousel = () => {
  const tours = destinations.filter((trip) =>
    trip.category.includes('christmas')
  )
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex items-center ml-2">
        {Array.from({ length: fullStars }).map((_, index) => (
          <IoStarSharp key={index} className="text-yellow-500 w-3 h-3" />
        ))}
        {hasHalfStar && <IoStarHalfSharp className="text-yellow-500 w-3 h-3" />}
      </div>
    )
  }

  return (
    <div className="p-4 bg-red-600">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <h1 className="text-4xl font-semibold text-white md:whitespace-nowrap">
            20th December - 4th January
          </h1>
        </div>
        <div className="my-12">
          <Carousel opts={{ align: 'start' }} className="w-full ">
            <CarouselContent className="">
              {tours.map((trip) => (
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
        <div className="w-full flex justify-center">
          <a
            href="https://wa.me/+918650500202"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-button"
          >
            <button className="bg-white text-red-500 px-4 py-2 rounded-full border border-white mx-auto hover:bg-red-800 hover:text-white transition-colors duration-300">
              Contact
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

const page = () => {
  return (
    <div>
      <section className="my-12">
        <Hero />
      </section>
      <section className="my-12">
        <Heading />
      </section>
      <section className="my-12">
        <XmasBanner />
      </section>
      <section className="my-12">
        {' '}
        <PlacesCarousel />
      </section>
      <section className="my-12">
        {' '}
        <HimachalHigh />
      </section>
    </div>
  )
}

export default page
