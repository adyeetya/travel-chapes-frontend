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
import { LuCalendarClock } from 'react-icons/lu'

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
const Card = ({ data, noOfCards }) => {
  return (
    <div>
      {' '}
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {data.map((trip, idx) => (
            <CarouselItem
              key={idx}
              className={`w-full sm:basis-1/2 lg:basis-1/${noOfCards} flex-shrink-0`}
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
                <div className="absolute flex flex-row justify-center items-center gap-2 top-2 right-2 bg-white/70 text-black px-3 p-1 rounded-full">
                  <LuCalendarClock />
                  {trip.duration}
                </div>
                {/* Glass effect text overlay */}
                <div className="relative z-20 bg-black/10 brightness-90 backdrop-blur-md rounded-b-xl p-4">
                  <Link href={`/destination/${trip.id}`} className="z-10">
                    <h3 className="text-xl font-semibold text-white hover:underline">
                      {trip.title}
                    </h3>
                  </Link>

                  {renderStars(4.5)}
                  <p className="text-sm md:text-md text-white overflow-hidden text-ellipsis">
                    {trip.metaDescription?.slice(0, 70)}
                    {trip.metaDescription?.length > 70 && '...'}
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
  )
}

export default Card
