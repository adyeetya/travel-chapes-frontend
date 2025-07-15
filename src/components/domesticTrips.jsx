import React from 'react'

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

import { FaMapMarkerAlt, FaArrowRight, FaStar, FaClock } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { CiGlobe } from "react-icons/ci";
const categoryDescriptions = {
  "Backpacking": "Budget-friendly adventures for free-spirited travelers who love exploring on foot and living minimally.",
  "Weekend Trip": "Quick getaways perfect for refreshing your mind and escaping the city for 2–3 days.",
  "Biking Trip": "Thrilling road journeys designed for motorcycle enthusiasts who crave the open road and scenic landscapes.",
  "Treks": "Explore nature on foot with guided treks through mountains, forests, and untouched trails.",
  "customised": "Personalized travel experiences created just for you. (Duplicate of 'Customied', consider merging)",
  "International": "Handpicked trips outside India offering cultural exploration, relaxation, and adventure across borders.",
  "Spiti valley": "Barren yet beautiful, Spiti offers unmatched Himalayan landscapes, monasteries, and serenity.",
  "Ladakh": "Land of high passes with surreal landscapes, clear blue lakes, and vibrant Tibetan culture.",
  "Vietnam": "Experience Vietnam’s rich history, stunning natural beauty, and street food like no other.",
  "Thailand": "A mix of tropical beaches, ornate temples, vibrant cities, and exotic street markets.",
  "Himachal Pradesh": "Mountain charm, adventure activities, and peaceful towns tucked into the Himalayas.",
  "Andaman": "Crystal-clear waters, white sand beaches, snorkeling, and tropical island vibes.",
  "Goa": "India’s beach capital with a laid-back vibe, exciting nightlife, and Portuguese heritage.",
  "Uttarakhand": "Spiritual, serene, and scenic. Home to pilgrimage sites and nature escapes in the Himalayas.",
  "Bali": "A tropical paradise known for its beaches, rice terraces, spiritual temples, and culture."
}

const categoryRatings = {
  "Backpacking": 4.7,
  "Weekend Trip": 4.6,
  "Biking Trip": 4.8,
  "Treks": 4.9,
  "customised": 4.5,
  "International": 4.8,
  "Spiti valley": 4.9,
  "Ladakh": 4.9,
  "Vietnam": 4.7,
  "Thailand": 4.6,
  "Himachal Pradesh": 4.8,
  "Andaman": 4.7,
  "Goa": 4.6,
  "Uttarakhand": 4.8,
  "Bali": 4.7
}



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
const excludedCategories = ['customised', 'international', 'trek', 'weekend', 'roadtrip', 'backpacking', 'weekend trip', 'treks', 'backpacking trip', 'biking trip']

const groupTripsByCategory = (trips) => {
  const categoryMap = {}
  for (const trip of trips) {
    if (!trip.category) continue
    for (const cat of trip.category) {

      if (excludedCategories.includes(cat.toLowerCase())) continue
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
    <div className='my-8 md:my-12 bg-gradient-to-b from-blue-50 to-white py-12'>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-4xl font-semibold md:font-bold text-gray-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <HiOutlineLocationMarker className="md:h-10 md:w-10 h-6 w-6 text-yellow-600" />
            Domestic Trips
          </h2>
        </div>

        {/* Modified Carousel with peeking cards */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: "auto",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories.map((category, idx) => {
                const catTrips = groupedTrips[category]
                const trip = catTrips[0]
                return (
                  <CarouselItem
                    key={category}
                    className="pl-4 basis-[80%] sm:basis-[45%] lg:basis-[30%] xl:basis-[23%]"
                  >
                    <Link
                      href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white flex flex-col h-full group"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={trip.banners?.web || trip.images?.[0] || '/fallback.jpg'}
                          alt={category}
                          className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                        <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Available
                        </span>
                      </div>
                      <div className="p-2 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="h-4 w-4 mr-1 text-blue-500" />
                            <h4 className="font-bold text-xl text-gray-800 line-clamp-2">{category}</h4>
                          </div>
                          <FaArrowRight className="h-5 w-5 text-yellow-600" />
                        </div>

                        <div className="flex flex-col items-start text-xs text-gray-600 mb-1">
                          {categoryDescriptions[category]}
                        </div>

                        <div className="mt-auto pt-1 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-yellow-600 text-sm">
                              <FaStar className="h-4 w-4" />
                              <span className="ml-1">{categoryRatings[category]}</span>
                            </div>
                          </div>
                        </div>
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
    </div>
  )
}

const InternationalTrips = async () => {
  const trips = await getTripsByType('international');

  const groupedTrips = groupTripsByCategory(trips)
  const categories = Object.keys(groupedTrips)
  return (
    <div className='my-8 md:my-12 bg-gradient-to-b from-blue-50 to-white py-12'>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-4xl font-semibold md:font-bold text-gray-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <CiGlobe className="md:h-10 md:w-10 h-6 w-6 text-yellow-600" />
            International Trips
          </h2>
        </div>



        {/* Modified Carousel with peeking cards */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: "auto",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories.map((category, idx) => {
                const catTrips = groupedTrips[category]
                const trip = catTrips[0]
                return (
                  <CarouselItem
                    key={category}
                    className="pl-4 basis-[80%] sm:basis-[45%] lg:basis-[30%] xl:basis-[23%]"
                  >
                    <Link
                      href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white flex flex-col h-full group"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={trip.banners?.web || trip.images?.[0] || '/fallback.jpg'}
                          alt={category}
                          className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                        <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Available
                        </span>
                      </div>
                      <div className="p-2 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="h-4 w-4 mr-1 text-blue-500" />
                            <h4 className="font-bold text-xl text-gray-800 line-clamp-2">{category}</h4>
                          </div>
                          <FaArrowRight className="h-5 w-5 text-yellow-600" />
                        </div>

                        <div className="flex flex-col items-start text-xs text-gray-600 mb-1">
                          {categoryDescriptions[category]}
                        </div>

                        <div className="mt-auto pt-1 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-yellow-600 text-sm">
                              <FaStar className="h-4 w-4" />
                              <span className="ml-1">{categoryRatings[category]}</span>
                            </div>
                          </div>
                        </div>
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
    </div>
  )
}

export { DomesticTrips, InternationalTrips }