import React from "react";
import Link from "next/link";
import { ServerUrl } from "@/app/config";
import axios from "axios";
import { IoIosTrendingUp } from "react-icons/io";
import { Skeleton } from "./ui/skeleton";
const getTrendingTrips = async () => {
  try {
    const res = await axios.get(`${ServerUrl}/tripPlans/trendingTrips`, {
      cache: 'no-store'
    });
    return res.data.result || [];
  } catch (err) {
    return [];
  }
};

const TrendingDestinations = async () => {
  const trendingTrips = await getTrendingTrips();

  const makeUrlFriendly = (category) => {
    return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
  };

  // Split items into column pairs for 2 rows
  const columnPairs = [];
  for (let i = 0; i < trendingTrips.length; i += 2) {
    columnPairs.push(trendingTrips.slice(i, i + 2));
  }

  if (!trendingTrips.length) return <div>No trending trips found.</div>;

  return (
    <div className="trending-destinations mb-10 mt-8 p-2 sm:p-4 md:pt-2 md:p-6 px-4 ">
      <h2 className="text-xl md:text-4xl font-semibold md:font-bold text-gray-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <IoIosTrendingUp className="md:h-10 md:w-10 h-6 w-6 sm:h-6 sm:w-6 text-yellow-600" />
        Trending Destinations
      </h2>
      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {trendingTrips.map((trip) => (
          <Link key={trip._id} href={`/trip/${Array.isArray(trip.category)
            ? trip.category.map(makeUrlFriendly).join('&')
            : makeUrlFriendly(trip.category)}/${trip.slug}`} passHref>
            <div className="flex flex-col items-center cursor-pointer">
              <div className="md:w-24 md:h-24 sm:w-20 sm:h-20 w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={trip.banners?.web}
                  alt={trip.title}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-center">
                {trip.title?.split(" ").slice(0, 2).join(" ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* Mobile carousel */}
      <div className="sm:hidden overflow-x-auto pb-3 no-scrollbar bg--500">
        <div className="flex gap-3 pl-">
          {columnPairs.map((pair, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-3"
              style={{ minWidth: "calc(30% - 6px)" }}
            >
              {pair.map((trip) => (
                <Link key={trip._id} href={`/trip/${Array.isArray(trip.category)
                  ? trip.category.map(makeUrlFriendly).join('&')
                  : makeUrlFriendly(trip.category)}/${trip.slug}`} passHref>
                  <div className="flex flex-col items-center justify-between bg-  rounded-lg shadow-sm">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={trip.banners?.web}
                        alt={trip.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-center font-medium w-full line-clamp-2 overflow-hidden text-ellipsis">
                      {trip.title?.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingDestinations;
