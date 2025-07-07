"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";
import {
  LuCalendarClock,
  LuStar,
  LuMapPin,
  LuFlag,
  LuHeart
} from "react-icons/lu";
import { FiMap, FiCompass, FiSun } from "react-icons/fi";

const makeUrlFriendly = (category) => {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
};

const Card = ({ data, noOfCards }) => {
  const [tripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    console.log("Data received in Card component:", data);
    setTripDetails(data);
  }, [data]);

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {tripDetails.map((trip, idx) => (
            <CarouselItem
              key={idx}
              className={`w-full basis-[80%] sm:basis-[45%] lg:basis-[30%]`}
            >
              <Link href={`/trip/${Array.isArray(trip.category)
                ? trip.category.map(makeUrlFriendly).join('&')
                : makeUrlFriendly(trip.category)}/${trip.slug}`}
              >
                <div className="border rounded-xl overflow-hidden h-[350px] flex flex-col group hover:shadow-lg transition-shadow duration-300">
                  {/* Image Section (Top 60%) */}
                  <div className="relative h-[55%]">
                    <img
                      src={
                        trip.images
                          ? trip.images[0]
                          : "/images/homepage/phonebanner1.webp"
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Featured Tag */}

                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <LuStar size={12} />
                      <span>FEATURED</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <LuStar size={14} />
                      {trip.rating || (Math.random() * (5 - 3.9) + 3.9).toFixed(1)}
                    </div>



                  </div>

                  {/* Details Section (Bottom 40%) */}
                  <div className="p-4 flex flex-col justify-between h-[45%]">
                    {/* Name and Rating */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold text-black line-clamp-2 overflow-hidden text-ellipsis">
                        {trip.title}
                      </h3>

                    </div>

                    {/* Description and Icons */}
                  
                      <div className="flex flex-col gap-3 text-gray-600 mt-4">
                        {/* {trip.route && (
                          <div className="flex items-center gap-1 text-sm">
                            <LuMapPin size={20} />
                            <span>{trip.route}</span>
                          </div>
                        )} */}
                        {trip.city && (
                          <div className="flex items-center gap-1 text-sm">
                            <FiMap size={20} />
                            <span>{trip.city}</span>
                          </div>
                        )}

                      </div>
                  
                    {/* Price and Duration */}
                    <div className="flex justify-between items-center mt-4 ">
                      <span className="text-base font-semibold text-amber-600 bg-blue-50 rounded px-2">
                        <span className="text-xs">From</span> ₹{trip.minPrice}
                      </span>

                      <span className="flex items-center gap-1 text-sm text-black bg-green-100 px-2 py-1 rounded-full">
                        <LuCalendarClock size={14} />
                        {trip.fullItinerary ? trip.fullItinerary.length : 0} Days
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Card;