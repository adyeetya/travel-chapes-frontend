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
import { LuCalendarClock } from "react-icons/lu";

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
              className={`w-full sm:basis-1/2 lg:basis-1/3 flex-shrink-0`}
            >
              <Link href={`/trip/${Array.isArray(trip.category)
                ? trip.category.map(makeUrlFriendly).join('&')
                : makeUrlFriendly(trip.category)}/${trip.slug}`}
              >
                <div className="border-2 rounded-xl overflow-hidden h-[450px] flex flex-col">
                  {/* Image Section (Top 60%) */}
                  <div className="relative h-[60%]">
                    <img
                      src={
                        trip.images
                          ? trip.images[0]
                          : "/images/homepage/phonebanner1.webp"
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details Section (Bottom 40%) */}
                  <div className="p-4 flex flex-col justify-between h-[40%]">
                    {/* Name and Rating */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-black line-clamp-2 overflow-hidden text-ellipsis">
                        {trip.title}
                      </h3>
                      <span className="text-sm text-black bg-blue-200 px-2 py-1 rounded-full">
                        {trip.rating ||
                          (Math.random() * (5 - 3.9) + 3.9).toFixed(1)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-black mt-2">
                      {trip.metaDescription?.slice(0, 70)}
                      {trip.metaDescription?.length > 70 && "..."}
                    </p>

                    {/* Price and Duration */}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-base font-semibold text-black">
                        <span className="text-xs">From</span> ₹{trip.minPrice}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <LuCalendarClock />
                        <span>{trip.duration}</span>
                      </div>
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
