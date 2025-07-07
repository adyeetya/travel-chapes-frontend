import React from "react";
import Link from "next/link";
import { ServerUrl } from "@/app/config";
import axios from "axios";
import Card from "./common/Card";
import {

  LuStar,

} from "react-icons/lu";
const getTrendingTrips = async () => {
  try {
    const res = await axios.get(`${ServerUrl}/tripPlans/featuredTrips`, {
      cache: 'no-store'
    });
    return res.data.result || [];
  } catch (err) {
    return [];
  }
};

const FeaturedDestinations = async () => {
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
    <div className="trending-destinations mb-16 mt-4 p-4 md:pt-2 md:p-6 max-w-screen-xl mx-auto px-4">
      <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-800 flex items-center gap-2 mb-8">
        <LuStar className="h-6 w-6 sm:h-10 sm:w-10 text-yellow-600" />
        Featured Destinations
      </h2>
      <Card data={trendingTrips} />
    </div>
  );
};

export default FeaturedDestinations;
