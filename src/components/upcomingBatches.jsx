'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerUrl } from '@/app/config';
import { fetchTripPlan } from '@/app/fetchTrip';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { HiOutlineCalendar } from "react-icons/hi";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"
const getDateRange = (filter) => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (filter === 'this-month') {
    start.setHours(0, 0, 0, 0);
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
  } else if (filter === 'next-month') {
    start.setMonth(start.getMonth() + 1);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
  }

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <Skeleton className="h-48 w-full" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between pt-3">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

const BatchCard = ({ trip }) => {
  return (
    <Link href={`/trips/${trip.slug}`} className="block h-full">
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white flex flex-col h-full group">
        <div className="relative h-48 w-full overflow-hidden">
          {trip.image ? (
            <img
              src={trip.image}
              alt={trip.slug}
              className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="bg-gray-100 h-full flex items-center justify-center">
              <HiOutlineCalendar className="h-16 w-16 text-gray-300 mx-auto" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full bg-white/70 backdrop-blur-sm rounded-t-lg px-3 py-1 shadow-sm">
            <div className="flex justify-between items-center gap-2">
              <div className="text-center flex items-center gap-2">
                <p className="text-xs font-medium text-gray-500">From</p>
                <p className="text-sm font-bold text-gray-800">
                  {new Date(trip.startDate).getDate()}
                  <span className="text-xs font-normal ml-1">
                    {new Date(trip.startDate).toLocaleString('default', { month: 'short' })}
                  </span>
                </p>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="text-center flex items-center gap-2">
                <p className="text-xs font-medium text-gray-500">To</p>
                <p className="text-sm font-bold text-gray-800">
                  {new Date(trip.endDate).getDate()}
                  <span className="text-xs font-normal ml-1">
                    {new Date(trip.endDate).toLocaleString('default', { month: 'short' })}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Available
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-md text-gray-800 line-clamp-2">
              {trip.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <FaArrowRight className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
          </div>

          <div className="flex items-center text-xs text-gray-600 mb-2">
            <FaMapMarkerAlt className="h-4 w-4 mr-1 text-blue-500 flex-shrink-0" />
            <span className="truncate">Pickup {trip.pickup}</span>
          </div>

          {trip.route && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {trip.route}
            </p>
          )}

          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Starting from</span>
                <span className="text-yellow-600 font-bold">
                  ₹{trip.pricing?.bus?.double?.toLocaleString() || 'N/A'}
                </span>
              </div>
              <div className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                {trip.days} days
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const UpcomingBatches = () => {
  const [filter, setFilter] = useState('this-month');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange(filter);
      const response = await axios.get(`${ServerUrl}/tripRequirement/upcomingBatches`, {
        params: { startDate, endDate },
      });

      const rawTrips = response?.data?.result || [];

      const enriched = await Promise.all(
        rawTrips.map(async (trip) => {
          try {
            const details = await fetchTripPlan(trip.slug);
            const tripDetails = details?.result || {};
            return {
              ...trip,
              image: tripDetails?.banners?.web || tripDetails?.images?.[0] || null,
              route: tripDetails?.route || null,
            };
          } catch (error) {
            console.error('Error enriching trip:', error);
            return {
              ...trip,
              image: null,
              route: null,
            };
          }
        })
      );

      setTrips(enriched);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      setTrips([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, [filter]);

  return (
   <div className='my-16 md:my-28 bg-gradient-to-b from-blue-50 to-white py-12'>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row md:items-center justify-between mb-6 gap-3 sm:gap-0">
          {/* Left side: Heading always on top */}
          <div className="w-full sm:w-auto">
            <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-0">
              <HiOutlineCalendar className="h-6 w-6 sm:h-10 sm:w-10 text-yellow-600" />
              Upcoming Batches
            </h2>
          </div>
          
          {/* Right side: Filter Buttons */}
          <div className="flex space-x-2 sm:space-x-3">
            <button
              onClick={() => setFilter('this-month')}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border text-xs sm:text-sm transition-all duration-200 ${filter === 'this-month' ? 'bg-yellow-500 text-white border-yellow-500 shadow-md' : 'border-yellow-500 text-yellow-600 bg-white hover:bg-yellow-50'}`}
            >
              This Month
            </button>
            <button
              onClick={() => setFilter('next-month')}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border text-xs sm:text-sm transition-all duration-200 ${filter === 'next-month' ? 'bg-yellow-500 text-white border-yellow-500 shadow-md' : 'border-yellow-500 text-yellow-600 bg-white hover:bg-yellow-50'}`}
            >
              Next Month
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : trips.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No upcoming batches found.</div>
        ) : (
          <div className="relative">
            <Carousel opts={{ align: "start", slidesToScroll: "auto" }} className="w-full">
              <CarouselContent className="-ml-4">
                {trips.map((trip) => (
                  <CarouselItem
                    key={trip._id}
                    className="pl-4 basis-[80%] sm:basis-[45%] lg:basis-[30%]"
                  >
                    <BatchCard trip={trip} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingBatches;
