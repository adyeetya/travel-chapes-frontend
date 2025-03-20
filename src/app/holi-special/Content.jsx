'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { destinations } from '@/data/destinations/destinations'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: '400', subsets: ['latin'] })
import Card from '@/components/common/Card'


const PlacesCarousel = () => {
  const tours = destinations.filter((trip) =>
    trip.category.includes('holi')
  )

  return (
    <div className="p-4 py-12 my-12 bg-amber-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <h1 className="text-4xl font-semibold text-gray-800 md:whitespace-nowrap">
            12th March - 17th March
          </h1>
        </div>
        <div className="my-12">
          <Card data={tours} />
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

export function HoliPage() {
  return (
    <div className={`${poppins.className}`}>
    {/* Banner Section */}
    <motion.div
      className="relative w-full flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Image with Mobile Handling */}
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/images/sanghla/Holi_page_banner_phone.webp"
        />
        <img
          src="/images/sanghla/Holi_page_banner.webp"
          alt="Holi Banner"
          className="w-full h-auto object-contain"
        />
      </picture>
  
      {/* Content */}
      <motion.div
        className="absolute text-center text-white z-10 p-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Button */}
        <motion.button
          className="mt-20 px-8 py-4 bg-white text-pink-600 font-bold text-xl rounded-full shadow-2xl hover:bg-pink-500 hover:text-white transition"
          whileHover={{ scale: 1.1 }}
        >
          <Link href='#holi-destinations'>Book Now</Link>
        </motion.button>
      </motion.div>
    </motion.div>
  
    {/* Space for Carousel */}
    <div id='holi-destinations' className="py-12 md:py-32 bg-white text-center">
      <h2 className="text-5xl font-extrabold text-yellow-500">Explore Our Holi Trips</h2>
      <p className="text-xl text-gray-700">Colorful destinations filled with vibrant festivities and adventure!</p>
      <div className="mt-16">
        <PlacesCarousel />
      </div>
    </div>
  </div>
  )}

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
      <img
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

const XmasBanner = () => {
  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <img
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
