import React from 'react'

import Card from '../common/Card'

const PlacesCarousel = ({ destinations }) => {
  const roadtrips = destinations.filter((trip) =>
    trip.category.includes('roadtrip')
  )

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 justify-start md:justify-between items-start md:items-center">
        <h2 className="text-3xl text-left font-bold my-4">
          Our Best Roadtrips
        </h2>
        <p className="max-w-lg">
          Embark on India&apos;s Most Scenic Road Trips. From Coastal Highways
          to Mountain Passes, Every Route Promises Unforgettable Journeys.
          Discover India&apos;s Hidden Gems, Iconic Landmarks, and Breathtaking
          Landscapes as You Cruise Through Adventure.
        </p>
      </div>
      <div className="my-12">
        <Card data={roadtrips} noOfCards={2} />
      </div>
    </div>
  )
}

export default PlacesCarousel
