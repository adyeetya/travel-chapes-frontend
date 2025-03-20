import React from 'react';
import Link from 'next/link';

const TrendingDestinations = ({ destinations }) => {
  // Filter trending trips
  const trendingTrips = destinations.filter((trip) =>
    trip.category.includes('trending')
  );

  return (
    <div className="trending-destinations my-16 p-4 md:p-6">
      <h2 className="text-left text-2xl font-bold mb-12">Trending Destinations</h2>

      {/* Grid layout for larger screens */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {trendingTrips.map((trip) => (
          <Link key={trip.id} href={`destination/${trip.id}`} passHref>
            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={trip.banners.web}
                  alt={trip.title}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-center">{trip.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Horizontal scrolling carousel for mobile screens */}
      <div className="sm:hidden overflow-x-auto whitespace-nowrap py-4">
        {trendingTrips.map((trip) => (
          <div key={trip.id} className="inline-block mx-2">
            <Link href={`destination/${trip.id}`} passHref>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={trip.banners.web}
                    alt={trip.title}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-center">{trip.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingDestinations;