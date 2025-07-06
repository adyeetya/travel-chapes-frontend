'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ServerUrl } from "@/app/config";
import axios from "axios";

const TrendingDestinations = () => {
  const [trendingTrips, setTrendingTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${ServerUrl}/tripPlans/trendingTrips`);
        setTrendingTrips(res.data.result || []);
      } catch (err) {
        setError("Failed to load trending trips");
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const makeUrlFriendly = (category) => {
    return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
  };


  // Split items into column pairs for 2 rows
  const columnPairs = [];
  for (let i = 0; i < trendingTrips.length; i += 2) {
    columnPairs.push(trendingTrips.slice(i, i + 2));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!trendingTrips.length) return <div>No trending trips found.</div>;

  return (
    <div className="trending-destinations mb-16 mt-4 p-4 md:pt-2 md:p-6">
      <h2 className="text-left text-2xl md:text-3xl font-bold mb-8">
        Trending Destinations
      </h2>

      {/* Desktop grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {trendingTrips.map((trip) => (
          <Link key={trip._id} href={`/trip/${Array.isArray(trip.category)
            ? trip.category.map(makeUrlFriendly).join('&')
            : makeUrlFriendly(trip.category)}/${trip.slug}`} passHref>
            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={trip.banners?.web}
                  alt={trip.title}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-center">
                {trip.title?.split(" ").slice(0, 2).join(" ")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="sm:hidden overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-4 pl-4">
          {columnPairs.map((pair, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4"
              style={{ minWidth: "calc(50% - 8px)" }} // 2 columns + gap
            >
              {pair.map((trip) => (
                <Link key={trip._id} href={`destination/${trip._id}`}>
                  <div className="flex flex-col items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={trip.banners?.web}
                        alt={trip.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-sm text-center font-medium w-full line-clamp-2 overflow-hidden text-ellipsis">
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
