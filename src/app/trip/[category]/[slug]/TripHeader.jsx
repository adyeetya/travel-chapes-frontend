import React from 'react';

const TripHeader = ({ destination }) => (
  <div className="flex flex-col md:flex-row gap-6 mb-8">
    <div className="md:w-1/3">
      <img
        src={destination?.banners?.web}
        alt={destination?.title}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
    <div className="md:w-2/3">
      <h2 className="text-3xl font-bold mb-2 text-black">{destination?.title}</h2>
      <p className="text-gray-600 mb-2">{destination?.route}</p>
      <p className="text-gray-700 mb-4">{destination?.fullItinerary?.length || 9} Days / {destination?.fullItinerary?.length - 1 || 8} Nights</p>
      <div
        className="prose prose-sm"
        dangerouslySetInnerHTML={{ __html: destination?.description.substring(0, 300) + '...' }}
      />
    </div>
  </div>
);

export default TripHeader;
