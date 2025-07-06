import React from 'react'
import Card from './common/Card'
import { ServerUrl } from '@/app/config'
import axios from 'axios'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const getTripsByType = async (type) => {
  try {
    const response = await axios.get(`${ServerUrl}/tripPlans/tripsByType?type=${type}`, {
      cache: 'no-store'
    })
    return response?.data?.result || []
  } catch (e) {
    return []
  }
}

// Excluded categories
const excludedCategories = ['customised', 'Backpacking']

const groupTripsByCategory = (trips) => {
  const categoryMap = {}
  for (const trip of trips) {
    if (!trip.category) continue
    for (const cat of trip.category) {
      if (excludedCategories.includes(cat)) continue
      if (!categoryMap[cat]) {
        categoryMap[cat] = []
      }
      categoryMap[cat].push(trip)
    }
  }
  return categoryMap
}

const DomesticTrips = async () => {
  const trips = await getTripsByType('domestic')
  const groupedTrips = groupTripsByCategory(trips)
  const categories = Object.keys(groupedTrips)

  return (
    <div>
      <h2 className="text-3xl px-4 max-w-screen-xl mx-auto font-bold my-4">Domestic Trips</h2>
      <div className="max-w-screen-xl mx-auto">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {categories.map((category, idx) => {
              const catTrips = groupedTrips[category]
              const trip = catTrips[0] // Use the first trip as the representative for the category
              return (
                <CarouselItem
                  key={category}
                  className="w-full sm:basis-1/2 lg:basis-1/3 flex-shrink-0"
                >
                  <Link
                    href={`/trips/category/${encodeURIComponent(category)}`}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white flex flex-col h-[420px]"
                  >
                    <div className="relative h-48 w-full">
                      <img
                        src={trip.banners?.web || trip.images?.[0] || '/fallback.jpg'}
                        alt={category}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h4 className="font-semibold text-lg mb-1 line-clamp-2">{category}</h4>
                      <p className="text-sm text-gray-600">{trip.city}</p>
                      <p className="text-primary font-bold mt-2">From ₹{trip.minPrice}</p>
                      <div className="mt-2 text-xs text-gray-500">{trip.duration}</div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

const InternationalTrips = async () => {
  const trips = await getTripsByType('international');
  return (
    <div>
      <div className="">
        <h2 className="text-3xl px-4 max-w-screen-xl mx-auto font-bold my-4">
          International Trips
        </h2>
        <div className="my-12 p-4 max-w-screen-xl mx-auto">
          <Card data={trips} noOfCards={3} />
        </div>
      </div>
    </div>
  )
}

export { DomesticTrips, InternationalTrips }