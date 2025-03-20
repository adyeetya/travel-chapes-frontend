import React from 'react';
import Link from 'next/link';

const TrendingDestinations = ({ destinations }) => {
  const trendingTrips = destinations.filter((trip) =>
    trip.category.includes('trending')
  );

  // Split items into column pairs for 2 rows
  const columnPairs = [];
  for (let i = 0; i < trendingTrips.length; i += 2) {
    columnPairs.push(trendingTrips.slice(i, i + 2));
  }

  return (
    <div className="trending-destinations my-16 p-4 md:p-6">
      <h2 className="text-left text-2xl font-bold mb-12">Trending Destinations</h2>

      {/* Desktop grid */}
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

      {/* Mobile carousel */}
      <div className="sm:hidden overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-4 pl-4">
          {columnPairs.map((pair, index) => (
            <div 
              key={index}
              className="flex flex-col justify-between gap-4"
              style={{ minWidth: 'calc(50% - 8px)' }} // 2 columns + gap
            >
              {pair.map((trip) => (
                <Link key={trip.id} href={`destination/${trip.id}`} >
                  <div className="flex flex-col items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={trip.banners.web}
                        alt={trip.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-sm text-center font-medium">{trip.title}</p>
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