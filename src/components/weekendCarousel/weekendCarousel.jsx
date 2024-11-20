'use client'
import React, { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { CiCircleChevRight } from 'react-icons/ci'
import { IoStarSharp, IoStarHalfSharp } from 'react-icons/io5'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { label: 'Total Trips', value: 750, suffix: '+' },
  { label: 'Total Travelers', value: 4250, suffix: '+' },
  { label: 'Social Media', value: 122000, suffix: '+' },
  { label: 'Experience', value: 3, suffix: '+ Years' },
]

const AnimatedStat = ({ label, value, suffix }) => {
  const count = useMotionValue(0)
  const ref = React.useRef(null)
  const roundedCount = useTransform(count, (latest) => Math.floor(latest))
  const isInView = useInView(ref, { amount: 0.5, triggerOnce: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
      })
      return controls.stop // Stop animation on unmount
    }
  }, [isInView, count, value])

  return (
    <h1 ref={ref} className="md:text-center">
      <span className="text-xl md:text-2xl whitespace-nowrap">{label}</span>
      <br />
      <motion.span className="text-2xl md:text-4xl font-semibold md:font-bold">
        {roundedCount}
      </motion.span>
      <span className="text-2xl md:text-4xl font-semibold md:font-bold">
        {suffix}
      </span>
    </h1>
  )
}

const StatsSection = () => {
  return (
    <div className="my-20 p-4 max-w-screen-xl mx-auto">
      <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedStat
            key={stat.label}
            label={stat.label}
            value={stat.value}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </div>
  )
}

const Xmas = () => {
  return (
    <div className="relative w-full min-h-[400px] max-w-screen-xl mx-auto">
      <Image
        src="/images/homepage/xmasnewyearbanner.webp" // Replace with your image path
        alt="Christmas Image"
        className="w-full h-auto object-cover min-h-[400px] max-h-screen"
        height={1000}
        width={1000}
      />
      <a
        href="/christmas-new-year-special" // Replace with your target link
        className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 md:px-6 md:py-3 bg-red-500 text-white text-sm md:text-lg md:font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out animate-glow"
      >
        Discover Holiday Deals
      </a>

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

const TripCarousel = ({ destinations }) => {
  // Filter destinations by the "weekend" category
  const weekendTrips = destinations.filter((trip) =>
    trip.category.includes('weekend')
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
    <div className="">
      <h2 className="text-3xl px-4 max-w-screen-xl mx-auto font-bold my-4">
        Weekend Fun
      </h2>
      <div className="my-12 p-4 max-w-screen-xl mx-auto">
        <Carousel opts={{ align: 'start' }} className="w-full ">
          <CarouselContent className="">
            {weekendTrips.map((trip) => (
              <CarouselItem
                key={trip.id}
                className="w-full sm:basis-1/2 md:basis-1/3 flex-shrink-0"
              >
                <div
                  className="border-2 rounded-xl relative h-[450px] flex flex-col justify-end bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${
                      trip.images
                        ? trip.images[1]
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
                      <h3 className="text-lg font-semibold text-white hover:underline">
                        {trip.title}
                      </h3>
                    </Link>
                    {renderStars(4.5)}
                    <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
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

      <StatsSection />
      <section className="my-12">
        <Xmas />
      </section>
    </div>
  )
}

export default TripCarousel
