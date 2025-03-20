'use client'

import React, { useState, useEffect } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'A Spiritual Journey to Kedarnath: Everything You Need to Know!',
      description:
        'Embark on a transformative journey to one of India&apos;s most sacred destinations. Find everything you need to plan your trip to Kedarnath.',
      link: '/blogs/a-spiritual-journey-to-kedarnath',
      img: '/images/blogs/kedarnath.webp',
    },
    {
      id: 2,
      title: 'The Ultimate Guide to a Himachal Trip',
      description:
        ' Plan an unforgettable journey through the paradise of the northern Himalayas.',
      link: '/blogs/the-ultimate-guide-to-a-himachal-trip',
      img: 'https://travelchapes.s3.eu-north-1.amazonaws.com/images/manali/manali1.webp',
    },
  ]

  const totalSlides = slides.length
  const slideWidth = 33.33 // Each slide takes 33.33% of the width
  const offset = 50 // Offset for partial visibility of neighboring slides

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 5000) // Slide changes every 5 seconds

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 0.5 : 0)) // Progress bar fills up over 5 seconds
    }, 25) // Update progress every 25ms for smoother bar movement

    return () => {
      clearInterval(slideInterval)
      clearInterval(progressInterval)
    }
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setProgress(0) // Reset progress when slide changes
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setProgress(0) // Reset progress when slide changes
  }

  return (
    <div className={` ${poppins.className} my-12`}>
      <h2 className="text-3xl font-semibold my-8 p-4 text-center">
        Helpful Blogs
      </h2>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Link href={slides[currentSlide].link}>
            <img
              src={slides[currentSlide].img} // Use the same image as the slide
              alt={slides[currentSlide].title}
              width={100}
              height={100}
              // Reduce quality for faster load
              className="filter blur-[2px] brightness-[0.3] object-cover bg-cover bg-center h-full w-full" // Apply blur and darken effect
              // Optional: for preloading this image
            />
          </Link>
        </div>
        {/* Progress Bar */}
        <div className="relative z-20">
          <div
            className="h-1 rounded-full bg-[#fbd354] z-10"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="px-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-8 md:flex-row my-6 z-10">
            <div className="w-full h-full flex flex-col my-auto justify-center md:w-1/2 z-10 text-white">
              <Link href={slides[currentSlide].link} prefetch={true}>
                {' '}
                <h2 className="text-2xl mb-4">{slides[currentSlide].title}</h2>
              </Link>
              <p>{slides[currentSlide].description}</p>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="flex w-full justify-center items-center overflow-hidden">
                <div
                  className="flex w-full transition-transform  duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`, // Adjust the slide translation
                    // Set width based on total slides
                  }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`flex-shrink-0 w-full flex justify-center items-center bg--300  transition-transform duration-700 ease-in-out`}
                      style={{
                        transform: `scale(${index === currentSlide ? 1 : 0.8})`,
                        opacity: index === currentSlide ? 1 : 0.5,
                        // Offset for partial visibility
                      }}
                    >
                      <div className="h-80 w-60 rounded-3xl bg-gray-400">
                        <Link href={slides[currentSlide].link}>
                          <img
                            src={slide.img}
                            alt={slide.title}
                            width={1000}
                            height={1000}
                            className="object-cover w-full h-full rounded-3xl "
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center w-full gap-4 my-4">
                {/* Manual navigation */}
                <div className="">
                  <div className="flex w-28 md:w-32 justify-between items-center">
                    <button
                      className=" w-10 h-10 flex justify-center items-center text-xl rounded-full border border-gray-200 hover:bg-gray-600 text-white"
                      onClick={prevSlide}
                    >
                      {'<'}
                    </button>
                    <button
                      className=" w-10 h-10 flex justify-center items-center text-xl rounded-full border border-gray-200 hover:bg-gray-600 text-white"
                      onClick={nextSlide}
                    >
                      {'>'}
                    </button>
                  </div>
                </div>
                {/* Indicator */}
                <div className="flex items-center justify-center space-x-2 w-full">
                  <div className="h-1 rounded-full bg-gray-300 w-full max-w-sm">
                    <div
                      className="h-1 rounded-full bg-[#fbd354] transition-all duration-1000 ease-in-out"
                      style={{
                        width: `${((currentSlide + 1) * 100) / totalSlides}%`,
                      }}
                    ></div>
                  </div>

                  <div className="text-blue-500 text-lg inline">
                    0{currentSlide + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
