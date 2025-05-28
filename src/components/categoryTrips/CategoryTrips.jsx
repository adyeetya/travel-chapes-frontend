'use client'
import React, { useEffect, useState } from 'react'
import { fetchTripByCategory } from '@/app/fetchTrip'
import Card from '../common/Card'
import Link from 'next/link';

const CategoryTrips = ({ categoryObj, title, noOfCards = 3 }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [trips, setTrips] = useState([])

useEffect(() => {
  const cacheKey = `trips_${categoryObj.category}`
  const cached = sessionStorage.getItem(cacheKey)
  if (cached) {
    setTrips(JSON.parse(cached))
    setLoading(false)
    return
  }
  const loadByCategory = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Fetching trips for category:', categoryObj.category)
      const data = await fetchTripByCategory(categoryObj.category)
      setTrips(data.result.docs)
      sessionStorage.setItem(cacheKey, JSON.stringify(data.result.docs))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  loadByCategory()
}, [categoryObj])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  // Don't render anything if there are no trips
  if (!trips || trips.length === 0) return null;

  return (
    <div className="">
      <h2 className="text-3xl px-4 max-w-screen-xl mx-auto font-bold my-4 flex items-center justify-between">
        <span>{title}</span>
        <Link
          href={`/${categoryObj.category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-yellow-600 hover:text-yellow-800 text-base font-semibold underline ml-4"
        >
          View All
        </Link>
      </h2>
      <div className="my-12 p-4 max-w-screen-xl mx-auto">
        <Card data={trips} noOfCards={noOfCards} />
      </div>
    </div>
  )
}

export default CategoryTrips
